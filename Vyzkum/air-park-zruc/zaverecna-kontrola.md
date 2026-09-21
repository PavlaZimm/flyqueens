# Závěrečná kontrola: Air Park Zruč (finální článek)

Kontrolovaný soubor: `src/app/blog/air-park-zruc/page.tsx` (text v JSX, metadata, popisky, ALT, SourcesBox) a záznam v `src/lib/blog.ts`. Soubor nebyl upraven. Kontrola 21. 9. 2026.

## Co jsem ověřila online (21. 9. 2026)

- **airpark.wz.cz, ceník (page_id=83):** hodiny, všechny ceny včetně „100 Kč (nevhodné)“, 7 volně přístupných exponátů, kabina MiG-21MF, Havel a Klaus v Tu-154M, Tu-104A „částečně nad parkovištěm“, focení zdarma, psi na vodítku. Vše sedí. Ceník má kategorie „děti do 15 let“ a „děti do 6 let“, článek z toho dělá „6–15 let“, což je správný výklad.
- **airpark.wz.cz, O nás (30):** sbírka od 1990 v Druztové, první kus Mi-8 na Vánoce 1992, Tu-104 u vchodu stíní parkoviště. Sedí.
- **airpark.wz.cz, Letadla (165):** „Počet vystavených letadel a jejich motorů se blíží 50 kusům, dalších 10 uvidíte v depozitáři.“ Sedí.
- **airpark.wz.cz, inventář (557):** An-30 č. 1107 unikát, CF-104D č. 648, Z-37 OK-AJQ, MiG-15SB č. 0543, Tu-104A OK-NDF poutač, Il-14T č. 3146. Popisky fotek sedí, na fotkách jsou čísla 526, 1107, 648, OK-AJ…, OK-NDF, 0543 a 3146 opravdu vidět.
- **Visit Plzeň:** 10 km severně, více než 80 kusů, 32 letadel a 20 kusů techniky v základní části, speciální část jen s průvodcem, max. 4 osoby, zastávka „Zruč - Senec, rozc.“, linky 20 a 58, stejné hodiny a ceny. Sedí.
- **Kudy z nudy:** na stránce je „Časová náročnost 2 hodiny“, takže věta „Kudy z nudy uvádí zhruba dvě hodiny“ je doložená. Stejné hodiny jako provozovatel. (Kudy z nudy má jinou adresu, Druztová 15, a jiná telefonní čísla, článek je ale nepřebírá.)
- **Aktuálně.cz (datePublished 10. 1. 2025):** „Letadel máme asi osmdesát, z toho deset dopravních.“ Miloš Tarantík „který Air Park spravuje“ a „majitel muzea“. Sedí.
- **Plzeňský deník:** 8. února spadl „ze schůdků vedoucích do vrtulníku“, „Dvaasedmdesátiletý“, zemřel 25. února 2022, „Osudnou se mu stala péče o jeden z exponátů“. Sedí, jen formulace v článku je méně přesná (viz tabulka).

Vymyšlené zážitky jsem nenašla. Z návštěvy text uvádí jen datum 8. 3. 2026 a obsah fotek. Em-pomlčky ani rovné uvozovky v textu nejsou, nezlomitelné mezery jsou použité. Není tu FAQPage schema, jen Article a BreadcrumbList. Fotka není první blok. Titulek má 51 znaků, meta popisek 140, ALT texty 62–81 znaků.

## Tabulka nálezů

