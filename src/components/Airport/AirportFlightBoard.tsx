'use client'

import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type {
  AirportBoardFlight,
  AirportBoardResponse,
  AirportFlightBoardConfig,
  AirportFlightDirection,
} from '@/lib/airportFlightBoards'
import styles from './AirportFlightBoard.module.css'

interface AirportFlightBoardProps {
  airport: AirportFlightBoardConfig
  /** Tabule vykreslená na serveru, aby lety byly v HTML i bez JavaScriptu. */
  initialData?: AirportBoardResponse | null
}

const STATUS_LABELS: Record<string, string> = {
  scheduled: 'Plánováno',
  expected: 'Očekává se',
  checkin: 'Odbavení',
  boarding: 'Nástup',
  gateclosed: 'Gate uzavřen',
  departed: 'Odletělo',
  enroute: 'Na cestě',
  approaching: 'Přibližuje se',
  arrived: 'Přistálo',
  delayed: 'Zpožděno',
  canceled: 'Zrušeno',
  cancelled: 'Zrušeno',
  diverted: 'Odkloněno',
  unknown: 'Bez potvrzení',
}

const TIME_FORMATTER = new Intl.DateTimeFormat('cs-CZ', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' })
const DATE_FORMATTER = new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'numeric', timeZone: 'Europe/Prague' })
const INITIAL_FLIGHT_COUNT = 30

function normalizedStatus(status: string): string {
  return status.toLowerCase().replace(/[^a-z]/g, '')
}

function statusLabel(status: string): string {
  return STATUS_LABELS[normalizedStatus(status)] ?? status
}

function statusTone(status: string): string {
  const value = normalizedStatus(status)
  if (['arrived', 'departed', 'boarding', 'enroute'].includes(value)) return styles.statusGood
  if (['delayed', 'expected', 'approaching', 'checkin'].includes(value)) return styles.statusWarn
  if (['cancelled', 'canceled', 'diverted'].includes(value)) return styles.statusBad
  return ''
}

function parsedDate(value: string | null): Date | null {
  if (!value) return null
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? date : null
}

function timeParts(value: string | null): { time: string; date: string } {
  const date = parsedDate(value)
  if (!date) return { time: '—', date: '' }
  return {
    time: TIME_FORMATTER.format(date),
    date: DATE_FORMATTER.format(date),
  }
}

function delayMinutes(flight: AirportBoardFlight): number | null {
  const scheduled = parsedDate(flight.scheduledTime)
  const revised = parsedDate(flight.revisedTime)
  if (!scheduled || !revised) return null
  const minutes = Math.round((revised.getTime() - scheduled.getTime()) / 60_000)
  return minutes >= 5 ? minutes : null
}

function airportLabel(flight: AirportBoardFlight): { code: string; name: string } {
  const airport = flight.oppositeAirport
  return {
    code: airport.iata ?? airport.icao ?? '—',
    name: airport.city ?? airport.name ?? 'Letiště není uvedeno',
  }
}

function radarValue(flight: AirportBoardFlight): string | null {
  return flight.callSign ?? flight.aircraft?.modeS ?? flight.aircraft?.registration ?? null
}

// Mapa ukazuje jen letadla, která jsou právě ve vzduchu v okolí Česka.
// Odkaz nabízíme jen v okně, kdy může let na mapě skutečně být.
const MINUTE = 60_000

function canBeOnMap(flight: AirportBoardFlight, now: number): boolean {
  const status = normalizedStatus(flight.status)
  if (['cancelled', 'canceled', 'diverted'].includes(status)) return false
  if (flight.direction === 'arrival' && status === 'arrived') return false
  const time = parsedDate(flight.revisedTime ?? flight.scheduledTime)?.getTime()
  if (time == null) return false
  return flight.direction === 'departure'
    ? now >= time - 15 * MINUTE && now <= time + 45 * MINUTE
    : now >= time - 60 * MINUTE && now <= time + 10 * MINUTE
}

function operationalDetails(flight: AirportBoardFlight): string[] {
  if (flight.direction === 'departure') {
    return [
      flight.terminal ? `Terminál ${flight.terminal}` : null,
      flight.gate ? `Gate ${flight.gate}` : null,
      flight.checkInDesk ? `Check-in ${flight.checkInDesk}` : null,
    ].filter((value): value is string => Boolean(value))
  }
  return [
    flight.terminal ? `Terminál ${flight.terminal}` : null,
    flight.gate ? `Gate ${flight.gate}` : null,
    flight.baggageBelt ? `Pás ${flight.baggageBelt}` : null,
  ].filter((value): value is string => Boolean(value))
}

