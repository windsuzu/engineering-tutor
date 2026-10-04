# Frontend baseline — 2026-10-04

Status: in progress; Q1 through Q1d received, implementation pending. Timezone: Asia/Taipei.
Project: exercises/baseline-frontend/.
No previous completed assessment results are available. No overdue reviews exist.

## Q1 — asynchronous profile prediction

Source: exercises/baseline-frontend/src/ProfilePanel.tsx.
Assume no StrictMode, no failures and one request per selection. Ada is selected at t=0 and completes at t=900. Grace is selected at t=50 and completes at t=200. Updates have committed at observations.

Predict selected ID, heading and status at t=250 and t=1000. Explain which callbacks update state and why. Would changing only the dependency array fix the behavior? Explain without implementing a fix yet.

Initial learner response (verbatim):
> in 250, the grace shows on the screen, but in 1000, the ada replaces the grace's name and shows on screen.
> changing deps array won't fix the problem. maybe we should use something like ref or useEffectEvent?

Evidence: correctly predicted the two displayed names and identified that a dependency-array change alone does not fix the issue. Selected ID, status, callback explanation and an implemented strategy were not provided. The proposed APIs are exploratory suggestions, not established misconceptions.

Feedback: selected ID remains grace and status is ready at both observation times. Each completed request still executes its callback in the starter. useEffectEvent provides access to latest committed render values; it does not automatically invalidate old requests. A ref can participate in a solution, but choosing the hook alone does not define the correctness rule.

Hints: none before the initial attempt. First progressive hint after the attempt: distinguish reading current values from determining whether a result may still update state.
Follow-up Q1b: If using a ref, what would it store and what condition would you check before allowing a completed request to update state? Sketch your approach in words or a few lines of pseudocode.
Follow-up response (verbatim):
> oh, i think a better solution is to send the abort signal to the previous api whenever the new api is triggered?
> the ref method is still possible , the ref stores the latest fired userId, if the response is not the same as the ref, we skip/ignore it

Evidence: proposed cancelling obsolete work and comparing returned identity against the latest requested user ID. The ID comparison handles the original Ada-to-Grace scenario. Handling repeated requests for the same identity, unmount and rejected obsolete requests has not yet been demonstrated.

Feedback after Q1b: AbortController works with a transport that accepts and honors its signal; pass the signal when starting the request, then call the old controller's abort method when invalidating that request. The current synthetic loader does not accept a signal. Cancellation and the current-request validity rule need separate consideration.

Q1c — repeated identity probe: Assume no cancellation and a ref storing only the latest userId. Requests start in order A1 (Ada), G1 (Grace), A2 (Ada). A2 resolves first with updated data; A1 resolves last with older data. Does the proposed ID comparison reject A1? What would you track instead if necessary?
Q1c response (verbatim):
> it will still put the Ada to the setProfile and nothing wrong. but we can also check if the profile state is already identical to the response. If they are the same, ignore it.

Evidence: correctly predicts that the old response passes the identity comparison, but incorrectly considers replacing explicitly updated data with older data harmless. Proposed equality comparison does not reject an outdated response with different field values. This is one observed conceptual gap, not yet a recurring misconception.

Correction: user identity and request identity differ. With A2 returning `{ id: 'ada', name: 'Ada', role: 'admin' }` and A1 later returning `{ id: 'ada', name: 'Ada', role: 'viewer' }`, both IDs match and the data differ; applying A1 would revert the role. Equality may avoid redundant updates but cannot establish whether a request is still current. Use a rule that identifies the current request instance or invalidates earlier effect instances; apply the rule to success and error updates. No full implementation has been supplied.

Q1d — correction check: For that role example, state the final role required by the latest-request-wins rule. Then suppose A1 rejects after A2 succeeds: should it change the UI to an error? Explain how the same request-validity rule applies to both outcomes.
Q1d response (verbatim):
> 1. The A2 response should remain displayed.
> 2. It depends on the design, but I think we can log and telemetry in the catch but don't need to show to the user.

Evidence: correctly preserves the latest request's successful result and distinguishes optional diagnostics for an obsolete failure from user-visible error state. This is a successful immediate correction check after feedback, not independent delayed retention or implemented correctness.
Feedback: under this task's latest-request-wins contract, an obsolete rejection must not overwrite current result or status. A current request's genuine failure still needs user-visible handling. Diagnostics may distinguish expected cancellation from unexpected failures.

