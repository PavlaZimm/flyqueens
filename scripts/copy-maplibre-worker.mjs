// MapLibre GL 6 spouští dlaždicový worker jako samostatný ES modul, který
// hledá vedle svého bundlu podle import.meta.url. Přes bundler Next.js tahle
// cesta nefunguje, proto worker (a jeho sdílený chunk) kopírujeme do /public
// a v aplikaci na něj ukazujeme přes setWorkerUrl(). Složka je v .gitignore,
// skript běží automaticky v postinstall.
import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const src = join(root, 'node_modules/maplibre-gl/dist')
const dest = join(root, 'public/vendor/maplibre')

if (!existsSync(src)) {
  console.warn('[maplibre] node_modules/maplibre-gl chybí, worker se nekopíruje')
  process.exit(0)
}

mkdirSync(dest, { recursive: true })
for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  copyFileSync(join(src, file), join(dest, file))
}
console.log('[maplibre] worker zkopírován do public/vendor/maplibre')
