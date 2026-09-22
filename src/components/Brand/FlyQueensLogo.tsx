import Link from 'next/link'

type FlyQueensLogoProps = {
  compact?: boolean
  href?: string
  showTagline?: boolean
  className?: string
}

export function CrownMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
    >
      <rect width="64" height="64" rx="16" fill="var(--gold)" />
      <path d="M32 13l5.4 12.4H26.6L32 13z" fill="var(--on-gold)" />
      <path d="M18.5 22.5l6.2 12.9-11.3-3.6 5.1-9.3z" fill="var(--on-gold)" />
      <path d="M45.5 22.5l5.1 9.3-11.3 3.6 6.2-12.9z" fill="var(--on-gold)" />
      <rect x="13" y="42" width="38" height="7" rx="3.5" fill="var(--on-gold)" />
    </svg>
  )
}

export function FlyQueensLogo({
  compact = false,
  href = '/',
  showTagline = false,
  className,
}: FlyQueensLogoProps) {
  return (
    <Link
      href={href}
      className={className}
      aria-label="FlyQueens — úvodní stránka"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 9 : 11,
        color: 'var(--text-primary)',
        textDecoration: 'none',
        flexShrink: 0,
      }}
    >
      <CrownMark size={compact ? 30 : 38} />
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontSize: compact ? 17 : 22,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1,
          }}
        >
          Fly<span style={{ color: 'var(--gold)' }}>Queens</span>
        </span>
        {showTagline && (
          <span
            style={{
              color: 'var(--text-dim)',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: compact ? 6 : 7,
              letterSpacing: '0.28em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            live air traffic
          </span>
        )}
      </span>
    </Link>
  )
}
