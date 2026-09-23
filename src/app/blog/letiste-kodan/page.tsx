import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'
import { POSTS } from '@/lib/blog'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from '@/components/Article/Article.module.css'
import { ArticleHeader } from '@/components/Article/ArticleHeader'
import { ArticleContents } from '@/components/UI/ArticleContents'

const post = POSTS.find((entry) => entry.slug === 'letiste-kodan')!
const title = 'Letiště Kodaň 2026: lety z Prahy, terminály a parkování'
const description = 'Letiště Kodaň (CPH): kdo létá přímo z Prahy, ze kterého terminálu se odlétá, jak dlouho se čeká na kontrole a kolik stojí parkování. Stav k 23. 9. 2026.'
const url = 'https://www.flyqueens.cz/blog/letiste-kodan'
const sizes = '(max-width: 800px) calc(100vw - 36px), 760px'
const cph = 'https://www.cph.dk'
const aip = 'https://aim.naviair.dk/media/files/zdxe03hoarn/EK_AD_2_EKCH_en.pdf'
const prgKodan = 'https://www.prg.aero/kodan'
const tzMarch = `${cph}/en/about-cph/press/news/2026/03/rising%20passenger%20numbers%20drive%20growth%20at%20copenhagen%20airport`
const tzAugust = `${cph}/en/about-cph/press/news/2026/08/copenhagen%20airport%20increases%20profit%20in%20the%20first%20half%20of%20the%20year`
const xls2512 = `${cph}/48d588/globalassets/8.-om-cph/04_investor/trafikstatistik/2025/12/2512_traffic.xlsx`
const xls2608 = `${cph}/4a4afb/globalassets/8.-om-cph/04_investor/trafikstatistik/2026/08/2608_traffic.xlsx`
const factsFigures = `${cph}/490073/globalassets/8.-om-cph/facts-and-figures_2025.pdf`
const parking = `${cph}/en/parking-transport/prices-products`
const dropOff = `${cph}/en/parking-transport/pick-up-drop-off/drop-off`
const trap = 'https://trap.lex.dk/K%C3%B8benhavns_Lufthavn'
const trapGrill = 'https://trap.lex.dk/Flyvergrillen'
const visitGrill = 'https://www.visitcopenhagen.com/copenhagen/planning/the-airplane-grill-flyvergrillen-gdk414415'
const metro = 'https://m.dk/da/planlaeg-rejsen/koebenhavns-lufthavn/'
const rejseplanen = 'https://www.rejseplanen.dk/bin/stboard.exe/mn?input=K%C3%B8benhavns%20Lufthavn%20St.&boardType=dep&time=12:00&date=24.09.26&start=yes'
const ryanair = 'https://www.ryanair.com/api/timtbl/3/schedules/CPH/PRG/years/2026/months/11'
const commons = 'https://commons.wikimedia.org/wiki/File:'
const ccBySa = <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  ...socialMetadata({ title, description, url, type: 'article', publishedTime: post.date, modifiedTime: post.updatedAt,
    image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt },
  }),
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article', headline: title, description, datePublished: post.date, dateModified: post.updatedAt,
      author: AUTHOR_JSON_LD,
      publisher: PUBLISHER_JSON_LD,
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
      about: { '@type': 'Airport', name: 'Letiště Kodaň', alternateName: ['Copenhagen Airport', 'Københavns Lufthavn', 'Kastrup'], iataCode: 'CPH', icaoCode: 'EKCH', sameAs: cph },
      image: [
        'https://www.flyqueens.cz/blog/letiste-kodan-terminal-3-odbaveni.webp',
        'https://www.flyqueens.cz/blog/letiste-kodan-sas-embraer.webp',
        'https://www.flyqueens.cz/blog/letiste-kodan-za-bezpecnostni-kontrolou.webp',
        'https://www.flyqueens.cz/blog/letiste-kodan-sas-pristani.webp',
      ],
    },
    {
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
        { '@type': 'ListItem', position: 3, name: 'Letiště Kodaň', item: url },
      ],
    },
  ],
}

