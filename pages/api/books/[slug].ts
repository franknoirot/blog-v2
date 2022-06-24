// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allBooks, Book } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Book | { message: string }>
) {
    const slug = req.query?.slug

    if (!slug) {
        res.status(403).json({ message: '/books/[slug] requires a slug to return a Book.'})
    }

    const foundDoc = allBooks.find(doc => doc._raw.sourceFileName.includes(slug as string))

    if (!foundDoc) {
        res.status(404).json({ message: `No Book found for slug "${slug}"`})
    }

    else {
        res.status(200).json(foundDoc)
    }
}