import 'server-only'
import { getDb, ensureSchema } from './db'
import { summarizeSpotting, type SpottingObservation, type SpottingHistory } from './spottingHistory'
export async function getSpottingHistory(): Promise<SpottingHistory> {
  const sql = getDb()
  if (!sql) return { ...summarizeSpotting([], Date.now()), available: false }
  await ensureSchema(sql)
  // Existing (airport, observed_at DESC) index bounds the scan to one week.
  const rows = await sql`SELECT DISTINCT ON (floor(extract(epoch FROM observed_at) / 900))
      observed_at, status, primary_end, aircraft_used
    FROM runway_observations
    WHERE airport = 'LKPR' AND observed_at > now() - interval '7 days' AND observed_at <= now()
    ORDER BY floor(extract(epoch FROM observed_at) / 900), observed_at DESC, id DESC` as SpottingObservation[]
  return summarizeSpotting(rows.map(row => ({ ...row, observed_at: new Date(row.observed_at).toISOString() })), Date.now())
}
