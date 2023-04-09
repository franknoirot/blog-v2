// Source: https://dev.to/sdorra/rss-feed-with-nextjs-5dj8
import { allPosts } from '../.contentlayer/generated/index.mjs'
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

allPosts.sort((a,b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach(post => {
        const url = `https://franknoirot.co/posts/${post._raw.flattenedPath}`

        feed.addItem({
            id: url,
            link: url,
            title: post.title,
            description: post.description,
            date: parseISO(post.date),
            category: post.category,
            author,
        })
    })

writeFileSync('./public/feed.xml', feed.rss2(), { encoding: 'utf8' })