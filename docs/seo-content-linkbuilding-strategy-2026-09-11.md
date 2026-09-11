# Obsahová a linkbuildingová strategie FlyQueens

## Shrnutí rozhodnutí

FlyQueens nemá začít výrobou desítek obecných článků o létání. Nová doména bez
odkazů a historie by tím vytvořila mnoho slabých URL, ale málo důvodů, proč by
ji měl Google nebo čtenář považovat za nejlepší zdroj. Správný postup je
vybudovat tři provázané tematické celky:

1. **Radar a sledování letů** — produkt `/radar` jako hlavní stránka a články,
   které vysvětlují identifikaci, data a situace pozorované na mapě.
2. **Česká letiště** — praktické huby Praha, Brno a Ostrava; přílety a odlety
   až po připojení spolehlivého schedule API.
3. **Praktické rozhodnutí před cestou** — zejména parkování, kde je podle
   Marketing Mineru nejvyšší hledanost i CPC a tedy nejbližší možnost příjmu.

Marketing Miner eviduje pro nový web nulovou organickou návštěvnost a žádná
rankingová klíčová slova. To je běžný start, ale znamená to, že první měsíce
musí být cílem indexace, první imprese, tematické odkazy a ověření, zda lidé
přecházejí z obsahu do radaru nebo na komerční nabídku — ne slib okamžitého
výdělku.^1

## Metodika, kterou má FlyQueens používat

### Jedna potřeba, jedna nejlepší URL

Jedna stránka může přirozeně pokrýt více různých formulací stejného záměru.
Ahrefs doporučuje klíčová slova seskupovat podle podobnosti záměru a výsledků
vyhledávání; blízké varianty není vhodné bezdůvodně rozdělovat do samostatných
stránek.^2 Strategie se nemá řídit pouze objemem. Má určit, které dotazy jsou
pro web relevantní, jaký typ stránky vyžadují, jak jsou obchodně hodnotné a zda
je nový web schopen pro ně vytvořit konkurenceschopnou odpověď.^3

Pro FlyQueens z toho vyplývá:

- `radar letadel`, `letecký radar`, `letový radar` a `letadla online` patří
  společně na `/radar`;
- `sledování letů podle čísla` a `sledování letadel podle čísla letu` patří do
  jednoho návodu;
- `jak vysoko létají letadla`, `letová hladina` a `co znamená FL350` patří do
  jednoho existujícího článku;
- `squawk 7700`, `7600` a `7500` patří do jednoho existujícího článku;
- `parkování letiště Praha` a jeho blízké varianty patří na jednu kvalitní
  srovnávací landing page, ne do pěti článků;
- `přílety` a `odlety` mají vlastní URL pouze tehdy, když FlyQueens skutečně
  poskytne živé tabule odpovídající tomuto záměru.

### Záměr určuje typ obsahu

Ahrefs při kontrole search intentu používá tři otázky: jaký **typ** stránky,
jaký **formát** a jaký **úhel** pohledu převažuje ve výsledcích.^4 Aktuální
české výsledky ukazují, že obecný radar je nástroj, parkování je srovnání nebo
rezervační stránka a otázky typu „proč letadlo krouží“ potřebují jasné
vysvětlení. FlyQueens proto nesmí tlačit všechna KW do blogu.

### Informace navíc, ne přepis konkurence

Google doporučuje původní informace, výzkum nebo analýzu, jasné zdroje,
důvěryhodné autorství a obsah, po kterém čtenář nemusí pokračovat v hledání
lepší odpovědi. Zároveň výslovně varuje před masovou výrobou obsahu primárně
kvůli návštěvám z vyhledávače.^5 Každý nový článek FlyQueens proto musí mít
alespoň jeden vlastní prvek:

- interaktivní údaj z živé mapy;
- vlastní tabulku nebo kalkulačku;
- vlastní mapový příklad;
- aktuální fotografie z letiště nebo spottingu;
- citaci a kontrolu pilota, dispečera, meteorologa nebo zkušeného spottera;
- vlastní datový rozbor s popsanou metodikou.

Samotné přepsání deseti konkurenčních článků do jiných slov není dostatečná
hodnota.

## Audit současného obsahu

### Co je udělané dobře

- Pět článků má jedinečný title, H1, meta description, canonical, velký
  obrázek, `BlogPosting` strukturovaná data a box s primárními zdroji.
- Články začínají krátkou odpovědí a pokračují praktickými podotázkami.
- Existují kontextové odkazy do radaru, na letiště, statistiky a související
  články.
