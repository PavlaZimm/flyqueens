import { NextRequest, NextResponse } from 'next/server'
import { validateFlightSearch, normalizeSearchResults } from '@/lib/flightSearch'
import { getAeroSnapshot } from '@/lib/aerodataboxCache'
import { checkRateLimit, clientKey } from '@/lib/rateLimit'
import type { AeroFlight } from '@/lib/aeroFlight'

export async function GET(request: NextRequest) {
  const input = validateFlightSearch(request.nextUrl.searchParams.get('number') ?? '', request.nextUrl.searchParams.get('date') ?? '')
  if ('error' in input) return NextResponse.json(input, { status: 400 })
  const limit = checkRateLimit(clientKey(request), 'flight-search')
  if (!limit.allowed) return NextResponse.json({ error: 'Příliš mnoho hledání. Zkuste to za chvíli.' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } })
  try {
    const snapshot = await getAeroSnapshot<AeroFlight[]>(`/flights/number/${input.number}/${input.date}?dateLocalRole=Departure&withAircraftImage=false&withLocation=false`, 1800)
    return NextResponse.json({ ...input, flights: normalizeSearchResults(snapshot.data, input.date), fetchedAt: snapshot.fetchedAt }, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch {
    return NextResponse.json({ error: 'Vyhledávání je dočasně nedostupné nebo dosáhlo denního limitu. Ověřte let u dopravce či letiště; nejde o potvrzení zrušení letu.' }, { status: 503 })
  }
}
