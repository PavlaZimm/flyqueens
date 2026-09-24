# Kontrola češtiny a stylu: Nejdelší let na světě

Kontrolovaný text: `src/app/blog/nejdelsi-let-na-svete/page.tsx` (včetně metadat, tabulek, FAQ a `SourcesBox`) a karta v `src/lib/blog.ts`.
Kontrola: 24. 9. 2026. Článek nebyl upravován.

Celkový dojem: text je věcný, srozumitelný a bez typických AI obratů. Em-pomlčky nejsou (0 výskytů), rovné uvozovky ve viditelném textu nejsou, vykání je důsledné. Hlavní slabiny: jedna shoda podmětu s přísudkem, několik nelogických nebo neobratných vět, nevysvětlené zkratky CDC a OAG a hovorové „tenhle/tuhle“ v jinak spisovném textu.

## Opravy

| # | Původní text | Návrh | Důvod |
|---|---|---|---|
| 1 | „vycházíme z toho, co uvádí aerolinka a zdravotnické instituce“ | „vycházíme z toho, co uvádějí aerolinka a zdravotnické instituce“ | Gramatika: několikanásobný podmět, přísudek v množném čísle. |
| 2 | „Obě letiště obsluhují New York a rozdíl mezi nimi jsou pouhé čtyři kilometry.“ | „Obě letiště obsluhují New York a obě trasy se liší pouhými čtyřmi kilometry.“ | Logika (letiště od sebe nejsou 4 km, liší se délka tras) a neobratná vazba „rozdíl … jsou“. |
| 3 | „Nejdelší podle času je jiný let.“ (tip) | „Od října je časově nejdelší jiný let.“ | Věcně nepravdivé k datu vydání (viz kontrola-faktu.md A1). |
| 4 | „V říjnu a v zimním letovém řádu je tak časově nejdelším letem na světě let z Newarku, v létě let z JFK“ | „Od 2. října 2026 je tak časově nejdelším letem na světě let z Newarku, do té doby let z JFK“ | Věcná přesnost; „v létě“ koliduje s tím, že letní řád platí do 24. 10. |
| 5 | „Samotný čas ve vzduchu bývá kratší. Proto nejdelší let podle vzdálenosti nemusí být zároveň nejdelší podle času.“ | „Samotný čas ve vzduchu bývá kratší. Nejdelší let podle vzdálenosti navíc nemusí být nejdelší podle času, protože roli hraje i vítr a zvolená trať.“ | „Proto“ nevyplývá z předchozí věty (nelogická návaznost). |
| 6 | „…do chvíle, kdy na cílovém stání zastaví. Včetně pojíždění a rezervy.“ | „…do chvíle, kdy na cílovém stání zastaví, tedy včetně pojíždění a časové rezervy.“ | Samostatná neslovesná věta působí jako útržek. |
| 7 | „Letový řád uvádí takzvaný block time:“ | „Letový řád uvádí takzvaný blokový čas (anglicky block time):“ | Zkratku/termín vysvětlit a nabídnout český ekvivalent. Anglický termín může zůstat v závorce. |
| 8 | „Americké CDC ve své příručce pro lékaře dodává“ | „Americké Centrum pro kontrolu a prevenci nemocí (CDC) ve své příručce pro lékaře dodává“ | Zkratka CDC nevysvětlena při prvním použití (NHS vysvětlena je). Pak navazující „podle něj“ gramaticky sedí na „Centrum“. |
| 9 | „…podle Simple Flying z dat OAG (únor a duben 2026)“ | „…podle Simple Flying, který vychází z dat společnosti OAG zpracovávající letové řády (únor a duben 2026)“ | Zkratka OAG nevysvětlena. |
| 10 | „Léky a melatonin konzultujte s lékařem, obě instituce se v doporučení liší.“ | „Léky a melatonin konzultujte s lékařem. NHS melatonin na jet lag nedoporučuje, CDC ho uvádí jako možnost.“ | Nejasné, v čem se liší; čárka spojuje dvě samostatné myšlenky. |
| 11 | „Proti jet lagu doporučuje britská zdravotní služba NHS“ | „Proti jet lagu, tedy únavě a rozhozenému spánku po přeletu časových pásem, doporučuje britská zdravotní služba NHS“ | Laik nemusí pojem znát; první výskyt vysvětlit (jinak se v textu nevysvětluje). |
| 12 | „Rekord Singapore Airlines má překonat australský Qantas v rámci projektu Project Sunrise.“ | „Rekord Singapore Airlines má překonat australský Qantas s projektem, kterému říká Project Sunrise.“ | Pleonasmus „projektu Project“; „v rámci“ je úřední vata. |
| 13 | „12 kusů Airbusu A350-1000ULR s přídavnou nádrží“ | „12 letadel Airbus A350-1000ULR s přídavnou nádrží“ | „Kusů“ u letadel zní jako sklad; typ letadla se obvykle neskloňuje v této vazbě. |
| 14 | „Když na tuhle linku chcete, nejlevnější možností je prémiová ekonomická třída.“ | „Pokud chcete letět právě touto linkou, nejlevnější je prémiová ekonomická třída.“ | Neúplná vazba („chcete na linku“), hovorové „tuhle“. |
| 15 | „Tenhle článek porovnává jen pravidelné osobní lety…“ | „Porovnáváme jen pravidelné osobní lety…“ | Hovorové „tenhle“; zároveň odstraní obrat typu „tento článek“, který redakční pravidla nedoporučují. |
| 16 | „Nepočítáme zkušební a rekordní lety bez cestujících, vojenské, charterové ani přeletové lety.“ | „Nepočítáme zkušební ani rekordní lety bez cestujících, vojenské a charterové lety ani přelety prázdných letadel.“ | „Přeletové lety“ laik nepochopí (ferry); spojka „ani“ v záporné větě. |
| 17 | „(kód IATA SIN, tedy třípísmenný kód letiště přidělený Mezinárodní asociací letecké dopravy)“ | „(SIN; třípísmenné kódy letišť přiděluje Mezinárodní asociace letecké dopravy IATA)“ | „tedy“ věcně spojuje kód SIN s definicí; takto je vysvětlení zkratky IATA čistší a kratší. |
| 18 | „Zkratka ULR znamená Ultra Long Range, tedy verzi pro velmi dlouhé lety.“ | „Zkratka ULR znamená Ultra Long Range: jde o verzi pro velmi dlouhé lety.“ | Vazba „znamená … tedy verzi“ je nejednoznačná (co znamená verzi?). |
| 19 | „Od 25. října se oba časy zkracují, na 18 hodin 15 minut do New Yorku a 18 hodin 55 minut zpět“ | „Od 25. října se oba časy zkracují na 18 hodin 15 minut do New Yorku a 18 hodin 55 minut zpět“ | Nadbytečná čárka před předmětovou vazbou. |
| 20 | „po 19 hodinách 15 minutách“ | „po 19 hodinách a 15 minutách“ | Plynulejší čtení v 7. pádě; jinde v textu formát „18 hodin 40 minut“ ponechat. |
| 21 | „Každý směr trvá jinak dlouho hlavně kvůli výškovému větru a zvolené trati.“ | „Každý směr trvá jinak dlouho hlavně kvůli silnému větru ve výšce, kde letadla létají (tryskovému proudění), a zvolené trati.“ | „Výškový vítr“ je méně známý výraz; tryskové proudění laik zná. |
| 22 | „Lety z JFK i z Newarku v ní figurují.“ | „Služba platí i pro lety z JFK a Newarku.“ | „Figurují“ je kostrbaté, zbytečně knižní. |
| 23 | „Proč v žebříčku chybí Perth–Londýn opačným směrem?“ | „Proč v žebříčku chybí let z Perthu do Londýna?“ | „Perth–Londýn opačným směrem“ je matoucí (opačným k čemu?). |
| 24 | „Nonstop by s 14 535 km patřil na třetí místo.“ | „Bez mezipřistání by tato linka s 14 535 km patřila na třetí místo.“ | Chybí podmět („nonstop“ není podstatné jméno), rod nesedí. |
| 25 | „Praha–Tchaj-pej, 9 029 km. Létají ho China Airlines a STARLUX Airlines, se STARLUX trvá…“ (FAQ) | „Praha–Tchaj-pej, 9 029 km. Létají ho China Airlines a STARLUX Airlines. Se STARLUX trvá…“ | Čárka spojuje dvě samostatné věty. |
| 26 | „Aktuální odlety a přílety sledujete na stránce Letiště Praha.“ | „Aktuální odlety a přílety najdete na stránce Letiště Praha.“ | Oznamovací „sledujete“ zní jako tvrzení o čtenáři. |
| 27 | „do Tchaj-peje na Tchaj-wanu (TPE)“ | „do Tchaj-peje (TPE) na Tchaj-wanu“ | Kód patří k městu/letišti, ne k ostrovu. |
| 28 | „od letošního léta i STARLUX Airlines“ | „od 1. srpna 2026 i STARLUX Airlines“ | Relativní čas stárne; konkrétní datum je ověřené. |
| 29 | „Singapore Airlines například u linky do Newarku uváděla při jejím obnovení v roce 2018 asi 16 700 km“ | „Singapore Airlines například u linky do Newarku při jejím obnovení v roce 2018 uváděla délku trasy asi 16 700 km“ | Chybí, co přesně aerolinka uváděla; slovosled. |
| 30 | „Chcete se podívat, … Jak na to, popisuje návod jak sledovat let podle čísla.“ | „… Jak na to, popisuje návod Jak sledovat let podle čísla.“ | Název článku jako vlastní jméno s velkým písmenem, jinak se čte jako pokračování věty. Čárka za „Jak na to“ je správně. |
| 31 | „Časy se také mění se sezónou, proto aerolinka upravuje letový řád v létě a v zimě.“ | „Časy se mění i se sezónou, a aerolinka proto letový řád pro léto a zimu upravuje.“ | Drobná stylistika; „také … se sezónou“ se opakuje s předchozí větou. Nepovinné. |
| 32 | RelatedReading: „Airbus A380 se vrací do Prahy“ | „Airbus A380 se má vrátit do Prahy“ | Sjednotit s titulkem cílového článku (a s tím, že jde o plán). |
| 33 | Karta (excerpt): „15 348 km a přes 18 hodin v letadle bez ekonomické třídy“ | „15 348 km a přes 18 hodin letu, a to bez ekonomické třídy na palubě“ | „V letadle bez ekonomické třídy“ se dá číst dvojznačně; nepovinné. |

