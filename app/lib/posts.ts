import fs from "fs";
import child_process from "child_process";
import path from "path";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import rehypeInferDescriptionMeta from "rehype-infer-description-meta";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { h } from "hastscript";
import rehypeToc, { TocElement } from "./rehypeToc";
import GithubSlugger from "github-slugger";

export const PostsPerPage = process.env.POSTS_PER_PAGE
  ? parseInt(process.env.POSTS_PER_PAGE)
  : 5;

export async function getPosts() {
  return await getPostsPromise;
}

export type Post = {
  file: string;
  title: string;
  slug: string;
  children: React.ReactNode;
  description: string;
  created_at: Date;
  updated_at: Date;
  wordCount: number;
  githubHistoryUrl: string;
  githubDiscussionsUrl: string;
  headings: TocElement[];
};

const POSTS_DIRECTORY = process.env.POSTS_DIRECTORY ?? ".posts";

const GIT_BRANCH = child_process
  .execSync(`cd ${POSTS_DIRECTORY} && git rev-parse --abbrev-ref HEAD`)
  .toString()
  .trim();

const GIT_REMOTE = child_process
  .execSync(`cd ${POSTS_DIRECTORY} && git config --get remote.origin.url`)
  .toString()
  .trim();

const files = fs.readdirSync(POSTS_DIRECTORY, {
  recursive: true,
  encoding: "utf-8",
});

const getPostsPromise = Promise.all(
  files
    .filter((file) => file.includes(".md"))
    .map(async (file) => {
      // Use git to get the last modified date of the file
      const filePath = path.resolve(POSTS_DIRECTORY, file);

      const slug = file.replace(/.md$/, "").replace(/[\s\/\\]/g, "-");

      const raw = fs.readFileSync(filePath, "utf-8");
      const processed = await processMarkdown(raw);

      const { frontmatter, meta, headings } = processed.data;

      const title =
        (frontmatter as Record<string, string> | undefined)?.title || // Frontmatter
        raw.match(/^#\s(.*)$/m)?.[1] || // First h1
        file.replace(/.md$/, ""); // File name

      const relativePath =
        process.env.NODE_ENV === "development"
          ? path.join(POSTS_DIRECTORY, file)
          : file;

      return {
        file: relativePath,
        githubHistoryUrl: `${GIT_REMOTE}/commits/${
          GIT_BRANCH ?? "main"
        }/${relativePath}`,
        githubDiscussionsUrl: `${GIT_REMOTE}/discussions/new?category=general&labels=question&title=${encodeURIComponent(
          `Comment on \"${title}\"`
        )}`,
        title,
        slug,
        children: processed.result,
        wordCount: raw.trim().split(/\s+/).length,
        description: meta?.description ?? "No description.",
        headings: (headings ?? []) as TocElement[],
        ...getGitProperties(filePath),
      };
    })
).then((posts) => {
  const slugger = new GithubSlugger();
  // Sort oldest to newest for generating slugs
  posts = posts.sort((a, b) => a.created_at.getTime() - b.created_at.getTime());

  posts.forEach((post) => {
    post.slug = slugger.slug(post.title);
  });

  // Sort newest to oldest for display
  posts = posts.reverse();
  return posts satisfies Post[];
});

function getGitProperties(file: string) {
  const stdout = child_process
    .execSync(
      `cd ${POSTS_DIRECTORY} && git log --follow --format=%ad --date default \"${file}\"`
    )
    .toString();

  const dates = stdout.split("\n").filter((x: any) => x);

  if (dates.length === 0) {
    // Not in git, we are debugging

    return {
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  return {
    created_at: new Date(dates[dates.length - 1]),
    updated_at: new Date(dates[0]),
  };
}

async function processMarkdown(content: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["toml", "yaml"])
    .use(remarkParseFrontmatter)
    .use(remarkRehype)
    .use(rehypeInferDescriptionMeta, {
      truncateSize: 240,
      ignoreSelector: "h1, h2, h3, style, script, noscript, template",
    })
    .use(rehypeHighlight)
    .use(remarkGfm)
    .use(rehypeSlug)
    .use(rehypeToc)
    .use(rehypeAutolinkHeadings, {
      behavior: "prepend",
      headingProperties: {
        class: "anchor-heading",
      },
      content: h(".anchor-link", `🔗`),
    })
    .use(rehypeReact, require("react/jsx-runtime"))
    .process(content);
}
