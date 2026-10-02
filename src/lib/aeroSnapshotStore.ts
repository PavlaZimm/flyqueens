import 'server-only'
import { ensureSchema, getDb } from './db'

export interface StoredAeroSnapshot {
  data: unknown | null
  fetchedAt: string | null
  retryAt: number
}
async function database() {
  const sql = getDb()
  if (!sql) throw new Error('AeroDataBox cache storage unavailable')
  await ensureSchema(sql)
  return sql
}

export async function readAeroSnapshot(key: string): Promise<StoredAeroSnapshot | null> {
  const sql = await database()
  const rows = await sql`SELECT payload, fetched_at, extract(epoch FROM retry_at) * 1000 AS retry_ms
    FROM aero_response_cache WHERE cache_key = ${key}`
  const row = rows[0]
  return row ? { data: row.payload, fetchedAt: row.fetched_at ? new Date(row.fetched_at).toISOString() : null,
    retryAt: Number(row.retry_ms) || 0 } : null
}

/** Atomic lease shared by pages, route handlers, regions and deployments. */
export async function claimAeroSnapshot(key: string, token: string, seconds: number): Promise<boolean> {
  const sql = await database()
  const rows = await sql`INSERT INTO aero_response_cache (cache_key, lease_token, lease_until, expires_at)
    VALUES (${key}, ${token}, now() + interval '30 seconds', now() + ${seconds * 2} * interval '1 second')
    ON CONFLICT (cache_key) DO UPDATE SET lease_token = EXCLUDED.lease_token,
      lease_until = EXCLUDED.lease_until, expires_at = EXCLUDED.expires_at
    WHERE (aero_response_cache.fetched_at IS NULL OR aero_response_cache.fetched_at <= now() - ${seconds} * interval '1 second')
      AND (aero_response_cache.lease_until IS NULL OR aero_response_cache.lease_until <= now())
      AND (aero_response_cache.retry_at IS NULL OR aero_response_cache.retry_at <= now())
    RETURNING cache_key`
  return rows.length > 0
}

export async function saveAeroSnapshot(key: string, token: string, data: unknown, fetchedAt: string, seconds: number): Promise<void> {
  const sql = await database()
  const rows = await sql`UPDATE aero_response_cache SET payload = ${JSON.stringify(data)}::jsonb,
    fetched_at = ${fetchedAt}::timestamptz, expires_at = ${fetchedAt}::timestamptz + ${seconds * 2} * interval '1 second',
    lease_token = NULL, lease_until = NULL, retry_at = NULL
    WHERE cache_key = ${key} AND lease_token = ${token} RETURNING cache_key`
  if (!rows.length) throw new Error('AeroDataBox refresh lease expired')
  // A working cache, not a flight archive. Bound retention and cleanup work.
  await sql`DELETE FROM aero_response_cache WHERE cache_key IN (
    SELECT cache_key FROM aero_response_cache WHERE expires_at < now()
      AND (lease_until IS NULL OR lease_until < now()) LIMIT 100
  )`.catch(() => { console.warn('[aero-cache] Expired entry cleanup unavailable') })
}

export async function failAeroSnapshot(key: string, token: string, retryAt: string): Promise<void> {
  const sql = await database()
  await sql`UPDATE aero_response_cache SET lease_token = NULL, lease_until = NULL,
    retry_at = ${retryAt}::timestamptz WHERE cache_key = ${key} AND lease_token = ${token}`
}

/** One provider request at a time, then at least 1.1 seconds before the next. */
export async function claimAeroProvider(key: string, token: string): Promise<boolean> {
  const sql = await database()
  const rows = await sql`INSERT INTO aero_provider_gate (provider_key, lease_token, available_at)
    VALUES (${key}, ${token}, now() + interval '15 seconds')
    ON CONFLICT (provider_key) DO UPDATE SET lease_token = EXCLUDED.lease_token, available_at = EXCLUDED.available_at
    WHERE aero_provider_gate.available_at <= now() RETURNING provider_key`
  return rows.length > 0
}
export async function releaseAeroProvider(key: string, token: string): Promise<void> {
  const sql = await database()
  await sql`UPDATE aero_provider_gate SET lease_token = NULL, available_at = now() + interval '1.1 seconds'
    WHERE provider_key = ${key} AND lease_token = ${token}`
}
