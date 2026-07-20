---
dg-publish: true
date-created: 2026-07-19
visibility: public
tags: []
type: ""
---
# After Intelligence: building possibility spaces for creative learning, with and through generative systems

### [[abstract-work-in-progress|Abstract]] (make first person?)

As generative AI becomes normalised within academic practice, how might these systems be integrated into creative research in ways that make thinking more visible rather than less? This practice-based PhD asks what alternative relationships with these systems might look like, and what they might reveal about how intelligence, knowledge, and learning are currently being shaped as commercial LLMs become embedded within higher education.

The research begins from the observation that these systems often compress process, producing polished outputs that can obscure the reflective, exploratory, and unfinished aspects of learning. As these tools become infrastructural to academic work, questions of who controls the means of thinking, and on whose terms, also become urgent.

Rather than critique these tendencies from the outside, I investigate them through my own doctoral practice, using an autoethnographic approach informed by my position as both learner and educator. If AI-mediated knowledge work risks making process invisible, then the methodological response is to build infrastructures that make it visible again, and to keep ownership of those infrastructures close to the researcher.

The core artefact is PhD-Live, a public digital research environment designed to keep knowledge-in-process visible. Alongside it, a suite of locally hosted AI systems, including a Supervisor Bot, Study Companion, and shared knowledge layer, creates an experimental infrastructure for exploring alternative human-AI research relationships. These systems are treated not only as tools but also as research materials and sites of inquiry.

Through this making, findings emerge from practice rather than planning. These include the challenge of building AI tools that genuinely challenge the researcher rather than reinforce existing thinking, a tradeoff between technological sovereignty and model capability, and questions about liveness as a research methodology. Together, the project explores how creative research might remain reflective, situated, and open-ended within an emerging landscape of AI-mediated knowledge production.
### [[glossary-index|Glossary]]

Artificial Intelligence (AI)
Generative AI 
Large Language Models (LLMs)
Personal Knowledge Management
Bot / Chatbot

### 1. Introduction

- Orient the reader to the project and the moment it sits within (commercial LLMs entering higher education rapidly, growing financial pressures on UK HE, the socio-political conditions shaping AI adoption in creative education)
- State the four research questions
- Unpack "After Intelligence" as a framing: the critical interrogation of intelligence as a concept, engagement with AI beyond doom and hype rhetoric
- Name the inversion from the original proposal (designing speculative learning environments for others) to the current work (my own doctoral practice as site and subject)
- Explain how to read this document: what the three elements are (contextual and practice review, draft chapter sections, chapter outlines and plan to completion) and how they relate to the confirmation requirements

**Research Questions:**

- What assumptions about intelligence and knowledge are embedded in commercial AI systems, and how do those assumptions compound when these tools are adopted into learning and educational institutions?
- How does working with LLM-based tools change the practice of thinking itself?
- How can experimental and speculative approaches to working with AI move beyond the generic workflows of commercial systems, making space for new kinds of learning and teaching?
- What might a commitment to liveness (keeping knowledge public whilst still forming) offer as a model for learning and knowledge-making in an era of AI-generated outputs?

## 2. Contextual review

_This section maps the fields the research sits within and the load-bearing references for each. The literature is engaged with in more depth in the draft chapter sections that follow and will be developed further across the thesis chapters._

### 2.1 The problem space

- Commercial AI systems are entering education rapidly, carrying embedded assumptions about what intelligence is, how learning works, and what efficiency looks like
- These tools are designed to resolve, optimise, and produce polished outputs quickly. That collapses the space between question and answer, process and product
- For creative practice and creative education specifically, that collapse is a problem. A lot of what matters in creative work happens in the unresolved, unfinished middle, before things make sense
- This research sits inside that tension. I occupy three roles simultaneously: learner (PhD student), researcher (building and investigating AI tools), and teacher (senior lecturer in creative computing, teaching with and about AI). The triple position is the research site

### 2.2 Speculation as method

