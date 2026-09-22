'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useFlights } from '@/hooks/useFlights'
import { useTheme } from '@/hooks/useTheme'
import { useFlightRoute, type FlightRoute } from '@/hooks/useFlightRoute'
import { useFaviconCount } from '@/hooks/useFaviconCount'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useNearbyFlights } from '@/hooks/useNearbyFlights'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { TopBar, type FilterType } from '@/components/UI/TopBar'
import { DETAIL_PANEL_WIDTH } from '@/lib/constants'
import { czechPlural } from '@/lib/plural'
import { StatusBar } from '@/components/UI/StatusBar'
import { LoadingScreen } from '@/components/UI/LoadingScreen'
import { ErrorBoundary } from '@/components/UI/ErrorBoundary'
import { EmergencyBanner } from '@/components/UI/EmergencyBanner'
import { MapView } from '@/components/Map/MapView'
import type { Flight } from '@/types/flight'
import { isEmergencyFlight } from '@/lib/emergency'
import { trackEvent } from '@/lib/analytics'

// Rozsáhlý detail a fotografie letadla nejsou potřeba pro první vykreslení
// mapy. Prohlížeč je stáhne až ve chvíli, kdy uživatel některý stroj otevře.
const DetailPanel = dynamic(
  () => import('@/components/DetailPanel/DetailPanel').then((module) => module.DetailPanel),
  { loading: () => <div style={{ padding: 18, color: 'var(--text-muted)', fontSize: 12 }}>Načítám detail letadla…</div> },
)

function airportCode(airport: FlightRoute['departure']): string {
  return airport ? (airport.iata || airport.icao || '???') : '???'
}

function airportPlace(airport: FlightRoute['departure']): string {
  return airport ? (airport.city || airport.name || 'Neznámé letiště') : 'Neznámé letiště'
}

