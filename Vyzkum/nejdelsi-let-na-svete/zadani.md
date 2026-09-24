# Zadání: nejdelší let na světě (sjednoceno)

Zdroj: `~/Desktop/FlyQueens_SEO_zadani_nejdelsi_let_na_svete(1).pdf` (zadání pro copywritera), sjednoceno s `docs/redakcni-pravidla.md` 24. 9. 2026. Při rozporu platí projektová pravidla.

## Zaměření

Jen aktuálně provozované civilní pravidelné komerční osobní nonstop lety. Ne vojenské, charterové, repatriační, jednorázové rekordní, ferry ani historické lety bez pravidelného provozu. Současné a budoucí rekordy striktně oddělit.

## SEO

- Adresa: `/blog/nejdelsi-let-na-svete` (bez roku).
- H1: „Nejdelší let na světě: odkud kam vede a kolik hodin trvá?“ (z PDF).
- Title: „Nejdelší let na světě: trasa, délka letu a rekordy“ (50 znaků).
- Meta 120–155 znaků: aktuální rekord, trasa, doba, vzdálenost, letadlo, další nejdelší linky. Konkrétní čísla až po ověření.
- Data MM: `mm-data.md`.

## Struktura (PDF) + úpravy podle pravidel

1. Perex (`lead`): přímá odpověď v prvních 60–100 slovech (featured snippet) + jedna věta, co článek dál nabízí.
2. Obsah s kotvami (`ArticleContents`), každé H2 s `id` bez diakritiky.
3. H2 Který let je nejdelší na světě? (definice: vzdálenost vs. čas, ortodroma vs. nalétaná vzdálenost, block time vs. čas ve vzduchu)
4. H2 Trasa nejdelšího letu (letiště, IATA, města, aerolinka, čísla letů, vzdálenost)
5. H2 Jak dlouho trvá (oba směry, vliv větru, počasí, tratě)
6. H2 Jakým letadlem se létá (přesný typ, varianta, konfigurace)
7. H2 Kolik stojí letenka: jen ověřená cena s datem, třídou a měnou pro konkrétní termín u aerolinky. Jinak vysvětlit, jak si cenu ověřit, bez vymyšleného čísla.
8. H2 Jak vypadá tak dlouhý let: jen to, co uvádí aerolinka, a obecné ověřené rady k jet lagu. Žádné vymyšlené zážitky.
9. H2 Další nejdelší lety světa: tabulka 5–10 aktuálních linek (trasa, aerolinka, vzdálenost, plánovaný čas, letadlo), čitelná na mobilu.
10. H2 Budoucí rekordy: plánované linky jasně oddělené.
11. H2 Nejdelší přímý let z Prahy.
12. H2 Časté otázky jako běžný text (`styles.faq`), BEZ schema FAQPage: rekord, počet hodin, km, letadlo, nejdelší let bez mezipřistání, nejdelší let z Prahy.

## Styl

Pravidla FlyQueens + z PDF: zkratky (IATA, ULR, block time) vysvětlit při prvním použití. Délka podle potřeby čtenáře (PDF uvádí orientačně 1 500–2 200 slov, není to povinné). Bez em-pomlček, české uvozovky, vykání, žádné AI úvody ani keyword stuffing.

## Fakta

Priorita: aerolinka a její letový řád, letiště, výrobce letadla; databáze a média jen podpůrně. Každý proměnlivý údaj ověřit a zapsat datum (`zdroje.md`, `promenlive-udaje.md`). Rozpory zapsat a podstatné vysvětlit čtenáři.

## Výstup

Draft (`draft.md`), stránka `src/app/blog/nejdelsi-let-na-svete/page.tsx` na sdílené šabloně (`ArticleHeader`, `Article.module.css`), záznam v `POSTS` (tím i `BLOG_CARDS`, homepage, patička), sitemap, fotka optimalizovaná přes `npm run images:optimize`, zdroje v `SourcesBox`, návrhy interních odkazů (`prolinkovani.md`). Oddělená kontrola faktů a češtiny. Náhled na mobilu a desktopu. Zveřejnění schvaluje Pavla.
