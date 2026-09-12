import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import { REGION_CONFIGS } from '@/lib/constants'
import { getOpenSkyToken } from '@/lib/openskyAuth'
import type { AircraftType, FlightDataSource } from '@/types/flight'
import { normalizeEmergency } from '@/lib/emergency'

type SourceResult = {
  source: FlightDataSource
  states: unknown[][]
  fetchedAt: number
}
type CachedSnapshot = SourceResult & { cachedAt: number }

type FlightSummary = {
  count: number
  airborne: number
  onGround: number
  avgAltitude: number
  avgSpeed: number
  phases: {
    climbing: number
    cruising: number
    descending: number
  }
  altitudeBands: {
    low: number
    medium: number
    high: number
  }
  radar: Array<{
    id: string
    callsign: string
    x: number
    y: number
    heading: number
    altitude: number
  }>
}

const lastGoodSnapshots = new Map<string, CachedSnapshot>()
const inFlightRequests = new Map<string, Promise<SourceResult>>()
const LIVE_CACHE_MS = 10_000
const MAX_STALE_MS = 5 * 60_000
// ADS-B agregátory mohou ve výřezu krátce držet poslední známou pozici.
// Starší bod už na pohyblivé mapě působí zavádějícím dojmem, proto jej do
// živého snapshotu nepouštíme. Letadlo se vrátí, jakmile dorazí nová poloha.
const MAX_POSITION_AGE_SECONDS = 30

function finiteNumber(value: unknown): number | null {
  if (value == null || value === '') return null
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

function boundedNumber(value: unknown, min: number, max: number): number | null {
  const number = finiteNumber(value)
  return number != null && number >= min && number <= max ? number : null
}

function summarizeStates(
  states: unknown[][],
  region: (typeof REGION_CONFIGS)[string],
): FlightSummary {
  const valid = states.flatMap((state) => {
    const lat = finiteNumber(state[6])
    const lon = finiteNumber(state[5])
    if (lat == null || lon == null) return []

    const altitude = Math.max(0, finiteNumber(state[7]) ?? 0)
    const speed = Math.max(0, (finiteNumber(state[9]) ?? 0) * 3.6)
    const extendedRate = finiteNumber(state[22])
    // Nativní OpenSky má vertical_rate na indexu 11 v m/s, rozšířený ADS-B
    // formát ukládá barometrické stoupání na indexu 22 ve ft/min.
    const verticalRate = extendedRate ?? ((finiteNumber(state[11]) ?? 0) * 196.85)

    return [{
      id: String(state[0] ?? ''),
      callsign: String(state[1] ?? '').trim() || String(state[0] ?? '').toUpperCase(),
      lat,
      lon,
      altitude,
      speed,
      heading: finiteNumber(state[10]) ?? 0,
      onGround: Boolean(state[8]),
      verticalRate,
    }]
  })

  const airborne = valid.filter((flight) => !flight.onGround)
  const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)
  const average = (values: number[]) => values.length ? Math.round(sum(values) / values.length) : 0

  const phases = airborne.reduce((result, flight) => {
    if (flight.verticalRate > 300) result.climbing += 1
    else if (flight.verticalRate < -300) result.descending += 1
    else result.cruising += 1
    return result
  }, { climbing: 0, cruising: 0, descending: 0 })

  const altitudeBands = airborne.reduce((result, flight) => {
    if (flight.altitude < 3_000) result.low += 1
    else if (flight.altitude < 9_000) result.medium += 1
    else result.high += 1
    return result
  }, { low: 0, medium: 0, high: 0 })

  // Stabilní malý vzorek skutečných letadel pro náhled. Kružnice v SVG má
  // poloměr 150 px a představuje poloměr dotazované oblasti v námořních mílích.
  const radar = airborne
    .sort((a, b) => a.id.localeCompare(b.id))
    .filter((_, index, flights) => index % Math.max(1, Math.floor(flights.length / 12)) === 0)
    .slice(0, 12)
    .map((flight) => {
      const longitudeNm = (flight.lon - region.lon) * 60 * Math.cos(region.lat * Math.PI / 180)
      const latitudeNm = (flight.lat - region.lat) * 60
      return {
        id: flight.id,
        callsign: flight.callsign,
        x: Math.round((420 + longitudeNm * 150 / region.dist) * 10) / 10,
        y: Math.round((270 - latitudeNm * 150 / region.dist) * 10) / 10,
        heading: Math.round(flight.heading),
        altitude: Math.round(flight.altitude),
      }
    })
    .filter((flight) => Math.hypot(flight.x - 420, flight.y - 270) <= 153)

  return {
    count: valid.length,
    airborne: airborne.length,
    onGround: valid.length - airborne.length,
    avgAltitude: average(airborne.map((flight) => flight.altitude)),
    avgSpeed: average(airborne.map((flight) => flight.speed)),
    phases,
    altitudeBands,
    radar,
  }
}

