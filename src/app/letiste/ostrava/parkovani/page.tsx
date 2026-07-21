import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Parkování u letiště Ostrava (Mošnov): ceny parkovišť P1 až P5',
  description:
    'Kolik stojí parkování u letiště Leoše Janáčka v Mošnově. Rozdíly mezi P1 a P5, soukromá parkoviště s odvozem a kde ušetříte nejvíc.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/ostrava/parkovani' },
  openGraph: {
    title: 'Parkování u letiště Ostrava (Mošnov): ceny parkovišť P1 až P5',
    description: 'Rozdíly mezi parkovišti P1 až P5, soukromá parkoviště a kde ušetříte.',
    url: 'https://www.flyqueens.cz/letiste/ostrava/parkovani',
    type: 'article',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kolik stojí parkování u letiště Ostrava?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Záleží na parkovišti. Nejbližší P1 stojí 350 Kč za den, parkoviště P3 a P4 vyjdou na 120 Kč za den a nejlevnější oficiální P5 na 200 Kč za den. Soukromá parkoviště s odvozem začínají kolem 99 až 150 Kč za den.',
      },
    },
    {
      '@type': 'Question',
      name: 'Které parkoviště v Mošnově je nejlevnější?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Z oficiálních jsou nejlevnější P3 a P4 se 120 Kč za den. Ještě níž jdou soukromá parkoviště v okolí, kde se ceny pohybují od 99 Kč za den a odvoz k terminálu bývá v ceně.',
      },
    },
  ],
}

const S = {
  h2: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

const LOTS = [
  ['P1 (u terminálu)', '350 Kč / den', '50 Kč za hodinu, nejblíž'],
  ['P3 a P4', '120 Kč / den', 'nejlevnější oficiální'],
  ['P5', '200 Kč / den', '20 Kč za hodinu'],
  ['Soukromá s odvozem', 'od 99 Kč / den', 'transfer bývá v ceně'],
]

export default function ParkovaniOstravaPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · '}
          <Link href="/letiste/ostrava" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Ostrava</Link>
          {' · Parkování'}
        </nav>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Parkování u letiště Ostrava: ceny parkovišť P1 až P5
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Mošnov má tu výhodu, že parkovišť je několik a liší se cenou i vzdáleností. Mezi nejdražším P1
          a sousedním P3 je skoro trojnásobný rozdíl, přitom rozdíl v chůzi je pár minut. Tady je přehled,
          ať víte, kam zajet.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Nejblíž terminálu je P1 za 350 Kč na den. Parkoviště P3 a P4 stojí 120 Kč a jsou nejlevnější
            z oficiálních. P5 vyjde na 200 Kč. Soukromá parkoviště s odvozem začínají kolem 99 Kč za den.
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
              {LOTS.map(([name, price, note], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600 }}>{name}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{price}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.h2}>Kdy se vyplatí P1</h2>
        <p style={S.p}>
          Jen na krátko. Hodina stojí 50 Kč, takže na vyzvednutí někoho z příletu je P1 ideální. Na dovolenou
          je to ale drahé: týden vyjde na 2 450 Kč, zatímco na P3 zaplatíte 840 Kč. Za pár minut chůze navíc
          ušetříte přes patnáct set.
        </p>

        <h2 style={S.h2}>Soukromá parkoviště v okolí</h2>
        <p style={S.p}>
          V Mošnově a okolí funguje několik hlídaných parkovišť, která nabízejí odvoz k terminálu v ceně.
          Nejbližší jsou pár set metrů od letiště, takže transfer trvá dvě minuty. Ceny se drží kolem stovky
          za den, v hlavní letní sezóně bývají o něco vyšší. Areály jsou oplocené, osvětlené a hlídané kamerami.
        </p>

        <h2 style={S.h2}>Na co si dát pozor</h2>
        <p style={S.p}>
          Sezónnost je v Ostravě znát víc než v Praze. V červenci a srpnu poptávka po parkování skokově roste,
          protože z Mošnova létají charterové lety k moři. Rezervujte dopředu, jinak skončíte na dražším P1,
          protože levnější místa budou plná.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 20 }}>
          Ceny jsou orientační, stav červenec 2026. Aktuální částku vždy ověřte u provozovatele parkoviště.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '26px 0 10px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Než vyrazíte</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Podívejte se, co zrovna letí nad Moravou. Živá mapa ukazuje letadla v reálném čase.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu
          </Link>
        </div>
      </div>
    </main>
  )
}
