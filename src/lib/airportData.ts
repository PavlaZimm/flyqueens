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

let _cache: Airport[] | null = null

export async function fetchAirports(): Promise<Airport[]> {
  if (_cache) return _cache
  const res = await fetch('/airports.json')
  _cache = await res.json()
  return _cache!
}

export function airportDisplayName(a: Airport): string {
  return a.iata ? `${a.iata} · ${a.city || a.name}` : a.city || a.name
}
