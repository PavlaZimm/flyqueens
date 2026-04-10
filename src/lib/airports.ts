// ICAO callsign prefix → nejbližší domovské letiště
// Zkrácená lookup tabulka pro střední Evropu
export const AIRLINE_TO_AIRPORT: Record<string, { iata: string; name: string }> = {
  // Česko
  'CSA': { iata: 'PRG', name: 'Praha' },
  'TVS': { iata: 'PRG', name: 'Praha' },
  // Německo
  'DLH': { iata: 'FRA', name: 'Frankfurt' },
  'EWG': { iata: 'DUS', name: 'Düsseldorf' },
  'GEC': { iata: 'FRA', name: 'Frankfurt' },
  'CFG': { iata: 'CGN', name: 'Köln' },
  'LHA': { iata: 'MUC', name: 'Mnichov' },
  'BER': { iata: 'BER', name: 'Berlín' },
  'TUI': { iata: 'HAJ', name: 'Hannover' },
  // Rakousko
  'AUA': { iata: 'VIE', name: 'Vídeň' },
  // Polsko
  'LOT': { iata: 'WAW', name: 'Varšava' },
  // Irsko
  'RYR': { iata: 'DUB', name: 'Dublin' },
  'EIN': { iata: 'DUB', name: 'Dublin' },
  // UK
  'BAW': { iata: 'LHR', name: 'Londýn' },
  'EZY': { iata: 'LTN', name: 'Londýn' },
  'TCX': { iata: 'LGW', name: 'Londýn' },
  // Francie
  'AFR': { iata: 'CDG', name: 'Paříž' },
  'HOP': { iata: 'CDG', name: 'Paříž' },
  // Nizozemsko
  'KLM': { iata: 'AMS', name: 'Amsterdam' },
  'TRA': { iata: 'AMS', name: 'Amsterdam' },
  // Švýcarsko
  'SWR': { iata: 'ZRH', name: 'Curych' },
  'EZS': { iata: 'BSL', name: 'Basilej' },
  // Skandinávie
  'SAS': { iata: 'CPH', name: 'Kodaň' },
  'NAX': { iata: 'OSL', name: 'Oslo' },
  // Španělsko
  'IBE': { iata: 'MAD', name: 'Madrid' },
  'VLG': { iata: 'BCN', name: 'Barcelona' },
  // Itálie
  'AZA': { iata: 'MXP', name: 'Milán' },
  'ITY': { iata: 'FCO', name: 'Řím' },
  // Řecko
  'SKY': { iata: 'ATH', name: 'Atény' },
  'AEE': { iata: 'ATH', name: 'Atény' },
  // Turecko
  'THY': { iata: 'IST', name: 'Istanbul' },
  'TKF': { iata: 'IST', name: 'Istanbul' },
  // USA
  'AAL': { iata: 'JFK', name: 'New York' },
  'DAL': { iata: 'ATL', name: 'Atlanta' },
  'UAL': { iata: 'ORD', name: 'Chicago' },
  // Blízký východ
  'UAE': { iata: 'DXB', name: 'Dubaj' },
  'QTR': { iata: 'DOH', name: 'Doha' },
}

export function getAirportFromCallsign(callsign: string): { iata: string; name: string } | null {
  const prefix = callsign.trim().replace(/\d+.*$/, '').toUpperCase()
  return AIRLINE_TO_AIRPORT[prefix] ?? null
}

// Výpočet přibližného cíle podle heading + origin
export function guessDestination(
  originIata: string,
  heading: number
): { iata: string; name: string } {
  // Jednoduchá heuristika podle směru letu
  if (heading >= 315 || heading < 45) return { iata: 'CPH', name: 'Kodaň' }
  if (heading >= 45 && heading < 90)  return { iata: 'WAW', name: 'Varšava' }
  if (heading >= 90 && heading < 135) return { iata: 'BUD', name: 'Budapešť' }
  if (heading >= 135 && heading < 180) return { iata: 'ATH', name: 'Atény' }
  if (heading >= 180 && heading < 225) return { iata: 'FCO', name: 'Řím' }
  if (heading >= 225 && heading < 270) return { iata: 'MAD', name: 'Madrid' }
  if (heading >= 270 && heading < 315) return { iata: 'LHR', name: 'Londýn' }
  return { iata: '???', name: 'Neznámý' }
}
