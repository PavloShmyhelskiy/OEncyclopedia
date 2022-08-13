import httpClient from '@api/httpClient'
import type { Group } from '@models/groups'
import { groupsUrls } from './constants'

const getGroups = async () => {
  const { data } = await httpClient.get<Group[]>(groupsUrls.root)
  return data
}

export default { getGroups }
