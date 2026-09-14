// Průchozí 3D model měst s letištěm (/mesto-3d).
// Budovy pocházejí z OpenStreetMap přes vektorové dlaždice OpenFreeMap
// (OpenMapTiles schéma, vrstva `building` s výškou `render_height`).

export interface CityWalkSpot {
  id: string
  label: string
  lat: number
  lng: number
  /** Kam se kamera dívá po teleportu (0 = sever, po směru hodin). */
  bearing: number
}

export interface CityWalkCity {
  slug: string
  name: string
  /** Odkaz na letištní průvodce na webu (jen u měst s letištěm). */
  airportHref?: string
  airport?: { icao: string; iata: string; name: string; lat: number; lng: number }
  spots: CityWalkSpot[]
}

export const CITY_WALK_CITIES: CityWalkCity[] = [
  {
    slug: 'praha',
    name: 'Praha',
    airportHref: '/letiste/praha',
    airport: { icao: 'LKPR', iata: 'PRG', name: 'Letiště Václava Havla Praha', lat: 50.1009, lng: 14.2599 },
    spots: [
      { id: 'staromak',   label: 'Staroměstské náměstí', lat: 50.0875, lng: 14.4213, bearing: 20 },
      { id: 'vaclavak',   label: 'Václavské náměstí',    lat: 50.0812, lng: 14.4265, bearing: 150 },
      { id: 'karluv',     label: 'Karlův most',          lat: 50.0865, lng: 14.4114, bearing: 250 },
      { id: 'hrad',       label: 'Pražský hrad',         lat: 50.0904, lng: 14.4000, bearing: 100 },
      { id: 'terminal',   label: 'Letiště Praha, Terminál 2', lat: 50.1073, lng: 14.2665, bearing: 200 },
    ],
  },
  {
    slug: 'brno',
    name: 'Brno',
    airportHref: '/letiste/brno',
    airport: { icao: 'LKTB', iata: 'BRQ', name: 'Letiště Brno-Tuřany', lat: 49.1513, lng: 16.694 },
    spots: [
      { id: 'svobody',  label: 'náměstí Svobody',   lat: 49.1951, lng: 16.6086, bearing: 200 },
      { id: 'spilberk', label: 'Špilberk',          lat: 49.1944, lng: 16.5990, bearing: 90 },
      { id: 'terminal', label: 'Letiště Brno, terminál', lat: 49.1512, lng: 16.6885, bearing: 120 },
    ],
  },
  {
    slug: 'ostrava',
    name: 'Ostrava',
    airportHref: '/letiste/ostrava',
    airport: { icao: 'LKMT', iata: 'OSR', name: 'Letiště Leoše Janáčka Ostrava', lat: 49.6963, lng: 18.1111 },
    spots: [
      { id: 'masarykovo', label: 'Masarykovo náměstí', lat: 49.8352, lng: 18.2926, bearing: 30 },
      { id: 'vitkovice',  label: 'Dolní Vítkovice',    lat: 49.8146, lng: 18.2797, bearing: 300 },
      { id: 'terminal',   label: 'Letiště Ostrava, terminál', lat: 49.6947, lng: 18.1176, bearing: 250 },
    ],
  },
  {
    slug: 'pardubice',
    name: 'Pardubice',
    airportHref: '/letiste/pardubice',
    airport: { icao: 'LKPD', iata: 'PED', name: 'Letiště Pardubice', lat: 50.015, lng: 15.7398 },
    spots: [
      { id: 'pernstynske', label: 'Pernštýnské náměstí', lat: 50.0388, lng: 15.7783, bearing: 90 },
      { id: 'terminal',    label: 'Letiště Pardubice, terminál', lat: 50.0185, lng: 15.7470, bearing: 210 },
    ],
  },
  {
    slug: 'karlovy-vary',
    name: 'Karlovy Vary',
    airportHref: '/letiste/karlovy-vary',
    airport: { icao: 'LKKV', iata: 'KLV', name: 'Letiště Karlovy Vary', lat: 50.203, lng: 12.915 },
    spots: [
      { id: 'kolonada', label: 'Mlýnská kolonáda', lat: 50.2246, lng: 12.8801, bearing: 160 },
      { id: 'terminal', label: 'Letiště Karlovy Vary, terminál', lat: 50.2035, lng: 12.9105, bearing: 90 },
    ],
  },
  {
    slug: 'bilina',
    name: 'Bílina',
    spots: [
      { id: 'mirove',  label: 'Mírové náměstí',          lat: 50.5486, lng: 13.7757, bearing: 30 },
      { id: 'zamek',   label: 'Zámek Bílina',            lat: 50.5474, lng: 13.7731, bearing: 120 },
      { id: 'kyselka', label: 'Lázně Kyselka',           lat: 50.5602, lng: 13.7736, bearing: 340 },
      { id: 'boren',   label: 'Pod Bořeněm',             lat: 50.5418, lng: 13.7650, bearing: 200 },
    ],
  },
]

export const DEFAULT_CITY_SLUG = 'praha'

export function findCityWalkCity(slug: string | null | undefined): CityWalkCity {
  return CITY_WALK_CITIES.find((c) => c.slug === slug) ?? CITY_WALK_CITIES[0]
}
