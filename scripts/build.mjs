import { access, readFile } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
const html = await readFile(resolve(output, 'index.html'), 'utf8');
const localAssets = [...html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)]
  .map((match) => match[1])
  .filter((url) => !/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url));

for (const url of new Set(localAssets)) {
  const path = resolve(output, decodeURIComponent(url.split(/[?#]/)[0]).replace(/^\//, ''));
  if (relative(output, path).startsWith('..')) {
    throw new Error(`Asset outside the published directory: ${url}`);
  }
  await access(path);
}

for (const file of ['app.js', 'i18n.js']) {
  execFileSync(process.execPath, ['--check', resolve(output, file)], { stdio: 'inherit' });
}

// The source is already static HTML, CSS, JavaScript and images in dist/.
// Validate it in place: do not delete or rebuild this source directory.
console.log(`Build complete. Static output: dist/ (${new Set(localAssets).size} local assets checked).`);
