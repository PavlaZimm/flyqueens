# Korektura češtiny: Flightradar24 zdarma a česky

Podle skillů `korektura-cz` a `humanizace`, 14. 10. 2026. Článek jsem neupravoval.
Věcné opravy (ceny, jazyk aplikace, CTA, „číslo letenky“) jsou v `kontrola-faktu.md`. Tady se opakují jen tam, kde se týkají i jazyka.

## Délky metadat

- **title** „Flightradar24 zdarma a česky: co je v základu a co ne“ má **53 znaků**, cíl 40–60 splňuje.
  - Pozor na obsah: „a česky“ v titulku může slibovat, že FR24 česky je, a článek pak odpovídá, že není. Bezpečnější varianta: „Flightradar24 zdarma: co umí bez placení a je česky?“ (52 znaků).
- **description** má **146 znaků**, cíl 120–155 splňuje.
  - Po doplnění cen ji lze upravit, např. „Co umí Flightradar24 zdarma a co jen tarify Silver, Gold a Business: historie letů, reklamy, ceny a čeština. Plus česká mapa letadel bez registrace.“ (148 znaků).
- **excerpt** v `BLOG_CARDS`/`POSTS` (blog.ts) má 138 znaků. V pořádku.

## Typografie

- **Em-pomlčky:** v souboru 0×. OK.
- **Uvozovky:** „Flightradar24 česky“ jsou české. OK.
- **En-pomlčka** se v textu objevuje jen v názvu zdroje flyradar.cz, kde je převzatá. OK.
- **Číslovky se zapisují dvojím způsobem:** perex „sedm dní zpět“, FAQ „historií letů za 7 dní“ a „Sedm dní“, tabulka „7 dní“. Jde to obhájit, protože slovem se píše na začátku věty. Doporučení: v souvislém textu psát „7 dní“, slovy jen na začátku věty.

## Konkrétní opravy

