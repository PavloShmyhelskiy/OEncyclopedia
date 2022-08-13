import type { Tag } from '@models/tags'
import { classnames } from '@tools/common'
import { useRouter } from 'next/router'

interface TagProps {
  tag: Tag
  className?: string
}

const TagComp = ({ tag, className }: TagProps) => {
  const router = useRouter()

  const onTagPress = (id: string) => {
    router.push(`/tags/${id}`)
  }
  return (
    <button
      onClick={() => onTagPress(tag._id)}
      className={classnames('text-emerald-400', className)}
    >{`#${tag.title}`}</button>
  )
}

export default TagComp
