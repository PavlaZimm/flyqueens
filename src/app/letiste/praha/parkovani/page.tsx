import type { Metadata } from 'next'
import Link from 'next/link'
import { ParkingCrossLinks } from '@/components/UI/ParkingCrossLinks'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { AffiliateParkingCta } from '@/components/Affiliate/AffiliateParkingCta'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Parkování letiště Praha: ceny a kde zaparkovat levně (2026)',
  description:
    'Ověřené možnosti parkování u Letiště Václava Havla, expresní stání zdarma, vzdálenosti a proč cenu dlouhodobého parkování ověřit pro konkrétní termín.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/praha/parkovani' },
  ...socialMetadata({
    title: 'Parkování letiště Praha: ceny a kde zaparkovat levně',
    description:
      'Ověřené možnosti parkování, vzdálenosti, expresní stání a tipy na rezervaci.',
    url: 'https://www.flyqueens.cz/letiste/praha/parkovani',
    type: 'article',
  }),
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
        text: 'Dlouhodobé ceny závisejí na termínu, dostupnosti a typu parkoviště. Konečnou cenu ukáže rezervační systém po zadání konkrétního termínu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kde se dá u letiště Praha parkovat zdarma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na expresních parkovištích P1, P2 nebo PB je prvních 10 minut jednou za 24 hodin zdarma. Nejde o bezplatné dlouhodobé parkování; do 15 minut je podle letiště sazba 50 Kč.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vyplatí se rezervovat parkování dopředu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oficiální letiště uvádí, že online rezervace může být až o 50 % levnější a rezervaci lze zrušit zdarma. Konkrétní cenu a storno podmínky zkontrolujte před potvrzením.',
      },
    },
  ],
}

