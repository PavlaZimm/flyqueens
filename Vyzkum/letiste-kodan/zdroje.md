# Letiště Kodaň (Copenhagen Airport, Kastrup, CPH): ověřená fakta z primárních zdrojů

Všechny stránky jsem otevřel a přečetl **23. 9. 2026**. Web cph.dk blokuje běžné stahování (HTTP 403), proto jsem ho četl v prohlížeči a PDF a Excel soubory letiště jsem načítal přímo z jejich serveru. Jistota: **vysoká** = primární zdroj to uvádí výslovně. **Střední** = primární zdroj, ale nepřímo, s výhradou nebo s vnitřním rozporem. **Nízká** = sekundární zdroj nebo můj vlastní výpočet. Konkurenční weby tu jako důkaz nepoužívám.

Starší rešerši pro kastrup.cz (4. 9. 2026) jsem bral jen jako rozcestník. Všechno níže je ověřené znovu.

Zkratky zdrojů:
- **AIP** = dánská letecká informační příručka od Naviair, AD 2 EKCH (textová část): https://aim.naviair.dk/media/files/zdxe03hoarn/EK_AD_2_EKCH_en.pdf. Ve stromu AIM je dokument zveřejněný 6. 8. 2026. Stránky nesou data 19 MAR 26 (AIRAC AMDT 03/26), 06 AUG 26 (AMDT 08/26), 16 APR 26 a 27 NOV 25 (AMDT 12/25, stránka s drahami). Další vydání **AIRAC AMDT 11/26** (zveřejněné 3. 9. 2026) platí od **29. 10. 2026** a u EKCH mění jen magnetickou deklinaci, magnetické kurzy drah a několik redakčních drobností. Fyzické údaje o drahách se nemění. Viz https://aim.naviair.dk/media/files/ct2vgpz44h2/EK_Amdt_A_2026_11_en.pdf
- **F&F** = Copenhagen Airports, „Key Facts & Figures 2025“ (PDF, 1 strana): https://www.cph.dk/490073/globalassets/8.-om-cph/facts-and-figures_2025.pdf
- **XLS 12/25** a **XLS 08/26** = měsíční statistika provozu letiště v Excelu: https://www.cph.dk/48d588/globalassets/8.-om-cph/04_investor/trafikstatistik/2025/12/2512_traffic.xlsx a https://www.cph.dk/4a4afb/globalassets/8.-om-cph/04_investor/trafikstatistik/2026/08/2608_traffic.xlsx
- **CPH-API** = databáze letů, ze které se plní oficiální tabule odletů na cph.dk: `https://www.cph.dk/api/FlightInformation/GetFlightInfoTable?direction=D|A&userQuery=*:*&startDateTime=…&endDateTime=…&language=en`. Dotaz jsem pouštěl 23. 9. 2026. Minulé dny API nevrací, budoucí ano (zkoušel jsem až do března 2027).
- **FR-API** = veřejný letový řád Ryanairu: `https://www.ryanair.com/api/timtbl/3/schedules/CPH/PRG/years/RRRR/months/M` (a obráceně PRG/CPH)
- **PRG-API** = tabule příletů a odletů na prg.aero: `https://api.prg.aero/arrivals-shorttime` a `…/departures-shorttime` (stav 22. 9. 2026)

---

## 1. Základní údaje

| Údaj | Hodnota | Zdroj (přesná URL) | Platnost | Jistota |
|---|---|---|---|---|
| Kódy | ICAO **EKCH**, IATA **CPH** | AIP (ICAO); CPH-API a prg.aero/kodan používají „CPH“ | 23. 9. 2026 | vysoká |
| Oficiální název v AIP | København/Kastrup | AIP, AD 2.1 | AIRAC 03/26 | vysoká |
| Provozovatel a adresa | Københavns Lufthavne A/S (Copenhagen Airports A/S), Lufthavnsboulevarden 6, DK-2770 Kastrup | AIP, AD 2.2; patička cph.dk | 23. 9. 2026 | vysoká |
| Vlastník | Dánský stát drží **99,6 %** akcií, kontrolní podíl získal v roce 2025 | TZ 13. 3. 2026: https://www.cph.dk/en/about-cph/press/news/2026/03/rising%20passenger%20numbers%20drive%20growth%20at%20copenhagen%20airport | 13. 3. 2026 | vysoká |
| Obec | Tårnby Kommune | DSB, stránka stanice: https://www.dsb.dk/trafikinformation/stationer/kobenhavns-lufthavn-kastrup/ („beliggende i Tårnby, er Danmarks største lufthavn“); Trap Danmark: https://trap.lex.dk/K%C3%B8benhavns_Lufthavn | 23. 9. 2026 | vysoká |
| Ostrov | **Amager**. Tårnby „ligger på Amager nær København“ a má „Danmarks største lufthavn“ | Trap Danmark, Tårnby Kommune: https://trap.lex.dk/T%C3%A5rnby_Kommune | text z r. 2019, čteno 23. 9. 2026 | vysoká (encyklopedie, ne provozovatel) |
| Vztažný bod letiště | 55° 37′ 04,50″ N, 012° 39′ 21,50″ E (průsečík drah 04R/22L a 12/30) | AIP, AD 2.2 | AIRAC 03/26 | vysoká |
| Vzdálenost od Kodaně | **4,4 NM (≈ 8,1 km) jiho-jihovýchodně** od Kodaně (AIP neuvádí, od kterého bodu) | AIP, AD 2.2. Přepočet NM na km je můj | AIRAC 03/26 | vysoká pro 4,4 NM, přepočet nízká |
| Vzdálenost vzdušnou čarou | ≈ **8,4 km** od vztažného bodu k Rådhuspladsen, ≈ 8,2 km ke Kongens Nytorv | **Vlastní výpočet** (haversine) z vztažného bodu v AIP a přibližných souřadnic náměstí | výpočet 23. 9. 2026 | nízká. Oficiální km na cph.dk jsem nenašel, viz neovereno.md |
| Doba cesty podle letiště | Hotely u T3 jsou „less than 15 minutes from Copenhagen's city centre“ | cph.dk Hotels: https://www.cph.dk/en/hotels | 23. 9. 2026 | vysoká |
| Nadmořská výška | **17 ft** (≈ 5 m) | AIP, AD 2.2 | AIRAC 03/26 | vysoká (přepočet na metry je můj) |
| Provozní doba | **H24.** Provozovatel, clo, pasová kontrola, řízení letového provozu, bezpečnost, odmrazování i handling jsou všechny H24 | AIP, AD 2.3 | AIRAC 03/26 | vysoká |
| Otevření letiště | 20. 4. 1925 jako Kastrup Lufthavn, „en af verdens første civile lufthavne“ | Trap Danmark: https://trap.lex.dk/K%C3%B8benhavns_Lufthavn | text 2019 | vysoká (encyklopedie) |

