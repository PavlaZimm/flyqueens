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

`scripts/test-aero-cache.mjs` spouští skutečný SQL kód proti izolovanému místnímu PostgreSQL, poskytovatele nahrazuje testovací odpovědí. Ověřuje 12 nezávislých instancí při prázdné cache (jediný placený pokus), zachování časů, HTTP 204, preview/development/build bez nákupu, chyby, stáří, dosažený denní limit, souběžné rezervace posledních jednotek, převzetí expirovaného zámku a rozestupy různých endpointů. Stejný test je součástí CI s PostgreSQL 17. Test nikdy nepoužívá skutečný API klíč.
