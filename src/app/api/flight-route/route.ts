import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import { airports } from '@/lib/airportData'

export const revalidate = 120  // cache 2 minuty

// Haversine vzdálenost v km
function distKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dL = (lat2 - lat1) * Math.PI / 180
  const dG = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dL/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dG/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

// Nejbližší letiště k dané pozici (v okruhu maxDist km)
function nearestAirport(lat: number, lng: number, maxDist = 80) {
  let best: typeof airports[0] | null = null
  let bestD = Infinity
  for (const ap of airports) {
    const d = distKm(lat, lng, ap.lat, ap.lng)
    if (d < bestD) { bestD = d; best = ap }
  }
  return bestD <= maxDist ? best : null
}

// Projekce pozice dopředu po ortodromě (přibližná)
function projectPosition(lat: number, lng: number, headingDeg: number, distKm: number) {
  const R = 6371
  const d = distKm / R
  const h = headingDeg * Math.PI / 180
  const lat1 = lat * Math.PI / 180
  const lng1 = lng * Math.PI / 180
  const lat2 = Math.asin(Math.sin(lat1)*Math.cos(d) + Math.cos(lat1)*Math.sin(d)*Math.cos(h))
  const lng2 = lng1 + Math.atan2(Math.sin(h)*Math.sin(d)*Math.cos(lat1), Math.cos(d)-Math.sin(lat1)*Math.sin(lat2))
  return { lat: lat2 * 180/Math.PI, lng: lng2 * 180/Math.PI }
}

// Letiště nejbližší projekci dopředu (odhad příletu)
function estimateArrival(lat: number, lng: number, headingDeg: number) {
  // Zkus různé vzdálenosti dopředu (krátká i dlouhá trasa)
  const candidates: { ap: typeof airports[0], dist: number }[] = []
  for (const tryDist of [300, 600, 900, 1500, 2500]) {
    const proj = projectPosition(lat, lng, headingDeg, tryDist)
    const ap = nearestAirport(proj.lat, proj.lng, 120)
    if (ap) {
      candidates.push({ ap, dist: tryDist })
      break
    }
  }
  return candidates[0]?.ap ?? null
}

interface OpenSkyTrack {
  icao24: string
  startTime: number
  endTime: number
  callsign: string | null
  path: [number, number, number, number, number | null, boolean][] // [time, lat, lng, alt, heading, onGround]
}

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

  // Volitelné: aktuální pozice letadla pro odhad příletu (předávají se z klienta)
  const curLat = parseFloat(req.nextUrl.searchParams.get('lat') ?? 'NaN')
  const curLng = parseFloat(req.nextUrl.searchParams.get('lng') ?? 'NaN')
  const curHdg = parseFloat(req.nextUrl.searchParams.get('heading') ?? 'NaN')

  const user = process.env.OPENSKY_USERNAME
  const pass = process.env.OPENSKY_PASSWORD
  if (!user || !pass) {
    return NextResponse.json({ error: 'OpenSky credentials missing' }, { status: 503 })
  }

  const auth = Buffer.from(`${user}:${pass}`).toString('base64')
  const now = Math.floor(Date.now() / 1000)

  try {
    // /tracks/all vrací GPS stopu aktuálního letu — spolehlivější než /flights/aircraft
    const tracksUrl = `https://opensky-network.org/api/tracks/all?icao24=${icao24}&time=${now}`
    const res = await fetch(tracksUrl, {
      headers: { Authorization: `Basic ${auth}`, Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    })

    if (res.status === 401) return NextResponse.json({ error: 'Auth failed' }, { status: 503 })
    if (!res.ok) return NextResponse.json({ route: null })

    const track: OpenSkyTrack = await res.json()

    if (!track?.path?.length) return NextResponse.json({ route: null })

    // ── Odlet: první bod kde bylo letadlo na zemi nebo velmi nízko ──
    let depAirport: typeof airports[0] | null = null
    for (const point of track.path) {
      const [, lat, lng, alt, , onGround] = point
      if (lat == null || lng == null) continue
      if (onGround || alt < 200) {
        depAirport = nearestAirport(lat, lng, 60)
        if (depAirport) break
      }
    }

    // Fallback: první bod stopy
    if (!depAirport && track.path[0]) {
      const [, lat, lng] = track.path[0]
      if (lat != null && lng != null) depAirport = nearestAirport(lat, lng, 150)
    }

    // ── Přilet: odhad z aktuální pozice + kurzu ──
    let arrAirport: typeof airports[0] | null = null
    if (!isNaN(curLat) && !isNaN(curLng) && !isNaN(curHdg)) {
      arrAirport = estimateArrival(curLat, curLng, curHdg)
    }

    // Pokud nemáme aktuální pozici, použij poslední bod stopy
    if (!arrAirport && track.path.length > 0) {
      const last = track.path[track.path.length - 1]
      const [, lat, lng, , hdg] = last
      if (lat != null && lng != null && hdg != null) {
        arrAirport = estimateArrival(lat, lng, hdg)
      }
    }

    // Nesměj přilét = odlet
    if (arrAirport?.icao === depAirport?.icao) arrAirport = null

    return NextResponse.json({
      route: {
        departure: depAirport?.icao ?? null,
        arrival: arrAirport?.icao ?? null,
      },
    })

  } catch {
    return NextResponse.json({ route: null })
  }
}
