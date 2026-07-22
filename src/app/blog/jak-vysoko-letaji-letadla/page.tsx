import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'

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
  dateModified: post.date,
  author: { '@type': 'Organization', name: 'FlyQueens' },
  publisher: { '@type': 'Organization', name: 'FlyQueens' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/jak-vysoko-letaji-letadla',
}

const S = {
  h2: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
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
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/blog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', margin: '18px 0 8px' }}>{post.tag}</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '0 0 6px' }}>
          Jak vysoko létají letadla a proč zrovna deset kilometrů
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>{post.dateLabel}</div>

        <p style={S.p}>
          Koukáte v létě na oblohu a nad hlavou se táhne bílá čára. Letadlo je tak malé, že ho skoro nevidíte.
          Jak vysoko vlastně je? Skoro jistě mezi devíti a dvanácti kilometry. A že zrovna tam, to není náhoda,
          ale čistá matematika paliva.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Dopravní letadla létají nejčastěji v 10 až 12 kilometrech, tedy kolem letové hladiny FL350.
            Vzduch je tam řidší, takže motory spálí méně paliva, a letadlo se navíc dostane nad většinu
            počasí. Malé stroje létají v jednotkách kilometrů, byznys tryskáče až v 15 kilometrech.
          </p>
        </div>

        <h2 style={S.h2}>Proč se létá tak vysoko?</h2>
        <p style={S.p}>
          Kvůli penězům. Ve výšce deseti kilometrů má vzduch zhruba třetinovou hustotu proti zemi, takže
          klade menší odpor a letadlo proletí stejnou vzdálenost za výrazně méně paliva. Druhý důvod je
          pohodlí: bouřky, déšť a většina turbulencí se odehrávají pod vámi. A do třetice provoz. Vysoko
          nad zemí je nebe rozdělené do hladin, kde se letadla bezpečně míjejí s rozestupem tři sta metrů.
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
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{vyska}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{ctx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.h2}>Co znamená FL350</h2>
        <p style={S.p}>
          Piloti neměří výšku v metrech, ale v letových hladinách. FL350 znamená 35 000 stop, což je zhruba
          10,7 kilometru. Číslo za FL jsou vždycky stovky stop. Když na mapě uvidíte letadlo na FL380, letí
          v 11,6 km. Jednoduchá pomůcka: číslo hladiny krát tři dá výšku v metrech jen s malou chybou.
        </p>

        <h2 style={S.h2}>Proč ne ještě výš?</h2>
        <p style={S.p}>
          Každý stroj má certifikovaný strop. U běžného A320 je to zhruba 12,5 kilometru a výš to nejde ze
          dvou důvodů. Řidší vzduch přestává stačit motorům i křídlům, a trup by musel vydržet větší rozdíl
          tlaků. Venku je totiž kolem minus 55 stupňů a tlak, při kterém se nedá dýchat. Výjimkou byl
          Concorde, ten létal v osmnácti kilometrech. Dneska tam nahoře potkáte leda byznys tryskáče.
        </p>

        <h2 style={S.h2}>Jak zjistím výšku letadla nad hlavou?</h2>
        <p style={S.p}>
          Otevřete živou mapu, najděte letadlo a klikněte na něj. U každého stroje vidíte výšku v metrech,
          letovou hladinu, rychlost i to, jestli stoupá nebo klesá. Letadlo nad Prahou ve 3 000 metrech
          skoro jistě míří na Ruzyň. To samé ve 11 kilometrech Česko jen přelétá, typicky někam mezi
          Frankfurt a Istanbul.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Kolik letadel je teď nad Českem?</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Živá mapa ukáže každé letadlo i s výškou. Ve statistikách najdete průměrnou výšku a rychlost
            všech letů právě teď.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Otevřít živou mapu
            </Link>
            <Link href="/stats" style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Živé statistiky
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
