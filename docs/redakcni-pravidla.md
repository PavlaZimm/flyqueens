# Jak píšeme články na FlyQueens

Převzato a přizpůsobeno z Webx 18. září 2026 na žádost Pavly. Původní podklady jsou v `redakce/podklady-webx/`. Tato projektová verze sjednocuje jejich rozpory; starší šablony ani historická SEO tvrzení nepovažujeme za záruku výsledků.

## Před psaním

1. Ověřit téma v existujících článcích a vybrat jednu adresu bez roku. Zkontrolovat záměr hledání a konkurenci, neslibovat pozice.
2. Získat česká KW z Marketing Mineru včetně hledanosti a dostupné obtížnosti. Uložit surová data i rozhodnutí. Chybějící hodnota není nula. Nesčítat varianty slov jako unikátní publikum.
3. Pokud je dostupná Search Console, použít vlastní měření; nemíchat je s odhady MM. Nedostupnost přiznat.
4. Fakta dohledat u provozovatelů. Uložit zdroje, datum, rozpory a neověřené údaje do `Vyzkum/<tema>/`. Rešerše nikdy nenahrazuje osobní návštěvu.

**Povinná kontrola konkurence před každým článkem** (výslovný požadavek Pavly 18. 9. 2026): otevřít několik relevantních výsledků pro hlavní téma, zapsat URL, datum kontroly, pokrytá témata, mezery a případné rozpory do `Vyzkum/<tema>/serp.md`. Pouhé přečtení úryvků ve vyhledávači není úplná kontrola; nedostupné stránky označit. Konkurenční text nepřebírat a jeho tvrzení ověřovat u původních zdrojů. Pravdivost má přednost před délkou, pozicí konkurence i SEO.

## Hlas a obsah

- Přirozená čeština, vykání, konkrétní praktická pomoc. Střídat délku vět, přiznat nevýhody.
- Žádné vymyšlené zážitky, návštěvy, ceny, vzdálenosti či doporučení vydávané za osobní zkušenost.
- Vynechat „Objevte“, „v tomto článku se dozvíte“, prázdné superlativy, mechanické trojice a obecné závěrečné shrnutí.
- Bez em-pomlček. České uvozovky. Tučné písmo jen pro orientaci, nikoli pro SEO.
- Délka podle potřeby čtenáře, žádný povinný počet slov ani hustota KW. Přirozené skloňování je správně.
- Proměnlivé ceny porovnávat pro stejný termín a podmínky. U hotelů oddělit cenu pokoje, dopravy a parkování. „Od“ není garantovaná konečná cena.
- Rozpory zdrojů zaznamenat a podstatné vysvětlit čtenáři. Nepřebírat staré služby jen kvůli rozšířenosti údaje.

## Stránka

- **Každou fotografii před zveřejněním optimalizovat: rozměry i velikost souboru.** Výslovný požadavek Pavly, 18. 9. 2026. Originály zachovat mimo `public/`, pro web vytvořit samostatné kopie. Standardně nejdelší strana nejvýše 1600 px (přibližně 2× šířka článku), preferovat WebP, cílit přibližně na 100–200 kB. Menší náhledy mohou mít menší rozměry. Výjimku kvůli čitelnosti detailů vědomě posoudit a zaznamenat.
- Spustit `npm run images:optimize` (blog i spotting, podporuje JPEG/PNG/WebP) nebo předat konkrétní soubory. Kontrolovat skutečnou velikost a rozměry, ostrost důležitých detailů a mobilní ořez. `next/image` tuto přípravu zdrojového souboru nenahrazuje. Po změně rozměrů upravit registr, komponentu Image i sociální metadata.

