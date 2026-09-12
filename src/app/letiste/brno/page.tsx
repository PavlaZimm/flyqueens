import type { Metadata } from 'next'
import Link from 'next/link'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Letiště Brno-Tuřany: doprava, parkování a odlety',
  description: 'Praktický průvodce Letištěm Brno-Tuřany: spojení z centra, parkování, odbavení, oficiální odlety a přílety a živá mapa letadel.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/brno' },
  ...socialMetadata({
    title: 'Letiště Brno-Tuřany: doprava, parkování a odlety | FlyQueens',
    description: 'Linky 21, 77 a N89, parkování, odbavení a ověřené odkazy pro cestu přes letiště BRQ.',
    url: 'https://www.flyqueens.cz/letiste/brno',
  }),
}

const airportJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Airport',
  name: 'Letiště Brno-Tuřany',
  iataCode: 'BRQ',
  icaoCode: 'LKTB',
  url: 'https://www.brno-airport.cz/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Letiště Brno-Tuřany 904/1',
    addressLocality: 'Brno',
    postalCode: '627 00',
    addressCountry: 'CZ',
  },
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function BrnoHubPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · Brno'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště Brno-Tuřany: doprava, parkování a odlety
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Letiště Brno-Tuřany používá kódy BRQ a LKTB. Z centra se k terminálu dostanete denními linkami 21 a 77, v noci linkou N89. Aktuální stav konkrétního letu vždy ověřte na oficiální tabuli letiště.
        </p>

        <section aria-label="Rychlá fakta" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 9, marginBottom: 26 }}>
          {[
            ['BRQ / LKTB', 'kódy letiště'],
            ['21 a 77', 'denní spojení'],
            ['N89', 'noční spojení'],
            ['20 minut', 'jízda N89 z centra'],
          ].map(([value, label]) => (
            <div key={label} style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '13px 14px' }}>
              <strong style={{ display: 'block', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontSize: 17 }}>{value}</strong>
              <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: 11, marginTop: 3 }}>{label}</span>
            </div>
          ))}
        </section>

        <div style={{ display: 'grid', gap: 10 }}>
          <Link href="/letiste/brno/parkovani" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Parkování a ceny</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Ověřený oficiální ceník a praktické možnosti. →</span>
          </Link>
          <Link href="/radar" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Živá mapa letadel nad Brnem</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Poslední dostupné polohy zachycených letadel. →</span>
          </Link>
          <a href="https://www.brno-airport.cz/informace-o-letech" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Aktuální odlety a přílety</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Otevřít oficiální informace o letech. ↗</span>
          </a>
        </div>

        <h2 style={S.h2}>Jak se dostat na letiště Brno MHD</h2>
        <p style={S.p}>
          Linka 21 jezdí mezi hlavním nádražím a letištěm přibližně 22 minut. Linka 77 spojuje zastávku Úzká u Galerie Vaňkovka s letištěm přibližně za 26 minut. V noci jezdí z hlavního nádraží linka N89 s uváděnou dobou jízdy kolem 20 minut.
        </p>
        <p style={S.p}>
          Platí běžné jízdné IDS JMK. Jízdenku lze řešit v mobilu nebo přímo ve vozidle, papírové jízdenky prodává také automat v příletové hale. Před cestou zkontrolujte aktuální jízdní řád.
        </p>

        <h2 style={S.h2}>Odbavení a příjezd před odletem</h2>
        <p style={S.p}>
          Čas otevření odbavení se může lišit podle sezony a dopravce. Letiště pro období od 1. června do 30. září uvádí zahájení odbavení většiny letů tři hodiny před odletem, u Ryanairu standardně dvě hodiny. Rozhodující jsou vždy pokyny dopravce a aktuální informace letiště.
        </p>

        <h2 style={S.h2}>Parkování přímo u terminálu</h2>
        <p style={S.p}>
          Oficiální parkoviště je v bezprostřední blízkosti terminálu. Prvních 20 minut je jednou za den zdarma a delší pobyt se řídí zveřejněným ceníkem. Aktuální sazby a rozdíl mezi krátkodobým a dlouhodobým stáním shrnujeme na stránce <Link href="/letiste/brno/parkovani" style={{ color: 'var(--gold)' }}>parkování u letiště Brno</Link>.
        </p>

        <h2 style={S.h2}>Co ukáže FlyQueens a co ověřit jinde</h2>
        <p style={S.p}>
          FlyQueens ukazuje poslední dostupnou ADS-B polohu, výšku, rychlost a směr zachycených letadel. Mapa nenahrazuje letištní tabuli a nepotvrzuje čas odletu, zpoždění, přepážku ani gate. Tyto provozní informace ověřte přímo u letiště nebo dopravce.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>Informace ověřeny 12. září 2026. Jízdní řády a časy odbavení se mohou změnit.</p>
        <SourcesBox
          sources={[
            { label: 'Letiště Brno: veřejná doprava', href: 'https://www.brno-airport.cz/verejna-doprava' },
            { label: 'Letiště Brno: odbavení cestujících', href: 'https://www.brno-airport.cz/odbaveni-cestujicich' },
            { label: 'Letiště Brno: parkování', href: 'https://www.brno-airport.cz/parkovani-na-letisti' },
            { label: 'Letiště Brno: informace o letech', href: 'https://www.brno-airport.cz/informace-o-letech' },
          ]}
          note="Doprava, odbavení a parkování ověřeny na oficiálním webu letiště 12. září 2026."
        />
      </div>
    </main>
  )
}
