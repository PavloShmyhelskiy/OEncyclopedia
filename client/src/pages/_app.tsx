import { queryClient } from '@api/queryClient'
import { Layout } from '@config/layout'
import Modals, { ModalsContextProvider } from '@uikit/organisms/modals'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalsContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>

        <Modals />
      </ModalsContextProvider>
    </QueryClientProvider>
  )
}

export default MyApp
