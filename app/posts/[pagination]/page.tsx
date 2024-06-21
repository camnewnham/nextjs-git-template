import { PostsPerPage, getPosts } from "@/app/lib/posts";
import { PaginatedPosts } from "./PostList";

export async function generateStaticParams() {
  const pages = Math.ceil((await getPosts()).length / PostsPerPage);
  return Array.from({ length: pages }).map((_, index) => ({
    pagination: (index + 1).toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: { pagination: string };
}) {
  const { pagination } = params;
  const pageNumber = parseInt(pagination);
  return <PaginatedPosts pageNumber={pageNumber} />;
}
