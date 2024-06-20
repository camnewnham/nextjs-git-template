import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./Article.css";

export function Article({ content }: { content: string }) {
  return (
    <Markdown
      className={"markdown-body"}
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return (
            <SyntaxHighlighter
              style={dark}
              {...rest}
              children={String(children).replace(/\n$/, "")}
              language={match && match[1]}
            />
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
