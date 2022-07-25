export interface ArticleCardProps {
  name: string
  image: string
}

const ArticleCard = ({ name, image }: ArticleCardProps) => {
  return (
    <div className="p-3 flex flex-1 flex-col border border-neutral-300 rounded-lg">
      <div className="flex items-top justify-start">
        <img src={image} className="w-40 h-40" />
        <div className="flex flex-col justify-between">
          <h5 className="ml-5 font-semibold text-xl">{name}</h5>
          <button className="self-end px-5 py-2 transition-all hover:px-10 duration-700 bg-gradient-to-r from-green-400 to-blue-500 text-white">
            Переглянути
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
