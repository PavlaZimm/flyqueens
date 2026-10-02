'use client'
import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import type { InsightData, SolarTimes } from '@/lib/aeroInsights'
import { pragueDate } from '@/lib/flightSearch'
import { sunsetCountdown } from '@/lib/spottingHighlights'
import styles from './SunsetCard.module.css'
const time = (value: string | null | undefined) => value ? new Date(value).toLocaleTimeString('cs-CZ', { timeZone: 'Europe/Prague', hour: '2-digit', minute: '2-digit' }) : '—'
export function SunsetCard({ now, onSolar }: { now: number; onSolar: (solar: SolarTimes | null) => void }) {
  const titleId = useId()
  const day = pragueDate(new Date(now))
  const [result, setResult] = useState<{ day: string; data: InsightData } | null>(null)
  const [failedDay, setFailedDay] = useState('')
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/aero-insights?kind=sun', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) })
      .then(async response => {
        if (!response.ok) throw new Error('Sun data unavailable')
        const data = await response.json() as InsightData
        if (!controller.signal.aborted) { setResult({ day, data }); setFailedDay(''); onSolar(data.solar ?? null) }
      }).catch(() => { if (!controller.signal.aborted) setFailedDay(day) })
    return () => controller.abort()
  }, [day, retry, onSolar])
  const data = result?.day === day ? result.data : null
  const solar = data?.solar
  const sunset = solar?.sunset && pragueDate(new Date(solar.sunset)) === day ? solar.sunset : null
  return <section className={styles.card} aria-labelledby={titleId}>
    <div className={styles.scene} aria-hidden="true"><div className={styles.sun} /><div className={styles.horizon} /><span className={styles.plane}>✈</span></div>
    <div className={styles.content}>
      <p className={styles.eyebrow}>SVĚTLO PRO SPOTTING · PRAHA</p>
      <h2 id={titleId}>Ještě jeden přílet<br />před západem.</h2>
      <p className={styles.date}>{new Date(now).toLocaleDateString('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <div className={styles.mainTime}><span>Západ slunce</span><time dateTime={sunset ?? undefined}>{time(sunset)}</time></div>
      <p className={styles.countdown}>{data ? sunsetCountdown(sunset, now) : failedDay === day ? 'Čas západu se teď nepodařilo načíst.' : 'Načítám dnešní časy slunce…'}</p>
      {failedDay === day && <button className={styles.retry} onClick={() => { setFailedDay(''); setRetry(value => value + 1) }}>Zkusit znovu</button>}
      <dl className={styles.times}>
        <div><dt>Východ slunce</dt><dd><time dateTime={solar?.sunrise ?? undefined}>{time(solar?.sunrise)}</time></dd></div>
        <div><dt>Stmívá se</dt><dd><time dateTime={solar?.duskCivil ?? undefined}>{time(solar?.duskCivil)}</time></dd></div>
      </dl>
      <div className={styles.footer}><p>Časy pro letiště Praha, v pražském časovém pásmu. Oblačnost a místo focení ovlivní skutečné světlo. Zdroj: AeroDataBox.</p><Link href="/letiste/praha/planespotting">Vybrat vyhlídku ↗</Link></div>
    </div>
  </section>
}
