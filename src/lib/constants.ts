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
}

export const POLL_INTERVAL_MS = 10_000
export const MAX_BACKOFF_MS   = 60_000
