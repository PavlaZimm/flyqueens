'use client'

export function LiveBadge() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: 'rgba(34, 197, 94, 0.12)',
        border: '1px solid rgba(34, 197, 94, 0.25)',
        borderRadius: 6,
        padding: '3px 8px',
      }}
    >
      <div
        className="live-dot"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--green-live)',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--green-live)',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        ŽIVĚ
      </span>
    </div>
  )
}
