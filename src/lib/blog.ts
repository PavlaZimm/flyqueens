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
  image: string
  imageAlt: string
}

export const POSTS: BlogPost[] = [
  {
    slug: 'co-mi-leti-nad-hlavou',
    title: 'Co mi letí nad hlavou? Zjistěte letadlo online',
    excerpt: 'Otevřete živou mapu, povolte polohu nebo najděte své město a zjistěte, které letadlo právě vidíte. Vysvětlíme také, proč někdy chybí trasa nebo typ stroje.',
    date: '2026-09-11',
    updatedAt: '2026-09-11',
    dateLabel: '11. září 2026',
    tag: 'Praktický návod',
    readingTime: '6 min čtení',
    image: '/blog/co-mi-leti-nad-hlavou.jpg',
    imageAlt: 'Dopravní letadlo fotografované přímo zespodu proti modré obloze',
  },
  {
    slug: 'jak-sledovat-let-podle-cisla',
    title: 'Sledování letu podle čísla: kde je letadlo online',
    excerpt: 'Číslo letu, volací znak a registrace nejsou totéž. Ukážeme, co zadat do mapy, kde ověřit zpoždění a proč se některý let nemusí zobrazit.',
    date: '2026-09-11',
    updatedAt: '2026-09-11',
    dateLabel: '11. září 2026',
    tag: 'Návod',
    readingTime: '7 min čtení',
    image: '/blog/jak-sledovat-let-podle-cisla.jpg',
    imageAlt: 'Pohled z okna letadla na křídlo a krajinu pod ním',
  },
  {
    slug: 'jak-vysoko-letaji-letadla',
    title: 'Jak vysoko létají letadla? Výška v metrech a FL350',
    excerpt: 'Dopravní letadla obvykle létají v devíti až dvanácti kilometrech. Proč je řidší vzduch výhodný, co znamená letová hladina a jak výšku vidíte na mapě.',
    date: '2026-07-20',
    updatedAt: '2026-09-11',
    dateLabel: '20. července 2026',
    tag: 'Jak to funguje',
    readingTime: '6 min čtení',
    image: '/blog/jak-vysoko-letaji-letadla.jpg',
    imageAlt: 'Dopravní letadlo letící nad souvislou vrstvou oblačnosti',
  },
  {
    slug: 'letiste-praha-zive',
    title: 'Letiště Praha živě: přílety, odlety a mapa letadel',
    excerpt: 'Chcete vidět provoz u Prahy? Webkamery ukážou kus plochy, ADS-B mapa letadla zachycená dostupnými přijímači. Jak to funguje a jaké má pokrytí limity.',
    date: '2026-07-19',
    updatedAt: '2026-09-11',
    dateLabel: '19. července 2026',
    tag: 'Návod',
    readingTime: '6 min čtení',
    image: '/blog/letiste-praha-zive.jpg',
    imageAlt: 'Learjet pojíždějící po letišti Václava Havla Praha',
  },
  {
    slug: 'squawk-nouzove-kody',
    title: 'Squawk 7700, 7600 a 7500: význam nouzových kódů',
    excerpt: 'Čtyřmístné číslo, které pilot naladí do odpovídače, dokáže během vteřiny říct řízení, že se něco děje. Co který kód znamená a jak nouzový let poznáte na mapě.',
    date: '2026-07-19',
    updatedAt: '2026-09-11',
    dateLabel: '19. července 2026',
    tag: 'Jak to funguje',
    readingTime: '5 min čtení',
    image: '/blog/squawk-nouzove-kody.jpg',
    imageAlt: 'Ovládací panel leteckého transpondéru v letadle DC-9',
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}
