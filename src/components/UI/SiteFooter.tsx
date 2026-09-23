import Link from 'next/link'
import { BLOG_CARDS } from '@/lib/blog'

// Patička obsahových stránek (letiště, blog, statistiky).
// Objevitelnost pro návštěvníky + interní prolinkování pro SEO.

const col = { fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 } as const
const link = { display: 'block', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', padding: '3px 0', lineHeight: 1.5 } as const

export function SiteFooter() {
  const posts = [...BLOG_CARDS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

  return (
    <footer style={{ background: 'var(--midnight)', borderTop: '1px solid var(--border-subtle)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 18px 34px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 20 }}>

          <div>
            <div style={col}>Prozkoumat</div>
            <Link href="/radar" style={link}>Živá mapa letadel</Link>
            <Link href="/stats" style={link}>Statistiky provozu</Link>
            <Link href="/blog" style={link}>Blog</Link>
            <Link href="/o-projektu" style={link}>O projektu a zdrojích dat</Link>
          </div>

          <div>
            <div style={col}>Letiště</div>
            <Link href="/letiste/praha" style={link}>Praha (PRG)</Link>
            <Link href="/letiste/brno" style={link}>Brno (BRQ)</Link>
            <Link href="/letiste/ostrava" style={link}>Ostrava (OSR)</Link>
            <Link href="/letiste/pardubice" style={link}>Pardubice (PED)</Link>
            <Link href="/letiste/karlovy-vary" style={link}>Karlovy Vary (KLV)</Link>
            <Link href="/letiste/ceske-budejovice" style={link}>České Budějovice (JCL)</Link>
            <Link href="/letiste/praha/parkovani" style={link}>Parkování u letiště Praha</Link>
          </div>

          <div>
            <div style={col}>Z blogu</div>
            {posts.map((p) => (
              <Link key={p.href} href={p.href} style={link}>{p.title}</Link>
            ))}
          </div>

        </div>

        <div style={{ marginTop: 22, paddingTop: 14, borderTop: '1px solid var(--border-subtle)', fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          <div>FlyQueens · dostupná ADS-B data o letadlech nad Českem a okolím. Aktuální zdroj a stav najdete přímo v mapě.</div>
          <div style={{ marginTop: 5 }}>
            Vytvořeno s láskou k létání a při popíjení kávy ·{' '}
            <a href="https://linklady.cz" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              Linklady.cz
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
