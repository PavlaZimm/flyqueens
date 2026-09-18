import Link from 'next/link'
import { FlyQueensLogo } from '@/components/Brand/FlyQueensLogo'
import { HomeThemeToggle } from '@/components/Landing/HomeThemeToggle'
import styles from './SiteHeader.module.css'

export function SiteHeader({ activeSection }: { activeSection: 'blog' | 'letiste' | 'stats' }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <FlyQueensLogo compact showTagline />

        <nav className={styles.nav} aria-label="Hlavní navigace">
          {[
            { href: '/', label: 'Domů', section: 'home' },
            { href: '/letiste', label: 'Letiště', section: 'letiste' },
            { href: '/stats', label: 'Statistiky', section: 'stats' },
            { href: '/blog', label: 'Blog', section: 'blog' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={item.section === activeSection ? styles.activeLink : undefined}
              aria-current={item.section === activeSection ? 'location' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <HomeThemeToggle className={styles.themeToggle} />
        <Link className={styles.radarLink} href="/radar">Živá mapa</Link>
      </div>
    </header>
  )
}
