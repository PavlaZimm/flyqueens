# FlyQueens — Roadmap

> Tento soubor je živý dokument. Aktualizuj ho po každé session.
> Poslední update: 2026-09-25 (článek o Santiagu, klíčová slova, logování chyb databáze, úklid typů). Historické technické body níže ještě vyžadují srovnání s aktuálním kódem.

## Rozpracováno, 24. září 2026

Databáze Neon „neon-citron-paddle“ (Free, Washington iad1) je od 24. 9. připojená k flyqueens-app, `DATABASE_URL` i `POSTGRES_URL` jsou nastavené a zápis historie dráhy funguje (ověřeno 14:12 a 20:06 UTC).

### Databáze a provoz
- [ ] **Automatické měření dráhy každých 15 min** (GitHub Action volající `/api/runway-in-use?airport=LKPR`). Bez něj se historie plní jen při návštěvách, za 6 hodin přibylo jediné měření. Souhrn na `/letiste/praha` potřebuje 30 měření. Vercel Cron na Hobby umí jen 1× denně, proto GitHub Action. Připravit jako PR.
- [ ] **Rozhodnout o přesunu do Frankfurtu** (volitelné, přínos malý: živá data o 0,1–0,2 s rychlejší). Pokud ano, udělat dřív než automatické měření, dokud je databáze skoro prázdná. Postup: Storage → neon-citron-paddle → Disconnect; Create Database → Neon, Frankfurt eu-central-1, Auth vypnutý, Free, všechna 3 prostředí, prázdný prefix; Settings → Functions → Function Region fra1; Redeploy; ověřit; teprve pak smazat starou databázi.
- [x] **Zápis do databáze nezahazovat potichu** (25. 9.): `console.error` v `/api/runway-in-use`, `airportBoardServer` i v `/api/runway-history`.
- [ ] `/api/runway-history` doplnit o čas posledního měření (i nepovedeného), aby šel stav ověřit jednoznačně.
- [ ] Krátký návod v `docs/`: jak je databáze připojená, které proměnné web čte, jak ověřit funkčnost.