| přesný původní text | problém | přesná oprava | typ | závažnost |
|---|---|---|---|---|
| „Karel Tarantík zemřel 25. února 2022 ve věku 72 let po pádu z jednoho z exponátů při údržbě“ | Deník upřesňuje, že spadl ze schůdků k vrtulníku, a „údržba“ tam doslova není (píše „péče o jeden z exponátů“). Podle zkrácené verze to vypadá, že spadl přímo z letadla. | „Karel Tarantík zemřel 25. února 2022 ve věku 72 let, dva týdny poté, co při péči o jeden z exponátů spadl ze schůdků k vrtulníku“ | fakt | doporučené |
| „Sbírku začal Karel Tarantík budovat v roce 1990, nejprve v sousední Druztové.“ | Web píše v množném čísle („sbíráme“) a Aktuálně uvádí, že sbírku otec a syn vytvořili spolu. Tvrzení není chybné, jen zužuje autorství. | „Karel Tarantík začal se synem sbírat letadla v roce 1990, nejprve v sousední Druztové.“ | fakt | doporučené |
| „Starší články proto uvádějí rok 1993 nepřesně.“ | Zobecnění („starší články“ jako celek) a neobratná vazba se slovem „proto“. | „Rok 1993, který uvádějí některé starší články, tedy nesedí.“ | čeština | doporučené |
| „Stříbrné stíhačky se slovenskými znaky. Typ a evidenční čísla těchto kusů jsme ve zdrojích nedohledali.“ | Druhá věta je redakční zákulisí. Čtenáři stačí, že typ v popisku není. | „Stříbrné stíhačky se slovenskými znaky. Foto: vlastní archiv FlyQueens, 8. března 2026.“ | čeština | doporučené |
| „Vpředu MiG-15SB č. 0543 s československým znakem, za ním dvoumotorový pístový dopravní letoun.“ | Na fotce je vidět číslo 3146 a inventář ho vede jako Il-14T, tedy letoun, do kterého se podle ceníku dá vstoupit. Chybí tu užitečná vazba na text. | „Vpředu MiG-15SB č. 0543 s československým znakem, za ním Il-14T č. 3146, do kterého se podle ceníku dá za příplatek vstoupit. Typy podle inventáře muzea.“ | fakt | doporučené |
| „Visit Plzeň a Kudy z nudy uvádějí stejné časy, pravděpodobně je ale převzaly z webu muzea.“ | Spekulace („pravděpodobně“, humanizace vzorec 5). Podstatné je, že novější údaj od provozovatele chybí. | „Stejné časy uvádějí i Visit Plzeň a Kudy z nudy, novější údaj přímo od provozovatele ale chybí.“ | čeština | doporučené |
| „Do základního oddělení zaplatí dospělý 200 Kč, dítě od 6 do 15 let 100 Kč a dítě do 6 let 50 Kč.“ | Vazba „do oddělení zaplatí“ je neobratná. Zdroj navíc není ve větě u čísla (pravidlo §29), je až v poznámce pod tabulkou. | „Podle ceníku provozovatele stojí vstup do základního oddělení 200 Kč pro dospělého, 100 Kč pro dítě od 6 do 15 let a 50 Kč pro dítě do 6 let.“ | pravidla | doporučené |
| „Od areálu je vzdálená vzdušnou čarou zhruba 400 až 450 metrů.“ | Podmět (zastávka) je až ve vedlejší části předchozí věty za závorkou se zdroji, takže věta visí. | „Zastávka je od areálu vzdušnou čarou zhruba 400 až 450 metrů daleko.“ | čeština | doporučené |
| „Ano. Podle ceníku na webu provozovatele smějí psi do areálu na vodítku a majitelé po nich mají uklízet. Údaj pochází z webu aktualizovaného v roce 2021.“ | „2021“ je v textu už sedmkrát (odstavec o počtech, dvě poznámky pod tabulkami, odstavec o webu, „Ceník z roku 2021“, FAQ, box zdrojů). Tady je to navíc. | „Ano. Podle ceníku na webu provozovatele smějí psi do areálu na vodítku a majitelé po nich mají uklízet.“ | čeština | doporučené |
| „Exponáty stojí venku na louce, takže světlo se během dne mění.“ | Výplň s pochybnou příčinou („takže“), obecná pravda bez informace. | Větu vypustit. | čeština | doporučené |
| „Kudy z nudy uvádí zhruba dvě hodiny.“ | Údaj sedí, ale zdroj není prolinkovaný ve větě (ostatní citace v textu odkaz mají). | „<a href="https://www.kudyznudy.cz/aktivity/air-park-zruc-u-plzne">Kudy z nudy</a> uvádí zhruba dvě hodiny.“ | pravidla | doporučené |
| „Provozovatel to na webu neuvádí. Vezměte si hotovost, zvlášť pokud chcete zaplatit i vstupy do letadel.“ | Odpověď má 17 slov, cíl pod otázkou je ~45. Zároveň opakuje větu z oddílu Vstupné („vezměte si proto hotovost“). | „Provozovatel to na webu neuvádí a ani Visit Plzeň nebo Kudy z nudy způsob platby nezmiňují. Vezměte si hotovost, zvlášť pokud chcete zaplatit i vstupy do letadel, které se platí zvlášť (100 až 200 Kč za osobu).“ V oddílu Vstupné pak větu „Platbu kartou provozovatel nezmiňuje, vezměte si proto hotovost.“ vypustit. | pravidla | doporučené |
| „Podle ceníku…“ / „podle ceníku…“ (5× v textu) | Opakování stejné uvozovací formule v těsném sledu (odstavec o přístupných strojích, Tu-154M, oddíl Vstupné, dvě odpovědi ve FAQ). | V odpovědi „Dá se v Air Parku fotit?“ napsat: „Ano, fotografování i natáčení je zdarma.“ (zdroj je uveden o oddíl výš). | čeština | doporučené |
| Perex bez ceny: „…Podle webu provozovatele bývá otevřeno denně od března do října, v listopadu o víkendech a v zimě jen po telefonické domluvě.“ | Titulek slibuje vstupné, ale úvod (answer-first) cenu neobsahuje. | Na konec perexu doplnit: „Základní vstupné pro dospělé je podle ceníku 200 Kč.“ | pravidla | doporučené |
| Titulek „Air Park Zruč: letecké muzeum u Plzně, vstupné 2026“ | Rok v titulku pravidla chtějí (§36), ceník je ale z webu z roku 2021 a provozovatel ho pro rok 2026 nepotvrdil. Pro rok 2026 ho dokládá jen Visit Plzeň (© 2026), což text poctivě přiznává. Není to chyba, jen riziko, pokud se ceny změní. | Beze změny, po telefonickém ověření u provozovatele doplnit do poznámky pod ceníkem „ověřeno telefonicky [datum]“. | pravidla | doporučené |
| H2 „Co v Air Parku uvidíte“ a pod ním H3 „Jak muzeum vzniklo“ | Historie není podkapitolou toho, co návštěvník uvidí. Hierarchie nadpisů nesedí. | Změnit H3 na H2 „Jak muzeum vzniklo“ (případně „Kdo Air Park založil“). | pravidla | doporučené |

