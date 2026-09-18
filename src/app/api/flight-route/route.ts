import { NextRequest, NextResponse } from 'next/server'
import { airports } from '@/lib/airportData'
import { getAeroSnapshot, airportFlightsPath } from '@/lib/aerodataboxCache'
import { airportBoardRefreshSeconds } from '@/lib/airportFlightBoards'
import { getAeroDataBoxConnection } from '@/lib/aerodatabox'
import { checkRateLimit } from '@/lib/rateLimit'

export const revalidate = 120  // cache 2 minuty

interface AeroDataBoxAirport {
  icao?: string
  iata?: string
  name?: string
  municipalityName?: string
  location?: { lat: number; lon: number }
}

interface AeroDataBoxTime {
  utc?: string
  local?: string
}

interface AeroDataBoxMovement {
  airport?: AeroDataBoxAirport
  scheduledTime?: AeroDataBoxTime
  revisedTime?: AeroDataBoxTime
  predictedTime?: AeroDataBoxTime
  terminal?: string
  gate?: string
  baggageBelt?: string
}

interface AeroDataBoxFlight {
  departure?: AeroDataBoxMovement
  arrival?:   AeroDataBoxMovement
  status?: string
  number?: string
  callSign?: string
  aircraft?: { reg?: string; modeS?: string; model?: string }
  airline?: { name?: string }
}

function movementTime(value?: AeroDataBoxTime): string | null {
  const text = value?.utc ?? value?.local
  if (!text) return null
  const time = new Date(text.replace(' ', 'T'))
  return Number.isFinite(time.getTime()) ? time.toISOString() : null
}

// Zpoždění v minutách z rozdílu plánovaného a revidovaného času (kladné = zpoždění)
function delayMin(scheduled?: AeroDataBoxTime, revised?: AeroDataBoxTime): number | null {
  const s = scheduled?.utc ?? scheduled?.local
  const r = revised?.utc ?? revised?.local
  if (!s || !r) return null
  const diff = (new Date(r).getTime() - new Date(s).getTime()) / 60000
  return Number.isFinite(diff) ? Math.round(diff) : null
}

interface FlightSchedule {
  number: string | null
  airline: string | null
  status: string | null
  depScheduled: string | null   // ISO local
  depActual: string | null
  depTerminal: string | null
  depGate: string | null
  depDelayMin: number | null
  arrScheduled: string | null
  arrActual: string | null
  arrTerminal: string | null
  arrGate: string | null
  arrBaggageBelt: string | null
  arrDelayMin: number | null
}

interface RouteAirport {
  icao: string | null
  iata: string | null
  name: string | null
  city: string | null
  lat:  number | null
  lng:  number | null
}

function routeAirport(airport?: AeroDataBoxAirport): RouteAirport {
  const local = airports.find(a => (airport?.icao && a.icao === airport.icao) || (airport?.iata && a.iata === airport.iata))
  return {
    icao: airport?.icao ?? local?.icao ?? null, iata: airport?.iata ?? local?.iata ?? null,
    name: airport?.name ?? local?.name ?? null, city: airport?.municipalityName ?? local?.city ?? null,
    lat: airport?.location?.lat ?? local?.lat ?? null, lng: airport?.location?.lon ?? local?.lng ?? null,
  }
}

interface AdsbdbAirport {
  icao_code?: string
  iata_code?: string
  name?: string
  municipality?: string
  latitude?: number
  longitude?: number
}

interface AdsbdbAircraft {
  type?: string
  icao_type?: string
  manufacturer?: string
  registration?: string
  registered_owner_country_name?: string
  registered_owner_country_iso_name?: string
  registered_owner_operator_flag_code?: string
  registered_owner?: string
}

interface AircraftDetails {
  type: string | null
  typeDesignator: string | null
  manufacturer: string | null
  registration: string | null
  registeredOwnerCountry: string | null
  registeredOwnerCountryIso: string | null
  registeredOwnerOperatorCode: string | null
  registeredOwner: string | null
}

type RouteConfidence = 'schedule' | 'position-checked' | 'unverified'

interface CurrentPosition {
  lat: number
  lng: number
  heading: number
  velocity: number
}

function finiteParam(value: string | null, min: number, max: number): number | null {
  if (value == null || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) && number >= min && number <= max ? number : null
}

function aircraftDetails(aircraft: AdsbdbAircraft | undefined): AircraftDetails | null {
  if (!aircraft) return null
  return {
    type: aircraft.type?.trim() || null,
    typeDesignator: aircraft.icao_type?.trim() || null,
    manufacturer: aircraft.manufacturer?.trim() || null,
    registration: aircraft.registration?.trim() || null,
    registeredOwnerCountry: aircraft.registered_owner_country_name?.trim() || null,
    registeredOwnerCountryIso: aircraft.registered_owner_country_iso_name?.trim() || null,
    registeredOwnerOperatorCode: aircraft.registered_owner_operator_flag_code?.trim() || null,
    registeredOwner: aircraft.registered_owner?.trim() || null,
  }
}

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const radius = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
    * Math.sin(dLng / 2) ** 2
  return radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function bearingTo(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const y = Math.sin(dLng) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(dLng)
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
}

