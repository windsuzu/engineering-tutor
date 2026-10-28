# Phase4 React: cancelled fetch, pending preview

October26. Skill fe.react, dueOctober21. Existing phase retained across date change, review2/3. In progress, no answer/grade.

## Case

Search component effect:

```jsx
useEffect(() => {
  const controller = new AbortController();
  async function load() {
    try {
      const response = await fetch(`/api/search?q=${query}`, {
        signal: controller.signal,
      });
      const data = await response.json();
      const preview = await buildPreview(data);
      setPreview(preview);
    } catch (error) {
      if (error.name !== 'AbortError') setError(error.message);
    }
  }
  load();
  return () => controller.abort();
}, [query]);
```

Synthetic stipulated timeline: A for query cat finishes fetch AND response.json, awaits buildPreview. Query changes to dog, cleanup aborts A controller and effect starts B. B completes and sets dog preview. Then A buildPreview resolves. buildPreview is custom asynchronous work that does not observe AbortSignal. Component still mounted, no other guards, no StrictMode extra effect execution in this case. No React/browser/fetch tests executed.

Q1: After A preview resolves, what preview does this code leave visible, and why? One state-result/cancellation-boundary task. Response pending, no answer supplied before attempt. Follow-up guard/cleanup reasoning only after answer; not extra review.

## Sources and limits

React useEffect official reference https://react.dev/reference/react/useEffect , Meta/React team, publication date unverified. Prior recorded cancellation context; no new current-version claim. Official retrieval attemptedOctober26, blocked CONNECT403. Established effect cleanup/async reasoning under supplied assumptions, no runtime verification.

## Q1 actual response

```text
A will overwrite the preview eventually because the buildPreview is not controlled by the abort controller.
```

Correct independent final-state and cancellation-boundary reasoning under supplied assumptions. Unlike earlier guided cancellation boundary, current answer independently applies it to fresh scenario. No implementation, tests or full lifecycle mastery inferred; final review outcome pending guard follow-up.

## Q2 — Prevent stale update (pending)

Keep same overlapping cat/dog timeline. What guard or cleanup change would prevent A's late preview from replacing B's? Brief pseudocode or plain-language mechanism accepted; no full component required. One stale-update prevention task; no solution supplied before attempt. Existing abort cleanup remains useful but custom work ignores signal. No tests run; evaluate answer evidence before final grade/queue change.

## Q2 actual response

```text
This entire question is not a abort controller question, maybe a unique id for each request is needed for check for the setter after buildPreciew
```

Correct independent request-identity guard proposal. Tutor makes comparison explicit after answer: compare captured run ID with latest ID immediately before setPreview. User's distinction accepted: cancellation controls supported work, result eligibility controls state commits. Both scopes motivated original case; abort alone is insufficient. No executable guard code, unmount invalidation, error guards or tests inferred.

## Final evaluation

Conceptual understanding3/4, independently predicts late A overwrite and proposes per-request identity gating after custom work. Other dimensions not assessed this review; retain historical evidence rather than overwriting unrelated scores. No React/browser/fetch tests. Broader skill developing; lifecycle invalidation, old error handling and deterministic test implementation remain unverified here. Successful narrow delayed review stage2->3,nextNovember9 (14days). No independent mastery inferred from tutor's comparison pseudocode.
