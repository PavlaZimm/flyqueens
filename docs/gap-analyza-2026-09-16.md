# Gap analýza a rychlé výhry v SERPu

Na základě dat z Marketing Mineru pro český trh, 16. září 2026. Hledanost je
průměrný počet hledání za měsíc, není to příslib návštěvnosti. Obtížnost je
škála 0–100; **„neuvedena“ znamená, že SERP nebyl analyzován — ne že je dotaz
snadný.** Kde se čísla mezi reporty Marketing Mineru liší, je uvedený rozsah.

## Výchozí stav: nula

Marketing Miner pro `flyqueens.cz` vidí **0 návštěvnosti a 0 klíčových slov**
ve všech typech výsledků (organika, placené, shopping, AI Overviews, local
pack). Stejně tak nemá web žádnou překryvovou konkurenci — na to je potřeba
nejdřív někde rankovat.

Prakticky to znamená dvě věci:

1. Gap analýza proti vlastnímu webu vrací „všechno je gap“. Užitečná otázka
   proto není „co nám chybí“, ale **„kde konkurence rankuje špatně stránkou,
   která na dotaz neodpovídá“**.
2. Bez ověřené Search Console nepoznáme, kdy se to začne měnit. Zůstává to
   jednička v [obsahovém plánu](../tasks/content-plan.md).

## Konkurenti

Nemuseli jsme je hádat — vyšli z překryvu SERPu. Relevantní čeští hráči:

| Domain | Překryv s aeroweb.cz | Čím žije |
|---|---:|---|
| **planes.cz** | 41 % | fotodatabáze, letiště, registrace letadel, letový řád |
| **flying-revue.cz** | 41 % | letecký magazín, typové profily letadel, letiště |
| **aeroweb.cz** | referenční | zpravodajství, encyklopedie letadel a letišť |

Zbytek překryvu drží Wikipedia, iDNES, Deník, Mapy.cz a sociální sítě — obecné
weby, ne konkurence v oboru.

## Gap: co konkurence umí a my ne

Z 8 421 dotazů, na které ti tři rankují a FlyQueens ne, vzniknou tři koše.
Rozdíl mezi nimi je zásadní.

### 🟢 Koš 1: živé sledování — tady je ta příležitost

Konkurence na tyhle dotazy rankuje, ale **špatně a nevhodnou stránkou**.
Nemá živou mapu. My ano.

| Dotaz | Hledanost | Obtížnost | Nejlepší pozice konkurence | Čím tam je |
|---|---:|---:|---:|---|
| letadla online | 1 000–1 700 | **30** | 20. (flying-revue) | článek o letišti Praha |
| mapa letového provozu | 320 | neuvedena | 29. (aeroweb) | rubrika o řízení provozu |
| mapa letadel | 300 | neuvedena | 34. (flying-revue) | článek o letišti Praha |
| letecky radar | 290 | neuvedena | 24. (aeroweb) | stránka o počasí |
| letiště praha sledování letadel | 280 | neuvedena | 3. (flying-revue) | článek o letišti Praha |
| přílety ruzyně | 400 | neuvedena | 5. (planes.cz) | výpis letiště |
| ruzyně odlety | 400 | neuvedena | 16. (planes.cz) | výpis letiště |
| ruzyně přílety | 290 | neuvedena | 6. (planes.cz) | výpis letiště |
| přímý přenos z letiště václava havla | 510 | neuvedena | 1. (flying-revue) | stránka s kamerou |

Pozice 20–34 u dotazů s tisícem hledání znamenají, že **Google nemá co dát na
první stranu**. Do téhle mezery se vejde `/radar`.

Dlouhý ocas, který popisuje přesně náš produkt: `letadla online cz` 50
(obtížnost **12**) · `radar letadla online` 30 (**+105 % YoY**) ·
`sleduj letadla online` 20 · `najít letadlo online` 10 ·
`online letadla nad evropou` 10.

⚠️ **Pozor na smíšený záměr.** V klastru „letadla online“ je i animovaný film
Planes (`letadla film online` 110, `letadla 2 online` 40) a hry. Část hledajících
nechce radar. Nestavět na tom jedinou naději a měřit, co reálně přijde.

### 🟡 Koš 2: česká regionální letiště — levné a máme na to kód

Aeroweb a planes.cz drží tenké databázové stránky ke každému českému letišti.
My máme generátor letištních stránek (`scripts/generate-airport-details.mjs`
+ `src/data/airports.json`), takže je to práce s obsahem, ne s technikou.

| Letiště | Dotaz | Hledanost | Obtížnost |
|---|---|---:|---:|
| Hradec Králové | letiště hradec králové | 650–920 | 39 |
| Kyjov | letiště kyjov | 230 | neuvedena |
| Olomouc | letiště olomouc | 240 | neuvedena |
| Jindřichův Hradec | letiště jindřichův hradec | 210 | neuvedena |
| Most | letiště most | 210 | neuvedena |
| Bubovice | letiště bubovice | 200 | neuvedena |
| Přerov | letiště přerov | 150 | neuvedena |
| Plzeň-Líně | letiště líně | 140 | neuvedena |
| — | lkpr (ICAO Praha) | 290 | neuvedena |
| — | lkpd (ICAO Pardubice) | 220 | neuvedena |
| — | letiště čr | 160 | neuvedena |

