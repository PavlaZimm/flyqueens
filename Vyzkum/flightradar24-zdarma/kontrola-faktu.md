# Kontrola faktů: Flightradar24 zdarma a česky

Nezávislá kontrola článku `src/app/blog/flightradar24-zdarma-cesky/page.tsx`, 14. 10. 2026.
Článek jsem neupravoval.

## Použité zdroje (skutečně otevřené 14. 10. 2026)

- **FR24 Subscription plans** https://www.flightradar24.com/premium/ v Claude in Chrome. Souhlas s cookies jsem odmítl („Disagree and close“), pak jsem pořídil snímky karet s cenami a tabulky Compare Plans. Karta je zavřená.
- **FR24 úvodní stránka** https://www.flightradar24.com/ v Chromu. Nástroj find přepínač jazyka nenašel.
- **App Store, Flightradar24 | Flight Tracker** (prodejce Flightradar24 AB) https://apps.apple.com/us/app/flightradar24-flight-tracker/id382233851 přes WebFetch. Údaj Languages zní „English and 9 more“: English, French, German, Italian, Japanese, Polish, Portuguese, Russian, Simplified Chinese, Spanish. **Čeština v seznamu není.**
- **VTM.cz**, Jakub Čížek, 11. 5. 2026, přes WebFetch.
- **flyradar.cz/flightradar24/**, autor Tony6-, 6. 1. 2024, přes WebFetch.
- **Kód FlyQueens:** `src/components/Radar/RadarInfo.tsx`, `src/app/o-projektu/page.tsx`, `src/app/api/flights/route.ts`, `src/app/api/aero-insights/route.ts` + `src/lib/aeroInsights.ts`, `src/app/api/flight-search/route.ts` + `src/lib/flightSearch.ts`, `src/components/Map/MapView.tsx`, `src/components/Flight/FlightSearchResults.tsx`, `src/components/Landing/RadarActions.tsx`, `src/lib/airportFlightBoards.ts`, `src/app/let/page.tsx`.

## Co je na stránce tarifů FR24 a v článku chybí

- **Ceny jsou na stránce vidět**, a to přímo na kartách nad tabulkou:
  - Silver: $14.99/rok, přeškrtnuto $35.88, „Save 58% compared to monthly“.
  - Gold: $34.99/rok, přeškrtnuto $77.88, „Save 55%“.
  - Business: $499.99/rok, přeškrtnuto $599.88, „Save 17%“.
  - Poznámka pod kartami: „All prices in USD. Sales tax/VAT added to prices where applicable. Actual price will be shown during checkout.“
  - Tvrzení článku, že ceny na stránce nejsou, je tedy **nepravdivé**. Mohlo vzniknout tak, že karty překryl banner souhlasu s cookies, nebo se ceny načetly až později. Text stránky (get_page_text) je opravdu nevrací, ale na snímku a ve stromu přístupnosti jsou.
- **Placené tarify mají 7denní zkušební verzi zdarma** („Start 7-day free trial“). Pro dotaz „zdarma“ je to podstatné. FAQ stránky dodává: jedna zkušební verze na účet, platební údaje se zadávají předem a první platba proběhne po 7 dnech.
- **Platba měsíčně nebo ročně** (FAQ stránky).
- **Řádek „Last-clicked flights“**: Free ne, Silver a výš ano. Článek ho vynechává, což je v pořádku a není to chyba.

## Tabulka tvrzení

| # | Tvrzení v článku | Zdroj | Verdikt | Návrh opravy |
|---|---|---|---|---|
| 1 | Čtyři tarify: Free, Silver, Gold, Business | FR24 premium, snímek | OK | – |
| 2 | Historie letů 7 dní / 90 dní / 365 dní / 3 roky | FR24 premium, snímek | OK | – |
| 3 | Historie letů na letišti: ne / 90 dní / 365 dní / 3 roky | FR24 premium, snímek | OK | – |
| 4 | Záložky 1 / 10 / 25 / 60 | FR24 premium, snímek | OK | – |
| 5 | Uložené filtry 1 / 10 / 25 / 60 | FR24 premium, snímek | OK | – |
| 6 | 3D zobrazení: 3 relace, ostatní neomezeně | FR24 premium, snímek | OK | – |
| 7 | Bez reklam a bočního panelu: Free ne, ostatní ano | FR24 premium, snímek | OK | – |
| 8 | Bez časového limitu: Free ne, ostatní ano | FR24 premium („Remove timeout“) | OK | – |
| 9 | Seznam letů, hranice ŘLP, vrstva oblačnosti: jen Gold a Business | FR24 premium, snímek | OK | – |
| 10 | Fleet view jen Business | FR24 premium, snímek | OK | – |
| 11 | Použití: osobní ×3, Business komerční i osobní | FR24 premium, snímek | OK | – |
| 12 | FR24 si vyhrazuje právo měnit tarify bez upozornění | FR24 premium, patička | OK | – |
| 13 | API se prodává zvlášť | FR24 premium („Available separately“, FAQ) | OK | – |
| 14 | „Ceny tarifů tu neuvádíme, na stránce tarifů jsme je při kontrole neviděli.“ | FR24 premium, karty | **CHYBA** | Ceny na stránce jsou. Buď je uvést s datem a výhradou (např. „Silver 14,99 USD, Gold 34,99 USD a Business 499,99 USD ročně bez DPH, stav 14. 10. 2026; konečnou cenu FR24 ukáže až při platbě“), nebo napsat pravdivý důvod, proč je neuvádíte: ceny jsou v USD bez DPH a skutečná cena se ukáže až při platbě. |
| 15 | „Aktuální cenu uvidíte při registraci.“ | FR24: „Actual price will be shown during checkout“ | ZAVÁDĚJÍCÍ | Registrace účtu Free cenu neukáže. Opravit na „při platbě“ nebo „v pokladně“. |
| 16 | Poznámka ve zdrojích: „ceny na ní nebyly vidět a neuvádíme je“ | FR24 premium | **CHYBA** | Stejná oprava jako u č. 14. |
| 17 | Flyradar.cz z ledna 2024 uvádí ceny, které mohly zastarat | flyradar.cz: 6. 1. 2024, Silver 10 $/rok, Gold 35 $/rok, Business 500 $/rok | OK | Pokud se ceny FR24 doplní, lze uvést, že se od roku 2024 změnily. |
| 18 | Web FR24 je 14. 10. 2026 v angličtině, přepínač jazyka nenalezen | Vlastní otevření v Chromu, find přepínač nenašel | OK (jen vlastní pozorování) | Formulace „jsme nenašli“ je poctivá. Jazyk webu může záviset na prohlížeči, ale tvrzení je přiměřené. |
| 19 | „Oficiální seznam jazyků webu ani aplikace jsme nedohledali, takže nemůžeme potvrdit ani vyvrátit, že aplikace česky umí.“ | App Store, prodejce Flightradar24 AB: angličtina + 9 jazyků, bez češtiny | **NEDOLOŽENO / ZASTARALÉ** | Seznam jazyků iOS aplikace dohledat jde. Nahradit větou ve smyslu „Podle App Store (14. 10. 2026) je aplikace pro iPhone v angličtině a devíti dalších jazycích, čeština mezi nimi není. U verze pro Android Google Play jazyky neuvádí.“ Upravit i FAQ a poznámku ve zdrojích. Doporučuji, aby to redakce ještě sama ověřila v App Storu. |
| 20 | VTM.cz je „návod“ k FR24, publikováno 11. 5. 2026 | VTM.cz: Jakub Čížek, 11. 5. 2026 | Datum OK, označení ZAVÁDĚJÍCÍ | Článek VTM vysvětluje, jak FR24 funguje, a popisuje stavbu přijímače. Není to návod k ovládání aplikace. Psát „český popis, jak Flightradar24 funguje“, ne „návod“. |
| 21 | Polohy pocházejí z přijímačů ADS-B | VTM.cz: ADS-B **a také MLAT** (multilaterace ze zpráv Mode S, min. 4 přijímače) | ZAVÁDĚJÍCÍ (neúplné) | Doplnit „hlavně z ADS-B; polohy letadel bez ADS-B dopočítává FR24 multilaterací (MLAT) z více přijímačů“. Zdroj VTM. |
| 22 | Přijímače staví a provozují dobrovolníci a data posílají na servery | VTM.cz: „síť mnoha tisíc dobrovolníků“, data jdou na centrální servery | OK | – |
| 23 | VTM popisuje, co vybavení stojí a jak se zapojit | VTM.cz: FlightAware Pro Stick Plus kdysi asi za 900 Kč, dnes necelých 1 900 Kč (RPishop), 53 GBP; postup s Pi24 | OK | – |
| 24 | Contributor: bezplatný, „pozvánkový“, aktivace po založení účtu na stejný e-mail jako přijímač a po spuštění feedu | FR24 premium: „invitation-only Contributor plan … 60+ premium features“; FAQ: „sign up for a free account … same email address … Once your feed is live, your complimentary Contributor plan will be activated“ | OK | Věta spojuje dvě místa stránky. Obsah sedí a nic není vymyšlené. VTM k tomu dodává, že se plán aktivuje po prvním úspěšném nahrání polohy. |
| 25 | „limit doby, po kterou mapu sledujete“ (výklad „Remove timeout“) | FR24 premium: jen název řádku | OK / mírně NEDOLOŽENO | Výklad je rozumný, délku limitu ale stránka neuvádí. Žádné číslo nepřidávat. |
| 26 | Komerční použití jen Business | FR24 premium | OK | – |
| 27 | FAQ: placené funkce „historie letů na letišti, seznam letů…“ | FR24 premium | OK, mírně ZAVÁDĚJÍCÍ | Seznam letů a vrstvy má až Gold, Silver ne. Tabulka to říká správně, perex a FAQ to slévají do „placených tarifů“. Lze ponechat, případně doplnit „seznam letů až od Gold“. |
| 28 | FlyQueens: zdarma, bez registrace, česky | RadarInfo.tsx: „Radar je zdarma a nevyžaduje registraci.“ | OK | – |
| 29 | FlyQueens používá data z ADSB.lol | o-projektu: „Primárním technickým zdrojem je ADSB.lol“; RadarInfo: řádek „Zdroj“ ukazuje, který zdroj běží | OK, mírně nepřesné | Psát „hlavně z projektu ADSB.lol“. Mapa může přepnout na jiný zdroj. |
| 30 | Obnova každých 10 s, „jen když je záložka otevřená“ | RadarInfo: „jen dokud je záložka otevřená **v popředí**“ | ZAVÁDĚJÍCÍ (drobné) | Doplnit „v popředí“. Otevřená záložka na pozadí se neobnovuje. |
| 31 | Polohy starší než 30 s nezobrazujeme | RadarInfo; api/flights `MAX_POSITION_AGE_SECONDS = 30` | OK | – |
| 32 | Oblasti jsou kruhy o poloměru asi 460 km, začíná se nad Českem | RadarInfo: 250 NM ≈ 460 km, výchozí Česko + 7 dalších oblastí Evropy; api/flights dist ≤ 250 | OK | Lze doplnit „a dalších sedm oblastí Evropy“. Je to přesnější a lépe vysvětlí „nemá celosvětové pokrytí“. |
| 33 | Hledání podle volacího znaku, registrace nebo ICAO adresy, jen v zobrazené oblasti | RadarInfo | OK, ale neúplné | FlyQueens umí i hledání letu podle čísla z letenky a data (posledních 7 a příštích 30 dní) na `/let` a na hlavní stránce (`src/lib/flightSearch.ts`, `src/app/let/page.tsx`). Do řádku tabulky lze přidat. |
| 34 | „Historie letů: dlouhý archiv (měsíce až roky) nenabízíme“ | Kód (viz níže) | OK (pravdivé), ale neúplné | Doplnit, co mapa ukazuje: krátkou čárkovanou stopu vybraného letadla (max. 12 posledních poloh) jen od chvíle, kdy ho otevřete. K tomu přehled letu podle čísla za předchozích 7 dní na `/let`, pokud zdroj data dodá. |
| 35 | Tabule letišť: Praha, Brno, Ostrava, Pardubice, Karlovy Vary | `src/lib/airportFlightBoards.ts`, 5 položek (praha, brno, ostrava, pardubice, karlovy-vary) | OK | – |
| 36 | Letadlo bez ADS-B nebo mimo dosah přijímačů na mapě nenajdete | RadarInfo | OK | – |
| 37 | Čas příletu je u části letů jen odhad, spolehlivější je tabule letiště a aplikace dopravce | RadarInfo | OK | – |
| 38 | „…pomůže návod, proč se **číslo letenky** liší od volacího znaku“ | Článek /blog/jak-sledovat-let-podle-cisla, RadarInfo: „Číslo z letenky bývá jiné než volací znak“ | **CHYBA (věcná)** | „Číslo letenky“ je číslo dokladu, ne číslo letu. Opravit na „číslo letu z letenky“. |
| 39 | CTA: „zadejte volací znak do vyhledávání na hlavní stránce“ | `RadarActions.tsx`: „Zadej číslo z letenky a datum odletu. Registraci nebo volací znak vyhledáš na živé mapě.“ | **CHYBA** | Hlavní stránka hledá podle čísla letu z letenky a data, volací znak ne. Opravit na „nebo na hlavní stránce vyhledejte let podle čísla z letenky a data“. |
| 40 | FAQ: FlyQueens nemá dlouhý archiv ani celosvětové pokrytí „viz tabulka výše“ | RadarInfo (8 oblastí Evropy) | OK | Tabulka celosvětové pokrytí výslovně nezmiňuje. Pomůže doplnění u č. 32. |
| 41 | Fotka: Treviso, 25. 5. 2026, vlastní archiv; Wizz Air zepředu, vlevo ocas Ryanairu | `Fotografie/Letiště Treviso/*.zip`: všech 6 originálů má název 20260525_*; na snímku je Airbus Wizz Air a vlevo ocas Ryanairu | OK | Soubor `radar-letadel-wizz-air-nos.webp` chybí v `docs/photo-credits.md`. Doplnit, ze kterého originálu je. |
| 42 | Zdroj flyradar.cz: „FlightRadar24.com – Online letecký provoz na Radaru (leden 2024)“ | flyradar.cz: titulek prohlížeče, 6. 1. 2024 | OK | – |

## Co mapa FlyQueens ukazuje o historii letadla (ověřeno v kódu)

- **Mapa (`MapView.tsx`)** si v prohlížeči drží nejvýš 12 posledních poloh (`MAX_HISTORY = 12`), a to jen u letadla, které máte otevřené (`isSelected`). Stopa začíná až kliknutím, takže nejde o historii letu, jen o čárkovanou čáru za posledními obnovami. Ostatní letadla stopu nemají. Žádné uložené historické polohy se ze serveru nenačítají.
- **Spojnice letišť** (trasa odkud a kam a podíl uletěné cesty) je podle RadarInfo odhad, ne záznam letu.
- **Hledání letu podle čísla** (`/api/flight-search`, `/let`, formulář na hlavní stránce): datum v rozmezí posledních 7 a příštích 30 dní. Data jsou z AeroDataBoxu.
- **`/api/aero-insights?kind=history`** vrací přehled letu „Předchozích 7 dní“ (AeroDataBox `/flights/number/{č}/{-7}/{-1}`). Ve výsledcích hledání se zobrazuje jako „historie za předchozích 7 dní“. Kontrolní dotazy 14. 10. 2026 (QS1000, OK652) vrátily HTTP 200, ale prázdný výsledek s poznámkou „Zdroj pro tento dotaz neposkytl data“. Jestli tahle funkce v provozu skutečně dodává data, jsem neověřil. Podle paměti projektu AeroDataBox předplatné v červenci vypršelo, od té doby se mohlo obnovit.
- **Archiv poloh** (stopy letů za týdny až roky) v kódu není. Tvrzení „dlouhý archiv letů nenabízíme“ je pravdivé.

## Pravidlo „nic nevymýšlet“

- **Čeština webu FR24:** nic vymyšleného, článek uvádí jen vlastní pozorování. V pořádku.
- **Čeština aplikace:** nic vymyšleného, jen tvrzení „nejde ověřit“ už neplatí. App Store jazyky uvádí a čeština mezi nimi není. Formulace „nemůžeme potvrdit ani vyvrátit“ je teď zbytečně slabá. Nejde o porušení pravidla, ale o promarněný doložitelný fakt.
- **Contributor:** vše odpovídá stránce FR24 a VTM. Nic vymyšleného.
- **Ceny:** tady pravidlo porušeno je, i když opačným směrem. Článek dvakrát tvrdí fakt o zdroji (ceny nejsou vidět), který není pravda. Jde o nepravdivé tvrzení o primárním zdroji, ne o vymyšlenou cenu, a před publikací se musí opravit.
- **FlyQueens:** dvě věcné chyby, obě opravitelné jedním slovem nebo větou: CTA s volacím znakem na hlavní stránce a „číslo letenky“. Zbytek odpovídá kódu a RadarInfo.

## Úkol C: sliby, které nejdou doložit

- **„Zdarma“ u FR24:** sedí. Text přesně říká, co je ve Free a co ne. Chybí jen užitečná informace o 7denní zkušební verzi placených tarifů, ta ale v textu neslibuje nic navíc.
- **„Bez registrace“ u FR24:** text ji výslovně netvrdí, a to je dobře. Stránka nabízí u Free „Create account“, ale nikde neříká, že se mapa bez účtu nedá používat. Netvrdit ani jedno.
- **„Česky“ u FR24:** titulek „Flightradar24 zdarma a česky“ může slibovat českou verzi, kterou FR24 nemá. Tělo článku to poctivě vyvrací. Doporučuji titulek s otazníkem nebo s „je česky?“.
- **„Zdarma, bez registrace, česky“ u FlyQueens:** doloženo v RadarInfo.
- **„Česká mapa letadel zdarma“** v H2 a perexu: doloženo.
- **Funkce FlyQueens:** text žádnou neexistující neslibuje, naopak jednu skutečnou slibuje špatně (volací znak na hlavní stránce).

**Verdikt:** Článek v této podobě **není bezpečný ke zveřejnění**. Dvakrát nepravdivě tvrdí, že stránka tarifů FR24 neukazuje ceny, a CTA posílá čtenáře hledat volací znak tam, kde to nejde. Po opravě níže vyjmenovaných bodů je bezpečný.

**Musí se opravit před publikací:**
1. Odstavec o cenách a poznámka v SourcesBox: ceny na stránce FR24 jsou (Silver $14.99, Gold $34.99, Business $499.99 ročně, USD bez DPH, 14. 10. 2026). Buď je uvést s datem, nebo napsat pravdivý důvod, proč chybí. „při registraci“ → „při platbě“.
2. CTA: „zadejte volací znak do vyhledávání na hlavní stránce“ → hledání podle čísla letu z letenky a data.
3. „číslo letenky“ → „číslo letu z letenky“.
4. Čeština aplikace: nahradit „nemůžeme potvrdit ani vyvrátit“ údajem z App Store (iOS: angličtina + 9 jazyků, bez češtiny) v těle, ve FAQ i v poznámce. Před zveřejněním si to redakce ověří sama.

**Doporučeno (nesnižuje bezpečnost, zlepší přesnost):**
- doplnit MLAT k ADS-B podle VTM;
- „v popředí“ u obnovy mapy;
- „hlavně z ADSB.lol“;
- co mapa ukazuje o historii (krátká stopa a hledání podle čísla 7 dní zpět, pokud `/let` opravdu vrací data);
- VTM nenazývat „návodem“;
- zmínit 7denní zkušební verzi placených tarifů;
- zapsat fotku do `docs/photo-credits.md`.