- Fotografie jsou skutečné, nikoli generické AI ilustrace, a uvádějí autora.
- `max-image-preview:large` a velké OG obrázky odpovídají doporučení Googlu pro
  obrazové náhledy a Discover, kde jsou doporučené reprezentativní obrázky
  alespoň 1 200 px široké.^6

### Co je potřeba opravit před větší publikační vlnou

1. **Důvěryhodnost autora.** Články uvádějí autora jako organizaci FlyQueens,
   ale schema odkazuje na neexistující `/o-nas`; reálná stránka je
   `/o-projektu`. Opravit URL, na článku ukázat viditelné autorství a ideálně
   přidat odborného recenzenta s krátkým medailonkem. Google výslovně doporučuje
   jasné informace o autorovi a jeho zkušenosti.^5
2. **Breadcrumb data.** Vizuální drobečková navigace existuje, ale chybí
   jednotné `BreadcrumbList` schema.
3. **Tematické huby.** `/blog` je jen chronologický seznam. Potřebuje sekce
   „Radar a sledování“, „Jak číst data“ a „Letiště prakticky“, které budou
   odkazovat na všechny své podstránky a naopak. Obsahové huby pomáhají lidem i
   vyhledávačům pochopit vztahy mezi stránkami.^7
4. **FAQ očekávání.** Viditelná FAQ jsou užitečná pro čtenáře, ale schema
   `FAQPage` FlyQueens běžně nepřinese rozšířený výsledek. Google jej od roku
   2023 pravidelně zobrazuje jen známým autoritativním zdravotním a vládním
   webům.^8 Komentáře v kódu ani reporting nemají slibovat „bohatší snippet“.
5. **Měřicí základ.** Ověřit vlastní Google Search Console property, odeslat
   sitemap a začít vyhodnocovat stránky a dotazy. Bez těchto dat nelze po
   publikaci poznat, zda problém tvoří indexace, záměr, CTR, obsah nebo odkazy.

## Mapa klíčových slov a vlastníků URL

Hledanost níže je měsíční model Marketing Mineru pro český trh. Varianty ve
stejném řádku se nesčítají — často se překrývají a jedna stránka může rankovat
na více z nich.^1

| Vlastník tématu | Primární KW | Měsíčně | Sekundární měřené KW | Typ a záměr | Rozhodnutí |
|---|---|---:|---|---|---|
| `/radar` | radar letadel | 2 900 | letecký radar 4 700; letadla online 1 700; letový radar 860; radar letadel online 360 | nástroj, okamžité použití | P0: posilovat produktovou stránku, nevytvářet další obecný článek |
| `/blog/jak-sledovat-let-podle-cisla` | sledování letů podle čísla | 700 | sledování letadel podle čísla letu 640; sledování letu 710 | návod | P0: zachovat a rozšířit podle GSC |
| `/blog/co-mi-leti-nad-hlavou` | co mi letí nad hlavou | bez měřitelného objemu | letadlo nade mnou; jaké letadlo mi letí nad hlavou | otázka + použití nástroje | P1: ponechat, dobré produktové a sociální téma |
| `/blog/letiste-praha-zive` | letiště Praha online | 890 | letadla nad Prahou 120; webkamera letiště Praha 700 | rozcestník zdrojů | P1: aktualizovat, ale neslibovat vlastní webkameru ani tabuli |
| `/blog/jak-vysoko-letaji-letadla` | jak vysoko létají letadla | 240 | letová hladina 60; `FL350` zatím bez dat | vysvětlení | P1: jedna stránka, samostatný článek o FL350 by kanibalizoval |
| `/blog/squawk-nouzove-kody` | squawk 7700 | 190 | squawk 7600 70; squawk 7500 40 | vysvětlení, eventový dotaz | P1: zachovat a aktualizovat při změně zdrojů |
| `/letiste/praha/parkovani` | parkování letiště Praha | 12 000 | na letišti 3 300; u letiště 1 700; nejlevnější 590; levné 290 | komerční srovnání | P0: hlavní monetizační landing page |
| `/letiste/brno/parkovani` | parkování letiště Brno | 1 200 | rozšířit MM o cenu, délku a transfer | lokální komerční | P1: ověřené ceny a vlastní fotografie |
| `/letiste/ostrava/parkovani` | parkování letiště Ostrava | 680 | rozšířit MM o P1–P6 a cenu | lokální komerční | P1: zajímavé CPC 6,16 Kč |
| budoucí `/letiste/praha/odlety` | letiště Praha odlety | 12 000 | odlety Praha dnes 170 | živá tabule | P0 až po schedule API; ne blog |
| budoucí `/letiste/praha/prilety` | letiště Praha přílety | 8 400 | přílety Praha dnes 220 | živá tabule | P0 až po schedule API; ne blog |
| budoucí Brno/Ostrava tabule | letiště + odlety/přílety | 260–1 200 | lokální varianty | živá tabule | P1 až po schedule API |

