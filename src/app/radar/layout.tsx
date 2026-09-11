import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Živý radar letadel nad Českem | FlyQueens',
  description: 'Interaktivní mapa dostupných ADS-B dat o letadlech nad Českem a okolím. Vyhledejte let, registraci nebo ICAO adresu.',
  alternates: { canonical: 'https://www.flyqueens.cz/radar' },
}

export default function RadarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
