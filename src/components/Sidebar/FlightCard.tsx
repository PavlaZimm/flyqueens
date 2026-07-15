'use client'

import type { Flight } from '@/types/flight'
import { getAircraftColor } from '@/components/Map/AircraftIcon'
import { getAirlineLogoUrl } from '@/lib/airlineLogos'
import { getFlightPhase } from '@/lib/flightPhase'

interface FlightCardProps {
  flight: Flight
  selected: boolean
  onClick: (flight: Flight) => void
  theme: 'dark' | 'light'
}

function getFlagEmoji(country: string | undefined): string {
  const flags: Record<string, string> = {
    'Czech Republic': '🇨🇿', 'Czechia': '🇨🇿',
    'Germany': '🇩🇪', 'Austria': '🇦🇹', 'Slovakia': '🇸🇰',
    'Poland': '🇵🇱', 'Hungary': '🇭🇺', 'United Kingdom': '🇬🇧',
    'France': '🇫🇷', 'Netherlands': '🇳🇱', 'Switzerland': '🇨🇭',
    'United States': '🇺🇸', 'Spain': '🇪🇸', 'Italy': '🇮🇹',
    'Russia': '🇷🇺', 'Ukraine': '🇺🇦', 'Denmark': '🇩🇰',
    'Sweden': '🇸🇪', 'Norway': '🇳🇴', 'Finland': '🇫🇮',
    'Greece': '🇬🇷', 'Turkey': '🇹🇷', 'Ireland': '🇮🇪',
    'Portugal': '🇵🇹', 'Belgium': '🇧🇪', 'Romania': '🇷🇴',
    'Japan': '🇯🇵', 'China': '🇨🇳', 'Canada': '🇨🇦',
    'Australia': '🇦🇺', 'UAE': '🇦🇪', 'Qatar': '🇶🇦',
  }
  return flags[country ?? ''] ?? '🌍'
}

function headingLabel(heading: number): string {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(heading / 45) % 8]
}

export function FlightCard({ flight, selected, onClick, theme }: FlightCardProps) {
  const phase    = getFlightPhase(flight)
  const acColor  = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)
  const logoUrl  = getAirlineLogoUrl(flight.callsign)

  return (
    <div
      className={`flight-card${selected ? ' selected' : ''}`}
      onClick={() => onClick(flight)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(flight)}
      aria-pressed={selected}
    >
      {/* Row 1: logo + callsign + status */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {logoUrl && (
            <div style={{
              width: 22, height: 22, borderRadius: 4, flexShrink: 0,
              background: 'rgba(255,255,255,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', padding: 2,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none' }}
              />
            </div>
          )}
          <span className="callsign" style={{ color: selected ? 'var(--gold)' : 'var(--text-primary)' }}>
            {flight.callsign}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ fontSize: 10, lineHeight: 1 }}>{phase.icon}</span>
          <span style={{ fontSize: 9, color: phase.color, letterSpacing: 0.5, fontWeight: 600 }}>
            {phase.label}
          </span>
        </div>
      </div>

      {/* Row 2: country flag + heading */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 5 }}>
        <span style={{ fontSize: 11 }}>{getFlagEmoji(flight.origin_country)}</span>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', flex: 1 }}>
          {flight.origin_country ?? ''}
        </span>
        {!flight.onGround && (
          <span style={{ fontSize: 9, color: 'var(--text-dim)' }}>
            {headingLabel(flight.heading)}
          </span>
        )}
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
