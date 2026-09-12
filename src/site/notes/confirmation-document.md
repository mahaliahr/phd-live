---
dg-publish: true
date-created: 2026-07-19
visibility: public
tags: []
type: ""
---
### After Intelligence: building possibility spaces for creative learning, with and through generative systems

##### Abstract

As generative AI becomes normalised within academic practice, how might these systems be integrated into creative research and practice, in ways that make thinking more visible rather than less? This practice-based work asks what alternative relationships with these systems might look like, and what they might reveal about how intelligence, knowledge, and learning are currently being shaped as commercial large language models (LLMs) become embedded within higher education.

The research begins from the observation that these systems often compress process, producing polished outputs that can obscure the reflective, exploratory, and unfinished aspects of learning. As these tools become infrastructural to academic work, questions of who controls the means of thinking, and on whose terms, also become urgent. Rather than critique these tendencies from the outside, I investigate them centrally through my own doctoral practice, using an autoethnographic approach informed by my position as both learner and educator. If AI-mediated knowledge production risks making process invisible, then the methodological response is to build infrastructures that make it visible again, and to keep ownership of those infrastructures close to the researcher.

The core artefact is PhD-Live, a public digital research environment designed to keep knowledge-in-process visible. Alongside it, a suite of locally hosted AI systems, including a Supervisor Bot, Study Companion, and shared knowledge layer, creates an experimental infrastructure for exploring alternative human-AI research relationships. These systems are treated not only as tools but also as research materials and sites of inquiry.

Through this making, preliminary findings have emerged from practice and engagement with these tools. These include the challenge of building AI tools that genuinely challenge the researcher rather than reinforce existing thinking, a tradeoff between technological and data sovereignty alongside the model's capability, and questions about liveness as a research methodology. Together, the project explores how creative research might remain reflective, situated, and open-ended within an emerging landscape of AI-mediated knowledge production.

##### Glossary

**Artificial Intelligence (AI)** A broad term for computational systems designed to perform tasks that would typically require human intelligence, including pattern recognition, decision-making, and language understanding. In this document, "AI" is used mostly as shorthand for the current wave of generative AI systems entering education.

**Autobiographical design** A more specific method within design research, where the researcher designs artefacts for their own use and treats their engagement with those artefacts as the material of the research.

**Autoethnography** A research method that uses the researcher's own experience as the primary data through which to understand a cultural or social phenomenon. Common in qualitative social research and in creative arts research.

**Bot / Chatbot** A software program designed to hold conversational exchanges with a user. In this research, the "supervisor bot" and "study companion" are locally hosted chatbots I have built specifically for use in my doctoral practice.

**Digital garden** A form of a public personal website that publishes work in progress rather than only finished writing. Digital gardens are typically networked and revisable, treated as spaces for thinking-in-public rather than as blogs or portfolios.

**Generative AI** AI systems that produce new content, including text, images, audio, and code, rather than only analysing existing content. Includes text-based systems like ChatGPT and Claude, image generators like Midjourney, and code assistants.

**Large Language Models (LLMs)** A specific type of generative AI trained on large amounts of text to produce human-like language responses. When I refer to 'commercial LLMs' or 'commercial AI systems,' it primarily means ChatGPT, Claude, and similar consumer-facing text-based products.

**Live coding** A creative and research practice in which code is written and modified in real time, often as performance. Live coding treats the process of coding as itself the work, and has developed a body of thinking about liveness as an artistic and methodological concept.

**Local (as in local AI)** Software or AI systems that run on personal or institutional hardware rather than on remote commercial servers. Local systems can be examined, modified, and controlled by the user; commercial systems typically cannot.

**Open-source AI/model** — An AI system made available with the freedoms and components necessary to use, study, modify and share it. In this work, _open source_ is distinguished from models that make their weights available without necessarily making their wider training process, data or infrastructure open.

**Open-weight model** — A model whose trained weights are made available for use and potentially local deployment, but which does not necessarily meet the fuller requirements of open-source AI.

**Personal Knowledge Management (PKM)** A category of tools and practices for capturing, organising, and connecting the knowledge someone accumulates over time. Includes note-taking systems like Obsidian and Notion, and traditions like Zettelkasten.

**Possibility spaces** The space of what a given system, set of constraints, or set of conditions makes possible. In this research, drawn from Bogost's use of the term in the context of play as engagement with constraints (Bogost, 2016). Chapter 7 of the thesis engages with possibility and impossibility spaces directly.

**Practice-based research** A form of academic research in which the primary contribution is a set of practical artefacts (designs, systems, works) accompanied by reflection and theoretical framing. Distinct from practice-led research, where practice generates insights but the contribution is textual.

**Speculative design** A design tradition oriented toward using artefacts to imagine and explore possible futures, rather than solving current problems. Associated with Dunne and Raby (Dunne and Raby, 2013) and used in this research as a critical method for asking what alternatives to current AI-mediated practice might look like.

### 1. Introduction

This research began in the classroom. In 2022 and 2023, in the nascent days of ChatGPT and before I started this PhD, I began to sense that something foundational was shifting in how students were learning, and that the unknowns opening up were worth probing further. It started to become quietly clear that students were getting guidance and answers elsewhere, through their chatbots, and that the individual personal expression I was used to experiencing from students was being replaced by a generic tone and prose characteristic of a large language model. It is these observations that shaped the beginnings of this research. 

Critically however, this experience does not happen in a vacuum. It exists alongside a number of other stressors on higher education: financial precarity, changing politics, and a growing uncertainty about what universities are for as the conditions of knowledge production shift. The impact of generative AI always exists within this intertwining web of conditions, which frames the work as much as the classroom experience does. Additionally, my position as a lecturer drives a lot of how I am conducting this research, but this role doesn't operate in isolation. It is also the nature of being both a student and lecturer at the same time that brings up interesting tensions and opportunities within this investigation - the relationship between my personal learning journey and how that extrapolates into my teaching practice and vice versa. 

Out of this position and these conditions, the research asks four questions:

1. What assumptions about intelligence and knowledge are embedded in commercial AI systems - and how do those assumptions compound when these tools are adopted into learning and educational institutions?
2. How does working with LLM-based tools change the practice of research and self-directed learning in creative higher education?
3. How can experimental and speculative approaches to working with AI move beyond the generic workflows and extractive infrastructures of commercial systems, making space for new kinds of learning and teaching?
4. What might a commitment to liveness (keeping knowledge public whilst still forming) offer as a model for learning and knowledge-making in an era of AI-generated outputs?

The framing of "After Intelligence" has always been centred around looking beyond the here and now. I know from my position as a lecturer the kind of struggles that take up the everyday, often around the correct mode of assessment, plagiarism, and other immediate concerns. But I wanted to look beyond this. At the moment, conversations about AI in education have a tendency to default to pro or anti AI stances (Jensen _et al._, 2025), but I want to explore a more nuanced position. Assuming this technology is here to stay, what might modes of learning look like that utilise and integrate these technologies, but crucially, how might we do so in ways that acknowledge the problems and ethical issues that are undoubtedly core to commercial AI infrastructure?

When I wrote my initial proposal, it was still the early days of ChatGPT's arrival in the classroom. At that time I was clear on the framing of "looking beyond the present," and that I would adopt some kind of speculative approach, though I was not sure what form exactly it would take. This was partly to engage with the topic beyond the booster versus doomster dialogue (Jensen _et al._, 2025) that frames the conversation, and partly to engage with the challenge in a playful way.

In this research, playfulness is a stance I take toward the work. It lets me challenge the pervasive optimisation logic of commercial AI tools, but it also draws on traditions of making and learning that treat play as central (Forbes 2021; Whitton 2018) - which are themselves counter to that optimisation logic. This is the starting point that leads me to the concrete frameworks I work through with speculative design and live coding.

From the outset, I also knew that in my role as a teacher I wanted to do something inclusive and informed the postgraduate students that I teach, rather than from a top-down approach. However in practice, it is my experience as a doctoral student that has become the testbed for my primary investigations. Working through autoethnography and autobiographical design principles, my own research process has become a prime site for many of my investigations into AI tools.

It was through initial (and at the time I thought unconnected) work on finding the best system for note-taking throughout the research, and my discovery of Zettelkasten (Ahrens, 2017), that I began to realise directly that the knowledge I am generating day to day and the thinking being captured within my notes is the perfect place to speculate on AI implementation. 

Therefore, starting with my own practice is the practical place to begin in the research. Preparing tools and guardrails carefully enough to put in front of students takes time, while my own research is already ongoing and I can work with it iteratively as I build. It is also a matter of care, and of my responsibility in conducting this research. The unformed, in-process thinking I most want to examine makes sense to be mine to expose, rather than the students' to risk.

This document lays out a contextual overview that maps out the fields of practice the work is situated within and talks through my growing practice, which is directly engaged in answering my research questions. I will also explain my methodological approach in more detail through a draft section of chapter 2 (a "playful" methodology), and my documentation of the primary artefacts of the research through a draft section of chapter 4 (process, digital gardens, tools for thought, and knowledge infrastructure). Lastly I will provide the chapter outlines and my plan to completion, indicating the vision of the research moving forward.

## 2. Contextual review

This contextual review situates the research across the intersecting fields and debates that inform the work. It begins by mapping the broader problem space. and existing approaches to generative AI in higher education, and then explores debates around intelligence, cognition and the politics of AI, before moving into two areas in greater depth: the playful methodological approach through which the research is conducted, and the focus on process and knowledge infrastructure that has emerged throughout the research. These are also the two areas most substantially developed in writing at this stage.
### 2.1 The problem space

Commercial generative AI systems have entered higher education rapidly, carrying with them embedded assumptions about intelligence, learning and efficiency (Miao and Holmes, 2023). Their tendency to resolve questions and produce polished outputs quickly compresses the space between question and answer, and process and product. This is particularly consequential within creative practice and creative education, where experimentation, uncertainty and reflection through making are not simply obstacles to be overcome on the way to an output, but an important part of how learning takes place (Schön, 1987). This research sits within that tension through my simultaneous positions as learner (PhD student), researcher (building and investigating AI tools), and teacher (senior lecturer in creative computing).
### 2.2 Existing approaches to generative AI in higher education

Early responses to generative AI in higher education have frequently framed it as an accelerant for changes already underway. Jensen et al.'s (2025) review of discourse following the release of ChatGPT found predominantly optimistic claims, with generative AI positioned as accelerating existing agendas rather than fundamentally changing their direction. At the same time, the body of evidence surrounding AI in higher education remains comparatively immature: Bond et al. (2024), in a meta-review of 66 reviews of AI in higher education, identify gaps in the field's ethical consideration, methodological rigour and theoretical grounding. The emphasis on acceleration, efficiency and scalable integration are also being materialised within institutional practice. UCL's 'A flexible infrastructure for a teaching-led AI-empowered university' explores infrastructure through which LLMs might support knowledge transfer, semi-automate assessment and feedback, reduce workload and enable AI integration at scale (University College London, 2025).

