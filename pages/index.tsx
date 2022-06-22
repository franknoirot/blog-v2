import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post, allBooks, Book, allProjects, Project } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import PostCard from 'components/PostCard'
import BookCard from 'components/BookCard'
import ProjectCard from 'components/ProjectCard'
import Link from 'next/link'
import HeadingWithSeeAll from 'components/HeadingWithSeeAll'

export async function getStaticProps() {
  const byDescLastUpdated = (a: Post | Project, b: Post | Project) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  }

  const posts = allPosts.sort(byDescLastUpdated)
  const projects = allProjects.sort(byDescLastUpdated)

  const books = allBooks.sort((a, b) => a.title > b.title ? 1 : -1)
  return { props: { posts, books, projects } }
}

interface IHomeProps { posts: Post[], books: Book[], projects: Project[] }

const Home: NextPageWithLayout = (props) => {
  const { posts, books, projects } = props as IHomeProps
  
  return (
    <div className="max-w-5xl py-16 mx-auto">
      <Head>
        <title>Frank Noirot&apos;s Digital Garden</title>
      </Head>

      <section className="mb-16">
        <h1 className="mb-4 text-6xl leading-tight"><strong>Frank Noirot</strong> is writing about software, design, ecology, and cities.</h1>
        <p className='text-xl leading-normal'>
          Thanks for stopping by! This is my <strong>digital garden 🪴</strong> powered by <a href="https://obsidian.md" rel="noreferrer nofollower" target="_blank">Obsidian</a> notes and <a href="https://nextjs.dev/" rel="noreferrer" target="_blank">NextJS</a>. It contains a subset of my personal &quot;second brain&quot; notes that I think are either polished or interesting enough to publish, along with all of my library books that are available for borrowing, and a selection of projects to which I&lsquo;ve gotten to contribute.
        </p>
      </section>

      <HeadingWithSeeAll href="/posts" totalEntries={posts.length}>Notes</HeadingWithSeeAll>
      <section className='grid grid-cols-3 gap-2 gap-y-4'>
      {posts.slice(0,9).map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
      </section>
      <hr className='mt-8 mb-14' />
      <HeadingWithSeeAll href="/books" totalEntries={books.length}>Books</HeadingWithSeeAll>
      <section className='book-section'>
        {books.slice(0,8).map((Book, idx) => (
          <BookCard key={idx} {...Book} />
        ))}
      </section>
      <hr className='mt-8 mb-14' />
      <HeadingWithSeeAll href="/projects" totalEntries={projects.length}>Projects</HeadingWithSeeAll>
      {projects.map((project, idx) => (
        <ProjectCard key={'project-'+idx} {...project} />
      ))}
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default Home