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
  const byDescLastUpdated = (a: Book | Post | Project, b: Book | Post | Project) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  }

  const posts = allPosts.sort(byDescLastUpdated)
    .map(({ url, title, growthStage, category, updated }) => ({ url, title, growthStage, category, updated }))
    
  const projects = allProjects.sort(byDescLastUpdated)

  const books = allBooks.sort(byDescLastUpdated)
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

  const totals = {
    posts: posts.length,
    books: books.length,
    projects: projects.length,
  }

  return {
    props: {
      posts: posts.slice(0, 9),
      books: books.slice(0, 8),
      projects: projects.slice(0, 6),
      totals,
    }
  }
}

interface IHomeProps {
  posts: Post[],
  books: Book[],
  projects: Project[],
  totals: {
    posts: number,
    books: number,
    projects: number,
  }
}

const Home: NextPageWithLayout = (props) => {
  const { posts, books, projects, totals } = props as IHomeProps
  
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

      <HeadingWithSeeAll href="/posts" totalEntries={totals.posts}>Notes</HeadingWithSeeAll>
      <section className='posts-section featured'>
        {posts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </section>
      <hr className='mt-8 mb-14' />
      <HeadingWithSeeAll href="/books" totalEntries={totals.books}>Books</HeadingWithSeeAll>
        <section className='book-section featured'>
          {books.map((book, idx) => (
            <BookCard key={idx} {...book} />
          ))}
      </section>
      <hr className='mt-8 mb-14' />
      <HeadingWithSeeAll href="/projects" totalEntries={totals.projects}>Projects</HeadingWithSeeAll>
      <section className='projects-section featured'>
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