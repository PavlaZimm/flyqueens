'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { AirportBoardResponse } from '@/lib/airportFlightBoards'
import { BoardAircraftCard } from '@/components/Airport/BoardAircraftCard'
import { RunwayInUse } from '@/components/Airport/RunwayInUse'
import type { MetarData } from '@/lib/metar'
import { ktsToKmh } from '@/lib/metar'
import type { SolarTimes, InsightData } from '@/lib/aeroInsights'
import { weatherVisual } from '@/lib/weatherVisual'
import { upcomingArrivals } from '@/lib/pragueToday'
import { spottingHighlight } from '@/lib/spottingHighlights'
import { SpottingPlanner } from './SpottingPlanner'
import { SunsetCard } from './SunsetCard'
import { AirportInsights } from './InsightPanel'
import { flightStatus } from '@/lib/flightSearch'
import styles from './FlightTools.module.css'
const formatTime = (value: string | number) => new Date(value).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })

export function PragueToday({ initialData, initialNow, initialSun = null }: { initialData: AirportBoardResponse | null; initialNow: number; initialSun?: InsightData | null }) {
  const [board, setBoard] = useState(initialData)
  const [now, setNow] = useState(initialNow)
  const [failed, setFailed] = useState(false)
  const [weather, setWeather] = useState<(MetarData & { windVrb?: boolean }) | null>(null)
  const [solar, setSolar] = useState<SolarTimes | null>(initialSun?.solar ?? null)
  const [weatherFailed, setWeatherFailed] = useState(false)
  const [onlyTop, setOnlyTop] = useState(false)
  const [visibleCount, setVisibleCount] = useState(12)
  const [expanded, setExpanded] = useState<string | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    const signal = () => AbortSignal.any([controller.signal, AbortSignal.timeout(15000)])
    const loadBoard = async () => {
      try {
        const response = await fetch('/api/airport-flights?airport=PRG', { signal: signal(), cache: 'no-store' })
        if (!response.ok) throw new Error('Board unavailable')
        const data = await response.json() as AirportBoardResponse
        if (!controller.signal.aborted) { setBoard(data); setFailed(false) }
      } catch { if (!controller.signal.aborted) setFailed(true) }
    }
    const loadWeather = async () => {
      try {
        const response = await fetch('/api/metar?icao=LKPR', { signal: signal() })
        if (!response.ok) throw new Error('Weather unavailable')
        const data = await response.json()
        if (!controller.signal.aborted) { setWeather(data); setWeatherFailed(false) }
      } catch { if (!controller.signal.aborted) setWeatherFailed(true) }
    }
    void loadWeather()
    const clock = setInterval(() => setNow(Date.now()), 60000)
    const boards = setInterval(() => void loadBoard(), 5 * 60000)
    const weatherTimer = setInterval(() => void loadWeather(), 10 * 60000)
    return () => { controller.abort(); clearInterval(clock); clearInterval(boards); clearInterval(weatherTimer) }
  }, [])
  const stale = !board?.fetchedAt || now - Date.parse(board.fetchedAt) > 60 * 60000
  const flights = board?.status === 'ready' && !stale && !failed ? upcomingArrivals(board.arrivals, now) : []
  const topCount = flights.filter(flight => spottingHighlight(flight)).length
  const shownFlights = onlyTop ? flights.filter(flight => spottingHighlight(flight)) : flights
  const weatherOld = weather?.obsTime ? now - Date.parse(weather.obsTime) > 2 * 3600000 : true
  const conditions = weather ? weatherVisual(weather, solar, now) : null
  return <>
    <div className={styles.columns}>
      <RunwayInUse />
      <section className={`${styles.card} ${styles.weather}`} aria-label="Počasí na letišti">
        <h2 style={{ marginTop: 0 }}>Počasí na letišti</h2>
        {weather ? <>
          {(weatherOld || weatherFailed) && <p>Starší měření – aktuální počasí se nepodařilo potvrdit.</p>}
          <div className={styles.weatherSummary}><span className={styles.weatherIcon} aria-hidden="true">{conditions?.icon}</span><div><strong className={styles.temperature}>{weather.temp !== null ? `${weather.temp} °C` : '—'}</strong><p>{conditions?.label}</p></div></div>
          <p>{weather.windSpeed !== null ? `Vítr ${ktsToKmh(weather.windSpeed)} km/h` : 'Rychlost větru neuvedena'}{weather.windVrb ? ', proměnlivý směr' : weather.windDir !== null ? ` z ${weather.windDir}°` : ''}{weather.windGust !== null ? `, nárazy ${ktsToKmh(weather.windGust)} km/h` : ''}</p>
          <p className={styles.muted}>METAR LKPR · měření {weather.obsTime ? formatTime(weather.obsTime) : 'bez času'} · AviationWeather.gov</p>
        </> : <p>{weatherFailed ? 'Počasí je dočasně nedostupné.' : 'Načítám poslední měření…'}</p>}
      </section>
    </div>
    <SunsetCard now={now} onSolar={setSolar} initialData={initialSun} />
    <SpottingPlanner board={board} ready={board?.status === 'ready' && !stale && !failed} flights={flights} solar={solar} now={now} weather={weather} weatherReady={!weatherOld && !weatherFailed} />
    <AirportInsights />
    <section aria-labelledby="upcoming-title">
      <h2 id="upcoming-title">Co přiletí v příštích 6 hodinách</h2>
      <p className={styles.muted}>Okno {formatTime(now)}–{formatTime(now + 6 * 3600000)}. Časy jsou pražské. Přehled zahrnuje dostupné nezrušené přílety s budoucím časem, nikoli celý denní provoz.</p>
      {board?.fetchedAt && <p className={styles.muted}>AeroDataBox · data získána {formatTime(board.fetchedAt)}. Zdroj sdílíme s letištní tabulí a obnovujeme přibližně po 30 minutách.</p>}
      {failed || stale || board?.status !== 'ready' ? <p>Aktuální přílety teď nemůžeme potvrdit. <a href="https://www.prg.aero/prehled-letu?hour=all" target="_blank" rel="noopener noreferrer">Otevřít oficiální tabuli ↗</a></p> : !flights.length ? <p>V tomto okně zdroj neposkytl další očekávané přílety. Nejde o potvrzení, že na letišti není provoz.</p> : <>
        <p>{flights.length} dostupných příletů. Fotografie ukazují konkrétní registraci, pokud ji už dopravce poskytl.</p>
        <div className={styles.filters} aria-label="Výběr příletů">
          <button type="button" aria-pressed={!onlyTop} onClick={() => { setOnlyTop(false); setVisibleCount(12) }}>Všechny přílety ({flights.length})</button>
          <button type="button" aria-pressed={onlyTop} onClick={() => { setOnlyTop(true); setVisibleCount(12) }}>✦ Tipy na letadla ({topCount})</button>
        </div>
        <p className={styles.muted}>Tipy vybíráme podle typu stroje a označení nákladního letu. Přidělené letadlo se může změnit.</p>
        {onlyTop && !shownFlights.length && <p>V tomto okně zatím nemáme potvrzený typ, který patří mezi naše tipy.</p>}
        <ol className={styles.list}>{shownFlights.slice(0, visibleCount).map((flight, index) => <li key={flight.id} className={`${styles.card} ${spottingHighlight(flight) ? styles.topFlight : ''}`} data-tone={spottingHighlight(flight)?.tone}>
          {spottingHighlight(flight) && <p className={styles.spottingBadge} title={spottingHighlight(flight)?.reason}>✦ {spottingHighlight(flight)?.title}</p>}
          <div className={styles.arrivalHeader}>
            <h3>{formatTime(flight.revisedTime ?? flight.scheduledTime ?? '')} · {flight.number}</h3>
            <span>{flightStatus(flight.status)}</span>
          </div>
          <p>Z {flight.oppositeAirport.city ?? flight.oppositeAirport.name ?? flight.oppositeAirport.iata ?? 'neuvedeného letiště'} · {flight.aircraft?.model ?? 'Typ letadla zatím není známý'}{flight.isCargo ? ' · nákladní let' : ''}</p>
          {flight.revisedTime && <p className={styles.muted}>Původní plán: {flight.scheduledTime ? formatTime(flight.scheduledTime) : 'neuveden'}</p>}
          {index < 2 || expanded === flight.id ? <div className={styles.photo}><BoardAircraftCard flight={flight} /></div> : <button type="button" className={styles.button} onClick={() => setExpanded(flight.id)}>Letadlo a foto pro {flight.number}</button>}
        </li>)}</ol>
        {shownFlights.length > visibleCount && <button type="button" className={styles.button} onClick={() => setVisibleCount(count => count + 12)}>Další přílety ({shownFlights.length - visibleCount})</button>}
      </>}
      <nav className={styles.links} aria-label="Přehledy letů"><Link href="/letiste/praha/odlety#prilety">Všechny dostupné přílety →</Link><Link href="/let">Najít let podle letenky →</Link><Link href="/radar">Otevřít radar →</Link></nav>
    </section>
  </>
}
