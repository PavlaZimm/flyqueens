import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import styles from './Article.module.css'

export interface ArticleCrumb {
  href: string
  label: string
}

interface ArticleHeaderProps {
  /** Odkazy drobečkové navigace před aktuální stránkou, např. FlyQueens / Blog. */
  crumbs: ArticleCrumb[]
  /** Název aktuální stránky v drobečkové navigaci; musí odpovídat BreadcrumbList v JSON-LD. */
  current: string
  /** Rubrika nad nadpisem, obvykle `post.tag`. */
  eyebrow: string
  /** Řádek s autorem, datem a délkou čtení. */
  byline: ReactNode
  /** Text nadpisu H1. */
  children: ReactNode
}

/** Jednotné záhlaví článku: drobečková navigace, rubrika, H1 a autor. */
export function ArticleHeader({ crumbs, current, eyebrow, byline, children }: ArticleHeaderProps) {
  return (
    <>
      <nav className={styles.breadcrumb} aria-label="Drobečková navigace">
        {crumbs.map((crumb) => (
          <Fragment key={crumb.href}>
            <Link href={crumb.href}>{crumb.label}</Link><span aria-hidden="true">/</span>
          </Fragment>
        ))}
        <span aria-current="page">{current}</span>
      </nav>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1>{children}</h1>
      {byline}
    </>
  )
}
