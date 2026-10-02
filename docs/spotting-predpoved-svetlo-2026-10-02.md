# Světlo, předpověď, místa a historie spottingu

- Slunce, začátek zlaté hodinky a azimut se počítají lokálně knihovnou SunCalc 2.1.0. SSR i klient vycházejí ze stejného času. Změna dne používá Europe/Prague. Nejsou závislé na denní kvótě AeroDataBoxu; kompatibilní endpoint `aero-insights?kind=sun` vrací místní výpočet.
- Předpověď TAF je z již existující proxy AviationWeather.gov, sdílená na stránce pro plánovač, večerní okno i jednotlivé přílety. Volit lze příští hodinu, dnešní západ nebo dostupný let. Nepoužitelná, stará či nepokrývající předpověď se přizná. TEMPO/PROB zůstávají možnosti, BECMG uvádí probíhající změnu a předchozí/následující podmínky.
- Oficiální mapa letiště se načte až po kliknutí, včetně upozornění na připojení ke Googlu. Doplněny dva ověřené valy a stávající vlastní optimalizovaná fotografie Kněževsi. Kompas ukazuje směr západu, vedle je čerstvý dostupný odhad dráhy; web automaticky neslibuje nejlepší stanoviště.
- Historie čte stávající runway_observations, bez dalších leteckých dotazů. Jeden záznam na 15minutový interval; stáří nejvýše 7 dnů. Směry se sumarizují po 30 použitelných odhadech ve 3 dnech. Hodinu lze srovnat od 8 snímků ve 3 dnech, maximum až mezi alespoň dvěma takovými hodinami. Aktivita znamená průměr nízko letících letadel na snímek, nikoli počet unikátních letů za hodinu. Sběr závisí na návštěvnosti.

Nevzniká nové předplatné. Open-Meteo se nezapojuje, hodinový komerční tarif se nekupuje. Menší letiště zůstávají odložená podle plánu. Zdrojová rešerše: Vyzkum/spotting-predpoved-svetlo/zdroje.md.
