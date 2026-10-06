# Měření dráhy: spouštěč a jak ověřit, že běží

Stav 6. 10. 2026.

## Proč to bylo potřeba

Historie dráhy se plní voláním `/api/runway-in-use?airport=LKPR`. Souhrn na stránce letiště Praha potřebuje 30 měření se stavem `ok` (`MIN_SAMPLES_FOR_SUMMARY`). GitHub Action z PR #28 měla volat endpoint každých 15 minut, ale podle seznamu běhů se 5.–6. 10. 2026 spustila jen třikrát za dvanáct hodin (19:26, 0:53, 7:01) a jeden běh GitHub po 15 minutách zrušil, protože mu nepřidělil žádný stroj. K 6. 10. bylo v databázi 7 měření za týden.

GitHub to v dokumentaci popisuje: plánovaná úloha může být při vysoké zátěži zpožděná a zahozená a doporučuje se spouštět v jiných minutách, než jsou celé čtvrthodiny. Garanci pravidelnosti GitHub nedává.

## Co je hotové

1. Plán úlohy je přesunutý na minuty `7, 22, 37, 52` (mimo špičku).
2. Endpoint se databáze ptá nejvýš jednou za 14 minut na instanci (`src/lib/samplingThrottle.ts`). Dřív kontrola „už se dnes měřilo?" probudila databázi při každém volání, takže častý hlídač nebo cizí volání s dalším parametrem v adrese by databázi udržely vzhůru a vyčerpaly bezplatný limit Neonu. Test: tisíc volání za hodinu pustí k databázi pět.

## Jak poznat, jestli to teď funguje

```bash
gh run list --workflow "Měření dráhy LKPR" --limit 30 --json createdAt,conclusion --jq '.[] | "\(.createdAt) \(.conclusion)"'
```

Za 24 hodin má být přes den (zhruba od 5:00 do 21:00 UTC) vidět běh aspoň co půl hodiny. Počet uložených měření a čas posledního:

```bash
curl -s "https://www.flyqueens.cz/api/runway-history?airport=LKPR"
```

Pole `samples` roste jen o měření se stavem `ok`. V noci, kdy v okolí letiště nejsou pohyby, má odhad stav `insufficient` a do souhrnu se nezapočítá, takže přírůstek je přes den a večer.

## Když to pořád nestačí: spouštěč mimo GitHub

Nejspolehlivější je externí hlídač, který zavolá adresu pravidelně. Funguje s libovolnou službou, která umí HTTP GET v pravidelném intervalu (například cron-job.org nebo UptimeRobot). Nastavení:

- adresa: `https://www.flyqueens.cz/api/runway-in-use?airport=LKPR`
- metoda: GET, očekávaná odpověď: 200
- interval: 15 minut (kratší interval nevadí, ochrana v endpointu databázi nezatíží, ale nic to nezlepší)

Registraci ve službě musí udělat vlastník účtu, Claude účty nezakládá. U UptimeRobotu navíc dostane upozornění e-mailem, kdyby web nebo endpoint přestal odpovídat. GitHub úlohu je rozumné nechat jako záložní spouštěč.

## Odhad zátěže databáze

Neon bezplatně dává 100 hodin výpočetního času za měsíc. Každé měření probudí databázi minimálně na dobu, kdy automaticky neusne (výchozí 5 minut). Při měření každých 15 minut je to zhruba třetina času, tedy odhadem 60 až 70 hodin za měsíc u samotného měření. Je to odhad z architektury, ne naměřená hodnota; skutečnou spotřebu ukáže stránka Usage v Neonu po týdnu provozu. Kdyby se blížila limitu, stačí prodloužit rozestup na 30 minut (`createThrottle(29 * 60_000)` a `MIN_GAP_MINUTES = 30`).
