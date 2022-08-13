import type { Group } from '@models/groups'
import { classnames } from '@tools/common'
import { useRouter } from 'next/router'

interface GroupProps {
  group: Group
  className?: string
}

const GroupComp = ({ group, className }: GroupProps) => {
  const router = useRouter()

  const onGroupPress = (id: string) => {
    router.push(`/groups/${id}`)
  }
  return (
    <button
      onClick={() => onGroupPress(group._id)}
      className={classnames('text-yellow-400', className)}
    >{`${group.title}`}</button>
  )
}

export default GroupComp
