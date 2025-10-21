---
dg-publish: true
title: Conversation
permalink: /notes/conversation/
visibility: public
description: "1. ~~input capture\n\t- ~~text based input\n\t\t- ~~shared doc\n\t\t- ~~use webhook service to capture data and send to LLM\n\t- voice based input (speech to text tools)\n"
updated: '2025-10-20T22:34:14.436Z'
---
1. ~~input capture
	- ~~text based input
		- ~~shared doc
		- ~~use [[webhook]] service to capture data and send to LLM
	- voice based input (speech to text tools)
		- [[whisper-stt]] 
		- [[vosk-stt]]
		- [[deepspeech-stt]] (no longer actively supported, but could fine-tune)
	- storing inputs
		- Use a local database (e.g., SQLite or PostgreSQL) to log conversations.
		- Implement a timestamped message queue to track dialogue progression
2. processing 
3. user interface

Real time interjections and interactions
[[voice-activity-detection]] (VAD)

[speaker-diarisation]
