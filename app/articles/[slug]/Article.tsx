import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

// Import rehype themes
//import "highlight.js/styles/github.css";

import "./styles/article.css";

export async function Article({
  title,
  content,
}: {
  content: string;
  title: string;
}) {
  return (
    <article>
      <title>{title}</title>
      <Markdown
        className={"markdown-body"}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
      >
        {content}
      </Markdown>
    </article>
  );
}