## 2. Dráhy (AIP, AD 2.12 a 2.13, stránka datovaná 27 NOV 25)

| Dráha | Rozměry | Povrch | Poznámka | Jistota |
|---|---|---|---|---|
| **04L/22R** | Ve směru 22R **3 571 × 45 m**, ve směru 04L **3 001 × 45 m**. Práh 04L je posunutý, na konci 04L leží 570 m dojezdové plochy (stopway). Přistávací délka 04L je 3 001 m, rozjezdová z 22R 3 571 m | asfalt | Nejdelší dráha letiště | vysoká |
| **04R/22L** | **3 302 × 45 m** | asfalt | | vysoká |
| **12/30** | Ve směru 12 **2 800 × 45 m**, ve směru 30 **2 365 × 45 m** (přistávací délka 30 jen 2 095 m, 300 m dojezdové plochy) | asfalt/beton | | vysoká |
| Počet drah | **3** (dvě rovnoběžné 04/22 a příčná 12/30) | – | – | vysoká |

**Jak se dráhy používají** (AIP, AD 2.21, pravidla proti hluku):
- Přednostní jsou 04L/R a 22L/R. Tryskáče při konfiguraci 22 **startují z 22R a přistávají na 22L**, při konfiguraci 04 startují z 04R a přistávají na 04L. Řízení může nasadit i paralelní provoz.
- Dráha 12/30 se smí použít jen výjimečně: při bočním větru nad 15 kt na přednostních drahách, při špatném stavu povrchu, při odklízení sněhu, práci na dráze a podobně.
- V noci (23:00–06:00 dánského času) nesmí hluk v šesti měřicích bodech překročit 80 dB(A). Na noční starty je potřeba předběžné povolení letiště.

## 3. Statistiky provozu

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Cestující 2025 | **32 433 694** (+8,5 %). Letiště zaokrouhluje na **32,4 mil.** a píše „+9 %“. Je to rekord, předchozí byl 30,3 mil. v roce 2018 | XLS 12/25 (list „Passengers year to date“); TZ 7. 1. 2026: https://www.cph.dk/en/about-cph/press/news/2026/01/record%20year%20for%20copenhagen%20airport | rok 2025 | vysoká |
| Cestující 2024 | **29 882 553** (F&F zaokrouhluje na 29,9 mil.) | XLS 12/25; F&F | rok 2024 | vysoká |
| Vývoj | 2022: 22,1 mil. · 2023: 26,8 mil. · 2024: 29,9 mil. · 2025: 32,4 mil. | F&F | 2022–2025 | vysoká |
| Nejrušnější měsíc | prosinec 2025: 2,46 mil. cestujících (+13 %), nejvíc v historii letiště | TZ 7. 1. 2026 | 2025 | vysoká |
| Průměr za den 2025 | **88 860** cestujících | F&F | 2025 | vysoká |
| Nejrušnější den 2025 | **13. 7. 2025: 119 127** cestujících | F&F | 2025 | vysoká |
| Pohyby letadel 2025 | **256 737** (+6,7 %), z toho osobních letů 249 606 a čistě nákladních 7 131. F&F uvádí 256 705 | XLS 12/25 (list „Movements“); F&F | 2025 | vysoká (malý rozdíl, viz neovereno.md) |
| Pohyby 2024 | 240 680 | XLS 12/25 | 2024 | vysoká |
| Náklad 2025 | 306 577 t | F&F | 2025 | vysoká |
| Linky a destinace | **367 linek do 191 destinací**, 47 nových linek v roce 2025, 49 linek mimo Evropu | TZ 13. 3. 2026 | 2025 | vysoká |
| Počet aerolinek | **63** (TZ 13. 3. 2026 a F&F). TZ 7. 1. 2026 uvádí 62 | TZ 13. 3. 2026; F&F; TZ 7. 1. 2026 | 2025 | střední (rozpor 62/63) |
| Největší dopravci | SAS (podíl **38 %**), Norwegian, Ryanair. Tito tři dohromady přepravili 62 % cestujících. Pořadí top 5 podle F&F: SAS, Norwegian, Ryanair, easyJet, Lufthansa | TZ 13. 3. 2026; F&F | 2025 | vysoká |
| Nejčastější destinace | Londýn, Oslo, Stockholm, Amsterdam, Paříž | F&F | 2025 | vysoká |
| Přestupující | 7,2 mil. v roce 2025 (+27 %). V 1. pololetí 2026 už 27 % všech cestujících | TZ 13. 3. 2026; TZ 21. 8. 2026: https://www.cph.dk/en/about-cph/press/news/2026/08/copenhagen%20airport%20increases%20profit%20in%20the%20first%20half%20of%20the%20year | 2025, H1 2026 | vysoká |
| 1. pololetí 2026 | 16,1 mil. cestujících (+9 %), průměrně 710 osobních pohybů denně | TZ 21. 8. 2026 | H1 2026 | vysoká |
| Leden–srpen 2026 | **22 916 418** cestujících (+7,1 %), **181 447** pohybů (+7,2 %) | XLS 08/26 | stav k 31. 8. 2026 | vysoká |
| Srpen 2026 | 3 324 368 cestujících (+3,6 %). Letiště píše „3,3 mil.“ | XLS 08/26; TZ 2. 9. 2026: https://www.cph.dk/en/about-cph/press/news/2026/09/nearly%2010%20million%20travellers%20during%20the%20summer | 8/2026 | vysoká |
| Léto 2026 (VI–VIII) | **9,9 mil.**, nejvíc v historii. „More than 100,000 passengers on most days“ | TZ 2. 9. 2026 | léto 2026 | vysoká |
| Výhled 2026 | cca **35,5 mil.** cestujících | TZ 13. 3. 2026 | odhad z 3/2026 | vysoká (jde o odhad letiště) |
| Pořadí na severu | Letiště o sobě píše „Denmark's largest airport“ a „the largest international airport in the Nordic region“ | TZ 7. 1. 2026; TZ 21. 8. 2026 | 2026 | střední (tvrzení letiště, čísla Oslo a Arlandy jsem u primárního zdroje nedohledal, viz neovereno.md) |
| Zaměstnanci na letišti | 18 500 | F&F | 2025 | vysoká |
| Doprava na letiště | metro 31 %, vlak 31 %, auto 20 %, taxi 12 %, bus 4 % | F&F | 2025 | vysoká |

