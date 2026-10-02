import { pragueDate, validateFlightSearch, flightStatus } from './flightSearch'
export type InsightKind = 'aircraft' | 'registrations' | 'flight-delays' | 'history' | 'schedule' | 'airport-delays' | 'destinations' | 'sun'
export interface InsightSection { title: string; rows: { label: string; value: string; href?: string }[] }
export interface SolarTimes { sunrise: string | null; sunset: string | null; dawnCivil: string | null; duskCivil: string | null }
export interface InsightData { solar?: SolarTimes; sections: InsightSection[]; note: string; fetchedAt: string }
type Obj = Record<string, unknown>
const obj = (v: unknown): Obj => v && typeof v === 'object' && !Array.isArray(v) ? v as Obj : {}
const arr = (v: unknown): unknown[] => Array.isArray(v) ? v : []
const str = (v: unknown): string => typeof v === 'string' ? v.replace(/[\u0000-\u001f]/g, '').slice(0, 180) : ''
const num = (v: unknown): number | null => typeof v === 'number' && Number.isFinite(v) ? v : null
const text = (v: unknown) => str(v) || (num(v) !== null ? String(v) : 'Neuvedeno')
function dayOffset(day: string, amount: number) { return new Date(Date.parse(`${day}T12:00:00Z`) + amount * 86400000).toISOString().slice(0, 10) }
export function insightRequest(kind: string, id: string, now = new Date()): { kind: InsightKind; path: string; ttl: number } | null {
  const today = pragueDate(now)
  if (kind === 'sun') return { kind, path: `/airports/iata/PRG/time/solar/${today}`, ttl: 86400 }
  if (kind === 'destinations') return { kind, path: `/airports/iata/PRG/stats/routes/daily/${today}`, ttl: 21600 }
  if (kind === 'airport-delays') return { kind, path: '/airports/iata/PRG/delays', ttl: 21600 }
  const normalized = id.trim().toUpperCase().replace(/\s/g, '')
  if (kind === 'aircraft' || kind === 'registrations') {
    if (!/^[A-Z0-9][A-Z0-9-]{2,9}$/.test(normalized)) return null
    return { kind, path: `/aircrafts/reg/${normalized}${kind === 'registrations' ? '/registrations' : ''}`, ttl: 86400 }
  }
  if ('error' in validateFlightSearch(normalized, today, now)) return null
  if (kind === 'flight-delays') return { kind, path: `/flights/${normalized}/delays`, ttl: 86400 }
  if (kind === 'history' || kind === 'schedule') {
    const from = kind === 'history' ? dayOffset(today, -7) : today
    const to = kind === 'history' ? dayOffset(today, -1) : dayOffset(today, 6)
    return { kind, path: `/flights/number/${normalized}/${from}/${to}?dateLocalRole=Departure`, ttl: 21600 }
  }
  return null
}
export function durationMinutes(value: unknown): string {
  const match = /^(-)?(?:(\d+)\.)?(\d+):(\d{2}):(\d{2})(?:\.\d+)?$/.exec(str(value))
  if (!match) return 'Neuvedeno'
  const minutes = Math.round((Number(match[2] ?? 0) * 1440 + Number(match[3]) * 60 + Number(match[4]) + Number(match[5]) / 60) * (match[1] ? -1 : 1))
  return `${minutes} min`
}
function date(value: unknown): string {
  const raw = str(value)
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}:\d{2}))?/.exec(raw)
  return match ? `${Number(match[3])}. ${Number(match[2])}. ${match[1]}${match[4] ? ` ${match[4]}` : ''}` : 'Neuvedeno'
}
function movementTime(value: unknown): string {
  const v = obj(value)
  return v.local ? `${date(v.local)} místního času` : v.utc ? `${date(v.utc)} UTC` : 'Neuvedeno'
}
function airport(value: unknown): string {
  const v = obj(value)
  return [str(v.iata) || str(v.icao), str(v.municipalityName) || str(v.shortName) || str(v.name)].filter(Boolean).join(' · ') || 'Letiště neuvedeno'
}
export function normalizeInsight(kind: InsightKind, raw: unknown): Omit<InsightData, 'fetchedAt'> {
  const data = obj(raw)
  const sections: InsightSection[] = []
  let solar: SolarTimes | undefined
  let note = 'Ne všechny údaje jsou dostupné. Zdroj: AeroDataBox.'
  const row = (label: string, value: unknown) => ({ label, value: text(value) })
  if (raw == null) return { sections, note: 'Zdroj pro tento dotaz neposkytl data. Nejde o potvrzení, že let nebo letadlo neexistuje.' }
  if (kind === 'aircraft' && str(data.reg)) {
    sections.push({ title: `Letadlo ${str(data.reg)}`, rows: [
      row('Model', data.model), row('Dopravce', data.airlineName), row('Stáří podle zdroje', num(data.ageYears) !== null ? `${Number(data.ageYears).toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} let` : null),
      row('První let', date(data.firstFlightDate)), row('Dodání', date(data.deliveryDate)), row('Výrobní číslo', data.serial), row('Počet sedadel podle zdroje', data.numSeats), row('Počet motorů', data.numEngines), row('Typ motoru', ({ Jet: 'Proudový', Turboprop: 'Turbovrtulový', Piston: 'Pístový', Unknown: 'Neuvedeno' } as Record<string, string>)[str(data.engineType)] ?? str(data.engineType)),
      row('Nákladní verze', typeof data.isFreighter === 'boolean' ? data.isFreighter ? 'Ano' : 'Ne' : null),
    ] })
    note = 'Identifikace podle registrace; sedadla se mohou lišit podle konfigurace. Stáří ani historie samy o sobě nevypovídají o bezpečnosti letadla.'
  } else if (kind === 'registrations') {
    const rows = arr(raw).slice(0, 50).map(v => { const r = obj(v); return { label: str(r.reg) || 'Registrace neuvedena', value: `${str(r.airlineName) || 'Dopravce neuveden'} · od ${date(r.registrationDate)}${r.active === true ? ' · aktivní podle zdroje' : ''}` } })
    if (rows.length) sections.push({ title: 'Známé registrace a provozovatelé', rows })
    note = 'Historie může být neúplná. Datum označuje přidělení registrace; chybějící datum nedoplňujeme odhadem.'
  } else if (kind === 'sun') {
    const instant = (value: unknown): string | null => {
      const v = obj(value), raw = str(v.utc) || str(v.local)
      const parsed = Date.parse(raw.replace(' ', 'T'))
      return Number.isFinite(parsed) ? new Date(parsed).toISOString() : null
    }
    solar = { sunrise: instant(data.sunrise), sunset: instant(data.sunset), dawnCivil: instant(data.dawnCivil), duskCivil: instant(data.duskCivil) }

    if (data.sunrise || data.sunset) sections.push({ title: 'Slunce na letišti Praha', rows: [
      row('Rozednívá se', movementTime(data.dawnCivil)), row('Východ slunce', movementTime(data.sunrise)), row('Západ slunce', movementTime(data.sunset)), row('Stmívá se', movementTime(data.duskCivil)),
    ] })
    note = 'Časy pro letiště Praha. Oblačnost, překážky a poloha vyhlídky ovlivňují skutečné světlo pro focení.'
  } else if (kind === 'destinations') {
    const rows = arr(data.routes).slice(0, 200).map(v => { const r = obj(v); return { label: airport(r.destination), value: `Průměr letů denně: ${text(r.averageDailyFlights)} · ${arr(r.operators).map(a => str(obj(a).name)).filter(Boolean).join(', ') || 'Dopravce neuveden'}` } })
    if (rows.length) sections.push({ title: 'Destinace a průměrná denní frekvence', rows })
    note = 'Statistika tras k dnešnímu datu; průměrná denní frekvence není počet potvrzených dnešních odletů. Konkrétní spoj ověřte v letovém řádu.'
  } else if (kind === 'airport-delays') {
    for (const [key, title] of [['departuresDelayInformation', 'Odlety'], ['arrivalsDelayInformation', 'Přílety']]) {
      const v = obj(data[key])
      if (num(v.numTotal) !== null) sections.push({ title, rows: [row('Celkem ve sledovaném okně', v.numTotal), row('Použitelné pro statistiku', v.numQualifiedTotal), row('Zrušené lety', v.numCancelled), row('Medián odchylky od plánu', durationMinutes(v.medianDelay))] })
    }
    note = `Období zdroje: ${movementTime(data.from)} až ${movementTime(data.to)}. Záporná odchylka znamená dřívější pohyb. Souhrn není předpověď vašeho letu.`
  } else if (kind === 'flight-delays') {
    for (const [key, title] of [['origins', 'Odlety'], ['destinations', 'Přílety']]) {
      for (const item of arr(data[key]).slice(0, 12)) {
        const v = obj(item)
        sections.push({ title: `${title} · ${text(v.airportIcao)}`, rows: [row('Medián odchylky od plánu', durationMinutes(v.medianDelay)), row('Počet sledovaných letů', v.numConsideredFlights), row('Období (UTC)', `${date(v.fromUtc)} – ${date(v.toUtc)}`), row('Plánovaná hodina (UTC)', v.scheduledHourUtc)] })
      }
    }
    note = 'Historická statistika není předpověď zpoždění konkrétního letu. Medián je prostřední hodnota; záporná znamená dřívější pohyb.'
  } else if (kind === 'history' || kind === 'schedule') {
    const rows = arr(raw).slice(0, 150).map(v => {
      const f = obj(v), dep = obj(f.departure), dest = obj(f.arrival), time = obj(dep.scheduledTime)
      const day = str(time.local).slice(0, 10), number = str(f.number).replace(/\s/g, '')
      return { label: `${str(f.number)} · ${movementTime(dep.scheduledTime)}`, value: `${airport(dep.airport)} → ${airport(dest.airport)} · ${flightStatus(str(f.status) || 'Unknown')}`, ...(/^\d{4}-\d{2}-\d{2}$/.test(day) && /^[A-Z0-9]{3,8}$/.test(number) ? { href: `/let?${new URLSearchParams({ number, date: day })}` } : {}) }
    })
    if (rows.length) sections.push({ title: kind === 'history' ? 'Předchozích 7 dní' : 'Dnes a příštích 6 dní', rows })
    note = 'Záznamy jsou podle místního data odletu. Uvádíme plánované časy, skutečný stav otevřete v detailu. Chybějící den neznamená zrušený let.'
  }
  return { sections, note, ...(solar ? { solar } : {}) }
}