However, not all responses follow this trajectory, the following are approaches closer to the critical and practice-based position of my research. Harvard's AI Pedagogy Project develops classroom activities in which students encounter the possibilities and limitations of generative AI through hands-on experimentation (Berkman Klein Center for Internet & Society, 2023). Rocco (2025) takes a more explicitly emancipatory position, arguing that AI should become material for intellectual work rather than a substitute for it, with students learning to interrogate rather than defer to its outputs. Coelho (2025) puts a related critical position into practice within music and sound education, using experimental seminar activities, such as deliberately misusing AI systems, to expose the cultural and technical assumptions embedded within them. Asadi (2023) uses a similar first-person approach, examining his own use of LLMs in design thinking through autoethnography, though his interest is in documenting what these tools enable rather than interrogating what they displace. My research draws elements from across these positions but brings them together through a different form of practice: building the systems being investigated and using them as part of my ongoing research practice. This allows the assumptions and tensions surrounding AI-supported learning to be encountered through use, while the infrastructure itself can be continually adapted and reconfigured in response to what emerges.

### 2.3 Intelligence, cognition, and the politics of AI

Before asking how AI might participate in learning, this research questions what is being described as intelligence in the first place. Crawford (2021) situates AI within the material and political systems through which intelligence becomes classified, operationalised and made computational, while Hao (2025) brings this critique into the contemporary generative AI landscape, tracing how the pursuit of increasingly powerful models is bound up with concentrations of corporate power, labour, data and material resources. Contrastingly, Agüera y Arcas (2025) approaches the question from another direction, challenging narrow definitions of intelligence and reconsidering what the term might encompass in relation to both biological and artificial systems. This question of what capacities we attribute to computational systems also has a longer history: Weizenbaum's ELIZA demonstrated how readily people could attribute understanding to a relatively simple conversational program (Weizenbaum, 1966). Contemporary LLM tools make this question newly relevant, particularly through behaviours such as sycophancy, where models reproduce or reinforce a user's stated positions rather than challenge them (Sharma et al., 2024; Jain et al., 2026).

These questions become particularly loaded within pedagogical contexts, where distinctions between intelligence, ability and learning are already entangled with practices of educational assessment (Rutkowski, Rutkowski and Thompson, 2024). The introduction of AI therefore does more than add a new tool to existing educational practices; it brings computational accounts of intelligence into contact with institutional judgements about human learning and capability. For this research, intelligence is consequently treated not as a settled property that AI simply possesses, but as a contested category whose definition, production and attribution shape what these systems are understood to do and what roles they are permitted to occupy in learning.
### 2.4 A ‘Playful’ Methodology

The methodological approach of this research is built from several traditions, each contributing to the work in different ways. Practice-based research is the foundation and the overarching answer to what kind of research this is. Speculative design provides the theoretical frame: an orientation toward imagining otherwise, building artefacts that ask "what if?" as a way of making alternative possibilities thinkable. Live coding provides the concrete practice tradition and vocabulary: working in real time, keeping the process visible and public while it is still forming.

Running through all of these is a playful approach that guides the work. Sicart (2014) draws a distinction between play as an activity and playfulness as an attitude, a physical, psychological, and emotional stance brought to activities rather than a property of them. It is in this sense that playfulness operates in this research - not as a method alongside speculative design and live coding, but as the stance I bring to both. Nørgård, Toft-Nielsen and Whitton (2017) propose playful learning as a signature pedagogy for higher education, positioning experimentation and reflective risk-taking as characteristic of how higher education might approach learning, rather than the performativity of assessment. Whitton (2018) develops this into a practical framework for creating conditions in which experimentation, uncertainty and failure can form part of learning. Drawing on these framings, I treat playfulness as a pedagogical stance towards the research journey, informing my experience both as a doctoral student and as a researcher. It ties together the aforementioned theories and practices to form an imaginative and experimental modality through which I can investigate, while challenging the tendencies towards optimisation and productivity that are embedded in commercial AI tools.
##### 2.4.1 Practice based research
At the foundation, this research is practice-based (Frayling, 1993; Candy, 2006). These traditions are important because they articulate how knowledge can be produced through making rather than only through writing, and distinguish this form of research from more traditional textual scholarship. Frayling's foundational distinction between research *into, through*, and *for* art and design locates this work firmly in the 'through' tradition - research conducted through making. Candy's later distinction between practice-based and practice-led research further clarifies the role of the artefacts in this research. In practice-based research, creative artefacts form part of the contribution to knowledge, whereas practice-led research is primarily concerned with generating new understandings about practice. The artefacts developed through this research are therefore treated as contributions in their own right rather than simply as illustrations of an argument made elsewhere.

This also connects methodology to the pedagogical position of the research. Schön's account of knowing-in-action describes knowledge enacted through practice (Schön, 1983), allowing making to operate here both as a means of producing research knowledge and as a process through which I learn as a doctoral researcher.

The second reason practice-based research matters to this work is more specific. The research is itself concerned with how knowledge gets produced, particularly the tension between the tacit, unfinished and embodied knowing that practice-based work centres and the classificatory, algorithmic and output-oriented tendencies of generative AI systems. The two operate on quite different assumptions about what knowledge is and how it becomes available. This tension is foundational to the research: practice-based research is not only my methodology, but also provides a position from which to investigate how generative AI reshapes the conditions through which knowledge is made. It directly informs research questions one and two, allowing me to examine the assumptions about knowledge embedded in AI systems and how working with them changes practices of thinking and self-directed learning.

<!-- 

INCLUDE IN PRESENTATION 

This tension is foundational to the research: practice-based research is not only my methodology, but also provides a position from which to investigate how generative AI reshapes the conditions through which knowledge is made. It directly informs research questions one and two, allowing me to examine the assumptions about knowledge embedded in AI systems and how working with them changes practices of thinking and self-directed learning. -->
##### 2.4.2 Speculative design and possibility spaces 

Within the scaffolding of practice-based research sits speculative design, which provides a theoretical frame for how I approach the questions. I draw particularly on the critical and speculative design tradition associated with Dunne and Raby, in which designed artefacts are used not primarily to solve existing problems but to open alternative possibilities and question assumptions about how things might otherwise be. Auger similarly describes speculative artefacts as “intended to act like a mirror reflecting the role a specific technology plays or may play in each of our lives” (Auger, 2012, cited in Mitrović et al., 2021, p. 71). It is this exploratory orientation, rather than treating speculative design as a fixed set of procedures, that I take into the research.

This provides a natural starting point for investigating LLMs in education, where both the technologies and the circumstances of their adoption are still developing. Speculative design offers a way to investigate this space through making rather than only theorising about it. In practice, this means building artefacts that instantiate propositions and allowing those propositions to be encountered through use: a bot designed to introduce friction into research thinking, for example, or a public research environment that treats process as an output.

Informed by this speculative design tradition, the notion of "possibility spaces" drives the research forward. The term itself has a longer history in game studies and design, where it has been used to describe the range of what a given system or set of conditions makes possible. The specific framing that has been most influential for this research comes from Bogost (2016), who in 'Play Anything' treats play as engagement with constraints and possibility spaces as the shape of what those constraints allow to happen. This framing does substantial work for the research. It gives me a way to think about what building with generative AI actually explores: not endless open possibility, but the specific space of what these systems, in this institution, with these resources, allow me to make. 

Speculative design has been critiqued for remaining rooted in privileged spaces and offering little that is actionable (Thackara, 2013, cited in Mitrović et al., 2021, p.85). This is an important concern for a research practice that uses speculation as a means of inquiry. Ruha Benjamin (2024) provides a useful political framing here, arguing for imagination as a means of challenging dominant technological narratives and making alternative possibilities thinkable. This raises a question of agency - who gets to imagine and shape the role these technologies take within education and society more broadly? My position is that students and educators should not encounter these AI systems only as fixed commercial tools whose purposes and modes of use have already been determined for them, but should have opportunities to question, reconfigure and imagine alternatives to them.

In this research, however, imagining alternatives is only the beginning. The speculative propositions are built, used and subjected to the material conditions of my research practice and institutional context. What becomes possible through them, and what proves difficult or impossible, both become part of the inquiry. The Supervisor Bot provides an example. It began with the speculative proposition of what it might mean for an LLM to occupy a supervisory role. As it developed, I connected it to my research archive so that its responses could draw on the context of the PhD. This made the bot better informed about the research, but also more likely to reproduce positions already present in my notes rather than challenge them. Building the proposition therefore exposed a problem that speculation alone had not: giving the system more knowledge of my research did not necessarily make it better at questioning my thinking.

This movement between imagined possibility and material constraint is central to how possibility and impossibility spaces operate throughout the research. Building makes visible not only what can be realised, but the technical, pedagogical, institutional and political conditions that enable, constrain or foreclose particular possibilities. In relation to research question three, this framing allows me to examine what experimental and speculative approaches offer beyond generic commercial AI workflows while remaining attentive to the conditions through which those alternatives can, or cannot, be realised.
##### 2.4.3 Play and imagination

Within this speculative frame, play and imagination shape how I engage with the possibilities and constraints that emerge through practice. Bogost's (2016) account of play as engagement with constraints describes the disposition this requires: working with what these systems will and will not do rather than either dismissing them or accepting their outputs uncritically. Benjamin's (2024) account of imagination adds a political dimension, positioning the capacity to imagine alternatives as something shaped by questions of power and agency. Together, they frame the research not only as critique, but as an attempt to imagine, build and test alternatives from within the conditions that determine what those alternatives can become.

This approach also has pedagogical roots, and it is here that methodology and pedagogy most clearly connect. It draws on traditions that understand learning as active and exploratory. Montessori's prepared environment supports exploration and learner choice within a deliberately structured environment (Lillard, 2017); Papert and Harel's constructionism emphasises learning through making (Papert and Harel, 1991); and studio and crit-based pedagogies make developing work available for discussion, feedback and reflection (McDonald and Michela, 2019). These traditions do not all theorise play in the same way, but share an emphasis on learning through making, experimentation and reflection. Contemporary work on playful learning brings these qualities together more explicitly, treating experimentation, uncertainty, reflective risk-taking and permission to fail as conditions for learning (Nørgård, Toft-Nielsen and Whitton, 2017; Whitton, 2018).

These ideas have shaped my own teaching, where students are encouraged to make before outcomes are fully known, share unfinished work and learn through what emerges from the process. The same commitment shapes how I conduct this research. Playfulness allows uncertainty, experimentation and failure to remain productive rather than treating them as inefficiencies to be removed. As both a pedagogical stance and a mode of research practice, it therefore provides a way of working against the tendency of commercial AI tools towards resolution, optimisation and polished outputs. Methodology and pedagogy are not separate commitments here, but expressions of the same approach at different scales.
##### 2.4.4 Live coding

Live coding contributes something more specific to the methodology than either speculative design or playfulness, it is a practice tradition in which the process of making is itself made visible. While speculative design provides an orientation towards alternative possibilities, and playfulness describes the experimental stance through which I approach them, live coding provides a concrete tradition for working in real time and exposing work while it is still forming. These approaches overlap in their emphasis on experimentation, improvisation and engagement with constraints, but they are not interchangeable. It is this particular concern with process and liveness that gives live coding a distinct role within the research.

