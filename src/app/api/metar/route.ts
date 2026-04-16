import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export const revalidate = 1800 // cache 30 minut — METAR se mění každou hodinu

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
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
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 1800 },
    })

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
    const visibility = rawVis === '6+' || rawVis === 'P6' ? 10 : (rawVis != null ? Number(rawVis) : null)

    return NextResponse.json({
      icao:      metar.icaoId ?? icao,
      temp:      metar.temp    ?? null,
      dewpoint:  metar.dewp    ?? null,
      windDir,
      windVrb,                              // true = proměnlivý vítr
      windSpeed: metar.wspd    ?? null,     // uzly
      windGust:  metar.wgst    ?? null,     // uzly
      visibility,                           // míle (číslo)
      altimeter: metar.altim   ?? null,     // inHg
      weather:   metar.wxString ?? null,
      clouds:    metar.clouds   ?? [],
      category:  metar.fltcat  ?? null,
      rawMetar:  metar.rawOb   ?? null,
      obsTime:   metar.obsTime ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
