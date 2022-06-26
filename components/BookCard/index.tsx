import { Book } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import styles from './BookCard.module.css'

export default function BookCard(book: Book) {
    return (
    <Link href={book.url}><a className={'group ' + styles.cardWrapper}>
      <div className={styles.card}>
        <figure className={styles.coverWrapper}>
          <Image
            src={'/assets/'+book.coverImg}
            className={styles.cover}
            alt={book.title}
            width={180} height={240}objectFit="contain"
          />
        </figure>
        <h2 className={styles.heading}>{book.title}</h2>
        <p className="text-sm">{(book.editor && !book.author) ? "edited " : ""}by { book.author || book.editor || "unknown" }</p>
      </div>
    </a></Link>
    )
}