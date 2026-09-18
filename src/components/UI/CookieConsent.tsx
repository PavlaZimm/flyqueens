'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Version 2 includes Stay22; the old analytics-only consent is not reused.
const KEY = 'fq-cookie-consent-v2'
type Consent = 'granted' | 'denied' | null

export function PrivacySettingsButton() {
  return <button type="button" onClick={() => window.dispatchEvent(new Event('fq-open-consent'))}
    style={{ padding: '10px 16px', minHeight: 44, borderRadius: 8, border: '1px solid var(--border-mid)', background: 'var(--midnight-2)', color: 'var(--text-primary)', cursor: 'pointer' }}>
    Nastavit soukromí a partnerské služby
  </button>
}

// Optional third-party scripts load only after this version's consent.
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null)
  const [ready, setReady] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    let saved: string | null = null
    try { saved = localStorage.getItem(KEY) } catch { /* Keep the choice usable without storage. */ }
    if (saved === 'granted' || saved === 'denied') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsent(saved)
    }
     
    setReady(true)
    const reopen = () => setEditing(true)
    window.addEventListener('fq-open-consent', reopen)
    return () => window.removeEventListener('fq-open-consent', reopen)
  }, [])

  const decide = (value: Exclude<Consent, null>) => {
    try { localStorage.setItem(KEY, value) } catch { /* The choice still applies to this page. */ }
    const needsReload = consent === 'granted' && value === 'denied'
    setConsent(value)
    setEditing(false)
    if (needsReload) window.location.reload()
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script id="stay22-init" strategy="lazyOnload">{`
            (function (s, t, a, y, twenty, two) {
              s.Stay22 = s.Stay22 || {};
              s.Stay22.params = { lmaID: '6aad790b12895152a4028ac0' };
              twenty = t.createElement(a); two = t.getElementsByTagName(a)[0];
              twenty.async = 1; twenty.id = 'stay22-loader'; twenty.src = y;
              two.parentNode.insertBefore(twenty, two);
            })(window, document, 'script', 'https://scripts.stay22.com/letmeallez.js');
          `}</Script>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-SMFS92YP8L" strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SMFS92YP8L');
          `}</Script>
        </>
      )}

      {ready && (consent === null || editing) && (
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
          <span style={{ fontSize: 11, lineHeight: 1.45, color: 'rgba(255,255,255,0.75)', flex: '1 1 210px' }}>
            S vaším souhlasem zapneme Google Analytics a partnerská doporučení Stay22, včetně měření rezervací.
            Volbu můžete změnit na stránce <a href="/o-projektu#soukromi" style={{ color: 'inherit', textDecoration: 'underline' }}>O projektu</a>.
          </span>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button
              onClick={() => decide('denied')}
              style={{
                background: 'none', border: '1px solid var(--glass-border)', borderRadius: 8,
                color: 'rgba(255,255,255,0.6)', fontFamily: 'IBM Plex Sans, sans-serif',
                fontSize: 11, minHeight: 36, padding: '7px 10px', cursor: 'pointer',
              }}
            >
              Jen nezbytné
            </button>
            <button
              onClick={() => decide('granted')}
              style={{
                background: 'var(--gold)', border: 'none', borderRadius: 8,
                color: '#0F172A', fontFamily: 'Archivo, sans-serif', fontWeight: 800,
                fontSize: 11, letterSpacing: 0.5, minHeight: 36, padding: '7px 12px', cursor: 'pointer',
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
