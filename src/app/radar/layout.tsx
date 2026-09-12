import type { Metadata } from 'next'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Radar letadel: živá mapa letadel online | FlyQueens',
  description: 'Sledujte letadla online na živém radaru nad Evropou. Vyhledejte let, registraci nebo ICAO adresu a zobrazte dostupnou výšku, rychlost a trasu.',
  alternates: { canonical: 'https://www.flyqueens.cz/radar' },
  ...socialMetadata({
    title: 'Radar letadel: živá mapa letadel online | FlyQueens',
    description: 'Sledujte dostupná ADS-B data o letadlech na přehledné interaktivní mapě Evropy.',
    url: 'https://www.flyqueens.cz/radar',
  }),
}

export default function RadarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
