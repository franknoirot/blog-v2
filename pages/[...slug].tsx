import Head from 'next/head'
import { allDocuments, allPages, Page } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import { obsidianLinksPostProcess } from 'lib/markdown'
import PostCorner from 'components/PostCorner'
import { ParsedUrlQuery } from 'querystring'
import { GetStaticProps } from 'next'
import MdxBody from 'components/MdxBody'
import Seo from 'components/Seo'

export async function getStaticPaths() {
  const paths = allPages.map((page) => page.url)
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string[] | string
}

type PageMdOrMdx = Page & { body: { code: string }}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams

  const page = allPages.find((page) => page.url.includes((Array.isArray(slug)) ? slug.join('/') : slug)) as PageMdOrMdx
  page.body.code = obsidianLinksPostProcess(page.body.code, allDocuments)

  return {
    props: {
      page,
    },
  }
}

interface IPageParams { page: PageMdOrMdx, pageBody: string }

const PageTemplate: NextPageWithLayout = (props) => {
  const { page } = props as IPageParams
  
  return (
    <>
      <Seo
        title={page.title + " | Frank Noirot"}
        description={page.description}
      />
      <article className="max-w-3xl mx-auto md:py-8 page">
        <MdxBody content={ page.body.code }/>
      </article>
    </>
  )
}

PageTemplate.getLayout = function getLayout(page: ReactElement) {
  return (<>
    <BaseLayout>
      {page}
    </BaseLayout>
    <PostCorner bgColor={{start: "blue", end: "navy"}} circleColor="teal" />
  </>)
}

export default PageTemplate