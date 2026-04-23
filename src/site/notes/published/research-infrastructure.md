---
dg-publish: true
date-created: 2026-04-18
visibility: public
tags: []
type: ""
---
the overarching system that holds:

[[learning-dashboard]]
[[project-supervisor-bot]]
[[study-companion-bot]]
[[confidence-bot]]

and connects to the obsidian vault for context

![research infrastructure|597](images/personal.png)

[[shared-context-layer]]

---
following session [[2026-04-17]]
### Research / knowledge infrastructure: key decisions

![research infrastructure|650](images/knowledge-ecosystem.png)

### Build approach
Custom FastAPI + frontend remains correct. 
(Off-the-shelf options (LibreChat, AnythingLLM, Chainlit) don't accommodate the non-chat interaction paradigms that I am interested in exploring).

general logic - don't build 'plumbing' that already exists; but build the interface layer myself

### The three bots (planned so far)
- **Supervisor bot** — structured critique, accountability, session-based. v1.5 working.
- **Study companion** — exploratory thinking, document-aware, peer/interlocutor role.
- **Confidence bot** — public presence agent. Reads notes, proposes shares, approval
  step retained. Most conceptually distinctive -> next to build?

These map onto three modes of cognitive/emotional labour in PhD research.
This is worth naming explicitly in the thesis framing.

### Shared context layer (build this first)
One vector store (ChromaDB or SQLite + embeddings), one query API, all bots consume it. Sequence: watcher → embed → query endpoint → wire supervisor bot → build confidence bot on top. Chunk by Obsidian heading structure. 

(RAG-compatible by design; fuller retrieval can be added later as extension).

### Learning dashboard
Shell first (navigation + activity feed), which can become knowledge layer second. 
Let real usage generate signal before designing potential context features of this dashboard.

Document this sequencing decision - the reasoning is important research material (ie. why starting from shell first, seeing what emerges as I use it before adding more features)

### Activity log (AI layer as I have been calling it in provisional sketches)
Three distinct things, kept separate:
- Session record — structured log per bot interaction (local store)
- Research diary layer — interpretive, themes, trajectory (future)
- Public feed — curated subset surfaced to PhD-Live (separate concern)

### Open questions
- Does the learning dashboard become a context source for bots, and when?
- What is the "shareable" threshold logic for Confidence Bot?
- Does the activity log feed PhD-Live automatically or via curation?