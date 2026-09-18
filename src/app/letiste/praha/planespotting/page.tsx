import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD } from '@/lib/author'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from './page.module.css'

const title = 'Planespotting Praha: vyhlídky, Kněževes a Hostivice'
const description = 'Planespotting v Praze: porovnejte valy Kněževes a Hostivice, prohlédněte si vlastní fotky a naplánujte přístup. U letiště pak otevřete radar letadel.'
const url = 'https://www.flyqueens.cz/letiste/praha/planespotting'
const date = '2026-09-18'
const officialSpots = 'https://www.prg.aero/spoty-pro-sledovani-priletuodletu'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  ...socialMetadata({
    title, description, url, type: 'article', publishedTime: date, modifiedTime: date,
    image: { url: '/spotting/praha-vyhlidkovy-val.webp', width: 1600, height: 1200, alt: 'Vyhlídkový val v Kněževsi s návštěvníky a přístupovou cestou' },
  }),
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article', headline: title, description, datePublished: date, dateModified: date,
      author: AUTHOR_JSON_LD,
      publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      image: ['https://www.flyqueens.cz/spotting/praha-vyhlidkovy-val.webp', 'https://www.flyqueens.cz/spotting/praha-boeing-747-fly-meta.webp'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Letiště', item: 'https://www.flyqueens.cz/letiste' },
        { '@type': 'ListItem', position: 3, name: 'Praha', item: 'https://www.flyqueens.cz/letiste/praha' },
        { '@type': 'ListItem', position: 4, name: 'Planespotting', item: url },
      ],
    },
  ],
}

function Photo({ name, alt, caption, height = 1200, preload = false }: { name: string; alt: string; caption: string; height?: number; preload?: boolean }) {
  return (
    <figure className={styles.photo}>
      <Image src={`/spotting/${name}.webp`} width={1600} height={height} sizes="(max-width: 800px) calc(100vw - 36px), 760px" alt={alt} preload={preload} />
      <figcaption>{caption} · Foto: vlastní archiv FlyQueens</figcaption>
    </figure>
  )
}

