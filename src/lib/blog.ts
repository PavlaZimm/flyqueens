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
    excerpt: 'Dopravní letadla obvykle létají v devíti až dvanácti kilometrech. Proč je řidší vzduch výhodný, co znamená letová hladina a jak výšku vidíte na mapě.',
    date: '2026-07-20',
    dateLabel: '20. července 2026',
    tag: 'Jak to funguje',
  },
  {
    slug: 'letiste-praha-zive',
    title: 'Letiště Praha živě: jak sledovat letadla nad Ruzyní online',
    excerpt: 'Chcete vidět provoz u Prahy? Webkamery ukážou kus plochy, ADS-B mapa letadla zachycená dostupnými přijímači. Jak to funguje a jaké má pokrytí limity.',
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
