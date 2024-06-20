import { PaginatedArticles } from "./list/[pagination]/ArticlesList";

export default function Home() {
  return <PaginatedArticles pageNumber={1} />;
}
