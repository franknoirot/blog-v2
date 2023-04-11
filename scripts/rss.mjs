// Source: https://dev.to/sdorra/rss-feed-with-nextjs-5dj8
import { allDocuments } from '../.contentlayer/generated/index.mjs'
import { Feed } from 'feed'
import { compareDesc, parseISO } from 'date-fns'
import { writeFileSync } from 'fs'

const author = {
    name: "Frank Noirot",
    email: "frank@franknoirot.co",
    link: "https://franknoirot.co",
}

const feed = new Feed({
    title: "Frank Noirot's digital garden",
    description: "Thoughts on software, cities, and culture.",
    id: "https://franknoirot.co",
    link: "https://franknoirot.co",
    language: "en",
    favicon: "https://franknoirot.co/favicon.ico",
    copyright: `Frank Noirot © ${new Date().getFullYear()}`,
    author,
})

function getDate(doc) {
    switch (doc.type) {
        case 'NowUpdate':
            return parseISO(doc._raw.flattenedPath.replace('now/', ''))
        default:
            return parseISO(doc.updated)
    }
}

const categories = [
    'Software',
    'Design',
    'Cities',
    'Culture',
    'Books',
]

categories.forEach(category => feed.addCategory(category))

allDocuments.filter(doc => doc.type !== 'Page').sort((a,b) => compareDesc(new Date(getDate(a)), new Date(getDate(b))))
    .forEach(doc => {
        const url = `https://franknoirot.co/${doc._raw.flattenedPath}`

        feed.addItem({
            id: url,
            link: url,
            title: doc.type +' – '+ doc.title,
            description: doc.description,
            date: getDate(doc),
            author,
        })
    })

writeFileSync('./public/feed.xml', feed.rss2(), { encoding: 'utf8' })