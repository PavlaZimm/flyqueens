# Ověřená fakta: letiště Zakynthos (ZTH / LGZA)

Ověřováno 7. 10. 2026. Jistota: **vysoká** = primární zdroj (provozovatel letiště, dopravce, autobusová společnost) přímo otevřený; **střední** = primární zdroj s výhradou (nejasné období, vlastní výpočet, médium); **nízká** = sekundární zdroj, v článku jen s výhradou.

Stažené kopie stránek a PDF jsou ve scratchpadu relace (`zakynthos/web/`), nejsou součástí repozitáře.

## Primární zdroje

- **Web letiště (Fraport Greece)**: https://www.zth-airport.gr/en a podstránky níže. Stahováno curlem s běžným user-agentem, HTTP 200.
- **Sezonní tabulka letů podle zemí**: stránka https://www.zth-airport.gr/en/flights--more/flights--destinations/destinations/destinations/dest_id-748/nd_id-748 (výběr země „Czech Republic“). Data se načítají přes POST `/en/selected_country` a `/en/destinations` (parametry `ArrivalStatus`, `IATA`, `AirportID`), staženo 7. 10. 2026. Stránka uvádí: „The above information relates to the period up to 24/10/2026“ a že Fraport Greece neručí za chyby a změny.
- **Živá tabule příletů a odletů**: `/en/_jcr_content.departures.json/filter` a `.arrivals.json/filter` (ukazuje jen včerejšek až zítřek), staženo 7. 10. 2026 v 15:09 místního času.
- **Fraport Greece, provozní doba letišť**: https://www.fraport-greece.com/en/our-expertise/aviation/operating-hours.html
  - Zima 2026 (25. 10. 2026–27. 3. 2027), „Version 1 / Issue date: 01.10.2026“: W26_RWY_Operating_Hours_Local_Version_1.pdf
  - Léto 2026, „Version 1 / Issue date: 26.03.2026“: S26_RWY_Operating_Hours_Local_Version_1.pdf (už není na stránce prolinkované, URL stále funguje: https://www.fraport-greece.com/content/dam/fraport-company-greece/documents/en/our-expertise/operating-hours/S26_RWY_Operating_Hours_Local_Version_1.pdf/_jcr_content/renditions/original.media_file.download_attachment.file/S26_RWY_Operating_Hours_Local_Version_1.pdf). Novější letní verze (2–5) vrací 404.
- **Statistika provozovatele**: https://www.zth-airport.gr/en/zth/air-traffic-statistics → PDF `Zakinthos_12_Traffic_2025vs2024.pdf` a souhrn Fraport Greece `Fraport_Greece_YTD_08_Traffic_2026vs2025.pdf` (https://www.fraport-greece.com/en/our-expertise/aviation/traffic-figures.html). Data označená jako předběžná.
- **KTEL Zakynthos** (autobusová společnost): https://ktel-zakynthos.gr/en/zakynthos-airport/ (WordPress API: publikováno 2. 6. 2025, upraveno 7. 9. 2026).
- **Smartwings**: https://www.smartwings.com/letenky-praha-zakynthos (stránka prodeje letenek Praha–Zakynthos existuje; letový řád https://www.smartwings.com/letovy-rad se v prohlížeči nenačetl, viz `neovereno.md`).

## Identifikace a poloha

| Údaj | Hodnota | Zdroj | Platí k | Jistota |
|---|---|---|---|---|
| Název | Zakynthos Airport „Dionysios Solomos“; nápis na budově (vlastní foto 2018): ΚΡΑΤΙΚΟΣ ΑΕΡΟΛΙΜΕΝΑΣ ΖΑΚΥΝΘΟΥ «Δ. ΣΟΛΩΜΟΣ» | web letiště; fotografie | 7. 10. 2026 | vysoká |
| IATA / ICAO | ZTH / LGZA | Fraport Greece W26 a S26 PDF („LGZA … (ZTH)“) | 2026 | vysoká |
| Provozovatel | Fraport Greece (jedno ze 14 regionálních letišť) | web letiště, fraport-greece.com | 2026 | vysoká |
| Souřadnice a adresa | 37°45'16.38"N 20°53'13.95"E (37.754550, 20.887208); „Zakynthos Airport, Zakynthos 290 92“ | web letiště, GPS Location information: https://www.zth-airport.gr/en/category-detailed/ctg_id-183/nd_id-709 | 7. 10. 2026 | vysoká |
| Vzdálenost od centra města Zakynthos | **asi 3,2 km vzdušnou čarou**, směr od letiště k městu zhruba sever (14°) | vlastní výpočet: souřadnice letiště (web letiště) a bod města Ζάκυνθος z OpenStreetMap Nominatim (37.7828669, 20.8962212) | výpočet 7. 10. 2026 | střední (vlastní výpočet) |
| Po silnici do města | asi 4,1 km (trasa OSRM nad daty OSM) | router.project-osrm.org | 7. 10. 2026 | střední (orientační, nepoužito v článku jako přesné číslo) |
| Vzdálenost od Laganasu | **asi 3,6 km vzdušnou čarou** na jihozápad (azimut 211° od letiště) | vlastní výpočet, bod Λαγανάς z OSM Nominatim (37.7269452, 20.8659368) | 7. 10. 2026 | střední |
| Obec | OSM řadí areál do komunity Kalamaki, obecní jednotka Laganas, obec Zakynthos | OSM Nominatim | 7. 10. 2026 | střední |
| Pojmenování | Dionysios Solomos, básník, napsal „Hymnu na svobodu“ | web letiště, stránka Zakynthos: https://www.zth-airport.gr/en/category-detailed/ctg_id-190/nd_id-706 | 7. 10. 2026 | vysoká (jen tolik, co stránka uvádí) |

## Lety z Česka (sezona 2026)

Zdroj: sezonní tabulka letiště (POST `/en/destinations`), staženo 7. 10. 2026. Všechny lety provozuje **Smartwings, a.s.**; jiný dopravce u českých letišť v tabulce není. Časy jsou místní řecké (o hodinu napřed proti ČR). Výčet dnů jsem rozepsal z rozsahů a dnů v týdnu (skript v relaci).

| Trasa | Lety (čísla, časy v Zakynthu) | První a poslední let | Dny | Jistota |
|---|---|---|---|---|
| Praha → Zakynthos | QS1118 přílet 08:40 (v září v úterý 15:45); QS2206 a QS2210 přílet 14:55; QS2292 přílet 05:25 | 12. 5.–**9. 10. 2026** | květen 10 dní, červen 30, červenec 31, srpen 31, září 27 dní, říjen 2., 6. a 9. 10. | vysoká (s výhradou změn) |
| Zakynthos → Praha | QS1119 odlet 09:25; QS2207 a QS2211 odlet 15:45; QS2293 odlet 06:15 | 12. 5.–**16. 10. 2026** | říjen 2., 6., 9. a 16. 10. | vysoká (s výhradou změn) |
| Brno → Zakynthos | QS1420 přílet 07:15 | 29. 5.–**25. 9. 2026** | úterý a pátek | vysoká |
| Zakynthos → Brno | QS1421 odlet 08:05 (2. 10. v 15:25) | 2. 6.–**2. 10. 2026** | úterý a pátek | vysoká |
| Ostrava → Zakynthos | QS1318 přílet 15:45 (některá úterý v září 08:40) | 29. 5.–**25. 9. 2026** | úterý a pátek | vysoká |
| Zakynthos → Ostrava | QS1319 odlet 16:30 | 2. 6.–**29. 9. 2026** | úterý a pátek | vysoká |

- Kontrola na živé tabuli 6. 10. 2026: QS1118 z Prahy přistál 08:34 (plán 08:40), QS2293 do Prahy odletěl 06:16 (plán 06:15), QS1119 do Prahy 09:23 (plán 09:25). Souhlasí s tabulkou. **Jistota vysoká.**
- Na 16. 10. tabulka uvádí odlet QS1119 do Prahy, ale žádný přílet z Prahy. Nevykládat, proč (viz `neovereno.md`).
- Pardubice ani Karlovy Vary letiště v seznamu zemí a letišť pro Česko nemá (vrací jen Brno, Ostrava, Praha).
- Smartwings na svém webu prodává letenky Praha–Zakynthos (stránka „Letenky Praha - Zakynthos“). Ceny nezjišťovány.

## Provozní doba (runway, provoz letiště)

| Období | Hodiny (místní čas) | Zdroj | Jistota |
|---|---|---|---|
| 29. 3.–30. 4. 2026 | po 09:30–22:00; út, so 08:30–22:00; st 09:00–22:00; čt, ne 10:00–22:00; pá 14:00–22:00 (+ výjimky v dubnu) | S26 PDF, verze 1 z 26. 3. 2026 | vysoká (jen verze 1) |
| 1. 5.–24. 10. 2026 | **denně 05:00–22:00** | S26 PDF | vysoká |
| Zima od 25. 10. 2026 (do 27. 3. 2027) | po a ne 13:30–19:30; út a so 12:00–18:00; st a pá 09:30–19:30; čt 10:30–19:30 | W26 PDF, verze 1 z 1. 10. 2026 | vysoká |
| Výjimky na přelomu sezony | ne 25. 10. 07:00–21:00; po 26. 10. 11:00–21:00; út 27. 10. 11:00–22:00; st 28. 10. 09:00–22:00; čt 29. 10. 11:00–20:00; pá 30. 10. 10:00–22:00; so 31. 10. 11:00–22:00; ne 1. 11. 09:00–20:30; po 2. 11. 16:00–22:00; so 7. 11. 16:00–22:00 | W26 PDF; stejné údaje v patičce webu letiště („Airport Operating Hours“) | vysoká |
| Poznámka PDF | Dokument je pro dopravce; při nových požadavcích dopravců se hodiny upraví; mimo ně je letiště otevřené pro nouzová přistání; terminál bývá otevřen déle | W26 PDF | vysoká |

## Doprava

| Údaj | Hodnota | Zdroj | Platí k | Jistota |
|---|---|---|---|---|
| Autobus | linka letiště–město Zakynthos, zastávka před terminálem v části příletů | web letiště, By Public Bus: https://www.zth-airport.gr/en/category-detailed/ctg_id-166/nd_id-709 | 7. 10. 2026 | vysoká |
| Jízdní řád město → letiště | „WEEK DAYS“ 08:15, 09:15, 10:45, 12:45, 17:00, 19:15 | KTEL Zakynthos, https://ktel-zakynthos.gr/en/zakynthos-airport/ (upraveno 7. 9. 2026) | 7. 10. 2026 | vysoká (období platnosti a cena na stránce chybí) |
| Jízdní řád letiště → město | „EVERYDAY“ 08:30, 09:30, 11:00, 13:00, 17:15, 19:30 | tamtéž | 7. 10. 2026 | vysoká, totéž |
| Taxi | stanoviště před terminálem | web letiště, By Taxi: https://www.zth-airport.gr/en/category-detailed/ctg_id-167/nd_id-709 | 7. 10. 2026 | vysoká (ceny neuvádí) |
| Autopůjčovny v terminálu | Avis Budget (+30 26950 33209), Enterprise (+30 26954 40076, 40077), Hertz Thrifty (+30 26950 24287), vše „Arrivals, All Users“ | web letiště, Car Rental: https://www.zth-airport.gr/en/category-detailed/ctg_id-182/nd_id-738 | 7. 10. 2026 | vysoká |

## Parkování

Zdroj: web letiště, Parking: https://www.zth-airport.gr/en/category-detailed/ctg_id-164/nd_id-711 (ověřeno 7. 10. 2026). Jistota vysoká.

- Od března 2026 parkoviště provozuje **Airport Parking Management (APM)**. Kamery na SPZ, 24h interkom, CCTV. Tel. +30 2695 00 16 16.
- **P1** přímo u terminálu: 0–20 min zdarma; 21–60 min 5 €; 1–2 h 6 €; 2–3 h 7 €; 3–4 h 8 €; 4–5 h 10 €; 5–24 h 12 €; každý další den nebo jeho část +8 €.
- **Long Term Parking** kousek od terminálu: 0–20 min zdarma; 21–60 min 5 €; 1–4 h 8 €; 4–24 h 10 €; každý další den nebo jeho část +5 €.
- Výpočet pro týden (7 dní = 1. den + 6 dalších): P1 12 + 6 × 8 = 60 €; Long Term 10 + 6 × 5 = 40 €. Vlastní výpočet podle ceníku, předpokládá, že „5–24 hodin“ je první den. **Jistota střední** (interpretace ceníku), v článku uvést jako výpočet.

## Terminál a služby

| Údaj | Hodnota | Zdroj | Jistota |
|---|---|---|---|
| Wi-Fi | zdarma, síť „Fraport-Free“, přihlášení přes uvítací stránku | Internet Access: https://www.zth-airport.gr/en/category-detailed/ctg_id-181/nd_id-739 | vysoká (limit neuveden) |
| Nabíjení | nabíjecí stanice zdarma v odbavovací hale a u gate za kontrolou (bezdrátové, USB, zásuvky) | Charging mobile devices: ctg_id-773/nd_id-712 | vysoká |
| Vozíky | zdarma, na vratnou minci | Baggage trolleys: ctg_id-774/nd_id-712 | vysoká |
| Bankomaty | Eurobank (veřejná část), Euronet (přílety za kontrolou i veřejná část) | ATMs: ctg_id-598/nd_id-719 | vysoká |
| První pomoc | stanoviště první pomoci, dotaz na informacích | First Aid: ctg_id-177/nd_id-718 | vysoká |
| Ztráty a nálezy | předává se policii; formulář Deliverback nebo policie tel. 26950 24487 (dopoledne v pracovní dny); věci z letadla řeší dopravce | Lost Property: ctg_id-746/nd_id-1785 | vysoká |
| Asistence PRM | objednat přes dopravce nebo CK nejméně 48 h před odletem | Accessible Travel: ctg_id-174/nd_id-712 | vysoká |
| Bezpečnostní kontrola | tekutiny po 100 ml v jednom průhledném sáčku do 1 l, sáčky zdarma u kontroly; léky a dětská výživa i nad 100 ml | Security Control: ctg_id-169/nd_id-712 | vysoká |
| Přestavba | Fraport Greece terminál po roce 2017 přestavěl: přepážek odbavení z 15 na 20, bezpečnostních linek ze 2 na 5 | Fraport Greece, profil letiště: https://www.fraport-greece.com/en/airport-profiles/zakynthos.html | vysoká |
| Dokončení prací | Zakynthos patřil k prvním hotovým letištím; v dubnu 2019 hlášeno dokončení; celý program 14 letišť dokončen v lednu 2021 | GTP, 10. 2. 2021: https://news.gtp.gr/2021/02/10/fraport-greece-completes-makeover-of-14-greek-regional-airports/ ; Greek City Times 15. 4. 2019 | střední (média) |

## Statistika (Fraport Greece, předběžná data)

| Údaj | Hodnota | Zdroj | Jistota |
|---|---|---|---|
| Cestující 2025 | 2 282 774 (+2,7 % proti 2024: 2 223 010); mezinárodní 2 182 625, domácí 100 149 | Zakinthos_12_Traffic_2025vs2024.pdf | vysoká |
| Červenec / srpen 2025 | 519 679 / 527 049 | tamtéž | vysoká |
| Říjen 2025 | 146 917 | tamtéž | vysoká |
| Listopad / prosinec 2025 | 7 204 / 4 604 (v prosinci 1 mezinárodní cestující) | tamtéž | vysoká |
| Leden–srpen 2026 | 1 778 190 (+3,3 % meziročně) | Fraport_Greece_YTD_08_Traffic_2026vs2025.pdf | vysoká |
| Lety 2025 | 15 265 pohybů | Zakinthos_12_Traffic_2025vs2024.pdf | vysoká |

## Fotografie

Viz `fotografie.md`. Dvě použité fotky mají v EXIF datum pořízení 8. 6. 2018 15:04 a 15. 6. 2018 14:54 a fotoaparát HUAWEI NEM-L21.
