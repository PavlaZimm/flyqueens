import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/UI/SiteHeader'
import { SiteFooter } from '@/components/UI/SiteFooter'
import { FlightSearchForm } from '@/components/Flight/FlightSearchForm'
import { FlightSearchResults } from '@/components/Flight/FlightSearchResults'
import { validateFlightSearch } from '@/lib/flightSearch'
import styles from '@/components/Flight/FlightTools.module.css'
export const metadata: Metadata = { title: 'Najít let podle čísla a data | FlyQueens', robots: { index: false, follow: true } }
export default async function FlightPage({ searchParams }: { searchParams: Promise<{ number?: string; date?: string }> }) {
  const params = await searchParams
  const number = typeof params.number === 'string' ? params.number.slice(0, 12) : ''
  const date = typeof params.date === 'string' ? params.date.slice(0, 10) : ''
  const input = validateFlightSearch(number, date)
  return <><SiteHeader /><main className={styles.page}>
    <Link href="/">FlyQueens</Link><h1>Najít let podle letenky</h1>
    <p className={styles.intro}>Číslo letu a datum odletu stačí k vyhledání dostupného letového řádu i před vzletem. Datum zadejte podle místního času odletového letiště.</p>
    <FlightSearchForm number={number} date={date} />
    {number || date ? 'error' in input ? <p role="alert">{input.error}</p> : <FlightSearchResults key={`${input.number}:${input.date}`} number={input.number} date={input.date} /> : <p>Hledat můžete posledních 7 a příštích 30 dní. Dostupnost záleží na letišti, dopravci a termínu.</p>}
    <nav className={styles.links} aria-label="Další možnosti"><Link href="/letiste/praha/dnes">Dnes na letišti Praha</Link><Link href="/radar">Hledat podle registrace na radaru</Link></nav>
  </main><SiteFooter /></>
}
