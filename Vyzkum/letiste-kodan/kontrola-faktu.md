# Letiště Kodaň: kontrola faktů draftu

Kontrolovaný soubor: `Vyzkum/letiste-kodan/draft.md`. Kontrola proběhla 23. 9. 2026 proti souborům `zdroje.md`, `neovereno.md`, `fotografie.md` a `serp.md` a znovu proti primárním zdrojům online. Draft jsem nepřepisovala.

**Jak jsem ověřovala.** cph.dk vrací na curl i WebFetch 403 (Akamai). Stránky jsem proto otevřela v prohlížeči (panel Browser) a četla je naživo. Soubory letiště (Key Facts & Figures 2025, měsíční Excel 12/2025 a 8/2026) jsem stáhla v téže relaci prohlížeče a přečetla lokálně. Databázi letů (CPH-API) jsem prošla po dnech pro týdny 23.–29. 9., 19.–25. 10., 1.–7. 11., 8.–14. 11., 30. 11.–6. 12. 2026, 11.–17. 1., 15.–21. 2. a 22.–28. 3. 2027. Letový řád Ryanairu (API) v obou směrech za 10/2026–4/2027. AIP (Naviair), m.dk, prg.aero, VisitCopenhagen, Trap Danmark, Rejseplanen a kastrup.cz jsem stáhla přes curl. Nic jsem nepřebírala ze souhrnu vyhledávače.

Stav: ✅ sedí · ⚠️ nepřesné (návrh opravy) · ❌ chybí ve zdrojích nebo je v rozporu · 🔎 jen v neovereno.md.

## Perex a tabulka základních údajů

| Tvrzení v draftu | Stav | Zdroj (ověřeno 23. 9. 2026) | Přesná navržená oprava |
|---|---|---|---|
| IATA CPH, ICAO EKCH | ✅ | AIP AD 2; CPH-API | – |
| Ostrov Amager, obec Tårnby, „jižně od centra“ (perex) | ✅ | Trap Danmark; DSB; AIP „4.4 NM SSE of Copenhagen“ | – |
| Tabulka: „přibližně 8 km jihovýchodně od centra Kodaně“ | ⚠️ | AIP AD 2.2: „4.4 NM SSE of Copenhagen“ (4,4 × 1,852 = 8,15 km). AIP neříká „od centra“ a směr je jiho-jihovýchodní | „podle letecké příručky asi 8 km (4,4 NM) jiho-jihovýchodně od Kodaně“ |
| Část Kastrup | ✅ | AIP AD 2.2, adresa DK-2770 Kastrup | – |
| Copenhagen Airports A/S, stát drží 99,6 % | ✅ | TZ 13. 3. 2026 („the state now owns 99.6 per cent“) | – |
| Dráhy 04L/22R až 3 571 m, 04R/22L 3 302 m, 12/30 až 2 800 m | ✅ | AIP AD 2.12/2.13 (22R 3 571 × 45, 04L 3 001; 04R/22L 3 302; 12: 2 800, 30: 2 365) | – |
| T2 a T3, provoz nonstop | ✅ | cph.dk Check-in, FAQ „Terminal 2 and Terminal 3 … are open 24/7“ | – |
| Cestující 2025: 32 433 694 (rekord) | ✅ | XLS 12/25 (Passengers year to date, Grand total); TZ 7. 1. 2026 „highest number ever“ | – |
| „nejvíc v jeho stoleté historii“ | ✅ | TZ 7. 1. 2026 „highest number ever“; otevření 1925 (Trap Danmark) | – |
| Největší letiště v Dánsku | ✅ | TZ 7. 1. 2026 „Denmark's largest airport“ | – |
| Přímé lety z Prahy SAS, Norwegian, Ryanair; Ryanair v zimě nelétá | ✅ | prg.aero/kodan; FR-API; CPH-API | – |
| Provoz 24 hodin denně | ✅ | AIP AD 2.3: provozovatel, clo, ATS, security H24 | – |
| Perex: Ryanair „od začátku listopadu do konce března vůbec nelétá“ | ✅ | FR-API: poslední let 2. 11. 2026, další 28. 3. 2027 (oba směry) | – |

