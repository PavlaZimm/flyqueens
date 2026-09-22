import type { Metadata } from 'next'
import Link from 'next/link'
import { AirportDiagram } from '@/components/Airport/AirportDiagram'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'
import { ArticleContents } from '@/components/UI/ArticleContents'

export const metadata: Metadata = {
  title: 'Letiště Ostrava: doprava, parkování a odlety',
  description: 'Praktický průvodce Letištěm Leoše Janáčka Ostrava: vlak a autobus, parkování, odbavení, oficiální přílety a odlety a živá mapa.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/ostrava' },
  ...socialMetadata({
    title: 'Letiště Ostrava: doprava, parkování a odlety | FlyQueens',
    description: 'Vlak přímo u terminálu, autobusové spojení, parkování a ověřené odkazy pro letiště OSR.',
    url: 'https://www.flyqueens.cz/letiste/ostrava',
  }),
}

const airportJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Airport',
  name: 'Letiště Leoše Janáčka Ostrava',
  iataCode: 'OSR',
  icaoCode: 'LKMT',
  url: 'https://www.airport-ostrava.cz/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mošnov 401',
    addressLocality: 'Mošnov',
    postalCode: '742 51',
    addressCountry: 'CZ',
  },
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function OstravaHubPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · Ostrava'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště Ostrava: doprava, parkování a odlety
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Letiště Leoše Janáčka Ostrava v Mošnově používá kódy OSR a LKMT. K terminálu se dostanete autem, autobusem i vlakem. Železniční terminál stojí hned vedle odletové haly.
        </p>

        <AirportDiagram icao="LKMT" iata="OSR" name="Letiště Leoše Janáčka Ostrava" />

        <section aria-label="Rychlá fakta" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 9, marginBottom: 26 }}>
          {[
            ['OSR / LKMT', 'kódy letiště'],
            ['S4 a S8', 'vlakové linky'],
            ['AE', 'Airport Express'],
            ['2 hodiny', 'běžné otevření check-in'],
          ].map(([value, label]) => (
            <div key={label} style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '13px 14px' }}>
              <strong style={{ display: 'block', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontSize: 17 }}>{value}</strong>
              <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: 11, marginTop: 3 }}>{label}</span>
            </div>
          ))}
        </section>

        <div style={{ display: 'grid', gap: 10 }}>
          <Link href="/letiste/ostrava/parkovani" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Veřejná parkoviště a ceny</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Ověřené ceny a vzdálenosti od terminálu. →</span>
          </Link>
          <Link href="/radar" style={{ textDecoration: 'none', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Živá mapa letadel nad Moravou</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Poslední dostupné polohy zachycených letadel. →</span>
          </Link>
          <Link href="/letiste/ostrava/odlety" style={{ textDecoration: 'none', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '15px 16px', color: 'var(--text-primary)' }}>
            <strong style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16 }}>Odlety a přílety</strong>
            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Přehled dostupných letů a oficiální zdroj. →</span>
          </Link>
        </div>

        <ArticleContents items={[
          { id: 'vlakem-primo-k-odletove-hale', label: "Vlakem přímo k odletové hale" },
          { id: 'autobusem-z-ostravy-a-okoli', label: "Autobusem z Ostravy a okolí" },
          { id: 'kdy-dorazit-na-odbaveni', label: "Kdy dorazit na odbavení" },
          { id: 'parkovani-u-letiste-ostrava', label: "Parkování u letiště Ostrava" },
          { id: 'co-ukaze-flyqueens-a-co-ne', label: "Co ukáže FlyQueens a co ne" },
        ]} />

        <h2 id="vlakem-primo-k-odletove-hale" style={S.h2}>Vlakem přímo k odletové hale</h2>
        <p style={S.p}>
          Železniční terminál Mošnov, Ostrava Airport je umístěný vedle odletové haly. Letiště uvádí linku S4 přes Bohumín, Ostravu a Studénku a linku S8 přes Ostravu, Studénku, Příbor a Kopřivnici. Konkrétní spoj si ověřte v aktuálním jízdním řádu ODIS.
        </p>

        <h2 id="autobusem-z-ostravy-a-okoli" style={S.h2}>Autobusem z Ostravy a okolí</h2>
        <p style={S.p}>
          Přímé spojení z Ostravy nabízí Airport Express. Podle letiště je od 20. dubna 2026 pro odlétající cestující zdarma po předložení palubní vstupenky nebo potvrzení rezervace na daný den. Do Mošnova jezdí také regionální linky z Ostravy, Frýdku-Místku, Příbora, Kopřivnice a Nového Jičína. Podmínky i jízdní řády před cestou znovu ověřte.
        </p>

        <h2 id="kdy-dorazit-na-odbaveni" style={S.h2}>Kdy dorazit na odbavení</h2>
        <p style={S.p}>
          Odbavovací přepážka podle letiště zpravidla otevírá dvě hodiny před plánovaným odletem a zavírá 40 minut před ním. Některé aerolinky vyžadují online odbavení nebo si za odbavení na letišti účtují poplatek, proto se řiďte podmínkami svého dopravce.
        </p>

        <h2 id="parkovani-u-letiste-ostrava" style={S.h2}>Parkování u letiště Ostrava</h2>
        <p style={S.p}>
          P1 leží před odletovou halou, vzdálenější plochy jsou levnější. Protože letiště používá více parkovišť s rozdílnými tarify, připravili jsme samostatné <Link href="/letiste/ostrava/parkovani" style={{ color: 'var(--gold)' }}>srovnání parkování u letiště Ostrava</Link>. Ceny a dostupnost vždy potvrďte před příjezdem.
        </p>

        <h2 id="co-ukaze-flyqueens-a-co-ne" style={S.h2}>Co ukáže FlyQueens a co ne</h2>
        <p style={S.p}>
          Na mapě FlyQueens vidíte poslední dostupnou ADS-B polohu, výšku, rychlost a směr zachycených letadel. Skutečný odlet, přílet, zpoždění, přepážku a gate potvrzuje letiště nebo dopravce, nikoliv poloha na mapě.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>Informace ověřeny 12. září 2026. Dopravní spojení a pravidla odbavení se mohou změnit.</p>
        <SourcesBox
          sources={[
            { label: 'Letiště Ostrava: veřejná doprava', href: 'https://www.airport-ostrava.cz/p/verejna-doprava-2' },
            { label: 'Letiště Ostrava: odbavení cestujících', href: 'https://www.airport-ostrava.cz/p/odbaveni-cestujicich-2' },
            { label: 'Letiště Ostrava: parkování', href: 'https://www.airport-ostrava.cz/p/parkovani' },
            { label: 'Letiště Ostrava: přílety a odlety', href: 'https://www.airport-ostrava.cz/p/aktualni-prilety-a-odlety' },
          ]}
          note="Doprava, odbavení a parkování ověřeny na oficiálním webu letiště 12. září 2026."
        />
      </div>
    </main>
  )
}
