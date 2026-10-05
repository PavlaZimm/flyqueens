# Vlastní fotografie – Hangar-7 Salzburg

Stav k 5. 10. 2026: **v repozitáři žádná fotka z Hangaru-7 není.** Autorka má
podle zadání vlastní snímky z návštěvy, archiv ale do repa zatím nedorazil.

## Co článek potřebuje

| Priorita | Záběr | Cílový soubor | Kde se použije |
|---|---|---|---|
| **nutné** | Prosklená hala zvenčí, ideálně s letištěm v pozadí | `hangar-7-salzburg.webp` 1600 px delší hrana | hero + og:image |
| vhodné | Douglas DC-6B v hale (největší exponát) | `hangar-7-salzburg-dc6b.webp` | sekce „Co uvnitř uvidíte“ |
| vhodné | Pohled z lávky nebo z baru dolů na exponáty | `hangar-7-salzburg-z-lavky.webp` | sekce o gastronomii |
| volitelné | Terminál letiště Salzburg od Hangaru-7 (ukazuje tu blízkost) | `hangar-7-salzburg-letiste.webp` | sekce o letišti |

## Postup po dodání

1. Soubory do `public/blog/` pod názvy výše (konvence: `.webp`, delší hrana
   1600 px — stejně jako Tivat a Lipsko).
2. `npm run images:optimize`.
3. Skutečné rozměry hero fotky zapsat do `src/lib/blog.ts`
   (`imageWidth`, `imageHeight`) — teď je tam naslepo 1600 × 900.
4. Řádek do `docs/photo-credits.md`: autor Pavla Zimmermannová / FlyQueens,
   licence „vlastní fotografie“, datum a místo pořízení.
5. Smazat záznam ze sekce „Čeká na doplnění“ v `docs/photo-credits.md`.

## Pozor na popisek

Hero obrázek má v článku popisek „Prosklená hala Hangaru-7 stojí přímo
u odbavovací plochy letiště Salzburg.“ Pokud dodaná fotka ukazuje něco jiného
(například interiér nebo konkrétní stroj), popisek je potřeba přepsat —
jinak text tvrdí něco, co na obrázku není.

## Co nefotit

Bezpečnostní prvky, personál a cizí lidi v detailu. U exponátů v hale to není
problém, ale platí to pro případné snímky z plochy letiště.
