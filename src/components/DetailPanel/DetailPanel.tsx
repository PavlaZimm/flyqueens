'use client'

import type { Flight } from '@/types/flight'
import { AircraftIcon, getAircraftColor } from '@/components/Map/AircraftIcon'
import { getAirportFromCallsign, guessDestination } from '@/lib/airports'

interface DetailPanelProps {
  flight: Flight | null
  theme: 'dark' | 'light'
  onClose: () => void
}

function getVibeText(altitude: number, velocity: number): string {
  if (altitude > 10000) return 'Letí v naprostém klidu nad mraky, daleko od světa ✨'
  if (altitude > 5000)  return `Stoupá klidně na výšku ${Math.round(altitude / 1000)}km 🌤`
  if (altitude < 500 && velocity < 100) return 'Pomalu se řídí k přistání. Skoro doma! 🛬'
  if (velocity > 800)   return 'Na plný plyn — žene se přes oblohu jako hvězda 🚀'
  if (velocity < 100)   return 'Manévruje na letišti nebo pomalu stoupá 🐢'
  return 'Proplouvá nebem svým vlastním tempem 🌿'
}

function getAircraftLabel(type: Flight['aircraftType']): string {
  const labels: Record<string, string> = {
    'narrow-body': 'Úzkotrupý (A320 / B737)',
    'wide-body':   'Širokotrupý (B777 / A380)',
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
  const flags: Record<string, string> = {
    'Czech Republic': '🇨🇿', 'Czechia': '🇨🇿',
    'Germany': '🇩🇪', 'Austria': '🇦🇹', 'Slovakia': '🇸🇰',
    'Poland': '🇵🇱', 'Hungary': '🇭🇺', 'United Kingdom': '🇬🇧',
    'France': '🇫🇷', 'Netherlands': '🇳🇱', 'Switzerland': '🇨🇭',
    'United States': '🇺🇸', 'Spain': '🇪🇸', 'Italy': '🇮🇹',
    'Russia': '🇷🇺', 'Ukraine': '🇺🇦', 'Denmark': '🇩🇰',
    'Sweden': '🇸🇪', 'Norway': '🇳🇴', 'Finland': '🇫🇮',
    'Greece': '🇬🇷', 'Turkey': '🇹🇷', 'Ireland': '🇮🇪',
  }
  return flags[country ?? ''] ?? '🌍'
}

function getFlightLevel(altitude: number): string {
  const fl = Math.round(altitude * 3.28084 / 100)
  return fl > 0 ? `FL${fl}` : 'GND'
}

export function DetailPanel({ flight, theme, onClose }: DetailPanelProps) {
  if (!flight) return null

  const color = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)
  const vibe  = getVibeText(flight.altitude, flight.velocity)
  const label = getAircraftLabel(flight.aircraftType)
  const flag  = getFlagEmoji(flight.origin_country)
  const fl    = getFlightLevel(flight.altitude)

  const origin = getAirportFromCallsign(flight.callsign)
  const dest   = origin ? guessDestination(origin.iata, flight.heading) : null
  const originLabel = origin?.iata ?? flight.origin_country?.substring(0, 3).toUpperCase() ?? '???'
  const destLabel   = dest?.iata ?? '???'

  // Progress odhad podle polohy (hrubý)
  const progress = flight.onGround ? 0 : Math.min(90, Math.max(10, Math.round((flight.altitude / 12000) * 60 + 15)))

  return (
    <div
      className="glass-panel"
      style={{
        position: 'absolute',
        top: 60, right: 16,
        width: 240,
        zIndex: 100,
        padding: '14px 14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {/* Handle + Close */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ flex: 1, height: 3, background: 'var(--border-strong)', borderRadius: 2 }} />
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 15, padding: 0, lineHeight: 1, flexShrink: 0 }}
          aria-label="Zavřít"
        >✕</button>
      </div>

      {/* Callsign + ikona */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'var(--glass-bg)', border: '1px solid var(--border-mid)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <AircraftIcon type={flight.aircraftType ?? 'narrow-body'} color={color} size={28} heading={0} />
        </div>
        <div>
          <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 1 }}>
            {flight.callsign}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>
            {flag} {flight.origin_country ?? 'Neznámá země'}
          </div>
        </div>
      </div>

      {/* Typ + model */}
      <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: -4 }}>
        {flight.model ? <><span style={{ color: 'var(--text-muted)' }}>{flight.model}</span> · </> : ''}{label}
      </div>

      {/* Vibe */}
      <div style={{
        fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5,
        paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)',
      }}>
        {vibe}
      </div>

      {/* Route */}
      <div className="route-row">
        <div style={{ textAlign: 'center' }}>
          <div className="route-airport">{originLabel}</div>
          {origin && <div style={{ fontSize: 8, color: 'var(--text-dim)', marginTop: 1 }}>{origin.name}</div>}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ fontSize: 10, color: 'var(--gold)' }}>✈</div>
          <div style={{ width: '100%', height: 1, background: 'rgba(253,224,71,0.25)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="route-airport">{destLabel}</div>
          {dest && <div style={{ fontSize: 8, color: 'var(--text-dim)', marginTop: 1 }}>{dest.name}</div>}
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%`, transition: 'width 1s ease' }} />
          {/* Letadlo na progress baru */}
          <div style={{
            position: 'absolute', top: -5, left: `${progress}%`, transform: 'translateX(-50%)',
            fontSize: 10, color: 'var(--gold)',
          }}>✈</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 8, color: 'var(--text-dim)' }}>
          <span>{originLabel}</span>
          <span style={{ color: 'var(--text-muted)' }}>{progress}%</span>
          <span>{destLabel}</span>
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
      <button className="btn-cta">SLEDOVAT LET</button>
    </div>
  )
}
