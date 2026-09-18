---
name: psani-clanku
description: Postup pro psaní a přepisování článků na weby Pavly (bilinsko, attersee, tripradar, ithaka, handzone). Použij vždy, když se má napsat nový článek, přepsat nebo rozšířit existující, nebo když se rozhoduje, jestli má aktualizace vůbec smysl. Obsahuje kontrolu, kdy se článek psát NEMÁ (zero-click, hybridní dotaz), povinnou humanizaci, zákaz vymýšlet fakta, opravy zastaralých rad v ostatních SEO skills a formát odevzdání. Doplň k němu skill pro konkrétní web, například web-bilinsko.
---

# Psaní článku

Platí pro nový článek, přepis i rozšíření. **Nejdřív se rozhodne, jestli psát,
teprve pak se píše.**

Ke každému článku patří i skill pro daný web. Ten určuje hlas, barvy, stavbu
a pasti. Tenhle skill určuje postup.

---

## 1. Kdo co dělá

| krok | kdo |
|---|---|
| data z Marketing Mineru a Search Console | hlavní model |
| živý SERP přes Apify | hlavní model |
| konkurence a fakta | agenti na rešerši |
| **draft a přepis** | **píšící agent, Sonnet 5** |
| kontrola faktů a čeština | dva agenti paralelně |
| stylování, fotky, publikace | hlavní model |

⚠️ **Korektura češtiny je povinná i u textu, jehož fakta jsou ověřená.**
Jsou to dvě různé kontroly a jedna druhou nenahradí. U článku o kodaňském
ubytování se 30. 7. 2026 udělala kontrola faktů a korektura se přeskočila,
protože rešerše byla dobrá. Na web pak šla věta „Pro koho: fotka na cestu,
páry, kdo chce mít pohlednici za rohem" a všimla si jí Pavla, ne já.
Následná korektura našla **dalších 23 vad** včetně dopočítaného násobku
a vynechaného čísla, které šlo proti pointě.

**Na korekturu je skill `korektura-cz`** se 45 měřenými vadami z našich
vlastních textů. Používá se **spolu s `humanizace`**, ne místo něj.

**Píšící agent nesbírá data sám.** Marketing Miner stojí kredity a Apify peníze.
Čísla dostane hotová v zadání. **Když v zadání chybí, napíše to a nedomýšlí si.**

---

## 2. Vypínač: kdy se článek NEPÍŠE

Projít **před** psaním. Když platí kterákoli, práci zastavit a říct to.

### Podpis zero-clicku
Pozice drží nebo se zlepšila, zobrazení drží nebo rostou, kliky padají k nule.
**Přepsání nepomůže**, odpověď sebral výsledek vyhledávání.

Změřeno na tripradaru 29. 7. 2026: `rim-hlavni-mesto-italie` má **pozici 3,0
a nula kliků** z 3 835 zobrazení. Rankuje na „hlavní město Itálie", kde je
odpověď jedno slovo. Rok předtím byl na pozici 22,2 a taky nula kliků.
**Zlepšení o devatenáct míst nepřineslo ani jeden klik.**

### Hybridní dotaz
Místo plus zodpověditelná otázka. „Co vidět v okolí Teplic za víkend."
„Jak dlouho trvá výstup na Milešovku." AI odpověď tam vyskočí
v **92 až 97 %** případů (Whitespark, 540 ručních dotazů, 5/2025).

### Výčet „7 tipů na…"
Meziročně klesá **i z lepších pozic**. Naměřeno na dvou webech nezávisle:
tripradar „10 tipů Korutany" ztratil 86 % kliků, přestože se posunul
z deváté pozice na pátou.

### Zmizelá poptávka
Zobrazení i kliky dolů, pozice drží. Sloučit s jiným článkem, nepřepisovat.

