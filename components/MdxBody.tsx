import Link from "next/link";
import Callout from 'components/Callout'
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

interface ILinkProps extends React.PropsWithChildren {
    href: string,
}

export default function MdxBody({ content }: { content: string }) {
    const MdxComponent = useMDXComponent(content)

    return (
        <MdxComponent components={{
            Callout,
            a: ({ href, children, ...rest }: ILinkProps) => <Link href={href}><a {...rest}>{ children }</a></Link>
          }}>
            {content}
        </MdxComponent>
    )
}