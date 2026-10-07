# Kontrola češtiny: Letiště Treviso (page.tsx)

Kontrola 7. 10. 2026 podle skillů `korektura-cz` a `humanizace` a podle `docs/redakcni-pravidla.md`. Článek zůstal beze změny, fakta také. Kde oprava stylu naráží na fakt, je to v tabulce i v poznámkách výslovně napsané. Čísla řádků odkazují na `src/app/blog/letiste-treviso/page.tsx` ve verzi, která byla na disku při kontrole (popisek „téměř denně“, bez věty o Brnu a Vídni a bez věty o odletové tabuli s Wizz Air do Iaşi, Skopje a Tirany). Soubor se během kontroly měnil; pokud se vrátí vyškrtnuté věty, viz oddíl „Skloňování“ na konci.

**Celkově:** Em-pomlčky ani rovné uvozovky v textu nejsou, české uvozovky „…“ jsou správně třikrát. Rozsahy (10. 8.–24. 10. 2026, 21:30–22:30, leden–srpen) jsou bez mezer, jednotky a € s mezerou. Titulek a ALT jsou v limitu, **popisek je po poslední úpravě o 3 znaky přes limit** (158). Hlavní problémy: dvojznačné „ho“ (město × letiště) v perexu a FAQ, chybějící zvratné „se“ („než na něj spolehnete“), věta FAQ „Treviso leží u stejnojmenného města“, několik souvětí spojených čárkou, opakování slov (ATVO, zdarma, průkaz, podle) a dva neohlídané fakty v drobných formulacích (Marco Polo Park u benátského letiště, „Od 25. 10. platí nový řád“).

## Délky (spočítáno `python3 len()`)

| Prvek | Znění | Délka | Limit | Stav |
|---|---|---|---|---|
| title | Letiště Treviso: lety z Prahy, doprava a parkování 2026 | 55 | 40–60 | v pořádku |
| description | Letiště Treviso (TSF) u Benátek: Ryanair z Prahy téměř denně, autobusy do Benátek a Trevisa, ceník parkování 2026 a kdy otevírá terminál. S vlastními fotkami. | **158** | 120–155 | přes limit (před úpravou „téměř“ měl 152) |
| ALT 1 | Airbus Wizz Air u stání na letišti Treviso, kolem vozíky na zavazadla, v pozadí další Wizz Air | 94 | do 100 | v pořádku |
| ALT 2 | Boeing 737 Ryanair zepředu, cestující nastupují po schodech s logem AER TRE | 75 | do 100 | v pořádku |
| ALT 3 | Boeing 737 Ryanair na stání u letiště Treviso, pohled zpod střechy terminálu | 76 | do 100 | v pořádku |

## Tabulka oprav

