import { getPosts } from "@/app/lib/posts";
import "./styles/post.css";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { title, children } = (await getPosts()).find(
    (post) => post.slug === params.slug
  )!;

  return (
    <>
      <title>{title}</title>
      <article className="markdown-body">{children}</article>
    </>
  );
}
