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

const post = POSTS.find((entry) => entry.slug === 'wizz-air-praha-poprad')!
const title = 'Wizz Air z Prahy do Popradu: lety od 25. října 2026'
const description = 'Wizz Air začne 25. října létat z Prahy do Popradu-Tatry. Dny, časy letů, rozpor v cenách, zavazadla a doprava z letiště. Stav k 7. 10. 2026.'
const url = 'https://www.flyqueens.cz/blog/wizz-air-praha-poprad'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const zdopravy = 'https://zdopravy.cz/tatry-za-hodinu-a-pod-tisicovku-wizz-air-zacne-letat-z-prahy-do-popradu-302339/'
const tasr = 'https://www.tasr.sk/tasr-clanok/TASR:2026061100000153'
const cc = 'https://cc.cz/praha-se-docka-druhe-pravidelne-letecke-linky-na-slovensko-ani-tentokrat-ale-nebude-do-bratislavy/'
const planes = 'https://www.planes.cz/en/article/210885/what-does-wizz-air-plan-for-prague-in-the-upcoming-winter-schedule'
const cestujlevne = 'https://www.cestujlevne.com/akcni-letenky/top-nova-linka-z-prahy-do-popradu-od-25-rijna-s-wizz-air'
const loudavym = 'https://loudavymkrokem.cz/?p=422897'
const noviny = 'https://www.noviny.sk/slovensko/1260471-poprad-spaja-mesto-s-letiskom-novou-linkou-mhd'
const letisko = 'https://www.popradtatry.aero/'
const wizz = 'https://www.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/baggage-allowance/cabin-baggage'

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
      about: { '@type': 'Airline', name: 'Wizz Air', iataCode: 'W6', sameAs: 'https://www.wizzair.com' },
      image: ['https://www.flyqueens.cz/blog/wizz-air-airbus-treviso.webp'],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Wizz Air Praha–Poprad', item: url },
      ],
    },
  ],
}

export default function WizzAirPrahaPopradArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Wizz Air Praha–Poprad"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Od neděle 25. října 2026 bude Wizz Air létat z Prahy do Popradu-Tatry, zatím třikrát týdně: ve čtvrtek, v sobotu a v neděli. Let trvá asi hodinu, vlakem to podle novin trvá šest až sedm. Cenu zatím nejde říct jednou větou, protože zdroje uvádějí různé částky.</p>

        <figure className={styles.photo}><Image src="/blog/wizz-air-airbus-treviso.webp" alt="Airbus A320 Wizz Air zepředu na odbavovací ploše, vlevo vlečný traktor" width={1600} height={900} sizes={sizes} preload /><figcaption>Airbus Wizz Air na letišti Treviso, 25. května 2026. Foto: vlastní archiv FlyQueens. Snímek není z Popradu ani z této linky, ukazuje typ letadla, jaké Wizz Air provozuje. Lety do Popradu má podle zdopravy.cz obsluhovat větší A321neo.</figcaption></figure>

        <ArticleContents items={[
          { id: 'kdy-a-jak-casto', label: 'Kdy a jak často Wizz Air poletí' },
          { id: 'kolik-to-stoji', label: 'Kolik to stojí a proč se údaje liší' },
          { id: 'zavazadla', label: 'Jaké zavazadlo máte v ceně' },
          { id: 'z-letiste-do-mesta', label: 'Jak se dostat z letiště do Popradu' },
          { id: 'poprad-a-dalsi-lety', label: 'Kam se z Popradu létá dál' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="kdy-a-jak-casto">Kdy a jak často Wizz Air poletí</h2>
        <p>Linku Wizz Air oznámil už v červnu. Podle slovenské agentury TASR a webu cc.cz je první let v neděli 25. října 2026 a pak se poletí každý čtvrtek, sobotu a neděli (<a href={tasr}>TASR, 11. 6. 2026</a>, <a href={cc}>cc.cz</a>). Podle zpravodajského webu zdopravy.cz přibude od ledna čtvrtý spoj v úterý (<a href={zdopravy}>zdopravy.cz, 7. 10. 2026</a>). To jsme u dopravce nepotvrdili, ber se jako informace z jednoho zdroje.</p>
        <p>Časy odletů a příletů, tedy čas, který platí v Česku i na Slovensku:</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Den</th><th scope="col">Praha → Poprad</th><th scope="col">Poprad → Praha</th></tr></thead>
            <tbody>
              <tr><td>čtvrtek</td><td>17:10, přílet 18:15</td><td>18:50, přílet 20:00</td></tr>
              <tr><td>sobota</td><td>07:35, přílet 08:40</td><td>09:15, přílet 10:25</td></tr>
              <tr><td>neděle</td><td>17:10, přílet 18:15</td><td>18:50, přílet 20:00</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Časy odletů uvádí zdopravy.cz a cestujlevne.com, časy příletů cestujlevne.com. Obojí se shoduje, ale web Wizz Air jsme pro kontrolu nepřečetli, takže si čas konkrétního dne ověřte v rezervaci.</p>
        <p>Víkend vychází přirozeně: tam v sobotu v 7:35, zpátky v neděli v 18:50.</p>

        <h2 id="kolik-to-stoji">Kolik to stojí a proč se údaje liší</h2>
        <p>Tři zdroje, tři různé údaje. Zdopravy.cz píše, že jednosměrná letenka vychází obvykle pod 400 Kč a víkendová zpáteční pod 1 000 Kč. Cestujlevne.com uvádí zpáteční letenky od 1 008 Kč (<a href={cestujlevne}>cestujlevne.com</a>). Web loudavymkrokem.cz psal o cenách od 24,99 € za jeden směr (<a href={loudavym}>loudavymkrokem.cz</a>).</p>
        <p>Částky spolu nesedí a z dostupných zdrojů nejde poznat proč. Nízkonákladové aerolinky mění cenu podle termínu i zaplnění letadla a weby možná citují jiné dny. Žádná z částek nezaručuje, že ji najdete pro svůj termín. Skutečnou cenu uvidíte jen při rezervaci na webu Wizz Air.</p>

        <h2 id="zavazadla">Jaké zavazadlo máte v ceně</h2>
        <p>Wizz Air dává každému cestujícímu zdarma jednu tašku 40 × 30 × 20 cm, která se musí vejít pod sedadlo před vámi, do 10 kg. Větší kufr 55 × 40 × 23 cm do přihrádky nad hlavou patří ke službě WIZZ Priority (<a href={wizz}>Wizz Air, nápověda k zavazadlům</a>). Víkendový výlet se tak vejde do malého batohu, na delší pobyt s větším kufrem si budete muset zavazadlo přikoupit. Rozměry a pravidla u dalších aerolinek najdete v přehledu <Link href="/blog/prirucni-zavazadlo-do-letadla">příruční zavazadlo do letadla</Link>.</p>

        <h2 id="z-letiste-do-mesta">Jak se dostat z letiště do Popradu</h2>
        <p>Město Poprad spustilo 17. září 2026 novou autobusovou linku městské dopravy mezi autobusovým nádražím (nástupiště 22) a letištěm. Jezdí dvakrát týdně, ve čtvrtek a v neděli, podle příletů a odletů. Dosud platný jízdní řád je do 24. října a je určený pro polskou linku do Gdaňsku. Město píše, že ho bude po spuštění vyhodnocovat a upravovat, a na 25. října, tedy na začátek pražské linky, se čeká rozšíření (<a href={noviny}>noviny.sk, 17. 9. 2026</a>). Zdopravy.cz uvádí číslo linky 074010. Časy po 25. říjnu jsme nenašli.</p>
        <p>Do dalších osad pod Tatrami z Popradu pokračujete vlakem nebo autobusem. Přesné spoje a vzdálenosti letiště nezveřejňuje, takže je hledejte u dopravců.</p>

        <h2 id="poprad-a-dalsi-lety">Kam se z Popradu létá dál</h2>
        <p>Podle webu letiště se z Popradu-Tatry pravidelně létá do Gdaňsku, Londýna-Lutonu a do Prahy, čartery jedou do Řecka, Bulharska, Turecka a na Kypr (<a href={letisko}>letisko Poprad-Tatry</a>). Z pražské strany jde o druhou pravidelnou linku na Slovensko. Zatím jediná byla Ryanair do Košic, konstatuje cc.cz. Do Bratislavy z Prahy podle cc.cz žádná pravidelná linka neletí. O předchozích letech Praha–Poprad píše zdopravy.cz: provozovaly je České aerolinie turbovrtulovými letadly.</p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Kdy poletí Wizz Air první let z Prahy do Popradu?</h3>
          <p>V neděli 25. října 2026. Podle oznámení Wizz Air se pak létá každý čtvrtek, sobotu a neděli.</p>
          <h3>Kolik trvá let z Prahy do Popradu?</h3>
          <p>Asi hodinu. Podle jízdního řádu z cestujlevne.com je rozdíl mezi odletem v 17:10 a příletem v 18:15 jedna hodina a pět minut. Vlak z Prahy do Popradu jede podle cc.cz téměř sedm hodin.</p>
          <h3>Jaké zavazadlo je v ceně letenky Wizz Air?</h3>
          <p>Jedna taška 40 × 30 × 20 cm do 10 kg, která se vejde pod sedadlo. Kufr do přihrádky je za příplatek se službou WIZZ Priority.</p>
          <h3>Létá se z Prahy do Popradu i v zimě?</h3>
          <p>Ano, linka je zařazená do zimního letového řádu 2026/27 a podle planes.cz je celoroční, v létě ale s menším počtem spojů. Od ledna má přibýt úterní spoj, což zdopravy.cz uvádí jako plán.</p>
        </div>

        <p>V den odletu můžete let sledovat na <Link href="/radar">radaru letadel</Link>, odlety z české strany najdete na stránce <Link href="/letiste/praha">Letiště Praha</Link>.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/letiste/praha">Odlety z Letiště Praha</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          relatedCard('/blog/prirucni-zavazadlo-do-letadla'),
          { href: '/letiste/praha', eyebrow: 'Odlet z Česka', title: 'Letiště Praha', description: 'Přílety, odlety, doprava na letiště a parkování.' },
          relatedCard('/blog/jak-sledovat-let-podle-cisla'),
        ]} />
        <SourcesBox sources={[
          { label: 'zdopravy.cz: Tatry za hodinu a pod tisícovku (7. 10. 2026)', href: zdopravy },
          { label: 'TASR: Direct flights between Poprad and Prague (11. 6. 2026)', href: tasr },
          { label: 'cc.cz: Praha se dočká druhé pravidelné linky na Slovensko (11. 6. 2026)', href: cc },
          { label: 'planes.cz: Wizz Air, zimní letový řád z Prahy', href: planes },
          { label: 'cestujlevne.com: nová linka Praha–Poprad', href: cestujlevne },
          { label: 'loudavymkrokem.cz: Wizz Air spouští linku Praha–Poprad-Tatry', href: loudavym },
          { label: 'noviny.sk: Poprad spája mesto s letiskom novou linkou MHD (17. 9. 2026)', href: noviny },
          { label: 'Letisko Poprad-Tatry', href: letisko },
          { label: 'Wizz Air: nápověda k příručnímu zavazadlu', href: wizz },
        ]} note="Stav k 7. říjnu 2026. Dny a datum startu potvrzují tři nezávislé zdroje z června 2026. Časy letů, výhled na čtvrtý spoj, typ letadla a ceny pocházejí ze zpravodajských a cenových webů, web Wizz Air se nepodařilo načíst. Letecká fotografie je z vlastního archivu FlyQueens." />
      </article>
    </main>
  )
}
