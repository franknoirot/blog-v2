import { Document } from 'contentlayer/core'
import Fuse from 'fuse.js'
import React, { FormEvent, useState } from 'react'
import styles from './ListingPageHeading.module.css'

interface IListingPageHeadingProps {
    entryType: string,
    entries: Document[],
    searchConfig: Fuse.IFuseOptions<Document>,
    updateEntries: Function,
}

export default function ListingPageHeading({ entryType, entries, searchConfig, updateEntries }: IListingPageHeadingProps) {
    const fuse = new Fuse(entries, searchConfig)
    const [resultsCount, updateResultCount] = useState(entries.length)

    function onChange(e: FormEvent<HTMLInputElement>) {
        if (!e.currentTarget.value) {
            updateEntries(entries)
            updateResultCount(entries.length)
            return
        }

        const newResults = fuse.search(e.currentTarget.value).map(result => result.item)
        updateEntries(newResults)
        updateResultCount(newResults.length)
    }

    return (<section className={styles.section + ' group'}>
        <h1 className="text-4xl md:text-6xl">
        All <strong>{ entryType }</strong>
        <small className="align-middle badge group-focus-within:bg-amber-200">{ resultsCount }</small>
      </h1>
      <div className={styles.searchWrapper + ' group-focus-within:bg-amber-200'}>
        <span>🔍</span>
        <input
            type="text"
            className={styles.search}
            onChange={onChange}
            placeholder={`Search ${entries.length} ${entryType}`}
        />
      </div>
    </section>)
}