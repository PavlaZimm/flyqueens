import type { Flight } from '@/types/flight'

export interface AircraftBadge {
  label: string
  icon: string
}

// Vrátí odznak pro „zajímavá" letadla — jinak null.
// Superjumbo, jumbo, vojenské, vrtulníky, nákladní.
export function getAircraftBadge(flight: Flight): AircraftBadge | null {
  const model = (flight.model ?? '').toUpperCase()
  const type = flight.aircraftType

  if (model.includes('A380') || model.includes('380'))
    return { label: 'Superjumbo A380', icon: '👑' }
  if (model.includes('747') || model.includes('B74'))
    return { label: 'Jumbo Jet 747', icon: '🐘' }
  if (model.includes('A350') || model.includes('777') || model.includes('787') || model.includes('B77') || model.includes('B78'))
    return { label: 'Širokotrupý', icon: '🛩' }

  if (type === 'military')   return { label: 'Vojenské letadlo', icon: '🎖' }
  if (type === 'helicopter') return { label: 'Vrtulník', icon: '🚁' }
  if (type === 'cargo')      return { label: 'Nákladní', icon: '📦' }

  return null
}