function unixSeconds(value: number | undefined): number {
  const timestamp = value ?? Date.now()
  return Math.floor(timestamp > 10_000_000_000 ? timestamp / 1000 : timestamp)
}

function normalizeRows(states: unknown[][]): unknown[][] {
  return states.map((input) => {
    const row = [...input]
    while (row.length < 34) row.push(undefined)
    return row
  })
}

function classifyAircraft(ac: Record<string, unknown>): AircraftType | null {
  const designator = String(ac.t ?? '').toUpperCase()
  const category = String(ac.category ?? '').toUpperCase()
  const dbFlags = Math.trunc(finiteNumber(ac.dbFlags) ?? 0)

  // ADS-B Exchange DB bit 0 označuje vojenský stroj. Je to podstatně
  // spolehlivější než hádání z volacího znaku nebo typu letadla.
  if ((dbFlags & 1) === 1) return 'military'
  if (category === 'A7') return 'helicopter'
  if (/^(A3(0[06]|1[08]|3[0-9]|4[0-9]|5[0-9]|80)|B74|B76|B77|B78|DC10|MD11)/.test(designator)) return 'wide-body'
  if (/^(AT[467]|DH8|DHC6|SF34|E120|C208|PC12|BE20|L410|AN2[468]|AN3[028])/.test(designator)) return 'turboprop'
  if (/^(C25|C5[1256]|C6[058]|C7[05]|GLF|LJ|FA[12578]|F2TH|F900|CL3[05]|CL60|E5[05]P|PC24|H25B)/.test(designator)) return 'private-jet'
  if (category === 'A5') return 'wide-body'
  if (category === 'A3' || category === 'A4') return 'narrow-body'
  if (category === 'A1' || category === 'A2') return 'ga'
  return null
}

// adsb.lol / airplanes.live formát → rozšířený OpenSky formát.
// Zemi z ICAO adresy nehádáme: dvouznakové prefixy nejsou hranice států a
// předchozí implementace proto zobrazovala pro řadu letadel nesprávné vlajky.
function adsbToOpenSky(ac: Record<string, unknown>, snapshotAt: number): unknown[] {
  const icao = String(ac.hex ?? '').toLowerCase()
  const callsign = String(ac.flight ?? '').trim()
  const lat = finiteNumber(ac.lat)
  const lon = finiteNumber(ac.lon)
  const altitudeFeet = ac.alt_baro === 'ground'
    ? 0
    : finiteNumber(ac.alt_baro) ?? finiteNumber(ac.alt_geom) ?? 0
  const alt = altitudeFeet * 0.3048
  const velocity = (finiteNumber(ac.gs) ?? 0) * 0.514444
  const heading = finiteNumber(ac.track) ?? finiteNumber(ac.true_heading)
  const onGround = ac.alt_baro === 'ground'
  const seen = Math.max(0, finiteNumber(ac.seen) ?? 0)
  const seenPosition = Math.max(0, finiteNumber(ac.seen_pos) ?? seen)
  const timePosition = Math.max(0, Math.floor(snapshotAt - seenPosition))
  const lastContact = Math.max(0, Math.floor(snapshotAt - seen))
  const registration = String(ac.r ?? '').trim()
  // Ve veřejné telemetrii se občas objeví poškozené extrémy (např. -215 °C).
  // Raději údaj vynecháme, než abychom z něj dělali přesvědčivě vypadající statistiku.
  const oat = boundedNumber(ac.oat, -100, 60)
  const windSpeed = boundedNumber(ac.ws, 0, 300)
  const mach = boundedNumber(ac.mach, 0, 2.5)
  const baroRate = ac.baro_rate != null ? Number(ac.baro_rate) : null
  const squawk = ac.squawk != null ? String(ac.squawk) : null
  const emergency = normalizeEmergency(ac.emergency) ?? null
  const navAltitude = ac.nav_altitude_mcp != null ? Number(ac.nav_altitude_mcp) : null
  const typeDesignator = String(ac.t ?? '').trim() || null
  const aircraftType = classifyAircraft(ac)
  const dbFlags = finiteNumber(ac.dbFlags)
  const ias = finiteNumber(ac.ias)
  const tas = finiteNumber(ac.tas)
  const navHeading = finiteNumber(ac.nav_heading)
  const navQnh = finiteNumber(ac.nav_qnh)
  const geomRate = finiteNumber(ac.geom_rate)
  const roll = finiteNumber(ac.roll)
  const navModes = Array.isArray(ac.nav_modes)
    ? ac.nav_modes.map((mode) => String(mode)).filter(Boolean)
    : null

  return [
    icao, callsign, '', timePosition, lastContact, lon, lat, alt, onGround, velocity, heading,
    0, null, alt, squawk, false, registration, typeDesignator, aircraftType, oat, windSpeed,
    mach, baroRate, squawk, emergency, navAltitude, dbFlags, ias, tas, navHeading,
    navQnh, geomRate, roll, navModes,
  ]
}

