import type { Metadata } from 'next'
import Link from 'next/link'
import { socialMetadata } from '@/lib/socialMetadata'
import { getAirportBoard } from '@/lib/airportBoardServer'
import { PragueToday } from '@/components/Flight/PragueToday'
import styles from '@/components/Flight/FlightTools.module.css'
export const dynamic = 'force-dynamic'
const title = 'Planespotting Praha dnes: přílety a západ slunce | FlyQueens'
const description = 'Naplánujte si planespotting v Praze. Zajímavá letadla, dostupné fotografie, přílety kolem západu slunce, počasí a odkazy na vyhlídky.'
const url = 'https://www.flyqueens.cz/letiste/praha/dnes'
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  ...socialMetadata({ title, description, url, image: { url: '/spotting/praha-vyhlidkovy-val.webp', width: 1600, height: 1200, alt: 'Vyhlídkový val v Kněževsi u letiště Praha' } }),
}
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', '@id': url, url, name: title, description, inLanguage: 'cs-CZ', isPartOf: { '@type': 'WebSite', name: 'FlyQueens', url: 'https://www.flyqueens.cz' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
      { '@type': 'ListItem', position: 2, name: 'Letiště Praha', item: 'https://www.flyqueens.cz/letiste/praha' },
      { '@type': 'ListItem', position: 3, name: 'Dnes', item: url },
    ] },
  ],
}
export default async function PragueTodayPage() {
  const board = await getAirportBoard('PRG')
  // Dynamic server request: pass one timestamp to preserve hydration consistency.
  // eslint-disable-next-line react-hooks/purity
  const initialNow = Date.now()
  return <main className={styles.page}>
    <nav aria-label="Drobečková navigace"><Link href="/">FlyQueens</Link> · <Link href="/letiste/praha">Letiště Praha</Link> · Dnes</nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <h1>Planespotting Praha: co přiletí dnes</h1>
    <p className={styles.intro}>Chystáte se pozorovat letadla na letišti Praha? Vyberte si zajímavý přílet podle typu stroje, prohlédněte si dostupnou fotografii a porovnejte čas příletu se západem slunce. Před odjezdem zkontrolujte počasí a odhad používané dráhy.</p>
    <PragueToday initialData={board} initialNow={initialNow} />
    <section className={styles.card} aria-labelledby="planovani-spottingu">
      <h2 id="planovani-spottingu">Jak si naplánovat pozorování letadel</h2>
      <h3>Kdy vyrazit na letiště?</h3>
      <p>Podívejte se na přílety v příštích šesti hodinách a připočítejte si čas na cestu a příchod k vyhlídce. Odpočet ukazuje čas do očekávaného příletu, nikoli doporučený čas odjezdu z domova.</p>
      <h3>Jak zjistit, kdy přiletí Airbus A380?</h3>
      <p>Zapněte filtr „Tipy na letadla“ a hledejte uvedený typ Airbus A380. Podrobnosti o lince EK139 a ověřování nasazení najdete v článku <Link href="/blog/airbus-a380-praha-emirates">Airbus A380 v Praze: letový řád Emirates</Link>. Typ letadla se může změnit.</p>
      <h3>Je večerní přehled zárukou dobrého světla?</h3>
      <p>Ne. Vybírá dostupné přílety hodinu před západem a půl hodiny po něm. Oblačnost i místo fotografování mohou výsledek změnit. Ranní letový řád navíc nemusí pokrývat celý večer.</p>
      <p>Hledáte kompletní dostupnou tabuli pro cestování? Otevřete <Link href="/letiste/praha/odlety">odlety a přílety letiště Praha</Link>. Pro výběr místa slouží <Link href="/letiste/praha/planespotting">průvodce vyhlídkami v Kněževsi a u Hostivice</Link>.</p>
    </section>
    <p className={styles.muted}>Provozní údaje potvrzuje letiště nebo dopravce. Fotografie jsou archivní; přidělené letadlo se může změnit. Odhad dráhy z ADS-B není oficiální pokyn řízení letového provozu.</p>
  </main>
}
