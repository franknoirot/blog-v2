import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allBooks, Book } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import BookCard from 'components/BookCard'
import ListingPageHeading from 'components/ListingPageHeading'
import { useMemo, useState } from 'react'

export async function getStaticProps() {
  const books = allBooks.sort((a, b) => a.title < b.title ? -1 : 1)

  return { props: { books } }
}

interface IBookLandingProps { books: Book[] }

const BookLanding: NextPageWithLayout = (props) => {
  const { books } = props as IBookLandingProps
  const [processedBooks, updateBooks] = useState(books)
  
  return (
    <div className="max-w-6xl mx-auto md:py-8 lg:py-16">
      <Head>
        <title>f(n): All Books</title>
      </Head>

      <ListingPageHeading entryType='Books' entries={books} updateEntries={updateBooks}
        searchConfig={{
          keys: [
            'title',
            'subtitle',
            'category',
            'author',
          ],
          shouldSort: true,
          includeMatches: true,
        }}
      />
      <section className='book-section'>
        {processedBooks.map((book, idx) => (
          <BookCard key={idx} {...book} />
        ))}
      </section>
    </div>
  )
}

BookLanding.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default BookLanding