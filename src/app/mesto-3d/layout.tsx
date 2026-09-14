import type { Metadata } from 'next'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Průchozí 3D model města: Praha, Brno, Ostrava | FlyQueens',
  description:
    'Projděte se 3D modelem Prahy, Brna, Ostravy, Pardubic, Karlových Varů nebo Bíliny přímo v prohlížeči. Budovy z OpenStreetMap, ovládání klávesnicí i dotykem, start u letiště.',
  alternates: { canonical: 'https://www.flyqueens.cz/mesto-3d' },
  ...socialMetadata({
    title: 'Průchozí 3D model města | FlyQueens',
    description: 'Projděte se 3D modelem českých měst s letištěm přímo v prohlížeči.',
    url: 'https://www.flyqueens.cz/mesto-3d',
  }),
}

export default function CityWalkLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
