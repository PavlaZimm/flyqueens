import { getTimes, getPosition } from 'suncalc'
import { pragueDate } from './flightSearch'
import type { SolarTimes, InsightData } from './aeroInsights'

const LAT = 50.1009
const LON = 14.2599
export interface PragueLight extends SolarTimes {
  goldenHourStart: string | null
  sunsetAzimuth: number | null
  azimuth: number
  altitude: number
}
const iso = (date: Date | null) => date && Number.isFinite(date.getTime()) ? date.toISOString() : null
export function pragueLight(now: number): PragueLight {
  // Noon UTC always belongs to the selected Prague civil day, including DST changes.
  const times = getTimes(new Date(`${pragueDate(new Date(now))}T12:00:00Z`), LAT, LON)
  const position = getPosition(new Date(now), LAT, LON)
  return {
    sunrise: iso(times.sunrise), sunset: iso(times.sunset), dawnCivil: iso(times.dawn), duskCivil: iso(times.dusk),
    goldenHourStart: iso(times.goldenHour), sunsetAzimuth: times.sunset ? getPosition(times.sunset, LAT, LON).azimuth : null,
    azimuth: position.azimuth, altitude: position.altitude,
  }
}
export function solarInsight(now = Date.now()): InsightData {
  return { solar: pragueLight(now), sections: [], fetchedAt: new Date(now).toISOString(),
    note: 'Astronomický výpočet SunCalc pro letiště Praha. Nezohledňuje místní překážky ani oblačnost.' }
}
export function compass(degrees: number) {
  return ['sever', 'severovýchod', 'východ', 'jihovýchod', 'jih', 'jihozápad', 'západ', 'severozápad'][Math.round(degrees / 45) % 8]
}
