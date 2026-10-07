# React request-validity review — 2026-10-07

Skill: fe.react. Queue item: review-fe-react-2026-10-04.
Status: review attempt completed; further practice scheduled. Originally due 2026-10-05; overdue is not failure.
Estimated duration: 5–10 minutes.
Objective: determine which asynchronous request outcomes may modify the current UI, including failure paths.

## Q1 — Obsolete request failure

Assume fetchResults rejects on HTTP failure, returns results on success, and does not support cancellation. This is explanatory React code, not an executed project. Pseudocode fixes are accepted.

```tsx
useEffect(() => {
  let active = true;

  async function load() {
    setStatus('loading');
    try {
      const results = await fetchResults(query);
      if (active) {
        setResults(results);
        setStatus('ready');
      }
    } catch {
      setStatus('error');
    }
  }

  load();
  return () => { active = false; };
}, [query]);
```

Timeline: query changes from "laptop" to "monitor"; the old effect is cleaned up; the monitor request succeeds and sets ready with monitor results; afterward the laptop request rejects.

What are the final status and displayed results? Is that correct for a latest-request-wins screen? If not, propose the smallest fix and explain it.

Original response:

```text
if i saw this kind of code in pr. i will definitely tell the developer to remove this code. it can be done by writing the async fetch in the event listener instead using a useEffect.

the error will be set to the screen.
the smallest fix is to save a id for each request, only do things to the response with the latest id.
```

Evidence: independently identifies obsolete error state and proposes a valid per-request latest-identity guard. Does not explicitly name retained monitor results; tutor can confirm that data is unchanged by catch. Proposed identity mechanism is valid but larger than using the existing active flag. Suggests moving fetch to event handling as a categorical PR change; whether that is appropriate depends on whether the fetch is interaction-driven or synchronizes with query state/props. Event handlers do not themselves prevent overlapping-request races.

Post-attempt feedback: final stored results remain monitor results while status becomes error. Show the smallest patch, guarding catch with the already-existing per-effect active flag. Explain that event handling can be appropriate for explicit search submission, while Effects can synchronize a query-dependent view; both require request-validity handling for overlap. Do not assign a broad React mastery claim from this one trace.

## Q2 — Does changing the trigger remove the race?

An onSearch handler starts the laptop request, then another invocation starts the monitor request before laptop finishes. Monitor succeeds and laptop rejects afterward. Without any current-request guard, does moving the fetch to the event handler prevent the same stale error? Explain what protection remains necessary.

Original response: "no need because you add a active in the catch"

Evidence: response correctly applies the shown active-guard patch to the Effect version: a separate ID is unnecessary when per-effect invalidation and guards already enforce request eligibility. The tutor's follow-up shifted to an event-handler version without displaying its code, causing ambiguity. Do not infer a conceptual error from this answer alone.

Clarification: explicitly acknowledge active guard suffices in the patched Effect. Show a separate onSearch function with no effect, active flag or cleanup, and ask whether its old laptop rejection can set error after monitor succeeds. Do not imply event handlers inherently provide per-request invalidation.

## Q2b — Explicit event-handler version

```tsx
async function onSearch(query) {
  setStatus('loading');
  try {
    const results = await fetchResults(query);
    setResults(results);
    setStatus('ready');
  } catch {
    setStatus('error');
  }
}
```

No Effect, active flag or cleanup is present in this version. onSearch('laptop') starts, then onSearch('monitor') starts; monitor succeeds first and laptop rejects afterward. Can the old laptop rejection set error here? What prevents it?

Original response: "no, and an abort to the first one works. or using a unique requestId also works."

Evidence: proposes a valid unique-request-ID mechanism again. Opening "no" conflicts with the supplied unguarded catch if intended as a prediction of its current behavior, but may describe the desired behavior after a fix; preserve ambiguity without overstating a misconception. Abort proposal changes the initial assumption that fetchResults does not support cancellation. Even with a cancellable implementation, an aborted request's rejection can enter catch and must not change the current UI.

Feedback: as written, old laptop rejection sets error because catch is unconditional. Confirm request identity guarding both success and error as valid. Explain cancellation requires API support and handling the aborted request's failure path; do not claim cancellation alone guarantees request validity.

## Q3 — Aborted request rejection

Assume we change fetchResults to support cancellation and abort the laptop request when monitor starts. Laptop rejects with AbortError while monitor is still loading. If catch still unconditionally calls setStatus('error'), what happens to the monitor screen? What should the catch guard prevent?

Original response:

```text
the error will be set if no block of setting the error.

catch (err) {
  if (err.id === requestId) {
     setStatus('error')
   }
}
```

Evidence: correctly predicts unconditional catch corrupting current status and proposes identity gating. err.id is not provided by the supplied fetchResults contract or ordinary fetch errors; requestId is unspecified as captured or latest. Treat these as implementation-contract details, not proof of a conceptual failure. A custom wrapper might attach an ID but has not been proposed or implemented here.

Post-attempt correction: capture myId when starting this request, separately store the latest request ID, and compare latestRequestId === myId inside catch (and success). Error identity is not required. An old error carrying its own ID and comparing it to its own captured request ID would pass, so the comparison must include the latest-request identity.

## Q4 — Which identity makes the guard false?

Laptop's captured myId is 10. Starting monitor changes latestRequestId to 11. Laptop later rejects. What should latestRequestId === myId evaluate to in laptop's catch? Confirm which value a new request changes and which value stays captured by the old request.

Original response: "the laptop's error won't invoke the setStatus with error. i think this is the answer, but i want to know that we don't do this normally in our app, and how does next.js handle this internally? or this can really happen in my project?"

Evidence: correctly applies the captured/current request comparison after correction. Asks about practical framework/library ownership of races. Confirmed this immediate guided result without treating it as independent retention.

Repository inspection: dashboard app/page.tsx passes server-read wikiData into Dashboard; lib/wiki.ts reads Markdown/JSON with fs. No client fetch/useEffect/useSWR/useQuery was found in app, components or lib. The exercise ProfilePanel contains learner pseudocode with identity guards; it is separate and not runtime-verified. Findings apply to this tutor repository only, not an unseen employer app. Package pins Next 16.3.8 and React 19.3.0.

Research/feedback: distinguish router-managed Server Component rendering, query-library-managed state, and arbitrary client fetch/setState. Query keys should include inputs such as query; consume TanStack Query's signal for transport cancellation. Next does not infer request eligibility for arbitrary user setters. No real race reproduced or employer code inspected. Current docs may be newer than the installed Next version; source metadata appended to sources/2026-10-07-request-validity-review.md.

## Scoped evaluation and next review

Conceptual understanding = 2 for this combined request-validity/cancellation review. Independent initial obsolete-error prediction and latest-ID proposal were correct. Captured/latest identity source and cancellation failure-path behavior needed further explanation before correct immediate follow-ups. Tutor's ambiguous context changes are excluded as negative evidence. Do not erase the independently correct Q1 evidence or penalize pseudocode syntax. Other dimensions retain their prior evidence; no new executable implementation, edge-case, testing or trade-off score inferred.

Outcome: needs_practice, not a penalty for lateness. Keep success stage 0 and schedule a fresh short probe on 2026-10-09 (two days after correction). No code/tests run. Next recommended work: practical framework-owned versus custom fetching distinction, then another overdue short review.
