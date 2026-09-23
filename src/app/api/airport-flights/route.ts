import { NextRequest, NextResponse } from 'next/server'
import { getAirportBoard } from '@/lib/airportBoardServer'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? '127.0.0.1'
  const { allowed, retryAfter } = checkRateLimit(ip, 'airport-flights')
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter }, {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) },
    })
  }

  const iata = (request.nextUrl.searchParams.get('airport') ?? '').trim().toUpperCase()
  const board = await getAirportBoard(iata)
  if (!board) return NextResponse.json({ error: 'Unsupported airport' }, { status: 400 })

  if (board.status === 'unavailable') return NextResponse.json(board, { status: 502 })
  return NextResponse.json(board, {
    headers: {
      'Cache-Control': board.status === 'unconfigured'
        ? 'public, max-age=300, stale-while-revalidate=3600'
        : 'public, max-age=60, stale-while-revalidate=600',
    },
  })
}
