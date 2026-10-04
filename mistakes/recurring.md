# Recurring misconceptions

Observed gaps from the in-progress frontend baseline are recorded below. No recurring pattern has yet been established.

Record a first observed misconception as a candidate; call it recurring only after it appears in at least two distinct attempts. Do not turn syntax lookups, tool setup problems or accidental slips into conceptual weaknesses without evidence.

## Record format

For each real observation, record:
- Stable mistake ID and linked skill IDs.
- Status: candidate, recurring, improving or resolved.
- The learner's actual claim or behavior, with assessment path and question ID.
- First and latest observation dates; dated occurrence history.
- Why it is a conceptual mistake and the corrected mental model.
- Hint or correction provided and the learner's follow-up response.
- Related concept note and review item IDs.
- Evidence from fresh independent attempts supporting improvement or resolution.

Preserve earlier occurrences and corrections when updating status. A successful immediate correction is useful evidence but does not establish delayed retention.

## async-request-identity-001

- Skill: fe.react.
- Status: improving; one misconception occurrence, not recurring. Immediate correction and guided pseudocode revisions support improvement; delayed retention is unverified.
- First/latest observation: 2026-10-04 (Asia/Taipei).
- Evidence: assessments/2026-10-04-baseline-frontend.md, Q1c. Learner said an older Ada response replacing a newer Ada response has "nothing wrong" and proposed comparing profile equality.
- Gap: matching user identity or comparing data equality does not establish request currency; outdated differing data can overwrite newer data.
- Correction: distinguish user identity from request instance identity. Only still-current work may change result or error state; invalidation must also account for unmount. Equality can skip redundant updates but does not resolve freshness.
- Follow-up: Q1d answered correctly on 2026-10-04 after correction: preserve A2; obsolete failures may be logged without changing the current UI. Implementation and independent delayed performance remain pending.
- Review item: review-fe-react-2026-10-04; due 2026-10-05 with a fresh scenario.
- Concept note: concepts/async-request-validity.md; original corrections preserved in the assessment record.
- Occurrence history: 2026-10-04, Q1c, first observation.
- Resolution evidence: successful immediate correction check (Q1d) and Q2 attempt 3 using a unique token and cleanup invalidation, with prior guidance. Remains open until fresh independent evidence confirms the correction.

## client-abort-boundary-001

- Skill: fe.react (scope: cancellation versus request-validity reasoning).
- Status: candidate; one occurrence, not recurring.
- First/latest observation: 2026-10-04.
- Evidence: assessments/2026-10-04-baseline-frontend.md, Q4: learner said abort means "we don't need to worry about this kind of race condition".
- Gap: cancellation is support/timing-dependent and does not replace state-validity rules or guarantee remote write rollback.
- Correction: distinguish client cancellation, current UI state eligibility and durable operation outcomes.
- Follow-up: Q4b correctly recognizes possible server-side success and proposes status retrieval after correction. Tutor clarified automatic reconciliation versus forced refresh. Independent transfer remains unverified.
- Concept: concepts/async-request-validity.md.
- Review item: review-fe-react-2026-10-04, due 2026-10-05; include a fresh cancellation-boundary probe.
- Occurrence history: 2026-10-04, Q4, first observation.
- Resolution evidence: successful immediate Q4b correction check with guidance; keep candidate open for delayed review.

## microtask-fifo-001

- Skill: fe.browser.
- Status: candidate; one occurrence, not recurring.
- First/latest observation: 2026-10-04.
- Evidence: assessments/2026-10-04-baseline-frontend.md, Q6; predicted D before E when C enqueues D behind an existing E.
- Gap: nested microtasks are appended to the queue, not executed ahead of already-queued microtasks.
- Correction: trace the queue as [C, E], then [E, D] after C runs.
- Follow-up: Q6b correct order W, X, Z, Y after FIFO explanation. Clarified Y is enqueued during X behind Z, not after Z completes. Fresh delayed review due 2026-10-05.
- Concept: concepts/browser-microtask-ordering.md.
- Review item: review-fe-browser-2026-10-04.
- Occurrence history: 2026-10-04, Q6, first observation.
- Resolution evidence: Q6b correct immediate follow-up after guidance; independent retention still unverified.

## aria-modal-behavior-001

- Skill: fe.accessibility.
- Status: candidate; one occurrence, not recurring.
- First/latest observation: 2026-10-04.
- Evidence: assessments/2026-10-04-baseline-frontend.md, Q7. Current response describes expected input/Close navigation and Escape closure but does not distinguish them from implemented behavior. Record correction: the earlier claim that the learner overlooked input focusability is not supported by the current response and is superseded.
- Gap: dialog ARIA semantics do not implement keyboard/focus management; expected behavior must be distinguished from actual code behavior.
- Correction: separate semantics from implemented focus placement, modal tab containment, Escape handling, background inertness and restoration.
- Follow-up: Q7b correctly distinguishes tab escape without management and names the opener as intended return target. Clarified modal wrapping and explicit restoration; independent implementation pending.
- Concept: concepts/modal-keyboard-focus.md.
- Review: review-fe-accessibility-2026-10-04, due 2026-10-05.
- Occurrence history: 2026-10-04, Q7, first observation.
- Resolution evidence: none yet.
