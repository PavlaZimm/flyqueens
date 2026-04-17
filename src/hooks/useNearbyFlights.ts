'use client'

import { useState, useCallback } from 'react'
import type { Flight } from '@/types/flight'
import { NEARBY_RADIUS_KM, EARTH_RADIUS_KM } from '@/lib/constants'

interface UseNearbyFlightsResult {
  nearbyFlights: Flight[]
  showNearby: boolean
  locateMe: (flights: Flight[], onLocated: (lat: number, lng: number) => void) => void
  dismiss: () => void
}

export function useNearbyFlights(): UseNearbyFlightsResult {
  const [nearbyFlights, setNearbyFlights] = useState<Flight[]>([])
  const [showNearby, setShowNearby] = useState(false)

  const locateMe = useCallback((
    flights: Flight[],
    onLocated: (lat: number, lng: number) => void,
  ) => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      onLocated(latitude, longitude)

      const nearby = flights.filter(f => {
        const dLat = (f.lat - latitude) * Math.PI / 180
        const dLng = (f.lng - longitude) * Math.PI / 180
        const a = Math.sin(dLat / 2) ** 2
          + Math.cos(latitude * Math.PI / 180)
          * Math.cos(f.lat * Math.PI / 180)
          * Math.sin(dLng / 2) ** 2
        return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) <= NEARBY_RADIUS_KM
      })
      setNearbyFlights(nearby)
      setShowNearby(true)
    })
  }, [])

  const dismiss = useCallback(() => setShowNearby(false), [])

  return { nearbyFlights, showNearby, locateMe, dismiss }
}
