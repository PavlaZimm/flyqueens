# Letiště Lipsko: kontrola faktů draftu

Kontrolovaný soubor: `Vyzkum/letiste-lipsko/draft.md`. Kontrola proběhla 21. 9. 2026 proti souborům `zdroje.md`, `neovereno.md` a `fotografie.md` a proti primárním zdrojům online. WebFetch vracel u leipzig-halle-airport.de a mdf-ag.com chybu 403, proto jsem stránky stáhla přes curl s prohlížečovým User-Agentem. Všechny níže uvedené URL vracely 21. 9. 2026 kód 200.

Draft jsem nepřepisovala. Stav: **OK** = zdroj to říká. **CHYBA** = zdroj říká něco jiného, nebo je tvrzení zavádějící. **NEDOLOŽENO** = opora v podkladech ani v primárním zdroji chybí.

## Terasa, prohlídky a incident s dronem (hlavní body)

Co primární zdroje k 21. 9. 2026 doslova uvádějí:
- **Terasa** (`/freizeitangebote/`): „Liebe Gäste, die Aussichtsterrasse bleibt vorübergehend für den Besucherverkehr geschlossen. Wir bitten um Verständnis.“ **Důvod ani datum stránka neuvádí.**
- **Prohlídky** (`/fuehrungen/`): „vor dem Hintergrund des aktuellen Vorfalls am Flughafen Leipzig/Halle und der weiterhin laufenden Untersuchungen haben wir uns entschieden, Besucherführungen vorsorglich vorübergehend auszusetzen.“ Stránka odkazuje na prohlídky na letišti Drážďany a slibuje informovat „über unsere Kanäle“. **Slovo dron ani datum na stránce nejsou.**
- **Tisková zpráva MFAG ze 6. 8. 2026**: přerušení provozu ve 00:05, od 01:55 provoz na severní dráze, jižní dráha uvolněna **5. 8. 2026 v 18:46**. Vyšetřují Generalstaatsanwaltschaft Dresden a LKA Sachsen. Osobní dopravu to kvůli nočnímu omezení nezasáhlo, výjimkou bylo jedno zpožděné letadlo Marabu, které přistálo v Norimberku. **Terasu ani prohlídky zpráva nezmiňuje.**
- Archiv (Wayback) nemá snímek stránky terasy z července ani srpna 2026. Kdy terasa zavřela, tedy doložit nelze.

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Perex: „Vyhlídková terasa a prohlídky jsou k 21. 9. 2026 zavřené kvůli vyšetřování incidentu s dronem z počátku srpna.“ | CHYBA | /freizeitangebote/, /fuehrungen/ | „K 21. 9. 2026 je vyhlídková terasa podle webu letiště dočasně zavřená a prohlídky jsou pozastavené. U prohlídek letiště uvádí jako důvod „aktuální incident“ a probíhající vyšetřování.“ |
| „Letiště to zdůvodňuje probíhajícím vyšetřováním po pozorování dronu v noci na 5. srpna 2026 a termín znovuotevření neuvádí“ (citován zdroj mdf-ag drone TZ + /fuehrungen/) | CHYBA | tamtéž | „Terasa je podle webu letiště dočasně zavřená, důvod letiště neuvádí. Prohlídky pozastavilo ‚preventivně a dočasně‘ kvůli ‚aktuálnímu incidentu‘ a probíhajícímu vyšetřování. Termín obnovení neuvádí ani u jednoho. Tisková zpráva letiště ze 6. 8. 2026 popisuje pozorování dronu v noci na 5. srpna, terasu ani prohlídky ale nezmiňuje.“ Z citací u tohoto odstavce odstranit odkaz na drone TZ, nebo ho přesunout jen k větě o dronu. |
| „Toho večera letiště … krátce přerušilo provoz.“ | CHYBA | MFAG TZ 6. 8. 2026 | „V noci na 5. srpna 2026 letiště kvůli pozorovanému dronu v 0:05 zastavilo letový provoz.“ (Nešlo o večer. Úplné přerušení trvalo 1 h 50 min.) |
| „Ve 0:05 se přešlo na severní dráhu“ | CHYBA | MFAG TZ 6. 8. 2026 | „Od 1:55 se znovu létalo po severní dráze.“ |
| „jižní byla uvolněna až v 18:46 následujícího dne“ | CHYBA | MFAG TZ 6. 8. 2026 | „jižní dráhu letiště uvolnilo 5. srpna v 18:46.“ (Stalo se to týž den.) |
| Vyšetřují Generalstaatsanwaltschaft Dresden a LKA Sachsen | OK | MFAG TZ 6. 8. 2026 | – |
| Osobní dopravu to zasáhlo minimálně: jedno letadlo Marabu mělo zpoždění a přistálo v Norimberku | OK | MFAG TZ 6. 8. 2026 | Volitelně doplnit důvod: „díky nočnímu omezení osobních letů“. |
| FAQ: „Letiště ji uzavřelo spolu s prohlídkami kvůli vyšetřování incidentu s dronem z 5. srpna 2026“ | CHYBA | /freizeitangebote/, /fuehrungen/ | „Ano, ale k 21. 9. 2026 je podle webu letiště dočasně zavřená a termín otevření letiště neuvádí. Pozastavené jsou i prohlídky, podle letiště kvůli nedávnému incidentu a probíhajícímu vyšetřování.“ |
| Meta a perex karty: „Terasa je teď dočasně zavřená.“ | OK | /freizeitangebote/ | Nejlépe doplnit datum: „(stav k 21. 9. 2026)“. |
| Terasa za běžného provozu: střecha správní budovy, 30 m, 200 m², asi 80 lidí, P1/P3 | OK | /freizeitangebote/ | – |
| „vstupné bylo 2 eura“ | OK (formulace) | /freizeitangebote/ („Der Eintritt kostet 2 Euro“) | „za běžného provozu stojí vstup 2 eura na osobu“. Minulý čas naznačuje, že se cena změnila, a to zdroj neříká. |
| Pozastavené jsou Airport-Tour, noční i dětské túry; letiště odkazuje na prohlídky v Drážďanech | OK | /fuehrungen/ („Besucherführungen“ obecně) | – |
| „po srpnovém incidentu to na Lipsku platí obzvlášť přísně“ (drony) | NEDOLOŽENO | žádný | Vypustit. Nebo napsat jen: „V okolí letišť je létání s drony v Německu omezené, vlastní dron na letiště nevozte.“ Omezení samo je v podkladech bez zdroje. Buď doplnit primární zdroj (LuftVO § 21h / DFS), nebo formulovat bez podrobností. |
| „ostraha je teď zvýšená“ | NEDOLOŽENO | jen sekundární dpa/aero.de (neovereno.md: nepoužívat) | „…konkrétní místa u plotu záměrně neuvádíme, situace po srpnovém incidentu se může kdykoli změnit.“ |
| Telefon +49 341 224-1414 k ověření stavu terasy a prohlídek | OK | /fuehrungen/ (Besucherservice) | – |

