'use client'

import { useFlights } from '@/hooks/useFlights'
import { useTheme } from '@/hooks/useTheme'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { Flight } from '@/types/flight'

// Kapacity letadel (odhad průměru pasažérů)
const CAPACITY: Record<string, number> = {
  'narrow-body': 165, 'wide-body': 350, 'turboprop': 50,
  'private-jet': 8,   'cargo': 0,       'military': 4,
  'helicopter': 6,    'ga': 2,
}

function TopList({ title, items, color = 'var(--gold)' }: {
  title: string
  items: { label: string; value: string; sub?: string; callsign?: string }[]
  color?: string
}) {
  return (
    <div className="glass-panel" style={{ padding: 16 }}>
      <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1.5, marginBottom: 12 }}>{title}</div>
      {items.map((item, i) => (
        <Link
          key={i}
          href={item.callsign ? `/?flight=${encodeURIComponent(item.callsign)}` : '#'}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < items.length - 1 ? 10 : 0, borderRadius: 8, padding: '4px 6px', margin: `0 -6px ${i < items.length - 1 ? '6px' : '0'} -6px`, transition: 'background 0.15s', cursor: item.callsign ? 'pointer' : 'default' }}
          onMouseEnter={e => { if (item.callsign) (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          <div style={{ fontSize: 10, color: 'var(--text-dim)', width: 16, textAlign: 'right', flexShrink: 0 }}>#{i + 1}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="font-display" style={{ fontSize: 13, fontWeight: 800, color, letterSpacing: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</div>
            {item.sub && <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 1 }}>{item.sub}</div>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color, fontFamily: 'Syne, sans-serif' }}>{item.value}</div>
            {item.callsign && <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>→</div>}
          </div>
        </Link>
      ))}
    </div>
  )
}

function BarChart({ title, items, color = 'var(--gold)' }: {
  title: string
  items: { label: string; value: number; total: number; emoji?: string }[]
  color?: string
}) {
  const max = Math.max(...items.map(i => i.value), 1)
  return (
    <div className="glass-panel" style={{ padding: 16 }}>
      <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1.5, marginBottom: 12 }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: i < items.length - 1 ? 10 : 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: 'var(--text-primary)' }}>{item.emoji} {item.label}</span>
            <span className="font-display" style={{ fontSize: 11, fontWeight: 700, color }}>{item.value}</span>
          </div>
          <div style={{ height: 4, background: 'var(--border-subtle)', borderRadius: 2 }}>
            <div style={{
              height: '100%', borderRadius: 2, background: color,
              width: `${Math.round(item.value / max * 100)}%`,
              transition: 'width 0.5s ease',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Sparkline({ data, color = '#FDE047' }: { data: number[]; color?: string }) {
  if (data.length < 2) return null
  const w = 200, h = 48
  const max = Math.max(...data, 1)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 6) - 3
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 48 }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polyline
        points={`0,${h} ${pts} ${w},${h}`}
        fill={color} fillOpacity="0.08" stroke="none"
      />
    </svg>
  )
}

