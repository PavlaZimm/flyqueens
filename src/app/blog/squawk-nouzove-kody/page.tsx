import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'

const post = getPost('squawk-nouzove-kody')!

export const metadata: Metadata = {
  title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
  description:
    'Co znamená squawk 7700, 7600 a 7500, jak funguje odpovídač v letadle a jak nouzový let poznáte na živé mapě. Srozumitelně a s příklady.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody' },
  openGraph: {
    title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
    description: 'Co znamenají nouzové squawk kódy a jak nouzový let poznáte na mapě.',
    url: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody',
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
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody',
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function SquawkArticle() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      { }
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/blog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', margin: '18px 0 8px' }}>{post.tag}</div>
        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '0 0 6px' }}>
          Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>{post.dateLabel}</div>

        <p style={S.p}>
          Když se ztratí rádiové spojení, posádka může na odpovídači nastavit vyhrazený čtyřmístný kód.
          Tam, kde jej zachytí příslušný dohledový systém, tak řízení dostane důležitou informaci i bez rádia. Kód se
          jmenuje squawk a tři z nich znamenají problém. Pojďme si je projít.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            <b>7700</b> označuje obecnou nouzi, <b>7600</b> poruchu rádiového spojení a <b>7500</b>
            protiprávní zásah. Jde o mezinárodně vyhrazené kódy; samotný kód ale neříká všechny okolnosti události.
          </p>
        </div>

        <h2 style={S.h2}>Co je squawk a odpovídač</h2>
        <p style={S.p}>
          Každé dopravní letadlo má na palubě odpovídač, anglicky transponder. Je to krabička, která na dotaz
          radaru odpoví číslem a výškou. To číslo je právě squawk, čtyři cifry od 0000 do 7777. Běžně ho letadlu
          přidělí řízení, aby ho na obrazovce rozlišilo od ostatních. Pár kódů má ale pevný, celosvětově platný
          význam.
        </p>

        <h2 style={S.h2}>7700: obecná nouze</h2>
        <p style={S.p}>
          Kód 7700 je vyhrazen pro obecnou nouzi. Konkrétní příčina z něj není poznat a další postup závisí
          na situaci, komunikaci posádky a pokynech řízení letového provozu. FlyQueens proto zobrazuje kód,
          ale nesnaží se z veřejných dat hádat příčinu.
        </p>

        <h2 style={S.h2}>7600: výpadek rádia</h2>
        <p style={S.p}>
          Kód 7600 je vyhrazen pro poruchu rádiového spojení. Neříká, zda je problém ve vysílání, příjmu
          nebo obojím. Posádka a řízení pak postupují podle publikovaných postupů pro ztrátu spojení.
        </p>

        <h2 style={S.h2}>7500: únos nebo protiprávní čin</h2>
        <p style={S.p}>
          Kód 7500 je vyhrazen pro protiprávní zásah. Detaily reakce bezpečnostních a letových složek nejsou
          z veřejného ADS-B záznamu patrné, takže mapa ukazuje pouze ověřitelný kód.
        </p>

        <h2 style={S.h2}>A co běžné kódy?</h2>
        <p style={S.p}>
          V Evropě se 7000 používá v oblastech a situacích určených jednotlivými státy pro let bez služby ATC,
          pokud posádka nedostane jiný pokyn. Kód 2000 se podle evropských pravidel používá při absenci pokynu
          ATC nebo regionální dohody. Ani jeden z nich sám o sobě neznamená nouzi.
        </p>

        <h2 style={S.h2}>Jak nouzový let poznáte na mapě</h2>
        <p style={S.p}>
          FlyQueens sleduje squawk kódy živě. Když se nad sledovanou oblastí objeví letadlo se 7700, 7600 nebo
          7500, zvýrazní se a naskočí upozornění. Veřejná data mohou být zpožděná nebo neúplná a z kódu nelze
          určit příčinu, proto je upozornění informační, ne oficiální bezpečnostní hlášení.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Podívejte se, co letí právě teď</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Živá mapa ukáže poslední dostupné polohy letadel nad Českem. Zachycené nouzové squawky se zvýrazní automaticky.
          </p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu
          </Link>
        </div>

        <SourcesBox
          sources={[
            { label: 'EUROCONTROL — Compendium of Mode S and ADS-B regulations', href: 'https://www.eurocontrol.int/sites/default/files/2024-05/eurocontrol-compendium-mode-s-ads-b-military.pdf' },
            { label: 'Řízení letového provozu ČR — letecká informační příručka (AIP)', href: 'https://aim.rlp.cz/' },
          ]}
          note="Význam kódů ověřen 11. září 2026. Upozornění FlyQueens není oficiální hlášení řízení letového provozu."
        />
      </div>
    </main>
  )
}