## 4. Terminály: dnešní stav

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Terminály pro cestující | **T2 a T3**. Oba jsou otevřené **24/7**. V T3 (příletová hala) je vždy otevřená kavárna Caffeine | cph.dk Check-in, FAQ „What is the opening hours…“: https://www.cph.dk/en/practical/check-in | 23. 9. 2026 | vysoká |
| **Terminál 1** | Pro cestující se nepoužívá. Letiště ho pronajímá jako kanceláře: „Terminal 1 consists only of office spaces with access from apron.“ | cph.dk Real Estate: https://www.cph.dk/cph-business/real-estate/rental/terminal1 | 23. 9. 2026 | vysoká (datum uzavření pro cestující viz neovereno.md) |
| Rozdělení aerolinek | Oficiální seznam má 69 položek: **T3 = SAS, Delta, TUIfly Nordic**, všechny ostatní T2. T1 se v seznamu nevyskytuje. Seznam je zčásti zastaralý (obsahuje zaniklé Jet Time a Laudamotion) | https://www.cph.dk/en/flight-information/airlines | 23. 9. 2026 | vysoká pro T2/T3, střední pro úplnost seznamu |
| Lety do/z Prahy | SAS odbavuje v **T3**, Norwegian a Ryanair v **T2**. Přílety všech tří CPH-API značí „Terminal 3“ | CPH-API | 23. 9. 2026 | vysoká |
| Společná bezpečnostní kontrola | Ano. Kontrola leží **mezi T2 a T3**. CPH Express má dráhy 10 a 20 „at each end of the security checkpoint between Terminal 2 and Terminal 3“ | https://www.cph.dk/en/practical/security-checkpoint | 23. 9. 2026 | vysoká |
| Mola (piers) | **A–F**. Rozdělení odlétajících cestujících podle mol je v F&F | F&F; přehledová mapa (PDF, viz bod 6) | 2025 | vysoká |
| Přestavba | Mezi mola B a C se přistavuje terminál: +60 000 m², dvojnásobná výdejna zavazadel s 5 novými pásy, větší pasová kontrola, víc než 30 nových obchodů a restaurací. Věž Apron Tower se bourá. Stavba se dotkne odletů z mol C, D, E a F | https://www.cph.dk/fremtidens-terminal (DA, titulek „Fremtidens terminal åbner i 2027“); TZ 13. 3. 2026 | 23. 9. 2026 | vysoká |
| Otevření nové části | **2027** („Next year, the new terminal area in Terminal 3 will open“) | TZ 21. 8. 2026; cph.dk/fremtidens-terminal | 21. 8. 2026 | vysoká |
| Trasa vlakem do T2 | DSB: z vlaku vystoupíte v T3 a do T2 počítejte „op til 10 minutters gang“ | DSB jízdní řád K26 Sjælland (platí 14. 12. 2025–12. 12. 2026), strana s radami: https://www.dsb.dk/globalassets/pdf/koereplaner/regionaltog/k26/dsb-k26--sjaelland-.pdf | K26 | vysoká |

## 5. Přímé lety z Česka

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Dopravci PRG–CPH (stránka destinace) | **Norwegian Air Sweden, Ryanair, SAS**. V Praze odbavuje **Terminál 2** | https://www.prg.aero/kodan | 23. 9. 2026 | vysoká |
| Týden 23.–29. 9. 2026, CPH → PRG | **40 odletů**: SAS 20, Norwegian 13, Ryanair 7. Stejný počet příletů z Prahy | CPH-API | 23. 9. 2026 | vysoká |
| Časy SAS (léto) | SK767 v 8:20, SK2733 v 13:20, SK1761 v 18:55 z Kodaně | CPH-API | 9/2026 | vysoká |
| Týden 19.–25. 10. 2026 (konec letního řádu) | SAS 20, Norwegian 12, Ryanair 8 | CPH-API | 23. 9. 2026 | vysoká |
| **Zima 2026/27: SAS** | **20 letů týdně** (3× denně, v sobotu 2×). Odlety z Kodaně SK767 v 8:25, SK769 v 13:10 (v neděli 13:00) a SK1761 v 17:20 (v sobotu a neděli 18:50). Ověřeno v týdnech od 25. 10., 30. 11. 2026, 11. 1. a 15. 2. 2027 | CPH-API | stav databáze 23. 9. 2026 | vysoká (letový řád se může změnit) |
| **Zima 2026/27: Norwegian** | **4 lety týdně** v listopadu, prosinci a únoru (v listopadu po, čt, pá a ne). V týdnu 11.–17. 1. 2027 jen **2 lety** | CPH-API | stav 23. 9. 2026 | vysoká |
| **Zima 2026/27: Ryanair** | Poslední let CPH → PRG **2. 11. 2026**, v prosinci, lednu ani únoru nelétá. Znovu od **28. 3. 2027** (FR6707/FR6708) | FR-API (měsíce 10/2026–4/2027); potvrzeno v CPH-API | stav 23. 9. 2026 | vysoká |
| Léto 2026 | Na lince létali všichni tři dopravci (v září denně). Přesné frekvence z července a srpna ověřit nejde, obě API vracejí jen budoucí lety | CPH-API, FR-API, prg.aero | 23. 9. 2026 | vysoká pro dopravce, frekvence viz neovereno.md |
| **Doba letu** | Podle letového řádu **1 h 20 min** (SAS, Norwegian) až **1 h 25 min** (Ryanair). Příklady z 22. 9. 2026: SK767 CPH 8:20 → PRG 9:40, D83580 7:00 → 8:20, FR6707 10:20 → 11:45. Opačně SK768 PRG 10:20 → CPH 11:40, FR6708 12:45 → 14:10 | PRG-API (časy v UTC) + CPH-API (místní čas); FR-API (např. 2. 11. 2026 9:50 → 11:15) | 22.–23. 9. 2026 | vysoká (jde o plánované časy, skutečná doba se liší) |
| Brno, Ostrava, Pardubice, Karlovy Vary | V databázi CPH **žádný let** do BRQ, OSR, PED ani KLV (týdny 23.–29. 9. a 19.–25. 10. 2026, 7.–13. 12. 2026, 15.–21. 2. 2027) | CPH-API | stav 23. 9. 2026 | vysoká pro vzorek týdnů (weby regionálních letišť jsem nedokázal spolehlivě přečíst, viz neovereno.md) |
| Smartwings | Je v seznamu aerolinek CPH (T2), ale na lince do Prahy v žádném zkoumaném týdnu neletí a prg.aero ho u Kodaně neuvádí | https://www.cph.dk/en/flight-information/airlines; CPH-API; prg.aero/kodan | 23. 9. 2026 | vysoká |

