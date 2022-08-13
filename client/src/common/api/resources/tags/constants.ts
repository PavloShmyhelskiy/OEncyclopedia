import { keyToUrl } from '@tools/common'

export const tagsKeys = {
  root: ['tags'] as const,
}

export const tagsUrls = {
  root: keyToUrl(tagsKeys.root),
}
