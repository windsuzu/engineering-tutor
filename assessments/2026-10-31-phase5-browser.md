# Phase5 browser: tasks and queued microtasks

Answered and completed 2026-10-31. Skill `fe.browser`. Original review due October27.

## Recovery provenance and limits

Recovered on 2026-11-02 from the learner-supplied cross-session handoff after managed execution failed. Dates below are the original response dates in Asia/Taipei, not the recovery date. Scenario descriptions are reconstructions from that handoff; exact original prompt wording is unavailable. Learner responses are preserved verbatim. The recorded score preserves the prior tutor's provisional scoped evaluation; it is not a certification or a new assessment during recovery. No dependency installation, learner implementation test, runtime execution or fresh documentation verification is claimed.

## Case and assumptions

The synchronous script logs `open`, schedules `setTimeout(timer, 0)`, queues a fulfilled Promise `.then(promise)`, calls `queueMicrotask(queued)`, then synchronously logs `close`. The focused task is the console order under this stipulated browser scheduling case.

## Actual learner responses

### Q1 — output order

```text
open, close, promise, queued, timer
```

### Display preference — ungraded

```text
also, the review occurrence, new learning waste too many output token. hide them or only show the minimize status bar is okay.
```

## Assistance and evidence

The output order was independently correct: synchronous work completes before the queued Promise and explicit microtasks, which precede the timer callback in the supplied case. No browser test occurred. The second response is a presentation preference, not graded evidence or an extra completed occurrence.

## Final evaluation

Conceptual understanding: **3/4**. Independent scoped scheduling success; this does not establish all event-loop edge cases or practical testing skill.

Implementation correctness, edge-case handling, testing quality and trade-off explanation were not newly assessed. Existing older evidence remains in [mastery](../progress/mastery.json). Review scheduling is reconciled with [the queue](../reviews/queue.json); dates reconstructed during recovery must be identified there rather than described as previously persisted facts.