## Základní údaje a statistiky 2025

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| IATA LEJ, ICAO EDDP | OK | MFAG Überblick | – |
| Terminalring 11, 04435 Schkeuditz | OK | LEJ /anreise-abreise/auto/ | – |
| Dvě dráhy po 3 600 m, šířka 45 m a 60 m, CAT IIIb | OK | MFAG Überblick | – |
| Cestující 2025: 2 119 170 (−3,7 %) | OK | ADV 12/2025, kumulace (ř. Leipzig/Halle) | Pozor: MFAG Überblick uvádí pro rok 2025 2 123 269. Protože je citováno ADV, číslo je v pořádku. Rozpor doplnit do neovereno.md. |
| Náklad 2025: 1 391 681 t (+0,4 %), 2. místo v DE za Frankfurtem (2 071 665 t) | OK | ADV 12/2025; MFAG Überblick „zweitgrößter Cargo-Airport“ | – |
| Cestující 5:30–23:30, náklad 24 h | OK | MFAG Überblick | – |
| Osobní lety jen 5:30–23:30, zákaz od letního řádu 2008 | OK | MFAG Lärmschutz („planmäßiger Passagierverkehr“) | Slovo „pravidelně“ je v textu správně, ponechat. |
| Výcvikové lety po–so 6:00–22:00 | OK | MFAG Lärmschutz | – |
| „Provozovatel MFAG letiště označuje za největší centrální uzel DHL na světě“ | CHYBA (drobná) | MFAG TZ 27. 1. 2026 | Provozovatel je Flughafen Leipzig/Halle GmbH, MFAG je mateřská společnost. Opravit na „Mateřská společnost letiště MFAG ho označuje…“. Totéž platí pro FAQ („Provozovatel ho označuje…“ → „Mitteldeutsche Flughafen AG ho označuje…“). |
| Přes 45 nákladních aerolinek, síť přes 160 cílů | OK | MFAG TZ 27. 1. 2026 | – (stránka Luftfracht uvádí „více než 200“, draft správně drží MFAG) |
| Zhruba 70 pravidelných a charterových nákladních letů denně; World Cargo Center 20 000 m²; celní odbavení 24/7 | OK | LEJ /luftfracht/ | – |
| „CAT IIIb umožňuje přistání i za špatné viditelnosti, což těžkým nákladním strojům vyhovuje“ | NEDOLOŽENO (vlastní úsudek) | LEJ /luftfracht/ uvádí „Cat IIIB – Code F“ | „Obě dráhy jsou dlouhé 3 600 metrů. Kategorie CAT IIIb umožňuje přistání i za velmi špatné viditelnosti a dráhy jsou podle letiště dimenzované i pro největší letadla (kód F).“ |
| Vzdušnou čarou asi 13 km k Leipzig Hbf a 18 km k Halle Hbf, vlastní výpočet | OK | kontrolní výpočet haversine z bodu MFAG: 13,4 km a 18,4 km | – |
| FAQ: Česko v letním řádu 2026 chybí; Antalya, Mallorca, Hurghada; uzly Frankfurt, Istanbul, Vídeň | OK | MFAG TZ Sommerflugplan 2026 | Volitelně upřesnit „v letním letovém řádu 2026 (do 24. 10.)“. Zimní řád jsme neověřovali. |

