import type { Metadata } from 'next'
import { SiteFooter } from '@/components/UI/SiteFooter'
import { socialMetadata } from '@/lib/socialMetadata'

// Stats stránka je client component, metadata proto žijí v tomhle layoutu.
export const metadata: Metadata = {
  title: 'Živé statistiky letového provozu nad Českem | FlyQueens',
  description:
    'Kolik letadel je právě ve vzduchu nad Českem a okolím, které aerolinky vedou, průměrné výšky a rychlosti. Dostupná ADS-B data obnovovaná každých 10 sekund.',
  alternates: { canonical: 'https://www.flyqueens.cz/stats' },
  ...socialMetadata({
    title: 'Živé statistiky letového provozu nad Českem | FlyQueens',
    description: 'Počet zachycených letadel, výšky, rychlosti a aerolinky v aktuálních ADS-B datech.',
    url: 'https://www.flyqueens.cz/stats',
  }),
}

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}
