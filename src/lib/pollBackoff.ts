// Prodleva před dalším pokusem o načtení letadel po chybě.
//
// Když už na mapě něco je, nespěcháme: poslední obraz zůstává a prodleva roste
// 20, 40, 60 s (stejně jako dosud). Když ještě nemáme nic (první načtení
// během výpadku), zkusíme to rychle (3, 6, 12, 24, pak každých 30 s), protože
// většina chyb je krátkodobá: timeout nebo chvilku přetížený zdroj.

export const FIRST_LOAD_RETRY_MS = 3_000
export const FIRST_LOAD_MAX_MS = 30_000

export function pollDelayAfterFailure(input: {
  /** Počet selhání po sobě včetně právě proběhlého, nejméně 1. */
  failures: number
  /** Je na mapě už nějaký obraz letadel? */
  hasData: boolean
  /** Běžný interval dotazování. */
  base: number
  /** Nejdelší povolená prodleva. */
  max: number
}): number {
  const failures = Math.max(1, Math.floor(input.failures))
  const { hasData, base, max } = input
  if (hasData) return Math.min(base * 2 ** failures, max)
  return Math.min(FIRST_LOAD_RETRY_MS * 2 ** (failures - 1), FIRST_LOAD_MAX_MS, max)
}
