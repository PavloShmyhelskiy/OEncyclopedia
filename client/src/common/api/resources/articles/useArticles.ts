import type { Article } from '@models/articles'
import type { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import articlesApi from './actions'
import { articlesKeys } from './constants'

const useArticles = () => {
  const queryClient = useQueryClient()

  const query = useQuery<Article[], AxiosError>(
    articlesKeys.root,
    articlesApi.getArticles,
    {
      staleTime: Number.POSITIVE_INFINITY,
    },
  )

  const updateView = useMutation(articlesApi.updateViews, {
    onSuccess: data => {
      const articles = [...query.data!]
      const updateArticle = articles.find(a => a._id === data._id)!
      updateArticle.views += 1

      queryClient.setQueriesData(articlesKeys.root, articles)
    },
  })

  const updateRate = useMutation(articlesApi.updateRate, {
    onSuccess: data => {
      const articles = [...query.data!]
      const updateArticle = articles.find(a => a._id === data._id)!
      updateArticle.rate = data.rate

      queryClient.setQueriesData(articlesKeys.root, articles)
    },
  })

  const mutations = { updateView, updateRate }

  return { ...query, mutations }
}

export default useArticles
