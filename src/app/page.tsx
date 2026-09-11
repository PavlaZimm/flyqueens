import type { Metadata } from 'next'
import Link from 'next/link'
import { FlyQueensLogo } from '@/components/Brand/FlyQueensLogo'
import { LiveFlightCount } from '@/components/Landing/LiveFlightCount'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Živá mapa letadel nad Českem | FlyQueens',
  description: 'Zjistěte, co vám právě letí nad hlavou. FlyQueens zobrazuje dostupná živá ADS-B data o letadlech nad Českem a okolím.',
  alternates: { canonical: 'https://www.flyqueens.cz' },
  ...socialMetadata({
    title: 'Živá mapa letadel nad Českem | FlyQueens',
    description: 'Zjistěte, co vám právě letí nad hlavou. Živá mapa dostupných ADS-B dat nad Českem a okolím.',
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

function RadarPreview() {
  return (
    <div className={styles.radarCard} aria-hidden="true">
      <svg className={styles.radarGraphic} viewBox="0 0 680 520" role="presentation">
        <defs>
          <radialGradient id="radar-glow" cx="70%" cy="40%" r="55%">
            <stop offset="0" stopColor="#4FE0B0" stopOpacity=".2" />
            <stop offset="1" stopColor="#4FE0B0" stopOpacity="0" />
          </radialGradient>
          <pattern id="radar-grid" width="58" height="58" patternUnits="userSpaceOnUse">
            <path d="M58 0H0V58" fill="none" stroke="#22304A" strokeOpacity=".62" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="680" height="520" fill="url(#radar-grid)" />
        <rect width="680" height="520" fill="url(#radar-glow)" />
        <circle cx="420" cy="270" r="82" fill="none" stroke="#4FE0B0" strokeOpacity=".28" />
        <circle cx="420" cy="270" r="150" fill="none" stroke="#4FE0B0" strokeOpacity=".14" />
        <path d="M42 425C160 390 235 342 330 280S510 165 652 142" fill="none" stroke="#5AA9FF" strokeOpacity=".7" strokeDasharray="7 10" strokeWidth="2" />
        <path d="M70 110C185 145 290 218 400 266S555 350 645 430" fill="none" stroke="#F5B83D" strokeOpacity=".62" strokeDasharray="7 10" strokeWidth="2" />
        <g transform="translate(318 276) rotate(-31)" fill="#E9EEF6">
          <path d="M0-17 4-4l16 8v5L4 6 2 19h-4L-4 6l-16 3V4l16-8 4-13Z" />
        </g>
        <g transform="translate(495 219) rotate(36)" fill="#4FE0B0">
          <path d="M0-13 3-3l12 6v4L3 5 1 14h-2L-3 5l-12 2V3l12-6 3-10Z" />
        </g>
        <g transform="translate(190 356) rotate(52)" fill="#8698B0">
          <path d="M0-11 3-2l10 5v3L3 4 1 12h-2L-3 4l-10 2V3l10-5 3-9Z" />
        </g>
      </svg>
      <div className={styles.radarStatus}>
        <span className={styles.radarStatusDot} />
        ADS-B LIVE
      </div>
      <div className={styles.radarLabel}>
        <span>AKTUÁLNÍ OBLAST</span>
        <strong>Česko + okolí</strong>
        <small>obnova mapy každých 10 s</small>
      </div>
      <div className={styles.radarScale}>250 NM</div>
    </div>
  )
}

export default function HomePage() {
  const latestPosts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FlyQueens',
    url: 'https://www.flyqueens.cz',
    description: 'Živá mapa dostupných ADS-B dat o letadlech nad Českem a okolím.',
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
                  Živá mapa dostupného leteckého provozu nad Českem a okolím.
                  Sleduj let, registraci nebo ICAO adresu v ADS-B datech — zdarma a bez registrace.
                </p>
                <form action="/radar" method="get" className={styles.search}>
                  <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m16 16 5 5" /></svg>
                  <input
                    name="search"
                    maxLength={10}
                    autoComplete="off"
                    aria-label="Číslo letu, registrace nebo ICAO adresa"
                    placeholder="Číslo letu, registrace nebo ICAO — např. TVS123"
                  />
                  <button type="submit">Najít</button>
                </form>
                <div className={styles.popular}>
                  <span>PROZKOUMAT:</span>
                  <Link href="/letiste/praha">LKPR Praha</Link>
                  <Link href="/letiste/brno">LKTB Brno</Link>
                  <Link href="/stats">Statistiky</Link>
                </div>
              </div>
              <RadarPreview />
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
              <h2>Mapa, která ukazuje to podstatné.</h2>
              <p>Žádná vymyšlená síť ani falešné sliby. Jen funkce, které můžeš opravdu použít.</p>
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
          <p>Dostupná ADS-B data pro zajímavost. Nejsou určena pro navigaci ani krizové rozhodování.</p>
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
