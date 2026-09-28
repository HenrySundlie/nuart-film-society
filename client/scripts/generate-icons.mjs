import { promises as fs } from 'node:fs';
import path from 'node:path';
import favicons from 'favicons';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const source = path.join(publicDir, 'tab-icon.svg');

async function run() {
  try {
    const configuration = {
      path: '/',
      appName: 'Nuart Film Society',
      appShortName: 'Nuart',
      appDescription: 'Nuart Film Society website',
      developerName: null,
      developerURL: null,
      dir: 'auto',
      lang: 'en-US',
      background: '#ffffff',
      theme_color: '#4357AD',
      display: 'standalone',
      orientation: 'any',
      scope: '/',
      start_url: '/',
      version: '1.0',
      logging: false,
      pixel_art: false,
      loadManifestWithCredentials: false,
      manifestMaskable: true,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        favicons: true,
        windows: false,
        yandex: false,
        coast: false,
      },
    };

    const response = await favicons(source, configuration);

    // Write images
    await Promise.all(
      response.images.map(async (img) => {
        const outPath = path.join(publicDir, img.name);
        await fs.writeFile(outPath, img.contents);
      })
    );

    // Write files (e.g., site.webmanifest)
    await Promise.all(
      response.files.map(async (file) => {
        const outPath = path.join(publicDir, file.name);
        await fs.writeFile(outPath, file.contents);
      })
    );

    // Optionally log HTML suggestions (not written automatically)
    // console.log(response.html.join('\n'));

    console.log('Icons generated in', publicDir);
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exitCode = 1;
  }
}

run();
