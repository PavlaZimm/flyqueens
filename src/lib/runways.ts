import airportDetails from '@/data/airport-details.json'

// Dráhy pocházejí ze stejného datasetu jako zbytek letištních detailů
// (src/data/airport-details.json, generováno scripts/generate-airport-details.mjs).
// Délky a šířky jsou ve stopách, označení dráhy nese magnetický kurz.

const FEET_TO_METRES = 0.3048

// Platný ident je "06/24", "10L/28R" apod. Dataset obsahuje i zástupné
// záznamy typu "XX/XX" bez rozměrů — ty do grafiky ani do textu nepatří.
const IDENT_PATTERN = /^(\d{2})([LRC]?)\/(\d{2})([LRC]?)$/

const SURFACE_LABELS: Record<string, string> = {
  CON: 'beton',
  CONC: 'beton',
  CONCRETE: 'beton',
  ASP: 'asfalt',
  ASPH: 'asfalt',
  ASPHALT: 'asfalt',
  GRASS: 'tráva',
  GRS: 'tráva',
  GRAVEL: 'štěrk',
}

interface RawRunway {
  ident: string
  lengthFt: number | null
  widthFt: number | null
  surface: string | null
  lighted: boolean
  closed: boolean
}

export interface Runway {
  /** Označení obou prahů, např. "06/24". */
  ident: string
  /** Práh, na který se přistává s nižším kurzem, např. "06". */
  lowEnd: string
  /** Opačný práh, např. "24". */
  highEnd: string
  /** Magnetický kurz nižšího prahu ve stupních (06 → 60). */
  headingDeg: number
  lengthM: number
  widthM: number | null
  surface: string | null
  lighted: boolean
  closed: boolean
}

function surfaceLabel(surface: string | null): string | null {
  if (!surface) return null
  return SURFACE_LABELS[surface.toUpperCase()] ?? surface.toLowerCase()
}

/**
 * Dráhy letiště seřazené od nejdelší. Záznamy bez použitelného označení nebo
 * délky se zahazují — raději méně řádků než vymyšlené číslo.
 */
export function runwaysFor(icao: string): Runway[] {
  const record = (airportDetails as Record<string, { runways?: RawRunway[] } | undefined>)[icao]
  if (!record?.runways) return []

  return record.runways
    .flatMap((runway): Runway[] => {
      const match = IDENT_PATTERN.exec(runway.ident?.trim() ?? '')
      if (!match || !runway.lengthFt) return []

      const [, lowNumber, lowSide, highNumber, highSide] = match
      const heading = Number(lowNumber) * 10
      if (!Number.isFinite(heading)) return []

      return [{
        ident: runway.ident.trim(),
        lowEnd: `${lowNumber}${lowSide}`,
        highEnd: `${highNumber}${highSide}`,
        headingDeg: heading,
        // Na 5 metrů, ať data nepředstírají přesnost, kterou převod ze stop nemá.
        lengthM: Math.round((runway.lengthFt * FEET_TO_METRES) / 5) * 5,
        widthM: runway.widthFt ? Math.round(runway.widthFt * FEET_TO_METRES) : null,
        surface: surfaceLabel(runway.surface),
        lighted: Boolean(runway.lighted),
        closed: Boolean(runway.closed),
      }]
    })
    .sort((a, b) => b.lengthM - a.lengthM)
}

/** Nejdelší provozovaná dráha, pro rychlá fakta na stránce letiště. */
export function mainRunway(icao: string): Runway | undefined {
  return runwaysFor(icao).find((runway) => !runway.closed)
}
