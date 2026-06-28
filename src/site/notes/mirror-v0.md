---
dg-publish: true
date-created: 2026-06-28
visibility: public
tags: []
type: ""
---
## structure (daily and weekly)

### daily (runs at midnight via cron)

purely observational. no llm involved.

collects:

- notes created (new .md files in vault)
- notes edited (modified timestamps)
- sessions that occurred (from session data)
- orphan notes flagged (notes with no backlinks, detected that day)

writes to: `mirror-outputs/daily/YYYY-MM-DD.md` (outside vault, in research-infrastructure repo or dedicated folder)

if no activity: writes a minimal dated file recording the absence. absence is data.

---
### weekly (runs sunday midnight via cron)

draws on: all seven daily files for the window + a fresh chromadb pass over vault activity for the week.

**structured operations (no llm):**

- frequency/recurrence counts: tags, links, phrases appearing most across the week's notes
- notes created/edited this week, lightly grouped by folder/topic
- orphans accumulating across the week

**llm synthesis (local model -- qwen2.5:32b recommended, llama3.3:70b as fallback):**

two passes, both shown with their grounding data visible in the output so the ai's reasoning is transparent and auditable.

pass 1 -- synthesis statement:

- input: top recurring terms, orphan list, notes created/edited this week (titles and folders)
- output: a short paragraph describing what the week's notes seem to be circling around
- the grounding data is displayed alongside the statement in the output (not hidden)

pass 2 -- single generated reflective prompt:

- input: the synthesis statement just produced + top recurring terms + orphan list
- instruction to model: "generate one specific question grounded in the above. name actual notes, terms, or patterns you can see in the data. do not ask generic reflective questions."
- output: one question only
- specificity constraint does significant work regardless of model quality -- the model follows the instruction rather than needing to be clever
- if the prompt misses it costs little; one question is easier to ignore than three and less damaging when it fails

**on model quality for this task:** the bar is not a brilliant insight -- it is a prompt that causes a momentary pause rather than being skipped. that is achievable with qwen2.5:32b given well-prepared, constrained input. if generated prompts are consistently poor after testing, this moves to v1 and is replaced with no prompt (synthesis statement only) in v0.

writes to: `mirror-outputs/weekly/YYYY-WNN.md`

---

## output format

dated markdown files in `mirror-outputs/` folder. outside the vault. not indexed by obsidian. readable by you; you decide what if anything comes back into the vault. the act of curation is yours.

folder structure:

```
mirror-outputs/
  daily/
    2026-06-23.md
    2026-06-24.md
    ...
  weekly/
    2026-W26.md
    2026-W27.md
    ...
```

---

## interface integration

### phd-live

mirror surfaces via a toggle on the existing live column (not a separate page). toggling switches the live column into mirror mode.

mirror mode shows:

- most recent daily digest
- most recent weekly digest
- history of past digests (scroll)

### learning dashboard (react/vite)

mirror gets its own tab in the existing dashboard.

dashboard tab shows:

- daily digest feed
- weekly digest with pattern outputs and reflective prompts visible

---

## cron jobs

```
# daily mirror run -- midnight
0 0 * * * /path/to/mirror/run_daily.sh

# weekly mirror run -- sunday midnight
0 0 * * 0 /path/to/mirror/run_weekly.sh
```

---

## explicitly out of scope for v0

- bot activity logging (next todo after v0)
- episodic/a-mem style memory (v1 consideration -- simple append log approach most likely)
- frontier model access
- vault write access (permanent constraint, not a v0 limitation)
- fine-tuning local models for mirror tasks

---

## local model notes

qwen2.5:32b: recommended for weekly synthesis -- good balance of capability and speed on 32gb ram. llama3.3:70b-instruct-q4_K_M: stronger reasoning, significantly slower -- use if weekly run timing allows. the quality gap relative to frontier models is documented and framed as a research finding (consistent with study companion precedent).

---