function angleDifference(a: number, b: number): number {
  return Math.abs(((a - b + 540) % 360) - 180)
}

// Bezplatné callsign databáze mohou vrátit historickou nebo opačnou rotaci.
// Trasu proto pustíme na mapu jen pokud současný ADS-B bod leží v rozumném
// koridoru a rychle letící stroj nemíří zjevně opačným směrem.
function routeFit(
  departure: RouteAirport,
  arrival: RouteAirport,
  current: CurrentPosition | null,
): { valid: boolean; score: number; confidence: RouteConfidence } {
  if (!current || departure.lat == null || departure.lng == null || arrival.lat == null || arrival.lng == null) {
    return { valid: true, score: 1_000_000, confidence: 'unverified' }
  }

  const direct = distanceKm(departure.lat, departure.lng, arrival.lat, arrival.lng)
  if (!Number.isFinite(direct) || direct < 10) return { valid: false, score: Infinity, confidence: 'unverified' }

  const fromDeparture = distanceKm(departure.lat, departure.lng, current.lat, current.lng)
  const toArrival = distanceKm(current.lat, current.lng, arrival.lat, arrival.lng)
  const corridorExcess = Math.max(0, fromDeparture + toArrival - direct)
  const allowedExcess = Math.max(180, direct * 0.35)
  if (corridorExcess > allowedExcess) return { valid: false, score: Infinity, confidence: 'unverified' }

  const desiredBearing = bearingTo(current.lat, current.lng, arrival.lat, arrival.lng)
  const headingDelta = angleDifference(current.heading, desiredBearing)
  const nearEndpoint = Math.min(fromDeparture, toArrival) < 120
  if (current.velocity > 250 && toArrival > 150 && !nearEndpoint && headingDelta > 135) {
    return { valid: false, score: Infinity, confidence: 'unverified' }
  }

  return {
    valid: true,
    score: corridorExcess + (current.velocity > 250 ? headingDelta * 0.5 : 0),
    confidence: 'position-checked',
  }
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
  const { allowed, retryAfter } = checkRateLimit(ip, 'flight-route')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, { status: 429 })
  }

  const icao24 = req.nextUrl.searchParams.get('icao24')?.toLowerCase()
  if (!icao24 || !/^[0-9a-f]{6}$/.test(icao24)) {
    return NextResponse.json({ error: 'Invalid icao24' }, { status: 400 })
  }

  const callsign = (req.nextUrl.searchParams.get('callsign') ?? '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
  const lat = finiteParam(req.nextUrl.searchParams.get('lat'), -90, 90)
  const lng = finiteParam(req.nextUrl.searchParams.get('lng'), -180, 180)
  const heading = finiteParam(req.nextUrl.searchParams.get('heading'), 0, 360)
  const velocity = finiteParam(req.nextUrl.searchParams.get('velocity'), 0, 2_500)
  const current = lat != null && lng != null
    ? { lat, lng, heading: heading ?? 0, velocity: velocity ?? 0 }
    : null

  const aeroConnection = getAeroDataBoxConnection()

  // ── Primárně: AeroDataBox — plánované a provozní údaje o letu ──
  if (aeroConnection) {
    try {
      // Reuse Prague's airport snapshot before requesting a single aircraft.
      const board = await getAeroSnapshot<{ departures?: AeroDataBoxFlight[]; arrivals?: AeroDataBoxFlight[] }>(
        airportFlightsPath('PRG'), airportBoardRefreshSeconds('PRG'),
      ).catch(() => null)
      // FIDS omits the queried airport on its own side of the leg.
      const prg: AeroDataBoxAirport = { iata: 'PRG', icao: 'LKPR' }
      const boardCandidates = [
        ...(board?.data?.departures ?? []).map(flight => ({ ...flight, departure: { ...flight.departure, airport: flight.departure?.airport ?? prg } })),
        ...(board?.data?.arrivals ?? []).map(flight => ({ ...flight, arrival: { ...flight.arrival, airport: flight.arrival?.airport ?? prg } })),
      ]
        .filter(flight => flight.aircraft?.modeS?.toLowerCase() === icao24 &&
          (!callsign || !flight.callSign || flight.callSign.replace(/\s/g, '').toUpperCase() === callsign))
      const snapshot = boardCandidates.length && board
        ? { data: boardCandidates, fetchedAt: board.fetchedAt }
        : await getAeroSnapshot<AeroDataBoxFlight[]>(`/flights/icao24/${icao24}`, 1800)
      if (snapshot.data) {
        const data = snapshot.data
        const candidates = Array.isArray(data) ? data : [data]
        const ranked = candidates.flatMap((candidate) => {
          const departureTime = Date.parse(movementTime(candidate.departure?.revisedTime ?? candidate.departure?.scheduledTime) ?? '')
          const arrivalTime = Date.parse(movementTime(candidate.arrival?.revisedTime ?? candidate.arrival?.scheduledTime) ?? '')
          if (!Number.isFinite(departureTime) && !Number.isFinite(arrivalTime)) return []
          if (departureTime > Date.now() + 90 * 60_000 || arrivalTime < Date.now() - 60 * 60_000) return []
          if (/cancel|divert/i.test(candidate.status ?? '')) return []
          if (callsign && candidate.callSign && candidate.callSign.replace(/\s/g, '').toUpperCase() !== callsign) return []
          const dep = candidate?.departure?.airport
          const arr = candidate?.arrival?.airport
          const depAp = routeAirport(dep)
          const arrAp = routeAirport(arr)
          if (!dep && !arr) return []
          const fit = routeFit(depAp, arrAp, current)
          return fit.valid ? [{ flight: candidate, depAp, arrAp, fit }] : []
        }).sort((a, b) => a.fit.score - b.fit.score)
        const selected = ranked[0]
        const flight = selected?.flight

        if (flight && selected) {
          const d = flight?.departure
          const a = flight?.arrival
          const schedule: FlightSchedule = {
            number:  flight?.number ?? null,
            airline: flight?.airline?.name ?? null,
            status:  flight?.status ?? null,
            depScheduled:   movementTime(d?.scheduledTime),
            depActual:      movementTime(d?.revisedTime ?? d?.predictedTime),
            depTerminal:    d?.terminal ?? null,
            depGate:        d?.gate ?? null,
            depDelayMin:    delayMin(d?.scheduledTime, d?.revisedTime),
            arrScheduled:   movementTime(a?.scheduledTime),
            arrActual:      movementTime(a?.revisedTime ?? a?.predictedTime),
            arrTerminal:    a?.terminal ?? null,
            arrGate:        a?.gate ?? null,
            arrBaggageBelt: a?.baggageBelt ?? null,
            arrDelayMin:    delayMin(a?.scheduledTime, a?.revisedTime ?? a?.predictedTime),
          }
          return NextResponse.json({
            route: { departure: selected.depAp, arrival: selected.arrAp },
            schedule,
            aircraft: flight.aircraft ? {
              type: flight.aircraft.model ?? null, registration: flight.aircraft.reg ?? null,
              typeDesignator: null, manufacturer: null, registeredOwnerCountry: null,
              registeredOwnerCountryIso: null, registeredOwnerOperatorCode: null, registeredOwner: null,
            } : null,
            fetchedAt: snapshot.fetchedAt,
            source: 'aerodatabox',
            confidence: selected.fit.confidence === 'unverified' ? 'schedule' : selected.fit.confidence,
          })
        }
      }
    } catch {
      // fallthrough na adsbdb
    }
  }

  // ── adsbdb.com — zdarma, metadata letadla + případná trasa bez časů ──
  // Dotaz přes ICAO24 vrátí skutečného registrovaného provozovatele a přesný
  // typ. Callsign přidáváme jen kvůli nalezení dvojice letišť.
  try {
    const query = callsign.length >= 3 ? `?callsign=${encodeURIComponent(callsign)}` : ''
    const res = await fetch(`https://api.adsbdb.com/v0/aircraft/${icao24}${query}`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(4000),
    })
    if (res.ok) {
      const data: {
        response?: {
          aircraft?: AdsbdbAircraft
          flightroute?: {
            airline?: { name?: string }
            callsign_iata?: string
            origin?: AdsbdbAirport
            destination?: AdsbdbAirport
          }
        }
      } = await res.json()
      const aircraft = aircraftDetails(data.response?.aircraft)
      const fr = data.response?.flightroute
      const o = fr?.origin
      const d = fr?.destination
      if (o || d) {
        const depAp: RouteAirport = {
          icao: o?.icao_code ?? null, iata: o?.iata_code ?? null,
          name: o?.name ?? null, city: o?.municipality ?? null,
          lat: o?.latitude ?? null, lng: o?.longitude ?? null,
        }
        const arrAp: RouteAirport = {
          icao: d?.icao_code ?? null, iata: d?.iata_code ?? null,
          name: d?.name ?? null, city: d?.municipality ?? null,
          lat: d?.latitude ?? null, lng: d?.longitude ?? null,
        }
        const fit = routeFit(depAp, arrAp, current)
        if (!fit.valid) {
          return NextResponse.json({
            route: null,
            aircraft,
            source: 'adsbdb',
            reason: 'route_position_mismatch',
          })
        }
        // adsbdb nemá časy/brány — jen číslo letu a aerolinku
        const schedule: FlightSchedule = {
          number: fr?.callsign_iata ?? null,
          airline: fr?.airline?.name ?? null,
          status: null,
          depScheduled: null, depActual: null, depTerminal: null, depGate: null, depDelayMin: null,
          arrScheduled: null, arrActual: null, arrTerminal: null, arrGate: null, arrBaggageBelt: null, arrDelayMin: null,
        }
        return NextResponse.json({
          route: { departure: depAp, arrival: arrAp },
          schedule,
          aircraft,
          source: 'adsbdb',
          confidence: fit.confidence,
        })
      }
      if (aircraft) {
        return NextResponse.json({ route: null, aircraft, source: 'adsbdb' })
      }
    }
  } catch {
    // adsbdb selhal — vrátíme prázdno
  }

  // Žádný zdroj nevrátil trasu
  return NextResponse.json({ route: null })
}
