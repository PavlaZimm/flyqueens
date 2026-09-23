import type { Metadata } from 'next'
import Link from 'next/link'
import { AirportDiagram } from '@/components/Airport/AirportDiagram'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'
import { ArticleContents } from '@/components/UI/ArticleContents'

export const metadata: Metadata = {
  title: 'Letiště České Budějovice: parkování, doprava a odbavení',
  description: 'Letiště České Budějovice prakticky: parkování zdarma na dvou parkovištích, kyvadlová doprava k terminálu, kdy dorazit na odbavení a oficiální odlety.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/ceske-budejovice' },
  ...socialMetadata({
    title: 'Letiště České Budějovice: parkování, doprava a odbavení | FlyQueens',
    description: 'Parkování zdarma, kyvadlová doprava, odbavení a ověřené odkazy pro letiště JCL u Plané.',
    url: 'https://www.flyqueens.cz/letiste/ceske-budejovice',
  }),
}

const airportJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Airport',
  name: 'Letiště České Budějovice',
  iataCode: 'JCL',
  icaoCode: 'LKCS',
  url: 'https://www.airport-cb.cz/',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Planá u Českých Budějovic',
    addressCountry: 'CZ',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
    { '@type': 'ListItem', position: 2, name: 'Letiště', item: 'https://www.flyqueens.cz/letiste' },
    { '@type': 'ListItem', position: 3, name: 'České Budějovice', item: 'https://www.flyqueens.cz/letiste/ceske-budejovice' },
  ],
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function CeskeBudejoviceAirportPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · České Budějovice'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště České Budějovice: parkování, doprava a odbavení
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Letiště České Budějovice leží asi šest kilometrů jižně od města u obce Planá a používá kódy JCL a LKCS. Létají odsud hlavně sezonní lety cestovních kanceláří. Parkování je zdarma a bez rezervace, na odbavení počítejte se dvěma hodinami před odletem.
        </p>

        <AirportDiagram icao="LKCS" iata="JCL" name="Letiště České Budějovice" />

        <section aria-label="Rychlá fakta" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 9, marginBottom: 26 }}>
          {[
            ['JCL / LKCS', 'kódy letiště'],
            ['Zdarma', 'parkování bez rezervace'],
            ['180 + 500', 'míst na dvou parkovištích'],
            ['2 hodiny', 'běžné otevření check-in'],
          ].map(([value, label]) => (
            <div key={label} style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '13px 14px' }}>
              <strong style={{ display: 'block', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontSize: 17 }}>{value}</strong>
              <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: 11, marginTop: 3 }}>{label}</span>
            </div>
          ))}
        </section>

        <div style={{ display: 'grid', gap: 10 }}>
          <Link href="/radar" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Živá mapa letadel</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Poslední dostupné polohy zachycených letadel. →</span>
          </Link>
          <a href="https://www.airport-cb.cz/odlety/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Oficiální odlety a přílety</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Tabule na webu letiště České Budějovice. ↗</span>
          </a>
        </div>

        <ArticleContents items={[
          { id: 'parkovani-zdarma', label: 'Parkování zdarma' },
          { id: 'jak-se-na-letiste-dostat', label: 'Jak se na letiště dostat' },
          { id: 'kdy-dorazit-na-odbaveni', label: 'Kdy dorazit na odbavení' },
          { id: 'odlety-a-prilety', label: 'Odlety a přílety' },
        ]} />

        <h2 id="parkovani-zdarma" style={S.h2}>Parkování zdarma</h2>
        <p style={S.p}>
          Za parkování se u českobudějovického letiště neplatí po celou dobu cesty a místo se nerezervuje. Horní parkoviště má podle letiště 180 míst a k terminálu dojdete pěšky. Dolní parkoviště pojme přes 500 aut a s terminálem ho spojuje bezplatná kyvadlová doprava.
        </p>
        <p style={S.p}>
          Mikrobus jezdí od dvou a půl hodiny před plánovaným odletem do hodiny po skutečném příletu. Letiště doporučuje nejdřív zastavit před terminálem v zóně Kiss and Go, vyložit spolucestující se zavazadly a teprve potom odjet na dolní parkoviště. Spolucestující pak nečekají s kufry na mikrobus.
        </p>

        <h2 id="jak-se-na-letiste-dostat" style={S.h2}>Jak se na letiště dostat</h2>
        <p style={S.p}>
          Autem je cesta nejjednodušší, parkování nic nestojí. Přímý autobus k terminálu v létě 2026 nejezdí: sezonní linka 40 z nádraží podle letiště letos v provozu není. Celoročně jezdí městská linka 19 na zastávku Planá, Letiště, která je od terminálu asi 1,5 kilometru. S kufrem je to znatelný kus cesty pěšky, proto si spoj ověřte v aktuálním jízdním řádu DPMČB.
        </p>

        <h2 id="kdy-dorazit-na-odbaveni" style={S.h2}>Kdy dorazit na odbavení</h2>
        <p style={S.p}>
          Odbavení podle letiště obvykle začíná dvě hodiny před odletem a končí 45 minut před ním, pokud dopravce nestanoví jinak. Letiště doporučuje být v terminálu nejméně dvě hodiny předem. Když parkujete dole, přidejte si čas na cestu mikrobusem.
        </p>

        <h2 id="odlety-a-prilety" style={S.h2}>Odlety a přílety</h2>
        <p style={S.p}>
          Z Českých Budějovic se létá hlavně v letní sezoně s cestovními kancelářemi. Podle Zdopravy.cz odbavilo letiště v létě 2025 téměř 67 tisíc cestujících, o 22 procent víc než rok předtím. Destinace a dopravci se mění každou sezonu, proto je tu neopisujeme. Rozhodující je čas na letence a pokyny cestovní kanceláře, které se podle letiště mohou změnit i krátce před odletem.
        </p>
        <p style={S.p}>
          Srovnání s dalšími regionálními letišti najdete v přehledu <Link href="/letiste" style={{ color: 'var(--gold)' }}>letišť v Česku</Link>. Parkování zdarma nabízí i <Link href="/letiste/pardubice" style={{ color: 'var(--gold)' }}>letiště Pardubice</Link>. Letadla nad jižními Čechami můžete sledovat na <Link href="/radar" style={{ color: 'var(--gold)' }}>živé mapě letadel</Link>, ta ale neukazuje potvrzený čas odbavení ani gate.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>Stav k 23. září 2026. Provozní údaje si před cestou potvrďte u letiště, dopravce nebo cestovní kanceláře.</p>
        <SourcesBox
          sources={[
            { label: 'Letiště České Budějovice: doprava a parkování', href: 'https://www.airport-cb.cz/doprava-a-parkovani/' },
            { label: 'Letiště České Budějovice: odbavení cestujících', href: 'https://www.airport-cb.cz/odbaveni-cestujicich/' },
            { label: 'Letiště České Budějovice: odlety', href: 'https://www.airport-cb.cz/odlety/' },
            { label: 'Dopravní podnik města České Budějovice: jízdní řády MHD', href: 'https://www.dpmcb.cz/' },
            { label: 'Zdopravy.cz: budějovické letiště odbavilo v létě o 22 procent více cestujících', href: 'https://zdopravy.cz/budejovicke-letiste-odbavilo-v-lete-o-22-procent-vice-cestujicich-nez-loni-264624/' },
          ]}
          note="Parkování a odbavení podle oficiálního webu letiště, stav k 23. září 2026."
        />
      </div>
    </main>
  )
}
