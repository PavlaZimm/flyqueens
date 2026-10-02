// Integration test against an isolated local PostgreSQL database. No provider network/key.
// AERO_TEST_DATABASE_URL must name a disposable database on localhost.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import ts from 'typescript'
const exec = promisify(execFile)
const url = process.env.AERO_TEST_DATABASE_URL
if (!url || !['localhost', '127.0.0.1'].includes(new URL(url).hostname)
  || !new URL(url).pathname.startsWith('/flyqueens_cache_test')) throw Error('Use an isolated localhost flyqueens_cache_test database')
const literal = v => v == null ? 'NULL' : typeof v === 'number' ? String(v) : `'${String(v).replaceAll("'", "''")}'`
async function query(statement) {
  const returns = /^\s*SELECT\b/i.test(statement) || /\bRETURNING\b/i.test(statement)
  const command = returns ? `WITH result AS (${statement}) SELECT coalesce(json_agg(result), '[]') FROM result` : statement
  const { stdout } = await exec('psql', [url, '-X', '-qAt', '-v', 'ON_ERROR_STOP=1', '-c', command], { timeout: 15000, maxBuffer: 4e6 })
  return returns ? JSON.parse(stdout) : []
}
const sql = (strings, ...values) => query(strings.reduce((s, p, i) => s + p + (i < values.length ? literal(values[i]) : ''), ''))
function load(file, deps = {}, overrides = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const compiledModule = { exports: {} }
  new Function('require', 'module', 'exports', 'fetch', 'process', source)(name => {
    if (name in deps) return deps[name]
    throw Error(`Unexpected dependency: ${name}`)
  }, compiledModule, compiledModule.exports, overrides.fetch, { env: { VERCEL_ENV: overrides.environment ?? 'production', NEXT_PHASE: overrides.phase } })
  return compiledModule.exports
}
const db = load('src/lib/db.ts', { 'server-only': {}, '@neondatabase/serverless': { neon: () => sql } })
const dbDeps = { getDb: () => sql, ensureSchema: db.ensureSchema }
const costs = load('src/lib/aeroEndpointCost.ts')
const budget = load('src/lib/aeroBudget.ts', { 'server-only': {}, './db': dbDeps, './aeroEndpointCost': costs })
const store = load('src/lib/aeroSnapshotStore.ts', { 'server-only': {}, './db': dbDeps })
const baseUrl = 'https://provider.invalid'
const path = '/flights/airports/iata/PRG?direction=Both'
const key = p => crypto.createHash('sha256').update(`aero-v2:${baseUrl}:${p}`).digest('hex')
let calls = 0
let response = () => Response.json({ arrivals: [{ number: 'TEST123' }] })
let starts = []
const client = (options = {}) => load('src/lib/aerodataboxCache.ts', {
  'server-only': {}, 'node:crypto': crypto,
  './aerodatabox': { getAeroDataBoxConnection: () => ({ baseUrl, headers: {} }) },
  './aeroBudget': budget, './aeroEndpointCost': costs, './aeroSnapshotStore': options.store ?? store,
}, { fetch: async () => { calls++; starts.push(Date.now()); return response() }, ...options })
async function reset() {
  await query('TRUNCATE aero_response_cache, aero_provider_gate, aero_daily_usage')
  calls = 0; starts = []; response = () => Response.json({ arrivals: [] })
}
async function age(seconds) {
  await sql`UPDATE aero_response_cache SET fetched_at = now() - ${seconds} * interval '1 second'`
}
await db.ensureSchema(sql)
await reset()
try {
  // Twelve independently loaded modules simulate separate serverless instances.
  const snapshots = await Promise.all(Array.from({ length: 12 }, () => client().getAeroSnapshot(path, 1800)))
  assert.equal(calls, 1, 'Cross-instance cold reads must buy once')
  assert.ok(snapshots.every(s => s.fetchedAt === snapshots[0].fetchedAt))
  const later = await client().getAeroSnapshot(path, 1800)
  assert.equal(later.fetchedAt, snapshots[0].fetchedAt, 'A new deployment must retain the timestamp')
  assert.equal(calls, 1)
  const usage = await query('SELECT board_units, lookup_units FROM aero_daily_usage')
  assert.deepEqual(usage, [{ board_units: 2, lookup_units: 0 }])

  const preview = client({ environment: 'preview' })
  assert.equal((await preview.getAeroSnapshot(path, 1800)).fetchedAt, later.fetchedAt)
  await assert.rejects(preview.getAeroSnapshot('/aircrafts/reg/D-TEST', 86400))
  await assert.rejects(client({ environment: 'development' }).getAeroSnapshot('/aircrafts/reg/D-TEST', 86400))
  await assert.rejects(client({ phase: 'phase-production-build' }).getAeroSnapshot('/aircrafts/reg/D-TEST', 86400))
  assert.equal(calls, 1, 'Preview, development and builds must not buy data')
  await assert.rejects(client().getAeroSnapshot('/unbudgeted', 60))
  assert.equal(calls, 1)

  await assert.rejects(client({ store: { ...store, readAeroSnapshot: async () => { throw Error('Database offline') } } }).getAeroSnapshot(path, 1800), /Database offline/)
  assert.equal(calls, 1, 'Database outage must fail closed without buying data')

  await reset()
  response = () => new Response(null, { status: 204 })
  const empty = await client().getAeroSnapshot(path, 1800)
  assert.equal(empty.data, null)
  assert.equal((await client().getAeroSnapshot(path, 1800)).fetchedAt, empty.fetchedAt)
  assert.equal(calls, 1, 'No-data responses must be cached too')

  // Upstream failure retains the original timestamp for at most 2 x TTL.
  await age(1900)
  await query("UPDATE aero_provider_gate SET available_at = now() - interval '1 second'")
  const stale = await store.readAeroSnapshot(key(path))
  response = () => new Response(null, { status: 503 })
  assert.equal((await client().getAeroSnapshot(path, 1800)).fetchedAt, stale.fetchedAt)
  assert.equal((await client().getAeroSnapshot(path, 1800)).fetchedAt, stale.fetchedAt)
  assert.equal(calls, 2, 'Failed refresh must have a shared cooldown')
  await age(3601)
  await assert.rejects(client().getAeroSnapshot(path, 1800), /expired/)
  assert.equal(calls, 2, 'Expired snapshots must not be relabelled fresh')

  await reset()
  await query("INSERT INTO aero_daily_usage(day, board_units, lookup_units) VALUES ((now() AT TIME ZONE 'UTC')::date, 128, 22)")
  await assert.rejects(client().getAeroSnapshot(path, 1800))
  const blocked = await store.readAeroSnapshot(key(path))
  assert.ok(blocked.retryAt > Date.now())
  assert.equal(new Date(blocked.retryAt).toISOString().slice(11), '00:00:00.000Z')
  await assert.rejects(client().getAeroSnapshot(path, 1800))
  assert.equal(calls, 0, 'Daily limit must prevent provider calls even across instances')

  await reset()
  await query("INSERT INTO aero_daily_usage(day, board_units, lookup_units) VALUES ((now() AT TIME ZONE 'UTC')::date, 126, 22)")
  const reservations = await Promise.allSettled(Array.from({ length: 10 }, () => budget.reserveAeroUnits(path)))
  assert.equal(reservations.filter(r => r.status === 'fulfilled').length, 1)
  assert.deepEqual(await query('SELECT board_units, lookup_units FROM aero_daily_usage'), [{ board_units: 128, lookup_units: 22 }])
  await assert.rejects(budget.reserveAeroUnits('/aircrafts/reg/D-TEST'), budget.AeroBudgetExceeded)

  await reset()
  await query("INSERT INTO aero_daily_usage(day, board_units, lookup_units) VALUES ((now() AT TIME ZONE 'UTC')::date, 0, 22)")
  await assert.rejects(budget.reserveAeroUnits('/aircrafts/reg/D-TEST'), budget.AeroBudgetExceeded)
  await budget.reserveAeroUnits(path)
  assert.deepEqual(await query('SELECT board_units, lookup_units FROM aero_daily_usage'), [{ board_units: 2, lookup_units: 22 }])

  await reset()
  assert.equal(await store.claimAeroSnapshot('lease', 'old', 1800), true)
  assert.equal(await store.claimAeroSnapshot('lease', 'other', 1800), false)
  await query("UPDATE aero_response_cache SET lease_until = now() - interval '1 second'")
  assert.equal(await store.claimAeroSnapshot('lease', 'new', 1800), true)
  await assert.rejects(store.saveAeroSnapshot('lease', 'old', {}, new Date().toISOString(), 1800))
  await store.failAeroSnapshot('lease', 'old', new Date(Date.now() + 60000).toISOString())
  await store.saveAeroSnapshot('lease', 'new', { owner: 'new' }, new Date().toISOString(), 1800)
  assert.deepEqual((await store.readAeroSnapshot('lease')).data, { owner: 'new' })

  await reset()
  await Promise.all([client().getAeroSnapshot(path, 1800), client().getAeroSnapshot('/aircrafts/reg/D-TEST', 86400)])
  assert.equal(calls, 2)
  assert.ok(starts[1] - starts[0] >= 1100, 'Provider pacing must span separate instances and endpoints')
  console.log('PASS: PostgreSQL shared cache, concurrent cold reads, timestamp/204, preview/build isolation, cooldown, expiry, atomic budget, lease recovery and global pacing.')
} finally {
  await reset()
}
