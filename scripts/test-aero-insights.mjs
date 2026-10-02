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
console.log('Aero insights: cost tiers, endpoint allow-list, bounded date ranges, missing data, medians and route-statistic semantics passed.')
