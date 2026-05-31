---
dg-publish: true
date-created: 2026-05-03
visibility: public
tags: []
type: ""
---
a map of the research infrastructure. updated when something changes state, not on a schedule. for active tasks see [[phd-live-build]]. for unresolved thinking see [[system-open-questions]].

---

[[research-infrastructure]]:
- obsidian vault base - exists and I don't imagine I will change this dramatically 
	- writing tool - augmented writing space
- [[learning-dashboard|learning dashboard]] (interface that holds all components + live logging, with perhaps more LLM functionality later down the line)
	- live logging capability
	- bots:
		- [[project-supervisor-bot|supervisor bot]]
		- [[study-companion-bot]]
		- [[confidence-bot]]
	**(note for later, what is the main difference between supervisor and study companion bot )**
	- activity log (learning dashboard summary -- gets pushed to phd-live site?)
	- [[mirror]], exists in learning dashboard and on phd-live site (previously and generically titled the 'AI Layer')
- [[project-phd-live-platform|phd-live platform]] public site -> (tracking site things here [[PhD-Live-debugging-and feature-list]])
	- capture keystrokes - trigger audio
	- livestream to youtube
	- newsletter of liveness, updates on the system and the research

physical hardware: 
- supervisor-bot 'vision' - hardware that can 'see' (maybe I can move 'hearing' functionality to the hardware too)
- live log button

public facing / pedagogical frameworks:
- share obsidian configuration?
- research infrastructure
- phd-live
- bots


status key: 🟢 stable · 🔵 active · 🟡 speculative

---

## writing + thinking

|component|status|notes|
|---|---|---|
|obsidian vault|🟢 stable||
|augmented writing space|||

---

## learning dashboard

| component           | status | notes                                                     |
| ------------------- | ------ | --------------------------------------------------------- |
| live logging        |        |                                                           |
| supervisor bot      |        |                                                           |
| activity log        |        |                                                           |
| mirror / AI layer   |        |                                                           |
| study companion bot |        | → [[system-open-questions#supervisor-vs-study-companion]] |
| confidence bot      |        |                                                           |
|                     |        |                                                           |

---

## phd-live public site

|component|status|notes|
|---|---|---|
|obsidian → eleventy → vercel stack|🟢 stable||
|revision history|||
|screenshot archive / evolution page|||
|kanban rendering|||
|keystroke → audio trigger|||
|youtube livestream|||
|newsletter|||

---

## physical hardware

|component|status|notes|
|---|---|---|
|supervisor bot vision|||
|live log button|||

---

## public-facing / pedagogical

|component|status|notes|
|---|---|---|
|share obsidian config|||
|research infrastructure docs|||
|phd-live|||
|bots|||

---

## open questions

short captures only, fuller thinking lives in [[system-open-questions]].

- [[system-open-questions#supervisor-vs-study-companion]] — what is the meaningful difference in role and interaction mode?
- [[system-open-questions#liveness-vs-performance]] — is phd-live live, or also performative?
- [[system-open-questions#what-to-share-publicly]] — what is the pedagogical intent of sharing infrastructure?