- The research adopts a speculative stance as a critical method
- Speculative design (Dunne and Raby) provides the foundational tradition: building artefacts that ask "what if?" as a way of making alternative possibilities thinkable
- The tradition is read here as politically situated: Benjamin's "Imagination: A Manifesto" frames imagination as a political act, not a luxury. Who gets to imagine, and what gets imagined, are shaped by power
- The research engages directly with a known critique of speculative design: that it often remains unactionable and rooted in privileged spaces. The possibility/impossibility spaces chapter of the thesis responds to this critique materially, examining what happens when speculative propositions meet real institutional constraints
- The artefacts in this research are not prototypes or products. They are thought experiments made buildable: propositions about what AI-supported learning and knowledge-making could look like if the assumptions were different
- This led to the concept of possibility spaces, which the thesis takes up further: both as a speculative method and as something that meets real institutional constraints

### 2.3 Liveness and process

- The speculative approach led to utilising live coding as a practice to inform how I explore liveness as a way of keeping process visible and unfinished
- Live coding provides the methodological vocabulary:
    - Blackwell et al's "Live Coding: A User's Manual" establishes liveness as durational, embodied, and non-repeatable
    - Cocker's "Performing thinking in action" frames live coding as thinking-through-doing
    - McLean et al's "The Meaning of Live" raises the question of liveness without audience, which is directly relevant to PhD-Live
- The central tension: is PhD-Live genuinely performative, or is it live only in a temporal sense? This question drives a research question of its own: what might a commitment to liveness offer as a model for learning and knowledge-making in an era of AI-generated outputs?
- Tools for thought and digital gardens provide the second lineage:
    - Caulfield's "Garden and the Stream" as the founding distinction between exploratory networked knowledge and linear feeds
    - Appleton on digital garden history and ethos
    - Matuschak's "How Might We Learn?" as the bridge between tools-for-thought and AI-and-learning
- Recent work on creative process traces (Kreminski and Mateas, Hammad et al) speaks directly to what PhD-Live does: making the traces of creative research visible and treating them as meaningful objects, not just documentation
- The argument: liveness and process visibility are not features of the platform. They are a central way of working. Commercial AI collapses process into product. Making process visible and keeping it unfinished is a deliberate counter, and one that speaks directly to research questions two and four

_The thesis will also engage with Personal Knowledge Management systems and "second brain" traditions (Ahrens and adjacent) but distinguishes its critical research register from their productivity register._

### 2.4 Intelligence, cognition, and the politics of AI

- The research doesn't start from a history of AI. It starts from the question of what intelligence means and who gets to define it
- Crawford's "Atlas of AI" provides the political economy of AI: how intelligence gets operationalised, who profits, what gets extracted
- Agüera y Arcas's "What is Intelligence?" provides a contemporary reframing of the question relevant to current LLMs
- The chatbot lineage matters as critical precedent: Weizenbaum built ELIZA as a critique, not a product. He was alarmed by how readily people projected understanding onto a system that had none. The bots in this research are built in a similar spirit: to interrogate assumptions about intelligence rather than reproduce them
- Sycophancy in LLMs (Cheng et al, Malmqvist) names a structural tendency that connects directly to a finding in this research. When the supervisor bot is fed context drawn from my own notes, it tends to agree with positions I've already taken and reinforce framings I've already used, rather than push back or open new lines of thought. The literature suggests this isn't incidental: it reflects how these models are trained and rewarded, which means designing for genuine challenge in a system that holds the researcher's own material is harder than it looks

_The thesis will engage further with histories of cognition and computation (Hayles, the broader critical AI field), but the key references for confirmation are above._

### 2.5 Learning, institutions, and knowledge

- The pedagogical framing is grounded in:
    - Manning on learning otherwise: learning exceeds and refuses the categories institutions impose on it, as such the application of AI in this context is not straightforward
    - Naidoo and Whitty on students as consumers: the commodification of learning under neoliberalism shapes what knowledge-making looks like and what gets valued
    - Matuschak's "What's worth learning if we have AGI?" poses a foundational question this research is exploring: when AI can do much of what learning used to develop, what is learning actually for?
