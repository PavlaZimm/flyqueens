import { ArticleFlightStatus } from '@/components/Airport/ArticleFlightStatus'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { ArticleHero } from '@/components/UI/ArticleHero'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { AirlineCard } from '@/components/UI/AirlineCard'
import { socialMetadata } from '@/lib/socialMetadata'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'

const post = getPost('starlux-airlines-praha')!

export const metadata: Metadata = {
  title: 'STARLUX Airlines Praha: linka do Tchaj-peje a letový řád',
  description:
    'STARLUX Airlines létá přímo mezi Prahou a Tchaj-pejí. Aktuální dny a časy letů JX101 a JX102, nasazený Airbus A350 a tipy ke sledování letu.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/starlux-airlines-praha' },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  creator: AUTHOR.name,
  ...socialMetadata({
    title: 'STARLUX Airlines v Praze: přímá linka do Tchaj-peje',
    description: 'Kdy létají spoje JX101 a JX102, jaký Airbus A350 je obsluhuje a kde let ověřit nebo sledovat.',
    url: 'https://www.flyqueens.cz/blog/starlux-airlines-praha',
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
    image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt },
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updatedAt,
  description: 'Aktuální a ověřený přehled přímé linky STARLUX Airlines mezi Prahou a Tchaj-pejí.',
  image: `https://www.flyqueens.cz${post.image}`,
  inLanguage: 'cs-CZ',
  timeRequired: 'PT6M',
  author: AUTHOR_JSON_LD,
  publisher: PUBLISHER_JSON_LD,
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/starlux-airlines-praha',
  about: {
    '@type': 'Airline',
    name: 'STARLUX Airlines',
    iataCode: 'JX',
    url: 'https://www.starlux-airlines.com/',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
    { '@type': 'ListItem', position: 3, name: post.title, item: 'https://www.flyqueens.cz/blog/starlux-airlines-praha' },
  ],
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  h3: { fontFamily: 'Archivo, sans-serif', fontSize: 16, fontWeight: 800, margin: '22px 0 8px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function StarluxPrahaArticle() {
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
          STARLUX Airlines v Praze: přímá linka do Tchaj-peje
        </h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} updatedLabel="14. září 2026" readingTime={post.readingTime} />

        <ArticleHero
          src={post.image}
          alt={post.imageAlt}
          caption="Airbus A350-1000 společnosti STARLUX Airlines při příletu na letiště Tchaj-wan Tchao-jüan; ilustrační fotografie typu nasazovaného také na linku do Prahy."
          creditLabel="Steven Byles / Wikimedia Commons"
          creditHref="https://commons.wikimedia.org/wiki/File:Starlux_Airlines_A350-1041_B-58553_-_TPE_RCTP_-_05-JUL-2026.jpg"
          licenseLabel="CC BY-SA 4.0"
          licenseHref="https://creativecommons.org/licenses/by-sa/4.0/"
        />

        <p style={S.p}>
          Praha se stala první evropskou destinací STARLUX Airlines. Tchajwanská aerolinka zahájila přímé lety
          mezi Tchaj-pejí a Prahou 1. srpna 2026. Nová linka není charter ani jednorázová návštěva. Jde o pravidelné
          spojení provozované širokotrupým Airbusem A350.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            STARLUX Airlines létá z Prahy do Tchaj-peje pod číslem JX102. Opačný let do Prahy nese číslo JX101.
            Do konce září 2026 jsou v oficiálním rozpisu tři lety týdně. Pro období od 1. do 24. října dopravce
            zveřejnil čtyři lety týdně. Pozdější datum vždy ověřte přímo u STARLUX.
          </p>
        </div>

        <AirlineCard
          abbreviation="JX"
          name="STARLUX Airlines"
          country="Tchaj-wan"
          facts={[
            { label: 'IATA / ICAO kód', value: 'JX / SJX' },
            { label: 'Domovské letiště', value: 'Tchaj-wan Tchao-jüan (TPE)' },
            { label: 'Pražská linka', value: 'JX101 / JX102' },
            { label: 'Zahájení provozu', value: '23. ledna 2020' },
            { label: 'Osobní flotila', value: 'A321neo, A330neo, A350-900 a A350-1000' },
            { label: 'Praha', value: 'První evropská linka dopravce' },
          ]}
          description="STARLUX je tchajwanská mezinárodní aerolinka založená v květnu 2018. Provozuje výhradně letadla Airbus a svou síť staví kolem letiště Tchaj-wan Tchao-jüan. Přímé spojení s Prahou zahájila 1. srpna 2026."
          links={[
            { href: 'https://www.starlux-airlines.com/', label: 'Oficiální web' },
            { href: 'https://www.starlux-airlines.com/en-Global/experience/walk-into-starlux/our-fleet', label: 'Flotila STARLUX' },
            { href: 'https://www.iata.org/en/about/members/airline-list/starlux-airlines/605/', label: 'Profil u IATA' },
          ]}
        />

        <h2 style={S.h2}>Letový řád STARLUX Praha a Tchaj-pej</h2>
        <p style={S.p}>
          Pro období od 1. srpna do 30. září 2026 zveřejnil STARLUX následující rozpis. Časy jsou místní a přílet
          do Tchaj-peje je následující den.
        </p>

        <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Let</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Trasa</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Čas</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Dny</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['JX101', 'Tchaj-pej → Praha', '00:10 → 07:50', 'út, čt, so'],
                ['JX102', 'Praha → Tchaj-pej', '10:20 → 05:10 +1', 'út, čt, so'],
              ].map(([flight, route, time, days]) => (
                <tr key={flight}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontWeight: 700 }}>{flight}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{route}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{time}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ ...S.p, color: 'var(--text-muted)', fontSize: 13 }}>
          Od 1. do 24. října 2026 uvádí dopravce lety v pondělí, úterý, čtvrtek a sobotu. JX101 má odlétat z
          Tchaj-peje v 00:10 a přilétat do Prahy v 08:25. JX102 má odlétat z Prahy v 10:45 a do Tchaj-peje
          přilétat v 05:10 následujícího dne. Pro pozdější termíny použijte aktuální rezervační systém STARLUX.
        </p>

        <h2 style={S.h2}>Jaké letadlo STARLUX do Prahy nasazuje</h2>
        <p style={S.p}>
          Linka začala s Airbusem A350-900. Od 1. září 2026 ji převzal větší Airbus A350-1000 s kapacitou
          350 cestujících ve čtyřech třídách: 4 místa v první třídě, 40 v business classu, 36 v premium economy
          a 270 v ekonomické třídě. Konkrétní letadlo se ale může z provozních důvodů změnit. Typ zobrazený
          při nákupu proto berte jako plán, ne jako záruku.
        </p>

        <h2 style={S.h2}>Zlatý Airbus AIRSORAYAMA Gold přistál v Praze</h2>
        <p style={S.p}>
          První A350-1000 na pražské lince nebyl obyčejný stroj. V úterý 1. září 2026 ráno přistál na Ruzyni
          Airbus registrace B-58554 ve zlatém laku AIRSORAYAMA Gold. Šlo o vůbec první přílet letadla
          AIRSORAYAMA do Evropy.
        </p>
        <p style={S.p}>
          Zrcadlově kovový vzhled navrhl japonský umělec Hadžime Sorajama. STARLUX na něm spolupracoval
          s Airbusem a výrobcem laků Mankiewicz: výsledkem je vícevrstvý nátěr se slídovými částicemi, který
          drží kovový lesk a zároveň splňuje požadavky na bezpečnost provozu. Ve dvojici s ním létá stříbrná
          verze AIRSORAYAMA Silver.
        </p>

        <h2 style={S.h2}>Proč je linka zajímavá</h2>
        <p style={S.p}>
          Cestující získali přímé spojení mezi Českem a Tchaj-wanem bez přestupu. Pro letecké fanoušky je zajímavé
          pravidelné nasazení A350-1000. Praha je navíc jednou ze tří destinací, kam STARLUX plánuje speciálně
          zbarvené stroje AIRSORAYAMA vozit pravidelně; kromě Prahy jde o Tokio a Phoenix. Konkrétní den ale
          zaručený není, protože i tady může dopravce letadlo prohodit.
        </p>
        <p style={S.p}>
          Ne každému se ale vyplatí vybírat spoj jen podle typu letadla. Při cestě do Asie porovnejte celkovou cenu,
          zavazadla, návazný let a podmínky změny rezervace. Nejlevnější nabídka v konkrétní den nemusí být nejpraktičtější.
        </p>

        <h2 style={S.h2}>Jak sledovat lety JX101 a JX102</h2>
        <p style={S.p}>
          Do vyhledávání na mapě zadejte číslo JX101 nebo JX102. Uvidíte polohu letadla, pokud je právě ve vzduchu,
          nachází se v pokryté oblasti a veřejný zdroj přijímá jeho data. Volací znak se může lišit od čísla uvedeného
          na letence, proto má smysl hledat také podle trasy nebo registrace.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Podívejte se, zda je STARLUX právě nad Evropou</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Na FlyQueens můžete let vyhledat podle čísla a sledovat poslední dostupnou polohu. Skutečný čas odletu,
            příletu a případné změny ověřujte na oficiální tabuli letiště nebo u aerolinky.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Otevřít živou mapu
            </Link>
            <Link href="/letiste/praha" style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Letiště Praha
            </Link>
          </div>
        </div>

        <h2 style={S.h2}>Časté otázky</h2>
        <h3 style={S.h3}>Létá STARLUX z Prahy přímo?</h3>
        <p style={S.p}>Ano. JX102 je přímý pravidelný let z Prahy do Tchaj-peje. JX101 létá opačným směrem.</p>
        <h3 style={S.h3}>Ze kterého terminálu STARLUX odlétá?</h3>
        <p style={S.p}>
          Tchaj-wan neleží v Schengenu, proto Letiště Praha uvádí Terminál 1. Číslo přepážky a brány kontrolujte
          v den odletu na letištní tabuli.
        </p>
        <h3 style={S.h3}>Je typ A350-1000 zaručený?</h3>
        <p style={S.p}>
          Ne. Od 1. září 2026 je na lince nasazený pravidelně, ale aerolinka může z provozních důvodů
          poslat jiný stroj.
        </p>
        <h3 style={S.h3}>Přiletí zlatý Airbus AIRSORAYAMA i příště?</h3>
        <p style={S.p}>
          Praha je jednou ze tří destinací, kam STARLUX AIRSORAYAMA vozí pravidelně. Který den poletí zlatý
          nebo stříbrný stroj, ale dopravce dopředu negarantuje — před cestou za focením si typ ověřte.
        </p>

        <ArticleFlightStatus title="Dostupné lety STARLUX v Praze" numbers={['JX101', 'JX102']} />
        <AuthorCard />

        <RelatedReading
          items={[
            {
              href: '/blog/jak-sledovat-let-podle-cisla',
              eyebrow: 'Praktický návod',
              title: 'Jak sledovat let podle čísla',
              description: 'Co zadat do mapy a kde ověřit skutečný stav nebo zpoždění letu.',
            },
            {
              href: '/blog/airbus-a380-praha-emirates',
              eyebrow: 'Velká letadla v Praze',
              title: 'Kdy létá Airbus A380 společnosti Emirates',
              description: 'Historie návratu, aktuální stav a správné ověření typu letadla.',
            },
            {
              href: '/blog/praha-santiago-de-compostela',
              eyebrow: 'Další nová linka',
              title: 'Z Prahy přímo do Santiaga de Compostela',
              description: 'Fly2Galicia od prosince 2026: kdo lety provádí a co obsahuje letenka.',
            },
            {
              href: '/blog/letiste-praha-zive',
              eyebrow: 'Praha živě',
              title: 'Přílety, odlety a živá mapa Letiště Praha',
              description: 'Jak se liší veřejná mapa, webkamera a oficiální letištní tabule.',
            },
          ]}
        />

        <SourcesBox
          sources={[
            { label: 'Letiště Praha: STARLUX zahájil přímé spojení Praha–Tchaj-pej', href: 'https://www.prg.aero/starlux-airlines-vstupuji-do-evropy-nova-prima-linka-spojuje-od-dnesniho-dne-prahu-s-tchaj-peji' },
            { label: 'STARLUX Airlines: oficiální rozpis linky Tchaj-pej–Praha', href: 'https://latestnews.starlux-airlines.com/en-TH/about-us/travel-advisories/advisories/latest-news/fly_to_PRG' },
            { label: 'STARLUX Airlines: oficiální přehled flotily', href: 'https://www.starlux-airlines.com/en-Global/experience/walk-into-starlux/our-fleet' },
            { label: 'IATA: kódy a profil STARLUX Airlines', href: 'https://www.iata.org/en/about/members/airline-list/starlux-airlines/605/' },
            { label: 'Letiště Praha: informace o destinaci Tchaj-pej a Terminálu 1', href: 'https://www.prg.aero/tchaj-pej' },
            { label: 'Zdopravy.cz: zlatý Airbus AIRSORAYAMA Gold přistál v Praze 1. září 2026', href: 'https://zdopravy.cz/obrazem-neobvykle-rano-na-ruzyni-v-praze-pristalo-zlate-letadlo-297129/' },
            { label: 'Aeroweb.cz: AIRSORAYAMA Gold poprvé v Praze, registrace B-58554', href: 'https://www.aeroweb.cz/clanky/12412-zlaty-skvost-poprve-v-praze-starlux-airlines-airsorayama-gold' },
            { label: 'fZone.cz: A350-1000 pro Prahu a rozdělení 350 sedadel do čtyř tříd', href: 'https://fzone.cz/clanky/jeste-pred-startem-linky-zmena-starlux-posle-do-prahy-vetsi-letadlo-10170' },
          ]}
          note="Letový řád ověřen 13. září 2026, nasazení A350-1000 a přílet AIRSORAYAMA Gold 14. září 2026. Pro konkrétní datum vždy zkontrolujte informace dopravce."
        />
      </div>
    </main>
  )
}
