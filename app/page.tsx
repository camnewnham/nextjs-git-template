import { PaginatedArticles } from "./list/[pagination]/ArticlesList";

export default function Home() {
  if (process.env.UNDER_CONSTRUCTION) {
    return <div>Under Construction...</div>;
  }

  return <PaginatedArticles pageNumber={1} />;
}
