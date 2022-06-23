import React from "react"
import styles from './Callout.module.css'

interface ICalloutProps extends React.PropsWithChildren {
    title: string,
    level?: 1 | 2 | 3 | 4,
    type?: 'warning' | 'info' | 'success' | 'error'
}



export default function Callout({ title, level = 2, type = "info", children }: ICalloutProps) {
    const Heading = `h${level}` as keyof JSX.IntrinsicElements
    
    return <section className={styles.callout + ' ' + styles[type]}>
        <Heading className={styles.heading}>{title}</Heading>
        {children}
    </section>

}