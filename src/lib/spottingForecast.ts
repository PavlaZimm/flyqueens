import { ktsToKmh, wxDescription } from './metar'
export interface TafPeriod {
  from: string | null; to: string | null; becomingAt: string | null
  change: string | null; probability: number | null
  windDir: number | null; windVariable: boolean; windSpeed: number | null; windGust: number | null
  visibility: number | string | null; weather: string | null
  clouds: { cover?: string; base?: number | null }[]
}
export interface SpottingTaf {
  icao: string; issueTime: string | null; validFrom: string | null; validTo: string | null
  forecasts: TafPeriod[]; rawTaf: string | null
}
const stamp = (value: string | null) => value ? Date.parse(value) : NaN
const conditional = (p: TafPeriod) => /TEMPO|PROB/.test(p.change ?? '') || p.probability !== null
export function forecastAt(taf: SpottingTaf | null, at: number, now: number) {
  if (!taf || taf.icao !== 'LKPR' || !Number.isFinite(at) || !Number.isFinite(stamp(taf.issueTime))
    || now - stamp(taf.issueTime) > 12 * 3600000 || stamp(taf.issueTime) > now + 600000
    || at < stamp(taf.validFrom) || at >= stamp(taf.validTo) || now >= stamp(taf.validTo)
    || !Number.isFinite(stamp(taf.validFrom)) || !Number.isFinite(stamp(taf.validTo))) return null
  const ordered = [...taf.forecasts].sort((a, b) => stamp(a.from) - stamp(b.from))
  const bases = ordered.filter(p => !conditional(p))
  const base = bases.filter(p => stamp(p.from) <= at && at < stamp(p.to)).at(-1)
  if (!base) return null
  const changing = base.change === 'BECMG' && at < stamp(base.becomingAt)
  const previous = changing ? bases.filter(p => stamp(p.from) < stamp(base.from)).at(-1) ?? null : null
  const alternatives = ordered.filter(p => conditional(p) && stamp(p.from) <= at && at < stamp(p.to))
  return { base, previous, changing, alternatives }
}
export function forecastText(p: TafPeriod): string {
  const parts: string[] = []
  if (p.windSpeed !== null) parts.push(`vítr ${ktsToKmh(p.windSpeed)} km/h${p.windVariable ? ', proměnlivý' : p.windDir !== null ? ` z ${p.windDir}°` : ''}${p.windGust !== null ? `, nárazy ${ktsToKmh(p.windGust)} km/h` : ''}`)
  const visibility = p.visibility === '' || p.visibility == null ? null : Number.parseFloat(String(p.visibility))
  if (visibility !== null && Number.isFinite(visibility)) parts.push(`dohlednost ${String(p.visibility).includes('+') ? 'více než ' : ''}${(visibility * 1.609344).toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} km`)
  if (p.weather === 'NSW') parts.push('bez významných povětrnostních jevů')
  else if (p.weather) parts.push(wxDescription(p.weather))
  const clouds: Record<string, string> = { FEW: 'malá oblačnost', SCT: 'rozptýlená oblačnost', BKN: 'oblačno', OVC: 'zataženo', NSC: 'bez významné oblačnosti', SKC: 'jasno', VV: 'omezená vertikální dohlednost' }
  if (p.clouds.length) parts.push([...new Set(p.clouds.map(c => clouds[c.cover ?? ''] ?? c.cover).filter(Boolean))].join(', '))
  return parts.length ? parts.join(' · ') : 'Podrobnosti nejsou v této části předpovědi uvedeny.'
}