## Typografie

| # | Nález | Návrh | Důvod |
|---|---|---|---|
| T1 | V souboru není žádná nezlomitelná mezera (0× U+00A0, 0× `&nbsp;`). Týká se čísel s mezerou (15 348 km, 9 700 námořních mil, 165 000 litrů), dat (24. 9. 2026), jednotek (18 h 40 min) a čísel letů (SQ 24 se píše bez mezery, ok). | Mezi skupinami číslic a před jednotkou použít nezlomitelnou mezeru (` ` v JSX), aspoň v perexu, tabulkách a FAQ. | Na mobilu se „15“ a „348 km“ mohou rozdělit na dva řádky. Pokud web nbsp jinde nepoužívá, jde o celowebové rozhodnutí; zde jen doporučení. |
| T2 | Jednopísmenné předložky a spojky na konci řádku (v, z, k, s, o, u, a, i) | Volitelně nbsp za nimi | Česká typografická zvyklost; na webu se často toleruje. |
| T3 | Rozsahy „Singapur–New York“, „Praha–Tchaj-pej“, „13 hodin 50 minut až 14 hodin 30 minut“ | ok | Pomlčka bez mezer mezi místy je správně; rozsahy slovem „až“ také. |
| T4 | „v 5:30“ × jinde „05:30“ ve zdrojích | ok | V textu je jednotné „5:30“, „12:10“. |
| T5 | Meta description má 155 znaků | ok, na horní hranici | Pravidla 120–155. |

