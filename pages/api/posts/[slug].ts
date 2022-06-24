// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allPosts, Post } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | { message: string }>
) {
    const slug = req.query?.slug

    if (!slug) {
        res.status(403).json({ message: '/posts/[slug] requires a slug to return a Post.'})
    }

    const foundDoc = allPosts.find(doc => doc._raw.sourceFileName.includes(slug as string))

    if (!foundDoc) {
        res.status(404).json({ message: `No Post found for slug "${slug}"`})
    }

    else {
        res.status(200).json(foundDoc)
    }
}