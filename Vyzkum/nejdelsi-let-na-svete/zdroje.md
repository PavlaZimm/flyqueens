# Nejdelší let na světě – ověření faktů

Datum kontroly všech údajů: **24. 9. 2026** (pokud není uvedeno jinak).
Rozsah: pouze pravidelné civilní osobní nonstop lety provozované k tomuto datu. Plánované lety jsou v samostatné sekci.

Typy zdrojů:
- **primární**: web, letový řád nebo tisková zpráva aerolinky, letiště či výrobce,
- **podpůrný**: letecké databáze a média (FlightAware, Great Circle Mapper, Simple Flying, Aerospace Global News, AeroRoutes, Wikipedie apod.).

Pojmy používané níže:
- **Ortodroma**: nejkratší vzdálenost po povrchu Země. Počítá ji Great Circle Mapper (gcmap.com) na elipsoidu WGS-84. Skutečně nalétaná trasa je delší kvůli tratím, větru a uzavřeným vzdušným prostorům.
- **Plánovaný čas (block time)**: od odjezdu od stání do příjezdu na stání (off-block → on-block) podle letového řádu. Pokud ho aerolinka uvádí jen jako místní časy odletu a příletu, přepočetl jsem ho přes časová pásma (IANA tz, včetně letního času).
- **Čas ve vzduchu**: skutečná délka letu podle záznamů FlightAware (podpůrný zdroj). FlightAware přesně neříká, zda jde o čas ve vzduchu, nebo od stání ke stání. Čísla ber jen jako ilustraci.

---

## 1. Nejdelší pravidelný let podle vzdálenosti (k 24. 9. 2026)

**Závěr: Singapore Airlines SQ23/SQ24, Singapur Changi (SIN) – New York John F. Kennedy (JFK).** Za roky 2025–2026 jsem nenašel žádnou novou provozovanou linku, která by ji předstihla. Kandidáti Qantas Project Sunrise (2027/2028) a Turkish Istanbul–Sydney (cíl konec roku 2027) se zatím jen plánují, viz sekce 4.

| Údaj | Hodnota | Zdroj | Typ |
|---|---|---|---|
| Letiště | Singapore Changi (SIN) ↔ New York JFK (JFK) | SIA, rozpis letů A350-900 | primární |
| Čísla letů | **SQ24** SIN→JFK, **SQ23** JFK→SIN | SIA, rozpis letů (tabulky „SIN → JFK“ a „JFK → SIN“) | primární |
| Vzdálenost po ortodromě | **15 348 km** (gcmap), 15 349 km / 9 537 mi / 8 288 nmi (Wikipedie) | gcmap.com; Wikipedie SQ23/24 | podpůrný |
| Frekvence | denně (léto 29. 3.–24. 10. 2026 i zima 1. 11. 2026–13. 3. 2027) | SIA, rozpis letů | primární |
| Letadlo | Airbus A350-900ULR (Ultra Long Range). V rozpisu je uvedeno „Airbus A350-900“ s produktem „Long Haul, ULR“ a třídami J, S, tedy jen Business a Premium Economy. | SIA, rozpis letů + stránka flotily | primární |
| Kabina | **161 sedadel: 67 Business Class + 94 Premium Economy**, bez ekonomické třídy | SIA, stránka flotily („161 (Ultra Long Range)“); SIA, PDF plánek sedadel („Business Class – J 67 seats“, „Premium Economy Class – S 94 seats“) | primární |
| Business Class | uspořádání 1-2-1, přímý přístup do uličky, lůžko 78" | Wikipedie / seatcompare / Mainly Miles | podpůrný (**u SIA NEOVĚŘENO**) |
| Premium Economy | převážně 2-4-2 | Mainly Miles, seatcompare | podpůrný (**u SIA NEOVĚŘENO**) |
| Počátek linky JFK | SQ24 od 9. 11. 2020, SQ23 od 11. 11. 2020, zpočátku 3× týdně a běžným A350-900 (42 J / 24 S / 187 Y). Na A350-900ULR podle Wikipedie od 16. 1. 2021. | SIA, tisková zpráva 20. 10. 2020; Wikipedie | primární (start), podpůrný (přechod na ULR) |

### Plánované časy SQ23/SQ24 (letový řád SIA, přepočet přes časová pásma)

