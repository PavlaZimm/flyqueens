'use client'

import { trackEvent } from '@/lib/analytics'

export function AffiliateParkingLink({ href, airport }: { href: string; airport: string }) {
  return (
    <div style={{ background: 'rgba(245,184,61,0.07)', border: '1px solid rgba(245,184,61,0.28)', borderRadius: 12, padding: '15px 16px', margin: '22px 0 10px' }}>
      <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 5 }}>
        Porovnat parkování pro vlastní termín
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-muted)', margin: '0 0 12px' }}>
        Ceny se mění podle data. V porovnání uvidíte aktuální dostupnost a celkovou cenu.
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={() => trackEvent('Parking Affiliate Clicked', { airport })}
        style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 12, letterSpacing: 0.7, textTransform: 'uppercase', padding: '10px 16px', borderRadius: 9, textDecoration: 'none' }}
      >
        Zobrazit aktuální nabídky ↗
      </a>
      <div style={{ fontSize: 10, lineHeight: 1.45, color: 'var(--text-dim)', marginTop: 9 }}>
        Partnerský odkaz: při rezervaci můžeme získat provizi. Vaše cena se tím nezvyšuje.
      </div>
    </div>
  )
}
