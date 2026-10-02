'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { FlightSearchForm } from '@/components/Flight/FlightSearchForm'
import { trackEvent } from '@/lib/analytics'
import styles from '@/app/page.module.css'

export function RadarSearch() {
  return <div className={styles.search}>
    <p className={styles.searchLabel}>Kam letí tvůj let?</p>
    <FlightSearchForm />
    <p className={styles.searchHelp}>Zadej číslo z letenky a datum odletu. Registraci nebo volací znak vyhledáš na <Link href="/radar">živé mapě</Link>.</p>
  </div>
}

export function RadarLink({ className, source, children }: { className?: string; source: string; children: ReactNode }) {
  return (
    <Link href="/radar" className={className} onClick={() => trackEvent('Homepage Radar Opened', { source })}>
      {children}
    </Link>
  )
}
