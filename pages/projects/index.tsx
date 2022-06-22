import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allProjects, Project } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import ProjectCard from 'components/ProjectCard'
import ListingPageHeading from 'components/ListingPageHeading'

export async function getStaticProps() {
  const projects = allProjects.sort((a, b) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  })

  return { props: { projects } }
}

interface IProjectLandingProps { projects: Project[] }

const ProjectLanding: NextPageWithLayout = (props) => {
  const { projects } = props as IProjectLandingProps
  
  return (
    <div className="max-w-6xl py-16 mx-auto">
      <Head>
        <title>f(n): All Projects</title>
      </Head>

      <ListingPageHeading entryType='Projects' entryCount={projects.length} />
      <section className="posts-section">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </section>
    </div>
  )
}

ProjectLanding.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>{ page }</BaseLayout>
  )
}

export default ProjectLanding