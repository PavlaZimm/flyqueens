import type { Metadata } from 'next'
import Link from 'next/link'
import { getAirportBoard } from '@/lib/airportBoardServer'
import { PragueToday } from '@/components/Flight/PragueToday'
import styles from '@/components/Flight/FlightTools.module.css'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Dnes na letišti Praha: přílety, letadla a počasí | FlyQueens',
  description: 'Naplánuj si planespotting v Praze: zajímavá letadla, přílety kolem západu slunce, fotografie konkrétních strojů a aktuální letištní počasí.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/praha/dnes' },
}
export default async function PragueTodayPage() {
  const board = await getAirportBoard('PRG')
  // Dynamic server request: pass one timestamp to preserve hydration consistency.
  // eslint-disable-next-line react-hooks/purity
  const initialNow = Date.now()
  return <main className={styles.page}>
    <nav aria-label="Drobečková navigace"><Link href="/">FlyQueens</Link> · <Link href="/letiste/praha">Letiště Praha</Link> · Dnes</nav>
    <h1>Dnes na letišti Praha</h1>
    <p className={styles.intro}>Co má přiletět, jaké letadlo čekat a jak to vypadá s počasím. Před cestou k letišti si zkontroluj nejbližší přílety a odhad směru provozu.</p>
    <PragueToday initialData={board} initialNow={initialNow} />
    <section className={styles.card}>
      <h2>Kam vyrazit na letadla</h2>
      <p>V našem průvodci najdeš vyhlídky v Kněževsi a u Hostivice, přístup a vlastní fotografie. Odhad dráhy výše pomůže s orientací, směr provozu se ale může změnit.</p>
      <Link href="/letiste/praha/planespotting">Vyhlídky Kněževes a Hostivice →</Link>
    </section>
    <p className={styles.muted}>Provozní údaje potvrzuje letiště nebo dopravce. Fotografie jsou archivní; přidělené letadlo se může změnit. Odhad dráhy z ADS-B není oficiální pokyn řízení letového provozu.</p>
  </main>
}
