# Phase 2 browser review: async update and timer callback

Date:October25. Skill:fe.browser. Session review3/3, originally dueOctober17. Status:completed; timer/microtask ordering needed correction. No actual browser run.

## Situation

A browser script schedules several callbacks while starting an async operation. Logs make their execution order visible. The goal is to distinguish synchronous work, fulfilled-promise continuation, explicit microtask and timer callback.

```text
One script -> schedule timer
           -> invoke async function
           -> schedule peer microtask
           -> finish script
```

## Code

```js
console.log('start');

setTimeout(() => console.log('timer'), 0);

(async () => {
  console.log('inside');
  await Promise.resolve();
  console.log('resumed');
})();

queueMicrotask(() => console.log('peer'));
console.log('end');
```

## Assumptions and task

Modern browser, one initial script task, already-fulfilled Promise.resolve, no other code/handlers/logs. Timer is ordinary setTimeout0; no exact wall-clock timing is requested. Snippet unexecuted, no measured output or timing. Prior pre-await/FIFO successes and corrections preserved in history.

Q1: What is the complete order of the six logged words? A short ordered list is enough.

Response:pending. No synchronous/microtask/timer priority answer or output supplied before attempt. Follow with enqueue/timer reasoning after actual response. Existing stage1 applies to previous narrow await/FIFO review; no new score or date before evidence.

## Sources and limits

Previously recorded WHATWG/TC39 event-loop and Promise source context in [browser concept](../concepts/browser-microtask-ordering.md). No new live retrieval or actual browser/Node test claimed. This is a fresh timer-added transfer, no universal exact timer-duration promise. No practical browser/learner-test mastery inferred.

## Q1 actual response

Learner response (verbatim):

```text
start, inside, end,
timer, resumed, peer
```

Correct independent synchronous prefix and continuation-before-peer relation, but timer placed before already-queued microtasks. Preserve prior pre-await progress separately from new timer/checkpoint gap. Tutor-run Node.js execution of exact snippet printed start/inside/end/resumed/peer/timer, exit0. This is an illustrative Node result for this shared standard pattern, not a browser trace, exact elapsed-time measurement or learner test.

Tutor hint: after this initial script finishes, queued microtasks drain before moving to the timer's task. Fulfilled await continuation and queueMicrotask peer belong to that microtask queue; setTimeout0 schedules a later task, not an inline callback or a globally earlier callback just because scheduled first. Scope is this fulfilled-promise case, not a universal promise that pending async work always precedes timers. Do not disclose complete runtime output in chat before the corrective attempt.

## Q2 — Order the remaining callbacks

Keep correct prefix start/inside/end. Given the stated two queues and supplied snippet, what order should the remaining resumed, peer and timer words have?

Response:pending. One guided scheduling correction after rule hint; no complete remaining output supplied before attempt. No independent delayed mastery, final grade/date or new-unit completion inferred. Bars2/3 reviews,new0/1 remain.

## Q2 actual response

Learner response (verbatim):

```text
resumed, peer, timer
```

Correct after checkpoint hint. Complete order start/inside/end/resumed/peer/timer. Guided correction, not independent delayed retention. Earlier tutor Node execution verifies illustration, not browser/learner tests.

## Final evaluation

Conceptual2/4 for combined synchronous/fulfilled-await/peer/timer trace. Pre-await prefix and resumed-before-peer correct independently; timer placement needed checkpoint teaching. Earlier independent await/FIFO progress preserved, not erased. Other dimensions unassessed: no browser app/learner tests or broad scheduling proof. Outcome needs_practice, stage0,nextOctober27(two days); broad browser developing. No lateness penalty. Selected reviews3/3 complete; only planned first DevOps unit remains.
