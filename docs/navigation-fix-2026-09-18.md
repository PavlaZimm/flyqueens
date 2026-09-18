# Navigace statistik a letišť

Sdílená serverová komponenta SiteHeader nahrazuje BlogHeader a je v layoutech blogu, letišť a statistik. Obsahuje aktivní sekci, všechny čtyři hlavní odkazy, živou mapu a jeden přepínač tématu. Na mobilu jsou odkazy v samostatném řádku bez skrývání položek. Kotvy článků mají rezervu pod přichyceným menu.

Ověření: ESLint, TypeScript a produkční build prošly. Playwright: šířky 320, 390 a 1440 px, trasy /stats, /letiste, /letiste/praha, /letiste/praha/ubytovani a /blog. Všude HTTP 200, viditelné odkazy, správná aktivní sekce, bez vodorovného přetékání. Ověřeny skutečné přechody Blog → Statistiky → Letiště a přepnutí světlého režimu. Mobilní a desktopové screenshoty zkontrolovány.

Při kontrole zachyceno existující upozornění React #418 na /letiste/praha. Stejné upozornění reprodukováno i na dosavadní produkci před nasazením menu; nejde o regresi této změny. Vyžaduje samostatné dohledání rozdílu serverového a klientského HTML.
