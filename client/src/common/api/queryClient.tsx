import httpClient from '@api/httpClient'
import type { FC, ReactNode } from 'react'
import type { QueryFunction } from 'react-query'
import {
  QueryClient,
  QueryClientProvider as LibQueryClientProvider,
} from 'react-query'

export const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const query = queryKey.join('/')

  const promise = await httpClient.get(query as string).then(resp => resp.data)

  return promise
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      notifyOnChangeProps: 'tracked',
    },
  },
})

export const QueryClientProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <LibQueryClientProvider client={queryClient}>
    {children}
  </LibQueryClientProvider>
)

export class RequestError extends Error {
  code: 404 | 500

  constructor(code: 404 | 500) {
    super(`Request error with code ${code}`)
    this.code = code
  }
}
