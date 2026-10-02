import { normalizeFlight, normalizedAirport, type AeroFlight } from './aeroFlight'
import type { AirportBoardFlight } from './airportFlightBoards'

export function pragueDate(now = new Date()): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Prague' }).format(now)
}
export function searchDateBounds(now = new Date()) {
  const today = Date.parse(`${pragueDate(now)}T12:00:00Z`)
  const date = (days: number) => new Date(today + days * 86400000).toISOString().slice(0, 10)
  return { min: date(-7), max: date(30) }
}
export function validateFlightSearch(number: string, date: string, now = new Date()) {
  const normalized = number.trim().toUpperCase().replace(/\s+/g, '')
  if (!/^(?:[A-Z0-9]{2}|[A-Z]{3})[0-9]{1,4}[A-Z]?$/.test(normalized) || !/[A-Z]/.test(normalized.slice(0, 2))) {
    return { error: 'Zadejte číslo letu z letenky, například QS1000 nebo LH1393.' } as const
  }
  const parsed = new Date(`${date}T12:00:00Z`)
  const bounds = searchDateBounds(now)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date || date < bounds.min || date > bounds.max) {
    return { error: 'Vyberte datum odletu v rozmezí posledních 7 a příštích 30 dnů.' } as const
  }
  return { number: normalized, date } as const
}
export interface SearchedFlight {
  board: AirportBoardFlight
  departure: { airport: ReturnType<typeof normalizedAirport>; scheduled: string | null; revised: string | null; terminal: string | null; gate: string | null }
  arrival: SearchedFlight['departure']
}
function localTime(time?: { local?: string; utc?: string }): string | null {
  return time?.local ?? (time?.utc ? `${time.utc} (UTC)` : null)
}
export function normalizeSearchResults(data: AeroFlight[] | null, date: string): SearchedFlight[] {
  const seen = new Set<string>()
  return (Array.isArray(data) ? data : []).slice(0, 30).flatMap((flight, index) => {
    if (!flight || typeof flight !== 'object') return []
    // Provider query already restricts departure date; reject an explicitly
    // contradictory local date, never infer a local calendar day from UTC.
    const departureDay = flight.departure?.scheduledTime?.local?.slice(0, 10)
    if (departureDay && departureDay !== date) return []
    const board = normalizeFlight(flight, 'departure', index)
    if (!board) return []
    const key = `${board.number}:${board.scheduledTime}:${flight.departure?.airport?.iata}:${flight.arrival?.airport?.iata}`
    if (seen.has(key)) return []
    seen.add(key)
    const movement = (value: AeroFlight['departure']) => ({
      airport: normalizedAirport(value?.airport), scheduled: localTime(value?.scheduledTime), revised: localTime(value?.revisedTime),
      terminal: value?.terminal?.slice(0, 12) ?? null, gate: value?.gate?.slice(0, 20) ?? null,
    })
    return [{ board, departure: movement(flight.departure), arrival: movement(flight.arrival) }]
  })
}
export interface FlightSearchResponse { flights: SearchedFlight[]; fetchedAt: string; number: string; date: string }
export function flightStatus(status: string): string {
  const labels: Record<string, string> = { scheduled: 'Plánováno', expected: 'Očekává se', checkin: 'Odbavení', boarding: 'Nástup', gateclosed: 'Gate uzavřen', departed: 'Odletělo', enroute: 'Na cestě', approaching: 'Přibližuje se', arrived: 'Přistálo', delayed: 'Zpožděno', canceled: 'Zrušeno', cancelled: 'Zrušeno', diverted: 'Odkloněno', unknown: 'Bez potvrzení' }
  return labels[status.toLowerCase().replace(/[^a-z]/g, '')] ?? status
}
