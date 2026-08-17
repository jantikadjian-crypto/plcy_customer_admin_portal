#!/usr/bin/env node
/**
 * Builds the portal as ONE self-contained HTML file, suitable for publishing as a
 * Claude artifact or emailing to someone with no toolchain.
 *
 * Run with: npm run build:artifact
 *
 * Two things make this possible: the app makes no network calls (all data is
 * inline fixtures), and its only binary asset is the logo. So we raise Vite's
 * inline limit until the logo becomes a data URI, then fold the JS and CSS into
 * the HTML by hand.
 *
 * Output omits <!doctype>/<html>/<head>/<body> because the artifact host supplies
 * that skeleton and wraps whatever we give it.
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const outDir = resolve(root, 'dist-artifact');
const outFile = resolve(outDir, 'plcy-portal.html');

console.log('Building with assets inlined...');

await build({
  root,
  configFile: false,
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': resolve(root, 'src/app') } },
  build: {
    outDir,
    emptyOutDir: true,
    // Large enough to swallow the ~129KB logo as a base64 data URI.
    assetsInlineLimit: 4 * 1024 * 1024,
    chunkSizeWarningLimit: 4096,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
  logLevel: 'warn',
});

const assetsDir = join(outDir, 'assets');
const assets = readdirSync(assetsDir);

const jsName = assets.find((f) => f.endsWith('.js'));
const cssName = assets.find((f) => f.endsWith('.css'));
if (!jsName) throw new Error('No JS bundle produced');

const js = readFileSync(join(assetsDir, jsName), 'utf8');
const css = cssName ? readFileSync(join(assetsDir, cssName), 'utf8') : '';

const leftovers = assets.filter((f) => f !== jsName && f !== cssName);
if (leftovers.length) {
  throw new Error(
    `Assets did not inline, so the page would make blocked network requests: ${leftovers.join(', ')}`,
  );
}

/**
 * A literal `</script` anywhere in the bundle would close our inline script tag
 * early. Escaping the slash is inert inside JS string literals and regexes.
 */
const safeJs = js.replace(/<\/script/gi, '<\\/script');

const page = `<title>PLCY Governance Console</title>

<style>
${css}
</style>

<div id="root"></div>

<script type="module">
${safeJs}
</script>
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, page, 'utf8');

const mb = (Buffer.byteLength(page, 'utf8') / 1024 / 1024).toFixed(2);
console.log(`Wrote ${outFile}`);
console.log(`  ${mb} MB single file, ${leftovers.length} external assets`);
if (Number(mb) > 16) throw new Error('Over the 16MB artifact limit');
