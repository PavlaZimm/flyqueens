'use client'

import type { Flight } from '@/types/flight'
import { getAircraftColor } from '@/components/Map/AircraftIcon'
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

  return (
    <button
      type="button"
      className={`flight-card${selected ? ' selected' : ''}`}
      onClick={() => onClick(flight)}
      aria-pressed={selected}
      aria-label={`${flight.callsign}, ${phase.label}, rychlost ${flight.velocity} kilometrů za hodinu, výška ${Math.round(flight.altitude)} metrů`}
    >
      {/* Volací znak + stav doložený ADS-B. Loga z ručního seznamu záměrně
          nenačítáme: zpomalovala seznam a u starých prefixů mohla být chybná. */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
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
          <span style={{ fontSize: 11, color: acColor, fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>
            {flight.velocity}
          </span>
        </div>
        <div style={{ width: 1, background: 'var(--border-subtle)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1.5, textTransform: 'uppercase' }}>výška</span>
          <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>
            {Math.round(flight.altitude / 100) * 100}m
          </span>
        </div>
      </div>
    </button>
  )
}
