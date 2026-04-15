// LiveATC.net stream databáze pro středoevropská letiště
// Stream URLs: https://s1.liveatc.net/{feed} — formát MP3 live stream
// Záložní odkaz: https://www.liveatc.net/search/?icao={ICAO}

export interface AtcFeed {
  label: string          // název frekvenece / pásma
  url:   string          // přímý MP3 stream
}

const ATC_FEEDS: Record<string, AtcFeed[]> = {
  // Česko
  'LKPR': [
    { label: 'Praha Přiblížení',  url: 'https://s1.liveatc.net/lkpr' },
  ],
  // Německo
  'EDDF': [
    { label: 'Frankfurt Věž',     url: 'https://s1.liveatc.net/eddf_twr' },
    { label: 'Frankfurt Přibl.',  url: 'https://s1.liveatc.net/eddf_app' },
  ],
  'EDDM': [
    { label: 'Mnichov Věž',       url: 'https://s1.liveatc.net/eddm_twr' },
    { label: 'Mnichov Přibl.',    url: 'https://s1.liveatc.net/eddm_app' },
  ],
  'EDDB': [
    { label: 'Berlín Věž',        url: 'https://s1.liveatc.net/eddb' },
  ],
  // Rakousko
  'LOWW': [
    { label: 'Vídeň Věž',         url: 'https://s1.liveatc.net/loww_twr' },
    { label: 'Vídeň Přibl.',      url: 'https://s1.liveatc.net/loww_app' },
  ],
  // Polsko
  'EPWA': [
    { label: 'Varšava Věž',       url: 'https://s1.liveatc.net/epwa' },
  ],
  // Maďarsko
  'LHBP': [
    { label: 'Budapešť Věž',      url: 'https://s1.liveatc.net/lhbp' },
  ],
  // UK
  'EGLL': [
    { label: 'Heathrow Věž N',    url: 'https://s1.liveatc.net/egll_twr_north' },
    { label: 'Heathrow Věž S',    url: 'https://s1.liveatc.net/egll_twr_south' },
    { label: 'Heathrow Přibl.',   url: 'https://s1.liveatc.net/egll_app' },
  ],
  'EGKK': [
    { label: 'Gatwick Věž',       url: 'https://s1.liveatc.net/egkk' },
  ],
  'EGGW': [
    { label: 'Luton Věž',         url: 'https://s1.liveatc.net/eggw' },
  ],
  // Belgie
  'EBBR': [
    { label: 'Brusel Věž',        url: 'https://s1.liveatc.net/ebbr' },
  ],
  // Nizozemsko
  'EHAM': [
    { label: 'Amsterdam Věž',     url: 'https://s1.liveatc.net/eham_twr' },
    { label: 'Amsterdam Přibl.',  url: 'https://s1.liveatc.net/eham_app' },
  ],
  // Švýcarsko
  'LSZH': [
    { label: 'Curych Věž',        url: 'https://s1.liveatc.net/lszh_twr' },
    { label: 'Curych Přibl.',     url: 'https://s1.liveatc.net/lszh_app' },
  ],
  // Francie
  'LFPG': [
    { label: 'Paris CDG Věž',     url: 'https://s1.liveatc.net/lfpg_twr' },
    { label: 'Paris CDG Přibl.',  url: 'https://s1.liveatc.net/lfpg_app' },
  ],
  // Španělsko
  'LEMD': [
    { label: 'Madrid Věž',        url: 'https://s1.liveatc.net/lemd_twr' },
  ],
  // Slovensko
  'LZIB': [
    { label: 'Bratislava Věž',    url: 'https://s1.liveatc.net/lzib' },
  ],
}

export function getAtcFeeds(icao: string): AtcFeed[] {
  return ATC_FEEDS[icao.toUpperCase()] ?? []
}

export function getLiveAtcUrl(icao: string): string {
  return `https://www.liveatc.net/search/?icao=${icao.toUpperCase()}`
}
