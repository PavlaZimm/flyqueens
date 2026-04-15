'use client'

import { useEffect, useRef } from 'react'
import type { Map as LeafletMap, TileLayer, Marker, Polyline, LayerGroup } from 'leaflet'
import type { Flight, AircraftType } from '@/types/flight'
import { getAircraftColor } from './AircraftIcon'
import { airports, airportDisplayName } from '@/lib/airportData'
import type { Airport } from '@/lib/airportData'
import { getAtcFeeds, getLiveAtcUrl } from '@/lib/liveatc'
import type { FlightRoute } from '@/hooks/useFlightRoute'

// Globální audio instance — jen jeden stream hraje naráz
let globalAudio: HTMLAudioElement | null = null
function playAtcStream(url: string, btnId: string) {
  // Zastav předchozí stream
  if (globalAudio) {
    globalAudio.pause()
    globalAudio.src = ''
    // Reset všech ATC tlačítek
    document.querySelectorAll('.fq-atc-btn').forEach(b => {
      b.textContent = '▶ ' + b.getAttribute('data-label')
      b.classList.remove('playing')
    })
    globalAudio = null
  }
  const btn = document.getElementById(btnId)
  if (!btn) return
  // Pokud jsme klikli na stejné tlačítko → stop (toggle)
  if (btn.classList.contains('was-playing')) {
    btn.classList.remove('was-playing')
    return
  }
  const audio = new Audio(url)
  audio.play().catch(() => {
    if (btn) {
      btn.textContent = '⚠ Stream offline'
      btn.classList.remove('playing')
      btn.classList.add('offline')
    }
    globalAudio = null
  })
  globalAudio = audio
  btn.textContent = '⏹ Zastavit'
  btn.classList.add('playing')
  audio.onended = () => {
    btn.textContent = '▶ ' + btn.getAttribute('data-label')
    btn.classList.remove('playing')
    globalAudio = null
  }
  // Odhalit tlačítko pro toggle
  setTimeout(() => btn.classList.add('was-playing'), 100)
}

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
  selectedRoute?: FlightRoute | null   // trasa pro kreslení oblouku
}

// Historie pozic — max 12 bodů na letadlo
const flightHistory = new Map<string, Array<{ lat: number; lng: number }>>()
const MAX_HISTORY = 12

// Generuje body velkého oblouku (great circle arc) mezi dvěma body
function greatCirclePoints(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  steps = 80,
): [number, number][] {
  const toRad = (d: number) => d * Math.PI / 180
  const toDeg = (r: number) => r * 180 / Math.PI
  const φ1 = toRad(lat1), λ1 = toRad(lng1)
  const φ2 = toRad(lat2), λ2 = toRad(lng2)
  const points: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const f  = i / steps
    const A  = Math.sin((1 - f) * Math.acos(Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1))) /
               Math.sin(Math.acos(Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1))) || 0
    const B  = Math.sin(f * Math.acos(Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1))) /
               Math.sin(Math.acos(Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1))) || 0
    const x  = A*Math.cos(φ1)*Math.cos(λ1) + B*Math.cos(φ2)*Math.cos(λ2)
    const y  = A*Math.cos(φ1)*Math.sin(λ1) + B*Math.cos(φ2)*Math.sin(λ2)
    const z  = A*Math.sin(φ1)              + B*Math.sin(φ2)
    points.push([toDeg(Math.atan2(z, Math.sqrt(x*x + y*y))), toDeg(Math.atan2(y, x))])
  }
  return points
}

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

