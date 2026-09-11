'use client'

import { useEffect, useState } from 'react'

type Summary = {
  count: number
  status: 'live' | 'stale' | 'unavailable'
  source: string | null
}

export function LiveFlightCount({ className, dotClassName }: { className: string; dotClassName: string }) {
  const [summary, setSummary] = useState<Summary>({ count: 0, status: 'unavailable', source: null })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const response = await fetch('/api/flights?summary=1', {
          cache: 'no-store',
          signal: controller.signal,
        })
        const data = await response.json() as Partial<Summary>
        setSummary({
          count: typeof data.count === 'number' ? data.count : 0,
          status: response.ok ? (data.status ?? 'unavailable') : 'unavailable',
          source: data.source ?? null,
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setSummary((current) => ({ ...current, status: current.count ? 'stale' : 'unavailable' }))
      }
    }

    load()
    return () => controller.abort()
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
