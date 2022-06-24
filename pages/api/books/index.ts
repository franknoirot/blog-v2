// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allBooks, Book } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book[]>
) {
  res.status(200).json(allBooks)
}