## Anglicismy a zkratky (kontrola vysvětlení při prvním použití)

| Výraz | Stav | Poznámka |
|---|---|---|
| IATA | vysvětleno (sekce Trasa) | viz návrh č. 17 pro čistší formulaci |
| ULR | vysvětleno | viz č. 18 |
| block time | vysvětleno | doplnit český ekvivalent (č. 7) |
| ortodroma | vysvětleno | ok |
| OAG | **nevysvětleno** | č. 9 |
| CDC | **nevysvětleno** | č. 8 |
| NHS | vysvětleno („britská zdravotní služba“) | ok |
| jet lag | nevysvětleno | č. 11 |
| FlightAware, Great Circle Mapper | nevysvětleno | Volitelně při prvním výskytu: „služba pro sledování letů FlightAware“, „online kalkulačka vzdáleností Great Circle Mapper“. |
| Wellbeing Zone | vysvětleno kontextem | ok |
| nonstop, business, prémiová ekonomická | běžné | ok; „business“ a „nonstop“ jsou v češtině zavedené |

## Strojový styl

Text prázdné úvody ani „v tomto článku se dozvíte“ nemá. Drobnosti:
- Perex končí výčtem čtyř bodů („jak se rekordy počítají, deset nejdelších linek…, ohlášené budoucí rekordy a nejdelší přímý let z Prahy“). Zadání tuto větu chce, výčet je věcný, ponechat.
- Opakovaná stavba „(odkaz na zdroj)“ na konci téměř každé věty je v pořádku, jde o citace.
- Opakování „Stav k 24. 9. 2026“ v poznámkách tabulek je žádoucí.
- Hovorové „tenhle/tuhle“ (č. 14, 15) je jediné stylové vybočení z jinak spisovného tónu.
