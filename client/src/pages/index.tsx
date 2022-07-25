import { getRandomImage } from '@mocks'
import { Input } from '@uikit/molecules'
import { ArticleCard, Metadata } from '@uikit/organisms'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'

const Home: NextPage = () => {
  const { control } = useForm<{ search: string }>()

  return (
    <>
      <Metadata title="Головна" />

      <div>
        <div className="p-5 mx-40 bg-gradient-to-r from-blue-300 to-yellow-300 rounded-lg mt-10 m-auto hover:from-blue-400 hover:transition-all transition ease-in-out delay-75 duration-500">
          <h2 className="text-center font-bold text-5xl mb-10 text-white">
            Пошук статті
          </h2>

          <div className="flex flex-row mx-20 justify-center">
            <Input name="search" control={control} className="w-[500px]" />
            <button className="ml-5 bg-slate-700 px-10 text-white font-bold">
              Пошук
            </button>
          </div>
        </div>

        <hr className="h-[2px] bg-slate-100 my-10" />

        <div className="grid grid-cols-3 gap-4">
          <ArticleCard
            name="loremdfdlksjflsdjkl dsjlkfsd"
            image={getRandomImage()}
          />
          <ArticleCard
            name="loremdfdlksjflsdjkl dsjlkfsd"
            image={getRandomImage()}
          />
          <ArticleCard
            name="loremdfdlksjflsdjkl dsjlkfsd"
            image={getRandomImage()}
          />
        </div>
      </div>
    </>
  )
}

export default Home