### Záměr, na který blog nestačí
Ze skillu `keyword-research`: **zadat hlavní slovo do Googlu a podívat se,
co je v top 3.** Když jsou to provozovny, e-shopy nebo rezervační portály,
článek to nepřebije. Nepsat.

---

## 3. Co naopak funguje

Vlastní meziroční měření: obsah s **cenami a otevírací dobou rostl o 12 %**,
zatímco obecné průvodce padaly.

Lokální dotazy mají AI odpověď jen v **7,9 %** případů, místní panel v **93 %**
(Ahrefs, 146 milionů výsledků, 9/2025).

⚠️ **Chrání nás lokální záměr, ne malá hledanost.** Skoro 60 % dotazů
s AI odpovědí má sto a míň hledání měsíčně (Semrush, 10 mil. klíčových slov).
Dlouhý ocas není úkryt, AI se tam koncentruje.

Piš tedy: **konkrétní cena, otevírací doba, telefon, jak se tam dostat,
kde zaparkovat, co je v pondělí zavřené, vlastní fotka, vlastní zkušenost.**

Do každé ověřené stránky napsat viditelně „Ceny ověřeny 7/2026".

---

## 4. ⚠️ Co v ostatních SEO skills už neplatí

Ty skills jsou dobré, ale některé rady zestárly. **Tohle přebíjí, co je v nich.**

### `featured-snippety`, řádek 18 a 35 — obrácená rada
Skill radí: *„soustřeď se hlavně na transakční a long-tail obsah"*, protože
long-tail má nízkou hledanost.

**Neplatí.** Semrush naměřil, že skoro 60 % dotazů s AI odpovědí má
sto a míň hledání měsíčně. Útěk do long-tailu je dnes útěk do rány.
Chrání **lokální záměr a záměr někam fyzicky jet** (7,1–7,9 %), ne objem.

Tvrzení *„transakční dotazy AIO neovlivňuje!"* je **neověřené**, nemáme k němu měření.

A pozor: **otázkové dotazy mají AI odpověď v 57,9 % případů.** Odpověď
na ~45 slov pod otázkou psát dál, ale hraje se tam o citaci, ne o klik.

### `strukturovana-data` a `clanek-z-videa` — FAQPage je mrtvé
Google ho **od 7. 5. 2026 v Search nezobrazuje** a v červnu smazal dokumentaci.
**FAQ blok v textu má smysl dál, ta značka pod ním už ne.**
V checklistu `clanek-z-videa` ho neodškrtávat.

### `on-page-seo` a `seo-clanek` — minimální počty slov
Skills říkají 500+ slov, u lokalitních stránek 1500–3000.

**Nepoužívat jako cíl.** Nejúspěšnější článek bilinska má **380 slov
a 516 kliků**. Webkamera Bílina má 42 slov a 2 180 zobrazení. Přesunutý
kostel měl 212 slov a nulu kliků. **Délka není páka.**

Navíc: klasifikátor užitečnosti hodnotí **web jako celek**, takže nafouknout
deset článků vatou uškodí i těm dobrým. Délku odvozuj z konkurence, ne z tabulky.

### `eeat-ymyl`, řádek 143 — chybí podmínka
Skill chválí *„pravidelnou aktualizaci obsahu"* bez výhrady.

Google ve vlastní dokumentaci: **změna data bez změny obsahu je „jen šum
a k ničemu"** (Mueller). Datum posouvat **jen při skutečné věcné změně.**
Oprava odkazu nebo překlepu není důvod.

### `seo-clanek` — tučné a závěr
Skill radí zvýrazňovat klíčová slova tučně a končit shrnutím s výzvou k akci.
`humanizace` obojí jmenuje jako známku stroje. **Rozhodnutí:** tučně jen tam,
kde to čtenáři pomůže se zorientovat, ne kvůli klíčovým slovům. Závěr jen
tehdy, když nese **konkrétní další krok**, ne obecné „budoucnost vypadá slibně".

