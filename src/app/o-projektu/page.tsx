import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/UI/SiteHeader'
import { SiteFooter } from '@/components/UI/SiteFooter'
import { PrivacySettingsButton } from '@/components/UI/CookieConsent'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'O projektu a zdrojích dat | FlyQueens',
  description: 'Jak FlyQueens získává polohy letadel, jak číst odhady a jaké limity mají veřejná ADS-B data.',
  alternates: { canonical: 'https://www.flyqueens.cz/o-projektu' },
  ...socialMetadata({
    title: 'O projektu a zdrojích dat | FlyQueens',
    description: 'Jak FlyQueens získává polohy letadel, jak číst odhady a jaké limity mají veřejná ADS-B data.',
    url: 'https://www.flyqueens.cz/o-projektu',
  }),
}

const section = { marginTop: 28 } as const
const heading = { fontFamily: 'Archivo, sans-serif', fontSize: 21, margin: '0 0 10px' } as const
const paragraph = { color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' } as const

export default function AboutProjectPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ minHeight: '70dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <article style={{ maxWidth: 760, margin: '0 auto', padding: '42px 18px 56px' }}>
          <Link href="/radar" style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: 13 }}>← Zpět na mapu</Link>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 34, lineHeight: 1.15, margin: '24px 0 14px' }}>
            O projektu a datech
          </h1>
          <p style={paragraph}>
            FlyQueens je informační a fanouškovská mapa leteckého provozu. Není radarovým systémem řízení letového provozu
            a nesmí se používat pro navigaci, bezpečnostní rozhodování ani jako jediný zdroj informací o konkrétním letu.
          </p>

          <section style={section}>
            <h2 style={heading}>Polohy letadel</h2>
            <p style={paragraph}>
              Mapa zobrazuje polohy zachycené dostupnými ADS-B přijímači. Primárním technickým zdrojem je ADSB.lol.
              Aktuálně použitý zdroj, dostupnost a případné zastarání dat ukazujeme přímo v mapě.
            </p>
            <p style={paragraph}>
              Data ADSB.lol jsou poskytována pod licencí{' '}
              <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>ODbL 1.0</a>.
              Pokrytí není úplné: některá letadla nevysílají polohu, mohou být mimo dosah přijímačů nebo mohou mít záměrně omezené zobrazení.
            </p>
          </section>

          <section style={section}>
            <h2 style={heading}>Trasy, časy a odhady</h2>
            <p style={paragraph}>
              Trasa, průběh letu a čas do přistání mohou být odhadované z aktuální polohy a rychlosti. Nejde o údaj pilota,
              aerolinky ani letiště. Pokud máme licencovaná letová data, zobrazíme plánovaný nebo skutečný čas odděleně od odhadu.
            </p>
          </section>

          <section style={section}>
            <h2 style={heading}>Nouzové kódy</h2>
            <p style={paragraph}>
              Squawk 7500, 7600 nebo 7700 upozorňuje na stav vysílaný odpovídačem. Samotné zobrazení kódu nepotvrzuje nehodu
              a může být chybné, opožděné nebo součástí testu. V naléhavé situaci vždy používejte oficiální informační kanály.
            </p>
          </section>

          <section style={section}>
            <h2 style={heading}>Transparentnost</h2>
            <p style={paragraph}>
              Ukázková letadla nevydáváme za živá data. Při výpadku zobrazíme poslední známý snapshot s upozorněním,
              nebo jasný stav nedostupnosti. Dynamické ceny na obsahových stránkách je potřeba před nákupem ověřit u poskytovatele.
            </p>
          </section>
          <section id="soukromi" style={{ ...section, scrollMarginTop: 100 }}>
            <h2 style={heading}>Soukromí a partnerské odkazy</h2>
            <p style={paragraph}>Google Analytics a skripty Stay22 a Impact spouštíme až po souhlasu. Stay22 může doplnit partnerské nabídky a upravit podporované rezervační odkazy. Impact upravuje podporované odkazy na partnerské a měří zobrazení stránek. Z nákupů a rezervací přes partnerské odkazy může FlyQueens získat provizi.</p>
            <p style={paragraph}>Odmítnutí nebrání čtení článků ani používání radaru. Označené rezervační odkazy lze otevřít i bez zapnutého skriptu; poté přecházíte na službu partnera. Při odvolání souhlasu stránku znovu načteme, aby se již spuštěné skripty zastavily.</p>
            <PrivacySettingsButton />
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
