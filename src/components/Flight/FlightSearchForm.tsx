'use client'
import { useEffect, useState } from 'react'
import { pragueDate, searchDateBounds } from '@/lib/flightSearch'
import styles from './FlightTools.module.css'

export function FlightSearchForm({ number = '', date = '' }: { number?: string; date?: string }) {
  const [today, setToday] = useState('')
  const [bounds, setBounds] = useState<{ min: string; max: string } | null>(null)
  useEffect(() => {
    const frame = requestAnimationFrame(() => { setToday(pragueDate()); setBounds(searchDateBounds()) })
    return () => cancelAnimationFrame(frame)
  }, [])
  return <form action="/let" method="get" role="search" aria-label="Vyhledat let podle čísla a data" className={styles.form}>
    <label className={styles.field}>Číslo letu z letenky
      <input name="number" defaultValue={number} required maxLength={12} placeholder="Např. QS1000" autoComplete="off" autoCapitalize="characters" spellCheck={false} />
    </label>
    <label className={styles.field}>Datum odletu
      <input key={date || today} name="date" type="date" required defaultValue={date || today} min={bounds?.min} max={bounds?.max} />
    </label>
    <button className={styles.button} type="submit">Najít let</button>
  </form>
}
