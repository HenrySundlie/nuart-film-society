# Nuart Film Society

- Static React 19 + TypeScript site in the `client` npm workspace; Vite builds to `client/dist`. No backend.
- Run `npm ci` at the root. Use `npm run -w client dev`, `npm run -w client lint`, and `npm run -w client build`.
- Routes: `/`, `/films`, `/film/:id`, `/articles`, `/article/:id`. Detail routes use numeric IDs; list and detail pages are lazy-loaded.
- Metadata lives in `client/src/data/{films,articles}.json`. Keep film `runDates` as `YYYY-MM-DD` arrays; grouping uses the visitor's local date.
- Markdown lives in `client/src/content`: `home.md`, `articles/<slug>.md`, optional `films/<slug>.md`. Detail slugs use `article` or fall back to `article-<id>` / `film-<id>`; missing Markdown is allowed.
- Images and browser icons live in `client/public`; content uses absolute `/images/...` URLs. Run `npm run -w client icons` only when changing the icon source, `tab-icon.svg`.
- Emotion styles live in `client/src/styles`; shared catalog/detail styles and `theme.ts` define the dark palette and Cormorant Garamond typography. Preserve images, spacing, transitions, title fitting, and responsive behavior. Both media queries include 768px; do not change that boundary casually.
- GitHub Actions deploys `client/dist` from `master` to GitHub Pages at `nuartfilmsociety.com`. Keep `public/404.html` and `main.tsx` session-storage path recovery together; `_redirects` supports hosts with SPA rewrites.
- For frontend changes, check desktop/mobile routes, menu and swipe behavior, ticket/calendar links, clipboard feedback, and deep links. Preserve analytics and metadata in `client/index.html`.
