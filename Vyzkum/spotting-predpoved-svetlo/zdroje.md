# Podklady k plánovači — 2. 10. 2026

Nejde o nový článek, ale rozšíření funkce /letiste/praha/dnes.

- Otevřeno https://www.prg.aero/spoty-pro-sledovani-priletuodletu. Primární zdroj přístupu k valům: Kněževes od ulice Na staré silnici po štěrku, parkování přibližně 100 m; Hostivice pouze pěšky/kolo, popsaná cesta asi 4 km od Cihlářské. Dočasná omezení nejsou tímto ověřena. Terminálové terasy nepřidáváme: stránka rozporně zaměňuje airside a veřejnou část.
- Oficiální vložená mapa z téže stránky: https://www.google.com/maps/d/embed?mid=14bIEdgTAgrMNJRTFWzBZ8Qw_2ZV5jRXu . Žádné odhadnuté GPS body; mapu načítá návštěvník kliknutím. Fotografie pouze stávající optimalizovaná vlastní Kněževes, nepřipisovat Hostivici.
- https://aviationweather.gov/data/api/ — oficiální API a omezení. Existující serverová TAF proxy (cache 10 min) se sdílí s radarem. Čtena i skutečná normalizovaná odpověď pro LKPR. `timeBec` odděluje přechod BECMG od následných podmínek. TEMPO/PROB se zobrazují zvlášť, netváří se jako jistá předpověď. Dohlednost zdroje je ve statutárních mílích, převod 1,609344 km/míli. Předpověď neslibuje slunečno ani vhodnost letu.
- https://github.com/mourner/suncalc — primární dokumentace, navíc nainstalované typy a README verze 2.1.0: úhly již ve stupních, azimut od severu po směru hodinových ručiček. Neaplikovat starý převod radiánů starších verzí. Výpočet pro souřadnice letiště 50.1009, 14.2599, rovný horizont; překážky, skutečné světlo ani terén neřeší.

Při rešerši mělo /api/runway-history?airport=LKPR jen 3 použitelné odhady. Nevyvozovat z toho doporučenou hodinu ani obvyklou dráhu. Nový souhrn používá existující pozorování včetně nedostatečného provozu, deduplikuje 15minutové intervaly a vysvětluje výběrové zkreslení návštěvností.
