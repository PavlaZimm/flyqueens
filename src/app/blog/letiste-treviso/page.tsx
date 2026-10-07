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

const post = POSTS.find((entry) => entry.slug === 'letiste-treviso')!
const title = 'Letiště Treviso: lety z Prahy, doprava a parkování 2026'
const description = 'Letiště Treviso (TSF) u Benátek: Ryanair z Prahy téměř denně, autobus do Benátek a Trevisa, ceník parkování 2026 a otevírací doba terminálu.'
const url = 'https://www.flyqueens.cz/blog/letiste-treviso'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const airport = 'https://www.trevisoairport.it/en_gb/'
const airportTransport = 'https://www.trevisoairport.it/en_gb/transport'
const airportParking = 'https://www.trevisoairport.it/en_gb/parking/info'
const airportFaq = 'https://www.trevisoairport.it/en_gb/assistance/faqs-services'
const atvo = 'https://www.atvo.it/en/services-provided/airport-services/treviso-airport-bus-express'
const atvoPdf = 'https://www.atvo.it/assets/bus_routes/351_agg.29.09.2026.pdf'
const airlink = 'https://mobilitadimarca.it/p/linee-e-orari/treviso-airbus'
const trenitalia = 'https://www.trenitalia.com/it/regionale/collegamenti-regionale/treviso-airlink.html'
const ryanairSchedule = 'https://www.ryanair.com/api/timtbl/3/schedules/PRG/TSF/years/2026/months/11'
const assaeroporti = 'https://assaeroporti.com/dati-di-traffico/'

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
      about: { '@type': 'Airport', name: 'Letiště Treviso Antonio Canova', iataCode: 'TSF', icaoCode: 'LIPH', sameAs: airport },
      image: [
        'https://www.flyqueens.cz/blog/letiste-treviso-wizz-air-odbavovaci-plocha.webp',
        'https://www.flyqueens.cz/blog/letiste-treviso-ryanair-nastup.webp',
        'https://www.flyqueens.cz/blog/letiste-treviso-ryanair-pod-strechou.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Letiště Treviso', item: url },
      ],
    },
  ],
}

