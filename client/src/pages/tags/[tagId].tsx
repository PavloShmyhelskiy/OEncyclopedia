import { useArticles, useTags } from '@api'
import { ArticleCard, Metadata } from '@uikit/organisms'
import { useRouter } from 'next/router'

export interface ActiclePageProps {}

const TagPage = ({}: ActiclePageProps) => {
  const router = useRouter()
  const { tagId } = router.query as { tagId: string }

  const tagsQuery = useTags()
  const articlesQuery = useArticles()
  const tag = tagsQuery.data?.find(t => t._id === tagId)
  const articles = articlesQuery.data?.filter(a => tag?.content.includes(a._id))

  if (!articles || !tag) {
    return (
      <>
        <Metadata title="Not found" />
        <h2>Sorry</h2>
      </>
    )
  }

  return (
    <>
      <Metadata title={`Tag - ${tag.title}`} />
      <div>
        <button
          className="my-2 text-blue-600 hover:text-blue-100"
          onClick={router.back}
        >
          Назад
        </button>
        <div className="grid grid-cols-3 gap-4 my-5">
          {articles.map(article => (
            <ArticleCard article={article} />
          ))}
        </div>
      </div>
    </>
  )
}

export default TagPage
