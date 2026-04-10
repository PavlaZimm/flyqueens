'use client'

import { useState } from 'react'
import { useFlights } from '@/hooks/useFlights'
import { useTheme } from '@/hooks/useTheme'
import { MapView } from '@/components/Map/MapView'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { DetailPanel } from '@/components/DetailPanel/DetailPanel'
import { TopBar } from '@/components/UI/TopBar'
import { StatusBar } from '@/components/UI/StatusBar'
import type { Flight } from '@/types/flight'

export default function Home() {
  const { flights, loading, count } = useFlights()
  const { theme, toggleTheme } = useTheme()
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)   // mobile hamburger

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
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 12, background: 'var(--midnight-3)',
          }}>
            <div style={{ fontSize: 40 }}>✈️</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 16, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 2 }}>
              NAČÍTÁM LETY...
            </div>
          </div>
        ) : (
          <div style={{ position: 'absolute', inset: 0 }}>
            <MapView
              flights={flights}
              selectedFlight={selectedFlight}
              onFlightSelect={handleFlightSelect}
              theme={theme}
              searchQuery={searchQuery}
            />
          </div>
        )}

        {/* TopBar */}
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 1000, pointerEvents: 'none' }}>
          <TopBar
            flightCount={count}
            theme={theme}
            onToggleTheme={toggleTheme}
            onHamburger={() => setSidebarOpen(true)}
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
          <div className="fq-detail-mobile bottom-sheet-enter" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'var(--midnight-2)',
            borderTop: '1px solid var(--glass-border)',
            borderRadius: '24px 24px 0 0',
            padding: '16px',
            zIndex: 1500,
            maxHeight: '72vh',
            overflow: 'auto',
          }}>
            <div className="handle-bar" />
            <DetailPanel flight={selectedFlight} theme={theme} onClose={handleDetailClose} />
          </div>
        )}

        {/* StatusBar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
          <StatusBar flightCount={count} visibleCount={count} />
        </div>
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