export function AirportFlightBoard({ airport, initialData = null }: AirportFlightBoardProps) {
  const [direction, setDirection] = useState<AirportFlightDirection>('departure')
  const [data, setData] = useState<AirportBoardResponse | null>(initialData)
  const [loading, setLoading] = useState(!initialData)
  const [failed, setFailed] = useState(false)
  const [visibleCount, setVisibleCount] = useState(INITIAL_FLIGHT_COUNT)
  // Čas známe až v prohlížeči; odkazy na mapu se proto ukážou po načtení,
  // aby se serverové HTML nelišilo od prvního vykreslení v prohlížeči.
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const timer = window.setInterval(() => setNow(Date.now()), MINUTE)
    return () => window.clearInterval(timer)
  }, [])

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setFailed(false)
    try {
      const response = await fetch(`/api/airport-flights?airport=${encodeURIComponent(airport.iata)}`, {
        cache: 'no-store',
        signal,
      })
      const payload = await response.json() as AirportBoardResponse | { error?: string }
      if (!('airport' in payload)) throw new Error('Invalid response')
      setData(payload)
      setFailed(false)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setFailed(true)
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [airport.iata])

  useEffect(() => {
    const controller = new AbortController()
    if (!initialData) void load(controller.signal)
    const timer = window.setInterval(() => void load(), 5 * 60_000)
    return () => {
      controller.abort()
      window.clearInterval(timer)
    }
  }, [load, initialData])

  const flights = useMemo(() => {
    if (!data) return []
    return direction === 'departure' ? data.departures : data.arrivals
  }, [data, direction])

  const fetchedAt = data?.fetchedAt
    ? TIME_FORMATTER.format(new Date(data.fetchedAt))
    : null

  const unavailable = failed || data?.status === 'unavailable'
  const unconfigured = data?.status === 'unconfigured'

  return (
    <section className={styles.board} aria-labelledby="flight-board-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{airport.iata} · {airport.icao}</p>
          <h2 className={styles.title} id="flight-board-title">Odlety a přílety</h2>
        </div>
        <button className={styles.refresh} type="button" onClick={() => void load()} disabled={loading} aria-label="Obnovit přehled letů">
          {loading ? 'Načítám…' : 'Obnovit'}
        </button>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Směr letu">
        <button
          className={`${styles.tab} ${direction === 'departure' ? styles.tabActive : ''}`}
          type="button"
          role="tab"
          aria-selected={direction === 'departure'}
          aria-controls="airport-flight-panel"
          onClick={() => { setDirection('departure'); setVisibleCount(INITIAL_FLIGHT_COUNT) }}
        >
          Odlety {data?.status === 'ready' ? `(${data.departures.length})` : ''}
        </button>
        <button
          className={`${styles.tab} ${direction === 'arrival' ? styles.tabActive : ''}`}
          type="button"
          role="tab"
          aria-selected={direction === 'arrival'}
          aria-controls="airport-flight-panel"
          onClick={() => { setDirection('arrival'); setVisibleCount(INITIAL_FLIGHT_COUNT) }}
        >
          Přílety {data?.status === 'ready' ? `(${data.arrivals.length})` : ''}
        </button>
      </div>

      <div id="airport-flight-panel" role="tabpanel" aria-live="polite" aria-atomic="true">
        {loading && !data ? (
          <div className={styles.message}>
            <span className={styles.messageIcon} aria-hidden="true">✈</span>
            <h3 className={styles.messageTitle}>Načítám tabuli letiště…</h3>
            <p className={styles.messageText}>Zjišťuji nejnovější dostupné provozní údaje.</p>
          </div>
        ) : unconfigured || unavailable || (!data && failed) ? (
          <div className={styles.message}>
            <span className={styles.messageIcon} aria-hidden="true">i</span>
            <h3 className={styles.messageTitle}>
              {unconfigured ? 'Živá tabule čeká na aktivaci dat' : 'Tabule je dočasně nedostupná'}
            </h3>
            <p className={styles.messageText}>
              {unconfigured
                ? 'Nechceme zobrazovat odhadované ani staré lety. Do aktivace licencovaného zdroje otevřete ověřenou tabuli přímo na webu letiště.'
                : 'Pro aktuální čas, zpoždění, terminál a gate použijte oficiální informace letiště.'}
            </p>
            <a className={styles.officialLink} href={airport.officialFlightsUrl} target="_blank" rel="noopener noreferrer">
              Oficiální tabule letiště ↗
            </a>
          </div>
        ) : data?.status === 'ready' ? (
          <>
            <div className={styles.summary}>
              <span>{direction === 'departure' ? 'Plánované odlety' : 'Plánované přílety'} v dostupném časovém okně</span>
              <span className={styles.source}>
                <span className={styles.sourceDot} aria-hidden="true" />
                AeroDataBox{fetchedAt ? ` · aktualizováno ${fetchedAt}` : ''}
              </span>
            </div>

            <p className={styles.messageText}>
              Časy jsou v pražském časovém pásmu. Přehled se obnovuje přibližně po {data.refreshMinutes ?? 60} minutách.
              {' '}<a href={airport.officialFlightsUrl} target="_blank" rel="noopener noreferrer">Poslední změny ověřte u letiště.</a>
            </p>
            {flights.length > 0 ? (
              <>
                <div className={styles.tableHeader} aria-hidden="true">
                  <span>Čas</span><span>{direction === 'departure' ? 'Kam' : 'Odkud'}</span><span>Let</span><span>Stav</span><span>Provoz</span><span>Mapa</span>
                </div>
                <ol className={styles.list}>
                  {flights.slice(0, visibleCount).map((flight) => {
                    const scheduled = timeParts(flight.scheduledTime)
                    const revised = timeParts(flight.revisedTime)
                    const shown = flight.revisedTime ? revised : scheduled
                    const delay = delayMinutes(flight)
                    const opposite = airportLabel(flight)
                    const details = operationalDetails(flight)
                    const radar = now !== null && canBeOnMap(flight, now) ? radarValue(flight) : null
                    return (
                      <li className={styles.flight} key={flight.id}>
                        <div className={styles.timeCell}>
                          <time className={`${styles.time} ${delay ? styles.revised : ''}`} dateTime={flight.revisedTime ?? flight.scheduledTime ?? undefined}>{shown.time}</time>
                          <span className={styles.date}>{shown.date}{delay ? ` · +${delay} min` : ''}</span>
                        </div>
                        <div className={styles.destinationCell}>
                          <span className={styles.destinationCode}>{opposite.code}</span>
                          <span className={styles.destinationName}>{opposite.name}</span>
                        </div>
                        <div className={styles.flightCell}>
                          <span className={styles.number}>{flight.number}</span>
                          <span className={styles.subtle}>{flight.airline ?? (flight.isCargo ? 'Nákladní let' : 'Dopravce neuveden')}</span>
                        </div>
                        <div className={styles.statusCell}>
                          <span className={`${styles.status} ${statusTone(flight.status)}`}>{statusLabel(flight.status)}</span>
                        </div>
                        <div className={styles.detailsCell}>
                          <span className={styles.details}>{details.length ? details.join(' · ') : 'Provozní detail neuveden'}</span>
                          {flight.hasLiveData && <span className={styles.subtle}>Provozní údaj zdroje</span>}
                        </div>
                        <div className={styles.radarCell}>
                          {radar ? <Link className={styles.radarLink} href={`/radar?flight=${encodeURIComponent(radar)}`}>Na mapě →</Link> : null}
                        </div>
                      </li>
                    )
                  })}
                </ol>
                {flights.length > visibleCount && (
                  <div className={styles.moreWrap}>
                    <button className={styles.moreButton} type="button" onClick={() => setVisibleCount((count) => count + INITIAL_FLIGHT_COUNT)}>
                      Zobrazit další lety ({flights.length - visibleCount})
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.message}>
                <h3 className={styles.messageTitle}>V tomto časovém okně nejsou dostupné lety</h3>
                <p className={styles.messageText}>U menších letišť to může být běžné. Kompletní letový řád ověřte na oficiálním webu.</p>
                <a className={styles.officialLink} href={airport.officialFlightsUrl} target="_blank" rel="noopener noreferrer">Oficiální letový řád ↗</a>
              </div>
            )}
          </>
        ) : null}
      </div>

      <div className={styles.footer}>
        Provozní údaje se mohou změnit. Rozhodující je vždy informace letiště nebo dopravce. Automatická obnova probíhá nejvýše jednou za 5 minut.
      </div>
    </section>
  )
}
