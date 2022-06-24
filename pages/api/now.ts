// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allNowUpdates, NowUpdate } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NowUpdate[]>
) {
  res.status(200).json(allNowUpdates)
}
