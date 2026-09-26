import { after, NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, clientKey } from '@/lib/rateLimit'
import { getRunwayInUse, RUNWAY_AIRPORTS } from '@/lib/runwayInUse'
import { recordRunwayObservation } from '@/lib/runwayHistory'

export async function GET(req: NextRequest) {
  const ip = clientKey(req)
  const { allowed, retryAfter } = checkRateLimit(ip, 'runway-in-use')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, { status: 429 })
  }

  const icao = req.nextUrl.searchParams.get('airport')?.toUpperCase() ?? ''
  if (!RUNWAY_AIRPORTS[icao]) {
    return NextResponse.json({ error: 'Unsupported airport' }, { status: 400 })
  }

  try {
    const result = await getRunwayInUse(icao)
    if (result) {
      // Zápis do historie až po odeslání odpovědi; výpadek databáze návštěvníka nezdrží.
      after(() => recordRunwayObservation(result).catch((error) => {
        console.error('[runway-in-use] zápis do historie selhal:', error)
      }))
    }
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch {
    return NextResponse.json({ error: 'Live data unavailable' }, { status: 502 })
  }
}
