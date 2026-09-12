import { NextRequest, NextResponse } from 'next/server'
import airportDetails from '@/data/airport-details.json'
import { checkRateLimit } from '@/lib/rateLimit'

export const revalidate = 86400

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? '127.0.0.1'
  const { allowed, retryAfter } = checkRateLimit(ip, 'airport-details')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, { status: 429 })
  }

  const icao = req.nextUrl.searchParams.get('icao')?.toUpperCase()
  if (!icao || !/^[A-Z0-9-]{3,8}$/.test(icao)) {
    return NextResponse.json({ error: 'Invalid airport code' }, { status: 400 })
  }

  const details = airportDetails[icao as keyof typeof airportDetails]
  if (!details) return NextResponse.json({ error: 'Airport not found' }, { status: 404 })

  return NextResponse.json({
    icao,
    ...details,
    source: 'ourairports.com',
    notice: 'Orientační veřejná data. Pro provozní použití vždy ověřte oficiální AIP.',
  }, {
    headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
  })
}
