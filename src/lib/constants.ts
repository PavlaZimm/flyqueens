// Sdílené konstanty napříč aplikací

export const DETAIL_PANEL_WIDTH = 252
export const NEARBY_RADIUS_KM   = 30
export const EARTH_RADIUS_KM    = 6371

export const EMERGENCY_SQUAWKS  = ['7700', '7500', '7600'] as const

export const REGION_CONFIGS: Record<string, { lat: number; lon: number; dist: number; label: string; flag: string }> = {
  europe:     { lat: 50,  lon: 15,   dist: 600,  label: 'Evropa',    flag: '🇪🇺' },
  namerica:   { lat: 40,  lon: -95,  dist: 2500, label: 'S. Amerika',flag: '🇺🇸' },
  samerica:   { lat: -15, lon: -55,  dist: 2500, label: 'J. Amerika',flag: '🌎' },
  asia:       { lat: 35,  lon: 105,  dist: 2500, label: 'Asie',      flag: '🌏' },
  middleeast: { lat: 25,  lon: 45,   dist: 1500, label: 'Blízký v.', flag: '🕌' },
  africa:     { lat: 5,   lon: 20,   dist: 2500, label: 'Afrika',    flag: '🌍' },
  oceania:    { lat: -25, lon: 135,  dist: 2000, label: 'Oceánie',   flag: '🦘' },
}

export const POLL_INTERVAL_MS = 10_000
export const MAX_BACKOFF_MS   = 60_000
