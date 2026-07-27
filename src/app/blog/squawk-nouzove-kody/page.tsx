import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'
import { SourcesBox } from '@/components/UI/SourcesBox'

const post = getPost('squawk-nouzove-kody')!

export const metadata: Metadata = {
  title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
  description:
    'Co znamená squawk 7700, 7600 a 7500, jak funguje odpovídač v letadle a jak nouzový let poznáte na živé mapě. Srozumitelně a s příklady.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody' },
  openGraph: {
    title: 'Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel',
    description: 'Co znamenají nouzové squawk kódy a jak nouzový let poznáte na mapě.',
    url: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  datePublished: post.date,
  dateModified: post.date,
  author: { '@type': 'Organization', name: 'FlyQueens' },
  publisher: { '@type': 'Organization', name: 'FlyQueens' },
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/squawk-nouzove-kody',
}

const S = {
  h2: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function SquawkArticle() {
  return (
    <main style={{ minHeight: '100dvh', background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
      { }
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 18px 60px' }}>
        <nav style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>FlyQueens</Link>
          {' · '}
          <Link href="/blog" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>Blog</Link>
        </nav>

        <div style={{ fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: 'var(--gold)', margin: '18px 0 8px' }}>{post.tag}</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 29, fontWeight: 800, lineHeight: 1.15, margin: '0 0 6px' }}>
          Squawk 7700, 7600, 7500: co znamenají nouzové kódy letadel
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>{post.dateLabel}</div>

        <p style={S.p}>
          Nad Atlantikem se ztratí rádiové spojení. Pilot sáhne na malý panel, naladí čtyři číslice a řízení
          letového provozu okamžitě ví, co se děje, aniž by padlo jediné slovo. Tenhle čtyřmístný kód se
          jmenuje squawk a tři z nich znamenají problém. Pojďme si je projít.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            <b>7700</b> je obecná nouze, letadlo hlásí vážný problém. <b>7600</b> znamená výpadek rádia,
            pilot slyší nebo mluví, ale spojení nefunguje. <b>7500</b> je únos. Všechny tři si řízení hned
            všimne, protože se let na radaru zvýrazní.
          </p>
        </div>

        <h2 style={S.h2}>Co je squawk a odpovídač</h2>
        <p style={S.p}>
          Každé dopravní letadlo má na palubě odpovídač, anglicky transponder. Je to krabička, která na dotaz
          radaru odpoví číslem a výškou. To číslo je právě squawk, čtyři cifry od 0000 do 7777. Běžně ho letadlu
          přidělí řízení, aby ho na obrazovce rozlišilo od ostatních. Pár kódů má ale pevný, celosvětově platný
          význam a ty se nepletou s ničím jiným.
        </p>

        <h2 style={S.h2}>7700: obecná nouze</h2>
        <p style={S.p}>
          Nejsilnější signál. Pilot ho použije, když se děje něco vážného a nemá čas nebo možnost to hned
          vysvětlovat do vysílačky. Může jít o problém s motorem, tlakem v kabině, nemocného cestujícího nebo
          cokoli, co vyžaduje přednost. Jakmile letadlo naladí 7700, řízení mu uvolní cestu a připraví nejbližší
          vhodné letiště. Na většině sledovacích map takový let zčervená.
        </p>

        <h2 style={S.h2}>7600: výpadek rádia</h2>
        <p style={S.p}>
          Méně dramatické, o to častější. Znamená, že selhalo spojení. Pilot dál letí a řídí letadlo normálně,
          jen se s ním nedá domluvit slovem. Řízení pak postupuje podle předem daných pravidel a počítá s tím,
          že posádka poletí podle posledního povolení. Většinou se to vyřeší přeladěním na záložní frekvenci
          nebo restartem rádia.
        </p>

        <h2 style={S.h2}>7500: únos nebo protiprávní čin</h2>
        <p style={S.p}>
          Kód, který nikdo nechce vidět. Signalizuje, že letadlo je pod nezákonným nátlakem. Řízení na něj reaguje
          zvláštním postupem a spojí se s dalšími složkami. Naštěstí je v praxi extrémně vzácný. Piloti se ho
          při výcviku učí zadat opatrně, aby ho nenastavili omylem.
        </p>

        <h2 style={S.h2}>A co běžné kódy?</h2>
        <p style={S.p}>
          Zbytek squawků jsou pracovní čísla. V Evropě letadlo bez konkrétního přidělení často vysílá 7000, což
          je kód pro let podle vidu. Číslo 2000 se objeví, když stroj vstoupí do oblasti bez radaru. Nic z toho
          neznamená problém, je to jen způsob, jak se letadla na obrazovce od sebe odliší.
        </p>

        <h2 style={S.h2}>Jak nouzový let poznáte na mapě</h2>
        <p style={S.p}>
          FlyQueens sleduje squawk kódy živě. Když se nad sledovanou oblastí objeví letadlo se 7700, 7600 nebo
          7500, zvýrazní se a naskočí upozornění. Většinou nejde o nic hrozného, spousta 7600 se do minuty vyřeší,
          ale je zajímavé vidět to v reálném čase.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Podívejte se, co letí právě teď</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Živá mapa ukáže letadla nad Českem v reálném čase. Nouzové squawky se na ní zvýrazní automaticky.
          </p>
          <Link href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
            Otevřít živou mapu
          </Link>
        </div>

        <SourcesBox
          sources={[
            { label: 'SKYbrary — Transponder (nouzové kódy 7500, 7600, 7700)', href: 'https://www.skybrary.aero/articles/transponder' },
            { label: 'ICAO — mezinárodní standardy pro odpovídače', href: 'https://www.icao.int/' },
            { label: 'Řízení letového provozu ČR — letecká informační příručka (AIP)', href: 'https://aim.rlp.cz/' },
          ]}
          note="Kódy 7500, 7600 a 7700 jsou dané mezinárodním standardem a nemění se. Postupy řízení se liší podle státu."
        />
      </div>
    </main>
  )
}
