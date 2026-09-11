// Sdílené konstanty napříč aplikací

export const DETAIL_PANEL_WIDTH = 252
export const NEARBY_RADIUS_KM   = 30
export const EARTH_RADIUS_KM    = 6371

export const EMERGENCY_SQUAWKS  = ['7700', '7500', '7600'] as const

export const REGION_CONFIGS: Record<string, {
  lat: number; lon: number; dist: number; label: string; flag: string;
  // OpenSky bounding box fallback
  osky?: { lamin: number; lamax: number; lomin: number; lomax: number }
}> = {
  // Veřejné bodové ADS-B API vrací kruh, nikoliv celý kontinent. Popisky proto
  // pravdivě označují konkrétní oblast a každý dotaz je omezen na 250 NM.
  europe:     { lat: 50,  lon: 15,   dist: 250, label: 'Česko + okolí',      flag: '🇨🇿', osky: { lamin: 44, lamax: 58, lomin: 5,   lomax: 28  } },
  west:       { lat: 50,  lon: 6,    dist: 250, label: 'Západní Evropa',     flag: '🇪🇺', osky: { lamin: 45, lamax: 55, lomin: -2,  lomax: 14  } },
  britain:    { lat: 53,  lon: -2,   dist: 250, label: 'Britské ostrovy',    flag: '🇬🇧', osky: { lamin: 49, lamax: 59, lomin: -11, lomax: 3   } },
  north:      { lat: 59,  lon: 16,   dist: 250, label: 'Severní Evropa',     flag: '🇸🇪', osky: { lamin: 54, lamax: 65, lomin: 5,   lomax: 27  } },
  south:      { lat: 44,  lon: 11,   dist: 250, label: 'Alpy a Itálie',      flag: '🇮🇹', osky: { lamin: 38, lamax: 49, lomin: 5,   lomax: 19  } },
  iberia:     { lat: 40,  lon: -4,   dist: 250, label: 'Pyrenejský poloostrov', flag: '🇪🇸', osky: { lamin: 35, lamax: 45, lomin: -10, lomax: 4 } },
  southeast:  { lat: 43,  lon: 22,   dist: 250, label: 'Jihovýchodní Evropa', flag: '🇪🇺', osky: { lamin: 37, lamax: 49, lomin: 15,  lomax: 30  } },
  east:       { lat: 52,  lon: 27,   dist: 250, label: 'Východní Evropa',    flag: '🇪🇺', osky: { lamin: 46, lamax: 59, lomin: 20,  lomax: 35  } },
}

export const POLL_INTERVAL_MS = 10_000
export const MAX_BACKOFF_MS   = 60_000
