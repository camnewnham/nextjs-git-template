import fs from "fs";
import child_process from "child_process";

const DOCS_DIR = "./docs";

const files = fs.readdirSync(DOCS_DIR);

export const articles = files.map((file) => {
  // Use git to get the last modified date of the file
  const path = `${DOCS_DIR}/${file}`;

  const { content, frontmatter } = parseFrontmatter(path);

  const fileNameWithoutExtension = file.replace(/.md$/, "");

  return {
    fileName: file,
    filePath: path,
    title: frontmatter.title,
    slug: fileNameWithoutExtension,
    content: content,
    ...getModifications(path),
  };
});

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

function parseFrontmatter(path: string) {
  const raw = fs.readFileSync(path, "utf-8");

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
