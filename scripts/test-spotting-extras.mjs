import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import ts from 'typescript'
const require = createRequire(import.meta.url)
function load(file, deps = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  const compiled = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => { if (name in deps) return deps[name]; throw Error(name) }, compiled, compiled.exports)
  return compiled.exports
}
const search = load('src/lib/flightSearch.ts', { './aeroFlight': load('src/lib/aeroFlight.ts') })
const light = load('src/lib/pragueLight.ts', { suncalc: require('suncalc'), './flightSearch': search })
const now = Date.parse('2026-10-02T10:30:00Z')
const solar = light.pragueLight(now)
// Cross-check the observed provider time ~16:41 UTC to within 3 min; local model uses a flat horizon.
assert.ok(Math.abs(Date.parse(solar.sunset) - Date.parse('2026-10-02T16:41:00Z')) < 180000)
assert.ok(Date.parse(solar.sunrise) < Date.parse(solar.goldenHourStart))
assert.ok(Date.parse(solar.goldenHourStart) < Date.parse(solar.sunset))
assert.ok(Date.parse(solar.sunset) < Date.parse(solar.duskCivil))
assert.ok(solar.sunsetAzimuth > 250 && solar.sunsetAzimuth < 280, 'Autumn sunset must point west, in degrees from north')
assert.equal(light.compass(0), 'sever')
assert.equal(light.compass(270), 'západ')
for (const instant of ['2026-10-02T22:30:00Z', '2026-03-28T23:30:00Z', '2026-10-25T00:30:00Z', '2026-10-25T01:30:00Z']) {
  const result = light.pragueLight(Date.parse(instant))
  assert.equal(search.pragueDate(new Date(result.sunset)), search.pragueDate(new Date(instant)), 'Prague day must survive midnight and DST')
}
let paid = 0
const route = load('src/app/api/aero-insights/route.ts', {
  'next/server': { NextResponse: { json: (value, options) => Response.json(value, options) } },
  '@/lib/pragueLight': light,
  '@/lib/aeroInsights': { insightRequest: () => { throw Error('Sun must bypass paid spec') } },
  '@/lib/aerodataboxCache': { getAeroSnapshot: () => { paid++; throw Error('No paid sun lookup') } },
  '@/lib/rateLimit': { checkRateLimit: () => ({ allowed: true }), clientKey: () => 'test' },
})
assert.equal((await route.GET({ nextUrl: new URL('https://test.invalid/?kind=sun') })).status, 200)
assert.equal(paid, 0)
const forecast = load('src/lib/spottingForecast.ts', { './metar': load('src/lib/metar.ts') })
const period = (from, to, extra = {}) => ({ from, to, becomingAt: null, change: null, probability: null, windDir: 150, windVariable: false, windSpeed: 4, windGust: null, visibility: '6+', weather: 'NSW', clouds: [{ cover: 'NSC' }], ...extra })
const taf = { icao: 'LKPR', issueTime: '2026-10-02T08:00:00Z', validFrom: '2026-10-02T09:00:00Z', validTo: '2026-10-03T15:00:00Z', forecasts: [
  period('2026-10-02T09:00:00Z','2026-10-02T10:00:00Z'),
  period('2026-10-02T10:00:00Z','2026-10-03T15:00:00Z',{ change: 'BECMG', becomingAt: '2026-10-02T12:00:00Z', windDir: 330 }),
  period('2026-10-02T11:00:00Z','2026-10-02T13:00:00Z',{ change: 'TEMPO', probability: 30, weather: 'RA' }),
] }
const transition = forecast.forecastAt(taf, Date.parse('2026-10-02T11:30:00Z'), now)
assert.equal(transition.changing, true)
assert.equal(transition.previous.windDir, 150)
assert.equal(transition.base.windDir, 330)
assert.equal(transition.alternatives[0].probability, 30)
const after = forecast.forecastAt(taf, Date.parse('2026-10-02T12:00:00Z'), now)
assert.equal(after.changing, false)
assert.equal(after.previous, null)
assert.equal(forecast.forecastAt(taf, Date.parse(taf.validTo), now), null, 'Validity end is exclusive')
assert.equal(forecast.forecastAt(taf, Date.parse(taf.validFrom) - 1, now), null)
assert.equal(forecast.forecastAt(taf, now + 13 * 3600000, now + 13 * 3600000), null, 'Old issue must not look fresh')
assert.equal(forecast.forecastAt({ ...taf, validTo: null }, now, now), null)
assert.match(forecast.forecastText(period('', '', { windDir: 0, windSpeed: 0, visibility: '' })), /vítr 0 km\/h z 0°/)
assert.doesNotMatch(forecast.forecastText(period('', '', { visibility: '' })), /dohlednost/)
assert.match(forecast.forecastText(period('', '', { visibility: 0.31 })), /0,5 km/)
const { summarizeSpotting } = load('src/lib/spottingHistory.ts')
const rows = []
for (const day of [30, 29, 28]) for (const hour of [8,9]) for (const minute of [0,15,30,45]) {
  rows.push({ observed_at: `2026-09-${day}T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00Z`, status: 'ok', primary_end: '24', aircraft_used: 2 })
}
rows.push({ ...rows[0], observed_at: rows[0].observed_at.replace(':00Z', ':01Z') })
rows.push({ ...rows[0], observed_at: '2026-09-01T08:00:00Z' })
rows.push({ ...rows[0], observed_at: '2026-10-03T08:00:00Z' })
const history = summarizeSpotting(rows, now)
assert.equal(history.samples, 24, 'Duplicate buckets, old and future samples must be excluded')
assert.equal(history.observedDays, 3)
assert.equal(history.hours.length, 2)
assert.equal(history.hours[0].hour, 10, 'Hours use Prague time')
assert.equal(history.hours[0].samples, 12)
assert.equal(history.hours[0].averageAircraft, 2)
assert.equal(history.ends[0].share, 100)
assert.equal(summarizeSpotting([], now).samples, 0)
console.log('PASS: local solar/no paid calls, Prague midnight/DST, TAF validity/BECMG/TEMPO/probability/units, sparse and deduplicated history.')
