export interface MetarData {
  icao:       string
  temp:       number | null
  dewpoint:   number | null
  windDir:    number | null
  windSpeed:  number | null
  windGust:   number | null
  visibility: number | null
  altimeter:  number | null
  weather:    string | null
  clouds:     Array<{ cover: string; base: number }>
  category:   'VFR' | 'MVFR' | 'IFR' | 'LIFR' | null
  rawMetar:   string | null
  obsTime:    string | null
}

export async function fetchMetar(icao: string): Promise<MetarData | null> {
  try {
    const res = await fetch(`/api/metar?icao=${encodeURIComponent(icao)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

/** inHg → hPa */
export function inHgToHpa(inHg: number): number {
  return Math.round(inHg * 33.8639)
}

/** uzly → km/h */
export function ktsToKmh(kts: number): number {
  return Math.round(kts * 1.852)
}

/** míle → km */
export function milesToKm(miles: number): string {
  if (miles >= 6) return '10+ km'
  return `${(miles * 1.609).toFixed(1)} km`
}

/** Směr větru ve stupních → světová strana */
export function degToCompass(deg: number): string {
  const dirs = ['S', 'SSV', 'SV', 'VSV', 'V', 'VJV', 'JV', 'JJV', 'J', 'JJZ', 'JZ', 'ZJZ', 'Z', 'ZSZ', 'SZ', 'SSZ']
  return dirs[Math.round(deg / 22.5) % 16]
}

/** Barva kategorie letu */
export function categoryColor(cat: string | null): string {
  switch (cat) {
    case 'VFR':  return '#22C55E'   // zelená
    case 'MVFR': return '#38BDF8'   // modrá
    case 'IFR':  return '#F87171'   // červená
    case 'LIFR': return '#C084FC'   // fialová
    default:     return '#6B7280'
  }
}

/** Popis počasí ze WX kódu */
export function wxDescription(wx: string | null): string {
  if (!wx) return ''
  const map: Record<string, string> = {
    'RA': '🌧 Déšť', 'DZ': '🌦 Mrholení', 'SN': '❄️ Sníh',
    'SG': '🌨 Sněhové krupky', 'GR': '🌩 Kroupy', 'GS': '🌨 Drobné kroupy',
    'TS': '⛈ Bouřka', 'FG': '🌫 Mlha', 'BR': '🌁 Opar',
    'HZ': '😶‍🌫️ Zákal', 'FU': '💨 Kouř', 'SA': '🏜 Písečná bouře',
    'TSRA': '⛈ Bouřka s deštěm', 'RASN': '🌨 Déšť se sněhem',
    '-RA': '🌦 Slabý déšť', '+RA': '🌧 Silný déšť',
    '-SN': '🌨 Slabý sníh', '+SN': '❄️ Silný sníh',
    'VCSH': '🌦 Přeháňky v okolí',
  }
  // Zkus přesnou shodu, pak prefix
  if (map[wx]) return map[wx]
  for (const [key, val] of Object.entries(map)) {
    if (wx.includes(key)) return val
  }
  return wx
}
