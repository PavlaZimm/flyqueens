import { runwaysFor } from '@/lib/runways'
import { MIN_AIRCRAFT_FOR_ESTIMATE } from '@/lib/runwayInUseShared'

// Odhad dráhy v provozu z ADS-B poloh letadel u letiště. Nejde o oficiální
// údaj (ten vysílá ATIS), jen o to, kterým směrem právě nízko nad letištěm
// letí přistávající a odlétající letadla. Letadlo s kurzem ~244° používá
// dráhu 24 bez ohledu na to, jestli přistává, nebo vzlétá.

export interface RunwayAirportConfig {
  icao: string
  lat: number
  lon: number
  elevationFt: number
  /** Magnetická deklinace (východní kladně), převod označení dráhy na zeměpisný kurz. */
  magneticVariationDeg: number
}

export const RUNWAY_AIRPORTS: Record<string, RunwayAirportConfig> = {
  // Deklinace u Prahy je v roce 2026 zhruba 5° východně.
  LKPR: { icao: 'LKPR', lat: 50.1009, lon: 14.2599, elevationFt: 1247, magneticVariationDeg: 5 },
}

export interface ObservedAircraft {
  lat: number
  lon: number
  /** Barometrická výška v stopách. */
  altitudeFt: number | null
  onGround: boolean
  /** Zeměpisný kurz trati ve stupních. */
  trackDeg: number | null
  groundSpeedKt: number | null
}

export interface RunwayEndCount {
  /** Označení prahu, např. "24". */
  end: string
  count: number
}

export interface RunwayEstimate {
  status: 'ok' | 'insufficient'
  /** Prahy seřazené podle počtu letadel, jen ty s alespoň jedním letadlem. */
  ends: RunwayEndCount[]
  /** Kolik letadel prošlo filtrem blízko letiště a nízko. */
  aircraftUsed: number
}

const MAX_DISTANCE_KM = 15
const MAX_HEIGHT_ABOVE_AIRPORT_FT = 3000
const MIN_GROUND_SPEED_KT = 60
const MAX_TRACK_DIFF_DEG = 20
const MAX_CROSS_TRACK_KM = 2.5

const EARTH_RADIUS_KM = 6371
const toRad = (deg: number) => (deg * Math.PI) / 180
const toDeg = (rad: number) => (rad * 180) / Math.PI

function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360
}

function angleDiff(a: number, b: number): number {
  const diff = Math.abs(normalizeDeg(a) - normalizeDeg(b)) % 360
  return diff > 180 ? 360 - diff : diff
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a))
}

function bearingDeg(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const y = Math.sin(toRad(lon2 - lon1)) * Math.cos(toRad(lat2))
  const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2))
    - Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(toRad(lon2 - lon1))
  return normalizeDeg(toDeg(Math.atan2(y, x)))
}

