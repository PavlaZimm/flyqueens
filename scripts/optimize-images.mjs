// Optimalizuje webové kopie fotografií. Originály v Fotografie/ nemění.
// npm run images:optimize [public/blog/fotka.webp ...]
// Bez argumentů zpracuje public/blog a public/spotting.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const MAX_EDGE = 1600
const TARGET_BYTES = 200 * 1024
const formats = /\.(jpe?g|png|webp)$/i
const requested = process.argv.slice(2)
const files = requested.length ? requested : (await Promise.all(
  ['public/blog', 'public/spotting'].map(async dir =>
    (await readdir(dir)).filter(name => formats.test(name)).map(name => path.join(dir, name))),
)).flat().sort()
let before = 0
let after = 0
for (const file of files) {
  if (!formats.test(file) || !path.resolve(file).startsWith(`${path.resolve('public')}${path.sep}`)) {
    throw new Error(`Očekávám webový obrázek v public/: ${file}`)
  }
  const sizeBefore = (await stat(file)).size
  const metadata = await sharp(file).metadata()
  const longEdge = Math.max(metadata.width, metadata.height)
  let result = null
  // Již malé webové kopie znovu ztrátově nekódujeme.
  if (longEdge > MAX_EDGE || sizeBefore > TARGET_BYTES) {
    for (const quality of [78, 72, 66, 60]) {
      let pipeline = sharp(file).rotate().resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      if (/\.webp$/i.test(file)) pipeline = pipeline.webp({ quality, effort: 6 })
      else if (/\.png$/i.test(file)) pipeline = pipeline.png({ compressionLevel: 9 })
      else pipeline = pipeline.jpeg({ quality, mozjpeg: true, progressive: true })
      const candidate = await pipeline.toBuffer()
      if (!result || candidate.length < result.length) result = candidate
      if (result.length <= TARGET_BYTES || /\.png$/i.test(file)) break
    }
    if (result.length < sizeBefore || longEdge > MAX_EDGE) await writeFile(file, result)
  }
  const sizeAfter = (await stat(file)).size
  const actual = await sharp(await readFile(file)).metadata()
  before += sizeBefore
  after += sizeAfter
  console.log(`${file}: ${sizeBefore} → ${sizeAfter} B; ${actual.width}×${actual.height}${sizeAfter > TARGET_BYTES ? ' (nad cílem 200 kB, posoudit vizuálně)' : ''}`)
}
console.log(`Celkem: ${before} → ${after} B (úspora ${before ? Math.round((1 - after / before) * 100) : 0} %).`)
console.log('Po změně rozměrů aktualizujte Image, registr článků a sociální metadata. Zkontrolujte ostrost a ořez.')
