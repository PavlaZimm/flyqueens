import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { readFileSync } from 'fs'
import { join } from 'path'
import { checkRateLimit } from '@/lib/rateLimit'

// Načteme aircraft DB jednou při startu serveru (module-level cache)
let aircraftDb: Record<string, { m: string; t: string }> | null = null

function getAircraftDb() {
  if (!aircraftDb) {
    try {
      const raw = readFileSync(join(process.cwd(), 'public/aircraft-db.json'), 'utf-8')
      aircraftDb = JSON.parse(raw)
    } catch {
      aircraftDb = {}
    }
  }
  return aircraftDb!
}

// ICAO hex prefix → země
const ICAO_COUNTRY: Record<string, string> = {
  '3c': 'Germany', '3d': 'Germany', '3e': 'Germany', '3f': 'Germany',
  '4b': 'Switzerland',
  '4c': 'France', '4d': 'France', '01': 'France',
  '40': 'United Kingdom', '41': 'United Kingdom', '42': 'United Kingdom', '43': 'United Kingdom',
  '49': 'Czech Republic',
  '50': 'Poland', '51': 'Poland',
  '44': 'Austria',
  '46': 'Belgium',
  '47': 'Netherlands',
  '48': 'Hungary',
  '38': 'Sweden', '39': 'Sweden',
  '36': 'Norway', '37': 'Norway',
  '45': 'Denmark',
  '4a': 'Ireland',
  '30': 'Italy', '31': 'Italy', '32': 'Italy', '33': 'Italy',
  '34': 'Spain', '35': 'Spain',
  '70': 'Russia', '72': 'Russia', '73': 'Russia',
  '71': 'Turkey',
  'ae': 'United States', 'a0': 'United States', 'a2': 'United States',
  'a3': 'United States', 'a4': 'United States', 'a5': 'United States',
  'e4': 'China', 'e5': 'China', 'e6': 'China',
  '80': 'India', '81': 'India',
}

function getCountry(icao: string): string {
  const prefix2 = icao.substring(0, 2).toLowerCase()
  return ICAO_COUNTRY[prefix2] ?? ''
}

// adsb.lol formát → OpenSky formát
// OpenSky: [icao24, callsign, origin_country, time_position, last_contact, longitude, latitude, baro_altitude, on_ground, velocity, true_track, ...]
function adsbToOpenSky(ac: Record<string, unknown>): unknown[] {
  const icao    = String(ac.hex ?? '').toLowerCase()
  const cs      = String(ac.flight ?? '').trim()
  const lat     = Number(ac.lat ?? 0)
  const lon     = Number(ac.lon ?? 0)
  const alt     = ac.alt_baro === 'ground' ? 0 : Number(ac.alt_baro ?? 0) * 0.3048 // ft → m
  const gs      = Number(ac.gs ?? 0) * 0.514444 // knots → m/s
  const track   = Number(ac.track ?? 0)
  const onGnd   = ac.alt_baro === 'ground' || alt < 10
  const now     = Math.floor(Date.now() / 1000)
  const country = getCountry(icao)
  return [icao, cs, country, now, now, lon, lat, alt, onGnd, gs, track, 0, null, alt, null, false, 0]
}

// Vercel CDN cache — 1 request na adsb.lol za 10 sekund
export const revalidate = 10

export async function GET() {
  // Rate limiting — max 30 req/min per IP
  const reqHeaders = await headers()
  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? reqHeaders.get('x-real-ip')
    ?? '127.0.0.1'

  const { allowed, retryAfter } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  try {
    // adsb.lol — free, bez registrace, bez rate limitu, 1758+ letadel v oblasti
    const res = await fetch(
      'https://api.adsb.lol/v2/lat/50/lon/15/dist/600',
      {
        headers: { 'Accept': 'application/json' },
        next: { revalidate: 10 }
      }
    )

    if (!res.ok) {
      return NextResponse.json({ ...getMockData(), _mock: true })
    }

    const data = await res.json()
    const aircraft: Record<string, unknown>[] = data.ac ?? []

    if (!aircraft.length) {
      return NextResponse.json({ ...getMockData(), _mock: true })
    }

    // Převod na OpenSky formát + obohacení z aircraft DB
    const db = getAircraftDb()
    const states = aircraft.map((ac) => {
      const row = adsbToOpenSky(ac)
      const icao = String(row[0])
      const entry = db[icao]
      // model letadla z naší DB (přesnější než adsb.lol type designator)
      if (entry) {
        row[17] = entry.m  // model
        ;(row as unknown[]).push(entry.t)  // typ
      }
      return row
    })

    return NextResponse.json({
      time: Math.floor(Date.now() / 1000),
      states,
    })
  } catch {
    return NextResponse.json({ ...getMockData(), _mock: true })
  }
}

// Demo letadla nad střední Evropou (fallback)
function getMockData() {
  const now = Math.floor(Date.now() / 1000)
  return {
    time: now,
    states: [
      ['3c6444', 'DLH123',  'Germany',       now, now, 14.42, 50.08, 10972, false, 245, 95,  0, null, 10972, '1000', false, 0],
      ['4b1902', 'CSA456',  'Czech Republic', now, now, 16.61, 49.19, 9144,  false, 220, 270, 0, null, 9144,  '2200', false, 0],
      ['3c4b8f', 'EZY789',  'Germany',        now, now, 13.40, 52.51, 11278, false, 260, 180, 0, null, 11278, '3300', false, 0],
      ['440800', 'RYR321',  'Ireland',        now, now, 18.00, 47.50, 8534,  false, 235, 45,  0, null, 8534,  '4400', false, 0],
      ['3c6585', 'AUA555',  'Austria',        now, now, 16.36, 48.21, 10668, false, 215, 315, 0, null, 10668, '5500', false, 0],
      ['49d3f4', 'LOT201',  'Poland',         now, now, 21.01, 52.22, 9754,  false, 240, 200, 0, null, 9754,  '7700', false, 0],
      ['406544', 'BAW452',  'United Kingdom', now, now, 12.33, 51.34, 11887, false, 270, 85,  0, null, 11887, '2300', false, 0],
      ['3c6701', 'SWR190',  'Switzerland',    now, now, 8.55,  47.37, 9450,  false, 225, 240, 0, null, 9450,  '3400', false, 0],
    ]
  }
}
