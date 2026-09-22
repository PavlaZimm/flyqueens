import styles from './ArticleContents.module.css'

export interface ArticleContentsItem {
  id: string
  label: string
}

/** Obsah článku s odkazy na kotvy u nadpisů H2. */
export function ArticleContents({ items }: { items: ArticleContentsItem[] }) {
  return (
    <nav className={styles.contents} aria-label="Obsah článku">
      <p className={styles.title}>Obsah článku</p>
      <ol className={styles.list}>
        {items.map((item) => (
          <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
        ))}
      </ol>
    </nav>
  )
}
