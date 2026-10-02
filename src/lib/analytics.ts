'use client'

import { track } from '@vercel/analytics'

type EventProperties = Record<string, string | number | boolean | null | undefined>

export function trackEvent(name: string, properties?: EventProperties): void {
  try {
    track(name, properties)
  } catch {
    // Analytika nikdy nesmí rozbít hlavní funkci aplikace.
  }

  try {
    if (typeof window === 'undefined'
      || !['flyqueens.cz', 'www.flyqueens.cz'].includes(window.location.hostname)
      || window.localStorage.getItem('fq-cookie-consent-v3') !== 'granted') return

    const gtag = (window as Window & {
      gtag?: (command: 'event', name: string, properties?: EventProperties) => void
    }).gtag
    // GA4 names cannot contain spaces. Keep the existing Vercel names intact.
    const eventName = name.toLowerCase().replace(/[^a-z0-9_]+/g, '_').slice(0, 40)
    gtag?.('event', eventName, properties)
  } catch {
    // Missing consent storage, blocked scripts or either provider must not break UI.
  }
}
