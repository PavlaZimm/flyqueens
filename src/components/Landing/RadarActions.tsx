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
      className={styles.search}
      onSubmit={(event) => {
        const form = new FormData(event.currentTarget)
        trackEvent('Homepage Radar Search Submitted', { hasQuery: Boolean(String(form.get('search') ?? '').trim()) })
      }}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
      <input
        name="search"
        maxLength={10}
        autoComplete="off"
        aria-label="Číslo letu, registrace nebo ICAO adresa"
        placeholder="Let, registrace nebo ICAO — např. TVS123"
      />
      <button type="submit">Najít</button>
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
