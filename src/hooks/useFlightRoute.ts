'use client'

import { useState, useEffect, useMemo } from 'react'
import type { Airport } from '@/lib/airportData'
import { airports } from '@/lib/airportData'

export interface FlightSchedule {
  number: string | null
  airline: string | null
  status: string | null
  depScheduled: string | null
  depActual: string | null
  depTerminal: string | null
  depGate: string | null
  depDelayMin: number | null
  arrScheduled: string | null
  arrActual: string | null
  arrTerminal: string | null
  arrGate: string | null
  arrBaggageBelt: string | null
  arrDelayMin: number | null
}

export interface AircraftDetails {
  type: string | null
  typeDesignator: string | null
  manufacturer: string | null
  registration: string | null
  registeredOwnerCountry: string | null
  registeredOwnerCountryIso: string | null
  registeredOwnerOperatorCode: string | null
  registeredOwner: string | null
}

export interface FlightRoute {
  departure: Airport | null
  arrival:   Airport | null
  progress:  number          // 0–100 % uletěné trasy
  remaining: number          // km do cíle
  etaMin:    number          // minuty do přistání
  totalDist: number          // celková vzdálenost km
  schedule:  FlightSchedule | null  // časy, zpoždění, brána (AeroDataBox)
  source: 'aerodatabox' | 'adsbdb' | null
  fetchedAt?: string | null
  confidence: 'schedule' | 'position-checked' | 'unverified'
}

const routeCache = new Map<string, { route: FlightRoute | null; expiresAt: number }>()
const aircraftCache = new Map<string, { aircraft: AircraftDetails | null; expiresAt: number }>()
const ROUTE_CACHE_MS = 10 * 60_000
const EMPTY_ROUTE_CACHE_MS = 2 * 60_000

// Airport jak ho vrátí AeroDataBox (s lat/lng přímo)
interface ApiAirport {
  icao: string | null
  iata: string | null
  name: string | null
  city: string | null
  lat:  number | null
  lng:  number | null
}

function apiToAirport(ap: ApiAirport | string | null): Airport | null {
  if (!ap) return null

  // Starý formát — jen ICAO string (OpenSky fallback)
  if (typeof ap === 'string') {
    const upper = ap.toUpperCase()
    return airports.find(a => a.icao === upper || a.iata === upper) ?? null
  }

  // Nový formát — plný objekt z AeroDataBox
  if (ap.lat != null && ap.lng != null) {
    return {
      icao:    ap.icao ?? '',
      iata:    ap.iata ?? '',
      name:    ap.name ?? '',
      city:    ap.city ?? '',
      lat:     ap.lat,
      lng:     ap.lng,
      type:    'large_airport',
      country: '',
      elev:    0,
    }
  }

  // Fallback: zkus najít v lokální DB podle ICAO
  if (ap.icao) {
    return airports.find(a => a.icao === ap.icao?.toUpperCase()) ?? null
  }

  return null
}

