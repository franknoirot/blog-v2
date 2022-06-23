import Link from "next/link";
import Callout from 'components/Callout'
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

interface ILinkProps extends React.PropsWithChildren {
    href: string,
}

interface IImgProps {
    src: string,
}

export default function MdxBody({ content }: { content: string }) {
    const MdxComponent = useMDXComponent(content)

    return (
        <MdxComponent components={{
            Callout,
            a: ({ href, children, ...rest }: ILinkProps) => <Link href={href}><a {...rest}>{ children }</a></Link>,
            img: ({ src, ...rest }: React.PropsWithoutRef<IImgProps>) => <img src={src} className="my-8" {...rest}  alt="Alt text is coming soon." />,
          }}>
            {content}
        </MdxComponent>
    )
}