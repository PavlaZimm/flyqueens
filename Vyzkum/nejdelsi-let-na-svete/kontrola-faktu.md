# Kontrola faktů: Nejdelší let na světě

Kontrolovaný text: `src/app/blog/nejdelsi-let-na-svete/page.tsx` a karta `nejdelsi-let-na-svete` v `src/lib/blog.ts`.
Kontrola: 24. 9. 2026, nezávislý redaktor-kontrolor. Článek nebyl upravován.

Postup: každé tvrzení porovnáno se `zdroje.md` a `promenlive-udaje.md`. Znovu ověřeno na primárních zdrojích (24. 9. 2026):
- letový řád SIA (HTML stránky flotily A350-900, staženo curl, řádky SQ 021–024),
- qantas.com/en-au/onboard/fleet/a350 (termíny Project Sunrise),
- STARLUX fly_to_PRG (časy JX101/102, datum zahájení),
- Airbus, tisková zpráva 21. 9. 2018 (dolet, palivo).
- Vzdálenosti přepočteny vlastním výpočtem (Vincenty, WGS-84); s gcmap se shodují na ±1 km. gcmap.com samotný při kontrole nebyl dostupný (odmítnuté spojení).
- Časy block time přepočteny ručně přes UTC (SGT = UTC+8, EDT = UTC−4, EST = UTC−5, CEST = UTC+2, Tchaj-wan = UTC+8).

Legenda verdiktů: **sedí** / **nesedí** / **přehnané** (silnější než zdroj) / **neověřené** (podané jako fakt bez ověření).

## A. Kritické nálezy (opravit před publikací)

| # | Tvrzení v článku | Podklad | Verdikt | Oprava |
|---|---|---|---|---|
| A1 | Tip box, nadpis: „**Nejdelší podle času je jiný let.**“ | zdroje.md §2: „K 24. 9. 2026 je časově nejdelší SQ23 JFK→SIN (19 h 15 min)“; SIA letový řád: SQ21 má 19:10 do 1. 10., 19:30 až od 2. 10. | **nesedí** (k datu článku) | V den vydání je časově nejdelší SQ23, tedy stejná linka jako podle vzdálenosti. Nadpis změnit např. na „Od října je časově nejdelší jiný let.“ |
| A2 | Tip box: „V říjnu a v zimním letovém řádu je tak časově nejdelším letem … let z Newarku, v létě let z JFK.“ | SIA: SQ21 EWR→SIN 09:35→16:45 (+1) do 1. 10. = 19:10 < SQ23 19:15; od 2. 10. 09:25→16:55 = 19:30; 26.–31. 10. 10:35→17:45 = 19:10; od 1. 11. 09:35→17:45 = 19:10; SQ23 od 25. 10. 18:55 | **nesedí v detailu** (1. 10. je delší ještě JFK) a vnitřně rozporné: 2.–24. 10. je stále letní řád, a přesto vede Newark | „Od 2. října 2026 je časově nejdelší let z Newarku (SQ21), do té doby let z JFK (SQ23).“ Formulaci „v létě“ vypustit. |
| A3 | Tabulka „Deset nejdelších letů světa“, 10. místo Singapur ↔ San Francisco (13 593 km) a tvrzení v perexu/kartě „deset nejdelších linek“ | Vlastní výpočet: **Manila–New York JFK 13 696 km** (Philippine Airlines PR126/127, nonstop A350, podle podpůrných zdrojů Airportia/Flightera/FlightAware v provozu v roce 2026, PR127 platí 1. 4.–25. 10. 2026); **Bengaluru–San Francisco 14 004 km** (Air India AI175/176, 777-200LR, provoz v 9/2026 nejasný). Oba kandidáti v `zdroje.md` chybí. | **neověřené, pravděpodobně nesedí** | Ověřit PAL MNL–JFK a Air India BLR–SFO (letový řád aerolinek, FlightAware). Pokud létají nonstop, patří PAL na 10. místo před SIN–SFO a Air India na 9. místo (mezi SIN–LAX 14 113 a SYD–DFW 13 804 km); SIN–SFO pak z tabulky vypadne. Dokud nejsou ověřeny, nepsat „deset nejdelších“, ale např. „nejdelší linky, které jsme ověřili“, a doplnit výhradu. |
| A4 | Budoucí rekordy: „S vlastním nonstop letem Istanbul–Sydney počítá … i Turkish Airlines.“ (v sekci „Budoucí rekordy“) | Vlastní výpočet: IST–SYD **14 967 km**, tedy kratší než SIN–JFK 15 348 km | **přehnané / logická chyba** | Linka by rekordem nebyla (byla by zhruba 3. nejdelší). Buď doplnit „rekord by nepřekonala, ale patřila by mezi tři nejdelší linky“, nebo ji přesunout mimo odstavec o rekordech. |
| A5 | FAQ a sekce „Trasa“ / „Který let“: „Linky se zastávkou, i kdyby cestující nevystupovali, do srovnání nepočítáme.“ × tabulka, 5. místo: Auckland ↔ New York „Air New Zealand, **Qantas**“ | zdroje.md §3 řádek 5b: Qantas QF3/QF4 je úsek AKL–JFK letu **ze Sydney** (SYD–AKL–JFK) | **rozpor mezi částmi článku** | Buď Qantas z řádku vypustit, nebo doplnit poznámku: „Qantas létá úsek Auckland–New York jako pokračování letu ze Sydney; samotný úsek je nonstop a prodává se samostatně.“ Stejně pak upravit větu ve FAQ. Pro srovnání: Qatar (Dauhá–Adelaide–Auckland) článek správně vyřazuje. |

