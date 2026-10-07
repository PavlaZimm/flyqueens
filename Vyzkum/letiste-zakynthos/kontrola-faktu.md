# Kontrola faktů: Letiště Zakynthos (`src/app/blog/letiste-zakynthos/page.tsx`)

Kontrolováno 7. 10. 2026 proti `zdroje.md`, `neovereno.md`, `fotografie.md` a proti primárním zdrojům staženým týž den (web letiště zth-airport.gr včetně sezonní tabulky a tabule, PDF Fraport Greece S26 a W26, statistika 2025 a 1–8/2026, KTEL Zakynthos, Smartwings). Kontrolu dělal týž agent, který text psal (žádný druhý agent nebyl k dispozici v rámci zadání); proto je níže u každého tvrzení uveden konkrétní doklad.

Odkazy v článku: staženy curlem s HTTP 200 (zth-airport.gr podstránky, KTEL, fraport-greece.com, PDF S26 a statistika, Smartwings, OSM). Výjimka: článek GTP curl nestáhl (timeout, titulní stránka news.gtp.gr vrací 200), obsah jsem ověřil přes WebFetch 7. 10. 2026. Před publikací odkaz otevřít v prohlížeči. Sezonní tabulka se na stránce `dest_id-748` zobrazí až po výběru země „Czech Republic“, odkaz vede na stránku s výběrem.

## Tabulka tvrzení

| # | Tvrzení v článku | Stav | Doklad |
|---|---|---|---|
| 1 | Titulek, popisek: lety Smartwings z Prahy končí v říjnu 2026 | OK | tabulka letiště: poslední přílet z PRG 9. 10., odlet 16. 10. |
| 2 | IATA ZTH, ICAO LGZA, název „Dionysios Solomos“ | OK | PDF Fraport S26/W26; web letiště |
| 3 | Asi 3 km jižně od města; 3,2 km a 3,6 km vzdušnou čarou | OK s výhradou (vlastní výpočet, v textu přiznán) | souřadnice letiště z webu letiště, body OSM; azimut 14° (město na sever), 211° (Laganas na JZ) |
| 4 | Z Česka v létě 2026 jen Smartwings, z Prahy, Brna a Ostravy | OK | tabulka letiště, Česko: letiště BRQ, OSR, PRG; dopravce jen „Smartwings A.S.“ |
| 5 | Praha od 12. 5., v červnu až srpnu denně | OK | rozpis tabulky: červen 30, červenec 31, srpen 31 dní s příletem |
| 6 | Brno a Ostrava út a pá od 29. 5.; poslední přílet 25. 9.; poslední odlet Brno 2. 10., Ostrava 29. 9. | OK | tabulka (QS1420/1421, QS1318/1319) |
| 7 | Říjen: přílety z Prahy 2., 6., 9. 10. v 08:40; odlety 2., 6., 9., 16. 10. v 09:25 a 6. 10. v 06:15 | OK | tabulka (QS1118, QS1119, QS2293) |
| 8 | 6. 10. přistání 08:34, odlet 09:23 | OK | živá tabule letiště, status „Arrived 08:34“, „Departed 09:23“ |
| 9 | Řecko má o hodinu víc než Česko | OK (obecně známé, časové pásmo EET/EEST vs. CET/CEST) | web letiště „local time zone in Greece“ |
| 10 | Smartwings prodává letenky Praha–Zakynthos | OK | stránka smartwings.com/letenky-praha-zakynthos s vyhledávačem letenek |
| 11 | Navigace „Zakynthos Airport, Zakynthos 290 92“, 37.754550, 20.887208 | OK | GPS Location information |
| 12 | OSM řadí areál ke Kalamaki | OK | Nominatim: „κ. Καλαμακίου“ |
| 13 | Na internetu 4,3 / 4,5 / 6,5 km a 9–12 km | OK | zaletsi, cestujlevne, skrblik (`serp.md`) |
| 14 | Provozovatel vzdálenosti ani jízdní dobu nezveřejňuje | OK (vyvozeno z absence na stránkách To & From) | web letiště |
| 15 | Autobus KTEL, zastávka před terminálem v části příletů | OK | By Public Bus |
| 16 | Jízdní řád 6 spojů, časy, „week days“ / „everyday“, bez ceny a období, upraveno 7. 9. 2026 | OK | KTEL, WP API `modified: 2026-09-07` |
| 17 | Taxi stanoviště před terminálem, ceník provozovatel nezveřejňuje | OK | By Taxi |
| 18 | Autopůjčovny Avis Budget, Enterprise, Hertz Thrifty v příletové hale | OK | Car Rental („Arrivals, All Users“) |
| 19 | Parkoviště od března 2026 Airport Parking Management, P1 u terminálu, dlouhodobé kousek od něj | OK | Parking |
| 20 | Ceník P1 a Long Term | OK | Parking (všechny řádky přepsány 1 : 1; v tabulce u dlouhodobého sloučené pásmo 1–4 h a 4–24 h vyznačeno v závorce) |
| 21 | Týden P1 60 €, dlouhodobé 40 € | OK jako výpočet (v textu označen) | 12 + 6 × 8; 10 + 6 × 5 |
| 22 | Kamery SPZ, nonstop interkom, tel. +30 2695 00 16 16 | OK | Parking („LPR cameras, 24-hour intercom“) |
| 23 | Léto 1. 5.–24. 10. 2026 denně 05:00–22:00 | OK | PDF S26 verze 1 (26. 3. 2026) |
| 24 | Zima od 25. 10.: po a ne 13:30–19:30, út a so 12:00–18:00, st a pá 09:30–19:30, čt 10:30–19:30, do 27. 3. 2027 | OK | PDF W26 verze 1 (1. 10. 2026) |
| 25 | Výjimky 25. 10.–2. 11. a 7. 11., nejpozději do 22:00 | OK | W26: nejpozdější konec 22:00 |
| 26 | Hodiny se upraví na žádost dopravců, terminál bývá otevřený déle, mimo hodiny jen nouzové lety | OK | poznámka pod tabulkou W26 („open for emergency flights“) |
| 27 | 2025: 2 282 774 cestujících, přes milion v červenci a srpnu, prosinec 4 604, z toho 1 mezinárodní | OK | Zakinthos_12_Traffic_2025vs2024.pdf (519 679 + 527 049 = 1 046 728; prosinec mezinárodní 1) |
| 28 | Letecky v zimě jen s přestupem | OK (odvozeno ze statistiky a tabulky; přímé lety z ČR po 16. 10. v tabulce nejsou) | tabulka; statistika |
| 29 | Sky Express z/do Athén a na Korfu 6.–8. 10. | OK (jen co bylo vidět na tabuli, bez tvrzení o úplnosti) | tabule (GQ421 Athens 7. 10.; Sky Express > Corfu 7. 10.) |
| 30 | Fraport Greece provozuje letiště od roku 2017, přepážky 15 → 20, bezpečnostní linky 2 → 5 | OK | profil Fraport Greece; GTP 10. 2. 2021 (začátek v dubnu 2017) |
| 31 | Wi-Fi Fraport-Free, nabíjení, bankomaty Eurobank a Euronet, vozíky na minci, první pomoc, ztráty a nálezy policie 26950 24487 | OK | jednotlivé stránky Airport Services |
| 32 | Asistence PRM 48 h | OK | Accessible Travel |
| 33 | Tekutiny 100 ml, sáček do 1 l, zdarma u kontroly | OK | Security Control |
| 34 | Radar: odlet z Prahy v oblasti Česko a okolí | OK | `src/lib/constants.ts`, oblast `europe` (50° N, 15° E, 250 NM). Zakynthos sám je od středu oblasti Jihovýchodní Evropa asi 315 NM, proto článek přílet na Zakynthos na radaru neslibuje. |
| 35 | Popisek hero: nápis „Státní letiště Zakynthos D. Solomos“, 8. 6. 2018, budova poté přestavěna | OK | fotka (čitelný řecký nápis), EXIF; profil Fraport (Refurbishing and remodeling of terminal) |
| 36 | Popisek 2: Airbus v barvách Austrian Airlines, schody, cisterna s logem EKO, hory v mracích, 15. 6. 2018 | OK | fotka, EXIF; typ Airbusu a registrace v textu nejsou |
| 37 | Vymyšlené zážitky | žádné | Text nepopisuje návštěvu, let autorky ani stanoviště fotografa. |

