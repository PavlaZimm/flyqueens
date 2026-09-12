import type { Metadata } from 'next'
import Link from 'next/link'
import { ParkingCrossLinks } from '@/components/UI/ParkingCrossLinks'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AffiliateParkingCta } from '@/components/Affiliate/AffiliateParkingCta'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Parkování u letiště Ostrava (Mošnov): aktuální ceny P1 až P6',
  description:
    'Aktuální oficiální ceny parkování u letiště Leoše Janáčka v Mošnově. Rozdíly mezi P1, P3, P4, P5 a P6 a vzdálenost od terminálu.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/ostrava/parkovani' },
  ...socialMetadata({
    title: 'Parkování u letiště Ostrava (Mošnov): aktuální ceny P1 až P6',
    description: 'Ověřené ceny oficiálních parkovišť a vzdálenost od terminálu.',
    url: 'https://www.flyqueens.cz/letiste/ostrava/parkovani',
    type: 'article',
  }),
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
        text: 'Podle oficiálního ceníku ověřeného 12. září 2026 stojí P1 360 Kč za den. Parkoviště P3, P3A, P4, P5 a P6 stojí 130 Kč za den.',
      },
    },
    {
      '@type': 'Question',
      name: 'Které parkoviště v Mošnově je nejlevnější?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Z oficiálních parkovišť jsou podle ceníku ověřeného 12. září 2026 nejlevnější P3, P3A, P4, P5 a P6 se sazbou 130 Kč za den.',
      },
    },
  ],
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

const LOTS = [
  ['P1 (před halou)', '360 Kč / den', '60 Kč za hodinu'],
  ['P3, P3A a P4', '130 Kč / den', 'asi 5 minut pěšky'],
  ['P5 a P6', '130 Kč / den', 'u železničního terminálu'],
]

export default function ParkovaniOstravaPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      { }
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

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Parkování u letiště Ostrava: ceny parkovišť P1 až P6
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Oficiální parkoviště se liší cenou i vzdáleností. P1 je přímo před odletovou halou, levnější
          P3, P3A a P4 jsou podle letiště přibližně pět minut pěšky. Tady jsou sazby, které jsme ověřili
          přímo na webu letiště.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            P1 stojí 360 Kč za den. P3, P3A, P4, P5 a P6 stojí 130 Kč za den. Na všech je jednou za
            24 hodin prvních 15 minut zdarma. Letiště zároveň uvádí, že jeho parkoviště nejsou hlídaná.
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
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>{price}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.h2}>Kdy se vyplatí P1</h2>
        <p style={S.p}>
          P1 je přímo před odletovou halou. Prvních 15 minut je jednou za 24 hodin zdarma, hodina stojí
          60 Kč a sazba od pěti hodin do jednoho dne je 360 Kč. Pro delší pobyt vycházejí P3 až P6
          levněji; jejich denní sazba je 130 Kč.
        </p>

        <h2 style={S.h2}>Soukromá parkoviště v okolí</h2>
        <p style={S.p}>
          V okolí fungují i soukromí provozovatelé. Jejich ceny, dohled a podmínky transferu se mění podle
          termínu, proto je zde bez aktuální nabídky nesrovnáváme. Před rezervací ověřte celkovou cenu,
          provozní dobu odvozu a odpovědnost za vozidlo přímo u konkrétního provozovatele.
        </p>

        <h2 style={S.h2}>Na co si dát pozor</h2>
        <p style={S.p}>
          Oficiální web upozorňuje, že parkoviště nejsou hlídaná. Zkontrolujte také, na kterou plochu platí
          případný voucher cestovní kanceláře; při zaplnění P3 letiště určuje pořadí náhradních parkovišť.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 20 }}>
          Ceny ověřeny 12. září 2026. Aktuální částku a dostupnost vždy zkontrolujte u provozovatele.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '26px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Než vyrazíte</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Podívejte se, co zrovna letí nad Moravou. Živá mapa ukazuje poslední dostupné polohy letadel.
          </p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu
          </Link>
        </div>
        <AffiliateParkingCta airport="ostrava" />
        <SourcesBox
          sources={[
            { label: 'Letiště Ostrava: oficiální ceník a podmínky parkování', href: 'https://www.airport-ostrava.cz/p/parkovani' },
          ]}
          note="Ceny a informace o vzdálenosti a ostraze ověřeny na oficiálním webu 12. září 2026."
        />
        <ParkingCrossLinks current="ostrava" />
      </div>
    </main>
  )
}
