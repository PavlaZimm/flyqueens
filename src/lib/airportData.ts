import rawAirports from '@/data/airports.json'

export interface Airport {
  icao: string
  iata: string
  name: string
  lat: number
  lng: number
  type: 'large_airport' | 'medium_airport' | 'small_airport'
  country: string
  city: string
  elev: number
}

export const airports: Airport[] = rawAirports as Airport[]

export function airportDisplayName(a: Airport): string {
  return a.iata ? `${a.iata} · ${a.city || a.name}` : a.city || a.name
}
