'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Flight } from '@/types/flight'
import { FlightCard } from './FlightCard'
import { AtcPanel } from './AtcPanel'

interface SidebarProps {
  flights: Flight[]
  selectedFlight: Flight | null
  onFlightSelect: (flight: Flight) => void
  flightCount: number
  theme: 'dark' | 'light'
  searchQuery: string
  onSearchChange: (q: string) => void
  onClose: () => void
}

const NAV_ITEMS = [
  { id: 'map',      label: 'Živá mapa',      icon: '🗺',  href: '/' },
  { id: 'stats',    label: 'Statistiky',      icon: '📊',  href: '/stats' },
]

export function Sidebar({
  flights, selectedFlight, onFlightSelect, flightCount,
  theme, searchQuery, onSearchChange, onClose,
}: SidebarProps) {
  const pathname = usePathname()

  const filteredFlights = useMemo(() => {
    const q = searchQuery.trim().toUpperCase()
    if (!q) return flights
    return flights.filter((f) =>
      f.callsign.includes(q) || (f.origin_country ?? '').toUpperCase().includes(q)
    )
  }, [flights, searchQuery])

  return (
    <div style={{
      width: 220,
      flexShrink: 0,
      height: '100%',
      background: 'var(--midnight-2)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '14px 12px 10px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, flexShrink: 0, color: 'var(--cta-text)',
            }}>✈</div>
            <div>
              <div className="font-display" style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 2, textTransform: 'uppercase' }}>
                FLYQUEENS
              </div>
              <div style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 0.5 }}>Track Every Flight</div>
            </div>
          </div>
          {/* Zavřít tlačítko (mobile) */}
          <button
            onClick={onClose}
            className="fq-close-btn"
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, padding: 4, lineHeight: 1 }}
            aria-label="Zavřít menu"
          >✕</button>
        </div>

        {/* Live count */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)',
          borderRadius: 6, padding: '5px 8px', marginTop: 10,
        }}>
          <div className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-live)', flexShrink: 0 }} />
          <span style={{ fontSize: 10, color: 'var(--text-muted)', flex: 1 }}>Živě sledováno</span>
          <span className="font-display" style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 700 }}>{flightCount}</span>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--text-dim)', pointerEvents: 'none' }}>
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              // Sanitizace — pouze alfanumerické + pomlčka, max 10 znaků
              const clean = e.target.value.replace(/[^A-Za-z0-9\- ]/g, '').slice(0, 10)
              onSearchChange(clean)
            }}
            placeholder="Hledat let nebo letiště..."
            style={{
              width: '100%', paddingLeft: 28, paddingRight: 10, paddingTop: 7, paddingBottom: 7,
              background: 'var(--glass-bg)', border: `1px solid ${searchQuery ? 'rgba(253,224,71,0.3)' : 'var(--border-subtle)'}`,
              borderRadius: 8, color: 'var(--text-primary)',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: 12, padding: 0, lineHeight: 1 }}
            >✕</button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '6px 8px 0' }}>
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.id} href={item.href} style={{ textDecoration: 'none' }} onClick={onClose}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '7px 8px', borderRadius: 7,
                background: active ? 'rgba(253,224,71,0.08)' : 'none',
                color: active ? 'var(--gold)' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 12, fontWeight: active ? 600 : 400,
              }}>
                <span style={{ fontSize: 13 }}>{item.icon}</span>
                {item.label}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* ATC Panel */}
      <AtcPanel />

      {/* Flight list */}
      <div style={{ flex: 1, overflow: 'hidden auto', padding: '10px 10px 8px' }}>
        <div style={{
          fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
          color: 'var(--text-dim)', marginBottom: 8,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span>Lety v okolí</span>
          <span style={{ color: searchQuery ? 'var(--gold)' : 'var(--text-dim)', fontSize: 9 }}>
            {filteredFlights.length}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {filteredFlights.length === 0 ? (
            <div style={{ fontSize: 11, color: 'var(--text-dim)', textAlign: 'center', padding: '20px 0' }}>
              {searchQuery ? `Žádný let odpovídá „${searchQuery}"` : 'Načítám lety...'}
            </div>
          ) : (
            filteredFlights.map((flight) => (
              <FlightCard
                key={flight.icao24}
                flight={flight}
                selected={selectedFlight?.icao24 === flight.icao24}
                onClick={onFlightSelect}
                theme={theme}
              />
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-live)', flexShrink: 0 }} />
        <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 0.5 }}>Data: OpenSky Network</span>
      </div>

      <style>{`
        @media (min-width: 769px) { .fq-close-btn { display: none !important; } }
      `}</style>
    </div>
  )
}
