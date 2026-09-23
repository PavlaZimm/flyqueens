'use client'

import { useEffect, useState } from 'react'
import type { RunwayInUseResponse } from '@/lib/runwayInUse'
import { MIN_AIRCRAFT_FOR_ESTIMATE } from '@/lib/runwayInUseShared'

const REFRESH_MS = 2 * 60_000
const TIME_FORMATTER = new Intl.DateTimeFormat('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' })

function aircraftLabel(count: number): string {
  if (count === 1) return '1 letadla'
  return `${count} letadel`
}

function windText(wind: RunwayInUseResponse['wind']): string | null {
  if (!wind || wind.speedKt == null) return null
  const kmh = Math.round(wind.speedKt * 1.852)
  if (wind.speedKt === 0) return 'Bezvětří'
  const direction = wind.variable ? 'proměnlivý' : wind.directionDeg != null ? `z ${wind.directionDeg}°` : null
  return `Vítr ${direction ? `${direction}, ` : ''}${kmh} km/h`
}

/** Odhad dráhy v provozu z poloh letadel u letiště (zatím jen Praha). */
export function RunwayInUse({ icao = 'LKPR', city = 'Praha' }: { icao?: string; city?: string }) {
  const [data, setData] = useState<RunwayInUseResponse | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const response = await fetch(`/api/runway-in-use?airport=${icao}`, { signal: controller.signal })
        if (!response.ok) throw new Error(String(response.status))
        setData(await response.json() as RunwayInUseResponse)
        setFailed(false)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setFailed(true)
      }
    }
    void load()
    const timer = window.setInterval(() => void load(), REFRESH_MS)
    return () => {
      controller.abort()
      window.clearInterval(timer)
    }
  }, [icao])

  const active = data?.status === 'ok'
    ? data.ends.filter(end => end.count >= MIN_AIRCRAFT_FOR_ESTIMATE)
    : []

  let headline: string
  let detail: string | null = null
  if (failed && !data) {
    headline = 'Živá data teď nejsou dostupná'
  } else if (!data) {
    headline = 'Zjišťuji, kterým směrem se létá…'
  } else if (active.length) {
    const names = active.map(end => end.end)
    headline = names.length === 1
      ? `${city} teď pravděpodobně používá dráhu ${names[0]}`
      : `${city} teď pravděpodobně používá dráhy ${names.slice(0, -1).join(', ')} a ${names[names.length - 1]}`
    detail = `Podle ${aircraftLabel(data.aircraftUsed)}, která právě nízko přistávají nebo vzlétají.`
  } else {
    headline = 'Teď u letiště nízko neletí dost letadel na odhad'
    detail = 'Zkuste to za pár minut, v noci a mimo špičku bývá provoz slabý.'
  }

  const wind = data ? windText(data.wind) : null
  const updated = data ? TIME_FORMATTER.format(new Date(data.fetchedAt)) : null

  return (
    <section aria-live="polite" style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '15px 16px', margin: '0 0 22px' }}>
      <p style={{ margin: '0 0 6px', color: 'var(--gold)', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        Dráha v provozu · odhad
      </p>
      <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif', fontSize: 18, lineHeight: 1.3 }}>{headline}</strong>
      {detail && <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>{detail}</p>}
      {(wind || updated) && (
        <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>
          {[wind, updated ? `aktualizováno ${updated}` : null].filter(Boolean).join(' · ')}
        </p>
      )}
      <p style={{ margin: '8px 0 0', fontSize: 11, lineHeight: 1.6, color: 'var(--text-dim)' }}>
        Odhad z dat ADS-B podle směru letadel nízko nad letištěm, nejde o oficiální informaci řízení letového provozu. Směr se může během dne změnit, obvykle podle větru.
      </p>
    </section>
  )
}
