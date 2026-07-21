import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // API vrací JSON, do indexu nepatří (šetří crawl budget)
      disallow: '/api/',
    },
    sitemap: 'https://www.flyqueens.cz/sitemap.xml',
  }
}
