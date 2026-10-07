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

const post = POSTS.find((entry) => entry.slug === 'powerbanka-do-letadla')!
const title = 'Powerbanka do letadla: limit 100 Wh a kam ji dát'
const description = 'Powerbanka patří jen do příručního zavazadla a smí mít nejvýš 100 Wh, tedy zhruba 27 000 mAh. Kam ji uložit, proč ne nad hlavu a kolik kusů smíte vzít.'
const url = 'https://www.flyqueens.cz/blog/powerbanka-do-letadla'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const prg = 'https://www.prg.aero/predmety-jejichz-preprava-je-nejcasteji-dotazovana'
const ryanair = 'https://www.ryanair.com/cz/cs/centrum-pomoci/podminky/vseobecne-podminky-prepravy'
const smartwings = 'https://www.smartwings.com/mohu-prevazet-baterie'
const fotoPowerbanka = 'https://commons.wikimedia.org/wiki/File:2023_Powerbank_Green_Cell_PowerPlay_20_(2).jpg'

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
      image: [
        'https://www.flyqueens.cz/blog/powerbanka-do-letadla.webp',
        'https://www.flyqueens.cz/blog/ryanair-737-nastup.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Powerbanka do letadla', item: url },
      ],
    },
  ],
}

export default function PowerbankaDoLetadlaArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Powerbanka do letadla"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Powerbanka smí jen do příručního zavazadla a její kapacita nesmí přesáhnout 100 Wh. Do odbaveného kufru nepatří vůbec a u Ryanairu ani u Smartwings nesmí ani do schránky nad sedadly: musíte ji mít u sebe nebo v tašce pod sedadlem. Na obalu ale bývají miliampérhodiny, ne watthodiny, takže si to musíte přepočítat.</p>

        <figure className={styles.photo}><Image src="/blog/powerbanka-do-letadla.webp" alt="Černá powerbanka s porty USB a USB-C a čtyřmi kontrolkami nabití" width={1600} height={1191} sizes={sizes} preload /><figcaption>Kapacita bývá natištěná na spodní straně. Rozhoduje údaj ve watthodinách. Foto: <a href={fotoPowerbanka}>Jacek Halicki, Wikimedia Commons</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>, zmenšeno.</figcaption></figure>

        <ArticleContents items={[
          { id: 'limit', label: 'Kolik watthodin smí powerbanka mít' },
          { id: 'mah-na-wh', label: 'Jak převést mAh na Wh' },
          { id: 'kam-ulozit', label: 'Kam powerbanku uložit' },
          { id: 'nabijeni', label: 'Nabíjení na palubě' },
          { id: 'pocet', label: 'Kolik kusů si můžete vzít' },
          { id: 'dopravci', label: 'Ryanair a Smartwings: v čem se liší' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="limit">Kolik watthodin smí powerbanka mít</h2>
        <p>Hranice je <strong>100 Wh</strong>. Letiště Václava Havla to píše jasně: lithiové baterie a powerbanky jsou povolené pouze v příručním zavazadle a výkon baterie nesmí přesáhnout 100 Wh. U silnějších baterií doporučuje obrátit se na leteckou společnost (<a href={prg}>Letiště Praha</a>).</p>
        <p>Pod sto watthodin se vejde drtivá většina běžných powerbank, takže většiny cestujících se limit vůbec netýká. Pozor si dejte u velkých kusů určených k nabíjení notebooků.</p>

        <h2 id="mah-na-wh">Jak převést mAh na Wh</h2>
        <p>Na krabici bývají miliampérhodiny, předpisy mluví o watthodinách. Přepočet je jednoduchý:</p>
        <p><strong>Wh = (mAh ÷ 1000) × napětí článků</strong>. Lithiové články mívají 3,6 nebo 3,7 V.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Kapacita</th><th scope="col">Při 3,7 V</th><th scope="col">Projde?</th></tr></thead>
            <tbody>
              <tr><td>5 000 mAh</td><td>18,5 Wh</td><td>ano</td></tr>
              <tr><td>10 000 mAh</td><td>37 Wh</td><td>ano</td></tr>
              <tr><td>20 000 mAh</td><td>74 Wh</td><td>ano</td></tr>
              <tr><td>27 000 mAh</td><td>99,9 Wh</td><td>na hraně</td></tr>
              <tr><td>30 000 mAh</td><td>111 Wh</td><td>ne</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Vlastní výpočet podle vzorce výše, napětí 3,7 V. U článků se 3,6 V vyjdou čísla o něco nižší. Rozhoduje vždy hodnota natištěná na samotné powerbance; když tam watthodiny jsou, neřešte přepočet. Powerbanku nad 100 Wh Ryanair ani Smartwings nepustí na palubu ani se souhlasem.</p>

        <h2 id="kam-ulozit">Kam powerbanku uložit</h2>
        <p>Do odbaveného zavazadla nesmí. Shodně to uvádí Ryanair, Smartwings i Letiště Praha, které tohle pravidlo píše obecně pro všechny lety. V kabině může posádka na hořící baterii hned zareagovat, v zavazadlovém prostoru by si jí nikdo nevšiml.</p>
        <p>Méně známé je druhé pravidlo. Ryanair i Smartwings shodně zakazují dávat powerbanku <strong>do schránky nad sedadly</strong>. Máte ji mít u sebe nebo v tašce pod sedadlem před vámi, aby posádka poznala, že se něco děje (<a href={ryanair}>Ryanair, článek 8.4.3</a>; <a href={smartwings}>Smartwings</a>).</p>
        <p>Každá baterie musí být chráněná proti zkratu. Stačí původní obal, přelepené svorky nebo samostatný sáček.</p>

        <h2 id="nabijeni">Nabíjení na palubě</h2>
        <p>Samotnou powerbanku za letu dobíjet nesmíte. Ryanair to zakazuje výslovně, včetně případu, kdy jedna powerbanka dobíjí druhou.</p>
        <p>Opačným směrem to jde, ale s výhradou: nabíjet z powerbanky telefon nebo notebook smíte, <strong>kromě pojíždění, vzletu a přistání</strong> a kromě situace, kdy posádka řekne jinak. Smartwings je přísnější a nabíjení za letu nepovoluje.</p>

        <h2 id="pocet">Kolik kusů si můžete vzít</h2>
        <p>Ryanair to má rozepsané nejpodrobněji. Pouští do kabiny až 15 osobních elektronických zařízení a až 20 náhradních lithiových baterií do 100 Wh, ale <strong>powerbanky z toho smí být nejvýš dvě</strong>. Smartwings povoluje rovněž <strong>dvě náhradní baterie na cestujícího</strong>.</p>
        <p>U obou dopravců tedy dvě powerbanky projdou. Kdo vozí víc baterií, například kvůli fotoaparátu nebo dronu, ať si podmínky přečte předem u svého dopravce.</p>

        <h2 id="dopravci">Ryanair a Smartwings: v čem se liší</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Pravidlo</th><th scope="col">Ryanair</th><th scope="col">Smartwings</th></tr></thead>
            <tbody>
              <tr><td>Powerbanka do 100 Wh</td><td>jen v kabině</td><td>jen v kabině</td></tr>
              <tr><td>Powerbanka 100 až 160 Wh</td><td>nepovoleno</td><td>nepovoleno</td></tr>
              <tr><td>Náhradní baterie 100 až 160 Wh</td><td>nepovoleno</td><td>do kabiny jen se souhlasem dopravce</td></tr>
              <tr><td>Počet powerbank</td><td>nejvýš 2 (z celkem 20 baterií)</td><td>nejvýš 2 náhradní baterie</td></tr>
              <tr><td>Schránka nad sedadly</td><td>zakázáno</td><td>zakázáno</td></tr>
              <tr><td>Nabíjení z powerbanky za letu</td><td>ano, mimo pojíždění, vzlet a přistání</td><td>ne</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: <a href={ryanair}>Všeobecné podmínky přepravy Ryanair, článek 8.4</a>, znění z 25. 6. 2026, a <a href={smartwings}>Smartwings, Letecký převoz baterií</a>, obojí ke 28. 9. 2026. U jiných dopravců se pravidla liší, ověřte si je před cestou.</p>
        <p>Pozor na pásmo 100 až 160 Wh. Smartwings tam má jiné pravidlo pro powerbanku a jiné pro náhradní baterii do přístroje: powerbanka je zakázaná, náhradní baterie projde se souhlasem dopravce.</p>

        <figure className={styles.photo}><Image src="/blog/ryanair-737-nastup.webp" alt="Cestující nastupují po schodech do Boeingu 737 společnosti Ryanair" width={1600} height={738} sizes={sizes} /><figcaption>Když vám zavazadlo berou u schodů do zavazadlového prostoru, vytáhněte z něj powerbanku ještě tady. Foto: vlastní archiv FlyQueens, květen 2026.</figcaption></figure>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Jakou největší powerbanku si můžu vzít do letadla?</h3>
          <p>Do 100 Wh, což při napětí 3,7 V odpovídá zhruba 27 000 mAh. Silnější powerbanku Ryanair ani Smartwings nepustí na palubu vůbec. Letiště Praha u takových baterií doporučuje obrátit se na dopravce, protože pravidla se liší.</p>
          <h3>Může powerbanka do odbaveného zavazadla?</h3>
          <p>Ne. Patří výhradně do kabiny, u sebe nebo v tašce pod sedadlem.</p>
          <h3>Můžu si v letadle nabíjet telefon z powerbanky?</h3>
          <p>U Ryanairu ano, kromě pojíždění, vzletu a přistání. Smartwings nabíjení za letu nepovoluje. Samotnou powerbanku dobíjet nesmíte nikde.</p>
          <h3>Kolik powerbank si můžu vzít?</h3>
          <p>Dvě. Platí to u Ryanairu i u Smartwings.</p>
          <h3>Co když mám powerbanku 20 000 mAh?</h3>
          <p>Ta se vejde. Při 3,7 V jde o 74 Wh, tedy pod hranicí sta watthodin.</p>
        </div>

        <p>Zavazadlová pravidla u Ryanairu rozebíráme v samostatném článku o <Link href="/blog/prirucni-zavazadlo-ryanair">příručním zavazadle</Link>. Odlety z Prahy najdete na stránce <Link href="/letiste/praha">Letiště Praha</Link>.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/blog/prirucni-zavazadlo-ryanair">Příruční zavazadlo Ryanair</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/blog/prirucni-zavazadlo-ryanair', eyebrow: 'Zavazadla', title: 'Příruční zavazadlo Ryanair', description: 'Rozměry, váhy a co máte v ceně letenky.' },
          { href: '/blog/prirucni-zavazadlo-do-letadla', eyebrow: 'Zavazadla', title: 'Příruční zavazadlo do letadla', description: 'Rozměry a váhy podle Ryanairu, Wizz Airu, easyJetu, Smartwings a Lufthansy.' },
          { href: '/letiste/praha', eyebrow: 'Před odletem', title: 'Letiště Praha', description: 'Odlety, přílety, doprava na letiště a parkování.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Letiště Praha: předměty, jejichž přeprava je nejčastěji dotazována', href: prg },
          { label: 'Ryanair: Všeobecné podmínky přepravy, článek 8.4 (znění z 25. 6. 2026)', href: ryanair },
          { label: 'Smartwings: Letecký převoz baterií', href: smartwings },
          { label: 'Wikimedia Commons: fotografie powerbanky', href: fotoPowerbanka },
        ]} note="Pravidla ověřena 28. září 2026 u Letiště Praha, Ryanairu a Smartwings. Přepočet miliampérhodin na watthodiny je vlastní výpočet podle uvedeného vzorce; rozhoduje údaj natištěný na powerbance. Dopravci mimo uvedené dva mohou mít pravidla jiná." />
      </article>
    </main>
  )
}
