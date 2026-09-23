# Letiště Kodaň: kontrola češtiny naostro (finální text)

Kontrolováno 23. 9. 2026: `src/app/blog/letiste-kodan/page.tsx` (titulek, meta, perex, obě tabulky, poznámky pod tabulkami, text, popisky fotek, ALT, FAQ, závěr, poznámka v `SourcesBox`) a excerpt `letiste-kodan` v `src/lib/blog.ts`. Podle skillů `korektura-cz`, `humanizace` a `docs/redakcni-pravidla.md`. Soubory článku jsem neupravoval.

## Předchozí kontroly: jsou opravy v textu?

- **`kontrola-cestiny.md`, Nutné 1–19:** všech 19 je v textu (směr a vzdálenost, data Ryanairu, terminály v Kodani, otázka FAQ 2, „40 letů v každém směru“, „V zimním letovém řádu jich ubude“, „v polovině ledna“, 100 ml na nádobku, 3D skenery, „vždy nejméně 4:00–22:00“, rezervace s předstihem, metro i vlak bez „nejrychlejší“, 1 499 DKK ve FAQ, FAQ 4 se slovesem, „Nejvíc cestujících přepravily“, pololetí, Trap Danmark a VisitCopenhagen jmenovitě, „Na místě jsme… neověřovali“, otevírací doba grilu).
- **`zaverecna-kontrola.md`, nutné (5):** všech pět je v textu (Trap „do areálu letiště veřejnost nesmí“, ceny „od“, SK768 podle letového řádu, excerpt „kdy Ryanair přes zimu nelétá“, FAQ 4 „stojí týden“).
- **`zaverecna-kontrola.md`, doporučené:** zapracované skoro všechny (odkazy u terminálů a Ryanairu, „pravidelně“, adresa grilu u VisitCopenhagen, datovaná doména, Rejseplanen s datem, znění AIP, „pokud je volno“, P Afgang/P Ankomst s vysvětlením a odkazem na vyzvednutí, „stav letu“, dráha 22R, rozdělená věta o notebooku, „V Praze létají všichni tři dopravci“, FAQ 5, ALT „tabulí odbavení“ v `page.tsx` i `blog.ts`, radar vypuštěný ze sekce Lety). Buňka „jen online (denní sazba 299 DKK)“ je upravená, ale pořád nejasná, viz D14.
- **Nová vada vznikla opravou:** úprava „a zaznamenalo 256 737 startů a přistání“ (závěrečná kontrola) vyrobila anakolut, viz N1.

## Rychlé kontroly

- Titulek 55 znaků, meta 152, excerpt 152, perex 70 slov. V limitu.
- Em-pomlčka: žádná. Rovné uvozovky v textu: žádné, všude „“.
- Rozsahy s en-pomlčkou bez mezer (100–170 m, 300–500 m, 1,3–2,1 km, Kodaň–Praha). V pořádku.
- Jednotky s mezerou (DKK, m, km, m², %, ml). V pořádku.
- Datum platnosti je 11× jako „23. 9. 2026“, jen poznámka v `SourcesBox` má „23. září 2026“ (N2). Data v běžném textu vypsaná slovy („2. listopadu 2026“, „od 14. do 21. října“) jsou v pořádku, v tabulkách číslicemi taky.
- Vykání je důsledné. Nadpisy H2 se doslova shodují s `ArticleContents`.
- FAQ: 50, 38, 38, 50 a 36 slov, tedy kolem ~45. Všechny odpovědi jsou srozumitelné i samostatně, u FAQ 1 a FAQ 4 viz D10 a D15.
- Nezlomitelné mezery (`&nbsp;` / U+00A0) v souboru nejsou. Čísla jako „32 433 694“ nebo „1 499 DKK“ se tak mohou zalomit přes řádek. Stejné je to ve všech článcích FlyQueens, takže jde o věc šablony nebo celého webu, ne tohoto textu (jen poznámka).

## Nutné

