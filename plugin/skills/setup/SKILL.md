---
name: setup
description: Set-up wizard that turns a logo and brand material into a full design system - tokens, brand guidelines, playbook, component sheet, one-page summary, slides, onboarding page and AI brief - choosing which outputs to make. Use when someone asks to create a design system, brand guidelines, a style guide or a brand kit from their logo, or to add an output (such as slides) to a design system they already made.
argument-hint: "[add <output> | sample <name>]"
---

# Design system wizard

You guide the user through five short steps, then build their design system with the generator in this skill's `scripts/` folder. The user is often a designer or founder, not a developer: use plain words, one step at a time, and never show them code unless they ask.

**The key rule:** you only ever write two files, `foundations/tokens.css` (the values) and `foundations/brand.js` (the words and rules). The templates in `kit/` do all the layout. Never write or edit the HTML documents, `kit/_system/*` or `components.css` for a brand.

Files in this skill (paths are relative to this SKILL.md):
- `examples/<name>/foundations/` - four finished brands: `dhanak`, `lumen-health` and `fieldnote-studio` (made-up samples) and `designers-who-build` (a real one). Copy their shape exactly.
- `reference/brand-js-guide.md` - what every field means and which are required. Read it before step 3.
- `scripts/generate.mjs` - checks the two files and builds the chosen outputs. Needs Node 18+.
- `kit/` - the templates the generator copies.

## If the user typed `sample <name>`, or wants to see an example first

Build a sample brand so they can see the full result before using their own:

```
node <this skill folder>/scripts/generate.mjs --sample <name>
```

This makes `./sample-<name>/`. Samples: `dhanak` (a UPI payment app: indigo and marigold, app screens first), `lumen-health` (a family clinic: soft, round, calm blue), `fieldnote-studio` (a design studio: black and lime, square, sharp). Open `sample-<name>/guidelines/guidelines.html` for them, then offer to start on their own brand. A sample can also be the starting point: copy its `foundations/` into their folder and change it with them.

## If the user typed `add <output>`

They already have a design system. Find the folder (default `./my-design-system`, or ask), then run step 5 with `--only <output>` and skip the other steps. Outputs: `guidelines`, `playbook`, `components`, `one-page`, `slides`, `onboarding`, `ai`.

## Step 0: Choose what to make

If they have not seen the result yet, first offer a sample: "Want to see a finished example first? I can build a made-up UPI payment app, clinic or design studio in a few seconds." If yes, follow the sample section above, then come back here.

Ask one multiple-choice question that allows several answers (use the AskUserQuestion tool with `multiSelect: true` if you have it; otherwise list the options numbered and ask them to reply with numbers, such as "1, 3"):

1. **Brand guidelines and playbook** (`guidelines,playbook`): the full document and how to use it per channel, as web pages and PDFs
2. **Component sheet** (`components`): buttons, fields, cards and more, as working HTML for developers
3. **Quick set** (`one-page,slides,onboarding`): one printable page, six slides, a first-day page
4. **AI files** (`ai`): an agent brief and voice file, so any AI makes on-brand assets

Say that the foundations (tokens, logo, brand file, checks) are always included, and that they can add any output later with `/ds-toolkit:setup add slides`. If they say "everything", use all four.

Also ask where to put it. Default: `./my-design-system` in the current folder.

## Step 1: The logo

Ask for the logo file (path or attachment). Then:
- Copy it unchanged into `<out>/foundations/logo/`. Never redraw, trace or recolour it.
- Look at it. Report: the format, whether it is vector (SVG, PDF, AI, EPS) or a picture (PNG, JPG), its size, and the colours it contains as hex values, most used first. For an SVG, read the colours from the file. For a picture, say the colours are approximate.
- If it is a small or blurry picture (under about 1000px wide), say so plainly and suggest getting a vector file. Carry on only if they want to.
- Ask: "Do you own this logo, or have permission to use it?" A yes sets `confirmations.ownsLogo: true`. Without it, stop.
- Ask whether the logo reads on a dark background. This sets `logo.onDarkGround` (`as-is` or `tile`). If they have a separate light version, copy it too and set `logo.onDark`.

