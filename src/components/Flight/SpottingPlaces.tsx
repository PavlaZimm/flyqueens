'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { pragueLight, compass } from '@/lib/pragueLight'
import type { RunwayInUseResponse } from '@/lib/runwayInUse'
import styles from './SpottingExtras.module.css'
const officialMap = 'https://www.google.com/maps/d/embed?mid=14bIEdgTAgrMNJRTFWzBZ8Qw_2ZV5jRXu'
export function SpottingPlaces({ now, runway }: { now: number; runway: RunwayInUseResponse | null }) {
  const [showMap, setShowMap] = useState(false)
  const light = pragueLight(now)
  const active = runway?.status === 'ok' && now - Date.parse(runway.fetchedAt) < 300000 ? runway.ends[0]?.end : null
  return <section className={styles.card} aria-labelledby="spotting-places">
    <p className={styles.eyebrow}>VYBERTE SI MÍSTO</p>
    <h2 id="spotting-places">Vyhlídky a světlo na mapě</h2>
    <div className={styles.placeContext}>
      <svg viewBox="0 0 160 160" className={styles.compass} role="img" aria-label={`Směr západu slunce ${Math.round(light.sunsetAzimuth ?? 0)} stupňů od severu`}>
        <circle cx="80" cy="80" r="54" fill="none" stroke="currentColor" opacity=".35" />
        <path d="M80 30V130M30 80H130" stroke="currentColor" opacity=".2" />
        <g transform={`rotate(${light.sunsetAzimuth ?? 0} 80 80)`}><path d="M80 80V36M75 43L80 36L85 43" stroke="#f5bf62" strokeWidth="3" fill="none" /><circle cx="80" cy="28" r="7" fill="#f5bf62" /></g>
        <text x="80" y="14" textAnchor="middle">S</text><text x="80" y="153" textAnchor="middle">J</text><text x="149" y="85" textAnchor="middle">V</text><text x="10" y="85" textAnchor="middle">Z</text>
      </svg>
      <div><h3>Kam bude zapadat slunce</h3><p>{light.sunsetAzimuth !== null ? `${compass(light.sunsetAzimuth)} · ${Math.round(light.sunsetAzimuth)}° od severu` : 'Směr není dostupný'}</p><p>{active ? `Aktuální odhad provozu: dráha ${active}.` : 'Aktuální směr provozu teď nemáme potvrzený.'}</p><p className={styles.note}>Kompas je orientovaný severem nahoru. Směr slunce platí přibližně pro okolí letiště. Odhad dráhy neurčuje vhodnost konkrétního místa; zkontrolujte skutečný provoz, výhled a protisvětlo.</p></div>
    </div>
    <div className={styles.mapFrame}>
      {showMap ? <iframe src={officialMap} title="Oficiální mapa spotů Letiště Praha" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /> : <div className={styles.mapPlaceholder}><span aria-hidden="true">⌖</span><h3>Mapa spotů Letiště Praha</h3><p>Oficiální mapa v Google Maps. Načte se až po kliknutí a připojí prohlížeč ke Googlu.</p><button type="button" onClick={() => setShowMap(true)}>Načíst mapu Google</button></div>}
    </div>
    <div className={styles.places}>
      <article><h3>Vyhlídkový val Kněževes</h3><Image src="/spotting/praha-vyhlidkovy-val.webp" alt="Vlastní fotografie vyhlídkového valu v Kněževsi" width={1600} height={1200} sizes="(max-width: 650px) 90vw, 450px" className={styles.photo} /><p>K valu vede štěrková cesta z ulice Na staré silnici. Letiště uvádí parkování přibližně 100 metrů od valu; na místě se řiďte značením.</p><p className={styles.note}>Foto: vlastní archiv FlyQueens.</p><Link href="/letiste/praha/planespotting#knezeves">Podrobnosti a přístup →</Link></article>
      <article><h3>Vyhlídkový val Hostivice</h3><p>Val u křížení drah 06/24 a 12/30. Přístup je pěšky nebo na kole. Letiště popisuje přibližně čtyřkilometrovou cestu z ulice Cihlářská v Hostivicích.</p><p>Auto nelze podle popisu přístupu dovézt až k valu. Naplánujte si cestu i návrat a před příletem nechte rezervu na chůzi.</p><Link href="/letiste/praha/planespotting#hostivice">Podrobnosti a přístup →</Link></article>
    </div>
    <p className={styles.note}>Přístup ověřen 2. 10. 2026 na webu <a href="https://www.prg.aero/spoty-pro-sledovani-priletuodletu" target="_blank" rel="noopener noreferrer">Letiště Praha ↗</a>. Dočasná omezení si ověřte před odjezdem. Výpočet světla nezohledňuje budovy, terén ani oblačnost.</p>
  </section>
}
