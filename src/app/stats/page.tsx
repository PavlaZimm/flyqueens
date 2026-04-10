'use client'

import { useFlights } from '@/hooks/useFlights'
import { useTheme } from '@/hooks/useTheme'
import Link from 'next/link'

export default function StatsPage() {
  const { flights, count, loading } = useFlights()
  const { theme, toggleTheme } = useTheme()

  const airborne = flights.filter(f => !f.onGround)
  const fastest  = airborne.length ? airborne.reduce((a, b) => a.velocity > b.velocity ? a : b) : null
  const highest  = airborne.length ? airborne.reduce((a, b) => a.altitude > b.altitude ? a : b) : null
  const onGround = flights.filter(f => f.onGround).length

  const byCountry: Record<string, number> = {}
  flights.forEach(f => {
    const c = f.origin_country ?? 'Neznámá'
    byCountry[c] = (byCountry[c] ?? 0) + 1
  })
  const topCountries = Object.entries(byCountry)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const byType: Record<string, number> = {}
  flights.forEach(f => {
    const t = f.aircraftType ?? 'narrow-body'
    byType[t] = (byType[t] ?? 0) + 1
  })
  const topTypes = Object.entries(byType).sort((a, b) => b[1] - a[1])

  const avgAlt  = airborne.length ? Math.round(airborne.reduce((s, f) => s + f.altitude, 0) / airborne.length) : 0
  const avgSpd  = airborne.length ? Math.round(airborne.reduce((s, f) => s + f.velocity, 0) / airborne.length) : 0

  if (loading && count === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 32 }}>✈️</div>
        <div className="font-display" style={{ color: 'var(--gold)', fontSize: 13, letterSpacing: 2 }}>NAČÍTÁM DATA…</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--midnight)', padding: '24px 16px', fontFamily: 'Space Grotesk, sans-serif' }}>
      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{ fontSize: 10, padding: '5px 14px' }}>← MAPA</button>
        </Link>
        <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold)', letterSpacing: 2 }}>
          STATISTIKY
        </span>
        <div style={{ flex: 1 }} />
        <button
          onClick={toggleTheme}
          style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 14 }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Hero stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Celkem letadel', value: count, sub: 've sledované oblasti' },
          { label: 'Ve vzduchu', value: airborne.length, sub: 'aktivní lety' },
          { label: 'Na zemi', value: onGround, sub: 'na letišti' },
          { label: 'Prům. výška', value: `${avgAlt.toLocaleString('cs')}m`, sub: 'metrů MSL' },
          { label: 'Prům. rychlost', value: `${avgSpd}`, sub: 'km/h' },
        ].map(s => (
          <div key={s.label} className="metric-tile" style={{ padding: '14px 16px' }}>
            <div className="label" style={{ fontSize: 9 }}>{s.label.toUpperCase()}</div>
            <div className="value" style={{ fontSize: 28, margin: '4px 0' }}>{s.value}</div>
            <div className="sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>

        {/* Fastest */}
        {fastest && (
          <div className="glass-panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>NEJRYCHLEJŠÍ LET</div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)' }}>{fastest.callsign}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{fastest.velocity} km/h · {fastest.altitude.toLocaleString('cs')} m</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{fastest.origin_country}</div>
          </div>
        )}

        {/* Highest */}
        {highest && (
          <div className="glass-panel" style={{ padding: 16 }}>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>NEJVÝŠE LETÍCÍ</div>
            <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)' }}>{highest.callsign}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{highest.altitude.toLocaleString('cs')} m · FL{Math.round(highest.altitude * 3.28084 / 100)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{highest.origin_country}</div>
          </div>
        )}

        {/* Top countries */}
        <div className="glass-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 12 }}>TOP STÁTY</div>
          {topCountries.map(([country, num], i) => (
            <div key={country} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 18, fontSize: 11, color: 'var(--text-dim)', textAlign: 'right' }}>#{i + 1}</div>
              <div style={{ flex: 1, fontSize: 12, color: 'var(--text-primary)' }}>{country}</div>
              <div style={{ position: 'relative', width: 80, height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                <div style={{ position: 'absolute', inset: 0, right: `${100 - Math.round(num / count * 100)}%`, background: 'var(--gold)', borderRadius: 2 }} />
              </div>
              <div className="font-display" style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700, width: 24, textAlign: 'right' }}>{num}</div>
            </div>
          ))}
        </div>

        {/* Type breakdown */}
        <div className="glass-panel" style={{ padding: 16 }}>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 12 }}>TYPY LETADEL</div>
          {topTypes.map(([type, num]) => {
            const labels: Record<string, string> = {
              'narrow-body': 'Úzkotrupé', 'wide-body': 'Širokotrupé', 'turboprop': 'Turbovrtulové',
              'private-jet': 'Privátní', 'cargo': 'Nákladní', 'military': 'Vojenské',
              'helicopter': 'Vrtulník', 'ga': 'Malá GA',
            }
            return (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ flex: 1, fontSize: 12, color: 'var(--text-primary)' }}>{labels[type] ?? type}</div>
                <div style={{ position: 'relative', width: 80, height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
                  <div style={{ position: 'absolute', inset: 0, right: `${100 - Math.round(num / count * 100)}%`, background: 'var(--accent-blue)', borderRadius: 2 }} />
                </div>
                <div className="font-display" style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 700, width: 24, textAlign: 'right' }}>{num}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1 }}>
        DATA SE OBNOVUJÍ KAŽDÝCH 5 SEKUND · OPENSKY NETWORK
      </div>
    </div>
  )
}