## Step 2: Brand material

Ask for anything that describes the brand: a brand PDF, a deck, website text or a link, sample copy, an existing style guide, or skills and prompts they already use. All are optional. Read everything they give. If they give nothing, say the voice and rules will be starting points to edit.

## Step 3: Draft the two files

Read `reference/brand-js-guide.md` and the example closest to their brand in `examples/` (an app or product: `dhanak`; a service or health: `lumen-health`; a studio or agency: `fieldnote-studio`). Then write:
- `<out>/foundations/tokens.css`: same variable names as the example. Colours from the logo and material. Fonts they named, or a close free Google Font with a `default` tag. Keep the example's spacing, radius and motion values unless the material says otherwise, tagged `default`.
- `<out>/foundations/brand.js`: same shape as the example. Fill each field from their material.

Tag every value with `src`: `buyer` (they gave it), `extracted` (you read it from the logo or material), `default` (a toolkit starting value), `assumption` (the material is silent), or `proposed` (your recommendation). Never invent facts about the brand, its customers or its results: leave a gap in `gaps` instead. Copy rules: hyphens only (no em or en dashes), sentence case.

Check contrast as you go, using the readability rule in `reference/brand-js-guide.md`: every piece of text, including accent phrases and text on the brand colour, reaches 4.5:1 (3:1 for large text). Body text (`--ds-ink` on `--ds-canvas`) failing is a hard stop. If a brand colour fails as a text background, keep it and add a `fixes` entry with a darker or lighter proposal.

## Step 4: Confirm

Show a short summary, not the files:
- A table of the colours (name, hex, job, tag), the three fonts, and the voice line.
- Anything tagged `extracted`, `assumption` or `proposed`, as a list.

Ask them to accept or change each item in one reply.

Then ask one question about how expressive their posts, covers and banners should be (multiple choice), and set `graphics` in `brand.js`:
1. **Calm**: plain brand colours, no shapes (`motif: 'none'`)
2. **Shapes from your logo**: pick the motif that echoes the logo (arcs for curves or rainbows, blobs for round or soft marks, rays for star or spoke marks, grid or stripes for square or geometric marks)
3. **A pattern**: dots, stripes or grid
4. **Your photos**: ask them to add pictures to `foundations/images/` and list them in `graphics.photos` (they must own them). Photos are used on announcement posts, with a motif elsewhere

Say which motif you chose and why, in one line, and store it in `graphics.why`. Then ask them to rewrite at least three sample lines in their own words (from `voice.samples` or `copy`), and confirm they have checked the font licences. Update `brand.js`: changed values become `buyer`, and set `confirmations.voiceLinesRewritten` and `confirmations.fontLicencesChecked`.

## Step 5: Build

Run the generator with Node from this skill's folder:

```
node <this skill folder>/scripts/generate.mjs --out <out> --only <chosen outputs>
```

(`--foundations` is not needed when the two files are already in `<out>/foundations/`.)

- If it stops on a hard fail, explain it in plain words, fix the two files with the user, and run it again. Never edit the generator or the templates to get past a check.
- Notes are not failures. Show them and ask the user what they want to do.
- If Node is not installed, say so. The documents still work: copy the folders in `kit/` into `<out>/` next to `foundations/` and open the `.html` files in a browser. Print to PDF from the browser.

## Finish

Tell them in a few lines:
- What was made, by folder, and which file to open first (`START-HERE.md`, then `guidelines/guidelines.pdf` or `.html`).
- On a Mac, offer to open the guidelines: `open <out>/guidelines/guidelines.html`.
- How to change something later: edit a value in `tokens.css`, reopen the pages, or run `/ds-toolkit:setup add <output>`.
- Any notes from the checks that still need their decision.
