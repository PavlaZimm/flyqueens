import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR_JSON_LD, AUTHOR, PUBLISHER_JSON_LD } from '@/lib/author'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from '@/components/Article/Article.module.css'
import { ArticleHeader } from '@/components/Article/ArticleHeader'
import { ArticleContents } from '@/components/UI/ArticleContents'

const post = POSTS.find((entry) => entry.slug === 'prirucni-zavazadlo-do-letadla')!
const title = 'Příruční zavazadlo do letadla: rozměry podle aerolinek'
const description = 'Ryanair a Wizz Air dávají zdarma jen malou tašku pod sedadlo, Smartwings kufr do 8 kg. Rozměry a váhy pěti dopravců podle jejich stránek k 7. 10. 2026.'
const url = 'https://www.flyqueens.cz/blog/prirucni-zavazadlo-do-letadla'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const wizz = 'https://www.wizzair.com/en-gb/help-centre/booking-information-and-services/baggage/baggage-allowance/cabin-baggage'
const easyjet = 'https://www.easyjet.com/en/policy/cabin-bags-faqs'
const easyjetPlus = 'https://www.easyjet.com/en/help/baggage/cabin-bags'
const lufthansa = 'https://www.lufthansa.com/us/en/carry-on-baggage'
const smartwings = 'https://www.smartwings.com/kolik-mohu-prepravit-zavazadel'
const ryanairPravidla = 'https://help.ryanair.com/hc/cs/articles/12888036565521-Pravidla-pro-zavazadla-spole%C4%8Dnosti-Ryanair'
const merakFoto = 'https://commons.wikimedia.org/wiki/File:Ryanair_vs_Wizz_Air_baggage_sizer.jpg'

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
        'https://www.flyqueens.cz/blog/ryanair-737-nastup.webp',
        'https://www.flyqueens.cz/blog/merak-prirucniho-zavazadla.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Příruční zavazadlo do letadla', item: url },
      ],
    },
  ],
}

