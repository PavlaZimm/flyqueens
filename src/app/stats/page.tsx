'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFlights } from '@/hooks/useFlights'
import { czechPlural } from '@/lib/plural'
import { REGION_CONFIGS } from '@/lib/constants'
import { isEmergencyFlight } from '@/lib/emergency'
import { trackEvent } from '@/lib/analytics'
import type { Flight } from '@/types/flight'
import styles from './page.module.css'

type RankedItem = { label: string; value: string; sub?: string; callsign?: string }
type BarItem = { label: string; value: number; note?: string }

const altitudeBands = [
  { label: 'Do 1 km', min: 0, max: 1_000 },
  { label: '1 až 3 km', min: 1_000, max: 3_000 },
  { label: '3 až 8 km', min: 3_000, max: 8_000 },
  { label: '8 až 11 km', min: 8_000, max: 11_000 },
  { label: 'Nad 11 km', min: 11_000, max: Number.POSITIVE_INFINITY },
]

const headingSectors = [
  { label: 'S', full: 'sever', center: 0 },
  { label: 'SV', full: 'severovýchod', center: 45 },
  { label: 'V', full: 'východ', center: 90 },
  { label: 'JV', full: 'jihovýchod', center: 135 },
  { label: 'J', full: 'jih', center: 180 },
  { label: 'JZ', full: 'jihozápad', center: 225 },
  { label: 'Z', full: 'západ', center: 270 },
  { label: 'SZ', full: 'severozápad', center: 315 },
]

function median(values: number[]) {
  if (!values.length) return null
  const sorted = [...values].sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function percentage(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 100) : 0
}

function flightLabel(flight: Flight) {
  return flight.callsign.trim() || flight.registration || flight.icao24.toUpperCase()
}

function flightSub(flight: Flight) {
  return [flight.typeDesignator, flight.registration]
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(' · ')
}

function PanelTitle({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className={styles.panelHeading}>
      <h2>{children}</h2>
      {note && <span>{note}</span>}
    </div>
  )
}

function RankedList({ title, items, color = 'var(--gold)' }: { title: string; items: RankedItem[]; color?: string }) {
  return (
    <section className={`glass-panel ${styles.panel}`}>
      <PanelTitle>{title}</PanelTitle>
      <div className={styles.rankedList}>
        {items.map((item, index) => {
          const content = (
            <>
              <span className={styles.rank}>#{index + 1}</span>
              <span className={styles.rankIdentity}>
                <strong style={{ color }}>{item.label}</strong>
                {item.sub && <small>{item.sub}</small>}
              </span>
              <span className={styles.rankValue} style={{ color }}>{item.value}</span>
              {item.callsign && <span className={styles.rankArrow}>→</span>}
            </>
          )
          return item.callsign ? (
            <Link className={styles.rankRow} href={`/radar?flight=${encodeURIComponent(item.callsign)}`} key={`${item.label}-${index}`}>
              {content}
            </Link>
          ) : (
            <div className={styles.rankRow} key={`${item.label}-${index}`}>{content}</div>
          )
        })}
      </div>
    </section>
  )
}

function BarChart({ title, items, color = 'var(--gold)', note }: { title: string; items: BarItem[]; color?: string; note?: string }) {
  const max = Math.max(...items.map(item => item.value), 1)
  return (
    <section className={`glass-panel ${styles.panel}`}>
      <PanelTitle note={note}>{title}</PanelTitle>
      {items.length === 0 ? (
        <p className={styles.emptyState}>Zdroj v tomto vzorku potřebná data neposkytl.</p>
      ) : <div className={styles.bars}>
        {items.map(item => (
          <div className={styles.barItem} key={item.label}>
            <div className={styles.barLabels}>
              <span>{item.label}</span>
              <strong style={{ color }}>{item.value.toLocaleString('cs')}</strong>
            </div>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ background: color, width: `${Math.round((item.value / max) * 100)}%` }} />
            </div>
            {item.note && <small className={styles.barNote}>{item.note}</small>}
          </div>
        ))}
      </div>}
    </section>
  )
}

