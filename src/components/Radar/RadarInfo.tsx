import Link from 'next/link'
import { SourcesBox } from '@/components/UI/SourcesBox'
import { RelatedReading } from '@/components/UI/RelatedReading'
import { SiteFooter } from '@/components/UI/SiteFooter'
import styles from '@/components/Article/Article.module.css'

// Čitelný text pod mapou. Radar je aplikace na celou obrazovku a bez něj by
// stránka pro vyhledávač i čtenáře neobsahovala nic než ovládací prvky.
// Každé tvrzení má zdroj v Vyzkum/radar-letadel/zdroje.md. Při změně chování
// radaru (oblasti, stáří dat, údaje v detailu) text zkontrolovat.

const VALUES: { name: string; shows: React.ReactNode; caution: React.ReactNode }[] = [
  {
    name: 'Baro výška',
    shows: 'Výšku podle tlakového výškoměru, vztaženou ke standardnímu tlaku. Zobrazujeme ji v metrech.',
    caution: (
      <>
        Není to výška nad terénem. Nad horami může být letadlo k zemi mnohem blíž, než říká číslo. Víc v článku{' '}
        <Link href="/blog/jak-vysoko-letaji-letadla">Jak vysoko létají letadla</Link>.
      </>
    ),
  },
  {
    name: 'Rychlost',
    shows: 'Rychlost vůči zemi v kilometrech za hodinu.',
    caution: 'Vzdušnou rychlost ADS-B nehlásí. Při silném větru se obě rychlosti liší.',
  },
  {
    name: 'Kurz',
    shows: 'Směr pohybu nad zemí ve stupních. Nula je sever, devadesát východ.',
    caution: 'Při bočním větru se může lišit od směru, kterým míří příď.',
  },
  {
    name: 'Hladina',
    shows: 'Výšku ve stovkách stop. FL350 je 35 000 stop, tedy asi 10,7 kilometru.',
    caution: 'Počítáme ji z barometrické výšky, takže platí totéž co u ní.',
  },
  {
    name: 'Stoupání',
    shows: 'Rychlost stoupání nebo klesání ve stopách za minutu.',
    caution: 'Zobrazí se jen u letadel, která ho vysílají.',
  },
  {
    name: 'Autopilot',
    shows: 'Výšku, kterou posádka nastavila na panelu autopilota.',
    caution: 'Jen když ji letadlo vysílá. Je to záměr posádky, ne aktuální výška.',
  },
  {
    name: 'Spojnice letišť',
    shows: 'Odkud a kam letadlo letí a kolik z cesty už uběhlo.',
    caution: 'Trasa má tři stupně jistoty: ověřená vůči poloze, z letového řádu a orientační. Procenta jsou odhad, ne údaj aerolinky.',
  },
]