## 6. Odlety, přílety a mapa online

| Údaj | URL | Poznámka | Jistota |
|---|---|---|---|
| Odlety | https://www.cph.dk/en/flight-information/departures | Živá tabule: čas, cíl, číslo letu, aerolinka, stav (Closed, Boarding, To gate). Terminál a gate jsou v detailu | vysoká |
| Přílety | https://www.cph.dk/en/flight-information/arrivals | | vysoká |
| Destinace / mapa linek | https://www.cph.dk/en/flight-information/destinations | | vysoká (odkaz z menu) |
| Aerolinky a terminály | https://www.cph.dk/en/flight-information/airlines | | vysoká |
| Interaktivní mapa letiště | https://www.cph.dk/en/practical/cph-map (vložená mapa info.cph.dk/CPH/EMBEDDED/embedded-map). Ukazuje terminály, gaty, bezpečnostní a pasovou kontrolu, toalety, obchody i salonky po patrech | stránka načtená 23. 9. 2026 | vysoká |
| Přehledová mapa v PDF | https://www.cph.dk/4a3405/globalassets/3.-praktisk/oversigtskort/cph_kort_oversigt_uk_vers_3.pdf. Terminál 2 a 3, gaty A–F, metro, vlak směr Malmö, úseky „Under reconstruction“. Bez data, uvádí ještě starý název „Eventyr Lounge“ | Stránka služeb na ni odkazuje („View overview map in PDF“) | střední (neaktuální podrobnosti) |

## 7. Bezpečnostní kontrola

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Kdy přijet | V Schengenu **nejméně 2 h** před odletem, mimo Schengen **nejméně 3 h** | cph.dk Check-in FAQ: https://www.cph.dk/en/practical/check-in; Tips: https://www.cph.dk/en/practical/tips-for-the-journey | 23. 9. 2026 | střední: dánská stránka o přestavbě radí **2,5 h** pro Schengen, viz neovereno.md |
| Otevírací doba kontroly | Řídí se letovým řádem. **Vždy nejméně 4:00–22:00**, jinak otevírá nejpozději 2 h před prvním odletem. Když se létá celou noc, je otevřená nonstop | cph.dk Check-in FAQ | 23. 9. 2026 | vysoká |
| Vstup | U vstupu naskenujete palubenku, dál už ji neukazujete. Rodiny s dětmi do cca 6 let mohou použít rodinnou dráhu | https://www.cph.dk/en/practical/security-checkpoint | 23. 9. 2026 | vysoká |
| Fast track letiště (CPH Express) | **Jen pro vnitrostátní lety**, 5:00–21:00, dráhy 10 a 20 | tamtéž | 23. 9. 2026 | vysoká |
| Fast track u SAS | Pro cestující v SAS Plus/Premium a Business a pro členy EuroBonus Gold a Diamond | SAS, stránka linky: https://www.flysas.com/en/flight-routes/copenhagen/prague | 23. 9. 2026 | vysoká |
| Placený fast track nebo rezervace času | Na cph.dk jsem nenašel ani jedno | viz neovereno.md | 23. 9. 2026 | – |
| **Tekutiny** | Stále platí **100 ml**: jeden průhledný uzavíratelný 1litrový sáček na osobu, žádná nádoba nad 100 ml, sáček položit viditelně do vaničky. Sáčky zdarma u balicích stolů před kontrolou. Kojenecká strava je výjimka | https://www.cph.dk/en/practical/baggage/liquids-in-carry-on-baggage; https://www.cph.dk/en/practical/baggage/go-and-no-go-in-baggage | 23. 9. 2026 | vysoká |
| 3D skenery | První 3D skenery letiště nasadilo v roce 2025. Na nových drahách **zůstává elektronika v zavazadle** a hodinky, boty a pásek se nesundávají. Nová kontrola jen s 3D skenery měla být hotová „by the summer“ 2026 | TZ 13. 3. 2026 | 13. 3. 2026 | vysoká pro oznámení, střední pro dnešní stav (dokončení jsem neověřil) |
| Powerbanky | V příručním zavazadle nejvýš 2 kusy pod 100 Wh. 100–160 Wh jen se souhlasem aerolinky, nad 160 Wh zakázané. Do odbaveného zavazadla nesmějí | go-and-no-go (viz výše) | 23. 9. 2026 | vysoká |
| Čekání | Průměrné čekání v roce 2025 **4 min 14 s**. 99,4 % cestujících čekalo nejvýš 15 min | F&F | 2025 | vysoká |
| Čekací doby online | Živé čekací doby jsem na cph.dk nenašel | viz neovereno.md | – | – |
| Voda | Láhev projde kontrolou prázdná. Studenou vodou se dá doplnit z kohoutků na toaletách před kontrolou i za ní | https://www.cph.dk/en/practical/services-airport | 23. 9. 2026 | vysoká |

