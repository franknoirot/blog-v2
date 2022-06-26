import { allDocuments, allProjects, Project } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { getBacklinks, obsidianLinksPostProcess } from 'lib/markdown'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import BaseLayout from 'components/layouts/BaseLayout'
import { Backlink, NextPageWithLayout } from 'lib/utilityTypes'
import { ParsedUrlQuery } from 'querystring'
import Seo from 'components/Seo'
import MdxBody from 'components/MdxBody'
import { format, parseISO } from 'date-fns'
import styles from './Project.module.css'
import Head from 'next/head'
import Link from 'next/link'
import { adjustDate } from 'lib/time'

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

  const backlinks = getBacklinks(slug)

  project.body.code = obsidianLinksPostProcess(project.body.code, allDocuments)

  return {
    props: {
      project,
      backlinks
    },
  }
}

interface IProjectProps { project: Project, backlinks: Backlink[] }

const ProjectTemplate: NextPageWithLayout = (props) => {
  const { project, backlinks } = props as IProjectProps
  
  return (
    <>
      <Seo
        title={project.title + " | Frank Noirot"}
        description={`Built as part of work with ${project.organization}, where I served as ${project.role} and used ${project.tools}.`}
      />
      <article className={styles.wrapper + ' cl-post-body'}
        style={{'--h': `${project.color?.h}deg`, '--s': `${project.color?.s}%`, '--l': `${project.color?.l}%`} as React.CSSProperties}
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
                Started on <time dateTime={project.created}>{format(adjustDate(project.created), 'LLLL d, yyyy')}</time>
              </p>
              <p>
                Last update on <time dateTime={project.updated}>{format(adjustDate(project.updated), 'LLLL d, yyyy')}</time>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bodyWrapper}>
          <MdxBody content={ project.body.code }/>
        </div>
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

ProjectTemplate.getLayout = function getLayout(page: ReactElement) {
  return (
      <BaseLayout>
        { page }
      </BaseLayout>
  )
}

export default ProjectTemplate
