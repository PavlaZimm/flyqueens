# Boeing 747 a oprava novinek na homepage

18. září 2026, dokončení na výslovný pokyn Pavly zveřejnit dnešní články a dodělat rozpracované úpravy.

- Nový článek `/blog/boeing-747-praha-fly-meta`: vlastní fotografie z Kněževsi, registrace 9H-FLM, úředně doložený typ a provozovatel. Samostatná kontrola faktů, konkurence a českého stylu. Zdroje a nejistoty v `Vyzkum/boeing-747-praha-fly-meta/`.
- Nový snímek před dosednutím z originálu zmenšen na 1400 × 1050 px / 195 346 B. Ostatní snímky se používají z již optimalizovaných kopií. Originály zachované mimo publikované soubory.
- Homepage i patička původně používaly jen `POSTS`, takže vynechávaly články s adresou pod `/letiste/`. Nyní používají kompletní `BLOG_CARDS` a skutečné `href`. Homepage má tři nové články s fotografiemi: ubytování, spotting, Boeing 747.
- Pravidla rozšířena o povinnou rešerši konkurence a kontrolu homepage. Optimalizace všech dalších fotografií zůstává povinná.
- Stay22 čeká na konkrétní skript. Rozvoj dat a rozpočet AeroDataBox popsány v `dalsi-kroky-data-stay22.md`.

## Ověření před zveřejněním

- `npm run check`: lint, TypeScript a produkční webpack build prošly; 44 statických stránek.
- Prohlížeč: 320, 390 a 1440 px. Fotografie na homepage, blogu i v novém článku načtené; žádný horizontální přesah.
- Proklik z homepage do nového článku, všechny tři cíle novinek HTTP 200. Ověřen canonical, Article JSON-LD, H1 a sitemap.
- Kontrolované stránky bez JavaScriptových chyb. Vizuálně zkontrolované snímky desktopu a mobilu.
- `git diff --check` bez problémů.

Tato kontrola se vztahuje k homepage, blogu a novému článku; dříve zaznamenaná chyba hydratace pražského letištního hubu zůstává samostatným bodem v `navigation-fix-2026-09-18.md`.
