# Letiště Kodaň: druhá kontrola faktů po zveřejnění

Kontrola proběhla 23. 9. 2026 kolem 10:00. Kontrolovala jsem živou stránku https://www.flyqueens.cz/blog/letiste-kodan. Vrací HTTP 200 a klíčové věty jsou shodné se zdrojem `src/app/blog/letiste-kodan/page.tsx`. Článek jsem neupravovala.

Postup:
- **cph.dk** jsem četla ve vestavěném prohlížeči: `fetch` z domény cph.dk a vykreslené stránky přes `innerText`. Prohlížeč jsem jen četla, nic jsem nevyplňovala. Na parkovištích jsem jen otevřela URL s výsledky vyhledávání a na stránce aerolinek klikla na „Show more“.
- **Databáze letů CPH** (`/api/FlightInformation/GetFlightInfoTable`): odlety po dnech v týdnech od 23. 9., 26. 10., 2. 11., 9. 11., 30. 11., 7. 12., 14. 12., 21. 12. a 28. 12. 2026 a od 4. 1., 11. 1., 18. 1., 25. 1., 1. 2., 8. 2., 15. 2., 22. 2., 22. 3. a 29. 3. 2027. Přílety v týdnech od 23. 9. a 2. 11. 2026 a od 11. 1. 2027.
- **API Ryanairu:** CPH→PRG za 9/2026 až 3/2027, PRG→CPH za 11/2026, 12/2026 a 3/2027.
- **api.prg.aero:** odlety 22. a 23. 9. 2026.
- **Excel a PDF z cph.dk:** SHA-256 souborů stažených v prohlížeči je shodný s kopiemi v mém pracovním adresáři. Z těch jsem je pak přečetla.
- **AIP:** PDF jsem stáhla znovu a prošla přes pdftotext.
- **Ostatní externí odkazy:** curl s prohlížečovým User-Agentem.

## Tabulka

