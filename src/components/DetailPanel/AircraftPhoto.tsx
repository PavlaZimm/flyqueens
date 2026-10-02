'use client'

import { useRef } from 'react'
import { trackEvent } from '@/lib/analytics'
import type { PlanePhoto } from '@/hooks/useAircraftPhoto'
import styles from './DetailPanel.module.css'

export function AircraftPhoto({ photo, label }: { photo: PlanePhoto; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  return <>
    <button type="button" className={styles.photoButton} onClick={() => { dialog.current?.showModal(); trackEvent('Aircraft Photo Opened') }} aria-label={`Zvětšit fotografii ${label}`}>
      {/* External provider supplies an already resized thumbnail. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.thumbnail_large.src} alt={label} />
      <span className={styles.zoomHint}>⤢ Zvětšit</span>
    </button>
    <a href={photo.link} target="_blank" rel="noopener noreferrer" className={styles.credit}>© {photo.photographer}</a>
    <dialog ref={dialog} className={styles.lightbox} aria-label={`Fotografie letadla ${label}`} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close() }}>
      <div className={styles.lightboxContent}>
        <button type="button" autoFocus className={styles.closePhoto} onClick={() => dialog.current?.close()} aria-label="Zavřít fotografii">✕</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.thumbnail_large.src} alt={label} />
        <div className={styles.photoCaption}><strong>{label}</strong><a href={photo.link} target="_blank" rel="noopener noreferrer">© {photo.photographer} · Otevřít zdroj ↗</a></div>
      </div>
    </dialog>
  </>
}
