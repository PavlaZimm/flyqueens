# FlyQueens

Česká mapa dostupného ADS-B provozu, letištní průvodci a obsah o létání. Produkce: [www.flyqueens.cz](https://www.flyqueens.cz).

## Lokální spuštění

Požadovaný Node.js: `22.13.0` nebo novější podporovaná verze.

```bash
npm ci
npm run dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000). Před odesláním změn spusťte:

```bash
npm run check
```

## Data a proměnné prostředí

Primární zdroj poloh je ADSB.lol. Aktuální zdroj a čerstvost se posílají v odpovědi `/api/flights` a zobrazují se uživateli. Výpadek se nikdy nenahrazuje falešnými „živými“ letadly; krátce lze použít označený poslední platný snapshot.

Podrobný stav zdrojů, přesnosti, výkonových úprav a další doporučené investice
shrnuje [audit dat a rychlosti](docs/data-performance-audit-2026-09-11.md).

Výzkum klíčových slov, publikační plán a bezpečný linkbuilding shrnuje
[obsahová a linkbuildingová strategie](docs/seo-content-linkbuilding-strategy-2026-09-11.md).
Co se píše teď a v jakém pořadí, je v [obsahovém plánu](tasks/content-plan.md).

Volitelné zdroje a funkce jsou výchozím stavem vypnuté:

- `OPENSKY_LICENSED=true` pouze po získání písemné licence a s `OPENSKY_CLIENT_ID` + `OPENSKY_CLIENT_SECRET`.
- `AIRPLANES_LIVE_ENABLED=true` pouze po odsouhlasení přístupu provozovatelem API.
- `ENABLE_ATC_PROXY=true` pouze pokud máte oprávnění stream dále přenášet.
- `AERODATABOX_API_KEY` aktivuje přesnější letový řád a trasová data.
- `AFFILIATE_PARKING_PRG_URL`, `AFFILIATE_PARKING_BRQ_URL` a
  `AFFILIATE_PARKING_OSR_URL` aktivují transparentně označené partnerské CTA na
  příslušných parkovacích stránkách. Bez platné HTTPS adresy se CTA nevykreslí.

Radar nabízí Evropu po předem vymezených oblastech. Jeden dotaz záměrně
nenačítá celý kontinent: bodové ADS-B rozhraní má omezený dosah a menší výřez je
rychlejší i čitelnější na mobilu. Každá oblast se ukládá do krátké samostatné
cache a při přepnutí se stará letadla nezobrazují jako data nové oblasti.

Výchozí hodnoty jsou v [`.env.example`](.env.example). Tajné klíče nikdy nepojmenovávejte s prefixem `NEXT_PUBLIC_`.

## Hlavní části

- `src/app/api/flights` – agregace živých poloh, timeouty a poslední platný snapshot.
- `src/app/api/flight-route` – trasa a volitelný letový řád.
- `src/components/Map` – Leaflet mapa, letiště a METAR.
- `src/app/letiste` – letištní a parkovací landing pages.
- `src/app/blog` – informační obsah.
- Typ letadla se určuje konzervativně z ICAO type designatoru a ADS-B kategorie; neznámý typ se nehádá podle adresy odpovídače.

## Provozní kontrola

Sledujte minimálně dostupnost `/api/flights`, dobu odpovědi, stáří `fetchedAt`, použitý `source`, podíl odpovědí `stale` a chyby 5xx. Cílem je p95 pod 1,5 s a žádná neoznačená náhradní data.

## Licence a omezení

ADSB.lol uvádí licenci ODbL 1.0. OpenSky vyžaduje pro živý produkt a komerční použití předchozí písemnou dohodu. Trasy, fotografie, mapové dlaždice, METAR a ATC audio mají vlastní podmínky; před monetizací musí mít každý aktivní zdroj zdokumentované oprávnění a atribuci.