### Bezpečnost (review 24. 9.: nic kritického)
- [ ] Zapnout 2FA na Vercelu, GitHubu a Neonu (pokud ještě není).
- [ ] Ve Vercelu označit databázové proměnné jako Sensitive (svítí „Needs Attention“).
- [x] Rate limiting zpevněn 26. 9. (nález F1 ze skenu): identita volajícího se bere z hlaviček od proxy (`clientKey` v `src/lib/rateLimit.ts`), ne z první položky `x-forwarded-for`, a přibyl strop na endpoint bez ohledu na volajícího (flight-route 300/min, runway-in-use 200/min).
- [ ] Zbývá z téhož nálezu: strop je jen v paměti instance, takže při více instancích se násobí. Cache jde pořád obejít přidaným parametrem (`?cb=1`). Dotáhnout sdíleným počítadlem (Neon nebo Upstash), odmítáním neznámých parametrů, nebo pravidlem ve Vercel Firewallu.
- [x] Projekt ceskysvaznovosedlice zkontrolován 25. 9.: poslední produkční nasazení je READY z main (PR #1, 24. 9.), csznovosedlice.cz i www vrací 200. Zkratky nic nerozbily.
- [x] Drobnost (25. 9.): typy `any` v `src/components/Map/MapView.tsx` odstraněny. Leaflet má `typeof import('leaflet')`, `window.__playAtc` má deklaraci v `declare global`.

### Obsah: článek „Praha–Santiago de Compostela“ (publikováno 22. 9.)
- [x] Hledanost doplněna 25. 9.: `docs/keyword-plan-santiago-2026-09-25.md`. Linka sama poptávku nemá („fly2galicia“ i „letenky santiago de compostela“ bez měřitelné hledanosti), poptávka je u destinace (5 100) a Svatojakubské cesty (2 800). Titulek ani adresu neměníme.
- [ ] Zvážit v únoru až březnu 2027 samostatný článek o cestě na Svatojakubskou cestu z Česka (ověřená poptávka, jarní vrchol).
- [ ] Přeměřit hledanost „fly2galicia“ v lednu 2027, po prvních letech.
- [ ] Po 2. 12. 2026 ověřit, že linka skutečně létá, a článek aktualizovat.

### Obsah: článek „Nejdelší let na světě“
- [ ] Přeověřit proměnlivé údaje (`Vyzkum/nejdelsi-let-na-svete/promenlive-udaje.md`): po 25. 10. 2026 zimní časy SIA a STARLUX, Qatar Dauhá–Auckland, Qantas Perth, Project Sunrise.
- [x] **Zveřejněno 24. 9. 2026** jako `/blog/nejdelsi-let-na-svete` (PR #16). Podle zadání `~/Desktop/FlyQueens_SEO_zadani_nejdelsi_let_na_svete(1).pdf`, sjednoceného s `docs/redakcni-pravidla.md`: délka podle potřeby (ne 1 500–2 200 slov povinně), FAQ jako text bez FAQPage, ceny jen ověřené pro konkrétní termín, žádné vymyšlené zážitky z paluby, obsah s kotvami, karta v `BLOG_CARDS` s fotkou.
- [x] Postup: MM data → `serp.md` → fakta u aerolinek/letišť/výrobce (včetně nejdelšího přímého letu z Prahy a Project Sunrise) → draft → kontrola faktů a češtiny → náhled mobil/desktop. Podklady do `Vyzkum/nejdelsi-let-na-svete/`, adresa `/blog/nejdelsi-let-na-svete`.
- [x] Najít náhledovou fotku (vlastní ze `Fotografie/`, nebo s volnou licencí a kreditem).

### Údržba
- [x] Lokální `main` stažen 25. 9. 2026, je aktuální.

## Obsah, 18. září 2026

- [x] Inventura vlastních fotografií a KW výzkum v Marketing Mineru.
- [x] Zadání pro pražský spotting a Fly Meta Boeing 747: `docs/zadani-spotting-a-fly-meta-2026-09-18.md`.
- [x] Lokální draft `/letiste/praha/planespotting`: vlastní fotografie Kněževsi, radar, metadata, sitemap, odkazy z hubu, blogu a A380. Kontrola faktů a češtiny; `npm run check` prošel.
- [ ] Vizuální kontrola draftu v prohlížeči a finální optimalizace obrázků před publikací.
- [ ] Doplnit GSC baseline (konektor nyní vrací 403) a přesný český SERP.
- [ ] U Fly Meta identifikovat registraci a přesnou variantu; teprve potom dokončit samostatný článek.
- [ ] Publikace: aktuální obsahové změny jsou pouze lokální.

---

## ✅ Session 6 (2026-07-15) — živá data na produkci + free featury

- [x] **airplanes.live jako primární zdroj** — OpenSky i adsb.lol blokují Vercel datacenter IP (timeout). airplanes.live jede z Vercelu (0.2s). Doména konečně ukazuje reálná letadla.
- [x] **OpenSky OAuth2** klient (fallback, funguje jen lokálně) — env OPENSKY_CLIENT_ID/SECRET
- [x] **Trasy DEP→ARR přes adsbdb.com** (zdarma) — AeroDataBox předplatné vypršelo. Číslo letu + aerolinka.
- [x] **Letový řád v detailu** — časy/zpoždění/brána (kód hotový, čeká na reaktivaci AeroDataBox)
- [x] **Fáze letu** — startuje/stoupá/cruising/klesá/přistává (detail + sidebar)
- [x] **Odznak zajímavých letadel** — A380, jumbo, širokotrupé, vojenské, vrtulník, cargo
- [x] **Fullscreen mód** — tlačítko + klávesa F
- [x] **Rozšířené statistiky** — žebříček aerolinek, rozložení fází, nouzové squawky
- [x] **Řazení sidebaru** — Výška / Rychlost
- [x] **Oprava pádu mapy** — NaN souřadnice i NaN zoom (deep-link ?flight=)

### ⏳ Blokováno na AeroDataBox předplatném (placené)
- [ ] Časy/zpoždění/brány v detailu (kód hotový, naskočí po reaktivaci)
- [ ] Odletová/příletová tabule na letišti

---

## ✅ Hotovo

- [x] Live mapa letadel z OpenSky Network (polling 10s)
- [x] SVG siluety 8 typů letadel
- [x] Trasa za letadlem (12 bodů, přerušovaná čára)
- [x] Animované přelety letadel (easeInOut)
- [x] Dark / light mode (CartoDB tiles)
- [x] GPS tlačítko — flyTo na polohu uživatele + letadla nad hlavou v okruhu 30 km
- [x] Detail panel — callsign, model, výška, rychlost, kurz, fotka, airline logo
- [x] Přesný model letadla z databáze 427k záznamů
- [x] Sidebar s live seznamem letů + vyhledávání
- [x] 5 filtrů: Pasažérské / Nákladní / Soukromé / Vojenské / Vrtulníky
- [x] Letiště na mapě (toggle v TopBaru)
- [x] Statistiky stránka (/stats) — TOP 5, sparkline, teplota/vítr/mach, cestující
- [x] Proklik z TOP 5 statistik → mapa s detail panelem
- [x] Rate limiting, security headers, input sanitizace
- [x] Loading screen, error boundary, mock data banner
- [x] Mobile: hamburger, bottom sheet, swipe-to-close
- [x] Klávesové zkratky (Esc, /)
- [x] AeroDataBox — přesná DEP→ARR trasa, progress bar, ETA
- [x] PWA manifest + iOS ikona (zlaté letadlo na tmavém pozadí)
- [x] Vlastní doména flyqueens.cz
- [x] GitHub + Vercel auto-deploy

---

## 🔵 Fáze 2 — Mapa & UX

- [x] **Viewport culling** (session 5) — markery se renderují jen ve výřezu (+25% okraj), přepočet na moveend/zoomend. z6 ~1480 → z9 ~240 markerů. Náhrada za clustering, bez nové závislosti.
- [x] **Limit karet v sidebaru** (session 5) — max 60 karet řazených podle výšky + "+N dalších". Dřív se renderovalo 1600+ DOM karet.
- [x] **OpenSky fallback** (session 5) — adsb.lol byl pomalý (8-15s) → stuck loading. Nyní adsb.lol 3.5s timeout → OpenSky → mock.
- [ ] **Cluster markery** — číselné bubliny při velkém oddálení (globální pokrytí). Culling zatím stačí, clustering až pro celosvětový režim.
- [ ] **Region selector** — přepínač Evropa / Amerika / Asie / Celý svět v TopBaru
- [ ] **Počasí na mapě** — OpenWeatherMap tile overlay (oblačnost, déšť, vítr)
- [ ] **Letové koridory** — statická vrstva hlavních tras nad Evropou
- [ ] **Světlý režim** — dočistit tooltip a popup styly
- [ ] **Animace favicon** — blikající puntík vedle ikony v záložce prohlížeče
- [ ] **Fullscreen mód** — klávesa F nebo tlačítko na mapě

---

## 🟡 Fáze 3 — Data & Detail

- [ ] **Letiště detail** — klik na letiště → odjezdy + příjezdy + zpoždění (AeroDataBox)
- [ ] **Délka letu** — zobrazit "2h 15min" v detail panelu (z AeroDataBox dat)
- [ ] **Historie letu** — playback trasy za posledních 24h (OpenSky historical API)
- [ ] **Leaderboard letišť** — která letiště mají nejvíc pohybu právě teď
- [ ] **Export CSV** — stáhnout data ze /stats
- [ ] **Grafy v čase** — trvalý sparkline z localStorage (přežije reload)

---

## 🟠 Fáze 4 — Social & Sdílení

- [ ] **Sdílení letu** — URL `/?flight=OK123` už funguje, udělat hezkou preview kartu pro sociální sítě
- [ ] **Upozornění** — notifikace při vojenském letadle nebo letu pod 1000m v okolí
- [ ] **Supabase auth** — přihlášení Google/email
- [ ] **Oblíbené lety** — ukládání do Supabase

---

## 🟣 Fáze 5 — Mobilní app

- [ ] **Haptic feedback** — `navigator.vibrate()` při kliknutí na letadlo
- [ ] **TWA → Google Play** — zabalit PWA jako Android app přes PWABuilder
- [ ] **Push notifikace** — upozornění na zajímavá letadla na pozadí
- [ ] **App Store (iOS)** — vyžaduje React Native nebo Capacitor wrapper

---

## 💰 Monetizace

- [ ] **Affiliate booking** — tlačítko "Koupit letenku" v detail panelu → Kiwi.com affiliate link s DEP+ARR (provize 1–3%)
- [ ] **Kiwi.com affiliate** — registrace na partners.kiwi.com
- [ ] **PRO tier** — $2–5/měsíc: historie letů, notifikace, radar konkrétního letadla, bez reklam

---

## 📌 Technický dluh

- [ ] Leaflet marker clustering — nutné pro globální pokrytí
- [ ] Virtualizovaný seznam v sidebaru (react-virtual) — pro 1000+ letadel
- [ ] Otestovat na Safari / iOS 16
- [ ] Lighthouse audit — cíl Performance ≥ 85
- [ ] `metadataBase` URL sjednotit na flyqueens.cz (je tam stará vercel URL)

## Ubytování u letiště Praha (18. 9. 2026)

- [x] KW z Marketing Mineru včetně dostupné obtížnosti, uložené surové odpovědi.
- [x] Rešerše primárních hotelových zdrojů a rozporů v transferech.
- [x] Převzatá pravidla Webx a sjednocená redakční pravidla FlyQueens.
- [ ] Schválení a zveřejnění článku Pavlou po lokální revizi.
- [ ] Stay22: čeká se na konkrétní skript od Pavly; potom integrace a ověření.
- [x] Článek implementovaný na `/letiste/praha/ubytovani`, interní odkazy a sitemap.
- [x] Faktická a česká kontrola, build a mobilní/desktopový náhled.
