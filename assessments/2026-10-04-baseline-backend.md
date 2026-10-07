# Backend baseline — 2026-10-04

Status: started; Q1 awaiting response. No backend scores assigned.
Timezone: Asia/Taipei.

## Session goals and format

Sample API, SQL, transaction, access-control and Java reasoning with a reservation service. Begin with a closed-book concurrency trace; select follow-up difficulty from the actual response. Estimated session: 35–45 minutes, splittable. Pseudocode is accepted for reasoning, consistent with the learner's established preference. Runtime implementation requires separate evidence in an isolated project under exercises/.

Frontend reasoning results are available. Six frontend reviews are pending for 2026-10-05; none is due on this session date. Backend skills and dimensions remain unassessed until actual responses support evaluation.

## Environment observations

PATH discovery found java.exe and javac.exe under jdk-23.0.2 and mvn.cmd under apache-maven-3.9.9. These paths do not establish runtime compatibility or successful execution. Docker was not found on PATH; this does not prove it is absent. No installations or backend tests performed. Prepare the isolated coding project after the opening diagnostic establishes the appropriate scope and tooling.

## Q1 — Concurrent reservation reasoning

One seat remains for event 42. PostgreSQL 18 uses READ COMMITTED isolation for this scenario. Two distinct customers call the reservation API. Both requests run this pseudocode in separate database transactions:

```text
BEGIN
remaining = SELECT seats_left FROM events WHERE id = 42
if remaining > 0:
    INSERT INTO reservations(event_id, user_id) VALUES (42, current_user)
    UPDATE events SET seats_left = remaining - 1 WHERE id = 42
    COMMIT
    return "reserved"
else:
    ROLLBACK
    return "sold out"
```

`remaining` is an application-local value; the UPDATE writes its calculated value rather than subtracting from the current database row. There are no explicit read locks, extra concurrency controls, or constraints that limit the event's reservation count. Each request inserts a different customer's reservation.

Schedule: A reads 1; B reads 1; A inserts, updates and commits; then B inserts, updates and commits using B's earlier local value.

Questions:
1. What final seats_left value and how many reservation rows do you expect?
2. Does wrapping each request in a transaction guarantee that only one customer reserves the seat? Explain your reasoning.

Original response: "is this a common race condition synchronization problem? the final seats left will be reamining -1 but two are inserted correctly. so the data become wrong."

Evidence: learner independently identifies a race and the inconsistent reservation count. Interpreting "remaining -1" as the supplied expression, both local values are 1, so the final stored value is 0 and two reservation rows exist. The inserts may execute successfully while violating the business rule. The response has not yet explicitly explained the protection a transaction does or does not provide.

Feedback: confirmed the race and made the final numeric value explicit. Clarified successful inserts versus a valid business outcome. No broad skill score assigned from this single response; transaction isolation reasoning and a safe implementation remain pending.
Hints: none.
Scores: none.
Checks: not run; this is a supplied hypothetical trace, not a measured database result.

## Q1b — Prevent the inconsistency

Follow-up after confirming Q1's trace: does BEGIN/COMMIT alone prevent this race? Propose a change that guarantees at most one successful reservation for the final seat, even when requests run on different server instances. SQL or pseudocode is accepted; explain what happens to the losing request.

Original response: "I don't know what is BEGIN / COMMIT. are they SQL? I think the SQL has some way to check the data safely, if the count is 0 when executing, it will rollback the transaction? sorry i am not familiar with the actual implementation"

Evidence: learner explicitly reports unfamiliar transaction-command syntax and suggests checking current availability during execution, with rollback if none remains. This is useful conceptual direction but does not yet establish an atomic check/write mechanism or implementation. Unfamiliar syntax is recorded separately from conceptual gaps; no score assigned yet.

Progressive hint: BEGIN starts a database transaction, COMMIT finalizes its changes, and ROLLBACK discards its uncommitted transactional changes. The block groups writes into an all-or-nothing unit; READ COMMITTED does not automatically serialize this read/calculate/write workflow. Zero inventory is a business condition, not an automatic SQL failure. Feedback references the official PostgreSQL 18 transaction tutorial. No complete reservation implementation disclosed.

## Q1c — Atomic check and update

