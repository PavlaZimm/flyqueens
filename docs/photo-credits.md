# FlyQueens — použité fotografie

## Pražský spotting (lokální draft, 18. září 2026)

Zdroj všech čtyř snímků: vlastní archiv FlyQueens, `Fotografie/val praha.zip`.
Kněževes potvrzena uživatelkou. Kredit je záměrně veden jako archiv, konkrétní
autorství jednotlivých nových snímků nebylo samostatně potvrzeno. WebP kopie
jsou zmenšené na šířku 1 600 px; originály zůstaly zachované.

| Webový soubor v `public/spotting` | Originál | Obsah |
|---|---|---|
| `praha-vyhlidkovy-val.webp` | `20260916_171618.jpg` | Val Kněževes a cesta |
| `praha-pristup-k-valu.webp` | `20260916_171539.jpg` | Přístup a schody |
| `praha-poznavani-letadel.webp` | `20260916_171513.jpg` | Tabule s typy letadel |
| `praha-boeing-747-fly-meta.webp` | `20260916_165732(0).jpg` | Boeing 747 v barvách Fly Meta při přistání |

## Dříve použité fotografie

Aktualizováno 14. září 2026. Fotografie jsou uložené lokálně kvůli rychlosti, stabilitě a ochraně soukromí návštěvníků. V článcích je vždy viditelný autor i odkaz na licenci.

Níže uvedené starší blogové soubory jsou zmenšené na delší hranu nejvýše 1 600 px a znovu zakódované
(`npm run images:optimize`). Důvod: hero fotka se vykresluje maximálně na 760 px,
ale stejný soubor si v původní velikosti stahují roboti sociálních sítí — og:image
míří přímo do `/public`, ne přes optimalizátor. Celkem 2 717 kB → 1 031 kB.
Skutečné rozměry každého souboru jsou vedené v `src/lib/blog.ts` (`imageWidth`,
`imageHeight`) a odtud jdou rovnou do og:image, takže se nemůžou rozejít.
U snímků pod licencí CC BY-SA jde stále jen o zmenšenou kopii bez dalších úprav.

