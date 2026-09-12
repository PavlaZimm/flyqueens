import type { Metadata } from 'next'
import Link from 'next/link'
import { ParkingCrossLinks } from '@/components/UI/ParkingCrossLinks'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Parkování letiště Karlovy Vary: P1, P4, P5 a P7 (2026)',
  description: 'Parkování u Letiště Karlovy Vary: bezplatná P7 bez garance místa, placená P1, P4 a P5, ceny, rezervace a vzdálenost od terminálu.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/karlovy-vary/parkovani' },
  ...socialMetadata({
    title: 'Parkování letiště Karlovy Vary: ceny a možnosti | FlyQueens',
    description: 'Bezplatné stání P7 a rezervovaná parkoviště P1, P4 a P5 podle oficiálních informací letiště.',
    url: 'https://www.flyqueens.cz/letiste/karlovy-vary/parkovani',
    type: 'article',
  }),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Dá se u letiště Karlovy Vary parkovat zdarma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ano. Letiště v roce 2026 uvádí bezplatné krátkodobé i dlouhodobé stání na vyznačené ploše P7 podél příjezdové komunikace. Volné místo ale negarantuje.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kolik stojí parkoviště P4 u letiště Karlovy Vary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Podle ceníku ověřeného 12. září 2026 je prvních 15 minut zdarma, první hodina stojí 20 Kč, první den 200 Kč a šest až osm dní 700 Kč. Online rezervace má samostatný poplatek 500 Kč za každý započatý týden.',
      },
    },
  ],
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

const LOTS = [
  ['P7', 'zdarma', 'bez rezervace a bez garance místa'],
  ['P4', '200 Kč první den', 'asi 80 m od terminálu'],
  ['P5', 'rezervace 500 Kč / 8 dní', 'asi 50 m od terminálu'],
  ['P1 VIP', '968 Kč / 8 dní', 'přímo před terminálem'],
]

export default function KarlovyVaryParkingPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste/karlovy-vary" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště Karlovy Vary</Link>
          {' · Parkování'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Parkování letiště Karlovy Vary: ceny P1, P4, P5 a P7
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Nejlevnější je bezplatná plocha P7, letiště na ní ale negarantuje volné místo. Kdo chce mít stání jisté, může využít placená parkoviště P1, P4 nebo P5. Podmínky níže jsou ověřené přímo u letiště.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            P7 je zdarma, ale bez rezervace a garance místa. P4 stojí 200 Kč za první den a 700 Kč za šest až osm dní; online rezervace se platí zvlášť. P5 a VIP P1 jsou určené pro předem zajištěné stání blízko terminálu.
          </p>
        </div>

        <h2 style={S.h2}>Srovnání parkovišť</h2>
        <div style={{ overflowX: 'auto', margin: '0 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Parkoviště</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Cena</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Poznámka</th>
              </tr>
            </thead>
            <tbody>
              {LOTS.map(([name, price, note]) => (
                <tr key={name}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600 }}>{name}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>{price}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.h2}>P7 zdarma, ale bez jistoty místa</h2>
        <p style={S.p}>
          P7 je vyznačený pruh podél příjezdové komunikace od autobusové zastávky Letiště rozcestí k první křižovatce před terminálem. Krátkodobé i dlouhodobé stání je zdarma. Letiště upozorňuje, že zejména v letních měsících nemůže dostupnost garantovat.
        </p>

        <h2 style={S.h2}>P4 bez rezervace nebo s rezervací</h2>
        <p style={S.p}>
          P4 má podle letiště 131 míst a leží přibližně 80 metrů od terminálu. Prvních 15 minut je zdarma, první hodina stojí 20 Kč, první den 200 Kč a šest až osm dní 700 Kč. Každý další den stojí 100 Kč. Při online rezervaci se připočítává 500 Kč za každý započatý týden o délce osmi dní.
        </p>

        <h2 style={S.h2}>P5 a VIP P1</h2>
        <p style={S.p}>
          P5 má 86 míst, je přibližně 50 metrů od terminálu a vjezd je umožněn vozidlům se zaplacenou rezervací. Letiště uvádí rezervační poplatek 500 Kč za osm dní. VIP P1 leží přímo před terminálem a rezervace na osm dní stojí 968 Kč.
        </p>

        <h2 style={S.h2}>K+R a bezpečnost</h2>
        <p style={S.p}>
          P2 má 15 stání před terminálem a slouží pouze pro rychlé nastoupení, vystoupení a manipulaci se zavazadly. P3 a P6 nejsou veřejnosti přístupné. Oficiální web zároveň uvádí, že parkoviště nejsou hlídaná, proto v autě nenechávejte viditelně cennosti.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '28px 0 10px' }}>
          <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif', fontSize: 15, marginBottom: 6 }}>Než vyrazíte</strong>
          <p style={{ ...S.p, marginBottom: 12 }}>Ověřte cenu i dostupnost na oficiálním webu. Na živé mapě FlyQueens můžete zkontrolovat poslední dostupné polohy letadel, nikoliv garantovaný čas odletu.</p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>Otevřít živou mapu</Link>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>Ceny a podmínky ověřeny 12. září 2026. Před cestou zkontrolujte aktuální informace provozovatele.</p>
        <SourcesBox
          sources={[
            { label: 'Letiště Karlovy Vary: parkování a ceník 2026', href: 'https://www.airport-k-vary.cz/cs/parkovani/' },
          ]}
          note="Ceny, kapacity, vzdálenosti a pravidla ověřeny na oficiálním webu letiště 12. září 2026."
        />
        <ParkingCrossLinks current="karlovy-vary" />
      </div>
    </main>
  )
}
