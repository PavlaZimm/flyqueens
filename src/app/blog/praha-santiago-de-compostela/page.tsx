import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD } from '@/lib/author'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from './page.module.css'

const post = POSTS.find((entry) => entry.slug === 'praha-santiago-de-compostela')!
const title = 'Praha–Santiago de Compostela přímo: Fly2Galicia od prosince'
const description = 'Od 2. 12. 2026 přímé lety z Prahy do Santiaga de Compostela, ve středu a v neděli. Kdo je skutečně provádí, co obsahuje nejlevnější tarif a jak do města.'
const url = 'https://www.flyqueens.cz/blog/praha-santiago-de-compostela'
const faq = 'https://fly2galicia.com/preguntas-frecuentes/'
const conditions = 'https://fly2galicia.com/condiciones-generales-de-transporte/'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'

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
      publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      about: { '@type': 'Airport', name: 'Letiště Santiago–Rosalía de Castro', iataCode: 'SCQ', icaoCode: 'LEST' },
      image: [
        'https://www.flyqueens.cz/blog/santiago-de-compostela-katedrala.webp',
        'https://www.flyqueens.cz/blog/fly2galicia-flyyo-a320.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Praha–Santiago de Compostela', item: url },
      ],
    },
  ],
}

export default function PrahaSantiagoArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
          <Link href="/">FlyQueens</Link><span aria-hidden="true">/</span>
          <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Praha–Santiago de Compostela</span>
        </nav>
        <h1>{title}</h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        <p className={styles.lead}>Od středy 2. prosince 2026 se z Prahy dá letět přímo do Santiaga de Compostela, do cíle Svatojakubské cesty. Spoje jsou ve středu a v neděli a prodávají se pod značkou Fly2Galicia. Samotný let ale provádí jiná, rumunská společnost. Tady je, co to pro vás znamená, co zahrnuje nejlevnější letenka a jak se po večerním příletu dostanete do města.</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Hodnota</th></tr></thead>
            <tbody>
              <tr><td>Trasa</td><td>Praha (PRG) – Santiago de Compostela (SCQ)</td></tr>
              <tr><td>První let</td><td>středa 2. 12. 2026</td></tr>
              <tr><td>Dny</td><td>středa a neděle</td></tr>
              <tr><td>Odlet z Prahy</td><td>18:40, přílet 21:50</td></tr>
              <tr><td>Odlet ze Santiaga</td><td>14:35, přílet do Prahy 17:50</td></tr>
              <tr><td>Prodejce</td><td>Fly2Galicia (Aviation &amp; Mobility Services Group, S.L.)</td></tr>
              <tr><td>Kdo let provádí</td><td>FLYYO S.R.L., Rumunsko</td></tr>
              <tr><td>Letadlo</td><td>Airbus A320</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: dny letů podle <a href="https://fly2galicia.com/destino/praga/">Fly2Galicia</a> a <a href="https://x.com/PragueAirport/status/2089736858250932398">Letiště Praha</a>. Časy převzaté z rezervačního systému podle <a href="https://www.cestujlevne.com/akcni-letenky/santiago-de-compostela-nove-primo-z-prahy-s-fly2galicia">Cestujlevne.com</a> (18. 8. 2026), web dopravce je zatím neuvádí. Provozovatel podle <a href={conditions}>přepravních podmínek Fly2Galicia</a>. Stav k 22. 9. 2026.</p>

        <figure className={styles.photo}><Image src="/blog/santiago-de-compostela-katedrala.webp" alt="Věže katedrály v Santiagu de Compostela nad střechami starého města ve večerním světle" width={1600} height={1067} sizes={sizes} preload /><figcaption>Katedrála v Santiagu de Compostela z parku Alameda. Foto: <a href="https://commons.wikimedia.org/wiki/File:Santiago_Compostela_Cathedral_2023_-_View_from_Alameda_Park.jpg">Fernando Pascullo, Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, zmenšeno.</figcaption></figure>

        <h2>Kdy a v kolik se létá?</h2>
        <p>Spoj je dvakrát týdně, ve středu a v neděli. Oba dny uvádí Fly2Galicia u Prahy na <a href="https://fly2galicia.com/destino/praga/">svém webu</a>, začátek 2. prosince potvrdilo i <a href="https://x.com/PragueAirport/status/2089736858250932398">Letiště Praha</a>. Celá síť Fly2Galicia má začít o den dřív, 1. prosince 2026.</p>
        <p>Z Prahy se podle údajů z rezervace odlétá v 18:40 a v Santiagu se přistává ve 21:50. Zpět letadlo odlétá ve 14:35 a do Prahy přiletí v 17:50. Španělsko má stejný čas jako Česko, let tedy trvá přibližně 3 hodiny a 10 minut. Konečné časy si zkontrolujte přímo v rezervaci, u nového spoje se ještě mohou změnit.</p>
        <p>Ze středy do neděle vychází výlet na čtyři noci, z neděle do středy na tři. Delší pobyt je o týden nebo více.</p>

        <h2>Kdo let skutečně provádí?</h2>
        <p>Fly2Galicia není letecká společnost v obvyklém smyslu. Nemá vlastní osvědčení leteckého provozovatele (AOC), bez kterého nelze vozit cestující. Značku používá španělská firma Aviation &amp; Mobility Services Group, S.L. se sídlem v Santiagu. Ta letenky prodává a plánuje linky. Právní upozornění na <a href="https://fly2galicia.com/aviso-legal/">webu Fly2Galicia</a> to říká přímo: prodej letu pod touto značkou neznamená, že firma je držitelem AOC.</p>
        <p>Letadlo, posádku, údržbu a pojištění dodává rumunský dopravce FLYYO v režimu takzvaného wet lease. Podle španělského oborového webu <a href="https://www.hosteltur.com/178170_la-rumana-flyyo-operara-los-vuelos-de-fly2galicia-en-regimen-de-wet-lease.html">Hosteltur</a> FLYYO vznikl v roce 2021, létá od dubna 2024 a používá Airbusy A320 se 180 sedadly. Podobně to funguje i jinde, velcí dopravci si v létě běžně pronajímají letadla i s posádkou.</p>
        <figure className={styles.photo}><Image src="/blog/fly2galicia-flyyo-a320.webp" alt="Bílý Airbus A320 s registrací YR-ADC dopravce FLYYO při přistání" width={1600} height={1067} sizes={sizes} /><figcaption>Airbus A320 YR-ADC dopravce FLYYO, 8. května 2026 v Berlíně. Které letadlo bude létat do Prahy, zatím není známo. Foto: <a href="https://commons.wikimedia.org/wiki/File:Airbus_A320-214_(c-n_3256,_YR-ADC)_2026-05-08_Andre_Gerwing_Collection_ID_028659.jpg">André Gerwing, Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, zmenšeno.</figcaption></figure>
        <p>Pro vás z toho plyne hlavně tohle. Podle <a href={conditions}>přepravních podmínek</a> odpovídá za samotnou přepravu skutečný dopravce, tedy FLYYO, a platí i jeho přepravní podmínky. Reklamace týkající se rezervace řeší Fly2Galicia. Práva podle evropského nařízení 261/2004 při zpoždění nebo zrušení letu podmínky výslovně neomezují. Fly2Galicia si v nich ale vyhrazuje možnost změnit letadlo, a pokud je to nezbytné a právně možné, i skutečného dopravce.</p>

        <h2>Na co si dát pozor u nového dopravce?</h2>
        <p>Firma za značkou Fly2Galicia vznikla v lednu 2026. Podle galicijského serveru <a href="https://www.galiciapress.es/articulo/empresas/2026-09-02/5999611-hay-realmente-detras-polemica-fly2galicia">Galiciapress</a> má základní kapitál 1 euro a je zapsaná hlavně jako cestovní agentura. To je legální, jenže to málo říká o finanční síle. Zatím nezveřejnila žádnou účetní závěrku a podle <a href="https://aviaciondigital.com/fly2galicia-no-es-aerolinea-aoc-propio/">Aviación Digital</a> má celý začátek stát na jediném letadle. Ve Španělsku se o projektu vede veřejná debata, předseda galicijské vlády se od něj podle <a href="https://www.elcorreogallego.es/santiago/2026/09/02/rueda-fly2galicia-raxoi-aeropuerto-santiago-133865812.html">El Correo Gallego</a> distancoval.</p>
        <p>Nic z toho neznamená, že lety nepoletí. Až do prvního odletu ale nikdo neví, jak spolehlivý provoz bude. Pokud hodně záleží na přesném termínu, například kvůli svatbě nebo navazujícímu spoji, počítejte s rezervou. Letenku zaplaťte platební kartou. Pokud by let neproběhl a peníze se nevrátily, můžete platbu reklamovat u své banky. A nekupujte zbytečně daleko dopředu.</p>

        <h2>Kolik stojí letenka a co obsahuje?</h2>
        <p>Cestujlevne.com v srpnu našel zpáteční letenku za 100,50 eur, přibližně 2 432 Kč, na lety od ledna do léta 2027. Honzovy letenky psaly o 2 489 Kč. Zpráva Zdopravy.cz uvádí ceny od 49 eur za jednu cestu. Ceny jsme v rezervačním systému sami neověřili, protože se nám ho nepodařilo vyplnit. Nejnižší cena platí pro tarif Economy Go a vybrané termíny.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Tarif</th><th scope="col">Zavazadla</th><th scope="col">Sedadlo a změny</th></tr></thead>
            <tbody>
              <tr><td>Economy Go</td><td>osobní věc + kufr do kabiny 8 kg, místo pro kufr nad hlavou není zaručené</td><td>sedadlo náhodně, změna 60 € + rozdíl ceny</td></tr>
              <tr><td>Economy Plus</td><td>totéž, místo pro kufr v kabině zaručené</td><td>sedadlo v řadách 15–30, změna 60 € + rozdíl ceny</td></tr>
              <tr><td>Economy Premium</td><td>navíc 1 odbavené zavazadlo 20 kg</td><td>sedadlo XL nebo u nouzového východu, první změna bez poplatku</td></tr>
              <tr><td>Business Premium</td><td>navíc 2 odbavená zavazadla po 20 kg</td><td>volné prostřední sedadlo, jídlo, salonek, zrušení za voucher</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={faq}>časté otázky Fly2Galicia</a>, stav k 22. 9. 2026. Kufr do kabiny smí mít nejvýš 55 × 40 × 20 cm, osobní věc 40 × 30 × 20 cm.</p>
        <p>Economy Go, Plus ani Premium nejsou vratné. Změnit let lze nejpozději 24 hodin před odletem a poplatek se platí za každého cestujícího a každý úsek zvlášť. Když je nový let levnější, rozdíl vám nevrátí. Změna jména stojí 70 eur a jde nejpozději 7 dní před odletem. Na palubě dostanete v ekonomické třídě kávu nebo čaj a malé občerstvení zdarma (<a href={faq}>Fly2Galicia</a>).</p>
        <p>Pokud jedete na Svatojakubskou cestu, batoh do kabiny musí splnit rozměr 55 × 40 × 20 cm a 8 kilogramů, což u většího trekového batohu nevyjde. Trekové hole nebo nůž si před cestou ověřte v pravidlech bezpečnostní kontroly. Pokud do kabiny nesmějí, budete potřebovat odbavené zavazadlo.</p>

        <h2>Jak se z letiště dostanete do Santiaga?</h2>
        <p>Letiště Santiago–Rosalía de Castro, místně Lavacolla, leží asi 12 kilometrů od historického centra. Po příletu ve 21:50 máte dvě hlavní možnosti (<a href="https://santiago.es/aeropuerto">město Santiago de Compostela</a>, <a href="https://www.aena.es/en/santiago-rosalia-de-castro/getting-there/bus.html">Aena</a>):</p>
        <ul>
          <li><strong>Autobus 6A</strong> jezdí zhruba do půl jedné v noci, v pracovní dny jednou za 20–30 minut, o víkendu jednou za 30–60 minut. Stojí 1 euro v hotovosti u řidiče, cesta trvá 25–50 minut a končí na náměstí Praza de Galicia na kraji starého města. Po cestě staví i u vlakového a autobusového nádraží (Estación Intermodal).</li>
          <li><strong>Taxi</strong> stojí asi 20–25 eur a do centra jede 15–20 minut. Stanoviště je u východu z terminálu.</li>
        </ul>
        <p>Při zpoždění večerního letu už nemusíte stihnout poslední autobus. Město zvažuje zvláštní letištní jízdné 6 eur, zatím ale platí 1 euro. Přímo z letiště jezdí také meziměstské autobusy Monbus do A Coruñi a Luga, s mezizastávkami mimo jiné v Arzúe a Palas de Rei.</p>

        <h2>Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Je Fly2Galicia nízkonákladová letecká společnost?</h3>
          <p>Prodává letenky podobně jako nízkonákladoví dopravci, se základním tarifem jen s příručním zavazadlem a připlácením za služby. Sama ale neletí. Lety provádí rumunský FLYYO na základě pronájmu letadla s posádkou.</p>
          <h3>Vztahuje se na lety nařízení EU 261/2004?</h3>
          <p>Ano, oba směry odlétají z letiště v EU. Přepravní podmínky Fly2Galicia uvádějí, že práva podle nařízení neomezují. Za samotnou přepravu odpovídá skutečný dopravce FLYYO.</p>
          <h3>Létá se do Santiaga přímo i z Brna nebo Vídně?</h3>
          <p>Ne. Síť Fly2Galicia obsahuje z Česka jen Prahu, Vídeň v ní také není. V Evropě dál létá do Mnichova, Bruselu, Milána a Benátek, ve Španělsku do Alicante, Granady a Zaragozy.</p>
          <h3>Může se let ještě zrušit nebo posunout?</h3>
          <p>U každého nového spoje se může změnit letový řád. U Fly2Galicia je nejistota o něco větší, protože firma zatím nic neprovozovala a celý začátek stojí na jednom letadle. Sledujte e-maily k rezervaci a den před odletem si let zkontrolujte.</p>
        </div>

        <p>V den odletu uvidíte letadlo z Prahy na radaru FlyQueens. Jak najít konkrétní spoj, popisuje návod <Link href="/blog/jak-sledovat-let-podle-cisla">jak sledovat let podle čísla</Link>.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha', eyebrow: 'Odlet z Česka', title: 'Letiště Praha', description: 'Přílety, odlety, doprava na letiště a parkování.' },
          { href: '/letiste/praha/ubytovani', eyebrow: 'Před odletem', title: 'Ubytování u letiště Praha', description: 'Kde přespat u terminálů a jak se dostat na odlet.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Fly2Galicia: destinace Praha', href: 'https://fly2galicia.com/destino/praga/' },
          { label: 'Fly2Galicia: časté otázky (tarify, zavazadla, změny)', href: faq },
          { label: 'Fly2Galicia: všeobecné přepravní podmínky, srpen 2026', href: conditions },
          { label: 'Fly2Galicia: právní upozornění', href: 'https://fly2galicia.com/aviso-legal/' },
          { label: 'Letiště Praha na síti X: zahájení linky 2. 12.', href: 'https://x.com/PragueAirport/status/2089736858250932398' },
          { label: 'Cestujlevne.com: časy letů a cena, 18. 8. 2026', href: 'https://www.cestujlevne.com/akcni-letenky/santiago-de-compostela-nove-primo-z-prahy-s-fly2galicia' },
          { label: 'Zdopravy.cz: Praha získá spojení se Santiagem, 19. 8. 2026', href: 'https://zdopravy.cz/primou-linkou-do-cile-poutniku-praha-ziska-spojeni-se-santiagem-de-compostela-294466/' },
          { label: 'Hosteltur: FLYYO bude létat pro Fly2Galicia, 20. 8. 2026', href: 'https://www.hosteltur.com/178170_la-rumana-flyyo-operara-los-vuelos-de-fly2galicia-en-regimen-de-wet-lease.html' },
          { label: 'Aviación Digital: Fly2Galicia nemá vlastní AOC, 19. 8. 2026', href: 'https://aviaciondigital.com/fly2galicia-no-es-aerolinea-aoc-propio/' },
          { label: 'Galiciapress: Co stojí za sporem o Fly2Galicia, 2. 9. 2026', href: 'https://www.galiciapress.es/articulo/empresas/2026-09-02/5999611-hay-realmente-detras-polemica-fly2galicia' },
          { label: 'El Correo Gallego: Rueda se distancuje od Fly2Galicia, 2. 9. 2026', href: 'https://www.elcorreogallego.es/santiago/2026/09/02/rueda-fly2galicia-raxoi-aeropuerto-santiago-133865812.html' },
          { label: 'Město Santiago de Compostela: z letiště do centra', href: 'https://santiago.es/aeropuerto' },
          { label: 'Aena: autobusy z letiště Santiago', href: 'https://www.aena.es/en/santiago-rosalia-de-castro/getting-there/bus.html' },
        ]} note="Zdroje ověřeny 22. září 2026. Ceny letenek jsou převzaté ze zpravodajství ze srpna 2026, v rezervačním systému jsme je neověřili. Fotografie pocházejí z Wikimedia Commons pod licencí CC BY-SA 4.0." />
      </article>
    </main>
  )
}
