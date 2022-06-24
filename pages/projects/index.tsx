import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allProjects, Project } from 'contentlayer/generated'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import ProjectCard from 'components/ProjectCard'
import ListingPageHeading from 'components/ListingPageHeading'
import { useState } from 'react'
import Seo from 'components/Seo'


export async function getStaticProps() {
  const projects = allProjects.sort((a, b) => {
    return compareDesc(new Date(a.updated), new Date(b.updated))
  })

  return { props: { projects } }
}

interface IProjectLandingProps { projects: Project[] }

const ProjectLanding: NextPageWithLayout = (props) => {
  const { projects } = props as IProjectLandingProps
  const [processedProjects, updateProjects] = useState(projects)
  
  return (
    <div className="max-w-6xl mx-auto md:py-8 lg:py-16">
      <Seo
        title={`Frank Noirot's Projects`}
        description={`Assorted projects from Frank Noirot's career as a web developer and product manager, with some assorted personal work thrown in.`}
      />

      <ListingPageHeading entryType='Projects' entries={projects} updateEntries={updateProjects}
        searchConfig={{
          keys: ['title', 'author']
        }}
      />
      <section className="posts-section">
        {processedProjects.map((project, idx) => (
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