## Pravidla psaní: přehled

| pravidlo | stav |
|---|---|
| answer-first úvod (co, kde, kdy) | splněno, chybí jen cena (viz tabulka) |
| H2 podle toho, jak se lidé ptají | splněno ve formě §30 (Otevírací doba, Vstupné, Jak se tam dostat, Časté otázky) |
| odpověď ~45 slov pod otázkou | FAQ odpovědi mají 17–40 slov; kratší je jen „Platí se kartou?“ |
| fotka není první blok | splněno |
| zdroj u čísla ve větě | většinou splněno; u vstupného jen v poznámce pod tabulkou |
| datace proměnlivých údajů | splněno („Stav zdrojů k 21. 9. 2026“, květen 2021 u webu provozovatele) |
| konkrétní další krok na konci | splněno (telefon 606 945 360, odkazy na planespotting a radar) |
| titulek 40–60 / meta 120–155 | 51 / 140 znaků, excerpt v `blog.ts` 154 znaků |
| žádné FAQPage schema | splněno |
| em-pomlčky, uvozovky, nezlomitelné mezery | splněno |

## Závěr

Nutné opravy: **žádné**. Všechna čísla, data, ceny, časy, linky MHD, typy letadel v popiscích i historie odpovídají primárním zdrojům. Výše uvedené body jsou stylistická a strukturální doporučení.
