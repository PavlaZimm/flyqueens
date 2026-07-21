import type { MetadataRoute } from 'next'
import { POSTS } from '@/lib/blog'

const BASE = 'https://www.flyqueens.cz'

// Letiště, která mají hub + podstránky
const AIRPORTS = ['praha', 'brno', 'ostrava']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'always', priority: 1 },
    { url: `${BASE}/stats`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/letiste`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ]

  // Hub + parkování pro každé letiště
  const airports: MetadataRoute.Sitemap = AIRPORTS.flatMap((slug) => [
    { url: `${BASE}/letiste/${slug}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE}/letiste/${slug}/parkovani`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
  ])

  // Blogové články se přidají automaticky z registru
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...core, ...airports, ...posts]
}
