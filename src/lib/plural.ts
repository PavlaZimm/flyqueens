/**
 * Čeština počítá ve třech tvarech, ne ve dvou: 1 let, 2 lety, 5 letů.
 * Dvojice singulár/plurál proto u pěti a více vypíše nesmysl („5 lety“).
 *
 * czechPlural(1, 'let', 'lety', 'letů') === 'let'
 * czechPlural(3, 'let', 'lety', 'letů') === 'lety'
 * czechPlural(9, 'let', 'lety', 'letů') === 'letů'
 */
export function czechPlural(count: number, one: string, few: string, many: string): string {
  if (count === 1) return one
  if (count >= 2 && count <= 4) return few
  return many
}
