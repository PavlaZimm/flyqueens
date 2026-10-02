import 'server-only'
import { ensureSchema, getDb } from './db'

// Tier 2 endpoints only. Separate allowances keep public lookups from consuming
// the board reserve: 128 + 22 = 150 units/day, at most 4,650 in 31 days.
// Count attempts conservatively, including errors. Cache hits never get here.
export async function reserveAeroUnits(path: string): Promise<void> {
  const board = /^\/flights\/airports\/iata\/(PRG|BRQ|OSR|PED|KLV)\?/.test(path)
  const lookup = /^\/flights\/(number|icao24)\//.test(path)
  if (!board && !lookup) throw new Error('Unbudgeted AeroDataBox endpoint')
  const sql = getDb()
  if (!sql) throw new Error('AeroDataBox budget storage unavailable')
  await ensureSchema(sql)
  const rows = await sql`
    INSERT INTO aero_daily_usage (day, board_units, lookup_units)
    VALUES ((now() AT TIME ZONE 'UTC')::date, ${board ? 2 : 0}, ${board ? 0 : 2})
    ON CONFLICT (day) DO UPDATE SET
      board_units = aero_daily_usage.board_units + EXCLUDED.board_units,
      lookup_units = aero_daily_usage.lookup_units + EXCLUDED.lookup_units,
      updated_at = now()
    WHERE aero_daily_usage.board_units + EXCLUDED.board_units <= 128
      AND aero_daily_usage.lookup_units + EXCLUDED.lookup_units <= 22
    RETURNING board_units, lookup_units`
  if (!rows.length) throw new Error('AeroDataBox daily allowance reached')
  console.info('[aero-budget]', { boardUnits: rows[0].board_units, lookupUnits: rows[0].lookup_units, dailyLimit: 150 })
}
