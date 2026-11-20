#!/usr/bin/env node
// Builds a design system folder from two files: tokens.css (values) and brand.js (words and rules).
// No packages needed. Node 18 or later. Chrome is optional, and only used to print PDFs.
//
//   node generate.mjs --foundations ./my-foundations --out ./my-design-system
//   node generate.mjs --out ./my-design-system --only slides,one-page      (add outputs later)
//   node generate.mjs --list
//   node generate.mjs --sample dhanak                                 (build a sample brand)
//
// Options
//   --foundations <dir>  folder with tokens.css, brand.js and logo/ (default: <out>/foundations)
//   --out <dir>          where the design system goes (default: ./my-design-system)
//   --sample <name>      build one of the sample brands in examples/
//   --only <a,b>         outputs to make (default: all). Foundations are always included.
//   --no-pdf             skip printing PDFs
//   --check              run the checks only, write nothing
import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import vm from 'node:vm';

const HERE = dirname(fileURLToPath(import.meta.url));
const KIT = resolve(HERE, '../kit');

export const OUTPUTS = {
  guidelines: { file: 'guidelines/guidelines.html', pdf: true, what: 'Brand guidelines: identity, voice, logo, colour, type, components, accessibility' },
  playbook: { file: 'guidelines/playbook.html', pdf: true, what: 'Brand playbook: website, social, product, email, documents, print' },
  components: { file: 'components/components.html', pdf: false, what: 'Component sheet: buttons, fields, tags, cards, notes, nav, dialog' },
  'one-page': { file: 'quick/one-page.html', pdf: true, what: 'The brand on one printable page' },
  slides: { file: 'quick/slides.html', pdf: true, what: 'The brand in six slides' },
  onboarding: { file: 'quick/onboarding.html', pdf: false, what: 'A first-day page for someone new' },
  ai: { file: 'ai/agent-brief.md', pdf: false, what: 'Agent brief and voice file, for any AI making an asset' }
};

// ---------- arguments ----------
const args = process.argv.slice(2);
const flag = (n) => args.includes('--' + n);
const opt = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };

if (flag('list')) {
  console.log('Outputs you can choose (foundations are always included):\n');
  for (const [k, v] of Object.entries(OUTPUTS)) console.log('  ' + k.padEnd(12) + v.what);
  const ex = resolve(HERE, '../examples');
  if (existsSync(ex)) console.log('\nSample brands (--sample <name>): ' + readdirSync(ex).filter((d) => existsSync(join(ex, d, 'foundations/brand.js'))).join(', '));
  process.exit(0);
}

const EXAMPLES = resolve(HERE, '../examples');
const SAMPLES = existsSync(EXAMPLES) ? readdirSync(EXAMPLES).filter((d) => existsSync(join(EXAMPLES, d, 'foundations/brand.js'))) : [];
const sample = opt('sample', '');
if (sample && !SAMPLES.includes(sample)) { console.error('Unknown sample: ' + sample + '. Samples: ' + SAMPLES.join(', ')); process.exit(2); }
const OUT = resolve(opt('out', sample ? './sample-' + sample : './my-design-system'));
const FOUND = resolve(opt('foundations', sample ? join(EXAMPLES, sample, 'foundations') : join(OUT, 'foundations')));
const only = opt('only', '') ? opt('only').split(',').map((s) => s.trim()).filter(Boolean) : Object.keys(OUTPUTS);
const bad = only.filter((o) => !OUTPUTS[o]);
if (bad.length) { console.error('Unknown output: ' + bad.join(', ') + '. Run with --list to see the choices.'); process.exit(2); }

// ---------- read the two files ----------
const fail = [], find = [], passed = [];
const need = (cond, msg) => (cond ? passed.push(msg) : fail.push(msg));
const tokensPath = join(FOUND, 'tokens.css'), brandPath = join(FOUND, 'brand.js');
if (!existsSync(tokensPath) || !existsSync(brandPath)) {
  console.error('Missing ' + (!existsSync(tokensPath) ? 'tokens.css' : 'brand.js') + ' in ' + FOUND);
  process.exit(1);
}
// The generator keeps a block of status shades at the end of tokens.css (see "status shades" below).
// It is rewritten on every run, so it is left out here: anything the brand sets itself wins.
const GEN_START = '/* status shades: worked out by the generator from the status colours. Set any of these above to override. */';
const GEN_END = '/* end of status shades */';
const cssAll = readFileSync(tokensPath, 'utf8');
const css = cssAll.includes(GEN_START) ? cssAll.slice(0, cssAll.indexOf(GEN_START)).trimEnd() + '\n' + (cssAll.includes(GEN_END) ? cssAll.slice(cssAll.indexOf(GEN_END) + GEN_END.length).trimStart() : '') : cssAll;
const tokens = {};
for (const m of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) tokens[m[1]] = m[2].trim();
const sandbox = { window: {} };
try { vm.runInNewContext(readFileSync(brandPath, 'utf8'), sandbox, { timeout: 1000 }); } catch (e) { console.error('brand.js has an error: ' + e.message); process.exit(1); }
const DS = sandbox.window.DS;
if (!DS) { console.error('brand.js must set window.DS = { ... }'); process.exit(1); }

