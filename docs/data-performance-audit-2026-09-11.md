# FlyQueens — audit dat, přesnosti a rychlosti

Stav k 11. září 2026. Dokument odděluje to, co web skutečně používá, od
funkcí, které by vyžadovaly placený zdroj nebo databázi.

## Co web používá nyní

| Oblast | Zdroj | Co z něj zobrazujeme | Omezení |
|---|---|---|---|
| Živé polohy | [ADSB.lol](https://www.adsb.lol/docs/open-data/api/) | poloha, kurz, rychlost, barometrická výška, registrace a dostupné údaje letadla | Bodový dotaz má nejvýše 250 NM; nejde o kompletní Evropu v jediném bezplatném dotazu. Některá letadla ADS-B nevysílají nebo je přijímače nevidí. |
| Trasa | [ADSBDB](https://github.com/mrjackwills/adsbdb) | dostupný odlet, přílet a dopravce podle callsignu | Callsign může být znovu použitý nebo historický. Web proto výsledek kontroluje proti aktuální poloze a směru a při nesouladu trasu nezobrazí. |
| Letištní počasí | [Aviation Weather Center](https://www.connect.aviationweather.gov/data/api/) | METAR, vítr, QNH, dohlednost, teplota a čas pozorování | Jde o letištní pozorování, ne předpověď; nemusí být dostupné pro každé letiště. |
| Mapa | [OpenStreetMap](https://operations.osmfoundation.org/policies/tiles/) | geografický podklad a názvy míst | Veřejný tile server je best-effort, bez SLA. Pro větší komerční provoz je vhodný placený tile provider nebo vlastní infrastruktura. |
| Fotografie | Planespotters API | dostupná reálná fotografie konkrétní registrace a kredit autora | Fotografie není pro každý stroj a musí zůstat atribuce. |

Veřejná data se nikdy nemají doplňovat smyšlenou hodnotou. Pokud zdroj
registraci, typ, trasu nebo letiště neposkytne, rozhraní má zobrazit prázdnou
hodnotu nebo vysvětlení.

## Co se nyní zpřesnilo

- Pozice z ADS-B používá skutečné `seen_pos` a `seen`; server už každému bodu
  nepřiřazuje čas právě proběhlého dotazu.
- Body starší než 30 sekund se do živého snapshotu nepustí.
- Barometrická výška může bezpečně spadnout na geometrickou výšku, pokud ji
  zdroj poskytuje; stav „na zemi“ se už nehádá z nízké barometrické výšky.
- Bezplatná trasa se porovnává s polohou, kurzem a rychlostí. Zjevně chybná
  rotace se raději nezobrazí.
- U více výsledků placeného letového řádu se vybírá kandidát odpovídající
  aktuální poloze, ne automaticky první položka.
- METAR nese čas skutečného pozorování a zdroj; QNH se interpretuje v hPa.

## Co se nyní zrychlilo

- Homepage sdílí jeden souhrnný požadavek mezi počítadlem a radarovým grafem.
- Polling se zastaví ve skryté kartě a offline; starý požadavek se při změně
  oblasti zruší.
- Mapa nevyrábí SVG ikony, tooltipy a historii pro letadla mimo výřez.
- Historii pozic ukládá jen pro vybraný stroj a kreslí jen jeho stopu.
- Seznam v postranním panelu zůstává omezený na 60 karet, hledání však pracuje
  nad celým aktuálním snapshotem.
- Krátká serverová cache a sloučení souběžných požadavků brání tomu, aby více
  návštěvníků ve stejnou chvíli zbytečně násobilo dotazy na zdroj.

Lokální kontrolní snapshot obsahoval 404 čerstvých poloh a `/api/flights`
odpověděl za 0,43 s. Opakovaný souhrnný dotaz z cache odpověděl za 0,02 s.
Jde o jednotlivé vývojové měření, nikoli garantovanou produkční latenci.

## Co lze přidat bez databáze

1. Připojit `AERODATABOX_API_KEY` a `AERODATABOX_BASE_URL` pro skutečné časy,
   zpoždění, terminály, brány, pás zavazadel a přesnější rotaci letu. Integrace
   v aplikaci už existuje; před nákupem je potřeba ověřit, že zvolený tarif
   povoluje veřejné a komerční zobrazení.
2. Přesunout mapové dlaždice k poskytovateli se SLA před větší reklamní nebo
   sociální kampaní. Veřejné OSM dlaždice nejsou komerční CDN.
3. Doplnit samostatný endpoint pro přílety a odlety až po výběru licencovaného
   schedule providera. Z ADS-B polohy samotné nelze spolehlivě odvodit bránu,
   zpoždění ani kompletní tabuli letiště.
4. Doplnit monitoring odezvy, chybovosti a stáří dat. Aplikace už vrací
   `source`, `status` a `fetchedAt`, takže monitoring nepotřebuje změnu datového
   modelu.

## Kdy bude potřeba databáze

Databáze není potřeba pro živou mapu, METAR, fotografie, statické články ani
SEO landing pages. Bude potřeba pro oblíbené lety, účty, upozornění, historii,
vlastní dlouhodobé statistiky, personalizaci nebo redakční systém pro více
autorů. Pro tyto funkce dává Supabase smysl; kvůli samotným externím API ne.

## Doporučené pořadí další investice

1. Získat první organickou návštěvnost a měřit vyhledávání, detail letu a
   prokliky na parkování.
2. Ověřit konverze parkovacího affiliate; nezatěžovat radar plošnou reklamou.
3. Pokud lidé skutečně otevírají detaily letů, zaplatit nejdřív přesná
   schedule data.
4. Před větším provozem přesunout mapové dlaždice na službu se SLA.
5. Teprve pro oblíbené lety a upozornění připojit Supabase.

ATC audio zůstává odkazem na původní službu, dokud nebude písemně vyjasněno
právo stream dále přenášet. Technicky zapnutý proxy stream bez oprávnění není
vhodná produktová funkce.
