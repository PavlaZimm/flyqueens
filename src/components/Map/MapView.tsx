'use client'

import { useEffect, useRef } from 'react'
import type { Map as LeafletMap, TileLayer, Marker, Polyline, LayerGroup } from 'leaflet'
import type { Flight, AircraftType } from '@/types/flight'
import { getAircraftColor } from './AircraftIcon'
import { fetchAirports, airportDisplayName } from '@/lib/airportData'
import type { Airport } from '@/lib/airportData'

interface MapRefs {
  map: LeafletMap
  darkTiles: TileLayer
  lightTiles: TileLayer
  airportLayer: LayerGroup
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  L: any  // Leaflet dynamically imported — no static type available at module level
}

interface MapViewProps {
  flights: Flight[]
  selectedFlight: Flight | null
  onFlightSelect: (flight: Flight) => void
  theme: 'dark' | 'light'
  searchQuery?: string
  activeFilters: Set<string>
  showAirports: boolean
  onMapReady?: (flyTo: (lat: number, lng: number) => void) => void
}

// Historie pozic — max 12 bodů na letadlo
const flightHistory = new Map<string, Array<{ lat: number; lng: number }>>()
const MAX_HISTORY = 12

function matchesFilter(flight: Flight, filters: Set<string>): boolean {
  if (filters.size === 0) return true
  const t = flight.aircraftType ?? 'narrow-body'
  if (filters.has('passenger') && ['narrow-body', 'wide-body', 'turboprop'].includes(t)) return true
  if (filters.has('cargo')     && t === 'cargo') return true
  if (filters.has('private')   && ['private-jet', 'ga'].includes(t)) return true
  if (filters.has('military')  && t === 'military') return true
  if (filters.has('helicopter')&& t === 'helicopter') return true
  return false
}