export default function PrahaPlanespottingPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
          <Link href="/">FlyQueens</Link><span aria-hidden="true">/</span>
          <Link href="/letiste">Letiště</Link><span aria-hidden="true">/</span>
          <Link href="/letiste/praha">Praha</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Planespotting</span>
        </nav>
        <div className={styles.eyebrow}>Praha · Průvodce s vlastními fotografiemi</div>
        <h1>{title}</h1>
        <AuthorByline dateIso={date} dateLabel="18. září 2026" readingTime="5 min čtení" />
        <p className={styles.lead}>
          Planespotting v Praze začíná často pohledem přes plot: letadlo máte před sebou, ale nevíte,
          co je zač. Z vyhlídkových valů v Kněževsi a u Hostivice uvidíte nad oplocení
          a s určením letadla může pomoci radar. Kněževes ukazujeme na vlastních fotkách;
          přístup k oběma valům doplňujeme podle informací letiště.
        </p>
        <Photo name="praha-vyhlidkovy-val" alt="Planespotting v Praze: vyhlídkový val v Kněževsi s přístupovou cestou" caption="Vyhlídkový val v Kněževsi s přístupovou cestou." preload />
        <nav className={styles.contents} aria-label="Obsah průvodce">
          <a href="#knezeves">Kněževes</a><a href="#hostivice">Hostivice</a>
          <a href="#radar">Jak využít radar</a><a href="#foceni">Fotografování</a><a href="#otazky">Časté otázky</a>
        </nav>
        <h2>Kterou vyhlídku zvolit?</h2>
        <div className={styles.choices}>
          <section className={styles.choice}><h3><a href="#knezeves">Kněževes</a></h3><p>Od silnice půjdete po štěrkové cestě.</p></section>
          <section className={styles.choice}><h3><a href="#hostivice">Hostivice</a></h3><p>K valu se dostanete pěšky nebo na kole. Počítejte s delší cestou.</p></section>
        </div>
        <p>
          Při první návštěvě si vyberte jedno místo. Než začnete přejíždět za konkrétním letadlem,
          podívejte se chvíli na skutečný provoz. Pravidelný rozestup příletů ani konkrétní typ letadla
          není zaručený; fotografie v tomto průvodci zachycují jednotlivé návštěvy.
        </p>
        <h2 id="knezeves">Vyhlídka na letiště Kněževes</h2>
        <p>
          K vyhlídkovému valu Kněževes vede nezpevněná štěrková cesta z ulice Na staré silnici.
          <a href={officialSpots}>Letiště Praha uvádí</a> možnost parkování přibližně 100 metrů od valu a autobusové spojení do obce.
          U vyhlídky jsou podle jeho přehledu také odpadkové koše a chemická toaleta.
        </p>
        <p>
          Před odjezdem zkontrolujte trasu a spoj na svůj konkrétní den. Na místě se řiďte dopravním
          značením; blízkost vyhlídky neznamená, že je možné parkovat na každé cestě podél plotu.
          Pokud berete kočárek, počítejte s nezpevněnou cestou a zohledněte počasí.
        </p>
        <div className={styles.actions}>
          <a href="https://www.google.com/maps/search/?api=1&query=Vyhl%C3%ADdkov%C3%BD+val+Kn%C4%9B%C5%BEeves">Najít val Kněževes v mapě ↗</a>
          <a href="https://pid.cz/">Vyhledat spojení v PID ↗</a>
        </div>
        <Photo name="praha-pristup-k-valu" alt="Cesta a dřevěné schody k vyhlídkovému valu v Kněževsi" caption="Cesta a schody k vyhlídkovému valu v Kněževsi." />
        <h2 id="hostivice">Vyhlídkový val Hostivice</h2>
        <p>
          Hostivický val leží u křížení drah 06/24 a 12/30 a nabízí pohled nad oplocením letiště.
          Podle <a href={officialSpots}>Letiště Praha</a> se k němu dostanete pěšky nebo na kole; popisovaná procházka
          z ulice Cihlářská v Hostivicích měří zhruba čtyři kilometry.
        </p>
        <p>
          Naplánujte si i návrat a vezměte si vodu. Vyrazte s předstihem, abyste před očekávaným
          příletem stihli i cestu k valu. Letadlo může přiletět dříve a dlouhý
          pěší úsek už na poslední chvíli nedoženete.
        </p>
        <div className={styles.actions}>
          <a href="https://www.google.com/maps/search/?api=1&query=Vyhl%C3%ADdkov%C3%BD+val+Hostivice">Najít val Hostivice v mapě ↗</a>
          <a href={officialSpots}>Oficiální informace o obou valech ↗</a>
        </div>
        <h2 id="radar">Jak při pozorování využít radar</h2>
        <ol>
          <li><strong>Před cestou ověřte let.</strong> Pro očekávaný přílet použijte <a href="https://www.prg.aero/prehled-letu?hour=all">oficiální přehled letů</a>. Pokud chcete vidět určitý typ, ověřte ho i u dopravce.</li>
          <li><strong>Na místě otevřete <Link href="/radar">živou mapu letadel</Link>.</strong> Přibližte Prahu, vyberte letadlo a porovnejte jeho polohu s tím, co vidíte před sebou.</li>
          <li><strong>Podívejte se na několik příletů.</strong> Z aktuálních stop získáte představu, odkud letadla přilétají. Směr provozu se může změnit.</li>
          <li><strong>Chybějící letadlo nemusí znamenat zrušený let.</strong> Mapa závisí na dostupných ADS-B datech. Poloha může mít zpoždění a některá letadla nebo údaje o trase mohou chybět.</li>
        </ol>
        <div className={styles.tip}>
          <p><strong>Máte číslo letu?</strong> V návodu <Link href="/blog/jak-sledovat-let-podle-cisla">sledování letů podle čísla</Link> vysvětlujeme, proč se obchodní číslo letu může lišit od volacího znaku na mapě.</p>
          <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link><Link href="/blog/airbus-a380-praha-emirates">A380 v Praze</Link></div>
        </div>
        <Photo name="praha-boeing-747-fly-meta" height={780} alt="Boeing 747 v barvách Fly Meta na Letišti Praha, fotografovaný z Kněževsi" caption="Boeing 747 v barvách Fly Meta při přistání v Praze, fotografovaný z Kněževsi." />
        <h2 id="foceni">Co si vzít a jak fotografovat</h2>
        <p>
          Na první návštěvu doporučujeme telefon, nabitou baterii, vodu a oblečení podle počasí.
          Dalekohled pomůže s detaily. Před focením se rozhodněte, zda chcete samotné letadlo,
          nebo i atmosféru místa: diváky na valu, terminály a letištní plochu.
        </p>
        <ul>
          <li><strong>Nechte prostor před přídí.</strong> Letadlo bude mít v záběru kam pokračovat. Zkuste krátkou sérii a později vyberte nejostřejší snímek.</li>
          <li><strong>Hlídejte horizont a plot.</strong> Před příletem si připravte kompozici, abyste pak nemuseli hledat lepší stanoviště mezi ostatními návštěvníky.</li>
          <li><strong>Poznamenejte si čas.</strong> Usnadní vám pozdější určení letu. Registraci nebo typ připisujte k fotografii jen tehdy, když je máte ověřené.</li>
        </ul>
        <Photo name="praha-poznavani-letadel" alt="Informační tabule pro rozpoznávání letadel u vyhlídkového valu v Kněževsi" caption="Informační tabule u vyhlídky může pomoci s rozpoznáváním siluet letadel." />
        <h2 id="otazky">Časté otázky před návštěvou</h2>
        <h3>V kolik přijít na letadla?</h3>
        <p>Podle letů, které chcete vidět. Zkontrolujte aktuální přílety a nechte si rezervu na cestu. Jeden pevný čas nebude nejlepší pro všechny dny ani obě vyhlídky.</p>
        <h3>Má smysl vyrazit s dětmi?</h3>
        <p>Ano, pokud výlet přizpůsobíte délce chůze a počasí. Počítejte s čekáním mezi letadly a zvažte kratší první návštěvu. Na svahu a schodech mějte menší děti u sebe.</p>
        <h3>Uvidím Boeing 747 nebo Airbus A380?</h3>
        <p>Takové setkání nelze slíbit. Boeing 747 v barvách Fly Meta je zachycený na naší fotografii; termín dalšího příletu z ní ale nezjistíte. U A380 sledujte <Link href="/blog/airbus-a380-praha-emirates">přehled nasazení Emirates v Praze</Link> a ověřte konkrétní den.</p>
        <h3>Co když se na val nedostanu?</h3>
        <p>Letiště uvádí i další vyhlídková místa. Aktuální přístup si ověřte v <a href={officialSpots}>oficiálním seznamu</a>. Pro sledování z domova máme <Link href="/blog/letiste-praha-zive">rozcestník živých zdrojů z Prahy</Link>.</p>
        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha', eyebrow: 'Letiště', title: 'Letiště Praha', description: 'Přehled letů, parkování a dostupná živá mapa.' },
          { href: '/blog/letiste-praha-zive', eyebrow: 'Živé zdroje', title: 'Letiště Praha živě', description: 'Jak kombinovat oficiální tabuli s mapou letadel.' },
          { href: '/blog/airbus-a380-praha-emirates', eyebrow: 'Zajímavé letadlo', title: 'Airbus A380 v Praze', description: 'Plánované nasazení a ověření konkrétního letu.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Letiště Praha: vyhlídkové valy a přístupové cesty', href: officialSpots },
          { label: 'Letiště Praha: oficiální přehled letů', href: 'https://www.prg.aero/prehled-letu?hour=all' },
          { label: 'PID: vyhledání aktuálního spojení', href: 'https://pid.cz/' },
        ]} note="Informace o přístupu k valům ověřeny na webu Letiště Praha 18. září 2026. Dopravní omezení, dostupnost zázemí a provoz letiště se mohou měnit. Fotografie pocházejí z vlastního archivu FlyQueens." />
      </article>
    </main>
  )
}