function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null
  const width = 400, height = 74
  const max = Math.max(...data, 1), min = Math.min(...data), range = max - min || 1
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * (height - 12) - 6
    return `${x},${y}`
  }).join(' ')
  return (
    <svg aria-label="Vývoj počtu letadel od otevření stránky" className={styles.sparkline} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="stats-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F5B83D" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#F5B83D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,${height} ${points} ${width},${height}`} fill="url(#stats-area)" stroke="none" />
      <polyline points={points} fill="none" stroke="#F5B83D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  )
}

function CoverageRow({ label, count, total }: { label: string; count: number; total: number }) {
  const share = percentage(count, total)
  return (
    <div className={styles.coverageRow}>
      <div><span>{label}</span><small>{count.toLocaleString('cs')} z {total.toLocaleString('cs')}</small></div>
      <div className={styles.coverageMeter} aria-label={`${label}: ${share} %`}><span style={{ width: `${share}%` }} /></div>
      <strong>{share} %</strong>
    </div>
  )
}

export default function StatsPage() {
  const { flights, count, loading, dataMeta, region, setRegion } = useFlights()
  const historyRef = useRef<number[]>([])
  const countRef = useRef(0)
  const [history, setHistory] = useState<number[]>([])

  useEffect(() => { countRef.current = count }, [count])
  useEffect(() => {
    const sample = () => {
      if (countRef.current === 0) return
      historyRef.current = [...historyRef.current.slice(-39), countRef.current]
      setHistory([...historyRef.current])
    }
    sample()
    const id = setInterval(sample, 15_000)
    return () => clearInterval(id)
  }, [])

  const changeRegion = (nextRegion: string) => {
    historyRef.current = []
    setHistory([])
    trackEvent('Stats Region Changed', { region: nextRegion })
    setRegion(nextRegion)
  }

  const stats = useMemo(() => {
    const airborne = flights.filter(flight => !flight.onGround)
    const onGround = flights.length - airborne.length
    const altitudes = airborne.map(flight => flight.altitude).filter(Number.isFinite)
    const speeds = airborne.map(flight => flight.velocity).filter(Number.isFinite)
    const snapshotSeconds = dataMeta.fetchedAt
    const climbing = airborne.filter(flight => (flight.baroRate ?? flight.geomRate ?? 0) > 100)
    const descending = airborne.filter(flight => (flight.baroRate ?? flight.geomRate ?? 0) < -100)
    const level = airborne.length - climbing.length - descending.length
    const military = flights.filter(flight => flight.aircraftType === 'military')

    const topFastest = [...airborne].filter(flight => Number.isFinite(flight.velocity)).sort((a, b) => b.velocity - a.velocity).slice(0, 5)
    const topHighest = [...airborne].filter(flight => Number.isFinite(flight.altitude)).sort((a, b) => b.altitude - a.altitude).slice(0, 5)

    const typeCounts = new Map<string, number>()
    flights.forEach(flight => {
      const type = flight.typeDesignator?.trim().toUpperCase()
      if (type) typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1)
    })
    const topTypeDesignators = [...typeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7).map(([label, value]) => ({ label, value }))
    const altitudeDistribution = altitudeBands.map(band => ({ label: band.label, value: altitudes.filter(value => value >= band.min && value < band.max).length }))
    const directionDistribution = headingSectors.map(sector => ({
      label: sector.label,
      value: airborne.filter(flight => {
        if (!flight.headingReported || !Number.isFinite(flight.heading)) return false
        const difference = Math.abs((((flight.heading - sector.center) % 360) + 540) % 360 - 180)
        return difference < 22.5
      }).length,
      note: sector.full,
    }))

    const withOat = airborne.filter(flight => flight.oat != null && Number.isFinite(flight.oat))
    const withWind = airborne.filter(flight => flight.windSpeed != null && Number.isFinite(flight.windSpeed))
    const withMach = airborne.filter(flight => flight.mach != null && Number.isFinite(flight.mach))
    const freshest = flights.filter(flight => {
      const timestamp = flight.positionUpdatedAt ?? flight.lastContactAt
      return timestamp != null && snapshotSeconds != null && snapshotSeconds - timestamp <= 15
    })
    const strongestClimb = [...airborne].filter(flight => Number.isFinite(flight.baroRate)).sort((a, b) => (b.baroRate ?? 0) - (a.baroRate ?? 0))[0]
    const strongestDescent = [...airborne].filter(flight => Number.isFinite(flight.baroRate)).sort((a, b) => (a.baroRate ?? 0) - (b.baroRate ?? 0))[0]
    const strongestWind = [...withWind].sort((a, b) => (b.windSpeed ?? 0) - (a.windSpeed ?? 0))[0]
    const coldest = [...withOat].sort((a, b) => (a.oat ?? 0) - (b.oat ?? 0))[0]

    const interesting: RankedItem[] = []
    if (strongestClimb && (strongestClimb.baroRate ?? 0) > 100) interesting.push({ label: flightLabel(strongestClimb), value: `+${Math.round(strongestClimb.baroRate ?? 0).toLocaleString('cs')} ft/min`, sub: 'nejrychlejší hlášené stoupání', callsign: strongestClimb.callsign.trim() || undefined })
    if (strongestDescent && (strongestDescent.baroRate ?? 0) < -100) interesting.push({ label: flightLabel(strongestDescent), value: `${Math.round(strongestDescent.baroRate ?? 0).toLocaleString('cs')} ft/min`, sub: 'nejrychlejší hlášené klesání', callsign: strongestDescent.callsign.trim() || undefined })
    if (strongestWind) interesting.push({ label: flightLabel(strongestWind), value: `${Math.round(strongestWind.windSpeed ?? 0)} kt`, sub: 'nejsilnější palubou odvozený vítr', callsign: strongestWind.callsign.trim() || undefined })
    if (coldest) interesting.push({ label: flightLabel(coldest), value: `${Math.round(coldest.oat ?? 0)} °C`, sub: 'nejnižší hlášená venkovní teplota', callsign: coldest.callsign.trim() || undefined })

    return {
      airborne, onGround, military, climbing, descending, level,
      medianAltitude: median(altitudes), medianSpeed: median(speeds),
      topFastest, topHighest, topTypeDesignators, altitudeDistribution, directionDistribution, interesting,
      coverage: {
        freshest: freshest.length,
        callsign: flights.filter(flight => flight.callsignReported).length,
        type: flights.filter(flight => Boolean(flight.typeDesignator)).length,
        registration: flights.filter(flight => Boolean(flight.registration)).length,
        weather: flights.filter(flight => flight.oat != null || flight.windSpeed != null).length,
      },
      averages: {
        oat: withOat.length ? Math.round(withOat.reduce((sum, flight) => sum + (flight.oat ?? 0), 0) / withOat.length) : null,
        oatSamples: withOat.length,
        wind: withWind.length ? Math.round(withWind.reduce((sum, flight) => sum + (flight.windSpeed ?? 0), 0) / withWind.length) : null,
        windSamples: withWind.length,
        mach: withMach.length ? withMach.reduce((sum, flight) => sum + (flight.mach ?? 0), 0) / withMach.length : null,
        machSamples: withMach.length,
      },
      emergencyCount: airborne.filter(isEmergencyFlight).length,
    }
  }, [dataMeta.fetchedAt, flights])

  const currentRegion = REGION_CONFIGS[region] ?? REGION_CONFIGS.europe
  const initialLoading = loading && count === 0

  return (
    <main className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
        <Link href="/">FlyQueens</Link><span aria-hidden="true">/</span>
        <span aria-current="page">Statistiky</span>
      </nav>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <span>ŽIVÝ PŘEHLED</span>
          <h1>Živé statistiky letadel: co je právě ve vzduchu</h1>
          <p>Aktuální ADS-B snímek. Nejde o dlouhodobou statistiku ani úplný přehled všech letů.</p>
        </div>
      </header>

      <section className={styles.scopeBar} aria-label="Nastavení sledované oblasti">
        <div><span className={styles.liveDot} /><strong>{currentRegion.flag} {currentRegion.label}</strong><small>okruh {currentRegion.dist} NM, přibližně {Math.round(currentRegion.dist * 1.852)} km</small></div>
        <label><span>Oblast</span><select value={region} onChange={event => changeRegion(event.target.value)}>{Object.entries(REGION_CONFIGS).map(([key, config]) => <option key={key} value={key}>{config.flag} {config.label}</option>)}</select></label>
      </section>

      {initialLoading ? (
        <section className={`glass-panel ${styles.inlineLoading}`} aria-live="polite">
          <span aria-hidden="true">✈️</span>
          <div><strong>Načítám živý snímek</strong><small>Stránka zůstává použitelná, data se doplní hned po přijetí první odpovědi.</small></div>
        </section>
      ) : <>
      {dataMeta.status !== 'live' && <div role="status" className={`${styles.dataNotice} ${dataMeta.status === 'stale' ? styles.stale : styles.unavailable}`}>{dataMeta.message ?? 'Živá data nejsou momentálně dostupná.'}</div>}

      <section className={styles.metrics} aria-label="Základní metriky">
        {[
          { label: 'Zachyceno', value: count.toLocaleString('cs'), sub: 'letadel v oblasti' },
          { label: 'Ve vzduchu', value: stats.airborne.length.toLocaleString('cs'), sub: `${percentage(stats.airborne.length, count)} % vzorku` },
          { label: 'Na zemi', value: stats.onGround.toLocaleString('cs'), sub: 'hlásí stav on-ground' },
          { label: 'Medián výšky', value: stats.medianAltitude == null ? '—' : `${Math.round(stats.medianAltitude / 100) / 10} km`, sub: 'barometrická výška' },
          { label: 'Medián rychlosti', value: stats.medianSpeed == null ? '—' : `${Math.round(stats.medianSpeed)} km/h`, sub: 'rychlost vůči zemi' },
        ].map(metric => <article className={`metric-tile ${styles.metric}`} key={metric.label}><span className="label">{metric.label}</span><strong className="value">{metric.value}</strong><small className="sub">{metric.sub}</small></article>)}
      </section>

      <section className={styles.statusStrip} aria-label="Hlášený pohyb letadel">
        <div><span className={styles.up}>↗</span><strong>{stats.climbing.length}</strong><small>hlásí stoupání</small></div>
        <div><span className={styles.level}>→</span><strong>{stats.level}</strong><small>bez výrazné změny</small></div>
        <div><span className={styles.down}>↘</span><strong>{stats.descending.length}</strong><small>hlásí klesání</small></div>
        <div><span className={styles.military}>◆</span><strong>{stats.military.length}</strong><small>vojenský příznak zdroje</small></div>
      </section>

      {history.length > 3 && <section className={`glass-panel ${styles.trendPanel}`}><PanelTitle note="pouze tato otevřená stránka">Počet zachycených letadel v čase</PanelTitle><div className={styles.trendValue}><strong>{count.toLocaleString('cs')}</strong><span>teď</span></div><Sparkline data={history} /><div className={styles.trendAxis}><span>od otevření</span><span>teď</span></div></section>}

      <div className={styles.twoColumns}>
        <BarChart title="Výškový profil" note={`n = ${stats.airborne.length}`} color="var(--accent-blue)" items={stats.altitudeDistribution} />
        <BarChart title="Směry letu" note="jen hlášené kurzy" color="var(--green-live)" items={stats.directionDistribution} />
      </div>
      <div className={styles.twoColumns}>
        <RankedList title="Nejrychlejší právě teď" items={stats.topFastest.map(flight => ({ label: flightLabel(flight), value: `${Math.round(flight.velocity)} km/h`, sub: flightSub(flight) || 'rychlost vůči zemi', callsign: flight.callsign.trim() || undefined }))} />
        <RankedList title="Nejvýše právě teď" color="var(--lavender)" items={stats.topHighest.map(flight => ({ label: flightLabel(flight), value: `${Math.round(flight.altitude / 100) / 10} km`, sub: `${Math.round(flight.altitude * 3.28084).toLocaleString('cs')} ft barometricky`, callsign: flight.callsignReported ? flight.callsign.trim() : undefined }))} />
      </div>
      <div className={styles.twoColumns}>
        <BarChart title="Nejčastější ICAO typy" note={`${stats.coverage.type} rozpoznaných`} color="var(--lavender)" items={stats.topTypeDesignators} />
        {stats.interesting.length > 0 && <RankedList title="Zajímavé hodnoty právě teď" color="var(--accent-blue)" items={stats.interesting} />}
      </div>

      {(stats.averages.oat != null || stats.averages.wind != null || stats.averages.mach != null) && <section className={styles.atmosphere} aria-label="Atmosférické údaje hlášené letadly">
        <div className={styles.atmosphereIntro}><span>PALUBNÍ DATA</span><h2>Podmínky hlášené letadly</h2><p>Průměr počítáme jen ze strojů, které danou hodnotu skutečně vysílají. Zjevně neplatné extrémy vyřazujeme.</p></div>
        {stats.averages.oat != null && <div><span>Venkovní teplota</span><strong>{stats.averages.oat} °C</strong><small>vzorek {stats.averages.oatSamples} letadel</small></div>}
        {stats.averages.wind != null && <div><span>Odvozený vítr</span><strong>{stats.averages.wind} kt</strong><small>vzorek {stats.averages.windSamples} letadel</small></div>}
        {stats.averages.mach != null && <div><span>Mach</span><strong>M{stats.averages.mach.toFixed(3)}</strong><small>vzorek {stats.averages.machSamples} letadel</small></div>}
      </section>}

      <section className={`glass-panel ${styles.coveragePanel}`}>
        <PanelTitle note="aktuální vzorek">Jak úplná jsou data</PanelTitle>
        <p>Veřejné ADS-B pokrytí není stoprocentní. Tohle ukazuje, kolik z právě zachycených záznamů má konkrétní údaj.</p>
        <div className={styles.coverageGrid}>
          <CoverageRow label="Poloha mladší 15 s" count={stats.coverage.freshest} total={count} />
          <CoverageRow label="Volací znak" count={stats.coverage.callsign} total={count} />
          <CoverageRow label="ICAO typový kód" count={stats.coverage.type} total={count} />
          <CoverageRow label="Registrace" count={stats.coverage.registration} total={count} />
          <CoverageRow label="Teplota nebo vítr" count={stats.coverage.weather} total={count} />
        </div>
      </section>

      {stats.emergencyCount > 0 && <section className={styles.emergency} role="alert"><span aria-hidden="true">🚨</span><div><strong>{stats.emergencyCount} {czechPlural(stats.emergencyCount, 'let vysílá', 'lety vysílají', 'letů vysílá')} nouzový údaj</strong><small>Nouzový stav nebo squawk 7700, 7600 či 7500. Veřejná data mohou být neúplná.</small></div></section>}

      <footer className={styles.footerNote}><strong>{dataMeta.status === 'live' ? `Živá data · ${dataMeta.source}` : 'Živá data nejsou dostupná'}</strong><span>Obnova přibližně každých 10 sekund · žádné hodnoty na této stránce nejsou dlouhodobě ukládány</span></footer>
      </>}
    </main>
  )
}