| # | V textu | Má být | Proč |
|---|---|---|---|
| 1 | Perex: „Flightradar24 se dá používat zdarma, ale ne celý.“ | „Flightradar24 se dá používat zdarma, ale jen zčásti.“ | „ne celý“ zní hovorově a neohrabaně. Jde o funkce, ne o celek. |
| 2 | Perex: „po jedné záložce a jednom filtru“ | „jednu záložku a jeden uložený filtr“ | Tabulka i FAQ mluví o *uložených* filtrech, perex o „filtru“. Filtrovat lze i ve Free, omezené je jen ukládání. Takhle je to nepřesné a s FAQ se to nekryje. |
| 3 | Perex: „Český web jsme při kontrole 14. října 2026 nenašli.“ | „Web je v angličtině a aplikace pro iPhone češtinu v nabídce nemá.“ (podle App Store, viz fakta) | Metatext o rešerši (vada 12). Navíc se teď dá napsat přímý fakt. |
| 4 | Perex: „Níže je přehled, co přesně je zdarma, a také česká mapa letadel, která nevyžaduje registraci.“ | Škrtnout, nebo nahradit: „Pokud vám stačí letadla nad Českem, česká mapa FlyQueens je zdarma a bez registrace.“ | Ohlašování obsahu (humanizace 19, korektura 14). Perex má informovat, ne ohlašovat. |
| 5 | „Podle jejich stránky s tarify“ | „Podle stránky s tarify“ | Flightradar24 je služba v jednotném čísle, „jejich“ k němu nepatří. Stejně tak „Přístup k jejich API“ → „Přístup k API Flightradar24“. |
| 6 | „Ceny tarifů tu neuvádíme, na stránce tarifů jsme je při kontrole neviděli.“ | Věcně nepravdivé, viz fakta. Nová verze buď s cenami, nebo s důvodem. | Kromě faktu je to další metatext „při kontrole“. |
| 7 | „Aktuální cenu uvidíte při registraci.“ | „Konečnou cenu FR24 ukáže až při platbě.“ | Věcně (checkout) i jazykově přesnější. |
| 8 | „Web Flightradar24 jsme při kontrole 14. října 2026 otevřeli v angličtině a přepínač jazyka jsme na něm nenašli.“ | „Web Flightradar24 je v angličtině, přepínač jazyka jsme na něm 14. října 2026 nenašli.“ | 2× „jsme“ v jedné větě, vyprávění o rešerši. |
| 9 | „Oficiální seznam jazyků webu ani aplikace jsme nedohledali, takže nemůžeme potvrdit ani vyvrátit, že aplikace česky umí. V nastavení aplikace to zjistíte nejrychleji.“ | Nahradit faktem z App Store (angličtina + 9 jazyků, čeština chybí). Poslední větu lze nechat jako radu pro Android. | Vada 12: přiznání nejistoty se opakuje popáté (perex, H2, FAQ, odstavec o cenách, poznámka ve zdrojích). Nechat ho naplno nejvýš jednou. |
| 10 | „většinou pomůže něco jiného: český návod, nebo česká mapa.“ | „většinou pomůže něco jiného: český návod nebo česká mapa.“ | Čárka před „nebo“ jen při důrazném vylučovacím významu, ten tu není. |
| 11 | „Návod najdete na českých webech, jedním z nich je podrobný článek na VTM.cz o tom, jak Flightradar24 funguje“ | „Česky to podrobně vysvětluje článek na VTM.cz o tom, jak Flightradar24 funguje“ | VTM není návod k ovládání (viz fakta) a „jedním z nich je“ je vata. |
| 12 | „Polohy pocházejí z přijímačů signálu ADS-B, tedy z vysílání, kterým letadlo samo oznamuje svou polohu.“ | Doplnit MLAT podle VTM, viz fakta. | Věcná neúplnost. Jazykově je věta dobrá. |
| 13 | „Kdo data sdílí, může dostat od Flightradar24 bezplatný tarif Contributor. Stránka tarifů ho popisuje jako pozvánkový: aktivuje se po…“ | „…bezplatný tarif Contributor. Podle stránky tarifů je jen na pozvání a aktivuje se po…“ | Dvojtečka slibuje vysvětlení slova „pozvánkový“, ale věta pak popisuje postup aktivace. Spojka „a“ vztah vyjádří správně. „Pozvánkový“ je navíc kostrbatý novotvar. |
| 14 | H2 „Kdy stačí zdarma verze“ | „Kdy stačí verze zdarma“ nebo „Kdy stačí bezplatná verze“ | „zdarma“ je příslovce a před podstatné jméno jako přívlastek nepatří. Kotvu `kdy-staci-zdarma` lze nechat, upravit jen popisek v `ArticleContents`. |
| 15 | „Placený tarif dává smysl, když…“ | „Placený tarif se vyplatí, když…“ | Kalk z angličtiny („makes sense“). |
| 16 | „Česká mapa letadel zdarma: co umí a co ne“ (H2) + H1 „…co je v základu a co ne“ + H2 „Co je ve Flightradar24 zdarma a co ne“ | Jeden z nadpisů přeformulovat, např. H2 „Česká mapa letadel FlyQueens“ | Recyklace obratu „a co ne“ 3× (vada 13). |
| 17 | „Mapa letadel je zdarma, bez registrace a česky.“ | Ponechat jednou. Ve FAQ a v perexu stačí odkaz. | Stejná trojice „zdarma, bez registrace, česky“ zazní 4× (perex, odstavec, tabulka, FAQ). U vlastní služby to čtenář vnímá jako reklamu. |
| 18 | „Používáme veřejná ADS-B data z projektu ADSB.lol“ | „Používáme veřejná ADS-B data hlavně z projektu ADSB.lol“ | Viz fakta. Mapa může přepnout na jiný zdroj. |
| 19 | Tabulka: „mapa se obnovuje každých 10 sekund, jen když je záložka otevřená“ | „…jen když je záložka otevřená v popředí“ | Věcná přesnost podle RadarInfo. |
| 20 | Tabulka: „oblasti jsou kruhy o poloměru asi 460 km, začíná se nad Českem a okolím“ | „výchozí je Česko a okolí, dalších sedm oblastí pokrývá části Evropy; každá je kruh o poloměru asi 460 km“ | Neosobní „začíná se“ nemá podmět a zní úředně (vada 11). Doplněk zároveň podpoří FAQ „nemá celosvětové pokrytí“. |
| 21 | Tabulka: „dlouhý archiv (měsíce až roky) nenabízíme“ | „dlouhý archiv nenabízíme; mapa ukazuje jen krátkou stopu otevřeného letadla, let podle čísla najdete 7 dní zpět“ (to druhé jen pokud `/let` opravdu vrací data) | Pravdivé, ale nic neříká o tom, co mapa nabízí. |
| 22 | „Letadlo bez ADS-B vysílače, nebo mimo dosah přijímačů, na mapě nenajdete.“ | „Letadlo bez ADS-B vysílače nebo mimo dosah přijímačů na mapě nenajdete.“ | Čárky kolem „nebo mimo dosah“ jsou nadbytečné. Nejde o vsuvku, je to součást podmětu. |
| 23 | „U letu podle čísla z letenky pomůže návod, proč se číslo letenky liší od volacího znaku.“ | „Když znáte jen číslo letu z letenky, vysvětlíme v samostatném článku, proč se liší od volacího znaku.“ | „Návod, proč“ nedává smysl, návod říká *jak*. „Číslo letenky“ je jiné číslo než číslo letu (věcná chyba). |
| 24 | „Otevřete radar letadel nebo zadejte volací znak do vyhledávání na hlavní stránce.“ | „Otevřete radar letadel, nebo na hlavní stránce vyhledejte let podle čísla z letenky.“ | Věcná chyba, hlavní stránka volací znak nehledá. Čárka před „nebo“ je tu na místě, protože jde o dvě různé věty s vylučovacím důrazem. Lze ji i vynechat. |
| 25 | Konec: odkaz na `/radar` 3× za sebou (FAQ, CTA věta, tlačítko „Otevřít radar letadel“) | CTA větu nebo tlačítko ponechat, ne obojí | Zbytečné opakování. |
| 26 | FAQ: „Jazyky aplikace jsme neověřili, zkontrolujte je v jejím nastavení.“ | Sjednotit s tělem: „Aplikace pro iPhone podle App Store češtinu nemá, u Androidu ji zkontrolujte v nastavení.“ | Shoda FAQ a těla. Tělo říká „nedohledali“, FAQ „neověřili“. |
| 27 | Poznámka SourcesBox: „ceny na ní nebyly vidět a neuvádíme je. Jazyky webu a aplikace Flightradar24 se nepodařilo ověřit.“ | Přepsat podle nové verze (ceny jsou vidět, App Store jazyky uvádí). | Shoda se zdrojem. |

