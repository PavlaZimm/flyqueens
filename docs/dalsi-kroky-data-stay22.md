# Další kroky FlyQueens

## Aktuální priority a nápady — 2. října 2026

### Nejdřív stabilizovat Prahu

1. Prověřit spotřebu AeroDataBoxu a sdílení mezipaměti mezi stránkami, API a preview. Dne 2. 10. se vyčerpal interní denní limit; logy potvrzují i spotřebu preview. Audit a oprava jsou v `aerodatabox-cache-audit-2026-10-02.md`. Nezvyšovat limit ani tarif automaticky.
2. Zpřístupnit měření konkrétní property FlyQueens v Search Console a ověřit indexaci a dotazy stránky `/letiste/praha/dnes`. SEO úpravy jsou nasazené; dostupnost měření dosud blokuje přístup. Podrobnosti: `seo-dohledatelnost-2026-10-02.md`.

### Na později: spottingový plánovač pro další česká letiště

**Stav: odloženo na přání Pavly, nyní neimplementovat.** Navázat na pražský přehled až po ověření spotřeby API a dostupnosti dat. Rozšíření nemá automaticky znamenat nový tarif.

- Kandidáti: Brno, Ostrava, Pardubice, Karlovy Vary a České Budějovice. Jde o první skupinu, nikoli seznam všech českých letišť.
- Zamýšlené funkce: dostupné přílety, typy letadel a fotografie podle registrace, zajímavé stroje, počasí, západ slunce a večerní přílety. Každou funkci zobrazit podle skutečného pokrytí; odhad dráhy přidávat jen po ověření pro konkrétní letiště.
- Nejdřív porovnat hledanost a obtížnost v Marketing Mineru, ověřit pokrytí API a vybrat jeden pilot (kandidát Brno nebo Ostrava). Pořadí zatím není podložené daty.
- Použít společnou šablonu, ale doplnit vlastní místní hodnotu: ověřené vyhlídky, přístup a zdroje. Před průvodcem projít konkurenci a primární zdroje podle redakčních pravidel; nevyrábět jen kopie Prahy s jiným názvem.
- Spuštění podmínit rozpočtem API pro všechna zapojená letiště, sdílenou cache, zobrazením stáří dat, poctivým stavem bez dat a kontrolou mobilu. Malý provoz ani prázdná odpověď API nejsou důkazem, že nic nepřiletí.
- Menší letiště a aerokluby případně řešit samostatnými průvodci a dostupným radarem; pravidelnou příletovou tabuli neslibovat.

Níže zůstává historický plán ze září; jeho tehdejší stav a intervaly nelze považovat za aktuální technický audit.

**Aktualizace 18. 9. večer:** Pro již předplaceno a živé dotazy úspěšně ověřeny. Aktuální implementaci, intervaly a omezení popisuje `aerodatabox-aktivace-2026-09-18.md`. Níže uvedený plán AeroDataBox je původní návrh před zaplacením. Stay22 skript získán z přihlášeného Hubu; stav implementace a ověření v `stay22-integrace-2026-09-18.md`.

Stav k 18. září 2026. Dnešní články, fotografie a sekce novinek dokončujeme před zapojením placených dat.

## Stay22

- Doména `flyqueens.cz` přidána do existujícího účtu Pavly, AID `trip`.
- Vlastní skript `6aad790b12895152a4028ac0`, načítání přes souhlas s doplňkovými službami.
- Článek `/letiste/praha/ubytovani` obsahuje označený partnerský odkaz na ubytování u PRG, kampaň `flyqueensprg`.
- Podrobný stav a omezení: `stay22-integrace-2026-09-18.md`.

## AeroDataBox: pilot po návratu Pavly

Oficiální [ceník](https://aerodatabox.com/pricing/) uvádí API.Market Pro za **7,50 USD měsíčně před daní**, 5 000 API jednotek a limit 1 požadavek za sekundu. Jednotky nejsou počet požadavků. Nabízí i sedmidenní zkoušku se 400 jednotkami. Textový výstup marketplace neukázal tarify, proto finální podmínky ověříme v objednávce před zaplacením.

Z [oficiální specifikace API.Market](https://doc.aerodatabox.com/docs/openapi-apimarket-v1.json) pro náš web vyplývá:

| Data | Přínos pro FlyQueens |
|---|---|
| Přílety a odlety letiště | Tabule spojů, aerolinka, destinace a časy |
| Stav konkrétního letu | Plán, aktualizované časy a stav; terminál, gate, odbavovací přepážka či pás, pokud jsou ve zdroji |
| Letadlo podle registrace nebo Mode-S | Doplnění identifikace konkrétního stroje |
| Historie a letové plány | Možný pozdější rozvoj; rozsah ověřit pro daný tarif a letiště |

Letištní tabule i stav letu patří do Tier 2. Údaje mohou chybět nebo obsahovat jen plán bez živých aktualizací. AeroDataBox využijeme k obohacení detailů a letišť; stávající zdroj poloh pro pohyb mapy ponecháme.

### Postup pilotu

1. Ověřit pokrytí PRG, následně vzorek skutečných letů a dostupnost polí. Nákup ani aktivaci jsme dnes neprovedli.
2. Před aktivací upravit rozpočet volání. Současná implementace má serverovou obnovu PRG po 5 minutách a ostatních letišť po 10 minutách; není nastavena jako rozpočet pro nejmenší tarif. Při nepřetržité poptávce by už samotná Praha znamenala přibližně 8 640 volání za 30 dní, před započtením ceny Tier 2.
3. Začít jedním letištěm, sdílet výsledek pro návštěvníky, zobrazovat čas aktualizace a zavést denní limit spotřeby. Frekvenci určit podle skutečné jednotkové ceny API.Market a návštěvnosti. Po vyčerpání rozpočtu přiznat neaktuální/nedostupná data.
4. Klíč uložit pouze na server a po ověření zapnout. Připojení pro API.Market již v kódu existuje, ale to samo nezaručuje ověřenou placenou integraci.

## Databáze

Pro články ani opravu novinek ji nyní nepotřebujeme: homepage, blog i patička čerpají ze společného registru `BLOG_CARDS`. Databázi nebo redakční systém zvažovat až pro editaci bez nasazení webu, účty, uložené lety či jiné trvalé uživatelské údaje. Při pilotu API nejprve vyřešit sdílenou cache a rozpočet; archivaci poskytovaných dat navrhovat až podle retenčních podmínek tarifu.
