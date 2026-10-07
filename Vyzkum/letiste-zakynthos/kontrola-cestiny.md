# Kontrola češtiny: Letiště Zakynthos

Kontrola 7. 10. 2026 podle skillů `korektura-cz` a `humanizace` a `docs/redakcni-pravidla.md`. Kontroloval týž agent, který text psal. Opravy níže jsou už zapracované v `src/app/blog/letiste-zakynthos/page.tsx`, tabulka slouží jako záznam.

**Celkově:** Em-pomlčky v souboru nejsou (0 výskytů). Uvozovky české „…“. En-pomlčky jen u rozsahů (05:00–22:00, 1. 5.–24. 10.) a tras (Praha–Zakynthos). Vykání drží. Titulek 57 znaků, popisek 139 znaků. Text je věcný, bez reklamních slov, bez závěrečného shrnutí; končí konkrétním krokem (radar a návod ke sledování letu).

## Opravy

| Původní text | Problém | Oprava |
|---|---|---|
| „Z Česka sem … létaly jen Smartwings“ | nejednotná shoda se jménem dopravce | „létala jen společnost Smartwings“ (stejně v první H2) |
| „Brno a Ostrava už skončily“ | abstrakce jedná (vada 2: města neskončila, lety ano) | „Lety z Brna a Ostravy už skončily“ |
| „Z Brna a Ostravy dvakrát týdně, v úterý…“ | věta bez slovesa | „Z Brna a Ostravy se létalo dvakrát týdně…“ |
| „Dál najdete ceník parkování, autobus do města a provozní dobu na zimu.“ | ohlašování obsahu (humanizace 19) | nahrazeno faktem: „Od 25. října pak letiště přechází na výrazně kratší zimní provozní dobu.“ |
| „Prvních 20 minut je na obou zdarma, to se hodí, když…“ | dvě věty spojené čárkou | „…zdarma. Hodí se to, když jen vysazujete nebo vyzvedáváte.“ |
| „Parkoviště hlídají kamery se čtením SPZ a má nonstop interkom.“ | dva různé podměty v jedné větě | „Parkoviště mají kamery se čtením SPZ a nonstop interkom.“ |
| „Vnitrostátní lety … provozoval Sky Express, z Athén, do Athén a na Korfu.“ | kostrbatý výčet předložek | „Z vnitrostátních letů byly na tabuli … spoje Sky Express z Athén a do Athén a odlet na Korfu.“ |
| „Rozdíl je hlavně v tom, jestli se počítá vzdušnou čarou…“ | výklad bez zdroje, zaštiťování | „Provozovatel letiště vzdálenosti ani jízdní dobu nezveřejňuje. Po silnici je cesta vždy delší než vzdušnou čarou.“ |
| „Pravidla pro kufr najdete v článku…“ | „kufr“ nepřesně k tématu tekutin | „Rozměry kufru do kabiny podle dopravců shrnuje článek…“ |

## Čísla a vnitřní shoda (vada 7 a 8)

- Poslední lety Praha 9. 10. / 16. 10.: shodně v perexu, tabulce, odstavci a FAQ.
- Vzdálenosti 3,2 km a 3,6 km: tabulka, H2 a FAQ shodně; v perexu zaokrouhleno „asi 3 kilometry“ (dolů).
- Parkování týden 60 € a 40 €: tělo a FAQ shodně, v těle označeno jako výpočet.
- Zimní hodiny: tabulka a FAQ („začíná mezi 09:30 a 13:30, končí mezi 18:00 a 19:30“) sedí.
- „Přes milion v červenci a srpnu“: 1 046 728, zaokrouhleno dolů. Žádné dopočítané násobky ani procenta.
- Protiváha: rozpor KTEL „week days“ × „everyday“ je v textu přiznán, stejně jako chybějící cena jízdenky a ceník taxi.

## Co neměnit

- Suché tabulky (ceník, jízdní řád, provozní doba) jsou správně suché.
- Věta „Lety 6. října sedí i se skutečností“ je konkrétní, ověřený detail, který dává tabulce váhu.
- Přiznání „Jde o náš výpočet, konečnou částku spočítá parkovací systém.“ nechat.

**Zní text jako od člověka?** Spíš ano, je věcný a konkrétní. Nejstrojověji působí řada závorek se zdroji „(Zakynthos Airport, …)“ za odstavci; je to záměr kvůli citovatelnosti, stejně jako v článku o Tivatu.
