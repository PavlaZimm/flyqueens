'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { AirportBoardFlight, AirportBoardResponse } from '@/lib/airportFlightBoards'
import type { SolarTimes } from '@/lib/aeroInsights'
import type { MetarData } from '@/lib/metar'
import { spottingHighlight } from '@/lib/spottingHighlights'
import { arrivalCountdown, arrivalTime, sunsetArrivals } from '@/lib/spottingPlanner'
import { pragueDate } from '@/lib/flightSearch'
import { weatherVisual } from '@/lib/weatherVisual'
import { BoardAircraftCard } from '@/components/Airport/BoardAircraftCard'
import styles from './SpottingPlanner.module.css'
const time = (value: number) => new Date(value).toLocaleTimeString('cs-CZ', { timeZone:'Europe/Prague', hour:'2-digit', minute:'2-digit' })
interface Props { board: AirportBoardResponse | null; ready: boolean; flights: AirportBoardFlight[]; solar: SolarTimes | null; now: number; weather: MetarData | null; weatherReady: boolean }
export function SpottingPlanner({ board, ready, flights, solar, now, weather, weatherReady }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [limit, setLimit] = useState(4)
  const interesting = flights.filter(flight => spottingHighlight(flight) && pragueDate(new Date(arrivalTime(flight))) === pragueDate(new Date(now)))
  const feature = [...interesting].sort((a, b) => (spottingHighlight(b)?.rank ?? 0) - (spottingHighlight(a)?.rank ?? 0) || arrivalTime(a) - arrivalTime(b))[0]
  const evening = sunsetArrivals(ready ? board?.arrivals ?? [] : [], solar?.sunset ?? null, now)
  const weatherNow = weatherReady && weather ? weatherVisual(weather, solar, now) : null
  const coverageEnd = Date.parse(board?.fetchedAt ?? '') + 10 * 3600000
  const partial = evening && coverageEnd < evening.finish
  return <div className={styles.planner}>
    <section className={styles.trip} aria-labelledby="trip-title">
      <p className={styles.eyebrow}>TVŮJ PLÁN U LETIŠTĚ</p>
      <h2 id="trip-title">Dnes stojí za výlet?</h2>
      {ready ? feature ? <>
        <p className={styles.feature}><span aria-hidden="true">✦ </span>{feature.aircraft?.model ?? 'Nákladní let'}<span>{time(arrivalTime(feature))} · {arrivalCountdown(feature, now)}</span></p>
        <p>{feature.number} z {feature.oppositeAirport.city ?? feature.oppositeAirport.name ?? 'neuvedeného letiště'}. Z dnešních příletů v příštích šesti hodinách vybíráme {interesting.length} {interesting.length === 1 ? 'tip' : interesting.length < 5 ? 'tipy' : 'tipů'} na zajímavé stroje.</p>
      </> : <p>V příštích šesti hodinách zatím nemáme tip na zvláštní typ letadla. Běžné přílety najdeš níže.</p> : <p>Nejbližší přílety teď nemůžeme potvrdit. S plánem výletu počkej na čerstvá data.</p>}
      <div className={styles.context}><p><span aria-hidden="true">{weatherNow?.icon ?? '🌡️'}</span> {weatherNow ? `Teď: ${weatherNow.label.toLowerCase()}${weather?.temp != null ? `, ${weather.temp} °C` : ''}.` : 'Aktuální počasí se zatím nepodařilo potvrdit.'}</p><p>Počasí je poslední měření, ne předpověď na čas příletu. Přidělený typ i čas se mohou změnit.</p></div>
      <div className={styles.links}><a href="#upcoming-title">Prohlédnout přílety ↓</a><Link href="/letiste/praha/planespotting">Vybrat vyhlídku ↗</Link><a href="#sunset-flights">Letadla kolem západu ↓</a></div>
    </section>
    <section className={styles.evening} aria-labelledby="sunset-flights">
      <p className={styles.eyebrow}>VEČER S LETADLY</p>
      <h2 id="sunset-flights">Přílety kolem západu slunce</h2>
      <p>Hodinu před západem a půl hodiny po něm. Vyber si let a podívej se, které letadlo má přiletět.</p>
      {!evening ? <p>Nejdřív potřebujeme dnešní čas západu slunce. Jakmile se načte, vybereme přílety.</p> : <>
        <p className={styles.window}>{time(evening.start)} <span>— západ {time(evening.sunset)} —</span> {time(evening.finish)}</p>
        {evening.ended ? <p>Dnešní večerní okno už skončilo. Zítra tu najdeš nový výběr.</p> : !ready ? <p>Aktuální letový řád není dostupný. Přílety kolem západu teď nemůžeme potvrdit.</p> : <>
          {partial && <p className={styles.notice}>Večerní okno ještě není celé v dostupném letovém řádu. Další lety se mohou objevit při pozdější aktualizaci.</p>}
          {!evening.flights.length ? <p>V dostupných datech zatím není další přílet v tomto čase. Neznamená to, že žádné letadlo nepřiletí.</p> : <>
            <ul className={styles.flights}>{evening.flights.slice(0, limit).map(flight => <li key={flight.id}>
              <div className={styles.flightHeading}><strong>{time(arrivalTime(flight))} · {flight.number}</strong><span>{arrivalCountdown(flight, now)}</span></div>
              <p>{flight.aircraft?.model ?? 'Typ zatím neuveden'} · z {flight.oppositeAirport.city ?? flight.oppositeAirport.name ?? 'neuvedeného letiště'}</p>
              {spottingHighlight(flight) && <p className={styles.badge}>✦ {spottingHighlight(flight)?.title}</p>}
              <button type="button" aria-expanded={expanded === flight.id} onClick={() => setExpanded(expanded === flight.id ? null : flight.id)}>{expanded === flight.id ? 'Skrýt letadlo a fotografii' : `Letadlo a fotografie · ${flight.number}`}</button>
              {expanded === flight.id && <BoardAircraftCard flight={flight} />}
            </li>)}</ul>
            {evening.flights.length > limit && <button type="button" onClick={() => setLimit(value => value + 4)}>Další večerní přílety ({evening.flights.length - limit})</button>}
          </>}
        </>}
        <p className={styles.note}>Výběr z dostupného letového řádu AeroDataBox{board?.fetchedAt ? `, načteno v ${time(Date.parse(board.fetchedAt))}` : ''}. Časy jsou pražské. Světlo ovlivní oblačnost a místo focení; toto okno není výpočet zlaté hodinky.</p>
      </>}
    </section>
  </div>
}
