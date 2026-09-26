import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, clientKey } from '@/lib/rateLimit'

export const revalidate = 600 // cache 10 minut — evropské METARy vycházejí po 30 minutách

export async function GET(req: NextRequest) {
  const ip = clientKey(req)
  const { allowed, retryAfter } = checkRateLimit(ip, 'metar')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, { status: 429 })
  }

  const icao = req.nextUrl.searchParams.get('icao')?.toUpperCase()
  if (!icao || !/^[A-Z0-9]{4}$/.test(icao)) {
    return NextResponse.json({ error: 'Invalid ICAO code' }, { status: 400 })
  }

  try {
    const url = `https://aviationweather.gov/api/data/metar?ids=${icao}&format=json&taf=false`
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'FlyQueens/1.0 (+https://www.flyqueens.cz/o-projektu)',
      },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(6000),
    })

    if (res.status === 204) {
      return NextResponse.json({ error: 'No METAR data' }, { status: 404 })
    }

    if (!res.ok) {
      return NextResponse.json({ error: 'METAR not available' }, { status: 502 })
    }

    const data = await res.json()
    const metar = Array.isArray(data) ? data[0] : null

    if (!metar) {
      return NextResponse.json({ error: 'No METAR data' }, { status: 404 })
    }

    // Parsuj a vrať jen co potřebujeme
    // Normalizace windDir — "VRB" = proměnlivý, vrátíme null
    const rawWdir = metar.wdir
    const windDir = (rawWdir === 'VRB' || rawWdir == null) ? null : Number(rawWdir)
    const windVrb = rawWdir === 'VRB'

    // Normalizace visibility — "6+" → 10, číslo nechej být
    const rawVis = metar.visib
    const visNumber = rawVis != null ? Number.parseFloat(String(rawVis).replace(/^P/, '')) : NaN
    const visibility = Number.isFinite(visNumber) ? (/\+|^P/.test(String(rawVis)) ? Math.max(visNumber, 10) : visNumber) : null

    const observationTime = typeof metar.obsTime === 'number'
      ? new Date(metar.obsTime * 1000).toISOString()
      : metar.obsTime ?? null

    return NextResponse.json({
      icao:      metar.icaoId ?? icao,
      temp:      metar.temp    ?? null,
      dewpoint:  metar.dewp    ?? null,
      windDir,
      windVrb,                              // true = proměnlivý vítr
      windSpeed: metar.wspd    ?? null,     // uzly
      windGust:  metar.wgst    ?? null,     // uzly
      visibility,                           // míle (číslo)
      altimeter: metar.altim   ?? null,     // hPa v JSON výstupu Aviation Weather
      weather:   metar.wxString ?? null,
      clouds:    metar.clouds   ?? [],
      category:  metar.fltcat  ?? null,
      rawMetar:  metar.rawOb   ?? null,
      obsTime:   observationTime,
      source:    'aviationweather.gov',
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