Try the database-operation idea in plain language: how could the availability check and decrement happen together, rather than using the earlier local read? If that operation changes zero rows, should a reservation be inserted? SQL syntax is optional.

Original response: "it looks like we can not insert the reservation directly if the seats remain changes to zero."

Evidence: response may conflate the resulting inventory value with the number of rows changed by the conditional operation. This is ambiguous, so no misconception or score assigned from this wording alone. Clarification asks about a successful decrement from 1 to 0 versus an operation that changes no row.

This is a guided follow-up, not independent baseline evidence. No code or tests run. A short fresh transaction-understanding assessment is proposed for 2026-10-05; unanswered work remains pending.

## Q1d — Remaining seats versus affected rows

The proposed operation checks that seats_left is greater than 0 and subtracts 1 in the same database operation. A changes one row from 1 to 0. B later finds 0 seats, so B changes zero rows. Which customer should receive a reservation, and why? Distinguish remaining seats from rows changed.

Original response:

```text
hmm, wrap the operation in the BEGIN and COMMIT

BEGIN
 if seats > 0:
   seats -= 1
   if reservation id not exists:
     insert reservation with id
COMMIT

something like this?
```

Evidence: learner groups decrement and insertion within a transaction and proposes availability and duplicate-ID checks. The sketch does not specify whether availability checking and decrement are a single conditional database write or a separate read/write; it therefore does not yet establish concurrency safety. The duplicate-ID check raises a separate retry concern and is not itself a concurrency guarantee. No code run; implementation correctness remains unassessed.

Post-attempt correction: show PostgreSQL conditional UPDATE with seats_left = seats_left - 1, WHERE id = 42 AND seats_left > 0, and RETURNING id. Explain that one returned row authorizes insertion in the same transaction, no returned row means sold out, and failed insertion must roll back the decrement. Explain BEGIN/COMMIT grouping does not make a separate application read/check/write safe. Reservation-ID uniqueness is separate from inventory availability; do not infer the proposed check handles concurrent duplicates.

## Q1e — Rollback of a failed reservation

After the conditional UPDATE claims the last seat, reservation insertion fails before commit. Should the decrement be committed or rolled back, and what should seats_left be after rollback?

Original response: "rollback, seats_left becomes its original value (+1)"

Feedback: correct for the supplied failure-before-commit scenario: rollback undoes the successful decrement, restoring 0 to 1. It is database rollback, not a separately committed compensating increment.

Scoped evaluation for Q1–Q1e: be.transactions conceptual_understanding = 2. Independent race recognition plus correct immediate rollback reasoning, with substantial guidance needed to distinguish transaction grouping from isolation and to express an atomic conditional write. This is narrow conceptual evidence, not a broad backend grade. SQL syntax unfamiliarity itself does not lower the score. Implementation correctness, edge-case handling, testing quality and trade-off explanation remain unassessed. No SQL or tests run. Fresh review: 2026-10-05. Concept: ../concepts/transactional-seat-reservations.md.

## Q2 — Retrying an uncertain request

There are initially 10 seats. A customer's reservation succeeds and commits, leaving 9 seats, but the response is lost. The client retries the same intended booking. Each server call generates a new reservation ID, so the retry's ID differs from the first.

Does checking whether the new reservation ID exists prevent a second booking? What identifier or mechanism would you use to recognize the same intended operation, and what should the retry return?

Original response: "no the check of new generated id does not prevent second booking. it will book twice. (if the id is a randomly generated id) maybe using a timestamp to recognize the retry? if the two bookings are too close, we return a already booking, try later warning?"

Evidence: independently recognizes that new random reservation IDs do not identify retries and permit duplicate bookings. Proposes temporal proximity as a heuristic and a warning response. This does not yet establish stable operation identity or returning the existing committed result. No score assigned for Q2 yet; probe limitations before showing a solution.

## Q2b — Timing versus operation identity

Counterexamples: the customer deliberately makes two distinct bookings within one second; alternatively, a retry of one booking arrives five minutes later after a network outage. Can a closeness-in-time rule distinguish both correctly? What value could the client create once per intended booking and reuse on every retry?

Original response: "create a composite key from that same booking by using some fixed column of data?"

