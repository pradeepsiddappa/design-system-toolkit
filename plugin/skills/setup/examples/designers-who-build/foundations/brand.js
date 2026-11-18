/* Design system: words and rules for Designers Who Build (sample).
   tokens.css holds the values. This file holds everything else: names, voice, rules and copy.
   The documents read both files in the browser. No build step is needed.

   Source tags ("src"), used on every value that could be wrong:
     buyer       - given or confirmed by the brand owner
     extracted   - read by the AI from the logo or brand material, still to confirm
     default     - a sensible starting value from the toolkit
     assumption  - the material is silent, so this is a guess to confirm
     proposed    - a recommendation waiting for the owner's decision
*/
window.DS = {
  meta: {
    name: 'Designers Who Build',
    short: 'DWB',
    domain: 'designerswhobuild.in',
    version: '0.2-sample',
    updated: '18 Nov 2026',
    owner: 'Pradeep Siddappa',
    status: 'Sample for testing. Not an approved brand document.',
    style: 'tinted' // tinted, editorial, ink, bold or calm. See kit/_system/doc.css
  },

  logo: {
    file: 'logo/logo.svg',
    onDark: '',            // a version for dark backgrounds, if the brand has one
    onDarkGround: 'as-is', // 'as-is' if the logo reads on dark grounds, 'tile' to sit it on a white tile
    alt: 'The Designers Who Build spark mark: six coloured spokes',
    wordmark: 'Designers Who Build',
    description: 'Six coloured spokes, one per palette colour, radiating from a centre, with the wordmark beside it.',
    clearSpace: 'The height of one spoke on all sides',
    minMark: '16px',
    minLockup: '120px wide',
    rules: [
      'Use the master SVG file. Never redraw or trace it.',
      'Never recolour the spokes outside the six palette colours.',
      'Never rotate, stretch or add effects.',
      'On dark grounds, the mark sits as it is. The spokes keep their colours.'
    ],
    src: 'buyer'
  },

  identity: {
    positioning: 'An archive and body of practice on design, technology and AI.',
    essence: 'Designers and other non-coders can build the thing themselves, with AI as a working partner. The brand shows what that looks like, in plain terms, with honest results.',
    notThis: [
      'Not a course catalogue, a school or a cohort programme.',
      'Not a tool company. The brand shows practice, not a product pitch.',
      'Not a design agency. Paid work is described honestly, as offers on Topmate.'
    ],
    belief: 'Designers who build learn more about their own work.',
    promise: 'Every page tells you what to try and what it did.',
    src: 'proposed'
  },

  traits: [
    { name: 'Plain', means: 'Everyday words. Jargon is explained or avoided.', isNot: 'Talking down', example: 'Claude writes the first draft. You check it.' },
    { name: 'Honest', means: 'Say what is not done. "Working product", not "MVP".', isNot: 'Overpromising', example: 'This is a sample. Nothing here is approved yet.' },
    { name: 'Kind', means: 'Respect every role, including developers.', isNot: 'Gushing', example: 'Designers and developers see different things. Both are useful.' },
    { name: 'Builder-first', means: 'Readers are builders. Outcomes come before curriculum.', isNot: '"Students", "learners", "mentees"', example: 'Here is what you will have by Friday.' },
    { name: 'Considered', means: 'Short sentences. One idea per line.', isNot: 'Hype or urgency', example: 'Start with something small.' }
  ],

  pillars: [
    { name: 'Build', covers: 'Projects and how they are made, with the steps', src: 'proposed' },
    { name: 'Think', covers: 'Frameworks and practice notes', src: 'proposed' },
    { name: 'Share', covers: 'Toolkit downloads and guides', src: 'buyer' },
    { name: 'Archive', covers: 'Past programmes and experiments, kept as a record', src: 'buyer' }
  ],

  voice: {
    oneLine: 'A generous senior colleague who has built things and says so plainly.',
    weAre: [
      ['Specific: "Your portfolio goes live in an afternoon."', 'Vague: "Unlock your creative potential."'],
      ['Warm: "Start with something small."', 'Cheerleading: "You\'ve got this!!"'],
      ['Plain: "Claude writes the first draft. You check it."', 'Jargon: "Leverage agentic workflows."'],
      ['Honest: "This is a sample. Nothing here is approved yet."', 'Inflated: "The world\'s most advanced design system."']
    ],
    tone: [
      ['Homepage', 'Calm, direct, a question first', 'What changes when designers build the thing themselves?'],
      ['Toolkit card', 'Short imperative', 'Cut until it hurts. Then build.'],
      ['Social post', 'One line, one idea', 'A working product beats a perfect plan.'],
      ['Error', 'What happened, then what to do', 'That link has expired. Ask for a new one.'],
      ['Empty state', 'An invitation, not an apology', 'Nothing here yet. Add your first case study.'],
      ['Button', 'Verb first, one to three words', 'Read the guide']
    ],
    rules: [
      'Hyphens (-) only. No em dashes or en dashes in copy.',
      'Sentence case for headings, buttons and labels.',
      'No full stop on labels and headings. Helper text ends with one.',
      'Contractions are fine: "can\'t", "you\'ll", "it\'s".',
      'Active voice, verb first: "Delete project", not "Project deletion".',
      'Use "and" in running text, not an ampersand.',
      'Never use "successfully", "please", "simply", "just" or "easy".'
    ],
    banned: ['MVP', 'production-ready', 'leverage', 'seamless', 'unlock', 'empower', 'synergy', 'game-changer', 'revolutionary'],
    bannedOnCurrentPages: ['pricing', 'enrolment', 'cohort', 'school', 'mentor', 'students', 'apply'],
    samples: [
      { channel: 'Homepage headline', copy: 'Designers Who Build', src: 'buyer' },
      { channel: 'Homepage lede', copy: 'What changes when designers build the thing themselves?', src: 'buyer' },
      { channel: 'Toolkit card', copy: 'Cut until it hurts. Then build.', src: 'buyer' },
      { channel: 'Social statement', copy: 'A working product beats a perfect plan.', src: 'proposed' },
      { channel: 'Email subject', copy: 'Your first page, live this week', src: 'proposed' },
      { channel: 'Footer line', copy: 'Designers Who Build is an archive of practice.', src: 'proposed' }
    ]
  },

  /* Copy used in the sample screens, posts and slides. *Stars* mark the one accent phrase. */
  copy: {
    heroHeadline: 'Designers *who build*',
    heroLede: 'What changes when designers build the thing themselves?',
    primaryAction: 'Explore the toolkit',
    secondaryAction: 'See the work',
    navLinks: ['Toolkit', 'Agentic UX', 'About'],
    cards: [['Plan', 'Scope down'], ['Build', 'Ship the smallest thing'], ['Verify', 'Check it on a phone']],
    socialLine: 'A working *product* beats a perfect plan.',
    cardLine: 'Cut until it hurts. Then build.',
    cardTitle: 'Scope down',
    emailSubject: 'Your first page, live this week',
    emailBody: 'Here is the one thing to do next, and why it matters.',
    emailAction: 'Read the guide',
    emptyState: 'Nothing here yet. Add your first case study.',
    error: 'That link has expired. Ask for a new one.',
    footer: 'Designers Who Build is an archive of practice.',
    bannerLine: 'Build the *thing* yourself.'
  },

  /* Colours: names and jobs. The values live in tokens.css. */
  /* Backgrounds for posts, covers and banners. motif: arcs, blobs, grid, dots, stripes, rays or none.
     photos: pictures you add to foundations/images/, such as 'images/shop.jpg'. */
  graphics: { motif: 'rays', why: 'The spokes of the spark mark', photos: [], src: 'buyer' },

  colors: [
    { token: '--ds-brand', name: 'Brand', role: 'Covers, bands, headers', group: 'brand', src: 'buyer' },
    { token: '--ds-accent', name: 'Cobalt', role: 'The one action per view', group: 'brand', src: 'buyer' },
    { token: '--ds-accent-deep', name: 'Cobalt deep', role: 'Accent hover', group: 'brand', src: 'buyer' },
    { token: '--ds-canvas', name: 'Canvas', role: 'Page background', group: 'ground', src: 'buyer' },
    { token: '--ds-surface', name: 'Surface', role: 'Section bands, panels', group: 'ground', src: 'buyer' },
    { token: '--ds-line', name: 'Line', role: 'Hairline borders', group: 'ground', src: 'buyer' },
    { token: '--ds-line-strong', name: 'Line strong', role: 'Hover borders', group: 'ground', src: 'buyer' },
    { token: '--ds-ink', name: 'Ink', role: 'Headings and body', group: 'text', src: 'buyer' },
    { token: '--ds-ink-2', name: 'Muted', role: 'Secondary text', group: 'text', src: 'buyer' },
    { token: '--ds-ink-3', name: 'Soft', role: 'Captions and eyebrows', group: 'text', src: 'buyer', note: 'Fails body contrast. See Accessibility.' },
    { token: '--ds-c1', name: 'Pink', role: 'Palette', group: 'palette', src: 'buyer' },
    { token: '--ds-c2', name: 'Amber', role: 'Palette', group: 'palette', src: 'buyer' },
    { token: '--ds-c3', name: 'Green', role: 'Palette', group: 'palette', src: 'buyer' },
    { token: '--ds-c4', name: 'Cobalt', role: 'Palette', group: 'palette', src: 'buyer' },
    { token: '--ds-c5', name: 'Purple', role: 'Palette', group: 'palette', src: 'buyer' },
    { token: '--ds-c6', name: 'Orange', role: 'Palette', group: 'palette', src: 'buyer' },
    { token: '--ds-ok', name: 'Success', role: 'Confirmed, saved', group: 'status', src: 'default' },
    { token: '--ds-warn', name: 'Warning', role: 'Check this', group: 'status', src: 'default' },
    { token: '--ds-error', name: 'Error', role: 'Something went wrong', group: 'status', src: 'default' },
    { token: '--ds-info', name: 'Info', role: 'Neutral information', group: 'status', src: 'default' }
  ],
  colorRules: {
    ratio: 'Ink and white do most of the work. Accents appear as small, deliberate doses: one gradient phrase, one accent button, one tag. Never more than two accent colours in one block.',
    accent: 'Cobalt is the one primary action on a section. Its hover is cobalt deep.',
    gradient: 'The gradient runs through five palette colours. Use it on one emphasis phrase per card or section, never on body text.',
    documents: 'Brand documents may use the palette as full chapter bands. Product screens and the website keep accents as doses.'
  },
  contrast: [
    ['--ds-ink', '--ds-canvas'], ['--ds-ink-2', '--ds-canvas'], ['--ds-ink-3', '--ds-canvas'],
    ['#FFFFFF', '--ds-brand'], ['#FFFFFF', '--ds-accent'],
    ['--ds-ink', '--ds-c1'], ['--ds-ink', '--ds-c2'], ['--ds-ink', '--ds-c3'],
    ['#FFFFFF', '--ds-c4'], ['#FFFFFF', '--ds-c5']
  ],
  fixes: [
    { token: '--ds-ink-3', current: '#989EAD', proposed: '#6B7077', why: 'The soft grey reaches 2.68:1 on white and fails body text. The site uses it for eyebrows and captions.', src: 'proposed' }
  ],

  type: [
    { role: 'Display', token: '--ds-font-display', family: 'Ubuntu', weights: '400, 500, 700', use: 'Headings, numerals, the wordmark', src: 'buyer' },
    { role: 'Body', token: '--ds-font-body', family: 'Outfit', weights: '400, 500, 600, 700', use: 'Body copy, UI text', src: 'buyer' },
    { role: 'Label', token: '--ds-font-label', family: 'JetBrains Mono', weights: '500, 700', use: 'Uppercase eyebrows, tags, code', src: 'buyer' }
  ],
  typeScale: [
    { name: 'Display XL', token: '--ds-size-display-xl', font: 'display', line: 0.98 },
    { name: 'Display', token: '--ds-size-display', font: 'display', line: 1.02 },
    { name: 'Heading', token: '--ds-size-heading', font: 'body', line: 1.2, weight: 500 },
    { name: 'Subheading', token: '--ds-size-subheading', font: 'body', line: 1.35, weight: 500 },
    { name: 'Body', token: '--ds-size-body', font: 'body', line: 1.65 },
    { name: 'Small', token: '--ds-size-small', font: 'body', line: 1.5 },
    { name: 'Label', token: '--ds-size-label', font: 'label', line: 1.2 }
  ],
  typeRules: [
    'Sentence case everywhere except labels, which are uppercase mono.',
    'Two or three weights per family at most.',
    'Body lines run 60 to 75 characters.',
    'Check font licences before shipping. All three families load from Google Fonts.'
  ],

  layout: [
    { name: 'Container', value: '1180px wide', src: 'buyer' },
    { name: 'Gutter', value: '28px desktop, 16px phone', src: 'buyer' },
    { name: 'Breakpoints', value: 'Phone 390px, desktop 1180px', src: 'proposed' },
    { name: 'Grid', value: '12 columns inside the container', src: 'proposed' },
    { name: 'Spacing scale', value: '4 to 96px, nine steps', src: 'assumption' }
  ],
  surfaces: 'Canvas is white. Panels use the surface colour. Lines are 1px hairlines, strengthened on hover.',
  elevation: { rule: 'No shadows. Cards use a hairline border and lift 2px on hover.', src: 'assumption' },
  motion: [
    { use: 'Section wipe', value: '550ms, cubic-bezier(.7,0,.2,1)', src: 'buyer' },
    { use: 'Hover', value: '160ms, lift 2px', src: 'buyer' },
    { use: 'Reduced motion', value: 'Turn off lifts and wipes', src: 'proposed' }
  ],
  icons: { set: 'Lucide', rules: ['One icon per idea, next to a label.', 'Ink or muted colour. Accent only on the one primary action.', 'Never an icon alone on a control without a name for screen readers.'], src: 'assumption' },
  imagery: ['Show real work: screenshots, diagrams, the Toolkit cards. No stock photography.', 'Give every image a short description for screen readers.', 'Keep backgrounds calm so the content leads.'],

  components: {
    buttons: 'Verb first, one to three words, sentence case, no full stop. One accent action per view.',
    cards: 'Cards have a hairline border and lift 2px on hover.',
    inputs: 'Labels sit above the field, never inside it. Focus rings are always visible.',
    tags: 'Tags are for labels and status, never for links.',
    nav: 'Three links: Toolkit, Agentic UX and About. On phone it becomes a menu button.'
  },

  accessibility: [
    'Body text needs at least 4.5:1 contrast. Large text needs 3:1.',
    'Colour is never the only signal. Pair it with a word, an icon or a shape.',
    'Focus rings are always visible.',
    'Alt text describes the content, not the picture style.',
    'Touch targets are at least 44px on phone.'
  ],
  darkMode: { status: 'Not built. The site is white-canvas only.', proposal: 'Ink becomes canvas, white becomes text, palette colours keep their hue at reduced lightness. Test every component before use.', src: 'assumption' },

  governance: [
    ['Owner', 'Pradeep Siddappa'],
    ['Source of truth', 'foundations/tokens.css and foundations/brand.js'],
    ['Change rule', 'Change the token first, then reopen and reprint the documents. Never edit a PDF by hand.'],
    ['Versioning', '0.x while a sample, 1.0 once approved']
  ],

  recipes: [
    { title: 'Social statement (1080 x 1080)', steps: ['Brand field, 96px padding.', 'Tag at the top: label font, uppercase, pill outline.', 'Headline in display font at about 100px, sentence case.', 'One accent phrase in the headline.', 'Footer: the domain in the label font.'] },
    { title: 'Website section', steps: ['One headline, one lede, at most two actions.', 'Background alternates between canvas and surface.', 'Check at desktop and at 390px.'] },
    { title: 'Email', steps: ['One header bar in the brand colour with the wordmark.', 'One headline, one short paragraph, one accent action.', 'Footer with why they got it and how to leave.'] },
    { title: 'Banner or sign', steps: ['Brand or canvas field, one headline, one detail line.', 'Logo with clear space in one corner.', 'Read it from two metres before printing.'] }
  ],

  playbook: {
    website: { lede: 'One accent phrase per section. One accent action. Plenty of white.', rules: ['Hero: headline, lede, two actions at most.', 'Sections alternate canvas and surface.', 'Archive pages keep the record and are labelled archived.', 'Error pages say what happened, then what to do.'] },
    social: { lede: 'Three post types, one accent at most, and a grid that repeats.', rules: ['Statement: brand field, white headline, one accent phrase.', 'Card: white card, label, one line.', 'Behind the build: a screenshot with a short caption.', 'Captions: plain sentences, one idea, hyphens only.'] },
    product: { lede: 'Screens use the same tokens. The layout changes, the colours do not.', rules: ['Empty: an invitation and one action.', 'Loading: keep the layout, show a quiet indicator.', 'Error: a warm note and one next step.', 'Success: a short confirmation, no exclamation mark.'] },
    email: { lede: 'One header, one message, one action.', rules: ['Subject in sentence case, under 50 characters.', 'One primary action.', 'Footer: why they got it, how to leave.'] },
    documents: { lede: 'Covers and chapter bands carry the brand colour. Body pages stay calm.', rules: ['Cover: logo, title, one line, a status note.', 'Chapter band: number, title, one lede.', 'Tables: label-font header, hairline rows.', 'One idea per slide. Brand background on title and closing slides.'] },
    print: { lede: 'Physical items carry the brand with fewer details.', rules: ['Banners: one headline, one line of detail, logo in a corner.', 'Stickers: the mark and one word, one palette colour each.', 'Never print the gradient on small text.', 'Print sizes, bleed and colour profiles are not set yet. Confirm with a printer.'] }
  },

  gaps: [
    'No dark mode palette is documented.',
    'No spacing scale is written down. The scale here is a proposal.',
    'No icon stroke width is documented.',
    'No print sizes, bleed or colour profiles are set.'
  ],
  decisions: [
    'Keep the name "Designers Who Build" alone, or add Pradeep Siddappa\'s name.',
    'Approve or change the proposed fix for the soft grey.',
    'Approve the pillar names, or rename them.',
    'Confirm the spacing scale, grid and breakpoints.',
    'Decide whether dark mode is built.'
  ],
  sources: [
    ['CLAUDE.md', 'Positioning, hard rules, copy conventions'],
    ['docs/design-system.md', 'Fonts, icons, copy tone, patterns'],
    ['apps/marketing/src/styles/spectrum.css', 'Every colour, type and layout value'],
    ['apps/marketing/src/components/SiteNav.astro', 'The spark mark'],
    ['The site\'s current homepage', 'Approved copy']
  ],

  /* Filled in during the wizard. The checks refuse to finish without these. */
  confirmations: {
    ownsLogo: true,
    fontLicencesChecked: true,
    voiceLinesRewritten: 3
  }
};
