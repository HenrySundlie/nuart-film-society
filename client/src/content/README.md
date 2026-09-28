# Content

One file per text block, written in Markdown. This keeps content simple to edit and version, and renders cleanly in the app.

## Current files

- `home.md` — Home page body content.
- `films/film-<id>.md` — Optional extended article/notes for a film (e.g. `films/film-1.md`).
- `articles/article-<id>.md` — Article body; metadata lives in `../data/articles.json`.

## Editing

1. Open the relevant `.md` file.
2. Write content in standard Markdown (headings, lists, links, emphasis, etc.).
3. Save. The site will render the updated Markdown automatically.

## Conventions

- Use semantic headings (`#`, `##`, `###`) to structure the page.
- Keep one Markdown file per page/section. Suggested names: `home.md`, `about.md`, `contact.md`.
- Film articles live in the optional `films/` subfolder. Naming pattern: `film-<id>.md` where `<id>` matches the film's numeric `id` in `../data/films.json`.
- You can override the automatic naming by adding an `"article": "custom-slug"` field to a film entry and creating `films/custom-slug.md`.
- Images: use absolute `/images/...` paths for assets in `public/images`.

### Film Articles

The film detail page will attempt to load (in this order):

1. `films/<article>.md` if the film object defines an `article` field.
2. Fallback: `films/film-<id>.md`.

If no corresponding file exists, nothing is rendered and no error is shown.

Markdown is lazy‑loaded to keep initial bundle size lean.
