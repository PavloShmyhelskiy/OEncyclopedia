import { useArticles } from '@api'
import { Metadata } from '@uikit/organisms'

export interface ArticlesPageProps {}

const ArticlesPage = ({ }: ArticlesPageProps) => {
  
  const articlesQuery = useArticles()

  console.log(articlesQuery.data)

  return (
    <>
      <Metadata title="Статті" />

      <div></div>
    </>
  )
}

export default ArticlesPage