| # | Původní znění | Návrh | Proč | Nutné/Doporučené |
|---|---|---|---|---|
| N1 | V roce 2025 prošlo letištěm rekordních 32 433 694 cestujících, o 8,5 % víc než rok předtím, a zaznamenalo 256 737 startů a přistání (…). | V roce 2025 prošlo letištěm rekordních 32 433 694 cestujících, o 8,5 % víc než rok předtím. Letiště zaznamenalo 256 737 startů a přistání (…). | Anakolut (korektura §3). Podmětem první věty jsou cestující, letiště stojí v 7. pádě („letištěm“). „A zaznamenalo“ proto gramaticky patří cestujícím. Vzniklo to opravou ze závěrečné kontroly. | Nutné |
| N2 | Zdroje ověřeny 23. září 2026, lety, ceny parkování a stav terminálů platí k tomuto datu. (poznámka `SourcesBox`) | Zdroje ověřeny 23. 9. 2026. Lety, ceny parkování a stav terminálů platí k tomuto datu. | Datum platnosti je jinde v článku 11× jako „23. 9. 2026“, tady jediný jiný zápis. A dvě hlavní věty jsou spojené jen čárkou. | Nutné |

## Doporučené

| # | Původní znění | Návrh | Proč | Nutné/Doporučené |
|---|---|---|---|---|
| D1 | Ryanair ale linku na zimu přerušuje, od 3. listopadu 2026 do 27. března 2027 v letovém řádu není. (perex) | Ryanair ale linku na zimu přerušuje: od 3. listopadu 2026 do 27. března 2027 v letovém řádu není. | Druhá věta vysvětluje první, proto dvojtečka. S čárkou je to souvětí bez spojky přímo v perexu. | Doporučené |
| D2 | podle AIP 4,4 NM (asi 8 km) jiho-jihovýchodně od Kodaně (tabulka) | …jihojihovýchodně od Kodaně | Složenina světové strany se píše dohromady (jihojihovýchod). Se spojovníkem to vypadá jako „jižně a jihovýchodně“. | Doporučené |
| D3 | SAS, Norwegian, Ryanair (Ryanair ne od 3. 11. 2026 do 27. 3. 2027) (tabulka) | SAS, Norwegian, Ryanair (Ryanair od 3. 11. 2026 do 27. 3. 2027 nelétá) | „Ryanair ne od… do…“ je telegram, který se napoprvé špatně čte. | Doporučené |
| D4 | Z Prahy přiletíte do Terminálu 3, zpátky do Prahy pak SAS odlétá z Terminálu 3, Norwegian a Ryanair z Terminálu 2 (…). | Z Prahy přiletíte do Terminálu 3. Zpátky do Prahy odlétá SAS z Terminálu 3, Norwegian a Ryanair z Terminálu 2 (…). | Souvětí bez spojky, ve kterém se uprostřed mění podmět (vy → SAS). | Doporučené |
| D5 | Mezi moly B a C přibude 60 000 m² s dvakrát větší výdejnou zavazadel, … (…). Otevřít se má v roce 2027. | Mezi moly B a C přibude nová část o 60 000 m² s dvakrát větší výdejnou zavazadel, … (…). Otevřít se má v roce 2027. | Bez podstatného jména „přibude 60 000 m² s výdejnou“ a u „Otevřít se má“ chybí podmět. Plocha se neotevírá. | Doporučené |
| D6 | Stavbu uvidíte hlavně při odletu z mol C, D, E a F, kvůli ní ale podle letiště nemusíte chodit dřív | Stavba se týká hlavně odletů z mol C, D, E a F, kvůli ní ale podle letiště nemusíte chodit dřív | **Jen upozornění na zdroj:** `zdroje.md` §4 má „stavba se dotkne odletů z mol C–F“, nic o tom, co bude vidět. „Uvidíte“ je náš výklad. | Doporučené |
| D7 | Všechny se musí vejít do jednoho průhledného litrového sáčku na osobu, sáčky jsou zdarma u stolů před kontrolou (…). | Všechny nádobky se musí vejít do jednoho průhledného litrového sáčku na osobu. Sáčky jsou zdarma u stolů před kontrolou (…). | „Všechny“ nemá v předchozí větě oporu, tam je „jedna nádobka“ v jednotném čísle. Souvětí bez spojky. | Doporučené |
| D8 | Podle březnového oznámení je měly mít všechny dráhy kontroly do léta 2026 | …je měly mít všechny linky kontroly do léta 2026 | V článku o letišti znamená „dráha“ vzletovou a přistávací dráhu, v sekci Čísla je to slovo pětkrát. „Dráhy kontroly“ na první přečtení mate. | Doporučené |
| D9 | V roce 2025 se na kontrole čekalo průměrně 4 minuty 14 sekund a 99,4 % cestujících čekalo nejvýš čtvrt hodiny | …čekalo průměrně 4 minuty 14 sekund a 99,4 % cestujících nejvýš čtvrt hodiny | „Čekalo“ je dvakrát v jedné větě, druhé stačí vypustit. Fakt se nemění. | Doporučené |
| D10 | Podle letového řádu 1 hodinu 20 minut se SAS a Norwegianem, s Ryanairem 1 hodinu 25 minut. (FAQ 1) | Let z Prahy do Kodaně trvá podle letového řádu 1 hodinu 20 minut se SAS a Norwegianem, s Ryanairem 1 hodinu 25 minut. | Odpověď začíná větou bez slovesa a podmětu. Jako přímá odpověď na otázku obstojí, ve výřezu (snippet, AI odpověď) je ale bez kontextu. Stejnou vadu předchozí kontroly opravovaly ve FAQ 4 a 5. | Doporučené |
| D11 | Obě země mají stejný čas, takže časy v rezervaci nemusíte přepočítávat. (FAQ 1) | Obě země jsou ve stejném časovém pásmu, takže časy v rezervaci nemusíte přepočítávat. | „Čas… časy“ v jedné větě. „Stejné časové pásmo“ je přesnější. | Doporučené |
| D12 | Aktuální stav letů ukazuje letiště na vlastních tabulích odletů a příletů: čas, cíl, číslo letu i stav letu, třeba nástup nebo uzavřený gate. Kam se z Kodaně létá, ukazuje mapa destinací. | …čas, cíl, číslo letu i stav, třeba nástup nebo uzavřený gate. Kam se z Kodaně létá, najdete na mapě destinací. | Ve dvou větách je 3× „stav“ a 2× „ukazuje“. | Doporučené |
| D13 | Při dotazu 23. 9. 2026 stál týden od 14. do 21. října, který zčásti spadá do dánských podzimních prázdnin, na nejlevnějších volných parkovištích P17 a P19 1 499 DKK. … Týden od 4. do 11. listopadu vyšel na P19 na 499 DKK a na P17 na 549 DKK. | …stál týden od 14. do 21. října, který zčásti spadá do dánských podzimních prázdnin, 1 499 DKK, a to na nejlevnějších volných parkovištích P17 a P19. … Týden od 4. do 11. listopadu vyšel na 499 DKK na P19 a na 549 DKK na P17. | Na konci věty stojí vedle sebe dvě čísla („P19 1 499 DKK“), která se čtou jako jedno. V druhé větě se hromadí „na P19 na 499“. | Doporučené |
| D14 | Standard (P1, P11, P12) … sloupec „U vjezdu“: jen online (denní sazba 299 DKK) | nechat, nebo upřesnit, kde se 299 DKK platí (`zdroje.md` §8 má jen „jen online, 299 DKK/den“) | Ve sloupci „U vjezdu“ čtenář pořád neví, jestli se denní sazba platí u závory. Zdroj to neříká, proto bez ověření nepřepisovat. | Doporučené |
| D15 | Na týden od 14. do 21. října 2026 to ale bylo nejméně 1 499 DKK a část parkovišť byla vyprodaná. (FAQ 4) | V týdnu od 14. do 21. října 2026, který zčásti spadá do dánských podzimních prázdnin, ale stál při dotazu 23. 9. nejméně 1 499 DKK a část parkovišť byla vyprodaná. | „Na týden… to bylo“ je neobratné a minulý čas u budoucího týdne mate. Samostatně přečtená odpověď neříká, proč je ten týden dražší. Poslední věta „Ceny platí k 23. 9. 2026“ může zůstat. | Doporučené |
| D16 | Do centra se dostanete rychle metrem i vlakem. Linka M2 … jede do centra 14 minut … průvodce dopravou z letiště do centra Kodaně | První větu škrtnout a začít „Linka M2 navazuje přímo na Terminál 3…“ | Věta jen opakuje nadpis „Doprava do centra“ a perex (humanizace č. 15). V odstavci je 4× „do centra“. | Doporučené |
| D17 | Samoobslužné boxy … v P7A pod hotelem Clarion (sekce Služby) × P7b (tabulka parkování) | sjednotit velikost písmena, např. „P7a“ | V jednom článku stojí „P7A“ i „P7b“. Značení parkovišť se má psát stejně. | Doporučené |
| D18 | Vyhlídku pro veřejnost letiště nemá. Dánská encyklopedie Trap Danmark to vysvětluje bezpečností: do areálu letiště veřejnost nesmí. | Oficiální vyhlídku letiště na svém webu neuvádí. Dánská encyklopedie Trap Danmark to vysvětluje bezpečností: do areálu letiště veřejnost nesmí. | **Jen upozornění na zdroj:** `zdroje.md` §10 má „stránku pro spottery ani vyhlídkovou terasu jsem na cph.dk nenašel“. „Nemá“ je silnější. Navíc je ve dvou sousedních větách „veřejnost“. | Doporučené |
| D19 | Kde je právě letadlo, které na vás v Kodani čeká, uvidíte v radaru FlyQueens. (sekce Odlety) × Den před odletem si pak na radaru můžete ověřit, kde je letadlo, které vás poveze. (závěr) | Sekce Odlety: „…letadlo, které vás z Kodaně poveze…“. Závěr: „V den odletu si pak na radaru můžete ověřit…“ | Letadlo, které na vás „čeká“, je už na místě, takže ho nemá smysl hledat. Den předem zase obvykle není jasné, který stroj let poletí. **Jen upozornění:** zdroj pro „den před odletem“ nemáme. | Doporučené |
| D20 | Přednost mají rovnoběžné dráhy, příčnou letiště nasazuje jen výjimečně, třeba při bočním větru nad 15 uzlů nebo při odklízení sněhu | Přednost mají rovnoběžné dráhy. Příčnou letiště nasazuje jen výjimečně, třeba… | Souvětí bez spojky. Předchozí kontrola (Doporučené 33) navrhovala totéž a v textu to zůstalo. | Doporučené |
| D21 | Fotografie pocházejí z Wikimedia Commons pod licencí CC BY-SA 4.0 a jsou jen zmenšené. (poznámka `SourcesBox`, hned po „Počty letů pocházejí z databáze…“) | Fotografie jsou z Wikimedia Commons pod licencí CC BY-SA 4.0 a jsou jen zmenšené. | „Pocházejí“ ve dvou sousedních větách. | Doporučené |

