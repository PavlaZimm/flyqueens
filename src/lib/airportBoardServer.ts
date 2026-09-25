import 'server-only'
import { after } from 'next/server'
import { recordBoardSnapshot } from '@/lib/boardHistory'
import { getAeroSnapshot, airportFlightsPath } from '@/lib/aerodataboxCache'
import { getAeroDataBoxConnection } from '@/lib/aerodatabox'
import {
  airportBoardRefreshSeconds,
  airportFlightBoardByIata,
  type AirportBoardFlight,
  type AirportBoardResponse,
  type AirportFlightDirection,
} from '@/lib/airportFlightBoards'

// Sestavení letištní tabule sdílí API /api/airport-flights i serverem
// vykreslená stránka odletů. Placená data jdou přes společnou mezipaměť.

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
  return new Date(candidate.replace(' ', 'T')).toISOString()
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

/** Tabule pro letiště podle IATA kódu; null, pokud letiště nepodporujeme. */
export async function getAirportBoard(iata: string): Promise<AirportBoardResponse | null> {
  const response = baseResponse(iata)
  if (!response) return null

  if (!getAeroDataBoxConnection()) {
    return { ...response, message: 'Datová tabule zatím není aktivovaná. Použijte oficiální informace letiště.' }
  }

  try {
    const snapshot = await getAeroSnapshot<AeroFids>(airportFlightsPath(iata), airportBoardRefreshSeconds(iata))
    if (snapshot.data === null) {
      return {
        ...response,
        status: 'ready',
        source: 'aerodatabox',
        fetchedAt: snapshot.fetchedAt,
        message: 'Ve zvoleném časovém okně nejsou dostupné žádné lety.',
      }
    }

    const data = snapshot.data
    const departures = normalizeFlights(data.departures, 'departure')
    const arrivals = normalizeFlights(data.arrivals, 'arrival')
    // Snímek, který už máme zaplacený, si uložíme pro statistiku dochvilnosti.
    after(() => recordBoardSnapshot(iata, snapshot.fetchedAt, [...departures, ...arrivals]).catch((error) => {
      console.error('[airport-board] zápis snímku tabule selhal:', error)
    }))
    return {
      ...response,
      status: 'ready',
      source: 'aerodatabox',
      refreshMinutes: airportBoardRefreshSeconds(iata) / 60,
      fetchedAt: snapshot.fetchedAt,
      departures,
      arrivals,
    }
  } catch {
    return {
      ...response,
      status: 'unavailable',
      message: 'Datová tabule je dočasně nedostupná. Použijte oficiální informace letiště.',
    }
  }
}