function MobileBottomSheet({
  children,
  flight,
  route,
  routeLoading,
  onClose,
}: {
  children: React.ReactNode
  flight: Flight
  route: FlightRoute | null
  routeLoading: boolean
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const touchStartY = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const expand = () => {
    if (expanded) return
    setExpanded(true)
    trackEvent('Mobile Flight Detail Expanded', { hasRoute: Boolean(route?.arrival) })
  }

  const collapse = () => {
    setExpanded(false)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleExpanded = () => expanded ? collapse() : expand()

  const handleTouchEnd = (event: React.TouchEvent) => {
    const dy = event.changedTouches[0].clientY - touchStartY.current
    if (dy < -35) expand()
    if (dy > 50) {
      if (expanded) collapse()
      else onClose()
    }
  }

  const hasCompleteRoute = Boolean(route?.departure && route.arrival)
  const hasPartialRoute = Boolean(route?.departure || route?.arrival)

  return (
    <>
      {/* V náhledu zůstává mapa plně viditelná a ovladatelná. */}
      {expanded && (
        <button
          type="button"
          className="fq-detail-mobile fq-detail-backdrop"
          style={{
            position: 'absolute', inset: 0,
            zIndex: 1499,
            background: 'rgba(0,0,0,0.34)',
            border: 0,
            padding: 0,
          }}
          onClick={collapse}
          aria-label="Sbalit detail klepnutím mimo panel"
        />
      )}

      {/* Sheet */}
      <div
        className={`fq-detail-mobile fq-mobile-sheet bottom-sheet-enter${expanded ? ' fq-mobile-sheet-expanded' : ''}`}
        role="dialog"
        aria-label={`Detail letu ${flight.callsign}`}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'var(--midnight-2)',
          borderTop: '1px solid var(--glass-border)',
          borderRadius: '20px 20px 0 0',
          zIndex: 1500,
          maxHeight: expanded ? '72dvh' : '190px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -12px 36px rgba(0,0,0,0.3)',
          transition: 'max-height 0.28s ease',
        }}
      >
        {/* Handle — tažení nahoru rozbalí, dolů nejprve sbalí a pak zavře. */}
        <div
          style={{ padding: '10px 14px 5px', flexShrink: 0, cursor: 'grab', display: 'flex', alignItems: 'center', gap: 8 }}
          onTouchStart={(e) => { touchStartY.current = e.touches[0].clientY }}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{ width: 28 }} aria-hidden="true" />
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-label={expanded ? 'Sbalit detail letu' : 'Rozbalit celý detail letu'}
            style={{ appearance: 'none', border: 0, background: 'transparent', padding: 4, color: 'inherit', cursor: 'pointer', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 7 }}
          >
            <div className="handle-bar" style={{ margin: 0 }} />
            <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 0.8 }}>
              {expanded ? 'SKRÝT DETAIL' : 'VÍCE DETAILŮ'}
            </span>
          </button>
          <button
            onClick={(event) => { event.stopPropagation(); onClose() }}
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

        {!expanded ? (
          <button
            type="button"
            className="fq-route-peek"
            onClick={expand}
            aria-label={`Otevřít celý detail letu ${flight.callsign}`}
            style={{
              appearance: 'none', border: 0, background: 'transparent', color: 'inherit',
              padding: '2px 16px calc(14px + env(safe-area-inset-bottom, 0px))',
              textAlign: 'left', cursor: 'pointer', width: '100%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
              <div>
                <span className="font-display" style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: 0.8 }}>
                  {flight.callsign}
                </span>
                {flight.registration && <span style={{ marginLeft: 7, fontSize: 9, color: 'var(--text-dim)' }}>{flight.registration}</span>}
              </div>
              <span style={{ fontSize: 10, color: 'var(--gold)', fontWeight: 700 }}>Celý detail ↑</span>
            </div>

            {routeLoading ? (
              <div style={{ minHeight: 55, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 11 }}>
                <span className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
                Hledám odkud a kam letí…
              </div>
            ) : hasCompleteRoute ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 70px minmax(0,1fr)', alignItems: 'center', gap: 7 }}>
                  <div style={{ minWidth: 0 }}>
                    <div className="font-display" style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)' }}>{airportCode(route?.departure ?? null)}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{airportPlace(route?.departure ?? null)}</div>
                  </div>
                  <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--gold)' }}>
                    <span style={{ height: 1, flex: 1, background: 'var(--border-strong)' }} />
                    <span style={{ fontSize: 14 }}>✈</span>
                    <span style={{ height: 1, flex: 1, background: 'var(--gold)' }} />
                  </div>
                  <div style={{ minWidth: 0, textAlign: 'right' }}>
                    <div className="font-display" style={{ fontSize: 19, fontWeight: 800, color: 'var(--gold)' }}>{airportCode(route?.arrival ?? null)}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{airportPlace(route?.arrival ?? null)}</div>
                  </div>
                </div>
                <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center', gap: 12, fontSize: 9, color: 'var(--text-muted)' }}>
                  <span>{route?.progress ?? 0} % trasy · orientačně</span>
                  {(route?.remaining ?? 0) > 0 && <span>· {route?.remaining.toLocaleString('cs')} km zbývá</span>}
                </div>
              </div>
            ) : (
              <div style={{ minHeight: 55, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 10 }}>
                <div>
                  <div className="font-display" style={{ fontSize: 16, fontWeight: 800 }}>{hasPartialRoute ? airportCode(route?.departure ?? null) : 'Trasa'}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>{hasPartialRoute ? airportPlace(route?.departure ?? null) : 'není v dostupných datech'}</div>
                </div>
                <span style={{ color: 'var(--text-dim)' }}>→</span>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-display" style={{ fontSize: 16, fontWeight: 800, color: route?.arrival ? 'var(--gold)' : 'var(--text-muted)' }}>{hasPartialRoute ? airportCode(route?.arrival ?? null) : '???'}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>{hasPartialRoute ? airportPlace(route?.arrival ?? null) : `${Math.round(flight.altitude).toLocaleString('cs')} m · ${Math.round(flight.velocity)} km/h`}</div>
                </div>
              </div>
            )}
          </button>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default function RadarPage() {
  const { flights, loading, count, dataMeta, region, setRegion } = useFlights()
  const { theme, toggleTheme } = useTheme()
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const { route: selectedRoute, aircraft: selectedAircraft, loading: selectedRouteLoading } = useFlightRoute(
    selectedFlight?.icao24   ?? null,
    selectedFlight?.lat      ?? 0,
    selectedFlight?.lng      ?? 0,
    selectedFlight?.velocity ?? 0,
    selectedFlight?.heading  ?? 0,
    selectedFlight?.callsign ?? '',
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<FilterType>>(new Set())
  const [showAirports, setShowAirports] = useState(false)
  const [displayMode, setDisplayMode] = useState<'overview' | 'all'>('overview')
  const { nearbyFlights, showNearby, locationError, locateMe, dismiss: dismissNearby } = useNearbyFlights()
  const mapLocateFnRef = useRef<((lat: number, lng: number) => void) | null>(null)
  const autoOpenedQueryRef = useRef('')
  const trackedQueryRef = useRef('')
  const hasDataWarning = dataMeta.status !== 'live'

  const normalizedSearch = searchQuery.trim().toUpperCase()
  const searchMatches = useMemo(() => {
    if (!normalizedSearch) return []
    return flights.filter((flight) =>
      flight.callsign.trim().toUpperCase().includes(normalizedSearch)
      || flight.icao24.toUpperCase().includes(normalizedSearch)
      || (flight.registration ?? '').toUpperCase().includes(normalizedSearch)
    )
  }, [flights, normalizedSearch])

  // Emergency detection
  const emergencyFlights = flights.filter(isEmergencyFlight)
  const hasEmergency = emergencyFlights.length > 0

  // Favicon — živý počet + červená při emergency
  useFaviconCount(count, hasEmergency)

  // Hledání a sdílený detail z URL. Oba vstupy používají stejnou UX cestu,
  // takže uživatel vždy vidí, co se na mapě hledá.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const queryParam = params.get('flight') ?? params.get('search')
    if (!queryParam) return
    const clean = queryParam.replace(/[^A-Za-z0-9\- ]/g, '').slice(0, 10)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchQuery(clean)
  }, [])

  // Přesná shoda (nebo jediný výsledek) se sama otevře a MapView na ni přiletí.
  // Ref brání opakovanému otevírání detailu při každém 10s datovém snapshotu.
  useEffect(() => {
    if (!normalizedSearch || flights.length === 0 || autoOpenedQueryRef.current === normalizedSearch) return
    const exactMatch = searchMatches.find((flight) =>
      flight.callsign.trim().toUpperCase() === normalizedSearch
      || flight.icao24.toUpperCase() === normalizedSearch
      || (flight.registration ?? '').toUpperCase() === normalizedSearch
    )
    const match = exactMatch ?? (searchMatches.length === 1 ? searchMatches[0] : null)
    if (!match) return
    autoOpenedQueryRef.current = normalizedSearch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedFlight(match)
  }, [flights, normalizedSearch, searchMatches])

  useEffect(() => {
    if (!normalizedSearch || loading || trackedQueryRef.current === normalizedSearch) return
    trackedQueryRef.current = normalizedSearch
    trackEvent('Radar Search Result', {
      resultCount: searchMatches.length,
      outcome: searchMatches.length === 0 ? 'none' : searchMatches.length === 1 ? 'single' : 'multiple',
    })
  }, [loading, normalizedSearch, searchMatches.length])

  // Vybraný detail musí sledovat nové snapshoty, jinak po prvním kliknutí zamrzne.
  useEffect(() => {
    if (!selectedFlight) return
    const updated = flights.find((flight) => flight.icao24 === selectedFlight.icao24)
    if (updated && updated !== selectedFlight) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedFlight(updated)
    }
  }, [flights, selectedFlight])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    } else {
      document.documentElement.requestFullscreen().catch(() => {})
    }
  }

  useKeyboardShortcuts({
    onEscape: () => setSelectedFlight(null),
    onSlash: () => document.querySelector<HTMLInputElement>('input[type="text"]')?.focus(),
    onFullscreen: toggleFullscreen,
  })

  const handleLocateMe = () => {
    trackEvent('Nearby Flights Requested')
    locateMe(flights, (lat, lng) => {
      trackEvent('Nearby Flights Located')
      mapLocateFnRef.current?.(lat, lng)
    }, () => trackEvent('Nearby Flights Location Failed'))
  }

  const handleFlightSelect = (flight: Flight) => {
    trackEvent('Flight Detail Opened', { aircraftType: flight.aircraftType ?? 'unknown' })
    setSelectedFlight(flight)
    setSidebarOpen(false)   // na mobile zavřeme sidebar při výběru
    const url = new URL(window.location.href)
    url.searchParams.set('flight', flight.callsign.trim() || flight.icao24)
    url.searchParams.delete('search')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }
  const handleDetailClose = () => {
    setSelectedFlight(null)
    const url = new URL(window.location.href)
    url.searchParams.delete('flight')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    trackedQueryRef.current = ''
    if (query.trim().toUpperCase() !== autoOpenedQueryRef.current) {
      autoOpenedQueryRef.current = ''
    }
  }
  const clearSearch = () => {
    setSearchQuery('')
    setSelectedFlight(null)
    autoOpenedQueryRef.current = ''
    const url = new URL(window.location.href)
    url.searchParams.delete('search')
    url.searchParams.delete('flight')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }

  return (
    <>
    <h1 className="sr-only">Radar letadel: živá mapa letadel online nad Evropou</h1>
    <div style={{ display: 'flex', height: '100dvh', width: '100%', overflow: 'hidden', background: 'var(--midnight)' }}>

      {/* Sidebar — desktop vždy viditelný, mobile přes overlay */}
      <div className={`fq-sidebar${sidebarOpen ? ' fq-sidebar-open' : ''}`} style={{ width: 220 }}>
        <Sidebar
          flights={flights}
          selectedFlight={selectedFlight}
          onFlightSelect={handleFlightSelect}
          flightCount={count}
          theme={theme}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onClose={() => setSidebarOpen(false)}
          dataMeta={dataMeta}
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
              region={region}
              displayMode={displayMode}
            />
          </ErrorBoundary>
          {loading && flights.length === 0 && <LoadingScreen />}
        </div>

        {/* TopBar */}
        <div className="fq-topbar-wrap" style={{
          position: 'absolute',
          top: 'calc(12px + env(safe-area-inset-top, 0px))',
          left: 12, right: selectedFlight ? 12 + DETAIL_PANEL_WIDTH + 8 : 12,
          zIndex: 1000, pointerEvents: 'none',
          transition: 'right 0.2s ease',
        }}>
          <TopBar
            flightCount={count}
            theme={theme}
            onToggleTheme={() => {
              trackEvent('Theme Changed', { theme: theme === 'dark' ? 'light' : 'dark', source: 'radar' })
              toggleTheme()
            }}
            onHamburger={() => {
              trackEvent('Mobile Menu Opened')
              setSidebarOpen(true)
            }}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
            showAirports={showAirports}
            onToggleAirports={() => setShowAirports(v => !v)}
            region={region}
            dataStatus={dataMeta.status}
            displayMode={displayMode}
            onDisplayModeChange={setDisplayMode}
            onRegionChange={(nextRegion) => {
              trackEvent('Radar Region Changed', { region: nextRegion })
              clearSearch()
              setRegion(nextRegion)
            }}
          />
        </div>

        {/* Stav hledání musí být pochopitelný i na mobilu se zavřeným sidebarem. */}
        {normalizedSearch && !loading && (
          <div className="fq-search-status" role="status" aria-live="polite">
            <div style={{ minWidth: 0 }}>
              <div style={{ color: searchMatches.length ? 'var(--text-primary)' : 'var(--gold)', fontWeight: 700, fontSize: 12 }}>
                {dataMeta.status === 'unavailable' && flights.length === 0
                  ? 'Živá data jsou teď nedostupná'
                  : searchMatches.length
                  ? `${searchMatches.length} ${czechPlural(searchMatches.length, 'nalezený let', 'nalezené lety', 'nalezených letů')}`
                  : 'Let teď není ve vzduchu v této oblasti'}
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: 10, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Hledání „{searchQuery}“{searchMatches.length === 0 ? ' · zkus číslo letu nebo registraci' : ''}
              </div>
            </div>
            <button onClick={clearSearch} aria-label="Zrušit hledání">Zrušit</button>
          </div>
        )}

        {/* Detail Panel — desktop */}
        {selectedFlight && (
          <div className="fq-detail-desktop" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 1000, pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'all' }}>
              <DetailPanel flight={selectedFlight} theme={theme} onClose={handleDetailClose} route={selectedRoute} aircraft={selectedAircraft} routeLoading={selectedRouteLoading} />
            </div>
          </div>
        )}

        {/* Mobile bottom sheet */}
        {selectedFlight && (
          <MobileBottomSheet
            key={selectedFlight.icao24}
            flight={selectedFlight}
            route={selectedRoute}
            routeLoading={selectedRouteLoading}
            onClose={handleDetailClose}
          >
            <DetailPanel flight={selectedFlight} theme={theme} onClose={handleDetailClose} route={selectedRoute} aircraft={selectedAircraft} routeLoading={selectedRouteLoading} />
          </MobileBottomSheet>
        )}

        {/* Letadla nad hlavou panel */}
        {showNearby && (
          <div style={{
            position: 'absolute',
            bottom: `calc(${hasDataWarning ? 128 : 96}px + env(safe-area-inset-bottom, 0px))`,
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
            {locationError ? (
              <div style={{ fontSize: 11, color: 'var(--gold)', lineHeight: 1.45 }}>{locationError}</div>
            ) : nearbyFlights.length === 0 ? (
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Žádná letadla v okruhu 30 km ✈️</div>
            ) : (
              <>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700, marginBottom: 6 }}>
                  {nearbyFlights.length} letadel v okruhu 30 km
                </div>
                {nearbyFlights.slice(0, 5).map(f => (
                  <button
                    type="button"
                    key={f.icao24}
                    onClick={() => { handleFlightSelect(f); dismissNearby() }}
                    style={{
                      appearance: 'none', width: '100%', background: 'transparent', border: 0,
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '7px 0', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer',
                      color: 'inherit', textAlign: 'left',
                    }}
                    aria-label={`Otevřít detail letu ${f.callsign}`}
                  >
                    <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: 11, color: 'var(--text-primary)' }}>{f.callsign}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{Math.round(f.altitude).toLocaleString('cs')} m</span>
                  </button>
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
          className="fq-nearby-btn"
          style={{
            position: 'absolute',
            bottom: `calc(${hasDataWarning ? 88 : 52}px + env(safe-area-inset-bottom, 0px))`,
            right: 12, zIndex: 1000,
            minWidth: 36, height: 40, borderRadius: 10,
            background: 'rgba(245,184,61,0.94)', border: '1px solid rgba(245,184,61,0.75)',
            backdropFilter: 'blur(8px)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 7, padding: '0 12px', color: '#0F172A',
            font: "800 11px 'Archivo', sans-serif",
            boxShadow: '0 6px 20px rgba(0,0,0,0.24)',
          }}
          aria-label="Zjistit, co letí nade mnou"
          title="Zjistit, co letí nade mnou"
        >
          <span aria-hidden="true">📍</span>
          <span>Co letí nade mnou?</span>
        </button>

        {/* Fullscreen button — nad GPS */}
        <button
          onClick={toggleFullscreen}
          className="fq-fullscreen-btn"
          style={{
            position: 'absolute',
            bottom: `calc(${hasDataWarning ? 132 : 96}px + env(safe-area-inset-bottom, 0px))`,
            right: 12, zIndex: 1000,
            width: 36, height: 36, borderRadius: 8,
            background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(8px)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15,
          }}
          aria-label="Celá obrazovka (F)"
          title="Celá obrazovka (F)"
        >
          ⛶
        </button>

        <details className="fq-map-legend">
          <summary aria-label="Vysvětlivky mapy">Barvy letadel</summary>
          <div>
            <span><i style={{ background: 'var(--gold)' }} /> Linková</span>
            <span><i style={{ background: 'var(--green-live)' }} /> Soukromá / vrtulová</span>
            <span><i style={{ background: 'var(--accent-blue)' }} /> Cargo / vrtulník</span>
            <span><i style={{ background: '#FF5C63' }} /> Vojenská / nouze</span>
          </div>
        </details>

        {/* StatusBar */}
        <StatusBar flightCount={count} dataMeta={dataMeta} region={region} />
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
          .fq-topbar-wrap { right: 12px !important; }
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
          .fq-sidebar:not(.fq-sidebar-open) {
            content-visibility: hidden;
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
          .fq-search-status {
            top: calc(100px + env(safe-area-inset-top, 0px)) !important;
            left: 12px;
            right: 12px;
            width: auto !important;
            max-width: none !important;
          }
          .fq-map-legend { left: 8px !important; bottom: calc(42px + env(safe-area-inset-bottom, 0px)) !important; }
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
        .fq-search-status {
          position: absolute;
          top: calc(60px + env(safe-area-inset-top, 0px));
          left: 12px;
          z-index: 1001;
          width: min(360px, calc(100% - 24px));
          padding: 10px 10px 10px 12px;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .fq-search-status button {
          min-height: 36px;
          padding: 0 11px;
          border-radius: 8px;
          border: 1px solid rgba(245,184,61,0.35);
          background: rgba(245,184,61,0.12);
          color: var(--gold);
          font: 600 10px 'IBM Plex Sans', sans-serif;
          cursor: pointer;
          flex-shrink: 0;
        }
        .fq-map-legend {
          position: absolute;
          left: 12px;
          bottom: calc(42px + env(safe-area-inset-bottom, 0px));
          z-index: 1000;
          color: var(--text-muted);
          font: 600 9px 'IBM Plex Sans', sans-serif;
        }
        .fq-map-legend summary {
          list-style: none;
          cursor: pointer;
          padding: 7px 9px;
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
        }
        .fq-map-legend summary::-webkit-details-marker { display: none; }
        .fq-map-legend > div {
          position: absolute;
          left: 0;
          bottom: 34px;
          width: 166px;
          display: grid;
          gap: 7px;
          padding: 10px;
          border: 1px solid var(--glass-border);
          border-radius: 9px;
          background: rgba(10,15,30,0.94);
          backdrop-filter: blur(16px);
        }
        .fq-map-legend span { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
        .fq-map-legend i { width: 8px; height: 8px; border-radius: 50%; box-shadow: 0 0 0 2px rgba(15,23,42,0.65); }
      `}</style>
    </div>

    </>
  )
}