Hradec Králové má **+27 % YoY** a extrémní peak v květnu a červnu (2 900) —
to jsou letecké dny, ne pravidelný provoz. `letiště hradec králové akce` (70)
potvrzuje, že lidé hledají program akcí. Na to buď odpovíme pravdivě, nebo
tam nechodíme.

ICAO kódy (`lkpr`, `lkpd`) jsou levná výhra: krátký dotaz, jasná odpověď a
naše letištní stránky na něj mají data. Stačí kód viditelně uvést.

### 🔴 Koš 3: encyklopedie letadel — nechat být

Tady má konkurence roky obsahu a dobré pozice. Vstupovat do toho novým webem
je nejdražší možná cesta.

`airbus a380` 2 900 (flying-revue 8.) · `boeing 747` 2 400 (flying-revue 7.,
planes.cz 7.) · `boeing 777` 2 400 (aeroweb 8.) · `airbus a350` 1 700
(aeroweb 5.) · `csa` 5 500 (aeroweb 10.) · `antonov an 225` 1 100 ·
`cessna 172b` 1 500 · desítky typových variant.

**Výjimka:** typ letadla má smysl jen tam, kde ho svážeme s živým provozem nad
Českem nebo s vlastní fotkou — tedy jako A380 Emirates v Praze, což už na webu
je. Ne jako obecný typový profil.

## Rychlé výhry: snadná KW, na která se dá dostat do SERPu

Vybráno podle obtížnosti, ne podle hledanosti. Tohle je pořadí, ve kterém to
má smysl dělat.

| # | Dotaz | Hledanost | Obtížnost | SERP | Kdo to má vyhrát |
|---|---|---:|---:|---|---|
| 1 | jak vysoko létají letadla | 240 | **2** | featured snippet | **už máme článek** — jen doladit |
| 2 | letadla online cz | 50 | **12** | — | `/radar` |
| 3 | kolik stojí letadlo | 170 | **16** | featured snippet | nový článek |
| 4 | letadla online | 1 000–1 700 | **30** | — | `/radar` |
| 5 | letiště drážďany parkování | 50 | **14** | local pack | `/letiste/zahranici/drazdany` |
| 6 | letiště drážďany | 220 | **35** | knowledge graph | tamtéž |
| 7 | letiště hradec králové | 650–920 | **39** | knowledge graph | nová letištní stránka |
| 8 | letiště lipsko | 130 | **42** | knowledge graph | `/letiste/zahranici/lipsko` |
| 9 | jak rychle letí letadlo | 200 + 160 varianta | neuvedena | — | plánovaný článek |
| 10 | radar letadla online | 30 | neuvedena | — | `/radar` |

### Nejrychlejší akce vůbec: obtížnost 2

`jak vysoko létají letadla` má **obtížnost 2** a Google na něj zobrazuje
featured snippet. Článek `/blog/jak-vysoko-letaji-letadla` už existuje.
Není potřeba psát nic nového — stačí:

- dát na začátek článku jednu samostatnou odpověď na 40–55 slov
  („Dopravní letadla létají nejčastěji v 9 až 12 kilometrech…“),
- doplnit tabulku výšek podle typu provozu,
- ověřit, že H2 zní přesně jako otázka, kterou lidé hledají.

Featured snippet nelze vynutit, ale při obtížnosti 2 je to nejlevnější pokus
na celém webu.

## Co nechat být

- **Zavazadla a „co nesmí do letadla“.** Velký klastr (`kolik ml do letadla`
  590, `co nesmí do letadla smartwings` 370, `kolik tekutin do letadla` 290),
  ale je to cestovatelský a aerolinkový záměr. Drží ho dopravci a cestovatelské
  weby, FlyQueens k tomu nemá žádnou výhodu a rozmělnilo by to smysl webu.
  Dělat jen tehdy, když se z FlyQueens vědomě stane i cestovatelský web.
- **`flight radar` (68 000).** Navigační dotaz na zavedené globální trackery.
  Vysoký objem tady neznamená dosažitelný provoz.
- **`hangar brno` (9 300), `hangar ostrava` (4 300).** Restaurace a klub, ne
  letecké téma.
- **`csa` (5 500).** Dotaz na zaniklou aerolinku, drží ho zpravodajství.

## Pořadí prvních pěti kroků

1. **Doladit `/blog/jak-vysoko-letaji-letadla`** na featured snippet
   (obtížnost 2, článek existuje).
2. **Ověřit Search Console** a odeslat sitemap — bez toho je všechno ostatní
   měření naslepo.
3. **Posílit `/radar`** krátkým viditelným úvodem pro `letadla online`
   a `radar letadel`. Ne dlouhý SEO text před mapou.
4. **Napsat Hangar 7 a Drážďany** (vlastní fotky, viz obsahový plán).
5. **Přidat ICAO kódy a jedno regionální letiště** jako test, jestli se
   generátor letištních stránek vyplatí rozšířit na Hradec Králové a další.

Vyhodnocení po 28 dnech v Search Console: imprese, kliknutí, CTR a pozice bez
posledních tří neustálených dnů.