Evidence: learner proposes a stable composite key based on booking fields. This may encode a valid domain uniqueness rule, but does not by itself distinguish a retry from two intentionally identical booking requests when the domain permits them. Exact columns and business restrictions remain unspecified; do not infer a misconception or correctness beyond the proposal.

Feedback: distinguish domain uniqueness (for example, one reservation per user/event) from per-intended-operation identity. Use a scenario that explicitly permits two identical purchases; show progressive hint of a client-generated token that stays stable across retries and differs for each new intended operation.

## Q2c — Stable retry identifier

For this scenario a customer may intentionally buy two separate tickets for the same event with the same booking fields. The client creates bookingAttemptId = a random UUID when starting one intended booking, then reuses it for retries. For a separate intended booking it creates a new value. If the original request committed but its response was lost, what should the server do when it receives the same bookingAttemptId again?

Original response: "it block the booking. return the booking is already succeeded"

Evidence: correctly rejects repeating the booking side effect and returns an already-successful outcome for the retry. This is a correct guided follow-up. Clarify returning the existing reservation identifier/details, rather than treating a successful retry as a booking error. Concurrent duplicate handling remains unassessed.

## Q2d — Concurrent duplicate requests

Two server instances receive the same bookingAttemptId at nearly the same time. Both check whether it exists and both see no record. Is a check-then-insert sufficient? Where would you enforce uniqueness of the bookingAttemptId so both servers must obey it? Plain language is accepted.

Original response: "stores the booking attempt id to the DB, and check it before insert? if fails, rollback?"

Evidence: chooses the shared database and rollback on failure, but repeats a check-before-insert without explicitly specifying a database uniqueness guarantee. Correct storage location does not by itself close the concurrent check/insert race.

Post-attempt correction: enforce a NOT NULL unique database key for the intended-operation identifier within its defined scope, rather than relying on a SELECT check. In the simplified reservation-only design, seat decrement and reservation insertion belong to the same transaction, so a losing duplicate insert rolls back that transaction's decrement. After rollback, retrieve the committed existing reservation in a fresh transaction. Do not say every insert failure indicates a successful duplicate; distinguish a uniqueness conflict on the intended-operation key from other errors. If a duplicate's original operation remains in progress, a committed success may not yet be available. Full production idempotency includes request-payload matching and caller scoping, not assessed here.

## Q2e — Duplicate insert and inventory rollback

Simplified scenario: two seats remain initially. A and B carry the same bookingAttemptId. A decrements one seat, inserts a reservation, and commits. B then decrements one seat but its insert fails specifically because the database's unique bookingAttemptId key matches A's committed reservation. B rolls back its transaction and then retrieves A's reservation.

What are the final seats_left and reservation count, and what should B return?

Original response: "final seat count is 1, reservation count 1. B returns the success A's result? But i wonder why there is a B for the same user? what scenario causes it"

Evidence: correctly computes inventory and reservation count after duplicate-specific rollback, and returns A's successful result. Asks for the real scenario behind duplicate requests. Clarified A and B are request attempts, not different users: a response lost after commit and a retry can reach different server instances. A double submission uses the same key only if the client deliberately reuses the pending operation's identifier. Separate intentional purchases require different keys even for the same user.

Scoped evaluation for Q2–Q2e: be.rest conceptual_understanding = 2 for retry/idempotency reasoning only. Independently recognized that fresh random IDs permit duplicate bookings; stable per-operation identity and database uniqueness needed guidance. Correct immediate result/rollback reasoning does not demonstrate delayed independent mastery. SQL constraint implementation, API implementation, edge-case handling, testing and trade-off dimensions remain unassessed. Review due 2026-10-05 with a fresh retry scenario. Concept: ../concepts/booking-retry-idempotency.md.

## Next actions

## Q3 — Reservation access control

The API has already validated the session: the requester is user 17. Reservation 900 belongs to user 28. This endpoint is for ordinary customers, not administrators. IDs are not secrets.

```text
GET /reservations/900?userId=28

requester = authenticateSession(request)  // user 17
reservation = db.findReservation(request.path.reservationId)

if reservation.userId == request.query.userId:
    return 200, reservation
else:
    return 403
```

