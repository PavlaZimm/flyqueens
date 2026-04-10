'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [dots, setDots] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setDots(d => d === 3 ? 1 : d + 1), 500)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'var(--midnight)', gap: 24, zIndex: 9999,
    }}>
      {/* Animované letadlo */}
      <div style={{ position: 'relative', width: 120, height: 60 }}>
        <div style={{ animation: 'fq-fly 2s ease-in-out infinite', position: 'absolute', fontSize: 32, left: 0 }}>
          ✈
        </div>
        {/* Tečkovaná čára */}
        <div style={{
          position: 'absolute', bottom: 10, left: 0, right: 0, height: 1,
          background: 'repeating-linear-gradient(90deg, rgba(253,224,71,0.4) 0px, rgba(253,224,71,0.4) 6px, transparent 6px, transparent 12px)',
          animation: 'fq-trail 2s ease-in-out infinite',
        }} />
      </div>

      <div>
        <div className="font-display" style={{ fontSize: 18, fontWeight: 800, color: 'var(--gold)', letterSpacing: 3, textAlign: 'center' }}>
          NAČÍTÁM LETY
          <span style={{ display: 'inline-block', width: 24, textAlign: 'left' }}>
            {'.'.repeat(dots)}
          </span>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1.5, textAlign: 'center', marginTop: 6 }}>
          CENTRAL EUROPE · ADS-B DATA
        </div>
      </div>

      <style>{`
        @keyframes fq-fly {
          0%   { transform: translateX(0px) translateY(0px) rotate(-5deg); }
          25%  { transform: translateX(30px) translateY(-8px) rotate(-2deg); }
          50%  { transform: translateX(60px) translateY(-4px) rotate(0deg); }
          75%  { transform: translateX(90px) translateY(-10px) rotate(-4deg); }
          100% { transform: translateX(0px) translateY(0px) rotate(-5deg); }
        }
        @keyframes fq-trail {
          0%   { opacity: 0.2; }
          50%  { opacity: 0.8; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
