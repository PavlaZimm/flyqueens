import type { AirportBoardFlight } from './airportFlightBoards'
export function upcomingArrivals(flights: AirportBoardFlight[], now: number): AirportBoardFlight[] {
  return flights.filter(flight => {
    if (/^(arrived|canceled|cancelled|diverted)$/i.test(flight.status)) return false
    const time = Date.parse(flight.revisedTime ?? flight.scheduledTime ?? '')
    return Number.isFinite(time) && time >= now && time <= now + 6 * 3600000
  }).sort((a, b) => Date.parse(a.revisedTime ?? a.scheduledTime ?? '') - Date.parse(b.revisedTime ?? b.scheduledTime ?? ''))
}
