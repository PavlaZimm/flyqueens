# Ověřená fakta: letiště Treviso (TSF)

Ověřováno 7. 10. 2026. Jistota: **vysoká** = primární zdroj (provozovatel letiště, dopravce, statistika) přímo otevřený; **střední** = primární zdroj s výhradou; **nízká** = sekundární zdroj, do článku jen s výhradou nebo vůbec.

Poznámka k přístupu: web provozovatele https://www.trevisoairport.it/en_gb/ vrací pro curl i WebFetch 403. Otevřen v prohlížeči Chrome (claude-in-chrome), text čten přes `main.textContent`. Stránky ATVO, MOM (mobilitadimarca.it), Trenitalia, Assaeroporti a Barzi Service staženy curlem s běžným user-agentem. Letový řád Ryanairu stažen z veřejného JSON rozhraní, které používá web ryanair.com.

## Provozovatel a identifikace

| Údaj | Hodnota | Zdroj | Platnost / ověřeno | Jistota |
|---|---|---|---|---|
| Název | Treviso Antonio Canova Airport (titulek webu provozovatele) | https://www.trevisoairport.it/en_gb/ | 7. 10. 2026 | vysoká |
| Provozovatel | AER TRE S.p.A., Gruppo SAVE (pod řízením SAVE SpA) | patička webu provozovatele | 7. 10. 2026 | vysoká |
| Sesterská letiště skupiny SAVE v patičce | Brescia, Venezia (Marco Polo), Verona | patička webu provozovatele | 7. 10. 2026 | vysoká |
| Adresa | Via Noalese 63/E, 31100 Treviso | web provozovatele | 7. 10. 2026 | vysoká |
| Telefon (informace o letech) | +39 0422 315111 | web provozovatele | 7. 10. 2026 | vysoká |
| IATA | TSF | Ryanair timetable API (`/schedules/PRG/TSF/...`), seznam tras Ryanair | 7. 10. 2026 | vysoká |
| ICAO | LIPH | jen sekundárně (it.wikipedia, skybrary/acukwik ve výsledcích hledání); eAIP ENAV nešel otevřít | 7. 10. 2026 | střední, do článku jen kód bez odkazu na AIP |
| Logo „AER TRE“ na pojízdných schodech na fotce 151038 | odpovídá názvu provozovatele | fotka + patička webu | 7. 10. 2026 | vysoká |

## Terminál a služby (FAQ provozovatele)

URL: https://www.trevisoairport.it/en_gb/assistance/faqs-services, https://www.trevisoairport.it/en_gb/assistance/faqs-check-in, https://www.trevisoairport.it/en_gb/assistance/faqs-transport-from-to-airport (bez data na stránce, otevřeno 7. 10. 2026)

| Údaj | Hodnota | Jistota |
|---|---|---|
| Otevření terminálu | přístup do terminálu od 5:00, konec s posledním letem dne, „kolem půlnoci“ | vysoká |
| Spaní v terminálu | není dovoleno | vysoká |
| Odlety | 1. patro terminálu, brány za bezpečnostní kontrolou | vysoká |
| Wi-Fi | zdarma, síť „Treviso Airport Free WiFi“ | vysoká |
| Nabíjení | zdarma na všech podlažích a v Canova Lounge | vysoká |
| Bankomaty | v příletech i odletech | vysoká |
| Půjčovny aut | přízemí terminálu (Avis, Budget, Europcar, Sixt, Locauto, Sicily by Car aj.) | vysoká |
| Taxi a autobusy | taxi u vchodu do terminálu v přízemí, zastávky autobusů hned za ním | vysoká |
| Prodej jízdenek na letišti | pokladna v přízemí v příletech, nebo v autobusu (stránka Transport); ATVO automat ve výdeji zavazadel a pokladna ATVO v příletové hale (stránka ATVO) | vysoká |
| Taxi | Radio Taxi Treviso, tel. +39 0422 431515, nonstop; SMS +39 338 844 2000 | vysoká |
| Řidič s vozem (NCC) | přes místní provozovatele nebo aplikaci Uber | vysoká |

## Doprava

### Provozovatel letiště, stránka Transport
URL: https://www.trevisoairport.it/en_gb/transport (otevřeno 7. 10. 2026)
- Do Trevisa: MOM Treviso AirLink a linka MOM 6 (na nádraží Treviso Centrale; zastávka u nádraží „De Gasperi“).
- ATVO: Piazzale Roma (Benátky), Mestre centrum, nádraží Venezia Mestre, sezonně Jesolo, Cavallino, Caorle.
- Barzi Service: přímo na nádraží Venezia Mestre a Tronchetto (Benátky).
- MOM: linka na Padovu s mezizastávkami.
- Nomago: spojení se Slovinskem. GoOpti: sdílené a soukromé transfery (Itálie, Slovinsko, Chorvatsko).
- Zastávka autobusů: venku před příletovou částí terminálu.

