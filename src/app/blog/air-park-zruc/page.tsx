import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from './page.module.css'

const post = POSTS.find((entry) => entry.slug === 'air-park-zruc')!
const title = 'Air Park Zruč: letecké muzeum u Plzně, vstupné 2026'
const description = 'Air Park Zruč u Plzně: otevírací doba, vstupné, letadla, do kterých se dá vstoupit, a jak se tam dostat MHD. S našimi fotkami z března 2026.'
const url = 'https://www.flyqueens.cz/blog/air-park-zruc'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const ap = {
  about: 'http://airpark.wz.cz/?page_id=30&lang=cs',
  prices: 'http://airpark.wz.cz/?page_id=83&lang=cs',
  contact: 'http://airpark.wz.cz/?page_id=94&lang=cs',
  planes: 'http://airpark.wz.cz/?page_id=165&lang=cs',
  inventory: 'http://airpark.wz.cz/?page_id=557&lang=cs',
}
const visitPlzen = 'https://www.visitplzen.eu/poznej-plzen/industrialni-pamatky/air-park-zruc/'
const aktualne = 'https://zpravy.aktualne.cz/ekonomika/auto/air-park-zruc-u-plzne/r~b89f8922cc4311efb689ac1f6b220ee8/'

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
      about: { '@type': 'Museum', name: 'Air Park Zruč u Plzně', address: 'Ke Křižovatce 538, 330 08 Zruč-Senec', sameAs: ['http://airpark.wz.cz/', visitPlzen] },
      image: [
        'https://www.flyqueens.cz/blog/air-park-zruc-expozice.webp',
        'https://www.flyqueens.cz/blog/air-park-zruc-letadla-na-louce.webp',
        'https://www.flyqueens.cz/blog/air-park-zruc-vrtulovy-dopravni.webp',
        'https://www.flyqueens.cz/blog/air-park-zruc-migy-slovenske.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Air Park Zruč', item: url },
      ],
    },
  ],
}

