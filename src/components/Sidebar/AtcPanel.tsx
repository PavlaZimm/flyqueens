'use client'

import { useState, useEffect, useRef } from 'react'
import { getAtcFeeds } from '@/lib/liveatc'
import type { AtcFeed } from '@/lib/liveatc'

// Všechna letiště s known feeds
const ALL_ICAO = ['EIDW','EHAM','EPWA','KJFK','RJTT','KSFO','KATL','LKPR','LOWW','EDDF','EGLL','LSZH','LFPG','EBBR','LZIB']

interface FeedStatus extends AtcFeed {
  icao: string
  online: boolean | null  // null = loading
}

let panelAudio: HTMLAudioElement | null = null

export function AtcPanel() {
  const [open, setOpen] = useState(false)
  const [feeds, setFeeds] = useState<FeedStatus[]>([])
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const playingRef = useRef<string | null>(null)

  const checkFeeds = async () => {
    setChecking(true)
    try {
      const allFeeds: FeedStatus[] = ALL_ICAO.flatMap(icao =>
        getAtcFeeds(icao).map(f => ({ ...f, icao, online: null }))
      )
      setFeeds(allFeeds)

      const feedList = allFeeds.map(f => f.feed).join(',')
      const res = await fetch(`/api/atc-check?feeds=${encodeURIComponent(feedList)}`)
      const data: Record<string, boolean> = await res.json()
      setFeeds(allFeeds.map(f => ({ ...f, online: data[f.feed] ?? false })))
    } catch (err) {
      console.error('[ATC] error:', err)
      setFeeds(prev => prev.map(f => ({ ...f, online: false })))
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    if (open && feeds.length === 0) checkFeeds()
  }, [open])

  const play = (feed: FeedStatus) => {
    const id = `${feed.icao}-${feed.feed}`

    // Zastav aktuální stream
    if (panelAudio) {
      panelAudio.pause()
      panelAudio.src = ''
      panelAudio = null
    }

    if (playingRef.current === id) {
      // Toggle — kliknutí na stejný = stop
      playingRef.current = null
      setPlayingId(null)
      return
    }

    const audio = new Audio(`/api/atc-stream?feed=${encodeURIComponent(feed.feed)}`)
    audio.play().catch(() => setPlayingId(null))
    panelAudio = audio
    playingRef.current = id
    setPlayingId(id)

    audio.onended = () => {
      playingRef.current = null
      setPlayingId(null)
      panelAudio = null
    }
  }

  const onlineFeeds = feeds.filter(f => f.online === true)
  const offlineFeeds = feeds.filter(f => f.online === false)
  const loadingFeeds = feeds.filter(f => f.online === null)

  return (
    <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
      {/* Hlavní tlačítko */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, width: '100%',
          padding: '7px 16px', background: 'none', border: 'none', cursor: 'pointer',
          color: open ? 'var(--gold)' : 'var(--text-muted)',
          fontFamily: 'Space Grotesk, sans-serif', fontSize: 12,
          fontWeight: open ? 600 : 400,
        }}
      >
        <span style={{ fontSize: 13 }}>🎙</span>
        <span style={{ flex: 1, textAlign: 'left' }}>ATC Online</span>
        {onlineFeeds.length > 0 && (
          <span style={{
            fontSize: 9, fontWeight: 700, color: '#22C55E',
            background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 4, padding: '1px 5px',
          }}>
            {onlineFeeds.length} LIVE
          </span>
        )}
        <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ padding: '0 10px 10px' }}>
          {/* Refresh */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
            <button
              onClick={checkFeeds}
              disabled={checking}
              style={{
                fontSize: 9, color: 'var(--text-dim)', background: 'none', border: 'none',
                cursor: checking ? 'default' : 'pointer', padding: 0, letterSpacing: 0.5,
              }}
            >
              {checking ? '⏳ Kontroluji…' : '↻ Obnovit'}
            </button>
          </div>

          {/* Loading */}
          {loadingFeeds.length > 0 && (
            <div style={{ fontSize: 10, color: 'var(--text-dim)', padding: '4px 0' }}>
              ⏳ Zjišťuji status {loadingFeeds.length} streamů…
            </div>
          )}

          {/* Online streams */}
          {onlineFeeds.length > 0 && (
            <>
              <div style={{ fontSize: 8, letterSpacing: 1.5, textTransform: 'uppercase', color: '#22C55E', marginBottom: 5, opacity: 0.7 }}>
                Live nyní
              </div>
              {onlineFeeds.map(f => {
                const id = `${f.icao}-${f.feed}`
                const isPlaying = playingId === id
                return (
                  <button
                    key={id}
                    onClick={() => play(f)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      width: '100%', marginBottom: 4,
                      background: isPlaying ? 'rgba(253,224,71,0.08)' : 'rgba(34,197,94,0.07)',
                      border: `1px solid ${isPlaying ? 'rgba(253,224,71,0.3)' : 'rgba(34,197,94,0.25)'}`,
                      borderRadius: 7, padding: '7px 9px', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span style={{ fontSize: 12 }}>{isPlaying ? '⏹' : '▶'}</span>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{
                        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 10,
                        color: isPlaying ? 'var(--gold)' : '#22C55E', letterSpacing: 0.5,
                      }}>
                        {f.icao}
                      </div>
                      <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 1 }}>
                        {f.label}
                      </div>
                    </div>
                    {isPlaying && (
                      <span style={{ fontSize: 8, color: 'var(--gold)', letterSpacing: 1 }}>ŽIVĚ</span>
                    )}
                  </button>
                )
              })}
            </>
          )}

          {/* Offline streams — kompaktně */}
          {offlineFeeds.length > 0 && (
            <>
              <div style={{ fontSize: 8, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', margin: '8px 0 4px', opacity: 0.6 }}>
                Offline
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {offlineFeeds.map(f => (
                  <span key={`${f.icao}-${f.feed}`} style={{
                    fontSize: 9, color: 'var(--text-dim)', background: 'var(--glass-bg)',
                    border: '1px solid var(--border-subtle)', borderRadius: 4,
                    padding: '2px 6px', opacity: 0.6,
                  }}>
                    {f.icao}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Prázdný stav */}
          {!checking && feeds.length > 0 && onlineFeeds.length === 0 && loadingFeeds.length === 0 && (
            <div style={{ fontSize: 10, color: 'var(--text-dim)', padding: '6px 0', textAlign: 'center' }}>
              Žádný stream není právě online.<br />
              <span style={{ fontSize: 9 }}>Vysílání zajišťují dobrovolníci – zkus to za chvíli nebo</span><br />
              <a
                href="https://www.liveatc.net/search/?icao=LKPR"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 9, color: 'var(--gold)', textDecoration: 'none', opacity: 0.8 }}
              >
                otevři LiveATC.net →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
