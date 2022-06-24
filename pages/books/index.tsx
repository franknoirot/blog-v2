import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allBooks, Book } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import BookCard from 'components/BookCard'
import ListingPageHeading from 'components/ListingPageHeading'
import { useMemo, useState } from 'react'
import Seo from 'components/Seo'

export async function getStaticProps() {
  const books = allBooks.sort((a, b) => a.title < b.title ? -1 : 1)
    .map(({ // send a subset of the book data to not overwhelm the page.
      title,
      subtitle,
      category,
      author,
      editor,
      url,
      coverImg,
    }) => ({
      title,
      subtitle: subtitle || "",
      category,
      author: author || "",
      editor: editor || "",
      url,
      coverImg,
    }))

  return { props: { books } }
}

interface IBookLandingProps { books: Book[] }

const BookLanding: NextPageWithLayout = (props) => {
  const { books } = props as IBookLandingProps
  const [processedBooks, updateBooks] = useState(books)
  
  return (
    <div className="max-w-6xl mx-auto md:py-8 lg:py-16">
      <Seo
        title={`Frank Noirot: All Books`}
        description={`Books that I own that I have thoughts on. Nearly all are available to borrow upon request. In fact I'll ship one to you to if you promise to send it back 💞`}
      />

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