'use client'

import { useEffect, useState } from 'react'

export interface PlanePhoto {
  thumbnail_large: { src: string }
  photographer: string
  link: string
}

/** Same photo source for radar and airport boards. No paid flight lookup. */
export function useAircraftPhoto(icao24: string | null, registration: string | null = null) {
  const hex = icao24 && /^[a-f\d]{6}$/i.test(icao24) ? icao24.toLowerCase() : null
  const reg = registration && /^[a-z\d-]{3,16}$/i.test(registration) ? registration.toUpperCase() : null
  const key = `${hex ?? ''}:${reg ?? ''}`
  const [result, setResult] = useState<{ key: string; photo: PlanePhoto | null } | null>(null)

  useEffect(() => {
    if (!hex && !reg) return
    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 8000)
    async function load() {
      let photo: PlanePhoto | null = null
      try {
        // Registration identifies the assigned aircraft; use hex when it is unavailable.
        const path = reg ? `reg/${encodeURIComponent(reg)}` : `hex/${hex}`
        const response = await fetch(`https://api.planespotters.net/pub/photos/${path}`, { signal: controller.signal })
        if (!response.ok) throw new Error('Photo unavailable')
        const data = await response.json() as { photos?: PlanePhoto[] }
        photo = data.photos?.find(p => {
          try {
            const image = new URL(p.thumbnail_large.src)
            const link = new URL(p.link)
            return image.protocol === 'https:' && /\.(planespotters\.net|plnspttrs\.net)$/.test(image.hostname)
              && link.protocol === 'https:' && /(^|\.)planespotters\.net$/.test(link.hostname)
          } catch { return false }
        }) ?? null
      } catch { /* Missing photos and provider failures never hide flight information. */ }
      finally {
        clearTimeout(timeout)
        if (active) setResult({ key, photo })
      }
    }
    void load()
    return () => { active = false; clearTimeout(timeout); controller.abort() }
  }, [hex, reg, key])

  return {
    photo: result?.key === key ? result.photo : null,
    loading: Boolean(hex || reg) && result?.key !== key,
  }
}
