// Regression checks: no network or credentials. Runs the actual route modules.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
function load(file, dependencies, fetchImpl) {
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const compiledModule = { exports: {} }
  new Function('require', 'module', 'exports', 'fetch', source)(name => {
    if (name in dependencies) return dependencies[name]
    throw new Error(`Unexpected dependency: ${name}`)
  }, compiledModule, compiledModule.exports, fetchImpl)
  return compiledModule.exports
}
const request = url => ({ nextUrl: new URL(url, 'https://flyqueens.test'), headers: new Headers() })
const next = { NextResponse: { json: (body, options) => Response.json(body, options) } }
const now = Date.now()
const stamp = new Date(now - 60_000).toISOString()
const movement = (airport, delta) => ({ airport, scheduledTime: { utc: new Date(now + delta * 60_000).toISOString() }, revisedTime: { utc: new Date(now + (delta + 5) * 60_000).toISOString() } })
const prg = { iata: 'PRG', icao: 'LKPR', name: 'Praha', location: { lat: 50.1, lon: 14.26 } }
const fra = { iata: 'FRA', icao: 'EDDF', name: 'Frankfurt', location: { lat: 50.0, lon: 8.5 } }
const flight = { number: 'LH 1234', callSign: 'DLH1234', status: 'EnRoute', departure: movement(fra, -40), arrival: movement(prg, 40), aircraft: { modeS: 'abcdef', reg: 'D-TEST', model: 'Airbus A320' }, airline: { name: 'Lufthansa' } }
const boards = load(path.resolve('src/lib/airportFlightBoards.ts'), {})
let paidPaths = [], data = { arrivals: [flight], departures: [] }, singles = [flight]
const deps = {
  'next/server': next,
  '@/lib/aerodatabox': { getAeroDataBoxConnection: () => ({}) },
  '@/lib/rateLimit': { checkRateLimit: () => ({ allowed: true }) },
  '@/lib/airportFlightBoards': boards,
  '@/lib/aerodataboxCache': { airportFlightsPath: code => `/board/${code}`, getAeroSnapshot: async p => { paidPaths.push(p); return { data: p.startsWith('/board') ? data : singles, fetchedAt: stamp } } },
}
const route = load('src/app/api/flight-route/route.ts', deps, async () => Response.json({ response: {} }))
const airport = load('src/app/api/airport-flights/route.ts', deps)
;(async () => {
  assert.equal((await route.GET(request('/?icao24=invalid'))).status, 400)
  assert.equal(paidPaths.length, 0)
  const first = await (await route.GET(request('/?icao24=abcdef&callsign=DLH1234'))).json()
  assert.equal(first.source, 'aerodatabox')
  assert.equal(first.schedule.depDelayMin, 5)
  assert.equal(first.fetchedAt, stamp)
  assert.equal(first.aircraft.registration, 'D-TEST')
  assert.deepEqual(paidPaths, ['/board/PRG'], 'Radar must reuse the airport response')
  data.arrivals.unshift({ ...flight, departure: movement(fra, -500), arrival: movement(prg, -400) })
  const selected = await (await route.GET(request('/?icao24=abcdef&callsign=DLH1234'))).json()
  assert.equal(selected.schedule.arrScheduled, flight.arrival.scheduledTime.utc, 'Old rotation must not win')
  const mismatch = await (await route.GET(request('/?icao24=abcdef&callsign=OTHER'))).json()
  assert.equal(mismatch.route, null, 'Different callsign must not get a paid schedule')
  data = { departures: [flight, flight], arrivals: [] }
  const board = await (await airport.GET(request('/?airport=PRG'))).json()
  assert.equal(board.departures.length, 1)
  assert.equal(board.fetchedAt, stamp)
  assert.equal(board.refreshMinutes, 60)
  assert.equal(board.departures[0].oppositeAirport.iata, 'PRG')
  assert.equal((await airport.GET(request('/?airport=UNSUPPORTED'))).status, 400)

  let fetches = 0
  const values = new Map()
  const cacheModule = load('src/lib/aerodataboxCache.ts', {
    'server-only': {},
    'next/cache': { unstable_cache: (fn, keys) => async () => { const key = keys.join('|'); if (!values.has(key)) values.set(key, await fn()); return values.get(key) } },
    './aerodatabox': { getAeroDataBoxConnection: () => ({ baseUrl: 'https://test.invalid', headers: {} }) },
  }, async () => { fetches++; return Response.json({ arrivals: [flight] }) })
  const snapshots = await Promise.all(Array.from({ length: 6 }, () => cacheModule.getAeroSnapshot('/flights/test', 1800)))
  const later = await cacheModule.getAeroSnapshot('/flights/test', 1800)
  assert.equal(fetches, 1, 'Concurrent readers and later readers share one paid call')
  assert.equal(later.fetchedAt, snapshots[0].fetchedAt, 'Cache reads retain original retrieval time')
  console.log('AeroDataBox: validation, shared cache, timestamps, rotation matching, fallback and board normalization passed.')
})().catch(error => { console.error(error); process.exitCode = 1 })
