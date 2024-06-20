[![Deploy to GitHub Pages](https://github.com/camnewnham/nextjs-git-template/actions/workflows/nextjs.yml/badge.svg)](https://github.com/camnewnham/nextjs-git-template/actions/workflows/nextjs.yml)

## What is this?

A template that allows you to create a repository of Markdown (.md) files, and turn them into a static site. 

For example, it turns [these notes](https://github.com/camnewnham/notes) into [this page](https://camnewnham.com)

Designed for hosting on GitHub Actions and developed with NextJS.

### Preview
Preview is available here: https://camnewnham.github.io/nextjs-git-template/

## Using this template
1. Create a github repository. Add any folder structure of .md files you like.
2. Configure your repository to [use github actions as a publishing source](https://docs.github.com/en/enterprise-server@3.12/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
3. Create a new action and copy the [workflow file](/.github/workflows/nextjs.yml). Customize the environment variables:

- `CUSTOM_DOMAIN` Enable if you are using a custom domain.
- `TEMPLATE_REPO` Should be `camnewnham/nextjs-git-template`, or a fork if you are customizing this template.
- `ARTICLES_REPO` Should be commented out.

Your files will automatically deploy!

## Development
1. Pull this repo
2. Run `npm i`
3. Use `npm run dev` for initial testing
4. Use `npm run build && npm run serve` to test static export.
