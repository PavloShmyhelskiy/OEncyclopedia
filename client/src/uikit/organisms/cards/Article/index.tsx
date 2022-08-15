import type { Article } from '@models/articles'
import { useRouter } from 'next/router'

export interface ArticleCardProps {
  article: Article,
  highlightedText?: string
}

const ArticleCard = ({
  article: { _id, title, thumbnail, content },
  highlightedText
}: ArticleCardProps) => {
  const router = useRouter()

  const onArticleClick = (articleId: string) => {
    router.push(`/articles/${articleId}`)
  }
  
  const getHighlightedText = () => {

    if (highlightedText) {
      var text = content.substring(content.indexOf(highlightedText), highlightedText.length + 30)
      const arrtext = text.toLocaleLowerCase().split(highlightedText.toLocaleLowerCase())

      return arrtext.map((el, i) => {
        if (i !== arrtext.length - 1) {
          return (
            <>
              { el }
              <span className="bg-amber-200 w-fit h-fit" >{highlightedText}</span>
            </>
          )
        } else {
          return <span>{el}...</span>;
        }
      })
    }
    return "";
  }
  
  return (
    <div className="p-3 flex flex-1 flex-col border border-neutral-300 rounded-lg">
      <div className="flex items-top justify-start">
        <img src={thumbnail} className="w-40 h-40" width="160" height="160" />
        <div className="flex flex-1 flex-col justify-between">
          <h5 className="ml-5 font-semibold text-xl">{title}</h5>
          { highlightedText 
            ? <div className="ml-5 ">
                { getHighlightedText() }
              </div >
            : <div className="ml-3">{ content.substring(0, 30) }{ content.substring(0, 30).length >= 30 && "..." }</div>
          }
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
