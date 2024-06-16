import { compileMDX } from "next-mdx-remote/rsc";

/// Using fetch here so we can cache it.
export const revalidate = 600;

export async function Article({ url }: { url: string }) {
  const res = await fetch(url);
  const text = await res.text();

  const { content, frontmatter } = await compileMDX<{
    title: string;
  }>({ source: url, options: { parseFrontmatter: true } });

  return (
    <>
      <title>Article</title>
      <div>
        <code>{text}</code>
      </div>
      <div>{content}</div>
    </>
  );
}
