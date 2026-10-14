import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'
import { POSTS, relatedCard } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from '@/components/Article/Article.module.css'
import { ArticleHeader } from '@/components/Article/ArticleHeader'
import { ArticleContents } from '@/components/UI/ArticleContents'

const post = POSTS.find((entry) => entry.slug === 'flightradar24-zdarma-cesky')!
const title = 'Flightradar24 zdarma a česky: co je v základu a kolik stojí'
const description = 'Co umí Flightradar24 zdarma a co jen tarify Silver, Gold a Business: historie letů, ceny a čeština. Plus česká mapa letadel bez registrace.'
const url = 'https://www.flyqueens.cz/blog/flightradar24-zdarma-cesky'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const plans = 'https://www.flightradar24.com/premium/'
const fr24 = 'https://www.flightradar24.com/'
const vtm = 'https://vtm.zive.cz/clanky/jak-vlastne-funguje-flightradar24-poslouchame-letadla-nad-celym-ceskem-202605/sc-870-a-241110/default.aspx'
const flyradar = 'https://www.flyradar.cz/flightradar24/'
const adsblol = 'https://www.adsb.lol/'
const appstore = 'https://apps.apple.com/us/app/flightradar24-flight-tracker/id382233851'

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  ...socialMetadata({ title, description, url, type: 'article', publishedTime: post.date, modifiedTime: post.updatedAt,
    image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt },
  }),
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article', headline: title, description, datePublished: post.date, dateModified: post.updatedAt,
      author: AUTHOR_JSON_LD,
      publisher: PUBLISHER_JSON_LD,
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      image: ['https://www.flyqueens.cz/blog/radar-letadel-wizz-air-nos.webp'],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Flightradar24 zdarma a česky', item: url },
      ],
    },
  ],
}

