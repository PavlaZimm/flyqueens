# Impact na FlyQueens

Uživatelka dodala Impact tag P-A7803755-1409-47d0-891e-92d7562279a31 a požádala o umístění do head.

- Společný CookieConsent v kořenovém layoutu načítá Impact po souhlasu na celém webu.
- Next.js inicializační blok impact-init vytvoří asynchronní externí script impact-loader přímo v document.head; zachovává dodaná volání transformLinks a trackImpression.
- Skript je vložen dynamicky po souhlasu, nikoli do statického HTML před souhlasem.
- Verze souhlasu v3 zahrnuje Impact. Starší odmítnutí v2 zůstává platné, starší udělený souhlas se nepřenáší na nového poskytovatele.
- Text souhlasu a stránka O projektu uvádějí Impact. Odvolání souhlasu znovu načte stránku a zastaví načítání volitelných skriptů.
- Vložení tagu samo nepotvrzuje schválení partnerství Airalo ani připsání provizí. To je třeba ověřit v Impact účtu.

Kontroly: npm run check (ESLint, TypeScript, produkční build). Přímé stažení veřejného vendor skriptu přes curl v tomto prostředí vrátilo HTTP 403; samo o sobě nepotvrzuje chybu v prohlížeči.
