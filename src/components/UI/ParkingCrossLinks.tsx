import Link from 'next/link'

// Můstky mezi parkovacími stránkami — interní prolinkování pro SEO
// i pro návštěvníky, kteří srovnávají letiště.
const ALL = [
  { slug: 'praha', label: 'Praha (PRG)' },
  { slug: 'brno', label: 'Brno (BRQ)' },
  { slug: 'ostrava', label: 'Ostrava (OSR)' },
]

export function ParkingCrossLinks({ current }: { current: string }) {
  const others = ALL.filter((a) => a.slug !== current)
  return (
    <div style={{ marginTop: 26 }}>
      <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 8 }}>
        Parkování u dalších letišť
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {others.map((a) => (
          <Link
            key={a.slug}
            href={`/letiste/${a.slug}/parkovani`}
            style={{
              background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: 8, padding: '8px 12px', fontSize: 13,
              color: 'var(--text-muted)', textDecoration: 'none',
            }}
          >
            {a.label} →
          </Link>
        ))}
      </div>
    </div>
  )
}
