import type { Metadata } from 'next'
import Link from 'next/link'
import { FlyQueensLogo } from '@/components/Brand/FlyQueensLogo'
import { LiveFlightCount } from '@/components/Landing/LiveFlightCount'
import { LiveRadarPreview } from '@/components/Landing/LiveRadarPreview'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Živá mapa letadel nad Evropou | FlyQueens',
  description: 'Sledujte letadla online na živé mapě. Zjistěte dostupnou polohu, výšku, rychlost a trasu letů ve vybraných oblastech Evropy.',
  alternates: { canonical: 'https://www.flyqueens.cz' },
  ...socialMetadata({
    title: 'Živá mapa letadel nad Evropou | FlyQueens',
    description: 'Zjistěte, co vám právě letí nad hlavou. Poloha, výška, rychlost a dostupná trasa na živé mapě letadel.',
    url: 'https://www.flyqueens.cz',
  }),
}

const AIRPORTS = [
  { code: 'PRG', city: 'Praha', note: 'provoz, počasí a parkování', href: '/letiste/praha' },
  { code: 'BRQ', city: 'Brno', note: 'Tuřany prakticky', href: '/letiste/brno' },
  { code: 'OSR', city: 'Ostrava', note: 'Mošnov a parkoviště', href: '/letiste/ostrava' },
]

function FeatureIcon({ type }: { type: 'nearby' | 'detail' | 'status' }) {
  const paths = {
    nearby: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    detail: <><path d="M5 19V9M12 19V5M19 19v-7" /><path d="m4 8 7-4 8 7" /></>,
    status: <><path d="M4 12.5 9 17l11-11" /><circle cx="12" cy="12" r="9" /></>,
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24">{paths[type]}</svg>
}

export default function HomePage() {
  const latestPosts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FlyQueens',
    url: 'https://www.flyqueens.cz',
    description: 'Živá mapa dostupných ADS-B dat o letadlech ve vybraných oblastech Evropy.',
  }

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c') }}
      />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <FlyQueensLogo compact />
          <nav className={styles.nav} aria-label="Hlavní navigace">
            <Link href="/radar">Živá mapa</Link>
            <Link href="/letiste">Letiště</Link>
            <Link href="/stats">Statistiky</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link href="/radar" className={styles.headerCta}>Otevřít radar</Link>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.heroLayout}>
              <div className={styles.heroCopy}>
                <LiveFlightCount className={styles.liveFlightCount} dotClassName={styles.liveDot} />
                <h1>
                  Víš, co ti právě letí <span>nad hlavou.</span>
                </h1>
                <p>
                  Najdi letadlo nad sebou a zjisti jeho výšku, rychlost, směr i dostupnou trasu.
                  Sleduj živá ADS-B data ve vybraných oblastech Evropy — zdarma a bez účtu.
                </p>
                <form action="/radar" method="get" className={styles.search}>
                  <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
                  <input
                    name="search"
                    maxLength={10}
                    autoComplete="off"
                    aria-label="Číslo letu, registrace nebo ICAO adresa"
                    placeholder="Let, registrace nebo ICAO — např. TVS123"
                  />
                  <button type="submit">Najít</button>
                </form>
                <div className={styles.popular}>
                  <span>RYCHLÉ ODKAZY:</span>
                  <Link href="/letiste/praha">LKPR Praha</Link>
                  <Link href="/letiste/brno">LKTB Brno</Link>
                  <Link href="/stats">Statistiky</Link>
                </div>
              </div>
              <LiveRadarPreview />
            </div>
          </div>
        </section>

        <section className={styles.metrics} aria-label="Parametry živé mapy">
          <div className={styles.metric}><strong>10 s</strong><span>obnova mapy</span></div>
          <div className={styles.metric}><strong>250 NM</strong><span>poloměr oblasti</span></div>
          <div className={styles.metric}><strong>30 km</strong><span>letadla nad tebou</span></div>
          <div className={styles.metric}><strong>Zdarma</strong><span>bez registrace</span></div>
        </section>

        <section className={styles.features}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <span>CO UMÍ DNES</span>
              <h2>Živá data bez zbytečného hledání.</h2>
              <p>Poloha, výška, rychlost, směr a dostupná trasa letadla na jednom místě — včetně informace o zdroji a čerstvosti dat.</p>
            </div>
            <div className={styles.featureGrid}>
              <article className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.goldIcon}`}><FeatureIcon type="nearby" /></div>
                <h3>Letadla nad tebou</h3>
                <p>Najdi svou polohu a zobraz stroje v okruhu 30 km přímo na mapě.</p>
              </article>
              <article className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.mintIcon}`}><FeatureIcon type="detail" /></div>
                <h3>Detail bez hádání</h3>
                <p>Výška, rychlost, kurz, registrace a další údaje jen tehdy, když je zdroj skutečně poskytne.</p>
              </article>
              <article className={styles.featureCard}>
                <div className={`${styles.featureIcon} ${styles.blueIcon}`}><FeatureIcon type="status" /></div>
                <h3>Stav dat bez mlžení</h3>
                <p>Vždy vidíš zdroj i to, zda jsou data živá, poslední známá, nebo nedostupná.</p>
              </article>
            </div>
            <div className={styles.featureAction}>
              <div>
                <span>ŽIVÝ RADAR</span>
                <h3>Podívej se, co je ve vzduchu právě teď.</h3>
              </div>
              <Link href="/radar">Otevřít mapu <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <span>PŘED ODLETEM</span>
              <h2>Letiště bez zbytečného hledání.</h2>
              <p>Praktické průvodce, parkování a živý provoz pro hlavní česká letiště.</p>
            </div>
            <div className={styles.airportGrid}>
              {AIRPORTS.map((airport) => (
                <Link href={airport.href} key={airport.code} className={styles.airportCard}>
                  <span className={styles.airportCode}>{airport.code}</span>
                  <span><strong>{airport.city}</strong><small>{airport.note}</small></span>
                  <span className={styles.arrow} aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.journal}>
          <div className={styles.container}>
            <div className={styles.journalTop}>
              <div className={styles.sectionHeading}>
                <span>LETECKÝ DENÍK</span>
                <h2>Rozuměj tomu, co vidíš.</h2>
              </div>
              <Link href="/blog">Všechny články →</Link>
            </div>
            <div className={styles.articleGrid}>
              {latestPosts.map((post, index) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.articleCard}>
                  <span className={styles.articleNumber}>0{index + 1}</span>
                  <h3>{post.title}</h3>
                  <span className={styles.articleLink}>Číst článek →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <FlyQueensLogo showTagline />
          <p>FlyQueens zobrazuje dostupná veřejná ADS-B data. Mapa je informační a není určena pro navigaci ani bezpečnostní rozhodování.</p>
          <nav aria-label="Odkazy v patičce">
            <Link href="/radar">Živá mapa</Link>
            <Link href="/o-projektu">O projektu a datech</Link>
            <Link href="/letiste">Letiště</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <small>
            © 2026 FLYQUEENS.CZ · VYTVOŘENO S LÁSKOU K LÉTÁNÍ A PŘI POPÍJENÍ KÁVY ·{' '}
            <a href="https://linklady.cz" target="_blank" rel="noopener noreferrer">LINKLADY.CZ</a>
          </small>
        </div>
      </footer>
    </div>
  )
}
