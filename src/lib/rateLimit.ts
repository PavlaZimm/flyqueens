// In-memory rate limiter — per IP, server-side only
// Max 30 requests per minute per IP (app polls every 5s = 12/min normal use)

const requests = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 30

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now()
  const entry = requests.get(ip)

  if (!entry || now > entry.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  if (entry.count >= MAX_PER_WINDOW) {
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
    requests.forEach((v, k) => { if (now > v.resetAt) requests.delete(k) })
  }, 5 * 60_000)
}
