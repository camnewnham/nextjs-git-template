import { getPosts, PostsPerPage, Post } from "@/app/lib/posts";
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
      <ul>
        {pagePosts.map((post) => (
          <li key={post.slug}>
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <div className="w-full flex justify-center p-4 pt-12">
        <Pagination current={pageNumber} last={totalPages} baseUrl="/posts/" />
      </div>
    </>
  );
}