`flight radar` s 68 000 hledáními není vhodný primární cíl. Výsledky jsou silně
navigační a spojené se zavedenými globálními trackery; vysoký objem proto
neznamená dosažitelný ani kvalitní provoz pro novou českou značku.

## Publikační plán na šest měsíců

Tempo má být nejvýše dva nové kvalitní texty měsíčně. Vedle nich se každý měsíc
aktualizuje jedna důležitá existující stránka. Google nemá preferovaný počet
slov a Ahrefs doporučuje průběžně aktualizovat nebo konsolidovat obsah podle
výkonu a změny záměru, nikoli pouze měnit datum.^5,9

### Nultý měsíc — základ před publikováním

- opravit autorství a neexistující `/o-nas`;
- přidat viditelnou metodiku zdrojů a odbornou revizi článků;
- přestavět `/blog` na tři tematické huby;
- ověřit Search Console a začít ukládat výchozí stav impresí;
- doplnit do Marketing Mineru rozšiřující seed list uvedený níže;
- nafotit Letiště Praha, přístupové cesty, parkoviště a spottingová místa.

### Měsíc 1 — rychlost a limity radaru

#### 1. Jak rychle letí dopravní letadlo

- **Navržená URL:** `/blog/jak-rychle-leti-letadlo`
- **Primární měřené KW:** `rychlost letadla` — 190/měsíc.
- **Doplnit v MM:** rychlost dopravního letadla, rychlost letadla při vzletu,
  přistávací rychlost letadla, cestovní rychlost letadla, uzly na km/h.
- **Záměr a formát:** rychlá číselná odpověď + srovnávací tabulka + vysvětlení.
- **Unikátní prvek:** živý příklad skutečné ground speed z radaru, převodník
  uzly/km/h/Mach a jasný rozdíl mezi rychlostí vůči zemi a vzduchu.
- **Osnova:** rychlá odpověď; vzlet; cestovní let; přiblížení; proč neexistuje
  jedna univerzální rychlost; co přesně ukazuje FlyQueens; tabulka typů.
- **Interní odkazy:** `/radar`, článek o výšce, budoucí slovník údajů.

#### 2. Proč některé letadlo na radaru není

- **Navržená URL:** `/blog/proc-letadlo-neni-na-radaru`
- **Primární kandidát:** ověřit MM; sekundárně `radar vojenských letadel`
  30/měsíc.
- **Záměr a formát:** diagnostický článek odpovídající reálné frustraci
  uživatele.
- **Unikátní prvek:** diagram ADS-B → přijímač → agregátor → FlyQueens a
  aktuální popis 30sekundového filtru čerstvosti.
- **Povinné nuance:** nízká výška, pokrytí přijímači, chybějící pozice,
  blokování některých letů, rozdíl mezi primárním radarem a veřejným ADS-B.
- **Zakázaný slib:** „ukážeme všechna vojenská letadla“.

Aktualizovat `/radar`: krátký viditelný úvod pro `radar letadel`, přesný rozsah
250 NM, zdroj a čerstvost. Nepřidávat dlouhý SEO text před samotnou mapu.

### Měsíc 2 — chování letadel a princip dat

#### 3. Proč letadlo krouží nad městem

- **Navržená URL:** `/blog/proc-letadlo-krouzi`
- **Primární kandidát:** `proč letadlo krouží`; před zadáním ověřit objem a
  SERP v MM.
- **Záměr a formát:** vysvětlení příčin, ne diagnóza konkrétního letu.
- **Unikátní prvek:** vlastní nákres holding patternu, okruhu letecké školy,
  vyčkávání kvůli počasí a mapovacího letu.
- **Bezpečnost:** z trajektorie samotné nevyvozovat nouzi. Uvést, co lze a
  nelze poznat ze squawku, výšky a kurzu.
- **Interní odkazy:** radar, squawk článek, letiště Praha živě.

#### 4. Co je ADS-B a jak funguje „radar letadel“

- **Navržená URL:** `/blog/co-je-ads-b`
- **Primární kandidáti:** ADS-B, jak funguje radar letadel, letecký
  transpondér; ověřit v MM.
- **Záměr a formát:** srozumitelný technický pillar.
- **Unikátní prvek:** vlastní schéma datové cesty, tabulka údajů vysílaných
  přímo versus údajů doplněných jinou databází a ukázka skutečného stáří bodu.
- **Linkbuildingový účel:** citovatelný český zdroj pro školy, média a
  technologické weby.

