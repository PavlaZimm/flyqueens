import type { Metadata } from 'next'
import Link from 'next/link'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from '@/components/Article/Article.module.css'

export const metadata: Metadata = {
  title: 'Letiště v Česku: parkování a živá mapa | FlyQueens',
  description:
    'Přehled hlavních českých letišť s praktickými informacemi o dopravě, parkování, odbavení a odkazy na oficiální odlety, přílety a živou mapu.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste' },
  ...socialMetadata({
    title: 'Letiště v Česku: parkování a živá mapa | FlyQueens',
    description: 'Přehled českých letišť, praktické informace a živá mapa dostupných letových dat.',
    url: 'https://www.flyqueens.cz/letiste',
  }),
}

// Česká letiště s obsahem. hasPage = má vlastní stránku, jinak se připravuje.
const H2 = { fontFamily: 'Archivo, sans-serif', fontSize: 22, fontWeight: 800, margin: '34px 0 10px' } as const
const H3 = { fontFamily: 'Archivo, sans-serif', fontSize: 17, fontWeight: 700, margin: '22px 0 6px' } as const
const P = { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px', color: 'var(--text-muted)' } as const

// Srovnání přebírá jen údaje z vlastních stránek letišť (zdroje jsou tam).
// Při změně na stránce letiště upravit i tady.
const COMPARISON = [
  { href: '/letiste/praha', name: 'Praha (PRG)', transit: 'trolejbus 59, autobus 100, vlak Airport Express', free: 'jen 10 minut', checkin: 'zpravidla 2 h před, zavírá 40 min před' },
  { href: '/letiste/brno', name: 'Brno (BRQ)', transit: 'linky 21 a 77, v noci N89', free: 'jen 20 minut', checkin: 'v létě většina letů 3 h před, Ryanair 2 h' },
  { href: '/letiste/ostrava', name: 'Ostrava (OSR)', transit: 'vlaky S4 a S8 až k odletové hale', free: 'jen 15 minut', checkin: 'zpravidla 2 h před, zavírá 40 min před' },
  { href: '/letiste/pardubice', name: 'Pardubice (PED)', transit: 'MHD linka 90 z hlavního nádraží', free: 'ano, P1 a P2 bez rezervace', checkin: 'doporučený příjezd 2 h před' },
  { href: '/letiste/karlovy-vary', name: 'Karlovy Vary (KLV)', transit: 'autobus číslo 8', free: 'P7, ale bez garance místa', checkin: 'zpravidla 2 h před, zavírá 40 min před' },
  { href: '/letiste/ceske-budejovice', name: 'České Budějovice (JCL)', transit: 'linka 19, zastávka asi 1,5 km od terminálu', free: 'ano, 180 + 500 míst', checkin: 'zpravidla 2 h před, zavírá 45 min před' },
]

const AIRPORTS = [
  { slug: 'praha', name: 'Letiště Václava Havla', city: 'Praha', iata: 'PRG', hasPage: true },
  { slug: 'brno', name: 'Letiště Brno-Tuřany', city: 'Brno', iata: 'BRQ', hasPage: true },
  { slug: 'ostrava', name: 'Letiště Leoše Janáčka', city: 'Ostrava', iata: 'OSR', hasPage: true },
  { slug: 'karlovy-vary', name: 'Letiště Karlovy Vary', city: 'Karlovy Vary', iata: 'KLV', hasPage: true },
  { slug: 'pardubice', name: 'Letiště Pardubice', city: 'Pardubice', iata: 'PED', hasPage: true },
  { slug: 'ceske-budejovice', name: 'Letiště České Budějovice', city: 'České Budějovice', iata: 'JCL', hasPage: true },
]

export default function LetisteIndexPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · Letiště'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště v Česku
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 26px' }}>
          Vyberte letiště a najdete praktické informace, parkování, aktuální počasí a odkazy na oficiální zdroje.
          U každého navíc vidíte dostupná živá data letadel v okolí. Provozní časy a změny vždy ověřujte
          na oficiální tabuli konkrétního letiště.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AIRPORTS.map((a) => {
            const inner = (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                background: 'var(--midnight-2)', border: '1px solid var(--border-mid)',
                borderRadius: 12, padding: '14px 16px',
                opacity: a.hasPage ? 1 : 0.55,
              }}>
                <div>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, fontWeight: 800 }}>
                    {a.city} <span style={{ color: 'var(--gold)', fontSize: 13 }}>{a.iata}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{a.name}</div>
                </div>
                <div style={{ fontSize: 12, color: a.hasPage ? 'var(--gold)' : 'var(--text-dim)', flexShrink: 0 }}>
                  {a.hasPage ? 'Otevřít →' : 'Připravujeme'}
                </div>
              </div>
            )
            return a.hasPage
              ? <Link key={a.slug} href={`/letiste/${a.slug}`} style={{ textDecoration: 'none' }}>{inner}</Link>
              : <div key={a.slug}>{inner}</div>
          })}
        </div>

        <h2 id="ceska-letiste-ve-srovnani" style={H2}>Česká letiště ve srovnání</h2>
        <div className={styles.tableWrap}>
          <table>
            <caption>Doprava, parkování zdarma a odbavení na šesti českých letištích</caption>
            <thead>
              <tr><th scope="col">Letiště</th><th scope="col">MHD a vlak</th><th scope="col">Parkování zdarma</th><th scope="col">Odbavení</th></tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.href}>
                  <th scope="row"><Link href={row.href} style={{ color: 'var(--gold)' }}>{row.name}</Link></th>
                  <td>{row.transit}</td>
                  <td>{row.free}</td>
                  <td>{row.checkin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-dim)', margin: '0 0 12px' }}>
          Údaje ověřené 12.–13. září 2026 (České Budějovice 23. září 2026) na webech letišť a dopravních podniků. Ceny, jízdní řády i časy odbavení se mění, před cestou je potvrďte u provozovatele nebo dopravce. Zdroje najdete na stránce konkrétního letiště.
        </p>

        <h2 id="caste-otazky" style={H2}>Časté otázky</h2>
        <h3 style={H3}>Na kterém českém letišti se dá parkovat zdarma?</h3>
        <p style={P}>
          Dlouhodobě zdarma a bez rezervace parkujete v Pardubicích na P1 a P2 a v Českých Budějovicích na horním i dolním parkovišti. V Karlových Varech je zdarma pruh P7, letiště ale negarantuje volné místo. V Praze, Brně a Ostravě je zdarma jen krátké zastavení: 10, 20 a 15 minut.
        </p>
        <h3 style={H3}>Na které letiště se dostanu vlakem?</h3>
        <p style={P}>
          V Ostravě zastavují vlaky S4 a S8 přímo u odletové haly. Do Prahy jezdí z hlavního nádraží Airport Express, má ale vlastní jízdné a neplatí na něm jízdenka PID.
        </p>
        <h3 style={H3}>Jezdí na pražské letiště metro?</h3>
        <p style={P}>
          Ne. Z metra A pokračujete trolejbusem 59 z Nádraží Veleslavín, z metra B autobusem 100 ze Zličína. V noci jezdí linky 907 a 910.
        </p>
        <h3 style={H3}>Jak dlouho před odletem přijet?</h3>
        <p style={P}>
          Na většině českých letišť se přepážky otevírají zhruba dvě hodiny před odletem a zavírají 40 až 45 minut před ním. Brno v letní sezoně otevírá odbavení většiny letů tři hodiny předem, u Ryanairu dvě. Rozhodující jsou vždy pokyny vašeho dopravce.
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)', margin: '26px 0 0' }}>
          Průvodce zahraničními letišti, kam se z Česka létá nebo jezdí, píšeme na blogu:{' '}
          <Link href="/blog/letiste-kodan" style={{ color: 'var(--gold)' }}>letiště Kodaň</Link>,{' '}
          <Link href="/blog/letiste-lipsko" style={{ color: 'var(--gold)' }}>Lipsko/Halle</Link> a{' '}
          <Link href="/blog/letiste-tivat" style={{ color: 'var(--gold)' }}>Tivat v Černé Hoře</Link>.
        </p>
      </div>
    </main>
  )
}
