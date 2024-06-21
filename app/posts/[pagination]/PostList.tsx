import { getPosts, Post, PostsPerPage } from "@/app/lib/posts";
import { Pagination } from "./Pagination";
import Link from "next/link";
import React from "react";

export async function PaginatedPosts({ pageNumber }: { pageNumber: number }) {
  const posts = await getPosts();
  const totalPages = Math.ceil(posts.length / PostsPerPage);

  // Get the posts that should be displayed on this page
  const pagePosts = posts.slice(
    (pageNumber - 1) * PostsPerPage,
    pageNumber * PostsPerPage
  );

  return (
    <>
      <div className="divide-y divide-default">
        {pagePosts.map((post) => (
          <Exerpt key={post.index} post={post} />
        ))}
      </div>
      <div className="w-full flex justify-center p-4 mt-12">
        <Pagination current={pageNumber} last={totalPages} baseUrl="/posts/" />
      </div>
    </>
  );
}

function Exerpt({ post }: { post: Post }) {
  return (
    <div className="bg-default p-4 pt-8 pb-8 hover:bg-muted last:rounded-b-lg first:rounded-t-lg">
      <Link href={`/post/${post.slug}`}>
        <h1 className="text-xl font-bold">{post.title}</h1>
        <div className="text-xs text-muted mb-2">
          🕓 {Math.ceil(post.wordCount / 200)} minute read
        </div>
        <div className="text-sm text-muted">{post.description}</div>
      </Link>
    </div>
  );
}
