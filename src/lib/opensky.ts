import type { Flight, AircraftType, FlightDataMeta, FlightDataSource, FlightDataStatus } from '@/types/flight'
import { normalizeEmergency } from '@/lib/emergency'

// OpenSky state vector indexes
const IDX_ICAO24 = 0
const IDX_CALLSIGN = 1
const IDX_ORIGIN_COUNTRY = 2
const IDX_LAT = 6
const IDX_LNG = 5
const IDX_ALT_BARO = 7
const IDX_ON_GROUND = 8
const IDX_VELOCITY = 9
const IDX_HEADING = 10
const IDX_TIME_POSITION = 3
const IDX_LAST_CONTACT = 4

function unixTimestamp(value: unknown): number | undefined {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : undefined
}

function parseState(state: unknown[]): Flight | null {
  const arr = state as Array<unknown>
  const lat = arr[IDX_LAT] as number | null
  const lng = arr[IDX_LNG] as number | null

  // Odmítni chybějící i NaN souřadnice — jinak spadne Leaflet flyTo/marker
  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) return null

  const icao24 = String(arr[IDX_ICAO24] ?? '')
  const callsign = String(arr[IDX_CALLSIGN] ?? '').trim() || icao24.toUpperCase()
  const velocity = ((arr[IDX_VELOCITY] as number | null) ?? 0) * 3.6 // m/s → km/h
  const altitude = (arr[IDX_ALT_BARO] as number | null) ?? 0
  const heading = (arr[IDX_HEADING] as number | null) ?? 0
  const onGround = Boolean(arr[IDX_ON_GROUND])
  const origin_country = (arr[IDX_ORIGIN_COUNTRY] as string | null) ?? undefined

  // Rozšířený layout za nativními OpenSky poli. [17] je pouze ICAO typový
  // designátor (A320), nikoliv přesný výrobní model letadla.
  const registration = arr[16] ? String(arr[16]) : undefined
  const typeDesignator = arr[17] ? String(arr[17]) : undefined
  const dbType   = arr[18] ? (arr[18] as AircraftType) : undefined
  const oat      = arr[19] != null ? Number(arr[19]) : undefined
  const windSpeed = arr[20] != null ? Number(arr[20]) : undefined
  const mach     = arr[21] != null ? Number(arr[21]) : undefined
  const baroRate = arr[22] != null ? Number(arr[22]) : undefined  // ft/min, + = stoupání
  // OpenSky vrací squawk na indexu 14, rozšířený ADS-B formát ho duplikuje na 23.
  const squawk   = arr[23] ? String(arr[23]) : (arr[14] ? String(arr[14]) : undefined)
  const emergency = normalizeEmergency(arr[24])
  const navAltFt = arr[25] != null ? Number(arr[25]) : undefined  // autopilot target ft
  const iasKts = arr[27] != null ? Number(arr[27]) : undefined
  const tasKts = arr[28] != null ? Number(arr[28]) : undefined
  const navHeading = arr[29] != null ? Number(arr[29]) : undefined
  const navQnh = arr[30] != null ? Number(arr[30]) : undefined
  const geomRate = arr[31] != null ? Number(arr[31]) : undefined
  const roll = arr[32] != null ? Number(arr[32]) : undefined
  const navModes = Array.isArray(arr[33])
    ? arr[33].map((mode) => String(mode)).filter(Boolean)
    : undefined

  return {
    icao24,
    callsign,
    lat,
    lng,
    altitude: Math.round(altitude),
    velocity: Math.round(velocity),
    heading: Math.round(heading),
    onGround,
    positionUpdatedAt: unixTimestamp(arr[IDX_TIME_POSITION]),
    lastContactAt: unixTimestamp(arr[IDX_LAST_CONTACT]),
    aircraftType: dbType ?? 'unknown',
    typeDesignator,
    registration: registration || undefined,
    origin_country,
    oat,
    windSpeed,
    mach,
    baroRate,
    squawk,
    emergency,
    navAltitudeFt: navAltFt,
    iasKts,
    tasKts,
    navHeading,
    navQnh,
    geomRate,
    roll,
    navModes,
  }
}

export async function fetchFlights(
  region = 'europe',
  signal?: AbortSignal,
): Promise<{ flights: Flight[]; meta: FlightDataMeta }> {
  const timeoutSignal = AbortSignal.timeout(6500)
  const res = await fetch(`/api/flights?region=${encodeURIComponent(region)}`, {
    // Odpověď má krátkou CDN cache řízenou serverem. `no-store` v klientovi by
    // ji při každém pollu zbytečně obcházel.
    signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
  })

  const data = await res.json() as {
    states?: unknown[][]
    source?: FlightDataSource | null
    fetchedAt?: number | null
    status?: FlightDataStatus
    message?: string
  }

  if (!res.ok) {
    throw new Error(data.message ?? `Live data API error: ${res.status}`)
  }

  return {
    flights: (data.states ?? []).map(parseState).filter((f): f is Flight => f !== null),
    meta: {
      status: data.status ?? 'unavailable',
      source: data.source ?? null,
      fetchedAt: data.fetchedAt ?? null,
      message: data.message,
    },
  }
}