| ř. | Původní text | Problém | Navržená oprava |
|---|---|---|---|
| 16 | …ceník parkování 2026 a kdy otevírá terminál. S vlastními fotkami. | Popisek má 158 znaků (limit 155). „2026“ je zbytečně podruhé (už v titulku). Míchá podstatná jména a vedlejší větu ve výčtu („ceník… a kdy otevírá“) | Letiště Treviso (TSF) u Benátek: Ryanair z Prahy téměř denně, autobus do Benátek a Trevisa, ceník parkování 2026 a otevírací doba terminálu. (140 znaků; „S vlastními fotkami“ vypadne) – nebo kratší varianta bez roku: …autobusy do Benátek a Trevisa, ceník parkování a kdy otevírá terminál. (132 znaků) |
| 77 | …ale v Trevisu. Ryanair **ho** prodává jako „Venice Treviso“ | „Ho“ se gramaticky váže k „Trevisu“, tedy k městu. Prodává se letiště | …ale v Trevisu. Ryanair toto letiště prodává jako „Venice Treviso“ |
| 77 | a z Prahy **sem** v říjnu až prosinci 2026 létá téměř každý den | „Sem“ po předchozí větě odkazuje k městu; drobnost, po opravě výše zmizí | a z Prahy na něj v říjnu až prosinci 2026 létá téměř každý den |
| 77 | Z letiště jede autobus do Benátek **asi** 40 minut, do Trevisa na nádraží 10 minut. | „Asi 40“ v perexu, jinde (tabulka ř. 86, ř. 112, FAQ ř. 168) přesně „40 minut“. Eliptická druhá půlka („do Trevisa na nádraží 10 minut“) | Autobus z letiště jede do Benátek na Piazzale Roma 40 minut, na nádraží v Trevisu 10 minut. |
| 84 | spravuje i letiště Benátky, Verona a Brescia | Přípustná apozice, ale v tabulce působí jako nesklonný výčet | spravuje i letiště v Benátkách, Veroně a Brescii |
| 88 | Terminál otevřený | Popisek řádku jako přídavné jméno bez slovesa, ostatní řádky jsou podstatná jména | Otevírací doba terminálu |
| 107 | Podle letového řádu Ryanairu, **staženého** 7. 10. 2026, létá… | Vyprávění o rešerši („staženého“). Datum je už v poznámce pod tabulkou | Podle letového řádu Ryanairu (stav k 7. 10. 2026) létá… |
| 107 | Některé dny, v listopadu víc než polovinu, **jsou v řádu dva lety**. | Kostrbatá vazba („dny jsou… dva lety“), vsuvka bez předložky | V některých dnech, v listopadu ve více než polovině, létají dva spoje. |
| 107 | Plánovaný let trvá 1 hodinu 20 minut, Itálie má stejný čas jako Česko. | Dvě věty spojené čárkou, souvislost (žádný časový posun) není vyslovená | Plánovaný let trvá 1 hodinu 20 minut. Časový posun není, Itálie má stejný čas jako Česko. |
| 108 | Časy se mění **den ode dne**: v říjnu odlétá letadlo z Prahy **podle dne** mezi 6:15 a 20:10. | Opakování „den ode dne / podle dne“ | Časy se mění den ode dne: v říjnu odlétá letadlo z Prahy mezi 6:15 a 20:10. |
| 108 | Hlavní spoj **má číslo** FR 1530 (Praha–Treviso) a FR 1531 (zpět) | Jeden spoj, dvě čísla | Hlavní spoj létá pod čísly FR 1530 (Praha–Treviso) a FR 1531 (zpět) |
| 108 | FR 1531 do Prahy **měl odlet** v 16:00 | Neobratné, nesouměrné s „přistával“ | a FR 1531 do Prahy odlétal v 16:00 |
| 109 | **Odlety z české strany** najdete na stránce Letiště Praha, konkrétní let pak **sledujete podle** návodu jak sledovat let **podle** čísla. | Po vyškrtnutí věty o Brně a Vídni chybí kontext pro „z české strany“. Dvě věty spojené čárkou. Oznamovací „sledujete“ místo možnosti. „Podle… podle“ | Odlety z Prahy najdete na stránce Letiště Praha. Postup, jak konkrétní let sledovat, popisuje návod jak sledovat let podle čísla. |
| 113 | Při zpoždění letu se posouvají a při zrušení **letů** se ruší. | Nesouměrné číslo (letu × letů) | Při zpoždění letu se posouvají, při zrušení letu se ruší. |
| 113 + 123 | Jízdní řád platí od 10. 8. do 24. 10. 2026 … platný 10. 8.–24. 10. 2026 | Platnost řádu je v těle dvakrát za sebou (odstavec nad tabulkou a poznámka pod ní), potřetí v SourcesBox a počtvrté v poznámce SourcesBox | V poznámce pod tabulkou nechat jen „Zdroj: jízdní řád ATVO 351.“ a další větu (viz ř. 123) |
| 123 | Od 25. 10. 2026 **platí nový řád**. | **Fakt:** že od 25. 10. platí nový řád, je odvozené, `zdroje.md` uvádí jen konec platnosti 24. 10. Jako tvrzení navíc nic neříká | Od 25. 10. 2026 si ověřte nový řád. (Věcně neměněno, jen formulace bez tvrzení.) |
| 124 | Pokud letíte později, **zbývá** vlak z Benátek do Trevisa a odtud AirLink | **Fakt:** „zbývá“ tvrdí, že jiná možnost není. Barzi Service (ř. 125) jezdí na letiště taky a jeho jízdní řád nebyl čten (`zdroje.md`) | Pokud letíte později, můžete jet vlakem z Benátek do Trevisa a odtud AirLinkem |
| 125 | Jízdenky **ATVO** koupíte online, v automatu **ATVO** ve výdeji zavazadel nebo v pokladně **ATVO** v příletové hale, v Benátkách v pokladně na Piazzale Roma. | Čtyřikrát ATVO v jedné větě, letiště a Benátky slité čárkou | Jízdenky ATVO koupíte online, na letišti v automatu ve výdeji zavazadel nebo v pokladně v příletové hale a v Benátkách v pokladně na Piazzale Roma. |
| 125 | Cenu jsme na webu ATVO nenašli, zobrazí se až v e-shopu dopravce. | V pořádku jako jedno ze dvou přiznání (viz „Co neměnit“) | beze změny |
| 125 | **Druhý přímý autobus**, Barzi Service, jezdí z letiště na nádraží **Venezia Mestre** | Barzi Service je dopravce, ne autobus. V ř. 112 je totéž nádraží „nádraží Mestre“ | Druhou přímou linku provozuje Barzi Service: z letiště na nádraží Mestre a na Tronchetto v Benátkách (nebo sjednotit na „Venezia Mestre“ v obou místech) |
| 130 | **jezdí** přímý autobus… autobusy **jezdí** každých 30 minut | Opakování slovesa | Na hlavní nádraží Treviso Centrale vozí cestující přímý autobus Treviso AirLink dopravce MOM. Cesta trvá 10 minut a spoje jedou každých 30 minut… |
| 130 | Odpoledne jeden spoj **vypadne**, z letiště po 14:10 jede další až v 15:40 | Hovorové „vypadne“. **Fakt:** při intervalu 30 minut znamená mezera 14:10 → 15:40 dva chybějící spoje (14:40 a 15:10), ne jeden. `zdroje.md` uvádí „chybí odjezd 14:40“ i „další až 15:40“, což si odporuje. Ověřit u MOM | Odpoledne je v řádu mezera: z letiště po 14:10 jede další spoj až v 15:40. (Počet chybějících spojů neuvádět, dokud se neověří.) |
| 132 | platí 24 hodin od prvního označení **na celé městské síti** Trevisa | Slovosled svádí ke čtení „označení na síti“ | Jízdenka stojí 5 € a platí 24 hodin od prvního označení, a to na celé městské síti Trevisa. |
| 133 | V autobusu zaplatíte bezkontaktně kartou **nebo telefonem**. Děti do 4 let… | Dvě nesouvisející věci v jedné odrážce. **Fakt:** „telefonem“ zdroj výslovně neuvádí, `zdroje.md` má „kartou bezkontaktně (Tap to pay)“ | Rozdělit na dvě odrážky. Platbu ponechat podle zdroje: V autobusu zaplatíte bezkontaktně kartou. (Telefon jen po ověření.) |
| 135 | Zastávky jsou **na ulici Via** Noalese | Pleonasmus (ulice + via) | Zastávky jsou na Via Noalese u pěší lávky. |
| 137 | Trenitalia u kombinované jízdenky uvádí jiné **časy, 15 minut jízdy** a odjezdy z letiště do 23:10. | „15 minut jízdy“ není čas odjezdu; výčet připojený čárkou | Trenitalia u kombinované jízdenky uvádí jiné údaje: 15 minut jízdy a odjezdy z letiště až do 23:10. |
| 137 | Řídili jsme se jízdním řádem dopravce MOM. | Druhé přiznání práce s rešerší; pravidla chtějí rozpor zdrojů vysvětlit, takže smysl má. Lze věcněji | Údaje výše jsou podle jízdního řádu dopravce MOM. (Nebo ponechat; pak je to druhé a poslední přiznání v textu.) |
| 138 | Taxi stojí u vchodu do terminálu v přízemí, zajišťuje je Radio Taxi Treviso, nonstop na čísle +39 0422 431515. | Tři informace spojené čárkami | Taxi stojí u vchodu do terminálu v přízemí. Zajišťuje je Radio Taxi Treviso, nonstop na čísle +39 0422 431515. |
| 141 | Parkoviště u letiště provozuje Marco Polo Park, **stejná firma jako u letiště v Benátkách**. | Přilepený nominativ. **Fakt:** že stejná firma provozuje parkoviště u Marco Polo, `zdroje.md` nedokládá; v `neovereno.md` je to jen domněnka výzkumníka | Parkoviště u letiště provozuje Marco Polo Park. (Dovětek o Benátkách vypustit, nebo po ověření: …Marco Polo Park, která má na starosti i parkování u letiště v Benátkách.) |
| 156 | Denní sazba platí za každý započatý den. | **Fakt:** tato věta v `zdroje.md` není (výslovně jen u A „za každou započatou hodinu“). Ověřit na ceníku | beze změny formulace, jen ověřit |
| 157 | Než **na něj spolehnete**, ověřte si cenu v rezervaci. | Chybí zvratné zájmeno, „spolehnout se na“ | Než se na něj spolehnete, ověřte si cenu v rezervaci. |
| 157 | Při rezervaci online kamera u vjezdu načte **SPZ** | „SPZ“ je hovorové, úředně registrační značka. Čtenáři rozumí, ponechat lze | Při rezervaci online kamera u vjezdu načte registrační značku (SPZ) |
| 157 | **Rezervaci pozná** nejdřív 3 hodiny před a nejpozději 3 hodiny po rezervovaném čase příjezdu. | Nevyjádřený podmět (kdo pozná?), „před… po“ visí bez předmětu | Systém rezervaci rozpozná nejdříve 3 hodiny před rezervovaným časem příjezdu a nejpozději 3 hodiny po něm. |
| 157 | **Na** vysazení a vyzvednutí je určené parkoviště A, prvních 10 minut je zdarma. | „K vysazení“. „Prvních 10 minut zdarma“ je o pár řádků výš v tabulce | K vysazení a vyzvednutí slouží parkoviště A s prvními 10 minutami zdarma. (nebo dovětek vypustit) |
| 157 | Držitelé **průkazu** ZTP parkují zdarma, **průkaz** si ale musí nechat ověřit **v informacích** v odletové hale, s originálem **průkazu** a dokladem totožnosti | Třikrát „průkaz“, „v informacích“ místo „u informačního pultu“, dlouhé souvětí. **Fakt:** „průkaz ZTP“ je česká kategorie; zdroj mluví o průkazu osoby se zdravotním postižením obecně. Jestli letiště uzná český průkaz ZTP, zdroj neříká | Lidé s parkovacím průkazem pro osoby se zdravotním postižením parkují zdarma. Originál průkazu si ale spolu s dokladem totožnosti musí nechat ověřit u informačního pultu v odletové hale. (Formulaci „ZTP“ změnit jen po ověření.) |
| 160 | **Spát v terminálu se nesmí**, takže na ranní let přes noc nečekejte | V pořádku, jen „v terminálu“ podruhé za sebou (věta předtím mluví o terminálu) | Spát se tu nesmí, takže na ranní let přes noc nečekejte |
| 161 | Wi-Fi je **zdarma**, nabíjecí místa **zdarma** jsou na všech podlažích, bankomaty v příletech i odletech. | Dvakrát „zdarma“, tři věci spojené čárkami | Wi-Fi i nabíjecí místa na všech podlažích jsou zdarma, bankomaty najdete v příletech i odletech. |
| 161 | které mohou používat **lidé** od 12 let s biometrickým pasem **ze zemí EU** | „Lidé“ mimo registr (jinde „cestující“). „Pas ze zemí EU“ neobratné. **Fakt:** tento údaj (stránka flights/info) v `zdroje.md` není; ověřit, zda brány nejsou i pro EHP/Švýcarsko | …které mohou používat cestující od 12 let s biometrickým pasem vydaným v EU |
| 163 | Za leden až srpen 2026 letiště odbavilo… **Benátky Marco Polo měly**… | Odstavec o statistice stojí pod H2 „Kdy otevírá terminál a co v něm najdete?“, kam věcně nepatří (po vyškrtnutí věty o tabuli odletů zůstal osamocený). „Benátky měly“ míchá město a letiště | Přesunout pod úvodní tabulku nebo do H2 o letech. Letiště Marco Polo v Benátkách mělo za stejnou dobu 8 675 577 cestujících. |
| 168 | Benátky mají vlastní letiště Marco Polo. | Otázka je zjišťovací (ano/ne), odpověď nezačíná odpovědí | Ne, Benátky mají vlastní letiště Marco Polo. |
| 168 | **Treviso leží u stejnojmenného města** | Treviso je to město. Myslí se letiště | Letiště Treviso leží u stejnojmenného města |
| 168 | a do Benátek na Piazzale Roma jede autobus ATVO 40 minut. Ryanair **ho** prodává… | Stejné dvojznačné „ho“ jako v perexu (předchozí podmět je „autobus ATVO“) | Autobus ATVO z něj jede na Piazzale Roma v Benátkách 40 minut. Ryanair letiště prodává pod názvem „Venice Treviso“. |
| 174 | Podle ceníku na místě vyjde týden na parkovišti D na 7 × 15 €, tedy 105 €. | Čeština v pořádku. **Rozpor s tabulkou:** čtenář vidí v tabulce C za 5 €/den a FAQ ho mlčky vynechává. Přepočet pro C (35 €) by byl dopočet, proto jen výhrada slovy | Doplnit větu bez čísla: Parkoviště C je v ceníku ještě levnější, cenu si ale ověřte v rezervaci. |
| 179 | Den před odletem si můžete **letadlo, které vás poveze**, najít na radaru. | **Fakt / logika:** den předem se na radaru dá najít nanejvýš spoj se stejným číslem, ne konkrétní letadlo, které poletí zítra | Den před odletem si můžete na radaru najít spoj se stejným číslem a podívat se, odkud letadlo přilétá. (nebo prostě: Lety z Trevisa a do Trevisa můžete sledovat na radaru.) |
| 197 | Ryanair: letový řád Praha–Treviso (**listopad 2026**, data JSON) | Text čerpá i z října a prosince, odkaz i popis jen na listopad | Ryanair: letový řád Praha–Treviso (data JSON, ukázka za listopad 2026) |
| 203 | Zdroje ověřeny **7. října 2026**… platí do **24. 10. 2026** | Dva formáty data v jedné poznámce. V textu se střídá „7. 10. 2026“ (ř. 93, 107, 156) a „7. října“ (ř. 108) | Sjednotit, např. Zdroje ověřeny 7. 10. 2026. … datum 25. 5. 2026 … |
| 203 | datum 25. května 2026 **vychází z názvů** originálních souborů | Přiznání původu data je správné, jen zbytečně odborné | datum 25. května 2026 je podle názvů originálních souborů |
| 98–102 | `id` kotvy `…-do-treviso` | Mimo češtinu pro čtenáře: kotvy mají nesklonné „treviso“, nadpisy „Trevisa“. Funkčně v pořádku, neměnit kvůli odkazům | beze změny |

