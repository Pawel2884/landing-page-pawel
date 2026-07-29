/**
 * Generuje src/generated/font-data.ts - fonty wbudowane w kod jako data URI.
 *
 * Po co? Przy renderze Remotion odpala kilka rownoleglych przegladarek i
 * pobieranie plikow .woff2 z lokalnego serwera potrafi sie zawiesic
 * (delayRender timeout). Data URI eliminuje siec calkowicie.
 *
 * Uruchom po zmianie listy fontow:  node scripts/build-fonts.mjs
 */
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const FILES = [
  ['PRESS_START_LATIN', '@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff2'],
  ['PRESS_START_LATIN_EXT', '@fontsource/press-start-2p/files/press-start-2p-latin-ext-400-normal.woff2'],
  ['PIXELIFY_LATIN_400', '@fontsource/pixelify-sans/files/pixelify-sans-latin-400-normal.woff2'],
  ['PIXELIFY_LATIN_EXT_400', '@fontsource/pixelify-sans/files/pixelify-sans-latin-ext-400-normal.woff2'],
  ['PIXELIFY_LATIN_700', '@fontsource/pixelify-sans/files/pixelify-sans-latin-700-normal.woff2'],
  ['PIXELIFY_LATIN_EXT_700', '@fontsource/pixelify-sans/files/pixelify-sans-latin-ext-700-normal.woff2'],
  ['MONO_LATIN_400', '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2'],
  ['MONO_LATIN_EXT_400', '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-ext-400-normal.woff2'],
  ['MONO_LATIN_700', '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2'],
  ['MONO_LATIN_EXT_700', '@fontsource/jetbrains-mono/files/jetbrains-mono-latin-ext-700-normal.woff2'],
];

let out = `// PLIK GENEROWANY - nie edytuj recznie.
// Zrodlo: scripts/build-fonts.mjs (uruchom: node scripts/build-fonts.mjs)
// Fonty wbudowane jako data URI, zeby render nigdy nie czekal na siec.
/* eslint-disable */

`;

for (const [name, rel] of FILES) {
  const buf = readFileSync(resolve(root, 'node_modules', rel));
  out += `export const ${name} =\n  'data:font/woff2;base64,${buf.toString('base64')}';\n\n`;
}

mkdirSync(resolve(root, 'src/generated'), {recursive: true});
writeFileSync(resolve(root, 'src/generated/font-data.ts'), out);

console.log(`Zapisano src/generated/font-data.ts (${(out.length / 1024) | 0} KB)`);
