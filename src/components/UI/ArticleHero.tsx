import Image from 'next/image'

type ArticleHeroProps = {
  src: string
  alt: string
  caption: string
  creditLabel: string
  creditHref: string
  licenseLabel?: string
  licenseHref?: string
}

/** Reálná ilustrační fotografie s dohledatelným autorem a licencí. */
export function ArticleHero({
  src,
  alt,
  caption,
  creditLabel,
  creditHref,
  licenseLabel = 'Unsplash licence',
  licenseHref = 'https://unsplash.com/license',
}: ArticleHeroProps) {
  return (
    <figure style={{ margin: '0 0 22px' }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '16 / 9',
          borderRadius: 14,
          border: '1px solid var(--border-mid)',
          background: 'var(--midnight-2)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 756px) calc(100vw - 36px), 720px"
          style={{ objectFit: 'cover' }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 58%, rgba(5, 8, 13, 0.48))',
          }}
        />
      </div>
      <figcaption style={{ marginTop: 7, fontSize: 11, lineHeight: 1.5, color: 'var(--text-dim)' }}>
        {caption}{' · Foto: '}
        <a href={creditHref} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
          {creditLabel}
        </a>
        {' · '}
        <a href={licenseHref} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
          {licenseLabel}
        </a>
      </figcaption>
    </figure>
  )
}