| Tvrzení v článku | Stav | Co říká zdroj dnes (23. 9. 2026) | Přesná oprava (staré → nové) |
|---|---|---|---|
| Přímo z Prahy létají SAS, Norwegian a Ryanair. V Praze všichni z Terminálu 2 | ✅ | prg.aero/kodan: „Terminál 2“, Norwegian Air Sweden, Ryanair, SAS. api.prg.aero: všechny odlety do CPH 22. a 23. 9. mají T2 | – |
| Týden 23.–29. 9. 2026: 40 letů v každém směru (SAS 20, Norwegian 13, Ryanair 7) | ✅ | Databáze CPH, odlety do PRG: SK 20, D8 13, FR 7, celkem 40. Přílety z PRG: SK 20, D8 13, FR 7, celkem 40 | – |
| Přílety z Prahy do T3, odlety SAS z T3, Norwegian a Ryanair z T2 | ✅ | Databáze CPH: všechny přílety z PRG „Terminal 3“, odlety SK T3, D8 a FR T2. Platí i v zimních týdnech | – |
| SAS, Delta a TUIfly Nordic v T3, ostatní v T2 | ✅ | /en/flight-information/airlines: 69 položek, T3 jen SAS, Delta Air Lines, TUIfly Nordic, ostatní T2 | – |
| Zima: SAS 3× denně, v sobotu 2× | ✅ | 20 odletů týdně ve všech zimních týdnech od 26. 10. 2026 do 22. 2. 2027, v sobotu 2. Výjimka: 24. 12. jen 2 lety (týden 21.–27. 12. má 19) | – (nepovinné: „…v sobotu a na Štědrý den dvakrát“) |
| Norwegian 4× týdně v listopadu, prosinci a únoru, „v polovině ledna“ 2× | ⚠️ | 4× týdně v listopadu, v prosinci (včetně týdne 28. 12.–3. 1.) a v únoru. **Dva lety týdně ale platí celý leden od 4. 1. do 31. 1. 2027** (týdny od 4., 11., 18. a 25. 1.), ne jen v jeho polovině | „a v polovině ledna jen dva.“ → „a od 4. do 31. ledna jen dva.“ |
| FAQ: Norwegian „většinou čtyřikrát týdně“ | ✅ | 4× týdně kromě ledna, viz výše | – |
| Ryanair: poslední let 2. 11. 2026, znovu 28. 3. 2027. Pauza 3. 11. 2026 až 27. 3. 2027 | ✅ | FR API CPH→PRG: 1. 11. FR6707 20:30, 2. 11. FR6707 9:50 → 11:15, prosinec až únor prázdné, 28. 3. 2027 FR6707 11:40. PRG→CPH: 2. 11. FR6708 8:00 → 9:25, pak 28. 3. 2027 13:30. Databáze CPH: FR v týdnu od 2. 11. jen 2. 11., od 9. 11. žádný | – |
| Let trvá 1 h 20 (SAS, Norwegian), s Ryanairem 1 h 25 | ✅ | Databáze CPH a prg.aero: SK767 8:20 → 9:40, D83580 7:00 → 8:20, SK768 PRG 10:20 → CPH 11:40. FR API: 1 h 25 (např. 9:50 → 11:15). Výjimka 31. 10. FR6707 7:45 → 9:20 (1 h 35), jeden den, bez významu | – |
| SK768 22. 9. 2026: odlet z Prahy 10:20, přílet do Kodaně 11:40 | ✅ | api.prg.aero: SK0768, plánovaný čas 22. 9. 2026 08:20 UTC, tedy 10:20 SELČ, T2. Databáze CPH: SK768 přílet 11:40 (denně) | – |
| Z Brna, Ostravy, Pardubic ani Karlových Varů se přímo nelétá | ✅ | Databáze CPH, odlety i přílety v týdnech od 23. 9., 19. 10. a 7. 12. 2026 a od 15. 2. 2027: žádný let BRQ, OSR, PED ani KLV | – |
| Tabulka parkování: Direct 1 759 / 2 250 / 375 DKK. Standard+ 1 409 / 1 625 / 325. Standard 899, jen online, denně 299. Budget 499, jen online, nejméně 4 dny. Vzdálenosti 100–170 m, 300–500 m, 500 m až 1 km, 1,3–2,1 km | ✅ | /en/parking-transport/prices-products: ceny ani vzdálenosti se od rešerše nezměnily. P1 „Fra 1.199“, v kategorii Standard tedy „od 899“ sedí (P11/P12) | – |
| Parkování 14.–21. 10.: nejlevnější volné P17 a P19 za 1 499 DKK, několik parkovišť vyprodaných | ✅ | Dotaz dnes kolem 10:05: P17 a P19 1 499 DKK. Vyprodáno P15, P10, P5, P9, P3, P7a, P6 | – |
| Parkování 4.–11. 11.: P19 499 DKK, P17 549 DKK | ✅ | Dotaz dnes: P19 499, P17 549, P15 599. Vyprodané jen P7a | – |
| Kiss & Fly u T2 zdarma | ✅ | /drop-off: „Kiss & Fly area close to terminal 2 … free of charge“, dva pruhy | – |
| P Afgang před T2, P Ankomst před T3: 15 min zdarma, pak 70 DKK za započatou hodinu, od 6. hodiny 750 DKK = denní maximum, rezervovat nejde | ✅ | /drop-off a /pick-up: 0–15 min zdarma, 70 DKK, „After the 6th hour has commenced 750 DKK“, „Max rate per day 750 DKK“, „not possible to prebook“. P Afgang „in front of terminal 2“, P Ankomst „directly in front of Terminal 3“ | – |
| Tekutiny 100 ml, jeden litrový sáček na osobu, sáčky zdarma u stolů před kontrolou | ✅ | /liquids-in-carry-on-baggage beze změny. Tisková zpráva z 19. 5. 2026 navíc píše, že 100 ml platí dál, dokud EU neschválí větší objemy. Letiště schválení čeká do konce roku 2026 | – (nepovinné doplnění viz opravu 2) |
| 3D skenery: „všechny dráhy do léta 2026 … Jestli se to stihlo, letiště na webu k 23. 9. 2026 neuvádí. S vyndáváním notebooku proto radši počítejte.“ | ❌ | **Zastaralé.** Tisková zpráva cph.dk z 19. 5. 2026 „Ny sikkerhedskontrol åbner i Københavns Lufthavn“: letiště otevřelo novou kontrolu s 20 drahami a 20 CT skenery (3D). Elektronika zůstává v tašce, hodinky, pásek a boty se nesundávají. URL: https://www.cph.dk/om-cph/presse/nyheder/2026/05/ny%20sikkerhedskontrol%20%C3%A5bner%20i%20k%C3%B8benhavns%20lufthavn | viz Nutné opravy č. 1 |
| Kontrola vždy nejméně 4:00–22:00, při nočních letech nonstop | ✅ | /check-in FAQ: „always be open at least from 4 AM to 10 PM“, „around the clock“, když se létá v noci | – |
| Schengen nejméně 2 h předem (jedna stránka 2,5 h), mimo Schengen 3 h | ✅ | /check-in: 2 h / 3 h. Na téže stránce u zpožděného letu „at least 2.5 hours“. /fremtidens-terminal: „senest 2,5 time“ u Schengenu | – |
| Čekání 2025 v průměru 4 min 14 s, 99,4 % do 15 min | ✅ | Key Facts & Figures 2025: „Average waiting time in security 4 min 14 sec“, „Max 15 minutes waiting time 99.4%“ | – |
| T2 a T3 nonstop, kontrola společná mezi nimi | ✅ | /check-in: „Terminal 2 and Terminal 3 … open 24/7“. /security-checkpoint: „security checkpoint between Terminal 2 and Terminal 3“ | – |
| T1 slouží jako kanceláře | ✅ | /terminal1: „Terminal 1 consists only of office spaces with access from apron.“ | – |
| Rozšíření T3: 60 000 m², dvakrát větší výdejna zavazadel, větší pasová kontrola, víc než 30 obchodů a restaurací (odkaz jen na TZ 13. 3. 2026). Otevření 2027. Stavba u mol C–F, dřív chodit nemusíte | ⚠️ | TZ 13. 3. 2026: 60 000 m², „larger … baggage reclaim“, „expanded passport control“, „new shops“, dokončení 2027. **„Dvakrát“ („fordobles“) a „+30 nye butikker og spisesteder“ uvádí jen /fremtidens-terminal**, ne tisková zpráva. Stránka Fremtidens terminal potvrzuje i mola C, D, E, F a „behøver ikke at komme i ekstra god tid“ | Oprava citace, viz Nutné opravy č. 3 |
| Wi-Fi „CPH Airport Free Wi-Fi“ zdarma, bez hesla, před kontrolou i za ní, u gatů | ✅ | /en/wi-fi: „free and does not require a password“, „before and after the security checkpoint, as well as at all gates“ | – |
| Voda: prázdná láhev projde kontrolou, studená voda z kohoutků na toaletách před kontrolou i za ní | ✅ | /services-airport, FAQ „Where can I refill my water bottle…“ | – |
| Úschovna: P4 v přízemí naproti T2, P7A pod hotelem Clarion u metra, malý box 50 DKK/h, max. 100 DKK | ✅ | /baggage-deposit: Small DKK 50 / DKK 100, P4 „ground floor … Kiss & Fly … directly across from the entrance at Terminal 2“, P7A „beneath the Clarion Hotel, right next to the metro and Terminal 3“ | – |
| Salonky: „Do salonků za kontrolou se dá koupit vstup i při letu do Prahy, pokud je volno.“ Carlsberg 229 a Danske Bank 289, obě až 3 h. Aspire 339. SAS Lounge u gatů C 349, nejdřív 3 h před odletem | ❌ (SAS Lounge) / ✅ (ceny) | Ceny sedí: 229 („up to 3 hours“), 289 („up to 3 hours“), 339, 349, „from 3 hours before departure“, SAS Lounge „at gate C“. **Ale SAS Lounge si koupí jen cestující SAS Economy nebo aerolinky SkyTeam**: „If you are traveling as SAS Economy or with one of the other airlines that are members of Sky Team, you can purchase access“ a „A boarding pass for a flight with SAS or a Sky Team airline must be presented“. Norwegian a Ryanair do ní nesmějí. Aspire a Carlsberg: „All passengers can purchase access … regardless of airline“ | viz Nutné opravy č. 2 |
| Metro M2 u T3, do centra 14 minut | ✅ | m.dk: stanice „en del af … Terminal 3“, „kun 14 minutter med Metroen … til Københavns centrum“ | – |
| Vlak na København H za 13 až 14 minut | ✅ | Rejseplanen 24. 9. 2026: Re 1061 12:00 → 12:13, Re 1063 12:15 → 12:28 | – (upozornění: odkaz má pevné datum 24. 9., po něm bude ukazovat starou tabuli) |
| Statistika 2025: 32 433 694 cestujících (+8,5 %), 256 737 pohybů | ✅ | 2512_traffic.xlsx, „Passengers year to date“ Total 32 433 694, +8,54 %. „Movements“ Total 256 737 (+6,67 %) | – |
| 367 linek, 191 destinací, 63 aerolinek, SAS 38 %, top 3 SAS, Norwegian a Ryanair | ✅ | TZ 13. 3. 2026 doslova: 367 routes, 191 destinations, 63 airlines, SAS 38 %, tři největší dohromady 62 % | – |
| 1. pololetí 2026 16,1 mil. (+9 %), leden až srpen 22,9 mil. (+7,1 %) | ✅ | TZ 21. 8. 2026: „16.1 million … 9% increase“. 2608_traffic.xlsx: 22 916 418, +7,09 % | – |
| Stát drží 99,6 % akcií | ✅ | TZ 13. 3. 2026: „the state now owns 99.6 per cent of the shares“. Trap Danmark uvádí 39,2 % (2018), je ale zastaralá a článek ji k tomu necituje | – |
| Dráhy 04L/22R až 3 571 m (starty z 22R), 04R/22L 3 302 m, 12/30 až 2 800 m. Příčná jen výjimečně, boční vítr nad 15 kt, odklízení sněhu | ✅ | AIP AD 2 EKCH (stránky AIRAC 03/26, 08/26, 12/25): 22R 3571 × 45 m, 04R/22L 3302 × 45 m, 12 2800 × 45 m. AD 2.21: 12/30 při „crosswind component … exceeding 15 KT“, „snow clearance“ | – |
| 4,4 NM (asi 8 km) jiho-jihovýchodně | ✅ | AIP: „4.4 NM SSE of Copenhagen“, 4,4 × 1,852 = 8,1 km | – |
| 20. 4. 1925, jedno z prvních civilních letišť | ✅ | Trap Danmark: „d. 20. april 1925 indviet som en af verdens første civile lufthavne“ | – |
| Vyhlídka pro veřejnost není, nejlepší výhled je na konci Amager Landevej u Flyvergrillen | ✅ | Trap Danmark, Københavns Lufthavn: „ikke er offentlig adgang … bedst for enden af Amager Landevej, hvor Flyvergrillen ligger“ | – |
| Flyvergrillen: 1972 zmrzlinárna, z plošiny je vidět na dráhy, modely letadel, obrazovka s odlety a přílety | ✅ | Trap Danmark, Flyvergrillen: „åbnede i 1972 som et lille ishus“, „platform giver udsyn til både start- og landingsbaner“, „ophængte modelfly“, „skærm“ | – |
| VisitCopenhagen: Amager Landevej 290, plot k drahám, vyhlídka u hřiště | ✅ | „right up to the fence leading to the runways“, „lookout point on the playground“, „Amager Landevej 290, 2770 Kastrup“ | – |
| Původní doména grilu 23. 9. 2026 ukazovala reklamu na kasina | ✅ | flyver-grillen.dk: titulek „Casino Uden MitID – Top casinoer uden MitID“ | – |
| Stejné časové pásmo Praha a Kodaň | ✅ | Databáze CPH (+02:00) a prg.aero (UTC +2) sedí | – |

