import 'server-only'
import { getAeroSnapshot } from './aerodataboxCache'
import { insightRequest, normalizeInsight, type InsightData } from './aeroInsights'

/** Same fixed daily cache as the interactive solar endpoint; no per-visitor paid lookup. */
export async function getPragueSolar(): Promise<InsightData | null> {
  const spec = insightRequest('sun', '')
  if (!spec) return null
  try {
    const snapshot = await getAeroSnapshot<unknown>(spec.path, spec.ttl)
    return { ...normalizeInsight('sun', snapshot.data), fetchedAt: snapshot.fetchedAt }
  } catch (error) {
    console.warn('[prague-solar]', error instanceof Error ? error.message : 'Unavailable')
    return null
  }
}