Aktualizovat článek o sledování podle čísla: doplnit anonymizované ukázky
callsignu, registrace a ICAO adresy a odkázat na ADS-B pillar.

### Měsíc 3 — vizuální identifikace a počasí

#### 5. Airbus A320 vs. Boeing 737: jak je poznat

- **Navržená URL:** `/blog/airbus-a320-vs-boeing-737`
- **KW k měření:** A320 vs Boeing 737, jak poznat Airbus a Boeing, rozdíl A320
  737, typy dopravních letadel.
- **Záměr a formát:** obrazové srovnání.
- **Unikátní prvek:** vlastní fotografie z podobných úhlů, popisky nosu,
  podvozku, motorů, zakončení křídel a variant. Fotografie z letiště zde mají
  vyšší hodnotu než AI obrázky.
- **Distribuce:** spottingové skupiny, letecké školy a fotografové.

#### 6. Kondenzační stopa za letadlem: proč vzniká a mizí

- **Navržená URL:** `/blog/kondenzacni-stopa-za-letadlem`
- **KW k měření:** kondenzační stopa za letadlem, bílá čára za letadlem, proč
  letadla dělají čáry.
- **Záměr a formát:** vědecké vysvětlení s ilustrací podmínek.
- **Unikátní prvek:** jednoduchý graf teploty/vlhkosti a fotografie spojená s
  výškou konkrétního letu na radaru.
- **Zdroje:** meteorologické a letecké primární zdroje; článek nemá stavět
  titulek na konspiračním clickbaitu.

Aktualizovat článek o výšce: přidat interní odkaz na rychlost a kondenzační
stopu, zkontrolovat tabulku podle aktuálních typových zdrojů.

### Měsíc 4 — vlastní zkušenost z letiště

#### 7. Planespotting na Letišti Praha: místa, světlo a pravidla

- **Navržená URL:** `/letiste/praha/planespotting` — letištní guide, ne běžný
  blogový článek.
- **KW k měření:** planespotting Praha, kde sledovat letadla Praha, spotting
  letiště Praha, vyhlídkový val letiště Praha.
- **Unikátní prvek:** vlastní fotografie, mapa legálních stanovišť, směr světla,
  přístup bez auta, bezpečnost a datum osobní kontroly.
- **Konkurence:** oficiální Letiště Praha i specializované spottingové služby
  už mají kvalitní obsah; bez osobní návštěvy a lepší praktické mapy tuto URL
  nevydávat.^10

#### 8. Proč slyšíme letadlo jinde, než ho vidíme

- **Navržená URL:** `/blog/proc-je-zvuk-letadla-pozadu`
- **KW k měření:** zvuk letadla zpoždění, proč slyším letadlo, letadlo nad
  hlavou zvuk.
- **Unikátní prvek:** kalkulačka zpoždění zvuku podle výšky a vysvětlení s
  aktuálním letem. Téma rozšiřuje již existující „co mi letí nad hlavou“, ale
  samostatnou URL získá pouze při odlišném SERPu nebo prokazatelném zájmu.

Aktualizovat parkování Praha vlastními fotografiemi, datum kontroly a skutečně
srovnatelnou tabulkou pro stejný modelový termín. Bez aktuálních cen nepoužívat
„nejlevnější“ jako tvrzení.

### Měsíc 5 — linkovatelný nástroj a první datový test

- Vytvořit `/nastroje/letova-hladina`: kalkulačka FL ↔ stopy ↔ metry se
  stručným vysvětlením. Existující článek zůstane vlastníkem informačního KW;
  nástroj řeší výpočet a z článku se na něj odkazuje.
- Začít ukládat agregované anonymní snapshoty provozu do databáze pouze po
  kontrole licenčních podmínek. Cíl: vlastní metodicky popsaný „Index provozu
  nad Českem“, ne historie jednotlivých citlivých letů.
- Aktualizovat parkování Brno a Ostrava podle skutečné návštěvy, fotografií a
  ověřených ceníků.

### Měsíc 6 — rozhodnutí podle dat

- Pokud je připojeno spolehlivé schedule API, vytvořit skutečné `/prilety` a
  `/odlety` stránky nejdřív pro Prahu. Teprve po ověření dostupnosti a přesnosti
  rozšířit Brno a Ostravu.
- Bez schedule API tyto URL nevydávat. Místo nich aktualizovat dva články s
  nejvyššími impresemi v GSC a vytvořit první veřejný datový přehled.
- Zkontrolovat kanibalizaci, stránky bez interních odkazů, dotazy na pozicích
  8–30 a témata, u kterých Google ukazuje FlyQueens na jiné URL, než bylo
  plánováno.

