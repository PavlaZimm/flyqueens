import 'server-only'
import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// Neon Postgres připojený přes integraci Vercelu. Integrace nastaví
// DATABASE_URL (případně POSTGRES_URL). Bez ní web běží dál, jen si nic
// nepamatuje – historie a statistiky se pak nezobrazí.

let client: NeonQueryFunction<false, false> | null | undefined
let schemaReady: Promise<void> | null = null

export function getDb(): NeonQueryFunction<false, false> | null {
  if (client !== undefined) return client
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? null
  client = url ? neon(url) : null
  return client
}

/** Tabulky se zakládají samy při prvním zápisu; každá instance to ověří jen jednou. */
export function ensureSchema(sql: NeonQueryFunction<false, false>): Promise<void> {
  schemaReady ??= (async () => {
    await sql`CREATE TABLE IF NOT EXISTS runway_observations (
      id BIGSERIAL PRIMARY KEY,
      airport TEXT NOT NULL,
      observed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      status TEXT NOT NULL,
      primary_end TEXT,
      ends JSONB NOT NULL,
      aircraft_used INT NOT NULL,
      wind_dir INT,
      wind_kt INT
    )`
    await sql`CREATE INDEX IF NOT EXISTS runway_observations_airport_time ON runway_observations (airport, observed_at DESC)`
    await sql`CREATE TABLE IF NOT EXISTS board_snapshots (
      airport TEXT NOT NULL,
      fetched_at TIMESTAMPTZ NOT NULL,
      PRIMARY KEY (airport, fetched_at)
    )`
    await sql`CREATE TABLE IF NOT EXISTS board_flights (
      airport TEXT NOT NULL,
      direction TEXT NOT NULL,
      number TEXT NOT NULL,
      scheduled_at TIMESTAMPTZ NOT NULL,
      revised_at TIMESTAMPTZ,
      status TEXT NOT NULL,
      airline TEXT,
      opposite_iata TEXT,
      is_cargo BOOLEAN NOT NULL DEFAULT false,
      first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
      last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (airport, direction, number, scheduled_at)
    )`
    await sql`CREATE INDEX IF NOT EXISTS board_flights_airport_time ON board_flights (airport, scheduled_at DESC)`
  })().catch((error) => {
    schemaReady = null
    throw error
  })
  return schemaReady
}
