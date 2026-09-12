import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/blog'

const BASE = 'https://www.flyqueens.cz'
const LAST_SIGNIFICANT_UPDATE = '2026-09-12'

// Letiště, která mají hub + podstránky
const AIRPORTS = ['praha', 'brno', 'ostrava', 'pardubice']

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: LAST_SIGNIFICANT_UPDATE },
    { url: `${BASE}/radar`, lastModified: LAST_SIGNIFICANT_UPDATE },
    { url: `${BASE}/stats`, lastModified: LAST_SIGNIFICANT_UPDATE },
    { url: `${BASE}/o-projektu`, lastModified: LAST_SIGNIFICANT_UPDATE },
    { url: `${BASE}/letiste`, lastModified: LAST_SIGNIFICANT_UPDATE },
    { url: `${BASE}/blog`, lastModified: LAST_SIGNIFICANT_UPDATE },
  ]

  // Hub + parkování pro každé letiště
  const airports: MetadataRoute.Sitemap = AIRPORTS.flatMap((slug) => [
    { url: `${BASE}/letiste/${slug}`, lastModified: LAST_SIGNIFICANT_UPDATE },
    { url: `${BASE}/letiste/${slug}/parkovani`, lastModified: LAST_SIGNIFICANT_UPDATE },
  ])

  // Blogové články se přidají automaticky z registru
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    images: [`${BASE}${p.image}`],
  }))

  return [...core, ...airports, ...posts]
}
