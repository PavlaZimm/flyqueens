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

function findAirport(icao: string | null): Airport | null {
  if (!icao) return null
  const upper = icao.toUpperCase()
  return airports.find(a => a.icao === upper || a.iata === upper) ?? null
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
) {
  const [route, setRoute] = useState<FlightRoute | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!icao24) { setRoute(null); return }

    setLoading(true)
    setRoute(null)

    fetch(`/api/flight-route?icao24=${encodeURIComponent(icao24)}`, {
      signal: AbortSignal.timeout(10000),
    })
      .then(r => r.json())
      .then((data: { route: { departure: string | null; arrival: string | null } | null }) => {
        if (!data.route) { setRoute(null); return }

        const dep = findAirport(data.route.departure)
        const arr = findAirport(data.route.arrival)

        if (!arr) { setRoute({ departure: dep, arrival: null, progress: 0, remaining: 0, etaMin: 0, totalDist: 0 }); return }

        // Vzdálenosti
        const distFlown = dep
          ? distKm(dep.lat, dep.lng, currentLat, currentLng)
          : 0
        const distRemaining = distKm(currentLat, currentLng, arr.lat, arr.lng)
        const totalDist     = distFlown + distRemaining
        const progress      = totalDist > 0 ? Math.min(100, Math.round((distFlown / totalDist) * 100)) : 0
        const speedKmh      = velocityKmh > 50 ? velocityKmh : 800  // fallback pokud stojí
        const etaMin        = Math.round(distRemaining / speedKmh * 60)

        setRoute({ departure: dep, arrival: arr, progress, remaining: Math.round(distRemaining), etaMin, totalDist: Math.round(totalDist) })
      })
      .catch(() => setRoute(null))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icao24])   // záměrně jen icao24 — poloha se mění každých 10s, nechceme refetch

  return { route, loading }
}