| Soubor | Autor a zdroj | Licence | Poznámka |
|---|---|---|---|
| `co-mi-leti-nad-hlavou.jpg` | [Hieu, Unsplash](https://unsplash.com/photos/an-airplane-flying-directly-overhead-against-a-clear-blue-sky-b4fWpI7a0Kc) | [Unsplash License](https://unsplash.com/license) | Skutečná fotografie letadla zespodu. |
| `jak-sledovat-let-podle-cisla.jpg` | [whereslugo, Unsplash](https://unsplash.com/photos/airplane-from-above-Fk35BtkRO7g) | [Unsplash License](https://unsplash.com/license) | Skutečný pohled z letadla; ilustrační fotografie. |
| `jak-vysoko-letaji-letadla.jpg` | [Danist Soh, Unsplash](https://unsplash.com/photos/flying-airplane-above-clouds-58MKf-UXjaA) | [Unsplash License](https://unsplash.com/license) | Skutečná fotografie letadla nad oblačností. |
| `letiste-praha-zive.jpg` | [Sefjo, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Learjet_75_N446LJ_at_PRG_01.JPG) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | Pořízeno na Letišti Václava Havla Praha; zmenšená kopie bez dalších úprav. Vhodné později nahradit vlastní fotografií FlyQueens. |
| `squawk-nouzove-kody.jpg` | [Rainmaker47, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:DC9_ATC_Transponder.JPG) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | Skutečný transpondér v DC-9; zmenšená kopie bez dalších úprav. |
| `starlux-airlines-praha.jpg` | [Steven Byles, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Starlux_Airlines_A350-1041_B-58553_-_TPE_RCTP_-_05-JUL-2026.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Skutečný Airbus A350-1000 STARLUX; zmenšená kopie bez dalších úprav. |
| `airbus-a380-praha-emirates.jpg` | Pavla Zimmermannová / FlyQueens | vlastní fotografie | Airbus A380 Emirates po přistání na Letišti Praha dne 26. října 2025; zmenšená kopie bez dalších úprav. |
| `airbus-a380-praha-pristani.jpg` | Pavla Zimmermannová / FlyQueens | vlastní fotografie | Airbus A380 Emirates při přistání na Letišti Praha dne 26. října 2025; zmenšená kopie bez dalších úprav. |

## Náhled ubytování u letiště (18. září 2026)

`public/blog/praha-terminal-ubytovani.webp`: vlastní archiv FlyQueens, originál
`Fotografie/Letiště Praha/Photos-1-001 (1).zip :: IMG_20220608_151953.jpg`.
Budova Terminálu 1 Letiště Václava Havla Praha. Zmenšeno na 1600 × 1200 px,
WebP; ilustrační fotografie letiště, nikoli hotelu. Použita na kartě v přehledu blogu.
Náhled planespottingu používá již evidovaný snímek `praha-vyhlidkovy-val.webp`.

## Optimalizace 18. září 2026

Čtyři spottingové WebP zmenšeny z šířky 1800 na 1600 px a úsporněji
zakódovány. Tři fotografie mají 1600 × 1200 px, Boeing 747 má 1600 × 780 px.
Spolu s náhledem terminálu klesly dnešní webové soubory z 1 431 014 B na
746 718 B (o 48 %). Náhled terminálu měl již 1600 × 1200 px a 142 278 B,
proto se znovu nepřekódoval. Originály zůstaly zachované.

## Boeing 747 Fly Meta: článek (18. září 2026)

- Hlavní snímek i náhled: již evidovaný `/spotting/praha-boeing-747-fly-meta.webp`, 1600 × 780 px, 115 508 B.
- `/blog/boeing-747-fly-meta-priblizeni.webp`: originál `Fotografie/val praha.zip :: 20260916_165727.jpg`, letadlo těsně nad dráhou, 1400 × 1050 px, WebP, 195 346 B. Zmenšeno přímo z originálu, vizuálně ověřeno.
- Stanoviště: již evidovaný `/spotting/praha-vyhlidkovy-val.webp`, 1600 × 1200 px.
- Všechny snímky: vlastní archiv FlyQueens. Kněževes potvrzena uživatelkou. Datum leteckých fotografií 16. 9. 2026 potvrzeno EXIF DateTimeOriginal, časový posun +02:00. Originály zachované. Detail registrace pro rešerši se nezveřejňuje jako samostatná fotografie.

## Tivat, Lipsko a Air Park Zruč (lokální draft, 21. září 2026)

Zdroj: vlastní archiv FlyQueens, složky `Fotografie/Letiště Tivat`, `Fotografie/Letiště Lipsko`, `Fotografie/Letadla plzen zruč `. Kredit veden jako archiv; autorství jednotlivých snímků nebylo samostatně potvrzeno. Data podle názvů souborů. WebP kopie 1 600 px, 16–133 kB; originály beze změny. Podrobnosti v `Vyzkum/<tema>/fotografie.md`.

| Webový soubor v `public/blog` | Originál | Obsah |
|---|---|---|
| `letiste-tivat-draha-hory.webp` | `20250728_175016.jpg` | Dráha, terminál a hory v Tivatu |
| `letiste-tivat-easyjet-pristani.webp` | `20250728_173925.jpg` (výřez) | easyJet G-EZOP nad Tivatem |
| `letiste-tivat-plot-odstavna-plocha.webp` | `20250728_180233.jpg` | Odstavná plocha za plotem |
| `letiste-tivat-turkish-airlines-hrnek.webp` | `20250728_191639.jpg` | Turkish Airlines nad plecháčkem |
| `letiste-lipsko-antonov-an-124.webp` | `IMG_20251224_125631.jpg` | Příď An-124-100M |
| `letiste-lipsko-an-124-ur-82027.webp` | `IMG_20251224_125337.jpg` | An-124 UR-82027 z boku |
| `letiste-lipsko-vystava-antonov.webp` | `IMG_20251224_114827.jpg` (výřez) | Výstava Light and Shadow |
| `air-park-zruc-expozice.webp` | `20260308_114318.jpg` | Letadla na louce Air Parku |
| `air-park-zruc-letadla-na-louce.webp` | `20260308_112814.jpg` | Stíhačka a zemědělský letoun |
| `air-park-zruc-vrtulovy-dopravni.webp` | `20260308_113124.jpg` | Pístový dopravní letoun |
| `air-park-zruc-migy-slovenske.webp` | `20260308_113126.jpg` | Stíhačky se slovenskými znaky |

## Praha–Santiago de Compostela (lokální draft, 22. září 2026)

Originály uložené v `Fotografie/Santiago de Compostela/`. WebP kopie 1600 px, zmenšené bez dalších úprav, vizuálně zkontrolované. Kredit a licence jsou viditelné v popisku fotografie v článku.

| Webový soubor v `public/blog` | Autor a zdroj | Licence | Obsah |
|---|---|---|---|
| `santiago-de-compostela-katedrala.webp` (1600 × 1067, 204 kB) | [Fernando Pascullo, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Santiago_Compostela_Cathedral_2023_-_View_from_Alameda_Park.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Katedrála z parku Alameda, 30. 4. 2023. Náhled článku. |
| `fly2galicia-flyyo-a320.webp` (1600 × 1067, 33 kB) | [André Gerwing, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Airbus_A320-214_(c-n_3256,_YR-ADC)_2026-05-08_Andre_Gerwing_Collection_ID_028659.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | A320 YR-ADC dopravce FLYYO, Berlín, 8. 5. 2026. Ilustrační, není jisté, že bude létat do Prahy. |

## Letiště Kodaň: článek (23. září 2026)

Pavla vlastní fotky z letiště Kodaň nemá (potvrzeno 23. 9. 2026), použity jsou snímky
z Wikimedia Commons. Originály v plném rozlišení jsou v `Fotografie/Letiště Kodaň/`,
webové kopie jsou zmenšené na 1600 px a převedené do WebP, bez ořezu a jiných úprav.
Letecký snímek `Copenhagen airport from air.jpg` záměrně nepoužíváme, má ho sesterský
kastrup.cz. Podrobnosti výběru: `Vyzkum/letiste-kodan/fotografie.md`.

| Soubor v `public/blog` | Autor a zdroj | Licence | Rozměry, velikost | Poznámka |
|---|---|---|---|---|
| `letiste-kodan-terminal-3-odbaveni.webp` | [JIP, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Landside_of_Copenhagen_Airport_on_an_afternoon_in_April_2025.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 1600 × 1200, 176 744 B | Odbavovací hala T3, 2. 4. 2025. Hlavní fotka a náhled. |
| `letiste-kodan-za-bezpecnostni-kontrolou.webp` | [JIP, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Airside_at_Copenhagen_Airport_in_April_2025.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 1600 × 1200, 188 056 B | Prostor za bezpečnostní kontrolou, 2. 4. 2025. |
| `letiste-kodan-sas-embraer.webp` | [Andrzej Otrębski, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:CPH_SE-RSO.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 1600 × 1067, 53 794 B | Embraer 195 SAS SE-RSO, 17. 1. 2025 (typ a registrace podle autora). |
| `letiste-kodan-sas-pristani.webp` | [Flygklubben, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:SAS_landing_at_CPH.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | 1600 × 1200, 68 590 B | Letadlo SAS před přistáním, 12. 4. 2025. Typ ani dráhu autor neuvádí. |

## Příruční zavazadlo Ryanair (lokální draft, 28. září 2026)

Originály: `Fotografie/Ryanair/` a `Fotografie/Prirucni zavazadlo/`. Webové kopie WebP, nejdelší strana 1600 px (měřák 1200 × 1600 px), 66–186 kB.

| Webový soubor v `public/blog` | Autor a zdroj | Licence | Obsah |
|---|---|---|---|
| `ryanair-737-bok.webp` (1600 × 738, 73 kB) | vlastní archiv FlyQueens, originál `20260522_090357.jpg` | vlastní fotografie | Boeing 737 Ryanair z boku s nástupními schody, 22. 5. 2026. Náhled článku. |
| `ryanair-737-nastup.webp` (1600 × 738, 67 kB) | vlastní archiv FlyQueens, originál `20260522_102957.jpg` | vlastní fotografie | Totéž letadlo zepředu při nástupu. Zatím nepoužito v článku, drženo v zásobě. |
| `ryanair-737-zavazadlove-voziky.webp` (1600 × 1200, 185 kB) | vlastní archiv FlyQueens, originál `IMG-20221120-WA0001.jpg` | vlastní fotografie | Letadlo na ploše se zavazadlovými vozíky, 20. 11. 2022. |
| `merak-prirucniho-zavazadla.webp` (1200 × 1600, 186 kB) | [Stephen Johnes, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ryanair_vs_Wizz_Air_baggage_sizer.jpg) | volné dílo | Měřáky Ryanairu a Wizz Airu vedle sebe, 2. 7. 2023. Pozor, cedule uvádí starší rozměr 40 × 20 × 25 cm; v popisku je to vysvětlené. |

Datum leteckých snímků vychází z názvů souborů, místo pořízení není doložené.

## Powerbanka do letadla (28. září 2026)

| Webový soubor v `public/blog` | Autor a zdroj | Licence | Obsah |
|---|---|---|---|
| `powerbanka-do-letadla.webp` (1600 × 1191, 16 kB) | [Jacek Halicki, Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2023_Powerbank_Green_Cell_PowerPlay_20_(2).jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Powerbanka s porty USB a USB-C. Náhled článku, originál v `Fotografie/Powerbanka/`. |

Druhý snímek v článku je již evidovaný `ryanair-737-nastup.webp` z vlastního archivu.
| `letiste-treviso-wizz-air-odbavovaci-plocha.webp` (1600 × 640, 79 kB) | vlastní archiv FlyQueens, originál `20260525_144704.jpg` | vlastní fotografie | Wizz Air na odbavovací ploše letiště Treviso, 25. 5. 2026. Náhled článku. |
| `letiste-treviso-ryanair-nastup.webp` (1600 × 1301, 135 kB) | vlastní archiv FlyQueens, originál `20260525_151038.jpg` | vlastní fotografie | Ryanair 737 při nástupu, schody AER TRE, 25. 5. 2026. |
| `letiste-treviso-ryanair-pod-strechou.webp` (1600 × 900, 143 kB) | vlastní archiv FlyQueens, originál `20260525_144652.jpg` | vlastní fotografie | Ryanair 737 na stání zpod střechy terminálu, 25. 5. 2026. |
| `letiste-zakynthos-terminal.webp` (1600 × 600, 60 kB) | vlastní archiv FlyQueens, originál `IMG_20180608_150433.jpg` | vlastní fotografie | Terminál letiště Zakynthos z odbavovací plochy, 8. 6. 2018 (před přestavbou). Náhled článku. |
| `letiste-zakynthos-airbus-odbavovaci-plocha.webp` (1600 × 701, 58 kB) | vlastní archiv FlyQueens, originál `IMG_20180615_145424_1.jpg` | vlastní fotografie | Airbus v barvách Austrian Airlines na odbavovací ploše letiště Zakynthos, 15. 6. 2018. |
| `wizz-air-airbus-treviso.webp` (1600 × 900, 78 kB) | vlastní archiv FlyQueens, originál `20260525_151005.jpg` | vlastní fotografie | Airbus Wizz Air na letišti Treviso, 25. 5. 2026, výřez. Použito u článku Wizz Air Praha–Poprad (ne z této linky, v popisku přiznáno). |
