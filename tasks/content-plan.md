# FlyQueens — obsahový plán a backlog

> Živý dokument. Aktualizuj po každé publikaci nebo změně priorit.
> Vytvořeno: 15. září 2026. Poslední update: 15. září 2026.
>
> Tohle je **pracovní seznam**, ze kterého se rovnou píše. Proč a jak stojí
> v [obsahové a linkbuildingové strategii](../docs/seo-content-linkbuilding-strategy-2026-09-11.md)
> a v [SEO plánu podle Marketing Mineru](../docs/seo-keyword-plan-2026-09.md).
> Ta dvě dokumenty se nepřepisují, tady se jen rozhoduje, co se píše teď.

---

## Stav k 15. září 2026

**Hotovo:** 7 článků na blogu, 5 letištních průvodců (Praha, Brno, Ostrava,
Pardubice, Karlovy Vary) + parkovací podstránky, odletová tabule
`/letiste/[airport]/odlety`, radar, statistiky.

**Analytika už na produkci běží** — není potřeba nic nasazovat:

| Co | Kde | Stav |
|---|---|---|
| Vercel Analytics | `src/app/layout.tsx` | ✅ běží |
| Vercel Speed Insights | `src/app/layout.tsx` | ✅ běží |
| Google Analytics 4 (`G-SMFS92YP8L`) | `src/components/UI/CookieConsent.tsx`, načte se až po souhlasu | ✅ běží |
| Vlastní eventy (`trackEvent`) | `src/lib/analytics.ts`, 24 míst v aplikaci | ✅ běží |
| Google Search Console | — | ❌ **chybí, blokuje vyhodnocení obsahu** |