## Doprava

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Nádraží přímo pod odbavovací halou, eskalátor i výtah | OK | LEJ /bus-bahn/ | – |
| „Z Česka se tam nejspolehlivěji dostanete přes Drážďany“ | NEDOLOŽENO (hodnocení) | LEJ /bus-bahn/ doložuje jen IC z Drážďan bez přestupu | „Z Česka se tam nejsnáz dostanete přes Drážďany, odkud jezdí přímý vlak IC bez přestupu.“ |
| IC z Drážďan bez přestupu, každé dvě hodiny | OK | LEJ /bus-bahn/ | – |
| A14 s přímým přivaděčem; A9 přes Schkeuditzer Kreuz nebo Großkugel | OK | LEJ /auto/ | – |
| S5 a S5X po 30 minutách, 14 min z Leipzig Hbf, 10 min z Halle Hbf | OK | LEJ /bus-bahn/ | – |
| Noční bus NXL (LVB): 0:50 a 2:22 z Hbf, 1:35 a 3:05 z letiště, tarif MDV | OK | LEJ /bus-bahn/ | – |
| „Letiště ho samo doporučuje k letům odbavovaným před 6:30“ | OK (drobnost) | LEJ /bus-bahn/ („Flüge vor 06:30 Uhr“) | „…k letům s odletem před 6:30“. |
| Cena jízdenky S-Bahn neuvedena, odkaz na MDV / DB Navigator | OK | neovereno.md bod 5 | – |
| Praha–Drážďany neuvedeno | OK | neovereno.md bod 7 | – |

