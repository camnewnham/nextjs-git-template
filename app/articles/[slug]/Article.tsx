import remarkGfm from "remark-gfm";
import React from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";

import "./styles/article.css";

export async function Article({
  title,
  content,
}: {
  content: string;
  title: string;
}) {
  const { result: markdown } = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(remarkGfm)
    .use(rehypeReact, require("react/jsx-runtime"))
    .process(content);

  return (
    <article className="markdown-body">
      <title>{title}</title>
      {markdown}
    </article>
  );
}
