'use client'

import { useState, useEffect } from 'react'

interface StatusBarProps {
  flightCount: number
  visibleCount: number
}

export function StatusBar({ flightCount, visibleCount }: StatusBarProps) {
  const [time, setTime] = useState('')
  const [tick, setTick] = useState(true)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      setTick((t) => !t)
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 32,
        background: 'rgba(10, 15, 30, 0.85)',
        borderTop: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 16,
        zIndex: 50,
        fontFamily: 'Space Grotesk, sans-serif',
      }}
    >
      {/* Čas */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span
          style={{
            fontSize: 9,
            color: 'var(--text-dim)',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          UTC
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
          {time}
        </span>
      </div>

      <div style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

      {/* Oblast */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase' }}>Oblast</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Central Europe</span>
      </div>

      <div style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

      {/* Počet letadel */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase' }}>V pohledu</span>
        <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
          {visibleCount}
        </span>
      </div>

      <div style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

      {/* Total */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1, textTransform: 'uppercase' }}>Celkem</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{flightCount}</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* LIVE ticker */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: tick ? 'var(--green-live)' : 'transparent',
            border: '1px solid var(--green-live)',
            transition: 'background 0.3s',
          }}
        />
        <span
          style={{
            fontSize: 9,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--green-live)',
            fontWeight: 700,
          }}
        >
          LIVE
        </span>
      </div>
    </div>
  )
}
