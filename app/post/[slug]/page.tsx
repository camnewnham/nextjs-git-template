import { Post } from "./Post";
import { getPosts } from "@/app/lib/posts";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { title, content } = (await getPosts()).find(
    (post) => post.slug === params.slug
  )!;

  return <Post content={content} title={title} />;
}
