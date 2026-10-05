# Radar letadel: ověřená fakta a zdroje

Stav k 5. 10. 2026. Každé tvrzení v textu pod radarem má tady zdroj. Kód znamená soubor v tomto repozitáři ve stavu z 5. 10. 2026.

## Primární zdroje (otevřeno 5. 10. 2026)

- FAA, Ins and Outs: https://www.faa.gov/air_traffic/technology/equipadsb/capabilities/ins_outs (stránka aktualizována 7. 2. 2023). ADS-B Out vysílá GPS polohu, výšku, rychlost vůči zemi a další údaje jednou za sekundu. Radar podle FAA zjišťuje polohu každých 5 až 12 sekund. Rádiové vlny jsou omezené přímou viditelností.
- FAA, ADS-B FAQ: https://www.faa.gov/air_traffic/technology/equipadsb/resources/faq (aktualizováno 1. 8. 2025). ADS-B hlásí barometrickou výšku, která je „pressure altitude“ (výškoměr nastavený na 29,92 inHg), a geometrickou výšku z GPS. Rychlost je vůči zemi, vzdušnou rychlost ADS-B nehlásí. Data nejsou šifrovaná a přijme je kdokoli s přijímačem. ADS-B Out je povinné jen v určeném vzdušném prostoru, výjimky mají například kluzáky, balóny a letadla bez elektrické soustavy (pravidlo FAA pro USA).
- ADSB.lol, web: https://www.adsb.lol/ („unfiltered flight tracker with a focus on open data“, data od komunity přes spoje BEAST a MLAT).
- ADSB.lol, API: https://api.adsb.lol/docs (OpenAPI https://api.adsb.lol/api/openapi.json). Dotaz „letadla kolem bodu“ vrací nejvýš 250 námořních mil (nm) od středu. Licence dat je ODbL.

## Ověřeno v kódu

- Zdroj poloh: ADSB.lol, `src/app/api/flights/route.ts` (`fetchAdsbLol`, dotaz `/v2/lat/{lat}/lon/{lon}/dist/{dist}`).
- Oblasti: 8 oblastí, každá s `dist: 250`, `src/lib/constants.ts` řádky 16 až 23.
- 250 nm × 1,852 km = 463 km, v textu „asi 460 km“.
- Polohy starší než 30 s se zahazují: `MAX_POSITION_AGE_SECONDS = 30`, `src/app/api/flights/route.ts`.
- Obnovování každých 10 s: `POLL_INTERVAL_MS = 10_000`, `src/lib/constants.ts`. Při skryté záložce se nenačítá (`useFlights.ts`, `document.hidden`).
- Při výpadku zdroje se zobrazí poslední známá data s upozorněním: `useFlights.ts` (stav `stale`), `src/app/o-projektu/page.tsx`.
- Zdroj se ukazuje v postranním panelu: `Sidebar.tsx`, „Zdroj: …“.
- Detail letadla: Baro výška (m), Rychlost (km/h vůči zemi), Kurz (stupně), Hladina (FL), Stoupání (ft/min, jen když letadlo vysílá), Autopilot (`nav_altitude_mcp`, jen když vysílá), `DetailPanel.tsx` řádky 438 až 480.
- Hladina se počítá z barometrické výšky: `altitude * 3,28084 / 100`.
- Rychlost: `gs` (ground speed) × 0,514444, `route.ts`.
- Kurz: `track`, jinak `true_heading`, `route.ts`.
- Trasa má tři stupně jistoty („ověřena vůči poloze“, „letový řád“, „orientačně“) a postup je odhad: `DetailPanel.tsx`, `src/app/o-projektu/page.tsx`.
- Fotografie letadla: Planespotters API, s kreditem autora: `useAircraftPhoto.ts`, `AircraftPhoto.tsx`.
- Hledání: volací znak, ICAO adresa, registrace, jen mezi letadly v zobrazené oblasti: `Sidebar.tsx` řádky 47 až 49, `radar/page.tsx` stav hledání.
- Filtry: pasažérské = úzkotrupá, širokotrupá a turbovrtulová; soukromé = byznys tryskáče a malá letadla; vojenská; vrtulníky. Rozdělení podle typu letadla a kategorie ADS-B, vojenská podle příznaku v databázi: `MapView.tsx` `matchesFilter`, `route.ts` `classifyAircraft`.
- „Co letí nade mnou?“: poloměr 30 km (`NEARBY_RADIUS_KM`), poloha se zpracuje v prohlížeči. Do analytiky jde jen název události, ne souřadnice: `useNearbyFlights.ts`, `radar/page.tsx` `handleLocateMe`.
- Sledování letadla: mapa se posouvá za letadlem, ruční posun sledování vypne: `DetailPanel.tsx`.
- Sdílení: tlačítko Sdílet vytvoří odkaz s `?flight=`: `DetailPanel.tsx` řádky 556 až 570.
- Klávesy: `/` hledání, `F` celá obrazovka, `Esc` zavře detail: `useKeyboardShortcuts.ts`, `radar/page.tsx`.
- Radar je zdarma, bez registrace; analytika a partnerské skripty až po souhlasu, radar funguje i po odmítnutí: `src/app/o-projektu/page.tsx`.

## Výpočet pro text

Dopravní letadlo letí kolem 900 km/h, tedy 250 m/s. Za 30 s ujede 7 500 m (7,5 km). Údaj o věku polohy 30 s a obnovení po 10 s znamená, že letadlo může být na skutečné poloze o jednotky kilometrů jinde, než ho mapa ukazuje.

## Co do textu nepatří

- Tvrzení, že radar ukazuje „všechna“ letadla.
- Zpoždění, brány a časy přistání jako jistota. O-projektu uvádí, že plánovaný nebo skutečný čas se ukáže jen při dostupných licencovaných datech.
- Evropské povinnosti ADS-B Out (data jsme nečetli u evropského primárního zdroje, FAA je uvádí jen jako cizí údaj).
- Zmínka o ATC poslechu (v kódu je za vypnutým příznakem).
- Pozice a návštěvnost z Search Console jako sliby.
