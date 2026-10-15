import type { Metadata } from 'next'
import ReactDOM from 'react-dom'
import { socialMetadata } from '@/lib/socialMetadata'
import { RadarInfo } from '@/components/Radar/RadarInfo'
// Styly mapy jen pro radar, ostatní stránky je nepotřebují.
import 'leaflet/dist/leaflet.css'

export const metadata: Metadata = {
  title: 'Letecký radar online zdarma: živá mapa letadel | FlyQueens',
  description: 'Letecký radar a radar letadel online zdarma: mapa nad Českem a Evropou se obnovuje každých 10 sekund. Najděte let podle volacího znaku nebo registrace.',
  alternates: { canonical: 'https://www.flyqueens.cz/radar' },
  ...socialMetadata({
    title: 'Letecký radar online zdarma: živá mapa letadel | FlyQueens',
    description: 'Sledujte dostupná ADS-B data o letadlech na přehledné interaktivní mapě Evropy.',
    url: 'https://www.flyqueens.cz/radar',
  }),
}

export default function RadarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  ReactDOM.preconnect('https://tile.openstreetmap.org', { crossOrigin: 'anonymous' })
  return (
    <>
      {children}
      <RadarInfo />
    </>
  )
}
