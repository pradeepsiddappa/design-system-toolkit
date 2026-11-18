# The two files

Everything in a design system is drawn from two files in `foundations/`. Copy the shape of one of the brands in `examples/` exactly, then change the contents.

## tokens.css: the values

CSS variables on `:root`. Keep every name the example uses, because the templates and `components.css` read them by name.

| Required | What it is |
|---|---|
| `--ds-canvas` | Page background |
| `--ds-surface` | Panels and section bands, a step off the canvas |
| `--ds-line` | Hairline borders |
| `--ds-ink` | Main text. Must reach 4.5:1 on the canvas |
| `--ds-ink-2` | Secondary text |
| `--ds-brand` | The colour that carries covers, bands, headers and the brand card. Often the darkest brand colour |
| `--ds-accent` | The one action colour: primary buttons and links |
| `--ds-font-display`, `--ds-font-body`, `--ds-font-label` | Three font stacks, each with a fallback |

Also expected (the examples have them): `--ds-on-brand` and `--ds-on-accent` (text on those colours, such as `#FFFFFF`, or black on a light accent), `--ds-line-strong`, `--ds-ink-3`, `--ds-accent-deep` (accent hover), `--ds-c1` to `--ds-c6` (palette, as many as the brand has), `--ds-ok`, `--ds-warn`, `--ds-error`, `--ds-info`, the type scale (`--ds-size-*`), weights, tracking, radius (`--ds-radius-card`, `-button`, `-input`, `-tag`), space (`--ds-space-1` upwards) and motion.

- Colours are hex values (`#RRGGBB`), so they can be checked.
- `--ds-gradient` is optional. Delete it if the brand has no gradient. Write its colours as hex, not `var()`.
- Load web fonts with one `@import` at the top of the file.
- Palette colours become the chapter colours in the documents, in order. Two to six is right.

## brand.js: the words and rules

One object, `window.DS`. Plain text only: no HTML. Two marks are allowed: `` `code` `` and `*accent phrase*` (shown in the accent or gradient).

| Field | What goes in it | Required |
|---|---|---|
| `meta` | `name`, `short`, `domain`, `version`, `updated`, `owner`, `status`, `style` (`tinted` by default; also `editorial`, `ink`, `bold`, `calm`), `paper` (`white` by default; `canvas` prints documents on the brand canvas colour) | name |
| `logo` | `file` (path inside foundations), `onDark`, `onDarkGround`, `alt`, `wordmark`, `description`, `clearSpace`, `minMark`, `minLockup`, `rules[]`, `src` | file |
| `identity` | `positioning`, `essence`, `notThis[]`, `belief`, `promise`, `src` | positioning |
| `traits[]` | `{ name, means, isNot, example }`, three to five | yes |
| `pillars[]` | `{ name, covers, src }` | no |
| `voice` | `oneLine`, `weAre[[are, areNot]]`, `tone[[context, tone, example]]`, `rules[]`, `banned[]`, `samples[{ channel, copy, src }]` | oneLine, rules |
| `copy` | Lines used in the sample screens and posts: `heroHeadline`, `heroLede`, `primaryAction`, `secondaryAction`, `navLinks[]`, `cards[[label, title]]`, `socialLine`, `cardTitle`, `cardLine`, `emailSubject`, `emailBody`, `emailAction`, `emptyState`, `error`, `footer`, `bannerLine` | yes |
| `graphics` | `{ motif, why, photos[], src }`. `motif` is `arcs`, `blobs`, `grid`, `dots`, `stripes`, `rays` or `none`: decorative backgrounds drawn from the palette for posts, covers and banners, kept away from text. `photos` are paths inside foundations, such as `images/shop.jpg`, used on announcement posts | no (default `blobs`) |
| `colors[]` | `{ token, name, role, group, src, note }`. `group` is `brand`, `ground`, `text`, `palette` or `status`. Every token named here must be set in tokens.css | yes |
| `colorRules` | `ratio`, `accent`, `gradient`, `documents` | no |
| `contrast[]` | Pairs to check: `[foreground, background]`, tokens or hex | yes |
| `fixes[]` | `{ token, current, proposed, why, src }` for colours that fail | no |
| `type[]` | `{ role, token, family, weights, use, src }`, one per font token | yes |
| `typeScale[]` | `{ name, token, font, line, weight }`, `font` is `display`, `body` or `label` | yes |
| `typeRules[]`, `layout[]`, `surfaces`, `elevation`, `motion[]`, `icons`, `imagery[]` | As in the example | no |
| `components` | One rule each for `buttons`, `cards`, `inputs`, `tags`, `nav` | no |
| `accessibility[]`, `darkMode`, `governance[]`, `recipes[]` | As in the example | no |
| `playbook` | One entry per channel (`website`, `social`, `product`, `email`, `documents`, `print`), each `{ lede, rules[] }` | no |
| `gaps[]`, `decisions[]` | Plain sentences: what the material does not say, and what the owner must decide | gaps |
| `sources[]` | Pairs `[source, usedFor]`, such as `['about-us.txt', 'Voice and positioning']` | no |
| `confirmations` | `ownsLogo`, `fontLicencesChecked`, `voiceLinesRewritten` (a number). Set only from the owner's own answers | yes |

## Source tags

Every value that could be wrong carries `src`:

| Tag | Shown as | Use when |
|---|---|---|
| `buyer` | Confirmed | The owner gave or confirmed it |
| `extracted` | To confirm | You read it from the logo or material |
| `default` | Default | A toolkit starting value |
| `assumption` | Assumption | The material is silent |
| `proposed` | Proposed | Your recommendation, waiting for a decision |

## Readability rule

Every piece of text must reach 4.5:1 against what is behind it, or 3:1 for large text (24px, or 19px bold). This covers accent phrases, coloured words, labels and text on brand colours, not only body copy. The templates enforce it as they draw: a coloured word that falls short is darkened on light grounds or lightened on dark grounds until it passes. A light accent (such as lime) is shown as a highlight behind dark text. When you choose colours, aim to pass without these fixes: set `--ds-on-brand` and `--ds-on-accent`, and check the accent on both the canvas and the brand colour.

## Hard fails (the generator stops)

- A required token is missing, or `brand.js` names a token that `tokens.css` does not set.
- No brand name, or the logo file is not where `logo.file` says.
- The owner has not confirmed they own the logo, or checked the font licences.
- Fewer than three voice lines were rewritten by the owner.
- Body text (ink on canvas) is under 4.5:1.

Everything else is a note for the owner to decide.
