import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-Frame-Options',          value: 'DENY' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // React používá eval jen při vývoji; v produkci ho nepovolujeme.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // CARTO tiles + Leaflet blob markers + planespotters fotky
      "img-src 'self' data: blob: https://*.basemaps.cartocdn.com https://*.tile.openstreetmap.org https://*.planespotters.net https://*.plnspttrs.net https://pics.avs.io",
      // API calls z klienta jdou přes /api/* (self); externě jen planespotters (fotky) + analytics.
      // Ostatní zdroje (airplanes.live, adsbdb, OpenSky, METAR, LiveATC) volá server, ne prohlížeč.
      "connect-src 'self' https://api.planespotters.net https://va.vercel-scripts.com https://www.google-analytics.com https://analytics.google.com",
      // Audio proxy běží přes /api/atc-stream (self)
      "media-src 'self'",
      // Leaflet web workers
      "worker-src blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  experimental: { optimizeCss: true },
}

export default nextConfig
