import { useArticles, useGroups } from '@api'
import { ArticleCard, Metadata } from '@uikit/organisms'
import { useRouter } from 'next/router'

export interface ActiclePageProps {}

const GroupPage = ({}: ActiclePageProps) => {
  const router = useRouter()
  const { groupId } = router.query as { groupId: string }

  const groupsQuery = useGroups()
  const articlesQuery = useArticles()
  const group = groupsQuery.data?.find(g => g._id === groupId)

  const articles = articlesQuery.data?.filter(a =>
    group?.content.includes(a._id),
  )

  if (!articles || !group) {
    return (
      <>
        <Metadata title="Not found" />
        <h2>Sorry</h2>
      </>
    )
  }

  return (
    <>
      <Metadata title={`Group - ${group.title}`} />
      <div>
        <button
          className="my-2 text-blue-600 hover:text-blue-100"
          onClick={router.back}
        >
          Назад
        </button>

        <div>
          <h2 className="font-bold text-7xl text-center">{group.title}</h2>
        </div>
        <hr className="h-[4px] bg-slate-500" />
        <div className="grid grid-cols-3 gap-4 my-5">
          {articles.map(article => (
            <ArticleCard article={article} />
          ))}
        </div>
      </div>
    </>
  )
}

export default GroupPage
