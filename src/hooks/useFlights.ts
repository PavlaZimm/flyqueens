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
  region: string
  setRegion: (r: string) => void
}

const POLL_INTERVAL  = 10_000
const MAX_BACKOFF    = 60_000
const BACKOFF_FACTOR = 2

export function useFlights(): UseFlightsResult {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [isMock, setIsMock]   = useState(false)
  const [region, setRegionState] = useState('europe')
  const backoffRef = useRef(POLL_INTERVAL)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const regionRef  = useRef('europe')

  const schedule = useCallback((delay: number, fn: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(fn, delay)
  }, [])

  const load = useCallback(async () => {
    try {
      const { flights: data, isMock: mock } = await fetchFlights(regionRef.current)
      setFlights(data)
      setIsMock(mock)
      setError(null)
      backoffRef.current = POLL_INTERVAL
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Chyba při načítání letů'
      setError(msg)
      backoffRef.current = Math.min(backoffRef.current * BACKOFF_FACTOR, MAX_BACKOFF)
    } finally {
      setLoading(false)
      schedule(backoffRef.current, load)
    }
  }, [schedule])

  const setRegion = useCallback((r: string) => {
    regionRef.current = r
    setRegionState(r)
    setLoading(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    load()
  }, [load])

  useEffect(() => {
    load()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { flights, loading, error, count: flights.length, isMock, region, setRegion }
}