## 8. Parkování (cph.dk, stav 23. 9. 2026)

Ceník a produkty: https://www.cph.dk/en/parking-transport/prices-products. Ceny online jsou dynamické („From …“), ceny u vjezdu pevné.

| Kategorie | Parkoviště a docházka | Online týden „od“ | U vjezdu týden / den | Jistota |
|---|---|---|---|---|
| **Direct** | P4 (150 m, krytá, 47 nabíječek), P6 (100 m), P7b (170 m, výška 2,1 m), P8 (150 m) | **1 759 DKK** | 2 250 DKK / 375 DKK | vysoká |
| **Standard+** | P3 (500 m), P5 (300 m, venkovní, výška 4,35 m), P9 (450 m), P10 (350 m) | **1 409 DKK** | 1 625 DKK / 325 DKK | vysoká |
| **Standard** | P11 a P12 (500 m), P1 (cca 1 km) | **899 DKK** (P1 od 1 199) | jen online, 299 DKK/den | vysoká |
| **Budget** | P15 (1,3 km), P17 a P19 (2,1 km), zdarma terminálovým autobusem | **499–599 DKK** | jen online, nejméně 4 dny | vysoká |
| We Park You Fly | P6, auto zaparkují za vás. Jen v týdnech 27–29, 37–39 a 42, nejméně 6 dní | od 1 199 (v tabulce od 1 289) DKK | – | střední (rozpor na stránce) |
| Víkend | Pátek–neděle od 349 DKK (neplatí pro Budget a P1) | – | – | vysoká |
| Storno | zdarma do 1 h před plánovaným příjezdem | – | – | vysoká |

**Konkrétní dotazy do rezervačního systému** (23. 9. 2026, vjezd a výjezd v 10:00):

| Termín | Výsledek | URL dotazu | Jistota |
|---|---|---|---|
| **14.–21. 10. 2026** (dánské podzimní prázdniny, týden 42) | Nejlevnější volné **P17 a P19 za 1 499 DKK**. P11, P12 a P1 za 1 969 DKK. P4 za 2 129 DKK (s účtem CPH Profile 1 810). P7b a P8 za 2 129. **Vyprodáno:** P15 (1 149), P3, P5, P9, P10 (1 569), P6 a P7a (2 129) | https://www.cph.dk/en/parkering/search?ad=2026-10-14&at=10:00&dd=2026-10-21&dt=10:00 | vysoká (cena platí jen pro ten den dotazu) |
| **4.–11. 11. 2026** (běžný týden) | **P19 za 499 DKK**, P17 549, P15 599, P11 899, P12 999, P7b 1 139, P3/P5/P9 1 259, P10 1 259 (s profilem 1 070), P1 1 329, P4 1 679 (s profilem 1 427), P6 a P8 1 679. Vyprodáno P7a | https://www.cph.dk/en/parkering/search?ad=2026-11-04&at=10:00&dd=2026-11-11&dt=10:00 | vysoká (dtto) |

