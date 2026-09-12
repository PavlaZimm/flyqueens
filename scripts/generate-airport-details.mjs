import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const airportPath = resolve(projectRoot, 'src/data/airports.json')
const outputPath = resolve(projectRoot, 'src/data/airport-details.json')

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    if (char === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"'
        index += 1
      } else {
        quoted = !quoted
      }
    } else if (char === ',' && !quoted) {
      row.push(cell)
      cell = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[index + 1] === '\n') index += 1
      row.push(cell)
      if (row.some(Boolean)) rows.push(row)
      row = []
      cell = ''
    } else {
      cell += char
    }
  }
  if (cell || row.length) {
    row.push(cell)
    rows.push(row)
  }

  const [headers, ...values] = rows
  return values.map((valuesRow) => Object.fromEntries(
    headers.map((header, index) => [header, valuesRow[index] ?? '']),
  ))
}

function numeric(value) {
  if (value === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const [
  runwaysSource = 'https://davidmegginson.github.io/ourairports-data/runways.csv',
  frequenciesSource = 'https://davidmegginson.github.io/ourairports-data/airport-frequencies.csv',
] = process.argv.slice(2)

async function loadSource(source) {
  if (!source.startsWith('http')) return readFile(resolve(source), 'utf8')
  const response = await fetch(source)
  if (!response.ok) throw new Error(`Download failed (${response.status}): ${source}`)
  return response.text()
}

const [airports, runwaysText, frequenciesText] = await Promise.all([
  readFile(airportPath, 'utf8').then(JSON.parse),
  loadSource(runwaysSource),
  loadSource(frequenciesSource),
])

const included = new Set(airports.map((airport) => airport.icao))
const details = Object.fromEntries([...included].sort().map((icao) => [icao, {
  runways: [],
  frequencies: [],
}]))

for (const runway of parseCsv(runwaysText)) {
  const icao = runway.airport_ident
  if (!included.has(icao)) continue
  details[icao].runways.push({
    ident: [runway.le_ident, runway.he_ident].filter(Boolean).join('/') || null,
    lengthFt: numeric(runway.length_ft),
    widthFt: numeric(runway.width_ft),
    surface: runway.surface || null,
    lighted: runway.lighted === '1',
    closed: runway.closed === '1',
  })
}

for (const frequency of parseCsv(frequenciesText)) {
  const icao = frequency.airport_ident
  if (!included.has(icao)) continue
  details[icao].frequencies.push({
    type: frequency.type || null,
    description: frequency.description || null,
    frequencyMhz: numeric(frequency.frequency_mhz),
  })
}

for (const value of Object.values(details)) {
  value.runways.sort((a, b) => (b.lengthFt ?? 0) - (a.lengthFt ?? 0))
  value.frequencies.sort((a, b) => (a.type ?? '').localeCompare(b.type ?? ''))
}

await writeFile(outputPath, `${JSON.stringify(details)}\n`)
console.log(`Generated airport details for ${Object.keys(details).length} airports.`)
