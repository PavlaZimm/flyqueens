'use client'

import dynamic from 'next/dynamic'

// MapLibre potřebuje WebGL a window, proto se model načítá až v prohlížeči.
const CityWalk = dynamic(
  () => import('./CityWalk').then((module) => module.CityWalk),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: '100dvh',
          minHeight: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          fontSize: 13,
          background: 'var(--midnight)',
        }}
      >
        Připravuji 3D model města…
      </div>
    ),
  },
)

export function CityWalkLoader({ initialCitySlug }: { initialCitySlug?: string }) {
  return <CityWalk initialCitySlug={initialCitySlug} />
}
