---
dg-publish: true
date-created: 2026-04-21
visibility: public
tags: []
type: ""
---
Testing v1.5 in practice has surfaced how difficult ambient conversational AI actually is. 

In fact the functionality is quite bad - part of me wants to pivot already and build something that does not try to be so anthropomorphic, however as an exercise and a design probe, I think that I should push this a little further first and see the limit of what I can do (then pivot).

[add a note here about prompt engineering and how 'stupid' the LLM inherently is.... this is good to experience!]

Below are some notes here for reference and future development.

## why it's hard (conversation)

The bot works from transcribed chunks of a multi-person conversation with no understanding of turn-taking, speaker identity, or cues. Human listeners use timing, intonation, and eye contact to know when to speak, but obviously the bot has none of this. Most LLMs are also trained for turn-based dialogue, not opportunistic interjection into ongoing conversation.

## things that would help (v2 priorities)

**speaker diarization** — pyannote.audio would identify who is speaking and track when speaker turns end, giving the bot something more meaningful to respond to than arbitrary chunk boundaries. Probably the single highest-impact improvement available.

**voice activity detection** — Silero VAD would replace fixed-length snippets with utterance-based recording, triggering on natural pauses rather than a timer. Planned for v2.

**prompt framing** — framing the bot as an "overhearer" rather than a participant may produce better calibrated responses. could be worth experimenting with: "You are an overhearer, not a primary participant. You only speak when you have something genuinely worth adding."

## resources to look at

- **pyannote.audio** — speaker diarization, open source, runs locally
- **Silero VAD** — lightweight voice activity detection
- **Speechbrain** — broader open source toolkit including diarization, VAD, overlapping speech detection
- **backchanneling literature** (linguistics) — how humans signal listening and decide when to interject; useful theoretical grounding
- **LLM-as-judge papers** — growing body of work on using LLMs to evaluate conversational appropriateness, adjacent to the decision gate logic
- **Daily.co / Livekit** — real-time audio pipeline frameworks if the architecture ever moves beyond whisper.cpp chunks

## how this feeds into the research more broadly

This gap between what the bot can do and what a human participant does naturally is where interesting questions arise — about what supervision requires, what presence means, what genuine listening involves. The bot's failures are as legible as its successes for my broader questioning

