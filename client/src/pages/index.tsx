import { useArticles } from '@api'
import { classnames } from '@tools/common'
import type { Article } from '@models/articles'
import { Input } from '@uikit/molecules'
import { ArticleCard, Metadata } from '@uikit/organisms'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Home: NextPage = () => {
  const articlesQuery = useArticles()

  const { control, handleSubmit, getValues } = useForm<{ search: string }>()

  const [articles, setArticles] = useState<Article[]>([])
  const [containsInArticles, setContainsInArticles] = useState<Article[]>([])

  const onSubmit = handleSubmit(data => {
    if (data.search === '') {
      setArticles([])
      setContainsInArticles([])
      return
    }

    const artTitleStartWith = articlesQuery.data?.filter(a => 
      a.title.toLocaleLowerCase().startsWith(data.search.toLocaleLowerCase())
    )

    const artTitleContains = articlesQuery.data?.filter(a => 
      a.title.toLocaleLowerCase().includes(data.search.toLocaleLowerCase())
      && !a.title.toLocaleLowerCase().startsWith(data.search.toLocaleLowerCase())
    )

    const content = articlesQuery.data?.filter(a => 
        a.content.toLocaleLowerCase().includes(data.search.toLocaleLowerCase())
    )

    setArticles(artTitleStartWith?.concat(artTitleContains ?? []) ?? [])
    setContainsInArticles(content ?? [])
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
            className="lg:flex lg:flex-row lg:mx-20 lg:justify-center sm:block"
          >
            <Input name="search" control={control} className="lg:w-[500px] sm:w-[100%]" />
            <input
              type="submit"
              value="Пошук"
              className={classnames("lg:ml-5 lg:w-[200px] lg:my-0 bg-slate-700 px-10 text-white font-bold", 
                "sm:w-[100%] sm:ml-0 sm:py-4 sm:my-2")}
              onClick={onSubmit}
            />
          </form>
        </div>

        <hr className="h-[2px] bg-slate-100 my-10" />

        <div className="grid xl:grid-cols-3 gap-4 md:grid-cols-2">
          {articles.length
            ? articles.map(article => <ArticleCard article={article} />)
            : articlesQuery.data?.map(article => (
                <ArticleCard key={article._id} article={article} />
              ))}
        </div>

        
        { containsInArticles.length > 0 && 
          <>
            <hr className="mt-4" />
            <div>Містять: <div className="font-bold"> {" " + getValues().search }</div> </div>
            
            <div className="grid grid-cols-3 gap-4">
              {containsInArticles.map(article => <ArticleCard article={article} />)}
            </div>
          </>
        }
        <hr className="h-[2px] bg-slate-100 my-10" />
      </div>
    </>
  )
}

export default Home
