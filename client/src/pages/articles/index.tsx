import { useArticles, useTags } from '@api'
import type { Article } from '@models/articles'
import { ArticleCard, Metadata } from '@uikit/organisms'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export interface ArticlesPageProps {}

const ArticlesPage = ({}: ArticlesPageProps) => {
  const router = useRouter()

  const articlesQuery = useArticles()
  const tagsQuery = useTags()

  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    if (articlesQuery.data) {
      setArticles([...articlesQuery.data])
    }
  }, [articlesQuery.data])

  const onTagPress = (tagId: string) => {
    router.push(`/tags/${tagId}`)
  }

  const viewsSort = (a: Article, b: Article) => b.views - a.views
  const nameSort = (a: Article, b: Article) => {
    const aWord = a.title.split(' ')[0].toLocaleLowerCase()
    const bWord = b.title.split(' ')[0].toLocaleLowerCase()
    if (aWord < bWord) {
      return -1
    }
    if (aWord > bWord) {
      return 1
    }
    return 0
  }
  const dateCreateSort = (a: Article, b: Article) =>
    Date.parse(new Date(b.createdAt) as any) -
    Date.parse(new Date(a.createdAt) as any)

  const onSort = (index: 1 | 2 | 3) => {
    const art = [...articlesQuery.data!]
    if (index === 1) {
      setArticles(art.sort(viewsSort))
      return
    }

    if (index === 2) {
      setArticles(art.sort(nameSort))
      return
    }

    setArticles(art.sort(dateCreateSort))
  }

  return (
    <>
      <Metadata title="Статті" />

      <div>
        {tagsQuery.data && tagsQuery.data?.length > 0 && (
          <>
            <div className="my-2 flex flex-row flew-wrap items-center mx-20">
              {tagsQuery.data?.map(tag => (
                <button
                  key={tag._id}
                  onClick={() => onTagPress(tag._id)}
                  className="text-emerald-400"
                >{`#${tag.title}`}</button>
              ))}
            </div>
            <hr className="h-[2px] bg-lime-900 mx-[10%]" />
          </>
        )}

        <div className="flex flex-1 flex-row items-center justify-center my-2">
          <p className="font-semibold text-xs mr-2">Сортувати за: </p>
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => onSort(1)}
              className="py-2 px-4 text-sm font-medium text-blue-700 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 focus:z-10   focus:text-blue-700 dark:bg-gray-200  dark:text-black dark:hover:text-white dark:hover:bg-gray-600  dark:focus:text-white"
            >
              Кількості переглядів
            </button>
            <button
              onClick={() => onSort(2)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10   focus:text-blue-700 dark:bg-gray-200  dark:text-black dark:hover:text-white dark:hover:bg-gray-600  dark:focus:text-white"
            >
              Назві
            </button>
            <button
              onClick={() => onSort(3)}
              className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10   focus:text-blue-700 dark:bg-gray-200  dark:text-black dark:hover:text-white dark:hover:bg-gray-600  dark:focus:text-white"
            >
              Даті створення
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 my-5">
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ArticlesPage
