import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'

const post = getPost('jak-vysoko-letaji-letadla')!

export const metadata: Metadata = {
  title: 'Jak vysoko létají letadla a proč zrovna deset kilometrů',
  description:
    'Dopravní letadla létají v 9 až 12 kilometrech, malé stroje mnohem níž. Proč se létá tak vysoko, co je letová hladina FL a jak výšku každého letadla vidíte živě na mapě.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/jak-vysoko-letaji-letadla' },
  openGraph: {
    title: 'Jak vysoko létají letadla a proč zrovna deset kilometrů',
    description: 'Proč dopravní letadla létají v 10 km, co je letová hladina a jak to vidíte na mapě.',
    url: 'https://www.flyqueens.cz/blog/jak-vysoko-letaji-letadla',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: '2026-09-11',
  author: { '@type': 'Organization', name: 'FlyQueens' },
  publisher: { '@type': 'Organization', name: 'FlyQueens' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/jak-vysoko-letaji-letadla',
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

const HEIGHTS = [
  ['Dopravní letadla (A320, B737)', '9 až 12 km', 'cestovní let'],
  ['Byznys tryskáče', 'až 15,5 km', 'nad linkovým provozem'],
  ['Turbovrtulové (ATR)', '6 až 7 km', 'kratší tratě'],
  ['Malá letadla', '1 až 3 km', 'výlety, výcvik'],
  ['Vrtulníky', 'stovky metrů', 'záchranka, policie'],
]

export default function VyskaArticle() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/blog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', margin: '18px 0 8px' }}>{post.tag}</div>
        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '0 0 6px' }}>
          Jak vysoko létají letadla a proč zrovna deset kilometrů
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>{post.dateLabel}</div>

        <p style={S.p}>
          Koukáte v létě na oblohu a nad hlavou se táhne bílá čára. Letadlo je tak malé, že ho skoro nevidíte.
          Jak vysoko vlastně je? U běžného dopravního letu typicky mezi devíti a dvanácti kilometry. A že zrovna tam, to není náhoda,
          ale kompromis výkonu, spotřeby, počasí, hmotnosti a řízení provozu.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Dopravní letadla létají nejčastěji v 10 až 12 kilometrech, tedy kolem letové hladiny FL350.
            Řidší vzduch snižuje aerodynamický odpor, ale konkrétní hladina závisí na typu, hmotnosti,
            trati a počasí. Malé stroje obvykle létají níž, některé byznys tryskáče až kolem 15 kilometrů.
          </p>
        </div>

        <h2 style={S.h2}>Proč se létá tak vysoko?</h2>
        <p style={S.p}>
          Ve standardní atmosféře má vzduch kolem deseti kilometrů přibližně třetinovou hustotu proti hladině
          moře, což snižuje odpor. Optimální hladinu ale ovlivňuje i výkon motorů, hmotnost a vítr. Letové
          hladiny zároveň pomáhají řízení oddělovat provoz; v prostoru RVSM je běžný vertikální rozstup
          1 000 stop (přibližně 305 metrů). Bouřky i turbulence mohou zasahovat také cestovní hladiny.
        </p>

        <h2 style={S.h2}>Kolik má které letadlo</h2>
        <div style={{ overflowX: 'auto', margin: '0 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Typ</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Obvyklá výška</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Kontext</th>
              </tr>
            </thead>
            <tbody>
              {HEIGHTS.map(([typ, vyska, ctx], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600 }}>{typ}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>{vyska}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{ctx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.h2}>Co znamená FL350</h2>
        <p style={S.p}>
          Ve vyšších hladinách se používají letové hladiny vztažené ke standardnímu tlaku 1013,2 hPa.
          FL350 znamená tlakovou hladinu 35 000 stop, přibližně 10,7 kilometru ve standardní atmosféře.
          Není to totéž co přesná geometrická výška nad terénem, protože skutečný tlak a teplota se mění.
        </p>

        <h2 style={S.h2}>Proč ne ještě výš?</h2>
        <p style={S.p}>
          Každý typ má certifikované limity. Pro rodinu A320 výrobce uvádí maximální provozní výšku kolem
          39 800 stop, tedy asi 12,1 kilometru. Limit souvisí s aerodynamikou, výkonem, přetlakováním i
          certifikací; není to jedna univerzální hranice pro všechna letadla.
        </p>

        <h2 style={S.h2}>Jak zjistím výšku letadla nad hlavou?</h2>
        <p style={S.p}>
          Otevřete živou mapu, najděte letadlo a klikněte na něj. U každého stroje vidíte výšku v metrech,
          tlakovou výšku, rychlost i to, jestli stoupá nebo klesá. Samotná výška ale nestačí k bezpečnému
          určení cílového letiště; trasa se zobrazí jen tehdy, když ji lze spolehlivě přiřadit.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Kolik letadel je teď nad Českem?</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Živá mapa ukáže letadla zachycená dostupnými ADS-B přijímači včetně výšky. Ve statistikách najdete průměrnou výšku a rychlost
            všech letů právě teď.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Otevřít živou mapu
            </Link>
            <Link href="/stats" style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Živé statistiky
            </Link>
          </div>
        </div>

        <SourcesBox
          sources={[
            { label: 'FAA Pilot/Controller Glossary — definice letové hladiny', href: 'https://www.faa.gov/air_traffic/publications/ATpubs/ATC/PCG/F.HTM' },
            { label: 'FAA Instrument Flying Handbook — tlaková výška a RVSM', href: 'https://www.faa.gov/sites/faa.gov/files/pilots/FAA-H-8083-15B.pdf' },
            { label: 'Airbus — technické charakteristiky rodiny A320', href: 'https://www.aircraft.airbus.com/en/customer-care/fleet-wide-care/airport-operations-and-aircraft-characteristics' },
          ]}
          note="Fakta a odkazy ověřeny 11. září 2026. Uvedené výšky jsou obvyklé rozsahy, ne provozní pokyn."
        />
      </div>
    </main>
  )
}
