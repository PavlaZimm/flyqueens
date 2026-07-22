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
    slug: 'jak-vysoko-letaji-letadla',
    title: 'Jak vysoko létají letadla a proč zrovna deset kilometrů',
    excerpt: 'Dopravní letadla létají v devíti až dvanácti kilometrech. Není to náhoda: řidší vzduch šetří palivo a nad mraky se neklepe. Kolik má které letadlo a jak to vidíte na mapě.',
    date: '2026-07-20',
    dateLabel: '20. července 2026',
    tag: 'Jak to funguje',
  },
  {
    slug: 'letiste-praha-zive',
    title: 'Letiště Praha živě: jak sledovat letadla nad Ruzyní online',
    excerpt: 'Chcete vidět, co právě přistává v Praze? Webkamery ukážou kus plochy, živá mapa ukáže každé letadlo ve vzduchu. Jak to funguje a co všechno se dá vyčíst.',
    date: '2026-07-19',
    dateLabel: '19. července 2026',
    tag: 'Návod',
  },
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