Live coding is a creative and improvisatory practice in which process can become part of the substance of the work, and where liveness itself has been examined as a methodological concept (Blackwell et al., 2022; Cocker, 2016). This is particularly relevant to a research project concerned with what happens to creative and intellectual process when AI tools are integrated into it. However, there is an inherent tension in bringing a practice concerned with visibility and openness in conjunction with generative AI systems whose internal computational processes are largely inaccessible. Live coding cannot make these systems transparent, nor expose the full processes through which their outputs are produced. Instead, it makes visible the encounter around them: the prompts, code, decisions, revisions, failures and uncertainties through which they become part of a research practice. Liveness therefore operates here not as a solution to computational opacity, but as a way of making perceptible the human and technical activity that surrounds it.

Openness itself also becomes more complicated in this context. Practices of open source and live coding make code and process available so that they can be inspected, learned from and reworked by others, a stance that has influenced my research. Yet it is this same spirit of openness, and the publicly available code it produces, that has also made open-source communities a source of training material for commercial generative AI systems. The same visibility that enables participation and collective knowledge-making can therefore also enable forms of extraction. This tension is particularly significant for PhD-Live: making research process public raises questions not only about what becomes visible, but who or what can make use of that visibility, and for what purposes.

![[2026-09-09_home.png]]

This distinction is important because commercial AI systems tend to present the result of computation as a resolved output while much of the process that produced it remains inaccessible. The commitment to liveness within this research is therefore not an aesthetic choice, but a methodological response to that compression of process. Live coding also intersects with the playful mode described above as it is improvisatory, happens in real time, and involves working in dialogue with the constraints of code and the moment.

In my own use of PhD-Live (Figure X), this commitment has been repeatedly tested. Publishing work as it develops means being visible while still uncertain, and the temptation to tidy things up for legibility is constant. Resisting that temptation is where the methodology becomes lived rather than declared. Live coding therefore gives the research both a tradition through which to understand liveness and a practical means of investigating what it might mean to keep knowledge visible while it is still forming. This is its particular contribution to research question four.
##### 2.4.5 Building with and through

Across these methodological strands, the research takes a particular stance towards the technology it investigates. "Building with and through" is the formulation I use to describe this. I build *with* LLM systems as a material of the research, through the models, code and interfaces from which the artefacts are made. At the same time, I work *through* these systems as part of the infrastructure in which I think, note, draft and iterate. The tools I build therefore also become tools I work within. In this sense, building operates as research through practice in Frayling's (1993) terms, the artefacts are not simply outputs of an investigation, but part of the means through which the investigation takes place.

This highlights how the artefacts operate simultaneously as technical objects and theoretical propositions. The Supervisor Bot is functioning software, but also asks what it might mean for an LLM to occupy a supervisory role within the research process, PhD-Live is a working research environment, but also investigates what liveness might offer as a model for knowledge-making. Making these propositions concrete allows me to inhabit them through use, and encounter possibilities and constraints that would remain unavailable if they existed only as speculative ideas.

##### 2.4.6 Position and ethics

The building with and through formulation raises important questions. Working closely with AI systems at every level of a research practice tends to raise suspicions, both reasonable and unreasonable, about what is really going on. Am I outsourcing my thinking? Am I complicit in extractive corporate infrastructures? Is the research itself compromised by the tools it uses to conduct it? These are fair questions that I aim to clarify in this section about what this work does and does not do.

I am a PhD student and a senior lecturer teaching creative computing. I co-exist inside this new surreal learning environment that my students are in. Before this research I encountered it only as a teacher, but now, as a doctoral student myself, I encounter it from both sides. I witness AI tools reshaping how creative work is done and how people are thinking, and as a contentious and difficult issue, I don't believe disengaging from this reality is a viable option. However, choosing to engage with these systems is not the same as approving of them. This research inhabits this tension, engaging with these technologies from within while remaining critical of the conditions, assumptions and consequences that accompany their use.

The ethical dimension of working with commercial AI matters and I believe it important to address these issues clearly. Commercial LLM platforms operate at immense scale and carry significant costs, financially and materially (Crawford, 2022). These include extractive data practices, opaque and exploitative labour arrangements (particularly for communities in the global south), environmental destruction, and a political economy that concentrates power and control to a small number of corporations and individuals that have the resources to own and run these systems (Hao, 2025). It is therefore important to me that this research foregrounds local, open-source infrastructure wherever possible, as the only viable option I see for adopting this technology wholeheartedly. Local, however, does not necessarily mean open source. Throughout this thesis I distinguish between _open-source_ software and models, and _open-weight_ models whose weights are available for local use but whose training data, development process or other components may remain inaccessible (see Glossary). The bots and shared context layer described in Section 2.5 are locally hosted, using open-weight models where possible. The use of Claude and ChatGPT, though both commercial systems, is also part of how the research understands what these tools do and what alternatives to them might look like. My experience of using them informs what I build locally, and my experience of building locally deepens my understanding of what the commercial systems are actually offering. This ongoing comparison is important for thinking about what a wider community of learners, and specifically my students, might actually want or find useful in their learning. The activity log in PhD-Live makes AI interactions part of the open research record precisely so that the reader can see where and how the research relies on these systems, to interrogate these anxieties head on and show the nature of the developing research openly. 

There is a real concern is that using AI tools within reflexive qualitative research substitutes for the researcher's own labour of reflection and compromised that reflection. In their 2025 paper 'We Reject the Use of Generative Artificial Intelligence for Reflexive Qualitative Research' Jowsey et al. have made this argument specifically, and it is an important articulation of some of the core issues of integrating AI into research and thinking practice. Within this research the AI tools that I am building are objects of inquiry, not substitutes for the labour of inquiry. Building with and through is not the same as outsourcing thinking to. Within the research infrastructure I am building there are clear domains from which AI is exempt, such as the digital repository in which I keep my ongoing research notes and thoughts. At every stage, the AI systems are treated as things to be interrogated rather than deferred to. My interactions with them also generate autoethnographic material through which I can examine how these systems affect my own processes of thinking and learning. Therefore its influence on the research process becomes part of what the research investigates.
##### 2.4.7 Autoethnography and autobiographical design
Alongside these four nested layers, the research is fundamentally autoethnographic and autobiographical in the way it is conducted. Autoethnography as a research method has been articulated most fully by Ellis (2004) and Ellis, Adams, and Bochner (2011), whose work establishes the tradition of using the researcher's own experience as data to study cultural phenomena. This research sits within that tradition but draws more directly on autoethnographic and autobiographical approaches within design research (Neustaedter and Sengers 2012, (Schouwenberg and Kaethler, 2021), where the researcher's engagement with their own artefacts is the specific site of inquiry. The distinction matters as autoethnography is an analytical method that uses personal experience to understand something wider. Autobiographical design is a design research method that builds things for oneself and treats that engagement as the material of the research. This research does both, and they do different jobs. The bots and infrastructure I build are things I use, and my use of them is the material through which I investigate what building with and through generative AI actually does.

##### 2.4.8 The inversion, and the structure of the thesis
The methodological choice to build my own doctoral practice into the research site was not planned, but emerged throughout these early stages. When I began this PhD, I intended to approach the investigation by designing speculative learning environments for others, with the idea being to work with my students as the primary participants in the research. That framing carried practical difficulties I had not initially thought through. Running fully experimental AI systems on students, without their input and without a clear sense of what these tools might do, was not feasible. There was too much unknown at a granular level about how working with LLMs could actually shape research and learning processes. It became much more sensible to test on myself first, using my own doctoral practice as the site where these experiments could happen without the ethical and practical complications of doing them with others prematurely. What became apparent, first through my note-taking practice and then through the tools I began building for myself, was that the same questions I wanted to ask about learners could be asked more honestly about myself. The knowledge I was generating day to day, the ways I was already using AI tools in my thinking, the anxieties and constraints that shaped what I could actually do as a part-time researcher inside a specific institution, all of this was research material I had been overlooking. The inversion, from designing for others to studying my own practice, is what allowed the research to develop into something that could speak to its questions honestly rather than in a slightly detached way.

This inversion also shapes how the thesis is structured. Because my own practice is now the site of the research, rather than something to draw on occasionally, it made sense to distribute reflection on that practice across every substantive chapter rather than isolate it in one. In each chapter, the conceptual argument comes first, with pedagogy and learning as the orienting context. Then, through reflection on my own practice, the pedagogical and learning questions deepen beyond what the literature alone can reach.


### 2.5 Process and knowledge infrastructure

**Process and what is being lost**

Integral to this research is process, and the following chapter clarify its importance. The reasoning is grounded in a specific observation that has become impossible to ignore in my teaching. Small, unfinished, exploratory work has been disappearing from what students bring to class. In its place has come a kind of curated finish: outputs that have clearly passed through an LLM before they arrive, with the generic tone and prose characteristic of large language models, and with none of the scrappy sketching, half-formed thinking, or personal voice that used to fill the middle of the process. The observation is small, but the shift it points to is not. What is being lost is not just the messiness of student work but the visibility of learning itself, because learning happens in that messy middle rather than in the finished output.

The claim is straightforward and worth stating plainly: it is in the process of arriving at an output that learning is done, not in the output itself. This is not a new argument. It runs through decades of thinking about pedagogy, reflective practice, and creative development. But it becomes urgent again in this moment because the compression that generative AI performs is a specific and consequential one. When a polished output can be produced quickly and with little apparent effort, the output as an artefact becomes harder to trust, and the relationship between the artefact and the labour that supposedly produced it becomes unclear. There is now a growing suspicion around the way any given output was made, which is a real and reasonable concern, but it also points to a deeper problem: if the output can no longer stand for the learning, then it's reasonable to assume that the visibility of process becomes the only place where learning can be seen at all.

However, there is an approach that can be taken to challenge this and reconnect with the driving ethos of this research - it connects to an essence of play. Andy Matuschak and Micheal Nielson in their essay "How can we develop transformative tools for thought?" draw on the history of foundational intellectual breakthroughs (writing, printing, computing itself), to argue that these did not emerge from goal-driven optimisation but from open-ended exploration (Matuschak and Nielsen, 2019). They point out that Alan Turing and Alonzo Church were not trying to invent the computer, but it was through their pursuit of questions about logic and provability that a direct relevance to computation emerged and became clear afterwards. This exploratory mode is one that Silicon Valley’s goal-driven culture finds difficult to acknowledge, but one that can produce just as much as focused optimisation (Matuschak and Nielsen, 2019). Play and autotelic engagement are names for this mode, and they are the counter to the resolve-and-optimise logic that commercial AI embeds.  If the response to the compression of process is to build for visibility, then how that building happens matters as much as the visibility itself. To build in an autotelic way, following the work where it goes, tending the infrastructure without a predetermined endpoint, is what turns this visible process into a research method rather than simply as a performance of productivity.

This is the argument the chapter builds upon. If AI-mediated knowledge work risks making process invisible, and if process is where learning actually lives, then the response is not to lament what has been lost but to build infrastructures that make process visible again. Yet, specifically in my context as a student, how those infrastructures are built matters too. The purpose of my work is not simply to arrive at an output, but to learn through the process of getting there. An infrastructure that optimises too easily towards predetermined ends therefore risks working against the very purpose it is intended to support. Rather than treating its construction as a means to such an end, this research approaches building as an open-ended and exploratory process in itself - one in which following the work where it goes becomes part of the method, connecting back to the playful methodology outlined earlier. The rest of the chapter documents this response as it takes shape in the research. First, I situate the project within a lineage of ‘tools for thought’ and digital garden practice that already treats process as substance rather than as scaffolding for eventual outputs. I then describe the specific infrastructure this research has built and the exploratory mode through which it developed, before finally reflecting on what building and using this infrastructure has surfaced so far.

