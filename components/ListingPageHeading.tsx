interface IListingPageHeadingProps {
    entryType: string,
    entryCount: number,
}

export default function ListingPageHeading({ entryType, entryCount }: IListingPageHeadingProps) {
    return (
        <h1 className="mb-8 text-6xl">
        All <strong>{ entryType }</strong>
        <small className="align-middle badge">{ entryCount }</small>
      </h1>
    )
}