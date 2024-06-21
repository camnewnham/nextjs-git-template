import { PaginatedPosts } from "./posts/[pagination]/PostList";

export default function Home() {
  if (process.env.UNDER_CONSTRUCTION) {
    return <div>Under Construction...</div>;
  }

  return <PaginatedPosts pageNumber={1} />;
}
