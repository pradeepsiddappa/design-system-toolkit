# Design System Toolkit

A set-up wizard for Claude Code that turns your logo and brand notes into a full design system: brand guidelines, a playbook, working components styled in your brand, a one-page summary, six slides, an onboarding page, and an agent brief so any AI makes on-brand work. Every page checks that its text is readable.

Install from a terminal (Claude Code 2.1.275 or later):

```
claude plugin install ds-toolkit --marketplace pradeepsiddappa/design-system-toolkit
```

Run `/ds-toolkit:setup` to start, or `/ds-toolkit:setup sample dhanak` to see a finished example first. Add an output later with `/ds-toolkit:setup add slides`.

Full instructions, samples and the paste-in route for other AIs: https://github.com/pradeepsiddappa/design-system-toolkit

## What it runs, reads and sends

So you know exactly what happens on your computer:

- **It reads only what you give it:** your logo, any brand notes or files you attach, and the design system folder it makes. It does not read anything else on your computer.
- **It writes only inside your design system folder** (by default `./my-design-system`): the two source files, the pages, the PDFs and the assets you ask for.
- **It runs two small Node.js scripts that come with it,** with no packages to install: `generate.mjs` builds and checks your folder, and `snap.mjs` checks a single asset and saves a picture of it.
- **It opens Google Chrome on your computer, in the background,** if you have it installed, to print the PDFs and take the pictures. Without Chrome, everything else still works and you print from your browser instead.
- **Its pages load fonts from Google Fonts** (fonts.googleapis.com and fonts.gstatic.com), as any web page using Google Fonts does. That is the only network request it makes.
- **It sends nothing anywhere else.** There is no tracking, no account and no data collection. Your logo and notes go only to the AI you are already using, under your own account.

MIT licence. Made by Pradeep Siddappa, Designers Who Build.
