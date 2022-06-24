import { allDocuments, allProjects, Project } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { obsidianLinksPostProcess } from 'lib/markdown'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { NextPageWithLayout } from 'lib/utilityTypes'
import { ParsedUrlQuery } from 'querystring'
import Seo from 'components/Seo'
import MdxBody from 'components/MdxBody'
import { format, parseISO } from 'date-fns'
import styles from './Project.module.css'
import Head from 'next/head'

export async function getStaticPaths() {
  const paths = allProjects.map((project) => project.url)
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
  const project = allProjects.find((project) => project._raw.sourceFileName.includes(slug)) as Project

  project.body.code = obsidianLinksPostProcess(project.body.code, allDocuments)

  return {
    props: {
      project,
    },
  }
}

interface IProjectProps { project: Project }

const ProjectTemplate: NextPageWithLayout = (props) => {
  const { project } = props as IProjectProps
  
  return (
    <>
      <Seo
        title={project.title + " | Frank Noirot"}
        description={`Built as part of work with ${project.organization}, where I served as ${project.role} and used ${project.tools}.`}
      />
      <article className={styles.wrapper}
        style={{'--h': `${project.color?.h}deg`, '--s': `${project.color?.s}%`, '--l': `${project.color?.l}%`}}
      >
        <div className={styles.topArea}>
          <figure className={styles.featuredImg}>
            <img src={'/assets/' + project.image} alt="" />
          </figure>
          <div className={styles.infoWrapper}>
            <h1 className={styles.heading}>{project.title}</h1>
            <div className={styles.meta}>
              <p className='lg:col-span-2'>For <em>{ project.organization }</em> as a <em>{ project.role}</em></p>
              <p className='lg:col-span-2'><em>🛠 with</em> { project.tools }</p>
              <p>
                Started on <time dateTime={project.created}>{format(parseISO(project.created), 'LLLL d, yyyy')}</time>
              </p>
              <p>
                Last update on <time dateTime={project.updated}>{format(parseISO(project.updated), 'LLLL d, yyyy')}</time>
              </p>
            </div>
          </div>
        </div>
        <MdxBody content={ project.body.code }/>
      </article>
    </>
  )
}

ProjectTemplate.getLayout = function getLayout(page: ReactElement) {
  return (
      <BaseLayout>
        { page }
      </BaseLayout>
  )
}

export default ProjectTemplate
