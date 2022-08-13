import httpClient from '@api/httpClient'
import type { Tag } from '@models/tags'
import { tagsUrls } from './constants'

const getTags = async () => {
  const { data } = await httpClient.get<Tag[]>(tagsUrls.root)
  return data
}

export default { getTags }
