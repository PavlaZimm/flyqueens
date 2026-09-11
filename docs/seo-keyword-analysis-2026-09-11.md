# FlyQueens — SEO a obsahová analýza

Datum: 11. září 2026  
Trh: Česko, český jazyk

## Datový stav

Datová část byla 11. září 2026 doplněna přímo z Marketing Mineru pro český trh. Obsahuje měsíční hledanost, CPC, meziroční změnu, sezónnost a tam, kde byla analýza SERPu dostupná, také obtížnost. Kompletní měřený výstup je v souboru [`marketing-miner-keywords-2026-09-11.csv`](./marketing-miner-keywords-2026-09-11.csv).

Marketing Miner pro samotný nový web FlyQueens zatím eviduje 0 rankingových klíčových slov a odhadovanou organickou návštěvnost 0. To není chyba webu, ale normální výchozí stav nové domény. Google Search Console property FlyQueens nebyla přes konektor dostupná (403), takže reálné imprese a prokliky zatím nelze vyhodnotit.

Hledanost je modelovaný měsíční údaj Marketing Mineru, nikoli garantovaná návštěvnost. Prázdná obtížnost znamená „SERP nebyl analyzován“, nikoli snadné klíčové slovo.

## Nejdůležitější naměřená data z Marketing Mineru

| Záměr | Klíčové slovo | Hledání / měsíc | CPC | Obtížnost | Meziročně | Rozhodnutí |
|---|---|---:|---:|---:|---:|---|
| Radar | radar letadel | 2 900 | 1,68 Kč | 16 | +22 % | hlavní dotaz pro `/radar` |
| Radar | letecký radar | 4 700 | 2,04 Kč | neznámá | +18 % | silný sekundární český výraz |
| Radar | letadla online | 1 700 | 1,60 Kč | neznámá | +1 % | přirozeně použít v popisu produktu |
| Radar | letový radar | 860 | 1,33 Kč | neznámá | +16 % | sekundární výraz pro radar |
| Sledování | sledování letů | 5 500 | 1,68 Kč | 20 | +5 % | silný obecný cluster |
| Sledování | sledování letů online zdarma | 4 200 | 1,61 Kč | neznámá | −9 % | zdůraznit „zdarma a bez účtu“ |
| Sledování | sledování letů podle čísla | 700 | 1,55 Kč | 20 | +11 % | primární dotaz článku; upraven title a H1 |
| Sledování | sledování letadel podle čísla letu | 640 | 1,20 Kč | 10 | −52 % | přirozená sekundární varianta |
| Praha | letiště praha odlety | 12 000 | 1,85 Kč | neznámá | −20 % | vysoká priorita, až se spolehlivými daty |
| Praha | letiště praha přílety | 8 400 | 0,23 Kč | neznámá | +20 % | vysoká priorita, až se spolehlivými daty |
| Praha | letiště praha online | 890 | 2,22 Kč | 54 | −18 % | stávající průvodce / budoucí hub |
| Praha | webkamera letiště praha | 700 | 0 Kč | 32 | −11 % | samostatná sekce pouze s funkčním streamem |
| Výnos | parkování letiště praha | 12 000 | 9,39 Kč | 47 | −14 % | nejvyšší monetizační priorita |
| Výnos | parkování u letiště praha | 1 700 | 9,97 Kč | 29 | −6 % | sekundární výraz stejné stránky |
| Výnos | nejlevnější parkování letiště praha | 590 | 8,06 Kč | 26 | −37 % | skutečné srovnání cen, ne reklamní sliby |
| Brno | parkování letiště brno | 1 200 | 1,36 Kč | neznámá | −10 % | rozvíjet existující stránku |
| Ostrava | parkování letiště ostrava | 680 | 6,16 Kč | neznámá | −1 % | zajímavější komerčně než objem naznačuje |
| Edu | jak vysoko létají letadla | 240 | 0 Kč | neznámá | −24 % | existující článek odpovídá dotazu |
| Edu | squawk 7700 | 190 | 0 Kč | neznámá | −2 % | existující článek; dobrý eventový obsah |

Pozor na přesnou formulaci: jednotné „sledování letu podle čísla“ má pouze 10 hledání měsíčně, zatímco množné „sledování letů podle čísla“ má 700. Titulek článku byl proto změněn na množnou variantu. Přesná fráze „živá mapa letadel“ v databázi měřitelná nebyla; mnohem silnější je „radar letadel“.

Dotaz „flight radar“ má sice 68 000 hledání měsíčně, ale jeho SERP a formulace ukazují převážně navigační záměr spojený se zavedenými globálními trackery. Pro nový český web proto není realistickou krátkodobou prioritou. Content Gap vůči Flightradar24, Flightradar.flights a webu Letiště Praha potvrdil relevantní témata „letecký radar“, „radar letadel“, „letadla online“ a „sledování letů online“. U některých výrazů vracel Content Gap jiné objemy než přímá analýza klíčových slov; v tomto dokumentu a CSV proto používáme konzistentně hodnoty z přímého měření `keyword_search_volume`.

## Výzkum snippetů a změny provedené 11. září 2026

