'use client'

import { useState } from 'react'
import { LiveBadge } from './LiveBadge'

interface TopBarProps {
  flightCount: number
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  onHamburger: () => void
}

type FilterType = 'passenger' | 'cargo' | 'private'

export function TopBar({ flightCount, theme, onToggleTheme, onHamburger }: TopBarProps) {
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set(['passenger']))

  const toggleFilter = (f: FilterType) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(f)) {
        next.delete(f)
      } else {
        next.add(f)
      }
      return next
    })
  }

  const filters: { id: FilterType; label: string }[] = [
    { id: 'passenger', label: 'Pasažérské' },
    { id: 'cargo', label: 'Nákladní' },
    { id: 'private', label: 'Soukromé' },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

      {/* Hamburger — pouze mobile */}
      <button
        onClick={onHamburger}
        className="fq-hamburger"
        style={{
          background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
          borderRadius: 8, padding: '6px 9px', cursor: 'pointer',
          backdropFilter: 'blur(8px)', lineHeight: 1, pointerEvents: 'all',
          display: 'none',
        }}
        aria-label="Otevřít menu"
      >
        <div style={{ width: 16, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ height: 2, background: 'var(--text-primary)', borderRadius: 1 }} />
          ))}
        </div>
      </button>

      {/* Pills left */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <LiveBadge />

        {/* Počet letadel */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 6,
            padding: '3px 10px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>LETADEL</span>
          <span
            className="font-display"
            style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}
          >
            {flightCount}
          </span>
        </div>

        {/* Oblast */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: 6,
            padding: '3px 10px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: 0.5 }}>Central Europe</span>
        </div>
      </div>

      {/* Filter chips */}
      <div
        className="fq-filters"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {filters.map((filter) => {
          const active = activeFilters.has(filter.id)
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              style={{
                background: active ? 'rgba(253,224,71,0.12)' : 'var(--glass-bg)',
                border: `1px solid ${active ? 'rgba(253,224,71,0.35)' : 'var(--glass-border)'}`,
                borderRadius: 6,
                padding: '3px 10px',
                cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 10,
                color: active ? 'var(--gold)' : 'var(--text-muted)',
                fontWeight: active ? 600 : 400,
                backdropFilter: 'blur(8px)',
                letterSpacing: 0.3,
              }}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <div style={{ flex: 1 }} />

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: 8,
          padding: '6px 10px',
          cursor: 'pointer',
          fontSize: 14,
          backdropFilter: 'blur(8px)',
          lineHeight: 1,
        }}
        aria-label={theme === 'dark' ? 'Přepnout na světlý režim' : 'Přepnout na tmavý režim'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}

