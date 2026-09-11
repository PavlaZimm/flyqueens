import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import { REGION_CONFIGS } from '@/lib/constants'
import { getOpenSkyToken } from '@/lib/openskyAuth'
import type { AircraftType, FlightDataSource } from '@/types/flight'

type SourceResult = {
  source: FlightDataSource
  states: unknown[][]
  fetchedAt: number
}
type CachedSnapshot = SourceResult & { cachedAt: number }

const lastGoodSnapshots = new Map<string, CachedSnapshot>()
const inFlightRequests = new Map<string, Promise<SourceResult>>()
const LIVE_CACHE_MS = 10_000
const MAX_STALE_MS = 5 * 60_000

function unixSeconds(value: number | undefined): number {
  const timestamp = value ?? Date.now()
  return Math.floor(timestamp > 10_000_000_000 ? timestamp / 1000 : timestamp)
}

function normalizeRows(states: unknown[][]): unknown[][] {
  return states.map((input) => {
    const row = [...input]
    while (row.length < 26) row.push(undefined)
    return row
  })
}

function classifyAircraft(ac: Record<string, unknown>): AircraftType | null {
  const designator = String(ac.t ?? '').toUpperCase()
  const category = String(ac.category ?? '').toUpperCase()

  if (category === 'A7') return 'helicopter'
  if (/^(A3(0[06]|1[08]|3[0-9]|4[0-9]|5[0-9]|80)|B74|B76|B77|B78|DC10|MD11)/.test(designator)) return 'wide-body'
  if (/^(AT[467]|DH8|DHC6|SF34|E120|C208|PC12|BE20|L410|AN2[468]|AN3[028])/.test(designator)) return 'turboprop'
  if (/^(C25|C5[1256]|C6[058]|C7[05]|GLF|LJ|FA[12578]|CL3[05]|CL60|E5[05]P|PC24|H25B)/.test(designator)) return 'private-jet'
  if (category === 'A5') return 'wide-body'
  if (category === 'A3' || category === 'A4') return 'narrow-body'
  if (category === 'A1' || category === 'A2') return 'ga'
  return null
}

// adsb.lol / airplanes.live formát → rozšířený OpenSky formát.
// Zemi z ICAO adresy nehádáme: dvouznakové prefixy nejsou hranice států a
// předchozí implementace proto zobrazovala pro řadu letadel nesprávné vlajky.
function adsbToOpenSky(ac: Record<string, unknown>): unknown[] {
  const icao = String(ac.hex ?? '').toLowerCase()
  const callsign = String(ac.flight ?? '').trim()
  const lat = Number(ac.lat)
  const lon = Number(ac.lon)
  const alt = ac.alt_baro === 'ground' ? 0 : Number(ac.alt_baro ?? 0) * 0.3048
  const velocity = Number(ac.gs ?? 0) * 0.514444
  const heading = Number(ac.track ?? 0)
  const onGround = ac.alt_baro === 'ground' || alt < 10
  const now = Math.floor(Date.now() / 1000)
  const registration = String(ac.r ?? '').trim()
  const oat = ac.oat != null ? Number(ac.oat) : null
  const windSpeed = ac.ws != null ? Number(ac.ws) : null
  const mach = ac.mach != null ? Number(ac.mach) : null
  const baroRate = ac.baro_rate != null ? Number(ac.baro_rate) : null
  const squawk = ac.squawk != null ? String(ac.squawk) : null
  const emergency = ac.emergency != null && ac.emergency !== 'none' ? String(ac.emergency) : null
  const navAltitude = ac.nav_altitude_mcp != null ? Number(ac.nav_altitude_mcp) : null
  const model = String(ac.t ?? '').trim() || null
  const aircraftType = classifyAircraft(ac)

  return [
    icao, callsign, '', now, now, lon, lat, alt, onGround, velocity, heading,
    0, null, alt, squawk, false, registration, model, aircraftType, oat, windSpeed,
    mach, baroRate, squawk, emergency, navAltitude,
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
  return {
    source: 'adsb.lol',
    states: normalizeRows((data.ac ?? []).map(adsbToOpenSky)),
    fetchedAt: unixSeconds(data.now),
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
  return {
    source: 'airplanes.live',
    states: normalizeRows((data.ac ?? []).map(adsbToOpenSky)),
    fetchedAt: unixSeconds(data.now),
  }
}

function liveResponse(result: SourceResult, regionKey: string, summaryOnly: boolean) {
  return NextResponse.json(
    summaryOnly
      ? {
          count: result.states.length,
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
    return liveResponse(result, regionKey, summaryOnly)
  } catch (error) {
    console.error(`[FlyQueens] All live flight sources failed for ${regionKey}`, error)
    const cached = lastGoodSnapshots.get(regionKey)
    if (cached && Date.now() - cached.cachedAt <= MAX_STALE_MS) {
      return NextResponse.json(
        {
          ...(summaryOnly ? { count: cached.states.length } : { states: cached.states }),
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