## Q2 — implement request validity

Edit exercises/baseline-frontend/src/ProfilePanel.tsx, or paste a replacement effect in chat. Preserve the existing LoadProfile API for this step; the mock does not support cancellation. Implement validity for request instances rather than only user IDs. Handle obsolete success, obsolete error, repeated user IDs and unmount. Do not let an obsolete failure set the current UI to error; retain genuine current-request error behavior. Explain what the cleanup does and why it is sufficient. No reference implementation has been given.

Implementation response: pseudocode attempt 1 received in ProfilePanel.tsx. Original file snapshot preserved in assessments/2026-10-04-frontend-q2-attempt-1.txt; learner code was not edited by the tutor.

Observed reasoning: creates a request identity, stores it in a ref and guards success updates using identity equality. This supports handling repeated user IDs if get_load_request_identify() produces a unique identity per request; that requirement is currently unspecified.

Remaining issues:
- catch unconditionally sets error, so obsolete failures still change the current UI.
- finally unconditionally sets ready, so obsolete completions can end the current loading state; a current failure also has its error status overwritten by ready.
- No effect cleanup invalidates pending work on unmount.

Pseudocode syntax, the missing useRef import and the undefined identity helper are not graded as compiler failures. No build or tests were run.
Feedback directs the learner to apply validity to every state-changing path and account for unmount; no full corrected implementation supplied.
Q2 follow-up: explain what happens when the current request rejects and when an old request settles while the new one is loading; revise catch/finally/cleanup accordingly. Response pending.

### Q2 pseudocode attempt 2

Learner message (verbatim):
> how about this? I change the id from request to function's identity, and I don't need a finally anymore.

Original revision snapshot: assessments/2026-10-04-frontend-q2-attempt-2.txt. Tutor did not edit the submitted code.

Observed changes: identity assignment moved before try; both success and catch are now guarded; unconditional finally removed. This corrects obsolete error updates and unconditional ready transitions, assuming get_func_identify() returns a fresh identity per effect execution. Function identity can serve as the token if it is the actual distinct function object created by each effect execution; a function name or stable identity reused across executions would not work. The helper's semantics are unspecified, so uniqueness is not assumed proven.

Cleanup now calls setProfile(null), but it does not change requestRef.current or invalidate the old token. On unmount, a pending request still passes the guard and attempts updates. Clearing displayed state is different from revoking the request's ability to update it. No compiler/tests run; pseudocode accepted.

Feedback: acknowledge correct error guard and removal of finally; clarify function-token uniqueness condition; ask learner to trace the unmount guard and revise cleanup to invalidate obsolete work.
Follow-up Q2b: A pending request has token F1, requestRef.current is F1, and the component unmounts. After the submitted cleanup, does requestRef.current === F1 still pass? What should cleanup change so it cannot pass?
Response: pending.

### Q2 pseudocode attempt 3

Learner message (verbatim):
> i've changed the way to create an id. and update the cleanup

Original revision snapshot: assessments/2026-10-04-frontend-q2-attempt-3.txt. Learner code preserved without tutor edits.

Observed changes: uuid() supplies a fresh per-request token; cleanup clears profile and sets requestRef.current to null. Under the pseudocode assumption that uuid() returns unique non-null IDs, success and error guards now distinguish repeated-user requests and reject completions after cleanup. On dependency changes, old cleanup occurs before the new effect establishes its token. Clearing profile in cleanup is unnecessary for request validity; invalidating the ref supplies that protection. This ignores obsolete results; it does not cancel underlying work.

Q2 reasoning result: satisfies the specified request-validity scenarios as a guided pseudocode solution. No executable correctness or passing test claim. useRef import/types and uuid implementation remain deliberately outside this pseudocode evaluation.

Supported provisional fe.react scores:
- Conceptual understanding: 2. Correct final current-request rule and cleanup after multiple focused hints/correction probes; independent transfer not yet established.
- Edge-case handling: 2. Final pseudocode covers repeated identity, obsolete success/error and unmount after guided revision; not runtime-verified.
- Implementation correctness: null; pseudocode only, runnable implementation not assessed.
- Testing quality: null; no learner test design or executed test evidence yet.
- Trade-off explanation: null; cancellation/ignoring alternatives not yet sufficiently explained by learner.

