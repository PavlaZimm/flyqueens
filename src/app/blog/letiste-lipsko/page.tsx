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

const post = POSTS.find((entry) => entry.slug === 'letiste-lipsko')!
const title = 'Letiště Lipsko 2026: doprava z Česka, parkování, Antonov'
const description = 'Letiště Lipsko (LEJ): jak se tam dostat z Česka vlakem i autem, ceny parkování a nákladní provoz s Antonovy. Terasa je dočasně zavřená.'
const url = 'https://www.flyqueens.cz/blog/letiste-lipsko'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const lej = 'https://www.leipzig-halle-airport.de'
const adv = 'https://www.adv.aero/wp-content/uploads/2015/11/12.2025-ADV-Monatsstatistik.pdf'
const mfagNews = 'https://www.mdf-ag.com/presse/news/details/verkehrsentwicklung-der-mitteldeutschen-flughaefen-dresden-und-leipzig-halle-2025/'
const mfagOverview = 'https://www.mdf-ag.com/flughafen-leipzig/halle/flughafen-leipzig/halle-gmbh-im-ueberblick/'
const mfagNoise = 'https://www.mdf-ag.com/umwelt/laermschutz/'
const mfagDrone = 'https://www.mdf-ag.com/presse/news/details/informationen-zur-drohnensichtung-am-05082026-auf-dem-flughafen-leipzig-halle/'

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
      about: { '@type': 'Airport', name: 'Letiště Lipsko/Halle', iataCode: 'LEJ', icaoCode: 'EDDP', sameAs: lej },
      image: [
        'https://www.flyqueens.cz/blog/letiste-lipsko-antonov-an-124.webp',
        'https://www.flyqueens.cz/blog/letiste-lipsko-an-124-ur-82027.webp',
        'https://www.flyqueens.cz/blog/letiste-lipsko-vystava-antonov.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Letiště Lipsko', item: url },
      ],
    },
  ],
}

