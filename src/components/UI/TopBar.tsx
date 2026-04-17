'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LiveBadge } from './LiveBadge'

export type FilterType = 'passenger' | 'cargo' | 'private' | 'military' | 'helicopter'

interface TopBarProps {
  flightCount: number
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onHamburger: () => void
  activeFilters: Set<FilterType>
  onFilterChange: (filters: Set<FilterType>) => void
  showAirports: boolean
  onToggleAirports: () => void
  region: string
  onRegionChange: (r: string) => void
}

const REGIONS: { id: string; label: string; flag: string }[] = [
  { id: 'europe',     label: 'Evropa',     flag: '🇪🇺' },
  { id: 'namerica',   label: 'S. Amerika', flag: '🇺🇸' },
  { id: 'samerica',   label: 'J. Amerika', flag: '🌎' },
  { id: 'asia',       label: 'Asie',       flag: '🌏' },
  { id: 'middleeast', label: 'Blízký v.',  flag: '🕌' },
  { id: 'africa',     label: 'Afrika',     flag: '🌍' },
  { id: 'oceania',    label: 'Oceánie',    flag: '🦘' },
]

const CHIP_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 36,
  borderRadius: 8,
  padding: '0 10px',
  cursor: 'pointer',
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: 11,
  fontWeight: 500,
  backdropFilter: 'blur(10px)',
  letterSpacing: 0.3,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  border: '1px solid var(--glass-border)',
  background: 'var(--glass-bg)',
  color: 'var(--text-muted)',
}

const ICON_BTN: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  borderRadius: 8,
  cursor: 'pointer',
  backdropFilter: 'blur(10px)',
  border: '1px solid var(--glass-border)',
  background: 'var(--glass-bg)',
  fontSize: 15,
  flexShrink: 0,
}

export function TopBar({
  flightCount,
  theme,
  onToggleTheme,
  onHamburger,
  activeFilters,
  onFilterChange,
  showAirports,
  onToggleAirports,
  region,
  onRegionChange,
}: TopBarProps) {
  const [regionOpen, setRegionOpen] = useState(false)
  const regionRef = useRef<HTMLDivElement>(null)
  const currentRegion = REGIONS.find(r => r.id === region) ?? REGIONS[0]

  useEffect(() => {
    if (!regionOpen) return
    const handler = (e: MouseEvent) => {
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setRegionOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [regionOpen])

  const toggleFilter = (f: FilterType) => {
    const next = new Set(activeFilters)
    if (next.has(f)) {
      next.delete(f)
    } else {
      next.add(f)
    }
    onFilterChange(next)
  }

  const filters: { id: FilterType; label: string; emoji: string }[] = [
    { id: 'passenger', label: 'Pasažérské', emoji: '✈️' },
    { id: 'cargo',     label: 'Nákladní',   emoji: '📦' },
    { id: 'private',   label: 'Soukromé',   emoji: '🛩️' },
    { id: 'military',  label: 'Vojenské',   emoji: '🪖' },
    { id: 'helicopter',label: 'Vrtulníky',  emoji: '🚁' },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'all' }}>

      {/* Hamburger — pouze mobile */}
      <button
        onClick={onHamburger}
        className="fq-hamburger"
        style={{ ...ICON_BTN }}
        aria-label="Otevřít menu"
      >
        <div style={{ width: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 2, background: 'var(--text-primary)', borderRadius: 1 }} />
          ))}
        </div>
      </button>

      {/* Live badge + počet letadel */}
      <LiveBadge />
      <div style={{ ...CHIP_BASE, padding: '0 12px', gap: 5, cursor: 'default', flexShrink: 0 }}>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>✈</span>
        <span className="font-display" style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>
          {flightCount}
        </span>
      </div>

      {/* Filter chips — scrollovatelné, vyplní zbývající místo */}
      <div
        className="fq-filters"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flex: 1,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          minWidth: 0,
          padding: '2px 0',
        }}
      >
        {filters.map((filter) => {
          const active = activeFilters.has(filter.id)
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              aria-pressed={active}
              style={{
                ...CHIP_BASE,
                background: active ? 'rgba(253,224,71,0.13)' : 'var(--glass-bg)',
                border: `1px solid ${active ? 'rgba(253,224,71,0.4)' : 'var(--glass-border)'}`,
                color: active ? 'var(--gold)' : 'var(--text-muted)',
                fontWeight: active ? 600 : 400,
              }}
            >
              <span style={{ fontSize: 13 }}>{filter.emoji}</span>
              <span className="fq-chip-label" style={{ marginLeft: 5 }}>{filter.label}</span>
            </button>
          )
        })}

        {/* Letiště toggle */}
        <button
          onClick={onToggleAirports}
          aria-label="Přepnout zobrazení letišť"
          aria-pressed={showAirports}
          style={{
            ...CHIP_BASE,
            background: showAirports ? 'rgba(56,189,248,0.13)' : 'var(--glass-bg)',
            border: `1px solid ${showAirports ? 'rgba(56,189,248,0.4)' : 'var(--glass-border)'}`,
            color: showAirports ? 'var(--accent-blue)' : 'var(--text-muted)',
            fontWeight: showAirports ? 600 : 400,
          }}
        >
          <span style={{ fontSize: 13 }}>🛬</span>
          <span className="fq-chip-label" style={{ marginLeft: 5 }}>Letiště</span>
        </button>
      </div>

      {/* Region selector */}
      <div ref={regionRef} style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => setRegionOpen(v => !v)}
          aria-label="Vybrat region"
          style={{
            ...CHIP_BASE,
            padding: '0 10px',
            gap: 5,
            background: regionOpen ? 'rgba(253,224,71,0.13)' : 'var(--glass-bg)',
            border: `1px solid ${regionOpen ? 'rgba(253,224,71,0.4)' : 'var(--glass-border)'}`,
            color: regionOpen ? 'var(--gold)' : 'var(--text-muted)',
          }}
        >
          <span style={{ fontSize: 15 }}>{currentRegion.flag}</span>
          <span className="fq-region-label" style={{ marginLeft: 4 }}>{currentRegion.label}</span>
          <span className="fq-region-label" style={{ fontSize: 8, marginLeft: 2, opacity: 0.6 }}>▼</span>
        </button>
        {regionOpen && (
          <div style={{
            position: 'fixed',
            top: 56,
            right: 12,
            background: 'rgba(10,15,30,0.97)',
            border: '1px solid var(--glass-border)',
            borderRadius: 10,
            padding: 6,
            minWidth: 155,
            zIndex: 3000,
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}>
            {REGIONS.map(r => (
              <button
                key={r.id}
                onClick={() => { onRegionChange(r.id); setRegionOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 10px',
                  borderRadius: 7,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 12,
                  fontWeight: r.id === region ? 600 : 400,
                  background: r.id === region ? 'rgba(253,224,71,0.12)' : 'transparent',
                  color: r.id === region ? 'var(--gold)' : 'var(--text-primary)',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 15 }}>{r.flag}</span>
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats link */}
      <Link href="/stats" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div style={{ ...ICON_BTN }} title="Statistiky" aria-label="Statistiky">📊</div>
      </Link>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        style={{ ...ICON_BTN }}
        aria-label={theme === 'dark' ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

    </div>
  )
}
