# Fotografie FlyQueens: inventura a návrh využití

Datum: 18. září 2026. Podklad: lokální složka `Fotografie`, existující stránky a obsahová strategie projektu. Jde o redakční návrh, nikoli o nový výzkum hledanosti.

## Co bylo prověřeno

- 23 tematických složek a samostatný archiv `val praha.zip`; celkem přibližně 640 MB.
- Včetně obsahu archivů 193 JPG a 8 MP4. Kontrola SHA-256 našla 15 duplicitních fotografií a jedno duplicitní video: zbývá **178 unikátních fotografií a 7 unikátních videí**.
- Všechny unikátní fotografie byly prohlédnuty v náhledech. To umožňuje výběr témat a kompozic; finální ostrost je třeba kontrolovat na originálu. Videa byla inventarizována, nikoli přehrána a obsahově zhodnocena.
- Originály ani archivy nebyly změněny. Část fotografií tvoří téměř stejné záběry, i když soubory nejsou binárně shodné.

## Doporučené pořadí

### 1. Praktický průvodce spottingem v Praze

Navržená URL: `/letiste/praha/planespotting`. Spojit materiály `val praha.zip`, `Planespoting kbězeves` a vhodné záběry ze složky Praha. V archivu valu jsou kromě letadel samotná vyhlídka, cesta a informační tabule. To je dobrý podklad pro vysvětlení návštěvy místa.

První výběr:

- `val praha.zip / 20260916_171618.jpg`: celkový pohled na val a přístup.
- `val praha.zip / 20260916_171521.jpg`: bližší pohled na vyhlídku.
- `val praha.zip / 20260916_171539.jpg`: cesta a val.
- `val praha.zip / 20260916_171505.jpg`: informační tabule jako podklad k ověření místa.
- `val praha.zip / 20260916_171519.jpg`: mapová tabule jako podklad pro orientaci.
- `Planespoting kbězeves / 20251026_123923.jpg`: kontext místa a návštěvníků.
- `Planespoting kbězeves / 20251026_123932.jpg`: letadlo na dráze.

Vybrat přibližně 6–8 odlišných fotografií. Doplnit přesný bod, přístup, zkušenost z návštěvy a aktuálně ověřené dopravní informace. Podle fotografií samotných neslibovat bezbariérovost, parkování ani stálý směr přistávání. Propojit s radarem, stránkou letiště Praha a existujícím článkem o A380. Pražský spotting už je navržen v původní obsahové strategii, ale jeho vlastní stránka v projektu zatím není.

### 2. Vlastní fotografie na existující stránky

Zvážit nahrazení externí fotografie v článku `letiste-praha-zive` vhodným vlastním pražským snímkem. Pro stránku letiště je kandidátem `IMG_20220608_151953.jpg` s terminálem; před použitím ověřit, zda záběr odpovídá dnešnímu popisu. Aktualizovat popisek, autora a evidenci v `docs/photo-credits.md`. Nepředpokládat automaticky stejného autora všech nově dodaných souborů.

### 3. Hangar 7: fotografická reportáž z návštěvy

22 fotografií a jedno video před deduplikací. Nejucelenější samostatná série: architektura, celky expozice a detaily letadel. Kandidáti `20250801_102033.jpg` a `20260725_142033.jpg`. Fotografie podle názvů pocházejí z různých návštěv; nespojovat je do jedné smyšlené události. Doplnit skutečné vzpomínky autora a ověřit aktuální praktické informace.

### 4. Gibraltar a Lipsko

- **Gibraltar:** fotografie skály, dráhy a přecházení letištní plochy. Silný vizuální příběh; před praktickým průvodcem ověřit aktuální režim přístupu. Kandidát `20250224_175027.jpg`.
- **Lipsko:** záběry velkého nákladního letadla, zejména `IMG_20251224_125631.jpg`. Před titulkem a popisky určit přesný typ a případně registraci z originálu. Samotný název složky nepotvrzuje identitu letadla ani konkrétní letiště.

## Využití zbývajících složek

| Materiál | Navržené využití |
|---|---|
| Innsbruck | Reportáž o pozorování letadel v horském prostředí; nejdřív prohlédnout videa, na fotografiích převažuje okolí. |
| Salzburg | Doplněk k návštěvě Hangaru 7; snímky letiště jsou hodně podobné. |
| Tivat | Kratší reportáž s horskou kulisou a přelety. |
| Zruč u Plzně | Samostatný výletní článek po doplnění zkušenosti a přesného názvu místa. |
| Restaurace letadlo | Krátký tip na výlet po potvrzení lokality a zkušenosti z návštěvy. |
| Letadlo někde v Německu | Nejprve určit místo; do té doby pouze zásoba fotografií. |
| Exkurze letiště | Zkušenost z exkurze; potvrdit místo, datum a skutečný průběh. |
| Condor, Etihad, Ryanair | Fotobanka k souvisejícím článkům. Malý počet podobných snímků sám o sobě není podklad pro recenzi aerolinky. |
| Frankfurt a Göteborg | Oddělit lokality po ověření; nyní jsou smíchané v jedné složce. |
| Drážďany | Doplnění letištního průvodce nebo krátká reportáž. |
| Treviso, Gran Canaria, Zakynthos, Barcelona, Roudnice | Ilustrace k budoucím relevantním textům; zatím málo odlišného materiálu pro plnohodnotné samostatné průvodce. |
| E-day modely letadel | Menší fotoreportáž; tematicky až za letišti a spottingem. |

## Příprava publikace

1. Zachovat originály mimo veřejné webové soubory. Do `public` zařadit pouze vybrané optimalizované kopie.
2. U výběru evidovat zdrojový archiv, název souboru, místo, datum, autora, popisek a cílovou stránku. Datum z názvu souboru brát jako vodítko, ne ověřený údaj.
3. Vyřadit z publikačního výběru přesné duplicity a opakující se kompozice. Nic automaticky nemazat z originálů.
4. Připravit velikosti a formáty pro web, zachovat přirozené proporce a před publikací zkontrolovat ostrost.
5. Každou novou reportáž propojit s relevantním letištěm a radarem; nevytvářet automaticky článek pro každou složku.

## Další zjištění v projektu

`tasks/roadmap.md` má poslední aktualizaci z července a rozchází se s README: popisuje jiné primární datové zdroje, historický mock fallback a znovu plánuje některé již označené hotové funkce. Před dalším technickým plánováním jej srovnat se skutečným kódem. Tato kontrola nebyla auditem funkčnosti aplikace ani produkce.
