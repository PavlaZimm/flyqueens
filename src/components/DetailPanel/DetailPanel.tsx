'use client'

import { useState, useEffect } from 'react'
import type { Flight } from '@/types/flight'
import { AircraftIcon, getAircraftColor } from '@/components/Map/AircraftIcon'
import { getAirportFromCallsign } from '@/lib/airports'

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

    fetch(`https://api.planespotters.net/pub/photos/hex/${icao24}`, { signal: controller.signal })
      .then(r => r.json())
      .then((data: { photos?: PlanePhoto[] }) => {
        setPhoto(data.photos?.[0] ?? null)
      })
      .catch(() => setPhoto(null))
      .finally(() => setLoading(false))

    return () => controller.abort()
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

  if (!flight) return null

  const color = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)
  const vibe  = getVibeText(flight.altitude, flight.velocity)
  const label = getAircraftLabel(flight.aircraftType)
  const flag  = getFlagEmoji(flight.origin_country)
  const fl    = getFlightLevel(flight.altitude)

  const airline = getAirportFromCallsign(flight.callsign)

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
        maxHeight: 'calc(100vh - 80px)',
        overflowY: 'auto',
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
        {flight.model
          ? <><span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{flight.model}</span> · {label}</>
          : label
        }
      </div>

      {/* Vibe */}
      <div style={{
        fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.5,
        paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)',
      }}>
        {vibe}
      </div>

      {/* Dopravce / letiště */}
      {airline && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 9, color: 'var(--text-dim)', flexShrink: 0 }}>DOPRAVCE</div>
          <div style={{ flex: 1 }}>
            <div className="route-airport" style={{ fontSize: 14 }}>{airline.iata}</div>
            <div style={{ fontSize: 8, color: 'var(--text-dim)', marginTop: 1 }}>{airline.name}</div>
          </div>
          <div style={{ fontSize: 18, color: 'var(--text-dim)' }}>✈</div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-dim)', fontFamily: 'var(--font-display)' }}>???</div>
            <div style={{ fontSize: 8, color: 'var(--text-dim)', marginTop: 1 }}>cíl neznámý</div>
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
      </div>

      {/* CTA */}
      <a
        href={`https://www.flightradar24.com/${flight.callsign.trim()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-cta"
        style={{ textDecoration: 'none', textAlign: 'center' }}
      >
        SLEDOVAT NA FR24
      </a>
    </div>
  )
}
