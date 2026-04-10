'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchFlights } from '@/lib/opensky'
import type { Flight } from '@/types/flight'

interface UseFlightsResult {
  flights: Flight[]
  loading: boolean
  error: string | null
  count: number
}

const POLL_INTERVAL = 5_000 // 5 sekund (s auth účtem)

export function useFlights(): UseFlightsResult {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const data = await fetchFlights()
      setFlights(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Chyba při načítání letů')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const interval = setInterval(load, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [load])

  return {
    flights,
    loading,
    error,
    count: flights.length,
  }
}
