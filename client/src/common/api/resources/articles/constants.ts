import { keyToUrl } from '@tools/common'

export const articlesKeys = {
  root: ['articles'] as const,
}

export const articlesUrls = {
  root: keyToUrl(articlesKeys.root),
}
