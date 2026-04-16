'use client'

import { useState, useEffect } from 'react'
import type { Airport } from '@/lib/airportData'
import { airports } from '@/lib/airportData'

export interface FlightRoute {
  departure: Airport | null
  arrival:   Airport | null
  progress:  number          // 0–100 % uletěné trasy
  remaining: number          // km do cíle
  etaMin:    number          // minuty do přistání
  totalDist: number          // celková vzdálenost km
}

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
) {
  const [route, setRoute] = useState<FlightRoute | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!icao24) { setRoute(null); return }

    const controller = new AbortController()
    setLoading(true)
    setRoute(null)

    const params = new URLSearchParams({
      icao24,
      lat:     String(currentLat),
      lng:     String(currentLng),
      heading: String(headingDeg),
    })

    fetch(`/api/flight-route?${params}`, { signal: controller.signal })
      .then(r => r.json())
      .then((data: { route: { departure: ApiAirport | string | null; arrival: ApiAirport | string | null } | null }) => {
        if (!data.route) { setRoute(null); return }

        const dep = apiToAirport(data.route.departure)
        const arr = apiToAirport(data.route.arrival)

        if (!arr) {
          setRoute({ departure: dep, arrival: null, progress: 0, remaining: 0, etaMin: 0, totalDist: 0 })
          return
        }

        const distFlown     = dep ? distKm(dep.lat, dep.lng, currentLat, currentLng) : 0
        const distRemaining = distKm(currentLat, currentLng, arr.lat, arr.lng)
        const totalDist     = distFlown + distRemaining
        const progress      = totalDist > 0 ? Math.min(100, Math.round((distFlown / totalDist) * 100)) : 0
        const speedKmh      = velocityKmh > 50 ? velocityKmh : 800
        const etaMin        = Math.round(distRemaining / speedKmh * 60)

        setRoute({ departure: dep, arrival: arr, progress, remaining: Math.round(distRemaining), etaMin, totalDist: Math.round(totalDist) })
      })
      .catch((err) => { if ((err as Error).name !== 'AbortError') setRoute(null) })
      .finally(() => setLoading(false))

    return () => controller.abort()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icao24])

  return { route, loading }
}
