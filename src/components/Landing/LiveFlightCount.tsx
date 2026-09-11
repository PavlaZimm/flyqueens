'use client'

import { useEffect, useState } from 'react'
import { fetchFlightSummary } from '@/lib/flightSummaryClient'

type Summary = {
  count: number
  status: 'live' | 'stale' | 'unavailable'
  source: string | null
}

export function LiveFlightCount({ className, dotClassName }: { className: string; dotClassName: string }) {
  const [summary, setSummary] = useState<Summary>({ count: 0, status: 'unavailable', source: null })

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const data = await fetchFlightSummary()
        if (!active) return
        setSummary({
          count: typeof data.count === 'number' ? data.count : 0,
          status: data.status ?? 'unavailable',
          source: data.source ?? null,
        })
      } catch {
        if (!active) return
        setSummary((current) => ({ ...current, status: current.count ? 'stale' : 'unavailable' }))
      }
    }

    load()
    return () => { active = false }
  }, [])

  const label = summary.status === 'live'
    ? `${summary.count.toLocaleString('cs-CZ')} strojů v aktuální oblasti`
    : summary.status === 'stale'
      ? `${summary.count.toLocaleString('cs-CZ')} strojů · poslední známá data`
      : 'Živá data se právě načítají'

  return (
    <span className={className} title={summary.source ? `Zdroj: ${summary.source}` : undefined}>
      <span className={dotClassName} data-status={summary.status} aria-hidden="true" />
      {label}
    </span>
  )
}