## Lety z Prahy

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Praha odbavuje lety do Kodaně v T2 | ✅ | prg.aero/kodan („Terminál 2“) | – |
| „v Kodani má vlastní zázemí jen SAS, který sedí v Terminálu 3, zatímco Norwegian a Ryanair mají **přílety i odlety v Terminálu 2**“ | ❌ | CPH-API 24. 9. 2026: odlety SK = Terminal 3, D8 a FR = Terminal 2; **přílety z Prahy všech tří (D83581, SK768, SK2736, FR6708, D82067, SK1766) = Terminal 3**. Navíc prg.aero/kodan, na který věta odkazuje, o kodaňských terminálech nic neříká | viz Nutné opravy č. 1 |
| Let 1 h 20 až 25 min | ✅ | CPH-API + PRG-API (SK767 8:20→9:40, D8 7:00→8:20, SK768 10:20→11:40); FR-API (FR6707 9:50→11:15, FR6708 12:45→14:10) | – |
| Týden 23.–29. 9. 2026: 40 spojů, SAS 20, Norwegian 13, Ryanair 7 | ✅ | CPH-API, odlety i přílety shodně 20/13/7 | Drobnost: „létalo“ je minulý čas u týdne, který teprve běží. Navrhuji „létá“. |
| SAS v zimě tři lety denně, v sobotu dva | ✅ | CPH-API: 20 odletů týdně v týdnech 1.–7. 11., 8.–14. 11., 30. 11.–6. 12., 11.–17. 1., 15.–21. 2.; v sobotu 2 | – |
| Norwegian v zimě 4× týdně, v některých lednových týdnech jen 2× | ✅ | CPH-API: listopad, prosinec, únor 4, týden 11.–17. 1. 2027 2 | Ověřen jen jeden lednový týden, „v některých“ je přijatelné. Před publikací znovu ověřit (neovereno.md bod 4). |
| Ryanair nelétá 3. 11. 2026 – 27. 3. 2027, poslední let 2. 11., další 28. 3. 2027 | ✅ | FR-API CPH→PRG: 11/2026 jen 1. a 2. 11., 12/2026–2/2027 prázdné, 3/2027 od 28.; PRG→CPH stejně. CPH-API: týden 8.–14. 11. bez FR | – |
| Z Brna, Ostravy ani Pardubic se přímo nelétá | ✅ (s výhradou) | CPH-API: v žádném z 8 prověřených týdnů let do BRQ, OSR, PED ani KLV | Formulace „v žádném z prověřovaných týdnů“ výhradu správně nese. |
| Odkazy /letiste/praha a /radar | ✅ | `src/app/letiste/praha/page.tsx`, `src/app/radar/page.tsx` existují | – |

## Terminály

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Pro cestující jen T2 a T3, oba nonstop | ✅ | cph.dk Check-in FAQ | – |
| Bezpečnostní kontrola je společná a leží mezi T2 a T3 | ✅ | security-checkpoint: „security checkpoint between Terminal 2 and Terminal 3“ | – |
| „takže se s palubní vstupenkou z jednoho terminálu snadno dostanete i do druhého“ | ⚠️ | Zdroj to neříká. Jde o úsudek ze společné kontroly | Doporučuji: „Za kontrolou je pak společný prostor se všemi gaty A až F.“ (mola A–F: F&F, přehledová mapa) |
| T1 cestující nepoužívají, jen kanceláře s přístupem z odbavovací plochy | ✅ | cph.dk Real Estate: „Terminal 1 consists only of office spaces with access from apron“ | – |
| Nová část mezi moly B a C „o ploše přes 60 000 m²“ | ⚠️ | Číslo 60 000 je jen v TZ 13. 3. 2026: „Terminal 3 is being expanded by 60,000 square metres“. Stránka fremtidens-terminal, na kterou věta odkazuje, 60 000 neuvádí (má jen +13 000 m² pro obchody a tranzit). „Přes“ je silnější než zdroj | viz Nutné opravy č. 4 |
| Dvojnásobná výdejna zavazadel, víc než 30 nových obchodů a restaurací | ✅ | fremtidens-terminal („fordobles i størrelse“, „+30 nye butikker og spisesteder“) | – |
| Otevření 2027 | ✅ | titulek „Fremtidens terminal åbner i 2027“; FAQ „i løbet af 2027“; TZ 13. 3. 2026 | – |
| „do té doby počítejte s omezeními u odletů z mol C, D, E a F“ | ⚠️ | fremtidens-terminal: kdo odlétá z gatů C, D, E nebo F, „vil opleve ombygningen“ (uvidí přestavbu). Tatáž stránka výslovně píše, že kvůli přestavbě není třeba chodit dřív. O „omezeních“ nemluví | viz Nutné opravy č. 4 |

