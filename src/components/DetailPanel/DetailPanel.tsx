'use client'

import { useState, useEffect } from 'react'
import type { Flight } from '@/types/flight'
import { AircraftIcon, getAircraftColor } from '@/components/Map/AircraftIcon'
import { getAirportFromCallsign } from '@/lib/airports'
import { getAirlineLogoUrl } from '@/lib/airlineLogos'
import { useFlightRoute } from '@/hooks/useFlightRoute'

interface DetailPanelProps {
  flight: Flight | null
  theme: 'dark' | 'light'
  onClose: () => void
}

interface PlanePhoto {
  thumbnail_large: { src: string }
  photographer: string
  link: string
}

function useAircraftPhoto(icao24: string | null) {
  const [photo, setPhoto] = useState<PlanePhoto | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!icao24) { setPhoto(null); return }
    setLoading(true)
    setPhoto(null)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    fetch(`https://api.planespotters.net/pub/photos/hex/${icao24}`, { signal: controller.signal })
      .then(r => r.json())
      .then((data: { photos?: PlanePhoto[] }) => {
        setPhoto(data.photos?.[0] ?? null)
      })
      .catch(() => setPhoto(null))
      .finally(() => { clearTimeout(timeoutId); setLoading(false) })

    return () => { clearTimeout(timeoutId); controller.abort() }
  }, [icao24])

  return { photo, loading }
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
  const { photo, loading: photoLoading } = useAircraftPhoto(flight?.icao24 ?? null)
  const { route, loading: routeLoading  } = useFlightRoute(
    flight?.icao24   ?? null,
    flight?.lat      ?? 0,
    flight?.lng      ?? 0,
    flight?.velocity ?? 0,
    flight?.heading  ?? 0,
  )

  if (!flight) return null

  const color = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)
  const vibe  = getVibeText(flight.altitude, flight.velocity)
  const label = getAircraftLabel(flight.aircraftType)
  const flag  = getFlagEmoji(flight.origin_country)
  const fl    = getFlightLevel(flight.altitude)

  const airline  = getAirportFromCallsign(flight.callsign)
  const logoUrl  = getAirlineLogoUrl(flight.callsign)

  return (
    <div
      className="glass-panel fq-detail-panel"
      style={{
        position: 'absolute',
        top: 60, right: 16,
        width: 252,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100dvh - 80px)',
        background: 'rgba(10, 15, 30, 0.94)',
        backdropFilter: 'blur(20px)',
        borderColor: 'rgba(255,255,255,0.10)',
        overflow: 'hidden',
      }}
    >
      {/* ✕ vždy viditelný — nesrolluje — desktop only */}
      <div
        className="fq-close-btn"
        style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 10px 0', flexShrink: 0 }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid var(--glass-border)',
            borderRadius: 6,
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: 13,
            width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            lineHeight: 1, flexShrink: 0,
          }}
          aria-label="Zavřít"
        >✕</button>
      </div>

      {/* Scrollovatelný obsah */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '8px 14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>

      {/* Fotka letadla */}
      <div style={{
        width: '100%', height: 110, borderRadius: 8, overflow: 'hidden',
        background: 'var(--glass-bg)', border: '1px solid var(--border-mid)',
        position: 'relative', flexShrink: 0,
      }}>
        {photoLoading && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 10, color: 'var(--text-dim)',
          }}>
            Hledám fotku…
          </div>
        )}
        {photo && !photoLoading && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.thumbnail_large.src}
              alt={`${flight.callsign} – ${flight.model ?? label}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <a
              href={photo.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute', bottom: 4, right: 6,
                fontSize: 8, color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none', background: 'rgba(0,0,0,0.45)',
                padding: '1px 4px', borderRadius: 3,
              }}
            >
              © {photo.photographer}
            </a>
          </>
        )}
        {!photo && !photoLoading && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center',
          }}>
            <AircraftIcon type={flight.aircraftType ?? 'narrow-body'} color={color} size={48} heading={0} />
          </div>
        )}
      </div>

      {/* Callsign + registrace */}
      <div>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 1 }}>
          {flight.callsign}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span>{flag} {flight.origin_country ?? 'Neznámá země'}</span>
          {flight.registration && (
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{flight.registration}</span>
          )}
        </div>
      </div>

      {/* Typ + model */}
      <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: -4, paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
        {label}
        {flight.model && (
          <span style={{ color: 'var(--text-dim)', marginLeft: 4, opacity: 0.7 }}>· {flight.model}</span>
        )}
      </div>

      {/* Vibe */}
      <div style={{
        fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5,
        paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)',
      }}>
        {vibe}
      </div>

      {/* Dopravce + logo */}
      {(airline || logoUrl) && (
        <div style={{ paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', marginBottom: 6, letterSpacing: 1 }}>DOPRAVCE</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Logo */}
            {logoUrl && (
              <div style={{
                width: 48, height: 48, borderRadius: 8, flexShrink: 0,
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid var(--border-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', padding: 4,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt="logo dopravce"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            )}
            {/* Název a hub */}
            {airline && (
              <div>
                <div className="font-display" style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 1 }}>
                  {airline.iata}
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 2 }}>
                  hub: {airline.name}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Trasa — odkud / kam */}
      {(routeLoading || route) && (
        <div style={{ paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 1, marginBottom: 8 }}>TRASA</div>

          {routeLoading && (
            <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>Hledám trasu…</div>
          )}

          {!routeLoading && route && (
            <>
              {/* DEP → ARR */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                {/* Odlet */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div className="font-display" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 1 }}>
                    {route.departure ? (route.departure.iata || route.departure.icao) : '???'}
                  </div>
                  <div style={{ fontSize: 8, color: 'var(--text-dim)', marginTop: 1 }}>
                    {route.departure ? (route.departure.city || route.departure.name) : 'Neznámé'}
                  </div>
                </div>

                {/* Letadlo + čára */}
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ fontSize: 12 }}>✈</div>
                  <div style={{ width: '100%', height: 2, background: 'var(--border-subtle)', borderRadius: 1, position: 'relative' }}>
                    {route.totalDist > 0 && (
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${route.progress}%`,
                        background: 'linear-gradient(90deg, var(--gold), var(--lavender))',
                        borderRadius: 1,
                        transition: 'width 0.5s ease',
                      }} />
                    )}
                  </div>
                  <div style={{ fontSize: 8, color: 'var(--text-dim)' }}>{route.progress} %</div>
                </div>

                {/* Přilet */}
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div className="font-display" style={{ fontSize: 16, fontWeight: 800, color: 'var(--gold)', letterSpacing: 1 }}>
                    {route.arrival ? (route.arrival.iata || route.arrival.icao) : '???'}
                  </div>
                  <div style={{ fontSize: 8, color: 'var(--text-dim)', marginTop: 1 }}>
                    {route.arrival ? (route.arrival.city || route.arrival.name) : 'Neznámé'}
                  </div>
                </div>
              </div>

              {/* Zbývá km + ETA */}
              {route.arrival && route.remaining > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="font-display" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {route.remaining.toLocaleString('cs')} km
                    </div>
                    <div style={{ fontSize: 8, color: 'var(--text-dim)', letterSpacing: 1 }}>ZBÝVÁ</div>
                  </div>
                  <div style={{ width: 1, background: 'var(--border-subtle)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div className="font-display" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>
                      {route.etaMin < 60
                        ? `${route.etaMin} min`
                        : `${Math.floor(route.etaMin / 60)}h ${route.etaMin % 60}m`}
                    </div>
                    <div style={{ fontSize: 8, color: 'var(--text-dim)', letterSpacing: 1 }}>DO PŘISTÁNÍ</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Emergency badge */}
      {(flight.squawk === '7700' || flight.squawk === '7500' || flight.squawk === '7600' || flight.emergency) && (
        <div style={{
          background: 'rgba(239,68,68,0.15)',
          border: '1px solid rgba(239,68,68,0.6)',
          borderRadius: 8,
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          animation: 'fq-pulse 1.2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: 18 }}>🚨</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', letterSpacing: 1 }}>
              {flight.squawk === '7700' ? 'SQUAWK 7700 — NOUZOVÁ SITUACE' :
               flight.squawk === '7500' ? 'SQUAWK 7500 — ÚNOS' :
               flight.squawk === '7600' ? 'SQUAWK 7600 — VÝPADEK RÁDIA' :
               `EMERGENCY: ${flight.emergency?.toUpperCase()}`}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(239,68,68,0.7)', marginTop: 1 }}>Squawk {flight.squawk}</div>
          </div>
        </div>
      )}

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
        {/* Vertikální rychlost */}
        {flight.baroRate != null && (
          <div className="metric-tile">
            <div className="label">Stoupání</div>
            <div className="value" style={{ color: flight.baroRate > 100 ? '#4ade80' : flight.baroRate < -100 ? '#f87171' : 'var(--gold)' }}>
              {flight.baroRate > 100 ? '↑' : flight.baroRate < -100 ? '↓' : '→'}
              {' '}{Math.abs(Math.round(flight.baroRate))}
            </div>
            <div className="sub">ft/min</div>
          </div>
        )}
        {/* Autopilot target */}
        {flight.navAltitudeFt != null && flight.navAltitudeFt > 0 && (
          <div className="metric-tile">
            <div className="label">Autopilot</div>
            <div className="value" style={{ color: 'var(--lavender)' }}>
              FL{Math.round(flight.navAltitudeFt / 100)}
            </div>
            <div className="sub">míří na</div>
          </div>
        )}
      </div>

      {/* Share + FR24 */}
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          onClick={() => {
            const url = `${window.location.origin}${window.location.pathname}?flight=${encodeURIComponent(flight.callsign.trim())}`
            if (navigator.share) {
              navigator.share({ title: `${flight.callsign} – FlyQueens`, url })
            } else {
              navigator.clipboard.writeText(url).then(() => {
                const btn = document.getElementById('fq-share-btn')
                if (btn) { btn.textContent = 'ZKOPÍROVÁNO ✓'; setTimeout(() => { btn.textContent = 'SDÍLET' }, 2000) }
              })
            }
          }}
          id="fq-share-btn"
          style={{
            flex: 1,
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            color: 'var(--text-muted)',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            borderRadius: 10,
            padding: '11px 8px',
            cursor: 'pointer',
          }}
        >
          SDÍLET
        </button>
        <a
          href={`https://www.flightradar24.com/${flight.callsign.trim()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta"
          style={{ textDecoration: 'none', textAlign: 'center', flex: 2 }}
        >
          SLEDOVAT NA FR24
        </a>
      </div>
      </div>{/* konec scrollovatelného wrapperu */}
    </div>
  )
}
