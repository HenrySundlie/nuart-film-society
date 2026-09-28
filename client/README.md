# NU ART Film Club

A static React, TypeScript, and Vite website for film screenings and articles at the Nuart Theatre in Moscow, Idaho.

From the repository root:

```sh
npm ci
npm run -w client dev
npm run -w client lint
npm run -w client build
npm run -w client preview
```

Film and article metadata lives in `src/data/`; page text lives in [`src/content/`](src/content/README.md). Images are served from `public/images/`. Emotion styles and `src/theme.ts` control the site's appearance.

GitHub Actions builds `client/dist` and deploys it to GitHub Pages. Other static hosts must rewrite client routes such as `/films` to `/index.html`, or serve `public/404.html` to recover the route through session storage.
