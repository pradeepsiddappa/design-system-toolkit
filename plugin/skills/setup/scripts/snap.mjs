#!/usr/bin/env node
// Checks an asset made from the design system and saves a picture of it.
//   node snap.mjs <design-system>/assets/instagram-split-bill.html
// The asset sets its size with <meta name="ds-size" content="1080x1080">.
// Checks: readability (from asset.js), colours that are not tokens, banned words, long dashes.
// Writes <name>.png next to the HTML. Needs Google Chrome (or set CHROME).
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const files = process.argv.slice(2).filter((a) => a.endsWith('.html'));
if (!files.length) { console.error('Give one or more asset .html files.'); process.exit(2); }
const chrome = [process.env.CHROME, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'].find((p) => p && existsSync(p));
if (!chrome) { console.error('No Chrome found. Open the asset in a browser and take a screenshot instead.'); process.exit(1); }

let problems = 0;
for (const f of files) {
  const file = resolve(f);
  const html = readFileSync(file, 'utf8');
  const root = resolve(dirname(file), '..');
  const notes = [];

  // size
  const size = (html.match(/<meta\s+name="ds-size"\s+content="(\d+)x(\d+)"/) || []).slice(1).map(Number);
  const [w, h] = size.length ? size : [1080, 1080];

  // colours must be tokens
  const tokensCss = existsSync(join(root, 'foundations/tokens.css')) ? readFileSync(join(root, 'foundations/tokens.css'), 'utf8').toUpperCase() : '';
  const stray = [...new Set((html.replace(/<script[\s\S]*?<\/script>/g, '').match(/#[0-9a-fA-F]{6}\b/g) || []).map((x) => x.toUpperCase()))].filter((x) => !tokensCss.includes(x) && x !== '#FFFFFF' && x !== '#000000');
  if (stray.length) notes.push('colours that are not in tokens.css: ' + stray.join(', ') + '. Use var(--ds-...) instead');

  // words
  const sandbox = { window: {} };
  try { vm.runInNewContext(readFileSync(join(root, 'foundations/brand.js'), 'utf8'), sandbox); } catch (e) { /* no brand.js: skip word checks */ }
  const DS = sandbox.window.DS || {};
  const text = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  for (const wd of ((DS.voice || {}).banned || [])) if (new RegExp('(^|[^a-z])' + wd.replace(/[-]/g, '\\-') + '([^a-z]|$)', 'i').test(text)) notes.push('uses the banned word "' + wd + '"');
  if (/[\u2013\u2014]/.test(text)) notes.push('has an en or em dash. Use a hyphen');

  // render: readability report, then the picture
  const url = pathToFileURL(file).href;
  const dom = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--allow-file-access-from-files', '--window-size=' + w + ',' + h, '--virtual-time-budget=15000', '--dump-dom', url], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
  if (!/data-ds-ready="1"/.test(dom)) notes.push('asset.js did not run: add <script src="../_system/asset.js"></script>, so the logo, shapes and readability check work');
  const fixed = [...dom.matchAll(/<[^>]*data-contrast-fixed="([^"]+)"[^>]*>([^<]{0,40})/g)];
  for (const m of fixed) {
    const un = (m[0].match(/data-contrast-unfixed="([^"]+)"/) || [])[1];
    notes.push((un ? 'STILL FAILS (' + un + '): ' : 'readability adjusted: ') + m[1].replace(/&amp;/g, '&') + (m[2].trim() ? ' ("' + m[2].trim() + '")' : '') + (un ? '. Change the colour pair' : ''));
  }
  const png = file.replace(/\.html$/, '.png');
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--window-size=' + w + ',' + h, '--virtual-time-budget=15000', '--screenshot=' + png, url], { stdio: 'ignore' });

  const bad = notes.filter((n) => !n.startsWith('readability adjusted'));
  problems += bad.length;
  console.log((bad.length ? 'CHECK ' : 'OK    ') + f + '  ->  ' + png.split('/').pop() + ' (' + w + 'x' + h + ')');
  for (const n of notes) console.log('        ' + n);
}
process.exit(problems ? 1 : 0);
