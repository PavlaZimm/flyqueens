// Registr blogových článků. Nový článek = přidat sem záznam
// a vytvořit src/app/blog/<slug>/page.tsx.
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string        // ISO, pro řazení a schema
  dateLabel: string   // hezky česky
  tag: string
}

export const POSTS: BlogPost[] = [
  {
    slug: 'squawk-nouzove-kody',
    title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
    excerpt: 'Čtyřmístné číslo, které pilot naladí do odpovídače, dokáže během vteřiny říct řízení, že se něco děje. Co který kód znamená a jak nouzový let poznáte na mapě.',
    date: '2026-07-19',
    dateLabel: '19. července 2026',
    tag: 'Jak to funguje',
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}
