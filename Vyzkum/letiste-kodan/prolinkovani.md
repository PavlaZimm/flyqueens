# Prolinkování: /blog/letiste-kodan

Stav k 23. 9. 2026. Prošla jsem všechny `src/app/**/page.tsx`, `src/lib/*.ts` a `src/data/*.json`. Nic jsem neupravovala.

## 1. Příchozí odkazy na /blog/letiste-kodan (celé repo)

| Odkud | Soubor:řádek | Typ | Trvalý? |
|---|---|---|---|
| Letiště Tivat | `src/app/blog/letiste-tivat/page.tsx:173` | RelatedReading, eyebrow „Letiště · Dánsko“ | ano |
| Letiště Lipsko | `src/app/blog/letiste-lipsko/page.tsx:167` | RelatedReading, stejný titulek i popis | ano |
| /blog | `src/app/blog/page.tsx` přes `BLOG_CARDS` (`src/lib/blog.ts:21`) | výpis článků | ano |
| Homepage | `src/app/page.tsx:43` `latestPosts` = 3 nejnovější podle `date` | karta | **ne**, vypadne po 3 novějších článcích |
| Patička | `src/components/UI/SiteFooter.tsx:11` = 3 nejnovější | odkaz | **ne**, taky dočasné |
| Sitemap | `src/app/sitemap.ts` (POSTS) | — | ano |

