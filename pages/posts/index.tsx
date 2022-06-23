import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import PostCard from 'components/PostCard'
import ListingPageHeading from 'components/ListingPageHeading'
import { useState } from 'react'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  })

  return { props: { posts } }
}

interface IPostLandingProps { posts: Post[] }

const PostLanding: NextPageWithLayout = (props) => {
  const { posts } = props as IPostLandingProps
  const [processedPosts, updatePosts] = useState(posts)
  
  return (
    <div className="max-w-6xl py-16 mx-auto">
      <Head>
        <title>f(n): All Notes</title>
      </Head>

      <ListingPageHeading entryType='Notes' entries={posts} updateEntries={updatePosts}
        searchConfig={{
          keys: ['title', 'category', 'growthStage']
        }}
      />
      <p className="mb-12 text-lg">
        This site is a tool to get me to write more, so these notes are made public in various stages of growth before they can be called &quot;evergreen&quot;. Some of them may be half-baked or wrong, but I need dense thoughts before I can have refined thoughts. I encourage anyone interested in my writing to reach out to me with questions, corrections, and connections about any of these thoughts below.
      </p>
      <section className="posts-section">
        {processedPosts.map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </section>
    </div>
  )
}

PostLanding.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default PostLanding