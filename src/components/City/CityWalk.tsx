'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  Map as MapLibreMap,
  Marker,
  Popup,
  setWorkerUrl,
  type ErrorEvent as MapErrorEvent,
  type ExpressionSpecification,
  type FilterSpecification,
} from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useTheme } from '@/hooks/useTheme'
import { trackEvent } from '@/lib/analytics'
import { CITY_WALK_CITIES, findCityWalkCity, type CityWalkCity, type CityWalkSpot } from '@/lib/cityWalk'
import styles from './CityWalk.module.css'

type Theme = 'dark' | 'light'
type ViewMode = 'street' | 'overview'
type Status = 'loading' | 'ready' | 'error' | 'unsupported'

// OpenFreeMap: bezplatné vektorové dlaždice z OpenStreetMap bez API klíče.
// Liberty je světlý styl, Fiord tmavý. Když se tmavý styl nenačte,
// přepneme na Liberty, ať model nezůstane prázdný.
const STYLE_URLS: Record<Theme, string> = {
  light: 'https://tiles.openfreemap.org/styles/liberty',
  dark: 'https://tiles.openfreemap.org/styles/fiord',
}

const ATTRIBUTION = '<a href="https://openfreemap.org" target="_blank" rel="noopener noreferrer">OpenFreeMap</a> · <a href="https://www.openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>'

// Kamera „chodce“: vysoký pitch a zoom těsně nad úrovní ulice.
const STREET_VIEW = { zoom: 19, pitch: 80 }
const OVERVIEW_VIEW = { zoom: 15.6, pitch: 62 }

const WALK_SPEED_MPS = 9        // svižná chůze zrychlená pro zábavu
const RUN_MULTIPLIER = 3
const TURN_DEG_PER_S = 80
const LOOK_SENSITIVITY = 0.28   // stupně na pixel při tažení myší
const MIN_PITCH = 20
const MAX_PITCH = 85

const BUILDINGS_LAYER_ID = 'fq-buildings-3d'

const BUILDING_COLORS: Record<Theme, [string, string, string]> = {
  dark: ['#1D2A44', '#33507F', '#5AA9FF'],
  light: ['#E2E7F0', '#C2CCDD', '#93A4C2'],
}

const MOVE_KEYS = new Set([
  'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyQ', 'KeyE',
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
  'ShiftLeft', 'ShiftRight',
])

