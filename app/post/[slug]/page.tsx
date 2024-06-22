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
      <div className="flex flex-col-reverse lg:content-center lg:flex-row lg:space-x-8">
        <div id="spacer" className="flex-grow flex-shrink " />
        <article className="markdown-body flex-grow-1 min-w-0 max-w-[800px]">
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
    <aside className="flex-grow flex-shrink min-w-[250px]">
      <div className="text-xs text-muted w-full flex flex-col space-y-2 mb-4">
        <span>🕓 {Math.ceil(post.wordCount / 200)} minute read</span>
        <span>📅 Published {created_at.toDateString()}</span>
        {updated_at != created_at && (
          <Link href={gitHistoryUrl}>
            🔗 Edited {updated_at.toDateString()}
          </Link>
        )}
      </div>
      <div className="hidden lg:block sticky top-4">
        <TableOfContents headings={post.headings} />
      </div>
    </aside>
  );
}
