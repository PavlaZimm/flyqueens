'use client'

import { useEffect, useMemo, useState } from 'react'
import styles from '@/app/page.module.css'
import { EMPTY_FLIGHT_SUMMARY, fetchFlightSummary } from '@/lib/flightSummaryClient'
import type { FlightSummary } from '@/lib/flightSummaryClient'

const BANDS = [
  { key: 'high', label: 'nad 9 km' },
  { key: 'medium', label: '3–9 km' },
  { key: 'low', label: 'pod 3 km' },
] as const

export function LiveRadarPreview() {
  const [summary, setSummary] = useState<FlightSummary>(EMPTY_FLIGHT_SUMMARY)

  useEffect(() => {
    let active = true
    let timer: ReturnType<typeof setTimeout> | undefined

    async function load() {
      if (document.hidden || !navigator.onLine) return
      try {
        const data = await fetchFlightSummary()
        if (!active) return
        setSummary(data)
      } catch (error) {
        if (!active || (error instanceof DOMException && error.name === 'AbortError')) return
        setSummary((current) => ({
          ...current,
          status: current.count ? 'stale' : 'unavailable',
        }))
      } finally {
        if (active && !document.hidden && navigator.onLine) timer = setTimeout(load, 10_000)
      }
    }

    const resume = () => {
      if (document.hidden || !navigator.onLine) return
      if (timer) clearTimeout(timer)
      load()
    }
    const pause = () => { if (timer) clearTimeout(timer) }
    const onVisibilityChange = () => { if (document.hidden) pause(); else resume() }

    load()
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('online', resume)
    window.addEventListener('offline', pause)
    return () => {
      active = false
      if (timer) clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('online', resume)
      window.removeEventListener('offline', pause)
    }
  }, [])

  const maxBand = useMemo(
    () => Math.max(...Object.values(summary.altitudeBands), 1),
    [summary.altitudeBands],
  )

  const statusLabel = summary.status === 'live'
    ? 'ADS-B živě'
    : summary.status === 'stale'
      ? 'Poslední známá data'
      : 'Vyhledávám signál'

  return (
    <section className={styles.radarCard} aria-label="Živý radarový náhled provozu nad Českem a okolím">
      <svg className={styles.radarGraphic} viewBox="0 0 680 520" role="presentation" aria-hidden="true">
        <defs>
          <radialGradient id="radar-glow" cx="62%" cy="48%" r="48%">
            <stop offset="0" stopColor="#4FE0B0" stopOpacity=".16" />
            <stop offset="1" stopColor="#4FE0B0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweep-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4FE0B0" stopOpacity=".02" />
            <stop offset="1" stopColor="#4FE0B0" stopOpacity=".34" />
          </linearGradient>
          <pattern id="radar-grid" width="58" height="58" patternUnits="userSpaceOnUse">
            <path d="M58 0H0V58" fill="none" stroke="#22304A" strokeOpacity=".6" strokeWidth="1" />
          </pattern>
          <clipPath id="radar-scope">
            <circle cx="420" cy="270" r="174" />
          </clipPath>
        </defs>

        <rect width="680" height="520" fill="url(#radar-grid)" />
        <rect width="680" height="520" fill="url(#radar-glow)" />
        <g className={styles.scopeGrid}>
          <circle cx="420" cy="270" r="55" />
          <circle cx="420" cy="270" r="110" />
          <circle cx="420" cy="270" r="165" />
          <path d="M255 270H585M420 105V435" />
        </g>

        <g className={styles.radarSweep} clipPath="url(#radar-scope)">
          <path d="M420 270L420 96A174 174 0 0 1 543 147Z" fill="url(#sweep-fill)" />
          <path d="M420 270L543 147" />
        </g>

        <circle className={styles.radarPulse} cx="420" cy="270" r="12" />
        <circle cx="420" cy="270" r="3" fill="#4FE0B0" />

        {summary.radar.map((flight, index) => (
          <g
            key={flight.id}
            className={`${styles.liveAircraft} ${index === 0 ? styles.primaryAircraft : ''}`}
            style={{ transform: `translate(${flight.x}px, ${flight.y}px) rotate(${flight.heading}deg)` }}
          >
            <circle className={styles.aircraftPing} r="8" />
            <path d="M0-8 2-2l7 3v2L2 2 1 8h-2l-1-6-7 1V1l7-3 2-6Z" />
          </g>
        ))}
      </svg>

      <div className={styles.radarStatus} data-status={summary.status}>
        <span className={styles.radarStatusDot} />
        {statusLabel}
      </div>

      <div className={styles.radarLabel}>
        <span>ČESKO + OKOLÍ</span>
        <strong>{summary.count ? `${summary.count.toLocaleString('cs-CZ')} strojů` : 'Načítám provoz'}</strong>
        <small>
          {summary.airborne
            ? `${summary.airborne.toLocaleString('cs-CZ')} ve vzduchu · ${summary.onGround.toLocaleString('cs-CZ')} na zemi`
            : 'obnova každých 10 sekund'}
        </small>
      </div>

      <div className={styles.trafficProfile}>
        <div className={styles.profileHeader}>
          <span>VÝŠKOVÝ PROFIL</span>
          <span>
            Ø {summary.avgAltitude ? `${(summary.avgAltitude / 1_000).toLocaleString('cs-CZ', { maximumFractionDigits: 1 })} km` : '—'}
            <i>·</i>
            Ø {summary.avgSpeed ? `${summary.avgSpeed.toLocaleString('cs-CZ')} km/h` : '—'}
          </span>
        </div>
        <div className={styles.profileBars}>
          {BANDS.map((band) => {
            const value = summary.altitudeBands[band.key]
            return (
              <div className={styles.profileRow} key={band.key}>
                <span>{band.label}</span>
                <div><i style={{ width: `${Math.max(value ? 8 : 0, value / maxBand * 100)}%` }} /></div>
                <strong>{value || '—'}</strong>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.radarScale}>250 NM · VZOREK ŽIVÝCH POZIC</div>
    </section>
  )
}
