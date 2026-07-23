import { SiteFooter } from '@/components/UI/SiteFooter'

export default function LetisteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}
