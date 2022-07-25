import { ScrollToTopButton } from '@uikit/organisms'
import type { FC, ReactNode } from 'react'

export interface PageBodyProps {
  children: ReactNode
}

const PageBody: FC<PageBodyProps> = ({ children }) => {
  return (
    <section className={`min-h-[calc(100vh-195px)]`}>
      <main className="mx-auto container">{children}</main>

      <ScrollToTopButton />
    </section>
  )
}

export default PageBody
