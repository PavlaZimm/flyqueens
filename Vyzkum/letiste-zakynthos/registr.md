# Záznam pro registr `POSTS` v `src/lib/blog.ts`

Vložit do pole `POSTS` (nejnovější nahoře, vedle `prirucni-zavazadlo-do-letadla`). `BLOG_CARDS` se z `POSTS` skládá automaticky (`href: /blog/letiste-zakynthos`), homepage i patička čerpají z `BLOG_CARDS`. Stránka `page.tsx` hledá záznam přes `POSTS.find(slug === 'letiste-zakynthos')!`, bez záznamu build spadne.

```ts
  {
    slug: 'letiste-zakynthos',
    title: 'Letiště Zakynthos: lety z Česka, parkování a doprava 2026',
    excerpt: 'Letiště Zakynthos leží 3 až 4 km vzdušnou čarou od města i Laganasu. Kdy končí lety z Česka, kolik stojí parkování, kdy jede autobus a jak vypadá zima.',
    date: '2026-10-07', updatedAt: '2026-10-07', dateLabel: '7. října 2026',
    tag: 'Letiště · Řecko', readingTime: '6 min čtení',
    image: '/blog/letiste-zakynthos-terminal.webp',
    imageAlt: 'Terminál letiště Zakynthos s nápisem Dionysios Solomos z odbavovací plochy, červen 2018',
    imageWidth: 1600, imageHeight: 600,
  },
```

- Obrázek má přesně 16 : 6 (1600×600), `imagePosition` není potřeba. Na homepage (16 : 9) se ořízne z boků; terminál je uprostřed, ověřit náhled.
- Excerpt 151 znaků, titulek 57, ALT 87 znaků.
- Sitemap se generuje z `POSTS` (`src/app/sitemap.ts`), po přidání záznamu se adresa objeví sama.
