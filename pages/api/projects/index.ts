// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allProjects, Project } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project[]>
) {
  res.status(200).json(allProjects)
}
