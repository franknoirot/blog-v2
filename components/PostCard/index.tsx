import { Post } from "contentlayer/generated";
import { format, parseISO } from 'date-fns'
import Link from "next/link";
import styles from './PostCard.module.css'

export default function PostCard(post: Post, headingLevel = 3) {

    return (
    <Link href={post.url}><a className={styles.cardWrapper + ' group'}>
      <div className={styles.card}>
        <h3 className={styles.heading + ' group-hover:text-green-900'}>{post.title}</h3>
        <p className="text-sm">
            <span className={styles.growthStage + " stage-before " + post.growthStage}>{ post.growthStage }</span>
            <time dateTime={post.updated} className="text-xs text-slate-600">
            Last tended {format(parseISO(post.updated), 'LLLL d, yyyy')}
            </time>
        </p>
      </div>
    </a></Link>
    )
}