const S = {
  page: { minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' },
  wrap: { maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' },
  h1: { fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, letterSpacing: 0.3, margin: '18px 0 6px' },
  lead: { fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' },
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '34px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function ParkovaniPrahaPage() {
  return (
    <main style={S.page}>
      { }
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }} />

      <div style={S.wrap}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)', letterSpacing: 0.3 }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste/praha" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště Praha</Link>
          {' · Parkování'}
        </nav>

        <h1 style={S.h1}>Parkování letiště Praha: kolik stojí a kde zaparkovat levně</h1>
        <p style={S.lead}>
          U Letiště Václava Havla si můžete vybrat expresní stání, několik oficiálních dlouhodobých
          parkovišť i služby třetích stran. Dlouhodobé ceny jsou dynamické, takže je porovnáváme podle
          typu a vzdálenosti a přesnou částku necháváme na rezervaci pro konkrétní termín.
        </p>

        {/* Rychlá odpověď — cílí na featured snippet */}
        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            P1, P2 a PB EXPRESS nabízí 10 minut zdarma jednou za 24 hodin; do 15 minut stojí 50 Kč.
            Krátkodobé PC COMFORT stojí 80 Kč za hodinu. U dlouhodobého parkování se cena mění podle
            termínu a dostupnosti; přesnou částku ukáže rezervace až po zadání data příjezdu a odjezdu.
          </p>
        </div>

        <h2 style={S.h2}>Srovnání oficiálních možností</h2>
        <p style={S.p}>Přesnou dlouhodobou cenu ukáže rezervační systém až po zadání termínu. Tohle jsou ověřené rozdíly mezi parkovišti.</p>

        <div style={{ overflowX: 'auto', margin: '0 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Kde</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Typ</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>K terminálu</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['PA SMART', 'dlouhodobé, online', '3 min pěšky k T2'],
                ['PD HOLIDAY', 'dlouhodobé, online', '10 min pěšky'],
                ['PC COMFORT', 'dlouhodobé i hodinové', 'před T1, krytá lávka k T2'],
                ['PB ECONOMY', 'venkovní, online', 'před přílety T2'],
              ].map(([kde, cena, dist], i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', fontWeight: 600 }}>{kde}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>{cena}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{dist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-dim)', margin: '4px 0 0' }}>Uvedené doby chůze a typy parkovišť pocházejí z oficiálního přehledu letiště.</p>

        <h2 style={S.h2}>Přímo u terminálu: expresní a hodinové stání</h2>
        <p style={S.p}>
          P1 EXPRESS je před Terminálem 1, P2 EXPRESS před odlety Terminálu 2 a PB EXPRESS před jeho přílety.
          Každé nabízí 10 minut zdarma jednou za 24 hodin; do 15 minut stojí 50 Kč. Pokud potřebujete
          delší neurčenou dobu, letiště uvádí PC COMFORT s tarifem 80 Kč za hodinu.
        </p>

        <h2 style={S.h2}>Soukromá parkoviště s odvozem</h2>
        <p style={S.p}>
          Kolem letiště fungují i provozovatelé s transferem. Cenu ani úroveň zabezpečení nelze zobecnit:
          ověřte celkovou cenu pro konkrétní termín, četnost odvozu, storno a podmínky odpovědnosti za auto.
          Do času k odbavení započítejte rezervu na transfer.
        </p>

        {/* Affiliate CTA — aktivuje se po registraci do partnerského programu (Parkos / ParkVia) */}
        <div style={{ background: 'rgba(245,184,61,0.06)', border: '1px solid rgba(245,184,61,0.25)', borderRadius: 12, padding: '14px 16px', margin: '14px 0' }}>
          <p style={{ ...S.p, margin: 0, color: 'var(--text-muted)' }}>
            Porovnávejte stejnou délku pobytu a stejný rozsah služeb. Nejnižší uvedená cena nemusí zahrnovat
            transfer, pozdní příjezd nebo změnu rezervace.
          </p>
        </div>

        <h2 style={S.h2}>Dá se u letiště parkovat zdarma?</h2>
        <p style={S.p}>
          Pro vysazení nebo vyzvednutí ano: na P1, P2 nebo PB EXPRESS je 10 minut zdarma jednou za 24 hodin.
          Oficiální web bezplatné dlouhodobé parkování nenabízí. Parkování v okolních ulicích zde
          nedoporučujeme, protože pravidla a místní omezení se mohou měnit.
        </p>

        <p style={S.p}>
          Přijíždíte už večer před odletem? Porovnejte také <Link href="/letiste/praha/ubytovani">ubytování u letiště Praha</Link>.
          U hotelového balíčku si ověřte, zda parkování platí i po celou dobu vaší cesty.
        </p>

        <h2 style={S.h2}>Kdy a jak rezervovat</h2>
        <p style={S.p}>
          Letiště uvádí, že online rezervace může být až o 50 % levnější a nabízí bezplatné zrušení rezervace.
          Před zaplacením zkontrolujte konkrétní storno podmínky, rozměrová omezení vozu a správný terminál.
        </p>

        {/* FlyQueens diferenciace — živá data, co konkurence nemá */}
        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '30px 0 10px' }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Než vyrazíte na letiště</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Mrkněte, co se zrovna děje ve vzduchu nad Prahou a jaké je na letišti počasí. Živá mapa ukáže
            poslední dostupné polohy letadel; kliknutí na letiště přidá aktuální METAR.
          </p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu letadel
          </Link>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 24 }}>
          Ověřeno 13. září 2026. Dlouhodobé ceny jsou dynamické; aktuální částku vždy ověřte v rezervaci.
        </p>
        <AffiliateParkingCta airport="praha" />
        <SourcesBox
          sources={[
            { label: 'Letiště Praha — oficiální ceník parkování', href: 'https://www.prg.aero/parkovani' },
            { label: 'AeroParking — aktuální nabídka a rezervace', href: 'https://www.aeroparking.cz/' },
          ]}
          note="Sazby expresního a hodinového stání a princip dynamických cen dlouhodobého parkování ověřeny 13. září 2026."
        />
        <ParkingCrossLinks current="praha" />
      </div>
    </main>
  )
}
