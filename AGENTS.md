<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Redakční obsah FlyQueens

Při psaní nebo úpravě článků čti `docs/redakcni-pravidla.md`. Podklady ukládej do `Vyzkum/<tema>/`, SEO data do `docs/`. Převzaté originály Webx jsou v `docs/redakce/podklady-webx/`; projektová pravidla sjednocují jejich rozpory.

Každý článek v přehledu `/blog` musí mít náhledovou fotografii. Používej společnou šablonu karet a registr `BLOG_CARDS` v `src/lib/blog.ts`, včetně článků pod `/letiste/`. Před publikací zkontroluj náhled na mobilu a desktopu.

Před každým článkem povinně projdi relevantní konkurenci. Do rešerše zaznamenej skutečně otevřené stránky, témata, mezery a rozpory. Konkurenční tvrzení ověřuj u primárních zdrojů; konkurence sama není důkaz pravdivosti. Nekopíruj text ani fotografie.

Každý článek a průvodce se 4 a více H2 má obsah s kotvami: `id` u každého H2 a komponentu `ArticleContents` před prvním H2 (podrobnosti v `docs/redakcni-pravidla.md`).

Nové články musí být dohledatelné i na hlavní stránce a v patičce. Obě sekce čerpají z `BLOG_CARDS` se skutečným `href`, nikoli jen z `POSTS`. Při publikaci kontroluj tři nejnovější články na homepage včetně fotografií a cílových adres.

Všechny fotografie před zveřejněním optimalizuj co do rozměrů i datové velikosti. Zachovej originály; webové kopie standardně do 1600 px na delší straně a přibližně 100–200 kB. Používej `npm run images:optimize`, ověř vizuální kvalitu a oprav metadata skutečných rozměrů.

Běžné obsahové sekce (blog, letiště a statistiky) musí mít společný `SiteHeader` s hlavní navigací, aktivní sekcí a dostupnými odkazy i na mobilu. Při přidání stránky ověř přechody mezi sekcemi.
