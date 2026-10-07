# Kontrola faktů: Letiště Treviso (`src/app/blog/letiste-treviso/page.tsx`)

Kontrolováno 7. 10. 2026 proti `zdroje.md`, `neovereno.md`, `fotografie.md`, `serp.md` a proti primárním zdrojům znovu staženým týž den:

- ATVO, jízdní řád linky 351 (PDF `351_agg.29.09.2026.pdf`, `pdftotext -layout` a navíc vykreslené stránky PDF kvůli poznámkám „fino al / dal“ nad sloupci), stránka ATVO Treviso Airport Bus Express,
- MOM, Treviso AirLink (`mobilitadimarca.it/p/linee-e-orari/treviso-airbus`),
- Trenitalia, Treviso AirLink,
- Ryanair JSON: `timtbl` PRG→TSF a TSF→PRG za 10, 11 a 12/2026, BRQ/OSR/PED/KLV/VIE→TSF za 11/2026, `searchWidget/routes` pro TSF a PRG,
- Assaeroporti, tabulky „PASSEGGERI GENNAIO – agosto 2026“ a „DEL MESE agosto 2026“ (Fonte: Aeroporti 2030),
- NOAA aviationweather.gov, záznam letiště LIPH (`/api/data/airport?ids=LIPH`).

Web provozovatele trevisoairport.it vrací pro curl i WebFetch 403. Jeho údaje jsem převzal ze `zdroje.md` (čteno v prohlížeči 7. 10. 2026) a znovu je ověřit nešlo. Tam, kde článek tvrdí víc, než zaznamenává `zdroje.md`, vedu tvrzení jako NEDOLOŽENO. Fotografie jsem prohlédl ve webových kopiích v `public/blog/`.

Stavy: **OK** = sedí se zdrojem. **CHYBA** = v rozporu se zdrojem. **ROZPOR** = zdroj sice sedí, ale pro období, ve kterém článek vychází, už neplatí, nebo si odporují dvě místa článku. **NEDOLOŽENO** = ve výzkumné stopě ani v primárním zdroji to není.

## Tabulka tvrzení

