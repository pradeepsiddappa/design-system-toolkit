/* Fieldnote Studio: a made-up sample brand, used to show what the toolkit makes.
   Every fact here is invented for the sample. */
window.DS = {
  meta: { name: 'Fieldnote Studio', short: 'FN', domain: 'fieldnote.example', version: '1.0', updated: '18 Nov 2026', owner: 'Jonas Berg and Lea Okafor, partners', status: 'Sample brand. Made up to show the toolkit.', style: 'tinted' },

  logo: { file: 'logo/fieldnote.svg', onDark: 'logo/fieldnote-on-dark.svg', alt: 'Fieldnote Studio: lime note lines on a black square', wordmark: 'Fieldnote Studio', description: 'Four lime note lines on a black square, like a page of field notes. A lime-edged version is used on black.', clearSpace: 'One note line on all sides', minMark: '24px', minLockup: '150px wide', rules: ['On black, use the lime-edged version.', 'Never round the corners.', 'Never recolour the lines.'], src: 'buyer' },

  identity: {
    positioning: 'A small research and design studio that turns what people do into products that work.',
    essence: 'We watch first, then design. Every decision traces back to a note from the field.',
    notThis: ['Not a big agency. Two partners and a small team.', 'Not decoration. Every screen has a reason.', 'Not trend-driven. The work should still make sense in five years.'],
    belief: 'The best ideas are already out there, in what people do.',
    promise: 'Every decision comes with the evidence behind it.',
    src: 'buyer'
  },

  traits: [
    { name: 'Direct', means: 'Short sentences. The point first.', isNot: 'Blunt or rude', example: 'This flow loses half its users at step two.' },
    { name: 'Curious', means: 'Ask before answering.', isNot: 'Indecisive', example: 'We sat with six nurses for a week.' },
    { name: 'Precise', means: 'Numbers and names, not adjectives.', isNot: 'Cold', example: 'Sign-up time fell from 9 minutes to 2.' }
  ],
  pillars: [
    { name: 'Field', covers: 'Research stories from the work', src: 'buyer' },
    { name: 'Notes', covers: 'Methods and tools we use', src: 'buyer' },
    { name: 'Work', covers: 'Case studies with results', src: 'buyer' }
  ],

  voice: {
    oneLine: 'A sharp researcher who shows you the evidence before the opinion.',
    weAre: [
      ['Precise: "Sign-up time fell from 9 minutes to 2."', 'Vague: "We transformed the onboarding experience."'],
      ['Direct: "This screen does not work. Here is why."', 'Hedging: "There may be some opportunities here."'],
      ['Curious: "We asked why, five times."', 'Know-it-all: "Users always want fewer clicks."']
    ],
    tone: [
      ['Case study', 'Problem, evidence, result', 'Nurses spent 40 minutes a shift on one form.'],
      ['Proposal', 'Plain scope, plain price', 'Four weeks, two researchers, one report.'],
      ['Social post', 'One finding', 'People read the first line. Only the first line.'],
      ['Error', 'What happened, then what to do', 'That file is too large. Keep it under 20 MB.'],
      ['Button', 'Verb first', 'Read the case']
    ],
    rules: ['Lead with the finding.', 'A number beats an adjective.', 'Hyphens only, no long dashes.', 'Sentence case.', 'Name the method we used.'],
    banned: ['delight', 'seamless', 'disrupt', 'synergy', 'best-in-class', 'journey'],
    samples: [
      { channel: 'Homepage headline', copy: 'We watch first. Then we design.', src: 'buyer' },
      { channel: 'Case study title', copy: 'Forty minutes back, every shift', src: 'buyer' },
      { channel: 'Social post', copy: 'People read the first line. Only the first line.', src: 'buyer' },
      { channel: 'Email subject', copy: 'One finding from this month', src: 'proposed' }
    ]
  },

  copy: {
    heroHeadline: 'We watch first. *Then* we design.',
    heroLede: 'Research and design for products that have to work on a hard day.',
    primaryAction: 'Read the cases',
    secondaryAction: 'How we work',
    navLinks: ['Work', 'Notes', 'Studio'],
    cards: [['Health', 'Forty minutes back, every shift'], ['Finance', 'A loan form in two minutes'], ['Transit', 'Late trains, told early']],
    socialLine: 'People read *the first line*. Only the first line.',
    cardTitle: 'Forty minutes back',
    cardLine: 'One form, redesigned with the nurses who use it.',
    emailSubject: 'One finding from this month',
    emailBody: 'People skip instructions. Here is what they read instead, and what we changed.',
    emailAction: 'Read the note',
    emptyState: 'No notes yet. Start with one thing you saw today.',
    error: 'That file is too large. Keep it under 20 MB.',
    footer: 'Fieldnote Studio, research and design.',
    bannerLine: 'We watch *first*.'
  },

  /* Backgrounds for posts, covers and banners. motif: arcs, blobs, grid, dots, stripes, rays or none.
     photos: pictures you add to foundations/images/, such as 'images/shop.jpg'. */
  graphics: { motif: 'grid', why: 'The 12-column grid, with lime blocks', photos: [], src: 'buyer' },

  colors: [
    { token: '--ds-brand', name: 'Black', role: 'Covers, headers, the mark', group: 'brand', src: 'extracted', why: 'The logo\'s square, like the cover of a notebook.', whySrc: 'extracted' },
    { token: '--ds-accent', name: 'Lime', role: 'The one action, highlights', group: 'brand', src: 'extracted', why: 'The logo\'s note lines. Used like a highlighter: one phrase or one action at a time.', whySrc: 'extracted' },
    { token: '--ds-accent-deep', name: 'Lime deep', role: 'Action hover', group: 'brand', src: 'default' },
    { token: '--ds-canvas', name: 'Paper', role: 'Page', group: 'ground', src: 'buyer' },
    { token: '--ds-surface', name: 'Stone light', role: 'Panels', group: 'ground', src: 'default' },
    { token: '--ds-line', name: 'Rule', role: 'Hairlines', group: 'ground', src: 'default' },
    { token: '--ds-ink', name: 'Black', role: 'Text', group: 'text', src: 'buyer' },
    { token: '--ds-ink-2', name: 'Graphite', role: 'Secondary text', group: 'text', src: 'default' },
    { token: '--ds-c1', name: 'Lime', role: 'Palette', group: 'palette', src: 'extracted', why: 'The logo\'s note lines.', whySrc: 'extracted' },
    { token: '--ds-c2', name: 'Rust', role: 'Palette', group: 'palette', src: 'buyer', why: 'Chosen by the studio for research tags and charts.', whySrc: 'buyer' },
    { token: '--ds-c3', name: 'Slate', role: 'Palette', group: 'palette', src: 'buyer', why: 'Chosen by the studio for research tags and charts.', whySrc: 'buyer' },
    { token: '--ds-c4', name: 'Stone', role: 'Palette', group: 'palette', src: 'buyer', why: 'Chosen by the studio for research tags and charts.', whySrc: 'buyer' },
    { token: '--ds-ok', name: 'Moss', role: 'Confirmed', group: 'status', src: 'default' },
    { token: '--ds-warn', name: 'Ochre', role: 'Check this', group: 'status', src: 'default' },
    { token: '--ds-error', name: 'Rust', role: 'Went wrong', group: 'status', src: 'default' },
    { token: '--ds-info', name: 'Slate', role: 'Information', group: 'status', src: 'default' }
  ],
  colorRules: {
    ratio: 'Black and paper do almost everything. Lime appears once per page, like a highlighter.',
    accent: 'Lime always carries black text, never white.',
    documents: 'Rust, slate and stone are for charts and diagrams only.'
  },
  contrast: [['--ds-ink', '--ds-canvas'], ['--ds-ink-2', '--ds-canvas'], ['--ds-on-brand', '--ds-brand'], ['--ds-on-accent', '--ds-accent'], ['#FFFFFF', '--ds-accent'], ['#FFFFFF', '--ds-c2']],

  type: [
    { role: 'Display', token: '--ds-font-display', family: 'Space Grotesk', weights: '500, 700', use: 'Headlines, big numbers', src: 'buyer' },
    { role: 'Body', token: '--ds-font-body', family: 'IBM Plex Sans', weights: '400, 600', use: 'Text, reports', src: 'buyer' },
    { role: 'Label', token: '--ds-font-label', family: 'Space Mono', weights: '400, 700', use: 'Labels, figures, captions', src: 'buyer' }
  ],
  typeScale: [
    { name: 'Display XL', token: '--ds-size-display-xl', font: 'display', line: 0.95 },
    { name: 'Display', token: '--ds-size-display', font: 'display', line: 1 },
    { name: 'Heading', token: '--ds-size-heading', font: 'display', line: 1.05 },
    { name: 'Subheading', token: '--ds-size-subheading', font: 'body', line: 1.35, weight: 600 },
    { name: 'Body', token: '--ds-size-body', font: 'body', line: 1.6 },
    { name: 'Label', token: '--ds-size-label', font: 'label', line: 1.2 }
  ],
  typeRules: ['Big numbers in Space Grotesk, set tight.', 'Captions and figures in Space Mono.', 'One headline size per page.'],

  layout: [
    { name: 'Container', value: '1280px wide', src: 'buyer' },
    { name: 'Grid', value: '12 columns, 32px gutters, everything snaps', src: 'buyer' },
    { name: 'Corners', value: 'Square, everywhere', src: 'buyer' }
  ],
  surfaces: 'Paper pages, stone panels, black rules. Square corners only.',
  elevation: { rule: 'Flat. Separation by rules and space, never shadows.', src: 'buyer' },
  motion: [{ use: 'Hover', value: '100ms, linear, colour only', src: 'buyer' }],
  icons: { set: 'None by default. Words first.', rules: ['Use an icon only where a word will not fit.', 'Line icons, 1.5px, square ends.'], src: 'buyer' },
  imagery: ['Research photos: hands, screens, workplaces, with consent.', 'Black-and-white photos with one lime highlight.', 'Diagrams over illustrations.'],

  components: {
    buttons: 'Lime with black text for the one action. Square corners.',
    cards: 'Square cards on paper, with a hairline rule.',
    inputs: 'Square fields, labels above in mono.',
    tags: 'Square tags in mono capitals.',
    nav: 'Work, Notes, Studio. Contact is a text link, not a button.'
  },
  accessibility: ['Never white text on lime.', 'Body text 4.5:1 or more.', 'Charts use labels, not colour alone.'],

  governance: [['Owners', 'Jonas Berg and Lea Okafor'], ['Source of truth', 'foundations/tokens.css and brand.js'], ['Change rule', 'Both partners agree before a token changes.']],
  recipes: [
    { title: 'Case study cover', steps: ['Black field, paper headline.', 'The result as a big number in lime.', 'Client sector in mono, top left.'] },
    { title: 'Finding post', steps: ['Paper field, black text.', 'One finding, one sentence.', 'One lime highlight on the key words.'] },
    { title: 'Report page', steps: ['12-column grid.', 'Figures in mono with a source line.', 'Charts in slate, rust and stone.'] }
  ],
  playbook: {
    website: { lede: 'The work leads. Every case has a number.', rules: ['Hero: one sentence and one action.', 'Case cards show sector, title and result.', 'No carousels.'] },
    social: { lede: 'One finding per post.', rules: ['Black or paper field.', 'Lime only on the key words.', 'Credit the method.'] },
    product: { lede: 'Client tools use the same square system.', rules: ['Lime for the one action.', 'Errors in rust with a fix.'] },
    email: { lede: 'A monthly note with one finding.', rules: ['Subject is the finding.', 'One link to read more.'] },
    documents: { lede: 'Reports are the main product.', rules: ['Black cover, lime result.', 'Every figure has a source line.'] },
    print: { lede: 'Workshop kits and posters.', rules: ['Black and lime on paper stock.', 'Square stickers, mono labels.'] }
  },
  gaps: ['No chart colour order agreed.', 'No guidance for client co-branding.'],
  decisions: ['Agree a chart colour order.', 'Write co-branding rules.'],

  confirmations: { ownsLogo: true, fontLicencesChecked: true, voiceLinesRewritten: 3 }
};
