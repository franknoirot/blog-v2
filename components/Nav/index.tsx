import { link } from "fs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Icon from "components/Icon"
import styles from './Nav.module.css'

type NavLink = {
    label: string,
    href: string,
}

interface INavProps {
    navLinks: NavLink[],
}

const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://instagram.com/franknoirot',
        icon: 'instagram',
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/frank-johnson-noirot',
        icon: 'linkedin',
    },
    {
        label: 'Twitter',
        href: 'https://twitter.com/frank_noirot',
        icon: 'twitter',
    },
]

const Nav: React.FC<INavProps> = ({ navLinks }: { navLinks: NavLink[] }) => {
    const router = useRouter()
    const getCurrentClasses = (slug: string) => (router.asPath.includes(slug))
        ? 'text-amber-800 bg-amber-100'
        : ''

    return <nav className={styles.nav} style={{gridTemplateColumns: 'auto 1fr'}}>
        <Link href="/">
            <a className="block w-8 md:w-10 md:row-span-2 hover:text-amber-500">
                <Icon type="logo" />
            </a>
        </Link>
        <ul className="flex col-start-2 gap-2">
            { navLinks.map(page => (
                <li key={page.href}>
                    <Link href={page.href}>
                        <a className={'px-2 py-1 hover:bg-amber-200 hover:text-amber-900 rounded-sm ' + getCurrentClasses(page.href)}>
                            { page.label }
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
        <ul className="items-center hidden col-start-2 row-span-2 gap-4 px-2 md:flex">
            { socialLinks.map(page => (
                <li key={page.href}>
                    <Link href={page.href}>
                        <a className={"text-neutral-500 hover:text-amber-600"} target="_blank" rel="nofollower noopener">
                            <Icon type={page.icon} width={20} />
                        </a>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
}

export default Nav