export default function Flightradar24ZdarmaArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Flightradar24 zdarma a česky"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Flightradar24 se dá používat zdarma, ale jen zčásti. V základní verzi najdete živou mapu, historii letů za 7 dní, jednu záložku a jeden uložený filtr. Historie letů na letišti, delší archiv, seznam letů a další vrstvy jsou jen v placených tarifech, které podle stránky tarifů začínají na 14,99 USD za rok. Web je v angličtině a aplikace pro iPhone češtinu v nabídce nemá. Pokud vám stačí letadla nad Českem, česká mapa FlyQueens je zdarma a bez registrace.</p>

        <figure className={styles.photo}><Image src="/blog/radar-letadel-wizz-air-nos.webp" alt="Airbus Wizz Air zepředu na odbavovací ploše, vlevo za ním ocas letadla Ryanair" width={1600} height={900} sizes={sizes} preload /><figcaption>Letadla na odbavovací ploše letiště Treviso, 25. května 2026. Foto: vlastní archiv FlyQueens.</figcaption></figure>

        <ArticleContents items={[
          { id: 'co-je-zdarma', label: 'Co je ve Flightradar24 zdarma a co za peníze' },
          { id: 'cesky', label: 'Je Flightradar24 česky?' },
          { id: 'odkud-jsou-data', label: 'Odkud Flightradar24 bere data' },
          { id: 'kdy-staci-zdarma', label: 'Kdy stačí verze zdarma' },
          { id: 'ceska-mapa', label: 'Česká mapa letadel FlyQueens' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="co-je-zdarma">Co je ve Flightradar24 zdarma a co za peníze</h2>
        <p>Flightradar24 nabízí čtyři tarify: Free, Silver, Gold a Business. Podle stránky s tarify (<a href={plans}>Subscription plans</a>, 14. 10. 2026) vypadají hlavní rozdíly takto:</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Funkce</th><th scope="col">Free</th><th scope="col">Silver</th><th scope="col">Gold</th><th scope="col">Business</th></tr></thead>
            <tbody>
              <tr><td>Cena za rok (USD)</td><td>zdarma</td><td>14,99</td><td>34,99</td><td>499,99</td></tr>
              <tr><td>Historie letů</td><td>7 dní</td><td>90 dní</td><td>365 dní</td><td>3 roky</td></tr>
              <tr><td>Historie letů na letišti</td><td>ne</td><td>90 dní</td><td>365 dní</td><td>3 roky</td></tr>
              <tr><td>Záložky</td><td>1</td><td>10</td><td>25</td><td>60</td></tr>
              <tr><td>Uložené filtry</td><td>1</td><td>10</td><td>25</td><td>60</td></tr>
              <tr><td>3D zobrazení</td><td>3 relace</td><td>neomezeně</td><td>neomezeně</td><td>neomezeně</td></tr>
              <tr><td>Bez reklam a bočního panelu</td><td>ne</td><td>ano</td><td>ano</td><td>ano</td></tr>
              <tr><td>Bez časového limitu</td><td>ne</td><td>ano</td><td>ano</td><td>ano</td></tr>
              <tr><td>Seznam letů, hranice řízení letového provozu, vrstva oblačnosti</td><td>ne</td><td>ne</td><td>ano</td><td>ano</td></tr>
              <tr><td>Přehled flotily (fleet view)</td><td>ne</td><td>ne</td><td>ne</td><td>ano</td></tr>
              <tr><td>Použití</td><td>osobní</td><td>osobní</td><td>osobní</td><td>komerční i osobní</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={plans}>Flightradar24, Subscription plans</a>, 14. 10. 2026. Ceny jsou roční, v amerických dolarech, bez daně. Flightradar24 si vyhrazuje právo obsah tarifů měnit bez upozornění. Přístup k API se prodává zvlášť.</p>
        <p>Ke stránce tarifů patří upozornění, že se k cenám přidává daň nebo DPH a konečnou cenu ukáže až pokladna. Při měsíčním placení vychází rok dráž: u ročního placení stránka uvádí úsporu 58 % u Silver, 55 % u Gold a 17 % u Business. Všechny placené tarify mají 7denní zkušební dobu a podle častých otázek je k ní potřeba zadat platební údaje, první platba proběhne po jejím konci. Starší české články ceny uvádějí jinak, například <a href={flyradar}>přehled na flyradar.cz</a> z ledna 2024 píše u Silveru o 10 USD za rok, takže se na ně nespoléhejte.</p>

        <h2 id="cesky">Je Flightradar24 česky?</h2>
        <p>Web Flightradar24 je v angličtině a přepínač jazyka jsme na něm 14. října 2026 nenašli. Aplikace pro iPhone podle <a href={appstore}>App Storu</a> nabízí angličtinu, francouzštinu, němčinu, italštinu, japonštinu, polštinu, portugalštinu, ruštinu, zjednodušenou čínštinu a španělštinu. Čeština v seznamu není. U Androidu jsme jazyky neověřili, zkontrolujte je v nastavení aplikace.</p>
        <p>Pokud hledáte „Flightradar24 česky“, většinou pomůže něco jiného: český výklad nebo česká mapa. Česky to podrobně vysvětluje <a href={vtm}>článek na VTM.cz o tom, jak Flightradar24 funguje</a> (11. 5. 2026).</p>

        <h2 id="odkud-jsou-data">Odkud Flightradar24 bere data</h2>
        <p>Polohy pocházejí z přijímačů signálu ADS-B, tedy z vysílání, kterým letadlo samo oznamuje svou polohu. Přijímače staví a provozují dobrovolníci a data posílají na servery služby. Letadla bez plného ADS-B se podle VTM.cz dají odhadnout multilaterací (MLAT), tedy z časových rozdílů, v nichž je signál zachytilo nejméně čtyři přijímače. VTM.cz popisuje i to, co domácí přijímač stojí a jak se zapojit (<a href={vtm}>VTM.cz</a>).</p>
        <p>Kdo data sdílí, může dostat od Flightradar24 bezplatný tarif Contributor. Podle stránky tarifů je jen na pozvání a aktivuje se po založení účtu na stejný e-mail, s jakým je přijímač registrovaný, a po spuštění přenosu (<a href={plans}>Flightradar24, Subscription plans</a>).</p>

        <h2 id="kdy-staci-zdarma">Kdy stačí verze zdarma</h2>
        <p>Základní verze obvykle stačí, když:</p>
        <ul>
          <li>chcete jen vidět, co letí nad vámi, nebo kde je konkrétní let,</li>
          <li>potřebujete historii jen za poslední týden,</li>
          <li>vám nevadí reklamy a časový limit, po který se mapa zobrazuje.</li>
        </ul>
        <p>Placený tarif se vyplatí, když potřebujete delší archiv letů (měsíce až roky), historii letů na konkrétním letišti nebo seznam letů a další vrstvy. Pro komerční použití je podle stránky tarifů určený jen Business, ostatní tarify jsou osobní.</p>

        <h2 id="ceska-mapa">Česká mapa letadel FlyQueens</h2>
        <p>FlyQueens je samostatný český projekt a s Flightradar24 nijak nesouvisí. Mapa letadel je zdarma, bez registrace a česky. Používáme veřejná ADS-B data hlavně z projektu <a href={adsblol}>ADSB.lol</a>, který skládá signály z přijímačů dobrovolníků. Jak mapa funguje a jaká má omezení, popisujeme pod mapou na stránce <Link href="/radar">radar letadel</Link>.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Vlastnost</th><th scope="col">FlyQueens</th></tr></thead>
            <tbody>
              <tr><td>Aktuálnost</td><td>mapa se obnovuje každých 10 sekund, jen když je záložka otevřená v popředí; polohy starší než 30 sekund nezobrazujeme</td></tr>
              <tr><td>Dosah</td><td>výchozí je Česko a okolí, dalších sedm oblastí pokrývá části Evropy; každá oblast je kruh o poloměru asi 460 km</td></tr>
              <tr><td>Hledání</td><td>podle volacího znaku, registrace nebo ICAO adresy letadla na mapě, jen v zobrazené oblasti; podle čísla letu z letenky a data na hlavní stránce</td></tr>
              <tr><td>Historie letů</td><td>dlouhý archiv (měsíce až roky) nenabízíme, mapa ukazuje jen krátkou stopu otevřeného letadla</td></tr>
              <tr><td>Tabule letišť</td><td><Link href="/letiste/praha/odlety">odlety a přílety</Link> pro Prahu, Brno, Ostravu, Pardubice a Karlovy Vary</td></tr>
            </tbody>
          </table>
        </div>
        <p>Letadlo bez ADS-B vysílače nebo mimo dosah přijímačů na mapě nenajdete. Když znáte jen číslo letu z letenky, vysvětlujeme v samostatném <Link href="/blog/jak-sledovat-let-podle-cisla">článku o sledování letu podle čísla</Link>, proč se liší od volacího znaku. Na cestu na letiště se podle mapy neřiďte: čas příletu je u části letů jen odhad a spolehlivější je tabule letiště a aplikace dopravce.</p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Je Flightradar24 zdarma?</h3>
          <p>Základní verze ano. Zdarma je živá mapa s historií letů za 7 dní, jednou záložkou a jedním uloženým filtrem. Historie letů na letišti, seznam letů a další funkce jsou jen v placených tarifech.</p>
          <h3>Kolik stojí Flightradar24?</h3>
          <p>Podle stránky tarifů z 14. 10. 2026 stojí Silver 14,99 USD za rok, Gold 34,99 USD a Business 499,99 USD. Ceny jsou bez daně, konečnou částku ukáže pokladna. Při měsíčním placení vychází rok dráž.</p>
          <h3>Má Flightradar24 reklamy?</h3>
          <p>V základní verzi ano. Podle stránky s tarify odstraňuje reklamy a boční panel až tarif Silver a vyšší.</p>
          <h3>Jak dlouho zpětně ukáže Flightradar24 historii letů zdarma?</h3>
          <p>Za 7 dní. Silver ukáže 90 dní, Gold 365 dní a Business 3 roky.</p>
          <h3>Dá se Flightradar24 používat česky?</h3>
          <p>Web je v angličtině a aplikace pro iPhone podle App Storu češtinu nemá. U Androidu jazyky zkontrolujte v nastavení aplikace.</p>
          <h3>Jaká je česká alternativa zdarma?</h3>
          <p>Mapu letadel v češtině bez registrace nabízí i FlyQueens. Nemá ale dlouhý archiv letů ani celosvětové pokrytí jako Flightradar24, viz tabulka výše.</p>
        </div>

        <p>Chcete se podívat, co právě letí nad vámi?</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          relatedCard('/blog/jak-sledovat-let-podle-cisla'),
          relatedCard('/blog/co-mi-leti-nad-hlavou'),
          relatedCard('/blog/jak-vysoko-letaji-letadla'),
        ]} />
        <SourcesBox sources={[
          { label: 'Flightradar24: Subscription plans (14. 10. 2026)', href: plans },
          { label: 'Flightradar24: úvodní stránka', href: fr24 },
          { label: 'App Store: Flightradar24 Flight Tracker (jazyky, 14. 10. 2026)', href: appstore },
          { label: 'VTM.cz: Jak vlastně funguje Flightradar24 (11. 5. 2026)', href: vtm },
          { label: 'flyradar.cz: FlightRadar24.com, online letecký provoz na Radaru (leden 2024)', href: flyradar },
          { label: 'ADSB.lol: zdroj ADS-B dat pro mapu FlyQueens', href: adsblol },
        ]} note="Tarify, ceny a funkce Flightradar24 ověřeny 14. října 2026 na jejich stránce Subscription plans, jazyky aplikace pro iPhone v App Storu téhož dne. Jazyky aplikace pro Android neověřeny. FlyQueens je nezávislý projekt, není spojen se společností Flightradar24 AB. Letecká fotografie je z vlastního archivu FlyQueens." />
      </article>
    </main>
  )
}
