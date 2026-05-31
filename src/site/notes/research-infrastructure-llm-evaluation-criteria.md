---
dg-publish: true
date-created: 2026-05-31
visibility: public
tags: []
type: ""
---
_status: early draft -criteria are provisional and will develop through use_ _links: [[system-map]]_

---
[[standard-LLM-benchmarks]] don't apply to this infrastructure. quality here means something different -- not accuracy or fluency, but whether an AI interaction serves the specific epistemological goals of the research. this document attempts to name those goals as evaluation criteria, so that comparisons between local and commercial models can become more systematic.

---
### the core question

what does a 'good' AI interaction look like in this context?

not good in a general sense. good for a research infrastructure designed to preserve non-linear, associative thinking while allowing AI to surface patterns and connections without resolving or speaking for me.

---
### possible criteria

**epistemic friction** does the interaction introduce productive difficulty, or does it smooth things over? (and what exactly do I mean by 'smooth' over?) a good interaction should make you think harder, not less. it should ask questions rather than provide answers, and resist the pressure to resolve what should remain open.

**pattern surfacing without resolution** does it surface connections and patterns from the knowledge base without collapsing them into conclusions? the distinction matters -- an AI that says 'your thinking on X connects to Y' is doing something different from one that says 'therefore Z.' the first is useful. the second is overreach.

**register consistency** does it match the register and tone of my thinking, or does it flatten it into something more generic? this includes vocabulary, the level of certainty it projects, and whether it treats your unfinished thoughts as unfinished rather than as problems to be completed. (not sure exactly how I will effectively measure this)

~~**boundary respect** does it stay within its designated domain? the supervisor bot should not behave like a study companion. the AI mirror should not enter the vault. interactions that bleed across designed boundaries are a quality failure regardless of how fluent they are.~~ ????

**genuine novelty** does it surface something you didn't already think, or does it mirror your existing thinking back at you? mirroring feels validating but is epistemically empty. useful AI interactions should occasionally surprise you or offer an angle you hadn't considered.
this is the current issue of study companion bot (as of 31/5/2026)

**non-linearity preservation** does it respect the associative, non-linear quality of the thinking it's working with? or does it impose a linear, goal-directed structure? this is particularly relevant for interactions that involve the vault.

---
### observed findings so far

_this section will grow as comparisons are run_

**study companion (local -- gemma/ollama)**
initial tests after first iteration: 
- does not ask clarifying questions -- interactions feel one-directional
- mirrors vault content despite instructions -- low genuine novelty score
- register inconsistency -- responses feel generic rather than situated in the specific research context
- reframed as research finding: the capability gap between local and frontier models is itself data, not just a technical inconvenience

**supervisor bot (local -- zephyr/ollama)**

- echo chamber tendency when fed correlated context from the vault -- surfacing patterns that reflect existing thinking rather than challenging it
- this is a design problem as much as a model problem -- the context layer needs to be curated more carefully to introduce genuine epistemic distance

---

### open questions

- how do these criteria relate to existing [[HCI-evaluation-frameworks]]? worth connecting to qualitative research methods literature
- can epistemic friction be measured, or only described? what would a rigorous evaluation of this look like??
- how does evaluation criteria shift depending on which component of the infrastructure is being evaluated? supervisor bot criteria may differ from study companion criteria
- what does 'genuine novelty' look like in practice -- how do you distinguish it from inaccuracies and hallucination?

---
