'use client'

export type RadarPoint = {
  id: string
  callsign: string
  x: number
  y: number
  heading: number
  altitude: number
}

export type FlightSummary = {
  count: number
  airborne: number
  onGround: number
  avgAltitude: number
  avgSpeed: number
  source: string | null
  fetchedAt: number | null
  status: 'live' | 'stale' | 'unavailable'
  altitudeBands: { low: number; medium: number; high: number }
  radar: RadarPoint[]
}

export const EMPTY_FLIGHT_SUMMARY: FlightSummary = {
  count: 0,
  airborne: 0,
  onGround: 0,
  avgAltitude: 0,
  avgSpeed: 0,
  source: null,
  fetchedAt: null,
  status: 'unavailable',
  altitudeBands: { low: 0, medium: 0, high: 0 },
  radar: [],
}

let cachedSummary: FlightSummary | null = null
let cachedUntil = 0
let pendingRequest: Promise<FlightSummary> | null = null

function numberOrZero(value: unknown): number {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

function normalizeSummary(input: Partial<FlightSummary>): FlightSummary {
  return {
    count: numberOrZero(input.count),
    airborne: numberOrZero(input.airborne),
    onGround: numberOrZero(input.onGround),
    avgAltitude: numberOrZero(input.avgAltitude),
    avgSpeed: numberOrZero(input.avgSpeed),
    source: typeof input.source === 'string' ? input.source : null,
    fetchedAt: numberOrZero(input.fetchedAt) || null,
    status: input.status === 'live' || input.status === 'stale' ? input.status : 'unavailable',
    altitudeBands: {
      low: numberOrZero(input.altitudeBands?.low),
      medium: numberOrZero(input.altitudeBands?.medium),
      high: numberOrZero(input.altitudeBands?.high),
    },
    radar: Array.isArray(input.radar)
      ? input.radar.filter((flight): flight is RadarPoint => (
          Boolean(flight?.id)
          && Number.isFinite(flight.x)
          && Number.isFinite(flight.y)
          && Number.isFinite(flight.heading)
        ))
      : [],
  }
}

// Homepage používá stejný souhrn pro live badge i radarový graf. Sdílená
// Promise sloučí souběžné mounty do jediného HTTP požadavku a osm sekund drží
// výsledek pro další komponentu či rychlý návrat na stránku.
export function fetchFlightSummary(): Promise<FlightSummary> {
  if (cachedSummary && Date.now() < cachedUntil) return Promise.resolve(cachedSummary)
  if (pendingRequest) return pendingRequest

  pendingRequest = fetch('/api/flights?summary=1', {
    signal: AbortSignal.timeout(6500),
  })
    .then(async (response) => {
      const input = await response.json() as Partial<FlightSummary>
      if (!response.ok) throw new Error('Souhrn provozu není dostupný')
      const summary = normalizeSummary(input)
      cachedSummary = summary
      cachedUntil = Date.now() + 8_000
      return summary
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}
