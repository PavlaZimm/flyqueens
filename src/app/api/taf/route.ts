import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, clientKey } from '@/lib/rateLimit'

export const revalidate = 600

interface AwcCloud {
  cover?: string
  base?: number
  type?: string
}

interface AwcForecast {
  timeFrom?: number
  timeTo?: number
  timeBec?: number
  fcstChange?: string
  probability?: number
  wdir?: number | string
  wspd?: number
  wgst?: number
  visib?: string | number
  wxString?: string
  clouds?: AwcCloud[]
}

function timestamp(value: unknown): string | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return new Date(value * 1000).toISOString()
  }
  if (typeof value === 'string' && !Number.isNaN(Date.parse(value))) {
    return new Date(value).toISOString()
  }
  return null
}

export async function GET(req: NextRequest) {
  const ip = clientKey(req)
  const { allowed, retryAfter } = checkRateLimit(ip, 'taf')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, { status: 429 })
  }

  const icao = req.nextUrl.searchParams.get('icao')?.toUpperCase()
  if (!icao || !/^[A-Z0-9]{4}$/.test(icao)) {
    return NextResponse.json({ error: 'Invalid ICAO code' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://aviationweather.gov/api/data/taf?ids=${icao}&format=json`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'FlyQueens/1.0 (+https://www.flyqueens.cz/o-projektu)',
        },
        next: { revalidate: 600 },
        signal: AbortSignal.timeout(6000),
      },
    )

    if (response.status === 204) {
      return NextResponse.json({ error: 'No TAF data' }, { status: 404 })
    }
    if (!response.ok) {
      return NextResponse.json({ error: 'TAF not available' }, { status: 502 })
    }

    const data = await response.json() as Array<{
      icaoId?: string
      issueTime?: string | number
      validTimeFrom?: string | number
      validTimeTo?: string | number
      rawTAF?: string
      fcsts?: AwcForecast[]
    }>
    const taf = Array.isArray(data) ? data[0] : null
    if (!taf) return NextResponse.json({ error: 'No TAF data' }, { status: 404 })

    return NextResponse.json({
      icao: taf.icaoId ?? icao,
      issueTime: timestamp(taf.issueTime),
      validFrom: timestamp(taf.validTimeFrom),
      validTo: timestamp(taf.validTimeTo),
      rawTaf: taf.rawTAF ?? null,
      forecasts: (taf.fcsts ?? []).slice(0, 12).map((forecast) => ({
        from: timestamp(forecast.timeFrom),
        to: timestamp(forecast.timeTo),
        becomingAt: timestamp(forecast.timeBec),
        change: forecast.fcstChange ?? null,
        probability: forecast.probability ?? null,
        windDir: forecast.wdir === 'VRB' ? null : forecast.wdir ?? null,
        windVariable: forecast.wdir === 'VRB',
        windSpeed: forecast.wspd ?? null,
        windGust: forecast.wgst ?? null,
        visibility: forecast.visib ?? null,
        weather: forecast.wxString ?? null,
        clouds: forecast.clouds ?? [],
      })),
      source: 'aviationweather.gov',
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800' },
    })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 502 })
  }
}
