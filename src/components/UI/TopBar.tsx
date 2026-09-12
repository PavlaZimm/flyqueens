'use client'

import Link from 'next/link'
import { LiveBadge } from './LiveBadge'
import { REGION_CONFIGS } from '@/lib/constants'
import type { FlightDataStatus } from '@/types/flight'
import { trackEvent } from '@/lib/analytics'

export type FilterType = 'passenger' | 'private' | 'military' | 'helicopter'

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
  dataStatus: FlightDataStatus
  displayMode: 'overview' | 'all'
  onDisplayModeChange: (mode: 'overview' | 'all') => void
  onRegionChange: (region: string) => void
}

const CHIP_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 36,
  borderRadius: 8,
  padding: '0 10px',
  cursor: 'pointer',
  fontFamily: 'IBM Plex Sans, sans-serif',
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
  dataStatus,
  displayMode,
  onDisplayModeChange,
  onRegionChange,
}: TopBarProps) {
  const currentRegion = REGION_CONFIGS[region] ?? REGION_CONFIGS.europe

  const toggleFilter = (f: FilterType) => {
    const next = new Set(activeFilters)
    if (next.has(f)) {
      next.delete(f)
    } else {
      next.add(f)
    }
    trackEvent('Radar Filter Changed', { filter: f, active: next.has(f) })
    onFilterChange(next)
  }

  const filters: { id: FilterType; label: string; emoji: string }[] = [
    { id: 'passenger', label: 'Pasažérské', emoji: '✈️' },
    { id: 'private',   label: 'Soukromé',   emoji: '🛩️' },
    { id: 'military',  label: 'Vojenská',   emoji: '🎖️' },
    { id: 'helicopter',label: 'Vrtulníky',  emoji: '🚁' },
  ]

  return (
    <div className="fq-topbar-inner" style={{ display: 'flex', alignItems: 'center', gap: 8, pointerEvents: 'all' }}>

      {/* Hamburger — pouze mobile */}
      <button
        onClick={onHamburger}
        className="fq-hamburger"
        style={{ ...ICON_BTN }}
        aria-label="Otevřít menu"
      >
        <span style={{ width: 16, display: 'flex', flexDirection: 'column', gap: 3 }} aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ height: 2, background: 'var(--text-primary)', borderRadius: 1 }} />
          ))}
        </span>
      </button>

      {/* Live badge + počet letadel */}
      <LiveBadge status={dataStatus} />
      <div className="fq-flight-count" style={{ ...CHIP_BASE, padding: '0 12px', gap: 5, cursor: 'default', flexShrink: 0 }}>
        <span className="fq-flight-count-icon" style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>✈</span>
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
        <button
          onClick={() => {
            trackEvent('Radar Filters Cleared')
            onFilterChange(new Set())
          }}
          aria-pressed={activeFilters.size === 0}
          aria-label="Zrušit filtry typů letadel"
          style={{
            ...CHIP_BASE,
            background: activeFilters.size === 0 ? 'rgba(245,184,61,0.13)' : 'var(--glass-bg)',
            border: `1px solid ${activeFilters.size === 0 ? 'rgba(245,184,61,0.4)' : 'var(--glass-border)'}`,
            color: activeFilters.size === 0 ? 'var(--gold)' : 'var(--text-muted)',
          }}
        >
          <span aria-hidden="true">◎</span>
          <span className="fq-chip-label" style={{ marginLeft: 5 }}>Všechna</span>
        </button>

        {filters.map((filter) => {
          const active = activeFilters.has(filter.id)
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              aria-pressed={active}
              aria-label={filter.label}
              style={{
                ...CHIP_BASE,
                background: active ? 'rgba(245,184,61,0.13)' : 'var(--glass-bg)',
                border: `1px solid ${active ? 'rgba(245,184,61,0.4)' : 'var(--glass-border)'}`,
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
          onClick={() => {
            trackEvent('Radar Airports Toggled', { visible: !showAirports })
            onToggleAirports()
          }}
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

        <button
          onClick={() => {
            const nextMode = displayMode === 'overview' ? 'all' : 'overview'
            trackEvent('Radar Display Mode Changed', { mode: nextMode })
            onDisplayModeChange(nextMode)
          }}
          aria-label={displayMode === 'overview' ? 'Zobrazit všechna letadla' : 'Zjednodušit překrývající se letadla'}
          aria-pressed={displayMode === 'overview'}
          title={displayMode === 'overview' ? 'Přehledný režim – bez překrývání' : 'Zobrazují se všechna letadla'}
          style={{
            ...CHIP_BASE,
            background: displayMode === 'overview' ? 'rgba(192,132,252,0.13)' : 'var(--glass-bg)',
            border: `1px solid ${displayMode === 'overview' ? 'rgba(192,132,252,0.4)' : 'var(--glass-border)'}`,
            color: displayMode === 'overview' ? 'var(--lavender)' : 'var(--text-muted)',
          }}
        >
          <span aria-hidden="true">◫</span>
          <span className="fq-chip-label" style={{ marginLeft: 5 }}>
            {displayMode === 'overview' ? 'Přehledně' : 'Všechna'}
          </span>
        </button>
      </div>

      <label className="fq-region-chip" style={{ ...CHIP_BASE, gap: 5, padding: '0 8px', position: 'relative' }} aria-label={`Oblast mapy: ${currentRegion.label}`}>
        <span style={{ fontSize: 15 }} aria-hidden="true">{currentRegion.flag}</span>
        <select
          value={region}
          onChange={(event) => onRegionChange(event.target.value)}
          aria-label="Vybrat oblast Evropy"
          style={{
            appearance: 'none', border: 0, outline: 0, cursor: 'pointer',
            color: 'inherit', background: 'transparent', font: 'inherit',
            padding: '7px 14px 7px 0', maxWidth: 152,
          }}
        >
          {Object.entries(REGION_CONFIGS).map(([id, config]) => (
            <option key={id} value={id} style={{ color: '#0F172A' }}>{config.label}</option>
          ))}
        </select>
        <span aria-hidden="true" style={{ position: 'absolute', right: 7, fontSize: 8, pointerEvents: 'none' }}>▼</span>
      </label>

      {/* Stats link */}
      <Link className="fq-stats-btn" href="/stats" aria-label="Statistiky" title="Statistiky" onClick={() => trackEvent('Radar Stats Opened')} style={{ textDecoration: 'none', flexShrink: 0, ...ICON_BTN }}>
        <span aria-hidden="true">📊</span>
      </Link>

      {/* Theme toggle */}
      <button
        className="fq-theme-btn"
        onClick={onToggleTheme}
        style={{ ...ICON_BTN }}
        aria-label={theme === 'dark' ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

    </div>
  )
}
