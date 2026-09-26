// In-memory rate limiter — per IP + per endpoint, server-side only
// Pozn.: na Vercel Serverless může mít každá instance vlastní stav (best-effort ochrana).
// Pro produkční rate limiting zvažte Upstash Redis.

import type { NextRequest } from 'next/server'

interface Bucket {
  count: number
  resetAt: number
}

// Klíč = `${ip}:${endpoint}` → každý endpoint má vlastní limit
const buckets = new Map<string, Bucket>()

const WINDOW_MS = 60_000

// Limity per endpoint (req/min per IP)
const LIMITS: Record<string, number> = {
  flights:       30,
  'flight-summary': 60,
  'flight-route': 30, // kliknutí na letadlo — max 30/min
  'airport-flights': 30,
  'runway-in-use': 20,
  'runway-history': 20,
  metar:         20,
  taf:           20,
  'airport-details': 30,
  'atc-stream':  10,
  'atc-check':   10,
  default:       60,
}

// Strop na endpoint bez ohledu na volajícího (req/min, na instanci).
// Chrání placené API a databázi i tehdy, když někdo střídá identitu.
const GLOBAL_LIMITS: Record<string, number> = {
  'flight-route':  300, // placené volání AeroDataBox za každý nový icao24
  'runway-in-use': 200, // zápis do Neonu
  'airport-flights': 200,
  flights:         600,
  default:         900,
}

/**
 * Identita volajícího pro počítadlo.
 *
 * Vercel hlavičku `x-forwarded-for` přepisuje a cizí IP nepropouští, takže
 * v produkci podvrhnout nejde. Mimo Vercel ale podvrhnout lze, proto bereme
 * hlavičky od proxy (`x-vercel-forwarded-for`, `x-real-ip`) a z `x-forwarded-for`
 * až poslední položku, kterou přidal nejbližší proxy server, nikoli první,
 * kterou si posílá sám klient.
 */
export function clientKey(req: NextRequest): string {
  const vercel = req.headers.get('x-vercel-forwarded-for')?.split(',').pop()?.trim()
  if (vercel) return vercel
  const real = req.headers.get('x-real-ip')?.trim()
  if (real) return real
  const forwarded = req.headers.get('x-forwarded-for')?.split(',').map(part => part.trim()).filter(Boolean) ?? []
  return forwarded[forwarded.length - 1] ?? '127.0.0.1'
}

function consume(key: string, max: number): { allowed: boolean; retryAfter: number } {
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

export function checkRateLimit(
  ip: string,
  endpoint: string = 'default',
): { allowed: boolean; retryAfter: number } {
  // Nejdřív strop celého endpointu: ten platí i pro volajícího, který střídá IP.
  const global = consume(`*:${endpoint}`, GLOBAL_LIMITS[endpoint] ?? GLOBAL_LIMITS.default)
  if (!global.allowed) return global

  return consume(`${ip}:${endpoint}`, LIMITS[endpoint] ?? LIMITS.default)
}

// Čištění starých záznamů každých 5 minut
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    buckets.forEach((v, k) => { if (now > v.resetAt) buckets.delete(k) })
  }, 5 * 60_000)
}
