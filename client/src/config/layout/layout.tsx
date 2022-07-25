import { useRouter } from 'next/router'
import type { FC, ReactNode } from 'react'
import PageBody from './PageBody'
import PageFooter from './PageFooter'
import PageHeader from './PageHeader'

export interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter()

  if (router.pathname === '/admin') {
    return <div>{children}</div>
  }

  if (router.pathname === '/404' || router.pathname === '/500') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        {children}
      </div>
    )
  }

  return (
    <div>
      <PageHeader />
      <PageBody>{children}</PageBody>
      <PageFooter />
    </div>
  )
}

export default Layout
