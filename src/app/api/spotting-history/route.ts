import { NextRequest, NextResponse } from 'next/server'
import { getSpottingHistory } from '@/lib/spottingHistoryServer'
import { checkRateLimit, clientKey } from '@/lib/rateLimit'
export async function GET(request: NextRequest) {
  const limit = checkRateLimit(clientKey(request), 'runway-history')
  if (!limit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } })
  try {
    return NextResponse.json(await getSpottingHistory(), { headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=600' } })
  } catch { return NextResponse.json({ error: 'History unavailable' }, { status: 503 }) }
}
