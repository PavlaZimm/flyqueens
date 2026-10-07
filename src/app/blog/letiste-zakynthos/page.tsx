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

const post = POSTS.find((entry) => entry.slug === 'letiste-zakynthos')!
const title = 'Letiště Zakynthos: lety z Česka, parkování a doprava 2026'
const description = 'Letiště Zakynthos (ZTH): kdy v říjnu 2026 končí lety Smartwings z Prahy, ceník parkování, autobus do města a provozní doba v létě i v zimě.'
const url = 'https://www.flyqueens.cz/blog/letiste-zakynthos'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const zth = 'https://www.zth-airport.gr/en'
const destinace = 'https://www.zth-airport.gr/en/flights--more/flights--destinations/destinations/destinations/dest_id-748/nd_id-748'
const parkovani = 'https://www.zth-airport.gr/en/category-detailed/ctg_id-164/nd_id-711'
const autobus = 'https://www.zth-airport.gr/en/category-detailed/ctg_id-166/nd_id-709'
const ktel = 'https://ktel-zakynthos.gr/en/zakynthos-airport/'
const gps = 'https://www.zth-airport.gr/en/category-detailed/ctg_id-183/nd_id-709'
const pujcovny = 'https://www.zth-airport.gr/en/category-detailed/ctg_id-182/nd_id-738'
const provozniDoba = 'https://www.fraport-greece.com/en/our-expertise/aviation/operating-hours.html'
const leto2026 = 'https://www.fraport-greece.com/content/dam/fraport-company-greece/documents/en/our-expertise/operating-hours/S26_RWY_Operating_Hours_Local_Version_1.pdf/_jcr_content/renditions/original.media_file.download_attachment.file/S26_RWY_Operating_Hours_Local_Version_1.pdf'
const statistika = 'https://www.zth-airport.gr/uploads/sys_nodelng/2/2877/Zakinthos_12_Traffic_2025vs2024.pdf'
const profil = 'https://www.fraport-greece.com/en/airport-profiles/zakynthos.html'

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
      about: { '@type': 'Airport', name: 'Letiště Zakynthos „Dionysios Solomos“', iataCode: 'ZTH', icaoCode: 'LGZA', sameAs: zth },
      image: [
        'https://www.flyqueens.cz/blog/letiste-zakynthos-terminal.webp',
        'https://www.flyqueens.cz/blog/letiste-zakynthos-airbus-odbavovaci-plocha.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Letiště Zakynthos', item: url },
      ],
    },
  ],
}

