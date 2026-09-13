import { NextRequest, NextResponse } from 'next/server'
import { getAeroDataBoxConnection } from '@/lib/aerodatabox'
import {
  airportFlightBoardByIata,
  type AirportBoardFlight,
  type AirportBoardResponse,
  type AirportFlightDirection,
} from '@/lib/airportFlightBoards'
import { checkRateLimit } from '@/lib/rateLimit'

interface AeroDateTime {
  utc?: string
  local?: string
}

interface AeroAirport {
  icao?: string
  iata?: string
  name?: string
  shortName?: string
  municipalityName?: string
}

interface AeroMovement {
  airport?: AeroAirport
  scheduledTime?: AeroDateTime
  revisedTime?: AeroDateTime
  terminal?: string
  gate?: string
  checkInDesk?: string
  baggageBelt?: string
  quality?: string[]
}

interface AeroFlight {
  movement?: AeroMovement
  departure?: AeroMovement
  arrival?: AeroMovement
  number?: string
  callSign?: string
  status?: string
  isCargo?: boolean
  airline?: { name?: string }
  aircraft?: { reg?: string; modeS?: string; model?: string }
}

interface AeroFids {
  departures?: AeroFlight[] | null
  arrivals?: AeroFlight[] | null
}

function clean(value: unknown, maxLength = 120): string | null {
  if (typeof value !== 'string') return null
  const text = value.replace(/[\u0000-\u001f\u007f]/g, '').trim()
  return text ? text.slice(0, maxLength) : null
}

function iso(value: AeroDateTime | undefined): string | null {
  const candidate = clean(value?.local ?? value?.utc, 40)
  if (!candidate || !Number.isFinite(Date.parse(candidate))) return null
  return candidate
}

function normalizedAirport(airport: AeroAirport | undefined) {
  return {
    name: clean(airport?.shortName ?? airport?.name),
    city: clean(airport?.municipalityName),
    iata: clean(airport?.iata, 4)?.toUpperCase() ?? null,
    icao: clean(airport?.icao, 5)?.toUpperCase() ?? null,
  }
}

function normalizeFlight(
  flight: AeroFlight,
  direction: AirportFlightDirection,
  index: number,
): AirportBoardFlight | null {
  const number = clean(flight.number, 12)
  if (!number) return null

  const ownMovement = direction === 'departure'
    ? flight.departure ?? flight.movement
    : flight.arrival ?? flight.movement
  const oppositeMovement = direction === 'departure' ? flight.arrival : flight.departure
  const scheduledTime = iso(ownMovement?.scheduledTime)
  const revisedTime = iso(ownMovement?.revisedTime)
  const callSign = clean(flight.callSign, 12)?.toUpperCase() ?? null
  const modeS = clean(flight.aircraft?.modeS, 8)?.toLowerCase() ?? null
  const registration = clean(flight.aircraft?.reg, 16)?.toUpperCase() ?? null

  return {
    id: `${direction}-${number}-${scheduledTime ?? index}`,
    direction,
    number,
    callSign,
    airline: clean(flight.airline?.name),
    status: clean(flight.status, 30) ?? 'Unknown',
    scheduledTime,
    revisedTime,
    terminal: clean(ownMovement?.terminal, 12),
    gate: clean(ownMovement?.gate, 20),
    checkInDesk: clean(ownMovement?.checkInDesk, 30),
    baggageBelt: clean(ownMovement?.baggageBelt, 20),
    oppositeAirport: normalizedAirport(oppositeMovement?.airport ?? ownMovement?.airport),
    aircraft: flight.aircraft ? {
      registration,
      modeS,
      model: clean(flight.aircraft.model, 80),
    } : null,
    isCargo: flight.isCargo === true,
    hasLiveData: ownMovement?.quality?.includes('Live') === true,
  }
}

function timeValue(flight: AirportBoardFlight): number {
  const time = flight.revisedTime ?? flight.scheduledTime
  return time ? Date.parse(time) || Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER
}

function normalizeFlights(flights: AeroFlight[] | null | undefined, direction: AirportFlightDirection) {
  const seen = new Set<string>()
  return (Array.isArray(flights) ? flights : [])
    .slice(0, 300)
    .map((flight, index) => normalizeFlight(flight, direction, index))
    .filter((flight): flight is AirportBoardFlight => {
      if (!flight) return false
      const key = `${flight.number}:${flight.scheduledTime ?? ''}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => timeValue(a) - timeValue(b))
    .slice(0, 120)
}

function baseResponse(iata: string): AirportBoardResponse | null {
  const airport = airportFlightBoardByIata(iata)
  if (!airport) return null
  return {
    status: 'unconfigured',
    airport: {
      name: airport.name,
      iata: airport.iata,
      icao: airport.icao,
      officialFlightsUrl: airport.officialFlightsUrl,
    },
    departures: [],
    arrivals: [],
    fetchedAt: null,
    source: 'official',
  }
}

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? '127.0.0.1'
  const { allowed, retryAfter } = checkRateLimit(ip, 'airport-flights')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) },
    })
  }

  const iata = (request.nextUrl.searchParams.get('airport') ?? '').trim().toUpperCase()
  const response = baseResponse(iata)
  if (!response) return NextResponse.json({ error: 'Unsupported airport' }, { status: 400 })

  const connection = getAeroDataBoxConnection()
  if (!connection) {
    return NextResponse.json({
      ...response,
      message: 'Datová tabule zatím není aktivovaná. Použijte oficiální informace letiště.',
    }, {
      headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600' },
    })
  }

  const url = new URL(`${connection.baseUrl}/flights/airports/iata/${iata}`)
  url.searchParams.set('offsetMinutes', '-120')
  url.searchParams.set('durationMinutes', '720')
  url.searchParams.set('direction', 'Both')
  url.searchParams.set('withLeg', 'true')
  url.searchParams.set('withCancelled', 'true')
  url.searchParams.set('withCodeshared', 'false')
  url.searchParams.set('withCargo', 'true')
  url.searchParams.set('withPrivate', 'true')
  url.searchParams.set('withLocation', 'false')

  try {
    const upstream = await fetch(url, {
      headers: connection.headers,
      next: { revalidate: iata === 'PRG' ? 300 : 600 },
      signal: AbortSignal.timeout(7000),
    })

    if (upstream.status === 204) {
      return NextResponse.json({
        ...response,
        status: 'ready',
        source: 'aerodatabox',
        fetchedAt: new Date().toISOString(),
        message: 'Ve zvoleném časovém okně nejsou dostupné žádné lety.',
      })
    }

    if (!upstream.ok) {
      return NextResponse.json({
        ...response,
        status: 'unavailable',
        message: 'Datová tabule je dočasně nedostupná. Použijte oficiální informace letiště.',
      }, { status: 502 })
    }

    const data = await upstream.json() as AeroFids
    return NextResponse.json({
      ...response,
      status: 'ready',
      source: 'aerodatabox',
      fetchedAt: new Date().toISOString(),
      departures: normalizeFlights(data.departures, 'departure'),
      arrivals: normalizeFlights(data.arrivals, 'arrival'),
    }, {
      headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=600' },
    })
  } catch {
    return NextResponse.json({
      ...response,
      status: 'unavailable',
      message: 'Datová tabule je dočasně nedostupná. Použijte oficiální informace letiště.',
    }, { status: 502 })
  }
}
