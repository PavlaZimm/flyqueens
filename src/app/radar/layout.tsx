import type { Metadata } from 'next'
import ReactDOM from 'react-dom'
import { socialMetadata } from '@/lib/socialMetadata'
import { RadarInfo } from '@/components/Radar/RadarInfo'
// Styly mapy jen pro radar, ostatní stránky je nepotřebují.
import 'leaflet/dist/leaflet.css'

export const metadata: Metadata = {
  title: 'Radar letadel online zdarma: živá mapa letů | FlyQueens',
  description: 'Radar letadel online zdarma: mapa letů nad Českem a Evropou se obnovuje každých 10 sekund. Najděte let podle volacího znaku, registrace nebo ICAO adresy.',
  alternates: { canonical: 'https://www.flyqueens.cz/radar' },
  ...socialMetadata({
    title: 'Radar letadel online zdarma: živá mapa letů | FlyQueens',
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
