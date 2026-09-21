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

const post = POSTS.find((entry) => entry.slug === 'letiste-tivat')!
const title = 'Letiště Tivat: lety z Prahy, parkování a provoz 2026'
const description = 'Letiště Tivat (TIV) u Kotoru a Budvy: přímé lety Air Montenegro z Prahy, ceny parkování 2026 a proč se tu v noci nelétá. S vlastními fotkami.'
const url = 'https://www.flyqueens.cz/blog/letiste-tivat'
const aip = 'https://smatsa.rs/upload/aip/published/03-Sep-2026-A/2026-09-03-AIRAC/html/eAIP/LY-AD-2.LYTV-en-GB.html'
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
      publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      about: { '@type': 'Airport', name: 'Letiště Tivat', iataCode: 'TIV', icaoCode: 'LYTV', sameAs: 'https://montenegroairports.com/en/tivat-airport/' },
      image: [
        'https://www.flyqueens.cz/blog/letiste-tivat-draha-hory.webp',
        'https://www.flyqueens.cz/blog/letiste-tivat-easyjet-pristani.webp',
        'https://www.flyqueens.cz/blog/letiste-tivat-plot-odstavna-plocha.webp',
        'https://www.flyqueens.cz/blog/letiste-tivat-turkish-airlines-hrnek.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Letiště Tivat', item: url },
      ],
    },
  ],
}

