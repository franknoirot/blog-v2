import { allDocuments, Book, DocumentTypes, Page, Post, Project } from "contentlayer/generated";
import React from "react";
import { imageIdentifier, linkTextIdentifier, linkUrlIdentifier } from "./remarkObsidianLinks";

export type DocumentTypesNoNowUpdates = Book | Page | Post | Project

export function parseObsidianLinks(content: string, isMarkdown: boolean = true): string {
    const obsidianLinkRegex = /(?<!\!)\[\[(.+?(\|.+?)?)\]\]([\W])/g
    if (!content) return ''

    let transformedContent = content.replace(obsidianLinkRegex, (_, p1, p2, p3) => {
        const slug = p1.includes("|") ? p1.slice(0, p1.indexOf("|")) : p1
        
        const filteredDocs = allDocuments.filter(doc => !['NowUpdate'].includes(doc.type)) as DocumentTypesNoNowUpdates[]
        const doc = filteredDocs.find((doc: DocumentTypesNoNowUpdates) => doc.url.includes('/'+slug)) as DocumentTypesNoNowUpdates;

        const linkText = (p2) ? p2.slice(1) : (doc?.title || p1)
        
        if (!doc?.url) {
            return linkText + p3
        }

        console.log({isMarkdown})

        const linkMarkup = (isMarkdown)
            ? `[${ linkText }](${ doc.url })` + p3
            : `<a href=${ doc.url } ${ (isExternal(doc.url) ? 'target="_blank" rel="nofollower noopener"' : '')}>${ linkText }</a>`
        return linkMarkup
    })

    const obsidianInternalImgRegEx = /\!\[\[(.+)\]\]/g

    transformedContent = transformedContent.replace(obsidianInternalImgRegEx, (_, p1) => {
        return `![](/assets/${p1})`
    })

    return transformedContent
}

function isExternal(linkHref: string): boolean {
    const external = !(linkHref.startsWith('/')
        || ['franknoirot.co', 'localhost:'].some(origin => linkHref.includes(origin)))
    console.log({ linkHref, starts: linkHref.startsWith('/'), noOrigin: ['franknoirot.co', 'localhost:'].some(origin => linkHref.includes(origin)), external })
    return external
}


interface IParseCodeBlockProps extends React.PropsWithChildren {
    node: any,
    inline: boolean,
    className: string,
    props: any,
}

export function obsidianLinksPostProcess(text: string, allDocuments: DocumentTypes[]) {
    const replaceUrlRegex = new RegExp(linkUrlIdentifier+"\/([\\s\\w-%]+)(?=\")", 'g')

    text = text.replaceAll(imageIdentifier, '/assets/') || ''
  
    if (replaceUrlRegex.test(text)) {
        const allSlugs = [] as string[];
        const allLinkedDocs = [] as DocumentTypesNoNowUpdates[];

        text = text.replace(replaceUrlRegex, (_: string, p1: string) => {
            const allDocsNoNowUpdates = allDocuments.filter(doc => doc.type !== 'NowUpdate') as DocumentTypesNoNowUpdates[]
            const foundDoc = allDocsNoNowUpdates.find((doc) => doc.url.includes('/' + p1)) as (DocumentTypesNoNowUpdates | undefined)
            
            // if the link is to a private or non-existing document nullify it   
            // I used CSS selector a[href$="#"] to cancel pointer-events on empty links!
            if (!foundDoc) return '#'

            allSlugs.push(p1)
            allLinkedDocs.push(foundDoc)

            return foundDoc.url
        })

        const replaceLabelRegex = new RegExp(linkTextIdentifier+"(.+)"+linkTextIdentifier, 'g')
        text = text.replace(replaceLabelRegex, (_: string, p1: string) => {
            return allLinkedDocs.find(doc => doc._raw.sourceFileName.includes(p1))?.title || p1.replaceAll(linkTextIdentifier, '')
        })
    }

    return text
}

export function getBacklinks(slug: string) {
    const backlinkingDocs = allDocuments.filter(doc => doc.type !== "NowUpdate" && doc.body.raw.includes('[['+slug)) as DocumentTypesNoNowUpdates[]
    return backlinkingDocs.map(doc => ({ title: doc.title, url: doc.url, type: doc.type }))
}