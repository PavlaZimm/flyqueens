# Zapojení AeroDataBox, 18. září 2026

Pavla předplatila Pro na API.Market a výslovně zadala použít přihlášený účet pro napojení FlyQueens. Chrome potvrdil SUBSCRIBED, cenu 7,50 USD, 5 000 jednotek a HARD limit. Obnova 18. října 2026. Klíč ani jeho hodnotu do dokumentace a repozitáře neukládat.

## Ověřeno na skutečné službě

- Test v API Playground: PRG, obě směrové tabule, 12hodinové okno, HTTP 200, 85 odletů a 98 příletů.
- Existující serverová konfigurace Vercelu již míří na správný API.Market gateway. Není třeba pořizovat nové předplatné ani měnit klíč.
- Dotaz přes produkční `/api/airport-flights?airport=PRG`: `ready`, zdroj AeroDataBox, 83 odletů a 98 příletů. Rozdíl počtu odpovídá různým okamžikům dotazů a normalizaci.
- Po těchto dvou dotazech ukázal účet spotřebu 4 jednotky, zbývalo 4 996. To odpovídá 2 jednotkám za vyzkoušený FIDS dotaz Tier 2.

## Implementace

- Sdílená serverová Data Cache pro placené odpovědi. Čas `fetchedAt` vzniká při skutečném stažení a ukládá se společně s odpovědí. Opětovné načtení webu jej neposouvá.
- Praha: obnova po 60 minutách, ostatní čtyři česká letiště po 6 hodinách. Načítání pouze na poptávku, bez cronu. UI sděluje interval i čas načtení.
- Radar nejprve zkusí odpovídající let ze sdílené pražské tabule. Další dotaz na konkrétní ICAO24 má cache 30 minut. Změna polohy nebo jiný návštěvník nevytváří jiný klíč placeného dotazu.
- Kontrola časového okna a dostupného callsignu omezuje záměnu dnešní rotace s minulým či budoucím letem téhož letadla. Nadále platí kontrola trasy vůči poloze.
- Detail radaru zobrazí dostupný letový řád, zpoždění, typ, registraci a čas načtení. Dostupnost všech polí není zaručena. Polohy letadel zůstávají z dosavadního ADS-B zdroje.
- Články A380, STARLUX, Fly Meta a planespotting používají samostatný dynamický box. Všechny čerpají tutéž pražskou tabuli; nepřepisují redakční text. Filtr podle čísla letu či registrace, výslovně uvedené okno a stav bez nalezeného letu.
- Při vyčerpání kvóty nebo selhání API tabule odkáže na letiště a radar použije dosavadní bezplatný zdroj. Příliš stará cache se nevydává za aktuální data.

## Rozpočet a omezení

Orientační výpočet pro 31 dní a nepřetržitou poptávku: Praha 744 dotazů, ostatní letiště dohromady 496 dotazů. Při ověřených 2 jednotkách za FIDS je to asi 2 480 jednotek. Zbytek slouží detailům letů a rezervě. Skutečná spotřeba závisí na návštěvnosti, chybějící cache, nasazeních a dalších testech. Tento výpočet není zárukou dostupnosti po celý měsíc.

HARD limit předplatného brání placenému přečerpání, ale po dosažení kvóty data přestanou chodit. Nevytváříme tvrzení o distribuovaném denním limitu: žádný takový čítač zatím není nasazen. Fronta a slučování souběžných dotazů jsou v rámci serverové instance; při více instancích může nastat omezení rychlosti poskytovatelem. Vyšší návštěvnost vyhodnotit podle účtu, případně přidat sdílený rozpočtový čítač nebo upravit tarif až po rozhodnutí Pavly.

## Kontroly

`node scripts/test-aerodatabox.mjs` ověřuje chybné vstupy bez placeného dotazu, sdílení tabule s radarem, zachování času cache, souběžné čtenáře, odmítnutí staré rotace a jiného callsignu, náhradní zdroj a normalizaci tabule. Testy nepoužívají síť ani klíče.

Před nasazením spustit `npm run check`; po nasazení ověřit produkční tabuli, widget článku a detail konkrétního letu. Stay22 stále čeká na dodání skriptu.

### Výsledek ověřování

- Lint, TypeScript a produkční build prošly. Mobilní box bez dat ověřen při 390 px bez horizontálního přesahu, desktop vizuálně zkontrolován.
- První nasazení `ecdfdfa`: skutečná produkční tabule vrátila 83 odletů, 95 příletů a interval 60 minut. Widget planespottingu se naplnil skutečnými lety.
- Radarový endpoint pro KL 1359 / KLM75R vrátil letový řád, Embraer 175, registraci PH-EXN, časy, terminál a zavazadlový pás. Jeho `fetchedAt` byl totožný s tabulí, tedy nepředstíral novější data.
- Živý test odhalil chybějící explicitní letiště Praha na vlastní straně FIDS záznamu. Doplněno z kontextu dotazu a souřadnice z lokálního letištního katalogu. Přidán regresní test pro tento skutečný tvar odpovědi. Generický box spottingu přednostně zobrazuje nepřistálé a nezrušené přílety.

- Produkční oprava `3568dcd`: trasa KL 1359 má souřadnice obou letišť AMS–PRG a kontrolu `position-checked`. Chybějící souřadnice se doplňují z bezplatných metadat pouze při shodě kódu letiště; placená trasa se nemění. Regresní test ověřuje i neshodný cíl bezplatné odpovědi.
- V prohlížeči ověřen skutečný BA 856 / BAW856Z: mapa LHR–PRG, Airbus A320, G-TTOE, časy, terminály, zpoždění a zdroj AeroDataBox s časem načtení. Mobilní přechod z vyhledávání homepage otevřel tento konkrétní detail.
