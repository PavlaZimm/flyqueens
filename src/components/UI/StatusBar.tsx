'use client'

import { useState, useEffect } from 'react'
import type { FlightDataMeta } from '@/types/flight'
import { REGION_CONFIGS } from '@/lib/constants'

interface StatusBarProps {
  flightCount: number
  dataMeta: FlightDataMeta
  region?: string
}

export function StatusBar({ flightCount, dataMeta, region = 'europe' }: StatusBarProps) {
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
      {/* Výpadek nikdy nemaskujeme jako živá data. */}
      {dataMeta.status !== 'live' && (
        <div style={{
          position: 'absolute', bottom: 32, left: 0, right: 0,
          background: dataMeta.status === 'stale' ? 'rgba(253,224,71,0.12)' : 'rgba(248,113,113,0.12)',
          borderTop: `1px solid ${dataMeta.status === 'stale' ? 'rgba(253,224,71,0.25)' : 'rgba(248,113,113,0.25)'}`,
          padding: '4px 16px', display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'Space Grotesk, sans-serif', zIndex: 1000,
        }}>
          <span style={{ fontSize: 10, color: dataMeta.status === 'stale' ? 'var(--gold)' : '#FCA5A5', letterSpacing: 0.5 }}>
            ⚠ {dataMeta.message ?? (dataMeta.status === 'stale'
              ? 'Živý zdroj má výpadek. Zobrazená data mohou být zastaralá.'
              : 'Živá data jsou momentálně nedostupná. Ukázková data nezobrazujeme.')}
          </span>
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 'calc(32px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        background: 'color-mix(in srgb, var(--midnight-3) 90%, transparent)',
        borderTop: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center',
        padding: '0 16px', gap: 12, zIndex: 1000,
        fontFamily: 'Space Grotesk, sans-serif',
      }}>
        {/* UTC čas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1 }}>UTC</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{time}</span>
        </div>

        <div className="fq-sb-sep" style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

        <div className="fq-sb-col" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1 }}>OBLAST</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{REGION_CONFIGS[region]?.label ?? region}</span>
        </div>

        <div className="fq-sb-sep" style={{ width: 1, height: 14, background: 'var(--border-subtle)' }} />

        <div className="fq-sb-col" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1 }}>LETÍ</span>
          <span style={{ fontSize: 11, color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{flightCount}</span>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: dataMeta.status === 'live' && tick ? 'var(--green-live)' : 'transparent',
            border: `1px solid ${dataMeta.status === 'live' ? 'var(--green-live)' : dataMeta.status === 'stale' ? '#FDE047' : '#F87171'}`,
            transition: 'background 0.3s',
          }} />
          <span style={{
            fontSize: 9, letterSpacing: 1.5,
            color: dataMeta.status === 'live' ? 'var(--green-live)' : dataMeta.status === 'stale' ? '#FDE047' : '#F87171',
            fontWeight: 700,
          }}>
            {dataMeta.status === 'live' ? 'LIVE' : dataMeta.status === 'stale' ? 'STALE' : 'OFFLINE'}
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .fq-sb-col  { display: none !important; }
          .fq-sb-sep  { display: none !important; }
        }
      `}</style>
    </>
  )
}
