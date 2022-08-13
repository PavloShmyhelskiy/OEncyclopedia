import { useArticles } from '@api'
import type { Article } from '@models/articles'
import { Input } from '@uikit/molecules'
import { ArticleCard, Metadata } from '@uikit/organisms'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Home: NextPage = () => {
  const articlesQuery = useArticles()

  const { control, handleSubmit } = useForm<{ search: string }>()

  const [articles, setArticles] = useState<Article[]>([])

  const onSubmit = handleSubmit(data => {
    if (data.search === '') {
      setArticles([])
      return
    }

    const art = articlesQuery.data?.filter(a =>
      a.title.toLocaleLowerCase().startsWith(data.search.toLocaleLowerCase()),
    )

    setArticles(art ?? [])
  })

  return (
    <>
      <Metadata title="Головна" />

      <div>
        <div className="p-5 mx-40 bg-gradient-to-r from-blue-300 to-yellow-300 rounded-lg mt-10 m-auto hover:from-blue-400 hover:transition-all transition ease-in-out delay-75 duration-500">
          <h2 className="text-center font-bold text-5xl mb-10 text-white">
            Пошук статті
          </h2>

          <form
            onSubmit={onSubmit}
            className="flex flex-row mx-20 justify-center"
          >
            <Input name="search" control={control} className="w-[500px]" />
            <input
              type="submit"
              value="Пошук"
              className="ml-5 bg-slate-700 px-10 text-white font-bold"
              onClick={onSubmit}
            />
          </form>
        </div>

        <hr className="h-[2px] bg-slate-100 my-10" />

        <div className="grid grid-cols-3 gap-4">
          {articles.length
            ? articles.map(article => <ArticleCard article={article} />)
            : articlesQuery.data?.map(article => (
                <ArticleCard key={article._id} article={article} />
              ))}
        </div>

        <hr className="h-[2px] bg-slate-100 my-10" />
      </div>
    </>
  )
}

export default Home
