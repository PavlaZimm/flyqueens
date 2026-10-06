// Ochrana databáze před častým dotazováním.
//
// Zápis historie dráhy se v databázi omezuje na jedno měření za 15 minut,
// jenže samotná kontrola „už jsme dnes měřili?" je dotaz, který databázi
// Neon probudí. Kdyby se endpoint volal každých pár minut (externí hlídač,
// nebo cizí volání s dalším parametrem v adrese, které obejde CDN cache),
// databáze by neusínala a vyčerpala bezplatný limit výpočetního času.
//
// Proto si každá instance serveru pamatuje, kdy se naposled na databázi
// ptala, a dalších čtrnáct minut se neptá vůbec. Pamatuje se v paměti, takže
// je to hrubá, ale levná pojistka. Přesné pravidlo „jedno měření za 15 minut"
// dál hlídá databáze.

export function createThrottle(gapMs: number) {
  const lastClaimAt = new Map<string, number>()
  return {
    /** Vrátí true, když se smí pokračovat, a zapamatuje si čas. Jinak false. */
    claim(key: string, now = Date.now()): boolean {
      const last = lastClaimAt.get(key)
      if (last !== undefined && now - last < gapMs) return false
      lastClaimAt.set(key, now)
      return true
    },
    /** Po chybě uvolní místo, aby se další pokus mohl zkusit dřív. */
    release(key: string): void {
      lastClaimAt.delete(key)
    },
  }
}

/** O minutu méně než 15minutová mezera v databázi, aby pravidelné měření nikdy nepřeskočilo. */
export const runwaySampleThrottle = createThrottle(14 * 60_000)