Chybějící díly analytiky jsou v sekci [Co chybí v měření](#co-chybí-v-měření).

---

## Pravidla, která platí pro každý článek

1. **Jedna potřeba = jedna URL.** Nový článek nesmí konkurovat existujícímu.
   Když se téma překrývá, rozšiřuje se stávající stránka.
2. **Vlastní fotky mají přednost** před Unsplash a Wikimedia. U témat, kde
   máme vlastní snímky, je to hlavní konkurenční výhoda — oficiální weby mají
   data, ale ne osobní zkušenost.
3. **Nic, co nemáme, neslibujeme.** Žádné vymyšlené ceny, letové řády ani
   „nejlevnější parkování“ bez doložených cen a data kontroly.
4. **Proměnlivá data vedou na oficiální zdroj**, neopisují se.
5. **Každý článek má datum kontroly**, viditelné autorství a box se zdroji.
6. **Tempo: nejvýš dva nové kvalitní texty měsíčně** + jedna aktualizace
   existující stránky. Radši méně a doložené.

---

## Nová řada: Letiště a hangáry, kde jsme byly

Vlastní fotografie z Hangaru 7, Salzburgu, Innsbrucku, Drážďan, Lipska a
Tivatu. Tohle je obsah, který nikdo jiný v češtině takhle nemá — a zároveň
přirozeně vede na radar („podívejte se, co tam letí právě teď“).

### Priorita a rozhodnutí

| P | Téma | Navržená URL | Primární KW | Hledanost/měs | Obtížnost | Rozhodnutí |
|---|---|---|---|---:|---:|---|
| **P0** | Hangar 7 + letiště Salzburg | `/blog/hangar-7-salzburg` | hangar 7 | 800 | 60 | psát jako první, sloučit se Salzburgem |
| **P0** | Letiště Drážďany | `/letiste/zahranici/drazdany` | letiště drážďany | 220 | 35 | psát, včetně parkování |
| **P1** | Letiště Lipsko | `/letiste/zahranici/lipsko` | letiště lipsko | 130 | 42 | psát po Drážďanech, stejná šablona |
| **P1** | Letiště Tivat | `/letiste/zahranici/tivat` | letiště tivat | 110 | neuvedena | psát do jara, sezónní téma |
| **P2** | Přílet do Innsbrucku | `/blog/prilet-do-innsbrucku` | bez měřitelných dat | — | — | psát pro čtenáře a sociální sítě, ne pro SEO |

Hledanost, CPC a obtížnost v celé sekci jsou data Marketing Mineru pro český
trh ke 15. září 2026. Hledanost je průměr za měsíc, není to příslib
návštěvnosti. Obtížnost „neuvedena“ znamená, že SERP ještě nebyl analyzován —
**není to snadné klíčové slovo**, jen neznámé.

### 1. Hangar 7 + letiště Salzburg — P0

- **URL:** `/blog/hangar-7-salzburg`
- **Primární KW:** `hangar 7` — 800/měs, CPC 13,65 Kč, obtížnost 60,
  **YoY +19 %**, peak červenec (1 500).
- **Sekundární:** `red bull hangar 7` 210 (CPC 28,43 Kč) ·
  `red bull hangar` 200 (CPC 22,35 Kč, YoY +35 %) ·
  `hangár 7 salzburg` / `hangar 7 salzburg` 150 (CPC 18,28 Kč, **YoY +54 %**) ·
  `letiště salzburg` 50.
- **SERP:** knowledge graph, videa, obrázky. Vysoké CPC u Red Bull variant
  znamená, že o téma je komerční zájem — a že v SERPu je oficiální
  `redbull.com` plus cestovatelské blogy.
- **Proč sloučit se Salzburgem:** Hangar 7 stojí přímo proti terminálu letiště
  Salzburg. `letiště salzburg` má samo jen 50 hledání a samostatná URL by
  neuživila ani sebe, ani si nezasloužila konkurovat hlavnímu článku.
  Jedna stránka, Hangar 7 jako hlavní téma, letiště jako praktická sekce.
- **Unikátní prvek:** vlastní fotky exponátů, letecká sbírka Red Bullu, Flying
  Bulls, výhled na plochu letiště, spottingový potenciál místa.
- **Osnova:** co Hangar 7 je → co uvnitř uvidíte (vlastní fotky) → vstup,
  otevírací doba a rezervace → jak se tam dostat z Prahy i z terminálu →
  kolik času si nechat → co se dá vidět na ploše letiště Salzburg →
  kdy jet (peak je červenec, ale v zimě je klid) → odkaz na radar.
- **Sezónnost:** publikovat do konce zimy, ideálně **únor–březen**, ať je
  stránka zaindexovaná před červencovým peakem.
- **Pozor:** `hangar brno` (9 300) a `hangar ostrava` (4 300) jsou restaurace
  a klub, ne letecké téma. Nepoužívat je jako argument ani KW.
- **Interní odkazy:** `/radar`, `/blog/airbus-a380-praha-emirates`,
  budoucí Innsbruck.

### 2. Letiště Drážďany — P0

- **URL:** `/letiste/zahranici/drazdany`
- **Primární KW:** `letiště drážďany` — 220/měs, **obtížnost 35**, CPC 1,50 Kč,
  peak červen (450).
- **Varianty:** `drážďany letiště` 60 · `letiste drazdany` 50 (obtížnost 41).
- **Parkovací klastr (vlastní sekce, ne vlastní URL):**
  `parkování letiště drážďany` 70 (CPC 1,81 Kč) ·
  `letiště drážďany parkování` 50 (**obtížnost 14**) ·
  `parkování letiště drážďany diskuze` 40 (YoY +231 %) ·
  `parkování drážďany letiště` 30 · další varianty 20 a méně.
  Dohromady kolem 210 hledání s nejnižší obtížností v celém tomhle seznamu.
- **Proč je to nejlepší poměr práce a výsledku:** obtížnost 14–41 je
  výrazně pod pražským parkováním (47), Drážďany jsou pro Čechy reálná
  odletová alternativa a dotaz „diskuze“ ukazuje, že lidé hledají zkušenost —
  tedy přesně to, co máme na fotkách.
- **Unikátní prvek:** vlastní fotky terminálu a parkovišť, skutečná cesta
  z Prahy (auto i vlak), doba na odbavení, co tam reálně létá.
- **Nutné nuance:** ceny parkování s datem kontroly a odkazem na oficiální
  ceník, jinak je neuvádět. `letiště drážďany odlety` (20) neřešit vlastní
  tabulí — odkázat na oficiální.

### 3. Letiště Lipsko — P1

- **URL:** `/letiste/zahranici/lipsko`
- **Primární KW:** `letiště lipsko` — 130/měs, obtížnost 42, CPC 6,49 Kč.
- **Varianty:** `lipsko letiště` 80 (obtížnost 55) ·
  `parkování letiště lipsko` 50 (CPC 6,96 Kč) · `lipsko letiště parkování` 20 ·
  `letiště lipsko terminály` 10 · `letiště lipsko zkušenosti` 10.
- **SERP:** knowledge graph, obrázky, videa, **placené výsledky** — o parkování
  se tam soutěží, CPC 6,49–9,15 Kč.
- **Rozhodnutí:** stejná šablona jako Drážďany, psát hned po nich. Celý klastr
  má jen 10 dotazů — nemá smysl dělit na víc URL.
- **Unikátní prvek:** Lipsko je cargo hub (DHL). Noční provoz nákladních
  letadel je téma, které cestovatelské weby vůbec nemají, a vede přímo na
  radar s filtrem „Nákladní“.

### 4. Letiště Tivat — P1

- **URL:** `/letiste/zahranici/tivat`
- **Primární KW:** `letiště tivat` — 110/měs, CPC 4,11 Kč, YoY −17 %,
  peak červenec (260), v lednu jen 70.
- **Celý klastr je jediný dotaz** — Marketing Miner nenašel žádnou další
  variantu. Znamená to malé a čistě sezónní téma bez long tailu.
- **Rozhodnutí:** psát, ale až po německých letištích, a **publikovat
  v březnu nebo dubnu**, aby stránka stihla zaindexovat před letní sezónou.
- **Unikátní prvek:** přílet mezi horami nad Boka Kotorskou, krátká
  přistávací dráha, fotky z paluby i ze země. Tohle je vizuálně nejsilnější
  téma z celé řady — vhodné i na sociální sítě.
- **Nuance:** neslibovat letový řád charterů. Odkázat na oficiální stránky
  letiště a vést čtenáře na radar.

### 5. Přílet do Innsbrucku — P2, píše se pro čtenáře

- **URL:** `/blog/prilet-do-innsbrucku`
- **Data:** `letiště innsbruck` **nemá v Marketing Mineru měřitelnou
  hledanost**. `innsbruck airport` má 190, ale obtížnost 86 a anglický záměr —
  v tom SERPu je oficiální web letiště a globální weby.
  `innsbruck` (8 900) a `innsbruck co vidět` (140) jsou turistické dotazy,
  které FlyQueens nemá čím obsloužit lépe než cestovatelské weby.
- **Rozhodnutí:** **nedělat z toho letištního průvodce a nečekat SEO
  návštěvnost.** Napsat to jako zážitkový a technický článek: proč je přílet
  do Innsbrucku jedno z nejnáročnějších přiblížení v Evropě, jak vypadá
  zatáčka mezi horami, co vidíte z okna. Hodnota je v čase na stránce,
  sdílení a v odkazech, ne v hledanosti.
- **Interní odkazy:** `/blog/jak-vysoko-letaji-letadla`, budoucí článek
  o rychlosti, `/radar`.
- **Podmínka vydání:** jen s vlastními fotkami. Bez nich nemá článek žádnou
  výhodu proti existujícím videím na YouTube.

### Rozhodnutí k potvrzení: kam dát zahraniční letiště

Navrhuju nový hub `/letiste/zahranici/<slug>`, ne `/letiste/<slug>`:

- `/letiste/praha`, `/letiste/brno` a další jsou česká letiště **s živými
  daty** (tabule odletů, METAR, radar). U Drážďan, Lipska a Tivatu tyhle
  data nemáme a nechceme čtenáři tvrdit, že je má.
- Dynamická routa `/letiste/[airport]/odlety` generuje jen slugy z
  `src/data/airports.json`. Vlastní podsložka `zahranici` s ní nekoliduje.
- Hangar 7 je muzeum, ne letiště — proto `/blog/`.

Když budeš chtít jinou strukturu (např. `/svet/` nebo všechno do `/blog/`),
řekni před psaním prvního článku. Pak se URL nemění.

---

## Jak dostat fotky do webu

Fotky patří do `public/blog/` (články) nebo `public/letiste/` (letištní
průvodce). Postup:

1. **Nahraj soubory** — buď je hoď do složky na Google Drive a řekni mi
   které, nebo je přetáhni přímo do GitHubu na větev, na které pracujeme.
2. `npm run images:optimize` — zmenší delší hranu na 1 600 px a překóduje
   (skript je idempotentní, hotový soubor podruhé nezvětší).
3. Skutečné rozměry zapsat do `src/lib/blog.ts` (`imageWidth`, `imageHeight`)
   — jdou přímo do `og:image`, takže se nesmí rozejít.
4. Doplnit řádek do `docs/photo-credits.md`: soubor, autor
   (Pavla Zimmermannová / FlyQueens), licence „vlastní fotografie“, poznámka
   s místem a datem pořízení.
5. ALT text popisuje, co na fotce je — ne klíčové slovo.

U vlastních fotek z letišť platí: **nefotit bezpečnostní prvky a personál**
a v článku uvést datum návštěvy, ať je jasné, k čemu se popis vztahuje.

---

## Co chybí v měření

| Priorita | Co | Proč to blokuje obsah |
|---|---|---|
| **P0** | Ověřit Google Search Console pro `www.flyqueens.cz`, odeslat sitemap | Bez GSC nevíme, jestli problém je indexace, záměr, CTR nebo obsah. Bez toho se nedá rozhodnout, co aktualizovat. |
| **P1** | Event při prokliku z článku do radaru | 24 eventů pokrývá radar, sidebar, statistiky a affiliate, ale ne cestu „článek → nástroj“ — tedy přesně to, co má obsah dělat. |
| **P1** | `BreadcrumbList` schema na články a letiště | Zatím je jen na `/letiste/[airport]/odlety`. Vizuální drobečky jsou všude. |
| **P2** | Přestavět `/blog` na tematické huby | Dnes je to chronologický seznam. Se 12+ články přestane fungovat. |

GA4 i Vercel Analytics už měří, takže tady **není co nasazovat** — je potřeba
jen dodat Search Console a dva chybějící eventy.

---

## Backlog ze strategie (existující plán, zkráceně)

Pořadí zůstává, ale řada s vlastními fotkami má přednost — je hotová rychleji
a nikdo ji nedokáže zkopírovat.

| Téma | URL | Primární KW | Hledanost | Stav |
|---|---|---|---:|---|
| Jak rychle letí dopravní letadlo | `/blog/jak-rychle-leti-letadlo` | rychlost letadla | 190 | 🔜 plánováno |
| Proč letadlo na radaru není | `/blog/proc-letadlo-neni-na-radaru` | ověřit v MM | ? | 🔜 plánováno |
| Proč letadlo krouží nad městem | `/blog/proc-letadlo-krouzi` | ověřit v MM | ? | 🔜 plánováno |
| Co je ADS-B | `/blog/co-je-ads-b` | ADS-B | ověřit | 🔜 pillar, dobrý na odkazy |
| A320 vs. Boeing 737 | `/blog/airbus-a320-vs-boeing-737` | ověřit v MM | ? | 🔜 potřebuje vlastní fotky |
| Kondenzační stopa | `/blog/kondenzacni-stopa-za-letadlem` | ověřit v MM | ? | 🔜 plánováno |
| Planespotting Praha | `/letiste/praha/planespotting` | planespotting Praha | ověřit | ⏸ jen po vlastní návštěvě |
| Kalkulačka letové hladiny | `/nastroje/letova-hladina` | — | — | 🔜 linkovatelný nástroj |

**Aktualizace existujících stránek** (jedna měsíčně, podle GSC):
`/letiste/praha/parkovani` (vlastní fotky, datum kontroly) ·
`/blog/letiste-praha-zive` · `/radar` (krátký úvod pro `radar letadel`).

---

## Kontrola před publikací

- [ ] Jeden primární dotaz, žádná kanibalizace s existující URL
- [ ] Title a H1 se shodují významem, značka až na konci
- [ ] Meta description ve dvou větách popisuje konkrétní stránku
- [ ] Odpověď na hlavní otázku v prvních dvou odstavcích
- [ ] Vlastní fotka s ALT textem, rozměry v `src/lib/blog.ts`
- [ ] Zdroje v `SourcesBox`, proměnlivá data odkazem na oficiální zdroj
- [ ] Viditelné autorství, datum publikace a datum kontroly
- [ ] Nejméně dva kontextové interní odkazy tam a jeden zpět
- [ ] Zápis v `src/lib/blog.ts` a v `docs/photo-credits.md`
- [ ] `npm run check` prošlo
