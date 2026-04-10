'use client'

import type { Flight } from '@/types/flight'
import { getAircraftColor } from '@/components/Map/AircraftIcon'

interface FlightCardProps {
  flight: Flight
  selected: boolean
  onClick: (flight: Flight) => void
  theme: 'dark' | 'light'
}

function getStatusColor(flight: Flight): string {
  if (flight.onGround) return 'var(--text-muted)'
  if (flight.velocity < 200) return 'var(--amber-delay)'
  return 'var(--green-live)'
}

function getStatusLabel(flight: Flight): string {
  if (flight.onGround) return 'Na zemi'
  if (flight.velocity < 200) return 'Manévruje'
  return 'Letí'
}

export function FlightCard({ flight, selected, onClick, theme }: FlightCardProps) {
  const statusColor = getStatusColor(flight)
  const acColor = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)

  return (
    <div
      className={`flight-card${selected ? ' selected' : ''}`}
      onClick={() => onClick(flight)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(flight)}
      aria-pressed={selected}
    >
      {/* Row 1: callsign + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span className="callsign" style={{ color: selected ? 'var(--gold)' : 'var(--text-primary)' }}>
          {flight.callsign}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: statusColor,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 0.5 }}>
            {getStatusLabel(flight)}
          </span>
        </div>
      </div>

      {/* Row 2: route */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
          {flight.origin_country?.substring(0, 3).toUpperCase() ?? '???'}
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: `linear-gradient(90deg, ${acColor}44, transparent)`,
          }}
        />
        <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>→ ??</span>
      </div>

      {/* Row 3: metrics */}
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1.5, textTransform: 'uppercase' }}>km/h</span>
          <span style={{ fontSize: 11, color: acColor, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            {flight.velocity}
          </span>
        </div>
        <div style={{ width: 1, background: 'var(--border-subtle)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1.5, textTransform: 'uppercase' }}>výška</span>
          <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
            {Math.round(flight.altitude / 100) * 100}m
          </span>
        </div>
      </div>
    </div>
  )
}
