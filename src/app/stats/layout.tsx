import type { Metadata } from 'next'

// Stats stránka je client component, metadata proto žijí v tomhle layoutu.
export const metadata: Metadata = {
  title: 'Živé statistiky letového provozu nad Evropou | FlyQueens',
  description:
    'Kolik letadel je právě ve vzduchu, které aerolinky vedou, průměrné výšky a rychlosti. Živé statistiky z ADS-B dat, obnovované každých 10 sekund.',
  alternates: { canonical: 'https://www.flyqueens.cz/stats' },
}

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return children
}
