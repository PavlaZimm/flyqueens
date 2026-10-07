# Záznam pro registr článků

Vložit do `POSTS` v `src/lib/blog.ts` (na začátek pole, nad `prirucni-zavazadlo-do-letadla`, datum je stejné). `BLOG_CARDS` se z `POSTS` skládá automaticky s `href: '/blog/letiste-treviso'`, samostatný záznam do `BLOG_CARDS` tedy není potřeba.

Bez tohoto záznamu stránka při buildu spadne: `POSTS.find(... 'letiste-treviso')!` vrátí `undefined`.

```ts
  {
    slug: 'letiste-treviso',
    title: 'Letiště Treviso: lety z Prahy, doprava a parkování 2026',
    excerpt: 'Ryanair létá z Prahy do Trevisa každý den. Jak se z letiště dostanete do Benátek a do Trevisa, kdy jede poslední autobus na letiště a kolik stojí parkování.',
    date: '2026-10-07', updatedAt: '2026-10-07', dateLabel: '7. října 2026',
    tag: 'Letiště · Itálie', readingTime: '7 min čtení',
    image: '/blog/letiste-treviso-wizz-air-odbavovaci-plocha.webp',
    imageAlt: 'Airbus Wizz Air u stání na letišti Treviso, kolem vozíky na zavazadla, v pozadí další Wizz Air',
    imageWidth: 1600, imageHeight: 640,
  },
```

Poznámky:
- `imagePosition` záměrně nenastaveno, letadlo je ve středu výřezu (posouzeno podle souboru; skutečné vykreslení karty na /blog a homepage neověřeno).
- ALT má 94 znaků.
- Excerpt 156 znaků (stejná délka jako u ostatních karet; nejde o meta popisek).
- Sitemap se generuje z `POSTS` (`src/app/sitemap.ts`), ruční úprava není potřeba.
- `docs/photo-credits.md`: návrh tří řádků je v `fotografie.md`.