Questions: does user 17 receive user 28's reservation? Identify the trust-boundary problem and propose a safe ownership check. Plain language or pseudocode is accepted.

Original response: "the user 17 will not receive the 28's reservation because 17 is unauthorized. isn't it a correct result? can you state the question again?"

Evidence: states the intended access-control outcome, but does not yet trace the supplied implementation. Learner requests clarification, so do not assign a score or assume the intended policy statement establishes code-reading behavior.

Clarification: distinguish intended security policy from the endpoint's actual return value. authenticateSession establishes requester.userId = 17 but does not perform a reservation ownership check. The request supplies query.userId = 28; the loaded reservation has userId = 28. No additional permission middleware exists in this hypothetical. Re-present pseudocode with these explicit fields and ask which return branch executes, then what should be compared instead. The actual branch result is not disclosed before the revised attempt.

Revised original response: "oh i got it. the server will return the 28 for the 17 because the server gets the id from the url. we need to fix the condition. it should compare the reservation id with the session user token."

Evidence: after clarification, correctly predicts unauthorized disclosure and identifies caller-controlled URL data as the trust issue. Proposes session identity as the trusted source but wording mixes reservation object ID with owner user ID and raw token with verified identity. Clarify the identifier types before scoring; do not interpret imprecise wording as a proven conceptual error.

Correction: reservation.id identifies the reservation; reservation.userId identifies its owner. authenticateSession yields a verified requester.userId. For this customer-only ownership policy, compare reservation.userId with requester.userId, not object ID with token text and not URL userId. Authentication and ownership authorization are distinct checks.

## Q3b — Match identifier types

Reservation id = 900, reservation owner userId = 28. Verified requester userId = 28. Should that requester be allowed to read this reservation even though 900 is not equal to 28? Explain which values matter.

Original response: "what do you mean 900 != 28? if the 900 is not for 28, the 28 should not get the data of 900"

Evidence: correctly states the ownership policy conditionally. Tutor's numeric inequality wording was interpreted as a statement of non-ownership; it does not establish an authorization misconception. No score assigned from this clarification exchange.

Prompt repair: explicitly show a reservation record { id: 900, userId: 28 } and explain that 900 is its booking number and 28 is the owner account number. The numbers need not match, just as an order number need not match a customer account number. State directly that user 28 owns reservation 900 in the supplied scenario; only comparing owner userId with verified requester userId implements the given policy. Do not repeat numeric inequality as a proxy for ownership.

Learner acknowledgment after clarification: "yes, that's it". This confirms agreement, not new independent assessment evidence.

## Q3c — Access-control test design

Reservation 900 belongs to user 28. Propose three tests for the corrected endpoint: owner access, another logged-in user trying to access it, and a request with no valid session. For each, state the session identity (or absence), request, and expected outcome. Include a forged query userId in the nonowner case. Plain language is accepted; distinguish authentication failure from ownership denial. Do not disclose expected results before the attempt.

Original response:

```text
1. assert returning correct data
2. assert returning 403
3. assert returning 403
```

Evidence: proposes the appropriate owner-success assertion and denial despite a forged query identity. Also denies the missing-session request, protecting the data. Does not explain authentication versus ownership denial and uses the same status for both. Status codes were optional, so this does not by itself establish a conceptual failure or justify lowering an otherwise-supported score. No tests written or executed; these are proposed assertions only. Real integration setup, response shape checks and additional cases remain unverified.

Feedback: for a typical HTTP-authenticated API contract, case 1 returns 200 with the owner's reservation, case 2 returns 403 for an authenticated nonowner (or a deliberately documented 404 concealment policy), and missing/invalid credentials use 401 with an appropriate WWW-Authenticate challenge as required by the chosen authentication scheme. Explain the distinction without treating unfamiliar status labels as a programming deficiency. Ground status semantics in RFC 9110.

## Q3d — Authentication versus authorization

In plain language, what is the difference between case 2 (logged-in nonowner) and case 3 (no valid session)? Why must the server establish a trustworthy requester identity before applying the ownership check?

The delivered follow-up was narrowed to: "why can't a caller establish their identity simply by sending ?userId=28?"

Original response: "because anyone can easily forge that url params and get anyone's data"