// Haversine vzdálenost v km
function distKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R  = 6371
  const dL = (lat2 - lat1) * Math.PI / 180
  const dG = (lng2 - lng1) * Math.PI / 180
  const a  = Math.sin(dL/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dG/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

export function useFlightRoute(
  icao24: string | null,
  currentLat: number,
  currentLng: number,
  velocityKmh: number,
  headingDeg: number = 0,
  callsign: string = '',
) {
  const [route, setRoute] = useState<FlightRoute | null>(null)
  const [aircraft, setAircraft] = useState<AircraftDetails | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!icao24) { setRoute(null); setAircraft(null); return }

    const controller = new AbortController()
    let active = true
    const cacheKey = `${icao24}:${callsign.trim().toUpperCase()}`
    const cached = routeCache.get(cacheKey)
    const cachedAircraft = aircraftCache.get(icao24)
    if (cached && cached.expiresAt > Date.now()) {
      setRoute(cached.route)
      setAircraft(cachedAircraft && cachedAircraft.expiresAt > Date.now() ? cachedAircraft.aircraft : null)
      setLoading(false)
      return () => { active = false; controller.abort() }
    }
    setLoading(true)
    setRoute(null)
    setAircraft(cachedAircraft && cachedAircraft.expiresAt > Date.now() ? cachedAircraft.aircraft : null)

    const params = new URLSearchParams({
      icao24,
      lat:     String(currentLat),
      lng:     String(currentLng),
      heading: String(headingDeg),
      velocity: String(velocityKmh),
      callsign,
    })

    fetch(`/api/flight-route?${params}`, {
      // Server může nejdřív zkusit placený letový řád a až potom bezplatný
      // callsign fallback. Klientský limit proto musí být o něco delší než
      // jednotlivé serverové timeouty.
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10_000)]),
    })
      .then(r => r.json())
      .then((data: {
        route: { departure: ApiAirport | string | null; arrival: ApiAirport | string | null } | null
        schedule?: FlightSchedule | null
        aircraft?: AircraftDetails | null
        source?: 'aerodatabox' | 'adsbdb'
        fetchedAt?: string | null
        confidence?: 'schedule' | 'position-checked' | 'unverified'
      }) => {
        if (!active) return
        const nextAircraft = data.aircraft ?? null
        aircraftCache.set(icao24, { aircraft: nextAircraft, expiresAt: Date.now() + ROUTE_CACHE_MS })
        setAircraft(nextAircraft)
        if (!data.route) {
          routeCache.set(cacheKey, { route: null, expiresAt: Date.now() + EMPTY_ROUTE_CACHE_MS })
          setRoute(null)
          return
        }

        const dep = apiToAirport(data.route.departure)
        const arr = apiToAirport(data.route.arrival)
        const schedule = data.schedule ?? null

        if (!arr) {
          const partial: FlightRoute = {
            departure: dep, arrival: null, progress: 0, remaining: 0, etaMin: 0,
            totalDist: 0, schedule, source: data.source ?? null,
            fetchedAt: data.fetchedAt ?? null, confidence: data.confidence ?? 'unverified',
          }
          routeCache.set(cacheKey, { route: partial, expiresAt: Date.now() + ROUTE_CACHE_MS })
          setRoute(partial)
          return
        }

        const distFlown     = dep ? distKm(dep.lat, dep.lng, currentLat, currentLng) : 0
        const distRemaining = distKm(currentLat, currentLng, arr.lat, arr.lng)
        const totalDist     = distFlown + distRemaining
        const progress      = totalDist > 0 ? Math.min(100, Math.round((distFlown / totalDist) * 100)) : 0
        const speedKmh      = velocityKmh > 50 ? velocityKmh : 800
        const etaMin        = Math.round(distRemaining / speedKmh * 60)

        const complete: FlightRoute = {
          departure: dep, arrival: arr, progress, remaining: Math.round(distRemaining), etaMin,
          totalDist: Math.round(totalDist), schedule, source: data.source ?? null,
          fetchedAt: data.fetchedAt ?? null, confidence: data.confidence ?? 'unverified',
        }
        routeCache.set(cacheKey, { route: complete, expiresAt: Date.now() + ROUTE_CACHE_MS })
        setRoute(complete)
      })
      .catch((err) => { if (active && (err as Error).name !== 'AbortError') setRoute(null) })
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false; controller.abort() }
  // Trasu znovu hledáme jen při změně identity letu. Průběh a ETA se níže
  // přepočítávají lokálně při každé nové poloze, takže nevzniká placené API
  // volání každých deset sekund.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icao24, callsign])

  const updatedRoute = useMemo(() => {
    if (!route?.arrival) return route

    const distFlown = route.departure
      ? distKm(route.departure.lat, route.departure.lng, currentLat, currentLng)
      : 0
    const distRemaining = distKm(currentLat, currentLng, route.arrival.lat, route.arrival.lng)
    const totalDist = distFlown + distRemaining
    const progress = totalDist > 0 ? Math.min(100, Math.round((distFlown / totalDist) * 100)) : 0
    const speedKmh = velocityKmh > 50 ? velocityKmh : 800

    return {
      ...route,
      progress,
      remaining: Math.round(distRemaining),
      etaMin: Math.round(distRemaining / speedKmh * 60),
      totalDist: Math.round(totalDist),
    }
  }, [route, currentLat, currentLng, velocityKmh])

  return { route: updatedRoute, aircraft, loading }
}