- On creative knowledge specifically: a lot of what matters in creative practice can't be fully put into words. Schon calls it knowing-in-action, Polanyi calls it tacit knowledge, Dreyfus argues expertise is embodied and intuitive rather than rule-based. LLMs only work with what's been written down. So there is a disconnect here: the kinds of knowing creative work depends on most are exactly the kinds these systems are not able to perform well with
- The argument: learning and knowledge-making happen within institutional, political, and technical conditions. The autoethnographic position makes those conditions visible

### 2.6 Methods: building with and through

- The research is practice-based and autoethnographic, with building tools as the primary mode of investigation
- Methodological traditions drawn on:
    - Frayling's "Research in Art and Design" as the foundational distinction between research into, through, and for art and design. This work sits in the "through" tradition: research conducted through making
    - Candy on practice-based research specifically, distinguishing it from practice-led: the artefacts themselves are the contribution, not just the means of generating findings
    - Skains on designing and conducting practice-based research in the creative arts
    - The Research Through Design community and its proceedings as a body of adjacent practice
    - "The Auto-Ethnographic Turn in Design" on using the researcher's own experience as research material
    - Gaver on research through design and the annotated portfolio method
- "Building with and through" LLM systems is the specific formulation: the LLMs are both the material (what the tools are made of) and the infrastructure (the substrate the research practice runs on). Each artefact operates as both a technical object and a theoretical proposition
- The stated "playful approach" is grounded in beliefs about how learning works, drawn from my teaching practice and experience. It connects to the Montessori tradition and to creative and art school approaches to teaching (studio pedagogy, crit culture, learning through making as a norm). The characteristics of play, experimental, imaginative, self-directed, learning through doing, describe both the method and central values about teaching, which is what connects the methodology to the pedagogical thread
- I will address Jowsey et al's rejection of generative AI for reflexive qualitative research directly: this work uses AI within reflexive research, but AI is the object of inquiry, not a substitute for reflexive analysis
- Pedagogy and the autoethnographic position are distributed across every chapter rather than isolated in one. This is a deliberate structural choice that the methodology chapter will name and justify

## 3. Draft chapter sections

_The following are draft sections from two thesis chapters, presented here together as part of the contextual and practice review. Together they cover the methodological justification and the practice documentation the confirmation panel needs to see. They are draft material and will be developed further as full chapters during the writing period._

### 3.1 From chapter 2: methodology, a playful methodology

_[TO WRITE, c.3,000-4,000 words]_

This section will cover:

