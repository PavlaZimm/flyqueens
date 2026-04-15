'use client'

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
}

const CHIP_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 36,
  borderRadius: 8,
  padding: '0 14px',
  cursor: 'pointer',
  fontFamily: 'Space Grotesk, sans-serif',
  fontSize: 11,
  fontWeight: 500,
  backdropFilter: 'blur(10px)',
  letterSpacing: 0.3,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  transition: 'background 0.15s, border-color 0.15s, color 0.15s',
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
}: TopBarProps) {
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'all',
      }}
    >
      {/* Hamburger — pouze mobile */}
      <button
        onClick={onHamburger}
        className="fq-hamburger"
        style={{ ...ICON_BTN, display: 'none' }}
        aria-label="Otevřít menu"
      >
        <div style={{ width: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{ height: 2, background: 'var(--text-primary)', borderRadius: 1 }}
            />
          ))}
        </div>
      </button>

      {/* Live + stats info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        <LiveBadge />

        {/* Počet letadel */}
        <div
          style={{
            ...CHIP_BASE,
            padding: '0 12px',
            gap: 5,
            cursor: 'default',
          }}
        >
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>✈</span>
          <span
            className="font-display"
            style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}
          >
            {flightCount}
          </span>
        </div>
      </div>

      {/* Filter chips + letiště — scrollovatelné */}
      <div
        className="fq-filters"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'],
          flexShrink: 1,
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
              <span style={{ marginRight: 5, fontSize: 12 }}>{filter.emoji}</span>
              {filter.label}
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
            color: showAirports ? '#38BDF8' : 'var(--text-muted)',
            fontWeight: showAirports ? 600 : 400,
          }}
        >
          <span style={{ marginRight: 5, fontSize: 12 }}>🛬</span>
          Letiště
        </button>
      </div>

      <div style={{ flex: 1 }} />

      {/* Stats link */}
      <Link href="/stats" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div
          style={{ ...ICON_BTN }}
          title="Statistiky"
          aria-label="Statistiky"
        >
          📊
        </div>
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