## Shoda tabulky, FAQ a perexu

- **Historie 7 / 90 / 365 dní / 3 roky:** tabulka, FAQ i perex sedí.
- **Záložka a filtr:** tabulka i FAQ mají „uložený filtr“, perex jen „filtr“ (oprava č. 2).
- **Reklamy:** tabulka (Silver+) a FAQ sedí.
- **„Seznam letů“:** perex a FAQ ho řadí do „placených tarifů“, tabulka správně až od Gold. Nejde o rozpor, jen o zjednodušení. Lze nechat, nebo doplnit „seznam letů až od Gold“.
- **Čeština:** perex („nenašli“), tělo („nedohledali, nemůžeme potvrdit ani vyvrátit“), FAQ („neověřili“) a poznámka („nepodařilo ověřit“) říkají totéž čtyřmi různými slovy. Po doplnění App Store sjednotit.
- **Ceny:** odstavec v těle i poznámka ve zdrojích tvrdí, že ceny nejsou vidět. Oboje opravit najednou.

## Strojové prvky (humanizace)

- **Hlavní problém je vyprávění o rešerši** (vada 12). Kontrolu nebo nenalezení text zmiňuje v perexu, v odstavci o cenách, 2× v sekci o češtině, ve FAQ a v poznámce. Popáté už to působí jako výmluva. Ponechat jedno poctivé přiznání (přepínač jazyka na webu), zbytek nahradit fakty.
- **Ohlašování** v perexu („Níže je přehled…“).
- **Recyklace obratu „a co ne“** v nadpisech (3×).
- **Kalk** „dává smysl“.
- **Opakovaná sebepropagace** „zdarma, bez registrace, česky“ (4×).
- Em-pomlčky, „klíčový“, „komplexní“, trojice ze zvyku ani nafouknutá důležitost se v textu nevyskytují. Rytmus vět je přirozeně nerovný.

## Co se měnit nemá

- **Srovnávací tabulka tarifů.** Je suchá a přesná, odpovídá zdroji řádek po řádku. Tón nechat.
- **„FlyQueens je samostatný český projekt a s Flightradar24 nijak nesouvisí.“** Poctivé vymezení, nechat.
- **„Na cestu na letiště se podle mapy neřiďte: čas příletu je u části letů jen odhad…“** Přiznané mínus vlastní služby, nejlidštější věta textu.
- **FAQ „Nemá ale dlouhý archiv letů ani celosvětové pokrytí jako Flightradar24“.** Přiznané mínus, nechat.
- **Odstavec o Contributor plánu** (kromě drobné opravy č. 13). Konkrétní, těžko vymyslitelný detail se stejným e-mailem.
- **Odrážky „Základní verze obvykle stačí, když…“** mají jednotný tvar vedlejší věty, vada 1 tu není.
- **Věta „Pro komerční použití je podle stránky tarifů určený jen Business, ostatní tarify jsou osobní.“** Věcná, správně suchá.
- **Konec článku na CTA bez shrnutí.** Neshrnovat (jen odstranit zdvojení odkazu).

## Verdikt

Text zní převážně jako od člověka: je věcný, krátký a bez typických AI frází. Nejvíc strojově působí opakované vyprávění o tom, co redakce „při kontrole“ našla a nenašla. Spolu s nepravdivým tvrzením o cenách je to hlavní věc k přepsání.
