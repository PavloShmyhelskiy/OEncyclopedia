import type { Group } from '@models/groups'
import type { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import groupsApi from './actions'
import { groupsKeys } from './constants'

const useGroups = () =>
  useQuery<Group[], AxiosError>(groupsKeys.root, groupsApi.getGroups, {
    staleTime: Number.POSITIVE_INFINITY,
  })

export default useGroups
