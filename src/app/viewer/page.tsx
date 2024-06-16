import { compileMDX } from "next-mdx-remote/rsc";
import { Octokit } from "octokit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RemoteMdxPage() {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const res = await fetch("http://localhost:3000/sample.mdx");
  const text = await res.text();

  console.info("Text", text);

  const { content, frontmatter } = await compileMDX<{
    title: string;
  }>({ source: text, options: { parseFrontmatter: true } });

  console.info("Frontmatter", frontmatter);

  return (
    <>
      {" "}
      <div>
        <code>{text}</code>
      </div>
      <div>{content}</div>
    </>
  );
}