let workerConfigured = false
function ensureWorker() {
  if (workerConfigured) return
  // Zkopírováno z node_modules skriptem scripts/copy-maplibre-worker.mjs
  setWorkerUrl('/vendor/maplibre/maplibre-gl-worker.mjs')
  workerConfigured = true
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function readInitialTheme(): Theme {
  try {
    return localStorage.getItem('flyqueens-theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

function readCityFromUrl(fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const param = new URLSearchParams(window.location.search).get('mesto')
  return findCityWalkCity(param ?? fallback).slug
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

// Přidá vrstvu vytažených budov nad podklad stylu. Data jsou v OpenMapTiles
// vrstvě `building` (render_height / render_min_height v metrech).
function addBuildings(map: MapLibreMap, theme: Theme) {
  const style = map.getStyle()
  if (!style?.layers) return

  for (const layer of style.layers) {
    if (layer.type === 'fill-extrusion' && map.getLayer(layer.id)) map.removeLayer(layer.id)
  }

  const sources = style.sources ?? {}
  const sourceId = sources.openmaptiles
    ? 'openmaptiles'
    : Object.keys(sources).find((id) => sources[id]?.type === 'vector')
  if (!sourceId) return

  const firstSymbol = style.layers.find((layer) => layer.type === 'symbol')?.id
  const [low, mid, high] = BUILDING_COLORS[theme]
  const height: ExpressionSpecification = ['coalesce', ['get', 'render_height'], 8]
  const hideUnderground: FilterSpecification = ['!=', ['get', 'hide_3d'], true]

  map.addLayer({
    id: BUILDINGS_LAYER_ID,
    type: 'fill-extrusion',
    source: sourceId,
    'source-layer': 'building',
    minzoom: 13,
    filter: hideUnderground,
    paint: {
      'fill-extrusion-color': ['interpolate', ['linear'], height, 0, low, 40, mid, 120, high],
      'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 13, 0, 14.5, height],
      'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 13, 0, 14.5, ['coalesce', ['get', 'render_min_height'], 0]],
      'fill-extrusion-opacity': theme === 'dark' ? 0.94 : 0.9,
      'fill-extrusion-vertical-gradient': true,
    },
  }, firstSymbol)
}

// Zlatý marker letiště s odkazem na průvodce. Města bez letiště marker nemají.
function buildMarker(city: CityWalkCity): Marker | null {
  const airport = city.airport
  if (!airport) return null
  const content = document.createElement('div')
  const title = document.createElement('strong')
  title.textContent = `${airport.iata} · ${airport.name}`
  content.append(title)
  if (city.airportHref) {
    const link = document.createElement('a')
    link.href = city.airportHref
    link.textContent = 'Průvodce letištěm →'
    content.append(document.createElement('br'), link)
  }

  return new Marker({ color: '#F5B83D' })
    .setLngLat([airport.lng, airport.lat])
    .setPopup(new Popup({ offset: 24, closeButton: true }).setDOMContent(content))
}

interface CityWalkProps {
  initialCitySlug?: string
}

export function CityWalk({ initialCitySlug = 'praha' }: CityWalkProps) {
  const { theme, toggleTheme } = useTheme()

  const [citySlug, setCitySlug] = useState(() => readCityFromUrl(initialCitySlug))
  const city = findCityWalkCity(citySlug)
  const [spotId, setSpotId] = useState(() => findCityWalkCity(readCityFromUrl(initialCitySlug)).spots[0].id)
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [tileWarning, setTileWarning] = useState(false)
  const [view, setView] = useState<ViewMode>('street')
  const [helpOpen, setHelpOpen] = useState(true)
  const [padActive, setPadActive] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markerRef = useRef<Marker | null>(null)
  const keysRef = useRef<Set<string>>(new Set())
  const readyRef = useRef(false)
  const styleThemeRef = useRef<Theme>('dark')
  const fellBackRef = useRef(false)
  const lookRef = useRef<{ pointerId: number; x: number; y: number } | null>(null)
  const cityRef = useRef(city)

  // Marker a start mapy čtou aktuální město z refu (efekt běží před inicializací mapy).
  useEffect(() => {
    cityRef.current = city
  }, [city])

  // --- Inicializace mapy (jednou) --------------------------------------
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (!hasWebGL()) {
      // Synchronizace s prohlížečem (WebGL) – stejný vzor jako useTheme.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('unsupported')
      return
    }

    ensureWorker()
    const initialTheme = readInitialTheme()
    styleThemeRef.current = initialTheme
    const startCity = cityRef.current
    const startSpot = startCity.spots[0]

    let map: MapLibreMap
    try {
      map = new MapLibreMap({
        container,
        style: STYLE_URLS[initialTheme],
        center: [startSpot.lng, startSpot.lat],
        zoom: STREET_VIEW.zoom,
        pitch: STREET_VIEW.pitch,
        bearing: startSpot.bearing,
        maxPitch: MAX_PITCH,
        minZoom: 12,
        maxZoom: 20,
        dragPan: false,
        dragRotate: false,
        keyboard: false,
        doubleClickZoom: false,
        boxZoom: false,
        touchPitch: false,
        pitchWithRotate: false,
        fadeDuration: 0,
        attributionControl: { compact: true, customAttribution: ATTRIBUTION },
      })
    } catch {
      setStatus('error')
      setErrorMessage('Prohlížeč nedokázal spustit 3D vykreslování.')
      return
    }

    map.touchZoomRotate.disableRotation()
    mapRef.current = map

    map.on('style.load', () => {
      addBuildings(map, styleThemeRef.current)
    })

    map.on('load', () => {
      readyRef.current = true
      setStatus('ready')
      const marker = buildMarker(cityRef.current)
      marker?.addTo(map)
      markerRef.current = marker
    })

    map.on('error', (event: MapErrorEvent) => {
      const error = event.error as (Error & { url?: string; status?: number }) | undefined
      const url = error?.url ?? ''
      if (url.includes('/styles/')) {
        if (!fellBackRef.current && styleThemeRef.current === 'dark') {
          fellBackRef.current = true
          styleThemeRef.current = 'light'
          map.setStyle(STYLE_URLS.light)
          return
        }
        setStatus('error')
        setErrorMessage('Mapový podklad se nepodařilo načíst. Zkuste to prosím za chvíli znovu.')
        return
      }
      if (!readyRef.current) {
        setStatus('error')
        setErrorMessage(error?.message || 'Mapu se nepodařilo spustit.')
        return
      }
      setTileWarning(true)
    })

    // Rozhlížení: tažení myší nebo jedním prstem otáčí kameru.
    const canvasContainer = map.getCanvasContainer()
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      if (lookRef.current) {
        // Druhý prst = pinch zoom, rozhlížení ukončíme.
        lookRef.current = null
        return
      }
      lookRef.current = { pointerId: e.pointerId, x: e.clientX, y: e.clientY }
    }
    const onPointerMove = (e: PointerEvent) => {
      const look = lookRef.current
      if (!look || look.pointerId !== e.pointerId) return
      const dx = e.clientX - look.x
      const dy = e.clientY - look.y
      look.x = e.clientX
      look.y = e.clientY
      map.jumpTo({
        bearing: map.getBearing() + dx * LOOK_SENSITIVITY,
        pitch: clamp(map.getPitch() - dy * LOOK_SENSITIVITY, MIN_PITCH, MAX_PITCH),
      })
    }
    const onPointerEnd = (e: PointerEvent) => {
      if (lookRef.current?.pointerId === e.pointerId) lookRef.current = null
    }
    canvasContainer.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerEnd)
    window.addEventListener('pointercancel', onPointerEnd)

    // Klávesnice: WASD / šipky, Shift = běh.
    const isTypingTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement && ['INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)
    const onKeyDown = (e: KeyboardEvent) => {
      if (!MOVE_KEYS.has(e.code) || isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      keysRef.current.add(e.code)
      e.preventDefault()
    }
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.code)
    }
    const clearKeys = () => keysRef.current.clear()
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clearKeys)

    // Pohybová smyčka: metry za sekundu převedené na stupně podle aktuální šířky.
    let last: number | null = null
    let raf = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.1)
      last = now
      if (!readyRef.current) return

      const keys = keysRef.current
      let forward = 0
      let strafe = 0
      let turn = 0
      if (keys.has('KeyW') || keys.has('ArrowUp')) forward += 1
      if (keys.has('KeyS') || keys.has('ArrowDown')) forward -= 1
      if (keys.has('KeyD')) strafe += 1
      if (keys.has('KeyA')) strafe -= 1
      if (keys.has('ArrowRight') || keys.has('KeyE')) turn += 1
      if (keys.has('ArrowLeft') || keys.has('KeyQ')) turn -= 1
      if (!forward && !strafe && !turn) return

      const bearing = map.getBearing() + turn * TURN_DEG_PER_S * dt
      if (!forward && !strafe) {
        map.jumpTo({ bearing })
        return
      }

      const running = keys.has('ShiftLeft') || keys.has('ShiftRight')
      // Při nadhledu se pohybujeme úměrně rychleji, ať město neubíhá pomalu.
      const zoomScale = Math.pow(2, STREET_VIEW.zoom - map.getZoom())
      const distance = WALK_SPEED_MPS * (running ? RUN_MULTIPLIER : 1) * zoomScale * dt

      const rad = (bearing * Math.PI) / 180
      const north = forward * Math.cos(rad) + strafe * Math.cos(rad + Math.PI / 2)
      const east = forward * Math.sin(rad) + strafe * Math.sin(rad + Math.PI / 2)
      const length = Math.hypot(north, east) || 1

      const center = map.getCenter()
      const latRad = (center.lat * Math.PI) / 180
      const dLat = (distance * north / length) / 111_320
      const dLng = (distance * east / length) / (111_320 * Math.cos(latRad))
      map.jumpTo({ center: [center.lng + dLng, center.lat + dLat], bearing })
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      canvasContainer.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clearKeys)
      readyRef.current = false
      markerRef.current = null
      mapRef.current = null
      map.remove()
    }
  }, [])

  // --- Přepnutí tématu = přepnutí stylu --------------------------------
  useEffect(() => {
    const map = mapRef.current
    if (!map || styleThemeRef.current === theme) return
    if (fellBackRef.current && theme === 'dark') return
    styleThemeRef.current = theme
    map.setStyle(STYLE_URLS[theme])
  }, [theme])

  // --- Teleport na vybrané místo ---------------------------------------
  const teleport = useCallback((target: CityWalkCity, spot: CityWalkSpot) => {
    const map = mapRef.current
    if (!map) return
    map.jumpTo({
      center: [spot.lng, spot.lat],
      bearing: spot.bearing,
      zoom: STREET_VIEW.zoom,
      pitch: STREET_VIEW.pitch,
    })
    setView('street')
    if (readyRef.current) {
      markerRef.current?.remove()
      const marker = buildMarker(target)
      marker?.addTo(map)
      markerRef.current = marker
    }
    trackEvent('City Walk Teleport', { city: target.slug, spot: spot.id })
  }, [])

  const handleCityChange = (slug: string) => {
    const next = findCityWalkCity(slug)
    setCitySlug(next.slug)
    setSpotId(next.spots[0].id)
    teleport(next, next.spots[0])
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('mesto', next.slug)
      window.history.replaceState(null, '', url)
    } catch {
      // URL je jen pohodlí pro sdílení, bez ní model funguje stejně.
    }
  }

  const handleSpotChange = (id: string) => {
    const spot = city.spots.find((s) => s.id === id) ?? city.spots[0]
    setSpotId(spot.id)
    teleport(city, spot)
  }

  const toggleView = () => {
    const map = mapRef.current
    if (!map) return
    const next: ViewMode = view === 'street' ? 'overview' : 'street'
    const target = next === 'street' ? STREET_VIEW : OVERVIEW_VIEW
    map.easeTo({ zoom: target.zoom, pitch: target.pitch, duration: 900 })
    setView(next)
    trackEvent('City Walk View', { mode: next })
  }

  // --- Dotykový ovladač ------------------------------------------------
  const padPress = (code: string) => (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    keysRef.current.add(code)
    setPadActive(code)
  }
  const padRelease = (code: string) => () => {
    keysRef.current.delete(code)
    setPadActive((current) => (current === code ? null : current))
  }
  const padButton = (code: string, label: string, aria: string) => (
    <button
      type="button"
      className={`${styles.padButton} ${padActive === code ? styles.padButtonActive : ''}`}
      aria-label={aria}
      onPointerDown={padPress(code)}
      onPointerUp={padRelease(code)}
      onPointerCancel={padRelease(code)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {label}
    </button>
  )

  return (
    <div className={styles.shell}>
      <div ref={containerRef} className={styles.map} aria-label={`3D model města ${city.name}`} role="application" />

      <div className={styles.topBar}>
        <Link href="/" className={`${styles.chip} ${styles.brand}`} aria-label="FlyQueens, domů">
          <span aria-hidden="true">✈</span>
          <span className={styles.brandLabel}>FlyQueens</span>
        </Link>

        <select
          className={styles.select}
          value={city.slug}
          onChange={(e) => handleCityChange(e.target.value)}
          aria-label="Město"
        >
          {CITY_WALK_CITIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          className={styles.select}
          value={spotId}
          onChange={(e) => handleSpotChange(e.target.value)}
          aria-label="Výchozí místo"
        >
          {city.spots.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>

        <button
          type="button"
          className={`${styles.button} ${view === 'overview' ? styles.buttonActive : ''}`}
          onClick={toggleView}
          aria-pressed={view === 'overview'}
        >
          {view === 'street' ? 'Nadhled' : 'Zpět do ulic'}
        </button>

        <div className={styles.spacer} />

        <button type="button" className={styles.button} onClick={toggleTheme} aria-label="Přepnout světlý a tmavý režim">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <Link href="/radar" className={`${styles.button} ${styles.desktopOnly}`}>Živá mapa</Link>
      </div>

      {helpOpen && status === 'ready' && (
        <div className={styles.help}>
          <div className={styles.helpTitle}>
            <span>Procházka městem</span>
            <button type="button" className={styles.helpClose} onClick={() => setHelpOpen(false)} aria-label="Skrýt nápovědu">✕</button>
          </div>
          <div><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> nebo šipky: chůze a otáčení</div>
          <div><kbd>Shift</kbd> běh · <kbd>Q</kbd><kbd>E</kbd> otáčení</div>
          <div><strong>Tažení myší</strong> rozhlížení · <strong>kolečko</strong> výška</div>
          <div style={{ marginTop: 6 }}>Budovy z OpenStreetMap, výšky jsou tam, kde je mapaři zakreslili.</div>
        </div>
      )}

      {status === 'ready' && (
        <div className={`${styles.help} ${styles.helpMobile}`}>
          <strong>Táhni prstem</strong> pro rozhlížení, tlačítka vpravo jsou chůze.
        </div>
      )}

      {status === 'ready' && (
        <div className={styles.pad} aria-label="Ovládání chůze">
          {padButton('KeyQ', '↶', 'Otočit doleva')}
          {padButton('KeyW', '▲', 'Jít vpřed')}
          {padButton('KeyE', '↷', 'Otočit doprava')}
          {padButton('KeyA', '◀', 'Úkrok vlevo')}
          {padButton('KeyS', '▼', 'Jít vzad')}
          {padButton('KeyD', '▶', 'Úkrok vpravo')}
        </div>
      )}

      {status === 'ready' && tileWarning && (
        <div className={styles.status} role="status">Některé části mapy se nepodařilo načíst.</div>
      )}

      {status === 'loading' && (
        <div className={styles.overlay} aria-live="polite">
          <div className={styles.overlayCard}>
            <div className={styles.spinner} />
            Načítám 3D model města {city.name}…
          </div>
        </div>
      )}

      {status === 'unsupported' && (
        <div className={styles.overlay}>
          <div className={styles.overlayCard}>
            <h2>3D model potřebuje WebGL</h2>
            <p>Váš prohlížeč nemá zapnuté 3D vykreslování. Zkuste aktuální Chrome, Firefox nebo Safari.</p>
            <Link href="/radar">Otevřít živou mapu letadel →</Link>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.overlay}>
          <div className={styles.overlayCard}>
            <h2>Model se nepodařilo načíst</h2>
            <p>{errorMessage}</p>
            <Link href="/radar">Otevřít živou mapu letadel →</Link>
          </div>
        </div>
      )}
    </div>
  )
}
