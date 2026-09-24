import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from '@/components/Article/Article.module.css'
import { ArticleHeader } from '@/components/Article/ArticleHeader'
import { ArticleContents } from '@/components/UI/ArticleContents'

const post = POSTS.find((entry) => entry.slug === 'nejdelsi-let-na-svete')!
const title = 'Nejdelší let na světě: trasa, délka letu a rekordy'
const heading = 'Nejdelší let na světě: odkud kam vede a kolik hodin trvá?'
const description = 'Nejdelší pravidelný let na světě vede ze Singapuru do New Yorku: 15 348 km a přes 18 hodin. Letadlo, kabina, deset nejdelších linek a nejdelší let z Prahy.'
const url = 'https://www.flyqueens.cz/blog/nejdelsi-let-na-svete'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const sia = 'https://www.singaporeair.com/en_UK/us/flying-withus/our-story/our-fleet/airbus-a350-900/'
const siaSeatMap = 'https://www.singaporeair.com/content/dam/sia/web-assets/pdfs/flying-withus/our-story/A350-900-ULR.pdf'
const sia2018 = 'https://www.singaporeair.com/en_UK/sg/corporate/newsroom/press-release/2018/April-June/ne2018-180530/'
const siaBookCook = 'https://www.singaporeair.com/en_UK/us/flying-withus/dining/book-the-cook/'
const airbusUlr = 'https://www.airbus.com/en/newsroom/press-releases/2018-09-first-ultra-long-range-a350-xwb-delivered-to-singapore-airlines'
const gcmap = 'http://www.gcmap.com/dist?P=SIN-JFK,SIN-EWR,PER-LHR,MEL-DFW,AKL-JFK,DXB-AKL,SZX-MEX,SIN-LAX,DFW-SYD,SIN-SFO,DOH-AKL,MNL-JFK,IST-SYD,PRG-TPE,PRG-ICN&DU=km'
const sia2020 = 'https://www.singaporeair.com/en_UK/us/corporate/newsroom/press-release/2020/October-December/ne1720-201020/'
const pal = 'https://www.airportia.com/flights/pr126/manila/new-york/'
const flightAware = 'https://www.flightaware.com/live/flight/SIA23/history'
const qantasA350 = 'https://www.qantas.com/en-au/onboard/fleet/a350'
const qantasToulouse = 'https://www.qantasnewsroom.com.au/media-releases/project-sunrise-route-announcement-toulouse'
const qantasCabin = 'https://www.qantasnewsroom.com.au/media-releases/project-sunrise-onboard-experience-june-2026'
const qantasNetwork = 'https://www.qantasnewsroom.com.au/qantas-responds/qantas-international-network-update-march-2026'
const airNz = 'https://www.airnewzealand.com/new-york-to-new-zealand'
const simpleFlying = 'https://simpleflying.com/up-to-19-hour-nonstop-flights-the-worlds-10-new-longest-ultra-long-haul-routes-in-2026/'
const turkish = 'https://simpleflying.com/exclusive-turkish-airlines-target-nonstop-istanbul-sydney-airbus-a350-1000s-2027/'
const starlux = 'https://latestnews.starlux-airlines.com/en-Global/about-us/travel-advisories/advisories/latest-news/fly_to_PRG'
const prgStarlux = 'https://www.prg.aero/praha-se-stava-prvni-evropskou-destinaci-starlux-airlines-nova-prima-dalkova-linka-spoji-prahu-s'
const commons = 'https://commons.wikimedia.org/wiki/File:'
const nhs = 'https://www.nhs.uk/conditions/jet-lag/'
const cdc = 'https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html'

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
      '@type': 'Article', headline: heading, description, datePublished: post.date, dateModified: post.updatedAt,
      author: AUTHOR_JSON_LD,
      publisher: PUBLISHER_JSON_LD,
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      image: [
        'https://www.flyqueens.cz/blog/nejdelsi-let-etihad-787-praha.webp',
        'https://www.flyqueens.cz/blog/nejdelsi-let-singapore-a350-ulr-jfk.webp',
        'https://www.flyqueens.cz/blog/nejdelsi-let-qantas-a350-1000ulr.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Nejdelší let na světě', item: url },
      ],
    },
  ],
}

