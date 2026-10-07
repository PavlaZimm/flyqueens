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

const post = POSTS.find((entry) => entry.slug === 'prirucni-zavazadlo-ryanair')!
const title = 'Příruční zavazadlo Ryanair: rozměry a co je zdarma'
const description = 'Ryanair dává zdarma jen malou tašku 40 × 30 × 20 cm pod sedadlo. Kufr 55 × 40 × 20 cm a 10 kg patří k přednostnímu nástupu. Přehled rozměrů a vah k 28. 9. 2026.'
const url = 'https://www.flyqueens.cz/blog/prirucni-zavazadlo-ryanair'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const pravidla = 'https://help.ryanair.com/hc/cs/articles/12888036565521-Pravidla-pro-zavazadla-spole%C4%8Dnosti-Ryanair'
const centrum = 'https://help.ryanair.com/hc/cs/categories/13024346487441-Zavazadla'
const merakFoto = 'https://commons.wikimedia.org/wiki/File:Ryanair_vs_Wizz_Air_baggage_sizer.jpg'
const podminky = 'https://www.ryanair.com/cz/cs/centrum-pomoci/podminky/vseobecne-podminky-prepravy'

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
      about: { '@type': 'Airline', name: 'Ryanair', iataCode: 'FR', sameAs: 'https://www.ryanair.com' },
      image: [
        'https://www.flyqueens.cz/blog/ryanair-737-bok.webp',
        'https://www.flyqueens.cz/blog/merak-prirucniho-zavazadla.webp',
        'https://www.flyqueens.cz/blog/ryanair-737-zavazadlove-voziky.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Příruční zavazadlo Ryanair', item: url },
      ],
    },
  ],
}

export default function PrirucniZavazadloRyanairArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Příruční zavazadlo Ryanair"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>V ceně letenky máte u Ryanairu jednu malou tašku 40 × 30 × 20 cm, která se musí vejít pod sedadlo před vámi. Kufr do přihrádky nad hlavou v základním tarifu není: smí vážit 10 kg, měřit 55 × 40 × 20 cm a patří k přednostnímu nástupu, který je součástí dražších balíčků. Starší cedule u bran přitom pořád uvádějí jiná čísla než dnešní pravidla.</p>

        <figure className={styles.photo}><Image src="/blog/ryanair-737-bok.webp" alt="Boeing 737 společnosti Ryanair na odbavovací ploše, u zadních dveří stojí nástupní schody" width={1600} height={738} sizes={sizes} preload /><figcaption>Boeing 737 Ryanairu u nástupních schodů, květen 2026. Foto: vlastní archiv FlyQueens.</figcaption></figure>

        <ArticleContents items={[
          { id: 'co-je-zdarma', label: 'Co máte v ceně letenky' },
          { id: 'prednostni-nastup', label: 'Kufr nad hlavu jen s přednostním nástupem' },
          { id: 'rozmery-a-vahy', label: 'Rozměry a váhy v přehledu' },
          { id: 'stare-rozmery', label: 'Proč mají staré cedule jiná čísla' },
          { id: 'deti', label: 'Zavazadla pro kojence a děti' },
          { id: 'ceny', label: 'Kolik to stojí' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="co-je-zdarma">Co máte v ceně letenky</h2>
        <p>Každý tarif Ryanairu obsahuje jedno malé osobní zavazadlo o rozměrech <strong>40 × 30 × 20 cm</strong>. Dopravce jako příklad uvádí kabelku nebo tašku na notebook a jednu podmínku opakuje na několika místech: musí se vejít pod sedadlo před vámi (<a href={pravidla}>Ryanair, Pravidla pro zavazadla</a>).</p>
        <p>Nic jiného zdarma není. Když si chcete vzít kufr do přihrádky nad hlavou nebo odbavit zavazadlo do nákladového prostoru, připlácíte si.</p>

        <h2 id="prednostni-nastup">Kufr nad hlavu jen s přednostním nástupem</h2>
        <p>Ryanair neprodává palubní kufr samostatně. Je součástí služby <strong>Přednostní nástup do letadla a 2 palubní zavazadla</strong>. Dostanete s ní tři věci: malou tašku pod sedadlo, kufr <strong>10 kg o rozměrech 55 × 40 × 20 cm</strong> do přihrádky nad hlavou a přednostní frontu u odletové brány. Podle podmínek přepravy je táž služba součástí balíčků Regular a Flexi Plus, takže pokud letíte na některý z nich, kufr už zaplacený máte (<a href={podminky}>článek 8.3.2</a>).</p>
        <p>Přednostní nástup se na obsazených letech vyprodává a Ryanair na to má v nápovědě samostatnou odpověď. Pokud tedy s kufrem počítáte, kupte si ho spolu s letenkou, ne den před odletem.</p>
        <p>Nad rámec limitu smíte na palubu vzít ještě tašku se zbožím z bezcelního obchodu (<a href={podminky}>článek 8.3.5</a>).</p>

        <figure className={styles.photo}><Image src="/blog/merak-prirucniho-zavazadla.webp" alt="Modrý měřák zavazadel Ryanairu vedle růžového měřáku Wizz Airu v odletové hale" width={1200} height={1600} sizes={sizes} /><figcaption>Měřáky u brány: vlevo Ryanair, vpravo Wizz Air. Cedule Ryanairu na snímku z roku 2023 ještě uvádí malé zavazadlo 40 × 20 × 25 cm, dnes platí 40 × 30 × 20 cm. Foto: <a href={merakFoto}>Stephen Johnes, Wikimedia Commons</a>, volné dílo, zmenšeno.</figcaption></figure>

        <h2 id="rozmery-a-vahy">Rozměry a váhy v přehledu</h2>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Zavazadlo</th><th scope="col">Rozměry</th><th scope="col">Váha</th><th scope="col">V ceně</th></tr></thead>
            <tbody>
              <tr><td>Malé osobní zavazadlo pod sedadlo</td><td>40 × 30 × 20 cm</td><td>neuvedena</td><td>ano, v každém tarifu</td></tr>
              <tr><td>Palubní kufr nad hlavu</td><td>55 × 40 × 20 cm</td><td>10 kg</td><td>ne, jen s přednostním nástupem</td></tr>
              <tr><td>Odbavené zavazadlo 10 kg</td><td>rozměry upřesňuje dopravce v rezervaci</td><td>10 kg</td><td>ne</td></tr>
              <tr><td>Odbavené zavazadlo 20 kg</td><td>tamtéž, až 3 kusy na rezervaci</td><td>20 kg</td><td>ne</td></tr>
              <tr><td>Odbavené zavazadlo 23 kg</td><td>tamtéž, 1 kus na rezervaci</td><td>23 kg</td><td>ne</td></tr>
              <tr><td>Dětské zavazadlo u dítěte na klíně</td><td>45 × 35 × 20 cm</td><td>do 5 kg</td><td>ano</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={pravidla}>Ryanair, Pravidla pro zavazadla společnosti Ryanair</a>, stav k 28. 9. 2026. U malého zavazadla dopravce váhu neuvádí, rozhoduje rozměr a to, že se vejde pod sedadlo.</p>

        <h2 id="stare-rozmery">Proč mají staré cedule jiná čísla</h2>
        <p>Na fotce výše má cedule Ryanairu z roku 2023 u malého zavazadla rozměr <strong>40 × 20 × 25 cm</strong>. V nápovědě dopravce dnes stojí <strong>40 × 30 × 20 cm</strong>. Z rozměrů vychází 20 litrů proti 24, takže dnešní taška je o pětinu objemnější a má jiný tvar: vyšší a mělčí.</p>
        <p>Starší rozměr proto pořád koluje v článcích i na některých měřácích. Datum změny Ryanair nikde neuvádí. Řiďte se číslem v nápovědě dopravce a v e-mailu k rezervaci, ne cedulí, kterou někdo vyfotil před lety.</p>

        <h2 id="deti">Zavazadla pro kojence a děti</h2>
        <p>Kojenec, tedy dítě od 8 dnů do 23 měsíců včetně, nemá vlastní palubní zavazadlo zdarma. Zato můžete pro každé dítě zdarma vzít <strong>dvě části dětského vybavení</strong>, typicky kočárek a autosedačku.</p>
        <p>Dospělý, který letí s dítětem na klíně, si navíc smí vzít dětské zavazadlo do <strong>5 kg o rozměrech 45 × 35 × 20 cm</strong>. Samotné dítě na klíně přitom podle podmínek přepravy nárok na malé palubní zavazadlo nemá.</p>

        <figure className={styles.photo}><Image src="/blog/ryanair-737-zavazadlove-voziky.webp" alt="Boeing 737 Ryanairu na ploše, před ním stojí vozíky se zavazadly" width={1600} height={1200} sizes={sizes} /><figcaption>Odbavená zavazadla čekají u letadla na naložení. Foto: vlastní archiv FlyQueens, listopad 2022.</figcaption></figure>

        <h2 id="ceny">Kolik to stojí</h2>
        <p>Ryanair nemá jednotný ceník. Cena za přednostní nástup i za odbavené zavazadlo se liší podle linky, termínu a toho, kdy si službu koupíte, proto tady žádnou částku neuvádíme. Číslo opsané z cizího článku by vás mohlo vyjít draho.</p>
        <p>Cenu pro svůj let uvidíte při rezervaci nebo dodatečně v sekci Moje cesty. Platí jednoduché pravidlo: <strong>čím později, tím dráž</strong>, a nejdráž je to u brány, kde se za nadměrné palubní zavazadlo platí zvlášť.</p>
        <p>U brány navíc platí jedna nepříjemnost, o které se moc nemluví. Pokud zavazadlo k přepravě nevezmou a vy ho tam necháte, Ryanair za ně podle svých podmínek nenese žádnou odpovědnost (<a href={podminky}>článek 8.3.4</a>).</p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Jaké je příruční zavazadlo Ryanair zdarma?</h3>
          <p>Jedno malé osobní zavazadlo 40 × 30 × 20 cm, které se musí vejít pod sedadlo před vámi. Kufr do přihrádky nad hlavou v ceně letenky není.</p>
          <h3>Kolik smí vážit palubní kufr 55 × 40 × 20 cm?</h3>
          <p>Deset kilogramů. Patří ke službě Přednostní nástup do letadla a 2 palubní zavazadla.</p>
          <h3>Můžu si vzít batoh i kabelku?</h3>
          <p>V základním tarifu ne. Zdarma máte jeden kus. Dvě zavazadla na palubě znamenají zaplacený přednostní nástup.</p>
          <h3>Co se stane, když mi taška nebude pasovat do měřáku?</h3>
          <p>U brány si zavazadlo nad rámec limitu doplatíte, případně půjde do nákladového prostoru. Ryanair k tomu má samostatnou odpověď v <a href={centrum}>nápovědě o zavazadlech</a>.</p>
          <h3>Kolik odbavených zavazadel si můžu koupit?</h3>
          <p>Až tři kusy po 20 kg na rezervaci, nebo jeden kus o váze 23 kg. K dispozici je i menší odbavené zavazadlo do 10 kg.</p>
        </div>

        <p>Před odletem se hodí zkontrolovat i to, z jakého terminálu se letí a kdy stroj přiletí. Odlety a přílety z Prahy najdete na stránce <Link href="/letiste/praha">Letiště Praha</Link>, konkrétní letadlo pak na <Link href="/radar">radaru</Link>.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/letiste/praha">Odlety z Letiště Praha</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/blog/prirucni-zavazadlo-do-letadla', eyebrow: 'Zavazadla', title: 'Příruční zavazadlo do letadla', description: 'Rozměry a váhy podle Ryanairu, Wizz Airu, easyJetu, Smartwings a Lufthansy.' },
          { href: '/letiste/praha', eyebrow: 'Před odletem', title: 'Letiště Praha', description: 'Odlety, přílety, doprava na letiště a parkování.' },
          { href: '/letiste/praha/ubytovani', eyebrow: 'Před odletem', title: 'Ubytování u letiště Praha', description: 'Kde přespat u terminálů a jak se dostat na ranní odlet.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Ryanair: Pravidla pro zavazadla společnosti Ryanair', href: pravidla },
          { label: 'Ryanair: nápověda k zavazadlům (přehled otázek)', href: centrum },
          { label: 'Ryanair: Všeobecné podmínky přepravy, článek 8 (znění z 25. 6. 2026)', href: podminky },
          { label: 'Wikimedia Commons: měřák zavazadel Ryanair a Wizz Air, 2023', href: merakFoto },
        ]} note="Rozměry a váhy ověřeny 28. září 2026 přímo v nápovědě Ryanairu a v článku 8 jeho všeobecných podmínek přepravy. Ceny se u Ryanairu liší podle linky a termínu, proto je neuvádíme. Letecké fotografie pocházejí z vlastního archivu FlyQueens, fotografie měřáku je volné dílo z Wikimedia Commons." />
      </article>
    </main>
  )
}
