import type { Metadata } from 'next'
import ReactDOM from 'react-dom'
import { socialMetadata } from '@/lib/socialMetadata'
// Styly mapy jen pro radar, ostatní stránky je nepotřebují.
import 'leaflet/dist/leaflet.css'

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
  ReactDOM.preconnect('https://tile.openstreetmap.org', { crossOrigin: 'anonymous' })
  return children
}
