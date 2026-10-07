# Async request validity

## Summary

For a latest-request-wins view, only the still-current request may change visible result, loading or error state. Matching user IDs is insufficient when the same user is requested more than once.

## Explanation and example

An effect can start work whose callback finishes after a later effect has started. Associate each effect/request with a fresh token, compare it before every post-await state change, and invalidate it in cleanup. A per-effect active flag is another approach when one request belongs to that effect. Dependency changes alone do not cancel already-started work.

Pseudocode (reference explanation after learner's attempts; not executed):
```text
effect starts:
  token = fresh identity
  currentToken = token
  show loading
  start asynchronous work:
    try:
      result = await load(selectedId)
      if currentToken == token: show result and ready
    catch error:
      if currentToken == token: show current-request error
  cleanup:
    invalidate token
```

Ada request A1, Grace G1 and a later Ada A2 are three distinct requests. If A2 finishes first, A1 must not overwrite its newer data. If A1 rejects while A2 is pending, A2's loading state must remain.

## Cancellation and applications

Use current-request guards for searches, selected-profile panels and other views whose newest selection wins. AbortController can cancel supported browser operations before completion and may reduce unnecessary work. It is complementary to request validity; it does not implement a general application ordering policy. Expected obsolete cancellation must not become the current UI's error.

Client abort offers no application-level guarantee of remote transaction rollback. That boundary is an engineering inference from client cancellation semantics, not a claim about every server. Preserve durable business outcomes in an operation/audit model when required; choose display state separately. Response arrival order alone does not establish business ordering.

## Common misconceptions and edge cases

- Same user ID does not mean same request or same data freshness.
- Data equality can avoid redundant updates but cannot identify outdated differing data.
- Guard errors as well as successes; unconditional finally transitions can corrupt current state.
- Cleanup must invalidate eligibility, not merely clear displayed data.
- Account for repeated identities, unmount, old rejection during current loading, current failure and development cleanup/setup cycles.
- Latest-request-wins is a UI contract, not a universal policy for writes, payments or audit history.

## Test approach

Use controlled promises to resolve/reject requests in an explicit order. Assert loading after an obsolete rejection, then the correct current data and ready status after current success. Add reverse-success, repeated-identity, current-error and cleanup cases. These are proposed tests, not passing-test claims.

## Sources and version context

Verified 2026-10-04; baseline pins React 19.2.0, browser cancellation semantics are platform APIs. Rolling docs may describe newer React releases.
- [React useEffect](https://react.dev/reference/react/useEffect).
- [React Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects).
- [MDN AbortController.abort](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort).
- [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
- Full source metadata: ../sources/2026-10-04-frontend-baseline.md.

## Personal evidence links

Assessment: ../assessments/2026-10-04-baseline-frontend.md (Q1–Q4). After guidance, learner produced a unique-token pseudocode solution guarding success/error and invalidating cleanup, and identified the loading assertion after an obsolete rejection. This is guided reasoning, not verified executable correctness or delayed retention.

Q4b evidence: after feedback, learner recognized that a payment could have succeeded server-side and proposed fetching its current status. Prefer communicating unconfirmed outcome and retrieving the existing operation's authoritative status; a page reload alone is not proof of success or cancellation. This is application design guidance informed by [Stripe status retrieval](https://docs.stripe.com/payments/payment-intents/verifying-status), not a universal payment-provider contract.

Remaining gaps: independent transfer of cancellation boundaries, independently designed deterministic tests and executable verification.
Next review: 2026-10-05, fe.react; see ../reviews/queue.json. No backend transaction mastery inferred.

## Practical framework context — 2026-10-07

Custom client fetch followed by setState can race in a Next.js Client Component, whether started by an Effect or an event handler. Framework routing does not infer eligibility for arbitrary user setters. Next's installed router implementation tracks its own pending actions and prevents discarded actions from applying their resulting router state; that is scoped to router-managed state, not application request code.

Query libraries own the query data/error state they expose. Include changing inputs in the key, for example ['search', query] with TanStack Query v5. Pass its query-function signal to supported fetch operations for cancellation; cancellation defaults and hook-specific limitations still apply. Avoid manually copying obsolete query completions into one unkeyed local state. Next's fetching guide supports server-owned fetching and client query-library patterns; SWR documents specific query/mutation race coordination.

This tutor dashboard currently reads fs data in Server Components and filters supplied records locally, so the assessed client-request race pattern was not found in app/components/lib. This is a code-inspection finding, not a runtime concurrency test or a claim about an unseen employer app.

Review on 2026-10-07: independently recognized the obsolete catch and proposed latest-request identity. Immediate follow-ups correctly apply captured/latest comparison after explanation of error-ID source and cancellation. Narrow conceptual score retained at 2 because cancellation and identity-source details still needed guidance; tutor's ambiguous Effect-versus-handler prompt is excluded as negative evidence. No executable checks run. Next active review: 2026-10-09, focused on cancellation and guard transfer.

References and version metadata: [review sources](../sources/2026-10-07-request-validity-review.md). Installed Next 16.3.8 router source inspected in node_modules/next/dist/client/components/app-router-instance.js; rolling Next docs identify 16.4.0. No dependency upgrade performed.
