import { Document } from 'contentlayer/core'
import Fuse from 'fuse.js'
import React, { FormEvent, useState } from 'react'

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

    return (<div className="flex items-center justify-between mb-8 group">
        <h1 className="text-6xl">
        All <strong>{ entryType }</strong>
        <small className="align-middle badge group-focus-within:bg-amber-200">{ resultsCount }</small>
      </h1>
      <div className="flex items-center gap-2 pl-4 transition-colors rounded-full group-focus-within:bg-amber-200 bg-amber-100">
        <span>🔍</span>
        <input
            type="text"
            className="px-4 py-1 border rounded-full border-amber-600"
            onChange={onChange}
            placeholder={`Search ${entries.length} ${entryType}`}
        />
      </div>
    </div>)
}