| Let | Období | Odlet → přílet (místní čas) | Block time |
|---|---|---|---|
| SQ24 SIN→JFK | 29. 3.–24. 10. 2026 | 12:10 → 18:50 | **18 h 40 min** |
| SQ24 SIN→JFK | 25. 10.–31. 10. 2026 a 1. 11. 2026–13. 3. 2027 | 12:10 → 18:25 / 17:25 | **18 h 15 min** |
| SQ23 JFK→SIN | 29. 3.–24. 10. 2026 (tedy i 24. 9.) | 22:15 → 05:30 (+2 dny) | **19 h 15 min** |
| SQ23 JFK→SIN | 25. 10.–31. 10. 2026 / 1. 11. 2026–13. 3. 2027 | 23:05 / 22:05 → 06:00 (+2) | **18 h 55 min** |

Zdroj: https://www.singaporeair.com/en_UK/us/flying-withus/our-story/our-fleet/airbus-a350-900/ (primární, rozpis letů v sekci „Where our Airbus A350-900 flies“, data v HTML). Kontrola 24. 9. 2026.

Poznámka: Singapur (UTC+8) a New York v letním čase (UTC−4) dělí přesně 12 hodin. Z místních časů proto nejde poznat směr letu. Směr jsem ověřil podle nadpisů tabulek „SIN → JFK“ a „JFK → SIN“ v HTML stránky.

### Skutečná délka letu SQ23/SQ24 (podpůrné, FlightAware, 16.–23. 9. 2026)
- SQ23 JFK→SIN: 17:29–17:51 h (plán 19:15)
- SQ24 SIN→JFK: 17:15–18:07 h (plán 18:40)
- Zdroj: https://www.flightaware.com/live/flight/SIA23/history, https://www.flightaware.com/live/flight/SIA24/history (podpůrný)
- Rozdíl oproti block time tvoří pojíždění a časová rezerva v letovém řádu.

### Nalétaná (ne ortodromická) vzdálenost
- SIA v roce 2018 uvedla u linky do Newarku „approximately 9,000nm (16,700km)“. Jde o plánovanou trasu, ne o ortodromu. Zdroj: tisková zpráva SIA 30. 5. 2018, https://www.singaporeair.com/en_UK/sg/corporate/newsroom/press-release/2018/April-June/ne2018-180530/ (primární)
- Wikipedie uvádí u SQ24 přibližně 17 250 km a u SQ23 16 500 km skutečně nalétané trasy (podpůrný, zdroj čísla nedoložen, **NEOVĚŘENO**).

### Letadlo A350-900ULR (výrobce)
- Dolet až 9 700 nmi, „over 20 hours non-stop“. Palivo 165 000 l (+24 000 l oproti A350-900) bez přídavných nádrží, prodloužené winglety. SIA objednala 7 kusů.
- Zdroj: Airbus, 21. 9. 2018, https://www.airbus.com/en/newsroom/press-releases/2018-09-first-ultra-long-range-a350-xwb-delivered-to-singapore-airlines (primární)
- Aktuální počet A350-900ULR ve flotile SIA k 9/2026: **NEOVĚŘENO**. Údaj 7 kusů pochází z roku 2018.

---

## 2. Nejdelší podle vzdálenosti vs. podle plánovaného času

**Ano, existuje let delší časem než ten nejdelší vzdáleností.** Jde o sesterskou linku SQ21 z Newarku.

| Linka | Ortodroma (gcmap) | Block time 24. 9. 2026 | Block time 2.–25. 10. 2026 | Block time zima 2026/27 |
|---|---|---|---|---|
| SQ23 JFK→SIN | 15 348 km | **19:15** | 19:15 (od 25. 10. 18:55) | 18:55 |
| SQ21 EWR→SIN | 15 344 km | 19:10 | **19:30** | **19:10** |
| SQ24 SIN→JFK | 15 348 km | 18:40 | 18:40 | 18:15 |
| SQ22 SIN→EWR | 15 344 km | 18:25 | 18:25 (od 26. 10. 17:50) | 17:50 |

