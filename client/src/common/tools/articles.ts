export const isUpdateArticle = (articleId: string) => {
  const updates = JSON.parse(localStorage.getItem('views') ?? '[]') as string[]

  if (updates.includes(articleId)) {
    return false
  }

  localStorage.setItem('views', JSON.stringify([...updates, articleId]))

  return true
}

export const getRate = (rate?: string) => {
  const value = rate?.split(';') ?? []

  if (value.length !== 2) {
    return 0
  }

  return +value[0] / +value[1]
}

export const isUpdateRate = (articleId: string) => {
  const updates = JSON.parse(localStorage.getItem('rate') ?? '[]') as string[]

  if (updates.includes(articleId)) {
    return false
  }

  return true
}

export const updateRate = (articleId: string) => {
  const updates = JSON.parse(localStorage.getItem('rate') ?? '[]') as string[]
  localStorage.setItem('rate', JSON.stringify([...updates, articleId]))
}
