import Script from "next/script";

export function Comments() {
  return (
    <Script
      src="https://utteranc.es/client.js"
      // @ts-ignore
      repo="franknoirot/blog-v2"
      issue-term="pathname"
      label="💬 comments"
      theme="preferred-color-scheme"
      crossOrigin="anonymous"
      async
    />
  );
}