- Podle vzdálenosti vede JFK o pouhé **4 km** (gcmap 15 348 vs 15 344 km).
- K 24. 9. 2026 je časově nejdelší **SQ23 JFK→SIN (19 h 15 min)**.
- **Od 2. 10. do 25. 10. 2026 bude časově nejdelší SQ21 Newark→Singapur (19 h 30 min)** a v zimním řádu od 1. 11. 2026 zůstane SQ21 (19:10) delší než SQ23 (18:55).
- Stejná linka trvá v každém směru jinak dlouho (na západ proti tryskovému proudění déle). Plánované časy se mění také se sezónou a při přechodu na letní čas.
- Časy SQ21/22: letový řád SIA na stejné stránce (primární), tabulky „SIN → EWR“ a „EWR → SIN“. SQ21 EWR→SIN 09:35 → 16:45 (+1) do 1. 10. 2026; 09:25 → 16:55 (+1) od 2. 10. do 25. 10. 2026; 09:35 → 17:45 (+1) od 1. 11. 2026. SQ22 SIN→EWR 23:35 → 06:00 (+1) do 24. 10. 2026.
- Vzdálenost SIN–EWR: gcmap 15 344 km a Wikipedie SQ21/22 15 344 km / 9 534 mi se shodují. **Rozpor:** Aviation A2Z uvádí 15 332 km (podpůrný).

---

## 3. Tabulka nejdelších aktuálně provozovaných nonstop linek (září 2026)

