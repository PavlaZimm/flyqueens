import type { AirportBoardFlight } from './airportFlightBoards'
export interface SpottingHighlight { title: string; reason: string; rank: number; tone: 'gold' | 'blue' | 'purple' }
export function spottingHighlight(flight: Pick<AirportBoardFlight, 'aircraft' | 'isCargo'>): SpottingHighlight | null {
  const model = (flight.aircraft?.model ?? '').toUpperCase().replace(/[\s-]+/g, '')
  if (/A(?:IRBUS)?380|^A38[08]/.test(model)) return { title: 'A380 · superjumbo', reason: 'Dvoupodlažní širokotrupý Airbus', rank: 100, tone: 'gold' }
  if (/747|^B74[0-9S]/.test(model)) return { title: 'Boeing 747 · jumbo', reason: 'Čtyřmotorový Boeing s typickou horní palubou', rank: 95, tone: 'gold' }
  if (/AN(?:TONOV)?124/.test(model)) return { title: 'Antonov An-124', reason: 'Velký nákladní letoun', rank: 90, tone: 'gold' }
  if (/A(?:IRBUS)?3[345]0|^A3[345][0-9]|BOEING7(?:67|77|87)|^B7[678][0-9A-Z]|^7(?:67|77|87)/.test(model)) return { title: 'Širokotrupé letadlo', reason: 'Velký dopravní typ se dvěma uličkami', rank: 60, tone: 'blue' }
  if (flight.isCargo) return { title: 'Nákladní let', reason: 'Zdroj označuje tento let jako nákladní', rank: 50, tone: 'purple' }
  return null
}
export function sunsetCountdown(sunset: string | null, now: number): string {
  if (!sunset || !Number.isFinite(Date.parse(sunset))) return 'Čas západu zatím není dostupný'
  const minutes = Math.ceil((Date.parse(sunset) - now) / 60000)
  if (minutes <= 0) return 'Slunce už dnes zapadlo'
  const hours = Math.floor(minutes / 60), rest = minutes % 60
  return `Do západu ${hours ? `${hours} h ` : ''}${rest} min`
}
