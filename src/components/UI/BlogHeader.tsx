import Link from 'next/link'
import { FlyQueensLogo } from '@/components/Brand/FlyQueensLogo'
import { HomeThemeToggle } from '@/components/Landing/HomeThemeToggle'
import styles from './BlogHeader.module.css'

export function BlogHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <FlyQueensLogo compact showTagline />

        <nav className={styles.nav} aria-label="Hlavní navigace">
          <Link href="/">Domů</Link>
          <Link href="/letiste">Letiště</Link>
          <Link className={styles.optionalLink} href="/stats">Statistiky</Link>
          <Link className={styles.activeLink} href="/blog" aria-current="page">Blog</Link>
        </nav>

        <HomeThemeToggle className={styles.themeToggle} />
        <Link className={styles.radarLink} href="/radar">Živá mapa</Link>
      </div>
    </header>
  )
}