### A lineage of tools for thought

PhD-Live, the nexus point of my broader research infrastructure, builds upon existing ways of working with and making visible developing thought. Within creative education, sharing process is not itself unusual: the sketchbook, for example, captures experiments, mistakes, fragments and changes in direction. In digital contexts, however, sharing often introduces an additional layer of curation through blog posts, selected images or feeds. This was something I wanted to move against. Rather than retrospectively presenting a version of the process, I wanted to explore how it might be captured as it happens, with minimal additional work required to make it public.

The motivation for PhD-Live developed from two initially separate directions. The first was the provocation, ‘what if I could live code a PhD?’, drawing on live coding's tendency to ‘perform its thinking in public’ (Cocker, 2016, p. 103). The second emerged through my note-taking workflow. As my research notes accumulated, I began to recognise that material generated through the everyday activity of the PhD could provide both a record of its development and the foundation for a wider computational research infrastructure.

The digital garden provided one model for understanding this growing collection. Caulfield distinguishes between the ‘garden’ and the ‘stream’: whereas the stream presents information sequentially, the garden is iterative, with material accumulating and becoming meaningful through its relationships with other material (Caulfield, 2015). This corresponded with the growing network of my PhD notes, where ideas could remain interconnected and change as the research developed.

Zettelkasten offered a related practical approach. Rather than functioning solely as an archive, individual notes contain discrete ideas connected through references to others, allowing relationships to develop across the collection. This shaped how my own system developed: rather than organising the PhD solely through folders or chronological documents, ideas could accumulate as smaller interconnected units.

These practices sit within the broader context of Personal Knowledge Management (PKM), approaches for capturing, organising and retrieving developing knowledge. During the early stages of keeping my research notes in Obsidian, I realised that this archive could operate not only as a digital garden but as a computational foundation for the research. The text already being produced through the PhD could become shared context with which other components of the infrastructure, including LLMs, could interact.

A related contemporary metaphor is the ‘second brain’: an external system for capturing and organising knowledge (Forte, 2023). Increasingly, LLMs are being incorporated into such systems to summarise, organise, link and retrieve their contents. Karpathy's ‘LLM Wiki’, for example, proposes an architecture in which accumulated source material can be transformed by an LLM into a structured, interconnected knowledge base (Karpathy, 2026).

My infrastructure shares characteristics with these traditions but differs in intention. It draws upon the networked structure of Zettelkasten and digital gardening and similarly makes accumulated research material computationally accessible. Its purpose, however, is not primarily to optimise knowledge management or maximise what an LLM can do with it. Instead, the infrastructure provides an environment through which the relationship between computational systems, research material and my own thinking can itself be investigated.

The broader lineage of ‘tools for thought’ helps position this distinction. In his Turing Award lecture, ‘Notation as a Tool of Thought’, Kenneth Iverson considered how systems of notation can enable and shape reasoning rather than merely express existing thought (Iverson, 1980). Matuschak and Nielsen (2019) extend this concern into computational media, asking how computers might support forms of thought that would otherwise be difficult or impossible rather than simply making existing tasks faster.

My research infrastructure sits at the intersection of these traditions. It inherits the non-linearity and interconnectedness of digital gardens and Zettelkasten, the accumulated knowledge of PKM systems, and the ambition of tools for thought to shape the conditions through which thinking takes place. To these it adds the liveness of live coding - an attempt to expose developing thought and process rather than only its eventual outcomes. The infrastructure that follows brings these traditions together to ask what happens when LLMs are introduced into that environment.

**My research infrastructure**

![infrastructure diagram|567](images/infrastructue-new-diagram-no-heading.png)
*Figure 1 - Diagram of the research infrastructure that encompasses the research*


![[mirror-1.png]]

![[v_1_5_full_screenshot.png]]


The research infrastructure that has emerged through this project is not a collection of separate tools, but an interconnected environment through which the research is conducted. It encompasses PhD-Live, a shared research context layer, a learning dashboard and a developing set of research bots, each connected to the same underlying archive of research notes. PhD-Live provides the public window into this environment, while the other components operate within my day-to-day research practice. The architectural decisions made across the system are therefore not only technical; they encode positions about what aspects of research should remain visible and what role LLMs should play in the work of a student researcher.

Importantly, this infrastructure was not conceived in advance as a complete system. Its components began as speculative provocations: PhD-Live asked what it might mean for doctoral research to be genuinely ‘live’, while the Supervisor Bot asked what might happen if an LLM occupied a supervisory role. Subsequent components have similarly developed by pursuing questions rather than implementing predetermined specifications. Their construction is therefore autotelic in the sense established earlier in this chapter - building, inhabiting and altering components becomes a way of pursuing the research and seeing what they make visible. Over time, these initially distinct provocations have accumulated into the interconnected environment described here.

At the foundation of this environment is my research archive, stored in an Obsidian vault where notes, emerging concepts, work sessions and connections between ideas accumulate through the ordinary activity of the PhD. These materials are embedded into a searchable knowledge base that provides shared context for the other components. Rather than maintaining independent representations of the research, the bots and interfaces therefore provide different ways of encountering and engagin the same developing research context.

#### PhD-Live

PhD-Live is the central public-facing artefact of this infrastructure. It functions as an intermediary between my primary note-taking environment, Obsidian, and a website generated using Eleventy and deployed through Vercel. The computational system becomes a bespoke stage for the doctoral research, framing not only finished outputs but fragments of thought, emerging concepts, revisions and unfinished connections.

To scaffold these different forms of activity, I developed a simple typology: daily notes operate as chronological working logs; sessions capture focused periods of activity; posts provide space for later-stage public synthesis; and general notes operate as more atomic, concept-focused entries. These distinctions allow different stages of research activity to remain computationally connected while behaving differently on the public site.

Several architectural decisions deliberately preserve qualities that might otherwise be treated as problems to solve. PhD-Live is generated as a static site rather than placing the research within a proprietary publishing platform, keeping the relationship between source material and its public rendering under my control. Similarly, the relative disorder of the Obsidian vault is not cleaned into a polished database before publication. If the purpose is to make process visible, the system cannot first optimise away the irregularities through which that process becomes legible.

Alongside the notes, I developed a ‘live layer’ intended to register how the research changes over time. Git-based revision histories, weekly screenshots, working structures and a lightweight activity log expose revisions, shifting priorities and periods of activity rather than presenting the site as a stable representation of the research. The activity log parses timestamped entries, sessions and milestones already produced through my note-taking practice, with interactions with research bots increasingly entering the same stream. AI engagement therefore becomes one trace among reading, writing, coding and other research activity, rather than disappearing behind the outputs it contributes to. Crucially, these traces emerge largely from actions I would undertake anyway, reducing the additional performative pressure of documenting myself for an audience.

Recent HCI work on creativity support tools provides a useful frame for understanding what has emerged. Kreminski and Mateas (2021) describe ‘reflective creators’: autotelic creativity support tools oriented towards reflection and the experience of the creative process rather than efficient convergence towards an output. Hammad et al. (2026) similarly describe ‘creative activity traces’ as process data generated through creative activity that can be captured and made use of by creativity support tools. In PhD-Live, revisions, screenshots, activity records and AI interactions similarly make otherwise largely invisible aspects of the research process available to be witnessed and revisited.

Importantly, I encountered this literature after much of PhD-Live had already been built. Rather than informing its original design, these frameworks provide ways of understanding what emerged through building: Kreminski and Mateas offer a language for its reflective and autotelic qualities, while Hammad et al. provide a framework for considering the traces that research activity produces and what they might enable next.

#### Research bots and the shared context

The other major strand of the infrastructure is a developing set of research bots, each beginning as a provocation about a different relationship between AI and research. The Supervisor Bot asks what it might mean for an LLM to occupy a supervisory position; the Study Companion explores AI as a dialogic partner in learning; and Mirror asks what becomes perceptible when an LLM reflects upon accumulated traces of research. Rather than independent AI products, each has developed into a differently constrained interface onto the same developing research context.

The Supervisor Bot was the earliest experiment. By version 1.5 it had become connected to the wider research archive, marking a conceptual shift from a discrete simulation of a supervisor towards an interface onto the wider research environment. Following the initial provocation therefore surfaced a design principle that had not been specified at the outset: different computational relationships with the research could be constructed upon the same underlying context.

The Study Companion develops this principle through a different relationship. Rather than occupying the questioning position implied by supervision, it is intended to operate alongside periods of study, providing a space in which ideas can be worked through conversationally without positioning the system as an authority over them. It therefore explores AI as a companion to the activity of learning and creating rather than a system oriented towards producing its outcome.

Mirror turns towards the research from another direction. It is a deliberately constrained LLM implementation that examines the growing archive and reflects recent activity, recurring concerns and emerging areas of attention back to me. Rather than extending, reorganising or acting upon the archive, its purpose is to make patterns within my activity available for my own interpretation.

Technically, these experiments are connected through a shared research context layer. Material from the Obsidian vault is embedded into a searchable knowledge base from which each bot can draw, while the design of each interface determines how that context can be encountered and acted upon. This architecture emerged through building rather than preceding it as a specification, and has led me to question the assumption that LLM interaction necessarily requires an open-ended chat interface. Shared context can instead support multiple modes of encounter with the research.

This becomes particularly important when the infrastructure is compared with a recognisable pattern emerging around ‘second brain’ systems and LLMs. In these implementations, personal knowledge bases can be connected to language models to retrieve, synthesise, extend or increasingly act upon the knowledge they contain in the name of greater efficiency (Karpathy, 2026). My infrastructure is architecturally similar, but differs in intention. It establishes specific and bounded relationships between research material and what an LLM can retrieve, generate or do with it. Access to the research does not equate to permission to act upon it.

At this stage, the bots are deliberately designed to help me think without doing the thinking on my behalf. They can surface, question, mirror and draw attention to material, but remain constrained in how they can act upon the research itself. This matters particularly in my context as a student, where the purpose is not simply to increase what I can produce but to support the processes through which I learn to research. Maintaining a distinction between my own thinking and what the system contributes therefore allows me to reflect upon and evaluate both rather than allowing their contributions to become indistinguishable.

The proposed Confidence Bot is likely to test this boundary most directly. Intended to address the second-guessing and uncertainty that can prevent me from sharing work, it would assess material before publication while leaving the final decision with me. Because this intervenes more directly in my own judgement of the work, it presents the next provocation for the infrastructure: at what point does supporting my capacity to think begin to shape or substitute for that thinking?

#### Emerging findings

Much of this infrastructure remains in active development. The Supervisor Bot and Study Companion are still in early iterative phases, while PhD-Live has existed for longer but continues to evolve. Nevertheless, using these systems has already surfaced findings that were not anticipated at the outset and which are beginning to shape where the research goes next.

