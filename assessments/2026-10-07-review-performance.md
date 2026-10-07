# Performance review: repeated layout

Date: 2026-10-07 (Asia/Taipei)
Skill: fe.performance
Status: completed on 2026-10-08; guided learning, needs practice.
Reason: overdue review from 2026-10-05; fresh diagnosis and verification scenario.
Duration: 5–10 minutes. Pseudocode accepted; reasoning exercise, no measured application trace or tests performed.
Objectives: connect geometry access and DOM writes to layout evidence; propose and verify a focused change.
Prerequisites: DOM styles, element geometry, browser rendering.

## Q1

A resize handler aligns 200 cards to a container width:
```js
for (const card of cards) {
  card.style.width = `${container.offsetWidth}px`;
}
```
Assume all cards are inside the container, its layout can depend on their widths, and each width write invalidates layout. A supplied hypothetical trace shows repeated Layout events inside the loop and little React rendering work. Intended behavior: all cards use the container width measured at the beginning of this handler.

Explain a likely cause of repeated Layout events. Suggest a small change matching the intended behavior (pseudocode is fine). Name a before/after measurement to determine whether the change helped.

Response and grading pending. No solution supplied before attempt.
Proposed review: 2026-10-10 on independent success, otherwise 1–3 days after feedback. Existing queue unchanged while pending.

## Verified reference

Avoid large, complex layouts and layout thrashing — Google web.dev; https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing ; accessed 2026-10-07; publication/update dates not recorded in this assessment. Browser DOM/rendering guidance, no React-specific version required. Useful for layout invalidation, forced layout and batching geometry reads/writes. Established engineering guidance. Trace numbers/events in the question are hypothetical, not observations from the tutor application.

## Initial attempt

Learner response (verbatim):
> 1. changing the width by resize the window
> 2. dont render all card DOM at once, only render the cards in user viewport
> 3. use chrome devtool to see the layout performnace

Evidence: identifies resize trigger, proposes virtualization and browser layout inspection. These are relevant but do not yet explain repeated synchronous layout inside one handler or propose the small change requested. Measurement plan needs a specific comparison. No final grade assigned.

Progressive hint: examine the read of container.offsetWidth and write of card.style.width on each iteration. Given intended initial-width snapshot, ask whether width can be read once before loop; ask which Layout metric to compare under equivalent resize interactions. Full solution withheld.

## October 8 teaching request

Learner response (verbatim):
> cannot fully understand the question, please explain eli5 in detail.

Switch from assessment to guided explanation. Explain container/card, layout, geometry reads versus width writes, repeated read/write recalculation, initial-width snapshot and before/after layout duration with a two-card example. Full small fix may now be shown after attempted answer and explicit explanation request. No new score; assessment remains pending. Source Google web.dev reverified 2026-10-08. No browser trace or code check performed.

## Explanation and correction check — October 8

Tutor explained layout as size/position calculation, geometry reads versus style writes and repeated forced layout after invalidating writes. Showed reading container.offsetWidth once at the beginning of each handler, then reusing width for all cards. Explained comparing Layout event count and total duration for equivalent resize interactions and checking visual correctness. Virtualization addresses mounted DOM size separately. No benchmark or code execution performed.

Learner response (verbatim):
> reuse the saved number.

Correct immediate recognition of the revised code. Conceptual understanding: 2/4, scoped to this review: initially identified resize trigger, virtualization and Chrome inspection, but repeated read/write cause and focused fix required explicit explanation. Correct immediate follow-up supports guided understanding, not independent delayed retention. Question comprehension difficulty and unfamiliar terminology are not separately penalized. Implementation correctness, edge-case handling, testing quality and trade-off explanation remain unassessed.

Source metadata: Google web.dev article authored by Jeremy Wagner, Paul Lewis and Barry Pollard; published 2015-03-20, updated 2025-05-07, accessed 2026-10-08. Established browser rendering guidance.

Next review: 2026-10-10, a fresh read/write sequencing scenario. Next recommended topic: SQL aggregate/join review due 2026-10-08.
