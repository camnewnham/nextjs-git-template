import { Octokit } from "octokit";

// TODO: See https://github.com/gregrickaby/nextjs-github-pages
// TODO: Consider using github environment variables and hosting articles in the same repo
// And building a static page.

const usePageAPI = false;

export default async function Page() {
  return usePageAPI ? <GetPageWithReposAPI /> : <GetPageWithTREEAPI />;
}

async function GetPageWithReposAPI() {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
  const { data } = await octokit.rest.repos.getContent({
    repo: process.env.GITHUB_REPO!,
    owner: process.env.GITHUB_OWNER!,
    path: "",
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

async function GetPageWithTREEAPI() {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
    {
      owner: process.env.GITHUB_OWNER!,
      repo: process.env.GITHUB_REPO!,
      tree_sha: "main",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const dates = await Promise.all(
    data.tree.map(
      async (item) =>
        await octokit.rest.repos.listCommits({
          path: item.path!,
          repo: process.env.GITHUB_REPO!,
          owner: process.env.GITHUB_OWNER!,
        })
    )
  );

  return (
    <>
      <title>TOC</title>
      <pre>{JSON.stringify(dates, null, 2)}</pre>
    </>
  );
}
