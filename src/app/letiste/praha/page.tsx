import type { Metadata } from 'next'
import Link from 'next/link'
import { AirportDiagram } from '@/components/Airport/AirportDiagram'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Letiště Praha: doprava, terminály, parkování a živá mapa',
  description:
    'Praktický průvodce Letištěm Václava Havla: trolejbus 59 a autobus 100, Airport Express, rozdíl mezi Terminálem 1 a 2, odbavení, parkování a živá mapa letadel.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/praha' },
  ...socialMetadata({
    title: 'Letiště Praha: doprava, terminály a parkování | FlyQueens',
    description: 'Jak se dostat na Ruzyň, ze kterého terminálu letíte a kdy dorazit na odbavení.',
    url: 'https://www.flyqueens.cz/letiste/praha',
  }),
}

const LINKS = [
  { href: '/letiste/praha/ubytovani', title: 'Ubytování u letiště', desc: 'Hotely u terminálů, pěší přístup a doprava před ranním odletem.', ready: true },
  { href: '/letiste/praha/planespotting', title: 'Planespotting: kam na letadla', desc: 'Vyhlídky Kněževes a Hostivice, vlastní fotografie a radar při pozorování.', ready: true },
  { href: '/letiste/praha/parkovani', title: 'Parkování a ceny', desc: 'Kde zaparkovat levně, srovnání parkovišť a tipy na rezervaci.', ready: true },
  { href: '/radar', title: 'Živá mapa nad Prahou', desc: 'Poslední dostupné polohy letadel. Kliknutí ukáže detail.', ready: true },
  { href: '/letiste/praha/odlety', title: 'Odlety a přílety', desc: 'Přehled dostupných letů a bezpečný odkaz na oficiální tabuli.', ready: true },
]

const airportJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Airport',
  name: 'Letiště Václava Havla Praha',
  alternateName: ['Ruzyně', 'Prague Airport'],
  iataCode: 'PRG',
  icaoCode: 'LKPR',
  url: 'https://www.prg.aero/',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'K Letišti 1019/6',
    addressLocality: 'Praha 6',
    postalCode: '161 00',
    addressCountry: 'CZ',
  },
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

const TRANSPORT = [
  ['Trolejbus 59', 'Nádraží Veleslavín (metro A)', 'tarif PID'],
  ['Autobus 100', 'Zličín (metro B)', 'tarif PID'],
  ['Noční 907 a 910', 'centrum, jízda kolem 45 minut', 'tarif PID'],
  ['Airport Express', 'Praha hlavní nádraží', 'vlastní jízdné'],
]