## Odkazy

Všechny externí adresy v článku jsem otevřela 23. 9. 2026 a vracejí HTTP 200:
- **cph.dk** (v prohlížeči): 17 stránek, 3 soubory (2 × XLSX, 1 × PDF) a podstránky salonků.
- **ostatní:** aim.naviair.dk, prg.aero, ryanair.com API, m.dk, rejseplanen.dk, trap.lex.dk (2×), visitcopenhagen.com, kastrup.cz (2×), commons.wikimedia.org (4×), creativecommons.org.
- **interní:** /letiste/praha, /letiste/praha/parkovani, /letiste/praha/planespotting, /radar, /blog/letiste-lipsko.

Všechny odkazy dokládají tvrzení, u kterých stojí, až na dvě výjimky:
1. **Rozšíření T3.** Odkaz na TZ 13. 3. 2026 nedokládá „dvakrát větší“ výdejnu zavazadel ani „víc než třicet“ obchodů. To stojí na /fremtidens-terminal (oprava č. 3).
2. **Odkaz „salonky“** vede na přehled `/en/practical/workspaces-and-lounges`. Ten se vykresluje skriptem a ceny ani podmínky vstupu neuvádí, ty jsou na podstránkách. Článek to přiznává („ceny v detailu jednotlivých salonků“). Omezení SAS Lounge na SAS a SkyTeam je na podstránce `/sas-lounge`.

