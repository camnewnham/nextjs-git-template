import Pagination from "@/app/components/Pagination";
import { articles } from "@/app/lib/articles";
import Link from "next/link";

const PAGINATION = 5;

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  const pages = Math.ceil(articles.length / PAGINATION);
  return Array.from({ length: pages }).map((_, index) => ({
    pagination: (index + 1).toString(),
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }: { params: { pagination: string } }) {
  const { pagination } = params;

  const pageNumber = parseInt(pagination);
  const totalPages = Math.ceil(articles.length / PAGINATION);

  // Get the articles that should be displayed on this page
  const pageArticles = articles.slice(
    (pageNumber - 1) * PAGINATION,
    pageNumber * PAGINATION
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
