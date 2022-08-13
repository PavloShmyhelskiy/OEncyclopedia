import type { Tag } from '@models/tags'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import tagsApi from './actions'
import { tagsKeys } from './constants'

const useTags = () =>
  useQuery<Tag[], AxiosError>(tagsKeys.root, tagsApi.getTags, {
    staleTime: Number.POSITIVE_INFINITY,
  })

export default useTags
