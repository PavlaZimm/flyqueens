import type { Metadata } from 'next'
import Link from 'next/link'
import { getPost } from '@/lib/blog'

const post = getPost('letiste-praha-zive')!

export const metadata: Metadata = {
  title: 'Letiště Praha živě: jak sledovat letadla nad Ruzyní online',
  description:
    'Jak sledovat letiště Praha online. Rozdíl mezi webkamerou a živou mapou letadel, co všechno se dá vyčíst z letu a kde to vidíte zdarma.',
  alternates: { canonical: 'https://www.flyqueens.cz/blog/letiste-praha-zive' },
  openGraph: {
    title: 'Letiště Praha živě: jak sledovat letadla nad Ruzyní online',
    description: 'Webkamera ukáže kus plochy, živá mapa každé letadlo ve vzduchu. Jak to funguje.',
    url: 'https://www.flyqueens.cz/blog/letiste-praha-zive',
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
  mainEntityOfPage: 'https://www.flyqueens.cz/blog/letiste-praha-zive',
}

const S = {
  h2: { fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 800, margin: '32px 0 10px' },
  p: { fontSize: 15, lineHeight: 1.75, margin: '0 0 12px' },
} as const

export default function ZiveArticle() {
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
          Letiště Praha živě: jak sledovat letadla nad Ruzyní online
        </h1>
        <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 22 }}>{post.dateLabel}</div>

        <p style={S.p}>
          Někdo čeká na babičku z Barcelony a chce vědět, jestli už doletěla. Někoho jen baví koukat, co se
          nad hlavou děje. Sledovat Ruzyň online jde dvěma způsoby a každý ukáže něco jiného. Webkamera vám dá
          obrázek kusu plochy. Živá mapa vám ukáže úplně každé letadlo ve vzduchu, i to, co je zrovna nad Kladnem.
        </p>

        <div style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 12, padding: '14px 16px', margin: '0 0 8px' }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 6 }}>Rychlá odpověď</div>
          <p style={{ ...S.p, margin: 0 }}>
            Webkamera ukazuje statický záběr terminálu nebo dráhy. Živá mapa letadel funguje jinak: letadla samy
            vysílají svoji polohu, výšku a rychlost, a mapa je vykresluje v reálném čase. Kliknete na letadlo
            a zjistíte odkud letí, kam míří a v jaké je výšce.
          </p>
        </div>

        <h2 style={S.h2}>Webkamera versus živá mapa</h2>
        <p style={S.p}>
          Webkamera je fajn na atmosféru. Vidíte počasí, provoz na stojánce, občas přistání. Má ale dvě slabiny:
          záběr je pevný a v noci nebo v mlze neuvidíte skoro nic. Živá mapa tyhle limity nemá. Ukáže i letadlo
          deset kilometrů daleko ve tmě, protože nepracuje s obrazem, ale s daty.
        </p>

        <h2 style={S.h2}>Jak vlastně mapa ví, kde letadlo je?</h2>
        <p style={S.p}>
          Skoro každé dopravní letadlo dnes vysílá signál ADS-B. Několikrát za vteřinu odešle svoji polohu,
          výšku, rychlost a identifikaci. Ten signál zachytávají pozemní přijímače, často i amatérské, a data
          se slévají dohromady. Proto vidíte letadlo nad Prahou i nad Atlantikem, aniž by o tom kdokoli musel
          ručně informovat.
        </p>

        <h2 style={S.h2}>Co se dá z letu vyčíst</h2>
        <p style={S.p}>
          Když na letadlo kliknete, dostanete víc než jen tečku na mapě. Uvidíte volací znak, typ stroje,
          výšku v metrech i letovou hladinu, rychlost a kurz. U linkových letů většinou i trasu, tedy odkud
          letadlo vzlétlo a kde přistane. Zajímavá je vertikální rychlost: podle ní poznáte, jestli stroj
          stoupá, klesá nebo je v cestovní fázi. Letadlo klesající nad Kladnem míří skoro jistě na Ruzyň.
        </p>

        <h2 style={S.h2}>Kdy je nad Prahou nejvíc rušno</h2>
        <p style={S.p}>
          Provoz na Ruzyni má dvě špičky. Ráno mezi šestou a devátou odlétá vlna linek do Evropy, odpoledne
          se to samé vrací. V létě je hustota výrazně vyšší než v zimě, o prázdninách přibývají charterové lety
          k moři. Když chcete vidět nabitou mapu, zkuste červencové ráno.
        </p>

        <h2 style={S.h2}>Vyplatí se sledovat konkrétní let?</h2>
        <p style={S.p}>
          Pokud čekáte na někoho z letiště, ano. Na mapě vidíte, kde letadlo právě je a kolik mu zbývá,
          což je přesnější než odletová tabule, která se aktualizuje po skocích. Jedno upozornění: data mají
          zpoždění pár vteřin a nad oblastmi bez pokrytí občas letadlo na chvíli zmizí. Nic se neděje, za pár
          minut se objeví zpátky.
        </p>

        <div style={{ background: 'var(--midnight-2)', border: '1px solid var(--border-mid)', borderRadius: 12, padding: '16px 18px', margin: '24px 0 10px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Podívejte se na Prahu právě teď</div>
          <p style={{ ...S.p, marginBottom: 12 }}>
            Živá mapa FlyQueens ukazuje letadla nad Českem v reálném čase. Zdarma, bez registrace.
            Klikněte na kterékoli letadlo a uvidíte jeho trasu, výšku i typ.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link href="/" style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--cta-text)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Otevřít živou mapu
            </Link>
            <Link href="/letiste/praha" style={{ display: 'inline-block', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', padding: '10px 18px', borderRadius: 10, textDecoration: 'none' }}>
              Vše o letišti Praha
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
