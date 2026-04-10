'use client'

import { useEffect, useRef } from 'react'
import type { Flight } from '@/types/flight'
import { getAircraftColor } from './AircraftIcon'

interface MapViewProps {
  flights: Flight[]
  selectedFlight: Flight | null
  onFlightSelect: (flight: Flight) => void
  theme: 'dark' | 'light'
  searchQuery?: string
}

// Drží předchozí pozice letadel pro interpolaci
const prevPositions = new Map<string, { lat: number; lng: number }>()

export function MapView({ flights, selectedFlight, onFlightSelect, theme, searchQuery }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pathsRef = useRef<Map<string, any>>(new Map())

  // Init mapy
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    import('leaflet').then((L) => {
      if (!containerRef.current || mapRef.current) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({ iconRetinaUrl: '', iconUrl: '', shadowUrl: '' })

      const map = L.map(containerRef.current, {
        center: [50.0, 15.5],
        zoom: 6,
        zoomControl: false,
        attributionControl: true,
      })

      const darkTiles = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        { attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>', subdomains: 'abcd', maxZoom: 19 }
      )
      const lightTiles = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/">CARTO</a>', subdomains: 'abcd', maxZoom: 19 }
      )

      if (theme === 'light') lightTiles.addTo(map)
      else darkTiles.addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      mapRef.current = { map, darkTiles, lightTiles, L }
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.map.remove()
        mapRef.current = null
        markersRef.current.clear()
        pathsRef.current.clear()
        prevPositions.clear()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Přepínání tématu
  useEffect(() => {
    if (!mapRef.current) return
    const { map, darkTiles, lightTiles } = mapRef.current
    if (theme === 'light') { map.removeLayer(darkTiles); lightTiles.addTo(map) }
    else { map.removeLayer(lightTiles); darkTiles.addTo(map) }
  }, [theme])

  // FlyTo při výběru letadla
  useEffect(() => {
    if (!mapRef.current || !selectedFlight) return
    const { map } = mapRef.current
    map.flyTo([selectedFlight.lat, selectedFlight.lng], Math.max(map.getZoom(), 7), {
      animate: true,
      duration: 0.8,
    })
  }, [selectedFlight])

  // Aktualizace markerů + flight paths
  useEffect(() => {
    if (!mapRef.current) return
    const { map, L } = mapRef.current

    const q = (searchQuery ?? '').trim().toUpperCase()

    flights.forEach((flight) => {
      const isVisible = !q || flight.callsign.includes(q) || flight.icao24.toUpperCase().includes(q)
      const isSelected = selectedFlight?.icao24 === flight.icao24
      const color = getAircraftColor(flight.aircraftType ?? 'narrow-body', theme)
      const size = isSelected ? 34 : 22

      // Předchozí pozice pro flight path
      const prev = prevPositions.get(flight.icao24)

      // --- Flight path (přerušovaná čára) ---
      if (prev && isSelected) {
        const existingPath = pathsRef.current.get(flight.icao24)
        if (existingPath) map.removeLayer(existingPath)

        const path = L.polyline(
          [[prev.lat, prev.lng], [flight.lat, flight.lng]],
          {
            color: color,
            weight: 1.5,
            opacity: 0.4,
            dashArray: '6 6',
          }
        )
        if (isVisible) path.addTo(map)
        pathsRef.current.set(flight.icao24, path)
      } else if (!isSelected) {
        const existingPath = pathsRef.current.get(flight.icao24)
        if (existingPath) { map.removeLayer(existingPath); pathsRef.current.delete(flight.icao24) }
      }

      // Ulož aktuální pozici
      prevPositions.set(flight.icao24, { lat: flight.lat, lng: flight.lng })

      // --- Marker ---
      const svgHtml = createAircraftSVG(color, size, flight.heading, isSelected)
      const icon = L.divIcon({
        html: svgHtml,
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      })

      const existing = markersRef.current.get(flight.icao24)

      if (existing) {
        // Plynulý přesun markeru (animace pohybu)
        const currentLatLng = existing.getLatLng()
        if (currentLatLng.lat !== flight.lat || currentLatLng.lng !== flight.lng) {
          animateMarker(existing, currentLatLng, { lat: flight.lat, lng: flight.lng })
        }
        existing.setIcon(icon)
        if (isVisible) { if (!map.hasLayer(existing)) existing.addTo(map) }
        else { if (map.hasLayer(existing)) map.removeLayer(existing) }
      } else {
        const marker = L.marker([flight.lat, flight.lng], { icon })
        marker.on('click', () => onFlightSelect(flight))
        marker.bindTooltip(flight.callsign, {
          permanent: false,
          direction: 'top',
          offset: [0, -size / 2 - 4],
          className: 'fq-tooltip',
        })
        if (isVisible) marker.addTo(map)
        markersRef.current.set(flight.icao24, marker)
      }
    })

    // Smaž markery letadel co zmizela
    const currentIds = new Set(flights.map((f) => f.icao24))
    markersRef.current.forEach((marker, id) => {
      if (!currentIds.has(id)) {
        map.removeLayer(marker)
        markersRef.current.delete(id)
        prevPositions.delete(id)
        const path = pathsRef.current.get(id)
        if (path) { map.removeLayer(path); pathsRef.current.delete(id) }
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flights, selectedFlight, theme, searchQuery])

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
          margin-bottom: 40px !important;
          margin-right: 12px !important;
        }
        .leaflet-control-zoom-in,
        .leaflet-control-zoom-out {
          background: rgba(15,23,42,0.88) !important;
          color: rgba(255,255,255,0.6) !important;
          border: none !important;
          width: 30px !important;
          height: 30px !important;
          line-height: 30px !important;
          font-size: 16px !important;
        }
        .leaflet-control-zoom-in:hover,
        .leaflet-control-zoom-out:hover {
          background: rgba(30,41,59,0.95) !important;
          color: #FDE047 !important;
        }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(10,15,30,0.6) !important;
          color: rgba(255,255,255,0.25) !important;
        }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.3) !important; }
      `}</style>
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
    </>
  )
}

// Plynulá animace pohybu markeru (60 fps, 800ms)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animateMarker(marker: any, from: { lat: number; lng: number }, to: { lat: number; lng: number }) {
  const duration = 800
  const start = performance.now()

  function step(now: number) {
    const t = Math.min((now - start) / duration, 1)
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easeInOut
    marker.setLatLng([
      from.lat + (to.lat - from.lat) * ease,
      from.lng + (to.lng - from.lng) * ease,
    ])
    if (t < 1) requestAnimationFrame(step)
    else marker.setLatLng([to.lat, to.lng])
  }

  requestAnimationFrame(step)
}

function createAircraftSVG(color: string, size: number, heading: number, selected: boolean): string {
  const pulse = selected
    ? `<circle cx="40" cy="30" r="24" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.5" style="animation:pulse-ring 2s ease-out infinite"/>
       <circle cx="40" cy="30" r="34" fill="none" stroke="${color}" stroke-width="1" opacity="0.25" style="animation:pulse-ring 2s ease-out infinite;animation-delay:0.5s"/>`
    : ''

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
