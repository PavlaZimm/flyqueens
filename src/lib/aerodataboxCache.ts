import 'server-only'
import { unstable_cache } from 'next/cache'
import { getAeroDataBoxConnection } from './aerodatabox'

// Classic Data Cache: this project does not enable Cache Components yet.
// The captured timestamp is cached with the data, not reset on each page view.
export interface AeroSnapshot<T> { data: T | null; fetchedAt: string }
const pending = new Map<string, Promise<AeroSnapshot<unknown>>>()
let queue: Promise<unknown> = Promise.resolve()
let nextRequestAt = 0
let queued = 0

async function fetchSnapshot(path: string): Promise<AeroSnapshot<unknown>> {
  const connection = getAeroDataBoxConnection()
  if (!connection) throw new Error('AeroDataBox is not configured')
  if (queued >= 4) throw new Error('AeroDataBox is busy')
  queued++
  const request = queue.catch(() => undefined).then(async () => {
    const wait = nextRequestAt - Date.now()
    if (wait > 0) await new Promise(resolve => setTimeout(resolve, wait))
    nextRequestAt = Date.now() + 1100
    const response = await fetch(`${connection.baseUrl}${path}`, {
      headers: connection.headers, cache: 'no-store', signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) throw new Error(`AeroDataBox status ${response.status}`)
    return { data: response.status === 204 ? null : await response.json(), fetchedAt: new Date().toISOString() }
  })
  queue = request
  try { return await request } finally { queued-- }
}

export async function getAeroSnapshot<T>(path: string, seconds: number): Promise<AeroSnapshot<T>> {
  const key = `${seconds}:${path}`
  let request = pending.get(key)
  if (!request) {
    const cached = unstable_cache(() => fetchSnapshot(path), ['aerodatabox-v1', path], { revalidate: seconds })
    request = cached()
    pending.set(key, request)
  }
  try {
    const result = await request as AeroSnapshot<T>
    // Stale-while-revalidate may return old cache after an outage. Never present
    // snapshots older than twice the normal interval as current information.
    if (Date.now() - Date.parse(result.fetchedAt) > seconds * 2000) throw new Error('AeroDataBox snapshot expired')
    return result
  } finally { if (pending.get(key) === request) pending.delete(key) }
}

export function airportFlightsPath(iata: string): string {
  const query = new URLSearchParams({ offsetMinutes: '-120', durationMinutes: '720', direction: 'Both',
    withLeg: 'true', withCancelled: 'true', withCodeshared: 'false', withCargo: 'true', withPrivate: 'true', withLocation: 'false' })
  return `/flights/airports/iata/${iata}?${query}`
}
