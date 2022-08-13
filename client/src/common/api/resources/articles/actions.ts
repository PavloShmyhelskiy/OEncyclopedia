import httpClient from '@api/httpClient'
import type { Article } from '@models/articles'
import { articlesUrls } from './constants'

const getArticles = async () => {
  const { data } = await httpClient.get<Article[]>(articlesUrls.root)
  return data
}

const updateViews = async (articleId: string) => {
  const { data } = await httpClient.put<Article>(
    articlesUrls.updateView(articleId),
  )
  return data
}

const updateRate = async ({
  articleId,
  rate,
}: {
  articleId: string
  rate: number
}) => {
  const { data } = await httpClient.put<Article>(
    articlesUrls.updateRate(articleId),
    { rate },
  )
  return data
}

export default { getArticles, updateViews, updateRate }
