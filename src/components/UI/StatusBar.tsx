'use client'

import { useState, useEffect } from 'react'

interface StatusBarProps {
  flightCount: number
  visibleCount: number
  isMock?: boolean
}

export function StatusBar({ flightCount, visibleCount, isMock }: StatusBarProps) {
  const [time, setTime] = useState('')
  const [tick, setTick] = useState(true)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      // Skutečný UTC čas
      setTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit', minute: '2-digit', second: '2-digit',
          timeZone: 'UTC',
        })
      )
      setTick((t) => !t)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {/* Mock data banner */}
      {isMock && (
        <div style={{
          position: 'absolute', bottom: 32, left: 0, right: 0,
          background: 'rgba(253,224,71,0.1)', borderTop: '1px solid rgba(253,224,71,0.2)',
          padding: '4px 16px', display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'Space Grotesk, sans-serif', zIndex: 1000,
        }}>
          <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: 0.5 }}>
            ⚠ Demo data — OpenSky API dočasně nedostupné. Zobrazuji ukázková letadla.
          </span>
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 32,
        background: 'color-mix(in srgb, var(--midnight-3) 90%, transparent)',
        borderTop: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 16, zIndex: 1000,
        fontFamily: 'Space Grotesk, sans-serif',
      }}>
        {/* UTC čas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>UTC</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{time}</span>
        </div>

        <div style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>OBLAST</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Central Europe</span>
        </div>

        <div style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>V POHLEDU</span>
          <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{visibleCount}</span>
        </div>

        <div style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1 }}>CELKEM</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{flightCount}</span>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: tick ? 'var(--green-live)' : 'transparent',
            border: '1px solid var(--green-live)', transition: 'background 0.3s',
          }} />
          <span style={{ fontSize: 9, letterSpacing: 1.5, color: 'var(--green-live)', fontWeight: 700 }}>LIVE</span>
        </div>
      </div>
    </>
  )
}
