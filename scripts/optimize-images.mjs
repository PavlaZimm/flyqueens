// Zmenší a znovu zakóduje rastrové obrázky v public/blog.
//
// Proč: hero fotky se v článku vykreslují maximálně na 720 CSS px a v přehledu
// blogu na 760 px. Zdrojové soubory byly ale až 2200 px široké a 716 kB velké.
// next/image sice velikost dopočítá za běhu, jenže stejný soubor si v původní
// velikosti stahují i roboti sociálních sítí (og:image je přímá cesta do
// /public, ne přes optimalizátor).
//
// Spuštění: npm run images:optimize
// Skript je idempotentní — už zmenšený soubor podruhé nezvětší.

import { readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = 'public/blog'

// 2× retina pro největší vykreslovanou šířku (760 px v přehledu blogu)
// zaokrouhleno nahoru na rozumné číslo.
const MAX_EDGE = 1600
const QUALITY = 80

const kb = (bytes) => `${Math.round(bytes / 1024)} kB`

const files = (await readdir(DIR))
  .filter((name) => /\.(jpe?g|png)$/i.test(name))
  .sort()

let before = 0
let after = 0
const rows = []

for (const name of files) {
  const file = path.join(DIR, name)
  const sizeBefore = (await stat(file)).size
  const meta = await sharp(file).metadata()

  const longEdge = Math.max(meta.width, meta.height)
  const scale = longEdge > MAX_EDGE ? MAX_EDGE / longEdge : 1
  const width = Math.round(meta.width * scale)
  const height = Math.round(meta.height * scale)

  const buffer = await sharp(file)
    .resize({ width, height, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
    .toBuffer()

  // Zapisovat jen při znatelné úspoře. Jinak by každé spuštění znovu ztrátově
  // překódovalo už hotový soubor a kvalita by se po krocích ztrácela.
  const keep = buffer.length < sizeBefore * 0.98
  if (keep) await writeFile(file, buffer)

  before += sizeBefore
  after += keep ? buffer.length : sizeBefore
  rows.push({
    name,
    from: `${meta.width}×${meta.height}`,
    to: `${width}×${height}`,
    sizeBefore,
    sizeAfter: keep ? buffer.length : sizeBefore,
    skipped: !keep,
  })
}

const pad = (value, length) => String(value).padEnd(length)
console.log(`${pad('soubor', 36)}${pad('rozměr', 24)}${pad('velikost', 22)}úspora`)
for (const row of rows) {
  const saved = row.sizeBefore - row.sizeAfter
  const percent = row.sizeBefore ? Math.round((saved / row.sizeBefore) * 100) : 0
  console.log(
    pad(row.name, 36) +
      pad(row.from === row.to ? row.from : `${row.from} → ${row.to}`, 24) +
      pad(`${kb(row.sizeBefore)} → ${kb(row.sizeAfter)}`, 22) +
      (row.skipped ? 'beze změny' : `−${percent} %`),
  )
}
console.log(
  `\ncelkem ${kb(before)} → ${kb(after)} (−${Math.round(((before - after) / before) * 100)} %)`,
)

// Rozměry po zmenšení je potřeba přepsat i v og:image (src/lib/blog.ts).
console.log('\nrozměry pro src/lib/blog.ts:')
for (const row of rows) {
  const [w, h] = row.to.split('×')
  console.log(`  ${row.name}: imageWidth: ${w}, imageHeight: ${h}`)
}
