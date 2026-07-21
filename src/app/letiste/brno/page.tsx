import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Letiště Brno-Tuřany: parkování, odlety a živá mapa',
  description: 'Vše k letišti Brno-Tuřany na jednom místě: parkování a ceny, odlety a přílety, lety v reálném čase nad Brnem.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/brno' },
}

const LINKS = [
  { href: '/letiste/brno/parkovani', title: 'Parkování a ceny', desc: 'Oficiální ceník, soukromá parkoviště s odvozem a kde ušetříte.', ready: true },
  { href: '/', title: 'Živá mapa nad Brnem', desc: 'Co zrovna letí ve vzduchu, v reálném čase.', ready: true },
  { href: '/letiste/brno/odlety', title: 'Odlety a přílety', desc: 'Časy letů a zpoždění. Připravujeme.', ready: false },
]

export default function BrnoHubPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · Brno'}
        </nav>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště Brno-Tuřany
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 26px' }}>
          Druhé největší české letiště, kód BRQ. Je menší a přehlednější než Ruzyň, takže odbavení bývá
          rychlé. Vyberte, co potřebujete.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LINKS.map((l) => {
            const inner = (
              <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '14px 16px', opacity: l.ready ? 1 : 0.55 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 800 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: l.ready ? 'var(--gold)' : 'var(--text-dim)', flexShrink: 0 }}>{l.ready ? 'Otevřít →' : 'Brzy'}</div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4, lineHeight: 1.5 }}>{l.desc}</div>
              </div>
            )
            return l.ready
              ? <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>{inner}</Link>
              : <div key={l.href}>{inner}</div>
          })}
        </div>
      </div>
    </main>
  )
}
