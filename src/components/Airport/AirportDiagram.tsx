import { runwaysFor, type Runway } from '@/lib/runways'
import styles from './AirportDiagram.module.css'

interface AirportDiagramProps {
  icao: string
  iata: string
  /** Jméno letiště pro popisek a přístupnost, např. "Letiště Brno-Tuřany". */
  name: string
}

const VIEW_W = 640
const VIEW_H = 380
const CX = VIEW_W / 2
const CY = 188
/** Poloměr, do kterého se musí vejít nejdelší dráha v libovolném natočení. */
const MAX_HALF = 132
/** Šířka dráhy je kreslená schematicky — ve skutečném měřítku by měla ~3 px. */
const STRIP_PX = 11
/** Dráhy s podobným kurzem se rozestoupí, jinak by ležely přes sebe. */
const PARALLEL_TOLERANCE_DEG = 25
/** Odsazení musí být větší než pruh dráhy plus popisek prahu, jinak se překryjí. */
const PARALLEL_OFFSET_PX = 30
/** O kolik se popisek prahu odsadí od konce dráhy. */
const LABEL_GAP_PX = 19

interface Placed {
  runway: Runway
  lowX: number
  lowY: number
  highX: number
  highY: number
  /** Dráha musela uhnout stranou, protože je téměř rovnoběžná s delší dráhou. */
  shifted: boolean
}

const czechNumber = (value: number) => value.toLocaleString('cs-CZ')

/** Rozdíl kurzů bez ohledu na to, ze kterého prahu se dráha měří. */
function headingGap(a: number, b: number): number {
  const diff = Math.abs(a - b) % 180
  return Math.min(diff, 180 - diff)
}

function place(runways: Runway[], pxPerMetre: number): Placed[] {
  return runways.map((runway, index) => {
    const radians = (runway.headingDeg * Math.PI) / 180
    // SVG má osu Y dolů, sever je proto -Y.
    const dirX = Math.sin(radians)
    const dirY = -Math.cos(radians)
    const half = (runway.lengthM * pxPerMetre) / 2

    // Každá další z téměř rovnoběžných drah se odsune kolmo o krok stranou;
    // bez toho by se kratší dráha schovala pod tu delší i s popiskem prahu.
    const nearParallelToLonger = runways
      .slice(0, index)
      .filter((other) => headingGap(other.headingDeg, runway.headingDeg) <= PARALLEL_TOLERANCE_DEG).length
    const shift = nearParallelToLonger * PARALLEL_OFFSET_PX
    const baseX = CX + dirY * shift
    const baseY = CY - dirX * shift

    return {
      runway,
      lowX: baseX - dirX * half,
      lowY: baseY - dirY * half,
      highX: baseX + dirX * half,
      highY: baseY + dirY * half,
      shifted: shift > 0,
    }
  })
}

/** Z nabízených délek vybere tu, jejíž úsečka vyjde nejblíž ke 100 px. */
function scaleBarMetres(pxPerMetre: number): number {
  const target = 100
  return [250, 500, 1000, 2000, 5000].reduce((best, metres) =>
    Math.abs(metres * pxPerMetre - target) < Math.abs(best * pxPerMetre - target) ? metres : best,
  )
}

function runwayMeta(runway: Runway): string {
  const parts: string[] = []
  if (runway.widthM) parts.push(`šířka ${runway.widthM} m`)
  if (runway.surface) parts.push(runway.surface)
  if (runway.lighted && !runway.closed) parts.push('osvětlená')
  return parts.join(' · ')
}