Q3 — testing reasoning: Design a deterministic test in pseudocode for an obsolete failure arriving while the current request is loading. State how request completion/rejection is controlled and the UI assertions before and after each event. Avoid relying on arbitrary sleeps. This assesses test design separately from executed test results.
Q3 response (verbatim):
> nowadays the tests are all coded by the agents. but in my opinion, I would have tests for loading, error, ready for only one profile. then for ada+grace, we have ada rejects but no error, and grace succeeds with ready.

Evidence: proposes normal single-request loading/error/success coverage and an obsolete-error/latest-success scenario. Correctly expects no user-visible error from Ada and ready after Grace succeeds. Does not explicitly require loading to remain while Grace is pending, assert Grace's actual displayed identity/data or specify deterministic request control. Agent-generated test syntax is acceptable; learner understanding is assessed through behavior contracts and review, not manual typing requirements.

Feedback: distinguish absent error from preserving the correct current status. The earlier unconditional finally could produce ready during a pending request while still satisfying a no-error assertion. Strengthen intermediate-state assertions; require controlled promises rather than arbitrary sleeps when tests are implemented.
Q3b: After Ada rejects but before Grace resolves, what status should remain? Why could asserting only absence of an error miss a bug?
Q3b learner response (verbatim):
> but my code removes the finally.
> the status should remain "loading" when ada rejects.

Evidence: correct intermediate loading assertion and accurately notes that the submitted revision has no finally. Tutor clarified that finally was a regression example, not a present defect. Test-design score: 2 (scope: this request-order scenario only); basic coverage and correct intermediate state after guidance, but deterministic control is not explained. No tests implemented or executed by learner.

## Q4 — cancellation versus ignoring results

Prompt: What benefit does cancellation add, and when might ignoring results still be necessary?

Learner response (verbatim):
> the benefit: abort drops the old API request, which saves resources and we don't need to worry about this kind of race condition.
>
> but it is necessary if we are dealing with something like transaction system. we need to record every single response. then we need to handle every single response or even create a data structure to remember their order.

Evidence: identifies potential resource savings and a legitimate need to preserve business-operation outcomes. Overstates cancellation as eliminating request-state races. Client abort does not guarantee remote processing stops or rolls back; cancellation must be supported and obsolete abort/error callbacks still require correct state handling. Recording every outcome is a business/workflow policy distinct from latest-request-wins display state, and arrival order is not necessarily business-operation order.

Trade-off score: 2 (provisional, narrow scenario). Useful benefits and an alternative domain recognized, with important cancellation and operation-order gaps requiring correction. This is not a backend transaction assessment.

Corrected explanation: cancellation can reduce unnecessary client/network work, depending on support and timing. Ignoring obsolete callbacks protects current UI state independently. Durable write outcomes need application/server protocols; cancelling a browser wait does not prove a write was undone. An audit/operation store may retain all outcomes while a component separately chooses its visible state.

Q4b correction check: A payment POST reaches the server and the browser then aborts the fetch. Can you conclude the payment was cancelled? If the outcome is unknown, what should the UI claim?
Q4b learner response (verbatim):
> oh , it should tell the user the payment may be successful in the server, and force the user to refresh to get the latest status?

Evidence: correctly recognizes that payment may have succeeded despite browser cancellation and proposes fetching authoritative status. Successful immediate correction, with guidance; no independent retention or backend implementation evidence.
Feedback: communicate unknown/unconfirmed outcome, retrieve the existing operation's status through the application backend and update automatically where practical. A manual Check status control is a fallback, not a forced full-page reload. Refresh is useful only if it re-queries that operation, and a returned processing state is still not terminal confirmation. Do not label success/failure or initiate a new payment solely because the original browser request was aborted. Stripe's status-retrieval guidance is a concrete example, not a universal integration contract.

Request-state reasoning segment complete in guided/pseudocode format. Full frontend baseline remains in progress; no executed implementation or test results.

## Q5 — TypeScript state modeling

