---
dg-publish: false
date-created: 2026-04-19
visibility: public
tags: []
type: ""
---
[[workshop-RiCE]]

I am reworking my previous writing on [[live-coding-a-phd]], talking through how the platforms liveness etc is a mechanism for reflection 

---
#### abstract?

This paper reflects on the design and use of PhD-Live, a live personal research infrastructure built to make doctoral thinking visible in public as it happens. Drawing on live coding practice and zettelkasten-inspired knowledge architecture, the system emerged from an attempt to capture research process without interrupting it. In building and using it, an unexpected reflective dynamic appeared: the same material, held across two differently designed environments -- a private Obsidian vault and a public digital garden -- produced qualitatively different cognitive relationships. The movement between these environments created conditions for reflection that neither environment could produce alone. This paper traces how that finding emerged through making rather than design, what it reveals about how reflective tools might come into being through iterative practice-based research, and what it raises about the role AI might play in such an infrastructure without compromising the open, associative quality of creative research thinking.
#### intro re-write:

setting out to research generative AI in learning and education, I was not expecting the site of my growing research to become in quite a meta sense - the core site of my research. But from the start rather unintentionally the foundations of a wider personal AI research infrastructure was seeded. 

At it's base, my notes and thinking are structured around a zettelkasten-inspired approach, which naturally allows for the slow formulation and clustering of ideas. I began to wonder whether from this emergent cluster there could be ways to implement LLM tools to surface and work with this material alongside my thinking, but always keeping them within a seperate domain. This is the central tension I am trying to understand and build toward: how can I work with LLM's on the growing dataset that is my research, while working against some of the understood behaviours and functionalities of this technology - optimisation, productivity and efficiency and swift evaluation. How can I instead create a space where thoughts can be investigated and played with, where AI stimulates and aids my process rather that taking the reins from me by too swiftly resolving what should remain open

---

Setting out to research generative AI in learning and education, I was not expecting the site of my growing inquiry to become, in quite a meta sense, the core site of the research itself. But from the start, rather unintentionally, the foundations of a wider personal research infrastructure were being seeded. This would come to raise questions I had not initially anticipated about how reflection happens in creative research practice, and what role AI might play in supporting it without compromising it.

From the start of my research I have been thinking, If generative AI can now produce the polished outputs that assessment typically rewards relatively easily - what remains that is distinctly human in  research and learning processes? The answer, I suspected, was something like process itself: the messy, iterative, non-linear thinking that precedes any finished output. And if that is where the value now lies, what does it mean to make that process visible, live, and public?

~~At its base, my notes and thinking are structured around a zettelkasten-inspired approach, which naturally allows for the slow formulation and clustering of ideas.~~ Alongside this, a more playful thread was running through my thinking, drawn from my practice as a live coder, a performance practice that consists of writing and executing code in front of an audience. I found myself asking: what if you could live code a PhD? The question acted as a methodological and practical guide. If generative AI can produce assessed outcomes easily, does everything become centred on process? And if so, what does it mean to make that process visible, live, and public? To drive this investigation I have drawn upon my practice as a live coder, driving myself with the speculative question 'what if you could live code a PhD' 

PhD-Live is the platform that emerged from these questions. It is designed to track and publicly share my research process -- making the evolution of thought visible as it happens rather than curating it retrospectively. As the system grew, I began to consider how LLM capabilities might be integrated into it. The platform's transparency offered something unusual: because the research process is already made visible, any AI intervention would also be legible and therefore its influence on my thinking observable rather than hidden. But this possibility immediately raised a constraint, the integration would need to be carefully bounded, designed to surface connections and patterns without veering toward the premature resolution and efficiency that LLMs tend toward by default -- tendencies that are particularly corrosive in a space where chaotic, non-linear thinking is not a problem to be fixed but the condition that makes the creative thought possible.

This paper reflects on both of these discoveries: what the live system has revealed about reflection in my research practice so far, and what has become abundantly clear about about the distinctions that must be kept around the ability to foster and grow ideas in a computational environment alongside LLMs