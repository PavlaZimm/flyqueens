import type { Flight } from '@/types/flight'

export interface FlightPhase {
  label: string
  icon: string
  color: string   // CSS var nebo hex
}

// Odvodí fázi letu z výšky, vertikální rychlosti a stavu na zemi.
// baroRate je ve ft/min (+ stoupání, − klesání), altitude v metrech.
export function getFlightPhase(flight: Flight): FlightPhase {
  const alt = flight.altitude          // m
  const rate = flight.baroRate ?? 0    // ft/min
  const vel = flight.velocity          // km/h

  if (flight.onGround) {
    return vel > 30
      ? { label: 'Pojíždí', icon: '🛞', color: 'var(--text-muted)' }
      : { label: 'Na zemi', icon: '🛑', color: 'var(--text-muted)' }
  }

  // Nízko nad zemí → vzlet nebo přistání
  if (alt < 900) {
    if (rate > 200)  return { label: 'Startuje', icon: '🛫', color: 'var(--green-live)' }
    if (rate < -200) return { label: 'Přistává', icon: '🛬', color: 'var(--accent-blue)' }
  }

  if (rate > 300)  return { label: 'Stoupá',   icon: '↗', color: 'var(--green-live)' }
  if (rate < -300) return { label: 'Klesá',    icon: '↘', color: 'var(--accent-blue)' }

  return { label: 'Cestovní', icon: '✈', color: 'var(--gold)' }
}
