import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Parkování u letiště Praha: ceny a kde zaparkovat levně (2026)',
  description:
    'Kolik stojí parkování u Letiště Václava Havla, kde je nejlevněji a kde zdarma. Srovnání oficiálních i soukromých parkovišť, ceny, vzdálenosti a tipy na rezervaci.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/praha/parkovani' },
  openGraph: {
    title: 'Parkování u letiště Praha: ceny a kde zaparkovat levně',
    description:
      'Srovnání parkovišť u Letiště Václava Havla, ceny, vzdálenosti a tipy na rezervaci.',
    url: 'https://www.flyqueens.cz/letiste/praha/parkovani',
    type: 'article',
  },
}

// FAQ schema — bohatší výsledek v Googlu
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kolik stojí parkování u letiště Praha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oficiální kryté parkoviště AeroParking vyjde s online rezervací zhruba od 790 Kč za 8 dní. Soukromá parkoviště s kyvadlovou dopravou startují okolo 700 Kč za týden. Parkování přímo u terminálu je nejdražší, počítejte s 300 Kč za první den a 500 Kč za každý další.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kde se dá u letiště Praha parkovat zdarma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Přímo u letiště zdarma nezaparkujete. Nejblíž se dá stát zadarmo v ulicích Nebušic nebo u nákupních center pár kilometrů od letiště, ale na pár hodin, ne na dovolenou. Pro delší odstavení je levnější vzdálené parkoviště s odvozem než riskovat odtah.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vyplatí se rezervovat parkování dopředu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ano. Online rezervace bývá i o polovinu levnější než platba na místě a o prázdninách se parkoviště u terminálu plní. Rezervovat stačí obvykle dvě hodiny předem, u oficiálního parkoviště jde zrušení zdarma i minutu před příjezdem.',
      },
    },
  ],
}

