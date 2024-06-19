import { articles } from "@/app/lib/articles";
import Markdown from "react-markdown";

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }: { params: { slug: string } }) {
  const { title, content } = articles.find(
    (article) => article.slug === params.slug
  )!;

  return (
    <>
      <title>{title}</title>
      <Markdown>{content}</Markdown>
    </>
  );
}