New independent probe; pseudocode/type sketches accepted, no answer supplied.
Given `{ status: 'loading' | 'ready' | 'error'; profile: Profile | null; error: string | null }`, identify two contradictory states this type permits. Propose a type model where ready always includes a profile, error always includes an error message, and loading has neither. Then explain whether assigning a TypeScript type to an API response validates its contents at runtime.
Learner response (verbatim):
> error should be naming to errorMessage or message.
> the type should be union into 3 subtypes, status loaing, status ready +profile, and status error with message
> no. you should use zod to validate the response

Evidence: independently proposes the requested discriminated union and correctly distinguishes static typing from runtime validation, naming Zod as a valid option. Does not explicitly enumerate two contradictory states; the proposed model addresses them. Field naming is a readability choice, not itself a correctness fix. Score: conceptual understanding 3, scoped to state modeling and runtime/static distinction. No schema code, compilation, malformed-input tests or trade-off evidence; other dimensions remain null. Do not infer broader TypeScript mastery.

Feedback: correct union approach and runtime-validation boundary. Original type permits ready with null profile and error with no message. Zod is an option, not the only way to validate. TypeScript's structural types are not a runtime exact-shape validator.
Review: fresh conceptual state-modeling/runtime-validation probe due 2026-10-05; broader skill remains developing pending additional evidence.

## Q6 — browser event-loop prediction

Closed-book, new independent probe. Assume a normal browser, run once as a single script, no other code or errors. Predict exact log order and explain your scheduling rule. No rendering timing question or answer supplied.
```js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => {
  console.log('C');
  queueMicrotask(() => console.log('D'));
});
queueMicrotask(() => console.log('E'));
console.log('F');
```
Learner response (verbatim):
> A, F, C, D, E, B?

Evidence: correctly orders synchronous A/F before deferred callbacks and B after all listed microtasks. Incorrectly places D before E even though E is already queued when C enqueues D. No scheduling explanation was supplied. Conceptual score: 2, scoped to this event-loop trace; partial correct ordering with a nested-microtask FIFO gap. Other dimensions remain unassessed.

Correction: exact order is A, F, C, E, D, B. At the end of the script, microtasks are C and E in that order. C enqueues D at the tail, leaving E then D; the queue drains before the timer callback. Verified against MDN microtask guidance; snippet not executed in a browser or Node during grading.

Q6b immediate correction check (fresh example, after explanation):
```js
queueMicrotask(() => {
  console.log('X');
  Promise.resolve().then(() => console.log('Y'));
});
Promise.resolve().then(() => console.log('Z'));
console.log('W');
```
Predict log order in a normal browser and explain why.
Learner response (verbatim):
> W, X, Z, Y
> because the Y is queued after the X and Z round

Evidence: exact order correct on the immediate follow-up after FIFO explanation. Clarification: Y is enqueued during X, behind already-queued Z; it is not enqueued only after Z finishes. Successful guided correction; keep original score 2 and fresh delayed review rather than infer independent mastery from immediate recognition. No snippet executed.
Fresh delayed review proposed for 2026-10-05.

## Q7 — dialog keyboard accessibility

New independent code-reading probe. Component: exercises/baseline-frontend/src/DialogProbe.tsx (not wired into the starter app or browser-tested).
Assume the user tabs to the opener and opens the dialog with the keyboard. What should focus do on opening, Tab/Shift+Tab, Escape and closing? Which behaviors does the snippet actually implement? Propose corrections and a concise keyboard test plan in words or pseudocode. No implementation answer supplied.
Learner response (verbatim):
> the focus may be on the close button initially
> the tab and shift tab will do nothing because the only focusable item is the button
> the esc will close the dialog

Earlier stored evaluation (superseded by the current response below): recognizes initial focus as relevant, and a Close button can be an intentional focus target in some dialog designs. However, the input is also focusable, the snippet does not move focus on opening, and role/aria-modal do not implement Escape closing or a contained tab sequence. Closing/restoring focus and a test plan were not addressed. Earlier conceptual score 1 was based on the above stored wording, which differs from the current chat response; it must not be used as the current learner evidence.

Current learner response (verbatim; authoritative for this turn):
> the focus may be on the input initially
> the tab goes to button, then a shift tab goes to back to the input.
> the esc will close the dialog

