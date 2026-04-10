import type { AircraftType } from '@/types/flight'

interface AircraftIconProps {
  type: AircraftType
  color: string
  size?: number
  heading: number
}

// Barvy dle BRAND_MANUAL.md
export function getAircraftColor(type: AircraftType, theme: 'dark' | 'light'): string {
  const dark: Record<AircraftType, string> = {
    'narrow-body': '#FDE047',
    'wide-body':   '#C084FC',
    'turboprop':   '#34D399',
    'private-jet': '#FBB724',
    'cargo':       '#FB923C',
    'military':    '#F87171',
    'helicopter':  '#38BDF8',
    'ga':          '#6EE7B7',
  }
  const light: Record<AircraftType, string> = {
    'narrow-body': '#0F172A',
    'wide-body':   '#7C3AED',
    'turboprop':   '#059669',
    'private-jet': '#D97706',
    'cargo':       '#EA7020',
    'military':    '#DC2626',
    'helicopter':  '#0284C7',
    'ga':          '#10B981',
  }
  return theme === 'light' ? light[type] : dark[type]
}

// SVG siluety — štíhlé, bez elips
const NarrowBody = () => (
  <g>
    <path d="M40 8 Q43 8 45 12 L46 38 Q46 44 40 46 Q34 44 34 38 L35 12 Q37 8 40 8Z" />
    <path d="M35 22 Q22 26 14 30 Q16 32 19 31 L34 26Z" />
    <path d="M45 22 Q58 26 66 30 Q64 32 61 31 L46 26Z" />
    <path d="M20 29 Q18 30 18 32 Q20 33 24 32 L24 29Z" />
    <path d="M60 29 Q62 30 62 32 Q60 33 56 32 L56 29Z" />
    <path d="M36 40 Q30 42 26 44 Q27 45 30 44 L36 42Z" />
    <path d="M44 40 Q50 42 54 44 Q53 45 50 44 L44 42Z" />
    <path d="M14 30 Q12 29 11 31 Q13 33 14 30Z" />
    <path d="M66 30 Q68 29 69 31 Q67 33 66 30Z" />
  </g>
)

const WideBody = () => (
  <g>
    {/* Silnější trup */}
    <path d="M40 6 Q45 6 47 12 L48 38 Q48 46 40 48 Q32 46 32 38 L33 12 Q35 6 40 6Z" />
    {/* Delší křídla */}
    <path d="M33 21 Q18 25 8 30 Q10 33 14 32 L32 26Z" />
    <path d="M47 21 Q62 25 72 30 Q70 33 66 32 L48 26Z" />
    {/* Motory — 2 na každém křídle */}
    <path d="M15 29 Q13 30 13 32 Q15 33 20 32 L20 29Z" />
    <path d="M23 28 Q21 29 21 31 Q23 32 27 31 L27 28Z" />
    <path d="M65 29 Q67 30 67 32 Q65 33 60 32 L60 29Z" />
    <path d="M57 28 Q59 29 59 31 Q57 32 53 31 L53 28Z" />
    {/* Ocas */}
    <path d="M35 40 Q27 43 22 46 Q24 47 27 46 L36 43Z" />
    <path d="M45 40 Q53 43 58 46 Q56 47 53 46 L44 43Z" />
  </g>
)

const Turboprop = () => (
  <g>
    {/* Štíhlý trup */}
    <path d="M40 10 Q42 10 43 14 L44 38 Q44 43 40 45 Q36 43 36 38 L37 14 Q38 10 40 10Z" />
    {/* Kratší křídla */}
    <path d="M37 23 Q26 26 18 29 Q19 31 22 30 L36 27Z" />
    <path d="M43 23 Q54 26 62 29 Q61 31 58 30 L44 27Z" />
    {/* Vrtule (přední) */}
    <path d="M38 10 Q40 7 42 10 Q41 11 40 11 Q39 11 38 10Z" />
    <path d="M40 8 Q43 7 43 10 Q42 11 40 11Z" />
    <path d="M40 8 Q37 7 37 10 Q38 11 40 11Z" />
    {/* Motor */}
    <path d="M38 10 L42 10 L42 14 L38 14Z" />
    {/* Ocas */}
    <path d="M37 39 Q32 41 28 43 Q29 44 32 43 L37 41Z" />
    <path d="M43 39 Q48 41 52 43 Q51 44 48 43 L43 41Z" />
  </g>
)

const PrivateJet = () => (
  <g>
    {/* Aerodynamický trup */}
    <path d="M40 9 Q43 9 44 14 L45 36 Q45 41 40 43 Q35 41 35 36 L36 14 Q37 9 40 9Z" />
    {/* Swept-back křídla */}
    <path d="M36 24 Q26 20 18 22 Q19 25 22 25 L35 26Z" />
    <path d="M44 24 Q54 20 62 22 Q61 25 58 25 L45 26Z" />
    {/* Motory na zadní části trupu */}
    <path d="M37 34 Q33 33 31 34 Q31 36 33 37 L37 36Z" />
    <path d="M43 34 Q47 33 49 34 Q49 36 47 37 L43 36Z" />
    {/* Ocas T-shape */}
    <path d="M38 38 L42 38 L42 44 L38 44Z" />
    <path d="M34 38 L46 38 L46 40 L34 40Z" />
  </g>
)

