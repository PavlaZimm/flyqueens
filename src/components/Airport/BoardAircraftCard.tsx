'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { AirportBoardFlight } from '@/lib/airportFlightBoards'
import { useAircraftPhoto } from '@/hooks/useAircraftPhoto'
import styles from './AirportFlightBoard.module.css'

export function BoardAircraftCard({ flight }: { flight: AirportBoardFlight }) {
  const aircraft = flight.aircraft
  const ownPhoto = aircraft?.registration?.toUpperCase() === '9H-FLM'
  const { photo, loading } = useAircraftPhoto(ownPhoto ? null : aircraft?.modeS ?? null, ownPhoto ? null : aircraft?.registration ?? null)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const source = ownPhoto ? '/spotting/praha-boeing-747-fly-meta.webp' : photo?.thumbnail_large.src
  return (
    <div className={styles.aircraftCard}>
      <div className={styles.aircraftPhoto}>
        {source && failedSrc !== source ? (
          ownPhoto ? <Image src={source} alt="Boeing 747 Fly Meta, registrace 9H-FLM" width={640} height={360} sizes="(max-width: 700px) 90vw, 320px" onError={() => setFailedSrc(source)} /> :
          // Provider supplies a sized thumbnail; retain the original image and attribution.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={source} alt={`Letadlo ${aircraft?.registration ?? aircraft?.modeS ?? ''}`} width={640} height={360} loading="lazy" decoding="async" onError={() => setFailedSrc(source)} />
        ) : <p>{loading ? 'Hledám fotografii letadla…' : 'Fotografie tohoto letadla zatím není dostupná.'}</p>}
        {source && failedSrc !== source && (
          <a href={ownPhoto ? '/blog/boeing-747-praha-fly-meta' : photo?.link} target={ownPhoto ? undefined : '_blank'} rel={ownPhoto ? undefined : 'noopener noreferrer'}>
            {ownPhoto ? 'Foto: vlastní archiv FlyQueens' : `© ${photo?.photographer} · Planespotters.net`}
          </a>
        )}
      </div>
      <div className={styles.aircraftInfo}>
        <h3>Letadlo pro let {flight.number}</h3>
        <dl>
          <div><dt>Typ</dt><dd>{aircraft?.model ?? 'Typ zatím není známý'}</dd></div>
          <div><dt>Registrace</dt><dd>{aircraft?.registration ?? 'Zatím není uvedena'}</dd></div>
          <div><dt>Dopravce</dt><dd>{flight.airline ?? 'Zatím není uveden'}</dd></div>
        </dl>
        <p>{aircraft?.registration || aircraft?.modeS
          ? 'Fotografie je archivní, nejde o živý záběr. Dopravce může přidělené letadlo změnit.'
          : 'Konkrétní letadlo zatím není známé. Jakmile ho zdroj uvede, můžeme dohledat jeho fotografii.'}</p>
      </div>
    </div>
  )
}