## B. Doporučené opravy (nepřesnosti, chybějící výhrady)

| # | Tvrzení v článku | Podklad | Verdikt | Oprava |
|---|---|---|---|---|
| B1 | Perex: „Podle letového řádu trvá let do New Yorku 18 hodin 40 minut a zpátky do Singapuru 19 hodin 15 minut.“ | SIA: platí 29. 3.–24. 10. 2026 | sedí, ale bez data platnosti | Doplnit „v letním letovém řádu (do 24. října 2026)“. Perex je kandidát na featured snippet a bez data rychle zestárne. Totéž v FAQ „Kolik hodin trvá“ už je, ok. |
| B2 | „Skutečnost bývá kratší než plán. Podle záznamů FlightAware trvaly lety SQ23 a SQ24 … zhruba 17 hodin 15 minut až 18 hodin.“ | zdroje.md: SQ23 17:29–17:51, SQ24 17:15–**18:07**; FlightAware neuvádí, zda jde o čas ve vzduchu, nebo od stání ke stání | rozsah **mírně podhodnocen**; výklad FlightAware **přehnaný** | „17 h 15 min až 18 h 10 min“. U FlightAware doplnit, že jde o orientační záznamy (podpůrný zdroj). |
| B3 | „Skutečnost bývá kratší než plán.“ × u STARLUX: „trvaly zářijové lety … 13 h 50 min až 14 h 30 min, tedy déle, než uvádí plán“ | zdroje.md §5: JX102 13:49–14:20 vs plán 12:50 | sedí jako data, ale **vnitřně rozporné sdělení** | U STARLUX přidat jednu větu, že příčinu neznáme (zdroje.md: pravděpodobně objízdné trasy, NEOVĚŘENO), nebo obecné tvrzení „bývá kratší“ zmírnit („u SQ23/24 bývá kratší“). |
| B4 | FAQ: „se STARLUX trvá podle zářijového letového řádu 12 hodin 50 minut z Prahy a 13 hodin 40 minut zpět“ | STARLUX (ověřeno 24. 9.): JX102 10:20→05:10 (+1) = 12:50; JX101 00:10→07:50 = 13:40 | sedí | Zářijový řád platí jen do 30. 9. (článek vychází 24. 9.). Zvážit uvést říjnové časy: JX102 10:45→05:10 (+1) = **12 h 25 min**, JX101 00:10→08:25 = 14 h 15 min. V textu se zmiňuje jen prodloužení zpátečního letu, zkrácení JX102 na 12:25 chybí. |
| B5 | „China Airlines a od letošního léta i STARLUX Airlines“ | STARLUX: „Route Launch: August 1, 2026“ | sedí | Konkrétněji „od 1. srpna 2026“ (relativní „letošní léto“ stárne). |
| B6 | „Proto nejdelší let podle vzdálenosti nemusí být zároveň nejdelší podle času.“ (za odstavcem o block time) | – | **logická chyba („proto“)** | Důvodem není rozdíl block time × čas ve vzduchu, ale vítr, trať a sezónní úpravy řádu. Přeformulovat: „Nejdelší let podle vzdálenosti navíc nemusí být nejdelší podle času, protože o délce letu rozhoduje i vítr a trať.“ |
| B7 | „Obě letiště obsluhují New York a rozdíl mezi nimi jsou pouhé čtyři kilometry.“ | JFK a EWR jsou od sebe cca 34 km; 4 km je rozdíl délky tras | **nesedí (logika)** | „Rozdíl v délce obou tras jsou pouhé čtyři kilometry.“ Newark leží v New Jersey, formulace „obsluhují New York“ je ok. |
| B8 | „Qatar Airways létá z Dauhá do Aucklandu se zastávkou v Adelaide.“ | zdroje.md: jen FlightAware, Simple Flying, CAPA; u Qatar NEOVĚŘENO; od 12/2026 přes Melbourne | **neověřené u aerolinky** podané jako fakt | Doplnit „podle FlightAware (září 2026)“. |
| B9 | „Qantas od 4. března 2026 posílá let z Perthu do Londýna přes Singapur“ | Qantas, březen 2026 (primární) | sedí | Volitelně doplnit, že návrat nonstopu média hlásí od 1. 2. 2027 (podpůrný zdroj), aby čtenář věděl, že jde o dočasný stav. |
| B10 | Tabulka, 10. místo SIN ↔ SFO: aerolinka „Singapore Airlines“, letadlo „A350-900ULR“ | zdroje.md: ULR jen SQ33/34, SQ31/32 běžný A350-900; United létá SFO–SIN také (UA1, 787-9, podpůrně) | **neúplné** | Pokud řádek zůstane (viz A3): doplnit United a „A350-900ULR (SQ33/34)“. |
| B11 | Tabulka, 5. místo, časy „16 h 15 min / 17 h 35 min (Air NZ)“ | Air NZ 17:35 vs OAG 18:05 (rozpor v zdroje.md §Rozpory 8) | sedí podle primárního zdroje | Ok. Rozpor není nutné čtenáři vysvětlovat. |
| B12 | „Linka do JFK začala létat v listopadu 2020.“ | SIA, tisková zpráva 20. 10. 2020 (primární) | sedí | Zdroj chybí v textu i v `SourcesBox`; doplnit. Volitelně: zpočátku 3× týdně a běžným A350-900, na ULR od ledna 2021 (Wikipedie, podpůrné). |
| B13 | „lepší vzduch díky nižší kabinové výšce a vyšší vlhkosti“ | SIA 2018: „optimised cabin altitude and humidity“ (podle zdroje.md: „optimalizované kabinové výšce a vlhkosti“) | **mírně přehnané** (směr „nižší/vyšší“ je výklad) | „díky upravenému tlaku a vlhkosti v kabině“. Jde o údaj z roku 2018, formulace v minulém čase je správně. |
| B14 | „Léky a melatonin konzultujte s lékařem, obě instituce se v doporučení liší.“ | NHS melatonin nedoporučuje, CDC ho zmiňuje jako možnost | sedí, ale vágní | Konkrétně: „NHS melatonin na jet lag nedoporučuje, CDC ho uvádí jako možnost.“ |
| B15 | „S doletem přes 16 000 km a až 22 hodinami letu“ (Qantas A350-1000ULR) | Qantas Newsroom Toulouse (primární); na qantas.com/a350 formulace „22 hours“ není | sedí podle Toulouse | Ok, zdroj Toulouse je u odrážky uveden. |
| B16 | „12 kusů Airbusu A350-1000ULR … První má přijít v dubnu 2027“; „Sydney–Londýn … od října 2027, letenky od února 2027“; „Sydney–New York od poloviny roku 2028, letenky od srpna 2027“ | qantas.com/a350 ověřeno 24. 9. 2026: „From October 2027 … daily non-stop … tickets going on sale in February 2027. … Sydney and New York will follow from mid-2028, with tickets on sale from August 2027.“ „first aircraft, named Vega, will be delivered in April 2027“ | sedí | – |
| B17 | „Rekord Singapore Airlines má překonat australský Qantas“ | SYD–LHR 17 016 km, SYD–JFK 16 013 km (vlastní výpočet) | sedí | Doporučuji vzdálenosti doplnit, v zdroje.md jsou vedené jako NEOVĚŘENO (gcmap nespuštěn). Obě trasy jsou delší než 15 348 km. |
| B18 | „Starší české články uváděly start v roce 2026“ | serp.md: pelipecky.cz „start 2026“ | sedí | – |
| B19 | `SourcesBox` | Článek používá FlightAware i pro Emirates, China Southern, Qantas SYD–DFW a STARLUX, v seznamu jsou jen SQ23/SQ24 | neúplné | Doplnit odkazy na FlightAware použitých letů nebo obecnou poznámku. |
| B20 | RelatedReading: „Airbus A380 se vrací do Prahy“ | Titul cílového článku: „Airbus A380 se **má** vrátit do Prahy 1. října 2026“ | **přehnané** | Sjednotit: „Airbus A380 se má vrátit do Prahy“. |
| B21 | Chybí zmínka o China Eastern Šanghaj–Auckland–Buenos Aires | serp.md: české weby ho uvádějí jako „nejdelší let“ | mezera | Volitelně jedna věta do sekce „Který let je nejdelší“: linka má zastávku v Aucklandu, proto do srovnání nepatří. Čtenáři to jinde najdou a mohou se divit. |

