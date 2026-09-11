import { AUTHOR } from '@/lib/author'
import styles from './AuthorCard.module.css'

type AuthorBylineProps = {
  dateIso: string
  dateLabel: string
  readingTime: string
  updatedLabel?: string
}

export function AuthorByline({ dateIso, dateLabel, readingTime, updatedLabel }: AuthorBylineProps) {
  return (
    <div className={styles.byline}>
      <span>Autor:</span>
      <a href={AUTHOR.profileUrl} target="_blank" rel="author me noopener noreferrer">{AUTHOR.name}</a>
      <span aria-hidden="true">·</span>
      <time dateTime={dateIso}>{dateLabel}</time>
      {updatedLabel ? <><span aria-hidden="true">·</span><span>aktualizováno {updatedLabel}</span></> : null}
      <span aria-hidden="true">·</span>
      <span>{readingTime}</span>
    </div>
  )
}

export function AuthorCard() {
  return (
    <section className={styles.card} aria-labelledby="article-author-name">
      <div className={styles.avatar} aria-hidden="true">
        PZ
      </div>
      <div>
        <div className={styles.eyebrow}>O autorce</div>
        <h2 className={styles.name} id="article-author-name">
          {AUTHOR.name}
        </h2>
        <div className={styles.role}>{AUTHOR.role}</div>
        <p className={styles.bio}>{AUTHOR.bio}</p>
        <div className={styles.links}>
          <a href={AUTHOR.profileUrl} target="_blank" rel="author me noopener noreferrer">
            Více o Pavle na LinkLady.cz ↗
          </a>
        </div>
      </div>
    </section>
  )
}