export function MapView({ flights, selectedFlight, onFlightSelect, theme, searchQuery, activeFilters, showAirports, onMapReady, selectedRoute }: MapViewProps) {
  const containerRef    = useRef<HTMLDivElement>(null)
  const mapRef          = useRef<MapRefs | null>(null)
  const markersRef      = useRef<Map<string, Marker>>(new Map())
  const trailsRef       = useRef<Map<string, Polyline>>(new Map())
  const routeArcRef     = useRef<Polyline | null>(null)
  const showAirportsRef = useRef(showAirports)

  // Registruj window.__playAtc — volá se z Leaflet popup tlačítek
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).__playAtc = playAtcStream
    return () => { delete (window as any).__playAtc }
  }, [])

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

      // Přidej airport markery do airportLayer (data jsou bundlovaná, žádný fetch)
      airports.forEach((a: Airport) => {
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
          // Popup — bind prázdný, obsah se nastaví po kliknutí
          marker.bindPopup('', { className: 'fq-airport-popup-wrap', maxWidth: 260 })

          const buildPopupHtml = (metarHtml: string, atcHtml: string) => `
            <div class="fq-airport-popup">
              <div class="fq-ap-code">${a.iata || a.icao}</div>
              <div class="fq-ap-name">${a.name}</div>
              <div class="fq-ap-meta">${a.city} · ${a.country} · ${a.elev} ft</div>
              <div class="fq-ap-metar">${metarHtml}</div>
              ${atcHtml}
            </div>`

          const compass = (deg: number) => {
            const dirs = ['S','SSV','SV','VSV','V','VJV','JV','JJV','J','JJZ','JZ','ZJZ','Z','ZSZ','SZ','SSZ']
            return dirs[Math.round(deg / 22.5) % 16]
          }
          const wxMap: Record<string, string> = {
            'RA':'🌧 Déšť','DZ':'🌦 Mrholení','SN':'❄️ Sníh','TS':'⛈ Bouřka',
            'FG':'🌫 Mlha','BR':'🌁 Opar','HZ':'😶‍🌫️ Zákal','TSRA':'⛈ Bouřka s deštěm',
            '-RA':'🌦 Slabý déšť','+RA':'🌧 Silný déšť','-SN':'🌨 Slabý sníh',
            'VCSH':'🌦 Přeháňky','GR':'🌩 Kroupy',
          }

          marker.on('click', () => {
            // Okamžitě otevři popup s "načítám..."
            marker.setPopupContent(buildPopupHtml('<div class="fq-ap-metar-loading">⏳ Načítám počasí…</div>', ''))
            marker.openPopup()

            fetch(`/api/metar?icao=${encodeURIComponent(a.icao)}`)
              .then(r => r.json())
              .then((m) => {
                let metarHtml = '<div class="fq-ap-metar-loading">Počasí nedostupné</div>'
                if (!m.error) {
                  const qnh = m.altimeter ? Math.round(m.altimeter) : null
                  const windSpd = m.windSpeed != null ? Math.round(m.windSpeed * 1.852) : null
                  const catColor = m.category === 'VFR' ? '#22C55E' : m.category === 'MVFR' ? '#38BDF8' : m.category === 'IFR' ? '#F87171' : m.category === 'LIFR' ? '#C084FC' : '#6B7280'
                  const wxLabel = m.weather ? (wxMap[m.weather] ?? m.weather) : null
                  metarHtml = `
                    <div class="fq-metar-divider"></div>
                    ${m.category ? `<div class="fq-metar-cat" style="color:${catColor}">● ${m.category}</div>` : ''}
                    <div class="fq-metar-grid">
                      ${m.temp != null ? `<div class="fq-metar-tile"><div class="fq-mt-label">TEPLOTA</div><div class="fq-mt-val">${m.temp}°C</div></div>` : ''}
                      ${qnh ? `<div class="fq-metar-tile"><div class="fq-mt-label">QNH</div><div class="fq-mt-val">${qnh} hPa</div></div>` : ''}
                      ${windSpd != null && m.windDir != null ? `<div class="fq-metar-tile"><div class="fq-mt-label">VÍTR</div><div class="fq-mt-val">${windSpd} km/h ${compass(m.windDir)}${m.windGust ? ` (poryvy ${Math.round(m.windGust * 1.852)})` : ''}</div></div>` : m.windVrb ? `<div class="fq-metar-tile"><div class="fq-mt-label">VÍTR</div><div class="fq-mt-val">proměnlivý ${windSpd ?? '?'} km/h</div></div>` : ''}
                      ${m.visibility != null ? `<div class="fq-metar-tile"><div class="fq-mt-label">DOHLEDNOST</div><div class="fq-mt-val">${m.visibility >= 6 ? '10+ km' : (m.visibility * 1.609).toFixed(1) + ' km'}</div></div>` : ''}
                    </div>
                    ${wxLabel ? `<div class="fq-metar-wx">${wxLabel}</div>` : ''}
                    ${m.rawMetar ? `<div class="fq-metar-raw">${m.rawMetar}</div>` : ''}`
                }

                const feeds = getAtcFeeds(a.icao)

                // Nejdřív zobraz popup s "Zjišťuji status streamů..."
                const atcLoading = `
                  <div class="fq-metar-divider"></div>
                  <div class="fq-atc-label">🎙 LIVE ATC</div>
                  <div class="fq-atc-feed-item" style="color:rgba(255,255,255,0.3)">⏳ Zjišťuji dostupné streamy…</div>`
                marker.setPopupContent(buildPopupHtml(metarHtml, atcLoading))
                marker.getPopup()?.update()

                if (feeds.length === 0) {
                  // Letiště bez known feedů — rovnou zobraz odkaz
                  const atcHtml = `
                    <div class="fq-metar-divider"></div>
                    <div class="fq-atc-label">🎙 LIVE ATC</div>
                    <a href="${getLiveAtcUrl(a.icao)}" target="_blank" rel="noopener noreferrer" class="fq-atc-link-btn">Hledat ATC na LiveATC.net ↗</a>`
                  marker.setPopupContent(buildPopupHtml(metarHtml, atcHtml))
                  marker.getPopup()?.update()
                } else {
                  // Zkontroluj status každého feedu paralelně
                  Promise.all(feeds.map(f =>
                    fetch(`/api/atc-check?feed=${encodeURIComponent(f.feed)}`)
                      .then(r => r.json())
                      .then((d: { online: boolean }) => ({ ...f, online: d.online }))
                      .catch(() => ({ ...f, online: false }))
                  )).then(results => {
                    const feedBtns = results.map((f, i) => {
                      const btnId = `atc-btn-${a.icao}-${i}`
                      const proxyUrl = `/api/atc-stream?feed=${encodeURIComponent(f.feed)}`
                      if (f.online) {
                        return `<button id="${btnId}" class="fq-atc-btn online" data-label="${f.label}" onclick="window.__playAtc('${proxyUrl}','${btnId}')">🟢 ▶ ${f.label}</button>`
                      } else {
                        return `<div class="fq-atc-feed-offline">⚫ ${f.label} — offline</div>`
                      }
                    }).join('')

                    const anyOnline = results.some(f => f.online)
                    const atcHtml = `
                      <div class="fq-metar-divider"></div>
                      <div class="fq-atc-label">🎙 LIVE ATC</div>
                      ${feedBtns}
                      ${!anyOnline ? `<a href="${getLiveAtcUrl(a.icao)}" target="_blank" rel="noopener noreferrer" class="fq-atc-link-btn" style="margin-top:5px">Hledat ATC na LiveATC.net ↗</a>` : ''}`

                    marker.setPopupContent(buildPopupHtml(metarHtml, atcHtml))
                    marker.getPopup()?.update()
                  })
                }
              })
              .catch(() => {
                marker.setPopupContent(buildPopupHtml('<div class="fq-ap-metar-loading">Počasí nedostupné</div>', ''))
              })
          })

          // Stop audio při zavření popupu
          marker.on('popupclose', () => {
            if (globalAudio) {
              globalAudio.pause()
              globalAudio.src = ''
              globalAudio = null
            }
          })

          airportLayer.addLayer(marker)
        })

      // Pokud byl toggle zapnut ještě před init mapou — přidej vrstvu hned
      if (showAirportsRef.current) airportLayer.addTo(map)

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

  // Udržuj ref synchronizovaný s props (pro async Leaflet init callback)
  useEffect(() => { showAirportsRef.current = showAirports }, [showAirports])

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

  // Route arc — nakreslí oblouk DEP → letadlo → ARR
  useEffect(() => {
    if (!mapRef.current) return
    const { map, L } = mapRef.current

    // Odstraň předchozí arc
    if (routeArcRef.current) {
      map.removeLayer(routeArcRef.current)
      routeArcRef.current = null
    }

    if (!selectedRoute || !selectedFlight) return
    const { departure, arrival } = selectedRoute

    if (!arrival) return

    // Bod A = odlet (nebo aktuální poloha pokud nemáme DEP)
    const depLat = departure?.lat ?? selectedFlight.lat
    const depLng = departure?.lng ?? selectedFlight.lng
    const arrLat = arrival.lat
    const arrLng = arrival.lng
    const curLat = selectedFlight.lat
    const curLng = selectedFlight.lng

    // Uletěná část (DEP → letadlo) — šedá přerušovaná
    const flownPts = greatCirclePoints(depLat, depLng, curLat, curLng, 40)
    const flownArc = L.polyline(flownPts, {
      color: 'rgba(255,255,255,0.18)',
      weight: 1.5,
      dashArray: '4 6',
      smoothFactor: 1,
    })

    // Zbývající část (letadlo → ARR) — zlatá plná
    const remainPts = greatCirclePoints(curLat, curLng, arrLat, arrLng, 60)
    const remainArc = L.polyline(remainPts, {
      color: '#FDE047',
      weight: 2,
      opacity: 0.55,
      dashArray: '6 4',
      smoothFactor: 1,
    })

    // Marker cílového letiště
    const arrIcon = L.divIcon({
      html: `<div style="
        width:32px;height:32px;display:flex;align-items:center;justify-content:center;
        background:rgba(253,224,71,0.15);border:1.5px solid rgba(253,224,71,0.5);
        border-radius:50%;font-size:14px;
      ">🛬</div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    })
    const arrMarker = L.marker([arrLat, arrLng], { icon: arrIcon, interactive: false })

    // Seskup vše do jedné vrstvy pro snadné mazání
    const group = L.layerGroup([flownArc, remainArc, arrMarker])
    group.addTo(map)
    // Ulož jako polyline (group nemá Polyline typ, ale máme ref)
    routeArcRef.current = group as unknown as Polyline
  }, [selectedRoute, selectedFlight])

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
          color: var(--gold) !important;
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
          margin-bottom: 136px !important;
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
        .leaflet-control-zoom-out:hover { background: rgba(30,41,59,0.95) !important; color: var(--gold) !important; }
        .leaflet-control-attribution { font-size: 9px !important; background: rgba(10,15,30,0.55) !important; color: rgba(255,255,255,0.2) !important; }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.25) !important; }
        .fq-airport-tooltip {
          background: rgba(15,23,42,0.92) !important;
          border: 1px solid rgba(56,189,248,0.35) !important;
          border-radius: 6px !important;
          color: var(--accent-blue) !important;
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
        .fq-ap-code { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--accent-blue); letter-spacing: 2px; }
        .fq-ap-name { font-size: 11px; color: rgba(255,255,255,0.8); margin-top: 2px; }
        .fq-ap-meta { font-size: 9px; color: rgba(255,255,255,0.35); margin-top: 4px; letter-spacing: 0.5px; }
        .fq-ap-metar { margin-top: 2px; }
        .fq-ap-metar-loading { font-size: 9px; color: rgba(255,255,255,0.3); padding: 6px 0; }
        .fq-metar-divider { height: 1px; background: rgba(56,189,248,0.15); margin: 8px 0; }
        .fq-metar-cat { font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; margin-bottom: 8px; }
        .fq-metar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px; }
        .fq-metar-tile { background: rgba(255,255,255,0.05); border-radius: 6px; padding: 5px 7px; }
        .fq-mt-label { font-size: 8px; color: rgba(255,255,255,0.35); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 2px; }
        .fq-mt-val { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.9); }
        .fq-metar-wx { font-size: 11px; color: rgba(255,255,255,0.75); margin: 4px 0; }
        .fq-metar-raw { font-size: 8px; color: rgba(255,255,255,0.2); margin-top: 6px; font-family: monospace; word-break: break-all; line-height: 1.4; }
        .fq-atc-label { font-size: 9px; color: rgba(255,255,255,0.4); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 5px; }
        .fq-atc-feed-item { font-size: 10px; color: rgba(255,255,255,0.5); padding: 2px 0; }
        .fq-atc-feed-offline { font-size: 10px; color: rgba(255,255,255,0.25); padding: 3px 0; }
        .fq-atc-btn {
          display: block; width: 100%; margin-bottom: 4px;
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.35);
          border-radius: 7px; padding: 7px 10px;
          color: var(--green-live); font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 600; cursor: pointer; text-align: left;
          transition: background 0.15s;
        }
        .fq-atc-btn:hover { background: rgba(34,197,94,0.2); }
        .fq-atc-btn.playing { background: rgba(253,224,71,0.12); border-color: rgba(253,224,71,0.4); color: var(--gold); }
        .fq-atc-link-btn {
          display: block; margin-top: 5px;
          background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.25);
          border-radius: 7px; padding: 7px 10px;
          color: var(--accent-blue); font-family: 'Space Grotesk', sans-serif;
          font-size: 11px; font-weight: 600; text-align: center;
          text-decoration: none; transition: background 0.15s;
        }
        .fq-atc-link-btn:hover { background: rgba(56,189,248,0.16); }
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