### ATVO, Treviso Airport Bus Express, linka 351
- Stránka: https://www.atvo.it/en/services-provided/airport-services/treviso-airport-bus-express (otevřeno 7. 10. 2026). Uvádí: od 10. srpna nová linka 351, Mestre za 30 minut, Benátky za 40 minut. Prodej: online, ATVO automat ve výdeji zavazadel, pokladna ATVO v příletové hale (tel. +39 0421 594669), v Benátkách pokladna na Piazzale Roma.
- Jízdní řád PDF: https://www.atvo.it/assets/bus_routes/351_agg.29.09.2026.pdf, **platí 10. 8. – 24. 10. 2026**, směr na letiště aktualizován 4. 8. 2026, směr z letiště 29. 9. 2026.
  - Z letiště: první spoj 7:45 všechny dny; poslední podle dne 21:30–22:30 (Po 22:00, Út 21:45, St 22:30, Čt 22:20, Pá 21:30, So 22:20 s poznámkou „fino al 26/09“ u části spojů, Ne 22:20). Doba jízdy podle tabulky: letiště → Mestre FS 30 min, → Piazzale Roma 40 min.
  - Na letiště: první spoj z Piazzale Roma 4:20 (na letišti 5:00) všechny dny; poslední z Piazzale Roma 18:00 (Po, St, Pá) nebo 18:30 (Út, Čt, So, Ne), na letišti o 40 minut později. Z Mestre FS na letiště 25 minut.
  - Poznámky v PDF: spoje z letiště se posouvají podle zpoždění letů; při zrušení letů se spoje ruší; jízdní řád se může změnit i po zveřejnění.
