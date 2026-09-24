import 'server-only'
import { ensureSchema, getDb } from '@/lib/db'
import type { RunwayInUseResponse } from '@/lib/runwayInUse'

// Historie odhadu dráhy. Zapisuje se při dotazu na /api/runway-in-use,
// nejvýš jednou za 4 minuty na letiště, takže ji nezahltí ani víc
// otevřených stránek naráz.

const MIN_GAP_MINUTES = 4
export const HISTORY_DAYS = 7
/** Pod tímto počtem měření souhrn nezobrazujeme, byl by náhodný. */
export const MIN_SAMPLES_FOR_SUMMARY = 30

export async function recordRunwayObservation(result: RunwayInUseResponse): Promise<void> {
  const sql = getDb()
  if (!sql) return
  await ensureSchema(sql)
  const primary = result.status === 'ok' ? result.ends[0]?.end ?? null : null
  await sql`
    INSERT INTO runway_observations (airport, status, primary_end, ends, aircraft_used, wind_dir, wind_kt)
    SELECT ${result.airport}, ${result.status}, ${primary}, ${JSON.stringify(result.ends)}::jsonb,
           ${result.aircraftUsed}, ${result.wind?.directionDeg ?? null}, ${result.wind?.speedKt ?? null}
    WHERE NOT EXISTS (
      SELECT 1 FROM runway_observations
      WHERE airport = ${result.airport}
        AND observed_at > now() - make_interval(mins => ${MIN_GAP_MINUTES})
    )`
}

export interface RunwayShare {
  end: string
  count: number
  /** Podíl v procentech, zaokrouhlený. */
  share: number
}

export interface RunwayHistoryResponse {
  available: boolean
  airport: string
  days: number
  samples: number
  ends: RunwayShare[]
  /** Nejčastější práh podle části dne (čas Europe/Prague). */
  byPartOfDay: { part: 'rano' | 'odpoledne' | 'vecer' | 'noc'; end: string; share: number; samples: number }[]
  since: string | null
}

function toShares(rows: { end: string; count: number }[]): RunwayShare[] {
  const total = rows.reduce((sum, row) => sum + row.count, 0)
  return rows
    .map(row => ({ end: row.end, count: row.count, share: total ? Math.round((row.count / total) * 100) : 0 }))
    .sort((a, b) => b.count - a.count)
}

export async function getRunwayHistory(airport: string): Promise<RunwayHistoryResponse> {
  const empty: RunwayHistoryResponse = { available: false, airport, days: HISTORY_DAYS, samples: 0, ends: [], byPartOfDay: [], since: null }
  const sql = getDb()
  if (!sql) return empty
  await ensureSchema(sql)

  const rows = await sql`
    SELECT primary_end AS end,
           CASE
             WHEN EXTRACT(HOUR FROM observed_at AT TIME ZONE 'Europe/Prague') BETWEEN 6 AND 11 THEN 'rano'
             WHEN EXTRACT(HOUR FROM observed_at AT TIME ZONE 'Europe/Prague') BETWEEN 12 AND 17 THEN 'odpoledne'
             WHEN EXTRACT(HOUR FROM observed_at AT TIME ZONE 'Europe/Prague') BETWEEN 18 AND 22 THEN 'vecer'
             ELSE 'noc'
           END AS part,
           COUNT(*)::int AS count,
           MIN(observed_at) AS since
    FROM runway_observations
    WHERE airport = ${airport}
      AND status = 'ok'
      AND primary_end IS NOT NULL
      AND observed_at > now() - make_interval(days => ${HISTORY_DAYS})
    GROUP BY 1, 2` as { end: string; part: RunwayHistoryResponse['byPartOfDay'][number]['part']; count: number; since: string }[]

  const totals = new Map<string, number>()
  const parts = new Map<string, Map<string, number>>()
  let since: string | null = null
  for (const row of rows) {
    totals.set(row.end, (totals.get(row.end) ?? 0) + row.count)
    const bucket = parts.get(row.part) ?? new Map<string, number>()
    bucket.set(row.end, (bucket.get(row.end) ?? 0) + row.count)
    parts.set(row.part, bucket)
    const rowSince = new Date(row.since).toISOString()
    if (!since || rowSince < since) since = rowSince
  }

  const ends = toShares([...totals].map(([end, count]) => ({ end, count })))
  const order = ['rano', 'odpoledne', 'vecer', 'noc'] as const
  const byPartOfDay = order.flatMap(part => {
    const bucket = parts.get(part)
    if (!bucket) return []
    const shares = toShares([...bucket].map(([end, count]) => ({ end, count })))
    const samples = shares.reduce((sum, s) => sum + s.count, 0)
    return shares[0] ? [{ part, end: shares[0].end, share: shares[0].share, samples }] : []
  })

  return {
    available: true,
    airport,
    days: HISTORY_DAYS,
    samples: ends.reduce((sum, s) => sum + s.count, 0),
    ends,
    byPartOfDay,
    since,
  }
}
