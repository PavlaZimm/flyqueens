import type { Metadata } from 'next'
import Link from 'next/link'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AUTHOR, AUTHOR_JSON_LD } from '@/lib/author'
import { socialMetadata } from '@/lib/socialMetadata'
import styles from './page.module.css'

const title = 'Ubytování u letiště Praha: hotely a cesta k terminálu'
const description = 'Ubytování u letiště Praha podle cesty k terminálu. Srovnání hotelů, veřejné a tranzitní AeroRooms, transfery i rady k parkování před ranním odletem.'
const url = 'https://www.flyqueens.cz/letiste/praha/ubytovani'
const date = '2026-09-18'
const sources = {
  courtyard: 'https://www.marriott.com/en-us/hotels/prgpa-courtyard-prague-airport/overview/',
  aerorooms: 'https://www.prg.aero/aerorooms',
  holiday: 'https://www.hipragueairport.com/cs/shuttle-bus-letiste',
  ramada: 'https://www.hotelramadaairport.cz/cz/ramada-airport-hotel-prague/jak-nas-najdete',
  sky: 'https://skyhotelprague.cz/o-hotelu',
}

export const metadata: Metadata = {
  title, description,
  alternates: { canonical: url },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  ...socialMetadata({ title, description, url, type: 'article', publishedTime: date, modifiedTime: date }),
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article', headline: title, description, datePublished: date, dateModified: date,
      author: AUTHOR_JSON_LD,
      publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
      mainEntityOfPage: url, inLanguage: 'cs-CZ',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
        { '@type': 'ListItem', position: 2, name: 'Letiště', item: 'https://www.flyqueens.cz/letiste' },
        { '@type': 'ListItem', position: 3, name: 'Praha', item: 'https://www.flyqueens.cz/letiste/praha' },
        { '@type': 'ListItem', position: 4, name: 'Ubytování', item: url },
      ],
    },
  ],
}

