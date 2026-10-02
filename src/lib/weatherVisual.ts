import type { MetarData } from './metar'
import type { SolarTimes } from './aeroInsights'

export function weatherVisual(weather: Pick<MetarData, 'weather' | 'clouds' | 'rawMetar'>, solar: SolarTimes | null, now: number) {
  const wx = (weather.weather ?? '').toUpperCase()
  if (/TS/.test(wx)) return { icon: '⛈️', label: 'Bouřka' }
  if (/GR|GS/.test(wx)) return { icon: '🌨️', label: 'Kroupy' }
  if (/SN|SG|PL/.test(wx)) return { icon: '🌨️', label: /RA/.test(wx) ? 'Déšť se sněhem' : 'Sněžení' }
  if (/RA|DZ/.test(wx)) return { icon: '🌧️', label: /FZ/.test(wx) ? 'Mrznoucí srážky' : /RA/.test(wx) ? 'Déšť' : 'Mrholení' }
  if (/FG|BR|HZ|FU/.test(wx)) return { icon: '🌫️', label: /FG/.test(wx) ? 'Mlha' : /FU/.test(wx) ? 'Kouř' : 'Opar' }
  const covers = weather.clouds.map(cloud => cloud.cover.toUpperCase())
  if (covers.includes('OVC') || covers.includes('VV')) return { icon: '☁️', label: covers.includes('VV') ? 'Obloha zakrytá' : 'Zataženo' }
  if (covers.includes('BKN')) return { icon: '☁️', label: 'Oblačno' }
  const sunrise = Date.parse(solar?.sunrise ?? '')
  const sunset = Date.parse(solar?.sunset ?? '')
  const knownDay = Number.isFinite(sunrise) && Number.isFinite(sunset)
    && new Date(sunrise).toLocaleDateString('en-CA', { timeZone: 'Europe/Prague' }) === new Date(now).toLocaleDateString('en-CA', { timeZone: 'Europe/Prague' })
  const night = knownDay && (now < sunrise || now >= sunset)
  if (covers.includes('SCT') || covers.includes('FEW')) return { icon: night ? '☁️🌙' : knownDay ? '🌤️' : '☁️', label: covers.includes('SCT') ? 'Polojasno' : 'Skoro jasno' }
  if (covers.some(cover => ['CLR', 'SKC', 'NSC', 'NCD'].includes(cover)) || /\b(?:CLR|SKC|NSC|NCD)\b/.test(weather.rawMetar ?? '')) return { icon: night ? '🌙' : knownDay ? '☀️' : '🌡️', label: 'Bez hlášené oblačnosti' }
  if (/\bCAVOK\b/.test(weather.rawMetar ?? '')) return { icon: night ? '🌙' : '🌤️', label: 'Dobrá dohlednost, bez nízké oblačnosti' }
  return { icon: '🌡️', label: 'Stav oblohy neuveden' }
}