## Bezpečnostní kontrola

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| 100 ml, jeden průhledný litrový sáček na osobu | ✅ | liquids-in-carry-on-baggage | – |
| Sáčky zdarma u balicích stolů před kontrolou | ✅ | tamtéž („free plastic bags … at the packing tables … just before the security area“) | – |
| 3D skenery: elektronika zůstává v zavazadle, boty a pásek se nesundávají | ✅ | TZ 13. 3. 2026 | Doporučení: tvrzení nemá u sebe odkaz, v odstavci je jen odkaz na tekutiny. Připojit TZ 13. 3. 2026. |
| „mělo být novou technologií vybavené do léta 2026“, dnešní stav neuveden | ✅ / 🔎 | TZ 13. 3. 2026 „will be ready by the summer“; dokončení neověřeno (neovereno.md bod 7) | Přiznání nejistoty v textu je správné. |
| „Kontrola bývá otevřená nejméně od 4:00 do 22:00, v sezoně s nočními lety i celou noc“ | ⚠️ (drobné) | Check-in FAQ: „will always be open at least from 4 AM to 10 PM … If there are flights throughout the night … around the clock“ | „Kontrola je vždy otevřená nejméně od 4:00 do 22:00, a když jsou v letovém řádu noční odlety, i celou noc.“ („bývá“ zdroj oslabuje, „v sezoně“ zdroj neříká) |
| Schengen 2 až 2,5 h, mimo Schengen 3 h, stránky se rozcházejí | ✅ | Check-in FAQ: 2 h / 3 h; táž stránka u zpoždění „at least 2.5 hours“; fremtidens-terminal 2,5 h / 3 h | – |
| Průměrné čekání 2025 4 min 14 s, 99,4 % nejvýš 15 min | ✅ | F&F 2025 („4 min 14 sec“, „Max 15 minutes waiting time 99.4%“) | – |

## Odlety, přílety, mapa

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Tabule odletů a příletů (čas, cíl, číslo letu, stav) | ✅ | /departures, /arrivals | – |
| Mapa linek /destinations, dopravci podle terminálů /airlines | ✅ | stránky existují (titulky „Destinations“, „Airlines“) | – |
| Interaktivní mapa: gaty, bezpečnostní i pasová kontrola, toalety, obchody i salonky po patrech | ✅ | /practical/cph-map; security-checkpoint („terminals, gates, passport control, toilets, shops and restaurants“); salonky a patra podle zdroje.md | – |

## Parkování (ceník a dotazy do rezervace ověřeny znovu 23. 9. 2026)

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Čtyři kategorie podle vzdálenosti | ✅ | prices-products (Direct, Standard+, Standard, Budget; We Park You Fly je služba) | – |
| „Ceny online jsou dynamické a mění se podle poptávky“ | ⚠️ (drobné) | Stránka píše „From …“ a „Find the exact price … by searching“. O poptávce nic neříká. Že se cena liší podle termínu, doložily dotazy do rezervace | „Online ceny jsou uvedené jako ‚od‘ a liší se podle termínu, u vjezdu bez rezervace platí pevná sazba.“ |
| Direct P4/P6/P7b/P8, 100–170 m, od 1 759, u vjezdu 2 250 / 375 | ✅ | prices-products | – |
| Standard+ P3/P5/P9/P10, 300–500 m, od 1 409, 1 625 / 325 | ✅ | prices-products | – |
| Standard P1/P11/P12, 500 m až 1 km, od 899, jen online, 299 DKK/den | ✅ | prices-products (P1 od 1 199) | – |
| Budget P15/P17/P19, 1,3–2,1 km, kyvadlo, 499–599, jen online, min. 4 dny | ✅ | prices-products | – |
| 14.–21. 10. 2026: nejlevnější P17 a P19 za 1 499 DKK, několik parkovišť vyprodaných | ✅ | dotaz do rezervace 23. 9. 2026 znovu: P17 i P19 1 499, vyprodáno P15, P3, P5, P9, P10, P6, P7a | – |
| „na dánské podzimní prázdniny 14. až 21. října 2026“ | ⚠️ | Podle zdroje.md jde o týden 42. Týden 42 je 12.–18. 10. 2026, dotazovaný termín 14.–21. 10. do prázdnin jen zasahuje | viz Nutné opravy č. 7 |
| „…tehdy stála 1 499 DKK“ | ⚠️ (drobné) | Cena platí pro den dotazu, ne pro „tehdy“ | „…stála při dotazu 23. 9. 2026 1 499 DKK“ |
| 4.–11. 11. 2026: P19 499 DKK, P17 549 DKK | ✅ | dotaz do rezervace 23. 9. 2026 znovu | Pozn.: v témž dotazu stálo P7b (Direct) 1 139 DKK, tedy **méně** než ceníkové „od 1 759“. Ceníkové „od“ tedy není spodní hranice. Viz Doporučení. |
| FAQ: „v termínech s vysokou poptávkou … ale i **přes 1 500 DKK**“ | ❌ | Nejlevnější volné místo stálo 1 499 DKK, tedy **pod** 1 500 | viz Nutné opravy č. 2 |
| Kiss & Fly u T2 zdarma | ✅ | /pick-up-drop-off/drop-off („close to terminal 2 … free of charge“, dva pruhy) | – |
| P Afgang před T2, P Ankomst před T3 | ✅ | /drop-off, /pick-up | – |
| „prvních 15 minut zdarma, pak se platí 70 DKK za každou započatou hodinu **až do denního stropu 750 DKK**“ | ⚠️ | /drop-off a /pick-up: 70 DKK za započatou hodinu, „the price increases to 750 DKK after 5 hours … when the 6th hour begins“, max. 750 DKK/den. Cena tedy neroste plynule ke stropu, ale po 5 hodinách (350 DKK) **skočí** na 750 DKK | viz Nutné opravy č. 3 |
| Rezervovat nejde | ✅ | „It is not possible to prebook the short time parking areas“ | – |
| Odkaz vede na /pick-up-drop-off | ⚠️ | Rozcestník ceny ani 750 DKK neuvádí. Jsou až na podstránkách /drop-off a /pick-up | Odkaz změnit na https://www.cph.dk/en/parking-transport/pick-up-drop-off/drop-off |
| Odkaz /letiste/praha/parkovani | ✅ | `src/app/letiste/praha/parkovani/page.tsx` existuje a obsahuje ceny | – |