export default function LetisteTivatArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
          <Link href="/">FlyQueens</Link><span aria-hidden="true">/</span>
          <Link href="/blog">Blog</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Letiště Tivat</span>
        </nav>
        <h1>{title}</h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        <p className={styles.lead}>Letiště Tivat (IATA TIV, ICAO LYTV) leží asi 4 kilometry od centra Tivatu na pobřeží Boky kotorské, pod horami. Z Prahy sem v sezoně 2026 létá Air Montenegro. Letiště má omezenou provozní dobu a mimo ni se smí přistávat a vzlétat jen za denního světla, takže noční lety tu neuvidíte.</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Hodnota</th></tr></thead>
            <tbody>
              <tr><td>Kódy</td><td>IATA TIV, ICAO LYTV</td></tr>
              <tr><td>Dráha</td><td>14/32, 2 500 × 45 m, asfalt</td></tr>
              <tr><td>Do centra Tivatu</td><td>4 km</td></tr>
              <tr><td>Do Kotoru</td><td>8 km, asi 12 minut autem</td></tr>
              <tr><td>Do Budvy</td><td>21 km, asi 27 minut autem</td></tr>
              <tr><td>Cestující v roce 2024</td><td>1 124 203</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: <a href={aip}>letecká informační příručka Černé Hory (AIP), AD 2 LYTV</a>, vydání platné od 3. 9. 2026; <a href="https://montenegroairports.com/en/tivat-airport/how-to-reach-us/">Airports of Montenegro, How to reach us</a>; <a href="https://montenegroairports.com/wp-content/uploads/2025/09/5_Tivat-Airport-Passenger-traffic-2003-2024.jpg">statistika cestujících provozovatele</a>.</p>

        <figure className={styles.photo}><Image src="/blog/letiste-tivat-draha-hory.webp" alt="Dráha letiště Tivat, vlevo terminál a věž, v pozadí hory nad Bokou kotorskou" width={1600} height={738} sizes={sizes} preload /><figcaption>Pohled podél dráhy, terminál a věž stojí vlevo, za nimi hory. Foto: vlastní archiv FlyQueens, 28. července 2025.</figcaption></figure>

        <h2>Kde letiště leží a jak se dostanete do Kotoru a Budvy?</h2>
        <p>Letiště leží jihovýchodně od centra Tivatu. Do Kotoru je to podle provozovatele 8 kilometrů a asi 12 minut autem, do Budvy 21 kilometrů a 27 minut. Do 60 kilometrů vzdáleného Baru počítejte s více než hodinou jízdy (<a href="https://montenegroairports.com/en/tivat-airport/how-to-reach-us/">Airports of Montenegro</a>). Časy jsou orientační a nepočítají s dopravní situací.</p>
        <p>Letecká informační příručka uvádí jako dopravu na letiště jen obecně „bus, taxi“, bez zastávek a jízdného (<a href={aip}>AIP, AD 2.5</a>). Na rozdíl od letiště Podgorica provozovatel pro Tivat nezveřejňuje žádnou autobusovou linku ani ceník taxi. Bez auta tedy počítejte s taxi nebo transferem domluveným předem a cenu si potvrďte ještě před nástupem.</p>

        <h2>Létá se do Tivatu přímo z Prahy a Brna?</h2>
        <p>Air Montenegro létá z Prahy do Tivatu v sezoně 2026 ve středu a v pátek, od 5. 6. do 22. 7. a znovu od 29. 7. do 30. 9. Vychází to ze sezonního letového řádu provozovatele letiště, staženého 21. 9. 2026 (<a href="https://montenegroairports.com/en/tivat-airport/destinations/">Airports of Montenegro, Destinations</a>). Tabulka uvádí časy z pohledu Tivatu: do Prahy se odlétá v 11:30 a letadlo z Prahy přistává v 15:30 místního času. Černá Hora má stejný časový posun jako Česko.</p>
        <p>Z Brna se v létě 2026 létalo v sobotu, sezona podle stejné tabulky skončila 19. 9. 2026. Ostrava, Pardubice ani Karlovy Vary v letovém řádu nejsou.</p>
        <p>Air Montenegro ohlásilo linku Praha–Tivat v únoru 2022. Létat měla od 14. 6. téhož roku v úterý a v sobotu, s letadlem Embraer E195 pro 116 cestujících. Podle tehdy zveřejněného řádu měl let Praha–Tivat trvat hodinu a půl, 14:40–16:10 (<a href="https://www.prg.aero/en/air-montenegro-connects-czech-republic-and-montenegro-direct-flights">tisková zpráva Letiště Praha, 9. 2. 2022</a>). Aktuální časy a délku letu uvidíte v rezervaci u dopravce. Odlety z české strany najdete na stránce <Link href="/letiste/praha">Letiště Praha</Link>.</p>
        <p>Pokud letíte se zájezdem, termín i letiště odletu vám potvrdí cestovní kancelář. Charterové lety jsme v sezonní tabulce provozovatele nenašli.</p>

        <h2>Kolik stojí parkování u letiště Tivat?</h2>
        <p>Letiště Tivat vlastní parkoviště nemá. Vedle letiště je veřejné placené parkoviště, které v roce 2026 provozuje firma Parking Servis Tivat. Dlouhodobé stání se domlouvá přímo s ní a provozovatel letiště za škody na zaparkovaných autech neodpovídá (<a href="https://montenegroairports.com/en/general-information/frequently-asked-questions/">časté otázky provozovatele letiště</a>).</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Služba</th><th scope="col">Cena</th></tr></thead>
            <tbody>
              <tr><td>Osobní auto, každá započatá hodina</td><td>2,00 €</td></tr>
              <tr><td>Denní stání (v ceníku „ležarina“)</td><td>15,00 €</td></tr>
              <tr><td>Ztracený parkovací lístek</td><td>50,00 €</td></tr>
              <tr><td>Autobus, mikrobus nebo VIP transfer se smlouvou</td><td>15,00 € za hodinu</td></tr>
              <tr><td>Totéž bez smlouvy</td><td>30,00 € za hodinu</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href="https://parkingservistivat.me/cjenovnik">ceník Parking Servis Tivat</a>, stav k 21. 9. 2026.</p>
        <p>Parkoviště je otevřené nepřetržitě (<a href="https://parkingservistivat.me/parking-usluge">Parking Servis Tivat</a>). Stání pro osoby se zdravotním postižením jsou v první řadě, nejblíž terminálu (<a href="https://montenegroairports.com/en/tivat-airport/airport-procedures/">Airports of Montenegro, Airport procedures</a>).</p>

        <h2>Proč se v Tivatu v noci nelétá?</h2>
        <p>Letiště má pevnou provozní dobu, která se mění podle sezony. Mimo ni smí letadlo přistát nebo vzlétnout jen za denního světla a jen s předchozím souhlasem provozovatele. Noční provoz tím v praxi odpadá. Dráha 14/32 navíc podle AIP nemá přibližovací ani boční světla, jen sklonové ukazatele PAPI.</p>
        <p>Podle AIP platí tyto časy (místní čas):</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Období</th><th scope="col">Provozní doba</th></tr></thead>
            <tbody>
              <tr><td>Zimní čas</td><td>07:00–16:30</td></tr>
              <tr><td>Od začátku letního času do 10. 9.</td><td>06:30–19:30</td></tr>
              <tr><td>11. 9.–30. 9.</td><td>06:30–19:00</td></tr>
              <tr><td>Od 1. 10. do konce letního času</td><td>07:00–18:00</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={aip}>AIP Černé Hory, AD 2.3 a AD 2.14</a>, vydání platné od 3. 9. 2026.</p>
        <p>Mimo provozní dobu se smí létat od 30 minut před východem do 30 minut po západu slunce. Žádost o provoz před začátkem provozní doby musí provozovatel dostat nejpozději 96 hodin předem, o provoz po jejím konci nejpozději hodinu před koncem. Na internetu se objevuje i provoz do 22:00 nebo „24 hodin denně“. Podle AIP neplatí ani jedno.</p>
        <p>Neobvyklé je i přiblížení. Na dráhu 14 vede jen nepřístrojové přiblížení, na dráhu 32 nepřesné přístrojové s kurzovým majákem natočeným o 20 stupňů od osy dráhy. U přístrojových postupů na dráhu 32 příručka upozorňuje, že terén na několika místech zasahuje do okraje ochranných ploch (<a href={aip}>AIP, AD 2.19 až 2.25</a>). Je to technický údaj pro piloty, ne důvod k obavám pro cestující.</p>

        <figure className={styles.photo}><Image src="/blog/letiste-tivat-easyjet-pristani.webp" alt="Airbus easyJet s vysunutým podvozkem nízko nad letištěm Tivat" width={1600} height={830} sizes={sizes} /><figcaption>Airbus easyJet s registrací G-EZOP nízko nad okolím letiště. Foto: vlastní archiv FlyQueens, 28. července 2025.</figcaption></figure>

        <h2>Kde sledovat letadla v Tivatu?</h2>
        <p>Přílety a odlety můžete sledovat na <Link href="/radar">radaru letadel FlyQueens</Link> v oblasti jihovýchodní Evropy. Nízko nad letištěm, pod okolními horami, ale radar signál letadla zachytit nemusí. Konkrétní spoj najdete postupem z návodu <Link href="/blog/jak-sledovat-let-podle-cisla">jak sledovat let podle čísla</Link>.</p>
        <p>Naše fotografie z 28. července 2025 ukazují, jak nízko letadla nad okolím letiště létají, a ukazují i okolní hory, které z Tivatu dělají vděčné místo pro focení.</p>
        <figure className={styles.photo}><Image src="/blog/letiste-tivat-plot-odstavna-plocha.webp" alt="Silnice podél plotu letiště Tivat, za plotem stojící letadla a hory" width={1600} height={738} sizes={sizes} /><figcaption>Silnice podél oplocení, za plotem odstavná plocha s dopravními letadly. Foto: vlastní archiv FlyQueens, 28. července 2025.</figcaption></figure>
        <figure className={styles.photo}><Image src="/blog/letiste-tivat-turkish-airlines-hrnek.webp" alt="Plecháček v ruce a nad ním nízko letící Airbus Turkish Airlines v Tivatu" width={1600} height={737} sizes={sizes} /><figcaption>Airbus v barvách Turkish Airlines nad plecháčkem, podvečer. Foto: vlastní archiv FlyQueens, 28. července 2025.</figcaption></figure>
        <p>Konkrétní spotterská místa, například u čerpací stanice za kruhovým objezdem u prahu dráhy 32 nebo u silnice, která k němu vede, popisuje komunitní web <a href="https://www.spotterguide.net/planespotting/europe/montenegro/tivat-lytv-tiv/">spotterguide.net</a> s aktualizací ze září 2024. Tato místa jsme neověřovali a přístup se od té doby mohl změnit.</p>
        <p>Respektujte oplocení a nechoďte na neveřejné plochy. Okolí letiště je podle provozovatele bezdronová zóna a létat s dronem v noci ani u letiště se nesmí (<a href="https://montenegroairports.com/en/airports-of-montenegro/no-drone-zone/">Airports of Montenegro, No Drone Zone</a>).</p>

        <h2>Časté otázky</h2>
        <div className={styles.faq}>
          <h3>Kolik cestujících letiště Tivat ročně odbaví?</h3>
          <p>V roce 2024 to bylo 1 124 203 cestujících. V přehledu provozovatele za roky 2003–2024 měl nejvíc cestujících rok 2019, celkem 1 367 282, nejméně pandemický rok 2020 s necelými 190 tisíci. Podle jeho historického přehledu připadalo na letní sezonu přes 80 procent provozu.</p>
          <h3>Je parkování u letiště Tivat zdarma?</h3>
          <p>Ne. Letiště vlastní parkoviště nemá a sousední veřejné parkoviště v roce 2026 provozuje Parking Servis Tivat. Osobní auto zaplatí 2 eura za každou započatou hodinu, denní stání stojí 15 eur. Ztracený lístek stojí 50 eur.</p>
          <h3>Kdy je letiště Tivat v provozu?</h3>
          <p>V létě zhruba od půl sedmé ráno do večera, v zimě 07:00–16:30 místního času. Přesné časy podle období jsou v tabulce výše. Mimo provozní dobu lze přistát i vzlétnout jen za denního světla a s předchozím souhlasem provozovatele.</p>
          <h3>Můžu u letiště Tivat létat s dronem?</h3>
          <p>Ne. Okolí letiště je podle provozovatele bezdronová zóna. Mimo ni platí obecná pravidla: dron jen ve vizuálním dohledu do 500 metrů a nejvýš 150 metrů nad zemí, stroje nad 0,5 kilogramu se registrují u černohorské Agentury pro civilní letectví.</p>
          <h3>Jezdí z letiště veřejná doprava do Kotoru nebo Budvy?</h3>
          <p>Letecká příručka uvádí jen obecně „bus, taxi“, bez konkrétní linky. Provozovatel pro Tivat autobusovou zastávku ani ceník nezveřejňuje, takže počítejte s taxi nebo předem domluveným transferem.</p>
        </div>

        <p>Než poletíte, zkontrolujte si aktuální letový řád u Air Montenegro. Den před odletem pak můžete sledovat letadlo, které vás poveze, na radaru.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha', eyebrow: 'Odlet z Česka', title: 'Letiště Praha', description: 'Přílety, odlety, doprava na letiště a parkování.' },
          { href: '/blog/jak-sledovat-let-podle-cisla', eyebrow: 'Návod', title: 'Jak sledovat let podle čísla', description: 'Číslo letu, volací znak a registrace: co zadat do mapy.' },
        ]} />
        <SourcesBox sources={[
          { label: 'AIP Černé Hory (SMATSA), AD 2 LYTV, vydání platné od 3. 9. 2026', href: aip },
          { label: 'Airports of Montenegro: How to reach us', href: 'https://montenegroairports.com/en/tivat-airport/how-to-reach-us/' },
          { label: 'Airports of Montenegro: sezonní letový řád (Destinations)', href: 'https://montenegroairports.com/en/tivat-airport/destinations/' },
          { label: 'Airports of Montenegro: časté otázky', href: 'https://montenegroairports.com/en/general-information/frequently-asked-questions/' },
          { label: 'Airports of Montenegro: No Drone Zone', href: 'https://montenegroairports.com/en/airports-of-montenegro/no-drone-zone/' },
          { label: 'Airports of Montenegro: historie letiště Tivat', href: 'https://montenegroairports.com/en/tivat-airport/tivat-airport-history/' },
          { label: 'Airports of Montenegro: statistika cestujících 2003–2024', href: 'https://montenegroairports.com/wp-content/uploads/2025/09/5_Tivat-Airport-Passenger-traffic-2003-2024.jpg' },
          { label: 'Airports of Montenegro: Airport procedures', href: 'https://montenegroairports.com/en/tivat-airport/airport-procedures/' },
          { label: 'Parking Servis Tivat: ceník 2026', href: 'https://parkingservistivat.me/cjenovnik' },
          { label: 'Parking Servis Tivat: parkovací služby', href: 'https://parkingservistivat.me/parking-usluge' },
          { label: 'Letiště Praha: Air Montenegro spojuje Česko a Černou Horu, 9. 2. 2022', href: 'https://www.prg.aero/en/air-montenegro-connects-czech-republic-and-montenegro-direct-flights' },
          { label: 'spotterguide.net: Tivat (komunitní zdroj, neověřeno)', href: 'https://www.spotterguide.net/planespotting/europe/montenegro/tivat-lytv-tiv/' },
        ]} note="Zdroje ověřeny 21. září 2026. Fotografie pocházejí z vlastního archivu FlyQueens, datum 28. července 2025 vychází z názvů originálních souborů. Místo pořízení snímků není doložené. AIP vychází v cyklech a odkaz na konkrétní vydání může po 1. 10. 2026 zastarat." />
      </article>
    </main>
  )
}