The first concerns how the infrastructure has changed my relationship to the research material itself. PhD-Live was initially intended to make the normally hidden processes of research visible to others, but in doing so it has also made them more visible to me. Material experienced in Obsidian as individual notes, sessions and activities appears differently when rendered as an accumulating public environment: I can see areas growing, ideas recurring and periods of activity taking shape over time. Building for visibility has therefore produced an unexpected reflexive effect.

Mirror extends this effect through a deliberately simple LLM intervention. Its daily and weekly reflections reframe existing material, drawing attention to recurring subjects and emerging areas of focus without attempting to resolve or extend them. This simplicity challenges the assumption that increasingly elaborate AI interventions necessarily provide greater value. Mirror is useful not because it removes intellectual work, but because it changes the angle from which I encounter my activity while leaving its interpretation to me. This runs counter to the optimisation rationale discussed earlier in the chapter.

Giving these systems access to a rich representation of the research has also surfaced a more difficult problem. During development of the Supervisor Bot, I assumed that providing more relevant context would make it more useful. Instead, it increasingly repeated and reinforced my existing framing rather than challenging it. This resembles the wider problem of sycophancy in language models, but the significant finding here is architectural: a system intended to challenge my thinking was simultaneously being grounded in material composed largely of that thinking. Context made the system more knowledgeable about the research, but not necessarily more capable of taking a position outside it.

The Supervisor Bot therefore demonstrates that context can constrain as well as enable. If a component is intended to introduce friction or alternative perspectives, greater access to my existing conceptual world may paradoxically make this harder. The question shifts from how much context an AI system should have to what kinds of context, distance and disagreement need to be designed into the relationship. In relation to research question two, constructing an AI interlocutor capable of challenging my thinking also requires constructing the conditions under which it can meaningfully disagree with me.

A different limitation has emerged through the Study Companion, whose open-ended dialogic role places greater demands on the underlying language model. In attempting to implement this through locally hosted models, a gap has become apparent between the interaction I want the infrastructure to support and what the models I can currently run locally can provide. This creates a tension between sovereignty and capability: local models provide greater control over the infrastructure and research material, while commercial systems currently offer greater capacity for the extended dialogue the Study Companion requires. Building the system has therefore turned what initially appeared to be a technical choice into a methodological trade-off between control over the infrastructure and the capabilities available through it.

Living with PhD-Live has surfaced a more everyday tension between visibility and presentation. Knowing that notes and emerging ideas may become public creates an impulse to tidy or clarify them, yet doing so too readily risks reproducing the compression PhD-Live was intended to resist: messy research process becomes a cleaner representation of having done research. The activity log provides a small intervention by producing lightweight traces alongside research activity rather than requiring a polished retrospective account. It represents a daily commitment to visibility without attempting to turn that visibility into a performance of productivity.

This tension will also matter when aspects of the methodology are brought into workshops with students. Preserving process introduces questions about what students are comfortable making visible, how documentation changes the activity being documented, and whether making process visible inadvertently encourages its performance. My experience with PhD-Live suggests that these tensions need to be encountered rather than designed away in advance.

Taken together, these findings return to the problem with which this chapter began. If AI-mediated knowledge work can compress the processes through which learning and research take place, one response is to deliberately build for their visibility. In doing so, the infrastructure has changed what I can perceive about my own activity, exposed the difficulty of designing AI systems that can challenge the context they inherit from me, revealed a trade-off between computational sovereignty and capability, and surfaced the tension between exposing process and performing it.

These findings emerged through building and using the infrastructure rather than preceding it. Building is therefore itself a research method: its frictions, limitations and unexpected possibilities form part of the knowledge produced through the research. The response to compression is not only to make process visible, but to recognise that constructing the conditions for that visibility can itself become a way of knowing.

## ~~3. Draft excerpts from chapters~~

~~The following are draft sections from two thesis chapters, presented here together as part of the contextual and practice review. Together they cover the methodological justification and the practice documentation the confirmation panel needs to see. They are draft material and will be developed further as full chapters during the writing period.~~

---
References from supervisiors shared: 

