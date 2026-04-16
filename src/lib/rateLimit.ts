// In-memory rate limiter — per IP + per endpoint, server-side only
// Pozn.: na Vercel Serverless může mít každá instance vlastní stav (best-effort ochrana).
// Pro produkční rate limiting zvažte Upstash Redis.

interface Bucket {
  count: number
  resetAt: number
}

// Klíč = `${ip}:${endpoint}` → každý endpoint má vlastní limit
const buckets = new Map<string, Bucket>()

const WINDOW_MS = 60_000

// Limity per endpoint (req/min per IP)
const LIMITS: Record<string, number> = {
  flights:      120,  // polling každých 10s = 6/min, 120 = 20× rezerva
  'flight-route': 30, // kliknutí na letadlo — max 30/min
  metar:         20,
  'atc-stream':  10,
  'atc-check':   30,
  default:       60,
}

export function checkRateLimit(
  ip: string,
  endpoint: string = 'default',
): { allowed: boolean; retryAfter: number } {
  const max = LIMITS[endpoint] ?? LIMITS.default
  const key = `${ip}:${endpoint}`
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  if (entry.count >= max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, retryAfter }
  }

  entry.count++
  return { allowed: true, retryAfter: 0 }
}

// Čištění starých záznamů každých 5 minut
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    buckets.forEach((v, k) => { if (now > v.resetAt) buckets.delete(k) })
  }, 5 * 60_000)
}
