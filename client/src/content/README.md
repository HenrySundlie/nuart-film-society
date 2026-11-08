# Content

One file per text block, written in Markdown. This keeps content simple to edit and version, and renders cleanly in the app.

## Current files

- `home.md` — Home page body content.
- `articles/article-<id>.md` — Article body; metadata lives in `../data/articles.json`.

## Editing

1. Open the relevant `.md` file.
2. Write content in standard Markdown (headings, lists, links, emphasis, etc.).
3. Save. The site will render the updated Markdown automatically.

## Conventions

- Use semantic headings (`#`, `##`, `###`) to structure the page.
- Keep one Markdown file per page/section. Suggested names: `home.md`, `about.md`, `contact.md`.
- Images: use absolute `/images/...` paths for assets in `public/images`.

Markdown is lazy-loaded to keep the initial bundle size lean.