export default function PrahaHubPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(airportJsonLd).replace(/</g, '\\u003c') }} />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště</Link>
          {' · Praha'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Letiště Praha: doprava, terminály a parkování
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Letiště Václava Havla používá kódy PRG a LKPR a pořád se mu říká Ruzyně. Metro k němu nevede: z centra
          se na něj dostanete trolejbusem 59, autobusem 100 nebo vlakovým Airport Expressem. Provozní časy
          konkrétního letu vždy potvrďte na oficiální tabuli letiště.
        </p>

        <section aria-label="Rychlá fakta" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 9, marginBottom: 26 }}>
          {[
            ['PRG / LKPR', 'kódy letiště'],
            ['59 a 100', 'MHD z metra A a B'],
            ['T1 a T2', 'mimo Schengen / Schengen'],
            ['3 715 m', 'nejdelší dráha'],
          ].map(([value, label]) => (
            <div key={label} style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 10, padding: '13px 14px' }}>
              <strong style={{ display: 'block', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontSize: 17 }}>{value}</strong>
              <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: 11, marginTop: 3 }}>{label}</span>
            </div>
          ))}
        </section>

        <AirportDiagram icao="LKPR" iata="PRG" name="Letiště Václava Havla Praha" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LINKS.map((l) => {
            const inner = (
              <div style={{
                background: 'var(--midnight-2)', border: '1px solid var(--border-mid)',
                borderRadius: 12, padding: '14px 16px', opacity: l.ready ? 1 : 0.55,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 16, fontWeight: 800 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: l.ready ? 'var(--gold)' : 'var(--text-dim)', flexShrink: 0 }}>
                    {l.ready ? 'Otevřít →' : 'Brzy'}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4, lineHeight: 1.5 }}>{l.desc}</div>
              </div>
            )
            return l.ready
              ? <Link key={l.href} href={l.href} style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</Link>
              : <div key={l.href}>{inner}</div>
          })}
        </div>

        <h2 style={S.h2}>Jak se dostat na letiště Praha MHD</h2>
        <p style={S.p}>
          Na letiště nevede metro ani tramvaj, takže cesta městskou dopravou vždy znamená přestup na autobus
          nebo trolejbus. Ve dne jsou hlavní dvě linky, v noci další dvě. Na všech platí běžné jízdné PID.
        </p>

        <div style={{ overflowX: 'auto', margin: '0 0 8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-dim)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Spoj</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Kam jede</th>
                <th style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-mid)' }}>Jízdné</th>
              </tr>
            </thead>
            <tbody>
              {TRANSPORT.map(([line, where, fare]) => (
                <tr key={line}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 700 }}>{line}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)' }}>{where}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{fare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={S.p}>
          Pozor na číslo linky ve starších návodech: autobus <strong>119</strong> na Veleslavín už nejezdí.
          Od 6. března 2024 ho nahradil trolejbus <strong>59</strong> po stejné trase a podle Dopravního podniku
          se stejným jízdním řádem, jen s asi o 30 % větší kapacitou. Jezdí na něm nejdelší trolejbusy v Česku.
        </p>
        <p style={S.p}>
          V noci obsluhují letiště linky <strong>907</strong> a <strong>910</strong>. Obě jedou do centra zhruba
          45 minut a platí na nich běžné jízdné. Jízdenku koupíte v automatu v příletové hale obou terminálů,
          na přepážce dopravního podniku nebo v mobilu. Konkrétní spoj si před cestou ověřte v jízdním řádu PID.
        </p>

        <h2 style={S.h2}>Airport Express z hlavního nádraží</h2>
        <p style={S.p}>
          Airport Express jezdí přímo mezi letištěm a Prahou hlavním nádražím, takže se hodí hlavně při
          navazující cestě vlakem. Má ale <strong>vlastní jízdné</strong>: běžná jízdenka PID ani předplatní
          kupón na něm neplatí. Jízdenka vyjde na 200 Kč pro dospělého a 100 Kč pro dítě, zavazadlo se veze
          zdarma. V létě 2026 jezdil v denním provozu po dvaceti minutách a v noci jednou za hodinu; noční spoje
          navíc zastavují na Náměstí Republiky kvůli návaznosti na noční tramvaje.
        </p>

        <h2 style={S.h2}>Terminál 1, 2, 3 a 4: ze kterého letíte</h2>
        <p style={S.p}>
          Terminál si nevybíráte, určuje ho cílová destinace. <strong>Terminál 2</strong> odbavuje lety
          uvnitř schengenského prostoru, tedy většinu Evropy — letí se na občanský průkaz a pasová kontrola
          není. <strong>Terminál 1</strong> obsluhuje lety mimo Schengen, například do Británie, Spojených
          států nebo Dubaje, a projdete na něm navíc pasovou kontrolou.
        </p>
        <p style={S.p}>
          Terminály 1 a 2 na sebe navazují, přechod mezi nimi trvá pěšky zhruba pět až deset minut.
          <strong> Terminál 3</strong> slouží general aviation, tedy soukromým letadlům, byznys tryskáčům a
          části charterů; <strong>Terminál 4</strong> je vyhrazený pro VIP lety a státní návštěvy. Jako běžný
          cestující se tedy potkáte s jedničkou nebo dvojkou.
        </p>
        <p style={S.p}>
          Který terminál platí pro váš let, poznáte z letenky nebo z{' '}
          <Link href="/letiste/praha/odlety" style={{ color: 'var(--gold)' }}>přehledu odletů a příletů</Link>.
          U přestupu mezi schengenským a neschengenským letem počítejte s pasovou kontrolou navíc.
        </p>

        <h2 style={S.h2}>Kdy dorazit na odbavení</h2>
        <p style={S.p}>
          Odbavovací přepážky se podle letiště otevírají zpravidla dvě hodiny před odletem a uzavírají
          40 minut před ním. Samotný příjezd na letiště ale plánujte dřív: letiště doporučuje být na místě
          zhruba 2,5 hodiny před evropským letem a tři hodiny i více před dálkovým letem nebo s nadrozměrným
          zavazadlem. O prázdninách, brzy ráno a ve špičce letní sezony si přidejte rezervu.
        </p>
        <p style={S.p}>
          Online odbavení frontu u přepážky zkrátí, ale bezpečnostní kontrolu ani pasovou kontrolu neobejde.
          Rozhodující jsou vždy pokyny vašeho dopravce.
        </p>

        <h2 style={S.h2}>Autem a parkování</h2>
        <p style={S.p}>
          Na expresních parkovištích P1, P2 a PB je prvních 10 minut jednou za 24 hodin zdarma, takže na
          vysazení nebo vyzvednutí stačí. Pro delší stání se ceny liší podle parkoviště a termínu; srovnání
          i ověřené sazby najdete v{' '}
          <Link href="/letiste/praha/parkovani" style={{ color: 'var(--gold)' }}>přehledu parkování u Letiště Praha</Link>.
        </p>

        <h2 style={S.h2}>Co ukáže FlyQueens a co ověřit jinde</h2>
        <p style={S.p}>
          Na mapě FlyQueens vidíte poslední dostupnou ADS-B polohu, výšku, rychlost a směr zachycených letadel
          nad Prahou a okolím. Mapa nenahrazuje letištní tabuli: čas odletu a příletu, zpoždění, terminál,
          přepážku ani gate z ní nevyčtete. Tyhle údaje potvrzuje letiště nebo dopravce.
        </p>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>
          Doprava, terminály a časy odbavení ověřeny 14. září 2026. Jízdní řády, jízdné i doporučené časy
          příjezdu se mohou změnit.
        </p>
        <SourcesBox
          sources={[
            { label: 'Letiště Praha: MHD autobusem a trolejbusem na letiště', href: 'https://www.prg.aero/mhd-autobusem-na-letiste' },
            { label: 'Letiště Praha: Airport Express', href: 'https://www.prg.aero/airport-express' },
            { label: 'Letiště Praha: z jakého terminálu odletí můj let', href: 'https://www.prg.aero/faq-z-jakeho-terminalu-odleti-muj-let' },
            { label: 'Letiště Praha: odbavení cestujících a zavazadel', href: 'https://www.prg.aero/odbaveni-cestujicich' },
            { label: 'Dopravní podnik hl. m. Prahy: linku 119 nahradil trolejbus 59', href: 'https://www.dpp.cz/spolecnost/pro-media/tiskove-zpravy/detail/278_2522-pravidelny-provoz-nejdelsich-trolejbusu-v-cr-zahajen-autobusova-linka-c-119-se-ode-dneska-meni-na-trolejbusovou-c-59' },
            { label: 'Dopravní podnik hl. m. Prahy: noční provoz na letiště', href: 'https://www.dpp.cz/cestovani/doprava-na-letiste/nocni-provoz' },
            { label: 'Letiště Praha: oficiální přehled letů', href: 'https://www.prg.aero/prehled-letu?hour=all' },
          ]}
          note="Provozní čas, zpoždění a terminál vždy ověřte na oficiální tabuli nebo u dopravce."
        />
      </div>
    </main>
  )
}