## Parkování (tarify u závory ověřené na jednotlivých stránkách parkovišť 21. 9. 2026)

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Přes 5 500 míst, 10 venkovních parkovišť a parkovací dům, nonstop | OK | LEJ /parken/…; u jednotlivých parkovišť je uvedeno „24 h geöffnet“ | – |
| Rozpětí 67–200 € za týden | OK | /parken/parkplatz-p20/ a /parkplatz-p6/ | Odkaz vede na přehledovou stránku, kde ceny nejsou. U tabulky raději uvést „stránky jednotlivých parkovišť na leipzig-halle-airport.de/parken/“. |
| „online rezervace vychází levněji“ | CHYBA (neúplné) | /parkplatz-p1/, /p3/: „keine Online Buchung möglich“; /p4/: od 30. 3. 2025 nelze rezervovat online | „U většiny parkovišť vychází online rezervace levněji. P1, P3 a P4 online rezervovat nejde.“ |
| P20 67 €, 1 200 m, Kursdorf, jen duben až říjen | OK | /parkplatz-p20/ | Do poznámky doplnit „jen s QR kódem“. |
| P15 70 €, asi 500 m | OK | /parkplatz-p15/ | Do poznámky doplnit „jen s QR kódem“. |
| P4 85 €, asi 500 m | OK | /parkplatz-p4/ | Do poznámky doplnit „jen na místě, online nelze“. |
| P7 90 €, 300 m, jen s QR | OK | /parkplatz-p7/ | – |
| P2 95 €, 150 m, jen s QR | OK | /parkplatz-p2/ | – |
| P21 105 €, 150 m, omezená kapacita | OK | /parkplatz-p21/ | Do poznámky doplnit „jen s QR kódem“. |
| Parkovací dům 120 €, krytý, vjezd 1,90 m | OK | /parken/parkhaus/ | – |
| P1 / P3 125 €, pár minut chůze | OK | /parkplatz-p1/, /p3/ | – |
| P6 200 €, 1 min, mezi Terminal A a B, max. 7 dní | OK | /parkplatz-p6/ | – |
| „ceny se mohou lišit podle sezóny a dostupnosti“ | OK | poznámka „Schrankentarife…“ na /p2/ a /parkhaus/ | – |
| P11 přímo před centrálním odbavením, jen mince, max. 3 h | OK | /parkplatz-p11/ | – |
| „Pro krátké vysazení nebo vyzvednutí slouží P11 … nebo pruh Kiss & Fly s prvními deseti minutami zdarma jednou denně“ | CHYBA (drobná) | /parkplatz-p11/ (pro vysazení), /terminalvorfahrt/ (pro vyzvedávání, bez komerčních dopravců, max. 60 min) | „Kdo cestující vysazuje, může krátce stát na P11 přímo před centrálním odbavením (platí se jen mincemi, nejvýš 3 hodiny). Kdo je vyzvedává, má v pruhu Kiss & Fly u Terminalu B prvních 10 minut zdarma, jednou denně.“ |
| Interní odkaz /letiste/praha/parkovani a tvrzení o Praze | OK | stránka existuje (`src/app/letiste/praha/parkovani/page.tsx`) a obsahuje expresní stání u terminálů a online rezervace | – |

## Fotografie a Antonov (vymyšlené zážitky)

Ve draftu jsem nenašla popis dojmů, počasí, hluku ani toho, kde fotograf stál. Formulace „jsme vyfotili“ a „jsme zastihli výstavu“ vycházejí z fotografií z 24. 12. 2025 (viz fotografie.md), takže vymyšlený zážitek to není.

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Fotky z 24. 12. 2025; na trupu „ANTONOV 124-100M“, „BE BRAVE LIKE KHARKIV“, UR-82027, zakryté motory | OK | fotografie.md | – |
| „Typ i registraci jsme přečetli z nápisů, v rejstříku jsme je neověřovali“ | OK | fotografie.md / neovereno.md | – |
| Výstava „Light and Shadow: The Antonov Story“ pořádaná společností Antonov, kterou prezentuje letiště; text o Hostomelu (únor 2022) a Lipsku jako základně flotily | OK | fotografie.md (IMG_114827, IMG_114851) | Výhrada „podle textu výstavy z prosince 2025“ je v textu, ponechat. |
| „viděli jsme ji o Vánocích 2025“ | OK | datum fotek 24. 12. 2025 | Pro přesnost: „24. prosince 2025“. |
| Nadpis H1 a titulek „proč tu létají Antonovy“ | OK (s výhradou) | text výstavy (foto 12/2025) | Stav flotily k 9/2026 není ověřený, ale v textu je to správně datováno. |
| Odkaz /blog/boeing-747-praha-fly-meta | OK | `src/app/blog/boeing-747-praha-fly-meta` existuje | – |
| Odkaz /radar a „nákladní letadla přes Lipsko“ | OK | radar pokrývá střední Evropu (lat 44–58, lon 5–28) | – |

## Odkazy (stav HTTP 21. 9. 2026)

Všechny externí URL použité v draftu vracejí 200: ADV PDF, 3× mdf-ag.com, leipzig-halle-airport.de (/bus-bahn/, /auto/, /parken/…, /luftfracht/…, /freizeitangebote/, /fuehrungen/), mdv.de a PDF ceníku MDV. WebFetch dostane u letištních domén 403, s běžným prohlížečem stránky fungují. Ceník MDV (`/media/file/2ceb68a5`) je v boxu Zdroje, ale draft z něj žádné číslo nepoužívá. Doporučuji ho z boxu vypustit, nebo nechat jen `mdv.de`.

Titulek má 54 znaků a meta popisek 138 znaků. Oba údaje v draftu sedí.
