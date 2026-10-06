// Krátká přestávka po selhání zdroje letových dat.
//
// Bez ní každý požadavek po chybě znovu čeká na timeout (až 4,5 s) a při
// odmítnutí s kódem 429 zdroj dál zbytečně zahlcuje. S přestávkou server
// během několika sekund odpoví hned (poslední známá data nebo rychlá chyba)
// a klient to zkusí znovu.

export class UpstreamError extends Error {
  readonly status: number | null
  readonly retryAfterMs: number | null

  constructor(message: string, status: number | null = null, retryAfterMs: number | null = null) {
    super(message)
    this.name = 'UpstreamError'
    this.status = status
    this.retryAfterMs = retryAfterMs
  }
}

/** Hlavička Retry-After může být počet sekund nebo datum. Neplatnou hodnotu ignorujeme. */
export function parseRetryAfterMs(header: string | null | undefined, now = Date.now()): number | null {
  if (!header) return null
  const trimmed = header.trim()
  if (/^\d+$/.test(trimmed)) return Number(trimmed) * 1000
  const date = Date.parse(trimmed)
  return Number.isFinite(date) ? Math.max(0, date - now) : null
}

/** Zpráva chyby vrácené hned, dokud trvá přestávka. První selhání se loguje, tato už ne. */
export const COOLDOWN_MESSAGE = 'Zdroj dat je krátce v přestávce po selhání'

export const COOLDOWN_AFTER_ERROR_MS = 2_000
export const COOLDOWN_AFTER_429_MS = 10_000
export const COOLDOWN_MAX_MS = 30_000

/**
 * Jak dlouho se po selhání zdroje nemá volat znovu. Při odmítnutí 429 respektujeme
 * Retry-After (nejvýš 30 s), jinak 10 s. Při jiné chybě nebo timeoutu stačí 2 s.
 */
export function cooldownMsFor(errors: unknown[]): number {
  const limited = errors.filter(
    (error): error is UpstreamError => error instanceof UpstreamError && error.status === 429,
  )
  if (limited.length > 0) {
    const asked = Math.max(0, ...limited.map((error) => error.retryAfterMs ?? 0))
    return Math.min(COOLDOWN_MAX_MS, Math.max(COOLDOWN_AFTER_429_MS, asked))
  }
  return COOLDOWN_AFTER_ERROR_MS
}

/** Krátký popis příčin pro log. Výpis celé chyby ani objektu DOMException tam nepatří. */
export function describeCauses(errors: unknown[]): string {
  return errors
    .map((error) => {
      if (error instanceof Error && error.name === 'TimeoutError') return 'timeout'
      if (error instanceof Error) return error.message
      return String(error)
    })
    // Vypnuté zdroje nejsou chyba, jen šum v logu.
    .filter((text) => !/not enabled/i.test(text))
    .join(' | ') || 'bez udané příčiny'
}