export default function PrahaUbytovaniPage() {
  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
          <Link href="/">FlyQueens</Link><span aria-hidden="true">/</span>
          <Link href="/letiste">Letiště</Link><span aria-hidden="true">/</span>
          <Link href="/letiste/praha">Praha</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Ubytování</span>
        </nav>
        <div className={styles.eyebrow}>Praha · Noc před odletem</div>
        <h1>{title}</h1>
        <AuthorByline dateIso={date} dateLabel="18. září 2026" readingTime="5 min čtení" />
        <p className={styles.lead}>
          Ubytování u letiště Praha vybírejte podle toho, jak se ráno dostanete ke svému terminálu.
          Z některých hotelů dojdete pěšky, u jiných potřebujete předem objednaný odvoz.
          Rozdíl je i mezi pokojem ve veřejné části letiště a pokojem za pasovou kontrolou.
          Samotné slovo „Airport“ v názvu hotelu vám cestu k odbavení nevyřeší.
        </p>
        <p>Polohu a dopravu jsme ověřili na webech letiště a hotelů 18. září 2026. Jde o praktické srovnání zveřejněných informací, nikoli recenze z vlastních pobytů.</p>
        <nav className={styles.contents} aria-label="Obsah průvodce">
          <a href="#srovnani">Srovnání hotelů</a><a href="#pesky">K terminálu pěšky</a>
          <a href="#doprava">Hotely s dojezdem</a><a href="#cena">Cena a parkování</a>
        </nav>

        <h2 id="srovnani">Kde přespat před ranním odletem z Prahy?</h2>
        <p>
          Pro pěší cestu k Terminálům 1 a 2 porovnejte Courtyard by Marriott, veřejnou část AeroRooms
          a Holiday Inn. Ramada leží u Terminálu 3, takže si cestu k T1 nebo T2 naplánujte zvlášť.
          Ověřte, zda vás hotel přijme i v noci, a naplánujte si čas odchodu k terminálu.
        </p>
        <div className={styles.tableWrap} tabIndex={0} role="region" aria-label="Srovnání polohy hotelů">
          <table>
            <caption>Ubytování blízko letiště Praha podle přístupu k terminálům</caption>
            <thead><tr><th scope="col">Ubytování</th><th scope="col">Poloha a cesta</th><th scope="col">Co pohlídat</th></tr></thead>
            <tbody>
              <tr><th scope="row"><a href="#courtyard">Courtyard by Marriott</a></th><td>Naproti T1, přístup k T2 pěšky</td><td>Čas odchodu podle odbavení vašeho letu</td></tr>
              <tr><th scope="row"><a href="#aerorooms">AeroRooms</a></th><td>Veřejná část mezi T1 a T2; také tranzit T1</td><td>Správnou část letiště a čas pobytu</td></tr>
              <tr><th scope="row"><a href="#holiday">Holiday Inn</a></th><td>Podle hotelu 5–8 minut pěšky</td><td>Aktuální dopravní stránka uvádí provoz bez hotelového transferu</td></tr>
              <tr><th scope="row"><a href="#ramada">Ramada Airport</a></th><td>U T3, hotelový autobus na objednání</td><td>Odvoz k T1/T2 a jeho cenu</td></tr>
              <tr><th scope="row"><a href="#sky">Sky Hotel Prague</a></th><td>Ruzyně, dojezd autem</td><td>Vlastní plán dopravy a podmínky parkování</td></tr>
            </tbody>
          </table>
        </div>

        <h2 id="pesky">Hotely u letiště Praha s pěší cestou k T1 a T2</h2>
        <p>Pokud nechcete ráno čekat na odvoz, začněte těmito třemi možnostmi. K času chůze k terminálu připočtěte čas na odbavení zavazadel a kontroly.</p>
        <h3 id="courtyard">Courtyard by Marriott Prague Airport</h3>
        <p>
          Courtyard stojí naproti Terminálu 1 a má přímý přístup k Terminálu 2.
          <a href={sources.courtyard}> Marriott popisuje spojení lávkou</a> a uvádí, že letištní transfer nenabízí.
          Smysl dává hlavně tehdy, když chcete po noci v hotelu dojít k hlavním terminálům pěšky.
          Při porovnání nabídky se podívejte, zda cena zahrnuje snídani a zda ji před svým odletem stihnete.
        </p>
        <h3 id="aerorooms">AeroRooms: veřejná část, nebo tranzit?</h3>
        <p>
          Do veřejné části AeroRooms se vstupuje ze spojovacího objektu mezi Terminály 1 a 2.
          Právě tuto variantu hledejte pro běžnou noc před odletem. Druhá nabídka pokojů je v tranzitu
          Terminálu 1 za pasovou kontrolou. Přístup k ní si potvrďte přímo s provozovatelem podle svého itineráře.
        </p>
        <p>
          <a href={sources.aerorooms}>Letiště Praha uvádí u nočního pobytu</a> příjezd od 18:00 a odjezd do 10:00.
          Denní pokoj na dobu 11:00–17:00 je potřeba řešit s provozovatelem. Při srovnání cen proto ověřte,
          zda se díváte na noc, nebo pouze na denní odpočinek. Pro přílet po půlnoci si domluvte postup převzetí pokoje.
        </p>
        <h3 id="holiday">Holiday Inn Prague Airport</h3>
        <p>
          Holiday Inn na <a href={sources.holiday}>aktuální stránce dopravy</a> popisuje pěší trasu přes Parking D,
          která má podle hotelu zabrat 5–8 minut. Na stejné stránce výslovně uvádí, že hotelovou přepravu
          k terminálům neprovozuje. Pro cestu s kufry si předem prohlédněte přiloženou mapu.
        </p>
        <div className={styles.tip}>
          <p><strong>Rozpor v informacích o transferu.</strong> Úvodní stránka hotelu stále zmiňuje bezplatný transfer,
            ale stránka dopravy uvádí, že hotel přepravu neprovozuje. Při plánování počítejte s pěší cestou
            a aktuální podmínky si před rezervací potvrďte telefonicky u hotelu.</p>
        </div>

        <h2 id="doprava">Ubytování, odkud potřebujete dojet</h2>
        <p>U těchto možností si nejprve vyřešte cestu ke svému terminálu. Zvlášť při velmi časném odletu potřebujete znát konkrétní čas odvozu a způsob jeho objednání.</p>
        <h3 id="ramada">Ramada Airport Hotel Prague u Terminálu 3</h3>
        <p>
          Ramada je u Terminálu 3 na adrese K letišti 25a/1067. Pro odlet z T1 nebo T2 proto
          nepočítejte se stejnou polohou jako u Courtyardu.
          <a href={sources.ramada}> Hotel uvádí autobus v provozu 24 hodin denně</a>, který musíte objednat na recepci.
          Stránka dopravy neuvádí cenu. Před rezervací si potvrďte částku i odjezd v čase, který potřebujete.
        </p>
        <h3 id="sky">Sky Hotel Prague jako alternativa v Ruzyni</h3>
        <p>
          <a href={sources.sky}>Sky Hotel Prague</a> je na adrese Ztracená 737/1a v Praze 6.
          Počítejte s dojezdem autem. Při porovnávání nabídek započítejte i dopravu k terminálu;
          hotelový transfer ani jeho podmínky zde nemáme potvrzené.
          Pokud přijedete vlastním autem, nechte si zvlášť potvrdit parkování během pobytu a případné stání po dobu dovolené.
        </p>

        <h2 id="cena">Levné ubytování u letiště: porovnejte celou cestu</h2>
        <p>
          Bez stejného termínu a počtu hostů nelze poctivě určit nejlevnější hotel.
          Ke stejné ceně pokoje se navíc mohou přidat jiné výdaje. Porovnávejte konečnou částku
          včetně poplatků, dopravy k terminálu a případného parkování. U snídaně rozhoduje i čas podávání.
          Zaplacená snídaně, na kterou už nestihnete přijít, vám ranní cestu neusnadní.
        </p>
        <p>
          Balíček s parkováním prověřte podle počtu nocí a dní stání. Ubytování na jednu noc automaticky
          neznamená místo pro auto na celý týden. Samostatné možnosti porovnáte v průvodci
          <Link href="/letiste/praha/parkovani"> parkováním u letiště Praha</Link>.
          Zkontrolujte také storno podmínky, pokud ještě nemáte pevný čas letu.
        </p>
        <h2>Co potvrdit před rezervací</h2>
        <p>Po výběru pokoje pošlete hotelu přesný čas příjezdu a odletu. U odvozu si nechte potvrdit i místo vyzvednutí. K rezervaci si uložte odpovědi na tyto otázky:</p>
        <ul>
          <li>Přijme vás hotel v plánovanou hodinu, včetně příjezdu po půlnoci?</li>
          <li>Jak se dostanete ke svému terminálu a kolik bude doprava stát?</li>
          <li>Co cena zahrnuje a jaké jsou podmínky zrušení pobytu?</li>
          <li>Pokud necháváte auto u hotelu, máte potvrzené všechny dny parkování?</li>
        </ul>
        <p>
          Před cestou zkontrolujte <Link href="/letiste/praha/odlety">odlety z Prahy</Link> a pokyny svého dopravce.
          Pokud dorazíte už odpoledne a chcete pozorovat letadla, naplánujte si samostatně
          cestu na <Link href="/letiste/praha/planespotting">vyhlídkový val v Kněževsi nebo u Hostivice</Link>.
        </p>
        <AuthorCard />
        <RelatedReading items={[
          { href: '/letiste/praha', eyebrow: 'Letiště', title: 'Letiště Praha', description: 'Rozcestník k letům, parkování a živé mapě.' },
          { href: '/letiste/praha/parkovani', eyebrow: 'Před cestou', title: 'Parkování u letiště Praha', description: 'Možnosti pro auto při odletu z Prahy.' },
          { href: '/letiste/praha/odlety', eyebrow: 'Váš let', title: 'Odlety z Prahy', description: 'Ověření odletu před cestou na letiště.' },
        ]} />
        <SourcesBox sources={[
          { label: 'Marriott: Courtyard Prague Airport, poloha a doprava', href: sources.courtyard },
          { label: 'Letiště Praha: AeroRooms, přístup a časy pobytu', href: sources.aerorooms },
          { label: 'Holiday Inn: aktuální cesta mezi hotelem a letištěm', href: sources.holiday },
          { label: 'Ramada Airport: poloha a objednání hotelového autobusu', href: sources.ramada },
          { label: 'Sky Hotel Prague: adresa a poloha', href: sources.sky },
        ]} note="Poloha a zveřejněné podmínky dopravy ověřeny 18. září 2026. Ceny ani dostupnost pokojů pro konkrétní termín nesrovnáváme. Podmínky pobytu a přepravy si potvrďte u vybraného hotelu." />
      </article>
    </main>
  )
}
