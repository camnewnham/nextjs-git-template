import { articles } from "@/app/lib/articles";
import { Article } from "./Article";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const { title, content } = articles.find(
    (article) => article.slug === params.slug
  )!;

  return (
    <>
      <title>{title}</title>
      <Article content={content} />
    </>
  );
}
