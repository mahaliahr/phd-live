---
dg-publish: true
date-created: 2026-05-10
visibility: public
tags: []
type: ""
---
# liveness system

## what it is

PhD-Live has a liveness layer -- a set of features that signal whether research is actively happening, what is being worked on, and how recently the site has been updated. This is distinct from the content of the site itself. Where notes and revision history show *what* has been thought, the liveness system shows *when* and *whether* thinking is happening now.

The system currently has three components: a status indicator (livebar), an activity feed (live column), and an implicit recency signal derived from the last git commit. These are partially implemented and not yet fully connected to each other.

## why it exists

Liveness is a central concept in this research. In performance studies, liveness refers to the co-presence of performer and audience in time -- the sense that something is happening now, that the outcome is not yet determined. PhD-Live asks whether research practice can have this quality: whether making the process of thinking visible as it unfolds changes what it means to do research publicly.

The liveness system is the most direct technical expression of this question. It is not decorative. The livebar is not just a status indicator -- it is an argument that the state of being-in-research is worth making visible, that the boundary between working and not-working is meaningful information for a reader.

This also connects to questions of labour and presence in academic work. Research happens in time, in sessions, with rhythms of intensity and rest. Most academic publishing renders this invisible. PhD-Live tries to make it legible.

## how it currently works

**Livebar** (`src/site/_includes/components/livebar.njk`, `src/site/assets/js/live-widget.js`)

The livebar displays a pulsing dot and status text indicating whether a session is active. It reads from a data source that is updated when notes are pushed to the repository. The limitation is that it is only as accurate as the last git push -- if a session starts in Obsidian but the vault hasn't been pushed, the livebar won't reflect it.

**Live column**

The live column surfaces recent activity on the site -- recently updated notes, today's stream lines, current session information. It is driven by the same push-based mechanism as the livebar.

**Recency**

The last commit timestamp is available as an implicit signal of how recently the site was updated. This is not yet surfaced explicitly as a UI element but is present in the underlying data.

## known limitations

The core limitation of the current implementation is that liveness is **push-dependent**. The site updates when notes are committed and pushed to git, not when writing actually happens. This creates a gap between actual research activity and what the site signals -- a session can be underway for an hour before the livebar reflects it, if the vault hasn't been pushed.

This is a meaningful limitation not just technically but conceptually. A liveness system that only updates on manual triggers is not really live -- it is a retrospective record dressed as presence.

## the intended architecture

The push-dependent limitation points toward a different architecture. The learning dashboard (in development) is intended to become the control layer for liveness -- a separate interface for starting and stopping sessions, logging activity, and updating live status independently of Obsidian pushes.

A physical button is also part of the intended design: a deliberate, tactile gesture that signals the transition from private thinking to active research session. This literalises the concept of going live -- making the boundary between working and not-working a physical act rather than an accidental side effect of git push behaviour.

In this intended architecture:

- **Obsidian** handles long-form writing and note-taking
- **Dashboard** handles session control and live status
- **Physical button** triggers session start/stop as a deliberate gesture
- **PhD-Live** reflects the current state derived from all of the above

## connection to the research

The gap between the current implementation and the intended architecture is itself research material. Building a system that tries to be live and repeatedly encounters the limits of what liveness means in a static site context is generative. The technical constraints are not just problems to solve -- they are evidence about what liveness actually requires, and what it costs.

The liveness system is probably the feature of PhD-Live most directly connected to the theoretical framing of the research. It is worth continuing to document its evolution -- both the technical decisions and the conceptual ones -- as the dashboard is built and the physical button is realised.