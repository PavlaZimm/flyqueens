import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { socialMetadata } from '@/lib/socialMetadata'

const post = getPost('squawk-nouzove-kody')!

export const metadata: Metadata = {
  title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
  description:
    'Co znamená squawk 7700, 7600 a 7500, jak funguje odpovídač v letadle a jak nouzový let poznáte na živé mapě. Srozumitelně a s příklady.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody' },
  ...socialMetadata({
    title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
    description: 'Co znamenají nouzové squawk kódy a jak nouzový let poznáte na mapě.',
    url: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody',
    type: 'article',
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updatedAt,
  description: 'Význam nouzových squawk kódů 7700, 7600 a 7500, princip odpovídače a správné čtení upozornění na živé mapě.',
  image: 'https://www.flyqueens.cz/social-preview.png',
  inLanguage: 'cs-CZ',
  timeRequired: 'PT5M',
  author: { '@type': 'Organization', name: 'FlyQueens' },
  publisher: { '@type': 'Organization', name: 'FlyQueens' },
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody',
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function SquawkArticle() {
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
          Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>{post.dateLabel} · aktualizováno 11. září 2026 · {post.readingTime}</div>

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

        <div style={{ overflowX: 'auto', margin: '18px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Squawk</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Význam</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Co z něj nepoznáte</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['7700', 'obecná nouze', 'konkrétní příčinu'],
                ['7600', 'porucha spojení', 'zda selhal příjem, vysílání, nebo obojí'],
                ['7500', 'protiprávní zásah', 'okolnosti a reakci bezpečnostních složek'],
              ].map(([code, meaning, limit]) => (
                <tr key={code}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700 }}>{code}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', fontWeight: 600 }}>{meaning}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

        <h2 style={S.h2}>Znamená squawk 7700, že letadlo havaruje?</h2>
        <p style={S.p}>
          Ne. Kód 7700 pouze říká, že posádka nebo systém signalizuje obecnou nouzovou situaci. Veřejná mapa
          neukazuje komunikaci s řízením ani důvod nastavení kódu. Let může pokračovat, změnit trasu, vrátit se
          nebo bezpečně přistát. Bez potvrzení aerolinky, letiště či úřadů proto není správné domýšlet příčinu.
        </p>

        <h2 style={S.h2}>Proč se upozornění může rychle ztratit?</h2>
        <p style={S.p}>
          Posádka může po pokynu řízení nastavit jiný kód, letadlo může opustit pokrytou oblast nebo může
          vypadnout veřejný datový zdroj. Krátké zobrazení tedy samo o sobě nepotvrzuje ani nevyvrací událost.
          FlyQueens ukazuje poslední dostupný signál a jeho stav, nikoli oficiální závěr vyšetřování.
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

        <RelatedReading
          items={[
            {
              href: '/blog/co-mi-leti-nad-hlavou',
              eyebrow: 'Praktický návod',
              title: 'Jak poznat letadlo nad hlavou',
              description: 'Najděte letadlo na živé mapě a zkontrolujte jeho dostupné údaje.',
            },
            {
              href: '/blog/jak-vysoko-letaji-letadla',
              eyebrow: 'Jak to funguje',
              title: 'Výška letadel, letové hladiny a FL350',
              description: 'Co přesně znamená číslo výšky zobrazené u letadla na mapě.',
            },
            {
              href: '/blog/letiste-praha-zive',
              eyebrow: 'Praktický návod',
              title: 'Jak sledovat letadla nad Prahou online',
              description: 'Jak kombinovat živou mapu, webkameru a oficiální tabuli letiště.',
            },
          ]}
        />

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
