'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchFlights } from '@/lib/opensky'
import type { Flight } from '@/types/flight'

interface UseFlightsResult {
  flights: Flight[]
  loading: boolean
  error: string | null
  count: number
  isMock: boolean
}

const POLL_INTERVAL   = 10_000  // 10s — OpenSky free tier minimum
const MAX_BACKOFF     = 60_000  // max 60s backoff při chybě
const BACKOFF_FACTOR  = 2

export function useFlights(): UseFlightsResult {
  const [flights, setFlights]   = useState<Flight[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [isMock, setIsMock]     = useState(false)
  const backoffRef              = useRef(POLL_INTERVAL)
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null)
  const activeRef               = useRef(false) // guard proti dvojitému spuštění

  const schedule = useCallback((delay: number, fn: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(fn, delay)
  }, [])

  const load = useCallback(async () => {
    try {
      const { flights: data, isMock: mock } = await fetchFlights()
      setFlights(data)
      setIsMock(mock)
      setError(null)
      // Reset backoff při úspěchu
      backoffRef.current = POLL_INTERVAL
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Chyba při načítání letů'
      setError(msg)
      // Exponential backoff při chybě sítě
      backoffRef.current = Math.min(backoffRef.current * BACKOFF_FACTOR, MAX_BACKOFF)
    } finally {
      setLoading(false)
      // Naplánovat další poll s aktuálním intervalem
      schedule(backoffRef.current, load)
    }
  }, [schedule])

  useEffect(() => {
    if (activeRef.current) return // StrictMode guard
    activeRef.current = true
    load()
    return () => {
      activeRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [load])

  return {
    flights,
    loading,
    error,
    count: flights.length,
    isMock,
  }
}
