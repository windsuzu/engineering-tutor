# API retry review: intentional voucher purchases

Date: 2026-10-08 (Asia/Taipei).
Skill: be.rest, scoped to retry/idempotency reasoning.
Status: completed; needs practice. Guided correction checks completed; no independent delayed success inferred.
Reason: review due 2026-10-05 after guided stable-operation identity and database uniqueness correction. Prior evidence: [backend baseline Q2–Q2e](2026-10-04-baseline-backend.md#q2--retrying-an-uncertain-request).
Estimated duration: 5–10 minutes, one question at a time.
Objectives: distinguish an uncertain retry from a separately intended purchase, then examine concurrent duplicate handling if the first response supports it.
Prerequisites: HTTP requests, client/server roles, durable database writes. Plain language or pseudocode accepted; API-name recall is not required.

## Q1 — Distinguish intent from delivery attempts

A customer purchases a $20 gift voucher. The server commits the purchase, but the response is lost. The app retries 30 seconds later. The customer is also allowed to intentionally purchase a second identical $20 voucher for the same recipient, even immediately after the first. Each server request generates a fresh purchase ID.

How would you design the client/server contract so the server can distinguish a retry of the first intended purchase from a genuinely separate identical purchase?

Learner response (verbatim):

```text
Do you mean that the back end is actually successfully updated the db, but the front-end didn't correctly get the response? 

The frontend should send a request unique ID to the backend, and if success, the backend should store that request ID in the DB or session.

Now, if the front end retries the request, the back end will see the already succeeded request ID and tell the front end to warn the user that the previous request has already succeeded.
```

Evidence: independently proposes a client-supplied identifier, storing successful-operation identity, and recognizing a retry as previously successful. Clarification of the scenario is accurate: the database commit succeeded but the frontend did not receive the response. "Request unique ID" does not yet specify whether identity is per network attempt or per intended purchase. DB versus session storage guarantees remain unspecified. Warning wording alone does not establish whether the response includes the original successful purchase result; do not infer that the learner intends an error response or repetition of the side effect. No final grade or review outcome yet.

Tutor confirms the scenario and acknowledges the proposed identity mechanism, without supplying its required lifetime or storage/result design.

## Q1b — Identifier lifetime

For the retry and for the customer's intentional second identical purchase, respectively, should the frontend reuse the original ID or generate a new one?

Learner response (verbatim):

```text
for retry, the same ID
for second intentional, generate a new one
```

Evidence: correctly distinguishes the stable identity of one intended purchase from a separate identical purchase. No lifetime rule was supplied before this answer; this clarifies the initial shorthand rather than correcting an established misconception. Tutor confirms the distinction. Concurrency, durable storage, and returned-result details remain to probe. No final grade, queue advancement, or executable implementation evidence inferred.

## Q2 — Concurrent retries

Two backend instances receive requests with the same purchase-attempt ID at almost the same time. Both check the shared database, and both find no existing purchase for that ID. They then each try to insert a purchase.

What would you put in place so that only one purchase can be committed for that ID, even though both initial checks passed?

Response: pending. Plain language accepted. No concurrency solution or hint supplied before the attempt; this tests the database enforcement gap that required guidance in the baseline.

### Q2 scenario clarification

Learner response (verbatim):

```text
The ID is unique. a single user only sends one unique ID to one backend. why is it possible to have two backend servers receive the same ID?
```

Evidence: requests an explanation of how the same intended-operation ID can reach two backend instances. Does not yet propose concurrent duplicate enforcement. Treat as a scenario clarification, not a completed or failed concurrency answer. Previously correct reuse/new-ID distinction remains recorded.

Tutor explanation: requests go through a load balancer; the initial attempt with ID K may reach server A. The frontend can time out while A is still processing and retry with the same ID K, as established in Q1b. The load balancer may route that retry to server B. Both requests can therefore overlap. The identifier is unique per intended purchase, not restricted to one network delivery. This concurrency variant differs from Q1's already-committed, lost-response scenario; Q2 explicitly places the retry before the first commit. No database enforcement solution supplied.

Q2 remains pending: in that overlapping-retry scenario, what would ensure only one purchase can commit for K even when both initial database checks find no record?

Assistance: delivery/routing timeline explained; eventual grading must distinguish guided scenario understanding from independent enforcement reasoning. No new scores, queue changes, or tests.

### Q2 enforcement attempt

Learner response (verbatim):

```text
 we stored the ID to that purchase transaction. if the second one hit the DB, it will throw the error: failed, the purchase is already completed
```

Evidence: associates the ID with the stored purchase and expects the database to reject a duplicate. The specific database enforcement rule is not stated. Do not infer either a unique constraint or reliance on a repeated application-level check from this shorthand. "Purchase is already completed" also assumes an existing committed result; transaction outcome and retry response semantics remain to clarify after enforcement. No final score or review outcome yet.

## Q2b — Specify the database rule

What database rule makes the second insert fail instead of allowing two purchase rows with the same ID? A plain-language description is enough; SQL syntax is not required.

Response: pending. This probes the guarantee underlying the claimed duplicate error without supplying the constraint name. No database code or tests run; mastery and review queue unchanged.

### Q2b attempt and correction

Learner response (verbatim):

```text
maybe before we insert it, we can check that id first?
```

Evidence: proposes checking before insertion, which does not close the explicitly stated concurrent check/insert race. This confirms the enforcement gap left unspecified in Q2. Earlier correct identity-lifetime reasoning remains separate evidence. Conceptual review still in progress; no final score or completed outcome yet.

Tutor correction: A checks K and finds no row; B checks K and also finds no row; A inserts; without database enforcement B can insert too. A check can help with a fast existing-result lookup but cannot guarantee uniqueness. Enforce a database UNIQUE constraint on the purchase-attempt ID in the defined scope. The database prevents two rows with the same protected key from committing. In PostgreSQL, the conflicting insert can wait for an uncommitted competing transaction: if A commits, B gets a unique violation; if A rolls back, B may proceed. Therefore a duplicate attempt does not by itself prove completed success. Require a non-null key for this simplified design. No SQL syntax recall required; no commands or tests executed.

## Q2c — Correction check: rollback branch

Assume a database unique constraint on K. A inserts K but has not committed. B tries to insert K and waits. A then rolls back.

Can B now complete the purchase, or must it report that the purchase already succeeded?

Response: pending. Guided correction check; a correct response will not count as independent delayed mastery. Final evaluation, review scheduling, and returned-success contract remain to complete after actual evidence.

### Q2c response

Learner response (verbatim):

```text
yes, B can complete it.
```

Correct: after A rolls back, its uncommitted purchase no longer prevents B from proceeding under the assumed unique-key design. This is immediate guided understanding after the rollback branch was explained, not independent delayed retention. Tutor confirms the answer. No executable transaction or API evidence; final review evaluation remains pending.

## Q3 — Retry response after committed success

Return to the original scenario: A committed purchase P123 with attempt ID K, but its response was lost. B retries K. The backend now finds P123 already committed. No second purchase is created.

What should the API return to B: an error/warning requiring another purchase attempt, or the successful result for P123?

Response: pending. Clarifies the initial warning proposal without assuming that it meant an error. This prompt supplies the already-committed outcome; grade the resulting answer as a focused clarification, not a new independent implementation or edge-case demonstration. One question only; wait before feedback.

### Q3 response and correction

Learner response (verbatim):

```text
receive an error
```

Evidence: now explicitly chooses an error for a retry of an already committed successful purchase. Unlike the initial warning shorthand, this supports a response-contract gap. Retain the correct identifier-lifetime evidence and guided rollback answer separately. No implementation or executed-test evidence.

Tutor correction: for the stated same-key, same-payload retry with P123 already committed, return P123's successful purchase result without creating another purchase. The database duplicate-insert exception is an internal mechanism, not automatically the API outcome. If such a conflict is encountered, roll back the losing transaction before reading the existing committed result; only treat a conflict on the intended-operation key as this duplicate case. This scenario can also find P123 directly before insertion. A generic failure response can lead the frontend to show a failed purchase even though it succeeded, or encourage a new intended purchase that creates another voucher. Different-payload key reuse, unrelated database errors, and in-progress outcomes require their own contracts; no blanket claim that every duplicate/error means success. Exact HTTP status recall is not being assessed.

## Q3b — Response-contract correction check

If the retry returns P123's successful result, what should the frontend show the customer about that purchase?

Response: pending. Guided immediate correction check; do not count as independent delayed mastery. Final review evaluation and a fresh reassessment date remain to record after the answer. No code/API/database/tests executed.

### Q3b response

Learner response (verbatim):

```text
It just shows the purchase is successful, just like normal.
```

Correct: display the recovered purchase as successful. No additional purchase is created. This is an immediate guided correction check, not independent delayed retention.

## Final evaluation

- Conceptual understanding: 2/4, scoped to retry/idempotency. Independently identifies client-supplied operation identity and correctly reuses it for retries while changing it for separately intended purchases. Routing/overlap needed explanation; database enforcement and returning committed success needed correction. The pre-insert check does not close the race; an internal duplicate conflict is not automatically a failed purchase outcome. Correct rollback and frontend-display answers followed explicit teaching.
- Implementation correctness: unassessed; no runnable endpoint or SQL implementation.
- Edge-case handling: unassessed; guided rollback recognition alone is insufficient for an independent edge-case score.
- Testing quality: unassessed; no learner test design or executed tests in this review.
- Trade-off explanation: unassessed; no compared designs.

Outcome: needs_practice. Preserve the correct operation-identity evidence and all baseline history. No lateness penalty. No executable checks performed. The corrected design uses a stable per-intent key, database uniqueness in its defined scope, and the existing committed success result for same-key/same-payload retries. Other errors and payload mismatches need separate handling. Refer to the existing concept for transaction rollback details.

Next review: 2026-10-10, a fresh concurrency/response-contract scenario two days after correction. Stage remains 0. Next recommended topic: overdue be.auth ownership/trust-boundary review (due October 5), then be.sql (due October 8).

Scores, feedback, correction checks, and outcome: pending.
Checks run: none; no API, database, code, or learner tests executed. Dashboard onboarding checks are not assessment evidence.

## References and limits

- [Existing booking retry concept](../concepts/booking-retry-idempotency.md): source material previously verified October 4; voucher scenario is a new tutor-created transfer task. The exercise covers database purchase records only; external payment/provider side effects are outside its scope.
- PostgreSQL Global Development Group, [5.5. Constraints](https://www.postgresql.org/docs/18/ddl-constraints.html), PostgreSQL 18; publication date not specified. Useful for later uniqueness reasoning; established documented database behavior. Previously accessed October 4 in [backend source notes](../sources/2026-10-04-backend-baseline.md).
- Live reverification attempted October 8; HTTPS proxy returned `403 Forbidden` while establishing the tunnel. Page contents were not retrieved, and current documentation verification is not claimed. No new release/API claims are needed for this version-independent reasoning prompt.

## Scheduling and continuation

Existing pending review remains due October 5 while this assessment is incomplete. No stage advancement, failure, score change, or mastery inferred from elapsed time or session resumption. After actual evidence, apply the queue policy: proposed next review October 11 on independent success, or a fresh reassessment within October 9–11 after guidance. These dates are conditional, not recorded outcomes.

Next due priorities after this focused review: be.auth (October 5), then be.sql (October 8). Preserve actual responses verbatim before feedback; distinguish independent answers from guided correction checks.
