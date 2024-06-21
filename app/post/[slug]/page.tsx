import { Post, getPosts } from "@/app/lib/posts";
import "./styles/post.css";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = (await getPosts()).find((post) => post.slug === params.slug)!;

  const { title, children } = post;

  return (
    <>
      <title>{title}</title>
      <div className="flex flex-col-reverse md:flex-row space-x-8">
        <div id="spacer" className="w-[250px] flex-shrink-0 hidden xl:block" />
        <article className="markdown-body max-w-full xl:max-w-[750px]">
          {children}
        </article>
        <PostInfoPanel post={post} />
      </div>
    </>
  );
}

function PostInfoPanel({ post }: { post: Post }) {
  const { created_at, updated_at, gitHistoryUrl } = post;
  return (
    <aside className="w-[250px] flex-shrink-0 space-y-4">
      <div className="text-xs text-muted w-full flex flex-col space-y-2">
        <span>🕓 {Math.ceil(post.wordCount / 200)} minute read</span>
        <span>📅 Published {created_at.toDateString()}</span>
        {updated_at != created_at && (
          <Link href={gitHistoryUrl}>
            🔗 Edited {updated_at.toDateString()}
          </Link>
        )}
      </div>
      <TableOfContents headings={post.headings} />
    </aside>
  );
}
