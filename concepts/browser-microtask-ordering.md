# Browser microtask ordering

## Summary

For a script like this baseline trace, synchronous code finishes first. Promise reaction callbacks and queueMicrotask callbacks join the microtask queue in enqueue order. A callback added during another microtask goes to the tail, behind already-queued callbacks. Microtasks drain before the next task, such as the timer callback in this trace.

## Explanation and example

In Q6, the script logs A and F and schedules C and E as microtasks. C logs and schedules D. The remaining queue is E, D, not D, E. After it drains, the timer logs B. Result: A, F, C, E, D, B.

Promises and queueMicrotask do not form separate priority queues in this scenario. Nesting a callback does not give it priority over already-queued callbacks. A zero-delay timer schedules deferred work; it does not interrupt the running script or skip the microtask checkpoint.

## Applications and edge cases

Use queue reasoning to explain asynchronous callback ordering and batching. Scheduling too many microtasks can delay other tasks and rendering because newly-added microtasks also drain at the checkpoint. This simplified trace does not determine when the browser actually paints, and it does not establish Node-specific scheduling behavior.

## Common misconceptions

- Running newly-enqueued nested microtasks immediately, ahead of the existing queue.
- Treating Promise reactions as universally higher priority than queueMicrotask callbacks.
- Treating setTimeout(..., 0) as synchronous or as a precise execution deadline.

## Source and version context

[MDN: Using microtasks](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide), accessed 2026-10-04. Browser platform behavior; no framework version required. Source metadata is in ../sources/2026-10-04-frontend-baseline.md. This snippet has not been executed during grading; the explanation is based on verified documentation.

## Personal evidence

Assessment: ../assessments/2026-10-04-baseline-frontend.md, Q6. Learner predicted A, F, C, D, E, B: synchronous placement and timer position correct, nested queue ordering incorrect. Conceptual score 2 for this trace only.
Q6b follow-up: correct W, X, Z, Y immediately after explanation. Clarified that Y is enqueued while X runs, behind already-queued Z. This supports corrected understanding but is not delayed retention.
Remaining gaps: fresh independent transfer, broader browser internals and practical performance diagnosis unassessed.
Next review: 2026-10-05; fe.browser in ../reviews/queue.json.
