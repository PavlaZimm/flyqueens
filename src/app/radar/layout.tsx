import type { Metadata } from 'next'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Živá mapa letadel nad Evropou | FlyQueens',
  description: 'Interaktivní mapa dostupných ADS-B dat ve vybraných oblastech Evropy. Vyhledejte let, registraci nebo ICAO adresu.',
  alternates: { canonical: 'https://www.flyqueens.cz/radar' },
  ...socialMetadata({
    title: 'Živá mapa letadel nad Evropou | FlyQueens',
    description: 'Sledujte dostupná ADS-B data o letadlech na přehledné interaktivní mapě.',
    url: 'https://www.flyqueens.cz/radar',
  }),
}

export default function RadarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
