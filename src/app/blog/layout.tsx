import { SiteHeader } from '@/components/UI/SiteHeader'
import { SiteFooter } from '@/components/UI/SiteFooter'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader activeSection="blog" />
      {children}
      <SiteFooter />
    </>
  )
}
