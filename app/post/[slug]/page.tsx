import { getPosts } from "@/app/lib/posts";
import "./styles/post.css";
import Link from "next/link";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { title, children, created_at, updated_at, path } = (
    await getPosts()
  ).find((post) => post.slug === params.slug)!;

  return (
    <>
      <title>{title}</title>
      <div className="text-xs text-muted w-full text-right">
        <Link
          href={
            process.env.GIT_REF
              ? `https://github.com/${process.env.POSTS_REPO}/commits/${
                  process.env.GIT_REF ?? "main"
                }/${path}`
              : "#"
          }
        >
          📅 {created_at.toDateString()}
          {created_at != updated_at && "*"}
        </Link>
      </div>
      <article className="markdown-body">{children}</article>
    </>
  );
}
