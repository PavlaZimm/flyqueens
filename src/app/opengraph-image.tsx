import { ImageResponse } from 'next/og'

// Edge runtime nechává OG obrázek generovat až při požadavku; Node prerender
// během buildu stahuje externí emoji font a v izolovaném CI může selhat.
export const runtime = 'edge'
export const alt = 'FlyQueens — živá mapa letadel'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#05080D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(79,224,176,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 10%, rgba(245,184,61,0.08) 0%, transparent 50%)',
          display: 'flex',
        }} />

        {/* Decorative flight path arc */}
        <div style={{
          position: 'absolute',
          top: 80, left: 60, right: 60,
          height: 2,
          background: 'linear-gradient(90deg, transparent 0%, rgba(245,184,61,0.3) 30%, rgba(245,184,61,0.6) 50%, rgba(245,184,61,0.3) 70%, transparent 100%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute',
          top: 100, left: 120, right: 120,
          height: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(90,169,255,0.2) 40%, rgba(90,169,255,0.4) 50%, rgba(90,169,255,0.2) 60%, transparent 100%)',
          display: 'flex',
        }} />

        {/* Aircraft dots on path */}
        {[200, 450, 720, 950].map((x, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: 72,
            left: x,
            width: 16,
            height: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}>✈</div>
        ))}

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, zIndex: 1 }}>

          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width="86" height="86" viewBox="0 0 64 64" fill="none">
              <rect width="64" height="64" rx="16" fill="#F5B83D" />
              <path d="M32 13l5.4 12.4H26.6L32 13z" fill="#05080D" />
              <path d="M18.5 22.5l6.2 12.9-11.3-3.6 5.1-9.3z" fill="#05080D" />
              <path d="M45.5 22.5l5.1 9.3-11.3 3.6 6.2-12.9z" fill="#05080D" />
              <rect x="13" y="42" width="38" height="7" rx="3.5" fill="#05080D" />
            </svg>
            <div style={{
              fontWeight: 800,
              fontSize: 88,
              color: '#E9EEF6',
              letterSpacing: -3,
              lineHeight: 1,
            }}>
              Fly<span style={{ color: '#F5B83D' }}>Queens</span>
            </div>
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: 26,
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 400,
            letterSpacing: 1,
            marginTop: 4,
          }}>
            Živá mapa letadel · Česko a okolí
          </div>

          {/* Feature badges */}
          <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
            {[
              { icon: '✈', text: 'Živá ADS-B data' },
              { icon: '🌦', text: 'Počasí METAR' },
              { icon: '📍', text: 'Letadla nad tebou' },
              { icon: '🗺', text: 'Interaktivní mapa' },
            ].map(({ icon, text }) => (
              <div key={text} style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 10,
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 19,
                color: 'rgba(255,255,255,0.85)',
              }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom URL */}
        <div style={{
          position: 'absolute',
          bottom: 36,
          fontSize: 18,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: 3,
        }}>
          www.flyqueens.cz
        </div>

        {/* Bottom accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 4,
          background: 'linear-gradient(90deg, transparent, #F5B83D 30%, #5AA9FF 70%, transparent)',
          display: 'flex',
        }} />
      </div>
    ),
    { ...size }
  )
}
