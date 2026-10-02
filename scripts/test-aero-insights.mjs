import assert from 'node:assert/strict'
import fs from 'node:fs'
import ts from 'typescript'
function load(file, deps = {}) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const compiled = { exports: {} }
  new Function('require','module','exports',code)(name => { if (name in deps) return deps[name]; throw Error(name) }, compiled, compiled.exports)
  return compiled.exports
}
const search = load('src/lib/flightSearch.ts', { './aeroFlight': load('src/lib/aeroFlight.ts') })
const { insightRequest, normalizeInsight, durationMinutes } = load('src/lib/aeroInsights.ts', { './flightSearch': search })
const { aeroEndpointCost } = load('src/lib/aeroEndpointCost.ts')
const now = new Date('2026-10-02T08:00:00Z')
for (const [kind,id,units] of [['aircraft','D-AIBF',1],['registrations','D-AIBF',1],['sun','',1],['destinations','',6],['airport-delays','',6],['flight-delays','LH1393',6],['history','LH1393',6],['schedule','LH1393',6]]) {
 const spec = insightRequest(kind,id,now)
 assert.ok(spec)
 assert.equal(aeroEndpointCost(spec.path).units,units,kind)
}
assert.equal(insightRequest('aircraft','../../secret',now),null)
assert.equal(insightRequest('history','bad-id',now),null)
assert.equal(insightRequest('unknown','LH1393',now),null)
assert.equal(aeroEndpointCost('/flights/number/LH1393/2026-10-02').units,2)
assert.equal(aeroEndpointCost('/flights/number/LH1393/2026-10-02/2026-10-08').units,6)
assert.equal(aeroEndpointCost('/airports/iata/ABC/delays'),null)
assert.match(insightRequest('history','LH1393',now).path,/2026-09-25\/2026-10-01/)
assert.match(insightRequest('schedule','LH1393',now).path,/2026-10-02\/2026-10-08/)
assert.equal(durationMinutes('-00:15:00'),'-15 min')
assert.equal(durationMinutes('1.01:30:00'),'1530 min')
assert.equal(durationMinutes(null),'Neuvedeno')
assert.equal(normalizeInsight('aircraft',null).sections.length,0)
const aircraft=normalizeInsight('aircraft',{reg:'D-TEST',ageYears:0,numSeats:0,isFreighter:false})
assert.equal(aircraft.sections[0].rows.find(r=>r.label==='Počet sedadel podle zdroje').value,'0')
assert.equal(aircraft.sections[0].rows.find(r=>r.label==='Počet motorů').value,'Neuvedeno')
const routes=normalizeInsight('destinations',{routes:[{destination:{iata:'FRA'},averageDailyFlights:2.5,operators:[{name:'Lufthansa'}]}]})
assert.match(routes.sections[0].rows[0].value,/Průměr/)
assert.match(routes.note,/není počet potvrzených/)
const delays=normalizeInsight('airport-delays',{departuresDelayInformation:{numTotal:10,numQualifiedTotal:4,numCancelled:0,medianDelay:'-00:05:00'}})
assert.equal(delays.sections[0].rows[1].value,'4')
assert.equal(delays.sections[0].rows[3].value,'-5 min')
const { spottingHighlight, sunsetCountdown } = load('src/lib/spottingHighlights.ts')
for (const model of ['Airbus A380-800','A388','Boeing 747-8','B744']) assert.equal(spottingHighlight({aircraft:{model},isCargo:false}).tone,'gold')
for (const model of ['Airbus A330-300','Boeing 787-8','A359','B77W']) assert.equal(spottingHighlight({aircraft:{model},isCargo:false}).tone,'blue')
assert.equal(spottingHighlight({aircraft:{model:'Airbus A320'},isCargo:false}),null)
assert.equal(spottingHighlight({aircraft:null,isCargo:false}),null)
assert.equal(spottingHighlight({aircraft:null,isCargo:true}).title,'Nákladní let')
assert.equal(sunsetCountdown('2026-10-02T18:00:00Z',Date.parse('2026-10-02T17:00:00Z')),'Do západu 1 h 0 min')
assert.equal(sunsetCountdown('2026-10-02T18:00:00Z',Date.parse('2026-10-02T19:00:00Z')),'Slunce už dnes zapadlo')
assert.equal(normalizeInsight('sun',{sunset:{utc:'2026-10-02 16:42Z'}}).solar.sunset,'2026-10-02T16:42:00.000Z')
const { weatherVisual } = load('src/lib/weatherVisual.ts')
const sun = { sunrise:'2026-10-02T05:00:00Z', sunset:'2026-10-02T17:00:00Z' }
const sky = (weather = null, cover = 'SKC') => ({weather,clouds:[{cover}],rawMetar:''})
assert.equal(weatherVisual(sky(),sun,now.getTime()).icon,'☀️')
assert.equal(weatherVisual(sky(),sun,Date.parse('2026-10-02T20:00:00Z')).icon,'🌙')
assert.equal(weatherVisual(sky('TSRA'),sun,now.getTime()).label,'Bouřka')
assert.equal(weatherVisual(sky('FZRA'),sun,now.getTime()).label,'Mrznoucí srážky')
assert.equal(weatherVisual(sky(null,'OVC'),sun,now.getTime()).label,'Zataženo')
assert.equal(weatherVisual(sky('FG'),sun,now.getTime()).label,'Mlha')
assert.equal(weatherVisual({weather:null,clouds:[],rawMetar:null},null,now.getTime()).label,'Stav oblohy neuveden')
const { sunsetArrivals, arrivalCountdown } = load('src/lib/spottingPlanner.ts', { './flightSearch': search })
const testFlight = (id, at, status = 'Expected', revisedTime = null) => ({id,scheduledTime:at,revisedTime,status})
const eveningNow = Date.parse('2026-10-02T14:00:00Z')
const sunset = '2026-10-02T16:41:00Z'
const candidates = [
 testFlight('before','2026-10-02T15:40:00Z'), testFlight('start','2026-10-02T15:41:00Z'),
 testFlight('end','2026-10-02T17:11:00Z'), testFlight('late','2026-10-02T17:12:00Z'),
 testFlight('cancelled','2026-10-02T16:00:00Z','Cancelled'), testFlight('arrived','2026-10-02T16:00:00Z','Arrived'),
 testFlight('revised','2026-10-02T15:00:00Z','Expected','2026-10-02T16:00:00Z'), testFlight('invalid','bad'),
]
assert.deepEqual(sunsetArrivals(candidates,sunset,eveningNow).flights.map(f=>f.id),['start','revised','end'])
assert.equal(sunsetArrivals(candidates,null,eveningNow),null)
assert.equal(sunsetArrivals(candidates,'2026-10-01T16:41:00Z',eveningNow),null)
assert.equal(sunsetArrivals(candidates,sunset,Date.parse('2026-10-02T18:00:00Z')).ended,true)
assert.equal(sunsetArrivals(candidates,sunset,Date.parse('2026-10-02T16:30:00Z')).flights.length,1)
assert.equal(arrivalCountdown(candidates[1],eveningNow),'za 1 h 41 min')
console.log('Aero insights: cost tiers, endpoint allow-list, bounded date ranges, missing data, medians and route-statistic semantics passed.')