- **Každý článek v přehledu blogu musí mít náhledovou fotografii**, stejně jako ostatní články. Platí i pro průvodce uložené pod `/letiste/`. Žádné samostatné textové karty bez fotky. Výslovný požadavek Pavly, 18. 9. 2026.
- Karty vykreslovat jednotnou šablonou z `BLOG_CARDS` v `src/lib/blog.ts`: fotografie nahoře ve formátu 16 : 6, pod ní rubrika, titulek, perex a autor s datem. U každého záznamu vyplnit obrazový soubor, ALT a skutečné rozměry.
- Před zveřejněním ověřit přímo `/blog` na mobilu i desktopu: obrázek se načítá, ořez zachovává hlavní motiv, celá karta odkazuje na správný článek. Fotografie musí věcně odpovídat tématu; u ubytování lze použít vlastní fotku letiště, která se neoznačuje jako fotografie hotelu.
- Ověřit i novinky na homepage a odkazy v patičce. Používají stejný registr `BLOG_CARDS`, řadí podle data a zahrnují články pod `/letiste/`. Homepage má u každé karty vlastní náhledovou fotografii; pro její užší sloupce používá formát 16 : 9. Adresu brát z `href`, neskládat automaticky `/blog/`.

- **Obsah článku s kotvami u každého článku a průvodce se 4 a více nadpisy H2.** Výslovný požadavek Pavly, 22. 9. 2026. Každé H2 dostane `id` bez diakritiky (např. `id="kolik-stoji-parkovani"`), pod úvod se před první H2 vloží komponenta `ArticleContents` z `src/components/UI/ArticleContents.tsx`. Položky přebírají text nadpisů beze změny. Po přidání nebo přejmenování H2 upravit i obsah. Ověřit na mobilu, že skok zastaví nadpis pod hlavičkou.

- Jedno H1, smysluplná H2/H3. Titulek přibližně 40–60 znaků, popisek 120–155; srozumitelnost má přednost před mechanickým limitem.
- Úvod odpoví, komu stránka pomůže. Fotografie až pod úvodem, pouze oprávněně použité, správný kredit a popisný ALT do 100 znaků. Chybějící fotografie hotelu nenahrazovat falešnou vizualizací.
- U srovnání přehledná tabulka, čitelná i na mobilu. Externí primární zdroje u tvrzení; interní odkazy mají pomoci s dalším krokem.
- Canonical, sociální metadata, Article (vydavatel `PUBLISHER_JSON_LD` s logem z `src/lib/author.ts`) a BreadcrumbList odpovídající viditelné drobečkové navigaci. FAQ lze psát jako běžný obsah, FAQPage podle redakčního rozhodnutí nepřidáváme.
- Přidat relevantní příchozí odkazy a sitemap. Datum měnit při věcné aktualizaci.

## Kontrola a předání

Oddělená kontrola faktů a českého stylu podle Webx postupu. Technicky ověřit build, metadata, odkazy a mobilní zobrazení. Výsledek připravit lokálně k revizi; zveřejnění schvaluje Pavla. Uvést zbývající nejistoty.

Stay22 je zapojen přes vlastní skript FlyQueens; viz `stay22-integrace-2026-09-18.md`. Partnerské odkazy viditelně označit a použít `rel="sponsored"`. Odkazy na primární zdroje neoznačovat jako placené. Při přidání rezervací ověřit cílové místo, mobilní zobrazení i cestu přes interní navigaci. Ceny a dostupnost pokojů nevymýšlet; návštěvník je ověřuje u poskytovatele.

## Původ pravidel

- `/Users/macbook/Desktop/Webx/PRAVIDLA-PSANI.md`
- `/Users/macbook/Desktop/Webx/POSTUP-CLANKU.md`
- `/Users/macbook/Desktop/Webx/.claude/skills/psani-clanku/SKILL.md` (novější opravy mají přednost)
- Doplňující postupy: `vyzkumna-stopa`, `korektura-cz`, `humanizace`, `citace-zdroje`, `on-page-seo`, `seo-clanek`, `featured-snippety`.

Model či nástroj předepsaný Webx lze nahradit dostupným ekvivalentem s přiznanými omezeními. Výsledky běžného webového hledání nejsou přesné lokalizované pořadí Googlu.
