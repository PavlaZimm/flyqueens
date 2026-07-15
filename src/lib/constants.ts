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
  europe:     { lat: 50,  lon: 15,   dist: 350,  label: 'Evropa',    flag: '🇪🇺', osky: { lamin: 44, lamax: 58, lomin: 5,   lomax: 28  } },
  namerica:   { lat: 40,  lon: -95,  dist: 2500, label: 'S. Amerika',flag: '🇺🇸', osky: { lamin: 20, lamax: 55, lomin: -130,lomax: -60 } },
  samerica:   { lat: -15, lon: -55,  dist: 2500, label: 'J. Amerika',flag: '🌎', osky: { lamin: -55,lamax: 10, lomin: -82, lomax: -35 } },
  asia:       { lat: 35,  lon: 105,  dist: 2500, label: 'Asie',      flag: '🌏', osky: { lamin: 0,  lamax: 55, lomin: 70,  lomax: 145 } },
  middleeast: { lat: 25,  lon: 45,   dist: 1500, label: 'Blízký v.', flag: '🕌', osky: { lamin: 15, lamax: 38, lomin: 30,  lomax: 63  } },
  africa:     { lat: 5,   lon: 20,   dist: 2500, label: 'Afrika',    flag: '🌍', osky: { lamin: -35,lamax: 37, lomin: -20, lomax: 55  } },
  oceania:    { lat: -25, lon: 135,  dist: 2000, label: 'Oceánie',   flag: '🦘', osky: { lamin: -50,lamax: -5, lomin: 110, lomax: 180 } },
}

export const POLL_INTERVAL_MS = 10_000
export const MAX_BACKOFF_MS   = 60_000