## Opraveno během kontroly (už zapracováno v souboru)

1. „jediné letiště na ostrově“ vypuštěno, primární zdroj nenalezen.
2. „Letiště leží na jihovýchodní straně ostrova … u Lagaského zálivu“ nahrazeno „mezi městem Zakynthos a Laganasem“ (jen to plyne ze souřadnic).
3. „Tyto lety obvykle obsazují zájezdy CK“ a „u zájezdu vás obvykle odveze transfer“ vypuštěno nebo přeformulováno, neověřeno.
4. „Ranní lety jsou dřív, než vyjíždí první autobus“ vypuštěno: přílet v 08:40 návaznost na bus v 09:30 má, tvrzení bylo nepřesné.
5. „Mimo provozní dobu jen nouzová přistání“ → „nouzové lety“ (PDF: „emergency flights“).
6. Sky Express: z „provozoval vnitrostátní lety“ na „byly na tabuli spoje…“, protože tabuli jsem nestáhl úplnou za celé dny.
7. „Cisterna s palivem“ → „cisterna s logem EKO“ (obsah cisterny na fotce nepoznám).

## Zbývající nejistoty

- Sezonní tabulka letiště je stav k 7. 10. 2026; Smartwings ji může změnit. Text to říká v poznámce pod tabulkou.
- Odlet 16. 10. bez příletu z Prahy necháváme bez výkladu.
- Letní provozní doba je z verze 1 dokumentu S26 (březen 2026); případné pozdější úpravy jsem nenašel.