const Cargo = () => (
  <g>
    {/* Silnější krabicový trup */}
    <path d="M40 8 Q44 8 46 13 L47 38 Q47 45 40 47 Q33 45 33 38 L34 13 Q36 8 40 8Z" />
    {/* Velká křídla */}
    <path d="M34 22 Q20 26 10 30 Q12 33 16 32 L33 27Z" />
    <path d="M46 22 Q60 26 70 30 Q68 33 64 32 L47 27Z" />
    {/* 2 motory */}
    <path d="M17 29 Q15 30 15 32 Q17 33 22 32 L22 29Z" />
    <path d="M63 29 Q65 30 65 32 Q63 33 58 32 L58 29Z" />
    {/* Ocas */}
    <path d="M36 41 Q29 43 24 46 Q26 47 29 46 L37 43Z" />
    <path d="M44 41 Q51 43 56 46 Q54 47 51 46 L43 43Z" />
    {/* Nákladní dveře naznačení */}
    <path d="M37 14 L43 14 L43 20 L37 20Z" opacity="0.4" />
  </g>
)

const Military = () => (
  <g>
    {/* Delta křídla */}
    <path d="M40 10 Q42 10 43 15 L44 35 Q44 40 40 42 Q36 40 36 35 L37 15 Q38 10 40 10Z" />
    {/* Přímá delta křídla */}
    <path d="M37 18 L12 40 L18 40 L36 28Z" />
    <path d="M43 18 L68 40 L62 40 L44 28Z" />
    {/* Svislá stabilizátory */}
    <path d="M38 34 L35 44 L38 43Z" />
    <path d="M42 34 L45 44 L42 43Z" />
  </g>
)

const Helicopter = () => (
  <g>
    {/* Trup */}
    <path d="M40 18 Q45 18 46 24 L46 38 Q46 44 40 46 Q34 44 34 38 L34 24 Q35 18 40 18Z" />
    {/* Rotor hlavice */}
    <path d="M38 18 L42 18 L42 14 L38 14Z" />
    {/* Rotorové listy */}
    <path d="M16 14 Q28 13 40 14 Q52 13 64 14 Q52 15 40 16 Q28 15 16 14Z" />
    <path d="M40 4 Q41 16 40 16 Q39 16 40 4Z" />
    <path d="M40 24 Q41 36 40 36 Q39 36 40 24Z" />
    {/* Ocasní výložník */}
    <path d="M40 38 L54 44 L54 46 L40 42Z" />
    {/* Ocasní rotor */}
    <path d="M53 42 L55 38 Q56 42 55 46 L53 46Z" />
    {/* Podvozek */}
    <path d="M36 46 L44 46 L44 48 L36 48Z" />
    <path d="M34 46 L34 48 L36 48 L36 46Z" />
    <path d="M44 46 L44 48 L46 48 L46 46Z" />
  </g>
)

const GA = () => (
  <g>
    {/* Malý trup (Cessna) */}
    <path d="M40 12 Q42 12 43 16 L43 38 Q43 43 40 44 Q37 43 37 38 L37 16 Q38 12 40 12Z" />
    {/* Rovná křídla */}
    <path d="M37 24 L22 24 L22 27 L37 27Z" />
    <path d="M43 24 L58 24 L58 27 L43 27Z" />
    {/* Vrtule */}
    <path d="M38 12 L42 12 L42 14 L38 14Z" />
    <path d="M37 12 Q40 9 43 12 Q40 13 37 12Z" />
    {/* Ocas */}
    <path d="M37 39 L30 42 L30 44 L37 41Z" />
    <path d="M43 39 L50 42 L50 44 L43 41Z" />
    <path d="M38 39 L42 39 L42 44 L38 44Z" />
  </g>
)

function getSVGForType(type: AircraftType) {
  switch (type) {
    case 'narrow-body': return <NarrowBody />
    case 'wide-body':   return <WideBody />
    case 'turboprop':   return <Turboprop />
    case 'private-jet': return <PrivateJet />
    case 'cargo':       return <Cargo />
    case 'military':    return <Military />
    case 'helicopter':  return <Helicopter />
    case 'ga':          return <GA />
    default:            return <NarrowBody />
  }
}

export function AircraftIcon({ type, color, size = 32, heading }: AircraftIconProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      width={size}
      height={size}
      style={{
        transform: `rotate(${heading}deg)`,
        fill: color,
        filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))',
        cursor: 'pointer',
        overflow: 'visible',
      }}
    >
      {getSVGForType(type)}
    </svg>
  )
}
