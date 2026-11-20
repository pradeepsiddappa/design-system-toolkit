/* Helpers for any asset made from the design system (a post, a banner, a page section).
   Load after tokens.css, components.css and brand.js:
     <script src="../_system/asset.js"></script>
   In the asset's HTML:
     <img data-ds-logo alt="...">                       the master logo, as it is (data-ds-logo="dark" for the on-dark file)
     <div data-ds-motif data-ground="--ds-brand">         the brand's background shapes (graphics.motif), sized to the box
     <span class="ds-accent-text">phrase</span>          the one accent phrase (gradient, colour or highlight, as the brand needs)
   It then runs the readability rule: every piece of text must reach 4.5:1 on what is behind it (3:1 for large text).
   Text that falls short is adjusted and marked with data-contrast-fixed; text that cannot be fixed gets data-contrast-unfixed.
   The same logic as render.js, kept separate so assets need nothing else. */
(function () {
  'use strict';
  const me = document.currentScript && document.currentScript.src;
  const ROOT = me ? me.replace(/_system\/asset\.js.*$/, '') : '../';

  function start() {
    const DS = window.DS || {};
    const cs = getComputedStyle(document.documentElement);
    const raw = (t) => (t && t.startsWith('--') ? cs.getPropertyValue(t).trim() : t);
    const ctx = document.createElement('canvas').getContext('2d');
    const hex = (c) => { ctx.fillStyle = '#000000'; ctx.fillStyle = raw(c) || '#000000'; const v = ctx.fillStyle; if (v.startsWith('#')) return v.toUpperCase(); const m = v.match(/[\d.]+/g) || [0, 0, 0]; return '#' + m.slice(0, 3).map((n) => Math.round(+n).toString(16).padStart(2, '0')).join('').toUpperCase(); };
    const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
    const ratio = (a, b) => { const [x, y] = [lum(hex(a)), lum(hex(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
    const INK = hex('--ds-ink');
    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const palette = (DS.colors || []).filter((c) => c.group === 'palette').map((c) => c.token);
    const CHAP = palette.length ? palette : ['--ds-accent', '--ds-brand'];

    // Accent phrases
    const hasGradient = !!raw('--ds-gradient');
    if (hasGradient) document.documentElement.classList.add('ds-has-gradient');
    if (!hasGradient && ratio('--ds-accent', '--ds-canvas') < 3) document.documentElement.classList.add('ds-accent-light');
    const stops = (raw('--ds-gradient').match(/#[0-9a-f]{6}\b|#[0-9a-f]{3}\b/gi) || []).map(hex);
    if (stops.length > 1) {
      const mix = (t) => { const seg = Math.min(stops.length - 2, Math.floor(t * (stops.length - 1))); const f = t * (stops.length - 1) - seg, a = stops[seg], b = stops[seg + 1]; return '#' + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - f) + parseInt(b.slice(i, i + 2), 16) * f).toString(16).padStart(2, '0')).join(''); };
      document.querySelectorAll('.ds-accent-text').forEach((el) => { const chars = Array.from(el.textContent), n = chars.length; el.style.background = 'none'; el.innerHTML = chars.map((ch, i) => '<span style="color:' + mix(n > 1 ? i / (n - 1) : 0) + '">' + esc(ch) + '</span>').join(''); });
    }

    // Logo, never redrawn
    const L = DS.logo || {};
    document.querySelectorAll('img[data-ds-logo]').forEach((img) => {
      const file = img.dataset.dsLogo === 'dark' && L.onDark ? L.onDark : L.file;
      if (file) img.src = ROOT + 'foundations/' + file;
      if (!img.alt) img.alt = L.alt || ((DS.meta && DS.meta.name) || '') + ' logo';
      img.style.objectFit = 'contain';
    });

    // Background shapes from the palette (graphics.motif), kept to corners and edges
    const motif = (kind, w, h, ground, full) => {
      if (!kind || kind === 'none') return '';
      const cols = CHAP.filter((t) => ratio(t, hex(ground)) > 1.25), list = cols.length ? cols : ['--ds-accent'];
      const c = (i) => 'var(' + list[i % list.length] + ')';
      const dark = lum(hex(ground)) < 0.25;
      let g = '';
      if (kind === 'arcs') { const sw = Math.min(w, h) * 0.075; for (let i = 0; i < Math.min(4, list.length + 1); i++) g += '<circle cx="' + w + '" cy="' + (full ? h : 0) + '" r="' + ((full ? 0.62 : 0.44) * Math.min(w, h) * 1.1 - i * sw * 1.3) + '" fill="none" stroke-width="' + sw + '" style="stroke:' + c(i) + '"/>'; }
      else if (kind === 'blobs') { (full ? [[0.92, 0.08, 0.34], [0.06, 0.94, 0.2], [0.72, 0.86, 0.12]] : [[0.88, 0.1, 0.24], [0.62, 0.05, 0.1], [0.97, 0.38, 0.09]]).forEach((b, i) => { g += '<circle cx="' + w * b[0] + '" cy="' + h * b[1] + '" r="' + Math.min(w, h) * b[2] + '" style="fill:' + c(i) + '" opacity=".9"/>'; }); }
      else if (kind === 'grid') { const step = Math.min(w, h) / 12, line = dark ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.08)'; for (let x = step; x < w; x += step) g += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + h + '" stroke="' + line + '" stroke-width="2"/>'; for (let y = step; y < h; y += step) g += '<line x1="0" y1="' + y + '" x2="' + w + '" y2="' + y + '" stroke="' + line + '" stroke-width="2"/>'; const cx = Math.floor(w / step); [[cx - 3, 1], [cx - 2, 1], [cx - 2, 2], [cx - 4, 3]].forEach((q, i) => { g += '<rect x="' + q[0] * step + '" y="' + q[1] * step + '" width="' + step + '" height="' + step + '" style="fill:' + c(i) + '"/>'; }); }
      else if (kind === 'dots') { const step = Math.min(w, h) / 16, r = Math.min(w, h) / 120; for (let x = w * 0.52; x < w; x += step) for (let y = step; y < (full ? h : h * 0.4); y += step) g += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" style="fill:' + c(Math.round(x / step + y / step)) + '"/>'; }
      else if (kind === 'stripes') { const bw = Math.min(w, h) * 0.09, sh = h * (full ? 0.5 : 0.4); for (let i = 0; i < Math.min(5, list.length + 1); i++) { const o = w * 0.5 + i * bw * 1.15; g += '<polygon points="' + o + ',0 ' + (o + bw) + ',0 ' + (o + bw + sh) + ',' + sh + ' ' + (o + sh) + ',' + sh + '" style="fill:' + c(i) + '"/>'; } }
      else if (kind === 'rays') { const m = Math.min(w, h), cx = w - m * 0.18, cy = m * 0.2, n = Math.max(6, list.length); for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2; g += '<line x1="' + (cx + Math.cos(a) * m * 0.07) + '" y1="' + (cy + Math.sin(a) * m * 0.07) + '" x2="' + (cx + Math.cos(a) * m * 0.17) + '" y2="' + (cy + Math.sin(a) * m * 0.17) + '" stroke-width="' + m * 0.035 + '" stroke-linecap="round" style="stroke:' + c(i) + '"/>'; } }
      return '<svg aria-hidden="true" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" style="position:absolute;inset:0;pointer-events:none">' + g + '</svg>';
    };
    document.querySelectorAll('[data-ds-motif]').forEach((el) => {
      const kind = el.dataset.dsMotif || (DS.graphics && DS.graphics.motif) || 'blobs';
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.insertAdjacentHTML('afterbegin', motif(kind, el.clientWidth, el.clientHeight, el.dataset.ground || '--ds-brand', el.dataset.area === 'full'));
      Array.from(el.children).slice(1).forEach((ch) => { if (getComputedStyle(ch).position === 'static') ch.style.position = 'relative'; ch.style.zIndex = '1'; });
    });

    // Readability rule
    const nums = (c) => { const n = (c.match(/[\d.]+/g) || []).map(Number); if (/^color\(srgb/.test(c)) return [n[0] * 255, n[1] * 255, n[2] * 255].concat(n.length > 3 ? [n[3]] : []); return n; };
    const rgbHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
    const mixHex = (a, b, f) => rgbHex(...[1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16) * (1 - f) + parseInt(b.slice(i, i + 2), 16) * f));
    const bandOf = (img) => { if (!img || img.indexOf('gradient') < 0) return null; const found = img.match(/(rgba?\([^)]*\)|color\(srgb[^)]*\))/g) || []; const hs = found.map(nums).filter((c) => c.length >= 3 && (c.length < 4 || c[3] > 0.5)).map((c) => rgbHex(c[0], c[1], c[2])); return hs.length && hs.every((h) => h === hs[0]) ? hs[0] : null; };
    const groundOf = (el) => { for (let n = el; n && n.nodeType === 1; n = n.parentElement) { const s = getComputedStyle(n); const b = bandOf(s.backgroundImage); if (b) return b; const c = nums(s.backgroundColor); if (c.length >= 3 && (c.length < 4 || c[3] > 0.5)) return rgbHex(c[0], c[1], c[2]); } return hex('--ds-canvas'); };
    // The brand's own colour for accent text on dark grounds (optional token), used before brightening the accent.
    const AOD = raw('--ds-accent-on-dark') ? hex('--ds-accent-on-dark') : null;
    const ACCENTS = ['--ds-accent', '--ds-accent-deep'].filter((t) => raw(t)).map(hex);
    let adjusted = 0, unfixed = 0;
    document.querySelectorAll('body *').forEach((el) => {
      if (!Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) return;
      if (el.closest('[disabled], .is-disabled, [data-keep-colour]')) return;
      const st = getComputedStyle(el), c = nums(st.color);
      if (c.length < 3 || (c.length > 3 && c[3] < 0.5)) return;
      const bg = groundOf(el), size = parseFloat(st.fontSize), need = size >= 24 || (size >= 18.6 && parseInt(st.fontWeight, 10) >= 700) ? 3 : 4.5;
      let op = 1; for (let n = el; n && n.nodeType === 1; n = n.parentElement) op *= parseFloat(getComputedStyle(n).opacity);
      const fg = rgbHex(c[0], c[1], c[2]), seen = op < 1 ? mixHex(bg, fg, op) : fg;
      if (ratio(seen, bg) >= need) return;
      if (op < 1) el.style.opacity = '1';
      if (AOD && lum(bg) < 0.4 && ACCENTS.includes(fg) && ratio(AOD, bg) >= need) {
        el.style.color = AOD;
        el.dataset.contrastFixed = fg + ' on ' + bg + ', ' + ratio(seen, bg).toFixed(2) + ':1, now ' + AOD + ' (the brand\'s accent on dark)';
        adjusted++;
        return;
      }
      const toward = lum(bg) < 0.4 ? '#FFFFFF' : INK;
      let out = fg; for (let f = 0.1; f <= 1.001 && ratio(out, bg) < need; f += 0.1) out = mixHex(fg, toward, f);
      if (ratio(out, bg) < need) { out = ratio(INK, bg) > ratio('#FFFFFF', bg) ? INK : '#FFFFFF'; if (ratio(out, bg) < need) { el.dataset.contrastUnfixed = 'best possible ' + ratio(out, bg).toFixed(2) + ':1'; unfixed++; } }
      el.style.color = out;
      el.dataset.contrastFixed = fg + ' on ' + bg + ', ' + ratio(seen, bg).toFixed(2) + ':1, now ' + out;
      adjusted++;
    });
    document.documentElement.dataset.contrastAdjusted = String(adjusted);
    document.documentElement.dataset.contrastUnfixed = String(unfixed);
    document.documentElement.dataset.dsReady = '1';
  }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
})();
