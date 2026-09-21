import { ArticleFlightStatus } from '@/components/Airport/ArticleFlightStatus'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD } from '@/lib/author'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from './page.module.css'

const post = POSTS.find((entry) => entry.slug === 'boeing-747-praha-fly-meta')!
const title = 'Boeing 747 v Praze: Fly Meta na fotkách z Kněževsi'
const description = 'Boeing 747 v Praze na vlastních fotkách z Kněževsi. Poznejte nákladní stroj 9H-FLM v barvách Fly Meta a zjistěte, jak ho sledovat na radaru.'
const url = 'https://www.flyqueens.cz/blog/boeing-747-praha-fly-meta'

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
      publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      image: [
        'https://www.flyqueens.cz/spotting/praha-boeing-747-fly-meta.webp',
        'https://www.flyqueens.cz/blog/boeing-747-fly-meta-priblizeni.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Boeing 747 v Praze', item: url },
      ],
    },
  ],
}

export default function Boeing747FlyMetaArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
          <Link href="/">FlyQueens</Link><span aria-hidden="true">/</span>
          <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Boeing 747 v Praze</span>
        </nav>
        <h1>{title}</h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        <p className={styles.lead}>Na našich fotografiích přistává Boeing 747 v barvách Fly Meta na Letišti Václava Havla Praha. Záběry vznikly z Kněževsi 16. září 2026. Na trupu je kromě velkého nápisu Fly Meta vidět i registrace 9H-FLM, podle které lze určit konkrétní stroj: nákladní Boeing 747-400F.</p>
        <figure className={styles.photo}><Image src="/spotting/praha-boeing-747-fly-meta.webp" alt="Boeing 747 Fly Meta s registrací 9H-FLM při přistání v Praze" width={1600} height={780} sizes="(max-width: 800px) calc(100vw - 36px), 760px" preload /><figcaption>Boeing 747 v okamžiku dosednutí, za hlavním podvozkem je vidět kouř od pneumatik. Foto: vlastní archiv FlyQueens.</figcaption></figure>
        <h2>Který Boeing 747 je na fotografiích?</h2>
        <p>Letadlo nese registraci <strong>9H-FLM</strong>. Maltský letecký rejstřík z 19. srpna 2026 ho uvádí jako Boeing 747-400F s výrobním číslem 33731. Jako provozovatel je zapsána společnost Air Atlanta Europe Limited. <a href="https://www.transport.gov.mt/Query-Registration-19-08-2026.pdf-f11802#page=10">Transport Malta, letecký rejstřík, strana 10</a></p>
        <p>Na bočním záběru si všimněte zvýšené přední části trupu. Horní paluba vytváří typický profil Boeingu 747, kterému se přezdívá jumbo. Dalším poznávacím znakem jsou čtyři motory, po dvou pod každým křídlem. Z této strany nejsou všechny stejně dobře vidět; pro rozpoznání pomůže především tvar přídě.</p>
        <p>Na první fotografii už kola hlavního podvozku dosedají na dráhu. Druhý záběr ukazuje stejný stroj ještě těsně nad ní, s vysunutým podvozkem. Od fotografie dosednutí ho podle časů v původních souborech dělí pět sekund. Datum 16. září vychází z metadat fotografií.</p>
        <figure className={styles.photo}><Image src="/blog/boeing-747-fly-meta-priblizeni.webp" alt="Nákladní Boeing 747 v barvách Fly Meta těsně nad dráhou v Praze" width={1400} height={1050} sizes="(max-width: 800px) calc(100vw - 36px), 760px" /><figcaption>9H-FLM krátce před dosednutím na pražskou dráhu. Foto: vlastní archiv FlyQueens.</figcaption></figure>
        <h2>Fly Meta na trupu a Air Atlanta v rejstříku</h2>
        <p>Fly Meta se věnuje správě nákladních letadel a službám letecké přepravy. Její činnost a využití Boeingů 747 a 777 popisuje také oznámení společnosti HAECO z května 2026. <a href="https://www.haeco.com/en/media-centre/press-releases/haeco-signs-mou-with-fly-meta-to-advance-widebody-freighter-mro-collaboration">HAECO o spolupráci s Fly Meta</a></p>
        <p>Nápis na trupu a jméno provozovatele v rejstříku tedy označují různé role. Na našich fotografiích vidíte barvy Fly Meta, zatímco u registrace 9H-FLM najdete v uvedeném maltském výpisu Air Atlanta Europe Limited. Pro hledání konkrétního letadla si proto poznamenejte registraci. Samotný název Fly Meta k jeho jednoznačnému určení nestačí.</p>
        <p>Z fotografií nelze poznat, odkud tento let přiletěl ani co převážel. Trasu, číslo letu a náklad nemáme doložené, stejně jako termín další návštěvy Prahy.</p>
        <h2>Odkud se dá podobné přistání fotografovat?</h2>
        <p>Tyto snímky vznikly z Kněževsi. Letiště Praha tam uvádí veřejný vyhlídkový val určený k pozorování letadel. Vyvýšené stanoviště umožňuje dívat se přes oplocení, ale konkrétní výhled na přistání závisí také na tom, kterou dráhu a směr letiště právě používá. <a href="https://www.prg.aero/spoty-pro-sledovani-priletuodletu">Oficiální přehled spotů Letiště Praha</a></p>
        <p>Přístup a fotografie cesty najdete v našem <Link href="/letiste/praha/planespotting">průvodci planespottingem v Praze</Link>. Jsou v něm i informace o druhém valu u Hostivice. Před cestou si zkontrolujte aktuální provoz.</p>
        <figure className={styles.photo}><Image src="/spotting/praha-vyhlidkovy-val.webp" alt="Vyhlídkový val v Kněževsi s návštěvníky a přístupovou cestou" width={1600} height={1200} sizes="(max-width: 800px) calc(100vw - 36px), 760px" /><figcaption>Vyhlídkový val v Kněževsi, odkud pochází naše série fotografií. Foto: vlastní archiv FlyQueens.</figcaption></figure>
        <h2>Jak letadlo sledovat na radaru</h2>
        <p>Na <Link href="/radar">radaru FlyQueens</Link> otevřete oblast pražského letiště a detail vybraného letadla. Pokud zdroj dat poskytne jeho registraci, porovnejte ji s označením 9H-FLM. Dostupnost typu a dalších údajů se liší; prázdné pole ani chybějící bod na mapě nepotvrzují, že letadlo neletí.</p>
        <p>Registrace patří konkrétnímu stroji, číslo letu označuje spoj. Rozdíl vysvětlujeme v návodu <Link href="/blog/jak-sledovat-let-podle-cisla">jak sledovat let podle čísla</Link>. Živá mapa pomůže s aktuální polohou. Termín dalšího příletu tohoto Boeingu z ní předem nevyčtete.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>
        <ArticleFlightStatus title="Je 9H-FLM v dostupném přehledu Prahy?" registration="9H-FLM" />
        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha/planespotting', eyebrow: 'Kam za letadly', title: 'Planespotting v Praze', description: 'Vyhlídkové valy v Kněževsi a u Hostivice, přístup a vlastní fotografie.' },
          { href: '/blog/airbus-a380-praha-emirates', eyebrow: 'Další velké letadlo', title: 'Airbus A380 v Praze', description: 'Plánované nasazení Emirates a ověření typu před cestou na letiště.' },
          { href: '/blog/letiste-lipsko', eyebrow: 'Nákladní letiště', title: 'Letiště Lipsko a Antonovy', description: 'Uzel DHL, An-124 na našich fotkách a doprava z Česka.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Transport Malta: registr 9H-FLM, stav k 19. srpnu 2026, strana 10', href: 'https://www.transport.gov.mt/Query-Registration-19-08-2026.pdf-f11802#page=10' },
          { label: 'Fly Meta: nákladní letecké služby', href: 'https://flymeta.com/' },
          { label: 'HAECO: spolupráce s Fly Meta, květen 2026', href: 'https://www.haeco.com/en/media-centre/press-releases/haeco-signs-mou-with-fly-meta-to-advance-widebody-freighter-mro-collaboration' },
          { label: 'Letiště Praha: oficiální místa pro pozorování letadel', href: 'https://www.prg.aero/spoty-pro-sledovani-priletuodletu' },
        ]} note="Zdroje ověřeny 18. září 2026. Fotografie pocházejí z vlastního archivu FlyQueens; datum 16. září 2026 odpovídá metadatům originálů. Trasu ani termín dalšího příletu tohoto stroje nemáme potvrzené." />
      </article>
    </main>
  )
}