async function fetchAdsbLol(region: (typeof REGION_CONFIGS)[string]): Promise<SourceResult> {
  const response = await fetch(
    `https://api.adsb.lol/v2/lat/${region.lat}/lon/${region.lon}/dist/${region.dist}`,
    {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'FlyQueens/1.0 (+https://www.flyqueens.cz/o-projektu)',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(4500),
    },
  )
  if (!response.ok) throw new Error(`adsb.lol HTTP ${response.status}`)

  const data = (await response.json()) as { ac?: Record<string, unknown>[]; now?: number }
  const fetchedAt = unixSeconds(data.now)
  const freshAircraft = (data.ac ?? []).filter((aircraft) => {
    const lat = finiteNumber(aircraft.lat)
    const lon = finiteNumber(aircraft.lon)
    const age = finiteNumber(aircraft.seen_pos)
    return lat != null && lat >= -90 && lat <= 90
      && lon != null && lon >= -180 && lon <= 180
      && (age == null || (age >= 0 && age <= MAX_POSITION_AGE_SECONDS))
  })
  return {
    source: 'adsb.lol',
    states: normalizeRows(freshAircraft.map((aircraft) => adsbToOpenSky(aircraft, fetchedAt))),
    fetchedAt,
  }
}

async function fetchLicensedOpenSky(region: (typeof REGION_CONFIGS)[string]): Promise<SourceResult> {
  if (process.env.OPENSKY_LICENSED !== 'true' || !region.osky) {
    throw new Error('OpenSky is not enabled as a licensed source')
  }

  const token = await getOpenSkyToken()
  if (!token) throw new Error('OpenSky credentials are missing or invalid')

  const box = region.osky
  const response = await fetch(
    `https://opensky-network.org/api/states/all?lamin=${box.lamin}&lamax=${box.lamax}&lomin=${box.lomin}&lomax=${box.lomax}`,
    {
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(4500),
    },
  )
  if (!response.ok) throw new Error(`OpenSky HTTP ${response.status}`)

  const data = (await response.json()) as { states?: unknown[][]; time?: number }
  return {
    source: 'opensky',
    states: normalizeRows(data.states ?? []),
    fetchedAt: data.time ?? Math.floor(Date.now() / 1000),
  }
}