export default function LetisteTrevisoArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Letiště Treviso"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Letíte z Prahy do Benátek s Ryanairem? Pak nepřistanete na benátském letišti Marco Polo, ale v Trevisu. Ryanair toto letiště prodává jako „Venice Treviso“ a z Prahy sem v říjnu až prosinci 2026 létá téměř každý den. Autobus z letiště jede do Benátek na Piazzale Roma 40 minut, na nádraží v Trevisu 10 minut.</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Hodnota</th></tr></thead>
            <tbody>
              <tr><td>Kódy</td><td>IATA TSF, ICAO LIPH</td></tr>
              <tr><td>Provozovatel</td><td>AER TRE, skupina SAVE (spravuje i letiště Benátky, Verona a Brescia)</td></tr>
              <tr><td>Z Prahy</td><td>Ryanair, téměř denně, let trvá 1 h 20 min</td></tr>
              <tr><td>Do Benátek (Piazzale Roma)</td><td>autobus ATVO, 40 minut</td></tr>
              <tr><td>Na nádraží Treviso Centrale</td><td>autobus AirLink, 10 minut, 5 €</td></tr>
              <tr><td>Terminál otevřený</td><td>od 5:00 do posledního letu</td></tr>
              <tr><td>Cestující leden–srpen 2026</td><td>2 192 520</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: <a href={airport}>web provozovatele letiště</a>, <a href={ryanairSchedule}>letový řád Ryanair</a>, <a href={atvoPdf}>jízdní řád ATVO</a>, <a href={airlink}>MOM Treviso AirLink</a>, <a href={assaeroporti}>Assaeroporti</a>. Stav k 7. 10. 2026.</p>

        <figure className={styles.photo}><Image src="/blog/letiste-treviso-wizz-air-odbavovaci-plocha.webp" alt="Airbus Wizz Air u stání na letišti Treviso, kolem vozíky na zavazadla, v pozadí další Wizz Air" width={1600} height={640} sizes={sizes} preload /><figcaption>Airbus Wizz Air při odbavení, v pozadí další letadlo Wizz Air a hangáry. Foto: vlastní archiv FlyQueens, 25. května 2026.</figcaption></figure>

        <ArticleContents items={[
          { id: 'jak-casto-leta-ryanair-z-prahy-do-treviso', label: 'Jak často létá Ryanair z Prahy do Trevisa?' },
          { id: 'jak-se-z-letiste-dostanete-do-benatek', label: 'Jak se z letiště dostanete do Benátek?' },
          { id: 'jak-se-dostanete-do-treviso', label: 'Jak se dostanete do Trevisa?' },
          { id: 'kolik-stoji-parkovani-na-letisti-treviso', label: 'Kolik stojí parkování na letišti Treviso?' },
          { id: 'kdy-otevira-terminal', label: 'Kdy otevírá terminál a co v něm najdete?' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="jak-casto-leta-ryanair-z-prahy-do-treviso">Jak často létá Ryanair z Prahy do Trevisa?</h2>
        <p>Podle letového řádu Ryanairu, staženého 7. 10. 2026, létá linka Praha–Treviso po zbytek října, v listopadu i v prosinci každý den. Jedinou výjimkou je 25. prosinec. V některých dnech, v listopadu ve více než polovině, létají dva spoje. Plánovaný let trvá 1 hodinu 20 minut, Itálie má stejný čas jako Česko.</p>
        <p>Pevný čas odletu ale nečekejte. Časy se mění den ode dne: v říjnu odlétá letadlo z Prahy podle dne mezi 6:15 a 20:10. Hlavní spoj létá pod čísly FR 1530 (Praha–Treviso) a FR 1531 (zpět), druhý let ve dnech se dvěma spoji létá jako FR 7943 a FR 7944. Například 7. října podle tabule letiště přistával FR 1530 z Prahy v 15:35 a FR 1531 do Prahy odlétal v 16:00 (<a href="https://www.trevisoairport.it/en_gb/flights/arrivals">přílety a odlety letiště Treviso</a>).</p>
        <p>Odlety z české strany najdete na stránce <Link href="/letiste/praha">Letiště Praha</Link>, konkrétní let pak sledujete podle návodu <Link href="/blog/jak-sledovat-let-podle-cisla">jak sledovat let podle čísla</Link>.</p>

        <h2 id="jak-se-z-letiste-dostanete-do-benatek">Jak se z letiště dostanete do Benátek?</h2>
        <p>Nejjednodušší je přímý autobus ATVO, linka 351 „Treviso Airport Bus Express“. Z letiště jede na nádraží Mestre 30 minut a na Piazzale Roma, konečnou na okraji historických Benátek, 40 minut (<a href={atvo}>ATVO</a>). Do centra Benátek auta ani autobusy nevjedou, z Piazzale Roma pokračujete pěšky nebo vaporettem.</p>
        <p>Jízdní řád platí od 10. 8. do 24. 10. 2026 (<a href={atvoPdf}>ATVO, linka 351, PDF</a>). Odjezdy z letiště nejsou v pravidelném taktu, navazují na přílety. Při zpoždění letu se posouvají a při zrušení letů se ruší. Podle této verze řádu platí:</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Směr</th><th scope="col">První spoj</th><th scope="col">Poslední spoj</th></tr></thead>
            <tbody>
              <tr><td>Letiště → Mestre → Piazzale Roma</td><td>7:45</td><td>podle dne 21:30–22:20</td></tr>
              <tr><td>Piazzale Roma → Mestre → letiště</td><td>4:20, na letišti 5:00</td><td>18:00 nebo 18:30, na letišti o 40 minut později</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={atvoPdf}>jízdní řád ATVO 351</a>, platný 10. 8.–24. 10. 2026. Po 24. 10. 2026 si ověřte nový řád.</p>
        <p>Na večerní odlet si dejte pozor. Poslední autobus ATVO z Benátek na letiště jede už v 18:00 nebo v 18:30. Pokud letíte později, můžete jet vlakem z Benátek do Trevisa a odtud AirLink (popsaný níže), který z nádraží jezdí do 22:23. Trenitalia prodává vlak i AirLink na jedné jízdence, za autobusovou část připlatíte 5 € (<a href={trenitalia}>Trenitalia, Treviso AirLink</a>).</p>
        <p>Jízdenky ATVO koupíte online, v automatu ATVO ve výdeji zavazadel nebo v pokladně ATVO v příletové hale, v Benátkách v pokladně na Piazzale Roma. Cenu jsme na stránkách ATVO nenašli, ověřte ji při nákupu v e-shopu nebo v pokladně. Druhou přímou linku provozuje Barzi Service, jezdí z letiště na nádraží Venezia Mestre a na Tronchetto v Benátkách (<a href={airportTransport}>provozovatel letiště, doprava</a>).</p>

        <figure className={styles.photo}><Image src="/blog/letiste-treviso-ryanair-nastup.webp" alt="Boeing 737 Ryanair zepředu, cestující nastupují po schodech s logem AER TRE" width={1600} height={1301} sizes={sizes} /><figcaption>Nástup do Boeingu 737 Ryanairu po pojízdných schodech. Logo AER TRE na schodech patří provozovateli letiště. Foto: vlastní archiv FlyQueens, 25. května 2026.</figcaption></figure>

        <h2 id="jak-se-dostanete-do-treviso">Jak se dostanete do Trevisa?</h2>
        <p>Na hlavní nádraží Treviso Centrale jezdí přímý autobus Treviso AirLink dopravce MOM. Cesta trvá 10 minut a autobusy jezdí každých 30 minut: z letiště od 6:10 do 22:40, z nádraží od 5:53 do 22:23. (<a href={airlink}>MOM, Treviso AirLink</a>).</p>
        <ul>
          <li>Jízdenka stojí 5 € a platí 24 hodin od prvního označení na celé městské síti Trevisa.</li>
          <li>V autobusu zaplatíte bezkontaktně. Děti do 4 let s platícím dospělým jedou zdarma.</li>
          <li>Zavazadlo do 12 kg a 55 × 50 × 25 cm vezete zdarma. Větší stojí 2 € při koupi předem, 4 € v autobusu.</li>
          <li>Zastávky jsou na Via Noalese u pěší lávky.</li>
        </ul>
        <p>Trenitalia u kombinované jízdenky uvádí jiné časy, 15 minut jízdy a odjezdy z letiště do 23:10. Řídili jsme se jízdním řádem dopravce MOM. Pokud jedete posledním spojem, ověřte si ho.</p>
        <p>Na nádraží jezdí z letiště i městská linka MOM 6. Od letiště vede také linka MOM do Padovy a spoj Nomago do Slovinska. Taxi stojí u vchodu do terminálu v přízemí, zajišťuje je Radio Taxi Treviso, nonstop na čísle +39 0422 431515. Vůz s řidičem si můžete objednat i přes aplikaci Uber (<a href={airportTransport}>provozovatel letiště, doprava</a>).</p>

        <h2 id="kolik-stoji-parkovani-na-letisti-treviso">Kolik stojí parkování na letišti Treviso?</h2>
        <p>Parkoviště u letiště provozuje Marco Polo Park, který podle webu letiště spravuje parkování u Trevisa i u benátského letiště. Ceník na stránce letiště uvádí standardní sazby. Při rezervaci online letiště slibuje zvýhodněné ceny podle termínu (<a href={airportParking}>Treviso Airport, parkování</a>).</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Parkoviště</th><th scope="col">Poloha</th><th scope="col">Cena na místě</th></tr></thead>
            <tbody>
              <tr><td>A</td><td>před terminálem</td><td>prvních 10 minut zdarma, pak 5 € za každou započatou hodinu</td></tr>
              <tr><td>B</td><td>hned vedle terminálu, částečně kryté</td><td>do 1 h 5 €, do 12 h 20 €, do 24 h 30 €, každý další den 30 €</td></tr>
              <tr><td>F</td><td>před terminálem, krytá lávka</td><td>5 € za hodinu, 20 € za den</td></tr>
              <tr><td>G</td><td>naproti terminálu, krytá lávka</td><td>20 € za den</td></tr>
              <tr><td>D</td><td>pár minut od terminálu, částečně kryté</td><td>15 € za den</td></tr>
              <tr><td>E, Low Cost</td><td>pár minut od terminálu</td><td>20 € za den</td></tr>
              <tr><td>C</td><td>pár minut od terminálu</td><td>5 € za den</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={airportParking}>ceník Treviso Airport</a>, stav k 7. 10. 2026. Denní sazba platí za každý započatý den.</p>
        <p>Parkoviště C je v ceníku výrazně levnější než ostatní. Než se na něj spolehnete, ověřte si cenu v rezervaci. Při rezervaci online kamera u vjezdu načte SPZ a závora se otevře sama, žádné tlačítko nemačkejte. Systém rezervaci rozpozná nejdříve 3 hodiny před rezervovaným časem příjezdu a nejpozději 3 hodiny po něm. Na vysazení a vyzvednutí se hodí parkoviště A, prvních 10 minut je zdarma.</p>

        <h2 id="kdy-otevira-terminal">Kdy otevírá terminál a co v něm najdete?</h2>
        <p>Do terminálu se dostanete od 5:00. Zavírá se po posledním letu dne, podle provozovatele kolem půlnoci. Spát v terminálu se nesmí, takže na ranní let přes noc nečekejte (<a href={airportFaq}>FAQ letiště, služby</a>). První autobus ATVO z Benátek je na letišti právě v 5:00.</p>
        <p>Wi-Fi i nabíjecí místa na všech podlažích jsou zdarma, bankomaty najdete v příletech i odletech. Půjčovny aut najdete v přízemí.</p>
        <figure className={styles.photo}><Image src="/blog/letiste-treviso-ryanair-pod-strechou.webp" alt="Boeing 737 Ryanair na stání u letiště Treviso, pohled zpod střechy terminálu" width={1600} height={900} sizes={sizes} /><figcaption>Boeing 737 Ryanairu na stání s přistavenými schody, nahoře okraj střechy terminálu. Foto: vlastní archiv FlyQueens, 25. května 2026.</figcaption></figure>
        <p>Za leden až srpen 2026 letiště odbavilo 2 192 520 cestujících, o 0,8 % víc než ve stejném období roku 2025. Letiště Marco Polo v Benátkách mělo za stejnou dobu 8 675 577 cestujících (<a href={assaeroporti}>Assaeroporti</a>).</p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Je Treviso letiště Benátek?</h3>
          <p>Ne, Benátky mají vlastní letiště Marco Polo. Letiště Treviso leží u stejnojmenného města a do Benátek na Piazzale Roma jede autobus ATVO 40 minut. Ryanair ho prodává pod názvem „Venice Treviso“. Obě letiště patří do skupiny SAVE.</p>
          <h3>Kolik stojí autobus z letiště Treviso do města?</h3>
          <p>Treviso AirLink na nádraží Treviso Centrale stojí 5 € a jízdenka platí 24 hodin i v městské dopravě Trevisa. Jízda trvá 10 minut.</p>
          <h3>Můžu na letišti Treviso přespat?</h3>
          <p>Ne. Terminál se otevírá v 5:00 a zavírá po posledním letu, kolem půlnoci. Spát v něm provozovatel nedovoluje.</p>
          <h3>Kolik stojí týden parkování?</h3>
          <p>Podle ceníku na místě vyjde týden na parkovišti D na 7 × 15 €, tedy 105 €. Na parkovištích E, F, G a Low Cost stojí den 20 €, týden tedy 140 €. Parkoviště C uvádí 5 € za den, ale to je cena, kterou si před cestou ověřte v rezervaci. Online rezervace může být levnější, cena závisí na termínu.</p>
          <h3>Jak dlouho trvá let z Prahy do Trevisa?</h3>
          <p>Podle letového řádu Ryanairu 1 hodinu 20 minut v obou směrech.</p>
        </div>

        <p>V den odletu můžete let sledovat na radaru.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          relatedCard('/blog/prirucni-zavazadlo-ryanair'),
          relatedCard('/blog/prirucni-zavazadlo-do-letadla'),
          { href: '/letiste/praha', eyebrow: 'Odlet z Česka', title: 'Letiště Praha', description: 'Přílety, odlety, doprava na letiště a parkování.' },
          relatedCard('/blog/letiste-tivat'),
          relatedCard('/blog/jak-sledovat-let-podle-cisla'),
        ]} />
        <SourcesBox sources={[
          { label: 'Treviso Airport (AER TRE): úvodní stránka a kontakty', href: airport },
          { label: 'Treviso Airport: doprava na letiště a z letiště', href: airportTransport },
          { label: 'Treviso Airport: ceník parkování', href: airportParking },
          { label: 'Treviso Airport: časté otázky, služby', href: airportFaq },
          { label: 'Treviso Airport: časté otázky, doprava', href: 'https://www.trevisoairport.it/en_gb/assistance/faqs-transport-from-to-airport' },
          { label: 'Treviso Airport: přílety a odlety', href: 'https://www.trevisoairport.it/en_gb/flights/arrivals' },
          { label: 'Ryanair: letový řád Praha–Treviso (listopad 2026, data JSON)', href: ryanairSchedule },
          { label: 'ATVO: Treviso Airport Bus Express', href: atvo },
          { label: 'ATVO: jízdní řád linky 351, platný 10. 8.–24. 10. 2026 (PDF)', href: atvoPdf },
          { label: 'MOM (Mobilità di Marca): Treviso AirLink', href: airlink },
          { label: 'Trenitalia: Treviso AirLink, kombinovaná jízdenka', href: trenitalia },
          { label: 'Assaeroporti: dopravní statistiky italských letišť, srpen 2026', href: assaeroporti },
        ]} note="Zdroje ověřeny 7. října 2026. Fotografie pocházejí z vlastního archivu FlyQueens, datum 25. května 2026 vychází z názvů originálních souborů. Jízdní řád ATVO platí do 24. 10. 2026, letový řád Ryanairu se mění podle sezony." />
      </article>
    </main>
  )
}
