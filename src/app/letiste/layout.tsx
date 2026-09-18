import { SiteHeader } from '@/components/UI/SiteHeader'
import { SiteFooter } from '@/components/UI/SiteFooter'

export default function LetisteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader activeSection="letiste" />
      {children}
      <SiteFooter />
    </>
  )
}