export function AirportDiagram({ icao, iata, name }: AirportDiagramProps) {
  const runways = runwaysFor(icao)
  if (runways.length === 0) return null

  const longest = runways[0].lengthM
  const pxPerMetre = MAX_HALF / (longest / 2)
  const placed = place(runways, pxPerMetre)
  const hasParallelShift = placed.some(({ shifted }) => shifted)

  const barMetres = scaleBarMetres(pxPerMetre)
  const barPx = barMetres * pxPerMetre

  const titleId = `runway-diagram-title-${iata}`
  const descId = `runway-diagram-desc-${iata}`
  const open = runways.filter((runway) => !runway.closed)
  const description = `Schéma orientace drah letiště ${name}. ${open
    .map((runway) => `Dráha ${runway.lowEnd}/${runway.highEnd} je dlouhá ${czechNumber(runway.lengthM)} metrů`)
    .join('. ')}.`

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
        >
          <title id={titleId}>Orientace a délka drah letiště {name} ({iata})</title>
          <desc id={descId}>{description}</desc>

          {/* Kompasový kruh — drží čtenáři v hlavě, že jde o orientaci, ne o plán letiště. */}
          <circle cx={CX} cy={CY} r={MAX_HALF + 22} fill="none" stroke="var(--border-subtle)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={MAX_HALF + 22} fill="none" stroke="var(--border-mid)" strokeWidth="1" strokeDasharray="2 7" />
          {[0, 90, 180, 270].map((angle) => {
            const radians = (angle * Math.PI) / 180
            const dirX = Math.sin(radians)
            const dirY = -Math.cos(radians)
            const inner = MAX_HALF + 16
            const outer = MAX_HALF + 28
            return (
              <line
                key={angle}
                x1={CX + dirX * inner}
                y1={CY + dirY * inner}
                x2={CX + dirX * outer}
                y2={CY + dirY * outer}
                stroke="var(--border-strong)"
                strokeWidth="1.5"
              />
            )
          })}

          {placed.map(({ runway, lowX, lowY, highX, highY }) => (
            <g key={runway.ident}>
              <line
                x1={lowX}
                y1={lowY}
                x2={highX}
                y2={highY}
                stroke={runway.closed ? 'var(--text-dim)' : 'var(--text-primary)'}
                strokeWidth={STRIP_PX}
                strokeDasharray={runway.closed ? '9 8' : undefined}
                opacity={runway.closed ? 0.7 : 0.92}
              />
              {!runway.closed && (
                <line
                  x1={lowX}
                  y1={lowY}
                  x2={highX}
                  y2={highY}
                  stroke="var(--midnight-2)"
                  strokeWidth="1.5"
                  strokeDasharray="7 9"
                />
              )}
              {[
                { label: runway.lowEnd, x: lowX, y: lowY, dx: lowX - highX, dy: lowY - highY },
                { label: runway.highEnd, x: highX, y: highY, dx: highX - lowX, dy: highY - lowY },
              ].map((end) => {
                const length = Math.hypot(end.dx, end.dy) || 1
                // Křížící se dráhy nejdou rozmístit tak, aby popisek prahu nikdy
                // nepadl na jiný pruh. Obrys pod textem to řeší spolehlivě.
                return (
                  <text
                    key={`${runway.ident}-${end.label}`}
                    x={end.x + (end.dx / length) * LABEL_GAP_PX}
                    y={end.y + (end.dy / length) * LABEL_GAP_PX}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontFamily="var(--font-ibm-plex-mono), monospace"
                    fontSize="14"
                    fontWeight="600"
                    fill={runway.closed ? 'var(--text-dim)' : 'var(--gold)'}
                    stroke="var(--midnight-2)"
                    strokeWidth="4"
                    strokeLinejoin="round"
                    paintOrder="stroke"
                  >
                    {end.label}
                  </text>
                )
              })}
            </g>
          ))}

          {/* Severka */}
          <g transform={`translate(${VIEW_W - 46}, 42)`}>
            <path d="M0 -17 L7 6 L0 1 L-7 6 Z" fill="var(--gold)" />
            <text
              x="0"
              y="22"
              textAnchor="middle"
              fontFamily="var(--font-ibm-plex-mono), monospace"
              fontSize="12"
              fontWeight="600"
              fill="var(--text-muted)"
            >
              S
            </text>
          </g>

          {/* Měřítko */}
          <g transform={`translate(34, ${VIEW_H - 34})`}>
            <line x1="0" y1="0" x2={barPx} y2="0" stroke="var(--text-muted)" strokeWidth="1.5" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="var(--text-muted)" strokeWidth="1.5" />
            <line x1={barPx} y1="-5" x2={barPx} y2="5" stroke="var(--text-muted)" strokeWidth="1.5" />
            <text
              x={barPx / 2}
              y="-11"
              textAnchor="middle"
              fontFamily="var(--font-ibm-plex-mono), monospace"
              fontSize="11"
              fill="var(--text-muted)"
            >
              {barMetres === 1000 ? '1 km' : `${czechNumber(barMetres)} m`}
            </text>
          </g>

          <text
            x="34"
            y="42"
            fontFamily="var(--font-ibm-plex-mono), monospace"
            fontSize="12"
            letterSpacing="2"
            fill="var(--text-dim)"
          >
            {iata} · {icao}
          </text>
        </svg>
      </div>

      <ul className={styles.list}>
        {runways.map((runway) => (
          <li key={runway.ident} className={`${styles.row} ${runway.closed ? styles.rowClosed : ''}`}>
            <span className={styles.ident}>{runway.lowEnd}/{runway.highEnd}</span>
            <span className={styles.length}>{czechNumber(runway.lengthM)} m</span>
            <span className={styles.meta}>{runwayMeta(runway)}</span>
            {runway.closed && <span className={styles.tag}>mimo provoz</span>}
          </li>
        ))}
      </ul>

      <figcaption className={styles.caption}>
        Schéma ukazuje magnetickou orientaci drah a jejich délku ve vzájemném měřítku, není to plán letiště:
        polohu terminálu ani pojezdových drah z něj nevyčtete a šířka dráhy je kreslená schematicky.
        {hasParallelShift ? ' Dráhy s téměř shodným kurzem jsou kvůli čitelnosti odsazené vedle sebe.' : ''}{' '}
        Zdroj rozměrů: veřejný datový soubor OurAirports, ze kterého FlyQueens generuje letištní detaily.
      </figcaption>
    </figure>
  )
}