Aktuální dokumentace Google Search Central potvrzuje, že Google vytváří title link z více zdrojů: `<title>`, hlavního nadpisu, výrazného textu, `og:title` a textu odkazů. Snippet skládá primárně z viditelného obsahu stránky a meta description použije jen tehdy, když stránku popisuje přesněji. Proto nestačí upravit samotná metadata.

Pro všech pět článků bylo provedeno:

- sjednocení SEO titulku, H1, OG titulku a názvu v registru článků;
- unikátní popisek postavený jako stručná odpověď na konkrétní záměr hledání;
- hlavní klíčová fráze přirozeně na začátku titulku, bez opakování a keyword stuffingu;
- skutečná tematická fotografie s popisným alternativním textem a dohledatelnou licencí;
- vlastní velký OG obrázek pro sdílení každého článku;
- `Article` data s datem vydání, aktualizace, autorem, kanonickou URL a konkrétním obrázkem;
- povolení `max-image-preview:large`, aby Google mohl nabídnout velký obrazový náhled;
- zachování viditelné rychlé odpovědi u začátku textu, ze které lze vytvořit relevantní snippet.

Finální titulky mají 46–50 znaků a popisky 121–133 znaků. Nejde o mechanický limit Googlu — titulky i snippety se zkracují podle zařízení a dotazu — ale tyto varianty jsou stručné, rozlišitelné a nesou hlavní informaci před případným ořezem.

Zdroje metodiky:

