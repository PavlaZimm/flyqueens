import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export const revalidate = 60  // cache 60s — trasa se nemění

// OpenSky /flights/aircraft — vrátí odlet + přilet pro konkrétní letadlo
// Hledáme v okně posledních 6 hodin
export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
  const { allowed, retryAfter } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, { status: 429 })
  }

  const icao24 = req.nextUrl.searchParams.get('icao24')?.toLowerCase()
  if (!icao24 || !/^[0-9a-f]{6}$/.test(icao24)) {
    return NextResponse.json({ error: 'Invalid icao24' }, { status: 400 })
  }

  const now   = Math.floor(Date.now() / 1000)
  const begin = now - 6 * 3600  // 6 hodin zpět

  const user = process.env.OPENSKY_USERNAME
  const pass = process.env.OPENSKY_PASSWORD

  if (!user || !pass) {
    return NextResponse.json({ error: 'OpenSky credentials missing' }, { status: 503 })
  }

  try {
    const auth = Buffer.from(`${user}:${pass}`).toString('base64')
    const url  = `https://opensky-network.org/api/flights/aircraft?icao24=${icao24}&begin=${begin}&end=${now}`

    const res = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(8000),
    })

    if (res.status === 401) return NextResponse.json({ error: 'Auth failed' }, { status: 503 })
    if (res.status === 404 || res.status === 204) return NextResponse.json({ route: null })
    if (!res.ok) return NextResponse.json({ route: null })

    const data: OpenSkyFlight[] = await res.json()
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ route: null })
    }

    // Nejnovější záznam — seřaď podle firstSeen sestupně
    const sorted = [...data].sort((a, b) => b.firstSeen - a.firstSeen)
    const flight = sorted[0]

    return NextResponse.json({
      route: {
        departure: flight.estDepartureAirport ?? null,
        arrival:   flight.estArrivalAirport   ?? null,
        firstSeen: flight.firstSeen,
        lastSeen:  flight.lastSeen,
        callsign:  flight.callsign?.trim() ?? null,
      },
    })
  } catch {
    return NextResponse.json({ route: null })
  }
}

interface OpenSkyFlight {
  icao24: string
  firstSeen: number
  estDepartureAirport: string | null
  lastSeen: number
  estArrivalAirport: string | null
  callsign: string | null
  estDepartureAirportHorizDistance: number
  estArrivalAirportHorizDistance: number
}
