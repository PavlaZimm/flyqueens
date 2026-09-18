# Konkurence a výsledky vyhledávání: Boeing 747 Praha / Fly Meta

Kontrola 18. 9. 2026 při finální přípravě článku. Jde o orientační webovou rešerši a čtení konkrétních stránek, **nikoli o měření pořadí české TOP 3 Googlu**. Žádné pozice ani objemy návštěvnosti konkurence nebyly změřeny. Dotazy: `9H-FLM PlanePictures`, `9H-FLM Prague Fly Meta`, `9H-FLM JetPhotos` a přesný doménový dotaz `"9H-FLM" site:planepictures.net`.

| Skutečně zkontrolovaná stránka | Dostupný obsah a účel | Co z toho plyne pro FlyQueens |
|---|---|---|
| [JetPhotos, fotografie Marca Dietricha](https://www.jetphotos.com/photo/12072223) | Přímé otevření úspěšné. Jeden snímek z Hannoveru 11. 4. 2026, identifikace 9H-FLM / Boeing 747-409F(SCD), FlyMeta (Air Atlanta Europe), MSN 33731, fotograf a EXIF. Stránka slouží jako fotografický záznam. | Doplnit české vysvětlení, co laik na konkrétním stroji pozná, a místní souvislost Prahy. Nekopírovat cizí snímek ani jeho EXIF. |
| [JetPhotos, karta stroje MSN 33731](https://www.jetphotos.com/info/747-33731) | Přímé otevření úspěšné. Karta letadla a historie registrací, typ, dodání, vazba na fotografie a FlightRadar24. | Naše identifikace má stát na úředním registru; podrobnou životní historii, věk a dřívější registraci nepřidávat jen pro prodloužení textu. |
| [Flightradar24, 9H-FLM](https://www.flightradar24.com/data/aircraft/9h-flm) | Přímé otevření úspěšné. Typ a operator oddělený od airline, letová historie, časové údaje a omezení dostupné historie. | Vlastní článek vysvětlí význam registrace a odkáže na živý radar FlyQueens, neslibuje vlastní archiv letů ani pevný termín příští návštěvy. |
| [PlanePictures, 9H-FLM v Praze 4. 9. 2026](https://www.planepictures.net/v3/show_en.php?id=1802959) | Zkontrolován dostupný indexovaný obsah ve výsledku vyhledávání: fotografie Mathiase duebera, PRG/LKPR, datum 4. 9. 2026, Fly Meta (Air Atlanta Europe), 747-409(F/SCD), upozornění na autorská práva. Přímé otevření skončilo chybou Cache miss. Neoznačovat za kompletně prohlédnutou živou stránku. | Ostatní fotografové stroj v Praze zachytili, ale jde o jinou návštěvu než vlastní série 16. 9. 2026. Nepřebírat datum jejich fotografie ani ji považovat za doklad letu na našem snímku. |

## Obsahové rozhodnutí

Viditelná relevantní konkurence odpovídá zejména registracím, fotografiím a sledování konkrétního letadla. Vlastní příspěvek má smysl jako krátká česká fotoreportáž: vlastní přistání ze dvou fází, vlastní Kněževes, ověření 9H-FLM v Transport Malta a vysvětlení značky Fly Meta vůči provozovateli Air Atlanta Europe. Přidaná hodnota je propojení konkrétního snímku s návštěvou vyhlídky a použitím radaru, nikoli další obecná encyklopedie Boeingu 747.

Konkurence není primárním dokladem provozovatele ani výrobního čísla. Tato fakta ověřena v úředním registru uvedeném v `zdroje.md`. Žádné cizí fotografie nebyly převzaty.

## Neúspěšná otevření

- Planespotters: https://www.planespotters.net/airframe/boeing-747-400-9h-flm-fly-meta/rm04me — interní chyba nástroje, obsah se nepovažuje za kompletně zkontrolovaný.
- JetPhotos starší snímek https://www.jetphotos.com/photo/11632750 — interní chyba; nahrazen úspěšně otevřenou fotografií 12072223 výše.

## Faktická kontrola implementovaného textu

Kontrolován `src/app/blog/boeing-747-praha-fly-meta/page.tsx` dne 18. 9. 2026. Registrace, 747-400F, MSN33731, Air Atlanta Europe a datování výpisu odpovídají primárnímu registru. Datum fotografie a rozdíl pěti sekund odpovídají místnímu EXIF záznamu hlavního agenta. Funkce registrace v radarovém detailu ověřena v `src/components/DetailPanel/DetailPanel.tsx`; formulace správně podmiňuje její dostupnost.

Doporučená drobná změna: firemní odstavec opřít o aktuálnější oznámení HAECO z 26. 5. 2026 a vypustit odbočku k dodání 777. Současný text AerCap fakticky není chybný a nezaměňuje operátora, ale HAECO přímo dokládá současnou činnost Fly Meta a typy747/777, takže je tematicky přesnější. Přímé načtení FlyMeta nyní selhalo, proto není vhodné tvrdit novou kontrolu obsahu jeho homepage jen na základě dřívější rešerše.
