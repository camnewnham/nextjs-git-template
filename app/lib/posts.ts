import fs from "fs";
import child_process from "child_process";
import path from "path";

export const PostsPerPage = 5;

export type Post = {
  file: string;
  title: string;
  slug: string;
  content: string;
  created_at: Date;
  updated_at: Date;
};

export async function getPosts() {
  return await getPostsPromise;
}

const POSTS_DIRECTORY = process.env.POSTS_DIRECTORY ?? ".posts";

if (!process.env.POSTS_DIRECTORY) {
  console.warn("Using default posts path: " + POSTS_DIRECTORY);
}

const files = fs.readdirSync(POSTS_DIRECTORY, {
  recursive: true,
  encoding: "utf-8",
});

const getPostsPromise = Promise.all(
  files
    .filter((file) => file.includes(".md"))
    .map(async (file) => {
      // Use git to get the last modified date of the file
      const path = `${POSTS_DIRECTORY}/${file}`;

      const { content, frontmatter } = parseFrontmatter(path);

      const slug = file.replace(/.md$/, "").replace(/[\s\/\\]/g, "-");

      // Extract the first h1 from the markdown
      const title =
        frontmatter.title ||
        content.match(/^#\s(.*)$/m)?.[1] ||
        file.replace(/.md$/, "");

      return {
        file,
        title,
        slug,
        content,
        ...getModifications(path),
      } satisfies Post;
    })
);

function getModifications(file: string) {
  const stdout = child_process
    .execSync(`git log --follow --format=%ad --date default \"${file}\"`)
    .toString();

  const dates = stdout.split("\n").filter((x: any) => x);

  if (dates.length === 0) {
    // Not in git, we are debugging

    return {
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  return {
    created_at: new Date(dates[0]),
    updated_at: new Date(dates[dates.length - 1]),
  };
}

function parseFrontmatter(filePath: string) {
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`File not found at \"${resolvedPath}\"`);
  }

  const raw = fs.readFileSync(resolvedPath, "utf-8");

  if (raw.startsWith("---")) {
    const [frontmatter, content] = raw
      .split("---")
      .map((x) => x.trim())
      .filter((x) => x !== "");

    const frontmatterObj = frontmatter
      .split("\n")
      .map((x) => x.split(":").map((y) => y.trim()))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as { [key: string]: string });

    return {
      content,
      frontmatter: frontmatterObj,
    };
  }
  return {
    content: raw,
    frontmatter: {},
  };
}