export default function StatsPage() {
  const { flights, count, loading } = useFlights()
  const { theme, toggleTheme } = useTheme()
  const historyRef = useRef<number[]>([])
  const [history, setHistory] = useState<number[]>([])

  // Snapshot počtu letadel každých 15s → sparkline
  useEffect(() => {
    if (count === 0) return
    historyRef.current = [...historyRef.current.slice(-39), count]
    setHistory([...historyRef.current])
  }, [count])

  const airborne = flights.filter(f => !f.onGround)
  const onGround = flights.filter(f => f.onGround).length

  // TOP 5 nejrychlejších
  const top5fastest = [...airborne].sort((a, b) => b.velocity - a.velocity).slice(0, 5)
  // TOP 5 nejvýše
  const top5highest = [...airborne].sort((a, b) => b.altitude - a.altitude).slice(0, 5)

  // Průměry
  const avgAlt = airborne.length ? Math.round(airborne.reduce((s, f) => s + f.altitude, 0) / airborne.length) : 0
  const avgSpd = airborne.length ? Math.round(airborne.reduce((s, f) => s + f.velocity, 0) / airborne.length) : 0

  // Teplota & vítr — jen letadla co ta data mají
  const withOat = airborne.filter(f => f.oat != null)
  const withWind = airborne.filter(f => f.windSpeed != null)
  const avgOat = withOat.length ? Math.round(withOat.reduce((s, f) => s + (f.oat ?? 0), 0) / withOat.length) : null
  const avgWind = withWind.length ? Math.round(withWind.reduce((s, f) => s + (f.windSpeed ?? 0), 0) / withWind.length) : null
  const avgMach = airborne.filter(f => f.mach).length
    ? (airborne.filter(f => f.mach).reduce((s, f) => s + (f.mach ?? 0), 0) / airborne.filter(f => f.mach).length).toFixed(3)
    : null

  // Odhadovaný počet cestujících
  const passengers = airborne.reduce((s, f) => s + (CAPACITY[f.aircraftType ?? 'narrow-body'] ?? 0), 0)

  // Top státy
  const byCountry: Record<string, number> = {}
  flights.forEach(f => { const c = f.origin_country ?? 'Neznámá'; byCountry[c] = (byCountry[c] ?? 0) + 1 })
  const topCountries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]).slice(0, 6)

  // Typy letadel
  const typeEmoji: Record<string, string> = {
    'narrow-body': '✈️', 'wide-body': '🛫', 'turboprop': '🛩',
    'private-jet': '💼', 'cargo': '📦', 'military': '🎖',
    'helicopter': '🚁', 'ga': '🛸',
  }
  const typeLabels: Record<string, string> = {
    'narrow-body': 'Úzkotrupé', 'wide-body': 'Širokotrupé', 'turboprop': 'Turbovrtulové',
    'private-jet': 'Privátní', 'cargo': 'Nákladní', 'military': 'Vojenské',
    'helicopter': 'Vrtulník', 'ga': 'Malá GA',
  }
  const byType: Record<string, number> = {}
  flights.forEach(f => { const t = f.aircraftType ?? 'narrow-body'; byType[t] = (byType[t] ?? 0) + 1 })
  const topTypes = Object.entries(byType).sort((a, b) => b[1] - a[1])

  if (loading && count === 0) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--midnight)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 32 }}>✈️</div>
        <div className="font-display" style={{ color: 'var(--gold)', fontSize: 13, letterSpacing: 2 }}>NAČÍTÁM DATA…</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--midnight)', padding: '24px 16px 40px', fontFamily: 'Space Grotesk, sans-serif', maxWidth: 900, margin: '0 auto' }}>

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button className="btn-cta" style={{ fontSize: 10, padding: '5px 14px' }}>← MAPA</button>
        </Link>
        <span className="font-display" style={{ fontSize: 20, fontWeight: 800, color: 'var(--gold)', letterSpacing: 2 }}>STATISTIKY</span>
        <div style={{ flex: 1 }} />
        <button onClick={toggleTheme} style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 14 }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Hero tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Celkem letadel', value: count.toLocaleString('cs'), sub: 've sledované oblasti' },
          { label: 'Ve vzduchu', value: airborne.length.toLocaleString('cs'), sub: 'aktivní lety' },
          { label: 'Na zemi', value: onGround.toLocaleString('cs'), sub: 'na letišti' },
          { label: 'Cestující', value: `~${Math.round(passengers / 1000)}k`, sub: 'odhadovaný počet' },
          { label: 'Prům. výška', value: `${avgAlt.toLocaleString('cs')}m`, sub: 'metrů MSL' },
          { label: 'Prům. rychlost', value: `${avgSpd}`, sub: 'km/h' },
        ].map(s => (
          <div key={s.label} className="metric-tile" style={{ padding: '14px 12px' }}>
            <div className="label">{s.label.toUpperCase()}</div>
            <div className="value" style={{ fontSize: 24, margin: '4px 0' }}>{s.value}</div>
            <div className="sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Atmosféra tiles */}
      {(avgOat != null || avgWind != null || avgMach != null) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: 20 }}>
          {avgOat != null && (
            <div className="metric-tile" style={{ padding: '14px 12px' }}>
              <div className="label">TEPLOTA VENKU</div>
              <div className="value" style={{ fontSize: 24, margin: '4px 0', color: avgOat < -30 ? 'var(--accent-blue)' : 'var(--gold)' }}>{avgOat}°C</div>
              <div className="sub">průměr za oknem letadel</div>
            </div>
          )}
          {avgWind != null && (
            <div className="metric-tile" style={{ padding: '14px 12px' }}>
              <div className="label">VÍTR V LETOVÉ HL.</div>
              <div className="value" style={{ fontSize: 24, margin: '4px 0', color: 'var(--accent-blue)' }}>{avgWind} kt</div>
              <div className="sub">průměrná rychlost větru</div>
            </div>
          )}
          {avgMach != null && (
            <div className="metric-tile" style={{ padding: '14px 12px' }}>
              <div className="label">PRŮMĚRNÝ MACH</div>
              <div className="value" style={{ fontSize: 24, margin: '4px 0', color: 'var(--lavender)' }}>M{avgMach}</div>
              <div className="sub">rychlost zvuku = M1.0</div>
            </div>
          )}
        </div>
      )}

      {/* Sparkline */}
      {history.length > 3 && (
        <div className="glass-panel" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1.5 }}>POČET LETADEL V ČASE</div>
            <div className="font-display" style={{ fontSize: 12, color: 'var(--gold)' }}>{count} teď</div>
          </div>
          <Sparkline data={history} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>dříve</span>
            <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>teď</span>
          </div>
        </div>
      )}

      {/* Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, marginBottom: 14 }}>
        <TopList
          title="🏆 TOP 5 NEJRYCHLEJŠÍCH"
          color="var(--gold)"
          items={top5fastest.map(f => ({
            label: f.callsign,
            value: `${f.velocity} km/h`,
            sub: f.model ?? f.origin_country ?? '',
            callsign: f.callsign.trim(),
          }))}
        />
        <TopList
          title="🏔 TOP 5 NEJVÝŠE"
          color="var(--lavender)"
          items={top5highest.map(f => ({
            label: f.callsign,
            value: `FL${Math.round(f.altitude * 3.28084 / 100)}`,
            sub: `${f.altitude.toLocaleString('cs')} m`,
            callsign: f.callsign.trim(),
          }))}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        <BarChart
          title="🌍 TOP STÁTY"
          color="var(--gold)"
          items={topCountries.map(([label, value]) => ({ label, value, total: count }))}
        />
        <BarChart
          title="✈️ TYPY LETADEL"
          color="var(--accent-blue)"
          items={topTypes.map(([type, value]) => ({
            label: typeLabels[type] ?? type,
            value,
            total: count,
            emoji: typeEmoji[type] ?? '✈️',
          }))}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1 }}>
        DATA SE OBNOVUJÍ KAŽDÝCH 10 SEKUND · ADSB.LOL + AERODATABOX
      </div>
    </div>
  )
}
