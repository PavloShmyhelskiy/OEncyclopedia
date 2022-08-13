import { keyToUrl } from '@tools/common'

export const articlesKeys = {
  root: ['articles'] as const,
  updateView: (id: string) => ['articles/view', id] as const,
  updateRate: (id: string) => ['articles/rate', id] as const,
}

export const articlesUrls = {
  root: keyToUrl(articlesKeys.root),
  updateView: (id: string) => keyToUrl(articlesKeys.updateView(id)),
  updateRate: (id: string) => keyToUrl(articlesKeys.updateRate(id)),
}
