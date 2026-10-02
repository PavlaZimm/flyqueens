import 'server-only'
import { after } from 'next/server'
import { recordBoardSnapshot } from '@/lib/boardHistory'
import { getAeroSnapshot, airportFlightsPath } from '@/lib/aerodataboxCache'
import { getAeroDataBoxConnection } from '@/lib/aerodatabox'
import {
  airportBoardRefreshSeconds,
  airportFlightBoardByIata,
  type AirportBoardFlight,
  type AirportBoardResponse,
  type AirportFlightDirection,
} from '@/lib/airportFlightBoards'

import { normalizeFlight, type AeroFlight } from './aeroFlight'
interface AeroFids { departures?: AeroFlight[] | null; arrivals?: AeroFlight[] | null }

// Sestavení letištní tabule sdílí API /api/airport-flights i serverem
// vykreslená stránka odletů. Placená data jdou přes společnou mezipaměť.

function timeValue(flight: AirportBoardFlight): number {
  const time = flight.revisedTime ?? flight.scheduledTime
  return time ? Date.parse(time) || Number.MAX_SAFE_INTEGER : Number.MAX_SAFE_INTEGER
}

function normalizeFlights(flights: AeroFlight[] | null | undefined, direction: AirportFlightDirection) {
  const seen = new Set<string>()
  return (Array.isArray(flights) ? flights : [])
    .slice(0, 300)
    .map((flight, index) => normalizeFlight(flight, direction, index))
    .filter((flight): flight is AirportBoardFlight => {
      if (!flight) return false
      const key = `${flight.number}:${flight.scheduledTime ?? ''}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => timeValue(a) - timeValue(b))
    .slice(0, 120)
}

function baseResponse(iata: string): AirportBoardResponse | null {
  const airport = airportFlightBoardByIata(iata)
  if (!airport) return null
  return {
    status: 'unconfigured',
    airport: {
      name: airport.name,
      iata: airport.iata,
      icao: airport.icao,
      officialFlightsUrl: airport.officialFlightsUrl,
    },
    departures: [],
    arrivals: [],
    fetchedAt: null,
    source: 'official',
  }
}

/** Tabule pro letiště podle IATA kódu; null, pokud letiště nepodporujeme. */
export async function getAirportBoard(iata: string): Promise<AirportBoardResponse | null> {
  const response = baseResponse(iata)
  if (!response) return null

  if (!getAeroDataBoxConnection()) {
    return { ...response, message: 'Datová tabule zatím není aktivovaná. Použijte oficiální informace letiště.' }
  }

  try {
    const snapshot = await getAeroSnapshot<AeroFids>(airportFlightsPath(iata), airportBoardRefreshSeconds(iata))
    if (snapshot.data === null) {
      return {
        ...response,
        status: 'ready',
        source: 'aerodatabox',
        fetchedAt: snapshot.fetchedAt,
        message: 'Ve zvoleném časovém okně nejsou dostupné žádné lety.',
      }
    }

    const data = snapshot.data
    const departures = normalizeFlights(data.departures, 'departure')
    const arrivals = normalizeFlights(data.arrivals, 'arrival')
    // Snímek, který už máme zaplacený, si uložíme pro statistiku dochvilnosti.
    after(() => recordBoardSnapshot(iata, snapshot.fetchedAt, [...departures, ...arrivals]).catch((error) => {
      console.error('[airport-board] zápis snímku tabule selhal:', error)
    }))
    return {
      ...response,
      status: 'ready',
      source: 'aerodatabox',
      refreshMinutes: airportBoardRefreshSeconds(iata) / 60,
      fetchedAt: snapshot.fetchedAt,
      departures,
      arrivals,
    }
  } catch (error) {
    console.warn('[airport-board-read]', error instanceof Error ? error.message : 'Unavailable')
    return {
      ...response,
      status: 'unavailable',
      message: 'Datová tabule je dočasně nedostupná. Použijte oficiální informace letiště.',
    }
  }
}
