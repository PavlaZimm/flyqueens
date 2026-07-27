import type { Metadata } from 'next'
import Link from 'next/link'
import { ParkingCrossLinks } from '@/components/UI/ParkingCrossLinks'
import { SourcesBox } from '@/components/UI/SourcesBox'

export const metadata: Metadata = {
  title: 'Parkování u letiště Brno-Tuřany: ceny a kde zaparkovat levně',
  description:
    'Kolik stojí parkování u letiště Brno-Tuřany. Oficiální ceník, soukromá parkoviště s odvozem, srovnání cen a tipy, kdy rezervovat.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/brno/parkovani' },
  openGraph: {
    title: 'Parkování u letiště Brno-Tuřany: ceny a kde zaparkovat levně',
    description: 'Oficiální ceník, soukromá parkoviště s odvozem a srovnání cen.',
    url: 'https://www.flyqueens.cz/letiste/brno/parkovani',
    type: 'article',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Kolik stojí parkování u letiště Brno?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na oficiálním dlouhodobém parkovišti zaplatíte 300 Kč za den. Týden vyjde na 1 300 Kč, patnáct dní na 2 500 Kč. Soukromá parkoviště s odvozem k terminálu startují výrazně níž, běžně kolem 50 až 150 Kč za den.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kolik stojí krátké parkování u terminálu v Brně?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hodina stojí 60 Kč, dvě hodiny 120 Kč. Od tří hodin výš se parkovné počítá už jako celý den, takže na vyzvednutí někoho z příletu se vejdete do dvou hodin.',
      },
    },
  ],
}

const S = {
  h2: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function ParkovaniBrnoPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
      { }
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · '}
          <Link href="/letiste/brno" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Brno</Link>
          {' · Parkování'}
        </nav>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Parkování u letiště Brno-Tuřany: kolik stojí a kde ušetříte
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Tuřany jsou malé letiště, takže od auta k odbavení to máte kousek. Rozdíl v ceně je ale i tady
          znát. Za týden na oficiálním parkovišti dáte 1 300 Kč, na soukromém klidně třetinu. Projdeme ceník
          i to, kdy se vyplatí co.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Oficiální dlouhodobé parkoviště stojí 300 Kč za den, týden 1 300 Kč a patnáct dní 2 500 Kč.
            Soukromá parkoviště s odvozem k terminálu jdou výrazně níž, běžně 50 až 150 Kč za den.
            Krátké stání u terminálu vyjde na 60 Kč za hodinu.
          </p>
        </div>

        <h2 style={S.h2}>Oficiální ceník</h2>
        <p style={S.p}>
          Dlouhodobé parkoviště letiště účtuje 300 Kč za den v režimu od pěti ráno do půlnoci. Týden vyjde
          na 1 300 Kč, patnáct dní na 2 500 Kč a jednadvacet dní na 3 450 Kč. Každý další den se pak připočítá
          po stovce, což je u delších cest příjemné.
        </p>
        <p style={S.p}>
          Krátkodobé stání u terminálu má vlastní sazbu: hodina 60 Kč, dvě hodiny 120 Kč. Pozor na jeden detail.
          Od tří hodin výš už se počítá celý den, takže když jedete jen pro někoho z příletu, hlídejte si čas.
        </p>

        <h2 style={S.h2}>Soukromá parkoviště s odvozem</h2>
        <p style={S.p}>
          Kolem letiště funguje několik hlídaných parkovišť, která vás k terminálu odvezou. Vzdálenosti jsou
          v Tuřanech krátké, takže transfer trvá pár minut. Ceny startují nízko, u některých provozovatelů
          od 50 Kč za den, běžně se pohybují do 150 Kč. Za týden tak zaplatíte i pod pět stovek, což je proti
          oficiálním 1 300 Kč velký rozdíl.
        </p>
        <p style={S.p}>
          Háček je v rezervaci. Menší parkoviště mají omezenou kapacitu a v létě se plní, takže se nespoléhejte
          na to, že přijedete a místo bude. Rezervujte aspoň den dopředu.
        </p>

        <h2 style={S.h2}>Co si vybrat</h2>
        <p style={S.p}>
          Jedete na víkend a nechcete řešit transfer? Oficiální parkoviště za 300 Kč na den je v pohodě.
          Letíte na dva týdny? Rozdíl mezi 2 500 Kč a zhruba tisícovkou na soukromém parkovišti stojí za těch
          pět minut navíc. Na vyzvednutí známého stačí krátkodobé stání do dvou hodin.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 20 }}>
          Ceny jsou orientační, stav červenec 2026. Aktuální částku vždy ověřte u provozovatele parkoviště.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '26px 0 10px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Než vyrazíte</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Mrkněte, co zrovna letí nad Brnem. Živá mapa ukazuje letadla v reálném čase, klik na letiště přidá aktuální počasí.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu
          </Link>
        </div>
        <SourcesBox
          sources={[
            { label: 'Letiště Brno-Tuřany — oficiální web', href: 'https://www.brno-airport.cz/' },
            { label: 'Ceníky parkovišť u letiště Brno podle srovnávačů (parkingunit.com)', href: 'https://parkingunit.com/parkovani-u-letiste-brno/' },
            { label: 'Ceny soukromých parkovišť podle ceníků provozovatelů' },
          ]}
          note="Ceny ověřeny v červenci 2026. U soukromých parkovišť se cena mění podle sezóny, ověřte ji před rezervací."
        />
        <ParkingCrossLinks current="brno" />
      </div>
    </main>
  )
}
