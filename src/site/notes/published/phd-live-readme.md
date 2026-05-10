---
dg-publish: true
date-created: 2026-05-10
visibility: public
tags: []
type: ""
---
# PhD-Live

PhD-Live is a process-based research website that publishes my PhD work as it unfolds. Rather than presenting only finished outputs, the site exposes notes, sessions, reflections, and connections in (near) real time. Writing happens locally in Obsidian and is published automatically as a living digital garden.

This project explores what it means to treat research as an ongoing practice rather than a fixed product, within the wider context of my research into generative AI and learning, speculative methods, and creative computation.

## How the site works

- Notes are written locally in Obsidian.
- Links between notes form a growing knowledge graph.
- Lightweight syntax is used to track sessions, milestones, and live activity.
- The website updates automatically to reflect recent work, connections, and progress.

Everything here should be read as provisional. Notes may be incomplete, contradictory, or revised over time.

## Using this as a template

This repo can be used as a starting point for your own process-based research site. It is built on the open-source Digital Garden ecosystem: https://dg-docs.ole.dev/

### Prerequisites

- [Obsidian](https://obsidian.md/) for writing and managing notes
- [Node.js](https://nodejs.org/) (v18 or above)
- A [Vercel](https://vercel.com/) account for deployment
- Git

### Setup

1. Fork or clone this repository
2. Run `npm install` to install dependencies
3. Set up the pre-commit hook so revision history generates automatically on every commit:

```bash
cp scripts/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

4. Run `npm run dev` to preview the site locally
5. Deploy to Vercel by connecting your forked repo -- no additional environment variables required

### Revision history

This site tracks how notes evolve over time using git history. A script (`scripts/generate-revisions.js`) reads your git log and generates a `revisions.json` file that the site uses to display revision trails on each note page.

The pre-commit hook runs this script automatically before every commit, so revision history stays up to date without any extra steps.

If you ever need to regenerate it manually:

```bash
node scripts/generate-revisions.js
```

## Background

Built on the [Digital Garden](https://dg-docs.ole.dev/) ecosystem by Ole Vik.

## Status

This project is a work in progress. Structure, content, and tooling will continue to evolve throughout the PhD.