## Doprava do centra

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| M2 navazuje přímo na T3 | ✅ | m.dk stanice; cph.dk Metro | – |
| „do centra jede podle provozovatele metra zhruba 14 minut“ s odkazem na m.dk/en/routes-and-timetables/… | ⚠️ | Odkazovaná anglická stránka linky 14 minut **neuvádí** (má jen intervaly a zóny). Číslo je na dánské stránce stanice: „tager det kun 14 minutter med Metroen at komme til Københavns centrum“ | viz Nutné opravy č. 5 |
| Vlak z T3 na København H za 13 až 14 minut | ✅ | Rejseplanen 24. 9. 2026: Re 12:00→12:13, 12:15→12:28, 12:30→12:44, 12:45→12:58, IC 12:26→12:40 | Pozn.: u København H jsou časy odjezdové, příjezd je tedy spíš 12–13 min. „13 až 14“ je horní odhad, ponechat lze. |
| Odkaz na kastrup.cz, doprava do centra | ✅ | HTTP 200, H1 „Letiště Kodaň (Kastrup): doprava do centra a ceny“ | – |

## Služby a salonky

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| Wi-fi „CPH Airport Free Wi-Fi“ zdarma a bez hesla, před kontrolou, za ní i u gatů | ✅ | /en/wi-fi | – |
| Studená voda z kohoutků na toaletách před kontrolou i za ní | ✅ | services-airport | – |
| Carlsberg 229, Danske Bank 289, Aspire 339, SAS 349 DKK | ✅ | podstránky salonků | – |
| „vstup je zpravidla na tři hodiny“ | ⚠️ (drobné) | Danske Bank a Carlsberg: „valid for up to 3 hours“. Aspire: 3 h zmíněny jen u příplatku za Aspire Suite. SAS: vstup „from 3 hours before departure“, tedy nejdřív 3 h před odletem, ne délka pobytu | „U Carlsbergu a Danske Bank platí vstup až na tři hodiny, do salonku SAS se smí nejdřív tři hodiny před odletem. Vstup se prodává, jen když je volno.“ |
| Odkaz na přehled salonků | ⚠️ | Přehled /workspaces-and-lounges ceny neuvádí, ty jsou na podstránkách | Doporučuji odkázat podstránky, nebo aspoň doplnit „ceny v detailu jednotlivých salonků“. |
| Pearl Lounge vynechána | ✅ | správně, podstránka uvádí jen lety mimo Schengen (neovereno.md) | – |

