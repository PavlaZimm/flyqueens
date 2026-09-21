# Kontrola faktů: Letiště Tivat (draft.md)

Kontrolováno 21. 9. 2026 proti `zdroje.md`, `neovereno.md`, `fotografie.md` a proti primárním zdrojům staženým týž den: AIP Montenegro AD 2 LYTV (AIRAC 3. 9. 2026), JSON sezonního řádu provozovatele (`cache-fligths-s.php?airport=tv`), stránky Airports of Montenegro (How to reach us, FAQ, No Drone Zone, Airport procedures, History, graf cestujících 2003–2024), Parking Servis Tivat (Cjenovnik 2026, Parking usluge), tisková zpráva Letiště Praha z 9. 2. 2022 a spotterguide.net. Fotografie prohlédnuty ve webových kopiích v `public/blog/`.

Stav všech externích odkazů: HTTP 200. Jediná výjimka je FAQ provozovatele, které přesměrovává na jinou adresu (viz řádek 40).

## Tabulka tvrzení

| # | Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|---|
| 1 | Titulek, meta: přímé lety Air Montenegro z Prahy a Brna | OK | JSON řád provozovatele (4O3 40/41 PRG, 42/43 BRQ) | – |
| 2 | Perex: „proč tu létadla nepřistávají po setmění“ | CHYBA (překlep) | – | „…proč tu letadla nepřistávají po setmění.“ |
| 3 | IATA TIV, ICAO LYTV | OK | AIP AD 2.1–2.2 | – |
| 4 | 4 km od centra Tivatu, jihovýchodně | OK | AIP AD 2.2 (145° GEO, 4 KM); provozovatel 4 km | – |
| 5 | „na pobřeží Boky kotorské mezi mořem a horami“ | OK (obecný popis, doložený i fotkami hor) | fotografie 28. 7. 2025; poloha AIP | Nepřidávat „50 m od pobřeží“ (viz neovereno.md). |
| 6 | Úvod: „Dráha nemá boční ani přibližovací světla, **takže** provoz se řídí denním světlem a přesnou provozní dobou“ | NEDOLOŽENO (příčinná souvislost je odvozená, AIP ji neuvádí) | AIP AD 2.3, AD 2.14 | „Dráha podle AIP nemá boční ani přibližovací světla a provoz je omezen provozní dobou. Mimo ni se smí přistávat jen za denního světla a se souhlasem provozovatele. Podrobnosti rozepisujeme níže.“ |
| 7 | Dráha 14/32, 2500 × 45 m, asfalt | OK | AIP AD 2.12 (ASPH) | – |
| 8 | Kotor 8 km / 12 min, Budva 21 km / 27 min, Bar 60 km / 1 h 19 min | OK | How to reach us | – |
| 9 | Cestující 2024: 1 124 203 | OK | graf provozovatele 2003–2024 | – |
| 10 | AIP „platné od 3. 9. 2026“ + odkaz na balík AIRAC | OK, ale odkaz brzy zastará | AIP; další AIRAC cyklus 1. 10. 2026. Starší balík už vrací 404 (zdroje.md) | Do zdrojů doplnit i stálou vstupní stránku https://smatsa.rs/upload/aip/published/start_page.html s poznámkou „aktuální vydání“. |
| 11 | „hlavně v létě bývá pobřežní silnice u Kotoru přetížená“ | NEDOLOŽENO | žádný zdroj v rešerši | Nahradit: „Časy jsou orientační a nepočítají s dopravní situací.“ |
| 12 | AIP uvádí jako dopravu jen „bus, taxi“ | OK | AIP AD 2.5 | Terminologie: AIP není „letecký předpis“, ale letecká informační příručka. Všude nahradit „letecký předpis“ → „letecká informační příručka (AIP)“. |
| 13 | Provozovatel pro Tivat nezveřejňuje autobusovou linku ani ceník taxi (na rozdíl od Podgorice) | OK (střední jistota, doloženo absencí) | How to reach us uvádí jen příjezd autem | – |
| 14 | „…domluví … přes svého dopravce“ | nejasné | – | „…přes ubytování nebo transferovou službu…“ („dopravce“ čtenář pochopí jako aerolinku). |
| 15 | Praha–Tivat: středa a pátek, 5. 6.–22. 7. a 29. 7.–30. 9. 2026 | OK | JSON řád, řádky 4O3 40/41 | – |
| 16 | Odlet z Tivatu 11:30, přílet z Prahy 15:30 | OK | JSON (AOD O 11:30, AOD I 15:30) | – |
| 17 | Brno–Tivat „lítá v sobotu, 13. 6.–19. 9. 2026“ | OK věcně, ale v den publikace je sezona Brno už za námi. „Lítá“ je hovorové. | JSON řád 4O3 42/43 | „Trasa Brno–Tivat létala v sezoně 2026 v sobotu, od 13. 6. do 19. 9. (v několika úsecích, časy se měnily).“ |
| 18 | Brno od 18. 7.: odlet z Tivatu 09:10, přílet z Brna 12:50 | OK | JSON (18 Jul–19 Sep, O 09:10 / I 12:50) | – |
| 19 | Ostrava, Pardubice ani Karlovy Vary v řádu nejsou | OK | JSON (žádné OSR/PED/KLV) | – |
| 20 | „Délku letu … provozovatel ani dopravce veřejně neuvádí“ | CHYBA (neúplné) | Tisková zpráva Letiště Praha 9. 2. 2022 uvádí řád Praha–Tivat 14:40–16:10 a Tivat–Praha 12:30–14:00, tedy 1 h 30 min, a větu, že moře je „only an hour and a half away from Prague“ | „Podle letového řádu, který v roce 2022 zveřejnilo Letiště Praha, trval let Praha–Tivat hodinu a půl (14:40–16:10). Aktuální délku letu si ověřte v rezervaci u Air Montenegro.“ Upravit i „Seznam nejistých tvrzení“. |
| 21 | „Linku Praha–Tivat ohlásilo Air Montenegro **poprvé** v únoru 2022“ | NEDOLOŽENO („poprvé“) | Tisková zpráva PRG 9. 2. 2022 neříká, že šlo o první ohlášení | „Linku Praha–Tivat ohlásilo Air Montenegro v únoru 2022…“ |
| 22 | 2022: od 14. 6., úterý a sobota, Embraer E195 pro 116 cestujících | OK | Tisková zpráva PRG („from June 14 until October“, Tuesday, Saturday, Embraer 195, 116 seats) | – |
| 23 | „v létě létají i charterové lety cestovních kanceláří … se do sezonní tabulky nedostávají“ | CHYBA (neověřené tvrzení podané jako fakt) | neovereno.md: „Charterové lety CK z ČR … Neověřeno.“ | Odstavec vypustit, nebo nahradit: „Pokud letíte se zájezdem, termín a letiště odletu vám potvrdí cestovní kancelář. Charterové lety jsme v sezonní tabulce provozovatele nenašli.“ |
| 24 | „Letiště Tivat vlastní parkoviště nemá“ | OK | FAQ provozovatele | – |
| 25 | Parkoviště je „hned vedle terminálu“ | NEDOLOŽENO (přesnější formulace existuje) | FAQ: „public toll parking next to the airport“ | „Vedle letiště funguje veřejné placené parkoviště…“ |
| 26 | Spravuje Parking Servis Tivat (2026), dlouhodobé stání se domlouvá se správcem, provozovatel neodpovídá za škody | OK | Parking usluge (Parking Aerodrom Tivat); Cjenovnik 2026; FAQ | – |
| 27 | Ceník: 2 €/započatá hodina, ležarina 15 €/den, ztracený lístek 50 €, bus/kombi/VIP 15 € se smlouvou a 30 € bez smlouvy za hodinu | OK | Cjenovnik 2026, „Posebno parkiralište Aerodrom Tivat, cijela godina“, ceny vč. 21% DPH | Volitelně pod tabulku: „Ceny platí celoročně a zahrnují 21% DPH.“ |
| 28 | Parkoviště v provozu 00:00–24:00 | OK | Parking usluge | – |
| 29 | Bezbariérová stání v první řadě nejblíže terminálu | OK | Airport procedures (PRM) | Doplnit zdroj: [Airports of Montenegro, Airport procedures](https://montenegroairports.com/en/tivat-airport/airport-procedures/) |
| 30 | „Letiště Tivat má **krátkou** provozní dobu“ | přehnané (v létě 13 h denně) | AIP AD 2.3 | „…má omezenou provozní dobu…“ |
| 31 | Provozní doba: zima 07:00–16:30 SEČ; do 10. 9. 06:30–19:30; 11.–30. 9. 06:30–19:00; od 1. 10. 07:00–18:00 | OK (přepočet z UTC sedí) | AIP AD 2.3 (0600–1530; 0430–1730; 0430–1700; 0500–1600 UTC) | – |
| 32 | Mimo provozní dobu jen za světla (SR −30 min až SS +30 min), se souhlasem, žádost před provozní dobou 96 h předem | OK | AIP AD 2.3 | – |
| 33 | Přibližovací a boční světla NIL, jen PAPI | OK | AIP AD 2.14 | – |
| 34 | Konkurence: provoz do 22:00 / „24 hodin denně“ | OK (doloženo rešerší) | neovereno.md (Zaletsi, Skrblik) | – |
| 35 | RWY 14 nepřístrojové, RWY 32 nepřesné přístrojové, LOC posunutý o 20°, VSS pronikání terénu u LOC i RNP RWY 32 | OK | AIP AD 2.12 (remarks), AD 2.19 („offset 20° from RCL“), AD 2.25 | Do citace doplnit AD 2.12: „([AIP AD 2.12, 2.19, 2.24, 2.25](…))“. |
| 36 | „…vysvětluje, proč přiblížení k Tivatu vypadá i za dne tak strmě: letadlo klesá mezi kopci k dráze sevřené mezi horami a zálivem“ | CHYBA / NEDOLOŽENO | AIP uvádí sestupové úhly PAPI 3° (RWY 14) a 3,2° (RWY 32), tedy běžné hodnoty, ne strmé přiblížení. Směr a terén přiblížení jsou podle neovereno.md neověřené. | Větu od dvojtečky vypustit. Místo ní: „Je to technický údaj pro piloty, ne důvod k obavám pro cestující.“ |
| 37 | Radar FlyQueens: „Přílety do Tivatu můžete sledovat živě“ | OK s výhradou | `src/lib/constants.ts`: region „Jihovýchodní Evropa“ (43° N, 22° E, 250 NM) Tivat pokrývá (asi 150 NM). Pokrytí ADS-B v nízké výšce u Tivatu ale nezaručujeme. | „…na radaru letadel FlyQueens (oblast Jihovýchodní Evropa). Nízko nad letištěm může signál chybět.“ |
| 38 | Interní odkazy /radar, /blog/jak-sledovat-let-podle-cisla, /letiste/praha | OK | trasy existují v `src/app/` | – |
| 39 | „Naše fotografie z 28. července 2025 ukazují, jak blízko letadlům dráha vede.“ | CHYBA (věta nedává smysl, působí jako zážitek). Stanoviště není doloženo, fotky nemají GPS. | fotografie.md | „Na našich fotografiích z 28. července 2025 je vidět, jak nízko letadla nad okolím letiště létají.“ |
| 40 | Popis fotky: silnice podél plotu, za plotem odstavná plocha s několika dopravními letadly, hory | OK s upřesněním (za plotem je nejdřív travnatý pás, pak dráha a odstavná plocha) | snímek `letiste-tivat-plot-odstavna-plocha.webp` | „…za plotem a travnatým pásem je odstavná plocha s několika dopravními letadly…“ |
| 41 | Fotka Turkish Airlines: Airbus nízko nad hlavou, ruka s plecháčkem, podvečerní obloha | OK | snímek 19:16; fotografie.md (typ Airbusu a registrace nečitelné) | Netvrdit typ (A321 apod.), „Airbus“ ponechat. |
| 42 | Hero popisek: „pohled podél dráhy k terminálu a věži“ | nepřesné | snímek: pohled podél dráhy od prahu, terminál a věž jsou vlevo, ne na konci dráhy | „pohled podél dráhy, vlevo terminál a řídicí věž, v pozadí hory, v popředí suchá tráva“ |
| 43 | Fotka easyJet: „nízko nad hlavou s vysunutým podvozkem“ (soubor `…-pristani.webp`) | OK (popisek). Název souboru naznačuje přistání, což je neověřené. | fotografie.md | Alt a popisek neutrálně: „Airbus easyJet s vysunutým podvozkem nízko nad okolím letiště“. Nepsat „přistává“. |
| 44 | Spotterská místa: „čerpací stanice u příjezdové silnice“, silnice k okružní křižovatce u prahu 32, parkoviště u stání business jetů; spotterguide.net (2024), neověřeno | OK s upřesněním | spotterguide.net: Spot #1 je čerpací stanice za okružní křižovatkou („At the roundabout take the third exit“). Stránka uvádí „Last Update: September 2024“. | „čerpací stanice za okružní křižovatkou“. V Seznamu zdrojů opravit „aktualizace 21. 10. 2024“ na „aktualizace 9/2024“ (tak to uvádí stránka). |
| 45 | Drony: v noci a u letišť absolutně zakázáno, vizuální dohled do 500 m, max. 150 m, nad 0,5 kg evidence u Agentury | OK | No Drone Zone („Apsolutno je zabranjeno letenje noću i u blizini aerodroma…“, 500 m, 150 m, „masu veću od pola kilograma“, evidence zdarma) | Volitelně: „…se bezplatně evidují…“ |
| 46 | FAQ: rekord 2019 1 367 282, 2020 necelých 190 tis. | OK | graf provozovatele (189 815) | „rekordní zatím zůstává“ → „rekordem v grafu provozovatele (2003–2024) je rok 2019…“ (data za 2025 provozovatel nezveřejnil). |
| 47 | FAQ: „Přes 80 procent ročního provozu … připadá na letní sezonu“ | NEDOLOŽENO pro současnost | History: výrok bez data, v kontextu roku 2006 | „Podle historického přehledu provozovatele připadalo na letní turistickou sezonu přes 80 procent provozu.“ |
| 48 | FAQ: „aktuálně (od 11. do 30. 9. 2026) 06:30–19:00“ | OK, rychle zastará | AIP AD 2.3 | Ponechat datum. Po 1. 10. 2026 aktualizovat na 07:00–18:00. |
| 49 | FAQ drony: „Provozovatel označuje okolí letiště za bezdronovou zónu“ | OK (stránka se jmenuje No Drone Zone) | No Drone Zone | – |
| 50 | Odkaz FAQ provozovatele `/en/airports-of-montenegro/frequently-asked-questions/` | funkční jen přes přesměrování | 301 → `/en/airports-of-montenegro/general-information/frequently-asked-questions/` | Nahradit URL cílovou adresou (v textu i v Seznamu zdrojů). |
| 51 | Vymyšlené zážitky / osobní zkušenost | OK, kromě ř. 39 | Text nepopisuje návštěvu nad rámec data a obsahu fotek. | viz ř. 39 |
| 52 | Nejistá tvrzení: čísla letů 4O340/341, 4O342/343 „odvozená“ | OK. Nově podpořeno: PRG 2022 uvádí MNE341/340. | JSON (FLC 4O3 + FLN 40–43); PRG 2022 | V poznámce lze doplnit „Letiště Praha v roce 2022 uvedlo čísla MNE340/341“. |

## Shrnutí nutných oprav

1. Vypustit odstavec o charterových letech CK (ř. 23). Je v neovereno.md a v textu stojí jako fakt.
2. Vypustit tvrzení o „strmém“ přiblížení mezi kopci (ř. 36). AIP uvádí PAPI 3° a 3,2°.
3. Opravit větu „fotografie ukazují, jak blízko letadlům dráha vede“ (ř. 39).
4. Délka letu (ř. 20): Letiště Praha 2022 uvádí 1 h 30 min (14:40–16:10). Formulaci „nikdo neuvádí“ opravit.
5. Úvod (ř. 6): neuvádět, že chybějící světla *způsobují* denní provoz. Obě fakta podat zvlášť.
6. Brno (ř. 17): sezona skončila 19. 9. 2026, převést do minulého času.
7. Vypustit „pobřežní silnice u Kotoru bývá přetížená“ (ř. 11).
8. „Poprvé ohlásilo“ → „ohlásilo“ (ř. 21).
9. „Hned vedle terminálu“ → „vedle letiště“ (ř. 25). „Krátkou“ → „omezenou“ provozní dobu (ř. 30).
10. Kvóta 80 % v FAQ opatřit výhradou, že jde o historický údaj (ř. 47).
11. Popisek hero fotky: terminál a věž jsou vlevo, ne na konci dráhy (ř. 42). U easyJet nepsat „přistání“ (ř. 43).
12. URL FAQ nahradit cílovou adresou po přesměrování (ř. 50). U spotterguide opravit datum na 9/2024 (ř. 44).
13. Překlep „létadla“ v perexu (ř. 2). „Letecký předpis“ → „letecká informační příručka (AIP)“ (ř. 12).
