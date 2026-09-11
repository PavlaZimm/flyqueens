import type { Metadata } from 'next'

export const SOCIAL_IMAGE_URL = '/social-preview.png?v=20260911-2'

export const SOCIAL_IMAGE = {
  url: SOCIAL_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: 'FlyQueens — co právě letí nad tebou?',
}

type SocialMetadataInput = {
  title: string
  description: string
  url: string
  type?: 'website' | 'article'
}

/** Stejný, spolehlivý náhled a správný titulek pro Facebook, LinkedIn i X. */
export function socialMetadata({
  title,
  description,
  url,
  type = 'website',
}: SocialMetadataInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      title,
      description,
      url,
      type,
      locale: 'cs_CZ',
      siteName: 'FlyQueens',
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE_URL],
    },
  }
}
