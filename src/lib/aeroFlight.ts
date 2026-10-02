import type { AirportBoardFlight, AirportFlightDirection } from './airportFlightBoards'

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

export interface AeroFlight {
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

function clean(value: unknown, maxLength = 120): string | null {
  if (typeof value !== 'string') return null
  const text = value.replace(/[\u0000-\u001f\u007f]/g, '').trim()
  return text ? text.slice(0, maxLength) : null
}

function iso(value: AeroDateTime | undefined): string | null {
  const candidate = clean(value?.utc ?? value?.local, 40)
  if (!candidate || !Number.isFinite(Date.parse(candidate))) return null
  return new Date(candidate.replace(' ', 'T')).toISOString()
}

export function normalizedAirport(airport: AeroAirport | undefined) {
  return {
    name: clean(airport?.shortName ?? airport?.name),
    city: clean(airport?.municipalityName),
    iata: clean(airport?.iata, 4)?.toUpperCase() ?? null,
    icao: clean(airport?.icao, 5)?.toUpperCase() ?? null,
  }
}

export function normalizeFlight(
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

