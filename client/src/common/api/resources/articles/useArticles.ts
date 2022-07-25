import type { Article } from '@models/articles'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import articlesApi from './actions'
import { articlesKeys } from './constants'

const useArticles = () =>
  useQuery<Article[], AxiosError>(articlesKeys.root, articlesApi.getArticles, {
    staleTime: Number.POSITIVE_INFINITY,
  })

export default useArticles
