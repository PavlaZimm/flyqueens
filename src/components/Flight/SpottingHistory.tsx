'use client'
import { useEffect, useState } from 'react'
import { MIN_HISTORY_SAMPLES, MIN_HISTORY_DAYS, MIN_HOUR_SAMPLES, type SpottingHistory as History } from '@/lib/spottingHistory'
import styles from './SpottingExtras.module.css'
export function SpottingHistory() {
  const [history, setHistory] = useState<History | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/spotting-history', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) })
      .then(async r => { if (!r.ok) throw new Error('Unavailable'); const data = await r.json(); if (!controller.signal.aborted) setHistory(data) })
      .catch(() => { if (!controller.signal.aborted) setFailed(true) })
    return () => controller.abort()
  }, [])
  const hours = history?.hours.filter(h => h.samples >= MIN_HOUR_SAMPLES && h.days >= MIN_HISTORY_DAYS) ?? []
  const peak = hours.length >= 2 ? [...hours].sort((a, b) => b.averageAircraft - a.averageAircraft)[0] : null
  const directionsReady = history && history.directionSamples >= MIN_HISTORY_SAMPLES && history.directionDays >= MIN_HISTORY_DAYS
  return <section className={styles.card} aria-labelledby="spotting-history">
    <p className={styles.eyebrow}>NAŠE POZOROVÁNÍ · POSLEDNÍCH 7 DNÍ</p>
    <h2 id="spotting-history">Jak to u letiště vypadalo</h2>
    {failed || history?.available === false ? <p>Historie měření je dočasně nedostupná.</p> : !history ? <p>Načítám uložená pozorování…</p> : <>
      <p className={styles.target}>{history.samples} měření · {history.observedDays} sledovaných dnů</p>
      {!directionsReady ? <p>Na srovnání směrů zatím nemáme dost dat. Potřebujeme alespoň {MIN_HISTORY_SAMPLES} použitelných odhadů ze {MIN_HISTORY_DAYS} různých dnů; nyní jich je {history.directionSamples}.</p> : <><h3>Směr provozu v použitelných odhadech</h3><ul className={styles.bars}>{history.ends.map(end => <li key={end.end}><span>Dráha {end.end}</span><meter min={0} max={100} value={end.share}>{end.share} %</meter><strong>{end.share} %</strong></li>)}</ul><p className={styles.note}>Z {history.directionSamples} odhadů v {history.directionDays} dnech. Procenta popisují měření, nikoli podíl všech letů.</p></>}
      {peak ? <><h3>Aktivita v našich měřeních</h3><p>Nejvyšší průměr ze srovnatelných hodin vyšel mezi {peak.hour}:00 a {peak.hour + 1}:00: {peak.averageAircraft.toLocaleString('cs-CZ')} nízko letících letadel na jeden snímek.</p><div className={styles.tableWrap}><table><thead><tr><th>Hodina</th><th>Letadel / snímek</th><th>Měření</th><th>Dnů</th></tr></thead><tbody>{hours.map(h => <tr key={h.hour}><td>{h.hour}:00–{h.hour + 1}:00</td><td>{h.averageAircraft.toLocaleString('cs-CZ')}</td><td>{h.samples}</td><td>{h.days}</td></tr>)}</tbody></table></div></> : <p>Hodinové srovnání ukážeme, až budou alespoň dvě hodiny pokryté každá {MIN_HOUR_SAMPLES} měřeními ve {MIN_HISTORY_DAYS} dnech.</p>}
      {history.lastObservedAt && <p className={styles.note}>Poslední měření: {new Date(history.lastObservedAt).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })}.</p>}
    </>}
    <p className={styles.note}>Vzorek vzniká při návštěvách webu, nejde o nepřetržité měření. Snímky sledují nízko letící letadla poblíž letiště; stejné letadlo může být ve více snímcích. Chybějící měření neznamená nulový provoz. Historie není předpověď ani oficiální údaj letiště.</p>
  </section>
}