Current evidence: correctly identifies input and Close as focusable and describes expected local forward/backward tabbing and Escape dismissal. Does not distinguish expected behavior from the custom div's implemented behavior; no focus transfer or Escape handler exists. Wrap-around containment, return focus and a test plan remain unspecified. Scoped conceptual score corrected to 2 (basic understanding with important gaps); no compiler or browser tests performed. Historical record retained explicitly rather than silently overwritten.

Correction: opening should intentionally place focus inside; for this simple form the input is a sensible choice. In the unmodified snippet opener focus stays where it was because no focus movement is implemented. Modal tabbing should cycle within the dialog (input and Close here), but this code permits normal page tabbing, including the external Help link. Escape should close, but a div with dialog ARIA semantics has no native Escape handler. After close, restore focus to the opener (or another logical workflow target if it no longer exists). Background interaction must also be prevented for true modal behavior. Native dialog/library options have different built-in behavior; this exercise is explicitly a custom div.

Q7b correction check: Focus is on the Name input. Tab moves to Close. Where should the next Tab go in this modal, and where should focus return after activating Close? Explain what the application must arrange.
Learner response (verbatim):
> 1. if the focus management doesn't be implemented. the next may be go to the help
> 2. the focus will go back to the edit profile button iguess

Evidence: correctly distinguishes the unimplemented snippet's possible tab escape to Help and identifies intended return focus to the opener. Does not demonstrate implementing containment/restoration or keyboard tests. Clarification: functioning modal Tab from Close wraps to Name input; closing should restore opener focus but this custom div does not automatically do it. Keep an opener ref (or remembered focused element) and focus it when the dialog closes, using a logical fallback if it no longer exists. Conceptual score remains 2 after guidance. No executable or test evidence inferred.
Fresh dialog keyboard review due 2026-10-05. This focused conceptual probe is complete; practical verification remains unassessed.

## Q8 — Next.js cached read after a mutation

Independent conceptual probe, not executable Vite project code. Assume Next.js App Router with cacheComponents disabled, production behavior, and explicit server fetch Data Cache semantics in current documentation (site version label 16.3.8 on access 2026-10-04). No browser/CDN/API-origin cache and no database replica lag. A prior read has cached the old product name. The database mutation succeeds and no server-side cache invalidation runs.

Server Component reads:
```ts
const response = await fetch('https://example.test/products/42', {
  cache: 'force-cache',
});
const product = await response.json();
```
After a successful save, the client calls `router.refresh()`.
Question: Is the next displayed product name guaranteed to be the saved one? Explain which cache boundary matters and propose a correction while retaining caching for other reads. API names may be looked up; explanation matters more than memorization.
Learner response (verbatim):
> no, after the refresh, the product displayed name will still be the old one.
> this can be fix by cache: no-cache (if the name is changing directly in the backend)
>
> but if you want to keep caching feature, you should add invalidatePath or Tag in the save function.

Evidence: independently identifies stale server data despite client refresh and proposes invalidation in the mutation path while preserving caching. Scoped fe.nextjs conceptual score 3; option/API naming treated as documentation gaps, not conceptual failures. No invalidation implementation, consistency edge-case tests or broad HTTP-cache understanding demonstrated; those dimensions and fe.http-cache remain unassessed.
Feedback: router.refresh does not invalidate the server Data Cache. no-store is the documented Next.js server fetch option to opt out; no-cache is not the Next.js server-cache opt-out described here. Correct API spelling is revalidatePath. For tags, tag the read and invalidate/update the same tag; current revalidateTag(tag, 'max') is stale-while-revalidate, while updateTag in a Server Action provides immediate expiration/read-your-own-writes. Invalidate after a successful committed mutation, and select semantics to match required freshness. No API calls run.
Fresh conceptual review due 2026-10-05.

## Q9 — performance diagnosis (final initial baseline probe)

Synthetic observations, not measured by the tutor: typing in a 5,000-row table feels slow; React Profiler shows approximately 4 ms render time; a browser performance trace for the same interaction shows approximately 140 ms of repeated layout work. A teammate proposes wrapping every row in React.memo.
Would you accept that as the first fix? What would you inspect next, propose as a hypothesis, and measure to verify improvement? Explain rather than naming a tool alone. No answer supplied. This is a narrow performance/architecture reasoning sample, not an implementation benchmark.
Learner response (verbatim):
> there's no need to wrap react.memo, useMemo, or useCallback under react 19 react compiler.
> but I will try to see the rendering more clearly with tools like react scan.
>
> it can easily see if there are something rendering multiple times unexpectedly.
> next, we need to see if there any logic (util, hooks, data calculation) in the row's cell can be extracted to the row's level or even performed once only.
> we can also implement virtualizer with tanstack lib to only render some rows in user's viewport.
> or using tanstack table with react-hook-form 's useFieldArray to minimize the re rendering

