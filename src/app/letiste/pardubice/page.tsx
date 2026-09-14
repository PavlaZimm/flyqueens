import type { Metadata } from 'next'
import Link from 'next/link'
import { AirportDiagram } from '@/components/Airport/AirportDiagram'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Letiště Pardubice: parkování, doprava a živá mapa',
  description: 'Praktický průvodce Letištěm Pardubice: bezplatné parkování u terminálu, MHD z hlavního nádraží, odbavení a živá mapa dostupných letových dat.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/pardubice' },
  ...socialMetadata({
    title: 'Letiště Pardubice: parkování, doprava a živá mapa | FlyQueens',
    description: 'Bezplatné parkování, doprava k Terminálu Jana Kašpara a dostupná živá data o letadlech.',
    url: 'https://www.flyqueens.cz/letiste/pardubice',
  }),
}

const airportJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Airport',
  name: 'Letiště Pardubice',
  iataCode: 'PED',
  icaoCode: 'LKPD',
  url: 'https://www.airport-pardubice.cz/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Plk. Jaroslava Šustra 201',
    addressLocality: 'Pardubice, Popkovice',
    postalCode: '530 06',
    addressCountry: 'CZ',
  },
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function PardubiceAirportPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · Pardubice'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště Pardubice: parkování, doprava a živá mapa
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Letiště Pardubice používá kódy PED a LKPD. Terminál Jana Kašpara leží v Popkovicích a cestující mohou využít bezplatné parkování i spojení MHD z hlavního nádraží.
        </p>

        <AirportDiagram icao="LKPD" iata="PED" name="Letiště Pardubice" />

        <section aria-label="Rychlá fakta" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 9, marginBottom: 26 }}>
          {[
            ['PED / LKPD', 'kódy letiště'],
            ['Zdarma', 'dlouhodobé parkování'],
            ['100 m', 'parkoviště od terminálu'],
            ['2 hodiny', 'doporučený předstih'],
          ].map(([value, label]) => (
            <div key={label} style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '13px 14px' }}>
              <strong style={{ display: 'block', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontSize: 17 }}>{value}</strong>
              <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: 11, marginTop: 3 }}>{label}</span>
            </div>
          ))}
        </section>

        <div style={{ display: 'grid', gap: 10 }}>
          <Link href="/letiste/pardubice/parkovani" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Parkování u letiště Pardubice</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Kde jsou P1, P2 a K+R a jaká pravidla platí. →</span>
          </Link>
          <Link href="/radar" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Živá mapa letadel</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Poslední dostupné polohy letadel nad Českem. →</span>
          </Link>
          <Link href="/letiste/pardubice/odlety" style={{ textDecoration: 'none', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Odlety a přílety</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Přehled dostupných letů a oficiální zdroj. →</span>
          </Link>
        </div>

        <h2 style={S.h2}>Parkování přímo u terminálu</h2>
        <p style={S.p}>
          Oficiální parkoviště P1 a P2 má podle letiště kapacitu 1 200 míst, leží přibližně 100 metrů od terminálu a je bezplatné bez nutnosti rezervace. Pro rychlé vysazení nebo vyzvednutí slouží K+R před hlavní budovou s maximální dobou stání 20 minut.
        </p>
        <p style={S.p}>
          Podrobná pravidla a praktické doporučení najdete na stránce <Link href="/letiste/pardubice/parkovani" style={{ color: 'var(--gold)' }}>parkování u letiště Pardubice</Link>.
        </p>

        <h2 style={S.h2}>Jak se dostat na letiště MHD</h2>
        <p style={S.p}>
          Speciální linka 90 spojuje pardubické hlavní nádraží se zastávkou Letiště terminál. Jízdní řád se může měnit podle sezony, proto před cestou zkontrolujte aktuální spoj na webu Dopravního podniku města Pardubic.
        </p>

        <h2 style={S.h2}>Kdy přijet a kde ověřit let</h2>
        <p style={S.p}>
          Letiště doporučuje dorazit dvě hodiny před plánovaným odletem. Standardní odbavení se zpravidla uzavírá 40 minut před odletem, ale rozhodující jsou pokyny dopravce a cestovní kanceláře. Skutečný čas, zpoždění a přepážku vždy ověřte v oficiálním letovém řádu.
        </p>

        <h2 style={S.h2}>Co ukáže živá mapa FlyQueens</h2>
        <p style={S.p}>
          Mapa ukazuje poslední dostupnou ADS-B polohu, výšku, rychlost a směr zachycených letadel. Nenahrazuje letištní tabuli a sama nepotvrzuje čas odletu, příletu, terminál ani bránu. Pokud je u letu dostupná přiřazená trasa, zobrazujeme ji jako orientační spojnici.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>Informace ověřeny 12. září 2026. Provozní údaje si před cestou potvrďte u letiště nebo dopravce.</p>
        <SourcesBox
          sources={[
            { label: 'Letiště Pardubice: doprava a parkování', href: 'https://www.airport-pardubice.cz/doprava-a-parkovani/' },
            { label: 'Letiště Pardubice: informace pro cestující', href: 'https://www.airport-pardubice.cz/cestujici/' },
            { label: 'Letiště Pardubice: aktuální letový řád', href: 'https://www.airport-pardubice.cz/letovy-rad/' },
            { label: 'Dopravní podnik města Pardubic: jízdní řády', href: 'https://www.dpmp.cz/cestovani-mhd/jizdni-rady/' },
          ]}
          note="Parkování, doprava a doporučený čas příjezdu ověřeny na oficiálních zdrojích 12. září 2026."
        />
      </div>
    </main>
  )
}