// ---------- colour maths ----------
const toHex = (v) => {
  if (!v) return null;
  v = v.trim();
  if (v.startsWith('var(')) return toHex(tokens[v.slice(4, -1).split(',')[0].trim()]);
  if (/^#[0-9a-f]{3}$/i.test(v)) return '#' + v.slice(1).split('').map((c) => c + c).join('').toUpperCase();
  if (/^#[0-9a-f]{6}$/i.test(v)) return v.toUpperCase();
  return null;
};
const val = (t) => (t.startsWith('--') ? toHex(tokens[t]) : toHex(t));
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// ---------- status shades (19 Nov 2026) ----------
// Each status colour is the brand's own. From it the generator works out a light background, text that reads on that
// background, a border, and the text colour on the full status colour. A brand can set any of these itself in tokens.css.
const mixHex = (a, b, p) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * p + parseInt(b.slice(i, i + 2), 16) * (1 - p)).toString(16).padStart(2, '0')).join('').toUpperCase();
const STATUS = [['ok', 'success'], ['warn', 'warning'], ['error', 'error'], ['info', 'info']];
const shades = {};
for (const [s] of STATUS) {
  const base = val('--ds-' + s), canvas = val('--ds-canvas') || '#FFFFFF', ink = val('--ds-ink') || '#000000';
  if (!base) continue;
  const set = (k, v) => { if (!tokens[k]) { shades[k] = v; tokens[k] = v; } };
  set('--ds-' + s + '-bg', mixHex(base, canvas, s === 'warn' ? 0.16 : 0.12));
  set('--ds-' + s + '-border', mixHex(base, canvas, 0.4));
  let text = base;
  for (let p = 1; p >= 0 && ratio(text, val('--ds-' + s + '-bg')) < 4.5; p -= 0.05) text = mixHex(base, ink, Math.max(p, 0));
  set('--ds-' + s + '-text', text);
  // Warning always carries dark text, like a road sign. The others take whichever reads better.
  set('--ds-on-' + s, s === 'warn' ? ink : (ratio('#FFFFFF', base) >= ratio(ink, base) ? '#FFFFFF' : ink));
}