export default function LetisteKodanArticle() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <ArticleHeader
          crumbs={[{ href: '/', label: 'FlyQueens' }, { href: '/blog', label: 'Blog' }]}
          current="Letiště Kodaň"
          eyebrow={post.tag}
          byline=<AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />
        >
          {title}
        </ArticleHeader>
        <p className={styles.lead}>Z Prahy do Kodaně létají přímo tři aerolinky: SAS, Norwegian a Ryanair. Ryanair ale linku na zimu přerušuje, od 3. listopadu 2026 do 27. března 2027 v letovém řádu není. Letiště Kodaň (IATA CPH, ICAO EKCH) leží na ostrově Amager v obci Tårnby, asi 8 km od Kodaně, a do centra se odtud metrem i vlakem dostanete zhruba za čtvrt hodiny. V roce 2025 jím prošlo rekordních 32,4 milionu cestujících.</p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Údaj</th><th scope="col">Hodnota</th></tr></thead>
            <tbody>
              <tr><td>Kódy</td><td>IATA CPH, ICAO EKCH</td></tr>
              <tr><td>Poloha</td><td>ostrov Amager, obec Tårnby (Kastrup), podle AIP 4,4 NM (asi 8 km) jiho-jihovýchodně od Kodaně</td></tr>
              <tr><td>Provoz</td><td>nonstop, pro cestující Terminál 2 a Terminál 3</td></tr>
              <tr><td>Dráhy</td><td>3: 04L/22R (až 3 571 m), 04R/22L (3 302 m), 12/30 (až 2 800 m)</td></tr>
              <tr><td>Cestující 2025</td><td>32 433 694 (+8,5 %), rekord</td></tr>
              <tr><td>Přímé lety z Prahy</td><td>SAS, Norwegian, Ryanair (Ryanair ne od 3. 11. 2026 do 27. 3. 2027)</td></tr>
              <tr><td>Vlastník</td><td>Copenhagen Airports A/S, dánský stát drží 99,6 % akcií</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroje: <a href={aip}>dánská letecká informační příručka (AIP), AD 2 EKCH</a>, znění k 23. 9. 2026; <a href={xls2512}>měsíční statistika letiště 12/2025</a>; <a href={tzMarch}>Copenhagen Airports, tisková zpráva 13. 3. 2026</a>. Lety, ceny a parkování se mění, údaje platí k 23. 9. 2026.</p>

        <figure className={styles.photo}><Image src="/blog/letiste-kodan-terminal-3-odbaveni.webp" alt="Odbavovací hala Terminálu 3 na letišti Kodaň s tabulí odbavení" width={1600} height={1200} sizes={sizes} preload /><figcaption>Odbavovací hala Terminálu 3, duben 2025. Foto: <a href={`${commons}Landside_of_Copenhagen_Airport_on_an_afternoon_in_April_2025.jpg`}>JIP, Wikimedia Commons</a>, {ccBySa}, zmenšeno.</figcaption></figure>

        <ArticleContents items={[
          { id: 'lety-z-prahy', label: 'Přímé lety z Prahy do Kodaně' },
          { id: 'terminaly', label: 'Terminály: T2, T3 a proč ne T1' },
          { id: 'bezpecnostni-kontrola', label: 'Bezpečnostní kontrola: 100 ml a 3D skenery' },
          { id: 'odlety-prilety-mapa', label: 'Odlety, přílety a mapa letiště online' },
          { id: 'parkovani', label: 'Parkování na letišti Kodaň: kolik zaplatíte' },
          { id: 'doprava-do-centra', label: 'Doprava do centra' },
          { id: 'sluzby', label: 'Wi-Fi, voda, úschovna a salonky' },
          { id: 'spotting', label: 'Kde sledovat letadla' },
          { id: 'cisla', label: 'Letiště Kodaň v číslech' },
          { id: 'caste-otazky', label: 'Časté otázky o letišti Kodaň' },
        ]} />

        <h2 id="lety-z-prahy">Přímé lety z Prahy do Kodaně</h2>
        <p>V Praze létají všichni tři dopravci z Terminálu 2 (<a href={prgKodan}>Letiště Praha, destinace Kodaň</a>). V Kodani záleží na směru. Z Prahy přiletíte do Terminálu 3, zpátky do Prahy pak SAS odlétá z Terminálu 3, Norwegian a Ryanair z Terminálu 2 (<a href={`${cph}/en/flight-information/arrivals`}>tabule příletů</a> a <a href={`${cph}/en/flight-information/departures`}>odletů</a> letiště Kodaň). Let trvá podle letového řádu 1 hodinu 20 minut se SAS a Norwegianem, s Ryanairem 1 hodinu 25 minut.</p>
        <p>V týdnu od 23. do 29. září 2026 je na lince 40 letů v každém směru: SAS 20, Norwegian 13 a Ryanair 7 (<a href={`${cph}/en/flight-information/departures`}>odletová tabule letiště Kodaň</a>, stav 23. 9. 2026). V zimním letovém řádu jich ubude. SAS dál létá třikrát denně, v sobotu dvakrát. Norwegian má v listopadu, prosinci a únoru čtyři lety týdně a v polovině ledna jen dva.</p>
        <p>Ryanair přes zimu nelétá vůbec. Poslední let před přestávkou je 2. listopadu 2026, další až 28. března 2027 (<a href={ryanair}>letový řád Ryanairu</a>). Kdo si plánuje Kodaň na advent, vybírá tedy jen mezi SAS a Norwegianem.</p>
        <p>Z Brna, Ostravy, Pardubic ani Karlových Varů se do Kodaně pravidelně přímo nelétá. Odlety z Prahy najdete na <Link href="/letiste/praha">stránce Letiště Praha</Link>.</p>
        <figure className={styles.photo}><Image src="/blog/letiste-kodan-sas-embraer.webp" alt="Embraer 195 aerolinky SAS s registrací SE-RSO na pojezdu na letišti Kodaň" width={1600} height={1067} sizes={sizes} /><figcaption>Embraer 195 SAS s registrací SE-RSO v Kodani, leden 2025. Foto: <a href={`${commons}CPH_SE-RSO.jpg`}>Andrzej Otrębski, Wikimedia Commons</a>, {ccBySa}, zmenšeno.</figcaption></figure>

        <h2 id="terminaly">Terminály: T2, T3 a proč ne T1</h2>
        <p>Cestující dnes používají jen Terminál 2 a Terminál 3, oba jsou otevřené nonstop (<a href={`${cph}/en/practical/check-in`}>letiště Kodaň, odbavení</a>). SAS, Delta a TUIfly Nordic odbavují v T3, ostatní dopravci v T2 (<a href={`${cph}/en/flight-information/airlines`}>seznam aerolinek podle terminálů</a>). Bezpečnostní kontrola je pro oba terminály společná a leží mezi nimi (<a href={`${cph}/en/practical/security-checkpoint`}>bezpečnostní kontrola</a>).</p>
        <p>Terminál 1 už cestujícím neslouží, letiště ho pronajímá jako kanceláře (<a href={`${cph}/cph-business/real-estate/rental/terminal1`}>pronájem T1</a>). Pokud vás nějaký průvodce posílá na odbavení do T1, je zastaralý.</p>
        <p>Terminál 3 se rozšiřuje. Mezi moly B a C přibude 60 000 m² s dvakrát větší výdejnou zavazadel, větší pasovou kontrolou a víc než třiceti obchody a restauracemi (<a href={tzMarch}>tisková zpráva 13. 3. 2026</a>). Otevřít se má v roce 2027. Stavbu uvidíte hlavně při odletu z mol C, D, E a F, kvůli ní ale podle letiště nemusíte chodit dřív (<a href={`${cph}/fremtidens-terminal`}>Fremtidens terminal</a>).</p>
        <figure className={styles.photo}><Image src="/blog/letiste-kodan-za-bezpecnostni-kontrolou.webp" alt="Prostor za bezpečnostní kontrolou na letišti Kodaň s ukazateli ke gatům A a B" width={1600} height={1200} sizes={sizes} /><figcaption>Za bezpečnostní kontrolou, vpravo ukazatele ke gatům A a B, duben 2025. Foto: <a href={`${commons}Airside_at_Copenhagen_Airport_in_April_2025.jpg`}>JIP, Wikimedia Commons</a>, {ccBySa}, zmenšeno.</figcaption></figure>

        <h2 id="bezpecnostni-kontrola">Bezpečnostní kontrola: 100 ml a 3D skenery</h2>
        <p>Na kontrole pořád platí limit 100 ml na jednu nádobku. Všechny se musí vejít do jednoho průhledného litrového sáčku na osobu, sáčky jsou zdarma u stolů před kontrolou (<a href={`${cph}/en/practical/baggage/liquids-in-carry-on-baggage`}>tekutiny v příručním zavazadle</a>). U nových 3D skenerů necháte elektroniku v zavazadle a nesundáváte boty, pásek ani hodinky. Podle březnového oznámení je měly mít všechny dráhy kontroly do léta 2026 (<a href={tzMarch}>tisková zpráva 13. 3. 2026</a>). Jestli se to stihlo, letiště na webu k 23. 9. 2026 neuvádí. S vyndáváním notebooku proto radši počítejte.</p>
        <p>Kontrola je vždy otevřená nejméně od 4:00 do 22:00. Když se podle letového řádu létá i v noci, je otevřená nonstop. Na let v rámci Schengenu, tedy i do Prahy, radí letiště přijet nejméně dvě hodiny předem (jedna jeho stránka uvádí dvě a půl), mimo Schengen tři hodiny (<a href={`${cph}/en/practical/check-in`}>časté otázky k odbavení</a>). V roce 2025 se na kontrole čekalo průměrně 4 minuty 14 sekund a 99,4 % cestujících čekalo nejvýš čtvrt hodiny (<a href={factsFigures}>Key Facts &amp; Figures 2025</a>).</p>

        <h2 id="odlety-prilety-mapa">Odlety, přílety a mapa letiště online</h2>
        <p>Aktuální stav letů ukazuje letiště na vlastních tabulích <a href={`${cph}/en/flight-information/departures`}>odletů</a> a <a href={`${cph}/en/flight-information/arrivals`}>příletů</a>: čas, cíl, číslo letu i stav letu, třeba nástup nebo uzavřený gate. Kam se z Kodaně létá, ukazuje <a href={`${cph}/en/flight-information/destinations`}>mapa destinací</a>.</p>
        <p>V budovách se zorientujete podle <a href={`${cph}/en/practical/cph-map`}>interaktivní mapy letiště</a>. Po jednotlivých patrech jsou na ní gaty, bezpečnostní i pasová kontrola, toalety, obchody a salonky. Kde je právě letadlo, které na vás v Kodani čeká, uvidíte v <Link href="/radar">radaru FlyQueens</Link>.</p>

        <h2 id="parkovani">Parkování na letišti Kodaň: kolik zaplatíte</h2>
        <p>Letiště dělí parkoviště do čtyř kategorií podle vzdálenosti od terminálu. Online ceny jsou uvedené jako „od“ a liší se podle termínu, u vjezdu bez rezervace platí pevná sazba (<a href={parking}>ceník parkování</a>).</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th scope="col">Kategorie</th><th scope="col">K terminálu</th><th scope="col">Online, 7 dní od</th><th scope="col">U vjezdu (7 dní / den)</th></tr></thead>
            <tbody>
              <tr><td>Direct (P4, P6, P7b, P8)</td><td>100–170 m</td><td>1 759 DKK</td><td>2 250 / 375 DKK</td></tr>
              <tr><td>Standard+ (P3, P5, P9, P10)</td><td>300–500 m</td><td>1 409 DKK</td><td>1 625 / 325 DKK</td></tr>
              <tr><td>Standard (P1, P11, P12)</td><td>500 m až 1 km</td><td>899 DKK</td><td>jen online (denní sazba 299 DKK)</td></tr>
              <tr><td>Budget (P15, P17, P19)</td><td>1,3–2,1 km, k terminálu zdarma autobusem</td><td>499 DKK</td><td>jen online, nejméně 4 dny</td></tr>
            </tbody>
          </table>
        </div>
        <p className={styles.tableNote}>Zdroj: <a href={parking}>letiště Kodaň, ceník a produkty</a>, stav k 23. 9. 2026.</p>
        <p>Kolik skutečně zaplatíte, záleží na termínu. Při dotazu 23. 9. 2026 stál týden od 14. do 21. října, který zčásti spadá do dánských podzimních prázdnin, na nejlevnějších volných parkovištích P17 a P19 1 499 DKK. Několik parkovišť už bylo vyprodaných. Týden od 4. do 11. listopadu vyšel na P19 na 499 DKK a na P17 na 549 DKK. V prázdninových termínech se levná parkoviště vyprodávají, rezervujte proto s předstihem.</p>
        <p>Když někoho jen vysazujete, zastavte zdarma v pruhu Kiss &amp; Fly u Terminálu 2. Na parkovištích P Afgang (odlety, před T2) a P Ankomst (přílety, před T3) je prvních 15 minut zdarma, pak zaplatíte 70 DKK za každou započatou hodinu. Od šesté hodiny se platí 750 DKK, což je zároveň denní maximum. Rezervovat se tu nedá (<a href={dropOff}>vysazení</a>, <a href={`${cph}/en/parking-transport/pick-up-drop-off/pick-up`}>vyzvednutí</a>). Pro srovnání se podívejte na <Link href="/letiste/praha/parkovani">parkování u Letiště Praha</Link>.</p>

        <h2 id="doprava-do-centra">Doprava do centra</h2>
        <p>Do centra se dostanete rychle metrem i vlakem. Linka M2 navazuje přímo na Terminál 3 a podle provozovatele jede do centra 14 minut (<a href={metro}>Metroselskabet, stanice Københavns Lufthavn</a>). Regionální vlak z nádraží u Terminálu 3 dojede na hlavní nádraží København H za 13 až 14 minut (<a href={rejseplanen}>Rejseplanen, odjezdy 24. 9. 2026</a>). Jízdenky, noční spoje a ceny popisuje <a href="https://kastrup.cz/clanek/letiste-kodan-kastrup-doprava-do-centra">podrobný průvodce dopravou z letiště do centra Kodaně</a> na našem sesterském webu o Dánsku kastrup.cz.</p>

        <h2 id="sluzby">Wi-Fi, voda, úschovna a salonky</h2>
        <p>Wi-Fi síť „CPH Airport Free Wi-Fi“ je zdarma a bez hesla, funguje před kontrolou i za ní až ke gatům (<a href={`${cph}/en/wi-fi`}>Wi-Fi na letišti</a>). Prázdná láhev projde kontrolou a studenou vodou ji doplníte z kohoutků na toaletách na obou stranách kontroly (<a href={`${cph}/en/practical/services-airport`}>služby na letišti</a>).</p>
        <p>Samoobslužné boxy na zavazadla jsou v přízemí P4 naproti vchodu do T2 a v P7A pod hotelem Clarion u metra. Malý box stojí 50 DKK za hodinu, nejvýš 100 DKK za den (<a href={`${cph}/en/practical/baggage/baggage-deposit`}>úschovna zavazadel</a>).</p>
        <p>Do salonků za kontrolou se dá koupit vstup i při letu do Prahy, pokud je volno. Carlsberg Aviator Lounge stojí 229 DKK, Danske Bank Aviator Business Lounge 289 DKK, obě až na tři hodiny. Aspire Lounge vyjde na 339 DKK a SAS Lounge u gatů C na 349 DKK, do ní smíte nejdřív tři hodiny před odletem (<a href={`${cph}/en/practical/workspaces-and-lounges`}>salonky</a>, ceny v detailu jednotlivých salonků).</p>

        <h2 id="spotting">Kde sledovat letadla</h2>
        <p>Vyhlídku pro veřejnost letiště nemá. Dánská encyklopedie Trap Danmark to vysvětluje bezpečností: do areálu letiště veřejnost nesmí. Na letadla je podle ní nejlepší výhled z konce silnice Amager Landevej, kde stojí Flyvergrillen (<a href={trap}>Trap Danmark, Københavns Lufthavn</a>).</p>
        <p>Grill začínal v roce 1972 jako malá zmrzlinárna. Z plošiny je vidět na dráhy, uvnitř visí modely letadel a na obrazovce běží odlety a přílety (<a href={trapGrill}>Trap Danmark, Flyvergrillen</a>). Turistický portál VisitCopenhagen ho uvádí na adrese Amager Landevej 290 a popisuje jako grill u plotu k drahám s vyhlídkou u hřiště (<a href={visitGrill}>VisitCopenhagen</a>).</p>
        <p>Na místě jsme Flyvergrillen neověřovali a otevírací dobu se nám spolehlivě zjistit nepodařilo. Původní doména grilu 23. 9. 2026 ukazovala reklamu na kasina, proto na ni neodkazujeme. Které dráhy se zrovna používají, závisí na větru. Jak vypadá spotting u nás, popisuje <Link href="/letiste/praha/planespotting">planespotting u Letiště Praha</Link>.</p>
        <figure className={styles.photo}><Image src="/blog/letiste-kodan-sas-pristani.webp" alt="Letadlo SAS těsně před přistáním na letišti Kodaň, pod ním silnice se žlutým autobusem" width={1600} height={1200} sizes={sizes} /><figcaption>Letadlo SAS před přistáním v Kodani, duben 2025. Přesné místo pořízení autor neuvádí. Foto: <a href={`${commons}SAS_landing_at_CPH.jpg`}>Flygklubben, Wikimedia Commons</a>, {ccBySa}, zmenšeno.</figcaption></figure>

        <h2 id="cisla">Letiště Kodaň v číslech</h2>
        <p>V roce 2025 prošlo letištěm rekordních 32 433 694 cestujících, o 8,5 % víc než rok předtím, a zaznamenalo 256 737 startů a přistání (<a href={xls2512}>měsíční statistika 12/2025</a>). Letiště mělo 367 linek do 191 destinací a létalo sem 63 aerolinek. Nejvíc cestujících přepravily SAS, Norwegian a Ryanair, samotný SAS 38 % (<a href={tzMarch}>tisková zpráva 13. 3. 2026</a>).</p>
        <p>Letos růst pokračuje. V prvním pololetí 2026 prošlo letištěm 16,1 milionu cestujících, o 9 % víc než loni (<a href={tzAugust}>tisková zpráva 21. 8. 2026</a>), a za leden až srpen 22,9 milionu, o 7,1 % víc (<a href={xls2608}>měsíční statistika 8/2026</a>).</p>
        <p>Letadla používají tři dráhy. Nejdelší 04L/22R má pro starty z 22R k dispozici 3 571 metrů, rovnoběžná 04R/22L 3 302 metrů a příčná 12/30 až 2 800 metrů. Přednost mají rovnoběžné dráhy, příčnou letiště nasazuje jen výjimečně, třeba při bočním větru nad 15 uzlů nebo při odklízení sněhu (<a href={aip}>AIP, AD 2 EKCH</a>). Letiště funguje od 20. dubna 1925 a patří k prvním civilním letištím na světě (<a href={trap}>Trap Danmark</a>).</p>

        <h2 id="caste-otazky">Časté otázky o letišti Kodaň</h2>
        <div className={styles.faq}>
          <h3>Jak dlouho se letí z Prahy do Kodaně?</h3>
          <p>Podle letového řádu 1 hodinu 20 minut se SAS a Norwegianem, s Ryanairem 1 hodinu 25 minut. Například let SAS SK768 měl 22. září 2026 podle letového řádu odlet z Prahy v 10:20 a přílet do Kodaně v 11:40. Obě země mají stejný čas, takže časy v rezervaci nemusíte přepočítávat.</p>
          <h3>Ze kterého terminálu v Kodani se létá do Prahy?</h3>
          <p>SAS odlétá z Terminálu 3, Norwegian a Ryanair z Terminálu 2. Bezpečnostní kontrola je pro oba terminály společná a leží mezi nimi. Lety z Prahy naopak všechny přilétají do Terminálu 3, odkud jezdí metro i vlak do centra.</p>
          <h3>Létá Ryanair z Prahy do Kodaně i v zimě?</h3>
          <p>Ne. Podle letového řádu Ryanairu je poslední let před zimní přestávkou 2. listopadu 2026 a další až 28. března 2027. Přes zimu z Prahy do Kodaně přímo létají jen SAS, zhruba třikrát denně, a Norwegian, většinou čtyřikrát týdně.</p>
          <h3>Kolik stojí týden parkování na letišti Kodaň?</h3>
          <p>Na nejvzdálenějších parkovištích Budget stojí týden při online rezervaci od 499 DKK. Na týden od 14. do 21. října 2026 to ale bylo nejméně 1 499 DKK a část parkovišť byla vyprodaná. U vjezdu bez rezervace stojí týden 1 625 až 2 250 DKK. Ceny platí k 23. 9. 2026.</p>
          <h3>Jak se z letiště dostanu do centra Kodaně?</h3>
          <p>Metro M2 jede od Terminálu 3 do centra 14 minut, regionální vlak od téhož terminálu na hlavní nádraží København H 13 až 14 minut. Jízdenky a noční spoje podrobně popisuje náš sesterský web o Dánsku kastrup.cz.</p>
        </div>

        <p>Chystáte se do Kodaně poprvé? Na kastrup.cz najdete, <a href="https://kastrup.cz/kodan">co vidět v Kodani</a>. Den před odletem si pak na radaru můžete ověřit, kde je letadlo, které vás poveze.</p>
        <div className={styles.actions}><Link className={styles.primary} href="/radar">Otevřít radar letadel</Link></div>

        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha', eyebrow: 'Odlet z Česka', title: 'Letiště Praha', description: 'Přílety, odlety, doprava na letiště a parkování.' },
          { href: '/blog/letiste-lipsko', eyebrow: 'Letiště · Německo', title: 'Letiště Lipsko', description: 'Doprava z Česka, ceny parkování a nákladní Antonovy.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Naviair: AIP Dánsko, AD 2 EKCH, znění k 23. 9. 2026', href: aip },
          { label: 'Letiště Praha: destinace Kodaň', href: prgKodan },
          { label: 'Letiště Kodaň: odlety a přílety', href: `${cph}/en/flight-information/departures` },
          { label: 'Letiště Kodaň: aerolinky podle terminálů', href: `${cph}/en/flight-information/airlines` },
          { label: 'Ryanair: veřejný letový řád Kodaň–Praha, listopad 2026', href: ryanair },
          { label: 'Letiště Kodaň: odbavení a časté otázky', href: `${cph}/en/practical/check-in` },
          { label: 'Letiště Kodaň: bezpečnostní kontrola', href: `${cph}/en/practical/security-checkpoint` },
          { label: 'Letiště Kodaň: tekutiny v příručním zavazadle', href: `${cph}/en/practical/baggage/liquids-in-carry-on-baggage` },
          { label: 'Letiště Kodaň: pronájem Terminálu 1', href: `${cph}/cph-business/real-estate/rental/terminal1` },
          { label: 'Letiště Kodaň: Fremtidens terminal', href: `${cph}/fremtidens-terminal` },
          { label: 'Letiště Kodaň: interaktivní mapa', href: `${cph}/en/practical/cph-map` },
          { label: 'Letiště Kodaň: ceník parkování', href: parking },
          { label: 'Letiště Kodaň: vysazení a krátké stání', href: dropOff },
          { label: 'Letiště Kodaň: Wi-Fi', href: `${cph}/en/wi-fi` },
          { label: 'Letiště Kodaň: služby na letišti', href: `${cph}/en/practical/services-airport` },
          { label: 'Letiště Kodaň: úschovna zavazadel', href: `${cph}/en/practical/baggage/baggage-deposit` },
          { label: 'Letiště Kodaň: salonky', href: `${cph}/en/practical/workspaces-and-lounges` },
          { label: 'Copenhagen Airports: tisková zpráva 13. 3. 2026', href: tzMarch },
          { label: 'Copenhagen Airports: tisková zpráva 21. 8. 2026', href: tzAugust },
          { label: 'Copenhagen Airports: měsíční statistika 12/2025', href: xls2512 },
          { label: 'Copenhagen Airports: měsíční statistika 8/2026', href: xls2608 },
          { label: 'Copenhagen Airports: Key Facts & Figures 2025', href: factsFigures },
          { label: 'Metroselskabet: stanice Københavns Lufthavn', href: metro },
          { label: 'Rejseplanen: odjezdy vlaků z letiště, 24. 9. 2026', href: rejseplanen },
          { label: 'Letiště Kodaň: vyzvednutí a krátké stání', href: `${cph}/en/parking-transport/pick-up-drop-off/pick-up` },
          { label: 'Trap Danmark: Københavns Lufthavn', href: trap },
          { label: 'Trap Danmark: Flyvergrillen', href: trapGrill },
          { label: 'VisitCopenhagen: Flyvergrillen', href: visitGrill },
        ]} note="Zdroje ověřeny 23. září 2026, lety, ceny parkování a stav terminálů platí k tomuto datu. Počty letů pocházejí z databáze, ze které letiště Kodaň plní své tabule odletů a příletů. Přepočet 4,4 NM na 8 km je náš. Fotografie pocházejí z Wikimedia Commons pod licencí CC BY-SA 4.0 a jsou jen zmenšené. Na letišti Kodaň ani u Flyvergrillen jsme osobně nebyli." />
      </article>
    </main>
  )
}
