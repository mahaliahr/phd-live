---
dg-publish: true
date-created: 2026-04-18
visibility: public
tags: []
type: ""
aliases:
  - shared context layer
---
Before building more bots, I need to establish a single shared context layer that all three bots can query. 

this is to avoid rebuilding the Obsidian integration three times and ensures consistent knowledge across the system.


**The Obsidian vault is the canonical knowledge source** -> A watched folder pipeline embeds markdown files into a shared vector store (ChromaDB or SQLite + embeddings). 
Any bot queries this store via a common internal API.
No bot owns its own copy of the notes.

#### Implementation sequence

1. **Watcher script — monitors vault folder, triggers on new/changed .md files**
2. **Embedding pipeline — chunks and embeds into the vector store**
3. **Query API — a simple FastAPI endpoint: POST /context {query, top_k}**
   **returns relevant note chunks**
4. Supervisor Bot will use this instead of any hardcoded context
5. Confidence Bot will also read from the same store

**Pipeline**
your note text
    ↓
chunk by heading (keep chunks semantically coherent)
    ↓
nomic-embed-text converts each chunk to 768 numbers
    ↓
ChromaDB stores [numbers + original text + metadata]

query arrives ("what is my research about")
    ↓
nomic-embed-text converts query to 768 numbers
    ↓
ChromaDB finds stored vectors closest to query vector
    ↓
returns original text of those chunks

---

When running API again in future sessions I will need two terminal tabs -- one running the watcher, one running the API:

```
# tab 1
python3 watcher.py

# tab 2
python3 -m uvicorn api:app --reload
```
#### Key open questions


- Does the Activity Log feed PhD-Live automatically or via manual curation?
[[system-open-questions]]
## What this is not

This is not a full RAG system build. The vector store is infrastructure,
not a product. Keep it thin — the interesting decisions live in the bots,
not the plumbing.