## C. Ověřené údaje (sedí)

| Tvrzení v článku | Podklad | Verdikt |
|---|---|---|
| SIN ↔ JFK, SQ24 (SIN→JFK) a SQ23 (JFK→SIN), denně | SIA letový řád (tabulky „SIN → JFK“, „JFK → SIN“; dílčí řádky podle dnů se skládají do denního provozu), ověřeno 24. 9. | sedí |
| Vzdálenost 15 348 km | gcmap (zdroje.md); vlastní výpočet 15 349 km | sedí |
| SQ24 12:10 → 18:50 = 18 h 40 min | 04:10 UTC → 22:50 UTC | sedí |
| SQ23 22:15 → 05:30 (+2 dny) = 19 h 15 min, „o dva dny později“ | 02:15 UTC (D+1) → 21:30 UTC (D+1) | sedí |
| Od 25. 10.: 18 h 15 min do NY, 18 h 55 min zpět | SQ24 12:10→18:25 EDT / 17:25 EST = 18:15; SQ23 23:05→06:00 EDT resp. 22:05 EST = 18:55 | sedí |
| SQ21 19 h 30 min 2.–25. 10.; zima 19 h 10 min | SIA: 09:25→16:55 (+1) 2.–25. 10.; 09:35→17:45 od 1. 11. (a 10:35→17:45 26.–31. 10.) | sedí |
| SQ22 18 h 25 min (tabulka, řádek 2) | 23:35→06:00 (+1) = 15:35 → 10:00 UTC | sedí |
| Ortodroma SIN–EWR 15 344 km, rozdíl 4 km | gcmap; vlastní výpočet 15 345 km | sedí |
| SIA 2018: Newark asi 16 700 km | tisková zpráva 30. 5. 2018 („approximately 9,000nm (16,700km)“) | sedí |
| A350-900ULR: 161 míst, 67 J + 94 S, bez ekonomické třídy | SIA stránka flotily „161 (Ultra Long Range)“ (ověřeno 24. 9.), PDF plánek | sedí |
| +24 000 l, celkem 165 000 l, bez přídavných nádrží | Airbus 2018: „by 24,000 litres to 165,000 litres … without the need for additional fuel tanks“ (ověřeno) | sedí |
| Dolet 9 700 nmi = „přes 17 900 km“, „přes 20 hodin“ | 9 700 × 1,852 = 17 964 km; Airbus „over 20 hours non-stop“ (ověřeno) | sedí |
| Book the Cook v J i S, 6 týdnů až 24 h předem, JFK i EWR | SIA Book the Cook (zdroje.md §7) | sedí |
| NHS rady (spánek, voda, pohyb, kofein/alkohol, denní světlo) | NHS (zdroje.md §7b) | sedí |
| CDC: 1 h/den na východ, 1,5 h/den na západ; posun spánku 2–3 dny předem | CDC Yellow Book (zdroje.md §7b) | sedí |
| Tabulka ř. 3: LHR → PER 14 499 km, asi 16 h 50 min*, 787-9, jen tímto směrem | gcmap; Simple Flying/OAG; Qantas 3/2026 | sedí (čas s hvězdičkou správně označen) |
| Ř. 4: MEL ↔ DFW 14 472 km, asi 17 h 45 min z Dallasu*, 787-9 | gcmap; Simple Flying/OAG | sedí |
| Ř. 5: AKL ↔ JFK 14 207 km, 787-9 | gcmap; Air NZ | sedí (viz A5 k Qantasu) |
| Ř. 6: DXB ↔ AKL 14 200 km, asi 15 h 50 min / 17 h 25 min*, A380 | gcmap; Simple Flying 4/2026 | sedí (provoz jen podle FlightAware, v poznámce přiznáno) |
| Ř. 7: SZX → MEX 14 147 km, jen tímto směrem, A350-900, čas neověřen | gcmap; FlightAware | sedí (přiznáno) |
| Ř. 8: SIN ↔ LAX 14 113 km, 16 h 05 min / 17 h 10 min, A350-900 | gcmap; SIA | sedí |
| Ř. 9: SYD ↔ DFW 13 804 km, A380, čas neověřen | gcmap; FlightAware | sedí (přiznáno) |
| Ř. 10: SIN ↔ SFO 13 593 km, 15 h 40 min / 16 h 05 min | gcmap; SIA (SQ34 15:40, SQ33 16:05) | čísla sedí, pořadí viz A3 |
| Qatar DOH–AKL 14 535 km „by patřil na třetí místo“ | gcmap; vlastní výpočet 14 535 km (> 14 499) | sedí |
| Project Sunrise: 238 míst ve čtyřech třídách, Wellbeing Zone mezi W a Y | Qantas Newsroom 6/2026 | sedí |
| Výhrada Qantas k certifikaci a schválení | Qantas Newsroom | sedí |
| Turkish: jen vyjádření předsedy pro Simple Flying, oficiálně neohlášeno | zdroje.md §4 | sedí (jen viz A4) |
| Praha–Tchaj-pej 9 029 km, nejdelší pravidelná přímá linka z Prahy | gcmap; vlastní výpočet 9 029 km | sedí (charter do Cancúnu 9 000 km správně vyloučen) |
| JX102 / JX101, od 1. 10. čtvrtý let týdně, JX101 14 h 15 min | STARLUX (ověřeno 24. 9.): Po, Út, Čt, So od 1. 10.; 00:10→08:25 CEST = 16:10 → 06:25 UTC | sedí |
| Praha–Soul 8 258 km, Korean Air | gcmap | sedí |
| Karta: titulek, perex „15 348 km a přes 18 hodin … bez ekonomické třídy“, obrázek 1600 × 738, 68 kB | blog.ts; soubor ověřen (sips) | sedí; meta description 155 znaků (na horní hranici) |
| Popisek fotky „fotografováno při exkurzi v říjnu 2025. Foto: Pavla Zimmermannová.“ | fotografie.md (rozhodnutí Pavly) | sedí |

## D. Otevřené body k ověření

1. Philippine Airlines MNL–JFK a Air India BLR–SFO (viz A3). Rozhodují o pořadí 9. a 10. místa.
2. Ortodromy SYD–LHR, SYD–JFK a IST–SYD doplnit do `zdroje.md` z gcmap (vlastní výpočet: 17 016 / 16 013 / 14 967 km).
3. Proč jsou skutečné časy STARLUX delší než block time (objízdné trasy?). Dokud neověřeno, nepsat příčinu.
