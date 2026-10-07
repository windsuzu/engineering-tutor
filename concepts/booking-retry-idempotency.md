# Booking retries and idempotency

## Summary

Multiple request attempts can represent one intended booking. Use a stable identifier for that intended operation so retries do not create extra reservations, and return its existing committed result.

## Explanation and example

The client creates a bookingAttemptId once when starting an intended booking, then reuses it for retries. A separately intended booking gets a new identifier. The server's newly generated reservation ID is an output and does not by itself connect repeated attempts to the same intent.

Example: A commits a booking but its response is lost. The client times out and retries as request B with the same attempt ID; B may reach another server instance. The database can contain a successful reservation even though the client never saw a success response. A and B are request attempts, not necessarily different users.

Time proximity is a heuristic, not reliable operation identity. Two intentional purchases can be close together, while a retry can arrive much later. A key made from booking fields is appropriate only if it represents the domain's actual uniqueness rule; identical allowed purchases still need separate intent identifiers.

## Database guarantee and rollback

Checking for a key before insertion cannot alone prevent concurrent duplicates. Two servers can both find no existing row. Use a non-null database unique key in the defined caller/operation scope to enforce the invariant.

In the simplified assessed design, seat decrement and reservation insertion are in one transaction. A duplicate-specific insertion failure causes rollback, including its seat decrement. After rollback, obtain the existing committed reservation in a fresh transaction and return its result. Do not treat unrelated database failures as a successful duplicate.

## Applications and edge cases

Useful for reservation APIs and retried writes with uncertain client-visible outcomes. The assessed design covers transactional database effects only; it does not implement external payment or message side effects. A complete API must define caller scoping, payload mismatches for reused keys, requests still in progress, retention periods, and recovery. These cases have not yet been assessed.

Double clicks duplicate one operation only if the client reuses its pending attempt ID; generating a new key per click makes them distinct operations. Same user alone is not a duplicate identifier.

## Common misconceptions

- Fresh server-generated IDs automatically deduplicate retries.
- Timestamp proximity establishes the same intended operation.
- A shared database plus a pre-insert check guarantees uniqueness.
- A successful server commit guarantees the client received the response.

## Verified sources and version context

- [PostgreSQL 18 constraints](https://www.postgresql.org/docs/18/ddl-constraints.html) supports the database uniqueness guarantee.
- [PostgreSQL 18 transactions](https://www.postgresql.org/docs/18/tutorial-transactions.html) supports transactional rollback.
- Accessed 2026-10-04; metadata in [backend research](../sources/2026-10-04-backend-baseline.md).
- The request/retry flow is an illustrative application design; no SQL, API or tests were executed.

## Demonstrated understanding and gaps

[Q2–Q2e](../assessments/2026-10-04-baseline-backend.md): independently recognized random-ID duplicate risk; correctly followed rollback and returned original success after guidance. Scoped conceptual score 2. Stable operation identity and database uniqueness needed explanation. Independent transfer, API contracts, concurrency implementation and tests remain unverified.

Next review: 2026-10-05.