Evidence: correctly explains that query parameters are caller-controlled and cannot prove identity. This is an immediate guided follow-up after ownership and status corrections, not delayed independent mastery.

Scoped evaluation for Q3–Q3d: be.auth conceptual_understanding = 2. Correct intended denial policy and final trust-boundary reasoning; actual-code tracing needed clarification. Tutor's ambiguous object-ID versus user-ID wording is explicitly excluded as negative evidence. Status-code unfamiliarity itself is not penalized. Testing_quality = 2 for proposed assertion design only: covers owner access, forged nonowner and absent session, but no executable tests, authenticated fixtures, exact denial payloads or missing-resource cases demonstrated. Implementation correctness, edge-case handling and trade-off explanation remain null. No endpoint/tests run. Fresh review due 2026-10-05; concept: ../concepts/reservation-access-control.md.

## Q4 — Relational query reasoning

Tables:

```text
events(id, name)
1, "Workshop"
2, "Meetup"

reservations(id, event_id, status)
101, 1, "confirmed"
102, 1, "cancelled"
```

Return every event with its confirmed reservation count, including events with none. Expected rows: Workshop = 1, Meetup = 0. SQL or plain-language query steps are accepted. Which join would keep the zero-reservation event, and how would you exclude cancelled reservations without dropping that event?

Original response received 2026-10-07: "distinct and count the type = confirmed from the reservation. then join the events and count result."

Evidence: proposes filtering confirmed reservations, counting them, and joining the aggregate to events. This can be valid if the count is grouped by event and the join preserves events without matches. DISTINCT's intended target, grouping key, join type and missing-count handling are unspecified. Do not assume a correct or incorrect implementation from shorthand alone; no SQL score assigned yet. No query executed.

## Q4b — Aggregation keys and missing matches

Clarify the proposed aggregate-then-join approach: what field groups the reservation counts, which join keeps Meetup when there is no count row for it, and what should a missing count display? Explain what DISTINCT removes; two separate confirmed reservation IDs for the same event should both count.

Original response received 2026-10-07:

```text
1. group the column which "confirmed" live
2. right join if the events is on the left
3. idk. i think the count with nothing shows zero?
4. if no distinct . how about using LIKE %confirm% ?
```

Evidence: grouping by status combines events rather than producing per-event counts; RIGHT JOIN preserves the right table, whereas the proposed events-left ordering needs LEFT JOIN. A preaggregated count row does not exist for an event without confirmed reservations, so the outer join yields NULL, not an already-computed COUNT of zero. DISTINCT removes duplicate values/rows, while LIKE is text-pattern filtering; neither is required for counting all confirmed reservation rows by event. Exact status equality suffices for this exercise.

Scoped conceptual_understanding score: 1 for be.sql aggregation/outer-join reasoning. The initial filter/count/join plan shows partial understanding, but grouping, preserved-side selection and missing-count handling require substantial explanation. This is based on relational reasoning, not memorized SQL syntax. Implementation correctness, edge-case handling, testing quality and trade-off explanation remain null. No query run.

Correction: filter status = 'confirmed', GROUP BY event_id with COUNT(*), LEFT JOIN that aggregate from events, and COALESCE the missing aggregate count to 0. Reference solution in concepts/event-reservation-counts.md. Fresh independent review proposed for 2026-10-08. Earlier overdue reviews remain pending, not failed.

## Q4c — Event with only cancelled reservations

Add event 3 (Conference) with two cancelled reservations and no confirmed reservations. What should the corrected query return for Conference, and why should Conference remain in the output?

Original response received 2026-10-07: "it should display 0, and because we use left join"

Evidence: correctly predicts zero and identifies LEFT JOIN as the reason the event remains. This is an immediate guided correction check, not independent delayed mastery. Conceptual score remains 1 for the original probe; other dimensions remain null. Fresh independent SQL review remains due 2026-10-08. No SQL or tests executed.

No API or tests executed. This samples be.auth conceptual reasoning, not implementation correctness.

## Continuing actions

Record the original response before feedback. Ask for a corrected approach and deterministic test scenario afterward, adjusting prompts to the observed understanding. Research metadata: ../sources/2026-10-04-backend-baseline.md. Do not expose a reference solution before the attempt.
