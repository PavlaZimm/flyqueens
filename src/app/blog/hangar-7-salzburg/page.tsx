import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { ArticleHero } from '@/components/UI/ArticleHero'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { socialMetadata } from '@/lib/socialMetadata'
import { AUTHOR, AUTHOR_JSON_LD } from '@/lib/author'

const post = getPost('hangar-7-salzburg')!

export const metadata: Metadata = {
  title: 'Hangar-7 Salzburg: vstup zdarma a co uvnitř uvidíte',
  description:
    'Prosklená hala u salzburského letiště s historickou letkou The Flying Bulls. Otevírací doba, vstup zdarma, jak se tam dostat a proč některé letadlo nemusí být na místě.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/hangar-7-salzburg' },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  creator: AUTHOR.name,
  ...socialMetadata({
    title: 'Hangar-7 v Salzburgu: letadla Flying Bulls se vstupem zdarma',
    description: 'Co v Hangaru-7 uvidíte, kdy je otevřeno a jak se tam dostat od terminálu i z Prahy.',
    url: 'https://www.flyqueens.cz/blog/hangar-7-salzburg',
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
    image: { url: post.image, width: post.imageWidth, height: post.imageHeight, alt: post.imageAlt },
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updatedAt,
  description:
    'Praktický průvodce Hangarem-7 u letiště Salzburg: otevírací doba, vstup zdarma, vystavené stroje letky The Flying Bulls a doprava na místo.',
  image: `https://www.flyqueens.cz${post.image}`,
  inLanguage: 'cs-CZ',
  timeRequired: 'PT7M',
  author: AUTHOR_JSON_LD,
  publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/hangar-7-salzburg',
  about: {
    '@type': 'TouristAttraction',
    name: 'Red Bull Hangar-7',
    url: 'https://www.hangar-7.com/',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Wilhelm-Spazier-Straße 7A',
      postalCode: '5020',
      addressLocality: 'Salzburg',
      addressCountry: 'AT',
    },
  },
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  h3: { fontFamily: 'Archivo, sans-serif', fontSize: 16, fontWeight: 800, margin: '22px 0 8px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

const HOURS = [
  ['Pondělí – sobota', '9:00 – 22:00'],
  ['Neděle', '9:00 – 17:00'],
  ['Vstupné do výstavní části', 'zdarma'],
]

const FLEET = [
  ['Douglas DC-6B', 'Největší exponát a srdce sbírky. Stroj z roku 1958 kdysi sloužil jugoslávskému prezidentu Titovi.'],
  ['Lockheed P-38 Lightning', 'Dvoutrupá americká legenda druhé světové války, dnes jeden z mála letuschopných kusů.'],
  ['North American B-25J Mitchell', 'Dvoumotorový bombardér, který se v Evropě potká jen výjimečně.'],
  ['Chance Vought F4U-4 Corsair', 'Palubní stíhačka s charakteristickým lomeným křídlem.'],
  ['Alpha Jet', 'Odzbrojené cvičné proudové stroje, se kterými Flying Bulls létají ukázky.'],
  ['Bell AH-1 Cobra a Pilatus PC-6', 'Bojový vrtulník a robustní jednomotorový stroj pro krátký vzlet.'],
]

export default function Hangar7Article() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/blog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', margin: '18px 0 8px' }}>{post.tag}</div>
        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '0 0 6px' }}>
          Hangar-7 v Salzburgu: letadla Flying Bulls zdarma
        </h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} updatedLabel="16. září 2026" readingTime={post.readingTime} />

        <ArticleHero
          src={post.image}
          alt={post.imageAlt}
          caption="Prosklená hala Hangaru-7 stojí přímo u odbavovací plochy letiště Salzburg."
          creditLabel="Pavla Zimmermannová / FlyQueens"
          creditHref="https://www.linklady.cz/o-mne"
          licenseLabel="vlastní fotografie"
          licenseHref="https://www.flyqueens.cz/o-projektu"
        />

        <p style={S.p}>
          Přiletíte do Salzburgu, vyjdete z terminálu — a přes silnici na vás kouká prosklená hala ve tvaru
          křídla. To je Hangar-7. Uvnitř stojí historická letka The Flying Bulls, pár formulí a měnící se
          výstavy, a nejlepší na tom je, že za vstup do výstavní části nic nezaplatíte.
        </p>

        <h2 style={S.h2}>Co je Hangar-7?</h2>
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Hangar-7 je prosklená hala u letiště Salzburg, kde Red Bull vystavuje historickou letku
            The Flying Bulls. <strong>Vstup do výstavní části je zdarma</strong> a otevřeno je
            od pondělí do soboty 9:00–22:00, v neděli 9:00–17:00. Kromě letadel tu najdete formule,
            měnící se výstavy a pět gastronomických podniků včetně michelinské restaurace Ikarus.
          </p>
        </div>

        <p style={S.p}>
          Halu dokončili v roce 2003 a postavili ji přímo pro potřeby letky, která vznikla v roce 1999.
          Ocelová konstrukce s prosklenou kopulí drží volné rozpětí bez sloupů, aby se pod ni vešel
          největší exponát — čtyřmotorový Douglas DC-6B.
        </p>

        <h2 style={S.h2}>Co uvnitř uvidíte</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '0 0 12px' }}>
          {FLEET.map(([name, note]) => (
            <div key={name} style={{ padding: '12px 14px', border: '1px solid var(--border-mid)', borderRadius: 10, background: 'var(--midnight-2)' }}>
              <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 14, fontWeight: 800, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>{note}</div>
            </div>
          ))}
        </div>
        <p style={S.p}>
          Sbírka se doplňuje formulemi a rotujícími uměleckými výstavami, takže dvě návštěvy po sobě
          nemusí vypadat stejně.
        </p>

        <h2 style={S.h2}>Počítejte s tím, že některé letadlo nebude doma</h2>
        <p style={S.p}>
          Tohle je jediná věc, kterou je dobré vědět dopředu. Stroje Flying Bulls <strong>nejsou muzejní
          exponáty za provazem</strong> — všechny jsou letuschopné a v sezóně létají na letecké dny po celé
          Evropě. Když je letka na airshow, konkrétní letadlo v hale prostě není.
        </p>
        <p style={S.p}>
          Údržba navíc probíhá v sousedním Hangaru-8, který veřejnosti přístupný není. Nedá se tedy
          slíbit, že uvidíte přesně ten stroj, kvůli kterému jedete. Když vám jde o jeden konkrétní,
          napište jim předem.
        </p>

        <h2 style={S.h2}>Otevírací doba a vstup</h2>
        <div style={{ overflowX: 'auto', margin: '0 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <tbody>
              {HOURS.map(([label, value]) => (
                <tr key={label}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600 }}>{label}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={S.p}>
          Skupiny od deseti lidí mají vstup také zdarma, ale mají se ohlásit dopředu. Otevírací dobu si
          před cestou ověřte na oficiálním webu — hala se občas zavírá kvůli soukromým akcím.
        </p>

        <h2 style={S.h2}>Jak se tam dostanete</h2>
        <p style={S.p}>
          Adresa je Wilhelm-Spazier-Straße 7A, 5020 Salzburg, tedy hned u letiště. Autobus číslo 10
          staví prakticky přede dveřmi a je to ta samá linka, která veze cestující z letiště do centra
          Salzburgu — jízda trvá kolem patnácti minut a jede v intervalu deseti až patnácti minut.
        </p>
        <h3 style={S.h3}>Z Prahy</h3>
        <p style={S.p}>
          Přímé letadlo z Prahy do Salzburgu nehledejte, spojení vede po zemi. Vlakem jede přímý
          EuroCity rakouských ÖBB a cesta zabere okolo pěti hodin; autem se jede přes Linec.
          Pokud přilétáte odjinud, máte Hangar-7 přes silnici od terminálu a dá se stihnout
          i během delšího přestupu.
        </p>

        <h2 style={S.h2}>Jídlo, pití a vyhlídka na letadla</h2>
        <p style={S.p}>
          V hale funguje pět podniků. <strong>Restaurant Ikarus</strong> drží michelinskou hvězdu a jede
          v celosvětově nezvyklém režimu: každý měsíc tu vaří jiný hostující šéfkuchař.
          <strong> Mayday Bar</strong> je ve druhém patře jedné z prosklených věží a okna vedou přímo
          do výstavní haly, takže sedíte nad historickými stroji. <strong>Threesixty Bar</strong> se
          dá dojít po úzké lávce a má skleněnou podlahu — pod nohama vám jsou letadla a formule.
          Na kávu a zákusek je tu <strong>Carpe Diem Lounge-Café</strong>.
        </p>
        <p style={S.p}>
          Do Ikaru se sluší rezervovat. Do baru a na kávu se dá přijít i jen tak, což z Hangaru-7 dělá
          překvapivě příjemné místo na čekání před odletem.
        </p>

        <h2 style={S.h2}>Letiště Salzburg prakticky</h2>
        <p style={S.p}>
          Letiště W. A. Mozarta je druhé největší v Rakousku a leží čtyři kilometry od centra města.
          Má dva terminály a ten druhý, „amadeus“, vznikl kvůli nárazovému provozu — v zimě se tu
          v sobotu odbavují charterové lety za sněhem.
        </p>
        <p style={S.p}>
          Pro pozorovatele letadel z toho vyplývá jednoduchá věc: <strong>zimní sobota je tady
          nejrušnější den</strong>. Když chcete Hangar-7 spojit s koukáním na skutečný provoz,
          je to ten správný termín.
        </p>

        <h2 style={S.h2}>Kdy jet, aby tam nebylo narváno</h2>
        <p style={S.p}>
          Podle dat Marketing Mineru pro český trh zájem o Hangar-7 vrcholí v červenci, kdy se dotaz
          hledá přibližně 1 500× za měsíc, zatímco v listopadu je to kolem 450. Sezóna je tedy jasně
          letní. Hala má přitom otevřeno celý rok a do deseti večer, takže nejklidnější návštěva je
          mimo letní špičku a spíš k večeru.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Co letí nad Salzburgem právě teď?</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Otevřete živou mapu, přepněte oblast na Alpy a Itálii a uvidíte provoz nad Salzburgem
            i nad celým alpským regionem — včetně výšky, rychlosti a fáze letu.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Otevřít živou mapu
            </Link>
            <Link href="/letiste/praha" style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Letiště Praha
            </Link>
          </div>
        </div>

        <AuthorCard />

        <RelatedReading
          items={[
            {
              href: '/blog/airbus-a380-praha-emirates',
              eyebrow: 'Aktuální přehled',
              title: 'Airbus A380 se má vrátit do Prahy',
              description: 'Kdy má Emirates znovu nasadit největší dopravní letadlo na linku Praha–Dubaj.',
            },
            {
              href: '/blog/jak-vysoko-letaji-letadla',
              eyebrow: 'Jak to funguje',
              title: 'Jak vysoko létají letadla?',
              description: 'Obvyklé výšky, co znamená FL350 a jak převést letovou hladinu na metry.',
            },
            {
              href: '/blog/jak-sledovat-let-podle-cisla',
              eyebrow: 'Návod',
              title: 'Sledování letů podle čísla',
              description: 'Co zadat do mapy, když chcete najít konkrétní let, a proč se někdy nezobrazí.',
            },
          ]}
        />

        <SourcesBox
          sources={[
            { label: 'Red Bull Hangar-7 — otevírací doba a časté dotazy', href: 'https://www.hangar-7.com/en/service-info/faqs' },
            { label: 'Red Bull Hangar-7 — kontakt a doprava na místo', href: 'https://www.hangar-7.com/en/service-info/contact-directions' },
            { label: 'Red Bull Hangar-7 — letka The Flying Bulls', href: 'https://www.hangar-7.com/en/museum/the-flying-bulls' },
            { label: 'Salzburg.info — Hangar-7 mezi muzei ve Salzburgu', href: 'https://www.salzburg.info/en/sights/museums/hangar-7' },
            { label: 'Letiště Salzburg — veřejná doprava na letiště', href: 'https://www.salzburg-airport.com/en/flights-arrival/arrival-to-the-airport/public-transportation' },
          ]}
          note="Otevírací doba, vstup a doprava ověřeny 16. září 2026. Hala se zavírá kvůli soukromým akcím a letuschopné stroje bývají mimo halu, proto si termín před cestou potvrďte u pořadatele. Hledanost je údaj Marketing Mineru pro český trh, ne příslib návštěvnosti."
        />
      </div>
    </main>
  )
}