- Blog ATVO 31. 3. 2026: historické centrum Benátek je bez aut, pozemní vozidla dojedou jen na Piazzale Roma, dál pěšky nebo vaporettem.
- Blog ATVO 31. 3. 2026 (https://www.atvo.it/en/blog/how-to-get-to-venice-from-treviso-airport-best-options): autobusy „přibližně každých 30 minut“; vlak bez přímého spojení z letiště. **Rozpor s PDF:** podle PDF nejsou odjezdy pravidelné, řídí se lety. Do článku dáváme PDF.
- Jízdné ATVO: na stránkách ATVO (EN, IT) ani v PDF **nenalezeno**, viz neovereno.md.

### MOM Treviso AirLink (letiště – nádraží Treviso Centrale)
URL: https://mobilitadimarca.it/p/linee-e-orari/treviso-airbus (otevřeno 7. 10. 2026, bez data platnosti)
- Přímý spoj letiště – nádraží Treviso Centrale, jízda 10 minut.
- Z nádraží: 5:53–22:23 každých 30 minut, chybí odjezd 14:23.
- Z letiště: 6:10–22:40 každých 30 minut, chybí odjezd 14:40 (po 14:10 další až 15:40).
- Jízdenka 5,00 €, platí 24 hodin od první validace, i na celé městské síti Trevisa. Platba kartou bezkontaktně v autobusu (Tap to pay). Děti do 4 let zdarma s platícím dospělým.
- Zavazadlo zdarma do 12 kg a 55 × 50 × 25 cm, větší: 2 € předem, 4 € v autobusu.
- Zastávky u pěší lávky, Via Noalese (k Trevisu jižní strana, výstup na letišti severní strana).
- Trenitalia (https://www.trenitalia.com/it/regionale/collegamenti-regionale/treviso-airlink.html, otevřeno 7. 10. 2026): kombinovaná jízdenka vlak + AirLink, příplatek za autobus 5,00 €; z Trevisa vlaky mj. do Benátek, Padovy, Conegliana. **Rozpor:** Trenitalia uvádí jízdu 15 minut a časy 6:23–22:53 (z nádraží) a 6:40–23:10 (z letiště), MOM 10 minut a 5:53–22:23 / 6:10–22:40. Platí MOM jako provozovatel.

### Barzi Service
URL: https://barziservice.com/en/ (otevřeno 7. 10. 2026): linka Treviso Aeroporto – Venezia Mestre – Venezia Tronchetto, online prodej. Ceny ani jízdní řád nečteny.

## Parkování
URL: https://www.trevisoairport.it/en_gb/parking/info a https://www.trevisoairport.it/en_gb/parking/short-stay (otevřeno 7. 10. 2026). Provozovatel parkovišť: Marco Polo Park srl, tel. +39 041 260 3052, parcheggi@trevisoairport.it. Online rezervace s „discounted web rates“; na místě platba v automatech (hotově, kartou), výjezdových sloupcích (kartou) a na obsluhovaných stanovištích.

| Parkoviště | Popis provozovatele | Ceník na stránce |
|---|---|---|
| A | venkovní, před terminálem; vhodné k vysazení a vyzvednutí, 1 minuta pěšky | prvních 10 minut zdarma, pak 5 € za každou započatou hodinu |
| B | částečně kryté, hned vedle terminálu | do 1 h 5 €, do 12 h 20 €, do 24 h 30 €, každý další den 30 € |
| C | venkovní, pár minut od terminálu | 5 € za den (podezřele nízko, viz neovereno.md) |
| D | částečně kryté, pár minut od terminálu | 15 € za den |
| E | venkovní, pár minut od terminálu | 20 € za den |
| F | venkovní, před terminálem, krytá lávka | 5 € za hodinu, 20 € za den |
| G | venkovní, naproti terminálu, krytá lávka | 20 € za den |
| Low Cost | venkovní, pár minut od terminálu | 20 € za den |
| PBus | pro zájezdové autobusy | 15 € za 20 minut |

- Stránka uvádí „around 6,000 parking spots, including 2,000 covered“. Nepoužito (viz neovereno.md).
- Rezervace se pozná podle SPZ kamerou 3 h před a 3 h po rezervovaném čase.
- Parkování pro držitele průkazu ZTP zdarma po validaci v Info Desku odletů (FAQ).

## Lety z Česka

| Údaj | Hodnota | Zdroj | Platnost | Jistota |
|---|---|---|---|---|
| Linka Praha – Treviso | Ryanair, čísla FR 1530 (PRG→TSF) / FR 1531 (TSF→PRG), některé dny navíc FR 7943 / FR 7944 | https://www.ryanair.com/api/timtbl/3/schedules/PRG/TSF/years/2026/months/10 (a /11, /12, opačný směr TSF/PRG) | staženo 7. 10. 2026 | vysoká |
| Četnost | 7.–31. 10. 2026 každý den (6 dní dvakrát); listopad každý den (17 dní dvakrát); prosinec každý den kromě 25. 12. (15 dní dvakrát) | tamtéž | 7. 10. 2026 | vysoká |
| Časy | den ode dne jiné; odlety z Prahy 6:15–20:10 (říjen), 7:25–19:40 (listopad, prosinec) | tamtéž | 7. 10. 2026 | vysoká |
| Plánovaná délka letu | 1 h 20 min v obou směrech (stejné časové pásmo) | tamtéž | 7. 10. 2026 | vysoká |
| Odletová/příletová tabule TSF 7. 10. 2026 | FR 1530 z Prahy přílet 15:35, FR 1531 do Prahy odlet 16:00 | https://www.trevisoairport.it/en_gb/flights/arrivals, /departures | 7. 10. 2026, 14:15 | vysoká |
| Brno, Ostrava, Pardubice, Karlovy Vary – Treviso | Ryanair v listopadu 2026 nelétá (prázdný JSON) | Ryanair API | 7. 10. 2026 | vysoká (jen Ryanair) |
| Vídeň – Treviso | Ryanair létá (FR 51 a další, listopad 2026) | Ryanair API | 7. 10. 2026 | vysoká |
| Název u Ryanairu | „Venice Treviso“ | https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/PRG | 7. 10. 2026 | vysoká |
| Ryanair z Prahy do Benátek Marco Polo (VCE) | v seznamu tras z PRG není, benátská linka vede do TSF | tamtéž | 7. 10. 2026 | vysoká |
| Počet tras Ryanair z TSF | 42 cílových letišť v seznamu tras | https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/TSF | 7. 10. 2026 | vysoká |
| Dopravci na tabuli odletů 7. 10. 2026 odpoledne | Ryanair 12 odletů, Wizz Air 3 (Iaşi, Skopje, Tirana) | odletová tabule provozovatele | 7. 10. 2026 | vysoká (jen jeden den) |

## Provoz (statistika)

Zdroj: Assaeroporti, https://assaeroporti.com/statistiche/ (data „Fonte: Aeroporti 2030“, stav k srpnu 2026, otevřeno 7. 10. 2026)

| Údaj | Hodnota |
|---|---|
| Cestující leden–srpen 2026 | 2 192 520 (+0,8 % proti 2025) |
| Pohyby leden–srpen 2026 | 16 702 (+6 %) |
| Cestující srpen 2026 | 309 941 (−0,2 %) |
| Pro srovnání Venezia leden–srpen 2026 | 8 675 577 cestujících |

## Vlastní fotografie
Viz `fotografie.md`.

## Poznámky
- Konkurenční údaje (vzdálenost 3 km nebo 5 km od Trevisa, 40 km od Benátek, ceny ATVO 12 €/22 €, Terravision 10 €/18 €, vlak 4,05 €) nejsou u primárního zdroje ověřené, viz `neovereno.md`.
- ATVO jízdní řád končí 24. 10. 2026. Článek to výslovně uvádí.
