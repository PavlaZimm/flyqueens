import type { Metadata } from 'next'
import Link from 'next/link'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Letiště v Česku: parkování a živá mapa | FlyQueens',
  description:
    'Přehled hlavních českých letišť s praktickými informacemi o dopravě, parkování, odbavení a odkazy na oficiální odlety, přílety a živou mapu.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste' },
  ...socialMetadata({
    title: 'Letiště v Česku: parkování a živá mapa | FlyQueens',
    description: 'Přehled českých letišť, praktické informace a živá mapa dostupných letových dat.',
    url: 'https://www.flyqueens.cz/letiste',
  }),
}

// Česká letiště s obsahem. hasPage = má vlastní stránku, jinak se připravuje.
const AIRPORTS = [
  { slug: 'praha', name: 'Letiště Václava Havla', city: 'Praha', iata: 'PRG', hasPage: true },
  { slug: 'brno', name: 'Letiště Brno-Tuřany', city: 'Brno', iata: 'BRQ', hasPage: true },
  { slug: 'ostrava', name: 'Letiště Leoše Janáčka', city: 'Ostrava', iata: 'OSR', hasPage: true },
  { slug: 'karlovy-vary', name: 'Letiště Karlovy Vary', city: 'Karlovy Vary', iata: 'KLV', hasPage: true },
  { slug: 'pardubice', name: 'Letiště Pardubice', city: 'Pardubice', iata: 'PED', hasPage: true },
]

export default function LetisteIndexPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · Letiště'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště v Česku
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 26px' }}>
          Vyberte letiště a najdete praktické informace, parkování, aktuální počasí a odkazy na oficiální zdroje.
          U každého navíc vidíte dostupná živá data letadel v okolí. Provozní časy a změny vždy ověřujte
          na oficiální tabuli konkrétního letiště.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AIRPORTS.map((a) => {
            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                background: 'var(--midnight-2)', border: '1px solid var(--border-mid)',
                borderRadius: 12, padding: '14px 16px',
                opacity: a.hasPage ? 1 : 0.55,
              }}>
                <div>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, fontWeight: 800 }}>
                    {a.city} <span style={{ color: 'var(--gold)', fontSize: 13 }}>{a.iata}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{a.name}</div>
                </div>
                <div style={{ fontSize: 12, color: a.hasPage ? 'var(--gold)' : 'var(--text-dim)', flexShrink: 0 }}>
                  {a.hasPage ? 'Otevřít →' : 'Připravujeme'}
                </div>
              </div>
            )
            return a.hasPage
              ? <Link key={a.slug} href={`/letiste/${a.slug}`} style={{ textDecoration: 'none' }}>{inner}</Link>
              : <div key={a.slug}>{inner}</div>
          })}
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)', margin: '26px 0 0' }}>
          Průvodce zahraničními letišti, kam se z Česka létá nebo jezdí, píšeme na blogu:{' '}
          <Link href="/blog/letiste-kodan" style={{ color: 'var(--gold)' }}>letiště Kodaň</Link>,{' '}
          <Link href="/blog/letiste-lipsko" style={{ color: 'var(--gold)' }}>Lipsko/Halle</Link> a{' '}
          <Link href="/blog/letiste-tivat" style={{ color: 'var(--gold)' }}>Tivat v Černé Hoře</Link>.
        </p>
      </div>
    </main>
  )
}
