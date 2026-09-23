import { SiteHeader } from '@/components/UI/SiteHeader'
import type { Metadata } from 'next'
import { SiteFooter } from '@/components/UI/SiteFooter'
import { socialMetadata } from '@/lib/socialMetadata'

// Stats stránka je client component, metadata proto žijí v tomhle layoutu.
export const metadata: Metadata = {
  title: 'Živé statistiky letadel v Evropě | FlyQueens',
  description:
    'Aktuální ADS-B snímek z vybrané oblasti Evropy: počet letadel, výšky, rychlosti, směry letu a úplnost živých dat.',
  alternates: { canonical: 'https://www.flyqueens.cz/stats' },
  ...socialMetadata({
    title: 'Živé statistiky letadel v Evropě | FlyQueens',
    description: 'Aktuální počet zachycených letadel, výšky, rychlosti, směry letu a kvalita dostupných ADS-B dat.',
    url: 'https://www.flyqueens.cz/stats',
  }),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
    { '@type': 'ListItem', position: 2, name: 'Statistiky', item: 'https://www.flyqueens.cz/stats' },
  ],
}

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader activeSection="stats" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
      <SiteFooter />
    </>
  )
}
