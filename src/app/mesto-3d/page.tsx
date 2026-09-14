import Link from 'next/link'
import { CityWalkLoader } from '@/components/City/CityWalkLoader'
import { SiteFooter } from '@/components/UI/SiteFooter'
import { CITY_WALK_CITIES, DEFAULT_CITY_SLUG } from '@/lib/cityWalk'

const section: React.CSSProperties = { maxWidth: 760, margin: '0 auto', padding: '36px 18px 40px' }
const heading: React.CSSProperties = {
  fontFamily: 'var(--font-archivo), Archivo, sans-serif',
  fontSize: 22,
  fontWeight: 700,
  margin: '0 0 12px',
  color: 'var(--text-primary)',
}
const subheading: React.CSSProperties = { ...heading, fontSize: 16, margin: '22px 0 8px' }
const paragraph: React.CSSProperties = { fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 12px' }
const link: React.CSSProperties = { color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }

export default function CityWalkPage() {
  return (
    <>
      <CityWalkLoader initialCitySlug={DEFAULT_CITY_SLUG} />

      <section style={section} aria-labelledby="mesto-3d-heading">
        <h1 id="mesto-3d-heading" style={heading}>Průchozí 3D model města</h1>
        <p style={paragraph}>
          Model nahoře je opravdové město: půdorysy a výšky budov pocházejí z OpenStreetMap, tvary ulic, parky
          a řeky také. Kamera stojí těsně nad ulicí a můžete jí procházet jako ve hře. Začít lze na náměstí,
          u zámku nebo přímo u terminálu letiště, které máme v průvodcích.
        </p>

        <h2 style={subheading}>Ovládání</h2>
        <p style={paragraph}>
          Na počítači chodíte klávesami W, A, S, D nebo šipkami, Shift zrychlí na běh a klávesy Q a E otáčejí
          kameru. Tažením myší se rozhlížíte, kolečkem měníte výšku pohledu. Na mobilu se rozhlížíte tažením
          prstu a chůzi obstarají tlačítka vpravo dole. Tlačítko „Nadhled“ vás zvedne nad střechy, ať se
          zorientujete.
        </p>

        <h2 style={subheading}>Dostupná města</h2>
        <p style={paragraph}>
          {CITY_WALK_CITIES.map((city, index) => (
            <span key={city.slug}>
              <Link href={`/mesto-3d?mesto=${city.slug}`} style={link}>{city.name}</Link>
              {city.airport && city.airportHref && (
                <>
                  {' '}(<Link href={city.airportHref} style={{ ...link, fontWeight: 500 }}>{city.airport.iata}</Link>)
                </>
              )}
              {index < CITY_WALK_CITIES.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>

        <h2 style={subheading}>Odkud jsou data</h2>
        <p style={paragraph}>
          Vektorové dlaždice poskytuje bezplatný projekt OpenFreeMap ve schématu OpenMapTiles, podkladová data
          jsou z OpenStreetMap pod licencí ODbL. Výška budovy je tam, kde ji přispěvatelé zakreslili; ostatní
          domy dostávají jednotnou odhadní výšku. Model se načítá až v prohlížeči, proto potřebuje WebGL.
        </p>
        <p style={paragraph}>
          Chcete vidět, co nad městem právě letí? Otevřete{' '}
          <Link href="/radar" style={link}>živou mapu letadel</Link>.
        </p>
      </section>

      <SiteFooter />
    </>
  )
}