| # | Tvrzení v článku | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|---|
| 1 | Meta title „Letiště Treviso: lety z Prahy, doprava a parkování 2026“ | OK | – | – |
| 2 | Meta description: „Ryanair z Prahy denně, autobusy do Benátek a Trevisa, ceník parkování 2026 a kdy otevírá terminál. S vlastními fotkami.“ | OK s drobnou výhradou („denně“, 25. 12. se nelétá) | Ryanair timtbl 12/2026 (chybí 25. 12.) | Volitelně „Ryanair z Prahy téměř denně…“. Výňatek v `blog.ts` už má „téměř každý den“. |
| 3 | Perex: Ryanair z Prahy nelétá na Marco Polo, ale do Trevisa, prodává ho jako „Venice Treviso“ | OK | routes PRG (TSF „Venice Treviso“, VCE v seznamu není) | – |
| 4 | Perex: „z Prahy sem v říjnu až prosinci 2026 létá každý den“ | ROZPOR s tělem (25. 12. se nelétá, tělo to uvádí) | timtbl 12/2026: dny 1–24 a 26–31 | „…létá v říjnu až prosinci 2026 každý den kromě 25. prosince.“ |
| 5 | Perex: autobus do Benátek asi 40 minut, do Trevisa na nádraží 10 minut | OK | ATVO (Benátky 40 min), MOM (10 min) | – |
| 6 | Tabulka: IATA TSF, ICAO LIPH (i JSON-LD `icaoCode`) | OK (LIPH nově doloženo) | Ryanair API (TSF); NOAA aviationweather.gov: `icaoId LIPH, iataId TSF, TREVISO AIRPORT` | Do `zdroje.md` doplnit NOAA jako zdroj ICAO a v `neovereno.md` přesunout LIPH mezi ověřené. Text beze změny. |
| 7 | Tabulka: provozovatel AER TRE, skupina SAVE (spravuje i Benátky, Veronu a Brescii) | OK | zdroje.md, patička webu provozovatele | – |
| 8 | Tabulka: Ryanair denně, 1 h 20 min | OK | timtbl: ve všech dnech 80 min v obou směrech | – |
| 9 | Tabulka: ATVO do Piazzale Roma 40 min; AirLink 10 min, 5 € | OK | ATVO stránka i PDF; MOM | – |
| 10 | Tabulka: terminál otevřený od 5:00 do posledního letu | OK | zdroje.md (FAQ služby) | – |
| 11 | Tabulka a text: cestující leden–srpen 2026 2 192 520 (+0,8 %), Benátky 8 675 577 | OK | Assaeroporti, „PASSEGGERI GENNAIO – agosto 2026“: Treviso 2.192.520 / 0,8; Venezia 8.675.577 | – |
| 12 | Popisek pod tabulkou: zdroje a „stav k 7. 10. 2026“ | OK | – | Odkaz na Assaeroporti `/statistiche/` přesměrovává na `/dati-di-traffico/`, viz odkazy. |
| 13 | Hero foto, ALT: „Airbus Wizz Air u stání na letišti Treviso, kolem vozíky na zavazadla, v pozadí další Wizz Air“ | OK | snímek: Airbus A320 Wizz Air u stání, schody, pás na zavazadla, vozíky, v pozadí rolující Wizz Air, hangáry a věž | – |
| 14 | Hero popisek: „při odbavení, v pozadí další letadlo Wizz Air a hangáry“, 25. 5. 2026 | OK | snímek, fotografie.md (datum z názvu souboru) | – |
| 15 | Linka PRG–TSF každý den po zbytek října, v listopadu i prosinci, výjimka 25. 12. | OK | timtbl 10/2026 dny 7–31, 11/2026 dny 1–30, 12/2026 bez 25. 12. (oba směry) | – |
| 16 | „Některé dny, v listopadu víc než polovinu, jsou v řádu dva lety“ | OK | timtbl 11/2026: 17 z 30 dní dva lety (říjen od 7. 10.: 6 dní, prosinec: 15 dní) | – |
| 17 | Let 1 h 20 min, Itálie má stejný čas jako Česko | OK | timtbl | – |
| 18 | Říjen: odlety z Prahy 6:15–20:10 | OK | timtbl PRG→TSF 10/2026 (od 7. 10.) min. 06:15, max. 20:10 | – |
| 19 | Hlavní spoj FR 1530 / FR 1531, druhý let FR 7943 / FR 7944 | OK | timtbl: FR 1530 i 1531 jsou v každém dni, 7943/7944 jen ve dnech se dvěma lety | – |
| 20 | 7. 10. FR 1530 přílet 15:35, FR 1531 odlet 16:00 | OK | tabule letiště podle zdroje.md; shoduje se s timtbl 7. 10. (1530 14:15–15:35, 1531 16:00–17:20) | – |
| 21 | Z Brna, Ostravy, Pardubic ani Karlových Varů Ryanair v listopadu 2026 nelétá, z Vídně ano | OK | timtbl BRQ/OSR/PED/KLV→TSF 11/2026 prázdné, VIE→TSF FR 51 | – |
| 22 | ATVO 351 „Treviso Airport Bus Express“, Mestre 30 min, Piazzale Roma 40 min | OK | ATVO stránka („Mestre in just 30 minutes and Venice in just 40“), PDF | – |
| 23 | „Do centra Benátek auta ani autobusy nevjedou, z Piazzale Roma pokračujete pěšky nebo vaporettem“ | OK věcně, ale odkaz vede jinam | zdroje.md: blog ATVO 31. 3. 2026. Citace v článku ukazuje na stránku linky 351, kde to není. | Za větu dát odkaz na blog ATVO (https://www.atvo.it/en/blog/how-to-get-to-venice-from-treviso-airport-best-options) a přidat ho i do Seznamu zdrojů. |
| 24 | Jízdní řád platí 10. 8.–24. 10. 2026. Odjezdy z letiště nejsou v taktu, navazují na přílety, při zpoždění se posouvají, při zrušení letů se ruší. | OK | PDF: „Flights arrival can affect the departure times“, „service will be suspended in case of flight cancellation“ | – |
| 25 | Tabulka ATVO: z letiště první 7:45, poslední „podle dne 21:30–22:30“ | **ROZPOR** (pro dobu platnosti článku) | PDF str. 2: středeční 22:30 má poznámku „fino al 30/09“. Od 1. 10. je poslední středeční spoj 21:50. Pro 7.–24. 10. platí: Po 22:00, Út 21:45, St 21:50, Čt 22:20, Pá 21:30, So 22:20, Ne 22:20. (V `zdroje.md` je navíc chybně „So 22:20 s poznámkou fino al 26/09“, poznámka ale patří ke spojům 17:30 a 20:30.) | V tabulce „podle dne 21:30–22:20“. V `zdroje.md` opravit St na 21:50 (22:30 jen do 30. 9.) a u soboty poznámku. |
| 26 | Tabulka ATVO na letiště: první 4:20 (na letišti 5:00), poslední 18:00 nebo 18:30, na letišti o 40 minut později | OK | PDF str. 1: Po/St/Pá 18:00, Út/Čt/So/Ne 18:30. Poznámky „fino al / dal“ se týkají jen spojů 13:00–17:30. | – |
| 27 | Pod tabulkou: „Od 25. 10. 2026 platí nový řád.“ | NEDOLOŽENO | PDF uvádí jen platnost do 24. 10. Nový řád jsme neviděli, ATVO ho nezveřejnilo. | „Po 24. 10. 2026 si ověřte nový jízdní řád na webu ATVO.“ |
| 28 | „Pokud letíte později, **zbývá** vlak z Benátek do Trevisa a odtud AirLink… do 22:23“ | nepřesné (článek o odstavec níž sám uvádí Barzi Service, k tomu taxi) | MOM 22:23 OK. Jízdní řád Barzi a vlaků neověřen (neovereno.md). | „Pokud letíte později, můžete jet vlakem z Benátek do Trevisa a odtud AirLinkem (popsaný níže), který z nádraží jezdí do 22:23. Jinou možností je autobus Barzi Service nebo taxi, jejich časy jsme neověřovali.“ |
| 29 | Trenitalia prodává vlak a AirLink na jedné jízdence, příplatek 5 € | OK | Trenitalia („€ 5,00, costo che verrà aggiunto…“), MOM (AirLink přes Trenitalia jen jako vlak + bus) | – |
| 30 | Prodej jízdenek ATVO: online, automat ve výdeji zavazadel, pokladna v příletové hale, v Benátkách pokladna na Piazzale Roma | OK | ATVO stránka | – |
| 31 | „Cenu jsme na webu ATVO nenašli, **zobrazí se až v e-shopu dopravce**.“ | NEDOLOŽENO (druhá polovina) | neovereno.md: e-shop webticketing.atvo.it „jsme neprocházeli“. Cena na stránce ATVO ani v PDF není (ověřeno znovu). | „Cenu jsme na webu ATVO nenašli. Ověřte si ji při nákupu v e-shopu nebo v pokladně ATVO.“ |
| 32 | Barzi Service: letiště, nádraží Venezia Mestre, Tronchetto | OK | zdroje.md (stránka letiště Transport, barziservice.com) | Volitelně doplnit barziservice.com do Seznamu zdrojů. |
| 33 | Foto nástup, ALT: „Boeing 737 Ryanair zepředu, cestující nastupují po schodech s logem AER TRE“ | OK | snímek: příď 737, cestující stoupají po pojízdných schodech s logem AER TRE | – |
| 34 | Popisek: „po pojízdných schodech. Logo AER TRE… patří provozovateli letiště.“ | OK | snímek (schody s kabinou řidiče), patička webu provozovatele | – |
| 35 | AirLink: 10 minut, každých 30 minut, z letiště 6:10–22:40, z nádraží 5:53–22:23 | OK | MOM | – |
| 36 | „Odpoledne **jeden spoj** vypadne, z letiště po 14:10 jede další až v 15:40“ | **CHYBA** | MOM: z letiště chybí 14:40 i 15:10 (14:10 → 15:40), z nádraží 14:23 i 14:53 (13:53 → 15:23). Vypadnou dva spoje v každém směru, mezera je 90 minut. Chyba je i v `zdroje.md` („chybí odjezd 14:40“, „chybí odjezd 14:23“). | „Odpoledne je hodinu a půl pauza: z letiště jede po 14:10 další autobus až v 15:40, z nádraží po 13:53 až v 15:23.“ Opravit i `zdroje.md`. |
| 37 | Jízdenka 5 €, 24 h od prvního označení, celá městská síť Trevisa | OK | MOM („Valido 24 ore dalla prima convalida“, „tutta la rete urbana di Treviso“) | Volitelně: digitální jízdenka v aplikaci MOMUP platí 24 h od nákupu. |
| 38 | Bezkontaktně kartou nebo telefonem v autobusu; děti do 4 let s platícím dospělým zdarma | OK | MOM (Tap to pay: karta, smartphone, wearable; „fino al compimento dei 4 anni“) | – |
| 39 | Zavazadlo do 12 kg a 55 × 50 × 25 cm zdarma, větší 2 € předem, 4 € v autobusu | OK | MOM | – |
| 40 | Zastávky na Via Noalese u pěší lávky | OK | MOM | – |
| 41 | Trenitalia uvádí 15 minut a odjezdy z letiště do 23:10 | OK | Trenitalia („in soli 15 minuti“, „dalle ore 06.40 alle ore 23.10“) | – |
| 42 | Linka MOM 6, MOM do Padovy, Nomago do Slovinska | OK | zdroje.md (stránka Transport) | – |
| 43 | Taxi u vchodu v přízemí, Radio Taxi Treviso nonstop +39 0422 431515, řidič s vozem přes Uber | OK | zdroje.md (FAQ doprava) | – |
| 44 | Parkoviště provozuje Marco Polo Park, „**stejná firma jako u letiště v Benátkách**“ | NEDOLOŽENO (druhá část) | zdroje.md jen „Provozovatel parkovišť: Marco Polo Park srl“. Benátky jsou v neovereno.md jen jako dohad. veniceairport.it vrací curl 403. | Vypustit „stejná firma jako u letiště v Benátkách“, nebo to ověřit na webu letiště Benátky a uložit do zdroje.md. |
| 45 | „Ceník na stránce letiště uvádí sazby **při platbě na místě**“ | NEDOLOŽENO (výklad) | zdroje.md: ceník na stránce + zmínka o „discounted web rates“. Že jde o sazby na místě, stránka podle záznamu výslovně neříká. | „Ceník na stránce letiště uvádí základní sazby. Při rezervaci online slibuje letiště zvýhodněné ceny podle termínu.“ Hlavičku sloupce „Cena na místě“ změnit na „Cena podle ceníku“, totéž ve FAQ (ř. 63). Pokud stránka „na místě“ uvádí, zapsat citaci do zdroje.md. |
| 46 | Ceník A, B, F, G, D, E + Low Cost a polohy | OK | zdroje.md (parking/info) | – |
| 47 | C: 5 € za den, s výzvou ověřit v rezervaci | OK (výslovně ošetřená výjimka z neovereno.md) | zdroje.md, neovereno.md | – |
| 48 | Pod tabulkou: „Denní sazba platí za každý započatý den.“ | NEDOLOŽENO | zdroje.md uvádí „započatou hodinu“ jen u A. O započatém dni nic neuvádí. | Vypustit, nebo doložit citací z ceníku. |
| 49 | „Při rezervaci online kamera u vjezdu načte SPZ **a závora se otevře sama, žádné tlačítko nemačkejte**.“ | NEDOLOŽENO (druhá část) | zdroje.md: jen „Rezervace se pozná podle SPZ kamerou 3 h před a 3 h po“ | „Při rezervaci online kamera u vjezdu rozpozná SPZ.“ Zbytek doplnit jen s citací ze stránky. |
| 50 | Rezervace platí 3 h před až 3 h po rezervovaném čase příjezdu | OK | zdroje.md | – |
| 51 | „Na vysazení a vyzvednutí je **určené** parkoviště A“ | OK s upřesněním | zdroje.md: „vhodné k vysazení a vyzvednutí“ | „…se hodí parkoviště A…“ |
| 52 | ZTP zdarma, ověření v informacích v odletové hale „s originálem průkazu a dokladem totožnosti“ | NEDOLOŽENO (doklady) a terminologie | zdroje.md: jen „zdarma po validaci v Info Desku odletů (FAQ)“. FAQ italského letiště podle všeho mluví o parkovacím průkazu pro osoby se zdravotním postižením (EU), ne o českém průkazu ZTP. | „Držitelé parkovacího průkazu pro osoby se zdravotním postižením parkují zdarma, průkaz si musí nechat ověřit v informacích v odletové hale.“ Doklady doplnit jen s citací z FAQ. |
| 53 | Terminál od 5:00, zavírá po posledním letu kolem půlnoci, spát se nesmí | OK | zdroje.md (FAQ služby) | – |
| 54 | První autobus ATVO z Benátek je na letišti v 5:00 | OK | PDF str. 1 (4:20 → 5:00 všechny dny) | – |
| 55 | „Terminál je jeden.“ | NEDOLOŽENO (nízké riziko) | ve zdroje.md výslovně není | Doplnit do zdroje.md (např. stránka letiště nebo plánek), jinak větu vypustit. |
| 56 | Odlety v 1. patře, brány za kontrolou, přílety v přízemí; Wi-Fi a nabíjení zdarma, bankomaty, půjčovny aut v přízemí | OK | zdroje.md (FAQ) | – |
| 57 | Automatické brány pasové kontroly pro lety mimo Schengen, od 12 let, biometrický pas EU (odkaz `/flights/info`) | **NEDOLOŽENO** | Ve `zdroje.md` ani jinde ve výzkumné stopě to není, stránka `/flights/info` nebyla zaznamenána. Věková hranice e-gate se na italských letištích liší (12 nebo 14 let). | Zapsat do zdroje.md přesné znění ze stránky `/flights/info`, nebo větu vypustit. |
| 58 | Foto pod střechou, ALT: „Boeing 737 Ryanair na stání u letiště Treviso, pohled zpod střechy terminálu“ | OK s výhradou | snímek: 737-800 Ryanair, schody u předních dveří, tažné vozidlo PB3, druhé kryté schody stranou, nahoře přesah střechy. Že jde o střechu terminálu, plyne jen z fotografie.md, ze snímku samého ne. | Neutrálněji: „…pohled zpod přesahu střechy“. Popisek „s přistavenými schody“ OK. |
| 59 | Odletová tabule 7. 10. odpoledne: Ryanair 12 odletů, Wizz Air 3 (Iaşi, Skopje, Tirana) | OK (jeden den) | zdroje.md (tabule 14:15) | Volitelně „…zbývalo na odletové tabuli…“, protože jde o odlety od 14:15 do konce dne. |
| 60 | Ryanair má z Trevisa 42 cílových letišť | OK | routes TSF: 42 letišť | Do Seznamu zdrojů doplnit JSON tras Ryanairu (TSF, PRG). Je zdrojem i pro „Venice Treviso“. |
| 61 | FAQ: Benátky mají Marco Polo, Treviso 40 min ATVO, „Venice Treviso“, obě letiště skupiny SAVE | OK | ATVO, Ryanair, patička provozovatele | – |
| 62 | FAQ: AirLink 5 €, 24 h i v městské dopravě, 10 minut | OK | MOM | – |
| 63 | FAQ: týden na D 7 × 15 € = 105 €; E, F, G, Low Cost 20 €/den, týden 140 € | OK početně (7 × 15 = 105, 7 × 20 = 140). Nesoulad s tělem: FAQ vynechává C (5 €/den = 35 €/týden), které je v ceníku nejlevnější. | ceník podle zdroje.md | „Podle ceníku vyjde týden na parkovišti D na 7 × 15 €, tedy 105 €. Na E, F, G a Low Cost stojí den 20 €, týden 140 €. Parkoviště C má v ceníku 5 € za den, tuto cenu si ale ověřte v rezervaci. Online rezervace může být levnější.“ (Viz i ř. 45: „na místě“ vypustit.) |
| 64 | FAQ: let 1 h 20 min v obou směrech | OK | timtbl | – |
| 65 | „**Den před odletem** si můžete letadlo, které vás poveze, najít na radaru.“ | NEDOLOŽENO / zavádějící | Konkrétní letadlo se lince přiděluje až v den letu a radar ukazuje jen živý provoz. | „V den odletu můžete na radaru sledovat letadla nad Prahou a severní Itálií.“ Nebo: „V den odletu si na radaru ověříte, kde je letadlo, které vás poveze.“ |
| 66 | Seznam zdrojů a poznámka „Zdroje ověřeny 7. října 2026…“ | OK | – | Doplnit ATVO blog (ř. 23), Ryanair routes JSON (ř. 60), Barzi Service (ř. 32). Assaeroporti URL nahradit cílovou adresou (viz odkazy). |
| 67 | JSON-LD: Article, Airport (název, TSF, LIPH, sameAs), 3 obrázky, BreadcrumbList | OK | – | – |
| 68 | Věci z neovereno.md (cena ATVO 12/22 €, vzdálenosti v km, vlak 4,05 €, 6 000 míst, dráha, vojenská část, Wizz Air z ČR) | OK, v článku nejsou | neovereno.md | – |
| 69 | Výňatek v `blog.ts` („téměř každý den“, „kdy jede poslední autobus na letiště“) a imageAlt | OK | – | – |

## Stav odkazů (curl s běžným user-agentem, 7. 10. 2026)

| Odkaz | HTTP | Poznámka |
|---|---|---|
| https://www.trevisoairport.it/en_gb/ | 403 | blokuje roboty, v prohlížeči funguje (zdroje.md) |
| https://www.trevisoairport.it/en_gb/transport | 403 | blokuje roboty, v prohlížeči funguje |
| https://www.trevisoairport.it/en_gb/parking/info | 403 | blokuje roboty, v prohlížeči funguje (WebFetch také 403) |
| https://www.trevisoairport.it/en_gb/assistance/faqs-services | 403 | blokuje roboty, v prohlížeči funguje |
| https://www.trevisoairport.it/en_gb/assistance/faqs-transport-from-to-airport | 403 | blokuje roboty, v prohlížeči funguje |
| https://www.trevisoairport.it/en_gb/flights/arrivals | 403 | blokuje roboty, v prohlížeči funguje |
| https://www.trevisoairport.it/en_gb/flights/info | 403 | blokuje roboty. Ve zdroje.md není záznam, že byla stránka otevřena (viz ř. 57). |
| https://www.atvo.it/en/services-provided/airport-services/treviso-airport-bus-express | 200 | – |
| https://www.atvo.it/assets/bus_routes/351_agg.29.09.2026.pdf | 200 | Stránka ATVO odkazuje na stejný soubor. Po 24. 10. se nejspíš změní název PDF. |
| https://mobilitadimarca.it/p/linee-e-orari/treviso-airbus | 200 | – |
| https://www.trenitalia.com/it/regionale/collegamenti-regionale/treviso-airlink.html | 200 | – |
| https://www.ryanair.com/api/timtbl/3/schedules/PRG/TSF/years/2026/months/11 | 200 | JSON |
| https://assaeroporti.com/statistiche/ | 200 přes přesměrování | Přesměrovává na https://assaeroporti.com/dati-di-traffico/. Doporučuji odkaz nahradit cílovou adresou. |
| Interní: /letiste/praha, /blog/jak-sledovat-let-podle-cisla, /radar, /blog/prirucni-zavazadlo-ryanair, /blog/prirucni-zavazadlo-do-letadla, /blog/letiste-tivat | trasy existují v `src/app/` | – |

## Shrnutí nutných oprav

1. **AirLink (ř. 36), CHYBA:** odpoledne nevypadne jeden spoj, ale dva v každém směru (z letiště 14:40 a 15:10, z nádraží 14:23 a 14:53). Opravit i `zdroje.md`.
2. **ATVO, poslední spoj z letiště (ř. 25), ROZPOR:** od 1. 10. platí „21:30–22:20“, ne „21:30–22:30“. Středeční 22:30 jezdil jen do 30. 9. Opravit i `zdroje.md` (středa, poznámka u soboty).
3. **E-gate pasové kontroly (ř. 57):** chybí ve výzkumné stopě. Doložit citací do zdroje.md, nebo vypustit.
4. **„Od 25. 10. platí nový řád“ (ř. 27)** → „po 24. 10. si ověřte nový jízdní řád“.
5. **„Cena se zobrazí až v e-shopu“ (ř. 31)**: e-shop jsme neprocházeli, přeformulovat.
6. **Parkování, nedoložené detaily:** „stejná firma jako v Benátkách“ (ř. 44), „sazby při platbě na místě“ (ř. 45 a FAQ), „denní sazba za každý započatý den“ (ř. 48), „závora se otevře sama, nemačkejte tlačítko“ (ř. 49), „originál průkazu a doklad totožnosti“ a termín ZTP (ř. 52). Vypustit, nebo doplnit citace do zdroje.md.
7. **Perex „každý den“ (ř. 4)** sladit s tělem: „kromě 25. prosince“.
8. **„Zbývá vlak“ (ř. 28)**: zmínit i Barzi Service a taxi.
9. **FAQ parkování (ř. 63)**: zmínit C s výhradou, aby FAQ a tabulka nepůsobily rozporně.
10. **Radar (ř. 65)**: „den před odletem“ letadlo najít nejde, přepsat na den odletu.
11. **Drobnosti:** odkaz u věty o Benátkách bez aut vést na blog ATVO (ř. 23). „Určené“ → „hodí se“ u parkoviště A (ř. 51). „Terminál je jeden“ doložit (ř. 55). ALT třetí fotky neutrálněji (ř. 58). Doplnit zdroje (ATVO blog, Ryanair routes, Barzi, NOAA pro LIPH). Assaeroporti URL na `/dati-di-traffico/`.

Čísla, která sedí: Ryanair (denní provoz, 25. 12. bez letu, 17 z 30 listopadových dní se dvěma lety, 6:15–20:10, 1 h 20 min, čísla letů, 7. 10. 15:35/16:00), 42 tras, Brno/Ostrava/Pardubice/KV prázdné, Vídeň ano, Assaeroporti 2 192 520 (+0,8 %) a 8 675 577, ATVO 7:45 / 4:20 → 5:00 / 18:00–18:30, AirLink 5 €, 10 min, 6:10–22:40 a 5:53–22:23, zavazadla, děti, Trenitalia 15 min a 23:10, dopočty 7 × 15 = 105 a 7 × 20 = 140.
