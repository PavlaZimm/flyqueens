'use client'

import type { FlightDataStatus } from '@/types/flight'

const STATUS = {
  live: { label: 'ŽIVĚ', color: 'var(--green-live)', background: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.25)' },
  stale: { label: 'STARŠÍ DATA', color: '#F5B83D', background: 'rgba(245, 184, 61, 0.12)', border: 'rgba(245, 184, 61, 0.25)' },
  unavailable: { label: 'OFFLINE', color: '#FF5C63', background: 'rgba(248, 113, 113, 0.12)', border: 'rgba(248, 113, 113, 0.25)' },
} as const

export function LiveBadge({ status }: { status: FlightDataStatus }) {
  const config = STATUS[status]
  return (
    <div
      role="status"
      aria-label={`Stav dat: ${config.label}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: config.background,
        border: `1px solid ${config.border}`,
        borderRadius: 6,
        padding: '3px 8px',
      }}
    >
      <div
        className="live-dot"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: config.color,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: config.color,
          fontFamily: 'IBM Plex Sans, sans-serif',
        }}
      >
        {config.label}
      </span>
    </div>
  )
}
