import Link, { LinkProps } from "next/link";
import BirthdayRSVP from "components/BirthdayRSVP";
import Callout from "components/Callout";
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

interface IImgProps {
  src: string;
  alt: string;
}

export default function MdxBody({ content }: { content: string }) {
  const MdxComponent = useMDXComponent(content);

  return (
    <MdxComponent
      components={{
        BirthdayRSVP,
        Callout,
        a: ({
          href,
          children,
          ...rest
        }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
          <Link href={href || ""}>
            <a {...rest}>{children}</a>
          </Link>
        ),
        img: ({
          src,
          alt,
          ...rest
        }: React.ImgHTMLAttributes<HTMLImageElement>) => (
          <img
            src={
              (src && !src.startsWith("http") && !src.startsWith("/assets")
                ? "/assets/"
                : "") + (src || "")
            }
            className="my-8"
            {...rest}
            alt={alt}
          />
        ),
      }}
    >
      {content}
    </MdxComponent>
  );
}