const S = {
  page: { minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' },
  wrap: { maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' },
  h1: { fontFamily: 'Syne, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, letterSpacing: 0.3, margin: '18px 0 6px' },
  lead: { fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' },
  h2: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, margin: '34px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function ParkovaniPrahaPage() {
  return (
    <main style={S.page}>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div style={S.wrap}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 0.3 }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste/praha" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště Praha</Link>
          {' · Parkování'}
        </nav>

        <h1 style={S.h1}>Parkování u letiště Praha: kolik stojí a kde zaparkovat levně</h1>
        <p style={S.lead}>
          Přiletíte v půl šesté ráno po nočním letu a první starost je banální. Kde jste nechali auto
          a kolik za něj zaplatíte. U Letiště Václava Havla se dá parkovat od zhruba 700 Kč za týden
          na vzdáleném parkovišti až po stovky korun denně přímo u terminálu. Rozdíl je velký, tak se
          vyplatí vědět, co si vybrat. Projdeme ceny, vzdálenosti a kdy má smysl rezervovat dopředu.
        </p>

        {/* Rychlá odpověď — cílí na featured snippet */}
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Nejlevněji zaparkujete na soukromém parkovišti s kyvadlovou dopravou, kolem 700 Kč za týden.
            Oficiální kryté parkoviště startuje s rezervací okolo 790 Kč za 8 dní. Stání přímo u terminálu
            je nejdražší: 300 Kč první den, pak 500 Kč za každý další. Krátce zastavit lze za 80 Kč na hodinu,
            do 15 minut za 50 Kč.
          </p>
        </div>

        <h2 style={S.h2}>Srovnání: kolik zaplatíte za týden</h2>
        <p style={S.p}>Orientační ceny za sedm dní odstavení, stav červenec 2026. U soukromých parkovišť se cena mění podle sezóny, v létě bývá vyšší.</p>

        <div style={{ overflowX: 'auto', margin: '0 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Kde</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Cena / týden</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>K terminálu</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Soukromé parkoviště + odvoz', 'od ~700 Kč', 'kyvadlová doprava, 5–10 min'],
                ['AeroParking (oficiální, kryté)', 'od ~790 Kč / 8 dní', 'pěšky nebo autobus'],
                ['Přímo u terminálu (P1, P2)', '2000 Kč a víc', 'pěšky 3–5 min'],
              ].map(([kde, cena, dist], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600 }}>{kde}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{cena}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{dist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', margin: '4px 0 0' }}>Ceny se v čase mění, aktuální částku vidíte vždy až při rezervaci. Ověřte na stránkách provozovatele.</p>

        <h2 style={S.h2}>Přímo u terminálu: rychlé, ale drahé</h2>
        <p style={S.p}>
          Parkoviště P1 a P2 máte od auta k odletové hale za tři až pět minut pěšky. To je jejich jediná výhoda.
          Za pohodlí se platí: první den vyjde na 300 Kč, každý další na 500 Kč. Na víkendovku ještě dobré,
          na dvoutýdenní dovolenou z toho bude přes sedm tisíc. Krátké vyzvednutí příbuzného ale zvládnete
          za 80 Kč na hodinu a do 15 minut jen za 50 Kč.
        </p>

        <h2 style={S.h2}>Soukromá parkoviště s odvozem: nejlevnější volba</h2>
        <p style={S.p}>
          Pár kilometrů od letiště jsou hlídaná parkoviště, která auto odvezou dodávkou k terminálu a po
          návratu zase vyzvednou. Týden vyjde zhruba od 700 Kč, měsíc kolem tří tisíc. V ceně bývá ostraha,
          kamery a někdy i dětská autosedačka do odvozu. Nevýhoda je čas: k odbavení připočtěte deset až
          patnáct minut na kyvadlovou dopravu, takže nepřijíždějte na poslední chvíli.
        </p>

        {/* Affiliate CTA — aktivuje se po registraci do partnerského programu (Parkos / ParkVia) */}
        <div style={{ background: 'rgba(253,224,71,0.06)', border: '1px solid rgba(253,224,71,0.25)', borderRadius: 12, padding: '14px 16px', margin: '14px 0' }}>
          <p style={{ ...S.p, margin: 0, color: 'var(--text-muted)' }}>
            Většina těchto parkovišť jde rezervovat online dopředu za nižší cenu. Srovnat volná místa a ceny
            na konkrétní termín se vyplatí, o prázdninách se blízká parkoviště plní.
          </p>
        </div>

        <h2 style={S.h2}>Dá se u letiště parkovat zdarma?</h2>
        <p style={S.p}>
          Přímo u letiště ne. Zadarmo postojíte pár hodin v okolních ulicích v Nebušicích nebo u nákupních
          center vzdálených několik kilometrů, ale to je řešení na schůzku, ne na dovolenou. Na delší
          odstavení se vyplatí radši vzdálené parkoviště s odvozem než hlídat, jestli vám auto neodtáhnou.
        </p>

        <h2 style={S.h2}>Kdy a jak rezervovat</h2>
        <p style={S.p}>
          Online rezervace bývá i o polovinu levnější než platba na místě. Stačí ji udělat zhruba dvě hodiny
          před příjezdem. U oficiálního parkoviště jde zrušení zdarma i minutu předem, takže se nemáte čeho
          bát. Jediné pravidlo: v létě a o svátcích rezervujte s předstihem, jinak u terminálu nezbyde místo.
        </p>

        {/* FlyQueens diferenciace — živá data, co konkurence nemá */}
        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '30px 0 10px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Než vyrazíte na letiště</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Mrkněte, co se zrovna děje ve vzduchu nad Prahou a jaké je na letišti počasí. Živá mapa ukáže
            letadla v reálném čase, klik na letiště přidá aktuální METAR.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu letadel
          </Link>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 24 }}>
          Aktualizováno v červenci 2026. Ceny jsou orientační, aktuální částku vždy ověřte u provozovatele.
        </p>
      </div>
    </main>
  )
}
