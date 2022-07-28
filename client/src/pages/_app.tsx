import { queryClient } from '@api/queryClient'
import { AuthProvider } from '@api/resources/login/AuthContex'
import { Layout } from '@config/layout'
import Modals, { ModalsContextProvider } from '@uikit/organisms/modals'
import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ModalsContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>

          <Modals />
        </ModalsContextProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default MyApp
