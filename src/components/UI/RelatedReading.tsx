import Link from 'next/link'

type RelatedItem = {
  href: string
  eyebrow: string
  title: string
  description: string
}

export function RelatedReading({ items }: { items: RelatedItem[] }) {
  return (
    <aside aria-labelledby="related-reading" style={{ marginTop: 34 }}>
      <div id="related-reading" style={{ color: 'var(--gold)', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: 1.4, marginBottom: 10 }}>
        POKRAČUJTE VE ČTENÍ
      </div>
      <div style={{ display: 'grid', gap: 9 }}>
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            style={{
              display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 14,
              padding: '14px 16px', border: '1px solid var(--border-mid)', borderRadius: 11,
              background: 'var(--midnight-2)', color: 'var(--text-primary)', textDecoration: 'none',
            }}
          >
            <span>
              <small style={{ display: 'block', color: 'var(--text-dim)', fontSize: 9, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{item.eyebrow}</small>
              <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif', fontSize: 15, lineHeight: 1.3 }}>{item.title}</strong>
              <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>{item.description}</span>
            </span>
            <span aria-hidden="true" style={{ alignSelf: 'center', color: 'var(--gold)', fontSize: 18 }}>→</span>
          </Link>
        ))}
      </div>
    </aside>
  )
}
