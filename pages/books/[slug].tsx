import { allBooks, allDocuments, Book } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { getBacklinks, obsidianLinksPostProcess } from 'lib/markdown'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { Backlink, NextPageWithLayout } from 'lib/utilityTypes'
import extractColors from 'extract-colors'
import { useContext, useEffect } from 'react'
import BookLayout, { BookContext } from 'components/layouts/BookLayout'
import Seo from 'components/Seo'
import Citation from 'components/Citation'
import Link from 'next/link'
import MdxBody from 'components/MdxBody'
import styles from './BookTemplate.module.css'
import { Comments } from 'components/Comments'

export async function getStaticPaths() {
  const paths = allBooks.map((book) => book.url)
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps = async(context) => {
  const { slug } = context.params as IParams
  const book = allBooks.find((book) => book._raw.sourceFileName.includes(slug)) as Book

  const backlinks = getBacklinks(slug)

  book.body.code = obsidianLinksPostProcess(book.body.code, allDocuments)

  return {
    props: {
      book,
      backlinks,
    },
  }
}

export type ExtractedColor = {
  area: number,
  red: number,
  blue: number,
  green: number,
  hex: string,
  saturation: number,
}

interface IBookProps { book: Book, backlinks: Backlink[] }

const BookTemplate: NextPageWithLayout = (props) => {
  const { book, backlinks } = props as IBookProps
  const { setValue } = useContext(BookContext)

  function luminance(color: ExtractedColor ) {
    return 0.2126*color.red + 0.7152*color.green + 0.0722*color.blue
  }
  

  useEffect(() => {
    async function loadColors() {
      if (!(typeof window === 'undefined')) {
        const c = (await extractColors('/assets/'+book.coverImg))
          .sort((a: ExtractedColor, b: ExtractedColor) => luminance(b) - luminance(a) ) as ExtractedColor[]

        setValue({ 
          bgColor: {
            start: c[0].hex,
            end: c[2].hex,
          },
          squareColor: c[1].hex,
        })
      }
    }

    loadColors()
  }, [book.coverImg, setValue])
  
  return (
    <>
      <Seo
        title={book.title +  ` | Frank Noirot's Library`}
        description={`${ book.isBorrowed ? "ⓧ Currently checked out" : "✔ Available to borrow" }. Filed under ${book.category}. ${((book.editor) ? "Edited B" : 'B') + `y ` + (book.author || book.editor || "unknown") }. Copy published in ${book.publishDate}${book.pages ? ', ' + book.pages + ' pages.' : '.'}`}
        image={'/assets/' + book.coverImg}
      />
      <article className="max-w-6xl mx-auto md:py-8 lg:py-16">
        <section className="grid items-center grid-cols-2 mb-10 border-b md:pb-12 md:grid-cols-5">
          <div className='col-span-2 cl-book-cover'>
            <div className={styles.hero}>
              <Image src={'/assets/' + book.coverImg}
                width="350"
                height="350"
                layout='intrinsic'
                objectFit='contain'
                alt={book.title + ' cover'}
                priority
              />
            </div>
          </div>
          <div className="col-span-3 py-6 mt-12 border-t md:border-0 md:mt-0">
            <h1 className="mb-1 text-2xl md:text-4xl">
              {book.title}
              {book.subtitle && (
                <span className="block text:lg md:text-2xl text-stone-600 dark:text-stone-400">{book.subtitle}</span>
              )}
            </h1>
            <div className="grid grid-cols-2 mt-6 text-sm md:grid-cols-3 md:mb-6 gap-x-2 gap-y-3 book-meta text-slate-600 dark:text-stone-500">
            <p>{(!book.author && book.editor) ? "edited " : ''}by {book.author || book.editor || "unknown" }</p>
            { (book.publishDate || book.firstPublished) && <p>
                published in&nbsp;
                <time dateTime={(book.publishDate || book.firstPublished)?.toString() || ""}>
                  {book.publishDate || book.firstPublished}
                </time>
              </p>
            }
            { (book.publishDate && book.firstPublished) && <p>first published in {book.firstPublished}</p>}
            { (book.author && book.editor) && <p>edited by { book.editor }</p> }
            { (book.translator) && <p>translated by { book.translator }</p> }
            { (book.category) && <p>{ book.category }</p> }
            <p>{ book.isBorrowed ? "ⓧ Currently checked out" : "✔ Available to borrow" }</p>
            { (book.pages) && <p>{ book.pages } pages</p> }
            { (book.publisher) && <p>published by { book.publisher }</p> }
            { (book.publishLocation) && <p>published in { book.publishLocation }</p> }
            { (book.format) && <p>owned in { book.format } format</p> }
            </div>
          </div>
        </section>
        <div className="max-w-4xl mx-auto cl-book-body">
        <MdxBody content={ book.body.code }/>
          <h2>Citation</h2>
          <Citation {...book} />
          {backlinks.length > 0 && (<>
          <h2>Other content that links to this</h2>
          <ul>
            {backlinks.map(backlink => (
              <li key={backlink.url}>
                <Link href={backlink.url}><a>
                  <strong>{ backlink.type.replace("Post", "Note") }: </strong>{ backlink.title }
                </a></Link>
              </li>
            ))}
          </ul></>)}
          <Comments />
        </div>
      </article>
    </>
  )
}

BookTemplate.getLayout = function getLayout(page: ReactElement) {
  return (
      <BaseLayout>
        <BookLayout>
        { page }
        </BookLayout>
      </BaseLayout>
  )
}

export default BookTemplate