## Poznámky mimo češtinu (fakta neměněna, jen upozornění)

- **AirLink, odpolední mezera (ř. 130):** „jeden spoj vypadne“ a „po 14:10 další až v 15:40“ si při 30minutovém intervalu odporují. Rozpor je už v `zdroje.md`. Ověřit na řádu MOM.
- **Marco Polo Park u benátského letiště (ř. 141):** nedoloženo, v `neovereno.md` jen jako domněnka.
- **„Od 25. 10. platí nový řád“ (ř. 123)** a **„zbývá vlak“ (ř. 124)** jsou odvozené tvrzení, ne fakta ze zdroje.
- **„Telefonem“ (ř. 133)**, **„za každý započatý den“ (ř. 156)** a **pasové brány pro pasy EU (ř. 161)** nejsou v `zdroje.md`. Buď doplnit do rešerše, nebo zmírnit.
- **Průkaz ZTP (ř. 157):** česká kategorie dosazená za obecný „disabled badge“.
- **Radar (ř. 179):** slib, že den předem najdete „letadlo, které vás poveze“, se nedá splnit.
- **Rozpor perex × tělo vyřešen:** perex a tabulka už mají „téměř denně“, tělo „každý den, jedinou výjimkou je 25. prosinec“. Sedí to. Délky letu (1 h 20 min), AirLinku (10 minut, 5 €), ATVO (40 minut), otevření terminálu (5:00, kolem půlnoci) a počet cestujících (2 192 520) jsou v těle, tabulce a FAQ shodné.

