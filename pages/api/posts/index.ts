// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allPosts, Post } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
  res.status(200).json(allPosts)
}
