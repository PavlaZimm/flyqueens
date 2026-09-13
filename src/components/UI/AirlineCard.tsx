import styles from './AirlineCard.module.css'

type AirlineFact = {
  label: string
  value: string
}

type AirlineLink = {
  href: string
  label: string
}

type AirlineCardProps = {
  abbreviation: string
  name: string
  country: string
  description: string
  facts: AirlineFact[]
  links: AirlineLink[]
}

export function AirlineCard({ abbreviation, name, country, description, facts, links }: AirlineCardProps) {
  const headingId = `airline-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return (
    <section className={styles.card} aria-labelledby={headingId}>
      <div className={styles.mark} aria-hidden="true">{abbreviation}</div>
      <div>
        <div className={styles.eyebrow}>Letecká společnost</div>
        <h2 className={styles.name} id={headingId}>{name}</h2>
        <div className={styles.country}>{country}</div>
      </div>

      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div className={styles.fact} key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      <p className={styles.description}>{description}</p>

      <div className={styles.links}>
        {links.map((link) => (
          <a href={link.href} target="_blank" rel="noopener noreferrer" key={link.href}>
            {link.label} ↗
          </a>
        ))}
      </div>
    </section>
  )
}