## Rozšiřující seznam pro Marketing Miner

Před napsáním nových textů je potřeba změřit následující skupiny. Neznámý objem
není nula; znamená, že současný export dotaz neobsahuje.

### Rychlost a jednotky

- jak rychle letí letadlo
- rychlost dopravního letadla
- rychlost letadla při vzletu
- přistávací rychlost letadla
- cestovní rychlost letadla
- rychlost letadla v uzlech
- kolik je jeden uzel km h
- ground speed vs airspeed
- co znamená mach

### Chování na mapě

- proč letadlo krouží
- vyčkávací okruh letadla
- holding letadlo
- proč letadlo nepřistálo
- proč letadlo zmizelo z radaru
- proč letadlo není na radaru
- radar soukromých letadel
- vojenská letadla online
- jak funguje ads-b
- co je transpondér v letadle

### Pozorování letadel

- planespotting Praha
- kde sledovat letadla Praha
- vyhlídkový val letiště Praha
- spotting letiště Praha
- jak poznat typ letadla
- Airbus A320 vs Boeing 737
- rozdíl Boeing Airbus
- zvuk letadla zpoždění
- proč je za letadlem bílá čára
- kondenzační stopa

### Praktická cesta na letiště

- parkování letiště Praha 7 dní
- parkování letiště Praha 8 dní
- parkování letiště Praha cena
- parkování letiště Praha s transferem
- parkování letiště Praha bez předání klíčů
- parkování terminál 1 / terminál 2
- vyzvednutí cestujícího letiště Praha
- expresní parkování letiště Praha
- parkování letiště Brno cena
- parkování letiště Ostrava cena

U každé skupiny se má vedle objemu uložit CPC, obtížnost, trend, SERP features a
top 10 URL. Pokud se dvě varianty opakovaně zobrazují se stejnými výsledky,
sloučit je pod jednu stránku.

## Šablona kvalitního článku

Šablona není povinný počet slov. Google výslovně říká, že žádnou preferovanou
délku nemá.^5

1. **Title a H1:** hlavní téma brzy v titulku, ale normální čeština a žádné
   řetězení synonym.
2. **Úvodní odpověď:** dvě až čtyři věty, které vyřeší základní otázku bez
   nucení čtenáře rolovat.
3. **Kontext:** kdy je jednoduchá odpověď nepřesná a co ovlivňuje výsledek.
4. **Hlavní podotázky:** H2 formulované podle skutečných potřeb a SERPu, ne
   podle seznamu slov z nástroje.
5. **Vlastní prvek:** tabulka, graf, fotografie, kalkulačka, živý příklad nebo
   expertní citace.
6. **Důkazy:** primární zdroj těsně u tvrzení; datum kontroly u proměnlivých
   informací.
7. **Praktický krok:** přirozený odkaz na radar, letiště, kalkulačku nebo
   srovnání právě ve chvíli, kdy jej člověk potřebuje.
8. **Interní odkazy:** zpravidla tři až pět kontextových odkazů, pokud jsou
   opravdu užitečné; popisný anchor, ne „klikněte zde“. Ahrefs tento rozsah
   uvádí jako praktickou orientaci, ne pevné pravidlo.^11 Google doporučuje,
   aby každá důležitá stránka měla alespoň jeden interní odkaz a aby anchor
   sám dával smysl.^12
9. **Obraz:** vlastní nebo licenčně čistý, popisný alt, alespoň 1 200 px pro
   hlavní náhled, stejný reprezentativní motiv v OG a Article datech.^6
10. **Autor a revize:** viditelné jméno, zkušenost, datum odborné kontroly a
    odkaz na metodiku.
11. **Metadata:** unikátní title/description, canonical, `BlogPosting`, datum
    vydání a skutečné datum podstatné aktualizace.
12. **Mobil a výkon:** tabulky vodorovně rolovatelné, obrázky optimalizované,
    CTA nezakrývá text ani mapu.

### Co do textu nedělat

- nepoužívat pevnou „hustotu klíčových slov“;
- neopakovat všechny varianty KW v každém odstavci;
- nevyrábět FAQ jen kvůli schema;
- nepsat datum 2027 do titulku bez aktualizace cen a obsahu;
- neskrývat affiliate vztah;
- neuvádět přesná letištní nebo letová data, která zdroj nepotvrzuje;
- nepublikovat AI draft bez věcné kontroly a vlastního přínosu;
- nevytvářet městské kopie stejného článku s vyměněným názvem lokality.

## Linkbuildingová strategie

