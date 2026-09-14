import type { Metadata } from 'next'
import Link from 'next/link'
import { AirportDiagram } from '@/components/Airport/AirportDiagram'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Letiště Karlovy Vary: doprava, parkování a odlety',
  description: 'Praktický průvodce Letištěm Karlovy Vary: autobus číslo 8, možnosti parkování, odbavení, oficiální odlety a přílety a živá mapa.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/karlovy-vary' },
  ...socialMetadata({
    title: 'Letiště Karlovy Vary: doprava, parkování a odlety | FlyQueens',
    description: 'Doprava, P1, P4, P5 a P7, odbavení a ověřené odkazy pro letiště KLV.',
    url: 'https://www.flyqueens.cz/letiste/karlovy-vary',
  }),
}

const airportJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Airport',
  name: 'Letiště Karlovy Vary',
  iataCode: 'KLV',
  icaoCode: 'LKKV',
  url: 'https://www.airport-k-vary.cz/cs/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'K Letišti 132',
    addressLocality: 'Karlovy Vary, Olšová Vrata',
    postalCode: '360 01',
    addressCountry: 'CZ',
  },
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function KarlovyVaryAirportPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · Karlovy Vary'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště Karlovy Vary: doprava, parkování a odlety
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Letiště Karlovy Vary v Olšových Vratech používá kódy KLV a LKKV. Z města se k terminálu dostanete autobusem číslo 8. Parkovat lze na bezplatné P7 bez garance místa nebo na placených plochách s rezervací.
        </p>

        <AirportDiagram icao="LKKV" iata="KLV" name="Letiště Karlovy Vary" />

        <section aria-label="Rychlá fakta" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 9, marginBottom: 26 }}>
          {[
            ['KLV / LKKV', 'kódy letiště'],
            ['Linka 8', 'veřejná doprava'],
            ['P7', 'bezplatné stání'],
            ['2 hodiny', 'běžné otevření check-in'],
          ].map(([value, label]) => (
            <div key={label} style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '13px 14px' }}>
              <strong style={{ display: 'block', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontSize: 17 }}>{value}</strong>
              <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: 11, marginTop: 3 }}>{label}</span>
            </div>
          ))}
        </section>

        <div style={{ display: 'grid', gap: 10 }}>
          <Link href="/letiste/karlovy-vary/parkovani" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Parkování P1, P4, P5 a P7</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Bezplatná i rezervovaná místa přehledně. →</span>
          </Link>
          <Link href="/radar" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Živá mapa letadel</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Poslední dostupné polohy zachycených letadel. →</span>
          </Link>
          <Link href="/letiste/karlovy-vary/odlety" style={{ textDecoration: 'none', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Odlety a přílety</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Přehled dostupných letů a oficiální zdroj. →</span>
          </Link>
        </div>

        <h2 style={S.h2}>Autobusem číslo 8</h2>
        <p style={S.p}>
          Veřejnou dopravu mezi městem a letištěm zajišťuje Dopravní podnik Karlovy Vary linkou číslo 8. Protože návaznost na sezonní lety i jízdní řád se mohou měnit, zkontrolujte si před cestou konkrétní spoj.
        </p>

        <h2 style={S.h2}>Parkování zdarma i s rezervací</h2>
        <p style={S.p}>
          Bezplatné krátkodobé i dlouhodobé stání nabízí vyznačený pruh P7 podél příjezdové komunikace. Letiště ale výslovně negarantuje volné místo. Garanci nabízí P1, P4 a P5. Ceny, vzdálenosti a podmínky shrnuje samostatná stránka <Link href="/letiste/karlovy-vary/parkovani" style={{ color: 'var(--gold)' }}>parkování u letiště Karlovy Vary</Link>.
        </p>

        <h2 style={S.h2}>Kdy dorazit na odbavení</h2>
        <p style={S.p}>
          Standardní check-in podle letiště běžně začíná dvě hodiny před letem a přepážka se zavírá 40 minut před plánovaným odletem. Čas se může lišit podle dopravce a destinace, proto jsou rozhodující pokyny k vašemu letu.
        </p>

        <h2 style={S.h2}>Odlety a přílety</h2>
        <p style={S.p}>
          Letový řád se mění podle sezony. FlyQueens proto neopisuje seznam linek, který by rychle zastaral. Pro plánovaný čas a provozní poznámku použijte oficiální stránku odletů nebo příletů. Na naší mapě můžete sledovat poslední dostupnou ADS-B polohu letadla, ale ne potvrzený čas odbavení nebo gate.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>Informace ověřeny 12. září 2026. Provozní údaje si před cestou potvrďte u letiště nebo dopravce.</p>
        <SourcesBox
          sources={[
            { label: 'Letiště Karlovy Vary: veřejná doprava', href: 'https://www.airport-k-vary.cz/cs/doprava-verejna/' },
            { label: 'Letiště Karlovy Vary: parkování', href: 'https://www.airport-k-vary.cz/cs/parkovani/' },
            { label: 'Letiště Karlovy Vary: check-in', href: 'https://www.airport-k-vary.cz/cs/check-in/' },
            { label: 'Letiště Karlovy Vary: odlety', href: 'https://www.airport-k-vary.cz/cs/odlety/' },
          ]}
          note="Doprava, parkování a odbavení ověřeny na oficiálním webu letiště 12. září 2026."
        />
      </div>
    </main>
  )
}
