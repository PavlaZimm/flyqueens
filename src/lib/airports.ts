// ICAO callsign prefix → domovské letiště
export const AIRLINE_TO_AIRPORT: Record<string, { iata: string; name: string }> = {
  // Česko
  'CSA': { iata: 'PRG', name: 'Praha' }, 'TVS': { iata: 'PRG', name: 'Praha' },
  'SCX': { iata: 'PRG', name: 'Praha' }, 'QSC': { iata: 'PRG', name: 'Praha' },
  // Německo
  'DLH': { iata: 'FRA', name: 'Frankfurt' }, 'GEC': { iata: 'FRA', name: 'Frankfurt' },
  'EWG': { iata: 'DUS', name: 'Düsseldorf' }, 'CFG': { iata: 'CGN', name: 'Köln' },
  'LHA': { iata: 'MUC', name: 'Mnichov' }, 'BER': { iata: 'BER', name: 'Berlín' },
  'TUI': { iata: 'HAJ', name: 'Hannover' }, 'CLH': { iata: 'MUC', name: 'Mnichov' },
  'DCS': { iata: 'DUS', name: 'Düsseldorf' }, 'HHN': { iata: 'HHN', name: 'Frankfurt-Hahn' },
  'SCW': { iata: 'FRA', name: 'Frankfurt' }, 'OAW': { iata: 'CGN', name: 'Köln' },
  // Rakousko
  'AUA': { iata: 'VIE', name: 'Vídeň' }, 'LDM': { iata: 'VIE', name: 'Vídeň' },
  'ICV': { iata: 'VIE', name: 'Vídeň' },
  // Polsko
  'LOT': { iata: 'WAW', name: 'Varšava' }, 'RGN': { iata: 'WAW', name: 'Varšava' },
  'SHY': { iata: 'KRK', name: 'Krakov' },
  // Irsko
  'RYR': { iata: 'DUB', name: 'Dublin' }, 'EIN': { iata: 'DUB', name: 'Dublin' },
  // UK
  'BAW': { iata: 'LHR', name: 'Londýn' }, 'EZY': { iata: 'LTN', name: 'Londýn Luton' },
  'TCX': { iata: 'LGW', name: 'Londýn Gatwick' }, 'VIR': { iata: 'LHR', name: 'Londýn' },
  'TOM': { iata: 'MAN', name: 'Manchester' }, 'WZZ': { iata: 'LTN', name: 'Londýn Luton' },
  'EXS': { iata: 'MAN', name: 'Manchester' }, 'JES': { iata: 'LGW', name: 'Londýn Gatwick' },
  // Francie
  'AFR': { iata: 'CDG', name: 'Paříž CDG' }, 'HOP': { iata: 'CDG', name: 'Paříž CDG' },
  'TVF': { iata: 'ORY', name: 'Paříž Orly' }, 'XKE': { iata: 'CDG', name: 'Paříž CDG' },
  // Nizozemsko
  'KLM': { iata: 'AMS', name: 'Amsterdam' }, 'TRA': { iata: 'AMS', name: 'Amsterdam' },
  'MPH': { iata: 'AMS', name: 'Amsterdam' },
  // Švýcarsko
  'SWR': { iata: 'ZRH', name: 'Curych' }, 'EZS': { iata: 'BSL', name: 'Basilej' },
  'BEE': { iata: 'ZRH', name: 'Curych' },
  // Skandinávie
  'SAS': { iata: 'CPH', name: 'Kodaň' }, 'NAX': { iata: 'OSL', name: 'Oslo' },
  'NOR': { iata: 'OSL', name: 'Oslo' }, 'FIN': { iata: 'HEL', name: 'Helsinky' },
  'IBK': { iata: 'ARN', name: 'Stockholm' }, 'NLH': { iata: 'ARN', name: 'Stockholm' },
  // Španělsko
  'IBE': { iata: 'MAD', name: 'Madrid' }, 'VLG': { iata: 'BCN', name: 'Barcelona' },
  'ANE': { iata: 'MAD', name: 'Madrid' }, 'YW': { iata: 'MAD', name: 'Madrid' },
  'IBS': { iata: 'MAD', name: 'Madrid' },
  // Itálie
  'AZA': { iata: 'MXP', name: 'Milán' }, 'ITY': { iata: 'FCO', name: 'Řím' },
  'VCE': { iata: 'VCE', name: 'Benátky' }, 'MSA': { iata: 'MXP', name: 'Milán' },
  // Řecko
  'SKY': { iata: 'ATH', name: 'Atény' }, 'AEE': { iata: 'ATH', name: 'Atény' },
  'OAL': { iata: 'ATH', name: 'Atény' },
  // Turecko
  'THY': { iata: 'IST', name: 'Istanbul' }, 'TKF': { iata: 'IST', name: 'Istanbul' },
  'PGT': { iata: 'SAW', name: 'Istanbul Sabiha' }, 'AnadoluJet': { iata: 'IST', name: 'Istanbul' },
  // USA
  'AAL': { iata: 'JFK', name: 'New York' }, 'DAL': { iata: 'ATL', name: 'Atlanta' },
  'UAL': { iata: 'ORD', name: 'Chicago' }, 'AWE': { iata: 'PHL', name: 'Philadelphia' },
  // Blízký východ
  'UAE': { iata: 'DXB', name: 'Dubaj' }, 'QTR': { iata: 'DOH', name: 'Doha' },
  'ETH': { iata: 'ADD', name: 'Addis Abeba' }, 'SVA': { iata: 'RUH', name: 'Rijád' },
  // Maďarsko
  'MAH': { iata: 'BUD', name: 'Budapešť' },
  // Slovensko
  'SLK': { iata: 'BTS', name: 'Bratislava' },
  // Belgie
  'BEL': { iata: 'BRU', name: 'Brusel' }, 'BCY': { iata: 'BRU', name: 'Brusel' },
  // Rusko
  'AFL': { iata: 'SVO', name: 'Moskva' }, 'SDM': { iata: 'SVO', name: 'Moskva' },
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
