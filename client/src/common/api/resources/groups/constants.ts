import { keyToUrl } from '@tools/common'

export const groupsKeys = {
  root: ['groups'] as const,
}

export const groupsUrls = {
  root: keyToUrl(groupsKeys.root),
}
