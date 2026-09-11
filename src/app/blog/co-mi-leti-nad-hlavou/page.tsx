import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

const post = getPost('co-mi-leti-nad-hlavou')!

export const metadata: Metadata = {
  title: 'Co mi právě letí nad hlavou? Poznejte letadlo online',
  description:
    'Zjistěte zdarma, které letadlo vám právě letí nad hlavou. Praktický návod k živé mapě, údajům o letu a důvodům, proč někdy chybí trasa.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/co-mi-leti-nad-hlavou' },
  ...socialMetadata({
    title: 'Co mi právě letí nad hlavou?',
    description: 'Najděte letadlo na živé mapě a zjistěte jeho výšku, rychlost i dostupnou trasu.',
    url: 'https://www.flyqueens.cz/blog/co-mi-leti-nad-hlavou',
    type: 'article',
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updatedAt,
  description: 'Praktický návod, jak pomocí živé ADS-B mapy poznat letadlo nad hlavou a správně číst dostupné údaje.',
  image: 'https://www.flyqueens.cz/social-preview.png',
  inLanguage: 'cs-CZ',
  timeRequired: 'PT6M',
  author: { '@type': 'Organization', name: 'FlyQueens' },
  publisher: { '@type': 'Organization', name: 'FlyQueens' },
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/co-mi-leti-nad-hlavou',
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function OverheadAircraftArticle() {
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
          Co mi právě letí nad hlavou? Jak poznat letadlo online
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>{post.dateLabel} · {post.readingTime}</div>

        <p style={S.p}>
          Uslyšíte hluboký hukot, podíváte se vzhůru a mezi mraky zahlédnete letadlo. Kam letí, jak je vysoko
          a jaký je to typ? Nejrychlejší odpověď dá živá mapa letadel. Nemusíte znát číslo letu ani si zakládat účet.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Otevřete <Link href="/radar" style={{ color: 'var(--gold)' }}>živou mapu FlyQueens</Link>, přibližte své město
            nebo použijte polohu a klepněte na nejbližší letadlo. Uvidíte poslední dostupnou polohu, výšku, rychlost,
            směr a identifikaci. Odletové a cílové letiště se zobrazí jen tehdy, když je lze spolehlivě přiřadit.
          </p>
        </div>

        <h2 style={S.h2}>Postup krok za krokem</h2>
        <ol style={{ ...S.p, paddingLeft: 22 }}>
          <li style={{ marginBottom: 8 }}>Otevřete radar a najděte oblast, ve které stojíte.</li>
          <li style={{ marginBottom: 8 }}>Podívejte se na směr pohybu letadla a porovnejte jej se směrem, odkud přichází zvuk.</li>
          <li style={{ marginBottom: 8 }}>Klikněte na ikonu letadla. Na mobilu se nejprve ukáže krátká karta se základní identifikací.</li>
          <li>Rozbalte detail, pokud chcete výšku, rychlost, registraci a dostupnou trasu.</li>
        </ol>

        <h2 style={S.h2}>Proč může být letadlo na mapě trochu jinde?</h2>
        <p style={S.p}>
          Zvuk se šíří výrazně pomaleji než světlo. Než k vám hluk letadla z velké výšky dorazí, stroj už pokračoval
          dál. Svou roli hraje také vítr a krátké zpoždění mezi odvysíláním, přijetím a zobrazením dat. Proto se nedívejte
          jen přímo nad místo, odkud zvuk zdánlivě přichází, ale i kus před něj ve směru letu.
        </p>

        <h2 style={S.h2}>Co o letadle skutečně zjistíte</h2>
        <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Údaj</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Co znamená</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Omezení</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Poloha', 'poslední zachycené souřadnice', 'může mít několik sekund zpoždění'],
                ['Výška', 'obvykle barometrická výška', 'není to přesná vzdálenost od terénu'],
                ['Rychlost', 'rychlost vůči zemi', 'liší se od rychlosti vůči vzduchu'],
                ['Identifikace', 'volací znak, registrace nebo ICAO adresa', 'některé položky mohou chybět'],
                ['Trasa', 'přiřazené odletové a cílové letiště', 'nejde přímo o údaj z polohy ADS-B'],
              ].map(([value, meaning, limit]) => (
                <tr key={value}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontWeight: 700 }}>{value}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{meaning}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{limit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.h2}>Proč u některého letadla chybí trasa nebo typ?</h2>
        <p style={S.p}>
          ADS-B zpráva může obsahovat polohu, výšku, rychlost a identifikaci letu, ale ne hotový popis cesty pro
          cestující. Trasa se obvykle páruje s dalším zdrojem podle volacího znaku. Když je znak prázdný, zadaný chybně,
          soukromý nebo se nepodaří najít odpovídající letový plán, je poctivější zobrazit „trasa není dostupná“ než hádat.
        </p>

        <h2 style={S.h2}>Uvidím na mapě každé letadlo?</h2>
        <p style={S.p}>
          Ne. Zobrazení závisí na vybavení letadla, dostupnosti přijímačů, kvalitě signálu a pravidlech konkrétního zdroje.
          Hůře mohou být vidět některá malá, státní nebo vojenská letadla. Chybějící ikona proto neznamená, že je obloha
          prázdná. FlyQueens stav a zdroj dat ukazuje přímo v mapě.
        </p>

        <h2 style={S.h2}>Jak poznat, jestli letadlo stoupá nebo přistává</h2>
        <p style={S.p}>
          Sledujte vertikální rychlost a vývoj výšky. Kladná hodnota obvykle znamená stoupání, záporná klesání. Samotné
          klesání ale nedokazuje, že letadlo míří na nejbližší letiště — může měnit letovou hladinu nebo pokračovat jinam.
          U pražského provozu pomůže kombinovat mapu s naším <Link href="/blog/letiste-praha-zive" style={{ color: 'var(--gold)' }}>návodem ke sledování Letiště Praha</Link>.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Podívejte se nad sebe</div>
          <p style={{ ...S.p, marginBottom: 12 }}>Mapa je zdarma a nevyžaduje registraci. Nejlepší výsledek získáte, když ji otevřete hned, dokud je letadlo ještě poblíž.</p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu
          </Link>
        </div>

        <RelatedReading
          items={[
            {
              href: '/blog/jak-sledovat-let-podle-cisla',
              eyebrow: 'Praktický návod',
              title: 'Jak sledovat konkrétní let podle čísla',
              description: 'Rozdíl mezi číslem letu, volacím znakem a registrací letadla.',
            },
            {
              href: '/blog/jak-vysoko-letaji-letadla',
              eyebrow: 'Jak to funguje',
              title: 'Jak vysoko létají letadla a co znamená FL350',
              description: 'Výška v metrech, stopách a letových hladinách bez zbytečných zkratek.',
            },
          ]}
        />

        <SourcesBox
          sources={[
            { label: 'FAA — jaké údaje vysílá ADS-B', href: 'https://www.faa.gov/air_traffic/technology/equipadsb/resources/faq' },
            { label: 'FAA — poloha, výška a rychlost v ADS-B Out', href: 'https://www.faa.gov/air_traffic/technology/equipadsb/capabilities/ins_outs' },
            { label: 'Data o polohách: aktuální zdroj je uvedený přímo v mapě FlyQueens' },
          ]}
          note="Fakta a odkazy ověřeny 11. září 2026. Veřejná ADS-B mapa není určena pro navigaci ani bezpečnostní rozhodování."
        />
      </div>
    </main>
  )
}
