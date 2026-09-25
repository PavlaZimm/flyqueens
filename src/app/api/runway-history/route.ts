import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import { RUNWAY_AIRPORTS } from '@/lib/runwayInUse'
import { getRunwayHistory } from '@/lib/runwayHistory'

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
  const { allowed, retryAfter } = checkRateLimit(ip, 'runway-history')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, { status: 429 })
  }

  const icao = req.nextUrl.searchParams.get('airport')?.toUpperCase() ?? ''
  if (!RUNWAY_AIRPORTS[icao]) {
    return NextResponse.json({ error: 'Unsupported airport' }, { status: 400 })
  }

  try {
    const history = await getRunwayHistory(icao)
    return NextResponse.json(history, {
      headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600' },
    })
  } catch (error) {
    console.error('[runway-history] čtení historie selhalo:', error)
    return NextResponse.json({ error: 'History unavailable' }, { status: 502 })
  }
}