async function fetchEnabledAirplanesLive(region: (typeof REGION_CONFIGS)[string]): Promise<SourceResult> {
  if (process.env.AIRPLANES_LIVE_ENABLED !== 'true') {
    throw new Error('airplanes.live is not enabled')
  }
  if (region.dist > 250) {
    throw new Error('airplanes.live cannot truthfully cover this region')
  }

  const response = await fetch(
    `https://api.airplanes.live/v2/point/${region.lat}/${region.lon}/${region.dist}`,
    {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'FlyQueens/1.0 (+https://www.flyqueens.cz/o-projektu)',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(4500),
    },
  )
  if (!response.ok) throw new Error(`airplanes.live HTTP ${response.status}`)

  const data = (await response.json()) as { ac?: Record<string, unknown>[]; now?: number }
  const fetchedAt = unixSeconds(data.now)
  const freshAircraft = (data.ac ?? []).filter((aircraft) => {
    const lat = finiteNumber(aircraft.lat)
    const lon = finiteNumber(aircraft.lon)
    const age = finiteNumber(aircraft.seen_pos)
    return lat != null && lat >= -90 && lat <= 90
      && lon != null && lon >= -180 && lon <= 180
      && (age == null || (age >= 0 && age <= MAX_POSITION_AGE_SECONDS))
  })
  return {
    source: 'airplanes.live',
    states: normalizeRows(freshAircraft.map((aircraft) => adsbToOpenSky(aircraft, fetchedAt))),
    fetchedAt,
  }
}

function liveResponse(
  result: SourceResult,
  regionKey: string,
  region: (typeof REGION_CONFIGS)[string],
  summaryOnly: boolean,
) {
  return NextResponse.json(
    summaryOnly
      ? {
          ...summarizeStates(result.states, region),
          source: result.source,
          fetchedAt: result.fetchedAt,
          status: 'live',
          region: regionKey,
        }
      : {
          states: result.states,
          source: result.source,
          fetchedAt: result.fetchedAt,
          status: 'live',
          region: regionKey,
        },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=8, stale-while-revalidate=30',
        'X-FlyQueens-Data-Source': result.source,
      },
    },
  )
}

async function getLiveSnapshot(regionKey: string, region: (typeof REGION_CONFIGS)[string]): Promise<SourceResult> {
  const cached = lastGoodSnapshots.get(regionKey)
  if (cached && Date.now() - cached.cachedAt < LIVE_CACHE_MS) return cached

  const existing = inFlightRequests.get(regionKey)
  if (existing) return existing

  const request = Promise.any([
    fetchAdsbLol(region),
    fetchLicensedOpenSky(region),
    fetchEnabledAirplanesLive(region),
  ]).then((result) => {
    lastGoodSnapshots.set(regionKey, { ...result, cachedAt: Date.now() })
    return result
  }).finally(() => {
    inFlightRequests.delete(regionKey)
  })

  inFlightRequests.set(regionKey, request)
  return request
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
  const summaryOnly = req.nextUrl.searchParams.get('summary') === '1'
  const { allowed, retryAfter } = checkRateLimit(ip, summaryOnly ? 'flight-summary' : 'flights')
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', code: 'RATE_LIMITED', retryAfter },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    )
  }

  const requestedRegion = req.nextUrl.searchParams.get('region') ?? 'europe'
  const regionKey = Object.hasOwn(REGION_CONFIGS, requestedRegion) ? requestedRegion : 'europe'
  const region = REGION_CONFIGS[regionKey]
  try {
    // Zdroje běží souběžně. Výpadek jednoho už nezablokuje uživatele součtem timeoutů.
    const result = await getLiveSnapshot(regionKey, region)
    return liveResponse(result, regionKey, region, summaryOnly)
  } catch (error) {
    console.error(`[FlyQueens] All live flight sources failed for ${regionKey}`, error)
    const cached = lastGoodSnapshots.get(regionKey)
    if (cached && Date.now() - cached.cachedAt <= MAX_STALE_MS) {
      return NextResponse.json(
        {
          ...(summaryOnly ? summarizeStates(cached.states, region) : { states: cached.states }),
          source: cached.source,
          fetchedAt: cached.fetchedAt,
          status: 'stale',
          region: regionKey,
          message: 'Živý zdroj je dočasně nedostupný. Zobrazujeme poslední známá data.',
        },
        { headers: { 'Cache-Control': 'no-store', 'X-FlyQueens-Data-Source': cached.source } },
      )
    }

    return NextResponse.json(
      {
        ...(summaryOnly ? { count: 0 } : { states: [] }),
        source: null,
        fetchedAt: null,
        status: 'unavailable',
        region: regionKey,
        code: 'LIVE_DATA_UNAVAILABLE',
        message: 'Živá data jsou momentálně nedostupná. Zkuste to prosím za chvíli.',
      },
      { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '15' } },
    )
  }
}
