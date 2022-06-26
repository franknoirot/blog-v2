import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type Backlink = {
    title: string,
    url: string,
    type: string,
}