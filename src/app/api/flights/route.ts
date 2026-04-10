import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

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

// Server-side proxy pro OpenSky API — obchází CORS
export async function GET() {
  const username = process.env.OPENSKY_USERNAME
  const password = process.env.OPENSKY_PASSWORD

  const headers: Record<string, string> = { 'Accept': 'application/json' }

  // S auth: 5s polling + vyšší rate limit
  if (username && password) {
    const token = Buffer.from(`${username}:${password}`).toString('base64')
    headers['Authorization'] = `Basic ${token}`
  }

  try {
    const res = await fetch(
      'https://opensky-network.org/api/states/all?lamin=45&lamax=55&lomin=8&lomax=22',
      { headers, next: { revalidate: 0 } }
    )

    if (res.status === 429) {
      return NextResponse.json({ ...getMockData(), _mock: true })
    }

    if (!res.ok) {
      return NextResponse.json({ ...getMockData(), _mock: true })
    }

    const data = await res.json()

    // Pokud je prázdná odpověď, použij mock
    if (!data?.states?.length) {
      return NextResponse.json(getMockData())
    }

    // Obohatíme data o model letadla z DB
    const db = getAircraftDb()
    const enriched = {
      ...data,
      states: data.states.map((s: unknown[]) => {
        const icao = String(s[0]).toLowerCase()
        const entry = db[icao]
        return entry ? [...s, entry.m, entry.t] : s
      })
    }
    return NextResponse.json(enriched)
  } catch {
    return NextResponse.json({ ...getMockData(), _mock: true })
  }
}

// Demo letadla nad střední Evropou
// Formát OpenSky: [icao24, callsign, origin_country, time_position, last_contact, longitude, latitude, baro_altitude, on_ground, velocity, true_track, vertical_rate, sensors, geo_altitude, squawk, spi, position_source]
function getMockData() {
  const now = Math.floor(Date.now() / 1000)
  return {
    time: now,
    states: [
      ['3c6444', 'DLH123 ', 'Germany',       now, now, 14.42, 50.08, 10972, false, 245, 95,  0, null, 10972, '1000', false, 0],
      ['4b1902', 'CSA456 ', 'Czech Republic', now, now, 16.61, 49.19, 9144,  false, 220, 270, 0, null, 9144,  '2200', false, 0],
      ['3c4b8f', 'EZY789 ', 'Germany',        now, now, 13.40, 52.51, 11278, false, 260, 180, 0, null, 11278, '3300', false, 0],
      ['440800', 'RYR321 ', 'Ireland',         now, now, 18.00, 47.50, 8534,  false, 235, 45,  0, null, 8534,  '4400', false, 0],
      ['3c6585', 'AUA555 ', 'Austria',         now, now, 16.36, 48.21, 10668, false, 215, 315, 0, null, 10668, '5500', false, 0],
      ['3c6a8f', 'DLH991 ', 'Germany',         now, now, 11.80, 48.35, 11582, false, 255, 130, 0, null, 11582, '6600', false, 0],
      ['49d3f4', 'LOT201 ', 'Poland',           now, now, 21.01, 52.22, 9754,  false, 240, 200, 0, null, 9754,  '7700', false, 0],
      ['3c4a99', 'EWG100 ', 'Germany',          now, now, 9.99,  53.55, 10058, false, 230, 160, 0, null, 10058, '1200', false, 0],
      ['406544', 'BAW452 ', 'United Kingdom',   now, now, 12.33, 51.34, 11887, false, 270, 85,  0, null, 11887, '2300', false, 0],
      ['3c6701', 'SWR190 ', 'Switzerland',      now, now, 8.55,  47.37, 9450,  false, 225, 240, 0, null, 9450,  '3400', false, 0],
      ['3c66b3', 'LHA004 ', 'Germany',          now, now, 15.00, 51.10, 10360, false, 252, 50,  0, null, 10360, '4500', false, 0],
      ['3c4c10', 'DLH778 ', 'Germany',          now, now, 10.50, 50.00, 11100, false, 248, 110, 0, null, 11100, '5600', false, 0],
      ['481b1c', 'SKY501 ', 'Greece',           now, now, 17.50, 46.00, 8200,  false, 210, 300, 0, null, 8200,  '6700', false, 0],
      ['3c456a', 'TUI999 ', 'Germany',          now, now, 13.00, 53.00, 9900,  false, 238, 70,  0, null, 9900,  '7100', false, 0],
      ['3c5f1d', 'GEC1234', 'Germany',          now, now, 11.00, 49.50, 7620,  false, 180, 200, 0, null, 7620,  '1300', false, 0], // cargo
      ['010117', 'AFR884 ', 'France',           now, now, 14.00, 52.00, 11277, false, 265, 125, 0, null, 11277, '2400', false, 0],
      ['3c4b1a', 'CFG123 ', 'Germany',          now, now, 16.00, 50.00, 10500, false, 242, 190, 0, null, 10500, '3500', false, 0],
      ['489726', 'SAS401 ', 'Denmark',          now, now, 12.00, 54.50, 10972, false, 258, 165, 0, null, 10972, '4600', false, 0],
    ]
  }
}