- [Google Search Central — Influencing title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google Search Central — Control your snippets](https://developers.google.com/search/docs/appearance/snippet)
- [Google Search Central — Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google Search Central — SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

Poznámka: žádný title ani meta description nezaručí přesné zobrazení v SERPu. Google je může podle dotazu přepsat. Výsledek je nutné po indexaci vyhodnocovat ve vlastní Search Console FlyQueens podle impresí, CTR a konkrétních dotazů.

## Strategická pozice

FlyQueens nemá rozumnou šanci porazit Flightradar24 jen kopií obecného „flight trackeru“. Má ale dobrou pozici pro české dotazy, na které může dát rychlejší a srozumitelnější odpověď:

1. Co mi právě letí nad hlavou?
2. Kde je konkrétní let podle čísla?
3. Co se děje u konkrétního českého letiště?
4. Co znamená údaj, který vidím na mapě?
5. Jak prakticky vyřešit cestu na letiště a parkování?

Výhoda značky má být: české vysvětlení, okamžité použití bez účtu, poctivě popsané limity dat a propojení radaru s praktickými informacemi.

## Mapa klíčových témat a cílových URL

| Priorita | Cluster a záměr | Hlavní cílová URL | Stav | Obchodní potenciál |
|---|---|---|---|---|
| P0 | živá mapa letadel, letadla online, radar letadel | `/radar` | existuje | opakované návštěvy, reklama později |
| P0 | co mi letí nad hlavou, jaké letadlo je nade mnou | `/blog/co-mi-leti-nad-hlavou` | nově vytvořeno | přímý vstup do radaru |
| P0 | sledování letu podle čísla, kde je můj let | `/blog/jak-sledovat-let-podle-cisla` | nově vytvořeno | letenky, pojištění, eSIM později |
| P0 | letiště Praha přílety / odlety živě | `/letiste/praha/prilety`, `/letiste/praha/odlety` | chybí | velmi vysoký, ale vyžaduje spolehlivá data |
| P0 | parkování letiště Praha, levné parkování u letiště | `/letiste/praha/parkovani` | existuje | nejbližší affiliate příjem |
| P1 | letiště Brno přílety / odlety | samostatné podstránky | chybí | střední, vyžaduje data |
| P1 | letiště Ostrava přílety / odlety | samostatné podstránky | chybí | střední, vyžaduje data |
| P1 | letadla nad Prahou / Ruzyní živě | `/blog/letiste-praha-zive` | existuje | vstup do radaru a letiště |
| P1 | jak vysoko létají letadla, letová hladina, FL350 | `/blog/jak-vysoko-letaji-letadla` | existuje | informační návštěvnost |
| P1 | squawk 7700 / 7600 / 7500 | `/blog/squawk-nouzove-kody` | existuje | událostní špičky a sdílení |
| P1 | parkování letiště Brno / Ostrava | současné parkovací stránky | existuje | lokální affiliate |
| P2 | proč letadlo krouží, proč vypouští palivo | nové vysvětlující články | chybí | návštěvnost při událostech |
| P2 | kondenzační stopa, turbulence, rychlost letadla | samostatné články podle MM dat | chybí | evergreen návštěvnost |
| P2 | typy letadel: Airbus A320 vs Boeing 737 | budoucí encyklopedie typů | chybí | interní proklik z detailu letu |

## Důležité pravidlo proti kanibalizaci

- Homepage cílí na značku a širší benefit „živá mapa letadel nad Evropou“.
- `/radar` je produktová stránka pro „živá mapa / radar letadel“.
- Článek „co mi letí nad hlavou“ řeší otázku a vede do radaru; nemá opakovat celý popis produktu.
- Článek „sledování letu podle čísla“ řeší identifikátory a postup; nemá se tvářit jako samostatný tracker.
- Letištní hub řeší všechny praktické informace o letišti. Přílety a odlety musí mít vlastní URL, pouze pokud budou obsahovat skutečnou tabuli.
- Parkovací stránky mají cílit na srovnání, cenu, délku stání a rezervaci. Nemají být přepsanou kopií letištního hubu.

## Konkurenční realita

- U obecné živé mapy dominují velké mezinárodní trackery a české ADS-B komunity. Samotná mapa proto nestačí; rozhoduje rychlost, český UX a užitečná interpretace dat.
- U příletů a odletů konkurují oficiální weby letišť, Skyscanner a specializované české tabule. Bez přesných dat nesmíme vytvářet stránky, které jen slibují „živě“ a posílají jinam.
- Parkování je komerčně nejsilnější, ale také silně konkurenční. Vyhrát může skutečné srovnání pro konkrétní počet dnů, pravidelně ověřené ceny, čas transferu, informace o klíčích a jasné označení affiliate odkazu.
- U vysvětlujících leteckých dotazů je český obsah řidší a často nepřehledný. Zde může FlyQueens rychle budovat tematickou autoritu.

## Seed keywords pro Marketing Miner

### Živá mapa a identifikace

- živá mapa letadel
- mapa letadel online
- radar letadel
- letový radar
- sledování letadel online
- letadla nad českem
- letadla nad prahou
- co mi letí nad hlavou
- jaké letadlo mi letí nad hlavou
- letadlo nade mnou

### Sledování konkrétního letu

- sledování letu
- sledování letu podle čísla
- kde je můj let
- kde se nachází letadlo
- vyhledat let podle čísla
- aktuální poloha letu
- zpoždění letu podle čísla

### Letiště

- letiště praha přílety
- letiště praha odlety
- přílety praha dnes
- odlety praha dnes
- letiště praha online
- letiště praha webkamera
- letiště brno přílety
- letiště brno odlety
- letiště ostrava přílety
- letiště ostrava odlety

### Parkování a monetizace

- parkování letiště praha
- levné parkování letiště praha
- parkování u letiště praha cena
- parkování letiště praha 7 dní
- parkování letiště praha s transferem
- parkování letiště praha bez předání klíčů
- parkování letiště brno
- parkování letiště ostrava

### Vysvětlující obsah

- jak vysoko létají letadla
- rychlost letadla
- letová hladina
- co znamená fl350
- squawk 7700
- squawk 7600
- squawk 7500
- proč letadlo krouží
- proč letadlo vypouští palivo
- kondenzační stopa za letadlem

## Doporučená další obsahová vlna

Publikovat až po kontrole hledanosti a překryvu dotazů:

1. Proč letadlo krouží nad městem a kdy je to normální
2. Jak rychle létá dopravní letadlo při startu a během letu
3. Co je letová hladina a proč se výška udává ve stopách
4. Jak poznat Airbus A320 a Boeing 737 na obloze i na mapě
5. Co znamená codeshare a proč má jeden let dvě čísla
6. Proč na mapě někdy není vojenské nebo soukromé letadlo

Nevytvářet desítky krátkých článků najednou. Každý nový text musí odpovědět na konkrétní otázku, obsahovat vlastní tabulku nebo příklad, odkazovat na primární zdroj a vést uživatele k relevantní živé funkci.

## Monetizace podle přirozenosti

1. **Parkování:** první volba. Affiliate odkaz je přirozenou součástí srovnání a uživatel má nákupní záměr.
2. **Letištní stránky:** eSIM, cestovní pojištění, půjčovna auta nebo hotel pouze v kontextu konkrétní potřeby.
3. **Stav letu:** nabídka kompenzace za zpožděný nebo zrušený let až ve chvíli, kdy umíme zobrazit důvěryhodný stav.
4. **Obsahové články:** reklamní plochy až po dosažení stabilní návštěvnosti; nesmí zpomalit radar ani zakrývat mapu.
5. **Retence:** oblíbené lety, upozornění na zajímavé stroje nebo denní přehled. To už bude vyžadovat databázi a souhlas s notifikacemi.

## Co měřit od prvního dne

- použití vyhledávání na homepage a radaru;
- otevření detailu letadla;
- proklik z článku do radaru;
- vstupní SEO stránka a návrat uživatele;
- proklik na parkování podle letiště;
- rychlost LCP/INP na homepage a radaru;
- dotazy, na kterých se stránka zobrazuje v Google Search Console.

Pro FlyQueens musí být vytvořena nebo ověřena vlastní Search Console property. Data z jiné property se nesmí použít k rozhodování o tomto webu.

## Nejbližší rozhodnutí vyžadující data nebo databázi

- **Datový poskytovatel je potřeba:** skutečné přílety, odlety, zpoždění, terminály a brány.
- **Databáze zatím není potřeba:** statické články, interní odkazy, sitemap a běžná SEO metadata.
- **Databáze bude potřeba:** uživatelské účty, oblíbené lety, upozornění, historie, komentáře nebo vlastní redakční systém s více autory.
