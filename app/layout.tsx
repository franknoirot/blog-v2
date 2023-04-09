import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from 'lib/utilityTypes'
import RightClickVisualizer from 'components/RightClickVisualizer'
import Nav from './Nav'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function RootLayout({ Component, pageProps }: AppPropsWithLayout) {
    const navLinks = [
        { label: 'Writing', href: '/posts' },
        { label: 'Library', href: '/books' },
        { label: 'Projects', href: '/projects' },
        { label: 'About', href: '/about' },
    ]
    
    // Use the layout defined at the page level, if available
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>
                <link rel="alternate" type="application/rss+xml" title="franknoirot.co RSS Feed" href="/rss.xml" />
            </head>
            <body>
                <Nav navLinks={navLinks} />
                <main className="mx-2 mt-10 pb-36 md:mt-0 md:mx-4">
                    <Component {...pageProps} />
                </main>
                <RightClickVisualizer />
            </body>
        </html>
    )
}

export default RootLayout
