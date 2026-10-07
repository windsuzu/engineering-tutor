# Browser microtask review — 2026-10-07

Skill: fe.browser. Queue item: review-fe-browser-2026-10-04.
Status: completed; successful narrow conceptual review. Originally due 2026-10-05; overdue is not failure.
Estimated duration: 5 minutes. Goal: trace enqueue order with a Promise chain and a nested microtask, using a fresh example.

## Question

Assume an ordinary browser script with no other callbacks relevant to the trace:

```js
console.log('start');

Promise.resolve()
  .then(() => {
    console.log('first');
    queueMicrotask(() => console.log('nested'));
  })
  .then(() => console.log('chained'));

queueMicrotask(() => console.log('peer'));
console.log('end');
```

Predict the exact log order and explain when the chained callback enters the queue. Closed-book reasoning first; do not disclose the solution before the attempt.

Original response: "start, end, first, peer, nested, chained"

Evidence: independently predicts the complete correct order for the fresh Promise-chain/nested-microtask trace. The enqueue-timing explanation requested in the initial prompt remains unanswered. No hints provided before prediction. Do not infer a broader browser-internals score or completed review until the explanation is checked.

## Explanation follow-up

Why does nested run before chained even though the chained .then was written/registered earlier in the script? When is chained actually eligible to enter the microtask queue?

Original response: "because the second then is waiting for the first then to be finished. and the nested is inside the first then."

Evidence: correctly explains that chained depends on completion of the first Promise reaction and nested is queued from within it. Combined with exact independent output prediction, this demonstrates fresh transfer of microtask enqueue ordering. Clarify that nesting itself is not a priority rule: in this snippet nested is enqueued while first runs, before first's completion fulfills the promise that chained awaits.

Scoped evaluation: conceptual_understanding = 3 for this Promise-chain and microtask-ordering scenario. Independent prediction and explanation before hints; no score 4 claimed without stronger edge-case/trade-off evidence. Implementation correctness, edge-case handling, testing quality and trade-off explanation remain unassessed. No snippet or tests executed; no claimed measured output.

Review outcome: success, stage advanced 0 to 1. Next review: 2026-10-10, three days after actual successful first delayed review. Preserve original baseline evidence; do not infer broad browser mastery. Next recommended work: short overdue TypeScript state-modeling review before introducing new baseline material.

## Source and next actions

WHATWG HTML Living Standard, Web application APIs, perform a microtask checkpoint: https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint. Publisher: WHATWG. Publication context: continuously maintained living standard; no fixed publication date assigned. Accessed 2026-10-07, Asia/Taipei. Version context: browser platform, not Node scheduling. Usefulness: verifies draining queued microtasks in order during a checkpoint. Classification: established standard behavior; this code is a tutor-created assessment. Promise-chain behavior uses ECMAScript Promise reaction jobs; explain and verify relevant details after the learner's attempt if needed.

Evaluate actual answer before updating mastery or queue; distinguish guided correction from independent retention. Next recommended baseline work after short overdue reviews: Java/Spring reasoning at the learner's demonstrated level.

Additional primary reference: ECMAScript Language Specification, PerformPromiseThen and Promise reaction jobs, https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-performpromisethen. Publisher: Ecma International / TC39. Continuously maintained draft; no fixed publication date assigned. Accessed 2026-10-07. Usefulness: distinguishes registering a reaction on a pending promise from enqueuing its job once the promise settles. Classification: established language semantics; this trace remains unexecuted.
