import type { Metadata } from 'next'
import Link from 'next/link'
import { POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog o letadlech a létání | FlyQueens',
  description: 'Jak funguje sledování letadel, co znamenají kódy a signály, a co se děje ve vzduchu nad Českem. Srozumitelně a bez omáčky.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog' },
}

export default function BlogIndexPage() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · Blog'}
        </nav>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Blog
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 26px' }}>
          Jak funguje sledování letadel, co znamenají kódy a signály z kokpitu, a co zajímavého se děje
          ve vzduchu nad Českem. Bez omáčky, s konkrétními příklady.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{p.tag}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, lineHeight: 1.25, marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8 }}>{p.excerpt}</div>
                <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{p.dateLabel} · Číst →</div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
