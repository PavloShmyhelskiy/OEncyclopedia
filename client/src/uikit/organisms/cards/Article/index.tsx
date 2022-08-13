import type { Article } from '@models/articles'
import { useRouter } from 'next/router'

export interface ArticleCardProps {
  article: Article
}

const ArticleCard = ({
  article: { _id, title, thumbnail },
}: ArticleCardProps) => {
  const router = useRouter()

  const onArticleClick = (articleId: string) => {
    router.push(`/articles/${articleId}`)
  }

  return (
    <div className="p-3 flex flex-1 flex-col border border-neutral-300 rounded-lg">
      <div className="flex items-top justify-start">
        <img src={thumbnail} className="w-40 h-40" width="160" height="160" />
        <div className="flex flex-1 flex-col justify-between">
          <h5 className="ml-5 font-semibold text-xl">{title}</h5>
          <button
            onClick={() => onArticleClick(_id)}
            className="self-end px-5 py-2 transition-all hover:px-10 duration-700 bg-gradient-to-r from-green-400 to-blue-500 text-white"
          >
            Переглянути
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
