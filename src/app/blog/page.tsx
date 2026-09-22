import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BLOG_CARDS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import { AUTHOR } from '@/lib/author'

export const metadata: Metadata = {
  title: 'Letecký blog: radary, letiště a sledování letů',
  description: 'Praktické návody ke sledování letadel a letů, živým radarům, letištím, výšce letu i squawk kódům. Srozumitelně a s ověřenými zdroji.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog' },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  creator: AUTHOR.name,
  ...socialMetadata({
    title: 'Letecký blog: radary, letiště a sledování letů',
    description: 'Praktické návody ke sledování letadel, letištím a živým letovým datům.',
    url: 'https://www.flyqueens.cz/blog',
  }),
}

export default function BlogIndexPage() {
  const posts = [...BLOG_CARDS].sort((a, b) => b.date.localeCompare(a.date))
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · Blog'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letecký blog FlyQueens
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 26px' }}>
          Jak sledovat letadla a konkrétní lety, číst údaje z radaru a rozumět tomu, co se děje ve vzduchu.
          Prakticky, s ověřenými zdroji a bez zbytečných zkratek.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map((p, i) => (
            <Link key={p.slug} href={p.href} style={{ textDecoration: 'none' }}>
              <article style={{ overflow: 'hidden', background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12 }}>
                <div style={{ position: 'relative', aspectRatio: '16 / 6', background: 'var(--midnight-3)' }}>
                  <Image src={p.image} alt={p.imageAlt} fill preload={i === 0} sizes="(max-width: 796px) calc(100vw - 36px), 760px" style={{ objectFit: 'cover', objectPosition: p.imagePosition ?? 'center' }} />
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{p.tag}</div>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 18, fontWeight: 800, lineHeight: 1.25, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8 }}>{p.excerpt}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{AUTHOR.name} · {p.dateLabel} · {p.readingTime} · Číst →</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