Odkazy zůstávají užitečné, ale nemají být celou strategií. Analýza Ahrefs
ukazuje, že jejich význam se liší podle dotazu a u informačního a lokálního
obsahu může být vyšší.^13 Google zároveň považuje nákup odkazů pro ranking,
nadměrné výměny, automatizované odkazy a advertorialy s rank-passing odkazy za
link spam.^14

### Co má šanci odkazy skutečně získat

1. **Český ADS-B průvodce s metodikou.** Vysvětlení, co je skutečně vysíláno,
   co databáze doplňuje a jak stará mohou být data. Vhodné pro školy,
   technologické weby a média.
2. **Kalkulačka letové hladiny a rychlosti.** Malý rychlý nástroj se snadno
   cituje z výukových a leteckých materiálů.
3. **Index provozu nad Českem.** Vlastní anonymní agregovaná data, metodika,
   sezónní srovnání a export grafu pro novináře. Původní data patří mezi
   nejsilnější linkovatelné formáty.^15 Vyžaduje databázi a licenční kontrolu.
4. **Vlastní obrazový atlas.** Reálné fotografie A320/737 a dalších typů se
   souhlasem autorů, přesné popisky a možnost sdílet konkrétní porovnání.
5. **Aktuální letištní průvodce.** Vlastní fotografie, legální spottingová
   místa, doprava, parkování a datum kontroly. Přínos musí být vyšší než pouhý
   přepis oficiálního webu.
6. **Rychlá odborná reakce na událost.** Při veřejně sledovaném squawku,
   holdingu nebo mimořádném provozu nabídnout médiím vysvětlení ověřitelných
   dat — nikdy nespekulovat o příčině konkrétního letu.

### Segmenty pro oslovení

| Segment | Příklady k prověření | Co nabídnout | Na co si dát pozor |
|---|---|---|---|
| Letecká média | Aeroweb, Flying Revue, CzechAirliners | původní datový rozbor, graf, odborný komentář nebo kvalitní hostující text | nejdřív prostudovat jejich publikum; neposílat obecný reklamní článek |
| Dopravní a regionální média | Zdopravy.cz, regionální redakce v okolí letišť | lokální data o provozu, vysvětlení neobvyklé trajektorie, mapa s metodikou | nabídnout ověřitelnou zprávu, ne prosbu o odkaz |
| Letiště a letecké organizace | letištní informační stránky, aerokluby, letecké školy, muzea | bezplatná kalkulačka, edukativní ADS-B materiál, oprava neaktuálního odkazu | neprezentovat veřejnou mapu jako provozní zdroj |
| Spotterská komunita | fotografové, spottingové skupiny, kluby | kreditovaný profil/fotografie, obrazové srovnání typů, společný guide | písemný souhlas s užitím fotografie a jasná licence |
| Cestovatelský obsah | kvalitní travel blogy a letištní průvodci | ověřené srovnání dopravy a parkování, fotografie, modelový výpočet | affiliate odkaz musí být `rel="sponsored"` a obsah musí mít vlastní hodnotu^16 |
| Vzdělávání a popularizace | školy, fyzikální a meteorologické projekty | diagram ADS-B, kalkulačka FL, vysvětlení kondenzačních stop | důsledná odborná revize a primární zdroje |

Uvedené weby jsou výzkumný seznam potenciálních partnerů, nikoli tvrzení, že
přijímají hostující obsah nebo budou odkazovat. Aeroweb a Flying Revue mají
aktivní české letecké publikum; Letiště Praha už publikuje vlastní obsah pro
planespottery, takže oslovení musí přinést něco navíc.^10,17

### Outreach proces bez spamu

1. Vybrat pouze jednu nejlepší linkovatelnou stránku pro danou kampaň.
2. Najít konkrétní existující článek, stránku zdrojů nebo datovou potřebu, do
   které nový zdroj zapadá.
3. Prověřit relevanci webu, autora, reálnou návštěvnost a kvalitu odchozích
   odkazů. Kvalita a tematická shoda mají přednost před počtem kontaktů.^18
4. Napsat krátkou personalizovanou zprávu: proč oslovujeme právě tento text,
   jakou konkrétní informaci nebo asset nabízíme a kde je metodika.
5. Požádat o názor nebo využití podkladu; neposílat manipulativní anchor text.
6. Udělat nejvýše jeden slušný follow-up a výsledek zaznamenat.
7. Po získání zmínky nebo odkazu poděkovat a udržovat vztah, nikoli hned žádat
   o další URL.

Ahrefs doporučuje cílený „sniper“ outreach místo hromadné rozesílky a oslovovat
jen s nejlepší prací, protože relevantní kontakty jsou omezené a spam ničí
reputaci i doručitelnost.^19

