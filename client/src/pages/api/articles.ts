import type { Article } from '@models/articles'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  articles: Article[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log(req)
  res.status(200).json({ articles: [] })
}