## Skloňování

- **Treviso** se v textu skloňuje správně: v Trevisu, do Trevisa, městské síti Trevisa. Nesklonné „Treviso“ jen jako součást názvu (letiště Treviso, Treviso Centrale, Treviso AirLink), to je správně.
- **Iaşi, Skopje, Tirany:** věta s nimi v aktuální verzi není. Pokud se vrátí: „do Iași“ (nesklonné; rumunsky správně se znakem ș s čárkou pod písmenem, ne ş se sedilou), „do Skopje“ (nesklonné), „do Tirany“ (správně). Za „Wizz Air tři“ dvojtečka místo čárky: „…a Wizz Air tři: do Iași, Skopje a Tirany.“

## Co se měnit NEMÁ (bod 18)

- **Perexová otázka** „Letíte z Prahy do Benátek s Ryanairem? Pak nepřistanete na benátském letišti Marco Polo, ale v Trevisu.“ Je to přesně ta informace, kvůli které čtenář přišel, a zní lidsky.
- **„Pevný čas odletu ale nečekejte.“** Krátká správná věta, láme rytmus.
- **„Do centra Benátek auta ani autobusy nevjedou, z Piazzale Roma pokračujete pěšky nebo vaporettem.“** Praktický detail pro člověka, který Benátky nezná.
- **„Na večerní odlet si dejte pozor.“** a celý odstavec s náhradní cestou vlakem: konkrétní varování, které vychází z jízdního řádu.
- **„Cenu jsme na webu ATVO nenašli, zobrazí se až v e-shopu dopravce.“** Jediné plné přiznání mezery, poctivé a užitečné.
- **„Parkoviště C je v ceníku výrazně levnější než ostatní. Než se na něj spolehnete, ověřte si cenu v rezervaci.“** Přiznaná nejistota u čísla, které vypadá podezřele (po opravě „se“).
- **„…žádné tlačítko nemačkejte.“** Těžko vymyslitelný provozní detail.
- **„Spát v terminálu se nesmí, takže na ranní let přes noc nečekejte“** a **„První autobus ATVO z Benátek je na letišti právě v 5:00.“** Spojení dvou faktů do praktického závěru, nejlepší místo textu.
- **„Logo AER TRE na schodech patří provozovateli letiště.“** Popisek, který fotku vysvětluje, ne jen popisuje.
- **Suchý ceník parkování a tabulky** (sazby, „do 1 h 5 €“, „pár minut od terminálu“). Tam je věcný tón správně, nerozepisovat.
- **Konec bez shrnutí** (FAQ a odkaz na radar). Nepřidávat závěrečný odstavec.

## Zní text jako od člověka?

Ano, zní jako věcný průvodce od člověka, který jízdní řády opravdu četl; nejvíc strojová je jednotvárnost středně dlouhých vět spojovaných čárkou do tří informací najednou (ř. 125, 138, 157, 161) a dvojí „ho“, které ukazuje, že text skládal někdo, kdo nečetl souvislosti nahlas.