// ---------- checks ----------
const REQUIRED = ['--ds-canvas', '--ds-surface', '--ds-line', '--ds-ink', '--ds-ink-2', '--ds-brand', '--ds-accent', '--ds-font-display', '--ds-font-body', '--ds-font-label'];
for (const t of REQUIRED) need(tokens[t], 'tokens.css has ' + t);
for (const c of DS.colors || []) {
  if (!tokens[c.token]) fail.push('brand.js names ' + c.token + ' but tokens.css does not set it');
  else if (!val(c.token)) find.push(c.token + ' is not a hex colour, so its contrast is not checked');
}
{
  const noWhy = (DS.colors || []).filter((c) => (c.group === 'brand' || c.group === 'palette') && c.src !== 'default' && !c.why).map((c) => c.name);
  if (noWhy.length) find.push('No reason recorded for ' + [...new Set(noWhy)].join(', ') + '. Add a one-line "why" to each in brand.js, so "why this colour?" has an answer');
}
need(DS.meta && DS.meta.name, 'brand.js has a brand name');
const logoFile = DS.logo && DS.logo.file ? join(FOUND, DS.logo.file) : '';
need(logoFile && existsSync(logoFile), 'the logo file is in foundations/' + ((DS.logo && DS.logo.file) || 'logo/'));
const conf = DS.confirmations || {};
need(conf.ownsLogo === true, 'the owner confirmed they own the logo or have permission to use it');
need(conf.fontLicencesChecked === true, 'the font licences were checked');
// A number, or true when an AI recorded a yes instead of a count.
need(conf.voiceLinesRewritten === true || (Number(conf.voiceLinesRewritten) || 0) >= 3, 'at least three voice lines were rewritten by the owner');
if (val('--ds-ink') && val('--ds-canvas')) {
  const r = ratio(val('--ds-ink'), val('--ds-canvas'));
  need(r >= 4.5, 'body text (ink on canvas) reaches 4.5:1, now ' + r.toFixed(2) + ':1');
}
for (const [a, b] of (DS.contrast || []).concat(tokens['--ds-on-accent'] ? [['--ds-on-accent', '--ds-accent']] : [], tokens['--ds-on-brand'] ? [['--ds-on-brand', '--ds-brand']] : [])) {
  const fa = val(a), fb = val(b);
  if (!fa || !fb) continue;
  const r = ratio(fa, fb);
  // Accent text on a dark ground is covered when the brand's --ds-accent-on-dark passes there
  if (r < 4.5 && a === '--ds-accent' && val('--ds-accent-on-dark') && ratio(val('--ds-accent-on-dark'), fb) >= 4.5) continue;
  if (r < 4.5) find.push(a + ' on ' + b + ' is ' + r.toFixed(2) + ':1' + (r >= 3 ? ', large text only' : ', fails for text'));
}
// Readability rule: the accent is often used as text. Say where it falls short, so assets made outside the templates get it right.
// --ds-accent-on-dark (optional) is the brand's own colour for accent text on dark grounds; the templates use it first.
const aod = val('--ds-accent-on-dark');
for (const [fgT, bgT, where] of [['--ds-accent', '--ds-canvas', 'the page'], ['--ds-accent', '--ds-brand', 'the brand colour']]) {
  const a = val(fgT), b = val(bgT);
  if (!a || !b) continue;
  const r = ratio(a, b);
  if (r < 3 && aod && bgT === '--ds-brand' && ratio(a, b) < ratio(aod, b)) {
    const ra = ratio(aod, b);
    if (ra < 4.5) find.push('--ds-accent-on-dark on the brand colour is ' + ra.toFixed(2) + ':1. It is meant for accent text on dark grounds, so it should reach 4.5:1');
    continue;
  }
  if (r < 3) find.push('Accent text on ' + where + ' is ' + r.toFixed(2) + ':1, too low even for large text. The documents adjust it automatically. In other assets, darken or lighten the accent, or use it as a highlight behind dark text');
}
// Status colours must work with their text, and a brand colour must not be mistaken for a status.
for (const [s, word] of STATUS) {
  const base = val('--ds-' + s), on = val('--ds-on-' + s);
  if (base && on && ratio(on, base) < 4.5) find.push('Text on the ' + word + ' colour is ' + ratio(on, base).toFixed(2) + ':1. ' + (s === 'warn' ? 'Warning carries dark text, so make the warning colour a brighter amber' : 'Make the ' + word + ' colour deeper, or set --ds-on-' + s));
}
const lab = (h) => {
  const f = (v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116);
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const [x, y, z] = [(r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047, r * 0.2126 + g * 0.7152 + b * 0.0722, (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883].map(f);
  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
};
const deltaE = (a, b) => { const [p, q] = [lab(a), lab(b)]; return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
{
  const close = [];
  // The accent is a button colour by design, so for it the status colour has to move. Other brand and palette colours stay off buttons.
  const accent = val('--ds-accent');
  for (const c of (DS.colors || []).filter((c) => (c.group === 'brand' || c.group === 'palette') && c.src !== 'default')) {
    const v = val(c.token);
    if (!v) continue;
    for (const [s, word] of STATUS.filter(([s]) => s !== 'info')) {
      const sv = val('--ds-' + s);
      if (!sv || deltaE(v, sv) >= 25) continue;
      close.push(v === accent
        ? c.name + ' (the accent) looks like the ' + word + ' colour. Make the ' + word + ' colour clearly different, so the main button is never read as a ' + word
        : c.name + ' looks like the ' + word + ' colour. Keep it for marketing and charts, off buttons and status messages, or move the ' + word + ' colour further away');
    }
  }
  for (const m of [...new Set(close)]) find.push(m);
}
const copyText = [];
const walk = (o, path) => {
  if (typeof o === 'string') copyText.push([path, o]);
  else if (Array.isArray(o)) o.forEach((x, i) => walk(x, path + '[' + i + ']'));
  else if (o && typeof o === 'object') for (const k of Object.keys(o)) walk(o[k], path ? path + '.' + k : k);
};
walk({ copy: DS.copy, samples: (DS.voice || {}).samples, tone: (DS.voice || {}).tone }, '');
const banned = ((DS.voice || {}).banned || []).map((w) => w.toLowerCase());
for (const [path, s] of copyText) {
  if (/[\u2013\u2014]/.test(s)) find.push('"' + s + '" (' + path + ') has an en or em dash. Use a hyphen');
  for (const w of banned) if (new RegExp('(^|[^a-z])' + w.replace(/[-]/g, '\\-') + '([^a-z]|$)', 'i').test(s)) find.push('"' + s + '" (' + path + ') uses the banned word "' + w + '"');
}
let unconfirmed = 0;
const srcs = JSON.stringify(DS).match(/"src":"(extracted|assumption|proposed)"/g) || [];
unconfirmed = srcs.length;
if (unconfirmed) find.push(unconfirmed + ' values are still tagged "To confirm", "Assumption" or "Proposed". The documents show them with a tag');

const report = () => {
  console.log('\nChecks');
  for (const p of passed) console.log('  ok    ' + p);
  for (const f of fail) console.log('  FAIL  ' + f);
  for (const f of find) console.log('  note  ' + f);
};
report();
if (fail.length) {
  console.log('\nStopped: ' + fail.length + ' hard fail' + (fail.length > 1 ? 's' : '') + '. Fix ' + (fail.length > 1 ? 'them' : 'it') + ' in tokens.css or brand.js, then run again.');
  process.exit(1);
}
if (flag('check')) process.exit(0);

// ---------- build the folder ----------
mkdirSync(OUT, { recursive: true });
if (resolve(FOUND) !== resolve(OUT, 'foundations')) cpSync(FOUND, join(OUT, 'foundations'), { recursive: true });
// Write the status shades into the output tokens.css, so every page and asset can use them.
if (Object.keys(shades).length) {
  const block = GEN_START + '\n:root {\n' + Object.entries(shades).map(([k, v]) => '  ' + k + ': ' + v + ';').join('\n') + '\n}\n' + GEN_END + '\n';
  writeFileSync(join(OUT, 'foundations/tokens.css'), css.trimEnd() + '\n\n' + block);
}
const tj = {};
for (const [k, v] of Object.entries(tokens)) tj[k.replace(/^--ds-/, '')] = v;
writeFileSync(join(OUT, 'foundations/tokens.json'), JSON.stringify({ $comment: 'Generated from tokens.css. Edit tokens.css, then run the generator again.', ...tj }, null, 2) + '\n');
cpSync(join(KIT, '_system'), join(OUT, '_system'), { recursive: true });
mkdirSync(join(OUT, 'components'), { recursive: true });
cpSync(join(KIT, 'components/components.css'), join(OUT, 'components/components.css'));

const made = [];
for (const o of only) {
  if (o === 'ai') continue;
  const f = OUTPUTS[o].file;
  mkdirSync(dirname(join(OUT, f)), { recursive: true });
  cpSync(join(KIT, f), join(OUT, f));
  made.push(o);
}

// ---------- AI files ----------
const V = DS.voice || {}, M = DS.meta || {}, L = DS.logo || {}, C = DS.copy || {};
const bullet = (a) => (a || []).map((x) => '- ' + x).join('\n');
if (only.includes('ai')) {
  mkdirSync(join(OUT, 'ai'), { recursive: true });
  const colourLines = (DS.colors || []).map((c) => '| ' + c.name + ' | `' + c.token + '` | ' + (tokens[c.token] || '') + ' | ' + (c.role || '') + ' | ' + (c.why || '') + ' |').join('\n');
  writeFileSync(join(OUT, 'ai/agent-brief.md'), `# Agent brief: ${M.name}

Read this before making any asset for ${M.name}. Then check the result against \`checks/CHECKLIST.md\`.

## The brand in one line
${(DS.identity || {}).positioning || ''}

## Use only these files
- Values: \`foundations/tokens.css\` (or \`tokens.json\`). Never invent a colour, font or size.
- Logo: \`foundations/${L.file || 'logo/'}\`. Use it as it is. Never redraw, trace, recolour or stretch it.
- Components: \`components/components.css\` for buttons, fields, cards and tags.
- Voice: \`ai/voice.md\`.

## Colours
| Name | Token | Value | Job | Why |
|---|---|---|---|---|
${colourLines}

${(DS.colorRules || {}).ratio || ''}

Status and danger:
- Status messages use the status shades (\`--ds-error-bg\`, \`--ds-error-text\`, \`--ds-error-border\`, and the same for ok, warn, info) and always say the status in words.
- Only the error colour marks danger. Delete and other destructive actions use \`ds-btn ds-btn--danger\` with a clear label. Brand colours never go on those buttons, and the error colour never appears in marketing.
- Warning always carries dark text.

## Type
${(DS.type || []).map((f) => '- ' + f.role + ': ' + f.family + ' (`' + f.token + '`), ' + f.use).join('\n')}

## Voice
${V.oneLine || ''}

${bullet(V.rules)}

Never use: ${(V.banned || []).join(', ')}.

## Logo rules
${bullet(L.rules)}

## Before you hand anything back
- Every colour is a token from tokens.css.
- Readability rule: every piece of text passes 4.5:1 against what is behind it (3:1 for large text: 24px, or 19px bold). This includes accent phrases, coloured words, labels and text on brand colours. If a coloured word falls short, darken it on light grounds or lighten it on dark grounds until it passes, or put a light accent behind dark text as a highlight.${aod ? '\n- Accent words on dark grounds use var(--ds-accent-on-dark) (' + aod + '), the brand\'s own choice, not a brightened accent.' : ''}
- Copy uses hyphens only, sentence case, no banned words.
- It works on desktop and at 390px wide, with no sideways scroll.
- Say which values you were unsure about. Do not hide a gap.
`);
  writeFileSync(join(OUT, 'ai/voice.md'), `# Voice and tone: ${M.name}

${V.oneLine || ''}

## Traits
| Trait | It means | It is not | Example |
|---|---|---|---|
${(DS.traits || []).map((t) => '| ' + [t.name, t.means, t.isNot, t.example].join(' | ') + ' |').join('\n')}

## We are, we are not
| We are | We are not |
|---|---|
${(V.weAre || []).map((r) => '| ' + r[0] + ' | ' + r[1] + ' |').join('\n')}

## Tone by context
| Context | Tone | Example |
|---|---|---|
${(V.tone || []).map((r) => '| ' + r.join(' | ') + ' |').join('\n')}

## Rules
${bullet(V.rules)}

## Banned words
${(V.banned || []).map((w) => '`' + w + '`').join(', ')}${(V.bannedOnCurrentPages || []).length ? '\n\nAlso kept off current pages: ' + V.bannedOnCurrentPages.map((w) => '`' + w + '`').join(', ') : ''}

## Sample copy
| Channel | Copy |
|---|---|
${(V.samples || []).map((s) => '| ' + s.channel + ' | ' + s.copy + ' |').join('\n')}
`);
  made.push('ai');
}

// ---------- checklist and start page ----------
mkdirSync(join(OUT, 'checks'), { recursive: true });
writeFileSync(join(OUT, 'checks/CHECKLIST.md'), `# Checks: ${M.name}

Run before anything is published. Hard fails stop the build. Notes are for the owner to decide.

## Last run
${passed.map((p) => '- [x] ' + p).join('\n')}
${find.length ? '\n## Notes to decide\n' + find.map((f) => '- [ ] ' + f).join('\n') : ''}

## Before publishing any asset
- [ ] The logo is the master file, with clear space, not redrawn
- [ ] Every colour is a token from \`foundations/tokens.css\`
- [ ] Readability: every piece of text, including coloured and accent words, passes 4.5:1 on what is behind it (3:1 for large text)
- [ ] Copy: hyphens only, sentence case, no banned words
- [ ] Checked on desktop and at 390px, with no sideways scroll
- [ ] Anything tagged "To confirm", "Assumption" or "Proposed" is approved or removed
`);

const has = (o) => existsSync(join(OUT, OUTPUTS[o].file));
const rows = Object.entries(OUTPUTS).filter(([k]) => has(k)).map(([k, v]) => '| `' + v.file + '`' + (v.pdf ? ' and `.pdf`' : '') + ' | ' + v.what + ' |').join('\n');
writeFileSync(join(OUT, 'START-HERE.md'), `# ${M.name} design system

Made with the Design System Toolkit (free, by Designers Who Build). Open any \`.html\` file in a browser. They all read the same two files, so they always agree.

## What is in this folder
| File | What it is |
|---|---|
| \`foundations/tokens.css\` | Every value: colours, type, space, corners, motion |
| \`foundations/tokens.json\` | The same values, for design tools and code |
| \`foundations/brand.js\` | Words, rules and voice |
| \`foundations/${L.file || 'logo/'}\` | The master logo, unchanged |
| \`components/components.css\` | Working components that read the tokens |
${rows}
| \`checks/CHECKLIST.md\` | What to check before anything is published |

## To change something
1. Change the value in \`foundations/tokens.css\`, or the words in \`foundations/brand.js\`.
2. Reopen the documents. To make new PDFs, print from the browser (Save as PDF) or run the generator again.
3. Run the checks.

## To add an output later
Ask your AI: "Add slides to my design system", or run \`node generate.mjs --out <this folder> --only slides\`.
`);

// ---------- PDFs ----------
const chrome = [process.env.CHROME, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'].find((p) => p && existsSync(p));
const pdfs = [];
if (!flag('no-pdf')) {
  const toPrint = made.filter((o) => OUTPUTS[o].pdf);
  if (toPrint.length && !chrome) console.log('\nNo Chrome found, so no PDFs. Open each page in a browser and use Print, then Save as PDF.');
  for (const o of chrome ? toPrint : []) {
    const html = join(OUT, OUTPUTS[o].file), pdf = html.replace(/\.html$/, '.pdf');
    try {
      execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--run-all-compositor-stages-before-draw', '--window-size=1400,1000', '--virtual-time-budget=20000', '--allow-file-access-from-files', '--print-to-pdf=' + pdf, pathToFileURL(html).href], { stdio: 'ignore', timeout: 120000 });
      pdfs.push(relative(OUT, pdf));
    } catch (e) { console.log('Could not print ' + o + ': ' + e.message); }
  }
}

// ---------- readability report: what the pages adjusted as they drew ----------
// Each page checks every piece of text against what is behind it and adjusts colours that fall short.
// Read those adjustments back so the owner sees them, and so a wrong adjustment cannot hide.
const adjustments = [];
if (chrome && !flag('no-pdf')) {
  for (const o of made.filter((x) => x !== 'ai')) {
    try {
      const dom = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--window-size=1400,1000', '--virtual-time-budget=15000', '--allow-file-access-from-files', '--dump-dom', pathToFileURL(join(OUT, OUTPUTS[o].file)).href], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 120000, maxBuffer: 64 * 1024 * 1024 });
      for (const m of dom.matchAll(/<[^>]*data-contrast-fixed="([^"]+)"[^>]*>([^<]{0,40})/g)) {
        const unfixed = (m[0].match(/data-contrast-unfixed="([^"]+)"/) || [])[1];
        adjustments.push([o, m[1].replace(/&amp;/g, '&') + (unfixed ? '  STILL FAILS, ' + unfixed + ': change the colour pair' : ''), m[2].trim()]);
      }
    } catch (e) { /* the report is a help, not a gate */ }
  }
}
if (adjustments.length) {
  const seen = new Map();
  for (const [o, fix, text] of adjustments) { const k = o + ' | ' + fix; if (!seen.has(k)) seen.set(k, { o, fix, text, n: 0 }); seen.get(k).n++; }
  console.log('\nReadability: ' + adjustments.length + ' pieces of text were adjusted to pass contrast');
  for (const v of seen.values()) console.log('  ' + v.o.padEnd(11) + v.fix + (v.text ? '  ("' + v.text + '")' : '') + (v.n > 1 ? '  x' + v.n : ''));
  const cl = join(OUT, 'checks/CHECKLIST.md');
  writeFileSync(cl, readFileSync(cl, 'utf8') + '\n## Readability adjustments made while drawing\nEach line: the page, the colour that fell short on its background, its ratio, and the colour used instead. Check these look right.\n' + [...seen.values()].map((v) => '- [ ] ' + v.o + ': ' + v.fix + (v.text ? ' ("' + v.text + '")' : '') + (v.n > 1 ? ', ' + v.n + ' times' : '')).join('\n') + '\n');
} else if (chrome && !flag('no-pdf')) console.log('\nReadability: every piece of text passed without adjustment');

console.log('\nMade in ' + OUT);
console.log('  foundations  tokens.css, tokens.json, brand.js, ' + (L.file || 'logo'));
console.log('  components   components.css');
for (const o of made) console.log('  ' + o.padEnd(12) + OUTPUTS[o].file);
for (const p of pdfs) console.log('  pdf          ' + p);
console.log('  checks       checks/CHECKLIST.md\n  start        START-HERE.md');