export default function LetisteZakynthosArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Letiště Zakynthos"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Letiště Zakynthos „Dionysios Solomos“ (IATA ZTH, ICAO LGZA) leží asi 3 kilometry jižně od města Zakynthos. Z Česka sem v létě 2026 podle tabulky letiště létala jen společnost Smartwings, a to z Prahy, Brna a Ostravy. Lety z Brna a Ostravy už skončily, z Prahy podle tabulky letiště přistane poslední let 9. října a poslední let zpět odletí 16. října. Od 25. října pak letiště přechází na výrazně kratší zimní provozní dobu.</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Hodnota</th></tr></thead>
            <tbody>
              <tr><td>Kódy</td><td>IATA ZTH, ICAO LGZA</td></tr>
              <tr><td>Provozovatel</td><td>Fraport Greece</td></tr>
              <tr><td>Do centra města Zakynthos</td><td>asi 3,2 km vzdušnou čarou</td></tr>
              <tr><td>Do Laganasu</td><td>asi 3,6 km vzdušnou čarou</td></tr>
              <tr><td>Provoz v létě 2026 (1. 5.–24. 10.)</td><td>denně 05:00–22:00</td></tr>
              <tr><td>Cestující v roce 2025</td><td>2 282 774</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: <a href={zth}>web letiště Zakynthos</a> (souřadnice, statistika), <a href={leto2026}>provozní doba Fraport Greece, léto 2026</a>. Vzdálenosti jsme spočítali ze souřadnic letiště a bodů města a Laganasu v mapě OpenStreetMap, po silnici je cesta delší.</p>

        <figure className={styles.photo}><Image src="/blog/letiste-zakynthos-terminal.webp" alt="Terminál letiště Zakynthos s nápisem Dionysios Solomos z odbavovací plochy, červen 2018" width={1600} height={600} sizes={sizes} preload /><figcaption>Terminál z odbavovací plochy, na fasádě řecký nápis „Státní letiště Zakynthos D. Solomos“. Stav z 8. června 2018, Fraport Greece budovu poté přestavěl. Foto: vlastní archiv FlyQueens.</figcaption></figure>

        <ArticleContents items={[
          { id: 'kdy-konci-lety-z-ceska', label: 'Kdy v roce 2026 končí lety z Česka?' },
          { id: 'kde-letiste-lezi', label: 'Kde letiště leží vůči městu a Laganasu?' },
          { id: 'jak-se-dostat-z-letiste', label: 'Jak se z letiště dostanete do města?' },
          { id: 'kolik-stoji-parkovani', label: 'Kolik stojí parkování u letiště Zakynthos?' },
          { id: 'provozni-doba-leto-zima', label: 'Kdy je letiště v provozu v létě a v zimě?' },
          { id: 'co-je-v-terminalu', label: 'Co najdete v terminálu?' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="kdy-konci-lety-z-ceska">Kdy v roce 2026 končí lety z Česka?</h2>
        <p>Přímé lety z Česka na Zakynthos v sezoně 2026 provozovala jen společnost Smartwings. Z Prahy se létalo od 12. května, v červnu až srpnu každý den. Z Brna a Ostravy se létalo dvakrát týdně, v úterý a v pátek, od 29. května. Vychází to ze sezonní tabulky letů na webu letiště, stažené 7. října 2026 (<a href={destinace}>Zakynthos Airport, Destinations</a>).</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Odkud</th><th scope="col">Lety v létě 2026</th><th scope="col">Poslední přílet na Zakynthos</th><th scope="col">Poslední odlet zpět</th></tr></thead>
            <tbody>
              <tr><td>Praha</td><td>od 12. 5., v červnu až srpnu denně</td><td>pá 9. 10.</td><td>pá 16. 10.</td></tr>
              <tr><td>Brno</td><td>út a pá, od 29. 5.</td><td>pá 25. 9.</td><td>pá 2. 10.</td></tr>
              <tr><td>Ostrava</td><td>út a pá, od 29. 5.</td><td>pá 25. 9.</td><td>út 29. 9.</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={destinace}>sezonní tabulka letiště Zakynthos</a>, výběr „Czech Republic“, stav k 7. 10. 2026. Provozovatel upozorňuje, že za změny a chyby v tabulce neručí.</p>
        <p>V říjnu už z Prahy nelétá denní spoj. Tabulka uvádí přílety z Prahy jen 2., 6. a 9. října, vždy v 08:40 místního času. Odlety do Prahy jsou 2., 6., 9. a 16. října v 09:25, 6. října ještě jeden v 06:15. Řecko má o hodinu víc než Česko. Lety 6. října sedí i se skutečností: podle tabule letiště přistálo letadlo Smartwings z Prahy v 08:34 a zpátky odletělo v 09:23.</p>
        <p>Smartwings na svém webu prodává i samotné <a href="https://www.smartwings.com/letenky-praha-zakynthos">letenky Praha–Zakynthos</a>. Volná místa a ceny pro konkrétní termín uvidíte až v rezervaci. Odlety z české strany najdete na stránkách <Link href="/letiste/praha">Letiště Praha</Link>, <Link href="/letiste/brno">Letiště Brno</Link> a <Link href="/letiste/ostrava">Letiště Ostrava</Link>.</p>

        <h2 id="kde-letiste-lezi">Kde letiště leží vůči městu a Laganasu?</h2>
        <p>Letiště leží mezi městem Zakynthos a Laganasem. Podle souřadnic, které zveřejňuje provozovatel, je centrum města asi 3,2 kilometru vzdušnou čarou na sever. Laganas je asi 3,6 kilometru na jihozápad. Mapa OpenStreetMap řadí areál letiště ke Kalamaki. Navigaci nastavte na „Zakynthos Airport, Zakynthos 290 92“ nebo na souřadnice 37.754550, 20.887208 (<a href={gps}>Zakynthos Airport, GPS Location</a>).</p>
        <p>Na internetu najdete i 4,3, 4,5 nebo 6,5 kilometru do města a 9 až 12 kilometrů k letoviskům. Provozovatel letiště vzdálenosti ani jízdní dobu nezveřejňuje. Po silnici je cesta vždy delší než vzdušnou čarou.</p>

        <h2 id="jak-se-dostat-z-letiste">Jak se z letiště dostanete do města?</h2>
        <p>Na výběr je autobus, taxi a půjčené auto. Pokud letíte se zájezdem, dopravu z letiště popisují pokyny cestovní kanceláře.</p>
        <h3>Autobus KTEL</h3>
        <p>Mezi letištěm a městem Zakynthos jezdí autobus společnosti KTEL Zakynthos. Zastávka je před terminálem v části příletů (<a href={autobus}>Zakynthos Airport, By Public Bus</a>). Jízdní řád na webu KTEL, naposledy upravený 7. září 2026, uvádí šest spojů v každém směru:</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Směr</th><th scope="col">Odjezdy</th></tr></thead>
            <tbody>
              <tr><td>Město Zakynthos → letiště (pracovní dny)</td><td>08:15, 09:15, 10:45, 12:45, 17:00, 19:15</td></tr>
              <tr><td>Letiště → město Zakynthos (každý den)</td><td>08:30, 09:30, 11:00, 13:00, 17:15, 19:30</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={ktel}>KTEL Zakynthos, linka Zakynthos–Airport</a>, stav k 7. 10. 2026.</p>
        <p>KTEL u směru na letiště píše „week days“, u opačného směru „everyday“, obojí se stejným počtem spojů. Období platnosti ani cenu jízdenky stránka neuvádí. Na víkendový odlet si proto spoj ověřte přímo u KTEL.</p>
        <h3>Taxi a půjčené auto</h3>
        <p>Stanoviště taxi je před terminálem (<a href="https://www.zth-airport.gr/en/category-detailed/ctg_id-167/nd_id-709">Zakynthos Airport, By Taxi</a>). Ceník provozovatel letiště nezveřejňuje, cenu si proto potvrďte s řidičem před jízdou. V příletové hale mají přepážky tři autopůjčovny: Avis Budget, Enterprise a Hertz Thrifty (<a href={pujcovny}>Zakynthos Airport, Car Rental</a>).</p>

        <h2 id="kolik-stoji-parkovani">Kolik stojí parkování u letiště Zakynthos?</h2>
        <p>Od března 2026 parkoviště letiště provozuje firma Airport Parking Management. Hlavní parkoviště P1 je přímo u terminálu, dlouhodobé parkoviště kousek od něj. Prvních 20 minut je na obou zdarma. Hodí se to, když jen vysazujete nebo vyzvedáváte.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Doba stání</th><th scope="col">P1 u terminálu</th><th scope="col">Dlouhodobé</th></tr></thead>
            <tbody>
              <tr><td>0–20 minut</td><td>zdarma</td><td>zdarma</td></tr>
              <tr><td>21–60 minut</td><td>5 €</td><td>5 €</td></tr>
              <tr><td>1–2 hodiny</td><td>6 €</td><td>8 € (1–4 hodiny)</td></tr>
              <tr><td>2–3 hodiny</td><td>7 €</td><td>8 €</td></tr>
              <tr><td>3–4 hodiny</td><td>8 €</td><td>8 €</td></tr>
              <tr><td>4–5 hodin</td><td>10 €</td><td>10 € (4–24 hodin)</td></tr>
              <tr><td>5–24 hodin</td><td>12 €</td><td>10 €</td></tr>
              <tr><td>Každý další den i započatý</td><td>+8 €</td><td>+5 €</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={parkovani}>Zakynthos Airport, Parking</a>, ceník platný k 7. 10. 2026.</p>
        <p>Za týden (7 × 24 hodin) by podle ceníku vyšlo stání na P1 na 60 € a na dlouhodobém parkovišti na 40 €. Jde o náš výpočet, konečnou částku spočítá parkovací systém. Parkoviště mají kamery se čtením SPZ a nonstop interkom. Kontakt na provozovatele je +30 2695 00 16 16.</p>

        <h2 id="provozni-doba-leto-zima">Kdy je letiště v provozu v létě a v zimě?</h2>
        <p>Od 1. května do 24. října 2026 je letiště v provozu každý den od 05:00 do 22:00 místního času. Od 25. října platí zimní provozní doba, která se liší podle dne v týdnu a je výrazně kratší (<a href={provozniDoba}>Fraport Greece, Operating Hours</a>).</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Zima 2026/27 (od 25. 10.)</th><th scope="col">Provozní doba</th></tr></thead>
            <tbody>
              <tr><td>pondělí a neděle</td><td>13:30–19:30</td></tr>
              <tr><td>úterý a sobota</td><td>12:00–18:00</td></tr>
              <tr><td>středa a pátek</td><td>09:30–19:30</td></tr>
              <tr><td>čtvrtek</td><td>10:30–19:30</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={provozniDoba}>Fraport Greece, Airport Operating Hours, Winter Season 2026</a>, verze 1 z 1. 10. 2026, platí do 27. 3. 2027. Pro 25. 10. až 2. 11. a pro 7. 11. má dokument delší výjimky, nejpozději do 22:00.</p>
        <p>Dokument je určený hlavně dopravcům. Fraport Greece v něm píše, že hodiny upraví, pokud dopravci požádají o další lety, a že terminál bývá otevřený déle.</p>
        <p>Na počtu cestujících je sezona vidět jasně. V roce 2025 letiště odbavilo 2 282 774 lidí, z toho přes milion v červenci a srpnu. V prosinci jich bylo 4 604 a mezinárodním letem z nich podle statistiky letěl jediný (<a href={statistika}>Zakynthos Airport, statistika 2025</a>). Zimní lety z Česka tabulka letiště neuvádí.</p>

        <figure className={styles.photo}><Image src="/blog/letiste-zakynthos-airbus-odbavovaci-plocha.webp" alt="Airbus v barvách Austrian Airlines na mokré odbavovací ploše letiště Zakynthos pod mraky" width={1600} height={701} sizes={sizes} /><figcaption>Airbus v barvách Austrian Airlines u schodů na mokré odbavovací ploše, vedle cisterna s logem EKO, za letištěm hory v mracích. Foto: vlastní archiv FlyQueens, 15. června 2018.</figcaption></figure>

        <h2 id="co-je-v-terminalu">Co najdete v terminálu?</h2>
        <p>Fraport Greece letiště provozuje od roku 2017 a terminál přestavěl. Odbavovacích přepážek je místo 15 nově 20 a linek bezpečnostní kontroly místo dvou pět (<a href={profil}>Fraport Greece, profil letiště Zakynthos</a>). Podle webu letiště najdete v terminálu tohle:</p>
        <ul>
          <li>Wi-Fi zdarma, síť „Fraport-Free“, přihlášení přes úvodní stránku v prohlížeči.</li>
          <li>Nabíjecí stanice zdarma v odbavovací hale a u odletových východů za bezpečnostní kontrolou.</li>
          <li>Bankomaty Eurobank a Euronet, vozíky na zavazadla na vratnou minci.</li>
          <li>Stanoviště první pomoci. Ztráty a nálezy z terminálu přebírá policie, tel. 26950 24487.</li>
        </ul>
        <p>Asistenci pro cestující se sníženou pohyblivostí objednejte u dopravce nebo cestovní kanceláře nejméně 48 hodin před odletem (<a href="https://www.zth-airport.gr/en/category-detailed/ctg_id-174/nd_id-712">Zakynthos Airport, Accessible Travel</a>). Pro tekutiny v příručním zavazadle platí běžný limit 100 ml na balení v jednom průhledném sáčku do 1 litru, sáček dostanete u kontroly zdarma. Rozměry kufru do kabiny podle dopravců shrnuje článek <Link href="/blog/prirucni-zavazadlo-do-letadla">příruční zavazadlo do letadla</Link>.</p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Létá se na Zakynthos z Prahy i v zimě?</h3>
          <p>Podle tabulky letiště ne. Podle ní přistane poslední let Smartwings z Prahy 9. 10. 2026 a poslední let do Prahy odletí 16. 10. 2026. V prosinci 2025 letiště odbavilo jediného cestujícího na mezinárodním letu. Zimní lety z Česka tabulka letiště neuvádí.</p>
          <h3>Jak daleko je letiště Zakynthos od Laganasu?</h3>
          <p>Asi 3,6 kilometru vzdušnou čarou na jihozápad, do centra města Zakynthos asi 3,2 kilometru na sever. Po silnici jsou obě cesty delší.</p>
          <h3>Jezdí z letiště autobus?</h3>
          <p>Ano, KTEL Zakynthos jezdí do města šestkrát denně, z letiště v 08:30, 09:30, 11:00, 13:00, 17:15 a 19:30. Zastávka je před příletovou částí terminálu.</p>
          <h3>Kolik stojí parkování na týden?</h3>
          <p>Podle ceníku platného v říjnu 2026 vychází týden na parkovišti P1 u terminálu na 60 € a na dlouhodobém parkovišti na 40 €. Prvních 20 minut je zdarma.</p>
          <h3>Kdy je letiště Zakynthos v noci zavřené?</h3>
          <p>V létě 2026 je v provozu denně 05:00–22:00, mimo tuto dobu jen pro nouzové lety. V zimě od 25. 10. 2026 začíná provoz podle dne mezi 09:30 a 13:30 a končí mezi 18:00 a 19:30, kromě výjimek na přelomu října a listopadu.</p>
        </div>

        <p>Den před odletem z Prahy můžete letadlo sledovat na <Link href="/radar">radaru letadel FlyQueens</Link> v oblasti Česko a okolí. Jak najít konkrétní spoj, popisuje návod <Link href="/blog/jak-sledovat-let-podle-cisla">jak sledovat let podle čísla</Link>.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha', eyebrow: 'Odlet z Česka', title: 'Letiště Praha', description: 'Přílety, odlety, doprava na letiště a parkování.' },
          relatedCard('/blog/letiste-tivat'),
          relatedCard('/blog/prirucni-zavazadlo-do-letadla'),
          { href: '/blog/jak-sledovat-let-podle-cisla', eyebrow: 'Návod', title: 'Jak sledovat let podle čísla', description: 'Číslo letu, volací znak a registrace: co zadat do mapy.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Zakynthos Airport (Fraport Greece): sezonní tabulka letů, Česko', href: destinace },
          { label: 'Zakynthos Airport: Parking, ceník 2026', href: parkovani },
          { label: 'Zakynthos Airport: By Public Bus', href: autobus },
          { label: 'Zakynthos Airport: GPS Location information', href: gps },
          { label: 'Zakynthos Airport: Car Rental', href: pujcovny },
          { label: 'Zakynthos Airport: statistika provozu 2025 (PDF)', href: statistika },
          { label: 'KTEL Zakynthos: linka Zakynthos–Airport', href: ktel },
          { label: 'Fraport Greece: Operating Hours (zima 2026)', href: provozniDoba },
          { label: 'Fraport Greece: provozní doba léto 2026, verze 1 (PDF)', href: leto2026 },
          { label: 'Fraport Greece: profil letiště Zakynthos', href: profil },
          { label: 'GTP: Fraport Greece dokončil přestavbu 14 letišť, 10. 2. 2021', href: 'https://news.gtp.gr/2021/02/10/fraport-greece-completes-makeover-of-14-greek-regional-airports/' },
          { label: 'Smartwings: letenky Praha–Zakynthos', href: 'https://www.smartwings.com/letenky-praha-zakynthos' },
          { label: 'OpenStreetMap (poloha města Zakynthos a Laganasu pro výpočet vzdáleností)', href: 'https://www.openstreetmap.org/' },
        ]} note="Zdroje ověřeny 7. října 2026. Letový řád, ceník parkování a jízdní řád autobusu se mění, před cestou je ověřte u dopravce, provozovatele parkoviště a KTEL. Fotografie pocházejí z vlastního archivu FlyQueens, data pořízení 8. a 15. června 2018 vycházejí z metadat originálů. Terminál od té doby prošel přestavbou." />
      </article>
    </main>
  )
}
