import { articles, ArticlesPerPage } from "@/app/lib/articles";
import { Pagination } from "@/app/components/Pagination";
import Link from "next/link";
import React from "react";

export function PaginatedArticles({ pageNumber }: { pageNumber: number }) {
  const totalPages = Math.ceil(articles.length / ArticlesPerPage);

  // Get the articles that should be displayed on this page
  const pageArticles = articles.slice(
    (pageNumber - 1) * ArticlesPerPage,
    pageNumber * ArticlesPerPage
  );

  return (
    <>
      <div>Page {pageNumber}</div>
      <ul>
        {pageArticles.map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        {<Pagination current={pageNumber} last={totalPages} baseUrl="/list/" />}
      </div>
    </>
  );
}
