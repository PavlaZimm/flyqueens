'use client'

import type { Flight } from '@/types/flight'
import { AircraftIcon, getAircraftColor } from '@/components/Map/AircraftIcon'

interface DetailPanelProps {
  flight: Flight | null
  theme: 'dark' | 'light'
  onClose: () => void
}

function getVibeText(altitude: number, velocity: number): string {
  if (altitude > 10000) return 'Letí v naprostém klidu nad mraky, daleko od světa ✨'
  if (altitude > 5000) return `Stoupá klidně na výšku ${Math.round(altitude / 1000)}km, nic ho netrápí 🌤`
  if (altitude < 500 && velocity < 100) return 'Pomalu se řítí k přistání. Skoro doma! 🛬'
  if (velocity > 800) return 'Na plný plyn — žene se přes oblohu jako hvězda 🚀'
  return 'Proplouvá nebem svým vlastním tempem 🌿'
}

function getAircraftLabel(type: Flight['aircraftType']): string {
  const labels: Record<string, string> = {
    'narrow-body': 'Úzkotrupý (A320/B737)',
    'wide-body':   'Širokotrupý (B777/A380)',
    'turboprop':   'Turbovrtulový',
    'private-jet': 'Privátní tryskáč',
    'cargo':       'Nákladní letoun',
    'military':    'Vojenský letoun',
    'helicopter':  'Vrtulník',
    'ga':          'Malé letadlo (GA)',
  }
  return labels[type ?? 'narrow-body'] ?? 'Letoun'
}

function getFlagEmoji(country: string | undefined): string {
  if (!country) return '🌍'
  const flags: Record<string, string> = {
    'Czech Republic': '🇨🇿',
    'Czechia': '🇨🇿',
    'Germany': '🇩🇪',
    'Austria': '🇦🇹',
    'Slovakia': '🇸🇰',
    'Poland': '🇵🇱',
    'Hungary': '🇭🇺',
    'United Kingdom': '🇬🇧',
    'France': '🇫🇷',
    'Netherlands': '🇳🇱',
    'Switzerland': '🇨🇭',
    'United States': '🇺🇸',
    'Spain': '🇪🇸',
    'Italy': '🇮🇹',
    'Russia': '🇷🇺',
    'Ukraine': '🇺🇦',
  }
  return flags[country] ?? '🌍'
}

function getFlightLevel(altitude: number): string {
  const fl = Math.round(altitude * 3.28084 / 100)
  return fl > 0 ? `FL${fl}` : 'GND'
}

export function DetailPanel({ flight, theme, onClose }: DetailPanelProps) {
  if (!flight) return null

  const color = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)
  const vibe = getVibeText(flight.altitude, flight.velocity)
  const label = getAircraftLabel(flight.aircraftType)
  const flag = getFlagEmoji(flight.origin_country)
  const fl = getFlightLevel(flight.altitude)

  return (
    <div
      className="glass-panel"
      style={{
        position: 'absolute',
        top: 60,
        right: 16,
        width: 235,
        zIndex: 100,
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Handle + Close */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="handle-bar" style={{ margin: 0, flex: 1 }} />
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: 16,
            padding: '0 0 0 8px',
            lineHeight: 1,
          }}
          aria-label="Zavřít detail"
        >
          ✕
        </button>
      </div>

      {/* Callsign + ikona */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'var(--glass-bg)',
            border: '1px solid var(--border-mid)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <AircraftIcon
            type={flight.aircraftType ?? 'narrow-body'}
            color={color}
            size={28}
            heading={0}
          />
        </div>
        <div>
          <div
            className="font-display"
            style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 1 }}
          >
            {flight.callsign}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
            {flag} {flight.origin_country ?? 'Neznámá země'}
          </div>
        </div>
      </div>

      {/* Typ letadla */}
      <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{label}</div>

      {/* Vibe text */}
      <div
        style={{
          fontSize: 11,
          color: 'var(--text-muted)',
          fontStyle: 'italic',
          lineHeight: 1.5,
          paddingBottom: 4,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {vibe}
      </div>

      {/* Route row */}
      <div className="route-row">
        <span className="route-airport">{flight.origin_country?.substring(0, 3).toUpperCase() ?? '???'}</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(253,224,71,0.3)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', fontSize: 10 }}>✈</div>
        </div>
        <span className="route-airport">??</span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: '50%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 8, color: 'var(--text-dim)' }}>
          <span>ODLET</span>
          <span>50%</span>
          <span>PŘISTÁNÍ</span>
        </div>
      </div>

      {/* 4 metric tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <div className="metric-tile">
          <div className="label">Výška</div>
          <div className="value">{flight.altitude.toLocaleString('cs')}</div>
          <div className="sub">metrů</div>
        </div>
        <div className="metric-tile">
          <div className="label">Rychlost</div>
          <div className="value">{flight.velocity}</div>
          <div className="sub">km/h</div>
        </div>
        <div className="metric-tile">
          <div className="label">Kurz</div>
          <div className="value">{flight.heading}°</div>
          <div className="sub">stupňů</div>
        </div>
        <div className="metric-tile">
          <div className="label">Hladina</div>
          <div className="value">{fl}</div>
          <div className="sub">letová hladina</div>
        </div>
      </div>

      {/* CTA */}
      <button className="btn-cta">
        SLEDOVAT LET
      </button>
    </div>
  )
}
