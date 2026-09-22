# Závěrečná kontrola (lokální draft)

22. 9. 2026, `/blog/praha-santiago-de-compostela`.

## Ověřeno technicky
- `tsc --noEmit` a ESLint bez chyb.
- Článek se vykreslí (200), title, canonical a og:image odpovídají registru. Chyby v konzoli jen od skriptů Vercel Analytics v dev režimu (CSP, existovaly již dřív).
- `/blog` na mobilu (375 px) a desktopu: karta s fotografií, ořez `center 25 %` zachová věže katedrály, karta vede na správnou adresu.
- Homepage: článek je první ze tří nejnovějších, fotka načtená. Patička (na článkových stránkách): první ze tří.
- Sitemap: automaticky z `POSTS`.
- Příchozí odkaz: RelatedReading v článku STARLUX.

## Fotografie
- 2 snímky z Wikimedia Commons (CC BY-SA 4.0), originály v `Fotografie/Santiago de Compostela/`, WebP 1600 × 1067: 204 kB a 33 kB. Kredit v popiscích i v `docs/photo-credits.md`.

## Fakta
- Každé tvrzení v článku má zdroj v `zdroje.md`. Nejisté údaje (ceny, časy) jsou v textu výslovně označené. Rozpory v `neovereno.md`.
- Z textu vyřazeno kvůli neověřitelnosti: pravidla pro trekové hole v kabině (nahrazeno doporučením ověřit si je), počet sedadel 176/180 z tabulky, izraelský kapitál FLYYO a vládní vyjádření k embargu (bez přímého dopadu na cestující).

## Zbývá
- Hledanost z Marketing Mineru (22. 9. vyčerpaný limit, Ahrefs bez přístupu). Doplnit a případně upravit title.
- Samostatná kontrola faktů a češtiny druhou osobou/agentem podle Webx postupu zatím neproběhla.
- Ověřit cenu přímo v res.fly2galicia.com (formulář v automatizovaném prohlížeči nereagoval).
- Po 2. 12. 2026 aktualizovat článek podle skutečného provozu.

## Druhá kontrola češtiny, dat a humanizace (22. 9. 2026)
- Data: 2. 12. 2026 = středa, 1. 12. = úterý (ověřeno). Délka letu opravena: tam 3 h 10 min, zpět 3 h 15 min (dříve jen 3 h 10 min pro oba směry).
- Doplněno: Business Premium změna do 2 h předem; změna jména + rozdíl ceny; u ceny Honzových letenek chybí údaj, zda jde o zpáteční cenu; u Economy Go výběr sedadla za příplatek.
- Upřesněno: účetní závěrka chybí, protože firma vznikla letos (nikoli „nezveřejnila“).
- Odstraněno nedoložené obecné tvrzení o pronájmu letadel velkými dopravci v létě.
- Humanizace: úvod bez ohlašování obsahu, pryč „Pro vás z toho plyne hlavně tohle“, uhlazené neobratné věty, nesklonné názvy obcí (Arzúa, Palas de Rei). Bez em-pomlček.