## Spotting

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| „Letiště samo veřejnou vyhlídku nenabízí.“ | ⚠️ / 🔎 | Doloženo jen nepřímo: Trap Danmark (text 2019): kvůli bezpečnosti není na letišti místo pro spottery; na cph.dk jsem stránku pro spottery nenašla | Buď připojit Trap Danmark (https://trap.lex.dk/Flyvergrillen), nebo zmírnit: „Veřejnou vyhlídku pro spottery letiště podle dostupných zdrojů nemá.“ |
| Flyvergrillen, Amager Landevej 290, od roku 1972 | ✅ | VisitCopenhagen („It started … in 1972“, adresa 2770 Kastrup); Trap Danmark (1972 jako ishus) | – |
| Zavedený tip spotterů i turistických průvodců | ✅ | Trap Danmark („fast tilholdssted for flyspottere“); VisitCopenhagen („historic gathering place for aviation enthusiasts“) | – |
| U plotu poblíž konce jedné z drah, z terasy vidět na starty a přistání | ✅ | VisitCopenhagen („right up to the fence leading to the runways“, „at the end of the airport's runways“, terasa); Trap („udsyn til både start- og landingsbaner“) | – |
| „uvnitř visí modely letadel“ | ⚠️ | Pravda, ale jen v Trap Danmark („under de ophængte modelfly“). VisitCopenhagen, na který věta odkazuje, modely nezmiňuje | viz Nutné opravy č. 9 |
| Komunitní tip, redakce neověřovala, otevírací doba neuvedena, web grilu neodkázán | ✅ | neovereno.md body 11–12 (web obsazen spamem) | – |

## Kodaň v číslech

| Tvrzení v draftu | Stav | Zdroj | Přesná navržená oprava |
|---|---|---|---|
| 32 433 694 cestujících, +8,5 % | ✅ číslo / ⚠️ citace | XLS 12/25: 32 433 694 proti 29 882 553 = +8,54 %. Citovaná TZ 13. 3. 2026 uvádí jen „32.4 million“, přesné číslo ani 8,5 % nemá | viz Nutné opravy č. 6 |
| Přes 256 tisíc pohybů | ✅ číslo / ⚠️ citace | XLS 12/25: 256 737; F&F: 256 705. TZ 13. 3. 2026 pohyby neuvádí | viz Nutné opravy č. 6 |
| 367 linek do 191 destinací, 63 aerolinek, nejvíc SAS, Norwegian, Ryanair | ✅ | TZ 13. 3. 2026 (TZ 7. 1. uvádí 62, draft správně drží 63) | – |
| 1. pololetí 2026: 16,1 mil., +9 % | ✅ číslo / ⚠️ citace | TZ 21. 8. 2026. Citovaný Excel 8/2026 pololetí neuvádí | viz Nutné opravy č. 6 |
| Leden–srpen 2026: 22,9 mil., +7,1 % | ✅ | XLS 08/26: 22 916 418, +7,09 % | – |
| Dráhy a délky, přednost rovnoběžných, 12/30 výjimečně (boční vítr, sníh) | ✅ | AIP AD 2.21: „RWY 04L/R and 22L/R are preferential runways“; 12/30 při bočním větru nad 15 kt, odklízení sněhu aj. | – |

## FAQ

| Tvrzení | Stav | Zdroj | Oprava |
|---|---|---|---|
| Let SAS a Norwegian 1 h 20 min, Ryanair kolem 1 h 25 min | ✅ | viz Lety | – |
| SAS v T3, Norwegian i Ryanair odbavují v T2 | ✅ | CPH-API (odlety) | Tady je „odbavují“ správně. Rozpor je jen v sekci Lety (Nutná oprava č. 1). |
| Mezi terminály se po kontrole snadno dostanete | ⚠️ | viz Terminály | Stejná formulace jako výše. |
| Ryanair 3. 11. 2026 – 27. 3. 2027 v řádu chybí | ✅ | FR-API | – |
| Parkování od 499 DKK, „ale i přes 1 500 DKK“ | ❌ | viz Parkování | Nutná oprava č. 2 |
| Metro 14 min, vlak podobně rychle | ✅ | m.dk (DA), Rejseplanen | – |

## Odkazy (stav HTTP 23. 9. 2026)

| Odkaz | Stav |
|---|---|
| https://kastrup.cz/clanek/letiste-kodan-kastrup-doprava-do-centra | 200 |
| https://kastrup.cz/kodan | 200 (H1 „Co vidět v Kodani…“, sedí s kotvou „co vidět v Kodani“) |
| https://www.prg.aero/kodan | 200 |
| https://m.dk/en/routes-and-timetables/vanloese-koebenhavns-lufthavn/ | 200 (ale 14 min neuvádí, viz výše) |
| https://aim.naviair.dk/media/files/zdxe03hoarn/EK_AD_2_EKCH_en.pdf | 200 |
| https://www.visitcopenhagen.com/…/the-airplane-grill-flyvergrillen-gdk414415 | 200 |
| 15 stránek cph.dk (departures, arrivals, destinations, airlines, cph-map, security-checkpoint, liquids, wi-fi, services-airport, workspaces-and-lounges, prices-products, pick-up-drop-off, fremtidens-terminal, terminal1, TZ 13. 3. 2026) | v prohlížeči všechny 200 bez přesměrování. curl/WebFetch dostávají 403 (Akamai), což je ochrana proti robotům, ne nefunkční odkaz |
| cph.dk F&F PDF a Excel 8/2026 | v prohlížeči 200 |
| Interní /letiste/praha, /letiste/praha/parkovani, /radar | stránky v repozitáři existují |

**Nefunkční odkaz jsem nenašla.** Tři odkazy ale nevedou na stránku, která dané tvrzení obsahuje: m.dk (14 min), pick-up-drop-off (ceny) a přehled salonků (ceny). Kromě nich nesedí citace u statistik a u Flyvergrillen.

## Přepočty a silná slova

- 4,4 NM = 8,15 km, tedy „přibližně 8 km“ ✅. Směr je SSE, ne SE (⚠️, viz tabulka).
- +8,5 % za 2025 ✅ (8,54 %). Letiště samo píše „+9 %“, draft drží přesnější číslo.
- +7,1 % za leden–srpen ✅ (7,09 %).
- „rekord“ / „nejvíc v historii“ ✅ (TZ 7. 1. 2026).
- „přes 60 000 m²“ ⚠️: zdroj říká přesně 60 000.
- „přes 1 500 DKK“ ❌: zdroj 1 499.
- „největší letiště v Dánsku“ ✅. Tvrzení „největší na severu“ draft správně nepoužívá (neovereno.md bod 2).
- DKK nikde nepřepočítává na Kč, takže kurzová chyba nehrozí.

## Osobní zážitky a fotografie

- Vymyšlené zážitky jsem nenašla. „Vlastní dotaz do rezervačního systému letiště“ je doložená rešerše (zdroje.md, dotazy jsem zopakovala se stejným výsledkem). „Na místě ho redakce neověřovala“ poctivě přiznává, že tam redakce nebyla. Odpovídá to fotografie.md: vlastní fotky z letiště nejsou.
- Fotky 1–3: ALT i popisky (hala T3 s tabulí check-inu; Embraer 195 SAS na pojezdu, leden 2025; prostor za kontrolou s ukazateli gatů A a B, duben 2025; autoři JIP a Andrzej Otrębski, CC BY-SA 4.0) ✅ sedí s fotografie.md. U Embraeru jsou typ a registrace převzaté z popisu autora, fotografie.md to uvádí.
- Fotka 4: ALT i figcaption („Letadlo SAS těsně před přistáním, duben 2025, Flygklubben“) ✅. **Pracovní popisek v textu** „přistávající SAS **u konce dráhy**“ je ale víc, než říká fotografie.md („nad silnicí u plotu“, dráhu autor neuvádí). Fotka navíc stojí v sekci o Flyvergrillen, takže to vypadá, že je odtud. Viz Doporučení.
- První fotka stojí až pod perexem a tabulkou ✅.

## Tvrzení z konkurence bez primárního zdroje

Nenašla jsem žádné. Sporné údaje ze serp.md draft nepřebírá: „3 terminály“, CPH Go, jízdné 36 DKK, interval metra 4–6 min, 10 km, Budget 250 DKK/den, ceny salonků z letušky ani spotterská místa ze spotterguide. Každé číslo v draftu má oporu v primárním zdroji ze zdroje.md.

## Poznámky k odevzdání (kontrola)

- Titulek 55 znaků ✅, meta 140 ✅, excerpt 158 ✅, ALT 63 / 58 / 67 / 49 ✅ (přepočítáno).
- „Rozpory s kastrup.cz“, bod Parkování: i tady stojí „v termínech s vysokou poptávkou přes 1 500 DKK“. Opravit stejně jako FAQ, na „kolem 1 500 DKK (1 499)“. Potvrzuji, že ceník cph.dk u Budgetu denní sazbu **nemá** („Price per day –“). Údaj kastrup.cz „Budget 250 DKK/den“ tak u primárního zdroje oporu nemá, sjednotit.

---

## Nutné opravy

1. **Terminály v Kodani (sekce Lety z Prahy, ř. 22).**
   Staré: „Praha je odbavuje v Terminálu 2, v Kodani má vlastní zázemí jen SAS, který sedí v Terminálu 3, zatímco Norwegian a Ryanair mají přílety i odlety v Terminálu 2 ([Letiště Praha, prg.aero/kodan](https://www.prg.aero/kodan)).“
   Nové: „Praha je odbavuje v Terminálu 2 ([Letiště Praha, prg.aero/kodan](https://www.prg.aero/kodan)). V Kodani odbavuje SAS v Terminálu 3, Norwegian a Ryanair v Terminálu 2. Přílety z Prahy všech tří dopravců končí v příletové hale Terminálu 3 ([databáze letů Copenhagen Airports](https://www.cph.dk/en/flight-information/arrivals), stav 23. 9. 2026).“

2. **FAQ o parkování (ř. 105)** a totéž v poznámce „Rozpory s kastrup.cz“.
   Staré: „v termínech s vysokou poptávkou jako podzimní prázdniny ale i přes 1 500 DKK“
   Nové: „v termínech s vysokou poptávkou, třeba o dánských podzimních prázdninách, ale kolem 1 500 DKK (při dotazu 23. 9. 2026 na 14.–21. 10. stálo nejlevnější volné místo 1 499 DKK)“

3. **Krátkodobé parkování (ř. 63).**
   Staré: „je prvních 15 minut zdarma, pak se platí 70 DKK za každou započatou hodinu až do denního stropu 750 DKK. Rezervovat tahle místa nejde ([vysazení a vyzvednutí, cph.dk](https://www.cph.dk/en/parking-transport/pick-up-drop-off)).“
   Nové: „je prvních 15 minut zdarma, pak se platí 70 DKK za každou započatou hodinu. Jakmile začne šestá hodina, cena skočí na 750 DKK, což je zároveň denní maximum. Rezervovat tahle místa nejde ([vysazení cestujících, cph.dk](https://www.cph.dk/en/parking-transport/pick-up-drop-off/drop-off)).“

4. **Nový terminál (ř. 34).**
   Staré: „Mezi moly B a C letiště staví novou část terminálu o ploše přes 60 000 m², s dvojnásobnou výdejnou zavazadel a víc než třiceti novými obchody a restauracemi. Otevřít by se měla v roce 2027, do té doby počítejte s omezeními u odletů z mol C, D, E a F ([Fremtidens terminal, cph.dk](https://www.cph.dk/fremtidens-terminal)).“
   Nové: „Mezi moly B a C letiště rozšiřuje Terminál 3 o 60 000 m² ([tisková zpráva, cph.dk, 13. 3. 2026](https://www.cph.dk/en/about-cph/press/news/2026/03/rising%20passenger%20numbers%20drive%20growth%20at%20copenhagen%20airport)). Výdejna zavazadel bude dvakrát větší a přibude přes třicet obchodů a restaurací. Otevřít by se měla v roce 2027. Do té doby na stavbu narazíte, pokud odlétáte z gatů C, D, E nebo F. Kvůli ní ale podle letiště nemusíte chodit dřív ([Fremtidens terminal, cph.dk](https://www.cph.dk/fremtidens-terminal)).“

5. **Metro 14 minut (ř. 67): změnit odkaz.**
   Staré: „([linka M2, m.dk](https://m.dk/en/routes-and-timetables/vanloese-koebenhavns-lufthavn/))“
   Nové: „([stanice Københavns Lufthavn, m.dk](https://m.dk/da/planlaeg-rejsen/koebenhavns-lufthavn/))“. Anglická stránka linky 14 minut neuvádí.

6. **Citace statistik (ř. 85).**
   Staré: „…a přes 256 tisíc pohybů letadel. … ([tisková zpráva, cph.dk, 13. 3. 2026](…)). První pololetí 2026 v růstu pokračovalo, 16,1 milionu cestujících, o 9 % víc než rok předtím, a za leden až srpen 2026 letiště hlásí 22,9 milionu cestujících a nárůst 7,1 % ([měsíční statistika 8/2026, cph.dk](…2608_traffic.xlsx)).“
   Nové: za první větu (32 433 694, +8,5 %, přes 256 tisíc pohybů) doplnit zdroj „([roční statistika 12/2025, cph.dk](https://www.cph.dk/48d588/globalassets/8.-om-cph/04_investor/trafikstatistik/2025/12/2512_traffic.xlsx))“ a TZ 13. 3. 2026 nechat u linek, destinací a aerolinek. Větu o pololetí oddělit: „První pololetí 2026 v růstu pokračovalo: 16,1 milionu cestujících, o 9 % víc než rok předtím ([tisková zpráva, cph.dk, 21. 8. 2026](https://www.cph.dk/en/about-cph/press/news/2026/08/copenhagen%20airport%20increases%20profit%20in%20the%20first%20half%20of%20the%20year)). Za leden až srpen 2026 letiště hlásí 22,9 milionu cestujících a nárůst 7,1 % ([měsíční statistika 8/2026, cph.dk](…2608_traffic.xlsx)).“

7. **Podzimní prázdniny (ř. 61).**
   Staré: „Vlastní dotaz do rezervačního systému letiště na dánské podzimní prázdniny 14. až 21. října 2026 ukázal, že nejlevnější volná místa (P17 a P19) tehdy stála 1 499 DKK“
   Nové: „Vlastní dotaz do rezervačního systému letiště na týden 14. až 21. října 2026, který zasahuje do dánských podzimních prázdnin, ukázal 23. 9. 2026, že nejlevnější volná místa (P17 a P19) stála 1 499 DKK“

8. **Vzdálenost (tabulka, ř. 8).**
   Staré: „přibližně 8 km jihovýchodně od centra Kodaně“
   Nové: „podle letecké příručky asi 8 km (4,4 NM) jiho-jihovýchodně od Kodaně“

9. **Modely letadel ve Flyvergrillen (ř. 77): doplnit zdroj.**
   Staré: „…a uvnitř visí modely letadel ([Flyvergrillen, VisitCopenhagen](…)).“
   Nové: „…a uvnitř visí modely letadel ([VisitCopenhagen](https://www.visitcopenhagen.com/copenhagen/planning/the-airplane-grill-flyvergrillen-gdk414415), [Trap Danmark](https://trap.lex.dk/Flyvergrillen)).“ Druhou možností je modely vypustit.

## Doporučení

- ř. 42: „Kontrola bývá otevřená nejméně od 4:00 do 22:00, v sezoně s nočními lety i celou noc“ → „Kontrola je vždy otevřená nejméně od 4:00 do 22:00, a když jsou v letovém řádu noční odlety, i celou noc.“
- ř. 32 a FAQ ř. 97: „se s palubní vstupenkou z jednoho terminálu snadno dostanete i do druhého“ → „za kontrolou je společný prostor se všemi gaty A až F“. Zdroj přesun mezi terminály nepopisuje.
- ř. 40: k větě o 3D skenerech připojit odkaz na TZ 13. 3. 2026.
- ř. 52: „dynamické a mění se podle poptávky“ → „uvedené jako ‚od‘ a liší se podle termínu“. Zvážit větu, že konkrétní termín může vyjít i pod ceníkovým „od“ (4.–11. 11. stálo Direct P7b 1 139 DKK při ceníkovém „od 1 759“).
- ř. 73: upřesnit tři hodiny (viz tabulka Služby) a doplnit „jen když je volno“. Odkázat podstránky salonků, přehled ceny nemá.
- ř. 24: „létalo“ → „létá“ (týden 23.–29. 9. teprve běží).
- ř. 77: „Letiště samo veřejnou vyhlídku nenabízí“ podložit Trap Danmark, nebo zmírnit (viz tabulka Spotting).
- ř. 81, pracovní popisek fotky 4: „přistávající SAS u konce dráhy“ → „přistávající letadlo SAS“. Do figcaption nepřidávat místo ani dráhu. Zvážit, jestli fotku nepřesunout ze sekce o Flyvergrillen do sekce „Kodaň v číslech“ (u drah), aby nepůsobila jako snímek odtamtud.
- Před publikací znovu ověřit zimní frekvenci Norwegianu (ověřen jediný lednový týden) a ceny parkování v obou termínech. Obojí se mění.
- Sjednotit s kastrup.cz: Budget 250 DKK/den tam nemá oporu v ceníku cph.dk (Budget se prodává jen týdně, online, nejméně na 4 dny).
