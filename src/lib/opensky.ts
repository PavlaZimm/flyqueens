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

type FlightWireFormat = 'opensky-extended-v1' | 'compact-v1'

function parseState(state: unknown[], format: FlightWireFormat): Flight | null {
  const arr = state as Array<unknown>
  const compact = format === 'compact-v1'
  const at = (legacyIndex: number, compactIndex: number): unknown => arr[compact ? compactIndex : legacyIndex]
  const lat = at(IDX_LAT, 5) as number | null
  const lng = at(IDX_LNG, 4) as number | null

  // Odmítni chybějící i NaN souřadnice — jinak spadne Leaflet flyTo/marker
  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) return null

  const icao24 = String(at(IDX_ICAO24, 0) ?? '')
  const reportedCallsign = String(at(IDX_CALLSIGN, 1) ?? '').trim()
  const callsign = reportedCallsign || icao24.toUpperCase()
  const velocity = ((at(IDX_VELOCITY, 8) as number | null) ?? 0) * 3.6 // m/s → km/h
  const altitude = (at(IDX_ALT_BARO, 6) as number | null) ?? 0
  const reportedHeading = at(IDX_HEADING, 9) as number | null
  const heading = Number.isFinite(reportedHeading) ? Number(reportedHeading) : 0
  const onGround = Boolean(at(IDX_ON_GROUND, 7))
  const origin_country = (at(IDX_ORIGIN_COUNTRY, 10) as string | null) ?? undefined

  // Rozšířený layout za nativními OpenSky poli. [17] je pouze ICAO typový
  // designátor (A320), nikoliv přesný výrobní model letadla.
  const registrationValue = at(16, 11)
  const typeDesignatorValue = at(17, 12)
  const dbTypeValue = at(18, 13)
  const oatValue = at(19, 14)
  const windSpeedValue = at(20, 15)
  const machValue = at(21, 16)
  const baroRateValue = at(22, 17)
  const registration = registrationValue ? String(registrationValue) : undefined
  const typeDesignator = typeDesignatorValue ? String(typeDesignatorValue) : undefined
  const dbType = dbTypeValue ? (dbTypeValue as AircraftType) : undefined
  const oat = oatValue != null ? Number(oatValue) : undefined
  const windSpeed = windSpeedValue != null ? Number(windSpeedValue) : undefined
  const mach = machValue != null ? Number(machValue) : undefined
  const baroRate = baroRateValue != null ? Number(baroRateValue) : undefined  // ft/min, + = stoupání
  // OpenSky vrací squawk na indexu 14, rozšířený ADS-B formát ho duplikuje na 23.
  const squawkValue = compact ? arr[18] : (arr[23] ?? arr[14])
  const emergencyValue = at(24, 19)
  const navAltitudeValue = at(25, 20)
  const iasValue = at(27, 21)
  const tasValue = at(28, 22)
  const navHeadingValue = at(29, 23)
  const navQnhValue = at(30, 24)
  const geomRateValue = at(31, 25)
  const rollValue = at(32, 26)
  const navModesValue = at(33, 27)
  const squawk = squawkValue ? String(squawkValue) : undefined
  const emergency = normalizeEmergency(emergencyValue)
  const navAltFt = navAltitudeValue != null ? Number(navAltitudeValue) : undefined  // autopilot target ft
  const iasKts = iasValue != null ? Number(iasValue) : undefined
  const tasKts = tasValue != null ? Number(tasValue) : undefined
  const navHeading = navHeadingValue != null ? Number(navHeadingValue) : undefined
  const navQnh = navQnhValue != null ? Number(navQnhValue) : undefined
  const geomRate = geomRateValue != null ? Number(geomRateValue) : undefined
  const roll = rollValue != null ? Number(rollValue) : undefined
  const navModes = Array.isArray(navModesValue)
    ? navModesValue.map((mode) => String(mode)).filter(Boolean)
    : undefined

  return {
    icao24,
    callsign,
    callsignReported: Boolean(reportedCallsign),
    lat,
    lng,
    altitude: Math.round(altitude),
    velocity: Math.round(velocity),
    heading: Math.round(heading),
    headingReported: Number.isFinite(reportedHeading),
    onGround,
    positionUpdatedAt: unixTimestamp(at(IDX_TIME_POSITION, 2)),
    lastContactAt: unixTimestamp(at(IDX_LAST_CONTACT, 3)),
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
  const res = await fetch(`/api/flights?region=${encodeURIComponent(region)}&format=compact`, {
    // Odpověď má krátkou CDN cache řízenou serverem. `no-store` v klientovi by
    // ji při každém pollu zbytečně obcházel.
    signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
  })

  const data = await res.json() as {
    states?: unknown[][]
    format?: FlightWireFormat
    source?: FlightDataSource | null
    fetchedAt?: number | null
    status?: FlightDataStatus
    message?: string
  }

  if (!res.ok) {
    throw new Error(data.message ?? `Live data API error: ${res.status}`)
  }

  return {
    flights: (data.states ?? [])
      .map((state) => parseState(state, data.format ?? 'opensky-extended-v1'))
      .filter((f): f is Flight => f !== null),
    meta: {
      status: data.status ?? 'unavailable',
      source: data.source ?? null,
      fetchedAt: data.fetchedAt ?? null,
      message: data.message,
    },
  }
}
