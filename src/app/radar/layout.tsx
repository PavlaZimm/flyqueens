import type { Metadata } from 'next'
import Link from 'next/link'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Radar letadel: živá mapa letadel online | FlyQueens',
  description: 'Sledujte letadla online na živém radaru nad Evropou. Vyhledejte let, registraci nebo ICAO adresu a zobrazte dostupnou výšku, rychlost a trasu.',
  alternates: { canonical: 'https://www.flyqueens.cz/radar' },
  ...socialMetadata({
    title: 'Radar letadel: živá mapa letadel online | FlyQueens',
    description: 'Sledujte dostupná ADS-B data o letadlech na přehledné interaktivní mapě Evropy.',
    url: 'https://www.flyqueens.cz/radar',
  }),
}

// Mapa je klientská komponenta, takže v HTML odpovědi sama o sobě nenese žádný
// text. Tenhle popis se proto vykresluje na serveru a je čitelný i bez
// spuštěného JavaScriptu. Stojí pod mapou, aby nástroj zůstal nástrojem.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FlyQueens radar letadel',
  url: 'https://www.flyqueens.cz/radar',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Web',
  inLanguage: 'cs-CZ',
  description:
    'Živá mapa letadel nad Evropou z veřejných ADS-B dat. Poloha, dostupná výška, rychlost a trasa letu.',
  publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 19, fontWeight: 800, margin: '0 0 10px' },
  h3: { fontFamily: 'Archivo, sans-serif', fontSize: 14, fontWeight: 800, margin: '20px 0 6px' },
  p: { fontSize: 14, lineHeight: 1.7, margin: '0 0 10px', color: 'var(--text-muted)' },
} as const

const LINKS = [
  { href: '/blog/jak-sledovat-let-podle-cisla', label: 'Sledování letu podle čísla' },
  { href: '/blog/co-mi-leti-nad-hlavou', label: 'Co mi letí nad hlavou' },
  { href: '/blog/jak-vysoko-letaji-letadla', label: 'Jak vysoko létají letadla' },
  { href: '/letiste/praha', label: 'Letiště Praha' },
  { href: '/stats', label: 'Živé statistiky' },
]

export default function RadarLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      {children}

      <section style={{ background: 'var(--midnight)', color: 'var(--text-primary)', borderTop: '1px solid var(--border-mid)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 18px 48px' }}>
          <h2 style={S.h2}>Co radar letadel ukazuje</h2>
          <p style={S.p}>
            Mapa zobrazuje letadla, která ve sledované oblasti právě zachytily veřejné ADS-B přijímače.
            U každého stroje najdete polohu, dostupnou výšku a rychlost, a po kliknutí i typ letadla,
            fázi letu a trasu, pokud ji lze spolehlivě přiřadit. Polohy se obnovují přibližně
            každých deset sekund a použitý zdroj i stáří dat jsou vidět přímo v aplikaci.
          </p>
          <p style={S.p}>
            Evropa je rozdělená na oblasti a každý dotaz je omezen na 250 námořních mil. Není to
            omezení mapy, ale vlastnost bodového ADS-B rozhraní — menší výřez se načte rychleji a na
            mobilu je čitelnější. Při přepnutí oblasti se stará letadla nezobrazují jako data nové oblasti.
          </p>

          <h3 style={S.h3}>Co na radaru nenajdete</h3>
          <p style={S.p}>
            Nejde o primární radar řízení letového provozu, ale o veřejně vysílaná data z odpovídačů.
            Letadlo proto chybí, když nevysílá ADS-B, letí nízko mimo dosah přijímačů nebo má polohu
            skrytou. Výpadek zdroje se nikdy nenahrazuje smyšlenými „živými“ letadly; krátce se může
            zobrazit poslední platný snímek, vždy označený.
          </p>

          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
            {LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: 13,
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  border: '1px solid var(--border-mid)',
                  borderRadius: 999,
                  padding: '7px 14px',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  )
}
