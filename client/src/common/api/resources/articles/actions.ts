import httpClient from '@api/httpClient'
import type { Article } from '@models/articles'
import { articlesUrls } from './constants'

const getArticles = async () => {
  const { data } = await httpClient.get<{ articles: Article[] }>(
    articlesUrls.root,
  )
  return data.articles
}

export default { getArticles }
