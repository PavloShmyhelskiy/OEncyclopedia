import { useArticles, useGroups, useTags } from '@api'
import { useAuth } from '@api/resources/login/AuthContex'
import { ClockIcon, EyeIcon, UserIcon } from '@assets/icons'
import Rating from '@mui/material/Rating'
import {
  getRate,
  isUpdateArticle,
  isUpdateRate,
  updateRate,
} from '@tools/articles'
import { dateFormatter } from '@tools/date'
import { Group, Tag } from '@uikit/molecules'
import { Metadata } from '@uikit/organisms'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export interface ActiclePageProps {}

const ActiclePage = ({}: ActiclePageProps) => {
  const router = useRouter()
  const { articleId } = router.query as { articleId: string }

  const { user } = useAuth()
  const articlesQuery = useArticles()
  const tagsQuery = useTags()
  const groupsQuery = useGroups()
  const article = articlesQuery.data?.find(a => a._id === articleId)

  const articleTags = tagsQuery.data?.filter(tag =>
    tag.content.includes(articleId),
  )
  const articleGroups = groupsQuery.data?.filter(group =>
    group.content.includes(articleId),
  )

  const onRate = (value: number | null) => {
    if (value) {
      articlesQuery.mutations.updateRate.mutate(
        { articleId, rate: value },
        {
          onSuccess: () => {
            updateRate(articleId)
          },
        },
      )
    }
  }

  useEffect(() => {
    if (article && isUpdateArticle(articleId)) {
      articlesQuery.mutations.updateView.mutate(articleId)
    }
  }, [article])

  if (!article) {
    return (
      <>
        <Metadata title="Not found" />
        <h2>Sorry</h2>
      </>
    )
  }

  return (
    <>
      <Metadata title={`Article - ${article.title}`} />
      <div>
        <button
          className="my-2 text-blue-600 hover:text-blue-100"
          onClick={router.back}
        >
          Назад
        </button>

        <hr className="h-[3px] bg-slate-700 my-2" />
        <div className="flex flex-1 justify-between items-start">
          <div>
            <h3 className="font-bold text-3xl">{article.title}</h3>

            {articleTags && articleTags.length > 0 && (
              <div className="flex flex-row mt-2 border-b-2 border-b-red-200 w-max">
                <p className="font-medium mr-2">Теги: </p>
                {articleTags?.map(tag => (
                  <Tag key={tag._id} tag={tag} className="mr-2" />
                ))}
              </div>
            )}
          </div>

          <div className="py-2 px-5 w-max border-slate-100 border-2 rounded-xl">
            <div className="flex flex-row items-center">
              <UserIcon className="w-5 h-5" />
              <p className="font-semibold ml-2">{article.created_by}</p>
            </div>

            <div className="flex flex-row items-center">
              <EyeIcon className="w-5 h-5" />
              <p className="font-semibold ml-2">{article.views}</p>
            </div>

            <div className="flex flex-row items-center">
              <ClockIcon className="w-5 h-5" />
              <p className="ml-2">
                {dateFormatter.fullDate(new Date(article.updatedAt))}
              </p>
            </div>

            <Rating
              name="read-only"
              value={getRate(article.rate)}
              max={10}
              readOnly
              className="mt-2"
              size="small"
            />

            {article.links.length > 0 && (
              <div className="overflow-hidden max-w-[300px]">
                <p>Посилання:</p>
                <div>
                  {article.links.map(link => (
                    <>
                      <a
                        key={link}
                        href={link}
                        target="_blank"
                        className="text-violet-600 hover:text-violet-200 truncate text-ellipsis"
                      >
                        {link}
                      </a>
                      <br />
                    </>
                  ))}
                </div>
              </div>
            )}
            {articleGroups && articleGroups?.length > 0 && (
              <div className="flex flex-row mt-2 w-max">
                <p className="font-medium mr-2">Групи: </p>
                {articleGroups?.map(group => (
                  <Group key={group._id} group={group} className="mr-2" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <img
            src={article.thumbnail}
            className="max-w-[300px] max-h-[300px]"
          />
        </div>

        <hr className="h-[1px] bg-slate-100 my-5 mx-20" />

        <div>
          <p className="font-light m-10 text-center">{article.content}</p>
        </div>

        {user?.username && isUpdateRate(articleId) && (
          <div className="mt-2 flex flex-row justify-end items-center">
            <p className="font-semibold text-teal-900">Оцінка статті: </p>
            <Rating
              max={10}
              size="large"
              onChange={(_, value) => onRate(value)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default ActiclePage
