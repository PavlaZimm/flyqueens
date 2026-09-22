import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { ArticleHero } from '@/components/UI/ArticleHero'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { socialMetadata } from '@/lib/socialMetadata'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'

const post = getPost('letiste-praha-zive')!

export const metadata: Metadata = {
  title: 'Letiště Praha živě: přílety, odlety a mapa letadel',
  description:
    'Kde najdete oficiální webkameru letiště Praha, jak ji doplnit živou mapou letadel a kde ověřit skutečný přílet nebo odlet.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/letiste-praha-zive' },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  creator: AUTHOR.name,
  ...socialMetadata({
    title: 'Letiště Praha živě: přílety, odlety a mapa letadel',
    description: 'Oficiální webkamera z dráhy 06/24, živá mapa letadel a kde ověřit skutečný stav letu.',
    url: 'https://www.flyqueens.cz/blog/letiste-praha-zive',
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
    image: { url: '/blog/letiste-praha-zive.jpg', width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt },
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updatedAt,
  description: 'Praktický návod ke sledování letadel u pražského letiště pomocí živé ADS-B mapy, webkamery a oficiální tabule letů.',
  image: 'https://www.flyqueens.cz/blog/letiste-praha-zive.jpg',
  inLanguage: 'cs-CZ',
  timeRequired: 'PT6M',
  author: AUTHOR_JSON_LD,
  publisher: PUBLISHER_JSON_LD,
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/letiste-praha-zive',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
    { '@type': 'ListItem', position: 3, name: post.title, item: 'https://www.flyqueens.cz/blog/letiste-praha-zive' },
  ],
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function ZiveArticle() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd]).replace(/</g, '\\u003c') }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/blog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', margin: '18px 0 8px' }}>{post.tag}</div>
        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '0 0 6px' }}>
          Letiště Praha živě: přílety, odlety a mapa letadel
        </h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} updatedLabel="14. září 2026" readingTime={post.readingTime} />

        <ArticleHero
          src={post.image}
          alt={post.imageAlt}
          caption="Learjet 75 na Letišti Václava Havla Praha; ilustrační fotografie provozu."
          creditLabel="Sefjo / Wikimedia Commons"
          creditHref="https://commons.wikimedia.org/wiki/File:Learjet_75_N446LJ_at_PRG_01.JPG"
          licenseLabel="CC BY-SA 3.0"
          licenseHref="https://creativecommons.org/licenses/by-sa/3.0/"
        />

        <p style={S.p}>
          Někdo čeká na babičku z Barcelony a chce vědět, jestli už doletěla. Někoho jen baví koukat, co se
          nad hlavou děje. Sledovat Ruzyň online jde dvěma způsoby a každý ukáže něco jiného. Oficiální webkamera letiště vám dá
          živý obraz hlavní dráhy. Živá mapa ukáže letadla zachycená ADS-B přijímači, včetně provozu nad širším okolím Prahy. Pokrytí ale není stoprocentní.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Webkameru provozuje samo letiště na stránce prg.aero/planespotting a míří na hlavní dráhu 06/24.
            Živá mapa letadel funguje jinak: letadla sama
            vysílají svoji polohu, výšku a rychlost, a mapa vykresluje poslední dostupné záznamy. Kliknete na letadlo
            a uvidíte jeho identifikaci a dostupné letové údaje; trasa nemusí být vždy dostupná.
          </p>
        </div>

        <h2 style={S.h2}>Webkamera versus živá mapa</h2>
        <p style={S.p}>
          Webkamera je fajn na atmosféru. Vidíte počasí, provoz na stojánce, občas přistání. Má ale dvě slabiny:
          záběr je pevný a v noci nebo v mlze neuvidíte skoro nic. Živá mapa není závislá na denním světle ani
          na jediném záběru, má ale vlastní limity pokrytí a dostupnosti dat. Letadlo může ukázat i ve tmě,
          protože nepracuje s obrazem, ale s přijatými daty.
        </p>

        <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Zdroj</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Ukáže</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Nejlepší použití</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Živá mapa', 'polohu, výšku, rychlost', 'kde letadlo právě je'],
                ['Webkamera letiště', 'živý obraz dráhy 06/24', 'sledování přistání a počasí'],
                ['Tabule letiště', 'stav, čas a terminál', 'cesta na letiště'],
              ].map(([source, shows, use]) => (
                <tr key={source}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontWeight: 700 }}>{source}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{shows}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={S.h2}>Kde najdete webkameru z pražského letiště</h2>
        <p style={S.p}>
          Letiště Praha provozuje vlastní živý přenos a má pro něj samostatnou stránku{' '}
          <a href="https://www.prg.aero/planespotting" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
            prg.aero/planespotting
          </a>. Kamera stojí zhruba půl kilometru od dráhy, vysílá ve vysokém rozlišení a záběr doplňují
          informace o aktuálních odletech a příletech. Přenos běžel i na YouTube a na Mall.tv pod názvem
          „Živě z Letiště Praha“.
        </p>
        <p style={S.p}>
          Doporučujeme jít vždy přes oficiální stránku letiště, ne přes uložený odkaz na konkrétní video.
          Přenos totiž není vždy dostupný — čas od času se vypíná a odkazy na jednotlivá videa zastarávají,
          zatímco stránka letiště vede na to, co zrovna běží.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '16px 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Proč občas kamera nic neukáže</div>
          <p style={{ ...S.p, margin: 0 }}>
            Kamera míří na hlavní dráhu <strong>06/24</strong>. Praha má ale ještě druhou dráhu 12/30, a když
            provoz běží po ní, v záběru se toho moc dít nebude — i kdyby bylo letiště plné. Který směr se zrovna
            používá, se řídí hlavně větrem. Orientaci obou drah najdete na{' '}
            <Link href="/letiste/praha" style={{ color: 'var(--gold)' }}>stránce Letiště Praha</Link>.
          </p>
        </div>

        <p style={S.p}>
          Na stejné stránce letiště najdete i mapu míst, odkud se dá provoz legálně pozorovat přímo na místě.
          Pokud vás baví spíš focení než sledování z gauče, je to lepší start než bloudění kolem plotu.
        </p>

        <h2 style={S.h2}>PRG, LKPR nebo Ruzyně: jaký je mezi nimi rozdíl?</h2>
        <p style={S.p}>
          PRG je třípísmenný IATA kód používaný cestujícími, aerolinkami a rezervačními systémy. LKPR je
          čtyřpísmenný ICAO kód používaný v leteckém provozu. Ruzyně je původní a stále běžně používané
          místní označení. Všechny tři názvy odkazují na Letiště Václava Havla Praha.
        </p>

        <h2 style={S.h2}>Jak vlastně mapa ví, kde letadlo je?</h2>
        <p style={S.p}>
          Vybavené letadlo vysílá přes ADS-B identitu, polohu a další údaje odvozené z palubních systémů.
          Signál zachytávají pozemní nebo satelitní přijímače a dostupné zdroje je mohou agregovat. Pokrytí
          FlyQueens je omezené zvolenou oblastí a dostupností zdroje, nejde o úplný obraz provozu.
        </p>

        <h2 style={S.h2}>Co se dá z letu vyčíst</h2>
        <p style={S.p}>
          Když na letadlo kliknete, dostanete víc než jen tečku na mapě. Uvidíte volací znak, typ stroje,
          barometrickou výšku převedenou do metrů, rychlost a kurz. Pokud se podaří přiřadit trasová metadata,
          zobrazí se uváděné odletové a cílové letiště. Nejde o potvrzený letový plán ani přesnou proletěnou
          trasu. Vertikální rychlost napoví, zda stroj stoupá nebo klesá; sama ale nepotvrzuje, na které letiště míří.
        </p>

        <h2 style={S.h2}>Jak najít konkrétní let</h2>
        <p style={S.p}>
          Nejrychlejší je zadat číslo letu z letenky nebo zprávy aerolinky, například ve tvaru QS123 nebo
          FR1234. Vyhledávání umí pracovat také s registrací letadla a ICAO adresou. Pokud číslo nic nenajde,
          letadlo ještě nemusí být ve sledované oblasti, nemusí vysílat použitelnou polohu nebo používá jiný
          volací znak. V takovém případě ověřte stav na oficiální tabuli letiště.
        </p>

        <h2 style={S.h2}>Kdy je nad Prahou nejvíc rušno</h2>
        <p style={S.p}>
          Intenzita se mění podle aktuálního letového řádu, dne a sezóny. Nejspolehlivější je otevřít živou
          mapu spolu s oficiální tabulí příletů a odletů letiště; bez těchto dat nechceme tvrdit pevné hodiny špičky.
        </p>

        <h2 style={S.h2}>Vyplatí se sledovat konkrétní let?</h2>
        <p style={S.p}>
          Mapa je dobrá pro orientaci, kde se zachycené letadlo nachází. Pro vyzvednutí cestujícího ale berte
          jako autoritativní oficiální tabuli letiště: veřejná ADS-B data mohou mít zpoždění, výpadek pokrytí
          nebo chybné přiřazení trasy.
        </p>

        <h2 style={S.h2}>Co řešit před cestou na letiště</h2>
        <p style={S.p}>
          Živá mapa pomůže zjistit, zda se letadlo blíží, nenahrazuje ale potvrzený čas příletu ani číslo
          terminálu. Před odjezdem zkontrolujte oficiální stav letu. Pokud jedete autem, podívejte se také na
          náš <Link href="/letiste/praha/parkovani" style={{ color: 'var(--gold)' }}>přehled parkování u Letiště Praha</Link>;
          rozdíl mezi krátkým vyzvednutím a vícedenním stáním může být výrazný.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Podívejte se na Prahu právě teď</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Živá mapa FlyQueens ukazuje poslední dostupné polohy letadel nad Českem. Zdarma, bez registrace.
            Klikněte na letadlo a uvidíte jeho výšku, rychlost a typ; trasu zobrazíme, jen když je dostupná.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Otevřít živou mapu
            </Link>
            <Link href="/letiste/praha" style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Vše o letišti Praha
            </Link>
          </div>
        </div>

        <AuthorCard />

        <RelatedReading
          items={[
            {
              href: '/blog/jak-sledovat-let-podle-cisla',
              eyebrow: 'Praktický návod',
              title: 'Jak sledovat konkrétní let podle čísla',
              description: 'Co zadat do mapy a kde ověřit skutečný stav nebo zpoždění letu.',
            },
            {
              href: '/letiste/praha/parkovani',
              eyebrow: 'Prakticky před cestou',
              title: 'Parkování u Letiště Praha: možnosti a ceny',
              description: 'Kde zastavit při vyzvednutí a co porovnat při delším stání.',
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
            { label: 'EUROCONTROL — Automatic Dependent Surveillance–Broadcast', href: 'https://www.eurocontrol.int/service/automatic-dependent-surveillance-broadcast' },
            { label: 'Letiště Praha — oficiální přílety a odlety', href: 'https://www.prg.aero/' },
            { label: 'Letiště Praha — planespotting, živý přenos z dráhy a mapa míst k pozorování', href: 'https://www.prg.aero/planespotting' },
            { label: 'Data o polohách: dostupné ADS-B zdroje uvedené přímo v mapě' },
          ]}
          note="Princip ADS-B, trasová metadata a omezení veřejných dat ověřeny 13. září 2026, webkamera letiště 14. září 2026. Dostupnost živého přenosu se může měnit. Pro cestu na letiště kontrolujte oficiální tabuli."
        />
      </div>
    </main>
  )
}
