# AeroDataBox: spotřeba a oprava sdílení dat

## Zjištění 2. října 2026

V otevřených Vercel logách projektu flyqueens-app, filtr `aero-budget`, posledních 12 hodin:

- 09:00:09 CEST, produkční `/api/aero-insights`: `boardUnits: 98`, `lookupUnits: 52`, `dailyLimit: 150`. Vyčerpán součet, nikoli jen limit jedné kategorie.
- Placené rezervace byly i z preview, například 08:45:41 dvě volání insights s lookupUnits 40 → 46. Produkce i preview čerpaly tentýž rozpočet.
- 08:37:38 produkční `/api/airport-flights`: boardUnits 56; 08:38:16 `/letiste/praha/odlety`: boardUnits 58. Jednotlivé staré logy neobsahovaly placený endpoint, proto z nich nelze spolehlivě rozpočítat všechny dotazy podle letiště.
- Původní slučování souběhu a fronta existovaly pouze v paměti jedné instance. `unstable_cache` zahrnuje do identity také podobu funkce; nebyl zde vlastní distribuovaný zámek ani společný cooldown chyb. Konkrétní podíl souběhu versus změn cache při nasazení nelze ze starých logů dokázat.

## Oprava

- Placené odpovědi ukládá existující Neon databáze do `aero_response_cache`. Klíč je hash verze, adresy poskytovatele a přesné cesty dotazu, nezávislý na sestavení Next.js. Klíče API ani hlavičky se neukládají.
- Atomický zámek dovolí jeden refresh stejného dotazu mezi instancemi. Čekající čtenáři krátce počkají nebo použijí stále přípustný snímek. Zámek po pádu vyprší, starý vlastník nemůže přepsat nového.
- `aero_provider_gate` koordinuje různé dotazy napříč instancemi a po skončení požadavku nechává nejméně 1,1 s odstup. Zároveň zůstává atomický denní čítač.
- Preview a development jen čtou cache, nevytvářejí placené dotazy. Mohou tedy ukázat stav bez dat. SSR stránky tabulí a `/dnes` zůstávají dynamické; explicitní build phase také odmítá nákup.
- Úspěšná prázdná odpověď HTTP 204 se ukládá stejně jako data. Chybné placené dotazy mají společnou prodlevu: tabule celý běžný interval obnovy, podrobnosti minutu. Dosažený denní rozpočet blokuje daný dotaz do další půlnoci UTC.
- `fetchedAt` se při čtení nikdy neposune. Nouzově lze vrátit snímek mladší než dvojnásobek TTL; starší je nedostupný. Cache není nový archiv: prošlé záznamy se postupně mažou při úspěšných obnovách (max. 100 na obnovu).
- Bez databáze se nevolá placené API. Log rezervace nově obsahuje endpoint, prostředí a jednotkovou cenu; log odpovědi i HTTP stav. Žádné klíče nebo celé odpovědi.

## Rozpočet

Celkový limit **150 jednotek za UTC den se nemění**, dnešní čítač se neresetuje. Strop podrobností snižujeme z 60 na **22**, tabule mají nadále 128. To odpovídá max. 96 jednotkám za PRG při 30minutové obnově a 32 za čtyři regionální tabule při 6hodinové obnově. Jde o rozpočet při běžných úspěšných obnovách; výpadky, změny konfigurace a stará nasazení mohou dostupnost omezit. Jednotky nejsou počet požadavků. Nasazení nemění tarif ani limit poskytovatele.

**Dnešní limit zůstává vyčerpaný.** Nová cache nezačíná s historickými odpověďmi ze staré Next cache. Provozní naplnění čerstvými daty lze ověřit až po resetu denního čítače v 00:00 UTC (3. října 02:00 pražského času). Staré preview buildy novou ochranu neobsahují; neotevírat je pro datové testy. Pokud se používají dál, mohou ještě rezervovat jednotky ve společném čítači.

## Ověření

### Následná kontrola 2. října kolem 12:30 CEST

V produkčních Vercel logách s filtrem `aero-budget` za posledních 12 hodin zůstávala poslední rezervace v 09:00:09 na 98 + 52 = 150 jednotkách. Filtr `aero-cache-refresh` ukázal například ve 12:10:21 `/api/flight-route` s `attempted: false` a důvodem `AeroDataBox daily allowance reached`. Ochrana tedy odmítá další placené pokusy. To zatím nedokazuje úsporu za celý den ani úspěšné plnění nové cache: dnešní limit byl vyčerpán před nasazením. První celý UTC den nové verze končí 4. října ve 02:00 CEST.

### Měření používání webu

Vercel Web Analytics není zapnuté (dashboard nabízí Enable a zobrazuje Demo Data). Existující vlastní události proto připojujeme i ke stávajícímu GA4, bez aktivace další služby. V administraci byl ověřen stream `https://www.flyqueens.cz`, ID měření `G-SMFS92YP8L`, služba FlyQueens 533725184. Domovský přehled za posledních 7 dní při kontrole ukazoval 89 aktivních uživatelů, 429 zobrazení a 902 událostí; zahrnuje i případné vlastní testy, nejde o důkaz organického růstu.

`trackEvent` nově odesílá také GA4 událost v podobě `lower_snake_case`, jen na produkčních doménách a s uloženým souhlasem v3. Bez souhlasu, při blokovaném úložišti či nenahraném Google tagu se GA4 událost vynechá. Události se zpětně nedoplňují. Mezi sledované akce patří `flight_detail_opened` (včetně automatického otevření výsledku hledání), `radar_search_result`, `flight_follow_changed`, `aircraft_photo_opened`, `spotting_arrivals_filter` a `spotting_aircraft_opened`. Změna sledování měří tlačítko, nikoli automatické ukončení při posunu mapy. Parametry neobsahují hledaný text ani souřadnice uživatele. Historické počty těchto nově zapojených akcí nelze obnovit.

Implementace podle [oficiální dokumentace GA4 událostí](https://developers.google.com/analytics/devguides/collection/ga4/events). Příjem kontrolovat v Realtime; návštěvy stránky `/letiste/praha/dnes` hodnotit odděleně od kliknutí na její filtry. Automatický budoucí monitoring touto kontrolou nevzniká.

`scripts/test-aero-cache.mjs` spouští skutečný SQL kód proti izolovanému místnímu PostgreSQL, poskytovatele nahrazuje testovací odpovědí. Ověřuje 12 nezávislých instancí při prázdné cache (jediný placený pokus), zachování časů, HTTP 204, preview/development/build bez nákupu, chyby, stáří, dosažený denní limit, souběžné rezervace posledních jednotek, převzetí expirovaného zámku a rozestupy různých endpointů. Stejný test je součástí CI s PostgreSQL 17. Test nikdy nepoužívá skutečný API klíč.
