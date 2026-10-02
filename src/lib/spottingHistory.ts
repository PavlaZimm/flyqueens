export interface SpottingObservation { observed_at: string; status: string; primary_end: string | null; aircraft_used: number }
export interface SpottingHistory {
  available: boolean; days: number; samples: number; observedDays: number; since: string | null; lastObservedAt: string | null
  directionSamples: number; directionDays: number
  ends: { end: string; count: number; share: number }[]
  hours: { hour: number; samples: number; days: number; averageAircraft: number }[]
}
export const MIN_HISTORY_SAMPLES = 30
export const MIN_HISTORY_DAYS = 3
export const MIN_HOUR_SAMPLES = 8
const local = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' })
export function summarizeSpotting(rows: SpottingObservation[], now: number): SpottingHistory {
  // Defensive deduplication: old writers could race within a 15-minute bucket.
  const buckets = new Map<number, SpottingObservation>()
  for (const row of rows) {
    const stamp = Date.parse(row.observed_at)
    if (!Number.isFinite(stamp) || stamp > now || stamp <= now - 7 * 86400000 || !Number.isFinite(row.aircraft_used) || row.aircraft_used < 0) continue
    const bucket = Math.floor(stamp / 900000)
    const prior = buckets.get(bucket)
    if (!prior || stamp > Date.parse(prior.observed_at)) buckets.set(bucket, row)
  }
  const samples = [...buckets.values()].sort((a, b) => Date.parse(a.observed_at) - Date.parse(b.observed_at))
  const days = new Set<string>(), directionDays = new Set<string>()
  const ends = new Map<string, number>()
  const hours = new Map<number, { count: number; aircraft: number; dates: Set<string> }>()
  for (const row of samples) {
    const parts = Object.fromEntries(local.formatToParts(new Date(row.observed_at)).map(p => [p.type, p.value]))
    const date = `${parts.year}-${parts.month}-${parts.day}`
    const hour = Number(parts.hour)
    days.add(date)
    const group = hours.get(hour) ?? { count: 0, aircraft: 0, dates: new Set<string>() }
    group.count++; group.aircraft += row.aircraft_used; group.dates.add(date); hours.set(hour, group)
    if (row.status === 'ok' && row.primary_end) { ends.set(row.primary_end, (ends.get(row.primary_end) ?? 0) + 1); directionDays.add(date) }
  }
  const directionSamples = [...ends.values()].reduce((a, b) => a + b, 0)
  return { available: true, days: 7, samples: samples.length, observedDays: days.size,
    since: samples[0]?.observed_at ?? null, lastObservedAt: samples.at(-1)?.observed_at ?? null,
    directionSamples, directionDays: directionDays.size,
    ends: [...ends].map(([end, count]) => ({ end, count, share: Math.round(count / directionSamples * 100) })).sort((a, b) => b.count - a.count),
    hours: [...hours].map(([hour, group]) => ({ hour, samples: group.count, days: group.dates.size, averageAircraft: Math.round(group.aircraft / group.count * 10) / 10 })).sort((a, b) => a.hour - b.hour) }
}
