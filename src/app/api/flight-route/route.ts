import { NextRequest, NextResponse } from 'next/server'
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
  airline?: { name?: string }
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

interface AdsbdbAirport {
  icao_code?: string
  iata_code?: string
  name?: string
  municipality?: string
  latitude?: number
  longitude?: number
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

  const aeroKey  = process.env.AERODATABOX_API_KEY
  const aeroBase = process.env.AERODATABOX_BASE_URL

  // ── Primárně: AeroDataBox — přesná data z flight plánu ──
  if (aeroKey && aeroBase) {
    try {
      const url = `${aeroBase}/flights/icao24/${icao24}`
      const res = await fetch(url, {
        headers: {
          'x-api-market-key': aeroKey,
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(8000),
      })

      if (res.ok) {
        const data: AeroDataBoxFlight[] | AeroDataBoxFlight = await res.json()
        const flight = Array.isArray(data) ? data[0] : data

        const dep = flight?.departure?.airport
        const arr = flight?.arrival?.airport

        if (dep || arr) {
          const depAp: RouteAirport = {
            icao: dep?.icao ?? null,
            iata: dep?.iata ?? null,
            name: dep?.name ?? null,
            city: dep?.municipalityName ?? null,
            lat:  dep?.location?.lat ?? null,
            lng:  dep?.location?.lon ?? null,
          }
          const arrAp: RouteAirport = {
            icao: arr?.icao ?? null,
            iata: arr?.iata ?? null,
            name: arr?.name ?? null,
            city: arr?.municipalityName ?? null,
            lat:  arr?.location?.lat ?? null,
            lng:  arr?.location?.lon ?? null,
          }
          const d = flight?.departure
          const a = flight?.arrival
          const schedule: FlightSchedule = {
            number:  flight?.number ?? null,
            airline: flight?.airline?.name ?? null,
            status:  flight?.status ?? null,
            depScheduled:   d?.scheduledTime?.local ?? null,
            depActual:      d?.revisedTime?.local ?? d?.predictedTime?.local ?? null,
            depTerminal:    d?.terminal ?? null,
            depGate:        d?.gate ?? null,
            depDelayMin:    delayMin(d?.scheduledTime, d?.revisedTime),
            arrScheduled:   a?.scheduledTime?.local ?? null,
            arrActual:      a?.revisedTime?.local ?? a?.predictedTime?.local ?? null,
            arrTerminal:    a?.terminal ?? null,
            arrGate:        a?.gate ?? null,
            arrBaggageBelt: a?.baggageBelt ?? null,
            arrDelayMin:    delayMin(a?.scheduledTime, a?.revisedTime ?? a?.predictedTime),
          }
          return NextResponse.json({ route: { departure: depAp, arrival: arrAp }, schedule, source: 'aerodatabox' })
        }
      }
    } catch {
      // fallthrough na adsbdb
    }
  }

  // ── adsbdb.com — zdarma, callsign → trasa (bez časů/zpoždění) ──
  // Náhrada za AeroDataBox trasu, když předplatné není aktivní.
  if (callsign.length >= 3) {
    try {
      const res = await fetch(`https://api.adsbdb.com/v0/callsign/${callsign}`, {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(6000),
      })
      if (res.ok) {
        const data: {
          response?: { flightroute?: {
            airline?: { name?: string }
            callsign_iata?: string
            origin?: AdsbdbAirport
            destination?: AdsbdbAirport
          } }
        } = await res.json()
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
          // adsbdb nemá časy/brány — jen číslo letu a aerolinku
          const schedule: FlightSchedule = {
            number: fr?.callsign_iata ?? null,
            airline: fr?.airline?.name ?? null,
            status: null,
            depScheduled: null, depActual: null, depTerminal: null, depGate: null, depDelayMin: null,
            arrScheduled: null, arrActual: null, arrTerminal: null, arrGate: null, arrBaggageBelt: null, arrDelayMin: null,
          }
          return NextResponse.json({ route: { departure: depAp, arrival: arrAp }, schedule, source: 'adsbdb' })
        }
      }
    } catch {
      // adsbdb selhal — vrátíme prázdno
    }
  }

  // Žádný zdroj nevrátil trasu
  return NextResponse.json({ route: null })
}