export default function LetisteLipskoArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Letiště Lipsko"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Letiště Lipsko/Halle (LEJ) leží ve městě Schkeuditz mezi Lipskem a Halle a pod odbavovací halou má vlastní vlakové nádraží. Z Česka se na něj nejsnáz dostanete přes Drážďany, odkud jezdí přímý vlak IC. Osobní lety tu startují a přistávají jen mezi 5:30 a 23:30, nákladní provoz běží nepřetržitě. Vyhlídková terasa je k 21. 9. 2026 zavřená a prohlídky letiště jsou pozastavené.</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Hodnota</th></tr></thead>
            <tbody>
              <tr><td>Kódy</td><td>IATA LEJ, ICAO EDDP</td></tr>
              <tr><td>Adresa</td><td>Terminalring 11, 04435 Schkeuditz</td></tr>
              <tr><td>Dráhy</td><td>2, obě 3 600 m (šířka 45 a 60 m), CAT IIIb</td></tr>
              <tr><td>Cestující 2025</td><td>2 119 170 podle ADV (−3,7 % meziročně)</td></tr>
              <tr><td>Náklad 2025</td><td>1 391 681 t (+0,4 %), 2. místo v Německu za Frankfurtem</td></tr>
              <tr><td>Provoz</td><td>osobní lety 5:30–23:30, nákladní nonstop</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: <a href={adv}>ADV, měsíční statistika 12/2025</a>; <a href={mfagNews}>MFAG, tisková zpráva 27. 1. 2026</a>; <a href={mfagOverview}>MFAG, přehled letiště</a>.</p>

        <figure className={styles.photo}><Image src="/blog/letiste-lipsko-antonov-an-124.webp" alt="Příď nákladního Antonovu An-124 s nápisem Be Brave Like Kharkiv na letišti Lipsko" width={1600} height={698} sizes={sizes} preload /><figcaption>Příď An-124-100M s nápisem „Be Brave Like Kharkiv“. Foto: vlastní archiv FlyQueens, 24. prosince 2025.</figcaption></figure>

        <ArticleContents items={[
          { id: 'jak-se-z-ceska-dostanete-na-letiste', label: "Jak se z Česka dostanete na letiště Lipsko" },
          { id: 'parkovani-na-letisti-lipsko-kolik', label: "Parkování na letišti Lipsko: kolik zaplatíte" },
          { id: 'provozni-doba-a-nocni-lety-na-letisti', label: "Provozní doba a noční lety na letišti Lipsko" },
          { id: 'nakladni-letiste-dhl-a-antonov', label: "Nákladní letiště: DHL a Antonov" },
          { id: 'vyhlidkova-terasa-a-prohlidky-letiste', label: "Vyhlídková terasa a prohlídky letiště Lipsko" },
          { id: 'caste-otazky-o-letisti-lipsko', label: "Časté otázky o letišti Lipsko" },
        ]} />

        <h2 id="jak-se-z-ceska-dostanete-na-letiste">Jak se z Česka dostanete na letiště Lipsko</h2>
        <p>Nejjednodušší cesta vede přes Drážďany. Odtud jezdí na letiště každé dvě hodiny přímý vlak IC (<a href={`${lej}/anreise-abreise/bus-bahn/`}>Letiště Lipsko/Halle, vlak a autobus</a>). Spojení z Prahy do Drážďan si vyhledejte v jízdním řádu Českých drah nebo v aplikaci DB Navigator.</p>
        <p>Nádraží letiště je přímo pod odbavovací halou, dolů vede eskalátor i výtah. Linky S-Bahn S5 a S5X jezdí každých 30 minut a jízda trvá 14 minut z hlavního nádraží v Lipsku a 10 minut z Halle. Cenu jízdenky vám spočítá aplikace dopravního svazu <a href="https://www.mdv.de/">MDV</a> nebo DB Navigator.</p>
        <p>Autem vede k terminálu přímý přivaděč z dálnice A14 (Drážďany–Magdeburg), další možnost je sjezd z A9 přes Schkeuditzer Kreuz nebo Großkugel (<a href={`${lej}/anreise-abreise/auto/`}>Letiště Lipsko/Halle, autem</a>). Oficiální vzdálenost od center letiště neuvádí. Podle našeho výpočtu ze souřadnic letiště je to vzdušnou čarou zhruba 13 km k hlavnímu nádraží v Lipsku a 18 km k nádraží v Halle, po silnici o kus víc.</p>
        <p>Pokud přiletíte pozdě večer nebo letíte brzy ráno, pomůže noční autobus NXL lipského dopravce LVB. Z hlavního nádraží v Lipsku jede v 0:50 a ve 2:22, z letiště zpátky v 1:35 a ve 3:05, platí běžný tarif MDV. Podle letiště se s ním pohodlně dostanete k letům před 6:30.</p>

        <h2 id="parkovani-na-letisti-lipsko-kolik">Parkování na letišti Lipsko: kolik zaplatíte</h2>
        <p>Letiště má přes 5 500 míst na deseti venkovních parkovištích a v parkovacím domě, všechna otevřená nonstop. Týden u závory vyjde podle vzdálenosti od terminálu na 67 až 200 eur. U většiny parkovišť je online rezervace levnější, na P1, P3 a P4 ale online rezervovat nejde (<a href={`${lej}/parken/parken-am-flughafen-leipzig/halle/`}>Letiště Lipsko/Halle, parkování</a>).</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Parkoviště</th><th scope="col">Od terminálu</th><th scope="col">7 dní u závory</th><th scope="col">Poznámka</th></tr></thead>
            <tbody>
              <tr><td>P20</td><td>asi 1 200 m, Kursdorf</td><td>67 €</td><td>jen duben až říjen, jen s QR kódem</td></tr>
              <tr><td>P15</td><td>asi 500 m</td><td>70 €</td><td>jen s QR kódem</td></tr>
              <tr><td>P4</td><td>asi 500 m</td><td>85 €</td><td>jen na místě, online nelze</td></tr>
              <tr><td>P7</td><td>asi 300 m</td><td>90 €</td><td>jen s QR kódem</td></tr>
              <tr><td>P2</td><td>asi 150 m</td><td>95 €</td><td>jen s QR kódem</td></tr>
              <tr><td>P21</td><td>asi 150 m</td><td>105 €</td><td>omezená kapacita, jen s QR kódem</td></tr>
              <tr><td>Parkovací dům</td><td>napojený na terminál</td><td>120 €</td><td>krytý, vjezd do výšky 1,90 m</td></tr>
              <tr><td>P1 a P3</td><td>pár minut pěšky</td><td>125 €</td><td>online nelze</td></tr>
              <tr><td>P6 Premium</td><td>minuta pěšky, mezi terminály A a B</td><td>200 €</td><td>nejvýš 7 dní</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: tarify u závory podle <a href={`${lej}/parken/parken-am-flughafen-leipzig/halle/`}>webu letiště</a> a stránek jednotlivých parkovišť, stav k 21. 9. 2026. Letiště upozorňuje, že se ceny mohou měnit podle sezony a obsazenosti.</p>
        <p>Pokud někoho jen vysazujete, můžete krátce stát na P11 přímo před centrálním odbavením. Platí se tam jen mincemi a nejdéle 3 hodiny. Když někoho vyzvedáváte, v pruhu Kiss &amp; Fly u terminálu B máte prvních 10 minut zdarma, jednou za den. Pro srovnání se podívejte na <Link href="/letiste/praha/parkovani">parkování u letiště Praha</Link>.</p>

        <h2 id="provozni-doba-a-nocni-lety-na-letisti">Provozní doba a noční lety na letišti Lipsko</h2>
        <p>Pravidelné osobní lety smějí v Lipsku startovat a přistávat jen mezi 5:30 a 23:30. Zákaz nočních osobních letů platí od letního letového řádu 2008 (<a href={mfagNoise}>MFAG, ochrana proti hluku</a>). Nákladní provoz běží nonstop. Cvičné lety jsou povolené jen od pondělí do soboty mezi 6:00 a 22:00.</p>
        <p>Nákladní letadla, která v Lipsku v noci startují a přistávají, můžete dohledat na <Link href="/radar">radaru letadel FlyQueens</Link>.</p>

        <h2 id="nakladni-letiste-dhl-a-antonov">Nákladní letiště: DHL a Antonov</h2>
        <p>Podle statistiky německého svazu letišť ADV prošlo Lipskem v roce 2025 celkem 1 391 681 tun nákladu. Po Frankfurtu je to druhé největší nákladní letiště v Německu (<a href={adv}>ADV, 12/2025</a>). Mateřská společnost letiště, Mitteldeutsche Flughafen AG, ho označuje za největší uzel DHL na světě. Podle ní sem létá přes 45 nákladních aerolinek, dohromady do více než 160 cílů (<a href={mfagNews}>MFAG, 27. 1. 2026</a>).</p>
        <p>Letiště uvádí zhruba 70 pravidelných a charterových nákladních letů denně a World Cargo Center s plochou 20 000 m² a nepřetržitým celním odbavením (<a href={`${lej}/luftfracht/luftfracht-am-flughafen-leipzig/halle/`}>Letiště Lipsko/Halle, letecký náklad</a>). Obě dráhy mají 3 600 metrů. Kategorie CAT IIIb umožňuje přistání i za velmi špatné viditelnosti a dráhy jsou podle letiště dimenzované i pro největší letadla (kód F).</p>
        <figure className={styles.photo}><Image src="/blog/letiste-lipsko-an-124-ur-82027.webp" alt="Antonov An-124 s registrací UR-82027 z boku na odstavné ploše letiště Lipsko" width={1600} height={698} sizes={sizes} /><figcaption>An-124-100M s registrací UR-82027 a zakrytými motory. Foto: vlastní archiv FlyQueens, 24. prosince 2025.</figcaption></figure>
        <p>Na našich fotografiích z 24. prosince 2025 stojí na odstavné ploše nákladní An-124-100M s registrací UR-82027. Na trupu nese nápisy „Antonov 124-100M“, „International Cargo Transporter“ a „Be Brave Like Kharkiv“ a motory má zakryté.</p>
        <p>Proč tu Antonovy stojí, vysvětlovala v prosinci 2025 výstava v terminálu „Light and Shadow: The Antonov Story“. Připravila ji společnost Antonov a prezentovalo letiště. Podle jejího textu je Lipsko od zničení letiště Kyjev-Antonov-2 v Hostomelu v únoru 2022 základnou letadel Antonov. Zda výstava v terminálu trvá i na podzim 2026, nevíme.</p>
        <figure className={styles.photo}><Image src="/blog/letiste-lipsko-vystava-antonov.webp" alt="Nápis výstavy Light and Shadow: The Antonov Story v terminálu letiště Lipsko" width={1600} height={989} sizes={sizes} /><figcaption>Výstava o společnosti Antonov v terminálu, prosinec 2025. Foto: vlastní archiv FlyQueens.</figcaption></figure>
        <p>Další velké nákladní letadlo na našich fotkách je <Link href="/blog/boeing-747-praha-fly-meta">Boeing 747 v barvách Fly Meta</Link> při přistání v Praze.</p>

        <h2 id="vyhlidkova-terasa-a-prohlidky-letiste">Vyhlídková terasa a prohlídky letiště Lipsko</h2>
        <p>K 21. 9. 2026 je vyhlídková terasa podle webu letiště dočasně zavřená, důvod ani termín otevření neuvádí. Prohlídky letiště jsou preventivně pozastavené kvůli „aktuálnímu incidentu“ a probíhajícímu vyšetřování. Zájemce letiště zatím odkazuje na prohlídky na letišti v Drážďanech (<a href={`${lej}/fuehrungen/`}>Letiště Lipsko/Halle, prohlídky</a>).</p>
        <p>O jaký incident jde, letiště na stránce prohlídek neuvádí. V noci na 5. srpna 2026 letiště kvůli pozorovanému dronu v 0:05 zastavilo letový provoz. Od 1:55 se znovu létalo po severní dráze, jižní dráhu letiště uvolnilo 5. srpna v 18:46. Případ vyšetřuje generální státní zastupitelství v Drážďanech a saský zemský kriminální úřad. Osobní dopravu incident díky nočnímu omezení skoro nezasáhl, jedno zpožděné letadlo Marabu bylo odkloněno do Norimberku (<a href={mfagDrone}>MFAG, tisková zpráva 6. 8. 2026</a>).</p>
        <p>Za běžného provozu je terasa na střeše správní budovy ve výšce 30 metrů. Má 200 m² a vejde se na ni kolem 80 lidí. Vstup stojí 2 eura na osobu, parkovat můžete na P1 nebo P3 (<a href={`${lej}/freizeitangebote/`}>Letiště Lipsko/Halle, volný čas</a>). Mimo terasu místa ke sledování letadel u plotu neuvádíme. Dron k letišti nevozte.</p>

        <h2 id="caste-otazky-o-letisti-lipsko">Časté otázky o letišti Lipsko</h2>
        <div className={styles.faq}>
          <h3>Jak se dostanu z Prahy na letiště Lipsko?</h3>
          <p>Vlakem přes Drážďany, odkud jezdí na letiště každé dvě hodiny přímý IC. Autem po dálnici přes Drážďany a dál po A14, která má k terminálu přímý přivaděč. Aktuální spojení z Prahy najdete v jízdním řádu Českých drah nebo DB.</p>
          <h3>Kolik stojí týdenní parkování na letišti Lipsko?</h3>
          <p>Podle tarifů u závory od 67 eur na vzdáleném P20, které funguje jen od dubna do října, po 200 eur na P6 Premium mezi terminály, stav k 21. 9. 2026. Online rezervace bývá levnější, ale na P1, P3 a P4 nejde.</p>
          <h3>Je na letišti Lipsko vyhlídková terasa?</h3>
          <p>Ano, ale k 21. 9. 2026 je podle webu letiště dočasně zavřená a termín otevření není uvedený. Pozastavené jsou i prohlídky, podle letiště kvůli „aktuálnímu incidentu“ a probíhajícímu vyšetřování.</p>
          <h3>Létá se z Lipska přímo do Prahy?</h3>
          <p>V <a href="https://www.mdf-ag.com/presse/news/details/flughaefen-leipzig-halle-und-dresden-sommerflugplan-2026/">letním letovém řádu 2026</a> Česko mezi cíli není. Z Lipska se létá hlavně do turistických destinací, jako je Antalya, Mallorca nebo Hurghada, a do přestupních letišť Frankfurt, Istanbul a Vídeň.</p>
          <h3>Proč je letiště Lipsko tak důležité pro nákladní dopravu?</h3>
          <p>Mitteldeutsche Flughafen AG ho označuje za největší uzel DHL na světě. V roce 2025 tudy podle svazu letišť ADV prošlo 1,39 milionu tun nákladu, víc v Německu odbavil jen Frankfurt. Nákladní lety tu na rozdíl od osobních běží i v noci.</p>
        </div>

        <p>Pokud chcete jet hlavně kvůli letadlům, podívejte se před cestou na stránku <a href={`${lej}/freizeitangebote/`}>volnočasových nabídek letiště</a>, jestli už je terasa znovu otevřená.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/blog/boeing-747-praha-fly-meta', eyebrow: 'Nákladní letadla', title: 'Boeing 747 v Praze', description: 'Nákladní jumbo Fly Meta při přistání, vyfocené z Kněževsi.' },
          { href: '/letiste/praha/parkovani', eyebrow: 'Srovnání', title: 'Parkování u letiště Praha', description: 'Ceny a možnosti parkování u Letiště Václava Havla.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Letiště Lipsko/Halle: vlak a autobus', href: `${lej}/anreise-abreise/bus-bahn/` },
          { label: 'Letiště Lipsko/Halle: příjezd autem', href: `${lej}/anreise-abreise/auto/` },
          { label: 'Letiště Lipsko/Halle: parkování', href: `${lej}/parken/parken-am-flughafen-leipzig/halle/` },
          { label: 'Letiště Lipsko/Halle: letecký náklad', href: `${lej}/luftfracht/luftfracht-am-flughafen-leipzig/halle/` },
          { label: 'Letiště Lipsko/Halle: volnočasové nabídky a terasa', href: `${lej}/freizeitangebote/` },
          { label: 'Letiště Lipsko/Halle: prohlídky', href: `${lej}/fuehrungen/` },
          { label: 'MFAG: přehled letiště Lipsko/Halle', href: mfagOverview },
          { label: 'MFAG: vývoj provozu letišť Drážďany a Lipsko/Halle 2025, 27. 1. 2026', href: mfagNews },
          { label: 'MFAG: ochrana proti hluku a noční provoz', href: mfagNoise },
          { label: 'MFAG: informace k pozorování dronu 5. 8. 2026', href: mfagDrone },
          { label: 'MFAG: letní letový řád 2026 letišť Lipsko/Halle a Drážďany', href: 'https://www.mdf-ag.com/presse/news/details/flughaefen-leipzig-halle-und-dresden-sommerflugplan-2026/' },
          { label: 'ADV: měsíční statistika 12/2025', href: adv },
          { label: 'MDV: dopravní svaz Lipsko a Halle', href: 'https://www.mdv.de/' },
        ]} note="Zdroje ověřeny 21. září 2026, ceny parkování a stav terasy platí k tomuto datu. Fotografie pocházejí z vlastního archivu FlyQueens, datum 24. prosince 2025 vychází z názvů originálních souborů. Typ a registrace An-124 vycházejí z nápisů na trupu, v leteckém rejstříku jsme je neověřovali. Přesné stanoviště fotografa není doložené." />
      </article>
    </main>
  )
}
