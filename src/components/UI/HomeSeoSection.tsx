import Link from 'next/link'
import { POSTS } from '@/lib/blog'

// Indexovatelný obsah pod mapou — homepage měla pro Google jen ~380 znaků
// textu z menu. Tahle sekce jí dává skutečný obsah + interní odkazy.
// Renderuje se do statického HTML při buildu, rychlost mapy neovlivní.

const S = {
  h2: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, margin: '0 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px', color: 'var(--text-muted)' },
  card: {
    background: 'var(--midnight-2)', border: '1px solid var(--border-mid)',
    borderRadius: 12, padding: '14px 16px', textDecoration: 'none', display: 'block',
  },
} as const

const AIRPORTS = [
  { href: '/letiste/praha', city: 'Praha', iata: 'PRG', note: 'parkování, ceny, živý provoz' },
  { href: '/letiste/brno', city: 'Brno', iata: 'BRQ', note: 'parkování a ceník Tuřan' },
  { href: '/letiste/ostrava', city: 'Ostrava', iata: 'OSR', note: 'parkoviště P1 až P5 v Mošnově' },
]

export function HomeSeoSection() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  return (
    <section style={{ background: 'var(--midnight)', borderTop: '1px solid var(--border-subtle)', fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 18px 50px' }}>

        <h2 style={S.h2}>Sledování letů online nad Českem</h2>
        <p style={S.p}>
          FlyQueens je živá mapa letadel. Každé dopravní letadlo vysílá několikrát za vteřinu svoji polohu,
          výšku a rychlost signálem ADS-B a mapa je vykresluje v reálném čase. Kliknete na letadlo a vidíte
          volací znak, typ stroje, trasu i to, jestli zrovna stoupá nebo klesá na přistání. Zdarma a bez
          registrace, nad Prahou i zbytkem Evropy.
        </p>
        <p style={S.p}>
          Nouzové squawk kódy se na mapě zvýrazní automaticky, takže když nad Českem něco hlásí problém,
          víte o tom dřív než ze zpráv. K tomu <Link href="/stats" style={{ color: 'var(--gold)', textDecoration: 'none' }}>živé statistiky</Link>:
          kolik letadel je ve vzduchu, které aerolinky vedou a jaké typy strojů převažují.
        </p>

        <h2 style={{ ...S.h2, marginTop: 30 }}>Letiště: parkování a praktické info</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 6 }}>
          {AIRPORTS.map((a) => (
            <Link key={a.href} href={a.href} style={S.card}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                {a.city} <span style={{ color: 'var(--gold)', fontSize: 12 }}>{a.iata}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 3, lineHeight: 1.5 }}>{a.note}</div>
            </Link>
          ))}
        </div>

        <h2 style={{ ...S.h2, marginTop: 30 }}>Z blogu</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={S.card}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 3 }}>{p.dateLabel} · Číst →</div>
            </Link>
          ))}
        </div>

        <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 30, lineHeight: 1.6 }}>
          Data o polohách letadel: airplanes.live a OpenSky Network. Počasí na letištích: METAR.
          Polohy mají zpoždění několik vteřin a slouží pro zajímavost, ne pro navigaci.
        </p>
      </div>
    </section>
  )
}
