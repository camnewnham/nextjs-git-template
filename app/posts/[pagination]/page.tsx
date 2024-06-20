import { articles, ArticlesPerPage } from "@/app/lib/articles";
import { PaginatedArticles } from "./ArticlesList";

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  const pages = Math.ceil(articles.length / ArticlesPerPage);
  return Array.from({ length: pages }).map((_, index) => ({
    pagination: (index + 1).toString(),
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }: { params: { pagination: string } }) {
  const { pagination } = params;

  const pageNumber = parseInt(pagination);

  return <PaginatedArticles pageNumber={pageNumber} />;
}
