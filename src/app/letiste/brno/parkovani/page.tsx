import type { Metadata } from 'next'
import Link from 'next/link'
import { ParkingCrossLinks } from '@/components/UI/ParkingCrossLinks'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AffiliateParkingCta } from '@/components/Affiliate/AffiliateParkingCta'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Parkování u letiště Brno-Tuřany: ceny a kde zaparkovat levně',
  description:
    'Aktuální oficiální ceník parkování u letiště Brno-Tuřany, krátkodobé stání zdarma a sazby pro 1 až 21 dní.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/brno/parkovani' },
  ...socialMetadata({
    title: 'Parkování u letiště Brno-Tuřany: ceny a kde zaparkovat levně',
    description: 'Ověřený oficiální ceník, krátkodobé stání a sazby pro delší pobyt.',
    url: 'https://www.flyqueens.cz/letiste/brno/parkovani',
    type: 'article',
  }),
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kolik stojí parkování u letiště Brno?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na oficiálním parkovišti zaplatíte 300 Kč za první den. Sedm dní stojí 1 300 Kč a patnáct dní 2 500 Kč. Ceník letiště je platný od 1. ledna 2025 a byl ověřen 12. září 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kolik stojí krátké parkování u terminálu v Brně?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prvních 20 minut je jednou za den zdarma. Každá započatá hodina v rozsahu 1 až 4 hodin stojí 60 Kč; pobyt od 5 do 24 hodin stojí 300 Kč.',
      },
    },
  ],
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function ParkovaniBrnoPage() {
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
          <Link href="/letiste/brno" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Brno</Link>
          {' · Parkování'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Parkování u letiště Brno-Tuřany: kolik stojí a kde ušetříte
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Letiště má parkování přímo u terminálu a zveřejňuje pevný ceník. Sedm dní stojí 1 300 Kč,
          patnáct dní 2 500 Kč. Níže oddělujeme ověřené oficiální sazby od nabídek třetích stran.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Oficiální dlouhodobé parkoviště stojí 300 Kč za den, týden 1 300 Kč a patnáct dní 2 500 Kč.
            Prvních 20 minut je jednou denně zdarma. Každá započatá hodina od 1 do 4 hodin stojí 60 Kč;
            pobyt od 5 do 24 hodin stojí 300 Kč.
          </p>
        </div>

        <h2 style={S.h2}>Oficiální ceník</h2>
        <p style={S.p}>
          Dlouhodobý tarif začíná při pobytu od 5 do 24 hodin na 300 Kč. Týden vyjde
          na 1 300 Kč, patnáct dní na 2 500 Kč a jednadvacet dní na 3 450 Kč. Každý další den se pak připočítá
          po stovce, což je u delších cest příjemné.
        </p>
        <p style={S.p}>
          Prvních 20 minut je zdarma; každý další vjezd ve stejný den už letiště zpoplatňuje. Každá započatá
          hodina v pásmu 1 až 4 hodin stojí 60 Kč. Denní sazba začíná od pěti hodin, ne od tří.
        </p>

        <h2 style={S.h2}>Soukromá parkoviště s odvozem</h2>
        <p style={S.p}>
          Nabídky třetích stran se mění podle termínu a často zahrnují transfer. Bez konkrétního termínu nelze
          poctivě říct, že jsou levnější. Před rezervací porovnejte celkovou cenu, provozní dobu transferu,
          možnost storna a podmínky odpovědnosti za auto.
        </p>
        <p style={S.p}>
          Oficiální letiště nabízí také online rezervaci. Dostupnost a případnou cenu rezervace ověřte pro
          konkrétní termín přímo před cestou.
        </p>

        <h2 style={S.h2}>Co si vybrat</h2>
        <p style={S.p}>
          Na rychlé vysazení využijte bezplatných 20 minut. Pro delší cestu znáte předem pevnou oficiální
          sazbu; u alternativ porovnávejte nabídku pro stejný termín a stejné služby.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 20 }}>
          Oficiální ceník ověřen 12. září 2026. Aktuální částku vždy ověřte u provozovatele.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '26px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Než vyrazíte</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Mrkněte, co zrovna letí nad Brnem. Živá mapa ukazuje poslední dostupné polohy; kliknutí na letiště přidá aktuální počasí.
          </p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu
          </Link>
        </div>
        <AffiliateParkingCta airport="brno" />
        <SourcesBox
          sources={[
            { label: 'Letiště Brno-Tuřany: oficiální ceník parkování', href: 'https://www.brno-airport.cz/parkovani-na-letisti' },
          ]}
          note="Ceník platný od 1. ledna 2025; dostupnost a obsah stránky ověřeny 12. září 2026."
        />
        <ParkingCrossLinks current="brno" />
      </div>
    </main>
  )
}
