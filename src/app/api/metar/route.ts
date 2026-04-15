import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 1800 // cache 30 minut — METAR se mění každou hodinu

export async function GET(req: NextRequest) {
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
    return NextResponse.json({
      icao:      metar.icaoId ?? icao,
      temp:      metar.temp    ?? null,   // °C
      dewpoint:  metar.dewp    ?? null,   // °C
      windDir:   metar.wdir    ?? null,   // stupně
      windSpeed: metar.wspd    ?? null,   // uzly
      windGust:  metar.wgst    ?? null,   // uzly
      visibility: metar.visib  ?? null,   // míle
      altimeter: metar.altim   ?? null,   // inHg → převedeme na hPa
      weather:   metar.wxString ?? null,  // RA, FG, TSRA...
      clouds:    metar.clouds   ?? [],    // [{cover, base}]
      category:  metar.fltcat  ?? null,   // VFR / MVFR / IFR / LIFR
      rawMetar:  metar.rawOb   ?? null,
      obsTime:   metar.obsTime ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
