---
dg-publish: true
date-created: 2026-05-10
visibility: public
tags: []
type: ""
---
# revision history

## what it does

Every published note on PhD-Live displays a revision trail at the bottom of the page. This shows how the note has changed over time -- when it was edited, how many words were added or removed, and an expandable diff of what specifically changed. Revisions are collapsed by default so they don't interrupt reading, but are available to anyone who wants to see the thinking behind the current version.

## why it exists

Research notes don't arrive fully formed. The version of a note visible on the site at any given moment is the product of earlier drafts, deleted sections, reframings, and rerouting. That process is usually invisible -- the published version displaces everything that came before it.

The revision history makes that process legible without requiring the reader to dig through git commits. It treats the evolution of a note as part of its meaning, not noise to be hidden. This is consistent with PhD-Live's broader intent: to publish research as an ongoing practice rather than a fixed product.

## how it works

A script (`scripts/generate-revisions.js`) reads the git history for each published note and generates a `revisions.json` file containing the commit dates, word deltas, and diffs for every note. This runs automatically via a pre-commit hook every time changes are committed, so the revision data stays current without any extra steps.

The site reads from `revisions.json` at build time and renders the revision trail as a collapsible component at the bottom of each note.

## architectural decisions

**git history as the data source** -- rather than manually versioning notes or storing snapshots, the script reads directly from git log. This means no extra files, no frontmatter flags, and no curation overhead. The cost is that history only goes back to when the note first entered this repository, not when it was originally written in Obsidian.

**pre-commit hook over build-time generation** -- an earlier version ran the script on Vercel at deploy time, but Vercel's shallow git clone made the history incomplete. Running locally via pre-commit hook gives access to the full git history and keeps the setup portable -- no API tokens or environment variables needed.

**day-level granularity** -- multiple commits on the same day are collapsed into a single revision entry. This reflects meaningful editing sessions rather than individual saves.

**filename-based dating for daily notes** -- daily notes are dated from their filename (`2026-02-04.md`) rather than git history. This prevents git's rename tracking from tracing daily notes back through the template file they were created from, which would show template evolution rather than note evolution.

## known limitations

- History only goes back to when notes entered this repository, not their original creation date in Obsidian. Older notes show their first commit date rather than when they were written.
- Notes created from a Templater template may show the template's git history if `--follow` is enabled and git traces the rename. Currently mitigated by filename-based date filtering for daily notes.
- The diff format is line-level rather than word-level, which is less granular but faster to generate at scale.

## using this in your own site

Requirements: Node.js v18+, git, the pre-commit hook installed.

Setup:
```bash
cp scripts/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

To regenerate manually:
```bash
node scripts/generate-revisions.js
```

No API tokens or environment variables required. Works with any public or private git repository.