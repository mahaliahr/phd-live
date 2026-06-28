---
dg-publish: true
date-created: 2026-05-31
visibility: public
tags: []
type: ""
aliases:
  - AI Layer
---
Mirror is an LLM presence within the [[research-infrastructure]] that's purpose is to reflect back my thoughts and accumulating research. It operates as a non-directive, observational layer that surfaces patterns in research activity **without** directing or advising. 

Mirror reads the vault, **but it does not write to it**. Mirror exists alongside the my ecosystem of thoughts (the obsidian vault), but does not encroach upon this space - the boundary is distinct. It is also designed not to 'process' or 'evaluate' my thought, only to look for patterns emerging and activity occuring and reflect that back.

---
#### what mirror is not

- not interactive (no chat interface)
- not a bot (no back-and-forth)
- does not write to the obsidian vault
- does not use a frontier model (sovereignty constraint, consistent with study companion framing -- the quality gap is a research finding, not a problem)
- does not have write access to any research notes

---
#### data sources

- obsidian vault: read-only, via filesystem scraping (daily) and chromadb semantic retrieval (weekly)
- session data: existing supabase + obsidian static json session feed (via live.js / sessions.11ty.js infrastructure)
- bot activity: not yet logged -- to be added post v0

[[mirror-v0]]