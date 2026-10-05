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

const post = POSTS.find((entry) => entry.slug === 'hangar-7-salzburg')!
const title = 'Hangar-7 Salzburg: vstup zdarma a co uvnitř uvidíte'
const description = 'Hangar-7 u letiště Salzburg vystavuje letuschopnou letku The Flying Bulls. Vstup zdarma, otevírací doba, jak se tam dostanete a proč letadlo nemusí být v hale.'
const url = 'https://www.flyqueens.cz/blog/hangar-7-salzburg'
const faq = 'https://www.hangar-7.com/en/service-info/faqs'
const doprava = 'https://www.hangar-7.com/en/service-info/contact-directions'
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
      publisher: PUBLISHER_JSON_LD,
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      about: {
        '@type': 'TouristAttraction', name: 'Red Bull Hangar-7', sameAs: 'https://www.hangar-7.com/',
        address: { '@type': 'PostalAddress', streetAddress: 'Wilhelm-Spazier-Straße 7A', postalCode: '5020', addressLocality: 'Salzburg', addressCountry: 'AT' },
      },
      image: [`https://www.flyqueens.cz${post.image}`],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Hangar-7 Salzburg', item: url },
      ],
    },
  ],
}

export default function Hangar7SalzburgArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Hangar-7 Salzburg"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>

        <p className={styles.lead}>
          Hangar-7 je prosklená hala u letiště Salzburg, ve které Red Bull vystavuje letku historických
          letadel The Flying Bulls. Vstup do výstavní části je zdarma a otevřeno je dlouho do večera,
          takže se dá stihnout i cestou odjinud. Jednu věc ale čekejte: stroje jsou letuschopné a část
          roku prostě nejsou doma.
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Hodnota</th></tr></thead>
            <tbody>
              <tr><td>Otevřeno</td><td>pondělí až sobota 9.00 až 22.00, neděle a svátky 9.00 až 17.00</td></tr>
              <tr><td>Vstupné do výstavní části</td><td>zdarma</td></tr>
              <tr><td>Parkování u objektu</td><td>zdarma</td></tr>
              <tr><td>Adresa</td><td>Wilhelm-Spazier-Straße 7A, 5020 Salzburg</td></tr>
              <tr><td>Doprava</td><td>autobus číslo 10 z letiště i z centra Salzburgu</td></tr>
              <tr><td>Kolik času si nechat</td><td>zhruba hodinu, s fotografováním víc</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>
          Zdroje: <a href={faq}>časté dotazy provozovatele</a> a <a href={doprava}>stránka kontaktu a dopravy</a>.
          Oficiální web se z našeho prostředí nedal otevřít přímo, údaje jsou proto z výsledků vyhledávání,
          které tyto stránky citují. Před cestou si otevírací dobu potvrďte, hala se zavírá kvůli soukromým akcím.
        </p>

        <figure className={styles.photo}>
          <Image src={post.image} alt={post.imageAlt} width={post.imageWidth} height={post.imageHeight} sizes={sizes} preload />
          <figcaption>Prosklená hala Hangaru-7 stojí přímo u letiště Salzburg. Foto: vlastní archiv FlyQueens.</figcaption>
        </figure>

        <ArticleContents items={[
          { id: 'co-je-hangar-7', label: 'Co je Hangar-7?' },
          { id: 'jaka-letadla-v-hangaru-7-uvidite', label: 'Jaká letadla v Hangaru-7 uvidíte?' },
          { id: 'proc-tam-letadlo-nemusi-byt', label: 'Proč tam letadlo nemusí být?' },
          { id: 'jak-se-do-hangaru-7-dostanete', label: 'Jak se do Hangaru-7 dostanete?' },
          { id: 'da-se-tu-najist-a-koukat-na-letadla', label: 'Dá se tu najíst a koukat na letadla?' },
          { id: 'co-se-da-videt-na-letisti-salzburg', label: 'Co se dá vidět na letišti Salzburg?' },
          { id: 'kdy-jet-aby-tam-nebylo-narvano', label: 'Kdy jet, aby tam nebylo narváno?' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="co-je-hangar-7">Co je Hangar-7?</h2>
        <p>
          Výstavní hala z oceli a skla u odbavovací plochy letiště Salzburg. Postavili ji pro letku
          The Flying Bulls, která vznikla v roce 1999, a kromě letadel se v ní objevují vrtulníky,
          formule a měnící se výstavy. Dvě návštěvy po sobě proto nemusí vypadat stejně.
        </p>
        <p>
          Není to muzeum v obvyklém smyslu. Hala slouží i jako místo pro akce a provoz letky, takže
          otevírací doba není nedotknutelná a část prostoru může být zavřená.
        </p>

        <h2 id="jaka-letadla-v-hangaru-7-uvidite">Jaká letadla v Hangaru-7 uvidíte?</h2>
        <p>
          Největší exponát je čtyřmotorový <strong>Douglas DC-6B</strong> z roku 1958, který kdysi
          sloužil jugoslávskému prezidentu Titovi. Hala byla navržená tak, aby se pod ni vešel bez
          podpůrných sloupů.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Stroj</th><th scope="col">Čím je zajímavý</th></tr></thead>
            <tbody>
              <tr><td>Douglas DC-6B</td><td>srdce sbírky, rok 1958, dříve letadlo J. B. Tita</td></tr>
              <tr><td>Lockheed P-38 Lightning</td><td>dvoutrupá stíhačka druhé světové války, letuschopných kusů je po světě pár</td></tr>
              <tr><td>North American B-25J Mitchell</td><td>dvoumotorový bombardér, v Evropě se potká jen výjimečně</td></tr>
              <tr><td>Chance Vought F4U-4 Corsair</td><td>palubní stíhačka s lomeným křídlem</td></tr>
              <tr><td>Alpha Jet</td><td>odzbrojené cvičné proudové stroje, se kterými letka létá ukázky</td></tr>
              <tr><td>Bell AH-1 Cobra, Pilatus PC-6</td><td>bojový vrtulník a jednomotorový stroj pro krátký vzlet</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Složení sbírky podle provozovatele. Který stroj v hale zastihnete, se mění.</p>

        <h2 id="proc-tam-letadlo-nemusi-byt">Proč tam letadlo nemusí být?</h2>
        <p>
          Protože letadla The Flying Bulls nejsou exponáty za provazem. Všechna jsou udržovaná jako
          letuschopná a v sezoně létají na letecké dny po Evropě. Když je letka pryč, konkrétní stroj
          v hale není.
        </p>
        <p>
          Údržba se navíc dělá v sousedním Hangaru-8, kam se veřejnost nedostane. Nikdo vám tedy nemůže
          slíbit, že uvidíte přesně to letadlo, kvůli kterému jedete. Když vám jde o jeden konkrétní,
          napište provozovateli předem. Větší šanci máte v dopoledních hodinách v pracovní den a mimo
          sezonu leteckých dnů.
        </p>

        <h2 id="jak-se-do-hangaru-7-dostanete">Jak se do Hangaru-7 dostanete?</h2>
        <p>
          Adresa je Wilhelm-Spazier-Straße 7A, 5020 Salzburg, tedy přímo u letiště. Autobus číslo 10
          staví prakticky u objektu a je to ta samá linka, která jezdí mezi letištěm a centrem
          Salzburgu. Parkování venku je podle provozovatele zdarma a prostory jsou bezbariérové.
        </p>
        <p>
          Přímé letadlo z Prahy do Salzburgu nečekejte, spojení vede po zemi: vlakem jede přímý
          EuroCity rakouských ÖBB, autem se jede přes Linec. Pokud do Salzburgu přilétáte odjinud,
          máte Hangar-7 přes silnici od terminálu a vejde se i do delšího přestupu.
        </p>

        <h2 id="da-se-tu-najist-a-koukat-na-letadla">Dá se tu najíst a koukat na letadla?</h2>
        <p>
          V hale funguje pět podniků a dva z nich stojí za zmínku i kvůli výhledu.
          <strong> Mayday Bar</strong> je ve druhém patře prosklené věže a okna vedou do výstavní haly,
          takže sedíte nad historickými stroji. <strong>Threesixty Bar</strong> se dá dojít po úzké
          lávce a má skleněnou podlahu, pod nohama tedy máte letadla a formule.
        </p>
        <p>
          <strong>Restaurant Ikarus</strong> drží michelinskou hvězdu a vaří v neobvyklém režimu:
          každý měsíc tu kuchyni přebírá jiný hostující šéfkuchař. Sem je potřeba rezervovat.
          Na kávu a zákusek stačí přijít, k tomu je <strong>Carpe Diem Lounge-Café</strong>.
        </p>

        <h2 id="co-se-da-videt-na-letisti-salzburg">Co se dá vidět na letišti Salzburg?</h2>
        <p>
          Letiště W. A. Mozarta leží čtyři kilometry od centra a má dva terminály. Druhý z nich,
          „amadeus“, vznikl kvůli nárazovému provozu: v zimě se tu v sobotu odbavují charterové lety
          za sněhem. Pokud chcete Hangar-7 spojit s koukáním na skutečný provoz, zimní sobota je proto
          nadějnější než všední den v květnu.
        </p>
        <p>
          Co nad Salzburgem letí právě teď, uvidíte na <Link href="/radar">radaru letadel</Link>,
          když přepnete oblast na Alpy a Itálii.
        </p>

        <h2 id="kdy-jet-aby-tam-nebylo-narvano">Kdy jet, aby tam nebylo narváno?</h2>
        <p>
          Zájem Čechů o Hangar-7 je podle dat Marketing Mineru jasně letní: v červenci se dotaz hledá
          přibližně 1 500krát za měsíc, v listopadu kolem 450krát. Hala má přitom otevřeno celý rok a
          v týdnu do deseti večer, takže nejklidnější je návštěva mimo letní špičku a spíš k večeru.
        </p>
        <p>
          Jen pozor na protichůdné zájmy. Večer a mimo sezonu bývá klid, ale dopoledne v pracovní den
          je větší šance, že letka bude doma. Vybrat si můžete jen jedno.
        </p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Platí se vstup?</h3>
          <p>Do výstavní části ne. Restaurace a bary jsou běžně placené a do Ikaru se rezervuje.</p>

          <h3>Jak dlouho tam být?</h3>
          <p>Na projití sbírky stačí zhruba hodina. Kdo fotí, zůstane déle.</p>

          <h3>Můžu přijít se skupinou?</h3>
          <p>Ano, skupiny mají vstup také zdarma, ale musí se ohlásit dopředu.</p>

          <h3>Uvidím konkrétní letadlo?</h3>
          <p>Zaručit to nelze. Stroje létají a údržba je v nepřístupném Hangaru-8. Napište předem.</p>

          <h3>Je to vhodné s dětmi?</h3>
          <p>Prostory jsou bezbariérové a letadla jsou vidět zblízka. Hala je ale výstavní, ne herní.</p>
        </div>

        <AuthorCard />

        <RelatedReading
          items={[
            relatedCard('/blog/letiste-tivat'),
            relatedCard('/blog/letiste-lipsko'),
            relatedCard('/blog/jak-vysoko-letaji-letadla'),
          ]}
        />

        <SourcesBox
          sources={[
            { label: 'Red Bull Hangar-7, časté dotazy: otevírací doba, vstup a skupiny', href: faq },
            { label: 'Red Bull Hangar-7, kontakt a doprava na místo', href: doprava },
            { label: 'Red Bull Hangar-7, letka The Flying Bulls', href: 'https://www.hangar-7.com/en/museum/the-flying-bulls' },
            { label: 'Red Bull Hangar-7, Mayday Bar a Threesixty Bar', href: 'https://www.hangar-7.com/en/cocktailbar-salzburg' },
            { label: 'Red Bull Hangar-7, Restaurant Ikarus', href: 'https://www.hangar-7.com/en/culinary/restaurant-ikarus' },
            { label: 'Salzburg.info, Hangar-7 mezi muzei ve Salzburgu', href: 'https://www.salzburg.info/cs/informace/salzburg-a-z/hangar-7-aviation-museum_az_13103' },
            { label: 'Letiště Salzburg, veřejná doprava na letiště', href: 'https://www.salzburg-airport.com/en/flights-arrival/arrival-to-the-airport/public-transportation' },
          ]}
          note="Údaje ověřeny 5. října 2026 z výsledků vyhledávání, které citují uvedené stránky; oficiální web se z našeho prostředí nedal otevřít přímo, proto mají otevírací doba a vstupné střední jistotu. Rešerše nenahrazuje osobní návštěvu. Hledanost je údaj Marketing Mineru pro český trh, ne příslib návštěvnosti."
        />
      </article>
    </main>
  )
}
