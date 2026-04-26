---
dg-publish: true
date-created: 2026-04-20
visibility: public
tags: []
type: ""
---
~~when it seemingly picks up nothing from what its heard it just says something completely irrelevant, with statements that don't connect.  I would prefer it didn't do that ~~ 

^ changing the model fixed this. 

- I kind of don't like the way it just says statements, it doesn't feel that conversational. But this is a very simple build logic at the moment, so that is probably why. It will be interesting to actually test this in the supervisor meeting setting to see what value it may or may not produce

- features/things that I would like to add: 
	- summary of the meeting converstation at end?
	- summary of its feedback at the end?
	- when it is 'thinking' it stops processing what I am saying which is kind of annoying. Once again this is because of the level of complexity of the build at present
	- it would be good to get some kind of variation in the way that it responds, a lot of "wow, it sounds like..." 
	- as the conversation progresses can it have that in context?
	- seems to get some words very wrong, what can I do to mitigate this
- minor
	- instead of whole page scrolling, fixed with scroll

interface sketch following some testing:
![sketch](images/20260420_173548.jpg)


responses that I kind of liked from testing: 
![screenshot1](images/v_1_5_test_1.png)![screenshot1](images/v_1_5_test_2.png)