// LiveATC.net stream databáze pro středoevropská letiště
// Stream URLs: https://s1.liveatc.net/{feed} — formát MP3 live stream
// Záložní odkaz: https://www.liveatc.net/search/?icao={ICAO}

export interface AtcFeed {
  label: string          // název frekvenece / pásma
  url:   string          // přímý MP3 stream
  feed:  string          // slug pro proxy endpoint (/api/atc-stream?feed=...)
}

const BASE = 'http://audio.liveatc.net'

const ATC_FEEDS: Record<string, AtcFeed[]> = {
  // Ověřené funkční feedy (mount pointy přímo z Icecast serveru)
  'EIDW': [
    { label: 'Dublin Gnd/Věž/Přibl.', feed: 'eidw8',          url: `${BASE}/eidw8` },
  ],
  'EHAM': [
    { label: 'Amsterdam Přibl. 119.0', feed: 'eham_app_119055', url: `${BASE}/eham_app_119055` },
  ],
  'EPWA': [
    { label: 'Varšava Přiblížení',    feed: 'epwa_app',        url: `${BASE}/epwa_app` },
  ],
  'KJFK': [
    { label: 'JFK Věž',               feed: 'kjfk_twr',        url: `${BASE}/kjfk_twr` },
    { label: 'JFK Zem',               feed: 'kjfk_gnd',        url: `${BASE}/kjfk_gnd` },
    { label: 'JFK Odlet',             feed: 'kjfk_dep',        url: `${BASE}/kjfk_dep` },
  ],
  'RJTT': [
    { label: 'Tokio Věž',             feed: 'rjtt_twr',        url: `${BASE}/rjtt_twr` },
    { label: 'Tokio Přiblížení',      feed: 'rjtt_app',        url: `${BASE}/rjtt_app` },
  ],
  'KSFO': [
    { label: 'San Francisco Věž',     feed: 'ksfo_twr',        url: `${BASE}/ksfo_twr` },
  ],
  'KATL': [
    { label: 'Atlanta Věž',           feed: 'katl_twr',        url: `${BASE}/katl_twr` },
  ],
  // Evropská letiště — feedy závisí na dobrovolnících
  'LKPR': [
    { label: 'Praha Přiblížení',      feed: 'lkpr_app',        url: `${BASE}/lkpr_app` },
    { label: 'Praha Věž',             feed: 'lkpr_twr',        url: `${BASE}/lkpr_twr` },
  ],
  'LOWW': [
    { label: 'Vídeň Věž',             feed: 'loww_twr',        url: `${BASE}/loww_twr` },
    { label: 'Vídeň Přiblížení',      feed: 'loww_app',        url: `${BASE}/loww_app` },
  ],
  'EDDF': [
    { label: 'Frankfurt Věž',         feed: 'eddf_twr',        url: `${BASE}/eddf_twr` },
    { label: 'Frankfurt Přibl.',      feed: 'eddf_app',        url: `${BASE}/eddf_app` },
  ],
  'EGLL': [
    { label: 'Heathrow Věž N',        feed: 'egll_twr_north',  url: `${BASE}/egll_twr_north` },
    { label: 'Heathrow Věž S',        feed: 'egll_twr_south',  url: `${BASE}/egll_twr_south` },
  ],
  'LSZH': [
    { label: 'Curych Věž',            feed: 'lszh_twr',        url: `${BASE}/lszh_twr` },
  ],
  'LFPG': [
    { label: 'Paris CDG Věž',         feed: 'lfpg_twr',        url: `${BASE}/lfpg_twr` },
  ],
  'EBBR': [
    { label: 'Brusel Věž',            feed: 'ebbr_twr',        url: `${BASE}/ebbr_twr` },
  ],
  'LZIB': [
    { label: 'Bratislava Věž',        feed: 'lzib_twr',        url: `${BASE}/lzib_twr` },
  ],
}

export function getAtcFeeds(icao: string): AtcFeed[] {
  return ATC_FEEDS[icao.toUpperCase()] ?? []
}

export function getLiveAtcUrl(icao: string): string {
  return `https://www.liveatc.net/search/?icao=${icao.toUpperCase()}`
}