#### Vzor první zprávy

> Dobrý den, v článku o [konkrétní téma] vysvětlujete [konkrétní pasáž]. Pro
> FlyQueens jsme připravili [kalkulačku/datový přehled/diagram] s veřejně
> popsanou metodikou a zdroji. Mohlo by se vám hodit jako doplnění pro čtenáře:
> [URL]. Pokud v něm vidíte chybu nebo chybějící údaj, rád/a jej opravím.

Zpráva neslibuje reciproční odkaz, peníze ani předem připravený komerční anchor.

### Pořadí linkbuildingových kampaní

**Měsíce 1–2:** získat odborné recenzenty a fotografy; každý přispěvatel může
obsah přirozeně sdílet. Oslovit 10–15 velmi relevantních kontaktů s ADS-B
průvodcem nebo kalkulačkou, ne se samotnou homepage.

**Měsíce 3–4:** nabídnout obrazový A320/737 guide spottingovým komunitám a
vzdělávací materiály leteckým školám. Prověřit kvalitní rozbité odkazy pouze
tam, kde má FlyQueens skutečně lepší náhradu; broken-link building bez kvalitní
příležitosti bývá neefektivní.^20

**Měsíce 5–6:** spustit první datovou PR kampaň s jedním silným závěrem,
grafem, metodikou a lokálními variantami pro redakce. Následně sledovat
neodkazované zmínky značky a slušně žádat o doplnění zdroje.

### Zakázané nebo nízkohodnotné taktiky

- balíčky stovek katalogových odkazů;
- PBN, automatizované profily, komentářový spam a odkazy z nerelevantních webů;
- plošná výměna „odkaz za odkaz“;
- placené články bez `rel="sponsored"`;
- kopie stejného guest postu na více webech;
- ankory složené vždy z přesného komerčního KW;
- PR zprávy bez zprávy, dat nebo odborného přínosu;
- kupování domén jen kvůli přesměrování jejich autority.

## Interní prolinkování

Každý cluster musí mít jedno centrum a obousměrné odkazy:

```text
/radar
├── /blog/jak-sledovat-let-podle-cisla
├── /blog/co-mi-leti-nad-hlavou
├── /blog/proc-letadlo-neni-na-radaru
├── /blog/proc-letadlo-krouzi
└── /blog/co-je-ads-b

/blog/jak-vysoko-letaji-letadla
├── /blog/jak-rychle-leti-letadlo
├── /blog/kondenzacni-stopa-za-letadlem
└── /nastroje/letova-hladina

/letiste/praha
├── /letiste/praha/parkovani
├── /letiste/praha/planespotting
├── /blog/letiste-praha-zive
├── /letiste/praha/prilety       [až s daty]
└── /letiste/praha/odlety        [až s daty]
```

Příklady vhodných anchorů:

- „sledování letu podle čísla“ → návod;
- „proč se některé letadlo na mapě nezobrazí“ → článek o limitech;
- „převod letové hladiny na metry“ → kalkulačka;
- „parkování u Letiště Praha“ → srovnávací landing page;
- „živá mapa letadel“ nebo „radar letadel“ → `/radar`.

Nepoužívat všude stejný exact-match anchor. Text odkazu má odpovídat větě a
očekávání čtenáře.

## Měření a rozhodovací pravidla

### Nastavení

- Google Search Console pro přesnou doménu FlyQueens;
- sitemap a kontrola indexace každé nové URL;
- analytické události: zobrazení článku, CTA do radaru, vyhledání letu,
  otevření detailu, affiliate click;
- seznam cílových URL/KW v Marketing Mineru nebo Ahrefs;
- jednoduchý outreach log: web, kontaktní osoba, relevance, asset, datum,
  odpověď, odkaz a atribut odkazu.

### Kontrola po publikaci

| Termín | Co zkontrolovat | Rozhodnutí |
|---|---|---|
| 48 hodin | dostupnost, canonical, sitemap, render, mobil, schema | opravit technickou chybu; nehodnotit ranking |
| 2 týdny | indexace, první imprese, dotazy a cílová URL | doplnit interní odkaz nebo požádat o indexaci, pokud je problém |
| 6–8 týdnů | pozice, CTR, engagement a CTA | vysoké imprese + nízké CTR: upravit title/snippet; pozice 8–30: porovnat pokrytí a odkazy |
| 3 měsíce | organické vstupy, konverze, odkazy, kanibalizace | aktualizovat, spojit nebo změnit prioritu podle důkazů |
| čtvrtletně | propady, zastaralé ceny, neplatné zdroje, broken links | obsah skutečně aktualizovat; neměnit jen datum^9 |