export function estimateRunwayInUse(config: RunwayAirportConfig, aircraft: ObservedAircraft[]): RunwayEstimate {
  const ends = runwaysFor(config.icao)
    .filter(runway => !runway.closed)
    .flatMap(runway => [
      { end: runway.lowEnd, trueHeading: normalizeDeg(runway.headingDeg + config.magneticVariationDeg) },
      { end: runway.highEnd, trueHeading: normalizeDeg(runway.headingDeg + 180 + config.magneticVariationDeg) },
    ])

  const counts = new Map<string, number>()
  let aircraftUsed = 0

  for (const plane of aircraft) {
    if (plane.onGround || plane.altitudeFt == null || plane.trackDeg == null) continue
    if (plane.groundSpeedKt != null && plane.groundSpeedKt < MIN_GROUND_SPEED_KT) continue
    if (plane.altitudeFt - config.elevationFt > MAX_HEIGHT_ABOVE_AIRPORT_FT) continue

    const distance = distanceKm(config.lat, config.lon, plane.lat, plane.lon)
    if (distance > MAX_DISTANCE_KM) continue
    const bearingFromAirport = bearingDeg(config.lat, config.lon, plane.lat, plane.lon)

    const match = ends.find(end => {
      if (angleDiff(plane.trackDeg!, end.trueHeading) > MAX_TRACK_DIFF_DEG) return false
      // Letadlo musí být na prodloužené ose dráhy, ne jen letět rovnoběžně
      // (okruh a vektorování mají podobný kurz, ale leží kilometry stranou).
      const crossTrack = Math.abs(distance * Math.sin(toRad(bearingFromAirport - end.trueHeading)))
      return crossTrack <= MAX_CROSS_TRACK_KM
    })
    if (!match) continue

    aircraftUsed += 1
    counts.set(match.end, (counts.get(match.end) ?? 0) + 1)
  }

  const sorted = [...counts.entries()]
    .map(([end, count]) => ({ end, count }))
    .sort((a, b) => b.count - a.count)

  return {
    status: sorted[0] && sorted[0].count >= MIN_AIRCRAFT_FOR_ESTIMATE ? 'ok' : 'insufficient',
    ends: sorted,
    aircraftUsed,
  }
}

export interface RunwayInUseResponse extends RunwayEstimate {
  airport: string
  fetchedAt: string
  wind: { directionDeg: number | null; speedKt: number | null; variable: boolean; observedAt: string | null } | null
}

function finite(value: unknown): number | null {
  const num = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  return Number.isFinite(num) ? num : null
}

async function fetchNearbyAircraft(config: RunwayAirportConfig): Promise<ObservedAircraft[]> {
  const response = await fetch(`https://api.adsb.lol/v2/lat/${config.lat}/lon/${config.lon}/dist/10`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'FlyQueens/1.0 (+https://www.flyqueens.cz/o-projektu)',
    },
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(4500),
  })
  if (!response.ok) throw new Error(`adsb.lol HTTP ${response.status}`)
  const data = await response.json() as { ac?: Record<string, unknown>[] }
  return (data.ac ?? []).flatMap((ac): ObservedAircraft[] => {
    const lat = finite(ac.lat)
    const lon = finite(ac.lon)
    const seen = finite(ac.seen_pos)
    if (lat == null || lon == null || (seen != null && seen > 30)) return []
    return [{
      lat,
      lon,
      altitudeFt: ac.alt_baro === 'ground' ? null : finite(ac.alt_baro),
      onGround: ac.alt_baro === 'ground',
      trackDeg: finite(ac.track),
      groundSpeedKt: finite(ac.gs),
    }]
  })
}

async function fetchWind(icao: string): Promise<RunwayInUseResponse['wind']> {
  try {
    const response = await fetch(`https://aviationweather.gov/api/data/metar?ids=${icao}&format=json&taf=false`, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'FlyQueens/1.0 (+https://www.flyqueens.cz/o-projektu)',
      },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(4000),
    })
    if (!response.ok || response.status === 204) return null
    const data = await response.json() as Record<string, unknown>[]
    const metar = Array.isArray(data) ? data[0] : null
    if (!metar) return null
    const variable = metar.wdir === 'VRB'
    const obsTime = finite(metar.obsTime)
    return {
      directionDeg: variable ? null : finite(metar.wdir),
      speedKt: finite(metar.wspd),
      variable,
      observedAt: obsTime != null ? new Date(obsTime * 1000).toISOString() : null,
    }
  } catch {
    return null
  }
}

export async function getRunwayInUse(icao: string): Promise<RunwayInUseResponse | null> {
  const config = RUNWAY_AIRPORTS[icao]
  if (!config) return null
  const [aircraft, wind] = await Promise.all([fetchNearbyAircraft(config), fetchWind(icao)])
  return {
    airport: icao,
    fetchedAt: new Date().toISOString(),
    wind,
    ...estimateRunwayInUse(config, aircraft),
  }
}
