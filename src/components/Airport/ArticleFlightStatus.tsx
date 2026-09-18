'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { AirportBoardResponse } from '@/lib/airportFlightBoards'
import styles from './ArticleFlightStatus.module.css'

interface Props { title: string; numbers?: string[]; registration?: string }
const normalize = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, '')
const timeFormat = new Intl.DateTimeFormat('cs-CZ', { day: 'numeric', month: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Prague' })
const labels: Record<string, string> = { scheduled: 'Plánováno', expected: 'Očekává se', enroute: 'Ve vzduchu', departed: 'Odletělo', arrived: 'Přistálo', boarding: 'Nástup', canceled: 'Zrušeno', cancelled: 'Zrušeno', delayed: 'Zpožděno', diverted: 'Odkloněno', approaching: 'Přibližuje se', checkin: 'Odbavení', unknown: 'Bez potvrzení' }

export function ArticleFlightStatus({ title, numbers, registration }: Props) {
  const [data, setData] = useState<AirportBoardResponse | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        const response = await fetch('/api/airport-flights?airport=PRG', { signal: controller.signal })
        if (!response.ok) throw new Error('Unavailable')
        const result = await response.json() as AirportBoardResponse
        setData(result)
        setFailed(result.status !== 'ready')
      } catch { if (!controller.signal.aborted) setFailed(true) }
    }
    void load()
    const interval = setInterval(() => { if (!document.hidden) void load() }, 5 * 60_000)
    return () => { controller.abort(); clearInterval(interval) }
  }, [])
  const flights = [...(data?.arrivals ?? []), ...(data?.departures ?? [])].filter(flight => {
    if (registration) return normalize(flight.aircraft?.registration ?? '') === normalize(registration)
    if (numbers?.length) return numbers.some(number => normalize(number) === normalize(flight.number))
    return flight.direction === 'arrival' && !/arrived|cancel/i.test(flight.status)
  }).slice(0, 4)

  return <aside className={styles.box} aria-label={title}>
    <h2>{title}</h2>
    <p className={styles.note}>Lety v okně přibližně dvě hodiny zpět a deset hodin dopředu od načtení. Časy jsou pražské; přehled se obnovuje přibližně jednou za hodinu.</p>
    {failed ? <p>Provozní data jsou nyní nedostupná. Použijte oficiální přehled letiště.</p>
      : !data ? <p role="status">Načítám dostupné lety…</p>
      : flights.length ? <ul className={styles.list}>{flights.map(flight => <li key={flight.id}>
        <strong>{flight.number} · {flight.direction === 'arrival' ? 'přílet z' : 'odlet do'} {(flight.oppositeAirport.name && flight.oppositeAirport.name !== 'Unknown' ? flight.oppositeAirport.name : flight.oppositeAirport.iata) ?? 'neuvedeného letiště'}</strong>
        <span>{flight.revisedTime || flight.scheduledTime ? timeFormat.format(new Date((flight.revisedTime ?? flight.scheduledTime)!)) : 'Čas nepotvrzen'} · {labels[flight.status.toLowerCase()] ?? 'Stav nepotvrzen'}</span>
        {flight.aircraft?.model && <span>Typ podle zdroje: {flight.aircraft.model}{flight.aircraft.registration ? ` · ${flight.aircraft.registration}` : ''}</span>}
      </li>)}</ul> : <p>Ve zobrazeném časovém okně není odpovídající let. Neznamená to zrušení spoje ani potvrzení termínu další návštěvy.</p>}
    {data?.fetchedAt && !failed && <p className={styles.note}>AeroDataBox · načteno {timeFormat.format(new Date(data.fetchedAt))}. Nasazené letadlo i časy se mohou změnit.</p>}
    <div className={styles.links}><Link href="/letiste/praha/odlety">Všechny přílety a odlety Prahy</Link><a href="https://www.prg.aero/prehled-letu?hour=all" target="_blank" rel="noopener noreferrer">Oficiální přehled letiště ↗</a></div>
  </aside>
}
