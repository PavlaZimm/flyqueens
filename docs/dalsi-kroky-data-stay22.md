# Další kroky FlyQueens

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
