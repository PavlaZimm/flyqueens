'use client'
import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import type { InsightData, InsightKind } from '@/lib/aeroInsights'
import styles from './FlightTools.module.css'
interface Props { kind: InsightKind; id?: string; label: string }
export function InsightPanel(props: Props) { return <Panel key={`${props.kind}:${props.id ?? ''}`} {...props} /> }
function Panel({ kind, id = '', label }: Props) {
  const panelId = useId()
  const controller = useRef<AbortController | null>(null)
  const [data, setData] = useState<InsightData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => () => controller.current?.abort(), [])
  async function toggle() {
    if (open && !error) { setOpen(false); return }
    setOpen(true)
    if (data) return
    controller.current?.abort()
    const request = new AbortController()
    controller.current = request
    setLoading(true); setError('')
    try {
      const response = await fetch(`/api/aero-insights?${new URLSearchParams({ kind, id })}`, { signal: AbortSignal.any([request.signal, AbortSignal.timeout(20000)]) })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error ?? 'Údaje se nepodařilo načíst.')
      if (!request.signal.aborted) setData(payload as InsightData)
    } catch (reason) {
      if (!request.signal.aborted) setError(reason instanceof Error && reason.name !== 'TimeoutError' ? reason.message : 'Načítání trvá příliš dlouho. Zkuste to později.')
    } finally { if (!request.signal.aborted) setLoading(false) }
  }
  return <div className={styles.insight}>
    <button type="button" className={styles.insightButton} aria-expanded={open} aria-controls={panelId} disabled={loading} onClick={() => void toggle()}>
      {loading ? 'Načítám…' : error ? `Zkusit znovu: ${label}` : `${open ? 'Skrýt' : 'Zobrazit'}: ${label}`}
    </button>
    <div id={panelId} hidden={!open} aria-live="polite" aria-busy={loading}>
      {error && <p role="alert">{error}</p>}
      {data && <>
        <p className={styles.muted}>AeroDataBox · získáno {new Date(data.fetchedAt).toLocaleString('cs-CZ', { timeZone: 'Europe/Prague' })} pražského času</p>
        {!data.sections.length && <p>Zdroj pro tento dotaz neposkytl použitelné údaje.</p>}
        {data.sections.map((section, index) => <section key={index}>
          <h4>{section.title}</h4>
          <dl className={styles.insightRows}>{section.rows.map((row, i) => <div key={i}>
            <dt>{row.href ? <Link href={row.href}>{row.label}</Link> : row.label}</dt><dd>{row.value}</dd>
          </div>)}</dl>
        </section>)}
        <p className={styles.muted}>{data.note}</p>
      </>}
    </div>
  </div>
}
export function AircraftInsights({ registration }: { registration: string | null | undefined }) {
  if (!registration) return null
  return <><InsightPanel kind="aircraft" id={registration} label="stáří a podrobnosti letadla" /><InsightPanel kind="registrations" id={registration} label="historie registrací" /></>
}
export function AirportInsights() {
  return <section className={styles.card} aria-label="Další údaje pro Prahu">
    <h2>Více o dnešku v Praze</h2>
    <p>Dostupné destinace a statistika zpoždění. Každý přehled otevřete zvlášť.</p>
    <InsightPanel kind="destinations" label="destinace a četnost letů" />
    <InsightPanel kind="airport-delays" label="zpoždění na letišti" />
  </section>
}
