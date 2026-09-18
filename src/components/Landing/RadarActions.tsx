'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { trackEvent } from '@/lib/analytics'
import styles from '@/app/page.module.css'

export function RadarSearch() {
  return (
    <form
      action="/radar"
      method="get"
      role="search"
      aria-label="Najít let na mapě"
      className={styles.search}
      onSubmit={(event) => {
        const form = new FormData(event.currentTarget)
        trackEvent('Homepage Radar Search Submitted', { hasQuery: Boolean(String(form.get('search') ?? '').trim()) })
      }}
    >
      <label htmlFor="home-flight-search" className={styles.searchLabel}>Najít let na mapě</label>
      <div className={styles.searchControls}>
        <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
        <input
          id="home-flight-search"
          name="search"
          maxLength={10}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          enterKeyHint="search"
          aria-describedby="home-flight-search-help"
          placeholder="Např. TVS123 nebo OK-ABC"
        />
        <button type="submit">Najít</button>
      </div>
      <p id="home-flight-search-help" className={styles.searchHelp}>Zadej volací znak, registraci nebo ICAO adresu. Hledáme lety v aktuální oblasti radaru.</p>
    </form>
  )
}

export function RadarLink({ className, source, children }: { className?: string; source: string; children: ReactNode }) {
  return (
    <Link href="/radar" className={className} onClick={() => trackEvent('Homepage Radar Opened', { source })}>
      {children}
    </Link>
  )
}
