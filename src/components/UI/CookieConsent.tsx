'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const KEY = 'fq-cookie-consent'
type Consent = 'granted' | 'denied' | null

// GDPR: Google Analytics se načte až po souhlasu. Vercel Analytics je
// cookieless, takže lištou procházet nemusí.
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    if (saved === 'granted' || saved === 'denied') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(saved)
    }
     
    setReady(true)
  }, [])

  const decide = (value: Exclude<Consent, null>) => {
    localStorage.setItem(KEY, value)
    setConsent(value)
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-SMFS92YP8L" strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SMFS92YP8L');
          `}</Script>
        </>
      )}

      {ready && consent === null && (
        <div
          role="dialog"
          aria-label="Souhlas s cookies"
          style={{
            position: 'fixed',
            bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
            left: 12, right: 12,
            zIndex: 3000,
            maxWidth: 480,
            margin: '0 auto',
            background: 'rgba(15, 23, 42, 0.97)',
            border: '1px solid var(--glass-border)',
            borderRadius: 12,
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.75)', flex: '1 1 220px' }}>
            Používáme Google Analytics, ať víme, co na webu funguje. Žádná reklama, jen statistika návštěv.
          </span>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button
              onClick={() => decide('denied')}
              style={{
                background: 'none', border: '1px solid var(--glass-border)', borderRadius: 8,
                color: 'rgba(255,255,255,0.6)', fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 11, padding: '7px 10px', cursor: 'pointer',
              }}
            >
              Jen nezbytné
            </button>
            <button
              onClick={() => decide('granted')}
              style={{
                background: 'var(--gold)', border: 'none', borderRadius: 8,
                color: '#0F172A', fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 11, letterSpacing: 0.5, padding: '7px 12px', cursor: 'pointer',
              }}
            >
              Povolit
            </button>
          </div>
        </div>
      )}
    </>
  )
}
