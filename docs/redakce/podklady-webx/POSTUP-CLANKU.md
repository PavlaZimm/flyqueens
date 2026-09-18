# POSTUP ČLÁNKU — tahák redakce (jak psát každý článek na všech webech)

Praktický checklist ke `CLAUDE.md` (závazná pravidla) a `PRAVIDLA-PSANI.md` (jak psát lidsky).
Platí pro **každý článek na všech webech** (ithaka, attersee, bilinsko, tripradar, handzone, kastrup).

---

## 4 železná pravidla (proč to děláme)
1. **Data před psaním** — nikdy nepsat naslepo (MM + GSC), platí i pro rozšíření.
2. **Pravda** — každé číslo/fakt ověřit, nejistoty přiznat („ověřte na místě"), nic si nevymýšlet.
3. **Piš lidsky, ne jako stroj** — anti-AI (viz PRAVIDLA-PSANI.md).
4. **Použij skills** — načíst relevantní SEO skills PŘED psaním, není to nápověda, je to know-how.

---

## Postup krok za krokem

### 0. Zadání
Téma · web · cíl (informovat / konvertovat / autorita).

### 1. DATA (pravidlo 1)
**⚠️ NOVĚ: ověř `serp_features` u hlavního dotazu.** Když MM hlásí `knowledge_graph`
nebo `local_pack`, klik si vezme panel nebo mapa a článek to nezmění. Hledej v okolí
long-tail bez těchto prvků. (Viz PRAVIDLA-PSANI §24.)

- **Marketing Miner** `keyword_search_volume` na hlavní téma → **hledanost, sezónní špička (peak_month), obtížnost, CPC**. Pak `keyword_suggestions` → long-taily + obtížnost + SERP featury (featured_snippet, people_also_ask, ai_overviews).
- **GSC** `python3 gsc.py <web>` → na co web už rankuje: *striking distance* (poz. 5–20 = rychlá výhra), díry (poz. >20 se zobrazeními).
- **⭐ PŘI PŘESTAVBĚ EXISTUJÍCÍ STRÁNKY (povinné):** vytáhni z GSC **PŘESNÉ dotazy, na které TA stránka už rankuje** (filtr na URL stránky, dimenze query) a **každý smysluplný termín zapracuj do nového textu** (titulek/H2/odstavec/FAQ). Jinak hrozí, že přepisem vypustíš termín s pozicí a přijdeš o traffic, který už máš. Ber to jako „co už funguje, neztratit + posílit". Po publikaci si projdi seznam ranked dotazů a odškrtej, že jsou pokryté (viz západy slunce: západ slunce praha ✅, riegrovy sady zapad slunce ✅, kam na západ slunce ✅…).
- **Rozhodnutí** = hledanost × dostupnost (nízká obtížnost) × sezónní špička. Přednost má téma s existující viditelností, jehož sezóna se blíží.
- **Diakritika**: cílit i českou variantu, jak to lidi píšou (leba, kolobřeh), ne jen polský originál (Łeba, kołobrzeg). MM kredity: jednotlivé volume/suggestions levné (používat vždy); content_gap/kanibalizace drahé (šetřit).

### 2. SKILLS (pravidlo 4)
Načíst **3 jádrové vždy**: `on-page-seo` · `seo-clanek` · `featured-snippety`.
Podle tématu přibrat: `eeat-ymyl` (zdraví/elektro — povinný disclaimer) · `keyword-research` · `gsc-analyza` · `topic-clustery` / `obsahove-pilire` · `strukturovana-data` · `konkurencni-audit` · `technicky-audit` · `ux-konverzni-optimalizace`.

### 3. KONKURENCE (agent)
Kdo je v TOP 10 v ČESKÉM SERPu · struktura vítězů (H2, délka, tabulky/FAQ/mapa/ceny) · **jejich lidský tón** (inspirace hlasem, ne obsahem) · **díry**, co nikdo nepokrývá.

### 4. FAKTA (agent, pravidlo 2)
**Výstup ulož do `Vyzkum/<tema>/zdroje.md`** s hodnotou, zdrojem a datem platnosti;
co se nepodařilo ověřit, do `neoverено.md`. Skill: `vyzkumna-stopa`.
Citace podle skillu `citace-zdroje`: min. 4 nezávislé zdroje, zdroj u čísla přímo ve větě.

Ověřené údaje se zdroji (URL) a mírou jistoty. Sporné superlativy podat opatrně („jeden z největších"). Ceny s rokem.

### 5. DRAFT (pravidlo 3, dle PRAVIDLA-PSANI)
- **Lidský hlas**: scéna ze života v úvodu (ne panel jako první), katalog průšvihů („co lidi zvorají") > katalog výhod, nestejná stavba, min. 1 věta/sekci, kterou by šablona nevyplivla.
- **Žádná „–" pomlčka jako pauza** (top AI tell) — čárka/tečka. En-dash jen číselné rozsahy (24–26 °C).
- Struktura dle `seo-clanek`: 1 H1, 3–6 H2, perex, tabulky, délka jako TOP3 konkurence ±10 % (velký průvodce 1 500–3 000 slov).
- Cílit long-taily z MM.

### 6. QA (2 agenti paralelně)
fact-check + český korektor (anti-AI). Opravy nasadit.

### 7. FOTKY
Složka `Fotografie/<téma>/` · vlastní (nej pro E-E-A-T) nebo Commons (public domain u historie) · **vizuální kontrola (contact sheet)** · český ALT (≤100 zn.) + licenční kredit · ~1 500 px, WebP ideálně ≤100 kB · **náhledový obrázek = hero** (kvůli sdílení/OG).
- **⭐ PŘI PŘESTAVBĚ (povinné): zachovej a optimalizuj stávající obrázky ze staré verze**, hlavně **vlastní fotky autora** (v médiích poznáš podle názvu typu `20240822_…`, časů = reálné focení) — nikdy je přepisem nevyhazuj, znovu je vlož (a optimalizuj velikost). Před přestavbou si z content.raw vytáhni `<img src>` a zkontroluj, že žádná nezmizela.
Commons pozn.: rate-limit 429 po ~3 rychlých stažení → povolené šířky (1920px), retry.

### 8. PUBLIKACE
- **⭐ RUBRIKA (povinné, nezapomínat!):** při publikaci VŽDY vědomě nastav `categories` — nenechávej to na defaultu ani na Pavle (7/2026 musela rubriky doplňovat ručně za mě). Před publikací si vypiš rubriky webu (`/wp-json/wp/v2/categories`) a vyber tu, co sedí tématem. Stejně tak zvaž `tags`.
- **⭐ DIVI → VŽDY GUTENBERG:** narazíš-li při přestavbě na `[et_pb_` v obsahu, **vždy** to převeď na Gutenberg bloky a nastav `meta._et_pb_use_builder = 'off'`. Nikdy nenechávat článek v Divi. Po publikaci ověřit, že v HTML není `[et_pb` leak.
- **⭐ FOTKY — dotáhnout a označit původ:** nemáš-li vlastní fotku, **dotáhni ji** (Wikimedia Commons; u historie často public domain) a **vždy uveď, od koho je** — popisek ve formátu „Foto: Jméno autora, Wikimedia Commons, licence" (u vlastních „Foto: vlastní archiv (místo, rok)"). Nikdy fotka bez kreditu. Vizuálně zkontrolovat, že ukazuje to správné místo (past: stejnojmenné obce — „Osecký Jadran" je z Oseku nad Bečvou, ne od Duchcova!).
Gutenberg přes REST · **záloha `content.raw`** do `backups/` před úpravou · `rank_math_title`/`_description` (odemčeno ithaka+handzone; tripradar jen title+desc) · interní odkazy z pilíře a příbuzných + do money-page · ubytovací box (Stay22) kde dává smysl přespání.
- **⭐ DATUM — dvě situace, nepleť si je:**
  - **Publikovat hned** → datum **do minulosti** + `status='publish'`. (Budoucí datum omylem = `status=future` = článek je OFFLINE, klasická past.)
  - **Naplánovat dopředu** (Pavlin postup u série článků: **jeden po třech dnech**) → datum **do budoucna** + `status='future'`. WordPress ho vydá sám. Tohle je záměr, ne chyba. Po naplánování ověř `status` a `date`.
**Ověřit naživo**: 1× H1 · žádný `[et_pb` leak · fotky + ALT · 0 AI pomlček.

### 9. MĚŘENÍ
Za ~2–3 týdny GSC vs. baseline (pozice nahoru? CTR nahoru? featured snippet?).

---

## Odkazování (výzkum 7/2026, zdroje: Google Search Central, Ahrefs)
**Ven:** odkazovat ven **pomáhá** (odliv PageRanku = mýtus, Google to říká sám). Odkaz na web podniku, který jen doporučujeme a nemáme z něj provizi = **normální follow, žádný rel** (dát `sponsored` = lež o obchodním vztahu!). **`rel="sponsored"` jen na affiliate/placené** (Booking, Stay22) + viditelné české označení. `nofollow` jen na nedůvěryhodné weby. **3–8 odchozích odkazů**, umístěné **v textu u tvrzení, které dokládají** (ne blok „Odkazy" na konci). Anchor **popisný** („aktuální jídelní lístek Černého orla"), nikdy „zde". Mapy: **jen odkaz, NIKDY embed iframe** (zabíjí LCP).

**Dovnitř:** hub ↔ satelit **obousměrně**, satelit ↔ satelit kontextově („po prohlídce kláštera je Černý orel 5 minut pěšky" = zlatý odkaz). **3–5 kontextových interních odkazů**/článek, anchory **variovat** (ne pořád stejná přesná klíčovka). **⭐ Pravidlo proti osiřelým stránkám: nepublikovat, dokud na článek nevede odkaz z hubu + aspoň 1 příbuzného.**

**Schema pro CIZÍ podnik:** hlavní typ **`Article`**, podnik ve **`about`** (nikdy samostatný `Restaurant` node = předstírání vlastnictví, zakázané). Nejkonkrétnější typ: `Restaurant` / `Brewery` / `Campground` / `TouristAttraction`. Přidat `sameAs` (oficiální web + Google profil + FB) = **disambiguace entity** → bez toho nás AI necituje. Označovat **jen to, co je v textu vidět**, nevymýšlet `openingHours`.

**Entity SEO 2026:** pojmenuj entitu jednou celým jménem („restaurace Černý orel v Oseku, okres Teplice"), pak zkracuj. Konkrétní ověřená čísla = to, co Booking.com nemá.

## Kam jde klíčovka (on-page-seo)
titulek **40–60 zn., KW na začátku** · meta **120–155 zn.** + CTA · **H1** · **1. odstavec** · aspoň **1 H2** · **ALT** · **kotvy interních odkazů** (KW, ne „zde") · **URL**. Přirozeně, žádné cpaní.

## Featured snippet / AI Overviews (featured-snippety)
Odpověď **~45 slov** hned pod otázkou-H2 · seznam **4 položky** · **FAQ + FAQPage schema** na pozici 0.

---

## Nuance podle webu
| Web | Barva | Hlas | Klíčovky | Monetizace |
|---|---|---|---|---|
| ithaka | mořská modrá #0277BD | kamarád (vykání) | MM velká témata + sezóna | ubytovací box (Stay22) |
| attersee | červená #C62828 | kamarád (vykání) | MM + GSC | ubytovací box + money-page |
| tripradar | oranžová #C4700F | kamarád (vykání) | GSC vede (hyperlokál), MM velká | ubytovací box (Stay22) |
| bilinsko | zelená #4E8A1E | kamarád (vykání) | **GSC vede** (MM malé místní nevidí) | ubytovací box u přespávacích míst |
| handzone | modrá #1863DC / #212121 | **řemeslník** + disclaimer (YMYL) | MM/GSC | **produktový affiliate AŽ s trafficem** (teď AdSense + obsah) |

- **Němčinu MM neumí** (langs: cs, sk, pl, hu, ro, gb, us) → na německý obsah použít druhý nástroj (Ahrefs-style, volume by country).
- Stay22 (`letmeallez.js`) auto-konvertuje Booking odkazy: nasazený na attersee, ithaka, tripradar, bilinsko. **NE handzone.**

## Technika
MM přes ToolSearch „miner" · GSC `python3 gsc.py <web>` (tripradar = `sc-domain:tripradar.cz`) · REST app passwords ve `wordpress-sites.json` · znovupoužitelný build helper `Weby/tripradar/rebuild_helpers.py` (barevná paleta, mobilní tabulky, komponenty).

## Pojmenování sekcí (doplněno 7/2026)
Google indexuje jednotlivé sekce článku samostatně a dává jim vlastní pozici,
často lepší než hlavní stránka. Proto **pojmenovávej sekce tak, jak se ptají lidé**:
„Ceník", „Otevírací doba", „Jak se tam dostat", „Časté otázky".
Každá sekce je samostatná příležitost, ne jen členění textu.
