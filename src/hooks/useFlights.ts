'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchFlights } from '@/lib/opensky'
import type { Flight, FlightDataMeta } from '@/types/flight'
import { POLL_INTERVAL_MS, MAX_BACKOFF_MS } from '@/lib/constants'

interface UseFlightsResult {
  flights: Flight[]
  loading: boolean
  error: string | null
  count: number
  dataMeta: FlightDataMeta
  region: string
  setRegion: (r: string) => void
}

const POLL_INTERVAL  = POLL_INTERVAL_MS
const MAX_BACKOFF    = MAX_BACKOFF_MS
const BACKOFF_FACTOR = 2

export function useFlights(): UseFlightsResult {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState<string | null>(null)
  const [dataMeta, setDataMeta] = useState<FlightDataMeta>({
    status: 'unavailable', source: null, fetchedAt: null,
  })
  const [region, setRegionState] = useState('europe')
  const backoffRef = useRef(POLL_INTERVAL)
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const regionRef  = useRef('europe')
  const requestIdRef = useRef(0)

  const schedule = useCallback((delay: number, fn: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(fn, delay)
  }, [])

  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current
    const requestedRegion = regionRef.current
    try {
      const { flights: data, meta } = await fetchFlights(requestedRegion)
      if (requestId !== requestIdRef.current) return
      setFlights(data)
      setDataMeta(meta)
      setError(null)
      backoffRef.current = POLL_INTERVAL
    } catch (err) {
      if (requestId !== requestIdRef.current) return
      const msg = err instanceof Error ? err.message : 'Chyba při načítání letů'
      setError(msg)
      setDataMeta((previous) => ({
        ...previous,
        status: previous.fetchedAt ? 'stale' : 'unavailable',
        message: msg,
      }))
      backoffRef.current = Math.min(backoffRef.current * BACKOFF_FACTOR, MAX_BACKOFF)
    } finally {
      if (requestId !== requestIdRef.current) return
      setLoading(false)
      schedule(backoffRef.current, load)
    }
  }, [schedule])

  const setRegion = useCallback((r: string) => {
    regionRef.current = r
    setRegionState(r)
    setFlights([])
    setDataMeta({ status: 'unavailable', source: null, fetchedAt: null })
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

  return { flights, loading, error, count: flights.length, dataMeta, region, setRegion }
}