### `konkurencni-audit` — jiný účel, než se zdá
Je o Ahrefs, reklamách a positioning mapě, **ne o rozboru první stránky
Googlu** před článkem. Ten postup je ve webovém skillu.

### `gsc-analyza` — umí víc, než jsem si myslel
**Striking distance tam je** („top KW s pozicí 4–10 → příležitosti pro rychlý
posun na top 3") a **zná i vzorec „stejná pozice, míň kliků"**, u kterého
správně jmenuje AI Overview jako příčinu.

Chybí mu jen **rozhodnutí, kdy nesahat**. Doplňuje to typologie v sekci 2:
u zero-clicku se lepší meta popisek nevyplatí, protože klik nikdo neudělá.

Ani `konkurencni-audit`, ani `gsc-analyza` **nepočítají fotky konkurence**.
To je povinné, viz sekce 9.

---

## 5. Humanizace je povinná, ne doplněk

**Načíst skill `humanizace` u každého článku.** Není to kosmetika na konec,
je to důvod, proč Pavla 7/2026 řekla „píšeš jako stroj".

Nejdůležitější z něj:

- **Ani jedna em-pomlčka `—`.** V češtině nemá co dělat. Tečka, čárka,
  dvojtečka nebo závorka. (Pomlčka `–` s mezerami pro vsuvky je jiný znak
  a ta je správně.)
- **České uvozovky „takto"**, ne rovné.
- **Střídat délku vět.** Vyrovnaná střední délka je nejsilnější známka stroje.
- **Nenafukovat důležitost.** Ne „představuje mezník", ne „klíčovou roli".
- **Žádné vágní autority.** Buď jmenuj zdroj, nebo tvrzení škrtni.
- **Necyklit synonyma.** Opakovat totéž slovo je v pořádku, když je nejjasnější.
- **Nezáporné paralelismy.** Ne „nejde jen o X, jde o Y".
- **Žádné trojice ze zvyku.**

A dvě věci, na které se u humanizace zapomíná:

**Sterilní text je stejně nápadný jako strojový.** Cílem není vyčistit text
do neutrality, ale aby za ním byl slyšet člověk. Chránit: konkrétní těžko
vymyslitelný detail, přiznané mínus, smíšený pocit, slang bez uvozovek.

**Ceník, otevírací doba a návod se píšou suše.** Tam je věcný tón ten správný
lidský hlas. Necpat tam historky ani první osobu.

---

## 6. Železné pravidlo o faktech

**Nevymýšlet ani jeden údaj.** Psát výhradně z toho, co je v zadání
a ve výzkumné stopě (`Vyzkum/<tema>/zdroje.md`).

Když detail chybí, jsou tři možnosti:
1. napsat prostou verzi bez něj
2. označit ho jako neověřený („ověřte na místě")
3. zeptat se

**Vymyslet ho je vada, i když text zní líp.** Platí i při humanizaci:
vyměnit vágní tvrzení za konkrétní se smí **jen tehdy, když ta konkrétnost
pochází ze zdroje.**

Vlastní zkušenost a vlastní fotky autorky zmiňovat, **jen když reálně existují.**

**Když si zdroje odporují, popsat to.** Do článku patří ta pravděpodobnější
verze plus věta „ověřte si to telefonicky".

---

## 7. SEO, které se nesmí zapomenout

**Skills, které se načítají vždy:**

| skill | k čemu |
|---|---|
| `humanizace` | 33 českých anti-AI vzorců, ochrana proti přepsání do sterilna |
| `on-page-seo` | titulky 40–60, popisky 120–155, ALT, odkazy |
| `seo-clanek` | struktura H1–H3, perex, checklist |
| `featured-snippety` | odpověď ~45 slov pod otázkou |
| `citace-zdroje` | jak uvádět zdroje, aby zvyšovaly důvěru |
| `vyzkumna-stopa` | co a jak ukládat do `Vyzkum/` |

**Podle tématu:** `lokalni-seo` u míst a podniků, `eeat-ymyl` u zdraví,
peněz a elektro, `keyword-research` u nových témat, `gsc-analyza` u rozborů
výkonu, `emocni-audit` u stránek, které mají něco prodat,
`strukturovana-data` u schémat.

**Skills nejsou nápověda, je to Pavlino know-how ze školení.**
Nevymýšlet vlastní postup, když na to existuje skill. Platí i výhrady
ze sekce 4 — některé rady v nich zestárly.

- **Titulek 40–60 znaků**, klíčové slovo na začátku
- **Meta popisek 120–155 znaků**
- **Jeden H1**, logická hierarchie H2 a H3, za každým H2 aspoň odstavec textu
- **Odpověď ~45 slov** hned pod otázkovým nadpisem, odrážky nanejvýš čtyři
- **Google si češtinu skloňuje sám.** Pády, diakritika ani pořadí slov nic
  nestojí, doloženo z vlastní Search Console. Klíčová slova ber jako témata
  a piš přirozeně. **Necpat tvary z Mineru do vět.**

**Při přepisu:** vytáhnout ze Search Console dotazy, na které stránka
už rankuje, a všechny je zapracovat do nového textu. **Jinak se ranking ztratí.**

---

## 8. Co agent odevzdá

**Čistý text se strukturou, ne HTML.** Nadpisy jako `##` a `###`, tabulky
v Markdownu, u fotky poznámka `[FOTO: co má být vidět]`.

Stylování, obrázky a publikaci dělá hlavní model. **Agent se nestará
o barvy ani o Gutenberg.**

K textu přiložit:
- titulek s počtem znaků
- meta popisek s počtem znaků
- návrh adresy **bez roku**
- ALT texty k navrženým fotkám
- **seznam tvrzení, kterými si není jistý**
- upozornění, když na stejné hlavní slovo už článek existuje

---

## 9. Kolik fotek

Zjistit u **prvních tří výsledků, kolik fotek mají oni**, a podle toho
navrhnout počet. Zapsat do výzkumné stopy jako „konkurence má X, my dáme Y".

Počítat `<img`, **ne třídu `wp-image-`** — ta zachytí jen obrázky vložené
přes editor a mine všechny ostatní. Tahle chyba 29. 7. 2026 způsobila,
že se u devíti článků hlásila nula fotek, přestože šest jich mělo.

---

## 9b. ⚠️ Témata, o kterých se nepíše

**Drogy, jejich prodej ani užívání.** Ani slovo, ani jako historická poznámka,
ani jako varování. Platí i pro názvy míst, které to nesou v pojmenování
(kodaňská Pusher Street) a **i pro FAQ schema**, kam to čtenář nevidí, ale
Google ano.

Rozhodnutí Pavly, 30. 7. 2026. Vyplynulo z toho, že u dvou kodaňských článků
takových zmínek bylo dohromady dvacet.

**Pozor na past:** když se zmínky odstraní z hotového článku, ale nechají
se v rešerši, **objeví se znovu v dalším textu ze stejných zdrojů.** Přesně
to se stalo u „Co vidět v Kodani". Kontroluj proto **draft, ne jen web.**

Co místo toho: informace o místě zůstane, jen bez tématu. Christiania se
od roku 2024 změnila, dá se tam fotit, po setmění může být nepříjemná.
To čtenáři stačí.

---

## 10. Zakázáno

- **Rok v adrese.** `/vanocni-trhy-2023/` je chyba, kterou pak nejde opravit.
  V titulku rok naopak být má, ten se každý rok přepíše.
- **Schema FAQPage.**
- **Začínat článek obrázkem.** Náhledovka se ukáže sama, první fotka
  až pod úvodní odstavec.
- **Měnit datum publikace bez skutečné změny obsahu.**
- **Publikovat rovnou.** Vždy draft nebo naplánováno, schválení je Pavlino.
- **Psát délku pro délku.**