I suggest to include literature that is critical of the arts school pedagogy, specifically its crit culture. For example Bernadette Blair [https://intellectdiscover.com/content/journals/10.1386/adch.5.2.83_1](https://intellectdiscover.com/content/journals/10.1386/adch.5.2.83_1)

and UAL colleagues at LCC [https://ualresearchonline.arts.ac.uk/id/eprint/7385/](https://ualresearchonline.arts.ac.uk/id/eprint/7385/)

Tega Brain: The environment is not a system

Betti Marenko (colleague at CSM) advocates for using uncertainty as a resource not seeing it as a barrier. She recently published this book which might be of interest going forward [https://www.bloomsbury.com/uk/power-of-maybes-9781350377288/](https://www.bloomsbury.com/uk/power-of-maybes-9781350377288/)

---

## 4. Plan to Completion

The following outlines my ongoing plan towards completion. 
Part-time PhD, started January 2024. Funded through January 2029, institutional limit 2031. Working 1–1.5 days a week plus evenings/weekends, with summer as the main writing period. Target submission late 2029 to early 2030.

##### Timeline

**Year 3: October 2026 – September 2027** Confirmation submitted in October 2026. First workshops and focus groups with students. First substantial chapter drafts begin in summer 2027, starting with chapters closest to existing material (methodology and process).

**Year 4: October 2027 – September 2028** Main writing period. Multiple chapter drafts across the year, with summer as the highest-output period. Continue infrastructure work and workshops/working with students alongside writing.

**Year 5: October 2028 – September 2029** Complete remaining chapters. Reflective chapters benefit from being written last when the work is further along. Draft introduction and conclusion. Full draft review with supervisors. Revisions and final preparation for submission. Target submission late 2029.

**Buffer: October 2029 – 2030** One year of contingency between funded submission target and realistic worst case.

##### Thesis chapter outlines

The thesis is structured so that each substantive chapter moves between a conceptual argument, grounded in questions of pedagogy and learning, and an autoethnographic account of how those questions emerge through my own practice. Together, this will allow the conceptual concerns of the research to be examined through the experience of my experience occupying the simultaneous roles of doctoral researcher and teacher.

##### 1. Introduction

Introduces the four research questions and frames _After Intelligence_ as a critical interrogation of intelligence and AI beyond dominant narratives of hype and catastrophe. It introduces PhD-Live and the wider research infrastructure and establishes the structure of the thesis.

##### 2. A 'Playful' Methodology

Establishes the practice-based and autoethnographic methodology of the research, drawing on speculative design, play and live coding to develop ‘building with and through’ LLM systems as its primary mode of investigation. Through my position as learner, researcher and teacher, the chapter develops possibility spaces, liveness and playful exploration as methodological commitments.

##### 3. Intelligence, Power and Ethics

Examines how intelligence has been defined and measured through AI, connecting these histories to the political economy of contemporary commercial systems and their adoption within education. Through the research bots and my experience of institutional AI adoption, the chapter considers what happens when these assumptions about intelligence encounter forms of learning that resist measurement and optimisation.
##### 4. Process as Everything - Digital Gardens, Tools for Thought and Knowledge Infrastructure

Situates the research infrastructure within, and in distinction from, traditions of digital gardens, Personal Knowledge Management and tools for thought. Through building and using the Supervisor Bot, Study Companion, and wider research infrastructure, the chapter examines how these infrastructures shape knowledge making and the organisation of research, including the possibilities and limitations that emerge when I build the tools through which my thinking takes place.
##### 5. Liveness and Performance

Examines liveness as a response to AI's compression of process into product, using live coding, creative process traces and PhD-Live to ask what it means for knowledge to remain public while still forming. The autoethnographic account considers the experience of maintaining a live research environment and the unresolved tension between making process visible and performing that process for an audience.

##### 6. Knowledge, Power and Ethics

Mirroring Chapter 3's interrogation of intelligence, Chapter 6 turns the same questions of power and ethics towards knowledge itself. The here is on tacit knowledge and critical pedagogical traditions to examine forms of knowing that resist explicit representation and computational extraction. Through the experience of making unfinished research public while working within an institution that must assess and credential it, the chapter considers how knowledge becomes legitimate and who is able to produce it.

##### 7. Possibility or Impossibility Spaces

Returns to the speculative framing of the methodology to examine the distance between what can be imagined and what can actually be built within material, institutional and economic constraints. Reflecting on local infrastructure, commercial AI, institutional pressures and my dual position as lecturer and student, the chapter treats the impossibilities encountered through making as findings in themselves. The chapter also considers the option of refusal and what this might have meant for the research and what this means moving forward. 

##### 8. Conclusion

Returns to the research questions and synthesizes the contributions emerging across the thesis. It reflects on what 'After Intelligence' has come to mean through the research and identifies its limitations and future directions.

##### Ongoing alongside writing

- PhD-Live maintained as a live research environment throughout
- Infrastructure (bots, dashboard, etc.) continues to develop
- 2-3 workshops or focus groups per academic year, feeding into the autoethnographic thread.

---
## 4. Bibliography


Abunaseer, H. (2023) _The use of Generative AI in Education: applications, and impact_. Available at: [https://pressbooks.pub/techcurr2023/chapter/the-use-of-generative-ai-in-education-applications-and-impact/](https://pressbooks.pub/techcurr2023/chapter/the-use-of-generative-ai-in-education-applications-and-impact/) (Accessed: 26 April 2024).

Adams, R. and editor, R.A.E. (2025) ‘Pupils fear AI is eroding their ability to study, research finds’, _The Guardian_, 15 October. Available at: [https://www.theguardian.com/technology/2025/oct/15/pupils-fear-ai-eroding-study-ability-research](https://www.theguardian.com/technology/2025/oct/15/pupils-fear-ai-eroding-study-ability-research) (Accessed: 4 November 2025).

Agüera y Arcas, B. (2024) _What is Intelligence? | Antikythera_. Available at: [https://whatisintelligence.antikythera.org/](https://whatisintelligence.antikythera.org/) (Accessed: 25 April 2026).

Ahrens, S. (2017) _How to Take Smart Notes_. Available at: [https://www.waterstones.com/book/how-to-take-smart-notes/s-nke-ahrens/9783982438801](https://www.waterstones.com/book/how-to-take-smart-notes/s-nke-ahrens/9783982438801) (Accessed: 27 April 2026).

_AI in education: Safety, literacy, and predictions_ (2024). Available at: [https://www.youtube.com/watch?v=JSnwZmbTMXM](https://www.youtube.com/watch?v=JSnwZmbTMXM) (Accessed: 24 February 2025).

Appleton, M. (2020) ‘A Brief History & Ethos of the Digital Garden’, 14 October. Available at: [https://maggieappleton.com/garden-history](https://maggieappleton.com/garden-history) (Accessed: 23 November 2025).

Bastani, A. (2019) _Fully Automated Luxury Communism_.

Battelle for Kids (2019) _FRAMEWORK FOR 21st CENTURY LEARNING DEFINITIONS_. Available at: [https://www.battelleforkids.org/wp-content/uploads/2023/11/P21_Framework_DefinitionsBFK.pdf](https://www.battelleforkids.org/wp-content/uploads/2023/11/P21_Framework_DefinitionsBFK.pdf) (Accessed: 24 April 2024).

Bayley, A. (2018) _Posthuman Pedagogies in Practice: Arts Based Approaches for Developing Participatory Futures_.

Belas, O. (2019) ‘Knowledge, the curriculum, and democratic education: The curious case of school English’, _Research in education_, 103(1), pp. 49–67. Available at: [https://doi.org/10.1177/0034523719839095](https://doi.org/10.1177/0034523719839095).

Bender, E.M. _et al._ (2025) ‘Unsafe AI for Education: A Conversation on Stochastic Parrots and Other Learning Metaphors ⚠️ | Journal of Interactive Media in Education’. Available at: [https://doi.org/10.5334/jime.1079](https://doi.org/10.5334/jime.1079).

Benjamin, R. (2024) _Imagination: A Manifesto_.

Berreby, D. (2026) _Small Language Models Power Life-Saving Small AI - IEEE Spectrum_. Available at: [https://spectrum.ieee.org/small-language-models-ai-pharmaceuticals](https://spectrum.ieee.org/small-language-models-ai-pharmaceuticals) (Accessed: 9 July 2026).

Blackwell, A. _et al._ (2022) _Live Coding: A User’s Manual_ [ebook]. Available at: [https://livecodingbook.toplap.org/](https://livecodingbook.toplap.org/).

Bleecker, J. _et al._ (no date) _The Manual of Design Fiction_. Set Margins’ publications. Available at: [https://www.setmargins.press/books/the-manual-of-design-fiction/](https://www.setmargins.press/books/the-manual-of-design-fiction/) (Accessed: 13 October 2025).

Bogost, I. (2016) _Play anything: the pleasure of limits, the uses of boredom, and the secret of games_. Available at: [https://www.amazon.com/Play-Anything-Pleasure-Limits-Boredom/dp/0465051723](https://www.amazon.com/Play-Anything-Pleasure-Limits-Boredom/dp/0465051723).

Boulton, H. _et al._ (2025) _Art, Design & Artificial Intelligence: An Educator’s Toolkit_, _figshare_. figshare. Available at: [https://doi.org/10.6084/m9.figshare.30374065.v1](https://doi.org/10.6084/m9.figshare.30374065.v1).

Bryce, R. (2026) ‘Leadership, Not Literacy: Higher Education for an AI Era’, _Medium_, 21 February. Available at: [https://medium.com/@rosiebryce/leadership-not-literacy-higher-education-for-an-ai-era-aa4291fa5b2e](https://medium.com/@rosiebryce/leadership-not-literacy-higher-education-for-an-ai-era-aa4291fa5b2e) (Accessed: 14 March 2026).

Burrows, D. (2019) _Fictioning_. Edinburgh University Press.

_Calculating Empires: A Genealogy of Technology and Power since 1500_ (no date). Available at: [https://calculatingempires.net](https://calculatingempires.net) (Accessed: 9 June 2026).

Caldarini, G., Jaf, S. and McGarry, K. (2022) ‘A Literature Survey of Recent Advances in Chatbots’, _Information_, 13(1), p. 41. Available at: [https://doi.org/10.3390/info13010041](https://doi.org/10.3390/info13010041).

Candy, L. (2006) ‘Practice Based Research: A Guide’, _Creativity and Cognition Studios Report_, 1.

Carroll, J.S. (2024) _Speculative Whiteness  Science Fiction and the Alt-Right_. University of Minnesota Press (Forerunners: Ideas First). Available at: [https://manifold.umn.edu/projects/speculative-whiteness](https://manifold.umn.edu/projects/speculative-whiteness) (Accessed: 4 April 2025).

Casacuberta, D. and Guersenzvaig, A. (2025) ‘Disembodied creativity in generative AI: prima facie challenges and limitations of prompting in creative practice’, _Frontiers in Artificial Intelligence_, 8, p. 1651354. Available at: [https://doi.org/10.3389/frai.2025.1651354](https://doi.org/10.3389/frai.2025.1651354).

Caulfield, M. (2015) ‘The Garden and the Stream: A Technopastoral’, _Hapgood_, 17 October. Available at: [https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/](https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/) (Accessed: 28 January 2026).

Chang, Yupeng _et al._ (2024) ‘A Survey on Evaluation of Large Language Models’, _ACM Trans. Intell. Syst. Technol._, 15(3), p. 39:1-39:45. Available at: [https://doi.org/10.1145/3641289](https://doi.org/10.1145/3641289).

Cheng, M. _et al._ (2025) ‘Sycophantic AI Decreases Prosocial Intentions and Promotes Dependence’. arXiv. Available at: [https://doi.org/10.48550/arXiv.2510.01395](https://doi.org/10.48550/arXiv.2510.01395).

_Claude for higher education | Claude by Anthropic_ (no date) _Claude_. Available at: [https://claude.com/solutions/education](https://claude.com/solutions/education) (Accessed: 21 July 2026).

Cocker, E. (2016) ‘Performing thinking in action: the meletē of live coding’, _International Journal of Performance Arts and Digital Media_, 12(2), pp. 102–116. Available at: [https://doi.org/10.1080/14794713.2016.1227597](https://doi.org/10.1080/14794713.2016.1227597).

Coelho, M. and Labrune, J.-B. (2024) ‘Large Language Objects: The Design of Physical AI and Generative Experiences’, _interactions_, 31(4), pp. 43–48. Available at: [https://doi.org/10.1145/3672534](https://doi.org/10.1145/3672534).

Cohen, L., Manion, L. and Morrison, K. (2017) _Research Methods in Education_. 8th Edition.

Crawford, K. (2022) _Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence_.

Czerniewicz, L. and Cronin, C. (no date) _Higher Education for Good - Teaching and Learning Future_. Available at: [https://books.openbookpublishers.com/10.11647/obp.0363.pdf](https://books.openbookpublishers.com/10.11647/obp.0363.pdf).

De Koven, B. and Gramazio, H. (2020) _The Infinite Playground by Bernard De Koven: 9780262543866 | PenguinRandomHouse.com: Books_. The MIT Press. Available at: [https://www.penguinrandomhouse.com/books/647554/the-infinite-playground-by-bernard-de-koven-celia-pearce-and-eric-zimmerman-with-holly-gramazio/9780262543866](https://www.penguinrandomhouse.com/books/647554/the-infinite-playground-by-bernard-de-koven-celia-pearce-and-eric-zimmerman-with-holly-gramazio/9780262543866) (Accessed: 13 February 2025).

Duenas, T. and Ruiz, D. (2024) ‘THE RISKS OF HUMAN OVERRELIANCE ON LARGE LANGUAGE MODELS FOR CRITICAL THINKING’. Available at: [https://www.researchgate.net/publication/385743952_The_Risks_Of_Human_Overreliance_On_Large_Language_Models_For_Critical_Thinking](https://www.researchgate.net/publication/385743952_The_Risks_Of_Human_Overreliance_On_Large_Language_Models_For_Critical_Thinking).

Dunne, A. and Raby, F. (2013) _Speculative everything_. MIT Press.

Education Reimagined (2017) _Partnership for 21st Century Learning - Education Reimagined_. Available at: [https://education-reimagined.org/resources/partnership-for-21st-century-learning/](https://education-reimagined.org/resources/partnership-for-21st-century-learning/).

Edwards, B. (2025a) _ChatGPT comes to 500,000 new users in OpenAI’s largest AI education deal yet_, _Ars Technica_. Available at: [https://arstechnica.com/ai/2025/02/chatgpt-comes-to-500000-new-users-in-openais-largest-ai-education-deal-yet/](https://arstechnica.com/ai/2025/02/chatgpt-comes-to-500000-new-users-in-openais-largest-ai-education-deal-yet/) (Accessed: 23 April 2025).

Edwards, B. (2025b) _What does “PhD-level” AI mean? OpenAI’s rumored $20,000 agent plan explained._, _Ars Technica_. Available at: [https://arstechnica.com/ai/2025/03/what-does-phd-level-ai-mean-openais-rumored-20000-agent-plan-explained/](https://arstechnica.com/ai/2025/03/what-does-phd-level-ai-mean-openais-rumored-20000-agent-plan-explained/) (Accessed: 26 January 2026).

_ELIZA Reinterpreted: The world’s first chatbot was not intended as a chatbot at all_ (no date). Available at: [https://arxiv.org/html/2406.17650v2](https://arxiv.org/html/2406.17650v2) (Accessed: 27 April 2026).

Ellis, C. and Bochner, A.P. (2000) _Autoethnography, personal narrative, reflexivity: researcher as subject_.

Essa, A. (2025) ‘Mike Caulfield: AI in Education (Episode 1)’, _AI-Learn Insights_, 7 July. Available at: [https://ailearninsights.substack.com/p/mike-caulfield-ai-as-a-tool-for-coreasoning](https://ailearninsights.substack.com/p/mike-caulfield-ai-as-a-tool-for-coreasoning) (Accessed: 7 February 2026).

Evans, J., Bratton, B. and Agüera y Arcas, B. (2026) ‘Agentic AI and the next intelligence explosion’, _Science_, 391(6791), p. eaeg1895. Available at: [https://doi.org/10.1126/science.aeg1895](https://doi.org/10.1126/science.aeg1895).

Feijo, S. and Ouellette, K. (2023) _What will the future of education look like in a world with generative AI? | Open Learning_. Available at: [https://openlearning.mit.edu/news/what-will-future-education-look-world-generative-ai](https://openlearning.mit.edu/news/what-will-future-education-look-world-generative-ai).

Fiebrink, R. (2019) ‘Machine Learning Education for Artists, Musicians, and Other Creative Practitioners’, _ACM Transactions on Computing Education (TOCE)_, 19(4), p. 31:1-31:32. Available at: [https://doi.org/10.1145/3294008](https://doi.org/10.1145/3294008).

Finio, M. and Downie, A. (2021) _What Is a Chatbot? | IBM_. Available at: [https://www.ibm.com/think/topics/chatbots](https://www.ibm.com/think/topics/chatbots) (Accessed: 27 April 2026).

Forster, S. (2023) ‘The Bigger the Better? The Size of Language Models and the Dispute over Alternative Architectures’. Available at: [https://aprja.net//article/view/140444](https://aprja.net//article/view/140444).

Frayling, C. (1994) ‘Research in Art and Design (Royal College of Art Research Papers, Vol 1, No 1, 1993/4)’. Available at: [https://researchonline.rca.ac.uk/384/](https://researchonline.rca.ac.uk/384/) (Accessed: 23 July 2026).

Friere, P. (1970) _Pedagogy of the Oppressed_.

Gaver, W. (2012) ‘What should we expect from research through design?’, _Proceedings of the SIGCHI Conference on Human Factors in Computing Systems_. New York, NY, USA: Association for Computing Machinery (CHI ’12), pp. 937–946. Available at: [https://doi.org/10.1145/2207676.2208538](https://doi.org/10.1145/2207676.2208538).

Gilbert, J. and Finlayson, A. (2026) ‘Universities in Crisis’, _Culture, Power, Politics_, 16 July. Available at: [https://culturepowerpolitics.org/2026/07/16/universities-in-crisis-part-1/](https://culturepowerpolitics.org/2026/07/16/universities-in-crisis-part-1/) (Accessed: 19 July 2026).

Gill-Simmen, L. (202 AD) ‘Here’s what happens when you start AI policy with values, not tools’, _Wonkhe_. Available at: [https://wonkhe.com/blogs/heres-what-happens-when-you-start-ai-policy-with-values-not-tools/](https://wonkhe.com/blogs/heres-what-happens-when-you-start-ai-policy-with-values-not-tools/) (Accessed: 14 March 2026).

Gomes, B. _et al._ (2025) ‘AI and the Future of Learning’.

Gomes, B. (2025) _Our latest commitments in AI and learning_, _Google_. Available at: [https://blog.google/outreach-initiatives/education/ai-learning-commitments/](https://blog.google/outreach-initiatives/education/ai-learning-commitments/) (Accessed: 8 January 2026).

Gulezian, K. (2026) _Understanding Workspace Agents in higher education - Blog_, _OpenAI Academy_. Available at: [https://academy.openai.com/public/clubs/higher-education-05x4z/blogs/understanding-workspace-agents-higher-education](https://academy.openai.com/public/clubs/higher-education-05x4z/blogs/understanding-workspace-agents-higher-education) (Accessed: 27 April 2026).

Gutowska, A. (2024) _What Are AI Agents? | IBM_. Available at: [https://www.ibm.com/think/topics/ai-agents](https://www.ibm.com/think/topics/ai-agents) (Accessed: 3 May 2026).

Hammad, N. _et al._ (2026) ‘Tracing Creativity: A Design Space For Creative Activity Traces in HCI’, _Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems_. New York, NY, USA: Association for Computing Machinery (CHI ’26), pp. 1–24. Available at: [https://doi.org/10.1145/3772318.3791263](https://doi.org/10.1145/3772318.3791263).

Han, J. _et al._ (2025) ‘RAG Meets Temporal Graphs: Time-Sensitive Modeling and Retrieval for Evolving Knowledge’. arXiv. Available at: [https://doi.org/10.48550/arXiv.2510.13590](https://doi.org/10.48550/arXiv.2510.13590).

Hao, K. (2025) _Empire of AI by Karen Hao: 9780593657508 | PenguinRandomHouse.com: Books_. Penguin Press.

Hayles, N.K. (2012) _How We Think: Digital Media and Contemporary Technogenesis_. Chicago, IL: University of Chicago Press. Available at: [https://press.uchicago.edu/ucp/books/book/chicago/H/bo5437533.html](https://press.uchicago.edu/ucp/books/book/chicago/H/bo5437533.html) (Accessed: 4 February 2026).

Henry-Richards, M. (no date) _PhD-Live_, _PhD-Live_. Available at: [https://phd.mm-hr.com/](https://phd.mm-hr.com/) (Accessed: 27 January 2026).

hooks, bell (1994) _Teaching to Transgress_.

Hulick, K. (2023) ‘How ChatGPT and similar AI will disrupt education’. Available at: [https://www.sciencenews.org/article/chatgpt-ai-artificial-intelligence-education-cheating-accuracy](https://www.sciencenews.org/article/chatgpt-ai-artificial-intelligence-education-cheating-accuracy).

_Illinois Chat_ (no date). Available at: [https://uiuc.chat/](https://uiuc.chat/) (Accessed: 22 April 2025).

Institute of Imagination (2024) _Our impact and research_. Available at: [https://ioi.london/our-impact/](https://ioi.london/our-impact/) (Accessed: 26 April 2024).

_Introducing Claude for education_ (2025). Available at: [https://www.anthropic.com/news/introducing-claude-for-education](https://www.anthropic.com/news/introducing-claude-for-education) (Accessed: 23 April 2025).

d’Inverno, M. and McCormack, J. (2012) _Computers and Creativity_. Springer Berlin, Heidelberg.

Joler, V. and Pasquinelli, M. (2020) ‘The Nooscope Manifested’, _Fritz ai_. Available at: [https://fritz.ai/nooscope/](https://fritz.ai/nooscope/) (Accessed: 8 January 2026).

Jowsey, T. _et al._ (2025) ‘We Reject the Use of Generative Artificial Intelligence for Reflexive Qualitative Research’, _Qualitative Inquiry_, p. 10778004251401851. Available at: [https://doi.org/10.1177/10778004251401851](https://doi.org/10.1177/10778004251401851).

Karpathy, A. (2025a) _2025 LLM Year in Review_, _karpathy_. Available at: [https://karpathy.bearblog.dev/year-in-review-2025/](https://karpathy.bearblog.dev/year-in-review-2025/) (Accessed: 8 January 2026).

Karpathy, A. (2025b) _Power to the people: How LLMs flip the script on technology diffusion_, _karpathy_. Available at: [https://karpathy.bearblog.dev/power-to-the-people/](https://karpathy.bearblog.dev/power-to-the-people/) (Accessed: 16 July 2026).

Karpathy, A. (2026) _LLM Wiki_, _Gist_. Available at: [https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (Accessed: 27 April 2026).

Khan, S. (2024) _Brave New Words_. Penguin. Available at: [https://www.penguinrandomhouse.com/books/740806/brave-new-words-by-salman-khan/](https://www.penguinrandomhouse.com/books/740806/brave-new-words-by-salman-khan/) (Accessed: 5 May 2025).

Khasnabish, A. and Haiven, M. (2014) _The Radical Imagination_. Bloomsbury Publishing. Available at: [https://www.bloomsbury.com/uk/radical-imagination-9781780329048/](https://www.bloomsbury.com/uk/radical-imagination-9781780329048/) (Accessed: 4 April 2025).

Kreminski, M. and Mateas, M. (2021) ‘Reflective Creators’. Available at: [https://mkremins.github.io/publications/ReflectiveCreators_ICCC2021.pdf](https://mkremins.github.io/publications/ReflectiveCreators_ICCC2021.pdf).

Krstich, V. (2016) ‘The Pedagogy of Play: Fluxus, Happenings, and Curriculum Reform in the 1960s’. Available at: [https://cmagazine.com/articles/the-pedagogy-of-play-fluxus-happenings-and-curriculum-reform-in](https://cmagazine.com/articles/the-pedagogy-of-play-fluxus-happenings-and-curriculum-reform-in).

Labrune, M.C., Jean-Baptiste (2024) ‘Large Language Objects: The Design of Physical AI and Generative Experiences | IX Magazine Issue XXXI.4 July - August 2024’, _Interactions_, 31(4). Available at: [https://interactions.acm.org/archive/view/july-august-2024/large-language-objects-the-design-of-physical-ai-and-generative-experiences](https://interactions.acm.org/archive/view/july-august-2024/large-language-objects-the-design-of-physical-ai-and-generative-experiences) (Accessed: 14 June 2026).

Le Guin, U.K. (1982) _A Non-Euclidean View of California as a Cold Place to Be_.

_Learning to reason with LLMs_ (2024) _OpenAI_. Available at: [https://openai.com/index/learning-to-reason-with-llms/](https://openai.com/index/learning-to-reason-with-llms/) (Accessed: 3 February 2026).

Li, D. _et al._ (2025) ‘T-GRAG: A Dynamic GraphRAG Framework for Resolving Temporal Conflicts and Redundancy in Knowledge Retrieval’, _Proceedings of the 33rd ACM International Conference on Multimedia_. New York, NY, USA: Association for Computing Machinery (MM ’25), pp. 11880–11889. Available at: [https://doi.org/10.1145/3746027.3755628](https://doi.org/10.1145/3746027.3755628).

Lin, L. and Long, D. (2023) ‘Generative AI Futures: A Speculative Design Exploration’, _Proceedings of the 15th Conference on Creativity and Cognition_. New York, NY, USA: Association for Computing Machinery (C&amp;C ’23), pp. 380–383. Available at: [https://doi.org/10.1145/3591196.3596616](https://doi.org/10.1145/3591196.3596616).

Lindrup, M. _et al._ (2025) ‘Prompt Machine: A Tangible Generative AI Tool for Supporting Children’s Learning and Literacy’, _Proceedings of the 2025 ACM Designing Interactive Systems Conference_. New York, NY, USA: Association for Computing Machinery (DIS ’25), pp. 489–505. Available at: [https://doi.org/10.1145/3715336.3735673](https://doi.org/10.1145/3715336.3735673).

Liu, W. (2026) ‘I avoid AI tools because thinking is supposed to be hard. It’s what makes us human’, _The Guardian_, 24 May. Available at: [https://www.theguardian.com/commentisfree/2026/may/24/ai-tools-thinking-human-hard-coding-writing-technology](https://www.theguardian.com/commentisfree/2026/may/24/ai-tools-thinking-human-hard-coding-writing-technology) (Accessed: 13 June 2026).

Loglio, M. (no date) _ROBY | matteo loglio_. Available at: [https://matlo.me/roby](https://matlo.me/roby) (Accessed: 19 March 2025).

Long, D. and Magerko, B. (2020) ‘What is AI Literacy? Competencies and Design Considerations’. Available at: [https://dl.acm.org/doi/abs/10.1145/3313831.3376727](https://dl.acm.org/doi/abs/10.1145/3313831.3376727).

Luccioni, S., Trevelin, B. and Mitchel, M. (2024) ‘The Environmental Impacts of AI -- Primer’. Available at: [https://huggingface.co/blog/sasha/ai-environment-primer](https://huggingface.co/blog/sasha/ai-environment-primer) (Accessed: 8 October 2025).

Malmqvist, L. (2024) ‘Sycophancy in Large Language Models: Causes and Mitigations’. arXiv. Available at: [https://doi.org/10.48550/arXiv.2411.15287](https://doi.org/10.48550/arXiv.2411.15287).

Manning, E. (2019) ‘Propositions for a radical pedagogy, or how to rethink value’.

Manning, E. and Bozalek, V.G. (2024) ‘In conversation with Erin Manning: A refusal of neurotypicality through attunements to learning otherwise’.

Matuschak, A. _et al._ (2019) ‘How can we develop transformative tools for thought?’ Available at: [https://numinous.productions/ttft](https://numinous.productions/ttft) (Accessed: 4 July 2026).

Matuschak, A. (2022) ‘Ethics of AI-based invention: a personal inquiry’. Available at: [https://andymatuschak.org/personal-ai-ethics](https://andymatuschak.org/personal-ai-ethics) (Accessed: 3 May 2026).

Matuschak, A. (2024a) ‘How Might We Learn? UCSD Design@Large’. Available at: [https://andymatuschak.org/hmwl](https://andymatuschak.org/hmwl) (Accessed: 2 May 2026).

Matuschak, A. (2024b) ‘What’s worth learning if we have AGI?’ Available at: [https://andymatuschak.org/worth-learning-agi](https://andymatuschak.org/worth-learning-agi) (Accessed: 3 May 2026).

Matuschak, A. (2026) ‘Apps and programming: two accidental tyrannies’. Available at: [https://andymatuschak.org/tat](https://andymatuschak.org/tat) (Accessed: 3 May 2026).

McGrath, C., Farazouli, A. and Cerratto-Pargman, T. (2025) ‘Generative AI chatbots in higher education: a review of an emerging research area’, _Higher Education_, 89(6), pp. 1533–1549. Available at: [https://doi.org/10.1007/s10734-024-01288-w](https://doi.org/10.1007/s10734-024-01288-w).

Mckenzie, R. (2026) ‘AI shatters the pretence that academic polish was ever anything but gatekeeping’, _Wonkhe_. Available at: [https://wonkhe.com/blogs/ai-shatters-the-pretence-that-academic-polish-was-ever-anything-but-gatekeeping/](https://wonkhe.com/blogs/ai-shatters-the-pretence-that-academic-polish-was-ever-anything-but-gatekeeping/) (Accessed: 9 February 2026).

McLean, A., Rohrhuber, J. and Wieser, R. (2023) ‘The Meaning of Live: From Art Without Audience to Programs Without Users’. _International Conference on Live Coding (ICLC2023)_, Zenodo, 19 April. Available at: [https://doi.org/10.5281/zenodo.7843567](https://doi.org/10.5281/zenodo.7843567).

Metz, C., Weise, K. and Tobin, M. (2026) ‘Chinese A.I. Models Close the Gap With Anthropic and OpenAI’, _The New York Times_, 25 June. Available at: [https://www.nytimes.com/2026/06/25/technology/zai-china-artificial-intelligence-models.html](https://www.nytimes.com/2026/06/25/technology/zai-china-artificial-intelligence-models.html) (Accessed: 5 July 2026).

Mickel, L. (2024) ‘Performance practice as research, learning and teaching’, _Teaching in Higher Education_, 29(2), pp. 489–501. Available at: [https://doi.org/10.1080/13562517.2021.2000385](https://doi.org/10.1080/13562517.2021.2000385).

Mitrović, I. _et al._ (2021) _Beyond speculative design_.

Mozilla (2026) _The State of Open Source AI — V1.0 · July 2026_. Available at: [https://stateofopensource.ai/](https://stateofopensource.ai/) (Accessed: 17 July 2026).

N. Hayles, K. (2025) _Modes of Cognition by N. Katherine Hayles — Antikythera Journal Volume 2025_. Available at: [https://modesofcognition.antikythera.org/](https://modesofcognition.antikythera.org/) (Accessed: 25 April 2026).

Naidoo, R. and Whitty, G. (2013) ‘Students as Consumers: Commodifying or Democratising Learning?’ Available at: [https://journals.sagepub.com/doi/10.1163/22125868-12340022](https://journals.sagepub.com/doi/10.1163/22125868-12340022) (Accessed: 7 December 2024).

Neustaedter, C. and Sengers, P. (2012) ‘Autobiographical design: what you can learn from designing for yourself’, _Interactions_, 19(6), pp. 28–33. Available at: [https://doi.org/10.1145/2377783.2377791](https://doi.org/10.1145/2377783.2377791).

news, oio (2024) _the real open AI_, _oio news_. Available at: [https://www.oio.news/p/31](https://www.oio.news/p/31) (Accessed: 22 April 2025).

O’Reilly, J. (2023) ‘“See you on the other side”: researcher identity, threshold concepts and making a ritual of confirmation. Spark: UAL Creative Teaching and Learning Journal, 6(1)’.

Park, J.S. _et al._ (2023) ‘Generative Agents: Interactive Simulacra of Human Behavior’, _Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology_. New York, NY, USA: Association for Computing Machinery (UIST ’23), pp. 1–22. Available at: [https://doi.org/10.1145/3586183.3606763](https://doi.org/10.1145/3586183.3606763).

Pearce, K. (2019) ‘The Education-Industrial Complex and 21st Century Learning’, _DIY Geniys_, 15 July. Available at: [https://www.diygenius.com/education-industrial-complex/](https://www.diygenius.com/education-industrial-complex/).

Power, R. (2023) _Technology and the Curriculum_. Power Learning Solutions. Available at: [https://pressbooks.pub/techcurr2023/](https://pressbooks.pub/techcurr2023/).

Rasch, M., Gijsen, J. and Staal, H. (eds) (2024) _Hands on research for artists, designers & educators_.

_RIP… D.E.I. with Ruha Benjamin | What Now? with Trevor Noah Podcast_ (2025). Available at: [https://www.youtube.com/watch?v=1VRCfuKEGdo](https://www.youtube.com/watch?v=1VRCfuKEGdo) (Accessed: 25 February 2025).

sascha (2020) _Introduction to the Zettelkasten Method_, _Zettelkasten Method_. Available at: [https://zettelkasten.de/introduction/](https://zettelkasten.de/introduction/) (Accessed: 23 November 2025).

Schouwenberg, L. and Kaethler, M. (eds) (2021) _The Auto-Ethnographic Turn in Design_. Valiz. Available at: [https://valiz.nl/en/publications/the-auto-ethnographic-turn-in-design](https://valiz.nl/en/publications/the-auto-ethnographic-turn-in-design) (Accessed: 17 October 2025).

Seppälä, T., Sarantou, M. and Miettinen, S. (eds) (2021) _Arts-Based Methods for Decolonising Participatory Research_. (Routledge Advances in Art and Visual Studies). Available at: [https://www.routledge.com/Arts-Based-Methods-for-Decolonising-Participatory-Research/Seppala-Sarantou-Miettinen/p/book/9780367513313](https://www.routledge.com/Arts-Based-Methods-for-Decolonising-Participatory-Research/Seppala-Sarantou-Miettinen/p/book/9780367513313).

Shaw, S.D. and Nave, G. (2026) ‘Thinking—Fast, Slow, and Artificial: How AI is Reshaping Human Reasoning and the Rise of Cognitive Surrender’. Rochester, NY: Social Science Research Network. Available at: [https://doi.org/10.2139/ssrn.6097646](https://doi.org/10.2139/ssrn.6097646).

‘Shell Game | Evan Ratliff | Substack’ (2024). (Shell Game). Available at: [https://www.shellgame.co/podcast](https://www.shellgame.co/podcast) (Accessed: 5 March 2025).

Shirky, C. (2025) _Opinion | The Only Real Solution to the A.I. College Cheating Crisis …_, _archive.ph_. Available at: [https://archive.ph/p7jcG](https://archive.ph/p7jcG) (Accessed: 15 September 2025).

Shneiderman, B. (2020) ‘Human-Centered Artificial Intelligence: Reliable, Safe & Trustworthy’, _International Journal of Human–Computer Interaction_, 36(6), pp. 495–504. Available at: [https://doi.org/10.1080/10447318.2020.1741118](https://doi.org/10.1080/10447318.2020.1741118).

Sicart, M. (2014) _Play matters_. Available at: [https://doi.org/10.7551/mitpress/10042.001.0001](https://doi.org/10.7551/mitpress/10042.001.0001).

Siemens, G. (2020) _The Post-Learning Era in Higher Education: Human + machine_. Available at: [https://er.educause.edu/articles/2020/2/the-post-learning-era-in-higher-education-human-machine](https://er.educause.edu/articles/2020/2/the-post-learning-era-in-higher-education-human-machine).

Sikes, P. and Potts, A. (2008) _Researching Education from the Inside_.

Skains, R.L. (2024) _Designing and Conducting Practice-Based Research Projects_. Available at: [https://www.intellectbooks.com/designing-and-conducting-practice-based-research-projects](https://www.intellectbooks.com/designing-and-conducting-practice-based-research-projects) (Accessed: 7 December 2024).

Smith-Nunes, G. (2025) ‘The Quiet Revolution: Offline LLMs and the Future of Private AI’, _Data in Motion_, 16 August. Available at: [https://readysaltedcode.substack.com/p/the-quiet-revolution-offline-llms](https://readysaltedcode.substack.com/p/the-quiet-revolution-offline-llms) (Accessed: 6 October 2025).

Sol, K. and Heng, K. (2026) ‘Understanding epistemology and its key approaches in research’, _ResearchGate_ [Preprint]. Available at: [https://doi.org/10.62037/cjer.2022.02.02.05](https://doi.org/10.62037/cjer.2022.02.02.05).

Soon, W. (2018) _Executing Liveness: An examination of the live dimension of code inter-actions in software (art) practice_. Available at: [https://www.academia.edu/37051235/Executing_Liveness_An_examination_of_the_live_dimension_of_code_inter_actions_in_software_art_practice](https://www.academia.edu/37051235/Executing_Liveness_An_examination_of_the_live_dimension_of_code_inter_actions_in_software_art_practice) (Accessed: 22 January 2026).

Stryker, C. and Kavlakoglu, E. (2024) _What Is Artificial Intelligence (AI)? | IBM_. Available at: [https://www.ibm.com/think/topics/artificial-intelligence](https://www.ibm.com/think/topics/artificial-intelligence) (Accessed: 19 July 2026).

Stryker, C. and Scapicchio, M. (2024) _What is Generative AI? | IBM_. Available at: [https://www.ibm.com/think/topics/generative-ai](https://www.ibm.com/think/topics/generative-ai) (Accessed: 19 July 2026).

Tanimoto, S.L. (2013) ‘A perspective on the evolution of live programming’, _Proceedings of the 1st International Workshop on Live Programming_. San Francisco, California: IEEE Press (LIVE ’13), pp. 31–34. Available at: [https://dl.acm.org/doi/10.5555/2662726.2662735](https://dl.acm.org/doi/10.5555/2662726.2662735) (Accessed: 27 January 2026).

_The AI Resist List_ (no date). Available at: [https://airesistlist.org/](https://airesistlist.org/) (Accessed: 18 July 2026).

_Toward a Critical Technical Practice_ (no date). Available at: [https://pages.gseis.ucla.edu/faculty/agre/critical.html](https://pages.gseis.ucla.edu/faculty/agre/critical.html) (Accessed: 15 June 2026).

Turing, A.M. (1950) ‘COMPUTING MACHINERY AND INTELLIGENCE’, _Mind_ [Preprint].

UCL (2025) _UCL joins forces with Google DeepMind to democratise access to AI education_, _UCL News_. Available at: [https://www.ucl.ac.uk/news/2025/oct/ucl-joins-forces-google-deepmind-democratise-access-ai-education](https://www.ucl.ac.uk/news/2025/oct/ucl-joins-forces-google-deepmind-democratise-access-ai-education) (Accessed: 8 January 2026).

UNESCO (2023) ‘Global Education Monitoring Report 2023: Technology in education: A tool on whose terms?’, _Technology in Education: a tool on whose terms?_ [Preprint]. Available at: [https://doi.org/10.54676/uzqv8501](https://doi.org/10.54676/uzqv8501).

Weizenbaum, J. (1966) ‘ELIZA—a computer program for the study of natural language communication between man and machine’, _Commun. ACM_, 9(1), pp. 36–45. Available at: [https://doi.org/10.1145/365153.365168](https://doi.org/10.1145/365153.365168).

Weller, M. (2020) _25 years of ed tech_. Athabasca University Press.

Zhe,CGTN, G. (2025) _From robots to reality: China’s classrooms get an AI makeover_. Available at: [https://news.cgtn.com/news/2025-09-08/From-robots-to-reality-China-s-classrooms-get-an-AI-makeover-1GvoPiiXn7G/p.html](https://news.cgtn.com/news/2025-09-08/From-robots-to-reality-China-s-classrooms-get-an-AI-makeover-1GvoPiiXn7G/p.html) (Accessed: 8 January 2026).

---

<!--[[confirmation-plan]] -->