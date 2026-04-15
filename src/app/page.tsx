'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useFlights } from '@/hooks/useFlights'
import { useTheme } from '@/hooks/useTheme'
import { MapView } from '@/components/Map/MapView'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { DetailPanel } from '@/components/DetailPanel/DetailPanel'
import { TopBar, type FilterType } from '@/components/UI/TopBar'
import { StatusBar } from '@/components/UI/StatusBar'
import { LoadingScreen } from '@/components/UI/LoadingScreen'
import { ErrorBoundary } from '@/components/UI/ErrorBoundary'
import type { Flight } from '@/types/flight'

function MobileBottomSheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const touchStartY = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={sheetRef}
      className="fq-detail-mobile bottom-sheet-enter"
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'var(--midnight-2)',
        borderTop: '1px solid var(--glass-border)',
        borderRadius: '24px 24px 0 0',
        padding: '16px',
        zIndex: 1500,
        maxHeight: '72vh',
        overflow: 'auto',
      }}
      onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY }}
      onTouchEnd={(e) => {
        const dy = e.changedTouches[0].clientY - touchStartY.current
        if (dy > 60) onClose()
      }}
    >
      <div className="handle-bar" />
      {children}
    </div>
  )
}

export default function Home() {
  const { flights, loading, count, isMock } = useFlights()
  const { theme, toggleTheme } = useTheme()
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set(['passenger']))
  const [showAirports, setShowAirports] = useState(false)
  const [nearbyFlights, setNearbyFlights] = useState<Flight[]>([])
  const [showNearby, setShowNearby] = useState(false)
  const mapLocateFnRef = useRef<((lat: number, lng: number) => void) | null>(null)

  // Auto-select flight from URL param ?flight=CSA123
  useEffect(() => {
    if (flights.length === 0) return
    const params = new URLSearchParams(window.location.search)
    const flightParam = params.get('flight')
    if (!flightParam) return
    const match = flights.find(f => f.callsign.trim().toUpperCase() === flightParam.toUpperCase())
    if (match) setSelectedFlight(match)
  }, [flights])

  // Keyboard shortcuts
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedFlight(null)
      if (e.key === '/' && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleLocateMe = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      mapLocateFnRef.current?.(latitude, longitude)

      // Letadla nad hlavou — v okruhu 30 km
      const R = 6371
      const nearby = flights.filter(f => {
        const dLat = (f.lat - latitude) * Math.PI / 180
        const dLng = (f.lng - longitude) * Math.PI / 180
        const a = Math.sin(dLat/2)**2 + Math.cos(latitude * Math.PI/180) * Math.cos(f.lat * Math.PI/180) * Math.sin(dLng/2)**2
        const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return dist <= 30
      })
      setNearbyFlights(nearby)
      setShowNearby(true)
    })
  }

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight)
    setSidebarOpen(false)   // na mobile zavřeme sidebar při výběru
  }
  const handleDetailClose = () => setSelectedFlight(null)

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--midnight)' }}>

      {/* Sidebar — desktop vždy viditelný, mobile přes overlay */}
      <div className={`fq-sidebar${sidebarOpen ? ' fq-sidebar-open' : ''}`}>
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
            />
            </ErrorBoundary>
          </div>
        )}

        {/* TopBar */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 1000, pointerEvents: 'none' }}>
          <TopBar
            flightCount={count}
            theme={theme}
            onToggleTheme={toggleTheme}
            onHamburger={() => setSidebarOpen(true)}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            showAirports={showAirports}
            onToggleAirports={() => setShowAirports(v => !v)}
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
            position: 'absolute', bottom: isMock ? 128 : 96, right: 12, zIndex: 1000,
            width: 220, background: 'rgba(10,15,30,0.94)', backdropFilter: 'blur(16px)',
            border: '1px solid var(--glass-border)', borderRadius: 12, padding: '10px 12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                Letadla nad tebou
              </span>
              <button onClick={() => setShowNearby(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12, padding: 0, lineHeight: 1 }}>✕</button>
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
                    onClick={() => { handleFlightSelect(f); setShowNearby(false) }}
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
            position: 'absolute', bottom: isMock ? 88 : 52, right: 12, zIndex: 1000,
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
        <StatusBar flightCount={count} visibleCount={count} isMock={isMock} />
      </div>

      <style>{`
        /* Desktop */
        .fq-sidebar {
          display: flex;
          height: 100%;
          flex-shrink: 0;
        }
        .fq-sidebar-overlay { display: none; }

        /* Mobile */
        @media (max-width: 768px) {
          .fq-sidebar {
            display: flex;
            position: fixed;
            top: 0; left: 0; bottom: 0;
            z-index: 2000;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .fq-sidebar.fq-sidebar-open {
            transform: translateX(0);
          }
          .fq-sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1999;
            backdrop-filter: blur(2px);
          }
          .fq-detail-desktop { display: none !important; }
        }
        @media (min-width: 769px) {
          .fq-detail-mobile { display: none !important; }
        }
      `}</style>
    </div>
  )
}
