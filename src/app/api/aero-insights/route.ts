import { solarInsight } from '@/lib/pragueLight'
import { NextRequest, NextResponse } from 'next/server'
import { insightRequest, normalizeInsight } from '@/lib/aeroInsights'
import { getAeroSnapshot } from '@/lib/aerodataboxCache'
import { checkRateLimit, clientKey } from '@/lib/rateLimit'
export async function GET(request: NextRequest) {
  const limit = checkRateLimit(clientKey(request), 'aero-insights')
  if (!limit.allowed) return NextResponse.json({ error: 'Příliš mnoho dotazů. Zkuste to za chvíli.' }, { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } })
  if (request.nextUrl.searchParams.get('kind') === 'sun') return NextResponse.json(solarInsight(), { headers: { 'Cache-Control': 'private, no-store' } })
  const spec = insightRequest(request.nextUrl.searchParams.get('kind') ?? '', request.nextUrl.searchParams.get('id') ?? '')
  if (!spec) return NextResponse.json({ error: 'Neplatný dotaz.' }, { status: 400 })
  try {
    const snapshot = await getAeroSnapshot<unknown>(spec.path, spec.ttl)
    return NextResponse.json({ ...normalizeInsight(spec.kind, snapshot.data), fetchedAt: snapshot.fetchedAt }, { headers: { 'Cache-Control': 'private, no-store' } })
  } catch {
    return NextResponse.json({ error: 'Podrobnosti teď nejsou dostupné: zdroj mohl dotaz odmítnout, nebo jsme dosáhli denního limitu. Základní údaje najdete výše.' }, { status: 503 })
  }
}
