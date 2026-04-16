export type AircraftType =
  | 'narrow-body'
  | 'wide-body'
  | 'turboprop'
  | 'private-jet'
  | 'cargo'
  | 'military'
  | 'helicopter'
  | 'ga'

export interface Flight {
  icao24: string        // unikátní ID (ICAO24 hex)
  callsign: string      // např. "OK-FLY"
  lat: number
  lng: number
  altitude: number      // metry
  velocity: number      // km/h (přepočteno z m/s)
  heading: number       // stupně 0-360
  onGround: boolean
  aircraftType?: AircraftType
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
}
