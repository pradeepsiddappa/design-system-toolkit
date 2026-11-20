---
name: make
description: Make an on-brand asset from a design system built with the Design System Toolkit - a social post, story, banner, thumbnail, poster, email, web page section, app screen, slide or business card - then check it and save a picture. Use when someone with a my-design-system folder asks to make, design or generate anything for their brand.
argument-hint: "<what to make, and what it is about>"
---

# Make something on brand

The user has a design system folder (default `./my-design-system`, or ask). They describe what they want, for example "an Instagram post about splitting the bill". You make it from their design system, check it, and save a picture.

## 1. Read before you make
- `ai/agent-brief.md` and `ai/voice.md`: the rules and the voice.
- `foundations/brand.js`: words, `copy`, `graphics.motif`, `graphics.photos`, logo rules.
- `foundations/tokens.css`: the only colours, fonts, sizes and corners you may use.

If the folder has no `_system/asset.js`, run the setup generator once to refresh it: `node <setup skill folder>/scripts/generate.mjs --out <folder> --only ai`.

## 2. Ask only what you need
If the request is clear, go. Otherwise ask at most two short questions: what it is about (the message, the date, the offer), and where it goes, if the format is not obvious. Never invent facts, prices, dates, numbers or quotes. Use the user's words, the brand's `copy`, or ask.

## 3. Make it as one HTML file
Save to `<folder>/assets/<short-name>.html`. Use this shell:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="ds-size" content="1080x1080">
<title>Short name</title>
<link rel="stylesheet" href="../foundations/tokens.css">
<link rel="stylesheet" href="../components/components.css">
<script src="../foundations/brand.js"></script>
<script src="../_system/asset.js"></script>
<style>
  body { margin: 0; }
  .asset { width: 1080px; height: 1080px; box-sizing: border-box; font-family: var(--ds-font-body); color: var(--ds-ink); }
</style>
</head>
<body>
  <div class="asset">...</div>
</body>
</html>
```

Building blocks:
- **Logo:** `<img data-ds-logo>` (or `data-ds-logo="dark"` on dark grounds, if the brand has that file). Never draw, trace, recolour, crop or round the logo. Round only a tile behind it, with padding at least as big as the corner radius.
- **Background shapes:** `<div data-ds-motif data-ground="--ds-brand">...content...</div>` draws the brand's motif from its palette. Add `data-area="full"` for shapes all around. Keep text away from the shapes.
- **Accent phrase:** `<span class="ds-accent-text">phrase</span>`, once per asset at most.
- **Components:** `ds-btn ds-btn--accent`, `ds-tag`, `ds-card`, `ds-note` and the rest from `components/components.html`.
- **Colours and type:** only `var(--ds-...)`. No hex values in the asset.
- **Status and danger:** status messages use the status shades (`--ds-error-bg`, `--ds-error-text` and so on) and always say the status in words. A delete or destructive button is `ds-btn ds-btn--danger` with a clear label. Never put a brand red or orange on a button, and never use the error colour in marketing.

Sizes (set `ds-size` and `.asset` to match):

| Format | Size |
|---|---|
| Instagram or LinkedIn square post | 1080x1080 |
| Instagram portrait post | 1080x1350 |
| Story or WhatsApp status | 1080x1920 |
| LinkedIn or X landscape post | 1200x627 |
| LinkedIn banner | 1584x396 |
| YouTube thumbnail, slide | 1280x720 |
| Email (one column) | 640x900 |
| Web page section | 1440x800 |
| App screen | 390x844 |
| Poster or flyer (A4 at screen size) | 794x1123 |
| Business card | 1050x600 |

## 4. Check and save a picture
Run: `node <setup skill folder>/scripts/snap.mjs <folder>/assets/<short-name>.html`

It saves `<short-name>.png` and reports:
- readability adjustments (fine, but look at them) and anything that **STILL FAILS** (fix the colour pair and run again)
- colours that are not tokens, banned words and long dashes (fix them and run again)

If you change the asset after this, even a small edit, run `snap.mjs` again before handing it back: the picture you show must come from the final file.

## 5. Hand it back
Show the picture. In two or three lines, say what you made, which brand rules you used (for example "statement layout, arcs motif, one accent phrase"), and anything you were unsure of. Offer one or two variations (another layout, another size), not a long list.

Rules that always apply: hyphens only, sentence case, the brand's banned words never appear, text never sits on shapes or busy photos, and every piece of text passes the readability rule.
