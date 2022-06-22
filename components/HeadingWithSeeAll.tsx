import Link from "next/link";

interface IHeadingWithSeeAllProps extends React.PropsWithChildren {
    href: string,
    totalEntries: number,
}

export default function HeadingWithSeeAll({ children, totalEntries, href }: IHeadingWithSeeAllProps) {
    return (
        <Link href={href}>
            <a className="group">
                <h2 className="align-baseline section-heading">
                    { children }
                    <small className="align-middle badge">
                        { totalEntries }
                    </small>
                    <span className="inline-block text-sm font-normal align-middle cta-arrow">
                        See all
                    </span>
                </h2>
            </a>
        </Link>
        )
}