'use client'

import { useState, useCallback } from 'react'
import type { Flight } from '@/types/flight'
import { NEARBY_RADIUS_KM, EARTH_RADIUS_KM } from '@/lib/constants'

interface UseNearbyFlightsResult {
  nearbyFlights: Flight[]
  showNearby: boolean
  locationError: string | null
  locateMe: (flights: Flight[], onLocated: (lat: number, lng: number) => void, onError?: () => void) => void
  dismiss: () => void
}

export function useNearbyFlights(): UseNearbyFlightsResult {
  const [nearbyFlights, setNearbyFlights] = useState<Flight[]>([])
  const [showNearby, setShowNearby] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const locateMe = useCallback((
    flights: Flight[],
    onLocated: (lat: number, lng: number) => void,
    onError?: () => void,
  ) => {
    setLocationError(null)
    if (!navigator.geolocation) {
      setLocationError('Tento prohlížeč neumí zjistit polohu.')
      setShowNearby(true)
      onError?.()
      return
    }
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
    }, (error) => {
      const message = error.code === error.PERMISSION_DENIED
        ? 'Poloha je vypnutá. Povol ji pro tento web v nastavení prohlížeče.'
        : 'Polohu se nepodařilo zjistit. Zkus to prosím znovu.'
      setLocationError(message)
      setShowNearby(true)
      onError?.()
    }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 })
  }, [])

  const dismiss = useCallback(() => setShowNearby(false), [])

  return { nearbyFlights, showNearby, locationError, locateMe, dismiss }
}
