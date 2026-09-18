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
  imageWidth: number   // skutečné rozměry souboru, jdou rovnou do og:image
  imageHeight: number
}

export const POSTS: BlogPost[] = [
  {
    slug: 'boeing-747-praha-fly-meta',
    title: 'Boeing 747 v Praze: Fly Meta na fotkách z Kněževsi',
    excerpt: 'Nákladní Boeing 747-400F s registrací 9H-FLM při přistání v Praze. Vlastní fotky z Kněževsi a rozdíl mezi Fly Meta a provozovatelem letadla.',
    date: '2026-09-18', updatedAt: '2026-09-18', dateLabel: '18. září 2026',
    tag: 'Boeing 747 · Vlastní fotografie', readingTime: '4 min čtení',
    image: '/spotting/praha-boeing-747-fly-meta.webp',
    imageAlt: 'Boeing 747 v barvách Fly Meta při přistání v Praze, fotografovaný z Kněževsi',
    imageWidth: 1600, imageHeight: 780,
  },
  {
    slug: 'starlux-airlines-praha',
    title: 'STARLUX Airlines v Praze: přímá linka do Tchaj-peje',
    excerpt: 'STARLUX otevřel v Praze svou první evropskou linku. Kdy létají spoje JX101 a JX102, proč od 1. září létá větší A350-1000 a jak poznáte zlatou AIRSORAYAMU.',
    date: '2026-09-13',
    updatedAt: '2026-09-14',
    dateLabel: '13. září 2026',
    tag: 'Nová linka',
    readingTime: '6 min čtení',
    image: '/blog/starlux-airlines-praha.jpg',
    imageAlt: 'Airbus A350-1000 letecké společnosti STARLUX Airlines',
    imageWidth: 1280,
    imageHeight: 854,
  },
  {
    slug: 'airbus-a380-praha-emirates',
    title: 'Airbus A380 se má vrátit do Prahy 1. října 2026',
    excerpt: 'Emirates má od 1. října 2026 znovu nasadit A380 na každodenní linku Praha–Dubaj. Přehled změn, letové časy a co přinesl modernizovaný Boeing 777 s Premium Economy.',
    date: '2026-09-13',
    updatedAt: '2026-09-14',
    dateLabel: '13. září 2026',
    tag: 'Aktuální přehled',
    readingTime: '6 min čtení',
    image: '/blog/airbus-a380-praha-emirates.jpg',
    imageAlt: 'Airbus A380 společnosti Emirates na letišti v Praze',
    imageWidth: 1599,
    imageHeight: 737,
  },
  {
    slug: 'co-mi-leti-nad-hlavou',
    title: 'Co mi letí nad hlavou? Zjistěte letadlo online',
    excerpt: 'Otevřete živou mapu, povolte polohu nebo najděte své město a zjistěte, které letadlo právě vidíte. Vysvětlíme také, proč někdy chybí trasa nebo typ stroje.',
    date: '2026-09-11',
    updatedAt: '2026-09-17',
    dateLabel: '11. září 2026',
    tag: 'Praktický návod',
    readingTime: '6 min čtení',
    image: '/blog/co-mi-leti-nad-hlavou.jpg',
    imageAlt: 'Dopravní letadlo fotografované přímo zespodu proti modré obloze',
    imageWidth: 1599,
    imageHeight: 900,
  },
  {
    slug: 'jak-sledovat-let-podle-cisla',
    title: 'Sledování letů podle čísla: kde je letadlo online',
    excerpt: 'Číslo letu, volací znak a registrace nejsou totéž. Ukážeme, co zadat do mapy, kde ověřit zpoždění a proč se některý let nemusí zobrazit.',
    date: '2026-09-11',
    updatedAt: '2026-09-14',
    dateLabel: '11. září 2026',
    tag: 'Návod',
    readingTime: '7 min čtení',
    image: '/blog/jak-sledovat-let-podle-cisla.jpg',
    imageAlt: 'Pohled z okna letadla na křídlo a krajinu pod ním',
    imageWidth: 1599,
    imageHeight: 900,
  },
  {
    slug: 'jak-vysoko-letaji-letadla',
    title: 'Jak vysoko létají letadla? Výška v metrech a FL350',
    excerpt: 'Dopravní letadla obvykle létají v devíti až dvanácti kilometrech. Proč je řidší vzduch výhodný, co znamená letová hladina a jak výšku vidíte na mapě.',
    date: '2026-07-20',
    updatedAt: '2026-09-14',
    dateLabel: '20. července 2026',
    tag: 'Jak to funguje',
    readingTime: '6 min čtení',
    image: '/blog/jak-vysoko-letaji-letadla.jpg',
    imageAlt: 'Dopravní letadlo letící nad souvislou vrstvou oblačnosti',
    imageWidth: 1599,
    imageHeight: 900,
  },
  {
    slug: 'letiste-praha-zive',
    title: 'Letiště Praha živě: přílety, odlety a mapa letadel',
    excerpt: 'Chcete vidět provoz u Prahy? Webkamery ukážou kus plochy, ADS-B mapa letadla zachycená dostupnými přijímači. Jak to funguje a jaké má pokrytí limity.',
    date: '2026-07-19',
    updatedAt: '2026-09-14',
    dateLabel: '19. července 2026',
    tag: 'Návod',
    readingTime: '6 min čtení',
    image: '/blog/letiste-praha-zive.jpg',
    imageAlt: 'Learjet pojíždějící po letišti Václava Havla Praha',
    imageWidth: 1600,
    imageHeight: 1065,
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
    imageWidth: 1600,
    imageHeight: 1071,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

// Jednotná karta všech článků v blogu, včetně průvodců pod /letiste.
// Povinná image/imageAlt brání přidání textové karty bez náhledové fotografie.
export const BLOG_CARDS: (BlogPost & { href: string; imagePosition?: string })[] = [
  {
    slug: 'ubytovani-letiste-praha',
    href: '/letiste/praha/ubytovani',
    title: 'Ubytování u letiště Praha: hotely a cesta k terminálu',
    excerpt: 'Kde přespíte přímo u terminálů a odkud potřebujete dopravu. Srovnání pěti možností a podmínky transferů.',
    date: '2026-09-18', updatedAt: '2026-09-18', dateLabel: '18. září 2026',
    tag: 'Před odletem · Praha', readingTime: '5 min čtení',
    image: '/blog/praha-terminal-ubytovani.webp', imagePosition: 'center 65%',
    imageAlt: 'Budova Terminálu 1 Letiště Václava Havla Praha',
    imageWidth: 1600, imageHeight: 1200,
  },
  {
    slug: 'planespotting-praha',
    href: '/letiste/praha/planespotting',
    title: 'Planespotting Praha: vyhlídky, Kněževes a Hostivice',
    excerpt: 'Kam vyrazit na letadla, jak se dostat k valům a jak při pozorování využít radar. Průvodce s vlastními fotografiemi.',
    date: '2026-09-18', updatedAt: '2026-09-18', dateLabel: '18. září 2026',
    tag: 'Planespotting · Praha', readingTime: '5 min čtení',
    image: '/spotting/praha-vyhlidkovy-val.webp', imagePosition: 'center 65%',
    imageAlt: 'Vyhlídkový val v Kněževsi s návštěvníky a přístupovou cestou',
    imageWidth: 1600, imageHeight: 1200,
  },
  ...POSTS.map(post => ({ ...post, href: `/blog/${post.slug}` })),
]
