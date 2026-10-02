'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { AirportBoardResponse } from '@/lib/airportFlightBoards'
import { BoardAircraftCard } from '@/components/Airport/BoardAircraftCard'
import { RunwayInUse } from '@/components/Airport/RunwayInUse'
import type { MetarData } from '@/lib/metar'
import { ktsToKmh, wxDescription } from '@/lib/metar'
import { upcomingArrivals } from '@/lib/pragueToday'
import { flightStatus } from '@/lib/flightSearch'
import styles from './FlightTools.module.css'
const formatTime = (value: string | number) => new Date(value).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })

export function PragueToday({ initialData, initialNow }: { initialData: AirportBoardResponse | null; initialNow: number }) {
  const [board, setBoard] = useState(initialData)
  const [now, setNow] = useState(initialNow)
  const [failed, setFailed] = useState(false)
  const [weather, setWeather] = useState<(MetarData & { windVrb?: boolean }) | null>(null)
  const [weatherFailed, setWeatherFailed] = useState(false)
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
  const weatherOld = weather?.obsTime ? now - Date.parse(weather.obsTime) > 2 * 3600000 : true
  return <>
    <div className={styles.columns}>
      <RunwayInUse />
      <section className={`${styles.card} ${styles.weather}`} aria-label="Počasí na letišti">
        <h2 style={{ marginTop: 0 }}>Počasí na letišti</h2>
        {weather ? <>
          {(weatherOld || weatherFailed) && <p>Starší měření – aktuální počasí se nepodařilo potvrdit.</p>}
          <p><strong>{weather.temp !== null ? `${weather.temp} °C` : 'Teplota neuvedena'}</strong>{weather.weather ? ` · ${wxDescription(weather.weather)}` : ''}</p>
          <p>{weather.windSpeed !== null ? `Vítr ${ktsToKmh(weather.windSpeed)} km/h` : 'Rychlost větru neuvedena'}{weather.windVrb ? ', proměnlivý směr' : weather.windDir !== null ? ` z ${weather.windDir}°` : ''}{weather.windGust !== null ? `, nárazy ${ktsToKmh(weather.windGust)} km/h` : ''}</p>
          <p className={styles.muted}>METAR LKPR · měření {weather.obsTime ? formatTime(weather.obsTime) : 'bez času'} · AviationWeather.gov</p>
        </> : <p>{weatherFailed ? 'Počasí je dočasně nedostupné.' : 'Načítám poslední měření…'}</p>}
      </section>
    </div>
    <section aria-labelledby="upcoming-title">
      <h2 id="upcoming-title">Co přiletí v příštích 6 hodinách</h2>
      <p className={styles.muted}>Okno {formatTime(now)}–{formatTime(now + 6 * 3600000)}. Časy jsou pražské. Přehled zahrnuje dostupné nezrušené přílety s budoucím časem, nikoli celý denní provoz.</p>
      {board?.fetchedAt && <p className={styles.muted}>AeroDataBox · data získána {formatTime(board.fetchedAt)}. Zdroj sdílíme s letištní tabulí a obnovujeme přibližně po 30 minutách.</p>}
      {failed || stale || board?.status !== 'ready' ? <p>Aktuální přílety teď nemůžeme potvrdit. <a href="https://www.prg.aero/prehled-letu?hour=all" target="_blank" rel="noopener noreferrer">Otevřít oficiální tabuli ↗</a></p> : !flights.length ? <p>V tomto okně zdroj neposkytl další očekávané přílety. Nejde o potvrzení, že na letišti není provoz.</p> : <>
        <p>{flights.length} dostupných příletů. Fotografie ukazují konkrétní registraci, pokud ji už dopravce poskytl.</p>
        <ol className={styles.list}>{flights.slice(0, 12).map((flight, index) => <li key={flight.id} className={styles.card}>
          <div className={styles.arrivalHeader}>
            <h3>{formatTime(flight.revisedTime ?? flight.scheduledTime ?? '')} · {flight.number}</h3>
            <span>{flightStatus(flight.status)}</span>
          </div>
          <p>Z {flight.oppositeAirport.city ?? flight.oppositeAirport.name ?? flight.oppositeAirport.iata ?? 'neuvedeného letiště'} · {flight.aircraft?.model ?? 'Typ letadla zatím není známý'}{flight.isCargo ? ' · nákladní let' : ''}</p>
          {flight.revisedTime && <p className={styles.muted}>Původní plán: {flight.scheduledTime ? formatTime(flight.scheduledTime) : 'neuveden'}</p>}
          {index < 2 || expanded === flight.id ? <div className={styles.photo}><BoardAircraftCard flight={flight} /></div> : <button type="button" className={styles.button} onClick={() => setExpanded(flight.id)}>Letadlo a foto pro {flight.number}</button>}
        </li>)}</ol>
      </>}
      <nav className={styles.links} aria-label="Přehledy letů"><Link href="/letiste/praha/odlety#prilety">Všechny dostupné přílety →</Link><Link href="/let">Najít let podle letenky →</Link><Link href="/radar">Otevřít radar →</Link></nav>
    </section>
  </>
}
