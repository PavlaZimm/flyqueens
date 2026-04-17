'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useFlights } from '@/hooks/useFlights'
import { useTheme } from '@/hooks/useTheme'
import { useFlightRoute } from '@/hooks/useFlightRoute'
import { useFaviconCount } from '@/hooks/useFaviconCount'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useNearbyFlights } from '@/hooks/useNearbyFlights'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { DetailPanel } from '@/components/DetailPanel/DetailPanel'
import { TopBar, type FilterType } from '@/components/UI/TopBar'
import { DETAIL_PANEL_WIDTH, EMERGENCY_SQUAWKS } from '@/lib/constants'
import { StatusBar } from '@/components/UI/StatusBar'
import { LoadingScreen } from '@/components/UI/LoadingScreen'
import { ErrorBoundary } from '@/components/UI/ErrorBoundary'
import { EmergencyBanner } from '@/components/UI/EmergencyBanner'
import type { Flight } from '@/types/flight'

// Leaflet (~800 KB) se nesmí renderovat na serveru — SSR crash
const MapView = dynamic(() => import('@/components/Map/MapView').then(m => ({ default: m.MapView })), { ssr: false })

function MobileBottomSheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const touchStartY = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* Backdrop — klik zavře sheet */}
      <div
        className="fq-detail-mobile"
        style={{
          position: 'absolute', inset: 0,
          zIndex: 1499,
          background: 'rgba(0,0,0,0.4)',
        }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fq-detail-mobile bottom-sheet-enter"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--midnight-2)',
          borderTop: '1px solid var(--glass-border)',
          borderRadius: '20px 20px 0 0',
          zIndex: 1500,
          maxHeight: '72dvh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Handle — swipe area + close (vždy nahoře, nescrolluje) */}
        <div
          style={{ padding: '12px 16px 4px', flexShrink: 0, cursor: 'grab', display: 'flex', alignItems: 'center', gap: 8 }}
          onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY }}
          onTouchEnd={(e) => {
            const dy = e.changedTouches[0].clientY - touchStartY.current
            if (dy > 50) onClose()
          }}
        >
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div className="handle-bar" style={{ margin: 0 }} />
          </div>
          <button
            onClick={onClose}
            aria-label="Zavřít"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid var(--glass-border)',
              borderRadius: 6,
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: 13,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >✕</button>
        </div>

        {/* Scrollovatelný obsah */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            padding: '0 16px calc(16px + env(safe-area-inset-bottom, 0px))',
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

export default function Home() {
  const { flights, loading, count, isMock, region, setRegion } = useFlights()
  const { theme, toggleTheme } = useTheme()
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const { route: selectedRoute } = useFlightRoute(
    selectedFlight?.icao24   ?? null,
    selectedFlight?.lat      ?? 0,
    selectedFlight?.lng      ?? 0,
    selectedFlight?.velocity ?? 0,
    selectedFlight?.heading  ?? 0,
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set(['passenger']))
  const [showAirports, setShowAirports] = useState(false)
  const { nearbyFlights, showNearby, locateMe, dismiss: dismissNearby } = useNearbyFlights()
  const mapLocateFnRef = useRef<((lat: number, lng: number) => void) | null>(null)

  // Emergency detection
  const emergencyFlights = flights.filter(
    f => (f.squawk && EMERGENCY_SQUAWKS.includes(f.squawk as typeof EMERGENCY_SQUAWKS[number])) || f.emergency
  )
  const hasEmergency = emergencyFlights.length > 0

  // Favicon — živý počet + červená při emergency
  useFaviconCount(count, hasEmergency)

  // Auto-select flight from URL param ?flight=CSA123
  useEffect(() => {
    if (flights.length === 0) return
    const params = new URLSearchParams(window.location.search)
    const flightParam = params.get('flight')
    if (!flightParam) return
    const match = flights.find(f => f.callsign.trim().toUpperCase() === flightParam.toUpperCase())
    if (match) setSelectedFlight(match)
  }, [flights])

  useKeyboardShortcuts({
    onEscape: () => setSelectedFlight(null),
    onSlash: () => document.querySelector<HTMLInputElement>('input[type="text"]')?.focus(),
  })

  const handleLocateMe = () => {
    locateMe(flights, (lat, lng) => mapLocateFnRef.current?.(lat, lng))
  }

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight)
    setSidebarOpen(false)   // na mobile zavřeme sidebar při výběru
  }
  const handleDetailClose = () => setSelectedFlight(null)

  return (
    <div style={{ display: 'flex', height: '100dvh', width: '100vw', overflow: 'hidden', background: 'var(--midnight)' }}>

      {/* Sidebar — desktop vždy viditelný, mobile přes overlay */}
      <div className={`fq-sidebar${sidebarOpen ? ' fq-sidebar-open' : ''}`} style={{ width: 220 }}>
        <Sidebar
          flights={flights}
          selectedFlight={selectedFlight}
          onFlightSelect={handleFlightSelect}
          flightCount={count}
          theme={theme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Mobile overlay pod sidebarem */}
      {sidebarOpen && (
        <div
          className="fq-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mapová plocha */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

        {/* Mapa */}
        {loading && flights.length === 0 ? (
          <LoadingScreen />
        ) : (
          <div style={{ position: 'absolute', inset: 0 }}>
            <ErrorBoundary>
            <MapView
              flights={flights}
              selectedFlight={selectedFlight}
              onFlightSelect={handleFlightSelect}
              theme={theme}
              searchQuery={searchQuery}
              activeFilters={activeFilters}
              showAirports={showAirports}
              onMapReady={(fn) => { mapLocateFnRef.current = fn }}
              selectedRoute={selectedRoute}
            />
            </ErrorBoundary>
          </div>
        )}

        {/* TopBar */}
        <div style={{
          position: 'absolute',
          top: 'calc(12px + env(safe-area-inset-top, 0px))',
          left: 12, right: selectedFlight ? 12 + DETAIL_PANEL_WIDTH + 8 : 12,
          zIndex: 1000, pointerEvents: 'none',
          transition: 'right 0.2s ease',
        }}>
          <TopBar
            flightCount={count}
            theme={theme}
            onToggleTheme={toggleTheme}
            onHamburger={() => setSidebarOpen(true)}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            showAirports={showAirports}
            onToggleAirports={() => setShowAirports(v => !v)}
            region={region}
            onRegionChange={setRegion}
          />
        </div>

        {/* Detail Panel — desktop */}
        {selectedFlight && (
          <div className="fq-detail-desktop" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 1000, pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'all' }}>
              <DetailPanel flight={selectedFlight} theme={theme} onClose={handleDetailClose} />
            </div>
          </div>
        )}

        {/* Mobile bottom sheet */}
        {selectedFlight && (
          <MobileBottomSheet onClose={handleDetailClose}>
            <DetailPanel flight={selectedFlight} theme={theme} onClose={handleDetailClose} />
          </MobileBottomSheet>
        )}

        {/* Letadla nad hlavou panel */}
        {showNearby && (
          <div style={{
            position: 'absolute',
            bottom: `calc(${isMock ? 128 : 96}px + env(safe-area-inset-bottom, 0px))`,
            right: 12, zIndex: 1000,
            width: 220, background: 'rgba(10,15,30,0.94)', backdropFilter: 'blur(16px)',
            border: '1px solid var(--glass-border)', borderRadius: 12, padding: '10px 12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                Letadla nad tebou
              </span>
              <button onClick={dismissNearby} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
            </div>
            {nearbyFlights.length === 0 ? (
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Žádná letadla v okruhu 30 km ✈️</div>
            ) : (
              <>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, marginBottom: 6 }}>
                  {nearbyFlights.length} letadel v okruhu 30 km
                </div>
                {nearbyFlights.slice(0, 5).map(f => (
                  <div
                    key={f.icao24}
                    onClick={() => { handleFlightSelect(f); dismissNearby() }}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '4px 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 11, color: 'var(--text-primary)' }}>{f.callsign}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{Math.round(f.altitude).toLocaleString('cs')} m</span>
                  </div>
                ))}
                {nearbyFlights.length > 5 && (
                  <div style={{ fontSize: 9, color: 'var(--text-dim)', marginTop: 4 }}>+{nearbyFlights.length - 5} dalších</div>
                )}
              </>
            )}
          </div>
        )}

        {/* GPS button */}
        <button
          onClick={handleLocateMe}
          style={{
            position: 'absolute',
            bottom: `calc(${isMock ? 88 : 52}px + env(safe-area-inset-bottom, 0px))`,
            right: 12, zIndex: 1000,
            width: 36, height: 36, borderRadius: 8,
            background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(8px)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}
          aria-label="Najít mou polohu"
          title="Najít mou polohu"
        >
          📍
        </button>

        {/* StatusBar */}
        <StatusBar flightCount={count} visibleCount={count} isMock={isMock} region={region} />
      </div>

      {/* Emergency radar banner */}
      <EmergencyBanner
        flights={flights}
        onSelect={(f) => {
          setSelectedFlight(f)
          mapLocateFnRef.current?.(f.lat, f.lng)
        }}
      />

      <style>{`
        /* ── Desktop ── */
        .fq-sidebar {
          display: flex;
          height: 100%;
          flex-shrink: 0;
        }
        .fq-sidebar-overlay { display: none; }
        .fq-detail-mobile  { display: none !important; }

        /* ── Mobile (≤ 768 px) ── */
        @media (max-width: 768px) {
          /* Sidebar jako drawer zprava */
          .fq-sidebar {
            display: flex;
            position: fixed;
            top: 0; left: 0;
            height: 100dvh;
            z-index: 2000;
            width: min(300px, 82vw) !important;
            transform: translateX(-100%);
            transition: transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .fq-sidebar.fq-sidebar-open {
            transform: translateX(0);
            box-shadow: 8px 0 32px rgba(0,0,0,0.6);
          }
          .fq-sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.55);
            z-index: 1999;
            backdrop-filter: blur(3px);
          }

          /* Desktop detail panel skrytý, zobrazuje se bottom sheet */
          .fq-detail-desktop { display: none !important; }
          .fq-detail-mobile  { display: flex !important; }

          /* TopBar hamburger viditelný */
          .fq-hamburger { display: inline-flex !important; }

          /* Filter chips + region — jen emoji/vlajka, text skrytý */
          .fq-chip-label  { display: none !important; }
          .fq-region-label { display: none !important; }
          .fq-filters {
            gap: 5px !important;
          }
        }

        @media (min-width: 769px) {
          .fq-hamburger { display: none !important; }
        }

        /* Bottom sheet animace */
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        .bottom-sheet-enter {
          animation: slideUp 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .handle-bar {
          width: 36px; height: 4px;
          background: var(--border-mid);
          border-radius: 2px;
          margin: 0 auto 14px;
        }
      `}</style>
    </div>
  )
}
