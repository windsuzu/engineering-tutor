# Request-validity review: inventory loading flag

Date: 2026-10-09 (Asia/Taipei).
Skill: fe.react, scoped to overlapping async work and UI-state eligibility.
Status: completed; successful narrow loading-state guard review. Cancellation/unmount and practical checks remain unassessed here.
Estimated duration: 5–10 minutes. Objective: reason about which request may update loading state. Prerequisites: async/await, finally, captured request IDs. Plain language/pseudocode accepted.

## Q1 — Predict the loading flag

Assume this handler is inside a mounted React component. latestId is a ref; fetchStock returns a promise. React state updates have committed at each observation. No unmount, other calls, or extra handlers.

```ts
async function refreshStock() {
  const id = ++latestId.current;
  setLoading(true);
  try {
    const stock = await fetchStock();
    if (id === latestId.current) setStock(stock);
  } catch (error) {
    if (id === latestId.current) setError(error);
  } finally {
    setLoading(false);
  }
}
```

Request A starts at t=0. Request B starts at t=10 and is now the latest request. A finishes at t=30; B is still pending and will finish at t=100.

Immediately after A finishes at t=30, is loading true or false according to this code?

Response: pending. No prediction or fix supplied before attempt. Follow with explanation/minimal change after actual answer, one question at a time. No snippet, browser, or React test executed; no practical mastery or review outcome inferred.

### Q1 responses and wording clarification

Learner first response (verbatim):

```text
In this scenario, the loading will become true because you put it in the finally block. And the layers know conditional blocking in the finally block.
```

Learner restatement (verbatim):

```text
In this scenario, the loading will become true because you put it in the finally block. And there's no conditional blocking in the finally block.
```

Evidence: independently identifies that finally is unguarded, allowing an older request to update loading. Both messages predict true although the supplied statement sets false. Preserve both actual messages, and do not silently fix the value or infer a conceptual failure from a possible wording slip. Tutor points out the displayed statement and asks whether false was intended before grading. No final score, completed review, or queue update yet; no snippet or tests executed.

## Q1b — Clarify the value

You identified the missing guard in finally. Its statement is setLoading(false). Did you mean that loading becomes false even though B is still pending?

Response: pending. This is a value clarification with the statement explicitly highlighted, not an independent fresh prediction. Preserve initial guard recognition separately from the clarified value; no full fix supplied.

### Q1b response

Learner response (verbatim):

```text
Yes
```

Confirms that false was intended. Record the original true wording as a clarified value slip, not an established conceptual gap. Initial unguarded-finally recognition was independent; this confirmation follows highlighting the literal false setter and is not a new independent prediction. Tutor confirms loading becomes false despite B pending. No final grade, queue change, or runtime evidence.

## Q2 — Minimal fix

How would you change only the finally block so that A cannot turn loading off while B is still pending? Pseudocode or code accepted.

Response: pending. No corrected finally supplied before the attempt. Earlier result/error guards remain visible as task context. Await answer before feedback; no tests or implementation checks run.

### Q2 response

Learner response (verbatim):

```text
You should still validate the latest ID in the finally block.
```

Correct: proposes guarding the loading update with the same captured-versus-latest identity condition already used for results and errors. No corrected finally supplied before the answer. Confirmed implementation sketch, supplied after the attempt:

```ts
finally {
  if (id === latestId.current) setLoading(false);
}
```

At A's completion its captured id differs from the latest B id, so A cannot turn loading off. When B finishes its id matches and it may turn loading off. This is a reasoning walkthrough, not executed output; no code compiled or tests run.

## Final evaluation

- Conceptual understanding: 3/4, narrowly scoped to stale loading-state updates and captured/latest guard transfer. Independently spots unguarded finally and proposes latest-ID validation. The true/false wording slip was clarified; do not score it as a demonstrated conceptual error. The literal false setter was highlighted during clarification, so do not count that confirmation as an additional independent prediction.
- Implementation correctness, edge-case handling, testing quality, and trade-off explanation: unassessed in this review. Retain prior baseline scores/evidence for other dimensions without updating them. No complete runnable implementation or executed checks.

Outcome: successful first delayed conceptual guard-transfer review; broader fe.react status remains developing. This narrower example did not assess cancellation/error identity source, unmount, or deterministic tests that remain in the earlier gap record. No mastery inferred for them. Next review October 12, three days later, explicitly including those unresolved cancellation/unmount boundaries. Stage 1 describes the scoped guard review, not comprehensive React retention.

Next topic: modal accessibility due October 9, then Next.js freshness due October 9. All actual responses preserved; no snippet/browser/tests executed.

## References and scheduling

Use [existing async-validity concept](../concepts/async-request-validity.md) and the previously verified React references in [October 7 review](2026-10-07-review-request-validity.md). Example is tutor-created; live official documentation is unavailable in this session (proxy HTTP 403), so no fresh verification claimed. General state-validity reasoning, no new API/version claim.

Queue remains due October 9 while incomplete. Conditional next review October 12 on independent success or within October 10–12 after correction; apply only after actual evidence. Assessment scores and prior evidence remain unchanged while waiting.
