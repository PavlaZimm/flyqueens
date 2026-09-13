import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { ArticleHero } from '@/components/UI/ArticleHero'
import { AuthorByline, AuthorCard } from '@/components/UI/AuthorCard'
import { socialMetadata } from '@/lib/socialMetadata'
import { AUTHOR, AUTHOR_JSON_LD } from '@/lib/author'

const post = getPost('airbus-a380-praha-emirates')!

export const metadata: Metadata = {
  title: 'Airbus A380 Praha: aktuální letový řád Emirates',
  description:
    'Kdy létá Airbus A380 do Prahy? Návrat Emirates, aktuální stav linky Praha–Dubaj a návod, jak před cestou nebo focením ověřit typ letadla.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/airbus-a380-praha-emirates' },
  authors: [{ name: AUTHOR.name, url: AUTHOR.profileUrl }],
  creator: AUTHOR.name,
  ...socialMetadata({
    title: 'Airbus A380 v Praze: kdy létá Emirates do Dubaje',
    description: 'Návrat A380, aktuální stav linky Praha–Dubaj a spolehlivý způsob ověření typu letadla.',
    url: 'https://www.flyqueens.cz/blog/airbus-a380-praha-emirates',
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updatedAt,
    image: { url: post.image, width: 2200, height: 1014, alt: post.imageAlt },
  }),
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.updatedAt,
  description: 'Aktuální přehled nasazování Airbusu A380 společnosti Emirates na lince mezi Prahou a Dubají.',
  image: `https://www.flyqueens.cz${post.image}`,
  inLanguage: 'cs-CZ',
  timeRequired: 'PT6M',
  author: AUTHOR_JSON_LD,
  publisher: { '@type': 'Organization', name: 'FlyQueens', url: 'https://www.flyqueens.cz' },
  isPartOf: { '@type': 'Blog', name: 'FlyQueens', url: 'https://www.flyqueens.cz/blog' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/airbus-a380-praha-emirates',
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  h3: { fontFamily: 'Archivo, sans-serif', fontSize: 16, fontWeight: 800, margin: '22px 0 8px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function A380PrahaArticle() {
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
          Airbus A380 v Praze: kdy létá Emirates do Dubaje
        </h1>
        <AuthorByline dateIso={post.date} dateLabel={post.dateLabel} readingTime={post.readingTime} />

        <ArticleHero
          src={post.image}
          alt={post.imageAlt}
          caption="Airbus A380 společnosti Emirates po přistání na Letišti Václava Havla Praha. Vyfoceno 26. října 2025."
          creditLabel="Pavla Zimmermannová / FlyQueens"
          creditHref="https://www.linklady.cz/o-mne"
          licenseLabel="vlastní fotografie"
          licenseHref="https://www.flyqueens.cz/o-projektu"
        />

        <p style={S.p}>
          Airbus A380 se na pravidelnou linku Emirates mezi Dubají a Prahou vrátil 1. prosince 2024. To je pravda,
          ale není to celý dnešní příběh. Typ letadla na trase se mění a aktuální oficiální rozpis Emirates při
          kontrole 13. září 2026 uvádí pro přímé lety EK139 a EK140 Boeing 777.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Emirates aktuálně létá mezi Prahou a Dubají každý den, ale v oficiálním rozpisu je uveden Boeing 777,
            nikoli Airbus A380. Pokud chcete letět nebo fotografovat právě A380, ověřte konkrétní datum přímo v
            rezervačním systému Emirates. Typ se může změnit i po rezervaci.
          </p>
        </div>

        <h2 style={S.h2}>Aktuální letový řád Emirates Praha–Dubaj</h2>
        <p style={S.p}>
          Emirates při poslední kontrole uváděl sedm letů týdně, tedy jeden let denně v každém směru. Následující
          časy a typ letadla odpovídají zveřejněnému rozpisu, ne slibu pro každý budoucí termín.
        </p>

        <div style={{ overflowX: 'auto', margin: '16px 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Let</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Trasa</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Čas</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Uvedený typ</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['EK140', 'Praha → Dubaj', '15:40 → 23:35', 'Boeing 777'],
                ['EK139', 'Dubaj → Praha', '08:40 → 13:10', 'Boeing 777'],
              ].map(([flight, route, time, aircraft]) => (
                <tr key={flight}>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontWeight: 700 }}>{flight}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{route}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)' }}>{time}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{aircraft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ ...S.p, color: 'var(--text-muted)', fontSize: 13 }}>
          Časy jsou místní. Letový řád se mění podle sezony a provozní situace, proto jej před cestou znovu zkontrolujte.
        </p>

        <h2 style={S.h2}>Kdy se A380 vrátil do Prahy</h2>
        <p style={S.p}>
          Pravidelný návrat přišel 1. prosince 2024 po více než čtyřleté přestávce. Emirates tehdy nasadil A380 na
          spojení Dubaj–Praha a Letiště Praha návrat prezentovalo jako výrazné zvýšení kapacity. Články z roku 2024
          proto nelžou, jen už nemusí popisovat současný rozpis.
        </p>
        <p style={S.p}>
          Přesně tady vzniká zmatek. Ve výsledcích vyhledávání zůstávají starší zprávy s titulkem, že se A380 vrací,
          zatímco cestující hledá let o dva roky později. Rozhodující je vždy typ uvedený u konkrétního data na webu Emirates.
        </p>

        <h2 style={S.h2}>Jak ověřit, zda do Prahy poletí A380</h2>
        <ol style={{ ...S.p, paddingLeft: 22 }}>
          <li style={{ marginBottom: 7 }}>Otevřete oficiální vyhledávání letů Emirates.</li>
          <li style={{ marginBottom: 7 }}>Zadejte trasu PRG–DXB nebo DXB–PRG a konkrétní datum.</li>
          <li style={{ marginBottom: 7 }}>U letu EK139 nebo EK140 rozbalte detail a najděte typ letadla.</li>
          <li>V den letu zkontrolujte typ znovu. Provozní výměna může přijít i na poslední chvíli.</li>
        </ol>
        <p style={S.p}>
          Živá mapa je užitečná ve chvíli, kdy je letadlo ve vzduchu. Pro plánování několik týdnů dopředu ale není
          spolehlivější než oficiální rezervace dopravce.
        </p>

        <h2 style={S.h2}>Proč se typ letadla mění</h2>
        <p style={S.p}>
          Aerolinka nasazuje kapacitu podle poptávky, sezony, dostupnosti letadel a provozních potřeb. A380 má dvě
          plné paluby a na vhodné trase přepraví výrazně více lidí než běžný širokotrupý stroj. Boeing 777 je menší
          a pro některá období může dávat dopravci větší smysl. Změna typu sama o sobě neznamená zrušení linky.
        </p>

        <h2 style={S.h2}>Jak sledovat A380 nad Prahou</h2>
        <p style={S.p}>
          Pokud je na daný den A380 skutečně nasazený, hledejte let EK139 při příletu z Dubaje nebo EK140 po odletu
          z Prahy. Mapa může ukázat polohu, výšku, rychlost a dostupný typ stroje. Data mají zpoždění a letadlo se
          nemusí objevit okamžitě, proto před cestou za focením sledujte také oficiální přílety a odlety letiště.
        </p>

        <figure style={{ margin: '18px 0 22px' }}>
          <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 9', borderRadius: 14, border: '1px solid var(--border-mid)', background: 'var(--midnight-2)' }}>
            <Image
              src="/blog/airbus-a380-praha-pristani.jpg"
              alt="Airbus A380 společnosti Emirates přistává na letišti v Praze před skupinou leteckých fanoušků"
              fill
              sizes="(max-width: 756px) calc(100vw - 36px), 720px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <figcaption style={{ marginTop: 7, fontSize: 11, lineHeight: 1.5, color: 'var(--text-dim)' }}>
            Přílet A380 sledovaný z veřejně přístupného místa u pražského letiště. Foto: Pavla Zimmermannová / FlyQueens, 26. října 2025.
          </figcaption>
        </figure>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Najděte EK139 nebo EK140 na mapě</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Vyhledejte číslo letu a podívejte se na poslední dostupnou polohu. Typ letadla a stav letu před cestou
            ověřte také přímo u Emirates nebo na tabuli Letiště Praha.
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

        <h2 style={S.h2}>Časté otázky</h2>
        <h3 style={S.h3}>Létá nyní A380 pravidelně do Prahy?</h3>
        <p style={S.p}>
          Aktuální oficiální rozpis Emirates při kontrole 13. září 2026 uváděl Boeing 777. Nasazení se může změnit,
          proto ověřte svůj konkrétní den.
        </p>
        <h3 style={S.h3}>Je Emirates totéž jako Dubai Airlines?</h3>
        <p style={S.p}>
          Emirates je letecká společnost sídlící v Dubaji. „Dubai Airlines“ není její oficiální název.
        </p>
        <h3 style={S.h3}>Jaké číslo má let Emirates do Prahy?</h3>
        <p style={S.p}>Přímý let z Dubaje do Prahy je EK139. Z Prahy do Dubaje létá EK140.</p>

        <AuthorCard />

        <RelatedReading
          items={[
            {
              href: '/blog/starlux-airlines-praha',
              eyebrow: 'Nová dálková linka',
              title: 'STARLUX Airlines v Praze a Airbus A350',
              description: 'Letový řád nové přímé linky do Tchaj-peje a tipy ke sledování.',
            },
            {
              href: '/blog/jak-sledovat-let-podle-cisla',
              eyebrow: 'Praktický návod',
              title: 'Jak sledovat konkrétní let podle čísla',
              description: 'Rozdíl mezi číslem letu, volacím znakem a registrací letadla.',
            },
            {
              href: '/blog/letiste-praha-zive',
              eyebrow: 'Praha živě',
              title: 'Přílety, odlety a živá mapa Letiště Praha',
              description: 'Jak správně kombinovat mapu s oficiální letištní tabulí.',
            },
          ]}
        />

        <SourcesBox
          sources={[
            { label: 'Emirates: aktuální letový řád Praha–Dubaj', href: 'https://www.emirates.com/cz/czech/destinations/prg/dxb/flights-from-prague-to-dubai/' },
            { label: 'Letiště Praha: oznámení návratu A380 na pravidelnou linku v prosinci 2024', href: 'https://cz.linkedin.com/posts/prague-airport_n%C3%A1vrat-super-jumba-spole%C4%8Dnosti-emirates-activity-7269976226398617600-0Ilt' },
            { label: 'Emirates: technické údaje a konfigurace Airbusu A380', href: 'https://www.emirates.com/cz/czech/experience/our-fleet/a380/' },
          ]}
          note="Aktuální typ letadla, časy a frekvence ověřeny 13. září 2026. Typ letadla se může změnit i po rezervaci."
        />
      </div>
    </main>
  )
}