Seřazeno podle ortodromy (gcmap.com, kontrola 24. 9. 2026, podpůrný zdroj: http://www.gcmap.com/dist?P=SIN-JFK,SIN-EWR,PER-LHR,MEL-DFW,AKL-JFK,DXB-AKL,PER-CDG,SZX-MEX,SIN-LAX,IAH-SYD,DFW-SYD,SIN-SFO,DOH-AKL&DU=km). „Provoz v 9/2026“ ověřuje primární zdroj tam, kde se ho podařilo získat. Jinak jsou uvedeny záznamy FlightAware o letech 9.–26. 9. 2026 (podpůrný).

| # | Trasa | Aerolinka, lety | Ortodroma | Plánovaný čas | Letadlo | Provoz v 9/2026, zdroj |
|---|---|---|---|---|---|---|
| 1 | Singapur SIN ↔ New York JFK | Singapore Airlines SQ24 / SQ23 | 15 348 km | 18:40 / 19:15 | A350-900ULR | ano, denně. SIA letový řád (primární) |
| 2 | Singapur SIN ↔ Newark EWR | Singapore Airlines SQ22 / SQ21 | 15 344 km | 18:25 / 19:10 | A350-900ULR | ano, denně. SIA letový řád (primární) |
| 3 | **Londýn LHR → Perth PER (jen tímto směrem)** | Qantas QF10 | 14 499 km | cca 16:50 (Simple Flying, **NEOVĚŘENO u Qantas**) | Boeing 787-9 | ano, nonstop jen směr LHR→PER. Směr PER→LHR letí od 4. 3. 2026 přes Singapur. Qantas: „continue to operate its daily Perth-London service via Singapore, though the London-Perth flight will operate direct“ (primární) |
| 4 | Melbourne MEL ↔ Dallas/Fort Worth DFW | Qantas QF21 / QF22 | 14 472 km | DFW→MEL cca 17:45 (Simple Flying podle OAG, 2/2026). **NEOVĚŘENO u Qantas** | Boeing 787-9 | ano. Qantas 6/2026 jmenuje MEL–DFW mezi svými nonstop linkami (primární). FlightAware eviduje lety 12.–26. 9. 2026 (podpůrný) |
| 5 | Auckland AKL ↔ New York JFK | Air New Zealand NZ2 / NZ1 | 14 207 km | NZ2 16:15, NZ1 17:35 (Air NZ) | Boeing 787-9 | ano, 3× týdně (Po, Čt, So). Web Air NZ (primární) |
| 5b | Auckland AKL ↔ New York JFK | Qantas QF3 / QF4 (úsek AKL–JFK letu ze Sydney) | 14 207 km | **NEOVĚŘENO** | Boeing 787-9 | ano. Qantas 6/2026 zmiňuje „Auckland to New York services“ (primární). FlightAware lety 20.–26. 9. (podpůrný) |
| 6 | Dubaj DXB ↔ Auckland AKL | Emirates EK448 / EK449 | 14 200 km | EK448 15:50, EK449 17:25 (Simple Flying, duben 2026) | Airbus A380-800 | ano, denně podle FlightAware 16.–26. 9. (podpůrný). Web Emirates vrací chybu 403 nebo nenačte stránku: **primárně NEOVĚŘENO** |
| 7 | **Šen-čen SZX → Ciudad de México MEX (jen tímto směrem)** | China Southern CZ8031 | 14 147 km | **NEOVĚŘENO** | A350-900 (FlightAware) | ano (FlightAware 10.–24. 9.). Zpáteční CZ8032 letí přes Tijuanu, tedy s mezipřistáním. Primárně **NEOVĚŘENO** |
| 8 | Singapur SIN ↔ Los Angeles LAX | Singapore Airlines SQ38 / SQ37 (+SQ36/SQ35 3× týdně) | 14 113 km | SQ38 16:05, SQ37 17:10 (zima 17:50) | A350-900 (třítřídní long-haul, ne ULR) | ano, denně. SIA letový řád (primární) |
| 9 | Sydney SYD ↔ Dallas/Fort Worth DFW | Qantas QF7 / QF8 | 13 804 km | **NEOVĚŘENO** | Airbus A380 (FlightAware) | ano (FlightAware 15.–26. 9.). Primárně **NEOVĚŘENO** |
| 10 | Singapur SIN ↔ San Francisco SFO | Singapore Airlines SQ34 / SQ33 (ULR), SQ32 / SQ31 | 13 593 km | SQ33 16:05, SQ34 15:40 | A350-900ULR (SQ33/34) | ano, denně. SIA letový řád (primární) |

Skutečné délky letů podle FlightAware, 9/2026 (podpůrný, kvůli srovnání s plánem):
- QF10 LHR→PER: 15:58–16:51 h
- QF22 DFW→MEL: 16:22–16:48 h; QF21 MEL→DFW: 15:22–15:42 h
- NZ1 JFK→AKL: 16:09–16:37 h; NZ2 AKL→JFK: 15:24–15:55 h
- EK448: kolem 15:10 h; EK449: 15:40–16:44 h
- CZ8031: 14:58–15:29 h
- SQ37: kolem 16:15 h; SQ38: 14:40–15:16 h

### Linky, které v září 2026 NEPLATÍ jako nonstop (nezařazovat)
| Linka | Ortodroma | Stav | Zdroj, typ |
|---|---|---|---|
| Qantas Perth → Londýn (QF9) | 14 499 km | Od 4. 3. 2026 letí přes Singapur kvůli uzavřenému vzdušnému prostoru na Blízkém východě. Nonstop se má vrátit 1. 2. 2027 (podle médií: mezipřistání prodlouženo do 31. 1. 2027). | Qantas, „International network update – March 2026“ (primární, bez data návratu); Aerospace Global News 21. 8. 2026 (podpůrný) |
| Qantas Perth ↔ Paříž (QF33/34) | 14 264 km | Pařížské lety od poloviny dubna 2026 vycházejí ze Sydney přes Singapur, ne z Perthu | Qantas, březen 2026 (primární) |
| Qatar Airways Dauhá ↔ Auckland (QR920/921) | **14 535 km**, v provozu by byla č. 3 | Nonstop pozastaven. Od 17. 6. 2026 letí přes Adelaide jako QR914/915 (FlightAware ještě 23.–26. 9. 2026). Návrat nonstopu v polovině září „tentatively“ podle médií. **K 24. 9. 2026 neprovozováno** (FlightAware bez letů QR920/921). Od prosince 2026 má Auckland obsluhovat přes Melbourne. | Simple Flying 26. 4. 2026; CAPA 24. 7. 2026; FlightAware (vše podpůrné). U Qatar Airways **NEOVĚŘENO** |
| United Houston ↔ Sydney (UA101/100) | 13 834 km | Sezónní. Podle médií přerušeno od konce března 2026, obnova od 24. 10. 2026 | Airportia (podpůrný), **NEOVĚŘENO u United** |

---

## 4. Budoucí rekordy (PLÁNOVÁNO, zatím NEPROVOZOVÁNO)

### Qantas Project Sunrise
| Údaj | Hodnota | Zdroj | Typ |
|---|---|---|---|
| Sydney–Londýn (SYD–LHR) | nonstop **„from October 2027“**, denně („daily non-stop flights“) | qantas.com, stránka A350; Qantas Newsroom, tisková zpráva z Toulouse (6/2026) | primární |
| Prodej letenek SYD–LHR | **únor 2027**, zatím se tedy neprodávají | tamtéž | primární |
| Sydney–New York (SYD–JFK) | **„from mid-2028“**, prodej letenek od **srpna 2027** | qantas.com, stránka A350; Qantas Newsroom „Australia to New York, non-stop…“ (9/2026, samotný text se nepodařilo načíst, údaje z nadpisu, úryvku ve vyhledávači a stránky qantas.com) | primární |
| Dodávka 1. letadla | **duben 2027** („The first aircraft, named Vega, will be delivered in April 2027“) | qantas.com, stránka A350 | primární |
| Počet letadel | 12× A350-1000ULR | Qantas Newsroom (Toulouse) | primární |
| Výkon | přídavná nádrž 20 000 l, „more than 16,000 kilometres, for up to 22 hours non-stop“ | Qantas Newsroom (Toulouse) | primární |
| Kabina | **238 sedadel**: 6 First (1-1-1), 52 Business (1-2-1), 40 Premium Economy (2-4-2), 140 Economy (3-3-3), z toho 42 Economy Plus s roztečí 34". Mezi Premium Economy a Economy je „Wellbeing Zone“. | Qantas Newsroom, „Qantas reimagines long-haul travel…“ (6/2026) | primární |
| Výhrada Qantas | „Aircraft delivery, on-sale and service commencement subject to regulatory approvals and aircraft certification.“ | Qantas Newsroom; qantas.com | primární |
| Zkušební lety | 1. A350-1000ULR podle médií letěl v červenci 2026 zkušebně Toulouse–Melbourne. Travel PR News uvádí nonstop Melbourne–Toulouse za 24 h 24 min. | Travel PR News 23. 9. 2026; Wikipedie | podpůrný, **NEOVĚŘENO u Qantas** |
| Ortodroma SYD–LHR | cca 17 000 km | média | **NEOVĚŘENO** (gcmap jsem pro tuto dvojici nespouštěl) |

**Rozpory a varování:**
- Starší články (Time Out a další) uváděly start Project Sunrise v roce 2026. To neplatí. Qantas dnes uvádí říjen 2027 (Londýn) a polovinu roku 2028 (New York).
- Travel PR News u Sydney–New York píše „approximately 18-hour service“. To neodpovídá vzdálenosti přes 16 000 km. **Nepoužívat.** Qantas uvádí jen „up to 22 hours“ jako schopnost letadla.
- Aviation A2Z řadí Sydney–Londýn mezi „Scheduled/Operating Flights“. To je **chybně**, linka zatím neexistuje.

### Turkish Airlines Istanbul–Sydney (plán)
- Cíl „by the end of 2027“ s A350-1000ULR, první letadlo v červenci 2027. Předseda představenstva to řekl pro Simple Flying na výročním zasedání IATA. Podpůrný zdroj, u Turkish Airlines **NEOVĚŘENO**.
- https://simpleflying.com/exclusive-turkish-airlines-target-nonstop-istanbul-sydney-airbus-a350-1000s-2027/

---

## 5. Nejdelší pravidelný nonstop let z Prahy (PRG)

**Závěr: Praha – Tchaj-pej (TPE), 9 029 km po ortodromě (gcmap).** Linku provozují dva dopravci.

| Údaj | China Airlines | STARLUX Airlines |
|---|---|---|
| Lety | CI68 PRG→TPE, CI67 TPE→PRG | JX102 PRG→TPE, JX101 TPE→PRG |
| Letadlo | A350-900 (FlightAware) | Letiště Praha (2/2026) a média: A350-900, 306 míst (4 F / 26 J / 36 W / 240 Y podle médií). **Rozpor:** FlightAware eviduje v září 2026 typ A35K (A350-1000). |
| Frekvence | cca 3× týdně (média a FlightAware). **U China Airlines NEOVĚŘENO.** | 1. 8.–30. 9. 2026 3× týdně (Út, Čt, So), od 1. 10. 2026 4× týdně (+ Po) |
| Plánovaný čas | **NEOVĚŘENO** (Flightera uvádí průměr 12:55 h, podpůrný) | Srpen–září: JX102 10:20 → 05:10 (+1) = **12:50 h**; JX101 00:10 → 07:50 = **13:40 h**. Říjen: JX102 10:45 → 05:10 (+1) = 12:25 h; JX101 00:10 → 08:25 = **14:15 h** |
| Skutečně (FlightAware 9/2026) | CI68 11:34–12:31 h, CI67 12:37–13:13 h | JX102 13:49–14:20 h, JX101 13:53–14:32 h. Skutečné časy přesahují plán. Příčinu jsem neověřil (pravděpodobně objízdné trasy, **NEOVĚŘENO**). |
| Zdroje | FlightAware CAL67/CAL68 (podpůrný) | STARLUX: https://latestnews.starlux-airlines.com/en-Global/about-us/travel-advisories/advisories/latest-news/fly_to_PRG (primární). Letiště Praha, 4. 2. 2026: https://www.prg.aero/praha-se-stava-prvni-evropskou-destinaci-starlux-airlines-nova-prima-dalkova-linka-spoji-prahu-s (primární) |

Další dálkové linky z Prahy pro srovnání (ortodroma gcmap):
- Soul ICN 8 258 km (Korean Air; podle přehledu letního řádu 4× týdně, B787-9, podpůrný; na prg.aero existuje článek k 20 letům linky, neotevřen, frekvence **NEOVĚŘENA**)
- Atlanta ATL 7 787 km: v přehledu letního řádu 2026 **neuvedena**. Že Delta do Atlanty nelétá, je **NEOVĚŘENO**. Delta létá do New Yorku JFK (6 569 km), denně od 8. 5. do 24. 10. 2026.
- Toronto YYZ 6 703 km (Air Canada, sezónně od 7. 6. do 24. 10. 2026)
- Filadelfie (American Airlines, od 23. 5. 2026)
- Abú Zabí AUH 4 489 km (Etihad), Dauhá DOH 4 221 km, Dubaj DXB 4 467 km
- Praha–San-ja (SCAT) není nonstop, má technické mezipřistání v Biškeku.
- Charterové lety (např. Cancún, 9 000 km) jsou mimo rozsah, protože nejde o pravidelnou linku.
- Zdroj přehledu: Zaletsi.cz, „Letiště Praha – letní letový řád 2026“ s citací Letiště Praha (podpůrný), https://zaletsi.cz/magazin/letiste-praha-letni-letovy-rad-2026/

---

## 6. Cena letenky SQ23/SQ24

**NEOVĚŘENO.** Konkrétní cenu pro konkrétní termín a třídu nejde spolehlivě ověřit bez rezervačního systému SIA. Ceny se mění dynamicky. Čísla z médií neuvádět jako fakt.

---

## 7. Zážitek z letu: co oficiálně uvádí Singapore Airlines

| Tvrzení | Zdroj | Typ | Aktuálnost |
|---|---|---|---|
| Na ULR jsou jen Business Class (67) a Premium Economy (94), bez ekonomické třídy | SIA, stránka flotily a PDF plánek | primární | aktuální (9/2026) |
| Služba „Book the Cook“ (předobjednání hlavního chodu) je v Business i Premium Economy. JFK i Newark jsou v seznamu výchozích letišť pro obě třídy. Objednávka od 6 týdnů do 24 h před odletem (pro cesty od 1. 12. 2025). Nabídka se může lišit podle letu. | https://www.singaporeair.com/en_UK/us/flying-withus/dining/book-the-cook/ | primární | aktuální |
| A350-900ULR: vyšší strop, větší okna, „lighting designed to reduce jetlag“, lepší kvalita vzduchu díky optimalizované kabinové výšce a vlhkosti | SIA, tisková zpráva 30. 5. 2018 | primární | **2018, aktuálnost NEOVĚŘENA** |
| Partnerství s Canyon Ranch: „wellness cuisines“ navíc ke standardnímu menu, strategie spánku pro všechny třídy, nastavení světla, řízené protahování v zábavním systému | SIA, tisková zpráva 15. 8. 2018, https://www.singaporeair.com/en_UK/ch/corporate/newsroom/press-release/2018/July-September/jr1018-180815/ | primární | **2018. Zda program běží i v roce 2026: NEOVĚŘENO.** Nepsat v přítomném čase bez ověření. |

## 7b. Jet lag – ověřené zdravotní rady

**NHS** (https://www.nhs.uk/conditions/jet-lag/, stránka revidována 31. 5. 2023, další revize byla plánována na 31. 5. 2026). Obecná rada pro veřejnost:
- Před cestou se vyspat a posunout spánek směrem k cílovému pásmu.
- Pít dost vody, protahovat se a chodit po kabině.
- Spát, pokud je v cíli noc, případně s maskou a špunty do uší.
- Omezit kofein a alkohol.
- Rychle přejít na nový režim, přes den chodit ven na denní světlo a nespat přes den.
- U krátké cesty (2–3 dny) lze zůstat u domácího režimu.
- NHS melatonin na jet lag nedoporučuje pro nedostatek důkazů.

**CDC Yellow Book 2026, kapitola „Jet Lag Disorder“** (https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html, aktualizace 23. 4. 2025). Jde o podklad pro zdravotníky:
- Při cestě na východ ráno světlo, večer se světlu vyhýbat. Při cestě na západ naopak.
- Adaptace je zhruba 1 h za den na východ a 1,5 h za den na západ.
- 2–3 dny před odletem lze posouvat spánek o hodinu.
- **Rozpor s NHS:** CDC melatonin v nízké dávce zmiňuje jako možnost, NHS ho nedoporučuje.
- Doporučení pro článek: neuvádět dávkování léků ani melatoninu. Odkázat na lékaře.

---

## Hlavní rozpory mezi zdroji (souhrn)
1. SIN–EWR: 15 344 km (gcmap, Wikipedie) vs 15 332 km (Aviation A2Z).
2. SIN–JFK: 15 348 km (gcmap) vs 15 349 km (Wikipedie). Rozdíl je jen v zaokrouhlení nebo souřadnicích.
3. Linka SIN–Newark: SIA v roce 2018 uvádí „approximately 9,000nm (16,700km)“. To je plánovaná trasa, ne ortodroma (8 285 nmi).
4. Aviation A2Z řadí Project Sunrise mezi provozované lety. To je chybně.
5. Qantas Perth–Londýn: část médií píše, že mezipřistání platí až „od 25. 10. 2026“. Qantas už v březnu 2026 uvádí, že Perth→Londýn letí přes Singapur a nonstop je jen Londýn→Perth.
6. Qatar Doha–Auckland: média hlásí návrat nonstopu „v polovině září 2026“. FlightAware k 26. 9. eviduje jen let přes Adelaide.
7. STARLUX PRG–TPE: A350-900 (letiště a média) vs A350-1000 (FlightAware 9/2026).
8. Air NZ NZ1 JFK→AKL: 17:35 (Air NZ) vs 18:05 (Simple Flying, podle OAG). Pravděpodobně jde o sezónní rozdíl, **NEOVĚŘENO**.
9. Project Sunrise SYD–JFK: „approximately 18-hour service“ (Travel PR News) vs schopnost letadla „up to 22 hours“ (Qantas).

## Seznam URL (primární)
- SIA, A350-900 (flotila + letový řád): https://www.singaporeair.com/en_UK/us/flying-withus/our-story/our-fleet/airbus-a350-900/
- SIA, plánek A350-900ULR (PDF): https://www.singaporeair.com/content/dam/sia/web-assets/pdfs/flying-withus/our-story/A350-900-ULR.pdf
- SIA, tisková zpráva 30. 5. 2018: https://www.singaporeair.com/en_UK/sg/corporate/newsroom/press-release/2018/April-June/ne2018-180530/
- SIA, tisková zpráva 20. 10. 2020 (JFK): https://www.singaporeair.com/en_UK/us/corporate/newsroom/press-release/2020/October-December/ne1720-201020/
- SIA, Canyon Ranch 15. 8. 2018: https://www.singaporeair.com/en_UK/ch/corporate/newsroom/press-release/2018/July-September/jr1018-180815/
- SIA, Book the Cook: https://www.singaporeair.com/en_UK/us/flying-withus/dining/book-the-cook/
- Airbus, první A350-900ULR: https://www.airbus.com/en/newsroom/press-releases/2018-09-first-ultra-long-range-a350-xwb-delivered-to-singapore-airlines
- Qantas, A350 Project Sunrise: https://www.qantas.com/en-au/onboard/fleet/a350
- Qantas Newsroom, SYD–LHR (Toulouse): https://www.qantasnewsroom.com.au/media-releases/project-sunrise-route-announcement-toulouse
- Qantas Newsroom, kabina 6/2026: https://www.qantasnewsroom.com.au/media-releases/project-sunrise-onboard-experience-june-2026
- Qantas Newsroom, SYD–JFK (9/2026): https://www.qantasnewsroom.com.au/media-releases/australia-to-new-york-non-stop-qantas-project-sunrise
- Qantas Newsroom, síť 3/2026: https://www.qantasnewsroom.com.au/qantas-responds/qantas-international-network-update-march-2026
- Air New Zealand, NY–NZ: https://www.airnewzealand.com/new-york-to-new-zealand
- STARLUX, Praha: https://latestnews.starlux-airlines.com/en-Global/about-us/travel-advisories/advisories/latest-news/fly_to_PRG
- Letiště Praha, STARLUX: https://www.prg.aero/praha-se-stava-prvni-evropskou-destinaci-starlux-airlines-nova-prima-dalkova-linka-spoji-prahu-s
- NHS, jet lag: https://www.nhs.uk/conditions/jet-lag/
- CDC Yellow Book, Jet Lag Disorder: https://www.cdc.gov/yellow-book/hcp/travel-air-sea/jet-lag-disorder.html

## Seznam URL (podpůrné)
- gcmap: http://www.gcmap.com/dist?P=SIN-JFK,SIN-EWR,PER-LHR,MEL-DFW,AKL-JFK,DXB-AKL,PER-CDG,SZX-MEX,SIN-LAX,IAH-SYD,DFW-SYD,SIN-SFO,DOH-AKL,PRG-TPE,PRG-ICN&DU=km
- Wikipedie SQ23/24: https://en.wikipedia.org/wiki/Singapore_Airlines_Flights_23_and_24
- Wikipedie SQ21/22: https://en.wikipedia.org/wiki/Singapore_Airlines_Flights_21_and_22
- FlightAware (historie letů): https://www.flightaware.com/live/flight/{SIA23,SIA24,SIA21,SIA22,QFA10,QFA21,QFA22,ANZ1,ANZ2,QFA3,QFA4,UAE448,UAE449,CSN8031,CSN8032,QFA7,QFA8,QTR914,QTR920,CAL67,CAL68,SJX101,SJX102}/history
- Simple Flying, 10 nejdelších linek 2026 podle OAG (26. 2. 2026): https://simpleflying.com/up-to-19-hour-nonstop-flights-the-worlds-10-new-longest-ultra-long-haul-routes-in-2026/
- Simple Flying, Qatar přes Adelaide (26. 4. 2026): https://simpleflying.com/qatar-airways-20-hour-doha-adelaide-auckland-flights/
- CAPA (24. 7. 2026): https://centreforaviation.com/news/qatar-airways-to-commence-melbourne-auckland-service-in-dec-2026-replacing-adelaide-auckland-1367203
- Aerospace Global News, Perth–Londýn (21. 8. 2026): https://aerospaceglobalnews.com/news/qantas-nonstop-perth-london-flight-delayed/
- Travel PR News, SYD–JFK (23. 9. 2026): https://travelprnews.com/qantas-sets-mid-2028-sydney-new-york-non-stop-launch-as-project-sunrise-crosses-the-pacific/travel-press-release/2026/09/23/
- Aviation A2Z (7/2026): https://aviationa2z.com/index.php/2026/07/14/5-longest-non-stop-flights-in-the-world-2026/
- Zaletsi.cz, letní řád PRG 2026: https://zaletsi.cz/magazin/letiste-praha-letni-letovy-rad-2026/
- Airportia UA101: https://www.airportia.com/flights/ua101/houston/sydney/

---

## Doplněno po kontrole faktů (24. 9. 2026)

- **Philippine Airlines PR126/127 Manila (MNL) ↔ New York JFK:** ortodroma **13 712 km** (gcmap, podpůrný; kontrolor spočítal 13 696 km, platí gcmap). Nonstop, 3× týdně, Airbus A350. Plán PR126 19:00 → 23:10 = 16 h 10 min (31. 3.–24. 10. 2026), od 27. 10. 15 h 35 min. Zdroj: Airportia, Flightera, Aviability (podpůrné). U Philippine Airlines **NEOVĚŘENO**. V tabulce 10. místo místo Singapur–San Francisco (13 593 km).
- **Air India Bengaluru–San Francisco (14 004 km):** v roce 2026 nelétá nonstop. Podle Airportia naposledy v řádu 31. 8. 2025, Indian Eagle uvádí spoje přes Dillí. Do tabulky nepatří.
- **Turkish Airlines Istanbul–Sydney:** gcmap **14 967 km**, tedy méně než SIN–JFK. Rekordem by nebyla, v článku je to uvedeno.
- **Qantas QF3/QF4 Auckland–New York:** úsek letu ze Sydney, v tabulce neuveden, vysvětleno v textu.