Poznámky k odkazům:
- **Stránky cph.dk** jsou dostupné, ale curl na ně dostává 403. Čtenáři v prohlížeči je normálně uvidí.
- **Tabule odletů a příletů na cph.dk** počty letů přímo neukazují. Poznámka v boxu zdrojů správně říká, že čísla jsou z databáze, která tabule plní.
- **Rejseplanen** má v odkazu pevné datum 24. 9. 2026. Po něm bude odkaz ukazovat minulou tabuli (není to chyba faktu).

## Nutné opravy

1. **3D skenery (sekce Bezpečnostní kontrola, 1. odstavec). Údaj je zastaralý.**
   Staré: „Podle březnového oznámení je měly mít všechny dráhy kontroly do léta 2026 (<a href={tzMarch}>tisková zpráva 13. 3. 2026</a>). Jestli se to stihlo, letiště na webu k 23. 9. 2026 neuvádí. S vyndáváním notebooku proto radši počítejte.“
   Nové: „Novou kontrolu s 20 drahami a 3D skenery letiště otevřelo 19. května 2026 (<a href="https://www.cph.dk/om-cph/presse/nyheder/2026/05/ny%20sikkerhedskontrol%20%C3%A5bner%20i%20k%C3%B8benhavns%20lufthavn">tisková zpráva 19. 5. 2026</a>). Limit 100 ml ale platí dál. Skenery by větší lahve zvládly, chybí jen schválení EU, které letiště čeká do konce roku.“
   (Ideálně doplnit i do boxu zdrojů: „Copenhagen Airports: tisková zpráva 19. 5. 2026 (dánsky)“.)