Článek osiřelý není. Trvale na něj ale odkazují jen dva sesterské články o zahraničních letištích a výpis blogu. Z žádné stránky „/letiste/*“ na něj odkaz nevede.

## 2. Odchozí odkazy článku: kontrola

| Odkaz | Text odkazu | Řádek | Route existuje |
|---|---|---|---|
| `/letiste/praha` | „stránce Letiště Praha“ | 123 | ano, `src/app/letiste/praha/page.tsx` |
| `/letiste/praha/parkovani` | „parkování u Letiště Praha“ | 155 | ano |
| `/letiste/praha/planespotting` | „planespotting u Letiště Praha“ | 168 | ano |
| `/radar` | „radaru FlyQueens“ + tlačítko „Otevřít radar letadel“ | 138, 191 | ano, `src/app/radar/page.tsx` |
| RelatedReading `/letiste/praha` | „Letiště Praha“ | 195 | ano |
| RelatedReading `/blog/letiste-lipsko` | „Letiště Lipsko“ | 196 | ano |
| `/`, `/blog` | drobečková navigace | 79 | ano |

- Texty odkazů jsou popisné a každý je jiný. Žádné „klikněte zde“.
- **Stejný text na dvě různé URL:** interně žádný. Skript našel jedinou shodu a ta je externí: „JIP, Wikimedia Commons“ vede na dvě různé fotky (ř. 104 a 130). Jde o kredit autora fotky, takže je to v pořádku.
- `/letiste/praha` má odkaz v textu i v RelatedReading. To je v pořádku, jinde na webu se to dělá stejně.
- **Chybí:** `/blog/jak-sledovat-let-podle-cisla`. Článek dvakrát posílá čtenáře na radar (ř. 138, 190) a ve FAQ uvádí číslo letu SK768 (ř. 179). Návod přitom vysvětluje, proč obchodní číslo letu nemusí odpovídat volacímu znaku na mapě. To je přesně chvíle, kdy se čtenář na radaru zasekne. Tivat na návod odkazuje, Kodaň ne. Viz návrh A.
- Tivat odkazuje na Kodaň, Kodaň na Tivat ne. Vzájemnost není nutná, nechávám to bez návrhu.

## 3. Doporučená místa (seřazeno podle síly)

### A. Kodaň → návod ke sledování letu (VYSOKÁ, odchozí)
- **Soubor:** `src/app/blog/letiste-kodan/page.tsx:194–197`, RelatedReading
- **Návrh:** přidat 3. položku stejnou jako na Tivatu (`letiste-tivat/page.tsx:172`):
  ```tsx
  { href: '/blog/jak-sledovat-let-podle-cisla', eyebrow: 'Návod', title: 'Jak sledovat let podle čísla', description: 'Číslo letu, volací znak a registrace: co zadat do mapy.' },
  ```
- **Varianta v textu** (ř. 190), existující věta: „Den před odletem si pak na radaru můžete ověřit, kde je letadlo, které vás poveze.“
  → „Den před odletem si pak na radaru můžete ověřit, kde je letadlo, které vás poveze. Co do vyhledávání zadat, vysvětluje <Link href="/blog/jak-sledovat-let-podle-cisla">návod ke sledování letu podle čísla</Link>.“
  Text odkazu je jiný než na Santiagu („jak sledovat let podle čísla“). Stačí jedna z variant, raději RelatedReading, protože nepřidává nové tvrzení.
- **Proč:** krok hned po přečtení je najít vlastní let. Bez návodu čtenář narazí na rozdíl mezi SK768 a volacím znakem.

### B. Planespotting Praha → Kodaň (STŘEDNÍ)
- **Soubor:** `src/app/letiste/praha/planespotting/page.tsx:162–167`, RelatedReading (teď 4 položky)
- **Návrh:** doplnit jako 5. položku:
  ```tsx
  { href: '/blog/letiste-kodan', eyebrow: 'Spotting v zahraničí', title: 'Letiště Kodaň', description: 'Grill Flyvergrillen u plotu k dráhám a přímé lety z Prahy.' },
  ```
- **Proč:** jediná stránka webu, kde čtenář řeší, odkud se dívat na letadla. Kodaňská sekce o Flyvergrillen je pokračování („kam na letadla, až poletím ven“). Popis je jiný než na Tivatu a Lipsku, takže se texty neopakují. Pozor: na místě jsme grill neověřovali, proto v popisu není otevírací doba ani „nejlepší místo“.

### C. /letiste (přehled) → zahraniční letiště (STŘEDNÍ)
- **Soubor:** `src/app/letiste/page.tsx`, za seznamem `AIRPORTS` (za ř. 68, před `</div>` na ř. 69)
- **Stav:** stránka zná jen 5 českých letišť. Lipsko, Tivat ani Kodaň z ní nevedou nikam, přitom je to jediný rozcestník letišť na webu.
- **Návrh** (jedna věta, styl jako úvodní odstavec ř. 38):
  ```tsx
  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)', margin: '22px 0 0' }}>
    Průvodce letišti v zahraničí, kam se z Česka létá nebo jezdí, píšeme na blogu:{' '}
    <Link href="/blog/letiste-kodan">letiště Kodaň</Link>,{' '}
    <Link href="/blog/letiste-lipsko">Lipsko/Halle</Link> a{' '}
    <Link href="/blog/letiste-tivat">Tivat v Černé Hoře</Link>.
  </p>
  ```
- **Proč:** kdo hledá na webu letiště, dostane i ta zahraniční. Pomůže to všem třem článkům, nejen Kodani. H1 „Letiště v Česku“ ani metadata se nemění.

### D. Praha–Santiago → Kodaň (NÍZKÁ)
- **Soubor:** `src/app/blog/praha-santiago-de-compostela/page.tsx:154–157`, RelatedReading (teď 2 položky)
- **Návrh:**
  ```tsx
  { href: '/blog/letiste-kodan', eyebrow: 'Přímo z Prahy', title: 'Letiště Kodaň', description: 'SAS, Norwegian a Ryanair z Terminálu 2 a co čekat v Kodani.' },
  ```
- **Proč:** oba články jsou pro člověka, který letí z Prahy přímou linkou. Tematicky jsou si ale daleko (Galicie a Dánsko). Přidala bych jen kvůli třetí položce, nijak na tom netrvám.

## 4. Kam odkaz nedávat (posouzeno, není přirozené)

- **`/letiste/praha`, pole `LINKS` (ř. 20–27):** všechny položky jsou podstránky Prahy a jeden pražský článek (B747). Cílová destinace by rozcestník rozbila. Odstavec o Terminálu 2 (ř. 175) mluví o Schengenu obecně, Kodaň by tam byla vsunutá bez důvodu.
- **`/letiste/praha/parkovani`:** čtenář řeší stání v Praze. Srovnání s cenami v Kodani mu nepomůže. Opačný směr (Kodaň → Praha, ř. 155) už existuje.
- **`/letiste/[airport]/odlety`:** jedna šablona pro všech 5 českých letišť. Odkaz by se objevil i u Brna a Ostravy, odkud se do Kodaně nelétá.
- **`/blog/jak-sledovat-let-podle-cisla`** (příchozí), **`/blog/letiste-praha-zive`**, **`/blog/air-park-zruc`**, **`/stats`**, **`/radar`**: Kodaň, Dánsko, SAS ani přestupy tu nejsou. Odkaz by byl nacpaný. `src/lib/airports.ts` a `airlineNames.ts` obsahují SAS a CPH jen jako data pro mapu, ne jako text stránky.
- Věta „Z Brna, Ostravy, Pardubic ani Karlových Varů se do Kodaně … nelétá“ (ř. 123) nepotřebuje odkazy na stránky těch letišť. Byl by to výčet odkazů bez užitku pro čtenáře.