export default function PrirucniZavazadloDoLetadlaArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Příruční zavazadlo do letadla"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Čísla, která si pamatujete od jedné aerolinky, u jiné neplatí. Ryanair a Wizz Air dávají zdarma jen malou tašku 40 × 30 × 20 cm pod sedadlo, kufr do přihrádky nad hlavou je u nich za příplatek. Smartwings má kufr 55 × 40 × 23 cm do 8 kg podle tabulky tarifů v ceně každého tarifu, kdežto Lufthansa ho v základním tarifu Economy Basic nepovoluje vůbec. Tady jsou pravidla pěti dopravců podle jejich vlastních stránek z 7. října 2026.</p>

        <figure className={styles.photo}><Image src="/blog/ryanair-737-nastup.webp" alt="Boeing 737 společnosti Ryanair zepředu při nástupu cestujících na odbavovací ploše" width={1600} height={738} sizes={sizes} preload /><figcaption>Boeing 737 Ryanairu při nástupu, květen 2026. Foto: vlastní archiv FlyQueens.</figcaption></figure>

        <ArticleContents items={[
          { id: 'rozmery-v-prehledu', label: 'Rozměry a váhy v přehledu' },
          { id: 'zdarma-nebo-priplatek', label: 'Co je zdarma a co se platí zvlášť' },
          { id: 'jak-se-meri', label: 'Jak se rozměr měří' },
          { id: 'u-brany', label: 'Co se stane u brány' },
          { id: 'stare-udaje', label: 'Proč se čísla na webech liší' },
          { id: 'caste-otazky', label: 'Časté otázky' },
        ]} />

        <h2 id="rozmery-v-prehledu">Rozměry a váhy v přehledu</h2>
        <p>Tabulka rozděluje zavazadlo na to, které se vejde pod sedadlo před vámi, a to, které patří do přihrádky nad hlavou. Rozhodující je tarif, který jste si koupili, ne aerolinka sama o sobě.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Aerolinka</th><th scope="col">Pod sedadlo</th><th scope="col">Do přihrádky nad hlavou</th></tr></thead>
            <tbody>
              <tr><td>Ryanair</td><td>zdarma: 40 × 30 × 20 cm</td><td>55 × 40 × 20 cm, 10 kg, jen s přednostním nástupem</td></tr>
              <tr><td>Wizz Air</td><td>zdarma: 40 × 30 × 20 cm, 10 kg</td><td>55 × 40 × 23 cm, 10 kg, jen se službou WIZZ Priority</td></tr>
              <tr><td>easyJet</td><td>zdarma: 45 × 36 × 20 cm, do 15 kg</td><td>56 × 45 × 25 cm, za příplatek (v ceně u Inclusive Plus a easyJet Plus)</td></tr>
              <tr><td>Smartwings</td><td>osobní taška 40 × 30 × 15 cm, 3 kg, v tarifech Plus, Flex a Business</td><td>55 × 40 × 23 cm, 8 kg, v ceně všech tarifů</td></tr>
              <tr><td>Lufthansa</td><td>osobní věc 40 × 30 × 15 cm v každém tarifu</td><td>55 × 40 × 23 cm, 8 kg, od tarifu Economy Light výše</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Údaje z oficiálních stránek dopravců, ověřeno 7. října 2026 (Ryanair 28. září 2026). Lufthansa: krátké a střední tratě. Smartwings: podle tabulky tarifů dopravce. Ceny příplatků neuvádíme, liší se podle linky a termínu.</p>

        <h2 id="zdarma-nebo-priplatek">Co je zdarma a co se platí zvlášť</h2>
        <p><strong>Ryanair a Wizz Air</strong> fungují stejně: v ceně je jedna malá taška pod sedadlo, rozměr 40 × 30 × 20 cm. Kufr do přihrádky je součást placené služby, u Ryanairu přednostního nástupu, u Wizz Airu služby WIZZ Priority (<a href={wizz}>Wizz Air, nápověda</a>). Podrobnosti k Ryanairu včetně pravidel pro děti máme v samostatném článku <Link href="/blog/prirucni-zavazadlo-ryanair">Příruční zavazadlo Ryanair</Link>.</p>

        <figure className={styles.photo}><Image src="/blog/merak-prirucniho-zavazadla.webp" alt="Modrý měřák zavazadel Ryanairu vedle růžového měřáku Wizz Airu v odletové hale" width={1200} height={1600} sizes={sizes} /><figcaption>Měřáky u brány: vlevo Ryanair, vpravo Wizz Air. Cedule Ryanairu na snímku z roku 2023 ještě uvádí malé zavazadlo 40 × 20 × 25 cm. Foto: <a href={merakFoto}>Stephen Johnes, Wikimedia Commons</a>, volné dílo, zmenšeno.</figcaption></figure>

        <p><strong>easyJet</strong> dává zdarma o něco větší tašku pod sedadlo, 45 × 36 × 20 cm. Může vážit až 15 kg, ale dopravce chce, abyste ji dokázali sami zvednout a unést. Velké zavazadlo 56 × 45 × 25 cm si lze přikoupit k rezervaci a cena se ukáže při objednávce. Zdarma je pro členy easyJet Plus a pro tarif Inclusive Plus, ale s výhradou volného místa v přihrádkách. Když místo dojde, jde zavazadlo do nákladového prostoru zdarma (<a href={easyjet}>easyJet, otázky o kabinových zavazadlech</a>). Velké zavazadlo smíte mít jedno na osobu a let a jejich počet na letadle je omezený.</p>

        <p><strong>Smartwings</strong> je jediný z těchto pěti, kde je kufr do přihrádky v ceně každého tarifu: příruční zavazadlo 55 × 40 × 23 cm a 8 kg. Osobní taška 40 × 30 × 15 cm do 3 kg je navíc v tarifech Plus, Flex a Business, v tarifu Lite ne. Dopravce zároveň píše, že překročení limitů z kapacitních důvodů nepovoluje a takové zavazadlo se přepraví jako odbavené za poplatek podle ceníku (<a href={smartwings}>Smartwings, přeprava zavazadel</a>).</p>

        <p><strong>Lufthansa</strong> má největší rozdíl mezi tarify. V Economy Basic na krátkých a středních tratích smíte vzít jen osobní věc 40 × 30 × 15 cm, tedy kabelku nebo malý batoh. Palubní kufr 55 × 40 × 23 cm do 8 kg se objevuje až od tarifu Economy Light. Výjimku mají členové programu Miles & More se statusem HON Circle a Senator a držitelé statusu Star Alliance Gold (<a href={lufthansa}>Lufthansa, příruční zavazadla</a>). Na dálkových tratích má Economy jednu osobní věc a jeden kufr.</p>

        <h2 id="jak-se-meri">Jak se rozměr měří</h2>
        <p>Stejné číslo neznamená u všech aerolinek totéž. Wizz Air uvádí, že rozměr se měří bez madel a koleček, přičemž kolečka nesmí přidat víc než 5 cm. EasyJet to bere naopak: 45 × 36 × 20 cm a 56 × 45 × 25 cm platí <strong>včetně madel a koleček</strong>.</p>
        <p>Smartwings ani Lufthansa to na svých stránkách o příručním zavazadle neupřesňují. Pokud kufr rozměrem těsně sedí, změřte ho doma celý metrem i s kolečky a madlem a počítejte s tím horším číslem. U brány se zavazadlo měří přes měřák a ten rozhoduje.</p>

        <h2 id="u-brany">Co se stane u brány</h2>
        <p>U brány se zavazadla měří a postup při překročení limitu se u aerolinek liší. U Lufthansy se zavazadlo, které nesplňuje pravidla, odebere u přepážky nebo u brány a letí v nákladovém prostoru na váš účet. Poplatek je podle trasy <strong>od 60 do 110 eur</strong>, jde zaplatit jen kartou a je výrazně dražší než odbavené zavazadlo koupené předem. Na plných letech může jít do nákladového prostoru i zavazadlo, které pravidla splňuje, a Lufthansa o tom informuje e-mailem před odletem. Odbavení u přepážky je v tom případě zdarma (<a href={lufthansa}>Lufthansa</a>).</p>
        <p>EasyJet posílá zavazadlo nad rámec zakoupených do nákladového prostoru a účtuje poplatek. Přednost v přihrádkách mají ti, kdo velké zavazadlo koupili předem, protože je to levnější než u brány. Wizz Air u překročení rozměrů uvádí, že se účtují další poplatky. Konkrétní částky na stránkách, které jsme četli, nejsou, takže je tady neuvádíme.</p>
        <p>Když váháte mezi dvěma kufry, vezměte menší a limit si ještě zkontrolujte v e-mailu k rezervaci.</p>

        <h2 id="stare-udaje">Proč se čísla na webech liší</h2>
        <p>Pravidla aerolinek se mění a staré přehledy zůstávají online. Přehled z roku 2017, který je dodnes mezi výsledky vyhledávání, uvádí u Ryanairu malou tašku 40 × 25 × 20 cm a u Smartwings kufr 55 × 45 × 25 cm. Dnešní pravidla na stránkách dopravců jsou jiná: u Ryanairu 40 × 30 × 20 cm, u Smartwings 55 × 40 × 23 cm. Starší rozměr malé tašky Ryanairu najdete ještě na snímku výše, kde je cedule z roku 2023.</p>
        <p>Proto si číslo vždy ověřte v e-mailu k rezervaci nebo na stránce dopravce. Rozměr malé tašky se u Ryanairu změnil, jak vysvětluje <Link href="/blog/prirucni-zavazadlo-ryanair#stare-rozmery">článek o Ryanairu</Link>.</p>

        <h2 id="caste-otazky">Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Jaké příruční zavazadlo je zdarma u Ryanairu a Wizz Airu?</h3>
          <p>Jedna malá taška 40 × 30 × 20 cm, která se vejde pod sedadlo před vámi. U Wizz Airu může vážit až 10 kg. Kufr do přihrádky nad hlavou je u obou za příplatek.</p>
          <h3>Kolik smí vážit příruční zavazadlo Smartwings?</h3>
          <p>Osm kilogramů při rozměrech 55 × 40 × 23 cm. Osobní taška, která je navíc v tarifech Plus, Flex a Business, smí vážit 3 kg při rozměrech 40 × 30 × 15 cm.</p>
          <h3>Můžu si vzít kufr v Lufthansa Economy Basic?</h3>
          <p>Ne, na krátkých a středních tratích tam smíte jen osobní věc 40 × 30 × 15 cm. Palubní kufr do 8 kg patří do tarifu Economy Light a vyšších. Výjimku mají členové Miles & More se statusem HON Circle, Senator nebo Star Alliance Gold.</p>
          <h3>Počítají se u easyJet kolečka a madlo?</h3>
          <p>Ano. Rozměr 45 × 36 × 20 cm u malého zavazadla i 56 × 45 × 25 cm u velkého platí včetně madel a koleček. U Wizz Airu je to naopak: kolečka se nepočítají, smějí ale přidat nejvýš 5 cm.</p>
          <h3>Kde zjistím pravidla pro svůj let?</h3>
          <p>V e-mailu s potvrzením rezervace a na stránce dopravce. Rozměry a váhy se mění podle tarifu i času, takže starší článek, tabulku nebo cedulu u brány berte jen jako orientaci.</p>
        </div>

        <p>Před odletem se hodí zkontrolovat i to, z jakého terminálu se letí. Odlety a přílety z Prahy najdete na stránce <Link href="/letiste/praha">Letiště Praha</Link>, konkrétní letadlo pak na <Link href="/radar">radaru</Link>.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/letiste/praha">Odlety z Letiště Praha</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/blog/prirucni-zavazadlo-ryanair', eyebrow: 'Zavazadla', title: 'Příruční zavazadlo Ryanair', description: 'Rozměry, váhy, přednostní nástup a pravidla pro děti.' },
          { href: '/blog/powerbanka-do-letadla', eyebrow: 'Zavazadla', title: 'Powerbanka do letadla', description: 'Limit 100 Wh a kam powerbanku uložit.' },
          { href: '/letiste/praha', eyebrow: 'Před odletem', title: 'Letiště Praha', description: 'Odlety, přílety, doprava na letiště a parkování.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Wizz Air: Cabin baggage (nápověda)', href: wizz },
          { label: 'easyJet: Cabin bags explained', href: easyjet },
          { label: 'easyJet: Cabin bags (členové easyJet Plus a tarif Inclusive Plus)', href: easyjetPlus },
          { label: 'Lufthansa: Carry-on baggage', href: lufthansa },
          { label: 'Smartwings: Přeprava zavazadel', href: smartwings },
          { label: 'Ryanair: Pravidla pro zavazadla společnosti Ryanair', href: ryanairPravidla },
          { label: 'Wikimedia Commons: měřák zavazadel Ryanair a Wizz Air, 2023', href: merakFoto },
        ]} note="Údaje ověřeny 7. října 2026 přímo na stránkách dopravců. Stránky Wizz Air, easyJet a Lufthansy jsou anglicky (Lufthansa v americké mutaci), data platnosti na nich není. Ryanair byl ověřen 28. září 2026. Ceny příplatků neuvádíme, liší se podle linky a termínu. Letecká fotografie pochází z vlastního archivu FlyQueens, fotografie měřáků je volné dílo z Wikimedia Commons." />
      </article>
    </main>
  )
}
