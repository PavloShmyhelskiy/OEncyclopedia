import { Metadata } from '@uikit/organisms'
import { useRouter } from 'next/router'

export interface ActiclePageProps {}

const ActiclePage = ({}: ActiclePageProps) => {
  const router = useRouter()
  const { articleId } = router.query as { articleId: string }

  return (
    <>
      <Metadata title="Article - " />
      <div>{articleId}</div>
    </>
  )
}

export default ActiclePage
