import { access, readFile, mkdir, writeFile } from 'node:fs/promises';
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

// Render a complete English document: headings, body, chat, dialog and metadata
// arrive in English before JavaScript runs. Interactive panels still use i18n.js.
const i18nSource = await readFile(resolve(output, 'i18n.js'), 'utf8');
const dictionaryStart = i18nSource.indexOf('const english = ') + 'const english = '.length;
const dictionaryEnd = i18nSource.indexOf(';\n', dictionaryStart);
const english = JSON.parse(i18nSource.slice(dictionaryStart, dictionaryEnd));
const escapeText = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let englishHtml = html.replace(/>([^<>]+)</g, (match, text) => {
  const key = text.trim();
  return english[key] ? '>' + text.replace(key, escapeText(english[key])) + '<' : match;
});
englishHtml = englishHtml.replace(/\b(alt|aria-label|content)="([^"]*)"/g, (match, attribute, text) =>
  english[text] ? `${attribute}="${escapeText(english[text]).replaceAll('"', '&quot;')}"` : match
).replace('<html lang="es">', '<html lang="en">');
// The English document is one directory deeper; load shared assets from the root.
englishHtml = englishHtml.replace(/\b(src|href)="(?![a-z][a-z\d+.-]*:|\/|#)([^"]+)"/gi,
  (match, attribute, asset) => `${attribute}="/${asset}"`
).replace('<option value="en" lang="en">', '<option value="en" lang="en" selected>');
await mkdir(resolve(output, 'en'), { recursive: true });
await writeFile(resolve(output, 'en/index.html'), englishHtml);

console.log(`Build complete. Spanish + English. Static output: dist/ (${new Set(localAssets).size} local assets checked).`);
