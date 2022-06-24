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
import Seo from 'components/Seo'

export async function getStaticProps() {
  const byDescLastUpdated = (a: Post | Project, b: Post | Project) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  }

  const posts = allPosts.sort(byDescLastUpdated)
    .map(({ url, title, growthStage, category, updated }) => ({ url, title, growthStage, category, updated }))
    
  const projects = allProjects.sort(byDescLastUpdated)

  const books = allBooks.sort((a, b) => a.title > b.title ? 1 : -1)
    .map(({ // send a subset of the book data to not overwhelm the page.
      title,
      author,
      editor,
      url,
      coverImg,
    }) => ({
      title,
      author: author || "",
      editor: editor || "",
      url,
      coverImg,
    }))
  return { props: { posts, books, projects } }
}

interface IHomeProps { posts: Post[], books: Book[], projects: Project[] }

const Home: NextPageWithLayout = (props) => {
  const { posts, books, projects } = props as IHomeProps
  
  return (
    <div className="mx-auto md:py-8 lg:py-16 lg:max-w-5xl">
      <Seo
        title={`Frank Noirot's Digital Garden`}
        description={`Frank Noirot (he/him) is a Product Manager based in NYC. He's writing about software, design, ecology, and cities.`}
        image="/assets/about-me.jpg"
      />

      <section className="mb-8 md:mb-16">
        <h1 className="mb-4 text-2xl leading-tight md:text-4xl lg:text-6xl"><strong>Frank Noirot</strong> is writing about software, design, ecology, and cities.</h1>
        <p className='leading-normal md:text-xl'>
          Thanks for stopping by my <strong>digital garden 🪴</strong>! It contains my notes that I think are either polished or interesting enough to publish, along with all of my library books that are available for borrowing, and a selection of projects to which I&lsquo;ve gotten to contribute.
        </p>
      </section>

      <HeadingWithSeeAll href="/posts" totalEntries={posts.length}>Notes</HeadingWithSeeAll>
      <section className='posts-section featured'>
        {posts.slice(0,9).map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </section>
      <hr className='mt-8 mb-14' />
      <HeadingWithSeeAll href="/books" totalEntries={books.length}>Books</HeadingWithSeeAll>
        <section className='book-section featured'>
          {books.slice(0,8).map((Book, idx) => (
            <BookCard key={idx} {...Book} />
          ))}
      </section>
      <hr className='mt-8 mb-14' />
      <HeadingWithSeeAll href="/projects" totalEntries={projects.length}>Projects</HeadingWithSeeAll>
      <section className='project-section featured'>
        {projects.map((project, idx) => (
          <ProjectCard key={'project-'+idx} {...project} />
        ))}
      </section>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default Home