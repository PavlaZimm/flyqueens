import type { Flight } from '@/types/flight'

export interface FlightPhase {
  label: string
  icon: string
  color: string   // CSS var nebo hex
}

// Popisuje pouze stav, který lze doložit přímo z ADS-B. Z barometrické výšky
// bez výšky terénu nelze poctivě určit vzlet, přistání ani cestovní fázi.
export function getFlightPhase(flight: Flight): FlightPhase {
  const rate = flight.baroRate ?? flight.geomRate

  if (flight.onGround) {
    return { label: 'Na zemi', icon: '●', color: 'var(--text-muted)' }
  }

  if (rate == null || !Number.isFinite(rate)) {
    return { label: 'Ve vzduchu', icon: '✈', color: 'var(--gold)' }
  }
  if (rate > 100) return { label: 'Stoupá', icon: '↗', color: 'var(--green-live)' }
  if (rate < -100) return { label: 'Klesá', icon: '↘', color: 'var(--accent-blue)' }

  return { label: 'Výška stabilní', icon: '→', color: 'var(--gold)' }
}
