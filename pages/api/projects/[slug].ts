// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allProjects, Project } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | { message: string }>
) {
    const slug = req.query?.slug

    if (!slug) {
        res.status(403).json({ message: '/projects/[slug] requires a slug to return a Project.'})
    }

    const foundDoc = allProjects.find(doc => doc._raw.sourceFileName.includes(slug as string))

    if (!foundDoc) {
        res.status(404).json({ message: `No Project found for slug "${slug}"`})
    }

    else {
        res.status(200).json(foundDoc)
    }
}