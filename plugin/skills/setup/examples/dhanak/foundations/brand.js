/* Dhanak: a made-up sample brand (a UPI payment app), used to show what the toolkit makes.
   Every fact here is invented for the sample. UPI is a trademark of NPCI; the sample never uses the UPI logo. */
window.DS = {
  meta: { name: 'Dhanak', short: 'DK', domain: 'dhanak.example', version: '1.0', updated: '18 Nov 2026', owner: 'Ritika Menon, head of design', status: 'Sample brand. Made up to show the toolkit.', style: 'tinted' },

  logo: { file: 'logo/dhanak.svg', onDarkGround: 'as-is', alt: 'Dhanak: a small rainbow over a coin, on a deep indigo square', wordmark: 'Dhanak', description: 'A small rainbow of marigold, rose and mint over a white coin, on a deep indigo square. Dhanak means rainbow.', clearSpace: 'The height of the coin on all sides', minMark: '24px', minLockup: '110px wide', rules: ['Use the master file with its indigo square.', 'Never change the order of the rainbow.', 'Never put the mark next to the UPI logo or any bank logo as if it were theirs.', 'Never stretch, rotate or add effects.'], src: 'buyer' },

  identity: {
    positioning: 'A UPI app that makes paying anyone, anywhere, feel as easy as handing over cash.',
    essence: 'Pay the chaiwala, the landlord and your friends the same way: fast, clear, and always telling you where your money went.',
    notThis: ['Not a bank. Your money stays in your bank account.', 'Not a lottery. No scratch cards, no jackpots, no pressure.', 'Not confusing. Every screen says whether money moved.'],
    belief: 'People trust a payment app when it never leaves them guessing.',
    promise: 'Every payment tells you, in plain words, what happened to your money.',
    src: 'buyer'
  },

  traits: [
    { name: 'Clear', means: 'Say exactly what happened to the money.', isNot: 'Technical', example: '₹250 sent to Anil Tea Stall.' },
    { name: 'Calm', means: 'Steady when something goes wrong.', isNot: 'Alarming', example: 'No money left your account. Try again.' },
    { name: 'Warm', means: 'Friendly, like a neighbour who is good with money.', isNot: 'Cute', example: 'Split the bill? We will do the maths.' },
    { name: 'Honest', means: 'Show every fee, every time.', isNot: 'Salesy', example: 'This transfer is free. No hidden charges.' }
  ],
  pillars: [
    { name: 'Pay', covers: 'Scan, send, split, request', src: 'buyer' },
    { name: 'Get paid', covers: 'QR codes and alerts for small shops', src: 'buyer' },
    { name: 'Stay safe', covers: 'Fraud tips and how to spot a fake request', src: 'buyer' }
  ],

  voice: {
    oneLine: 'A calm friend who is good with money and always tells you where it went.',
    weAre: [
      ['Clear: "₹250 sent to Anil Tea Stall."', 'Vague: "Transaction processed successfully."'],
      ['Calm: "No money left your account. Try again."', 'Alarming: "Payment FAILED! Error code 503."'],
      ['Honest: "This transfer is free."', 'Pushy: "Pay now to win cashback! Hurry!"']
    ],
    tone: [
      ['Payment done', 'Short, the amount first', '₹250 sent to Anil Tea Stall.'],
      ['Payment failed', 'Calm, money first, then what to do', 'No money left your account. Try again.'],
      ['Request received', 'Careful, never rushed', 'Riya asked for ₹400. Check it is someone you know.'],
      ['Shop owner', 'Practical, like a helper at the counter', 'Your QR is ready. Print it and stick it near the till.'],
      ['Button', 'Verb first, the amount when there is one', 'Pay ₹250']
    ],
    rules: ['Always say whether money moved.', 'Amounts in figures with the rupee sign: ₹250, not Rs. 250.', 'Hyphens only, no long dashes.', 'Sentence case.', 'Never rush people with money: no countdowns, no "hurry".', 'Name the person or shop, not a code.'],
    banned: ['jackpot', 'free money', 'risk-free', 'hurry', 'guaranteed cashback', 'transaction processed successfully'],
    samples: [
      { channel: 'Payment done', copy: '₹250 sent to Anil Tea Stall.', src: 'buyer' },
      { channel: 'Payment failed', copy: 'No money left your account. Try again.', src: 'buyer' },
      { channel: 'Safety tip', copy: 'You never need your PIN to receive money.', src: 'buyer' },
      { channel: 'Email subject', copy: 'Your spends for October', src: 'proposed' }
    ]
  },

  copy: {
    heroHeadline: 'Pay anyone. *Any corner.*',
    heroLede: 'Scan, pay, done. The same two taps for your chai, your rent and everything in between.',
    primaryAction: 'Get the app',
    secondaryAction: 'For shops',
    navLinks: ['Pay', 'For shops', 'Stay safe'],
    cards: [['Scan', 'Pay any QR'], ['Split', 'Share the bill'], ['Shops', 'Get paid at your stall']],
    socialLine: '₹10 or ₹10,000. *Same two taps.*',
    cardTitle: 'Split the bill',
    cardLine: 'Add friends, pick the amount, and we do the maths.',
    emailSubject: 'Your spends for October',
    emailBody: 'Where your money went last month, in one simple chart. No ads inside.',
    emailAction: 'See my spends',
    emptyState: 'No payments yet. Scan any QR to start.',
    error: 'No money left your account. Try again.',
    footer: 'Dhanak. Payments that tell you what happened.',
    bannerLine: 'Pay anyone. *Any corner.*'
  },

  /* Backgrounds for posts, covers and banners. motif: arcs, blobs, grid, dots, stripes, rays or none.
     photos: pictures you add to foundations/images/, such as 'images/shop.jpg'. */
  graphics: { motif: 'arcs', why: 'The rainbow arcs from the logo', photos: [], src: 'buyer' },

  colors: [
    { token: '--ds-brand', name: 'Indigo', role: 'App bar, covers, the mark', group: 'brand', src: 'extracted' },
    { token: '--ds-accent', name: 'Marigold', role: 'The pay button, always with dark text', group: 'brand', src: 'extracted' },
    { token: '--ds-accent-deep', name: 'Marigold deep', role: 'Pay button pressed', group: 'brand', src: 'default' },
    { token: '--ds-canvas', name: 'White', role: 'Screens', group: 'ground', src: 'buyer' },
    { token: '--ds-surface', name: 'Lavender mist', role: 'Cards and panels', group: 'ground', src: 'default' },
    { token: '--ds-line', name: 'Line', role: 'Hairlines', group: 'ground', src: 'default' },
    { token: '--ds-ink', name: 'Night', role: 'Text and amounts', group: 'text', src: 'default' },
    { token: '--ds-ink-2', name: 'Dusk', role: 'Secondary text', group: 'text', src: 'default' },
    { token: '--ds-c1', name: 'Indigo', role: 'Palette', group: 'palette', src: 'extracted' },
    { token: '--ds-c2', name: 'Marigold', role: 'Palette', group: 'palette', src: 'extracted' },
    { token: '--ds-c3', name: 'Rose', role: 'Palette', group: 'palette', src: 'extracted' },
    { token: '--ds-c4', name: 'Mint', role: 'Palette', group: 'palette', src: 'extracted' },
    { token: '--ds-c5', name: 'Sky', role: 'Palette', group: 'palette', src: 'proposed' },
    { token: '--ds-ok', name: 'Paid', role: 'Money moved', group: 'status', src: 'buyer' },
    { token: '--ds-warn', name: 'Pending', role: 'Waiting for the bank', group: 'status', src: 'buyer' },
    { token: '--ds-error', name: 'Failed', role: 'Money did not move', group: 'status', src: 'buyer' },
    { token: '--ds-info', name: 'Info', role: 'Tips and safety notes', group: 'status', src: 'default' }
  ],
  colorRules: {
    ratio: 'White screens, indigo for the brand, marigold only for the one pay action.',
    accent: 'Marigold is the pay button and nothing else, with dark text on it.',
    documents: 'Rose, mint and sky mark categories in charts and tags. Green, amber and red are kept for paid, pending and failed only.'
  },
  contrast: [['--ds-ink', '--ds-canvas'], ['--ds-ink-2', '--ds-canvas'], ['--ds-on-brand', '--ds-brand'], ['--ds-on-accent', '--ds-accent'], ['#FFFFFF', '--ds-accent'], ['#FFFFFF', '--ds-ok']],

  type: [
    { role: 'Display', token: '--ds-font-display', family: 'Plus Jakarta Sans', weights: '700, 800', use: 'Headlines and big amounts', src: 'buyer' },
    { role: 'Body', token: '--ds-font-body', family: 'Noto Sans', weights: '400, 500, 600', use: 'Text and UI. Noto has Hindi, Tamil and other Indian scripts', src: 'buyer' },
    { role: 'Label', token: '--ds-font-label', family: 'IBM Plex Mono', weights: '500, 600', use: 'Transaction IDs, UPI IDs, times', src: 'default' }
  ],
  typeScale: [
    { name: 'Display XL', token: '--ds-size-display-xl', font: 'display', line: 0.98 },
    { name: 'Display', token: '--ds-size-display', font: 'display', line: 1 },
    { name: 'Heading', token: '--ds-size-heading', font: 'display', line: 1.1 },
    { name: 'Subheading', token: '--ds-size-subheading', font: 'body', line: 1.35, weight: 600 },
    { name: 'Body', token: '--ds-size-body', font: 'body', line: 1.55 },
    { name: 'Label', token: '--ds-size-label', font: 'label', line: 1.2 }
  ],
  typeRules: ['The amount is always the largest thing on a payment screen.', 'UPI IDs and transaction IDs in the mono font, so 0 and O never mix.', 'Body text in Noto Sans so Indian languages match the English.'],

  layout: [
    { name: 'App screens', value: '390px wide first, 16px side margins', src: 'buyer' },
    { name: 'Touch targets', value: '48px at least; the pay button 56px', src: 'buyer' },
    { name: 'Website container', value: '1200px wide', src: 'default' }
  ],
  surfaces: 'White screens, lavender mist cards, a hairline between list rows only where needed.',
  elevation: { rule: 'One soft shadow under the bottom pay bar. Everything else is flat.', src: 'proposed' },
  motion: [{ use: 'Payment done', value: 'One short tick animation, 350ms, then stop', src: 'buyer' }, { use: 'Reduced motion', value: 'Show the tick without animation', src: 'buyer' }],
  icons: { set: 'Phosphor, bold weight', rules: ['Every icon has a label underneath on the home screen.', 'Red only on real failures.'], src: 'proposed' },
  imagery: ['Real Indian streets, shops and people, with permission.', 'Never show cash bundles or gold coins: it is a payment app, not a prize.', 'Never use the UPI logo as decoration.'],

  components: {
    buttons: 'Marigold "Pay ₹250" is the one main action. It always shows the amount.',
    cards: 'Each payment is a card: the person or shop, the amount, the status in words.',
    inputs: 'Amount fields use large figures and the number keypad.',
    tags: 'Status tags always say Paid, Pending or Failed in words, not colour alone.',
    nav: 'Home, Scan, History, Profile. Scan sits in the middle.'
  },
  accessibility: ['Status is never colour alone: always a word and an icon.', 'Amounts are read out in full by screen readers: two hundred and fifty rupees.', 'Body text 4.5:1 or more.', 'Works in Hindi and English from day one.'],
  darkMode: { status: 'Planned for the app.', proposal: 'Night becomes the canvas, white text, marigold stays the pay button with dark text.', src: 'proposed' },

  governance: [['Owner', 'Ritika Menon, head of design'], ['Source of truth', 'foundations/tokens.css and brand.js'], ['Change rule', 'Any change to payment wording is checked by the compliance team first.']],
  recipes: [
    { title: 'Payment done screen', steps: ['Green tick, then the amount in Display size.', 'Who it went to, and the time.', 'Transaction ID in mono, with a copy button.'] },
    { title: 'Shop QR poster', steps: ['Indigo top band with the logo.', 'The QR code large, on white.', 'The shop name and "Scan with any UPI app".'] },
    { title: 'Safety post', steps: ['Lavender field, one tip in large type.', 'Info colour for the label.', 'No fear words.'] }
  ],
  playbook: {
    website: { lede: 'Get the app, then trust it.', rules: ['Hero: one line and the app download.', 'Safety is in the main nav, not hidden.', 'No fake cashback banners.'] },
    social: { lede: 'Everyday moments of paying, and safety tips.', rules: ['Indigo statements for news.', 'Lavender cards for tips.', 'Never show a real UPI ID or phone number.'] },
    product: { lede: 'Every screen says whether money moved.', rules: ['The pay button shows the amount.', 'Status in words: Paid, Pending, Failed.', 'Failed always says that no money left, if that is true.'] },
    email: { lede: 'Monthly spends and safety only. No promotions.', rules: ['Subject names the month.', 'One action.'] },
    documents: { lede: 'Partner decks and shop guides use the same tokens.', rules: ['Amounts in the display font.', 'IDs in mono.'] },
    print: { lede: 'QR posters and stickers for shops.', rules: ['QR on white, always.', 'Large shop name.', 'Laminate for outdoor stalls.'] }
  },
  gaps: ['No Hindi copy written yet.', 'No rules for co-branding with banks.'],
  decisions: ['Agree the Hindi voice with a native writer.', 'Confirm the icon set.'],
  sources: [['Logo file', 'Brand colours'], ['Product brief', 'Positioning and voice'], ['Compliance notes', 'Payment wording rules']],

  confirmations: { ownsLogo: true, fontLicencesChecked: true, voiceLinesRewritten: 3 }
};