export function MapView({ flights, selectedFlight, onFlightSelect, theme, searchQuery, activeFilters, showAirports, onMapReady }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<MapRefs | null>(null)
  const markersRef   = useRef<Map<string, Marker>>(new Map())
  const trailsRef    = useRef<Map<string, Polyline>>(new Map())

  // Init mapy
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then((L) => {
      if (!containerRef.current || mapRef.current) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

      const map = L.map(containerRef.current, {
        center: [50.0, 15.5], zoom: 6,
        zoomControl: false, attributionControl: true,
      })

      const darkTiles = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>', subdomains: 'abcd', maxZoom: 19 }
      )
      const lightTiles = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>', subdomains: 'abcd', maxZoom: 19 }
      )

      if (theme === 'light') { lightTiles.addTo(map) } else { darkTiles.addTo(map) }
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      const airportLayer = L.layerGroup()
      mapRef.current = { map, darkTiles, lightTiles, airportLayer, L }

      // Načti letiště a přidej markery do airportLayer
      fetchAirports().then((airports: Airport[]) => {
        airports.forEach((a) => {
          const isLarge = a.type === 'large_airport'
          const isMedium = a.type === 'medium_airport'
          const size = isLarge ? 14 : isMedium ? 10 : 7
          const icon = L.divIcon({
            html: createAirportSVG(size, isLarge),
            className: '',
            iconSize: [size * 2, size * 2],
            iconAnchor: [size, size],
          })
          const marker = L.marker([a.lat, a.lng], { icon, interactive: true })
          const label = airportDisplayName(a)
          marker.bindTooltip(label, {
            permanent: false,
            direction: 'top',
            offset: [0, -size - 2],
            className: 'fq-airport-tooltip',
          })
          // Klik — otevře letiště na FlightAware (nebo jen zobrazí popup)
          marker.bindPopup(
            `<div class="fq-airport-popup">
              <div class="fq-ap-code">${a.iata || a.icao}</div>
              <div class="fq-ap-name">${a.name}</div>
              <div class="fq-ap-meta">${a.city} · ${a.country} · ${a.elev} ft</div>
            </div>`,
            { className: 'fq-airport-popup-wrap', maxWidth: 220 }
          )
          airportLayer.addLayer(marker)
        })
      })

      if (onMapReady) {
        onMapReady((lat, lng) => {
          map.flyTo([lat, lng], 10, { animate: true, duration: 1.2 })
        })
      }
    })

    // Capture refs pro cleanup (eslint react-hooks/exhaustive-deps)
    const markers = markersRef.current
    const trails  = trailsRef.current

    return () => {
      if (mapRef.current) {
        mapRef.current.map.remove()
        mapRef.current = null
        markers.clear()
        trails.clear()
        flightHistory.clear()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle letišť
  useEffect(() => {
    if (!mapRef.current) return
    const { map, airportLayer } = mapRef.current
    if (showAirports) {
      if (!map.hasLayer(airportLayer)) airportLayer.addTo(map)
    } else {
      if (map.hasLayer(airportLayer)) map.removeLayer(airportLayer)
    }
  }, [showAirports])

  // Přepínání tématu — opraveno
  useEffect(() => {
    if (!mapRef.current) return
    const { map, darkTiles, lightTiles } = mapRef.current
    if (theme === 'light') {
      if (map.hasLayer(darkTiles))  map.removeLayer(darkTiles)
      if (!map.hasLayer(lightTiles)) lightTiles.addTo(map)
    } else {
      if (map.hasLayer(lightTiles)) map.removeLayer(lightTiles)
      if (!map.hasLayer(darkTiles))  darkTiles.addTo(map)
    }
  }, [theme])

  // FlyTo při výběru
  useEffect(() => {
    if (!mapRef.current || !selectedFlight) return
    const { map } = mapRef.current
    map.flyTo([selectedFlight.lat, selectedFlight.lng], Math.max(map.getZoom(), 7), {
      animate: true, duration: 0.8,
    })
  }, [selectedFlight])

  // Markery + trail
  useEffect(() => {
    if (!mapRef.current) return
    const { map, L } = mapRef.current
    const q = (searchQuery ?? '').trim().toUpperCase()

    flights.forEach((flight) => {
      const passesSearch = !q || flight.callsign.includes(q) || flight.icao24.toUpperCase().includes(q)
      const passesFilter = matchesFilter(flight, activeFilters)
      const isVisible    = passesSearch && passesFilter
      const isSelected   = selectedFlight?.icao24 === flight.icao24
      const color        = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)
      const size         = isSelected ? 34 : 22

      // --- Historie trasy ---
      const hist = flightHistory.get(flight.icao24) ?? []
      const last = hist[hist.length - 1]
      if (!last || last.lat !== flight.lat || last.lng !== flight.lng) {
        hist.push({ lat: flight.lat, lng: flight.lng })
        if (hist.length > MAX_HISTORY) hist.shift()
        flightHistory.set(flight.icao24, hist)
      }

      // Trail polyline
      const existingTrail = trailsRef.current.get(flight.icao24)
      if (existingTrail) map.removeLayer(existingTrail)

      if (hist.length >= 2 && isVisible) {
        const trailColor = isSelected ? color : `${color}55`
        const trail = L.polyline(
          hist.map(p => [p.lat, p.lng]),
          {
            color: trailColor,
            weight: isSelected ? 2 : 1,
            opacity: isSelected ? 0.7 : 0.35,
            dashArray: '5 5',
            smoothFactor: 2,
          }
        )
        trail.addTo(map)
        trailsRef.current.set(flight.icao24, trail)
      }

      // --- Marker — min 44×44px hit area pro touch ---
      const HIT = Math.max(44, size)
      const icon = L.divIcon({
        html: `<div style="width:${HIT}px;height:${HIT}px;display:flex;align-items:center;justify-content:center;">${createAircraftSVG(color, size, flight.heading, isSelected)}</div>`,
        className: '',
        iconSize: [HIT, HIT],
        iconAnchor: [HIT / 2, HIT / 2],
      })

      const existing = markersRef.current.get(flight.icao24)
      if (existing) {
        const cur = existing.getLatLng()
        if (cur.lat !== flight.lat || cur.lng !== flight.lng) {
          animateMarker(existing, cur, { lat: flight.lat, lng: flight.lng })
        }
        existing.setIcon(icon)
        if (isVisible) {
          if (!map.hasLayer(existing)) existing.addTo(map)
        } else {
          if (map.hasLayer(existing)) map.removeLayer(existing)
        }
      } else {
        const marker = L.marker([flight.lat, flight.lng], { icon })
        marker.on('click', () => onFlightSelect(flight))
        marker.bindTooltip(flight.callsign, {
          permanent: false, direction: 'top',
          offset: [0, -size / 2 - 4], className: 'fq-tooltip',
        })
        if (isVisible) marker.addTo(map)
        markersRef.current.set(flight.icao24, marker)
      }
    })

    // Smaž odstraněná letadla
    const ids = new Set(flights.map(f => f.icao24))
    markersRef.current.forEach((m, id) => {
      if (!ids.has(id)) {
        map.removeLayer(m)
        markersRef.current.delete(id)
        flightHistory.delete(id)
        const t = trailsRef.current.get(id)
        if (t) { map.removeLayer(t); trailsRef.current.delete(id) }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flights, selectedFlight, theme, searchQuery, activeFilters])

  return (
    <>
      <style>{`
        .fq-tooltip {
          background: rgba(15,23,42,0.92) !important;
          border: 1px solid rgba(253,224,71,0.3) !important;
          border-radius: 6px !important;
          color: #FDE047 !important;
          font-family: 'Syne', sans-serif !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 1px !important;
          padding: 3px 8px !important;
          box-shadow: none !important;
        }
        .fq-tooltip::before { display: none !important; }
        .leaflet-control-zoom {
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 8px !important;
          overflow: hidden;
          margin-bottom: 44px !important;
          margin-right: 12px !important;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          background: rgba(15,23,42,0.88) !important;
          color: rgba(255,255,255,0.6) !important;
          border: none !important;
          width: 30px !important; height: 30px !important; line-height: 30px !important;
        }
        .leaflet-control-zoom-in:hover,
        .leaflet-control-zoom-out:hover { background: rgba(30,41,59,0.95) !important; color: #FDE047 !important; }
        .leaflet-control-attribution { font-size: 9px !important; background: rgba(10,15,30,0.55) !important; color: rgba(255,255,255,0.2) !important; }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.25) !important; }
        .fq-airport-tooltip {
          background: rgba(15,23,42,0.92) !important;
          border: 1px solid rgba(56,189,248,0.35) !important;
          border-radius: 6px !important;
          color: #38BDF8 !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-size: 10px !important;
          font-weight: 600 !important;
          letter-spacing: 0.5px !important;
          padding: 3px 8px !important;
          box-shadow: none !important;
        }
        .fq-airport-tooltip::before { display: none !important; }
        .fq-airport-popup-wrap .leaflet-popup-content-wrapper {
          background: rgba(15,23,42,0.96) !important;
          border: 1px solid rgba(56,189,248,0.25) !important;
          border-radius: 10px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
          padding: 0 !important;
        }
        .fq-airport-popup-wrap .leaflet-popup-tip { background: rgba(15,23,42,0.96) !important; }
        .fq-airport-popup-wrap .leaflet-popup-content { margin: 0 !important; }
        .fq-airport-popup { padding: 12px 14px; }
        .fq-ap-code { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #38BDF8; letter-spacing: 2px; }
        .fq-ap-name { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 2px; }
        .fq-ap-meta { font-size: 9px; color: rgba(255,255,255,0.35); margin-top: 4px; letter-spacing: 0.5px; }
      `}</style>
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
    </>
  )
}

function animateMarker(marker: Marker, from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const duration = 900
  const start = performance.now()
  function step(now: number) {
    const t    = Math.min((now - start) / duration, 1)
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    marker.setLatLng([from.lat + (to.lat - from.lat) * ease, from.lng + (to.lng - from.lng) * ease])
    if (t < 1) requestAnimationFrame(step)
    else marker.setLatLng([to.lat, to.lng])
  }
  requestAnimationFrame(step)
}

function createAircraftSVG(color: string, size: number, heading: number, selected: boolean): string {
  const pulse = selected ? `
    <circle cx="40" cy="30" r="24" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5" style="animation:pulse-ring 2s ease-out infinite"/>
    <circle cx="40" cy="30" r="34" fill="none" stroke="${color}" stroke-width="1"   opacity="0.25" style="animation:pulse-ring 2s ease-out infinite;animation-delay:0.5s"/>
  ` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width="${size}" height="${size}"
    style="transform:rotate(${heading}deg);transform-origin:center;filter:drop-shadow(0 1px 4px rgba(0,0,0,0.7));overflow:visible;display:block">
    ${pulse}
    <g fill="${color}">
      <path d="M40 8 Q43 8 45 12 L46 38 Q46 44 40 46 Q34 44 34 38 L35 12 Q37 8 40 8Z"/>
      <path d="M35 22 Q22 26 14 30 Q16 32 19 31 L34 26Z"/>
      <path d="M45 22 Q58 26 66 30 Q64 32 61 31 L46 26Z"/>
      <path d="M20 29 Q18 30 18 32 Q20 33 24 32 L24 29Z"/>
      <path d="M60 29 Q62 30 62 32 Q60 33 56 32 L56 29Z"/>
      <path d="M36 40 Q30 42 26 44 Q27 45 30 44 L36 42Z"/>
      <path d="M44 40 Q50 42 54 44 Q53 45 50 44 L44 42Z"/>
    </g>
  </svg>`
}

function createAirportSVG(size: number, isLarge: boolean): string {
  const r = size
  const stroke = isLarge ? '#38BDF8' : '#38BDF888'
  const fill = isLarge ? 'rgba(56,189,248,0.15)' : 'rgba(56,189,248,0.08)'
  const s = r * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
    <circle cx="${r}" cy="${r}" r="${r - 1}" fill="${fill}" stroke="${stroke}" stroke-width="${isLarge ? 1.5 : 1}"/>
    <line x1="${r}" y1="2" x2="${r}" y2="${s - 2}" stroke="${stroke}" stroke-width="${isLarge ? 1.5 : 1}"/>
    <line x1="2" y1="${r}" x2="${s - 2}" y2="${r}" stroke="${stroke}" stroke-width="${isLarge ? 1 : 0.8}"/>
  </svg>`
}

// Export typu pro TypeScript
export type { AircraftType }
