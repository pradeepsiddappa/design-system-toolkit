/* Lumen Health: a made-up sample brand, used to show what the toolkit makes.
   Every fact here is invented for the sample. */
window.DS = {
  meta: { name: 'Lumen Health', short: 'LH', domain: 'lumenhealth.example', version: '1.0', updated: '18 Nov 2026', owner: 'Dr Meera Shah, clinic lead', status: 'Sample brand. Made up to show the toolkit.', style: 'tinted' },

  logo: { file: 'logo/lumen.svg', onDarkGround: 'as-is', alt: 'Lumen Health: a warm sun on a deep teal rounded square', wordmark: 'Lumen Health', description: 'A warm sun on a deep teal rounded square. It reads on light and dark grounds as it is.', clearSpace: 'One sun ray on all sides', minMark: '20px', minLockup: '130px wide', rules: ['Use the master file, with its teal square.', 'Never change the sun colour.', 'Never place it on a busy photo.'], src: 'buyer' },

  identity: {
    positioning: 'A family clinic that explains things clearly and sees you on time.',
    essence: 'Calm, clear care for the whole family, from a team who knows your name.',
    notThis: ['Not a hospital. Small, local and unhurried.', 'Not clinical in tone. Medical words are explained.', 'Not a wellness brand. No miracle claims.'],
    belief: 'People look after their health better when they understand it.',
    promise: 'You leave every visit knowing what happens next.',
    src: 'buyer'
  },

  traits: [
    { name: 'Calm', means: 'Steady, unhurried, reassuring.', isNot: 'Cold or distant', example: 'Your results are back. Nothing needs to change.' },
    { name: 'Clear', means: 'Plain words. Every medical term explained once.', isNot: 'Simplistic', example: 'Your blood pressure is a little high. Here is what that means.' },
    { name: 'Caring', means: 'We notice the person, not only the symptom.', isNot: 'Sentimental', example: 'Bring someone with you if that helps.' },
    { name: 'Honest', means: 'Say what we know and what we do not.', isNot: 'Alarming', example: 'We need one more test to be sure.' }
  ],
  pillars: [
    { name: 'Everyday care', covers: 'Check-ups, children, vaccines', src: 'buyer' },
    { name: 'Understand it', covers: 'Plain-language guides to common conditions', src: 'buyer' },
    { name: 'Our team', covers: 'Who you will see and how they work', src: 'proposed' }
  ],

  voice: {
    oneLine: 'A calm doctor who explains things the way you would explain them to a friend.',
    weAre: [
      ['Clear: "Your test takes ten minutes. No fasting."', 'Jargon: "Pre-procedural guidance applies."'],
      ['Calm: "Most rashes like this clear up in a week."', 'Alarming: "Do not ignore these warning signs!"'],
      ['Honest: "We do not know yet. We will call you Friday."', 'Vague: "Results will be shared in due course."']
    ],
    tone: [
      ['Appointment reminder', 'Short, practical', 'See you Tuesday at 10:30 with Dr Shah.'],
      ['Test results', 'Calm, plain, next step first', 'Your results are back. Nothing needs to change.'],
      ['Health guide', 'Explain, then advise', 'A fever is your body fighting an infection.'],
      ['Error', 'What happened, then what to do', 'We could not book that time. Pick another slot.'],
      ['Button', 'Verb first', 'Book a visit']
    ],
    rules: ['Explain every medical term the first time it appears.', 'Hyphens only, no long dashes.', 'Sentence case.', 'Never promise a cure.', 'No exclamation marks.'],
    banned: ['miracle', 'cure-all', 'revolutionary', 'world-class', 'detox'],
    samples: [
      { channel: 'Homepage headline', copy: 'Care that explains itself', src: 'buyer' },
      { channel: 'Reminder text', copy: 'See you Tuesday at 10:30 with Dr Shah.', src: 'buyer' },
      { channel: 'Results message', copy: 'Your results are back. Nothing needs to change.', src: 'buyer' },
      { channel: 'Email subject', copy: 'Flu vaccines are in', src: 'proposed' }
    ]
  },

  copy: {
    heroHeadline: 'Care that *explains* itself',
    heroLede: 'A family clinic that sees you on time and tells you what happens next.',
    primaryAction: 'Book a visit',
    secondaryAction: 'Meet the team',
    navLinks: ['Visits', 'Guides', 'Our team'],
    cards: [['Children', 'Check-ups from birth'], ['Vaccines', 'Flu jabs are in'], ['Guides', 'Fever, explained']],
    socialLine: 'You leave knowing *what happens next*.',
    cardTitle: 'Fever, explained',
    cardLine: 'What it means, when to wait and when to call us.',
    emailSubject: 'Flu vaccines are in',
    emailBody: 'Book a ten-minute slot for you or your family. No fasting, no forms.',
    emailAction: 'Book a slot',
    emptyState: 'No visits booked. Your next check-up is a few taps away.',
    error: 'We could not book that time. Pick another slot.',
    footer: 'Lumen Health, open six days a week.',
    bannerLine: 'Care that *explains* itself.'
  },

  /* Backgrounds for posts, covers and banners. motif: arcs, blobs, grid, dots, stripes, rays or none.
     photos: pictures you add to foundations/images/, such as 'images/shop.jpg'. */
  graphics: { motif: 'blobs', why: 'Soft round shapes, like the sun in the logo', photos: [], src: 'buyer' },

  colors: [
    { token: '--ds-brand', name: 'Deep teal', role: 'Covers, headers, signs', group: 'brand', src: 'extracted', why: 'The rounded square behind the logo\'s sun. Calm and clinical without feeling cold.', whySrc: 'extracted' },
    { token: '--ds-accent', name: 'Clinic blue', role: 'The one action', group: 'brand', src: 'buyer', why: 'Chosen by the clinic as its one action colour, for booking a visit.', whySrc: 'buyer' },
    { token: '--ds-accent-deep', name: 'Clinic blue deep', role: 'Action hover', group: 'brand', src: 'default' },
    { token: '--ds-canvas', name: 'White', role: 'Page', group: 'ground', src: 'buyer' },
    { token: '--ds-surface', name: 'Mist', role: 'Panels', group: 'ground', src: 'default' },
    { token: '--ds-line', name: 'Line', role: 'Hairlines', group: 'ground', src: 'default' },
    { token: '--ds-ink', name: 'Ink', role: 'Text', group: 'text', src: 'default' },
    { token: '--ds-ink-2', name: 'Slate', role: 'Secondary text', group: 'text', src: 'default' },
    { token: '--ds-c1', name: 'Deep teal', role: 'Palette', group: 'palette', src: 'extracted', why: 'The logo\'s rounded square.', whySrc: 'extracted' },
    { token: '--ds-c2', name: 'Sky', role: 'Palette', group: 'palette', src: 'buyer', why: 'Chosen by the clinic for categories in charts and leaflets.', whySrc: 'buyer' },
    { token: '--ds-c3', name: 'Mint', role: 'Palette', group: 'palette', src: 'buyer', why: 'Chosen by the clinic for categories in charts and leaflets.', whySrc: 'buyer' },
    { token: '--ds-c4', name: 'Coral', role: 'Palette', group: 'palette', src: 'buyer', why: 'Chosen by the clinic for categories in charts and leaflets.', whySrc: 'buyer' },
    { token: '--ds-c5', name: 'Sun', role: 'Palette', group: 'palette', src: 'extracted', why: 'The logo\'s sun.', whySrc: 'extracted' },
    { token: '--ds-ok', name: 'Well', role: 'Confirmed', group: 'status', src: 'default' },
    { token: '--ds-warn', name: 'Amber', role: 'Check this', group: 'status', src: 'default' },
    { token: '--ds-error', name: 'Alert', role: 'Went wrong', group: 'status', src: 'default' },
    { token: '--ds-info', name: 'Info', role: 'Information', group: 'status', src: 'default' }
  ],
  colorRules: {
    ratio: 'White and mist do most of the work. Teal carries the brand. Blue is for the one thing to do.',
    accent: 'Clinic blue is the one action on a screen.',
    documents: 'Sky, mint, coral and sun mark topics in guides, never warnings.'
  },
  contrast: [['--ds-ink', '--ds-canvas'], ['--ds-ink-2', '--ds-canvas'], ['--ds-on-brand', '--ds-brand'], ['--ds-on-accent', '--ds-accent'], ['--ds-ink', '--ds-c2'], ['--ds-ink', '--ds-c4']],

  type: [
    { role: 'Display', token: '--ds-font-display', family: 'Figtree', weights: '600, 800', use: 'Headlines, numbers', src: 'buyer' },
    { role: 'Body', token: '--ds-font-body', family: 'Source Sans 3', weights: '400, 600', use: 'Text, forms, guides', src: 'buyer' },
    { role: 'Label', token: '--ds-font-label', family: 'DM Mono', weights: '500', use: 'Times, dates, small labels', src: 'default' }
  ],
  typeScale: [
    { name: 'Display XL', token: '--ds-size-display-xl', font: 'display', line: 1 },
    { name: 'Display', token: '--ds-size-display', font: 'display', line: 1.02 },
    { name: 'Heading', token: '--ds-size-heading', font: 'display', line: 1.1 },
    { name: 'Subheading', token: '--ds-size-subheading', font: 'body', line: 1.35, weight: 600 },
    { name: 'Body', token: '--ds-size-body', font: 'body', line: 1.6 },
    { name: 'Label', token: '--ds-size-label', font: 'label', line: 1.2 }
  ],
  typeRules: ['Body text at 17px or more. Many readers are older or reading on a phone.', 'Times and dates in the mono font.'],

  layout: [
    { name: 'Container', value: '1160px wide', src: 'default' },
    { name: 'Gutter', value: '24px desktop, 16px phone', src: 'default' },
    { name: 'Touch targets', value: '48px at least', src: 'buyer' }
  ],
  surfaces: 'White pages, mist panels, soft round corners.',
  elevation: { rule: 'One soft shadow for dialogs. Everything else is flat.', src: 'proposed' },
  motion: [{ use: 'Hover and focus', value: '200ms, gentle ease', src: 'default' }, { use: 'Reduced motion', value: 'Respect the setting everywhere', src: 'buyer' }],
  icons: { set: 'Lucide, rounded', rules: ['Every icon has a label.', 'No medical symbols that might alarm, such as warning triangles, outside real warnings.'], src: 'proposed' },
  imagery: ['Real staff and real rooms, with permission.', 'Daylight, calm, no hospital-blue filters.', 'Never show needles or blood in marketing.'],

  components: {
    buttons: 'Blue for the one action. "Book a visit", not "Submit".',
    cards: 'One topic per card, with a plain title.',
    inputs: 'Large fields, labels above, help in plain words.',
    tags: 'Topic tags in palette tints, always with the word.',
    nav: 'Visits, Guides, Our team. Book a visit stays visible on phone.'
  },
  accessibility: ['Body text 4.5:1 or more, aiming for 7:1.', 'Clinic blue is never text on deep teal. On teal, use white or sky.', 'Touch targets 48px.', 'Every form error says how to fix it.', 'Test with a screen reader before launch.'],
  darkMode: { status: 'Not built yet.', proposal: 'Deep teal becomes the canvas, white text, sky as the accent. Test every form before launch.', src: 'assumption' },

  governance: [['Owner', 'Dr Meera Shah'], ['Source of truth', 'foundations/tokens.css and brand.js'], ['Change rule', 'Clinical wording is checked by a doctor before it goes out.']],
  recipes: [
    { title: 'Appointment card', steps: ['White card, teal header strip.', 'Day and time in mono, large.', 'Doctor name and one line of what to bring.'] },
    { title: 'Health guide page', steps: ['Plain title as a question.', 'One-paragraph answer first.', 'When to call us, in a mint panel.'] },
    { title: 'Waiting room poster', steps: ['Teal field, white headline.', 'One message only.', 'Logo bottom right.'] }
  ],
  playbook: {
    website: { lede: 'Booking first, explanations close behind.', rules: ['Book a visit in the nav on every page.', 'Guides are written as questions.', 'Opening hours in the footer.'] },
    social: { lede: 'Helpful, never alarming.', rules: ['Teal statements for clinic news.', 'Guides as short cards.', 'No before-and-after pictures.'] },
    product: { lede: 'The booking app works for a tired parent at night.', rules: ['Large tap targets.', 'Plain error messages.', 'Confirm every booking in words and by text.'] },
    email: { lede: 'Only when there is something to do.', rules: ['Subject says the news.', 'One action: book.'] },
    documents: { lede: 'Leaflets use the same tokens.', rules: ['Questions as headings.', 'Mint panels for "when to call us".'] },
    print: { lede: 'Signs and leaflets for the waiting room.', rules: ['Large type, one message.', 'Teal or white field only.'] }
  },
  gaps: ['Clinical wording has no review checklist yet.', 'No dark mode tested.'],
  decisions: ['Agree who signs off clinical copy.', 'Confirm the icon set.'],

  confirmations: { ownsLogo: true, fontLicencesChecked: true, voiceLinesRewritten: 3 }
};
