import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AirportFlightBoard } from '@/components/Airport/AirportFlightBoard'
import { getAirportBoard } from '@/lib/airportBoardServer'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AIRPORT_FLIGHT_BOARDS, airportFlightBoardBySlug } from '@/lib/airportFlightBoards'
import { socialMetadata } from '@/lib/socialMetadata'

interface AirportFlightsPageProps {
  params: Promise<{ airport: string }>
}

// Tabule je v HTML pro vyhledávače; stránka se obnovuje každých 10 minut
// z mezipaměti AeroDataBox, placené dotazy tím nepřibývají.
export const revalidate = 600

export function generateStaticParams() {
  return AIRPORT_FLIGHT_BOARDS.map((airport) => ({ airport: airport.slug }))
}

export async function generateMetadata({ params }: AirportFlightsPageProps): Promise<Metadata> {
  const { airport: slug } = await params
  const airport = airportFlightBoardBySlug(slug)
  if (!airport) return {}

  const title = `Odlety a přílety ${airport.city}: letová tabule`
  const description = `Přehled odletů a příletů letiště ${airport.city} (${airport.iata}), dostupné časy, stav letu, terminál a gate. Vždy s odkazem na oficiální tabuli letiště.`
  const url = `https://www.flyqueens.cz/letiste/${airport.slug}/odlety`
  return {
    title,
    description,
    alternates: { canonical: url },
    ...socialMetadata({ title: `${title} | FlyQueens`, description, url }),
  }
}

export default async function AirportFlightsPage({ params }: AirportFlightsPageProps) {
  const { airport: slug } = await params
  const airport = airportFlightBoardBySlug(slug)
  if (!airport) notFound()
  const board = await getAirportBoard(airport.iata)
  const initialData = board?.status === 'ready' ? board : null

  const pageUrl = `https://www.flyqueens.cz/letiste/${airport.slug}/odlety`
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz/' },
      { '@type': 'ListItem', position: 2, name: 'Letiště', item: 'https://www.flyqueens.cz/letiste' },
      { '@type': 'ListItem', position: 3, name: airport.city, item: `https://www.flyqueens.cz/letiste/${airport.slug}` },
      { '@type': 'ListItem', position: 4, name: 'Odlety a přílety', item: pageUrl },
    ],
  }

  const paragraph = { fontSize: 15, lineHeight: 1.75, color: 'var(--text-muted)', margin: '0 0 12px' } as const
  const heading = { fontFamily: 'Archivo, sans-serif', fontSize: 21, fontWeight: 800, margin: '34px 0 10px' } as const

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '24px 16px 64px' }}>
        <nav aria-label="Drobečková navigace" style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 18 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'inherit', textDecoration: 'none' }}>Letiště</Link>
          {' · '}
          <Link href={`/letiste/${airport.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{airport.city}</Link>
          {' · Odlety a přílety'}
        </nav>

        <div style={{ maxWidth: 760, marginBottom: 26 }}>
          <p style={{ margin: '0 0 8px', color: 'var(--gold)', fontSize: 11, fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, letterSpacing: 1.7, textTransform: 'uppercase' }}>
            {airport.name} · {airport.iata}
          </p>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 'clamp(30px, 6vw, 46px)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 13px' }}>
            Odlety a přílety {airport.city}
          </h1>
          <p style={{ ...paragraph, fontSize: 17, lineHeight: 1.65 }}>
            Rychlý přehled dostupných letů, časů a provozních údajů pro letiště {airport.iata}. Pokud živý zdroj není aktivní nebo některý údaj chybí, nic neodhadujeme a odkážeme vás přímo na oficiální tabuli letiště.
          </p>
        </div>

        <AirportFlightBoard airport={airport} initialData={initialData} />

        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={heading}>Co v přehledu najdete</h2>
          <p style={paragraph}>
            U každého dostupného letu ukazujeme plánovaný čas a případný revidovaný čas, číslo letu, dopravce, směr a zveřejněný provozní stav. Terminál, gate, odbavovací přepážku nebo výdejní pás zobrazíme pouze tehdy, když je datový zdroj skutečně poskytne. Nevyplňujeme je odhadem.
          </p>
          <p style={paragraph}>
            Odkaz „Na mapě“ se objeví jen u letu, ke kterému máme použitelný volací znak, registraci nebo identifikátor letadla. Ani tehdy nemusí být stroj na mapě vidět: ADS-B přijímače jej nemusí právě zachytit, letadlo může být ještě na zemi nebo mimo pokrytí.
          </p>

          <h2 style={heading}>Která informace je rozhodující</h2>
          <p style={paragraph}>
            Letová tabule FlyQueens je praktický orientační přehled. Časy, zpoždění, změnu terminálu a gate vždy potvrďte na webu letiště nebo u aerolinky. U menších letišť mohou být mezi pravidelnými či sezonními lety dlouhé mezery, takže prázdný přehled nemusí znamenat technickou chybu.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 10, marginTop: 28 }}>
            <Link href={`/letiste/${airport.slug}`} style={{ padding: '15px 16px', border: '1px solid var(--border-mid)', borderRadius: 12, color: 'var(--text-primary)', background: 'var(--midnight-2)', textDecoration: 'none' }}>
              <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif' }}>Průvodce letištěm</strong>
              <span style={{ display: 'block', marginTop: 4, color: 'var(--text-dim)', fontSize: 12 }}>Doprava, odbavení a praktické tipy →</span>
            </Link>
            <Link href={`/letiste/${airport.slug}/parkovani`} style={{ padding: '15px 16px', border: '1px solid var(--border-mid)', borderRadius: 12, color: 'var(--text-primary)', background: 'var(--midnight-2)', textDecoration: 'none' }}>
              <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif' }}>Parkování u letiště</strong>
              <span style={{ display: 'block', marginTop: 4, color: 'var(--text-dim)', fontSize: 12 }}>Ověřené možnosti a ceny →</span>
            </Link>
            <Link href="/radar" style={{ padding: '15px 16px', border: '1px solid var(--border-mid)', borderRadius: 12, color: 'var(--text-primary)', background: 'var(--midnight-2)', textDecoration: 'none' }}>
              <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif' }}>Živá mapa letadel</strong>
              <span style={{ display: 'block', marginTop: 4, color: 'var(--text-dim)', fontSize: 12 }}>Poslední dostupné polohy nad Evropou →</span>
            </Link>
          </div>

          <p style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 24, lineHeight: 1.6 }}>
            Stránka a odkazy ověřeny 13. září 2026. Provozní data se obnovují automaticky; jejich dostupnost se může u jednotlivých letů lišit.
          </p>
          <SourcesBox
            sources={[
              { label: `${airport.name}: oficiální letová tabule`, href: airport.officialFlightsUrl },
              { label: 'AeroDataBox: dokumentace Airport FIDS API', href: 'https://doc.aerodatabox.com/#operation/GetAirportFlights' },
            ]}
            note="FlyQueens není provozovatelem letiště ani aerolinkou. Rozhodující jsou vždy oficiální provozní informace."
          />
        </div>
      </div>
    </main>
  )
}
