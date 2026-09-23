import { ArticleFlightStatus } from '@/components/Airport/ArticleFlightStatus'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { ArticleHero } from '@/components/UI/ArticleHero'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { AirlineCard } from '@/components/UI/AirlineCard'
import { socialMetadata } from '@/lib/socialMetadata'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'
import { ArticleContents } from '@/components/UI/ArticleContents'
import styles from '@/components/Article/Article.module.css'
import { ArticleHeader } from '@/components/Article/ArticleHeader'

const post = getPost('airbus-a380-praha-emirates')!

export const metadata: Metadata = {
  title: 'Airbus A380 se má vrátit do Prahy 1. října 2026',
  description:
    'Emirates plánuje návrat Airbusu A380 na linku Praha–Dubaj od 1. října 2026. Aktuální letový řád EK139 a EK140, časy a předchozí odklady.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/airbus-a380-praha-emirates' },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  creator: AUTHOR.name,
  ...socialMetadata({
    title: 'Airbus A380 se má vrátit do Prahy 1. října 2026',
    description: 'Aktuální letový řád EK139 a EK140, předchozí odklady a návod, jak ověřit konkrétní let.',
    url: 'https://www.flyqueens.cz/blog/airbus-a380-praha-emirates',
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
  description: 'Aktuální přehled plánovaného návratu Airbusu A380 společnosti Emirates na linku mezi Prahou a Dubají od 1. října 2026.',
  image: `https://www.flyqueens.cz${post.image}`,
  inLanguage: 'cs-CZ',
  timeRequired: 'PT6M',
  author: AUTHOR_JSON_LD,
  publisher: PUBLISHER_JSON_LD,
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/airbus-a380-praha-emirates',
  about: {
    '@type': 'Airline',
    name: 'Emirates',
    iataCode: 'EK',
    url: 'https://www.emirates.com/',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
    { '@type': 'ListItem', position: 3, name: post.title, item: 'https://www.flyqueens.cz/blog/airbus-a380-praha-emirates' },
  ],
}


export default function A380PrahaArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd]).replace(/</g, '\\u003c') }} />

      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current={post.title}
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} updatedLabel="14. září 2026" readingTime={post.readingTime} />
        >
          Airbus A380 se má vrátit do Prahy 1. října 2026
        </ArticleHeader>

        <ArticleHero
          src={post.image}
          alt={post.imageAlt}
          caption="Airbus A380 společnosti Emirates po přistání na Letišti Václava Havla Praha. Vyfoceno 26. října 2025."
          creditLabel="Pavla Zimmermannová / FlyQueens"
          creditHref="https://www.linklady.cz/o-mne"
          licenseLabel="vlastní fotografie"
          licenseHref="https://www.flyqueens.cz/o-projektu"
        />

        <p className={styles.lead}>
          Emirates má podle vlastního aktuálního letového řádu znovu nasadit Airbus A380 na každodenní linku mezi Dubají a
          Prahou od 1. října 2026. Do konce září létá na spojích EK139 a EK140 modernizovaný Boeing 777-300ER. Pro fanoušky
          největšího dopravního letadla světa je tedy podstatné jedno datum: návrat po letošní provozní pauze je
          naplánovaný na čtvrtek 1. října.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ margin: 0 }}>
            Airbus A380 má do Prahy přiletět na letu EK139 z Dubaje od 1. října 2026 a zpět odlétat jako EK140.
            Linka je v aktuálním rozpisu vedena denně. Od 1. do 24. října má EK139 přilétat ve 13:00 a EK140 odlétat
            v 16:10. Jde o plánovaný letový řád, který může Emirates ještě změnit.
          </p>
        </div>

        <AirlineCard
          abbreviation="EK"
          name="Emirates"
          country="Spojené arabské emiráty"
          facts={[
            { label: 'IATA / ICAO', value: 'EK / UAE' },
            { label: 'Domovské letiště', value: 'Dubaj (DXB)' },
            { label: 'Pražská linka', value: 'EK139 / EK140' },
            { label: 'Flotila cestujících', value: 'Airbus A350 a A380, Boeing 777' },
          ]}
          description="Dálková letecká společnost z Dubaje zahájila provoz v roce 1985. Mezi Prahou a Dubají provozuje přímou každodenní linku; konkrétní typ letadla se může podle data změnit."
          links={[
            { label: 'Oficiální web Emirates', href: 'https://www.emirates.com/cz/czech/' },
            { label: 'Letový řád Praha–Dubaj', href: 'https://www.emirates.com/ae/english/destinations/prg/dxb/flights-from-prague-to-dubai/' },
          ]}
        />

        <ArticleContents items={[
          { id: 'letovy-rad-a380-prahadubaj-od-rijna-2026', label: "Letový řád A380 Praha–Dubaj od října 2026" },
          { id: 'co-se-na-prazske-lince-zmenilo-v-roce', label: "Co se na pražské lince změnilo v roce 2026" },
          { id: 'co-vime-o-planovanem-letadle', label: "Co víme o plánovaném letadle" },
          { id: 'jak-overit-zda-do-prahy-poleti-a380', label: "Jak ověřit, zda do Prahy poletí A380" },
          { id: 'proc-se-typ-letadla-meni', label: "Proč se typ letadla mění" },
          { id: 'jak-sledovat-a380-nad-prahou', label: "Jak sledovat A380 nad Prahou" },
          { id: 'caste-otazky', label: "Časté otázky" },
        ]} />

        <h2 id="letovy-rad-a380-prahadubaj-od-rijna-2026">Letový řád A380 Praha–Dubaj od října 2026</h2>
        <p>
          Časy se při přechodu z letního na zimní letový řád mění. Všechna uvedená data jsou místní. Přílety do
          Prahy míří na Terminál 1, stejně jako odlety do Dubaje.
        </p>

        <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Let</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Trasa</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Období</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Místní čas</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['EK139', 'Dubaj → Praha', '1.–24. října', '08:35 → 13:00'],
                ['EK140', 'Praha → Dubaj', '1.–24. října', '16:10 → 23:55'],
                ['EK139', 'Dubaj → Praha', '25. října–27. března', '08:40 → 12:30'],
                ['EK140', 'Praha → Dubaj', '25. října–27. března', '14:45 → 23:40'],
              ].map(([flight, route, period, time]) => (
                <tr key={`${flight}-${period}`}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontWeight: 700 }}>{flight}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{route}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{period}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          Rozpis uvádí Airbus A380-800 každý den od 1. října 2026. Před cestou nebo fotografováním zkontrolujte
          konkrétní datum, protože dopravce může typ letadla operativně změnit.
        </p>

        <h2 id="co-se-na-prazske-lince-zmenilo-v-roce">Co se na pražské lince změnilo v roce 2026</h2>
        <p>
          Nejde o první návrat A380 po covidové přestávce. Ten proběhl už 1. prosince 2024 a letadlo na lince
          pravidelně létalo také na začátku roku 2026. Ještě v březnovém rozpisu byl A380 vedený do 28. března.
          Od 29. března ho v Praze nahradil Boeing 777-300ER.
        </p>
        <p>
          Emirates v únoru 2026 oznámil, že od 1. června pošle do Prahy modernizovaný A380 s Premium Economy.
          Následné provozní změny ale tento plán posunuly. Červencová aktualizace počítala s Boeingem 777 až do
          30. září a nejnovější zveřejněný rozpis uvádí A380 znovu od 1. října.
        </p>
        <p>
          Premium Economy ale Praha nakonec nezmeškala. Od 1. června 2026 linku obsluhuje modernizovaný
          Boeing 777-300ER s 332 sedadly ve čtyřech třídách — vedle Premium Economy se na trasu po zhruba
          roce a půl vrátila také First Class. Léto tedy neznamenalo krok zpět v nabídce kabin, jen menší
          letadlo než A380.
        </p>

        <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Datum</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Co platilo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1. prosince 2024', 'A380 se vrátil na pravidelnou linku Praha–Dubaj'],
                ['do 28. března 2026', 'A380 byl stále nasazený na EK139 a EK140'],
                ['29. března–30. září 2026', 'Linku převzal Boeing 777-300ER'],
                ['od 1. června 2026', 'Modernizovaný Boeing 777-300ER: 332 sedadel, poprvé Premium Economy'],
                ['od 1. října 2026', 'Aktuálně plánovaný každodenní návrat A380'],
              ].map(([date, change]) => (
                <tr key={date}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontWeight: 700, whiteSpace: 'nowrap' }}>{date}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          Proto jsou ve vyhledávání současně vidět zprávy o návratu v roce 2024, modernizovaném A380 plánovaném na
          červen 2026 i novém říjnovém termínu. Pro cestu nebo focení je rozhodující nejnovější rozpis konkrétního letu.
        </p>

        <h2 id="co-vime-o-planovanem-letadle">Co víme o plánovaném letadle</h2>
        <p>
          V rozpisu je uveden Airbus A380-800. Emirates v únoru pro Prahu oznámil modernizovaný stroj s Premium
          Economy, ale po několika změnách nasazení nechceme bez potvrzení slibovat konkrétní registraci ani uspořádání
          kabiny. Flotila Emirates má několik konfigurací A380 a výměna letadla je možná i krátce před odletem.
        </p>

        <h2 id="jak-overit-zda-do-prahy-poleti-a380">Jak ověřit, zda do Prahy poletí A380</h2>
        <ol style={{ paddingLeft: 22 }}>
          <li style={{ marginBottom: 7 }}>Otevřete oficiální vyhledávání letů Emirates.</li>
          <li style={{ marginBottom: 7 }}>Zadejte trasu PRG–DXB nebo DXB–PRG a konkrétní datum.</li>
          <li style={{ marginBottom: 7 }}>U letu EK139 nebo EK140 rozbalte detail a najděte typ letadla.</li>
          <li>V den letu zkontrolujte typ znovu. Provozní výměna může přijít i na poslední chvíli.</li>
        </ol>
        <p>
          Živá mapa je užitečná ve chvíli, kdy je letadlo ve vzduchu. Pro plánování několik týdnů dopředu ale není
          spolehlivější než oficiální rezervace dopravce.
        </p>

        <h2 id="proc-se-typ-letadla-meni">Proč se typ letadla mění</h2>
        <p>
          Aerolinka nasazuje kapacitu podle poptávky, sezony, dostupnosti letadel a provozních potřeb. A380 má dvě
          plné paluby a na vhodné trase přepraví výrazně více lidí než běžný širokotrupý stroj. Boeing 777 je menší
          a pro některá období může dávat dopravci větší smysl. Změna typu sama o sobě neznamená zrušení linky.
        </p>

        <h2 id="jak-sledovat-a380-nad-prahou">Jak sledovat A380 nad Prahou</h2>
        <p>
          Chcete přílet vidět na vlastní oči? V průvodci <Link href="/letiste/praha/planespotting" style={{ color: 'var(--gold)' }}>planespottingem v Praze</Link> najdete vyhlídkové valy v Kněževsi a u Hostivice, přístup a vlastní fotografie.
        </p>
        <p>
          Pokud je na daný den A380 skutečně nasazený, hledejte let EK139 při příletu z Dubaje nebo EK140 po odletu
          z Prahy. Mapa může ukázat polohu, výšku, rychlost a dostupný typ stroje. Data mají zpoždění a letadlo se
          nemusí objevit okamžitě, proto před cestou za focením sledujte také oficiální přílety a odlety letiště.
        </p>

        <figure style={{ margin: '18px 0 22px' }}>
          <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 9', borderRadius: 14, border: '1px solid var(--border-mid)', background: 'var(--midnight-2)' }}>
            <Image
              src="/blog/airbus-a380-praha-pristani.jpg"
              alt="Airbus A380 společnosti Emirates přistává na letišti v Praze před skupinou leteckých fanoušků"
              fill
              sizes="(max-width: 756px) calc(100vw - 36px), 720px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption style={{ marginTop: 7, fontSize: 11, lineHeight: 1.5, color: 'var(--text-dim)' }}>
            Přílet A380 sledovaný z veřejně přístupného místa u pražského letiště. Foto: Pavla Zimmermannová / FlyQueens, 26. října 2025.
          </figcaption>
        </figure>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Najděte EK139 nebo EK140 na mapě</div>
          <p style={{ marginBottom: 12 }}>
            Vyhledejte číslo letu a podívejte se na poslední dostupnou polohu. Typ letadla a stav letu před cestou
            ověřte také přímo u Emirates nebo na tabuli Letiště Praha.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Otevřít živou mapu
            </Link>
            <a
              href="https://www.emirates.com/ae/english/destinations/prg/dxb/flights-from-prague-to-dubai/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--gold)', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}
            >
              Ověřit let u Emirates ↗
            </a>
            <Link href="/letiste/praha" style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Letiště Praha
            </Link>
          </div>
        </div>

        <h2 id="caste-otazky">Časté otázky</h2>
        <h3>Kdy se A380 vrátí do Prahy?</h3>
        <p>
          Aktuální letový řád počítá s každodenním nasazením od 1. října 2026. Do 30. září je veden Boeing 777-300ER.
        </p>
        <h3>Je Emirates totéž jako Dubai Airlines?</h3>
        <p>
          Emirates je letecká společnost sídlící v Dubaji. „Dubai Airlines“ není její oficiální název.
        </p>
        <h3>Jaké číslo má let Emirates do Prahy?</h3>
        <p>Přímý let z Dubaje do Prahy je EK139. Z Prahy do Dubaje létá EK140.</p>

        <ArticleFlightStatus title="Dostupné lety Emirates v Praze" numbers={['EK139', 'EK140']} />
        <AuthorCard />

        <RelatedReading
          items={[
            {
              href: '/blog/starlux-airlines-praha',
              eyebrow: 'Nová dálková linka',
              title: 'STARLUX Airlines v Praze a Airbus A350',
              description: 'Letový řád nové přímé linky do Tchaj-peje a tipy ke sledování.',
            },
            {
              href: '/blog/jak-sledovat-let-podle-cisla',
              eyebrow: 'Praktický návod',
              title: 'Jak sledovat konkrétní let podle čísla',
              description: 'Rozdíl mezi číslem letu, volacím znakem a registrací letadla.',
            },
            {
              href: '/blog/letiste-praha-zive',
              eyebrow: 'Praha živě',
              title: 'Přílety, odlety a živá mapa Letiště Praha',
              description: 'Jak správně kombinovat mapu s oficiální letištní tabulí.',
            },
          ]}
        />

        <SourcesBox
          sources={[
            { label: 'Emirates: aktuální letový řád Praha–Dubaj včetně října 2026', href: 'https://www.emirates.com/ae/english/destinations/prg/dxb/flights-from-prague-to-dubai/' },
            { label: 'Emirates: původní oznámení modernizovaného A380 pro Prahu od června 2026', href: 'https://www.emirates.com/media-centre/emirates-extends-latest-cabin-experience-to-more-cities-worldwide/' },
            { label: 'AeroRoutes: A380 na pražské lince do 28. března 2026', href: 'https://www.aeroroutes.com/eng/260316-ekmar26' },
            { label: 'AeroRoutes: od 29. března 2026 Boeing 777 místo A380', href: 'https://www.aeroroutes.com/eng/260327-ekapr26' },
            { label: 'AeroRoutes: Boeing 777 na pražské lince od července do konce září 2026', href: 'https://www.aeroroutes.com/eng/260713-ek3q26' },
            { label: 'TTG Czech Republic: Emirates zavádí na trase Praha–Dubaj Premium Economy od 1. června 2026', href: 'https://www.ttg.cz/spolecnost-emirates-poprve-v-historii-zavede-na-trase-praha-dubaj-premium-economy/2026/06/' },
            { label: 'Emirates: technické údaje a konfigurace Airbusu A380', href: 'https://www.emirates.com/cz/czech/experience/our-fleet/a380/' },
            { label: 'IATA: oficiální kódy dopravce Emirates', href: 'https://www.iata.org/en/about/members/airline-list/emirates/73/' },
            { label: 'Emirates: historie společnosti od roku 1985', href: 'https://www.emirates.com/us/english/about-us/timeline/' },
          ]}
          note="Plánovaný návrat A380 a denní frekvence ověřeny 13. září 2026. Říjnové časy překontrolovány 14. září 2026 proti veřejným databázím letových řádů; přesnou minutu si pro konkrétní datum potvrďte u Emirates. Typ letadla se může změnit i po rezervaci."
        />
      </article>
    </main>
  )
}
