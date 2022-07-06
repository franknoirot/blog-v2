import {u} from 'unist-builder'
import {findAndReplace} from 'mdast-util-find-and-replace'

export const linkTextIdentifier = '~lt~'
export const linkUrlIdentifier = '~lu~'
export const imageIdentifier = '~img~'

export default function remarkObsidianLinks() {
    const obsidianLinkRegex = /(?<!\!)\[\[(.+?(\|.+?)?)\]\]/g
    const obsidianImageRegex = /\!\[\[(.+?)\]\]/g

    return function transformer(ast) {
        findAndReplace(ast, [
            [
                obsidianLinkRegex,
                function (_, p1, p2) {
                    const slug = p1.includes("|") ? p1.slice(0, p1.indexOf("|")) : p1
                    const linkText = (p2) ? p2.slice(1) : p1

                    return u('link', {url: linkUrlIdentifier + '/' + slug }, [u( 'text', linkTextIdentifier + linkText + linkTextIdentifier)])
                }
            ],
            [
                obsidianImageRegex,
                function (_, p1) {
                    return u('image', {url: imageIdentifier + p1})
                }
            ]
        ])
    }
}

function parseObsidianLinks(text) {
    const obsidianLinkRegex = /(?<!\!)\[\[(.+?(\|.+?)?)\]\]([\W])/g

    return text.replace(obsidianLinkRegex, (_, p1, p2, p3) => {
        const slug = p1.includes("|") ? p1.slice(0, p1.indexOf("|")) : p1

        const linkText = (p2) ? p2.slice(1) : p1

        const linkTextIdentifier = '~lt~'
        const linkUrlIdentifier = '~lu~'

        return `[${linkTextIdentifier}${ linkText }](${ linkUrlIdentifier }${ slug })` + p3
    })
}



