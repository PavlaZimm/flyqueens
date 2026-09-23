import Link from 'next/link'
import { SiteHeader } from '@/components/UI/SiteHeader'
import { SiteFooter } from '@/components/UI/SiteFooter'

export default function NotFound() {
  return (
    <>
    <SiteHeader />
    <main style={{ minHeight: '60dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18 }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>🛫</div>
        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 26, fontWeight: 800, margin: '0 0 8px' }}>
          Tahle stránka odletěla
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 20px' }}>
          Adresa neexistuje nebo se přesunula. Zkuste živou mapu, přehled letišť nebo blog.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/radar" style={{ background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 16px', borderRadius: 10, textDecoration: 'none' }}>
            Živá mapa
          </Link>
          <Link href="/letiste" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 16px', borderRadius: 10, textDecoration: 'none' }}>
            Letiště
          </Link>
          <Link href="/blog" style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 16px', borderRadius: 10, textDecoration: 'none' }}>
            Blog
          </Link>
        </div>
      </div>
    </main>
    <SiteFooter />
    </>
  )
}