- Practice-based and autoethnographic framing (Frayling's into/through/for distinction, Candy on practice-based versus practice-led, Skains, the Research Through Design community, Auto-Ethnographic Turn in Design, Gaver on research through design)
- Speculative design and possibility spaces as the foundational speculative approach, with the political situating of speculation (Benjamin) and direct engagement with the critique of speculative design as unactionable
- Live coding as a practice that embodies liveness, drawing on Blackwell et al, Cocker, McLean et al
- "Building with and through" LLM systems as the specific mode of investigation: LLMs as both material and infrastructure, each artefact as both technical object and theoretical proposition
- Liveness as a methodological commitment (developed more fully in chapter 5)
- The playful approach grounded in beliefs about learning drawn from my own teaching practice, connected to the Montessori tradition and creative/art school pedagogy (studio culture, crit, learning through making)
- Direct address to Jowsey et al: AI as object of inquiry not substitute for reflexive analysis
- The distributed autoethnographic structure named and justified as a deliberate structural choice
- The triple role of learner, researcher, teacher as the research site, and how that position produces knowledge neither role alone could generate

### 3.2 From chapter 4: process, digital gardens, tools for thought, and knowledge infrastructure

_[TO WRITE, c.3,000-4,000 words]_

This section will cover:

- Digital gardens, PKM, tools for thought as a lineage the research infrastructure sits within and departs from (Caulfield, Appleton, Matuschak)
- Contemporary work on creative process traces (Kreminski and Mateas, Hammad et al) as a frame for what PhD-Live does
- The research infrastructure as an overarching system that contains all computational components
- PhD-Live: a public website that publishes my working research notes as I make them
    - Public-facing digital research environment built with Obsidian, Eleventy, and Vercel
    - Publishes the working vault as a digital garden, making doctoral thinking visible as it happens
    - Not documentation of the research but the research itself: process visibility as a research proposition
    - The activity log as a novel element (framed carefully as part of the research activity)
- Supervisor bot: a chatbot that listens to recordings of my supervision meetings and offers reflections
    - Technical development from terminal tool to v1.5 FastAPI application
    - Shared context layer feeding responses
    - Key finding: the echo chamber problem as a structural consequence of how LLM systems process correlated context
    - The design question: how to build for epistemic friction rather than fluency
- Study companion: a chatbot I talk to when thinking through ideas, working out half-formed thoughts, or processing the anxieties that come with PhD work
    - Built on the same infrastructure but designed as an everyday thinking partner
    - Ported role of what Claude has been doing, moved to local infrastructure I own and control
    - Key finding: the capability gap between local and frontier models
    - The gap as research finding and as something the work actively pushes against, at adjacent layers (prompting, context shaping, scaffolding, fine-tuning)
- Shared research context layer: a searchable database of all my research notes
    - ChromaDB vector store, nomic-embed-text embeddings, /context endpoint consumed by all bots
    - Architectural decision to build a shared substrate rather than standalone tools
    - Event renderer paradigm rather than chat interface as a research position
- What remains unbuilt: the confidence bot
    - Planned tool for monitoring the research context and drafting public outputs for approval
    - Likely to surface questions about agency, authorship, and voice
    - Queued as priority for the next phase

### 3.3 Emerging findings

- The echo chamber problem: correlated context collapses response space. A finding about LLM context handling and about the difficulty of designing for epistemic friction in tools that hold deep researcher context
- The capability gap: local models do not match frontier systems for open-ended dialogic thinking. A tension between sovereignty (owning infrastructure) and capability (needing what your infrastructure can't provide)
- Liveness vs performance: an open conceptual question, now driving a dedicated research question
- LLM reasoning vs human associative thought: LLMs are built to resolve and optimise; creative research thinking often needs to stay open, contradictory, unfinished. Designing with both means holding that difference deliberately

---

## 4. Chapter outlines

_Every chapter (other than the introduction and conclusion) has two movements. The first is the conceptual argument with pedagogy and learning as the orienting context. The second is an autoethnographic account where the pedagogical and learning questions deepen through reflection on my own practice._

### 1. Introduction

- Frames the four research questions
- Unpacks "After Intelligence": the critical interrogation of intelligence as a concept and engagement with AI beyond the doom and hype rhetoric
- Introduces PhD-Live and the wider infrastructure briefly
- Sets out the thesis structure and explains why pedagogy and autoethnographic reflection are distributed across every chapter

### 2. Methodology, a playful methodology

_Conceptual argument:_ practice-based and autoethnographic research, with speculative design and live coding as the methodological lineages. Possibility spaces as a foundational speculative approach. "Building with and through" LLM systems as the primary mode of investigation. Liveness named here as a methodological commitment, investigated fully in chapter 5.

_Pedagogical grounding:_ "Playful" grounded in my own teaching practice and experience. Connects to the Montessori tradition and to creative and art school approaches (studio pedagogy, crit culture etc).

_Autoethnographic account:_ The triple role of learner, researcher, teacher and introducing my positionality.

### 3. Intelligence, power and ethics

_Conceptual argument:_ How intelligence has been defined and measured, and how that history shaped AI development. The Weizenbaum/ELIZA parallel: building bots as critique rather than product. Political economy of commercial AI and the power dynamics of institutional adoption. The bots introduced here as critical responses.

_Pedagogical grounding:_ When intelligence is defined as measurable and extractable, AI tools built on that logic squeeze out the kinds of learning that resist measurement.

_Autoethnographic account:_ Building tools that resist resolve-and-optimise logic. The echo chamber problem as a consequence of how LLM "intelligence" works. Navigating institutional AI adoption as both staff and student.

### 4. Process, digital gardens, tools for thought, and knowledge infrastructure

_Conceptual argument:_ Digital gardens, Personal Knowledge Management, and tools for thought as a lineage the local research infrastructure sits within and departs from: constructed instruments for thinking, not productivity tools. The infrastructure documented: supervisor bot, study companion, shared context layer. Architectural decisions as research positions (local/open-source-first, shared substrate, event renderer rather than chat).

_Pedagogical grounding:_ Tools for thought are claims about how learning happens. What changes when the learner is also the builder?

_Autoethnographic account:_ What building and using the infrastructure has surfaced. The echo chamber finding. The capability gap as a sovereignty/quality tradeoff.

### 5. Liveness and performance

_Conceptual argument:_ Driven by the research question about keeping knowledge public whilst still forming. PhD-Live as central object. Live coding as the methodological tradition, and the liveness/performance distinction as the central tension: is PhD-Live performative, or live only in a temporal sense? Creative process traces as a bridge between liveness and documentation. Liveness as a critical response to AI collapsing process into product.

_Pedagogical grounding:_ Learning in public as a pedagogical proposition. Connects back to art school pedagogy: showing work in progress, crit culture, process as visible and discussable.

_Autoethnographic account:_ What it's actually like to maintain a live public research environment. The unresolved question of whether PhD-Live is performance or practice.

### 6. Knowledge, power and ethics

_Conceptual argument:_ From how intelligence is defined to what counts as knowledge and who gets to produce it. Tacit knowledge traditions (Schon, Polanyi, Dreyfus) and the gap between creative knowing and the explicit, extractable model LLMs embody. The politics of knowledge in higher education: what gets credentialled, what's deemed legitimate.

_Pedagogical grounding:_ Knowledge-making as a political act. The critical pedagogy tradition (Freire, hooks) acknowledged here as part of what this argument extends, but the foundation is lived experience inside the institution.

_Autoethnographic account:_ Making knowledge in public via PhD-Live while navigating institutional structures that assess and credential it. The tension between unfinished thinking and the institutional demand for legibility.

### 7. Possibility or (im)possibility spaces

_Conceptual argument:_ A reflective, evaluative chapter where the speculative framing meets what actually happened. The tension between what can be imagined and what can actually be built given resources, time, and institutional pressure. The chapter situates these constraints in their wider context: the growing financial pressures on Higher Education institutions in the UK, and the political economy of commercial AI that determines what tools are available, sustainable, and accountable. The decision to build locally is both political and practical, a response to these conditions rather than a neutral technical choice.

_Pedagogical grounding:_ What kinds of learning become possible or impossible depending on infrastructure and who controls the tools?

_Autoethnographic account:_ Reflect on the real constraints that shaped the work: limits of time and capacity as both a lecturer and a PhD student, what local hardware can and can't do, the institutional pressures of occupying both roles at once. Some of the most revealing moments in the research have been the impossibilities. The distance between what was imagined and what was actually possible is itself a finding.

### 8. Conclusion

- Returns to the research questions and synthesises contributions across chapters
- Reflects on what "After Intelligence" means at the end of the project
- Limitations and future directions

---

## 5. Plan to completion

Part-time PhD, started January 2024. Funded through January 2029, institutional limit 2031. Working 1–1.5 days a week plus evenings/weekends, with summer as the main writing period. Target submission late 2029 to early 2030.

### Timeline

**Year 3: October 2026 – September 2027** Confirmation submitted in October 2026. First workshops and focus groups with students. First substantial chapter drafts begin in summer 2027, starting with chapters closest to existing material (methodology and process).

**Year 4: October 2027 – September 2028** Main writing period. Multiple chapter drafts across the year, with summer as the highest-output period. Continue infrastructure work and workshops/working with students alongside writing.

**Year 5: October 2028 – September 2029** Complete remaining chapters. Reflective chapters benefit from being written last when the work is further along. Draft introduction and conclusion. Full draft review with supervisors. Revisions and final preparation for submission. Target submission late 2029.

**Buffer: October 2029 – 2030** One year of contingency between funded submission target and realistic worst case.

### Ongoing alongside writing

- PhD-Live maintained as a live research environment throughout
- Infrastructure (bots, dashboard, etc.) continues to develop
- 2-3 workshops or focus groups per academic year, feeding into the autoethnographic thread.

---
## Appendix

- Full bibliography (to be attached)
- Links to PhD-Live and the research infrastructure (public access available for panel review)
---

[[confirmation-plan]]