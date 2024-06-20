This is a nextJS blog template for static site generation from a collection of articles. Designed for hosting on GitHub Actions.

# Using this template
1. Create a github repository. Add any folder structure of .md files you like.
2. Configure your page to [use github actions as a publishing source](https://docs.github.com/en/enterprise-server@3.12/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
3. Create a new action and copy the [workflow file](/.github/workflows/nextjs.yml). Customize the environment variables:

- `CUSTOM_DOMAIN` Enable if you are using a custom domain.
- `ARTICLES_PATH` Not required unless you are customizing this template.
- `TEMPLATE_REPO` Should be `camnewnham/nextjs-git-template`, or a fork.
- `ARTICLES_REPO` Not required unless you want to deploy from a different repo.

Your files will automatically deploy!

### Preview
Preview is available here: https://camnewnham.github.io/nextjs-git-template/

### Development
1. Pull this repo
2. Run `npm i`
3. Use `npm run dev` for initial testing
4. Use `npm run build && npm run serve` to test static export.