Evidence: proposes inspection rather than blanket memo wrapping, calculation reuse and virtualization, which is a relevant hypothesis for a large DOM. Does not prioritize the supplied 140 ms layout cost over 4 ms React rendering, identify layout-triggering work or define before/after interaction metrics. Library combinations and render counts alone do not establish a fix. Compiler claim is assessed conditionally: enabled compiler can reduce manual memoization needs, but React 19 does not itself enable it and memo hooks remain supported escape hatches. Do not infer that learner explicitly claimed automatic enablement; clarify the condition instead.

Scoped fe.performance conceptual score: 2, basic optimization ideas with important bottleneck-attribution and verification gaps. Other dimensions remain null; fe.architecture and library-specific proficiency remain unassessed. No synthetic numbers represent actual measurements.

Feedback: inspect layout events and their initiating code, DOM size, and geometry-read/style-write patterns before choosing a fix. Virtualization may reduce mounted DOM/layout work; it is a hypothesis, not proof. Refactoring calculations primarily targets scripting/render work unless the calculations also trigger layout. Compare the same typing interaction before/after under the same data/device/build conditions using layout duration and end-to-end input-to-next-paint latency, checking correctness, keyboard behavior and focus as well. No claim about React Scan, TanStack Table or useFieldArray guarantees is made or tested.

Q9b final correction check: If React render time improves from 4 ms to 1 ms while layout stays at 140 ms, has the main bottleneck been fixed? Which browser measurement would you compare to verify the user-visible typing improvement?
Learner response (verbatim):
> ok, so I think we should then measure the layout lag time as the bottleneck. but how do you measure the layout time

Evidence: after feedback, shifts investigation toward layout and asks how to measure it. Does not provide an independent measurement procedure or input-to-next-paint metric. Score remains 2; tool unfamiliarity is a learning need, not an additional penalty. Tutor provides documented Chrome Performance-panel recording and Layout-event inspection instructions. No browser trace or benchmark performed.

Initial frontend reasoning baseline complete in the agreed pseudocode/discussion format. This does not complete runnable implementation verification or prove all frontend skills. Summary: assessments/2026-10-04-frontend-baseline-summary.md. Fresh performance review due 2026-10-05.

Learner requested async/await notation and permission to answer in pseudocode. The starter was converted from promise callbacks to an inner async function with try/catch, preserving the intentional request-order bug; no validity guard or cleanup solution was added before the learner's attempt.

Q2 may be answered in pseudocode. Assess conceptual correctness, proposed edge-case handling and explained trade-offs from the supplied reasoning. Leave runnable implementation and executed testing dimensions unassessed unless later supported by actual code/checks. Do not penalize pseudocode syntax. This changes the response format, not the acceptance criteria; describe both success and error guards and cleanup.
Assistance history: Q1 feedback and repeated-identity/correction probes above; record this as guided implementation.
Dependency installation remains unauthorized; review code first, then request authorization before installing and executing tests.
Review proposed for fe.react on 2026-10-05, using a fresh request-order scenario. Full baseline grading remains pending implementation and tests.
Scores: four scoped reasoning/design dimensions scored at 2 with evidence in Q2–Q4. Executable implementation remains unassessed. Scores describe guided request-state reasoning, not broad frontend mastery.
No full solution delivered.

## Verification log

- Ran node --version: v22.14.0.
- Ran npm.cmd --version: 10.9.2.
- Dependency installation: not authorized or performed.
- Typecheck, build, component tests, browser interaction: not run.
- Starter acceptance test expected to expose a bug: expectation only, not an observed failure.

## Next stages

Next recommended assessment: backend baseline, separate session. Existing frontend reviews remain due 2026-10-05. Practical frontend follow-up should verify a real trace and runnable behavior when the learner chooses that work; dependency installation still requires authorization.
