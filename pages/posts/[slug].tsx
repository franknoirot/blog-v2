import Head from 'next/head'
import { format, parseISO } from 'date-fns'
import { GetStaticProps } from 'next'
import { DocumentTypesNoNowUpdates, getBacklinks, obsidianLinksPostProcess } from 'lib/markdown'
import { ParsedUrlQuery } from 'querystring'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { Backlink, NextPageWithLayout } from 'lib/utilityTypes'
import PostCorner from 'components/PostCorner'
import { allDocuments, allPosts, type Post } from 'contentlayer/generated'
import { imageIdentifier } from 'lib/remarkObsidianLinks'
import MdxBody from 'components/MdxBody'
import Seo from 'components/Seo'
import { GROWTH_STAGE_ICONS } from 'lib/consts'
import Link from 'next/link'
import { adjustDate } from 'lib/time'



export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

type PostMdOrMdx = Post & { body: { code: string }}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params as IParams
  const post = allPosts.find((post) => post._raw.sourceFileName.includes(slug)) as PostMdOrMdx

  const backlinks = getBacklinks(slug)

  post.body.code = obsidianLinksPostProcess(post.body.code, allDocuments)

  return {
    props: {
      post,
      backlinks,
    },
  }
}



interface IPostParams { post: PostMdOrMdx, backlinks: Backlink[] }

interface ICodeComponentParams extends React.PropsWithChildren {
  node: any,
  inline: boolean,
  className: string,
}

const PostTemplate: NextPageWithLayout = (props) => {
  const { post, backlinks } = props as IPostParams;
    
  return (
    <>
      <Seo
        title={post.title + ' | Frank Noirot'}
        description={'A ' + GROWTH_STAGE_ICONS[post.growthStage] + ` ${post.growthStage}-stage note: ` + post.description}
      />
      <article className="max-w-3xl px-4 py-8 mx-auto cl-post-body">
        <div className="mb-8">
          <h1 className="mb-1 text-3xl leading-tight md:text-4xl lg:text-5xl first-letter:capitalize">{post.title}</h1>
          <div className="post-meta">
            <p>
              Growth Stage: <span className={"text-green-700 capitalize " + post.growthStage}>{ post.growthStage }</span>
            </p>
            <p>
              Created on <time dateTime={post.created}>{format(adjustDate(post.created), 'LLLL d, yyyy')}</time>
            </p>
            <p>
              Last tended <time dateTime={post.updated}>{format(adjustDate(post.updated), 'LLLL d, yyyy')}</time>
            </p>
          </div>
        </div>
        <MdxBody content={ post.body.code }/>
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
      </article>
    </>
  )
}

PostTemplate.getLayout = function getLayout(page: ReactElement) {
  const randomColor = Math.floor(Math.random() * 360)

  return (<>
    <BaseLayout>
      {page}
    </BaseLayout>
    <PostCorner
      className='w-1/5'
      bgColor={{start: `hsl(${randomColor}deg, 40%, 95%)`, end: `hsl(${randomColor + 60}deg, 60%, 80%)`}}
      circleColor={`hsl(${randomColor + 30}deg, 50%, 85%)`}
    />
  </>)
}

export default PostTemplate