## Co nechat být (znaky živého autora a správně suchý tón)

- „V Kodani záleží na směru.“ Krátká věta mezi dvěma delšími, rytmus funguje.
- „Kdo si plánuje Kodaň na advent, vybírá tedy jen mezi SAS a Norwegianem.“ Praktický důsledek místo holého data.
- „Pokud vás nějaký průvodce posílá na odbavení do T1, je zastaralý.“ Varování, které konkurence nemá.
- „S vyndáváním notebooku proto radši počítejte.“ Přiznaná nejistota proměněná v radu.
- Konkrétní dotazy do rezervace (1 499 DKK, vyprodaná parkoviště, 499 a 549 DKK v listopadu). Takový detail se nedá vymyslet.
- Přiznání u Flyvergrillen a u kasinové domény. Počet přiznání v textu je na hranici (korektura §12), ale doména je užitečné varování, ne metakomentář.
- Tabulky parkování, drah a základních údajů, ceny salonků a úschovny. Věcný tón je tu správně, nerozepisovat.
- Opakování zimní přestávky Ryanairu v perexu, tabulce, sekci a FAQ. Každá část se může zobrazit samostatně a data všude sedí.
- Věta „Bezpečnostní kontrola je pro oba terminály společná a leží mezi nimi“ v sekci i ve FAQ 2. Ve FAQ musí odpověď stát sama.

## Vnitřní rozpory

Mezi sekcemi, tabulkami a FAQ jsem nenašel žádný číselný rozpor. Sedí 1 h 20/25 min, T2/T3, 3. 11. 2026 až 27. 3. 2027, 2. 11. a 28. 3., SAS 3× denně (v sobotu 2×) proti „zhruba třikrát denně“, Norwegian 4× týdně proti „většinou čtyřikrát“, 499 / 1 499 / 1 625–2 250 DKK, 14 a 13–14 min, 32,4 mil. proti 32 433 694 a délky drah. Jediný rozpor ve smyslu je radar („čeká v Kodani“ × „den před odletem“), viz D19.

## Jak text zní

Zní jako člověk, který ví, co cestující v Kodani řeší. Nejvíc strojově působí zbytky souvětí bez spojky (D1, D4, D7, D20) a místa, kde se ve dvou větách opakuje totéž slovo (D9, D12, D16). Po opravě N1 a N2 je text publikovatelný.
