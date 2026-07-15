// ICAO callsign prefix (3 písmena) → název aerolinky
const ICAO_TO_NAME: Record<string, string> = {
  // Česko / Slovensko
  CSA: 'ČSA', TVS: 'Smartwings', SLK: 'Air Slovakia',
  // Německo
  DLH: 'Lufthansa', GEC: 'Lufthansa Cargo', EWG: 'Eurowings', CLH: 'Lufthansa CityLine',
  CFG: 'Condor', BER: 'Air Berlin', TUI: 'TUI fly', DCS: 'Eurowings', SCW: 'Lufthansa',
  // Rakousko
  AUA: 'Austrian', LDM: 'Austrian',
  // Polsko / Maďarsko
  LOT: 'LOT', RGN: 'LOT', MAH: 'Wizz Air', WZZ: 'Wizz Air',
  // Irsko / UK
  RYR: 'Ryanair', EIN: 'Aer Lingus', BAW: 'British Airways', EZY: 'easyJet',
  EXS: 'Jet2', TOM: 'TUI Airways', VIR: 'Virgin Atlantic', TCX: 'Thomas Cook',
  // Francie / Benelux
  AFR: 'Air France', HOP: 'Air France Hop', TVF: 'Transavia France',
  KLM: 'KLM', TRA: 'Transavia', BEL: 'Brussels Airlines',
  // Švýcarsko
  SWR: 'SWISS', EZS: 'easyJet Switzerland',
  // Skandinávie / Finsko
  SAS: 'SAS', NAX: 'Norwegian', NOR: 'Norwegian', FIN: 'Finnair', IBK: 'Icelandair',
  // Španělsko / Portugalsko / Itálie
  IBE: 'Iberia', VLG: 'Vueling', ANE: 'Air Nostrum', IBS: 'Iberia Express',
  AZA: 'ITA Airways', ITY: 'ITA Airways', TAP: 'TAP Portugal',
  // Řecko / Turecko
  AEE: 'Aegean', OAL: 'Olympic', THY: 'Turkish Airlines', PGT: 'Pegasus', TKF: 'Turkish',
  // USA
  AAL: 'American', DAL: 'Delta', UAL: 'United', FDX: 'FedEx', UPS: 'UPS',
  // Blízký východ / Asie
  UAE: 'Emirates', QTR: 'Qatar Airways', ETD: 'Etihad', SVA: 'Saudia',
  ETH: 'Ethiopian', ELY: 'El Al', DLQ: 'DHL', BOX: 'AeroLogic',
}

/** Vrátí název aerolinky z callsignu (nebo raw prefix, pokud neznáme) */
export function getAirlineName(callsign: string): string {
  const prefix = callsign.trim().replace(/\d+.*$/, '').toUpperCase().slice(0, 3)
  return ICAO_TO_NAME[prefix] ?? prefix
}