export function RadarInfo() {
  return (
    <>
      <div style={{ background: 'var(--midnight)', color: 'var(--text-primary)', fontFamily: 'var(--font-ibm-plex-sans), sans-serif' }}>
        <section id="jak-radar-funguje" className={styles.article} style={{ paddingTop: 48 }} aria-label="Jak radar letadel funguje">
          <p className={styles.lead} style={{ marginTop: 0 }}>
            Radar ukazuje letadla, která vysílají svou polohu přes ADS-B, tedy systém, kterým letadlo samo oznamuje, kde je.
            Začíná nad Českem a okolím, v nabídce oblastí je dalších sedm částí Evropy, od Britských ostrovů po Východní Evropu.
          </p>

          <h2 id="k-cemu-je-radar">K čemu radar je a jak s ním pracovat</h2>
          <p>
            Hodí se, když chcete vědět, co vám právě letí nad hlavou, kam míří letadlo, které vidíte na obloze, nebo kde je stroj,
            jehož volací znak či registraci znáte. Na cestu na letiště se podle něj neřiďte. Zpoždění ani bránu radar nezaručuje
            a čas příletu je u části letů jen odhad z polohy a rychlosti. Spolehlivější je tabule letiště, například{' '}
            <Link href="/letiste/praha/odlety">odlety a přílety v Praze</Link>, a aplikace vaší aerolinky.
          </p>
          <ul>
            <li>
              Vyhledávací pole přijme část volacího znaku, registraci nebo ICAO adresu letadla. Najde ale jen letadla, která jsou
              právě v zobrazené oblasti. Číslo z letenky bývá jiné než volací znak, jak vysvětluje{' '}
              <Link href="/blog/jak-sledovat-let-podle-cisla">článek o sledování letů podle čísla</Link>.
            </li>
            <li>
              Filtry vybírají podle typu letadla: pasažérské, soukromé, vojenské a vrtulníky. Nedívají se na to, co letadlo veze,
              takže mezi pasažérskými se objeví i nákladní stroj stejného typu. Vojenská poznáváme podle příznaku v databázi
              letadel, a chybí proto ta, která v ní takto označená nejsou.
            </li>
            <li>
              Tlačítko „Co letí nade mnou?“ zjistí polohu zařízení a ukáže letadla do 30 kilometrů. Poloha zůstává ve vašem
              prohlížeči, na server ji neposíláme.
            </li>
            <li>
              V detailu letadla zapnete „Sledovat letadlo“ a mapa se bude posouvat za ním, dokud ji sami neposunete. Tlačítko
              „Sdílet“ vytvoří odkaz, který letadlo po otevření vyhledá, pokud je pořád v dosahu.
            </li>
            <li>
              Na počítači přeskočí lomítko na hledání, klávesa F zapne celou obrazovku a Esc zavře detail.
            </li>
          </ul>
          <p>
            Radar je zdarma a nevyžaduje registraci. Analytiku a partnerské skripty spouštíme až po vašem souhlasu, radar funguje
            i bez něj.
          </p>

          <h2 id="odkud-jsou-polohy">Odkud jsou polohy a proč nějaké letadlo chybí</h2>
          <p>
            Letadlo s ADS-B vysílá jednou za sekundu polohu (obvykle z GPS), výšku, rychlost vůči zemi a další údaje. Vysílání není šifrované,
            takže ho zachytí každý, kdo má přijímač. FlyQueens čte data z projektu ADSB.lol, který skládá signály z přijímačů
            dobrovolníků. Který zdroj zrovna běží, ukazuje řádek „Zdroj“ v postranním panelu.
          </p>
          <p>
            Z toho plynou omezení, která nejsou chybou mapy. Letadlo, které vysílač nemá nebo ho má vypnutý, na radaru není.
            Letadlo mimo dosah přijímačů také ne, protože rádiový signál se šíří po přímce a vzdálenost nebo hory ho zastaví.
            Každá oblast je navíc kruh o poloměru 250 námořních mil, tedy asi 460 kilometrů, kolem pevného středu. Víc nám zdroj
            v jednom dotazu nedá. Mapa se proto neřídí státními hranicemi a za okrajem kruhu letadla nezobrazí, i když se mapa
            táhne dál.
          </p>
          <p>
            Aktuálnost má dvě meze. Polohy starší než 30 sekund v okamžiku stažení do mapy nedáváme a mapa se obnovuje každých
            10 sekund, jenže jen dokud je záložka otevřená v popředí. Dopravní letadlo přitom při rychlosti kolem 900 kilometrů
            za hodinu urazí za 30 sekund asi 7,5 kilometru. To, co vidíte, je tedy poloha z nedávné chvíle, ne záběr z této
            vteřiny. Když zdroj vypadne, ukážeme poslední známé polohy a upozorníme na to.
          </p>

          <h2 id="co-znamenaji-udaje">Co znamenají údaje v detailu letadla</h2>
          <p>
            Po kliknutí na letadlo se otevře detail. Čísla v něm se snadno vykládají špatně, proto je tady rozpis, co přesně
            ukazují.
          </p>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Údaj</th>
                  <th scope="col">Co ukazuje</th>
                  <th scope="col">Na co si dát pozor</th>
                </tr>
              </thead>
              <tbody>
                {VALUES.map((row) => (
                  <tr key={row.name}>
                    <th scope="row">{row.name}</th>
                    <td>{row.shows}</td>
                    <td>{row.caution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>
            Fotografii letadla bereme z databáze Planespotters a u každé uvádíme autora. Pro některé registrace žádná není.
          </p>
          <p>
            Pokud jste přišli kvůli konkrétnímu letu a radar ho neukazuje, zkuste{' '}
            <Link href="/let">najít let podle čísla z letenky a data</Link> nebo se na letištní tabuli podívejte, kdy a kde
            letadlo přistává.
          </p>

          <SourcesBox
            sources={[
              { label: 'FAA: Ins and Outs (ADS-B Out vysílá polohu, výšku a rychlost vůči zemi jednou za sekundu)', href: 'https://www.faa.gov/air_traffic/technology/equipadsb/capabilities/ins_outs' },
              { label: 'FAA: ADS-B FAQ (barometrická výška, rychlost vůči zemi, data bez šifrování)', href: 'https://www.faa.gov/air_traffic/technology/equipadsb/resources/faq' },
              { label: 'ADSB.lol (komunitní data z přijímačů dobrovolníků)', href: 'https://www.adsb.lol/' },
              { label: 'ADSB.lol API (dosah dotazu 250 námořních mil, licence ODbL)', href: 'https://api.adsb.lol/docs' },
            ]}
            note="Stav k 5. říjnu 2026. Popis radaru odpovídá jeho dnešní podobě. Co platí pro naši mapu, najdete i na stránce O projektu a zdrojích dat."
          />

          <RelatedReading
            items={[
              {
                href: '/blog/jak-sledovat-let-podle-cisla',
                eyebrow: 'Návod',
                title: 'Sledování letů podle čísla: kde je letadlo online',
                description: 'Číslo letu, volací znak a registrace nejsou totéž. Co zadat do mapy a proč se některý let nemusí zobrazit.',
              },
              {
                href: '/blog/jak-vysoko-letaji-letadla',
                eyebrow: 'Jak to funguje',
                title: 'Jak vysoko létají letadla? Výška v metrech a FL350',
                description: 'Co znamená letová hladina a proč číslo na mapě neříká, jak vysoko je letadlo nad zemí.',
              },
              {
                href: '/blog/squawk-nouzove-kody',
                eyebrow: 'Jak to funguje',
                title: 'Squawk 7700, 7600 a 7500: význam nouzových kódů',
                description: 'Co který kód znamená a jak nouzový let poznáte na mapě.',
              },
            ]}
          />
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
