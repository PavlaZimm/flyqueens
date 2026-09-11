import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Živý radar letadel nad Českem a Evropou | FlyQueens',
  description: 'Interaktivní mapa dostupných ADS-B dat o letadlech nad Českem a v dalších oblastech Evropy. Vyhledejte let, registraci nebo ICAO adresu.',
  alternates: { canonical: 'https://www.flyqueens.cz/radar' },
  openGraph: {
    title: 'Živý radar letadel nad Českem a Evropou | FlyQueens',
    description: 'Sledujte dostupná ADS-B data o letadlech na přehledné interaktivní mapě.',
    url: 'https://www.flyqueens.cz/radar',
    type: 'website',
  },
}

export default function RadarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
