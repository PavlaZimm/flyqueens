'use client'
import { useId } from 'react'
import Link from 'next/link'
import { pragueLight, compass } from '@/lib/pragueLight'
import { sunsetCountdown } from '@/lib/spottingHighlights'
import styles from './SunsetCard.module.css'
const time = (value: string | null | undefined) => value ? new Date(value).toLocaleTimeString('cs-CZ', { timeZone: 'Europe/Prague', hour: '2-digit', minute: '2-digit' }) : '—'
export function SunsetCard({ now }: { now: number }) {
  const titleId = useId()
  const solar = pragueLight(now)
  const sunset = solar.sunset
  return <section className={styles.card} aria-labelledby={titleId}>
    <div className={styles.scene} aria-hidden="true"><div className={styles.sun} /><div className={styles.horizon} /><span className={styles.plane}>✈</span></div>
    <div className={styles.content}>
      <p className={styles.eyebrow}>SVĚTLO PRO SPOTTING · PRAHA</p>
      <h2 id={titleId}>Ještě jeden přílet<br />před západem.</h2>
      <p className={styles.date}>{new Date(now).toLocaleDateString('cs-CZ', { timeZone: 'Europe/Prague', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <div className={styles.mainTime}><span>Západ slunce</span><time dateTime={sunset ?? undefined}>{time(sunset)}</time></div>
      <p className={styles.countdown}>{sunsetCountdown(sunset, now)}</p>
      <dl className={styles.times}>
        <div><dt>Zlatá hodinka začíná</dt><dd><time dateTime={solar.goldenHourStart ?? undefined}>{time(solar.goldenHourStart)}</time></dd></div>
        <div><dt>Východ slunce</dt><dd><time dateTime={solar?.sunrise ?? undefined}>{time(solar?.sunrise)}</time></dd></div>
        <div><dt>Stmívá se</dt><dd><time dateTime={solar?.duskCivil ?? undefined}>{time(solar?.duskCivil)}</time></dd></div>
      </dl>
      <p className={styles.direction}>☀ {solar.altitude > 0 ? `Slunce teď: ${compass(solar.azimuth)} (${Math.round(solar.azimuth)}°), výška ${Math.round(solar.altitude)}°.` : 'Slunce je teď pod obzorem.'} {solar.sunsetAzimuth !== null && `Západ směrem na ${compass(solar.sunsetAzimuth)} (${Math.round(solar.sunsetAzimuth)}°).`}</p>
      <div className={styles.footer}><p>Časy pro letiště Praha, v pražském časovém pásmu. Oblačnost a místo focení ovlivní skutečné světlo. Výpočet SunCalc pro rovný horizont. Zlatá hodinka začíná při výšce slunce 6° nad obzorem.</p><Link href="/letiste/praha/planespotting">Vybrat vyhlídku ↗</Link></div>
    </div>
  </section>
}
