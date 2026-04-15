// ICAO callsign prefix (3 písmena) → IATA airline kód (2 písmena) pro logo
const ICAO_TO_IATA: Record<string, string> = {
  // Česko
  'CSA': 'OK', 'TVS': 'QS',
  // Německo
  'DLH': 'LH', 'GEC': 'LH', 'EWG': 'EW', 'CLH': 'CL', 'CFG': 'DE',
  'BER': 'X9', 'TUI': 'X3', 'DCS': 'EW', 'SCW': 'LH',
  // Rakousko
  'AUA': 'OS', 'LDM': 'OS',
  // Polsko
  'LOT': 'LO', 'RGN': 'LO',
  // Irsko
  'RYR': 'FR', 'EIN': 'EI',
  // UK
  'BAW': 'BA', 'EZY': 'U2', 'TCX': 'MT', 'VIR': 'VS',
  'TOM': 'BY', 'EXS': 'LS',
  // Francie
  'AFR': 'AF', 'HOP': 'A5', 'TVF': 'TO',
  // Nizozemsko
  'KLM': 'KL', 'TRA': 'HV', 'MPH': 'MP',
  // Švýcarsko
  'SWR': 'LX', 'EZS': 'DS',
  // Skandinávie
  'SAS': 'SK', 'NAX': 'DY', 'FIN': 'AY', 'IBK': 'FI', 'NOR': 'DY',
  // Španělsko
  'IBE': 'IB', 'VLG': 'VY', 'IBS': 'I2', 'ANE': 'YW',
  // Itálie
  'AZA': 'AZ', 'ITY': 'AZ', 'MSA': 'XM',
  // Řecko
  'SKY': 'GQ', 'AEE': 'A3', 'OAL': 'OA',
  // Turecko
  'THY': 'TK', 'PGT': 'PC', 'TKF': 'TK',
  // USA
  'AAL': 'AA', 'DAL': 'DL', 'UAL': 'UA',
  // Blízký východ
  'UAE': 'EK', 'QTR': 'QR', 'ETH': 'ET', 'SVA': 'SV',
  // Maďarsko
  'MAH': 'W6',
  // Slovensko
  'SLK': 'OM',
  // Belgie
  'BEL': 'SN',
  // Wizz
  'WZZ': 'W6',
}

/** Vrátí URL loga dopravce (pics.avs.io CDN) nebo null pokud neznáme IATA kód */
export function getAirlineLogoUrl(callsign: string): string | null {
  const prefix = callsign.trim().replace(/\d+.*$/, '').toUpperCase()
  const iata = ICAO_TO_IATA[prefix]
  if (!iata) return null
  return `https://pics.avs.io/200/200/${iata}.png`
}

/** Vrátí IATA kód dopravce (2 písmena) nebo null */
export function getAirlineIata(callsign: string): string | null {
  const prefix = callsign.trim().replace(/\d+.*$/, '').toUpperCase()
  return ICAO_TO_IATA[prefix] ?? null
}
