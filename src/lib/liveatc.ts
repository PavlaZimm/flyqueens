// LiveATC.net stream databáze pro středoevropská letiště
// Stream URLs: https://s1.liveatc.net/{feed} — formát MP3 live stream
// Záložní odkaz: https://www.liveatc.net/search/?icao={ICAO}

export interface AtcFeed {
  label: string          // název frekvenece / pásma
  url:   string          // přímý MP3 stream
  feed:  string          // slug pro proxy endpoint (/api/atc-stream?feed=...)
}

const ATC_FEEDS: Record<string, AtcFeed[]> = {
  'LKPR': [
    { label: 'Praha Přiblížení',  feed: 'lkpr',          url: 'https://s1.liveatc.net/lkpr' },
  ],
  'EDDF': [
    { label: 'Frankfurt Věž',     feed: 'eddf_twr',      url: 'https://s1.liveatc.net/eddf_twr' },
    { label: 'Frankfurt Přibl.',  feed: 'eddf_app',      url: 'https://s1.liveatc.net/eddf_app' },
  ],
  'EDDM': [
    { label: 'Mnichov Věž',       feed: 'eddm_twr',      url: 'https://s1.liveatc.net/eddm_twr' },
    { label: 'Mnichov Přibl.',    feed: 'eddm_app',      url: 'https://s1.liveatc.net/eddm_app' },
  ],
  'EDDB': [
    { label: 'Berlín Věž',        feed: 'eddb',          url: 'https://s1.liveatc.net/eddb' },
  ],
  'LOWW': [
    { label: 'Vídeň Věž',         feed: 'loww_twr',      url: 'https://s1.liveatc.net/loww_twr' },
    { label: 'Vídeň Přibl.',      feed: 'loww_app',      url: 'https://s1.liveatc.net/loww_app' },
  ],
  'EPWA': [
    { label: 'Varšava Věž',       feed: 'epwa',          url: 'https://s1.liveatc.net/epwa' },
  ],
  'LHBP': [
    { label: 'Budapešť Věž',      feed: 'lhbp',          url: 'https://s1.liveatc.net/lhbp' },
  ],
  'EGLL': [
    { label: 'Heathrow Věž N',    feed: 'egll_twr_north',url: 'https://s1.liveatc.net/egll_twr_north' },
    { label: 'Heathrow Věž S',    feed: 'egll_twr_south',url: 'https://s1.liveatc.net/egll_twr_south' },
    { label: 'Heathrow Přibl.',   feed: 'egll_app',      url: 'https://s1.liveatc.net/egll_app' },
  ],
  'EGKK': [
    { label: 'Gatwick Věž',       feed: 'egkk',          url: 'https://s1.liveatc.net/egkk' },
  ],
  'EGGW': [
    { label: 'Luton Věž',         feed: 'eggw',          url: 'https://s1.liveatc.net/eggw' },
  ],
  'EBBR': [
    { label: 'Brusel Věž',        feed: 'ebbr',          url: 'https://s1.liveatc.net/ebbr' },
  ],
  'EHAM': [
    { label: 'Amsterdam Věž',     feed: 'eham_twr',      url: 'https://s1.liveatc.net/eham_twr' },
    { label: 'Amsterdam Přibl.',  feed: 'eham_app',      url: 'https://s1.liveatc.net/eham_app' },
  ],
  'LSZH': [
    { label: 'Curych Věž',        feed: 'lszh_twr',      url: 'https://s1.liveatc.net/lszh_twr' },
    { label: 'Curych Přibl.',     feed: 'lszh_app',      url: 'https://s1.liveatc.net/lszh_app' },
  ],
  'LFPG': [
    { label: 'Paris CDG Věž',     feed: 'lfpg_twr',      url: 'https://s1.liveatc.net/lfpg_twr' },
    { label: 'Paris CDG Přibl.',  feed: 'lfpg_app',      url: 'https://s1.liveatc.net/lfpg_app' },
  ],
  'LEMD': [
    { label: 'Madrid Věž',        feed: 'lemd_twr',      url: 'https://s1.liveatc.net/lemd_twr' },
  ],
  'LZIB': [
    { label: 'Bratislava Věž',    feed: 'lzib',          url: 'https://s1.liveatc.net/lzib' },
  ],
}

export function getAtcFeeds(icao: string): AtcFeed[] {
  return ATC_FEEDS[icao.toUpperCase()] ?? []
}

export function getLiveAtcUrl(icao: string): string {
  return `https://www.liveatc.net/search/?icao=${icao.toUpperCase()}`
}
