'use client'

import type { Flight } from '@/types/flight'

const EMERGENCY_SQUAWKS = new Set(['7700', '7500', '7600'])

function squawkLabel(squawk: string): string {
  if (squawk === '7700') return '7700 — NOUZOVÁ SITUACE'
  if (squawk === '7500') return '7500 — ÚNOS'
  if (squawk === '7600') return '7600 — VÝPADEK RÁDIA'
  return squawk
}

interface Props {
  flights: Flight[]
  onSelect: (f: Flight) => void
}

export function EmergencyBanner({ flights, onSelect }: Props) {
  const emergencies = flights.filter(
    f => (f.squawk && EMERGENCY_SQUAWKS.has(f.squawk)) || f.emergency
  )

  if (emergencies.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      maxWidth: 360,
      width: 'calc(100vw - 32px)',
    }}>
      {emergencies.map(f => (
        <button
          key={f.icao24}
          onClick={() => onSelect(f)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            background: 'rgba(15,23,42,0.96)',
            border: '1.5px solid #ef4444',
            borderRadius: 10,
            cursor: 'pointer',
            backdropFilter: 'blur(16px)',
            animation: 'fq-pulse 1s ease-in-out infinite',
            textAlign: 'left',
            width: '100%',
          }}
        >
          <span style={{ fontSize: 20, flexShrink: 0 }}>🚨</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444', fontFamily: 'Syne, sans-serif', letterSpacing: 1 }}>
              SQUAWK {f.squawk ? squawkLabel(f.squawk) : f.emergency?.toUpperCase()}
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>
              {f.callsign} · {f.model ?? f.origin_country ?? ''} · klikni pro detail
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