export default function NejdelsiLetArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Nejdelší let na světě"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {heading}
        </ArticleHeader>
        <p className={styles.lead}>Nejdelší pravidelný let na světě vede ze Singapuru do New Yorku na letiště JFK. Létá ho denně Singapore Airlines pod čísly SQ24 a SQ23. Nejkratší trasa mezi letišti měří 15 348 km. Podle letového řádu platného do 24. října 2026 trvá let do New Yorku 18 hodin 40 minut a zpátky do Singapuru 19 hodin 15 minut. Létá na něm Airbus A350-900ULR, který nemá ekonomickou třídu, jen business a prémiovou ekonomickou. Níž najdete, jak se rekordy počítají, deset nejdelších linek současnosti, ohlášené budoucí rekordy a nejdelší přímý let z Prahy.</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Nejdelší let na světě</th></tr></thead>
            <tbody>
              <tr><td>Trasa</td><td>Singapur Changi (SIN) ↔ New York JFK (JFK)</td></tr>
              <tr><td>Aerolinka a lety</td><td>Singapore Airlines, SQ24 do New Yorku, SQ23 do Singapuru, denně</td></tr>
              <tr><td>Vzdálenost</td><td>15 348 km po nejkratší trase</td></tr>
              <tr><td>Plánovaný čas</td><td>18 h 40 min do New Yorku, 19 h 15 min do Singapuru</td></tr>
              <tr><td>Letadlo</td><td>Airbus A350-900ULR, 161 míst: 67 business, 94 prémiová ekonomická</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: <a href={sia}>Singapore Airlines, letový řád a flotila A350-900</a>; <a href={siaSeatMap}>plánek sedadel A350-900ULR</a>; vzdálenost podle online kalkulačky <a href={gcmap}>Great Circle Mapper</a>. Stav k 24. 9. 2026, časy platí do 24. 10. 2026.</p>

        <figure className={styles.photo}><Image src="/blog/nejdelsi-let-etihad-787-praha.webp" alt="Boeing 787 Etihad u stání na Letišti Praha, v pozadí Airbus A350 China Airlines" width={1600} height={738} sizes={sizes} preload /><figcaption>Boeing 787 Etihad a v pozadí Airbus A350 China Airlines na Letišti Praha, fotografováno při exkurzi v říjnu 2025. Foto: Pavla Zimmermannová.</figcaption></figure>

        <ArticleContents items={[
          { id: 'ktery-let-je-nejdelsi', label: 'Který let je nejdelší na světě?' },
          { id: 'trasa', label: 'Trasa nejdelšího letu' },
          { id: 'jak-dlouho-trva', label: 'Jak dlouho nejdelší let trvá' },
          { id: 'letadlo', label: 'Jakým letadlem se létá' },
          { id: 'cena-letenky', label: 'Kolik stojí letenka' },
          { id: 'jak-vypada-let', label: 'Jak vypadá tak dlouhý let' },
          { id: 'dalsi-nejdelsi-lety', label: 'Deset nejdelších letů světa' },
          { id: 'budouci-rekordy', label: 'Budoucí rekordy: Sydney–Londýn a Sydney–New York' },
          { id: 'nejdelsi-let-z-prahy', label: 'Nejdelší přímý let z Prahy' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="ktery-let-je-nejdelsi">Který let je nejdelší na světě?</h2>
        <p>Záleží na tom, co měříte. Porovnáváme jen pravidelné osobní lety bez mezipřistání, na které si může koupit letenku kdokoli. Nepočítáme zkušební ani rekordní lety bez cestujících, vojenské a charterové lety ani přelety prázdných letadel. Stranou necháváme i linky se zastávkou po cestě, třeba na doplnění paliva.</p>
        <p>Vzdálenost uvádíme po ortodromě, tedy po nejkratší čáře mezi letišti po povrchu Země. Skutečně nalétaná trasa je delší, protože letadla sledují letové tratě, obletují uzavřené vzdušné prostory a hledají příznivý vítr. Singapore Airlines například u linky do Newarku při jejím obnovení v roce 2018 uváděla délku trasy asi 16 700 km (<a href={sia2018}>tisková zpráva SIA</a>). Ortodroma přitom měří 15 344 km.</p>
        <p>U času je to podobné. Letový řád uvádí takzvaný blokový čas (anglicky block time): od chvíle, kdy letadlo odjede od stání, do chvíle, kdy na cílovém stání zastaví, tedy včetně pojíždění a časové rezervy. Samotný let ve vzduchu bývá kratší. A protože každou linku ovlivňuje jiný vítr a jiná trať, nejdelší let podle vzdálenosti nemusí být nejdelší podle času.</p>

        <h2 id="trasa">Trasa nejdelšího letu</h2>
        <p>Let SQ24 startuje ze singapurského letiště Changi (SIN) a přistává na letišti John F. Kennedy v New Yorku (JFK). Třípísmenné kódy letišť přiděluje Mezinárodní asociace letecké dopravy IATA. Zpáteční let má číslo SQ23. Obě linky létají denně v letním i zimním letovém řádu (<a href={sia}>letový řád Singapore Airlines</a>) a do JFK začaly létat v listopadu 2020 (<a href={sia2020}>tisková zpráva SIA</a>).</p>
        <p>Ortodroma mezi letišti měří 15 348 km (<a href={gcmap}>Great Circle Mapper</a>). Těsně za ní je sesterská linka stejné aerolinky ze Singapuru do Newarku (SQ22 a SQ21) s 15 344 km. Newark leží v New Jersey a obsluhuje New York stejně jako JFK. Obě trasy se liší pouhými čtyřmi kilometry.</p>

        <h2 id="jak-dlouho-trva">Jak dlouho nejdelší let trvá</h2>
        <p>Podle letového řádu platného do 24. října 2026 odlétá SQ24 ze Singapuru ve 12:10 a do New Yorku přiletí v 18:50 místního času. Trvá tedy 18 hodin 40 minut. Zpáteční SQ23 odlétá z JFK ve 22:15 a do Singapuru dorazí v 5:30 o dva dny později, po 19 hodinách a 15 minutách. Od 25. října se oba časy zkracují na 18 hodin 15 minut do New Yorku a 18 hodin 55 minut zpět (<a href={sia}>letový řád SIA</a>).</p>
        <p>U Singapore Airlines bývá skutečnost kratší než plán. Podle záznamů služby pro sledování letů <a href={flightAware}>FlightAware</a> trvaly lety SQ23 a SQ24 od 16. do 23. září 2026 zhruba 17 hodin 15 minut až 18 hodin 10 minut. Letový řád si počítá s pojížděním a rezervou na horší vítr nebo čekání na přistání.</p>
        <p>Každý směr trvá jinak dlouho hlavně kvůli silnému větru ve výšce, kde letadla létají, a zvolené trati. Vítr se mění i se sezónou, a aerolinka proto letový řád pro léto a zimu upravuje.</p>
        <div className={styles.tip}>
          <p><strong>Od října je časově nejdelší jiný let.</strong> Linka SQ21 z Newarku do Singapuru je sice o 4 km kratší, ale od 2. do 25. října 2026 má v letovém řádu 19 hodin 30 minut a v zimě 19 hodin 10 minut. SQ23 z JFK má v zimě 18 hodin 55 minut. Od 2. října 2026 je tak časově nejdelším letem na světě let z Newarku, do té doby let z JFK (<a href={sia}>letový řád SIA</a>).</p>
        </div>

        <figure className={styles.photo}><Image src="/blog/nejdelsi-let-singapore-a350-ulr-jfk.webp" alt="Airbus A350-900ULR Singapore Airlines s registrací 9V-SGG na letišti JFK v New Yorku" width={1600} height={902} sizes={sizes} /><figcaption>Airbus A350-900ULR Singapore Airlines (9V-SGG) na letišti JFK jako let SQ24 ze Singapuru, srpen 2021. Foto: <a href={`${commons}Singapore_Airlines_A350-941,_9V-SGG,_MSN_244_(12_2018),_as_SQ_24_Singapore_(SIN)_-_New_York_(JFK),_Flight_time_18_04_(51363885626).jpg`}>Charles from Port Chester, Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>, zmenšeno.</figcaption></figure>

        <h2 id="letadlo">Jakým letadlem se létá</h2>
        <p>Singapore Airlines nasazuje na lety do New Yorku Airbus A350-900ULR. Zkratka ULR znamená Ultra Long Range: jde o verzi pro velmi dlouhé lety. Oproti běžnému A350-900 unese bez přídavných nádrží o 24 000 litrů paliva víc, celkem 165 000 litrů. Airbus u ní uvádí dolet až 9 700 námořních mil, tedy přes 17 900 km, a přes 20 hodin letu bez přistání (<a href={airbusUlr}>Airbus, 2018</a>).</p>
        <p>Kabina má 161 míst: 67 v business třídě a 94 v prémiové ekonomické. Ekonomická třída tu vůbec není (<a href={siaSeatMap}>plánek sedadel SIA</a>). Pokud chcete letět právě touto linkou, nejlevnější je prémiová ekonomická třída.</p>

        <h2 id="cena-letenky">Kolik stojí letenka</h2>
        <p>Ověřenou cenu pro konkrétní termín vám neuvedeme. Singapore Airlines mění ceny podle termínu, obsazenosti a tarifu a spolehlivé číslo dá jen rezervace na konkrétní den. Částky, které kolují v médiích, s dnešními cenami nemusí souviset.</p>
        <p>Při porovnávání mějte na paměti dvě věci. Na lince SIN–JFK nejsou ekonomické letenky, nejlevnější začínají v prémiové ekonomické třídě. A cenu srovnávejte vždy pro stejný den, stejnou třídu a stejné podmínky tarifu, tedy zavazadla, změny a storno. Nejjistější je <a href="https://www.singaporeair.com">web Singapore Airlines</a>.</p>

        <h2 id="jak-vypada-let">Jak vypadá tak dlouhý let</h2>
        <p>Na palubě jsme nebyli, takže vycházíme z toho, co uvádějí aerolinka a zdravotnické instituce. Singapore Airlines u A350-900ULR při jeho představení v roce 2018 zdůrazňovala vyšší strop, větší okna, osvětlení navržené proti jet lagu a lepší kvalitu vzduchu díky upravené kabinové výšce a vlhkosti (<a href={sia2018}>tisková zpráva SIA</a>). V business i prémiové ekonomické třídě si hlavní chod můžete předem vybrat přes službu Book the Cook, a to od šesti týdnů do 24 hodin před odletem. Služba platí i pro lety z JFK a Newarku (<a href={siaBookCook}>Book the Cook</a>).</p>
        <p>Proti jet lagu, tedy únavě a rozhozenému spánku po přeletu několika časových pásem, doporučuje britská zdravotní služba NHS: před cestou se vyspat, na palubě pít dost vody, protahovat se a chodit, omezit kofein a alkohol. Po příletu co nejrychleji přejít na místní čas a přes den chodit na denní světlo (<a href={nhs}>NHS, jet lag</a>). Americké Centrum pro kontrolu a prevenci nemocí (CDC) ve své příručce pro lékaře dodává, že tělo se přizpůsobuje zhruba o hodinu za den při cestě na východ a o hodinu a půl při cestě na západ. Spánek podle něj můžete posouvat už dva až tři dny před odletem (<a href={cdc}>CDC Yellow Book</a>). Léky a melatonin konzultujte s lékařem. NHS melatonin na jet lag nedoporučuje, CDC ho uvádí jako možnost.</p>

        <h2 id="dalsi-nejdelsi-lety">Deset nejdelších letů světa</h2>
        <p>Přehled zahrnuje jen linky, které v září 2026 létají bez mezipřistání. Některé mají nonstop jen jeden směr a zpátky letí se zastávkou.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">#</th><th scope="col">Trasa</th><th scope="col">Aerolinka</th><th scope="col">Vzdálenost</th><th scope="col">Plánovaný čas</th><th scope="col">Letadlo</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Singapur ↔ New York JFK</td><td>Singapore Airlines</td><td>15 348 km</td><td>18 h 40 min / 19 h 15 min</td><td>A350-900ULR</td></tr>
              <tr><td>2</td><td>Singapur ↔ Newark</td><td>Singapore Airlines</td><td>15 344 km</td><td>18 h 25 min / 19 h 10 min</td><td>A350-900ULR</td></tr>
              <tr><td>3</td><td>Londýn → Perth (jen tímto směrem)</td><td>Qantas</td><td>14 499 km</td><td>asi 16 h 50 min*</td><td>Boeing 787-9</td></tr>
              <tr><td>4</td><td>Melbourne ↔ Dallas</td><td>Qantas</td><td>14 472 km</td><td>asi 17 h 45 min z Dallasu*</td><td>Boeing 787-9</td></tr>
              <tr><td>5</td><td>Auckland ↔ New York JFK</td><td>Air New Zealand</td><td>14 207 km</td><td>16 h 15 min / 17 h 35 min</td><td>Boeing 787-9</td></tr>
              <tr><td>6</td><td>Dubaj ↔ Auckland</td><td>Emirates</td><td>14 200 km</td><td>asi 15 h 50 min / 17 h 25 min*</td><td>Airbus A380</td></tr>
              <tr><td>7</td><td>Šen-čen → Ciudad de México (jen tímto směrem)</td><td>China Southern</td><td>14 147 km</td><td>neověřeno</td><td>Airbus A350-900</td></tr>
              <tr><td>8</td><td>Singapur ↔ Los Angeles</td><td>Singapore Airlines</td><td>14 113 km</td><td>16 h 05 min / 17 h 10 min</td><td>Airbus A350-900</td></tr>
              <tr><td>9</td><td>Sydney ↔ Dallas</td><td>Qantas</td><td>13 804 km</td><td>neověřeno</td><td>Airbus A380</td></tr>
              <tr><td>10</td><td>Manila ↔ New York JFK</td><td>Philippine Airlines</td><td>13 712 km</td><td>asi 16 h 10 min z Manily**</td><td>Airbus A350</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Vzdálenost po ortodromě podle <a href={gcmap}>Great Circle Mapperu</a>. Časy u Singapore Airlines a Air New Zealand pocházejí z letových řádů aerolinek (<a href={sia}>SIA</a>, <a href={airNz}>Air NZ</a>). U položek s hvězdičkou je uvádí <a href={simpleFlying}>Simple Flying</a> podle dat společnosti OAG, která zpracovává letové řády (únor a duben 2026); aerolinky je nepotvrdily. Dvě hvězdičky: jen podle databází letových řádů (<a href={pal}>Airportia</a>), u Philippine Airlines neověřeno. U China Southern a Qantas Sydney–Dallas se nám plánovaný čas ověřit nepodařilo. Provoz v září 2026 jsme ověřili u aerolinek, u Emirates, China Southern, Qantas Sydney–Dallas a Philippine Airlines jen podle záznamů FlightAware a databází letových řádů. Stav k 24. 9. 2026.</p>
        <p>Proč v žebříčku chybí let z Perthu do Londýna? Qantas ho od 4. března 2026 posílá přes Singapur a bez mezipřistání zůstal jen směr z Londýna (<a href={qantasNetwork}>Qantas, březen 2026</a>). Qatar Airways podle záznamů FlightAware létá v září 2026 z Dauhá do Aucklandu se zastávkou v Adelaide. Bez mezipřistání by tato linka s 14 535 km patřila na třetí místo. Starší žebříčky obě linky uvádějí, v září 2026 ale nonstop nelétají. Úsek z Aucklandu do New Yorku létá kromě Air New Zealand i Qantas, jen jako pokračování letu ze Sydney, proto ho v tabulce neuvádíme.</p>
        <p>Chcete se podívat, kde je některé z těchto letadel právě teď? Stačí zadat číslo letu do <Link href="/radar">radaru FlyQueens</Link>. Jak na to, popisuje návod <Link href="/blog/jak-sledovat-let-podle-cisla">Jak sledovat let podle čísla</Link>.</p>

        <h2 id="budouci-rekordy">Budoucí rekordy: Sydney–Londýn a Sydney–New York</h2>
        <p>Rekord Singapore Airlines má překonat australský Qantas s projektem, kterému říká Project Sunrise. Zatím jde jen o plán a letenky se neprodávají. Qantas uvádí:</p>
        <ul>
          <li><strong>Sydney–Londýn</strong> nonstop denně od října 2027, letenky v prodeji od února 2027 (<a href={qantasToulouse}>Qantas Newsroom</a>, <a href={qantasA350}>qantas.com</a>).</li>
          <li><strong>Sydney–New York</strong> nonstop od poloviny roku 2028, letenky od srpna 2027 (<a href={qantasA350}>qantas.com</a>).</li>
          <li><strong>Letadla:</strong> 12 letadel Airbus A350-1000ULR s přídavnou nádrží na 20 000 litrů, s doletem přes 16 000 km a až 22 hodinami letu bez přistání. První má přijít v dubnu 2027 (<a href={qantasToulouse}>Qantas Newsroom</a>, <a href={qantasA350}>qantas.com</a>).</li>
          <li><strong>Kabina:</strong> 238 míst ve čtyřech třídách a mezi prémiovou ekonomickou a ekonomickou třídou samostatný prostor, který Qantas nazývá Wellbeing Zone (<a href={qantasCabin}>Qantas Newsroom, červen 2026</a>).</li>
        </ul>
        <figure className={styles.photo}><Image src="/blog/nejdelsi-let-qantas-a350-1000ulr.webp" alt="Airbus A350-1000ULR s nápisy First A350-1000ULR for Qantas a Project Sunrise na letišti Melbourne" width={1600} height={1068} sizes={sizes} /><figcaption>První A350-1000ULR pro Qantas, zatím s registrací Airbusu F-WULR, na letišti Melbourne 24. července 2026. Foto: <a href={`${commons}Airbus_Industrie_F-WULR_Airbus_A350-1041_Melbourne_International_Airport_(MEL_YMML)_(55483824952).jpg`}>Mitchul Hope, Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, zmenšeno.</figcaption></figure>
        <p>Sám Qantas upozorňuje, že dodávky letadel, prodej i start linek závisí na certifikaci a schválení úřadů. Starší české články uváděly start v roce 2026, to už neplatí. Velmi dlouhou linku chystá i Turkish Airlines: Istanbul–Sydney bez mezipřistání do konce roku 2027. S 14 967 km by ale rekord nepřekonala. Zatím o ní víme jen z vyjádření předsedy představenstva pro <a href={turkish}>Simple Flying</a>, oficiálně ji aerolinka neohlásila.</p>

        <h2 id="nejdelsi-let-z-prahy">Nejdelší přímý let z Prahy</h2>
        <p>Nejdál se z Prahy pravidelně přímo létá do Tchaj-peje (TPE) na Tchaj-wanu, 9 029 km po ortodromě (<a href={gcmap}>Great Circle Mapper</a>). Linku provozují dvě tchajwanské aerolinky: China Airlines a od 1. srpna 2026 i STARLUX Airlines (<a href={prgStarlux}>Letiště Praha</a>).</p>
        <p>STARLUX létá z Prahy jako JX102 a zpět jako JX101. V září trvá let z Prahy do Tchaj-peje podle letového řádu 12 hodin 50 minut a zpátky 13 hodin 40 minut. Od 1. října 2026 přibude čtvrtý let v týdnu, let z Prahy se v plánu zkrátí na 12 hodin 25 minut a let z Tchaj-peje prodlouží na 14 hodin 15 minut (<a href={starlux}>STARLUX</a>). Na rozdíl od Singapore Airlines trvaly zářijové lety STARLUX podle FlightAware déle, než uvádí plán: v obou směrech 13 hodin 50 minut až 14 hodin 30 minut. Víc o lince a letadlech najdete v článku <Link href="/blog/starlux-airlines-praha">STARLUX Airlines v Praze</Link>. U China Airlines se nám aktuální letový řád z webu aerolinky ověřit nepodařilo.</p>
        <p>Pro srovnání: do Soulu (ICN), kam z Prahy létá Korean Air, je to 8 258 km. Charterové lety, třeba do Mexika, do srovnání nepočítáme, protože nejde o pravidelnou linku. Aktuální odlety a přílety najdete na stránce <Link href="/letiste/praha">Letiště Praha</Link>.</p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Jaký je nejdelší let na světě?</h3>
          <p>Nejdelší pravidelný let na světě je Singapur–New York JFK se Singapore Airlines (SQ24 a zpět SQ23). Nejkratší trasa mezi letišti měří 15 348 km. Stav k září 2026.</p>
          <h3>Kolik hodin trvá nejdelší let na světě?</h3>
          <p>Podle letového řádu platného do 24. října 2026 trvá let ze Singapuru do New Yorku 18 hodin 40 minut a zpět 19 hodin 15 minut. Skutečné lety v září 2026 trvaly zhruba 17 hodin 15 minut až 18 hodin 10 minut. Od 2. října má nejdelší plánovaný čas let SQ21 z Newarku do Singapuru, 19 hodin 30 minut.</p>
          <h3>Kolik kilometrů má nejdelší let?</h3>
          <p>Po ortodromě, tedy nejkratší trase po povrchu Země, 15 348 km. Skutečně nalétaná vzdálenost je delší, protože letadlo sleduje letové tratě a vítr.</p>
          <h3>Jakým letadlem se nejdelší let létá?</h3>
          <p>Airbusem A350-900ULR, speciální verzí pro velmi dlouhé lety. Má 161 míst v business a prémiové ekonomické třídě, ekonomická třída na palubě není.</p>
          <h3>Jaký je nejdelší let bez mezipřistání?</h3>
          <p>Stejný let, Singapur–New York JFK. Všechny lety v našem žebříčku jsou bez mezipřistání. Linky se zastávkou do srovnání nepočítáme, i když cestující při ní nevystupují.</p>
          <h3>Jaký je nejdelší let z Prahy?</h3>
          <p>Praha–Tchaj-pej, 9 029 km. Létají ho China Airlines a STARLUX Airlines. Se STARLUX trvá podle zářijového letového řádu 12 hodin 50 minut z Prahy a 13 hodin 40 minut zpět.</p>
        </div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/blog/starlux-airlines-praha', eyebrow: 'Nová linka · Tchaj-wan', title: 'STARLUX Airlines v Praze', description: 'Přímá linka do Tchaj-peje, letové časy a zlatý A350-1000.' },
          { href: '/blog/airbus-a380-praha-emirates', eyebrow: 'Airbus A380', title: 'Airbus A380 se má vrátit do Prahy', description: 'Emirates má od 1. října nasadit A380 na linku Praha–Dubaj.' },
          { href: '/blog/jak-sledovat-let-podle-cisla', eyebrow: 'Návod', title: 'Jak sledovat let podle čísla', description: 'Číslo letu, volací znak a registrace: co zadat do mapy.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Singapore Airlines: flotila a letový řád A350-900', href: sia },
          { label: 'Singapore Airlines: plánek sedadel A350-900ULR (PDF)', href: siaSeatMap },
          { label: 'Singapore Airlines: tisková zpráva 30. 5. 2018 (Newark, A350-900ULR)', href: sia2018 },
          { label: 'Singapore Airlines: tisková zpráva 20. 10. 2020 (lety do JFK)', href: sia2020 },
          { label: 'Singapore Airlines: Book the Cook', href: siaBookCook },
          { label: 'Airbus: první A350-900ULR pro Singapore Airlines, 21. 9. 2018', href: airbusUlr },
          { label: 'Great Circle Mapper: vzdálenosti po ortodromě', href: gcmap },
          { label: 'FlightAware: historie letů SQ23', href: flightAware },
          { label: 'FlightAware: historie letů SQ24', href: 'https://www.flightaware.com/live/flight/SIA24/history' },
          { label: 'Air New Zealand: New York–Nový Zéland', href: airNz },
          { label: 'Airportia: Philippine Airlines PR126 Manila–New York', href: pal },
          { label: 'FlightAware: historie letů STARLUX JX101', href: 'https://www.flightaware.com/live/flight/SJX101/history' },
          { label: 'FlightAware: historie letů STARLUX JX102', href: 'https://www.flightaware.com/live/flight/SJX102/history' },
          { label: 'FlightAware: historie letů Qatar Airways QR914 (Dauhá–Adelaide–Auckland)', href: 'https://www.flightaware.com/live/flight/QTR914/history' },
          { label: 'Qantas: aktualizace mezinárodní sítě, březen 2026', href: qantasNetwork },
          { label: 'Qantas: A350 a Project Sunrise', href: qantasA350 },
          { label: 'Qantas Newsroom: ohlášení linky Sydney–Londýn', href: qantasToulouse },
          { label: 'Qantas Newsroom: kabina Project Sunrise, červen 2026', href: qantasCabin },
          { label: 'Simple Flying: nejdelší linky 2026 podle OAG', href: simpleFlying },
          { label: 'Simple Flying: Turkish Airlines a Istanbul–Sydney', href: turkish },
          { label: 'STARLUX Airlines: linka do Prahy', href: starlux },
          { label: 'Letiště Praha: STARLUX Airlines, 4. 2. 2026', href: prgStarlux },
          { label: 'NHS: jet lag', href: nhs },
          { label: 'CDC Yellow Book 2026: Jet Lag Disorder', href: cdc },
        ]} note="Zdroje ověřeny 24. 9. 2026. Letové řády, provoz linek i plány aerolinek se mění, údaje platí k tomuto datu. Vzdálenosti jsou po ortodromě podle Great Circle Mapperu. Plánované časy jsme spočítali z místních časů odletu a příletu v letových řádech. Skutečné délky letů pocházejí ze záznamů FlightAware. Na palubě nejdelšího letu jsme nebyli." />
      </article>
    </main>
  )
}