2. **SAS Lounge (sekce Wi-Fi, voda, úschovna a salonky, 3. odstavec). Vstup si nekoupí každý, kdo letí do Prahy.**
   Staré: „Aspire Lounge vyjde na 339 DKK a SAS Lounge u gatů C na 349 DKK, do ní smíte nejdřív tři hodiny před odletem“
   Nové: „Aspire Lounge vyjde na 339 DKK. SAS Lounge u gatů C stojí 349 DKK, vstup si ale koupíte jen s palubenkou SAS nebo jiné aerolinky aliance SkyTeam, s Norwegianem ani Ryanairem ne, a pustí vás nejdřív tři hodiny před odletem“

3. **Rozšíření T3 (sekce Terminály, 3. odstavec). Citace nesedí na zdroj.**
   Staré: „…a víc než třiceti obchody a restauracemi (<a href={tzMarch}>tisková zpráva 13. 3. 2026</a>).“
   Nové: „…a víc než třiceti obchody a restauracemi (<a href={tzMarch}>tisková zpráva 13. 3. 2026</a>, <a href={`${cph}/fremtidens-terminal`}>Fremtidens terminal</a>).“
   „Dvakrát větší“ a „víc než třicet“ jsou jen na stránce Fremtidens terminal.

4. **Norwegian v zimě (sekce Přímé lety, 2. odstavec). Leden je celý, ne jen polovina.**
   Staré: „a v polovině ledna jen dva.“
   Nové: „a od 4. do 31. ledna jen dva.“

Ostatní proměnlivé údaje (počty letů v září, zima SAS, Ryanair, ceny a dotazy na parkování, Kiss & Fly a krátké stání, salonky kromě SAS, úschovna, Wi-Fi, voda, 100 ml, 4–22 h, 2 / 2,5 / 3 h) platí i 23. 9. 2026 kolem 10:00 beze změny.
