'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

// Version 3 adds Impact; earlier grants do not cover this additional provider.
const KEY = 'fq-cookie-consent-v3'
// Vlastní zařízení provozovatelky: adresa s ?interni=1 uloží značku, ?interni=0 ji smaže.
// Analytics pak dostane traffic_type=internal a datový filtr „Internal Traffic" tyto události vyloučí.
const INTERNAL_KEY = 'fq-internal'

function syncInternalFlag() {
  try {
    const param = new URLSearchParams(window.location.search).get('interni')
    if (param === '1') localStorage.setItem(INTERNAL_KEY, '1')
    if (param === '0') localStorage.removeItem(INTERNAL_KEY)
  } catch { /* Bez úložiště se značka jen neuloží. */ }
}
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
    syncInternalFlag()
    let saved: string | null = null
    try {
      saved = localStorage.getItem(KEY)
      // Preserve an earlier refusal, but ask again before enabling a new provider.
      if (saved === null && localStorage.getItem('fq-cookie-consent-v2') === 'denied') saved = 'denied'
    } catch { /* Keep the choice usable without storage. */ }
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
          <Script id="impact-init" strategy="lazyOnload">{`
            (function(i,m,p,a,c,t){
              c.ire_o=p;
              c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};
              t=a.createElement(m);
              t.async=1; t.id='impact-loader'; t.src=i;
              a.head.appendChild(t);
            })('https://utt.impactcdn.com/P-A7803755-1409-47d0-891e-92d7562279a31.js','script','impactStat',document,window);
            impactStat('transformLinks');
            impactStat('trackImpression');
          `}</Script>
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
            var internal = false;
            try {
              var q = new URLSearchParams(location.search).get('interni');
              if (q === '1') localStorage.setItem('fq-internal', '1');
              if (q === '0') localStorage.removeItem('fq-internal');
              internal = localStorage.getItem('fq-internal') === '1';
            } catch (e) {}
            gtag('config', 'G-SMFS92YP8L', internal ? { traffic_type: 'internal' } : {});
            (function () {
              // Měření appky: otevření z ikony na ploše (Android i iPhone)
              // a okamžik instalace (jen Chrome na Androidu a na počítači).
              var standalone = false;
              try {
                standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
                  window.navigator.standalone === true;
              } catch (e) {}
              var seen = false;
              try {
                seen = !!sessionStorage.getItem('fq-app-launch');
                if (!seen) sessionStorage.setItem('fq-app-launch', '1');
              } catch (e) {}
              if (standalone && !seen) gtag('event', 'app_launch', { display_mode: 'standalone' });
              window.addEventListener('appinstalled', function () { gtag('event', 'app_installed'); });
            })();
          `}</Script>
        </>
      )}

      {/* Lišta je už v serverovém HTML, aby se ukázala hned a nebrzdila LCP.
          Kdo volbu uložil, tomu ji skript v <head> skryje ještě před vykreslením. */}
      {(!ready || consent === null || editing) && (
        <div
          className="fq-consent-banner"
          data-editing={editing ? '' : undefined}
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
            S vaším souhlasem zapneme Google Analytics a partnerské služby Stay22 a Impact pro doporučení, úpravu odkazů a měření návštěv a rezervací.
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
