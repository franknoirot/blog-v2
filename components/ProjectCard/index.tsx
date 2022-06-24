import { Project } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import styles from './ProjectCard.module.css'

export default function ProjectCard(project: Project) {
    return (
      <Link href={project.url}>
        <a className={styles.cardWrapper + ' group'}
          style={{'--h': `${project.color?.h}deg`, '--s': `${project.color?.s}%`, '--l': `${project.color?.l}%`}}
        >
            <h2 className={styles.heading}>{project.title}</h2>
            <div className={styles.meta}>
              <p>For <em>{ project.organization }</em> as a <em>{ project.role }</em></p>
              <p><strong>🛠 Tools</strong> { project.tools }</p>
            </div>
        </a>
    </Link>
    )
}