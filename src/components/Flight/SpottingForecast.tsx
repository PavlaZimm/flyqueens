'use client'
import { useEffect, useState } from 'react'
import type { AirportBoardFlight } from '@/lib/airportFlightBoards'
import { forecastAt, forecastText, type SpottingTaf } from '@/lib/spottingForecast'
import { arrivalTime } from '@/lib/spottingPlanner'
import styles from './SpottingExtras.module.css'
const time = (value: number | string) => new Date(value).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit' })
export function useSpottingTaf() {
  const [taf, setTaf] = useState<SpottingTaf | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const response = await fetch('/api/taf?icao=LKPR', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) })
        if (!response.ok) throw new Error('TAF unavailable')
        const data = await response.json() as SpottingTaf
        if (!controller.signal.aborted) { setTaf(data); setFailed(false) }
      } catch { if (!controller.signal.aborted) setFailed(true) }
    }
    void load()
    const timer = setInterval(() => void load(), 600000)
    return () => { controller.abort(); clearInterval(timer) }
  }, [])
  return { taf, failed }
}
export function ForecastAt({ taf, at, now, failed = false }: { taf: SpottingTaf | null; at: number; now: number; failed?: boolean }) {
  const result = failed ? null : forecastAt(taf, at, now)
  if (!result) return <p className={styles.note}>Pro tento čas nemáme potvrzenou platnou předpověď.</p>
  return <div className={styles.forecastText}>
    {result.changing ? <><p>V tomto čase má probíhat postupná změna podmínek do {time(result.base.becomingAt!)}.</p>{result.previous && <p>Před změnou: {forecastText(result.previous)}.</p>}<p>Po změně: {forecastText(result.base)}.</p></> : <p>{forecastText(result.base)}.</p>}
    {result.alternatives.map((period, i) => <p className={styles.caution} key={`${period.from}-${i}`}>{period.probability ? `Možnost ${period.probability} %` : period.change?.includes('PROB') ? 'Možná změna' : 'Přechodně'}{period.probability && period.change?.includes('TEMPO') ? ', přechodně' : ''}: {forecastText(period)}.</p>)}
  </div>
}
export function SpottingForecast({ taf, failed, flights, sunset, now }: { taf: SpottingTaf | null; failed: boolean; flights: AirportBoardFlight[]; sunset: string | null; now: number }) {
  const [selected, setSelected] = useState('hour')
  const chosen = flights.find(f => f.id === selected)
  const sunsetTime = Date.parse(sunset ?? '')
  const at = selected === 'sunset' ? sunsetTime : selected === 'hour' ? now + 3600000 : chosen ? arrivalTime(chosen) : NaN
  return <section className={styles.card} aria-labelledby="spotting-forecast">
    <p className={styles.eyebrow}>POČASÍ NA ČAS VÝLETU</p>
    <h2 id="spotting-forecast">Co čekat u letiště</h2>
    <p>Vyberte čas nebo konkrétní přílet. Předpověď TAF popisuje podmínky u letiště; nejde o právě naměřené počasí.</p>
    <label className={styles.field}>Čas předpovědi<select value={selected} onChange={e => setSelected(e.target.value)}>
      <option value="hour">Přibližně za hodinu</option>
      {Number.isFinite(sunsetTime) && sunsetTime > now && <option value="sunset">Při dnešním západu slunce</option>}
      {flights.slice(0, 24).map(f => <option key={f.id} value={f.id}>{f.number} · {time(arrivalTime(f))}</option>)}
    </select></label>
    <p className={styles.target}>{Number.isFinite(at) ? time(at) : 'Vybraný přílet už není v aktuálním přehledu.'}</p>
    <ForecastAt taf={taf} at={at} now={now} failed={failed} />
    <p className={styles.note}>{taf?.issueTime ? `TAF LKPR vydán ${time(taf.issueTime)}. ` : ''}Změny označené jako přechodné nebo možné nejsou jistý průběh počasí. Oblačnost v TAF nezaručuje dobré světlo na fotografování. <a href="https://aviationweather.gov/data/metar/?id=LKPR&taf=true" target="_blank" rel="noopener noreferrer">AviationWeather.gov ↗</a></p>
    {taf?.rawTaf && <details><summary>Původní předpověď TAF</summary><p className={styles.raw}>{taf.rawTaf}</p></details>}
  </section>
}
