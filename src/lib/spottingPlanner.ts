import type { AirportBoardFlight } from './airportFlightBoards'
import { pragueDate } from './flightSearch'

export const arrivalTime = (flight: AirportBoardFlight) => Date.parse(flight.revisedTime ?? flight.scheduledTime ?? '')
export function sunsetArrivals(flights: AirportBoardFlight[], sunset: string | null, now: number) {
  const end = Date.parse(sunset ?? '')
  if (!Number.isFinite(end) || pragueDate(new Date(end)) !== pragueDate(new Date(now))) return null
  const start = end - 3600000, finish = end + 1800000
  return {
    start, sunset: end, finish,
    ended: now > finish,
    flights: flights.filter(flight => !/^(arrived|canceled|cancelled|diverted)$/i.test(flight.status)
      && arrivalTime(flight) >= Math.max(start, now) && arrivalTime(flight) <= finish)
      .sort((a, b) => arrivalTime(a) - arrivalTime(b)),
  }
}
export function arrivalCountdown(flight: AirportBoardFlight, now: number) {
  const minutes = Math.max(0, Math.ceil((arrivalTime(flight) - now) / 60000))
  if (!Number.isFinite(minutes)) return 'Čas zatím neznáme'
  return minutes >= 60 ? `za ${Math.floor(minutes / 60)} h ${minutes % 60} min` : minutes ? `za ${minutes} min` : 'každou chvíli'
}
