import { BlogHeader } from '@/components/UI/BlogHeader'
import { SiteFooter } from '@/components/UI/SiteFooter'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogHeader />
      {children}
      <SiteFooter />
    </>
  )
}
