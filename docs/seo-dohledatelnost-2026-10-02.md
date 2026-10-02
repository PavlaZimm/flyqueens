# Dohledatelnost spottingu – provedené úpravy

- /letiste/praha/dnes má vlastní titulek, popisek, Open Graph a Twitter metadata s existující optimalizovanou fotografií Kněževsi.
- Jasné rozdělení záměrů: /dnes = plán příletů na dnešek, /planespotting = vyhlídky a přístup, článek A380 = linka/letový řád, /odlety = letištní tabule.
- Časy slunce se načítají na serveru přes stejnou denní mezipaměť jako API. Přehled večerního okna se tak může zobrazit již v počátečním HTML. Při výpadku zůstává vysvětlení a klientský pokus o načtení.
- Doplněn WebPage a BreadcrumbList JSON-LD odpovídající stránce. Bez slibování rich results a bez FAQPage.
- Statické odpovědi vysvětlují odpočet, hledání A380 a limity večerního světla. Zůstávají čitelné i bez JavaScriptu.
- Příchozí odkazy z patičky, průvodce vyhlídkami a článku A380. Zřetelnější odkaz z homepage.
- U průvodce sjednocen obsah s ArticleContents a doplněna chybějící kotva první H2.
- robots.ts umožňuje indexaci veřejných stránek; API je blokované. /dnes je již v sitemap a má vlastní canonical.

Podklady KW: seo-spotting-plan-2026-10-02.md a původní odpovědi Marketing Mineru. Rešerše: Vyzkum/spotting-dohledatelnost/serp.md.

## Omezení měření

Dotaz Marketing Miner GSC na flyqueens.cz vrátil 403 (no access to this Google property). Následný výpis všech properties odmítla automatická kontrola kvůli možnému zpřístupnění jiných soukromých webů. Přístup jsme neobcházeli. Vlastní imprese, kliknutí ani indexaci proto tímto neověřujeme; žádný odhad MM není prezentován jako měření GSC.

Další krok: zpřístupnit v propojení konkrétně property FlyQueens a v URL Inspection ověřit /letiste/praha/dnes. Úpravy nezaručují indexaci nebo pozici. Po nasbírání dat porovnat dotazy a stránky v GSC; nepoužívat poslední dva neustálené dny.