**Vysazení a vyzvednutí** (https://www.cph.dk/en/parking-transport/pick-up-drop-off, …/drop-off, …/pick-up):

| Údaj | Hodnota | Jistota |
|---|---|---|
| **Kiss & Fly** | U T2, **zdarma**, dva pruhy. Smí se jen krátce zastavit a vysadit | vysoká |
| **P Afgang** (před T2, pro vysazení) a **P Ankomst** (přímo před T3, pro vyzvednutí) | **0–15 min zdarma**, pak **70 DKK** za každou započatou hodinu. Od 6. hodiny **750 DKK** (to je i denní maximum). Rezervovat nejde. Platí se kartou, i bezkontaktně, u automatu nebo u závory | vysoká |
| Ve špičce | Letiště radí P6, P7, P8 nebo P10 | vysoká |

## 9. Služby

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Wi-Fi | **Zdarma, bez hesla**, síť „CPH Airport Free Wi-Fi“. Funguje před kontrolou, za ní i u všech gatů | https://www.cph.dk/en/free-wifi/wifi-terms (přesměruje na /en/wi-fi); https://www.cph.dk/en/practical/services-airport | 23. 9. 2026 | vysoká |
| Obchody a restaurace | „over 120 shops and eateries“. Výpis obchodů jich 23. 9. 2026 ukazuje 71 | services-airport; https://www.cph.dk/en/shopping-dining/shops | 23. 9. 2026 | vysoká |
| Při příletu | Kdo přiletí z EU, může před výdejem zavazadel do obchodů a restaurací. Z příletu mimo EU se jde rovnou k zavazadlům. Jídlo se dá koupit i ve výdeji zavazadel | https://www.cph.dk/en/shopping-dining/shopping-options | 23. 9. 2026 | vysoká |
| Vrácení DPH | **Jen pro osoby s bydlištěm mimo EU.** Nákup nad 300 DKK v jednom obchodě (u Norů 1 200 DKK za kus), vývoz z EU do 3 měsíců. Vrací Global Blue a Planet. Čechům nárok nevzniká | https://www.cph.dk/en/shopping-dining/shopping-options/customs-regulations-vat-refunds | 23. 9. 2026 | vysoká |
| TAX FREE | Kamenné obchody pro odlety i přílety, přes Click & Collect se dá objednat až 14 dní předem. Podle F&F je na letišti 6 obchodů Tax Free | shopping-options; F&F | 23. 9. 2026 | vysoká |
| Bankomaty a směnárny | **4** bankomaty před kontrolou, **17** za ní (Euronet, vydávají DKK a EUR). Směnárny Forex a Prosegur Change | services-airport | 23. 9. 2026 | vysoká |
| Úschovna zavazadel | Samoobslužné boxy v **P4, přízemí** (Kiss & Fly, naproti vchodu do T2) a v **P7A** (pod hotelem Clarion, u metra a T3). Malý box 50 DKK/h, max. 100 DKK/den. Velký 80 DKK/h, max. 150 DKK/den. Na odbavené zavazadlo 100 DKK/h, max. 200 DKK/den | https://www.cph.dk/en/practical/baggage/baggage-deposit | 23. 9. 2026 | vysoká |
| Hotely | **Clarion Hotel** a **Comfort Hotel Copenhagen Airport**, „a stone's throw from Terminal 3“, u metra. Podle F&F je v hotelech 988 pokojů | https://www.cph.dk/en/hotels; F&F | 23. 9. 2026 | vysoká |
| Klid a odpočinek | **Silent Lounge** na začátku mola A (1. patro). Tichá zóna u gatů C (2. patro, u 7-Eleven). Dětská hřiště mezi A a B a u F | services-airport | 23. 9. 2026 | vysoká |
| Kouření | Před kontrolou jen venku ve žlutých zónách mezi vchody do T2 a T3, za kontrolou na terase mezi A a B | services-airport | 23. 9. 2026 | vysoká |
| Masážní křesla | 28 kusů, cca 25 DKK za 10 min (letiště uvádí čísla z roku 2024) | services-airport | údaj 2024 | střední |
| Lékárna | **Neověřeno.** Stránka /shops/apoteket přesměruje na výpis obchodů | viz neovereno.md | – | – |

**Salonky** (https://www.cph.dk/en/practical/workspaces-and-lounges a podstránky). Ceny platí za vstup na místě, pokud je volno:

| Salonek | Poloha | Cena | Pro lety do Prahy (Schengen)? | Jistota |
|---|---|---|---|---|
| **Aspire Lounge** | Za kontrolou u gatů A, 1. patro (má i kuřárnu) | **339 DKK**. Upgrade na Aspire Suite +199 DKK na 3 h | ano | vysoká |
| **Danske Bank Aviator Business Lounge** | Mezi A a B, 1. patro | **289 DKK**, až na 3 h | ano | vysoká |
| **Carlsberg Aviator Lounge** | Mezi A a B, 1. patro | **229 DKK**, až na 3 h | ano | vysoká |
| **SAS Lounge** | Za kontrolou u gatů C, naproti vstupu do pasové kontroly (SAS uvádí T3, Schengen, molo C) | **349 DKK** nebo 4 300 bodů EuroBonus. Vstup nejdřív 3 h před odletem, má sprchy | ano | vysoká |
| **Pearl Lounge** | Přehled píše „at the top of Gates C“ s výhledem na dráhy a Øresund. Podstránka ještě uvádí starý název Eventyr: za pasovou kontrolou u C26–C28, **jen pro lety mimo Schengen** | **300 DKK** | **ne** | střední (stránka napůl zastaralá) |
| Regus Express | Pracovní salonek | – | – | vysoká |

## 10. Sledování letadel (spotting)

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Oficiální vyhlídka letiště | Na cph.dk jsem stránku pro spottery ani vyhlídkovou terasu nenašel. Trap Danmark: „Sikkerhedsniveauet omkring lufthavnen gør, at der ikke er offentlig adgang. Skal man kigge efter fly, foregår det bedst for enden af Amager Landevej, hvor Flyvergrillen ligger.“ | https://trap.lex.dk/K%C3%B8benhavns_Lufthavn | text 2019 | střední (encyklopedie, ne letiště) |
| Flyvergrillen: adresa | **Amager Landevej 290, 2770 Kastrup.** Grill u plotu k drahám, na hřišti vyhlídka | VisitCopenhagen: https://www.visitcopenhagen.com/copenhagen/planning/the-airplane-grill-flyvergrillen-gdk414415 | 23. 9. 2026 | vysoká (oficiální turistický portál) |
| Flyvergrillen: historie | Otevřen **1972** jako malá zmrzlinárna. Z plošiny je vidět na dráhy, uvnitř visí modely letadel a na obrazovce běží odlety a přílety | https://trap.lex.dk/Flyvergrillen | text 2019 | vysoká (encyklopedie) |
| **Ke které dráze** | Podle souřadnic z OpenStreetMap leží Flyvergrillen asi **340 m od prahu 22R** (konec dráhy 04L/22R), asi 1,2 km od prahu 04R a 2,7 km od prahu **22L**. **Nejbližší je tedy 22R, ne 22L** | **Vlastní výpočet**: OSM Nominatim (55,61386 N, 12,63000 E) a prahy drah z AIP, AD 2.12 | výpočet 23. 9. 2026 | nízká až střední |
| Co je odtud vidět | Při konfiguraci 22 **startují tryskáče z 22R** (AIP). Spotterguide k místu uvádí „22R Departures, 22L Arrivals, 04L/04R“ | AIP AD 2.21; spotterguide.net (komunitní) | – | střední (AIP), nízká (spotterguide) |
| Web Flyvergrillen | Doména **flyver-grillen.dk** je 23. 9. 2026 **obsazená kasinovým spamem**. **Neodkazovat!** | vlastní kontrola 23. 9. 2026 | 23. 9. 2026 | vysoká |

## 11. Doprava do centra (na 2–3 věty)

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Metro M2 | Stanice navazuje přímo na **T3**. Do centra „kun 14 minutter med Metroen“. Na Nørreport 15 min | m.dk (DA): https://m.dk/da/planlaeg-rejsen/koebenhavns-lufthavn/; cph.dk Metro: https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/metro | 23. 9. 2026 | vysoká |
| Interval M2 | Ve špičce (7–9 a 14–18) cca **2 min**, přes den, večer a o víkendu cca **3 min**. V noci po pátku a sobotě (1–7) cca 8 min, ostatní noci cca **20 min**. Jezdí **nonstop** | m.dk, linka M2: https://m.dk/en/routes-and-timetables/vanloese-koebenhavns-lufthavn/ | 23. 9. 2026 | vysoká (cph.dk uvádí 4–6 a 15–20 min, viz neovereno.md) |
| Zóny | M2 projíždí zóny 1–4, ale kvůli pravidlu „ringzoner“ se platí **nejvýš 3 zóny** | m.dk, linka M2 | 23. 9. 2026 | vysoká |
| Jízdenky | Automaty na stanici neberou bankovky, jen mince a karty. Jízdenky prodává i pokladna DSB v T3 | cph.dk Metro | 23. 9. 2026 | vysoká |
| Rovnou ke kontrole | S příručním zavazadlem se z metra dá jít po **100 m dlouhé lávce** přímo k bezpečnostní kontrole, do T2 a k SAS Fast Track | cph.dk Metro | 23. 9. 2026 | vysoká |
| Vlak na København H | **13–14 min**: Re (Øresundstog) CPH Lufthavn 12:00 → København H 12:13, 12:15 → 12:28, 12:30 → 12:44, 12:45 → 12:58. Směrem na Kodaň to jsou 4 spoje za hodinu plus IC | Rejseplanen, odjezdová tabule CPH Lufthavn 24. 9. 2026, 12:00–12:45: https://www.rejseplanen.dk/bin/stboard.exe/mn?input=K%C3%B8benhavns%20Lufthavn%20St.&boardType=dep&time=12:00&date=24.09.26&start=yes | vzorek 24. 9. 2026 | vysoká pro vzorek |
| Nástupiště a jízdenky | T3, koleje 1 a 2 (koleje 11 a 12 jsou přes Ellehammersvej). Ve vlaku se jízdenka **nekupuje**, hrozí pokuta | cph.dk Train: https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/train | 23. 9. 2026 | vysoká |

## 12. Schengen, měna, čas

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Schengen | Dánsko je v Schengenu od **25. 3. 2001**, v EU od 1. 1. 1973 | https://european-union.europa.eu/principles-countries-history/eu-countries/denmark_en | 23. 9. 2026 | vysoká |
| Dočasné hraniční kontroly | Dánsko je obnovilo **12. 7.–11. 11. 2026**, ale jen na **pozemní a námořní hranici s Německem**. Letecké hranice se jich netýkají | Evropská komise: https://home-affairs.ec.europa.eu/policies/schengen/schengen-area/temporary-reintroduction-border-control_en | 23. 9. 2026 | vysoká |
| Měna | **Dánská koruna (DKK)**. Dánsko má výjimku a euro zavádět nemusí | EU, stránka Dánska (výše) | 23. 9. 2026 | vysoká |
| Časové pásmo | Stejné jako v Praze: v září UTC+2, od konce října UTC+1. CPH-API uvádí časy s posunem +02:00 (září) a +01:00 (listopad) a odpovídají časům PRG-API | CPH-API; PRG-API | 23. 9. 2026 | vysoká (odvozeno z oficiálních dat obou letišť) |

---

## Použitelné pro článek (shrnutí)

- EKCH/CPH, Kastrup, Tårnby na Amageru. Podle AIP 4,4 NM (≈ 8 km) jiho-jihovýchodně od Kodaně, 17 ft n. m. Provoz H24.
- Tři dráhy: 04L/22R (až 3 571 m), 04R/22L (3 302 m), 12/30 (až 2 800 m).
- 2025: 32,4 mil. cestujících (rekord), 256 737 pohybů, 367 linek do 191 destinací, 63 aerolinek. V 1. pololetí 2026 16,1 mil. (+9 %).
- Pro cestující jen T2 a T3, oba 24/7, bezpečnostní kontrola je společná. T1 slouží jako kanceláře. Rozšíření T3 se otevře v roce 2027.
- Z Prahy: SAS (T3 v Kodani), Norwegian a Ryanair (T2), let trvá 1 h 20–25 min. V zimě létá SAS 3× denně a Norwegian 2–4× týdně. Ryanair od 3. 11. 2026 do 27. 3. 2027 nelétá. Z Brna, Ostravy ani Pardubic se přímo nelétá.
- Parkování: nejlevnější online týden od 499 DKK (Budget P19), ale v podzimních prázdninách 14.–21. 10. 2026 až 1 499 DKK a část parkovišť je vyprodaná. U vjezdu Direct 2 250 DKK za týden. Kiss & Fly zdarma.
- Tekutiny 100 ml stále platí. Wi-Fi zdarma, vodu lze doplnit z kohoutků.
- Spotting: Flyvergrillen, Amager Landevej 290. Nejblíž je práh 22R, ne 22L. Web grilu neodkazovat.
- Metro 14 min do centra, vlak 13 min na København H.

---

## Seznam všech použitých URL (otevřeno 23. 9. 2026)

**Naviair / AIP**
- https://aim.naviair.dk/ a https://aim.naviair.dk/en/
- https://aim.naviair.dk/umbraco/api/naviairapi/getnodesforparent?parentId=378 (strom dokumentů EKCH)
- https://aim.naviair.dk/media/files/zdxe03hoarn/EK_AD_2_EKCH_en.pdf
- https://aim.naviair.dk/media/files/ct2vgpz44h2/EK_Amdt_A_2026_11_en.pdf
- https://aim.naviair.dk/media/files/12mnytyqfv5/AIP_DK_AIRAC_AMDT_03SEP2026_SUP_07SEP2026.pdf (jen jako položka stromu, neotevíral jsem)

**cph.dk: investor a tisk**
- https://www.cph.dk/en/about-cph/investor
- https://www.cph.dk/en/about-cph/investor/traffic-statistics
- https://www.cph.dk/490073/globalassets/8.-om-cph/facts-and-figures_2025.pdf
- https://www.cph.dk/48d588/globalassets/8.-om-cph/04_investor/trafikstatistik/2025/12/2512_traffic.xlsx
- https://www.cph.dk/4a4afb/globalassets/8.-om-cph/04_investor/trafikstatistik/2026/08/2608_traffic.xlsx
- https://www.cph.dk/en/about-cph/press/news/2026/01/record%20year%20for%20copenhagen%20airport
- https://www.cph.dk/en/about-cph/press/news/2026/03/rising%20passenger%20numbers%20drive%20growth%20at%20copenhagen%20airport
- https://www.cph.dk/en/about-cph/press/news/2026/08/copenhagen%20airport%20increases%20profit%20in%20the%20first%20half%20of%20the%20year
- https://www.cph.dk/en/about-cph/press/news/2026/09/nearly%2010%20million%20travellers%20during%20the%20summer

**cph.dk: cestující**
- https://www.cph.dk/en/flight-information/departures
- https://www.cph.dk/en/flight-information/arrivals
- https://www.cph.dk/en/flight-information/destinations
- https://www.cph.dk/en/flight-information/airlines
- https://www.cph.dk/api/FlightInformation/GetFlightInfoTable (dotazy viz nahoře)
- https://www.cph.dk/en/practical/check-in
- https://www.cph.dk/en/practical/tips-for-the-journey
- https://www.cph.dk/en/practical/security-checkpoint
- https://www.cph.dk/en/practical/baggage/go-and-no-go-in-baggage
- https://www.cph.dk/en/practical/baggage/liquids-in-carry-on-baggage
- https://www.cph.dk/en/practical/baggage/baggage-deposit
- https://www.cph.dk/en/practical/cph-map
- https://www.cph.dk/4a3405/globalassets/3.-praktisk/oversigtskort/cph_kort_oversigt_uk_vers_3.pdf
- https://www.cph.dk/en/practical/services-airport
- https://www.cph.dk/en/free-wifi/wifi-terms (→ https://www.cph.dk/en/wi-fi)
- https://www.cph.dk/en/practical/workspaces-and-lounges
- https://www.cph.dk/en/practical/workspaces-and-lounges/pearl-lounge
- https://www.cph.dk/en/practical/workspaces-and-lounges/aspire-lounge
- https://www.cph.dk/en/practical/workspaces-and-lounges/danske-bank-business-lounge
- https://www.cph.dk/en/practical/workspaces-and-lounges/carlsberg-aviator-lounge
- https://www.cph.dk/en/practical/workspaces-and-lounges/sas-lounge
- https://www.cph.dk/en/hotels
- https://www.cph.dk/en/shopping-dining/shops
- https://www.cph.dk/en/shopping-dining/shops/apoteket (přesměruje na výpis)
- https://www.cph.dk/en/shopping-dining/shopping-options
- https://www.cph.dk/en/shopping-dining/shopping-options/customs-regulations-vat-refunds
- https://www.cph.dk/en/parking-transport/prices-products
- https://www.cph.dk/en/parking-transport/pick-up-drop-off
- https://www.cph.dk/en/parking-transport/pick-up-drop-off/drop-off
- https://www.cph.dk/en/parking-transport/pick-up-drop-off/pick-up
- https://www.cph.dk/en/parkering/search?ad=2026-10-14&at=10:00&dd=2026-10-21&dt=10:00
- https://www.cph.dk/en/parkering/search?ad=2026-11-04&at=10:00&dd=2026-11-11&dt=10:00
- https://www.cph.dk/en/parking-transport/bus-train-metro-taxi
- https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/metro
- https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/train
- https://www.cph.dk/fremtidens-terminal
- https://www.cph.dk/cph-business/real-estate/rental/terminal1
- https://www.cph.dk/en/searchresult?q=fast%20track (hledání bez výsledku)

**Lety**
- https://www.prg.aero/kodan
- https://api.prg.aero/arrivals-shorttime?offset=0&limit=400&from=22-09-2026_00-00
- https://api.prg.aero/departures-shorttime?offset=0&limit=400&from=22-09-2026_00-00
- https://www.ryanair.com/api/timtbl/3/schedules/CPH/PRG/years/2026/months/10 (a měsíce 9/2026–4/2027 v obou směrech)
- https://www.flysas.com/en/flight-routes/copenhagen/prague
- https://www.brno-airport.cz/, https://www.airport-ostrava.cz/cs/, https://www.airport-pardubice.cz/ (zmínka o Kodani nenalezena, weby se načítají skriptem)

**Doprava**
- https://m.dk/en/routes-and-timetables/vanloese-koebenhavns-lufthavn/
- https://m.dk/da/planlaeg-rejsen/koebenhavns-lufthavn/
- https://www.rejseplanen.dk/bin/stboard.exe/mn?input=K%C3%B8benhavns%20Lufthavn%20St.&boardType=dep&time=12:00&date=24.09.26&start=yes
- https://www.dsb.dk/trafikinformation/stationer/kobenhavns-lufthavn-kastrup/
- https://www.dsb.dk/globalassets/pdf/koereplaner/regionaltog/k26/dsb-k26--sjaelland-.pdf
- https://www.dsb.dk/om-dsb/presse/nyheder/dsb-genindforer-10-minutters-drift-til-kobenhavns-lufthavn/ (z roku 2017, jen pro kontext)

**Ostatní**
- https://trap.lex.dk/K%C3%B8benhavns_Lufthavn
- https://trap.lex.dk/T%C3%A5rnby_Kommune
- https://trap.lex.dk/Flyvergrillen
- https://www.visitcopenhagen.com/copenhagen/planning/the-airplane-grill-flyvergrillen-gdk414415
- https://nominatim.openstreetmap.org/search?q=Flyvergrillen,+Kastrup&format=json (souřadnice pro výpočet)
- https://www.spotterguide.net/planespotting/europe/denmark/copenhagen-cph-ekch/ (komunitní, jen v neovereno.md)
- https://european-union.europa.eu/principles-countries-history/eu-countries/denmark_en
- https://home-affairs.ec.europa.eu/policies/schengen/schengen-area/temporary-reintroduction-border-control_en
- https://kommunikasjon.ntb.no/pressemelding/18771336/avinor-i-2025-solid-trafikkar-med-sterk-utanlandsvekst?publisherId=17421123&lang=no
- https://www.swedavia.se/om-swedavia/swedavias-nyhetsrum/2026/swedavias-trafikstatistik-for-december-och-helaret-2025-stark-efterfragan-pa-bade-utrikes--och-inrikesresor/
