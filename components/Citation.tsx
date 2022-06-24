interface ICitation {
    author?: string, // Author's name
    title: string,// Full title of each publication (from the title page, not the front cover)
    subtitle?: string,
    publisher?: string, // Publisher
    publishLocation?: string, // City of publication (cite only the first city if there is more than one)
    firstPublished?: number, // Date of publication
    publishDate: number,
    edition?: number, // Volume and issue numbers, if available (for journals)
    format: string, // Medium of publication or reception (print, web, radio, television, LP, CD, etc.)
    
    pageRange?: string, // Page numbers you have referenced
    subworkTitle?: string, // Only for smaller works within an larger one
}

export default function Citation(props: React.PropsWithoutRef<ICitation>) {
    const {
        author,
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

    const maybeSwappedName = (author && !author?.includes(','))
        ? author?.slice(author?.lastIndexOf(' ')) + ', ' + author.slice(0, author.lastIndexOf(' '))
        : author

    return (<p>
        {maybeSwappedName ? maybeSwappedName+'. ' : 'Author Unknown. '}
        {subworkTitle ? `"${subworkTitle}." ` : ''}
        <em>{title}{subtitle ? ': ' + subtitle : ''}. </em>
        {edition ? ` ${edition}. `: ''}
        {publishLocation ? `${publishLocation}: ` : ''}
        {publisher ? `${publisher}, ` : ''}
        {firstPublished || publishDate}. {pageRange ? pageRange+'. ' : ''}
        {format}.
    </p>)
}