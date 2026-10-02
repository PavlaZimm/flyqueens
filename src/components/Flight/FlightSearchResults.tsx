'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BoardAircraftCard } from '@/components/Airport/BoardAircraftCard'
import { flightStatus, type FlightSearchResponse, type SearchedFlight } from '@/lib/flightSearch'
import styles from './FlightTools.module.css'

function localLabel(value: string | null) {
  if (!value) return 'Čas zatím není uveden'
  const match = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}:\d{2})/.exec(value)
  return match ? `${Number(match[3])}. ${Number(match[2])}. ${match[1]} · ${match[4]}${value.includes('(UTC)') ? ' UTC' : ' místního času'}` : 'Čas zatím není uveden'
}
function Movement({ title, value }: { title: string; value: SearchedFlight['departure'] }) {
  return <div><p className={styles.muted}>{title}</p>
    <strong>{value.airport.iata ?? value.airport.icao ?? '—'} · {value.airport.city ?? value.airport.name ?? 'Letiště neuvedeno'}</strong>
    <p>Plán: {localLabel(value.scheduled)}</p>
    {value.revised && <p>Aktualizováno: {localLabel(value.revised)}</p>}
    <p className={styles.muted}>{[value.terminal && `Terminál ${value.terminal}`, value.gate && `Gate ${value.gate}`].filter(Boolean).join(' · ')}</p>
  </div>
}
export function FlightSearchResults({ number, date }: { number: string; date: string }) {
  const [data, setData] = useState<FlightSearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/flight-search?${new URLSearchParams({ number, date })}`, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) })
      .then(async response => {
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.error ?? 'Vyhledávání teď není dostupné.')
        if (!controller.signal.aborted) setData(payload)
      }).catch(reason => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Vyhledávání teď není dostupné.') })
    return () => controller.abort()
  }, [number, date])
  return <section aria-live="polite" aria-busy={!data && !error}>
    <h2>Výsledky pro {number} · {date}</h2>
    {error ? <p role="alert">{error}</p> : !data ? <p>Hledám let a dostupné provozní údaje…</p> : <>
      <p className={styles.muted}>Zdroj: AeroDataBox · získáno {new Date(data.fetchedAt).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })} pražského času. Data sdílíme po dobu 30 minut.</p>
      {!data.flights.length && <p>Pro toto číslo a datum zdroj neposkytl let. Zkontrolujte číslo provozujícího dopravce a datum odletu. Prázdný výsledek neznamená, že je let zrušený; vzdálenější termíny nemusí být dostupné.</p>}
      {data.flights.map((flight, index) => <article className={styles.card} key={`${flight.board.id}:${index}`}>
        <h3>{flight.board.number} · {flightStatus(flight.board.status)}</h3>
        <div className={styles.route}><Movement title="Odlet" value={flight.departure} /><Movement title="Přílet" value={flight.arrival} /></div>
        <BoardAircraftCard flight={flight.board} />
        {(flight.board.callSign || flight.board.aircraft?.modeS) && <p><Link href={`/radar?flight=${encodeURIComponent(flight.board.callSign ?? flight.board.aircraft?.modeS ?? '')}`}>Zkusit najít letadlo na mapě →</Link><br /><span className={styles.muted}>Mapa ukazuje jen zachycené lety v zobrazované oblasti; plánovaný let na ní ještě být nemusí.</span></p>}
      </article>)}
    </>}
    <p className={styles.muted}>Před cestou potvrďte čas a gate u letiště nebo dopravce. Časy odletu a příletu jsou místní pro dané letiště, případné UTC je výslovně označené.</p>
  </section>
}
