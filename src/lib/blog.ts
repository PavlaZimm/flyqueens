// Registr blogových článků. Nový článek = přidat sem záznam
// a vytvořit src/app/blog/<slug>/page.tsx.
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string        // ISO, pro řazení a schema
  updatedAt: string   // ISO, pro sitemap a dateModified
  dateLabel: string   // hezky česky
  tag: string
  readingTime: string
}

export const POSTS: BlogPost[] = [
  {
    slug: 'co-mi-leti-nad-hlavou',
    title: 'Co mi právě letí nad hlavou? Jak poznat letadlo online',
    excerpt: 'Otevřete živou mapu, povolte polohu nebo najděte své město a zjistěte, které letadlo právě vidíte. Vysvětlíme také, proč někdy chybí trasa nebo typ stroje.',
    date: '2026-09-11',
    updatedAt: '2026-09-11',
    dateLabel: '11. září 2026',
    tag: 'Praktický návod',
    readingTime: '6 min čtení',
  },
  {
    slug: 'jak-sledovat-let-podle-cisla',
    title: 'Jak sledovat let podle čísla letu a zjistit, kde právě je',
    excerpt: 'Číslo letu, volací znak a registrace nejsou totéž. Ukážeme, co zadat do mapy, kde ověřit zpoždění a proč se některý let nemusí zobrazit.',
    date: '2026-09-11',
    updatedAt: '2026-09-11',
    dateLabel: '11. září 2026',
    tag: 'Návod',
    readingTime: '7 min čtení',
  },
  {
    slug: 'jak-vysoko-letaji-letadla',
    title: 'Jak vysoko létají letadla a proč zrovna deset kilometrů',
    excerpt: 'Dopravní letadla obvykle létají v devíti až dvanácti kilometrech. Proč je řidší vzduch výhodný, co znamená letová hladina a jak výšku vidíte na mapě.',
    date: '2026-07-20',
    updatedAt: '2026-09-11',
    dateLabel: '20. července 2026',
    tag: 'Jak to funguje',
    readingTime: '6 min čtení',
  },
  {
    slug: 'letiste-praha-zive',
    title: 'Letiště Praha živě: jak sledovat letadla nad Ruzyní online',
    excerpt: 'Chcete vidět provoz u Prahy? Webkamery ukážou kus plochy, ADS-B mapa letadla zachycená dostupnými přijímači. Jak to funguje a jaké má pokrytí limity.',
    date: '2026-07-19',
    updatedAt: '2026-09-11',
    dateLabel: '19. července 2026',
    tag: 'Návod',
    readingTime: '6 min čtení',
  },
  {
    slug: 'squawk-nouzove-kody',
    title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
    excerpt: 'Čtyřmístné číslo, které pilot naladí do odpovídače, dokáže během vteřiny říct řízení, že se něco děje. Co který kód znamená a jak nouzový let poznáte na mapě.',
    date: '2026-07-19',
    updatedAt: '2026-09-11',
    dateLabel: '19. července 2026',
    tag: 'Jak to funguje',
    readingTime: '5 min čtení',
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}