### První realistické cíle

Pro novou doménu nejsou poctivé garance návštěvnosti ani pozic. Procesní cíle
pro prvních 90 dní:

- všechny prioritní URL indexované a bez duplicitních canonicalů;
- první stabilní imprese pro radarový a sledovací cluster;
- nejméně tři tematicky relevantní nové odkazující domény;
- alespoň jeden odborný recenzent a sada vlastních letištních fotografií;
- měřitelný tok článek → radar a parkovací stránka → affiliate;
- žádná nová URL bez jasného vlastníka KW, vlastního prvku a interních odkazů.

Po 90 dnech se publikační plán přepíše podle GSC. Pokud informační články
přivádějí lidi, ale nikdo nepřechází do produktu ani na komerční stránku, nejde
o úspěšnou obchodní strategii bez ohledu na počet zobrazení.

## Zdroje

1. Marketing Miner. [`marketing-miner-keywords-2026-09-11.csv`](./marketing-miner-keywords-2026-09-11.csv). Export pro český trh, 11. září 2026; lokální projektový soubor.
2. Ahrefs, Joshua Hardwick. [“How To Do Keyword Clustering the Easy Way.”](https://ahrefs.com/blog/keyword-clustering/) 31. října 2023.
3. Ahrefs, Despina Gavoyannis. [“How to Build a Keyword Strategy That Gets Results.”](https://ahrefs.com/blog/keyword-strategy/) Aktualizováno 13. března 2026.
4. Ahrefs. [“Search Intent in SEO: What It Is & How to Optimize for It.”](https://ahrefs.com/blog/search-intent/) Přístup 11. září 2026.
5. Google Search Central. [“Creating Helpful, Reliable, People-First Content.”](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) Přístup 11. září 2026.
6. Google Search Central. [“Get on Discover.”](https://developers.google.com/search/docs/appearance/google-discover) Přístup 11. září 2026.
7. Ahrefs, Joshua Hardwick. [“Content Hubs for SEO: How to Get More Traffic and Links With Topic Clusters.”](https://ahrefs.com/blog/content-hub/) 2. dubna 2020.
8. Google Search Central Blog. [“Changes to HowTo and FAQ rich results.”](https://developers.google.com/search/blog/2023/08/howto-faq-changes) 8. srpna 2023, aktualizováno 14. září 2023.
9. Ahrefs, Louise Linehan. [“What Is Content Decay? (And How to Fix It Before It Tanks Your Traffic).”](https://ahrefs.com/blog/content-decay/) 13. března 2026.
10. Letiště Praha. [“Planespotting na Letišti Václava Havla Praha.”](https://www.prg.aero/planespotting) Přístup 11. září 2026.
11. Ahrefs, Chris Haines. [“Internal Links for SEO: An Actionable Guide.”](https://ahrefs.com/blog/internal-links-for-seo/) Aktualizováno 10. března 2026.
12. Google Search Central. [“SEO Link Best Practices for Google.”](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) Přístup 11. září 2026.
13. Ahrefs, Patrick Stox. [“Google Says ‘Links Matter Less’—We Looked at 1,000,000 SERPs to See if It’s True.”](https://ahrefs.com/blog/links-matter-less-but-still-matter/) 30. ledna 2025.
14. Google Search Central. [“Spam Policies for Google Web Search.”](https://developers.google.com/search/docs/essentials/spam-policies) Přístup 11. září 2026.
15. Ahrefs. [“4 Tactics for High-Quality Backlinks That Move the Needle.”](https://ahrefs.com/blog/high-quality-backlinks/) Přístup 11. září 2026.
16. Google Search Central Blog. [“A reminder on qualifying links and our link spam update.”](https://developers.google.com/search/blog/2021/07/link-tagging-and-link-spam-update) 26. července 2021.
17. Aeroweb. [“Aeroweb.cz — magazín o letectví a létání v ČR.”](https://www.aeroweb.cz/) Přístup 11. září 2026; Flying Revue. [“Vše pro příznivce létání.”](https://www.flying-revue.cz/) Přístup 11. září 2026.
18. Ahrefs, Jenny Abouobaia. [“Link Prospecting: How to Find Quality Backlinks for Your Website.”](https://ahrefs.com/blog/link-prospecting/) Aktualizováno 17. února 2025.
19. Ahrefs, Si Quan Ong. [“Link Building Outreach for Noobs.”](https://ahrefs.com/blog/link-outreach/) Aktualizováno 17. února 2025.
20. Ahrefs, Joshua Hardwick. [“Broken Link Building: The Complete Guide.”](https://ahrefs.com/blog/broken-link-building/) 23. května 2022.
