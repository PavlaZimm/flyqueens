export type AircraftType =
  | 'narrow-body'
  | 'wide-body'
  | 'turboprop'
  | 'private-jet'
  | 'cargo'
  | 'military'
  | 'helicopter'
  | 'ga'
  | 'unknown'

export type FlightDataSource = 'adsb.lol' | 'opensky' | 'airplanes.live'

export type FlightDataStatus = 'live' | 'stale' | 'unavailable'

export interface Flight {
  icao24: string        // unikátní ID (ICAO24 hex)
  callsign: string      // např. "OK-FLY"
  lat: number
  lng: number
  altitude: number      // metry
  velocity: number      // km/h (přepočteno z m/s)
  heading: number       // stupně 0-360
  onGround: boolean
  positionUpdatedAt?: number // Unix timestamp poslední skutečné polohy
  lastContactAt?: number     // Unix timestamp poslední ADS-B zprávy
  aircraftType?: AircraftType
  typeDesignator?: string   // ICAO typový kód z ADS-B (např. "A320"), ne přesný model
  model?: string            // přesný model z aircraft DB (např. "A320-214")
  registration?: string     // poznávací značka (např. "OK-SWW")
  origin_country?: string
  oat?: number              // teplota venku v °C
  windSpeed?: number        // rychlost větru v uzlech
  mach?: number             // Mach číslo
  baroRate?: number         // ft/min — kladné = stoupání, záporné = klesání
  squawk?: string           // transponder kód (7700=emergency, 7500=hijack, 7600=radio)
  emergency?: string        // emergency typ z adsb.lol
  navAltitudeFt?: number    // autopilot target altitude v ft
  iasKts?: number           // indikovaná rychlost v uzlech
  tasKts?: number           // pravá rychlost v uzlech
  navHeading?: number       // kurz nastavený v autopilotu
  navQnh?: number           // QNH nastavené v autopilotu v hPa
  geomRate?: number         // geometrické stoupání/klesání v ft/min
  roll?: number             // náklon v stupních
  navModes?: string[]       // aktivní navigační režimy hlášené přes ADS-B
}

export interface FlightDataMeta {
  status: FlightDataStatus
  source: FlightDataSource | null
  fetchedAt: number | null  // Unix timestamp v sekundách
  message?: string
}
