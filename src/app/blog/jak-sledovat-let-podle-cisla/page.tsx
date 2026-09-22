import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { ArticleHero } from '@/components/UI/ArticleHero'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { socialMetadata } from '@/lib/socialMetadata'
import { AUTHOR, AUTHOR_JSON_LD, PUBLISHER_JSON_LD } from '@/lib/author'
import { ArticleContents } from '@/components/UI/ArticleContents'

const post = getPost('jak-sledovat-let-podle-cisla')!

export const metadata: Metadata = {
  title: 'Sledování letů podle čísla: kde je letadlo online',
  description:
    'Zadejte číslo letu a zjistěte, kde je letadlo. Vysvětlíme rozdíl mezi číslem letu, volacím znakem a registrací i kde ověřit zpoždění.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/jak-sledovat-let-podle-cisla' },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  creator: AUTHOR.name,
  ...socialMetadata({
    title: 'Sledování letů podle čísla: kde je letadlo online',
    description: 'Co zadat do živé mapy, kde ověřit zpoždění a proč se některý let nemusí zobrazit.',
    url: 'https://www.flyqueens.cz/blog/jak-sledovat-let-podle-cisla',
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
    image: { url: '/blog/jak-sledovat-let-podle-cisla.jpg', width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt },
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updatedAt,
  description: 'Návod ke sledování letu podle čísla a vysvětlení rozdílu mezi číslem letu, volacím znakem, registrací a ICAO adresou.',
  image: 'https://www.flyqueens.cz/blog/jak-sledovat-let-podle-cisla.jpg',
  inLanguage: 'cs-CZ',
  timeRequired: 'PT7M',
  author: AUTHOR_JSON_LD,
  publisher: PUBLISHER_JSON_LD,
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/jak-sledovat-let-podle-cisla',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'FlyQueens', item: 'https://www.flyqueens.cz' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.flyqueens.cz/blog' },
    { '@type': 'ListItem', position: 3, name: post.title, item: 'https://www.flyqueens.cz/blog/jak-sledovat-let-podle-cisla' },
  ],
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function TrackFlightNumberArticle() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbJsonLd]).replace(/</g, '\\u003c') }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/blog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', margin: '18px 0 8px' }}>{post.tag}</div>
        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '0 0 6px' }}>
          Sledování letů podle čísla: kde je letadlo online
        </h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} updatedLabel="14. září 2026" />

        <ArticleHero
          src={post.image}
          alt={post.imageAlt}
          caption="Číslo letu označuje spoj; registrace patří konkrétnímu letadlu."
          creditLabel="whereslugo / Unsplash"
          creditHref="https://unsplash.com/photos/airplane-from-above-Fk35BtkRO7g"
        />

        <p style={S.p}>
          Čekáte na někoho na letišti, sledujete cestu rodiny nebo chcete zjistit, kudy letí konkrétní spoj? Obvykle
          stačí číslo letu z letenky, palubní vstupenky nebo zprávy aerolinky. Je ale důležité vědět, co přesně mapa hledá
          a proč může používat trochu jiný kód.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlý postup</div>
          <ol style={{ ...S.p, margin: 0, paddingLeft: 20 }}>
            <li>Najděte číslo letu na letence nebo v aplikaci aerolinky, například QS123 nebo FR1234.</li>
            <li>Zadejte je do vyhledávání na <Link href="/radar" style={{ color: 'var(--gold)' }}>živé mapě FlyQueens</Link>.</li>
            <li>Čas, zpoždění, terminál a bránu potvrďte na oficiální tabuli letiště nebo u aerolinky.</li>
          </ol>
        </div>

        <ArticleContents items={[
          { id: 'kde-najdu-cislo-letu', label: "Kde najdu číslo letu?" },
          { id: 'cislo-letu-volaci-znak-a-registrace', label: "Číslo letu, volací znak a registrace nejsou totéž" },
          { id: 'proc-se-cislo-letu-na-mape-nezobrazuje', label: "Proč se číslo letu na mapě nezobrazuje?" },
          { id: 'mapa-letu-a-letistni-tabule-resi-jinou', label: "Mapa letu a letištní tabule řeší jinou otázku" },
          { id: 'jak-sledovat-prilet-do-prahy', label: "Jak sledovat přílet do Prahy" },
          { id: 'lze-dohledat-vcerejsi-nebo-starsi-let', label: "Lze dohledat včerejší nebo starší let?" },
          { id: 'kteremu-udaji-verit-pri-ceste-na-letiste', label: "Kterému údaji věřit při cestě na letiště?" },
        ]} />

        <h2 id="kde-najdu-cislo-letu" style={S.h2}>Kde najdu číslo letu?</h2>
        <p style={S.p}>
          Hledejte krátký kód aerolinky a číslo, ne číslo rezervace. Číslo letu bývá na letence, palubní vstupence,
          potvrzovacím e-mailu a v aplikaci dopravce. Rezervační kód bývá samostatná kombinace písmen a číslic a pro
          veřejné sledování letu obvykle nepomůže.
        </p>

        <h2 id="cislo-letu-volaci-znak-a-registrace" style={S.h2}>Číslo letu, volací znak a registrace nejsou totéž</h2>
        <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Identifikátor</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Příklad</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>K čemu slouží</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Číslo letu', 'QS123 / FR1234', 'cestující, letenky a letové řády'],
                ['Volací znak', 'TVS123 / RYR1234', 'identifikace letu v provozu a ADS-B'],
                ['Registrace', 'OK-ABC', 'konkrétní fyzické letadlo'],
                ['ICAO adresa', '24bitový hex kód', 'technická jednoznačná identifikace odpovídače'],
              ].map(([type, example, use]) => (
                <tr key={type}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontWeight: 700 }}>{type}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{example}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={S.p}>
          IATA používá dvoupísmenné kódy aerolinek v rezervacích a letových řádech. V provozních datech se častěji
          objeví třípísmenný ICAO designátor. Vyhledávač proto musí umět mezi těmito tvary převádět; u neobvyklého nebo
          sdíleného letu se to nemusí vždy podařit automaticky.
        </p>
        <p style={S.p}>
          Pozor na kód <strong>OK</strong>: České aerolinie pod ním přestaly létat na konci října 2024 a jejich
          spoje převzaly Smartwings s kódem QS a volacím znakem TVS. Starší návod nebo záložka s číslem ve tvaru
          OK123 proto dnes ve vyhledávání nic nenajde.
        </p>

        <h2 id="proc-se-cislo-letu-na-mape-nezobrazuje" style={S.h2}>Proč se číslo letu na mapě nezobrazuje?</h2>
        <ul style={{ ...S.p, paddingLeft: 22 }}>
          <li style={{ marginBottom: 8 }}>Let ještě neodstartoval nebo zatím není v oblasti načtené mapou.</li>
          <li style={{ marginBottom: 8 }}>Letadlo nevysílá použitelnou polohu nebo ji dostupný zdroj nezachytil.</li>
          <li style={{ marginBottom: 8 }}>Palubní systém vysílá jiné provozní označení než číslo uvedené cestujícím.</li>
          <li style={{ marginBottom: 8 }}>Jde o codeshare: stejný spoj se prodává pod více čísly různých aerolinek.</li>
          <li>Trasa nebo identifikace ve zdroji chybí; mapa proto spoj raději nepřiřadí.</li>
        </ul>

        <h2 id="mapa-letu-a-letistni-tabule-resi-jinou" style={S.h2}>Mapa letu a letištní tabule řeší jinou otázku</h2>
        <p style={S.p}>
          Živá mapa odpovídá hlavně na „kde je letadlo a co právě dělá“. Letištní tabule odpovídá na „kdy přiletí,
          z jakého terminálu odlétá a zda je spoj zpožděný“. Pro vyzvednutí cestujícího je rozhodující oficiální stav
          letiště nebo dopravce; mapa je užitečný doplněk, ne náhrada provozního oznámení.
        </p>

        <h2 id="jak-sledovat-prilet-do-prahy" style={S.h2}>Jak sledovat přílet do Prahy</h2>
        <p style={S.p}>
          Nejprve ověřte číslo a stav letu na oficiální tabuli Letiště Praha. Když je let ve vzduchu, otevřete mapu a
          vyhledejte číslo. Uvidíte, zda se zachycené letadlo blíží k Praze, jakou má výšku a zda klesá. Podrobněji
          postup popisujeme v článku <Link href="/blog/letiste-praha-zive" style={{ color: 'var(--gold)' }}>Letiště Praha živě</Link>.
        </p>

        <h2 id="lze-dohledat-vcerejsi-nebo-starsi-let" style={S.h2}>Lze dohledat včerejší nebo starší let?</h2>
        <p style={S.p}>
          FlyQueens se soustředí na aktuální provoz a negarantuje veřejný archiv historie. Pokud let už přistál a není
          v živých datech, ověřte nejprve historii u dopravce nebo letiště. Plnohodnotná historie tras bývá u některých
          specializovaných služeb placená.
        </p>

        <h2 id="kteremu-udaji-verit-pri-ceste-na-letiste" style={S.h2}>Kterému údaji věřit při cestě na letiště?</h2>
        <p style={S.p}>
          Praktické pravidlo je jednoduché: polohu sledujte na mapě, ale čas, terminál, bránu a pokyny cestujícím
          kontrolujte u aerolinky a letiště. Veřejná ADS-B data mohou mít zpoždění, výpadek nebo chybějící propojení s
          letovým plánem.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Máte číslo letu?</div>
          <p style={{ ...S.p, marginBottom: 12 }}>Zadejte je do mapy. Vyhledávat můžete také podle registrace nebo ICAO adresy.</p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Sledovat let online
          </Link>
        </div>

        <AuthorCard />

        <RelatedReading
          items={[
            {
              href: '/blog/co-mi-leti-nad-hlavou',
              eyebrow: 'Praktický návod',
              title: 'Co mi právě letí nad hlavou?',
              description: 'Jak najít letadlo podle polohy, směru a posledních živých dat.',
            },
            {
              href: '/blog/letiste-praha-zive',
              eyebrow: 'Letiště Praha',
              title: 'Jak sledovat letadla nad Ruzyní online',
              description: 'Rozdíl mezi živou mapou, webkamerou a oficiální tabulí letiště.',
            },
          ]}
        />

        <SourcesBox
          sources={[
            { label: 'IATA — kódy aerolinek a jejich použití', href: 'https://www.iata.org/en/services/codes/' },
            { label: 'Zdopravy.cz — lety ČSA přešly pod kód Smartwings (QS)', href: 'https://zdopravy.cz/misto-ok-uz-jen-qs-lety-ceskych-aerolinii-budou-zajistovat-smartwings-205986/' },
            { label: 'FAA — Flight ID a identifikace v ADS-B', href: 'https://www.faa.gov/air_traffic/publications/atpubs/aip_html/chap4_section_5.html' },
            { label: 'FAA — proč musí volací znak odpovídat letovému plánu', href: 'https://www.faa.gov/air_traffic/technology/equipadsb/installation/know_adsb_system' },
          ]}
          note="Fakta a odkazy ověřeny 14. září 2026. Pro provozní stav letu vždy použijte oficiální zdroj letiště nebo aerolinky."
        />
      </div>
    </main>
  )
}
