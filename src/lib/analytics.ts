'use client'

import { track } from '@vercel/analytics'

type EventProperties = Record<string, string | number | boolean | null | undefined>

export function trackEvent(name: string, properties?: EventProperties): void {
  try {
    track(name, properties)
  } catch {
    // Analytika nikdy nesmí rozbít hlavní funkci aplikace.
  }
}
