import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'
function load(file, dependencies = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const compiledModule = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => {
    if (name in dependencies) return dependencies[name]
    throw new Error(`Unexpected dependency: ${name}`)
  }, compiledModule, compiledModule.exports)
  return compiledModule.exports
}
const normalization = load('src/lib/aeroFlight.ts')
const search = load('src/lib/flightSearch.ts', { './aeroFlight': normalization })
const now = new Date('2026-10-02T12:00:00Z')
for (const number of ['QS1000', 'LH1393', 'U21234', '3V123', 'TVS1234', 'QS12A']) assert.equal(search.validateFlightSearch(number, '2026-10-02', now).number, number)
assert.equal(search.validateFlightSearch(' qs 1000 ', '2026-10-02', now).number, 'QS1000')
for (const number of ['../../', '123456', 'ABCDE12', 'QS123456', 'OK-ABC', 'abcdef']) assert.ok(search.validateFlightSearch(number, '2026-10-02', now).error)
for (const date of ['2026-09-31', '2026-02-29', '2026-12-01', '2026-09-24', 'foo']) assert.ok(search.validateFlightSearch('QS1000', date, now).error)
assert.equal(search.pragueDate(new Date('2026-10-02T23:00:00Z')), '2026-10-03')
const raw = { number: 'QS1000', status: 'Scheduled', departure: { airport: { iata: 'PRG' }, scheduledTime: { local: '2026-10-02 23:30+02:00', utc: '2026-10-02 21:30Z' } }, arrival: { airport: { iata: 'DXB' }, scheduledTime: { local: '2026-10-03 07:00+04:00' } }, aircraft: { reg: 'OK-TEST' } }
assert.equal(search.normalizeSearchResults([raw, raw], '2026-10-02').length, 1)
assert.equal(search.normalizeSearchResults([raw], '2026-10-03').length, 0, 'Arrival date must not select yesterday’s departure')
assert.equal(search.normalizeSearchResults([raw], '2026-10-02')[0].arrival.scheduled, '2026-10-03 07:00+04:00')
assert.equal(search.normalizeSearchResults(null, '2026-10-02').length, 0)
const { upcomingArrivals } = load('src/lib/pragueToday.ts')
const make = (status, hours) => ({ status, scheduledTime: new Date(+now + hours * 3600000).toISOString() })
assert.deepEqual(upcomingArrivals([make('Arrived', 1), make('Canceled', 2), make('Scheduled', -1), make('Scheduled', 7), make('EnRoute', 2), make('Scheduled', 1)], +now).map(f => f.status), ['Scheduled', 'EnRoute'])
let calls = 0
const next = { NextResponse: { json: (body, options) => Response.json(body, options) } }
const route = load('src/app/api/flight-search/route.ts', { 'next/server': next, '@/lib/flightSearch': search, '@/lib/rateLimit': { clientKey: () => 'test', checkRateLimit: () => ({ allowed: true }) }, '@/lib/aerodataboxCache': { getAeroSnapshot: async path => { calls++; assert.match(path, /dateLocalRole=Departure/); return { data: [raw], fetchedAt: now.toISOString() } } } })
const req = (number, date) => ({ nextUrl: new URL(`https://example.test/?${new URLSearchParams({ number, date })}`) })
assert.equal((await route.GET(req('../', search.pragueDate()))).status, 400)
assert.equal(calls, 0, 'Invalid input must never spend units')
assert.equal((await route.GET(req('QS1000', search.pragueDate()))).status, 200)
assert.equal(calls, 1)
// Exercise the reservation boundary and the SQL contract used for atomic limits.
let queryCalls = 0, allowed = true
const sql = async (strings, ...values) => {
  queryCalls++
  const query = strings.join('?')
  assert.match(query, /ON CONFLICT \(day\) DO UPDATE/)
  assert.match(query, /board_units \+ EXCLUDED.board_units <= 128/)
  assert.match(query, /lookup_units \+ EXCLUDED.lookup_units <= 22/)
  assert.equal(values.reduce((a, b) => a + b, 0), 2)
  return allowed ? [{ board_units: 0, lookup_units: 2 }] : []
}
const budget = load('src/lib/aeroBudget.ts', { 'server-only': {}, './db': { getDb: () => sql, ensureSchema: async () => {} } })
await budget.reserveAeroUnits('/flights/number/QS1000/2026-10-02')
allowed = false
await assert.rejects(() => budget.reserveAeroUnits('/flights/icao24/abcdef'), /allowance/)
await assert.rejects(() => budget.reserveAeroUnits('/expensive/unknown'), /Unbudgeted/)
assert.equal(queryCalls, 2)
const missing = load('src/lib/aeroBudget.ts', { 'server-only': {}, './db': { getDb: () => null } })
await assert.rejects(() => missing.reserveAeroUnits('/flights/number/QS1000/2026-10-02'), /unavailable/)
console.log('Flight search: input/date validation, overnight legs, normalization, upcoming arrivals, no-spend invalid requests, and quota refusal passed.')
