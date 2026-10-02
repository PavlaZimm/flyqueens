import 'server-only'
import { createHash, randomUUID } from 'node:crypto'
import { getAeroDataBoxConnection } from './aerodatabox'
import { AeroBudgetExceeded, reserveAeroUnits } from './aeroBudget'
import { aeroEndpointCost } from './aeroEndpointCost'
import { readAeroSnapshot, claimAeroSnapshot, saveAeroSnapshot, failAeroSnapshot,
  claimAeroProvider, releaseAeroProvider, type StoredAeroSnapshot } from './aeroSnapshotStore'

export interface AeroSnapshot<T> { data: T | null; fetchedAt: string }
const pending = new Map<string, Promise<AeroSnapshot<unknown>>>()
const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const hash = (value: string) => createHash('sha256').update(value).digest('hex')

function usable(row: StoredAeroSnapshot | null, seconds: number): AeroSnapshot<unknown> | null {
  if (!row?.fetchedAt) return null
  const age = Date.now() - Date.parse(row.fetchedAt)
  return Number.isFinite(age) && age >= 0 && age < seconds * 1000
    ? { data: row.data, fetchedAt: row.fetchedAt } : null
}

async function sharedSnapshot(path: string, seconds: number): Promise<AeroSnapshot<unknown>> {
  const connection = getAeroDataBoxConnection()
  if (!connection) throw new Error('AeroDataBox is not configured')
  if (!aeroEndpointCost(path) || !Number.isFinite(seconds) || seconds < 1 || seconds > 86400) {
    throw new Error('Unbudgeted AeroDataBox request')
  }
  // Explicit stable identity, independent of bundler output or deployment hash.
  const provider = hash(connection.baseUrl)
  const key = hash(`aero-v2:${connection.baseUrl}:${path}`)
  let stored = await readAeroSnapshot(key)
  const fresh = usable(stored, seconds)
  if (fresh) return fresh
  const fallback = () => {
    const stale = usable(stored, seconds * 2)
    if (stale) return stale // original timestamp remains visible; never extend it
    throw new Error('AeroDataBox snapshot unavailable or expired')
  }
  // Previews/builds/development must not buy data or drain the production budget.
  if (process.env.VERCEL_ENV !== 'production' || process.env.NEXT_PHASE === 'phase-production-build') return fallback()
  if (stored && stored.retryAt > Date.now()) return fallback()

  const token = randomUUID()
  if (!await claimAeroSnapshot(key, token, seconds)) {
    if (usable(stored, seconds * 2)) return fallback()
    // Cold concurrent reader: wait briefly for the lease owner, never buy again.
    for (const delay of [300, 700, 1500, 3000]) {
      await pause(delay)
      stored = await readAeroSnapshot(key)
      const result = usable(stored, seconds * 2)
      if (result) return result
      if (stored && stored.retryAt > Date.now()) break
    }
    return fallback()
  }

  let providerClaimed = false
  let attempted = false
  try {
    for (let attempt = 0; attempt < 7; attempt++) {
      providerClaimed = await claimAeroProvider(provider, token)
      if (providerClaimed) break
      if (attempt < 6) await pause(500)
    }
    if (!providerClaimed) throw new Error('AeroDataBox is busy')
    await reserveAeroUnits(path)
    attempted = true
    const response = await fetch(`${connection.baseUrl}${path}`, {
      headers: connection.headers, cache: 'no-store', signal: AbortSignal.timeout(5000),
    })
    console.info('[aero-fetch]', { path, status: response.status, environment: process.env.VERCEL_ENV })
    if (!response.ok) throw new Error(`AeroDataBox status ${response.status}`)
    const result = { data: response.status === 204 ? null : await response.json(), fetchedAt: new Date().toISOString() }
    await saveAeroSnapshot(key, token, result.data, result.fetchedAt, seconds)
    return result
  } catch (error) {
    // Cache failed attempts too: no repeat paid retries on every page view.
    const now = new Date()
    const retryAt = error instanceof AeroBudgetExceeded
      ? Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
      : now.getTime() + (attempted ? (aeroEndpointCost(path)?.board ? seconds * 1000 : 60000) : 5000)
    await failAeroSnapshot(key, token, new Date(retryAt).toISOString())
    console.warn('[aero-cache-refresh]', { path, attempted, reason: error instanceof Error ? error.message : 'Unavailable' })
    return fallback()
  } finally {
    if (providerClaimed) await releaseAeroProvider(provider, token)
  }
}

export async function getAeroSnapshot<T>(path: string, seconds: number): Promise<AeroSnapshot<T>> {
  const key = `${seconds}:${path}`
  let request = pending.get(key)
  if (!request) { request = sharedSnapshot(path, seconds); pending.set(key, request) }
  try { return await request as AeroSnapshot<T> }
  finally { if (pending.get(key) === request) pending.delete(key) }
}

export function airportFlightsPath(iata: string): string {
  const query = new URLSearchParams({ offsetMinutes: '-120', durationMinutes: '720', direction: 'Both',
    withLeg: 'true', withCancelled: 'true', withCodeshared: 'false', withCargo: 'true', withPrivate: 'true', withLocation: 'false' })
  return `/flights/airports/iata/${iata}?${query}`
}
