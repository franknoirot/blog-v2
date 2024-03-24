interface ICitation {
    author?: string, // Author's name
    editor?: string, // Editor's name
    title: string,// Full title of each publication (from the title page, not the front cover)
    subtitle?: string,
    publisher?: string, // Publisher
    publishLocation?: string, // City of publication (cite only the first city if there is more than one)
    firstPublished?: number, // Date of publication
    publishDate: number,
    edition?: string, // Volume and issue numbers, if available (for journals)
    format: string, // Medium of publication or reception (print, web, radio, television, LP, CD, etc.)
    
    pageRange?: string, // Page numbers you have referenced
    subworkTitle?: string, // Only for smaller works within an larger one
}

export default function Citation(props: React.PropsWithoutRef<ICitation>) {
    const {
        author,
        editor,
        title,
        subtitle,
        publisher,
        publishLocation,
        firstPublished,
        publishDate,
        edition,
        pageRange,
        format,
        subworkTitle
    } = props

    const authorOrEd = author || editor

    const maybeSwappedName = (authorOrEd && ![',', ' and ', ' & ', ' + '].some(joiner => authorOrEd.includes(joiner)))
        ? authorOrEd?.slice(authorOrEd?.lastIndexOf(' ')) + ', ' + authorOrEd.slice(0, authorOrEd.lastIndexOf(' '))
        : authorOrEd

    return (<p>
        {maybeSwappedName ? (maybeSwappedName+ (!author && editor ? ', editor. ' : '. ')) : 'Author Unknown. '}
        {subworkTitle ? `"${subworkTitle}." ` : ''}
        <em>{title}{subtitle ? ': ' + subtitle : ''}. </em>
        {edition ? ` ${edition}. `: ''}
        {publishLocation ? `${publishLocation}: ` : ''}
        {publisher ? `${publisher}, ` : ''}
        {publishDate || firstPublished || 'Date unknown'}. {pageRange ? pageRange+'. ' : ''}
        {format}.
    </p>)
}