import type { Flight, AircraftType } from '@/types/flight'

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

// Heuristika pro typ letadla z ICAO prefixu
function guessAircraftType(icao24: string): AircraftType {
  const prefix = icao24.substring(0, 2).toLowerCase()

  // Vojenské — specifické prefixy
  if (['ae', 'ad'].includes(prefix)) return 'military'

  // Vrtulníky — obecně nelze z ICAO odvodit, ale zkusíme délku
  // Náhodná heuristika — pro full implementaci by bylo třeba databázi
  const hex = parseInt(icao24, 16)

  // GA letadla — Cessna, Piper apod. (obvykle nižší hex hodnoty v daných registrech)
  // CZ: OK prefix = 0x49C000–0x49FFFF
  if (hex >= 0x49C000 && hex <= 0x49FFFF) return 'ga'

  // Wide-body — obvykle velcí dopravci
  if (['4c', '4d', 'a8', 'a9', 'aa', 'ab', 'ac'].includes(prefix)) return 'wide-body'

  // Turboprop
  if (['06', '07', '08'].includes(prefix)) return 'turboprop'

  return 'narrow-body'
}

function parseState(state: unknown[]): Flight | null {
  const arr = state as Array<unknown>
  const lat = arr[IDX_LAT] as number | null
  const lng = arr[IDX_LNG] as number | null

  if (lat === null || lng === null) return null

  const icao24 = String(arr[IDX_ICAO24] ?? '')
  const callsign = String(arr[IDX_CALLSIGN] ?? '').trim() || icao24.toUpperCase()
  const velocity = ((arr[IDX_VELOCITY] as number | null) ?? 0) * 3.6 // m/s → km/h
  const altitude = (arr[IDX_ALT_BARO] as number | null) ?? 0
  const heading = (arr[IDX_HEADING] as number | null) ?? 0
  const onGround = Boolean(arr[IDX_ON_GROUND])
  const origin_country = (arr[IDX_ORIGIN_COUNTRY] as string | null) ?? undefined

  // Layout: [16]=reg [17]=model(db) [18]=type(db) [19]=oat [20]=ws [21]=mach [22]=baroRate [23]=squawk [24]=emergency [25]=navAlt
  const registration = arr[16] ? String(arr[16]) : undefined
  const dbModel  = arr[17] ? String(arr[17]) : undefined
  const dbType   = arr[18] ? (arr[18] as AircraftType) : undefined
  const oat      = arr[19] != null ? Number(arr[19]) : undefined
  const windSpeed = arr[20] != null ? Number(arr[20]) : undefined
  const mach     = arr[21] != null ? Number(arr[21]) : undefined
  const baroRate = arr[22] != null ? Number(arr[22]) : undefined  // ft/min, + = stoupání
  const squawk   = arr[23] ? String(arr[23]) : undefined
  const emergency = arr[24] ? String(arr[24]) : undefined
  const navAltFt = arr[25] != null ? Number(arr[25]) : undefined  // autopilot target ft

  return {
    icao24,
    callsign,
    lat,
    lng,
    altitude: Math.round(altitude),
    velocity: Math.round(velocity),
    heading: Math.round(heading),
    onGround,
    aircraftType: dbType ?? guessAircraftType(icao24),
    model: dbModel,
    registration: registration || undefined,
    origin_country,
    oat,
    windSpeed,
    mach,
    baroRate,
    squawk,
    emergency,
    navAltitudeFt: navAltFt,
  }
}

export async function fetchFlights(region = 'europe'): Promise<{ flights: Flight[]; isMock: boolean }> {
  const res = await fetch(`/api/flights?region=${encodeURIComponent(region)}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) {
    throw new Error(`OpenSky API error: ${res.status}`)
  }

  const data = await res.json() as { states?: unknown[][]; _mock?: boolean }
  if (!data.states) return { flights: [], isMock: false }

  return {
    flights: data.states.map(parseState).filter((f): f is Flight => f !== null),
    isMock: data._mock === true,
  }
}
