---
dg-publish: true
date-created: 2026-04-18
visibility: public
tags: []
type: ""
---

<!--
Quick syntax:
Session: start:: YYYY-MM-DD HH:MM+ZZ | end:: ... | topic:: ...
Milestone: - [ ] Thing #milestone @YYYY-MM-DD

CORE TYPES:
• Turn into blog post → add: type: post

FEATURE & NAVIGATION TAGS:
• featured      → appears in Featured section on homepage
• gardenEntry   → appears as a trailhead in the Garden gateway

LIVE SYSTEM TAGS:
• session       → used for live sessions / work periods
• daily         → daily log style notes
-->


Before building more bots, I need to establish a single shared context layer that all three bots can query. 

avoiding rebuilding the Obsidian integration three times and ensures consistent knowledge across the system.


**The Obsidian vault is the canonical knowledge source** A watched folder pipeline embeds markdown files into a shared vector store (ChromaDB or
SQLite + embeddings). 
Any bot queries this store via a common internal API.
No bot owns its own copy of the notes.

#### Implementation sequence

1. Watcher script — monitors vault folder, triggers on new/changed .md files
2. Embedding pipeline — chunks and embeds into the vector store
3. Query API — a simple FastAPI endpoint: POST /context {query, top_k}
   returns relevant note chunks
4. Supervisor Bot will use this instead of any hardcoded context
5. Confidence Bot will also read from the same store

#### Key open questions

- Chunking strategy: by heading, by paragraph, or fixed token windows?
- Which embedding model? (nomic-embed-text via Ollama is a reasonable local default)
- How does the Confidence Bot determine "shareable" threshold?
  This is partly a prompt engineering question, partly a research question.
- Does the Activity Log feed PhD-Live automatically or via manual curation?

## What this is not

This is not a full RAG system build. The vector store is infrastructure,
not a product. Keep it thin — the interesting decisions live in the bots,
not the plumbing.