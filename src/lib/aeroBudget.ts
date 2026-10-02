import 'server-only'
import { ensureSchema, getDb } from './db'

import { aeroEndpointCost } from './aeroEndpointCost'

// All instances share a 150-unit UTC daily ceiling (4,650 units / 31 days).
// Lookups can use up to 60 units, leaving at least 90 for airport boards.
// Count attempted calls conservatively; cache hits do not consume units.
export async function reserveAeroUnits(path: string): Promise<void> {
  const cost = aeroEndpointCost(path)
  if (!cost) throw new Error('Unbudgeted AeroDataBox endpoint')
  const { board, units } = cost
  const sql = getDb()
  if (!sql) throw new Error('AeroDataBox budget storage unavailable')
  await ensureSchema(sql)
  const rows = await sql`
    INSERT INTO aero_daily_usage (day, board_units, lookup_units)
    VALUES ((now() AT TIME ZONE 'UTC')::date, ${board ? units : 0}, ${board ? 0 : units})
    ON CONFLICT (day) DO UPDATE SET
      board_units = aero_daily_usage.board_units + EXCLUDED.board_units,
      lookup_units = aero_daily_usage.lookup_units + EXCLUDED.lookup_units,
      updated_at = now()
    WHERE aero_daily_usage.board_units + EXCLUDED.board_units <= 128
      AND aero_daily_usage.lookup_units + EXCLUDED.lookup_units <= 60
      AND aero_daily_usage.board_units + aero_daily_usage.lookup_units
        + EXCLUDED.board_units + EXCLUDED.lookup_units <= 150
    RETURNING board_units, lookup_units`
  if (!rows.length) throw new Error('AeroDataBox daily allowance reached')
  console.info('[aero-budget]', { boardUnits: rows[0].board_units, lookupUnits: rows[0].lookup_units, dailyLimit: 150 })
}
