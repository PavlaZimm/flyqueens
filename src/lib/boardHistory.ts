import 'server-only'
import { ensureSchema, getDb } from '@/lib/db'
import type { AirportBoardFlight } from '@/lib/airportFlightBoards'

// Ukládá tabule letů, které už stejně stahujeme (a platíme) kvůli
// stránkám odletů. Každý snímek se zapíše jen jednou; u letu se drží
// poslední známý stav a revidovaný čas, z nichž se později počítá
// dochvilnost. Nic se kvůli tomu nestahuje navíc.

export async function recordBoardSnapshot(
  iata: string,
  fetchedAt: string,
  flights: AirportBoardFlight[],
): Promise<void> {
  const sql = getDb()
  if (!sql || !flights.length) return
  await ensureSchema(sql)

  const inserted = await sql`
    INSERT INTO board_snapshots (airport, fetched_at) VALUES (${iata}, ${fetchedAt})
    ON CONFLICT DO NOTHING
    RETURNING airport`
  if (!inserted.length) return

  const unique = new Map<string, AirportBoardFlight>()
  for (const flight of flights) {
    if (!flight.scheduledTime) continue
    unique.set(`${flight.direction}|${flight.number}|${flight.scheduledTime}`, flight)
  }
  const rows = [...unique.values()]
  if (!rows.length) return

  await sql`
    INSERT INTO board_flights (airport, direction, number, scheduled_at, revised_at, status, airline, opposite_iata, is_cargo)
    SELECT ${iata}, * FROM unnest(
      ${rows.map(f => f.direction)}::text[],
      ${rows.map(f => f.number)}::text[],
      ${rows.map(f => f.scheduledTime)}::timestamptz[],
      ${rows.map(f => f.revisedTime)}::timestamptz[],
      ${rows.map(f => f.status)}::text[],
      ${rows.map(f => f.airline)}::text[],
      ${rows.map(f => f.oppositeAirport.iata)}::text[],
      ${rows.map(f => f.isCargo)}::boolean[]
    )
    ON CONFLICT (airport, direction, number, scheduled_at) DO UPDATE SET
      revised_at = COALESCE(EXCLUDED.revised_at, board_flights.revised_at),
      status = EXCLUDED.status,
      airline = COALESCE(EXCLUDED.airline, board_flights.airline),
      last_seen = now()`
}
