# Nuart Film Society

- Static React 19 + TypeScript site in the `client` npm workspace; Vite builds to `client/dist`. No backend.
- Run `npm ci` at the root. Use `npm run -w client dev`, `npm run -w client lint`, and `npm run -w client build`.
- Routes: `/`, `/films`, `/articles`, `/article/:id`. Individual film URLs and unknown routes redirect home. Film cards are non-interactive archive entries; only the films listing is restored. Article detail routes use numeric IDs; catalog and article detail pages are lazy-loaded.
- Article metadata lives in `client/src/data/articles.json`; the film archive lives in `client/src/data/films.json`.
- Markdown lives in `client/src/content`: `home.md` and `articles/<slug>.md`. Article slugs use `article` or fall back to `article-<id>`; missing Markdown is allowed.
- Images and browser icons live in `client/public`; content uses absolute `/images/...` URLs. Run `npm run -w client icons` only when changing the icon source, `tab-icon.svg`.
- Emotion styles live in `client/src/styles`; shared catalog/detail styles and `theme.ts` define the dark palette and Cormorant Garamond typography. Preserve images, spacing, transitions, title fitting, and responsive behavior. Both media queries include 768px; do not change that boundary casually.
- GitHub Actions deploys `client/dist` from `master` to GitHub Pages at `nuartfilmsociety.com`. Keep `public/404.html` and `main.tsx` session-storage path recovery together; `_redirects` supports hosts with SPA rewrites.
- For frontend changes, check desktop/mobile routes, menu behavior, contact links, clipboard feedback, and deep links. The homepage email field posts to a Google-hosted Apps Script collector via `EmailSignup.tsx`; preserve the existing field styling, Enter/Go submission, hidden response iframe, and server-confirmed feedback. No visible signup button or provider branding. Destination configuration and maintenance are documented in `google-apps-script/README.md`. Preserve analytics and metadata in `client/index.html`.
