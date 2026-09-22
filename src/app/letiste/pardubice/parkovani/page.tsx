import type { Metadata } from 'next'
import Link from 'next/link'
import { ParkingCrossLinks } from '@/components/UI/ParkingCrossLinks'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { socialMetadata } from '@/lib/socialMetadata'

export const metadata: Metadata = {
  title: 'Parkování letiště Pardubice: zdarma u terminálu (2026)',
  description: 'Parkování u Letiště Pardubice je podle letiště zdarma a bez rezervace. Kde najdete P1, P2 a K+R, kolik je míst a jak se dostat k terminálu.',
  alternates: { canonical: 'https://www.flyqueens.cz/letiste/pardubice/parkovani' },
  ...socialMetadata({
    title: 'Parkování letiště Pardubice: zdarma u terminálu | FlyQueens',
    description: 'P1, P2 a krátkodobé K+R přehledně podle oficiálních informací letiště.',
    url: 'https://www.flyqueens.cz/letiste/pardubice/parkovani',
    type: 'article',
  }),
}

const S = {
  h2: { fontFamily: 'Archivo, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function PardubiceParkingPage() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/letiste/pardubice" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Letiště Pardubice</Link>
          {' · Parkování'}
        </nav>

        <h1 style={{ fontFamily: 'Archivo, sans-serif', fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 6px' }}>
          Parkování letiště Pardubice: zdarma a blízko terminálu
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', margin: '0 0 22px' }}>
          Dlouhodobé parkování P1 a P2 je podle oficiálního webu letiště bezplatné, bez rezervace a přibližně 100 metrů od Terminálu Jana Kašpara. Pro krátké zastavení slouží K+R před hlavní budovou.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Na P1 a P2 zaparkujete zdarma a bez předchozí rezervace. Parkoviště mají dohromady uváděnou kapacitu 1 200 míst a leží asi 100 metrů od terminálu. K+R je určeno jen pro naložení nebo vyložení a maximální stání 20 minut.
          </p>
        </div>

        <h2 style={S.h2}>P1 a P2 pro delší stání</h2>
        <p style={S.p}>
          Obě odstavné plochy jsou určené pro dlouhodobé parkování. Letiště uvádí, že jsou zdarma a není potřeba rezervace. Proto zde nedoporučujeme placenou alternativu ani partnerský odkaz, který by pro cestujícího nedával smysl.
        </p>
        <p style={S.p}>
          Bezplatné parkování neznamená hlídanou garáž. Před odchodem zkontrolujte uzamčení auta, nenechávejte cennosti na viditelném místě a řiďte se aktuálním značením v areálu.
        </p>

        <h2 style={S.h2}>K+R pro vysazení a vyzvednutí</h2>
        <p style={S.p}>
          Místa K+R jsou přímo před hlavní budovou a slouží k rychlému naložení nebo vyložení cestujících. Maximální doba stání je 20 minut. Pokud chcete doprovodit cestujícího do terminálu nebo čekáte na zpožděný přílet, použijte raději P1 či P2.
        </p>

        <h2 style={S.h2}>Kolik času si nechat</h2>
        <p style={S.p}>
          Letiště doporučuje příjezd dvě hodiny před plánovaným odletem. Přestože je parkoviště blízko, počítejte s časem na nalezení místa, vyložení zavazadel a bezpečnostní kontrolu. Stav letu ověřte na <a href="https://www.airport-pardubice.cz/letovy-rad/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>oficiální tabuli odletů a příletů</a>.
        </p>

        <h2 style={S.h2}>Alternativa bez auta</h2>
        <p style={S.p}>
          Linka MHD 90 spojuje hlavní nádraží se zastávkou přímo u terminálu. Protože jízdní řád reaguje na sezonní provoz, zkontrolujte konkrétní spoj před cestou na webu dopravního podniku.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '28px 0 10px' }}>
          <strong style={{ display: 'block', fontFamily: 'Archivo, sans-serif', fontSize: 15, marginBottom: 6 }}>Než vyrazíte</strong>
          <p style={{ ...S.p, marginBottom: 12 }}>Na živé mapě můžete zkontrolovat poslední dostupné polohy letadel nad Českem. Skutečný čas a zpoždění vždy potvrďte u letiště.</p>
          <Link href="/radar" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--on-gold)', fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>Otevřít živou mapu</Link>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 22 }}>Ověřeno 12. září 2026. Pravidla v areálu a dopravní spojení se mohou změnit; před cestou zkontrolujte oficiální zdroj.</p>
        <SourcesBox
          sources={[
            { label: 'Letiště Pardubice: doprava a parkování', href: 'https://www.airport-pardubice.cz/doprava-a-parkovani/' },
            { label: 'Letiště Pardubice: informace pro cestující', href: 'https://www.airport-pardubice.cz/cestujici/' },
            { label: 'Dopravní podnik města Pardubic: jízdní řády', href: 'https://www.dpmp.cz/cestovani-mhd/jizdni-rady/' },
          ]}
          note="Kapacita, vzdálenost, bezplatné stání a limit K+R ověřeny na oficiálním webu letiště 12. září 2026."
        />
        <ParkingCrossLinks current="pardubice" />
      </div>
    </main>
  )
}
