import { SITE_ORIGIN } from 'lib/consts';
import Head from 'next/head';
import { useRouter } from "next/router";

interface ISeoProps {
    title: string,
    description: string,
    image?: string,
    hidden?: boolean,
}

export default function Seo({ title, description, image, hidden }: ISeoProps) {
    const router = useRouter()

    return (
        <Head>
            {/* <!-- Primary Meta Tags --> */}
            <title>{ title }</title>
            <meta name="title" content={ title }/>
            <meta name="description" content={ description }/>

            {/* <!-- Open Graph / Facebook --/> */}
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={ SITE_ORIGIN + router.asPath }/>
            <meta property="og:title" content={ title }/>
            <meta property="og:description" content={ description }/>
            { image && <meta property="og:image" content={ SITE_ORIGIN + image }/> }

            {/* <!-- Twitter --/> */}
            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="twitter:url" content={ router.asPath }/>
            <meta property="twitter:title" content={ title }/>
            <meta property="twitter:description" content={ description }/>
            { image && <meta property="twitter:image" content={ SITE_ORIGIN + image }/> }

            { hidden && <meta name="robots" content="noindex nofollow" /> }
        </Head>
    )
}