export default function AirParkZrucArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
          <Link href="/">FlyQueens</Link><span aria-hidden="true">/</span>
          <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Air Park Zruč</span>
        </nav>
        <h1>{title}</h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        <p className={styles.lead}>Air Park Zruč u Plzně je soukromé muzeum letecké a vojenské techniky na louce v obci Zruč-Senec, asi 10 kilometrů severně od Plzně (<a href={visitPlzen}>Visit Plzeň</a>). Stojí tu dopravní i vojenská letadla, vrtulníky a obrněná technika a do několika velkých strojů se dá za příplatek vstoupit. Podle webu provozovatele bývá otevřeno denně od března do října, v listopadu o víkendech a v zimě jen po telefonické domluvě. Základní vstupné pro dospělého stojí 200 Kč.</p>

        <figure className={styles.photo}><Image src="/blog/air-park-zruc-expozice.webp" alt="Letadla na louce Air Parku Zruč, vpředu stíhačka v polských barvách a za ní An-30" width={1600} height={738} sizes={sizes} preload /><figcaption>Vpředu stíhačka v polských barvách s číslem 526, za ní An-30 č. 1107 s nápisem OPEN SKIES, podle inventáře muzea unikát (<a href={ap.inventory}>Air Park</a>). Foto: vlastní archiv FlyQueens, 8. března 2026.</figcaption></figure>

        <h2>Co v Air Parku uvidíte</h2>
        <p>Na otevřené louce stojí desítky letadel, vrtulníků a pozemní vojenské techniky. Muzeum dělí exponáty na základní a speciální oddělení. Do speciálního se podle Visit Plzeň chodí jen s průvodcem ve skupinách nejvýše po čtyřech.</p>
        <p>Kolik strojů muzeum má, záleží na tom, koho se ptáte. Oficiální web s poslední aktualizací z května 2021 uvádí, že počet vystavených letadel a jejich motorů „se blíží 50 kusům“ a dalších 10 je v depozitáři (<a href={ap.planes}>Air Park, Letadla</a>). Visit Plzeň píše o více než 80 exponátech, z toho 32 letadlech a 20 kusech další vojenské techniky v základním oddělení. Miloš Tarantík v roce 2025 řekl, že letadel mají „asi osmdesát, z toho deset dopravních“ (<a href={aktualne}>Aktuálně.cz</a>).</p>
        <p>Podle ceníku je bez příplatku přístupných sedm exponátů: tank T-34, samohybné dělo SU-100, obrněný transportér OT-64, obrněný průzkumný vůz BRDM-2, vrtulník Mi-24 a stíhačky MiG-15 a MiG-19PM. K nahlédnutí je i kabina MiG-21MF (<a href={ap.prices}>Air Park, ceník</a>). Inventář na stejném webu jmenuje zčásti jiné přístupné stroje, takže se na místě může výčet lišit.</p>

        <figure className={styles.photo}><Image src="/blog/air-park-zruc-letadla-na-louce.webp" alt="Stíhačka CF-104D č. 648 a žlutý Z-37 Čmelák na louce Air Parku Zruč" width={1600} height={737} sizes={sizes} /><figcaption>Stíhačka CF-104D č. 648, před ní žlutý Z-37 Čmelák, vzadu vlevo ocas Tu-104A OK-NDF. Typy podle inventáře muzea. Foto: vlastní archiv FlyQueens, 8. března 2026.</figcaption></figure>
        <p>Za příplatek se podle ceníku dá vstoupit do vládního speciálu Tu-154M, kterým podle provozovatele létali prezidenti Václav Havel a Václav Klaus. Dále do dopravního Tu-104A, který stojí u vchodu jako poutač muzea, a do letounů Il-14T, Il-18 a An-24V (<a href={ap.prices}>Air Park, ceník</a>).</p>
        <figure className={styles.photo}><Image src="/blog/air-park-zruc-vrtulovy-dopravni.webp" alt="MiG-15SB č. 0543 a dopravní Il-14T č. 3146 v Air Parku Zruč" width={1600} height={737} sizes={sizes} /><figcaption>Vpředu MiG-15SB č. 0543 s československým znakem, za ním Il-14T č. 3146, do kterého se dá za příplatek vstoupit. Foto: vlastní archiv FlyQueens, 8. března 2026.</figcaption></figure>

        <h2>Jak muzeum vzniklo</h2>
        <p>Karel Tarantík začal se synem sbírat letadla v roce 1990, nejprve v sousední Druztové. Na louku ve Zruči přivezli první kus, vrtulník Mi-8, o Vánocích 1992 (<a href={ap.about}>Air Park, O nás</a>). Rok 1993, který uvádějí některé starší články, tedy nesedí. Karel Tarantík zemřel 25. února 2022 ve věku 72 let po pádu ze schůdků vedoucích do vrtulníku (<a href="https://plzensky.denik.cz/zpravy-region/zemrel-zakladatel-leteckeho-muzea-ve-zruci-spadl-z-jednoho-z-exponatu/">Plzeňský deník</a>). Muzeum dnes vede jeho syn Miloš Tarantík (<a href={aktualne}>Aktuálně.cz, 2025</a>).</p>
        <figure className={styles.photo}><Image src="/blog/air-park-zruc-migy-slovenske.webp" alt="Řada stříbrných stíhaček se slovenskými znaky v Air Parku Zruč" width={1600} height={737} sizes={sizes} /><figcaption>Stříbrné stíhačky se slovenskými znaky. Foto: vlastní archiv FlyQueens, 8. března 2026.</figcaption></figure>

        <h2>Otevírací doba</h2>
        <p>Od března do října je Air Park podle webu provozovatele otevřený denně od 10:00, v červenci a srpnu do 20:00, jinak do 18:00. V listopadu se otevírá jen o víkendech do 17:00. Od prosince do února je zavřeno a prohlídku lze domluvit jen telefonicky.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Období</th><th scope="col">Dny</th><th scope="col">Hodiny</th></tr></thead>
            <tbody>
              <tr><td>1. 3.–30. 6.</td><td>denně</td><td>10:00–18:00</td></tr>
              <tr><td>1. 7.–31. 8.</td><td>denně</td><td>10:00–20:00</td></tr>
              <tr><td>1. 9.–31. 10.</td><td>denně</td><td>10:00–18:00</td></tr>
              <tr><td>1. 11.–30. 11.</td><td>sobota a neděle</td><td>10:00–17:00</td></tr>
              <tr><td>1. 12.–28. 2.</td><td>zavřeno</td><td>jen po telefonické domluvě</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Podle <a href={ap.prices}>webu provozovatele</a> (poslední aktualizace květen 2021), <a href={visitPlzen}>Visit Plzeň</a> a <a href="https://www.kudyznudy.cz/aktivity/air-park-zruc-u-plzne">Kudy z nudy</a>. Stav zdrojů k 21. 9. 2026, u provozovatele zatím neověřeno.</p>
        <p>Oficiální web muzea je z května 2021 a poslední novinka na něm pochází ze začátku roku 2022. Visit Plzeň a Kudy z nudy uvádějí stejné časy.</p>

        <h2>Vstupné</h2>
        <p>Podle ceníku provozovatele stojí vstup do základního oddělení 200 Kč pro dospělého, 100 Kč pro dítě od 6 do 15 let a 50 Kč pro dítě do 6 let. Speciální oddělení stojí 200 Kč za osobu. Vstup do jednotlivých velkých letadel se platí zvlášť: 100 Kč, do Tu-154M 200 Kč.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Vstup</th><th scope="col">Dospělí</th><th scope="col">Děti 6–15 let</th><th scope="col">Děti do 6 let</th></tr></thead>
            <tbody>
              <tr><td>Základní oddělení</td><td>200 Kč</td><td>100 Kč</td><td>50 Kč</td></tr>
              <tr><td>Speciální oddělení (s průvodcem, nejvýše 4 osoby)</td><td>200 Kč</td><td>200 Kč</td><td>nevhodné</td></tr>
              <tr><td>Tu-104A</td><td>100 Kč</td><td>100 Kč</td><td>100 Kč</td></tr>
              <tr><td>Il-14T</td><td>100 Kč</td><td>100 Kč</td><td>100 Kč</td></tr>
              <tr><td>Il-18 a výstava modelů</td><td>100 Kč</td><td>100 Kč</td><td>100 Kč (nevhodné)</td></tr>
              <tr><td>An-24V</td><td>100 Kč</td><td>100 Kč</td><td>100 Kč (nevhodné)</td></tr>
              <tr><td>Tu-154M s VIP salonkem</td><td>200 Kč</td><td>200 Kč</td><td>nevhodné</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Ceník podle <a href={ap.prices}>webu provozovatele</a> (aktualizace květen 2021) a <a href={visitPlzen}>Visit Plzeň</a>. Stav zdrojů k 21. 9. 2026, u provozovatele zatím neověřeno.</p>
        <p>Ceník z roku 2021 popisuje vstupy do letadel jako prohlídky s výkladem majitele. Jestli probíhají stejně i dnes, web neuvádí. Fotografování a natáčení je podle ceníku zdarma. Platbu kartou provozovatel nezmiňuje, vezměte si proto hotovost.</p>

        <h2>Jak se tam dostat</h2>
        <p>Air Park najdete na adrese Ke Křižovatce 538, Zruč-Senec (<a href={ap.contact}>Air Park, Kontakt</a>). Z Plzně tam jezdí linka MHD 58 a některé spoje linky 20, zastávka Zruč - Senec, rozc. (<a href={visitPlzen}>Visit Plzeň</a>, <a href="https://jizdnirady.pmdp.cz/">jízdní řády PMDP</a>). Zastávka je od areálu vzdušnou čarou zhruba 400 až 450 metrů daleko.</p>
        <p>Autem zaparkujete přímo u muzea. Provozovatel upozorňuje, že parkoviště částečně zastiňuje křídlo Tu-104A (<a href={ap.about}>Air Park, O nás</a>). Kapacitu ani cenu parkování neuvádí.</p>

        <h2>Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Můžu do Air Parku vzít psa?</h3>
          <p>Ano. Podle ceníku na webu provozovatele smějí psi do areálu na vodítku a majitelé po nich mají uklízet.</p>
          <h3>Dá se v Air Parku fotit?</h3>
          <p>Ano, fotografování i natáčení je zdarma. V červenci a srpnu je otevřeno až do 20:00, což dává prostor i pro focení v podvečer.</p>
          <h3>Kolik času si na návštěvu vyhradit?</h3>
          <p><a href="https://www.kudyznudy.cz/aktivity/air-park-zruc-u-plzne">Kudy z nudy</a> uvádí zhruba dvě hodiny. Pokud chcete jít i do speciálního oddělení a dovnitř letadel, počítejte s delší dobou, protože se chodí s průvodcem v malých skupinách.</p>
          <h3>Platí se v Air Parku kartou?</h3>
          <p>Provozovatel to na webu neuvádí a nezmiňují to ani Visit Plzeň nebo Kudy z nudy. Vezměte si proto hotovost. Pro rodinu se dvěma dětmi a jedním vstupem do letadla počítejte podle ceníku s několika sty korunami, zjistit si to můžete i telefonicky předem.</p>
        </div>

        <p>Než vyrazíte, zavolejte provozovateli na 606 945 360. Ověříte si aktuální otevírací dobu i to, jestli probíhají placené prohlídky letadel. A pokud vás po návštěvě láká vidět letadla i ve vzduchu, zkuste <Link href="/letiste/praha/planespotting">planespotting v Praze</Link> nebo si otevřete <Link href="/radar">radar letadel</Link> a podívejte se, co zrovna letí nad Plzní.</p>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha/planespotting', eyebrow: 'Kam za letadly', title: 'Planespotting v Praze', description: 'Vyhlídkové valy v Kněževsi a u Hostivice, přístup a vlastní fotografie.' },
          { href: '/blog/boeing-747-praha-fly-meta', eyebrow: 'Vlastní fotografie', title: 'Boeing 747 v Praze', description: 'Nákladní jumbo Fly Meta při přistání, vyfocené z Kněževsi.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Air Park Zruč u Plzně: O nás', href: ap.about },
          { label: 'Air Park Zruč u Plzně: otevírací doba a vstupné', href: ap.prices },
          { label: 'Air Park Zruč u Plzně: Letadla', href: ap.planes },
          { label: 'Air Park Zruč u Plzně: inventář, základní oddělení', href: ap.inventory },
          { label: 'Air Park Zruč u Plzně: Kontakt', href: ap.contact },
          { label: 'Visit Plzeň: Air Park Zruč', href: visitPlzen },
          { label: 'Kudy z nudy: Air Park Zruč u Plzně', href: 'https://www.kudyznudy.cz/aktivity/air-park-zruc-u-plzne' },
          { label: 'Jízdní řády PMDP', href: 'https://jizdnirady.pmdp.cz/' },
          { label: 'Plzeňský deník: zemřel zakladatel leteckého muzea ve Zruči, 27. 2. 2022', href: 'https://plzensky.denik.cz/zpravy-region/zemrel-zakladatel-leteckeho-muzea-ve-zruci-spadl-z-jednoho-z-exponatu/' },
          { label: 'Aktuálně.cz: rozhovor s Milošem Tarantíkem, 10. 1. 2025', href: aktualne },
        ]} note="Zdroje ověřeny 21. září 2026. Web provozovatele má poslední aktualizaci z května 2021, otevírací dobu a ceník pro rok 2026 provozovatel zatím nepotvrdil. Fotografie pocházejí z vlastního archivu FlyQueens, datum 8. března 2026 vychází z názvů originálních souborů." />
      </article>
    </main>
  )
}
