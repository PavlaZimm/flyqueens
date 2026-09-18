# Ověření článku ve webu

18. září 2026, lokální verze, bez nasazení.

- `npm run check`: ESLint, TypeScript a produkční webpack build prošly.
- Samostatná faktická kontrola bez nutných oprav.
- Česká korektura: pět hlavních formulací opraveno v TSX i Markdownu, sjednocena terminologie.
- Playwright s izolovaným Chrome: HTTP 200, šířky 390 a 1440 px, bez přetékání dokumentu, jedno H1, pět řádků hotelů, správný canonical, žádné chybné kotvy ani JavaScriptové chyby. Screenshoty vizuálně zkontrolovány. Náhled proběhl před posledními čistě slovními korekturami.
- `git diff --check` bez vad.
- Příchozí odkazy: Praha hub, blogový rozcestník, parkování Praha; URL v sitemap.
- Použit generický náhled webu pro sociální sítě. Fotografie konkrétních hotelů nejsou doložené, žádné se nepředstírají.
- Stay22 zatím bez implementace, čeká na dodaný skript.
