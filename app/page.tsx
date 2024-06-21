import { PaginatedPosts } from "./posts/[pagination]/PostList";

import PostsLayout from "./posts/[pagination]/layout";

export default function Home() {
  if (process.env.UNDER_CONSTRUCTION) {
    return <div>Under Construction...</div>;
  }

  return (
    <PostsLayout>
      <PaginatedPosts pageNumber={1} />
    </PostsLayout>
  );
}
