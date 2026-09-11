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

Volitelné zdroje a funkce jsou výchozím stavem vypnuté:

- `OPENSKY_LICENSED=true` pouze po získání písemné licence a s `OPENSKY_CLIENT_ID` + `OPENSKY_CLIENT_SECRET`.
- `AIRPLANES_LIVE_ENABLED=true` pouze po odsouhlasení přístupu provozovatelem API.
- `ENABLE_ATC_PROXY=true` pouze pokud máte oprávnění stream dále přenášet.
- `AERODATABOX_API_KEY` aktivuje přesnější letový řád a trasová data.

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
