import type { Metadata } from 'next'
import Link from 'next/link'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Letiště Praha: parkování a živá mapa letadel',
  description:
    'Praktický rozcestník Letiště Václava Havla: parkování a ceny, odkazy na oficiální informace a poslední dostupné polohy letadel nad Prahou.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/praha' },
  ...socialMetadata({
    title: 'Letiště Praha: parkování a živá mapa | FlyQueens',
    description: 'Praktické informace o parkování a dostupná živá ADS-B data o letadlech nad Prahou.',
    url: 'https://www.flyqueens.cz/letiste/praha',
  }),
}

const LINKS = [
  { href: '/letiste/praha/ubytovani', title: 'Ubytování u letiště', desc: 'Hotely u terminálů, pěší přístup a doprava před ranním odletem.', ready: true },
  { href: '/letiste/praha/planespotting', title: 'Planespotting: kam na letadla', desc: 'Vyhlídky Kněževes a Hostivice, vlastní fotografie a radar při pozorování.', ready: true },
  { href: '/letiste/praha/parkovani', title: 'Parkování a ceny', desc: 'Kde zaparkovat levně, srovnání parkovišť a tipy na rezervaci.', ready: true },
  { href: '/radar', title: 'Živá mapa nad Prahou', desc: 'Poslední dostupné polohy letadel. Kliknutí ukáže detail.', ready: true },
  { href: '/letiste/praha/odlety', title: 'Odlety a přílety', desc: 'Přehled dostupných letů a bezpečný odkaz na oficiální tabuli.', ready: true },
]

const airportJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Airport',
  name: 'Letiště Václava Havla Praha',
  iataCode: 'PRG',
  icaoCode: 'LKPR',
  url: 'https://www.prg.aero/',
}

export default function PrahaHubPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · Praha'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště Václava Havla Praha
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 26px' }}>
          Letiště Václava Havla používá kódy PRG a LKPR. Vyberte si ověřený přehled parkování nebo živou mapu
          dostupných letových dat; provozní časy letu vždy potvrďte na oficiální tabuli letiště.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LINKS.map((l) => {
            const inner = (
              <div style={{
                background: 'var(--midnight-2)', border: '1px solid var(--border-mid)',
                borderRadius: 12, padding: '14px 16px', opacity: l.ready ? 1 : 0.55,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, fontWeight: 800 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: l.ready ? 'var(--gold)' : 'var(--text-dim)', flexShrink: 0 }}>
                    {l.ready ? 'Otevřít →' : 'Brzy'}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4, lineHeight: 1.5 }}>{l.desc}</div>
              </div>
            )
            return l.ready
              ? <Link key={l.href} href={l.href} style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</Link>
              : <div key={l.href}>{inner}</div>
          })}
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>
          Základní identifikace letiště a odkaz na přehled letů ověřeny 13. září 2026.
        </p>
        <SourcesBox
          sources={[
            { label: 'Letiště Praha: oficiální web', href: 'https://www.prg.aero/' },
            { label: 'Letiště Praha: oficiální přehled letů', href: 'https://www.prg.aero/prehled-letu?hour=all' },
          ]}
          note="Provozní čas, zpoždění a terminál vždy ověřte na oficiální tabuli nebo u dopravce."
        />
      </div>
    </main>
  )
}
