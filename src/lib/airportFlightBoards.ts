export interface AirportFlightBoardConfig {
  slug: string
  city: string
  name: string
  iata: string
  icao: string
  officialFlightsUrl: string
}

export const AIRPORT_FLIGHT_BOARDS: AirportFlightBoardConfig[] = [
  {
    slug: 'praha',
    city: 'Praha',
    name: 'Letiště Václava Havla Praha',
    iata: 'PRG',
    icao: 'LKPR',
    officialFlightsUrl: 'https://www.prg.aero/prehled-letu?hour=all',
  },
  {
    slug: 'brno',
    city: 'Brno',
    name: 'Letiště Brno-Tuřany',
    iata: 'BRQ',
    icao: 'LKTB',
    officialFlightsUrl: 'https://www.brno-airport.cz/informace-o-letech',
  },
  {
    slug: 'ostrava',
    city: 'Ostrava',
    name: 'Letiště Leoše Janáčka Ostrava',
    iata: 'OSR',
    icao: 'LKMT',
    officialFlightsUrl: 'https://www.airport-ostrava.cz/p/aktualni-prilety-a-odlety',
  },
  {
    slug: 'pardubice',
    city: 'Pardubice',
    name: 'Letiště Pardubice',
    iata: 'PED',
    icao: 'LKPD',
    officialFlightsUrl: 'https://www.airport-pardubice.cz/letovy-rad/',
  },
  {
    slug: 'karlovy-vary',
    city: 'Karlovy Vary',
    name: 'Letiště Karlovy Vary',
    iata: 'KLV',
    icao: 'LKKV',
    officialFlightsUrl: 'https://www.airport-k-vary.cz/cs/odlety/',
  },
]

export function airportFlightBoardBySlug(slug: string): AirportFlightBoardConfig | undefined {
  return AIRPORT_FLIGHT_BOARDS.find((airport) => airport.slug === slug)
}

export function airportFlightBoardByIata(iata: string): AirportFlightBoardConfig | undefined {
  return AIRPORT_FLIGHT_BOARDS.find((airport) => airport.iata === iata.toUpperCase())
}

export type AirportFlightDirection = 'departure' | 'arrival'

export interface AirportBoardFlight {
  id: string
  direction: AirportFlightDirection
  number: string
  callSign: string | null
  airline: string | null
  status: string
  scheduledTime: string | null
  revisedTime: string | null
  terminal: string | null
  gate: string | null
  checkInDesk: string | null
  baggageBelt: string | null
  oppositeAirport: {
    name: string | null
    city: string | null
    iata: string | null
    icao: string | null
  }
  aircraft: {
    registration: string | null
    modeS: string | null
    model: string | null
  } | null
  isCargo: boolean
  hasLiveData: boolean
}

export interface AirportBoardResponse {
  status: 'ready' | 'unconfigured' | 'unavailable'
  airport: Pick<AirportFlightBoardConfig, 'name' | 'iata' | 'icao' | 'officialFlightsUrl'>
  departures: AirportBoardFlight[]
  arrivals: AirportBoardFlight[]
  fetchedAt: string | null
  source: 'aerodatabox' | 'official'
  refreshMinutes?: number
  message?: string
}

// Paid requests happen only on demand. Fixed keys share results across readers.
export function airportBoardRefreshSeconds(iata: string): number {
  return iata === 'PRG' ? 3600 : 21600
}
