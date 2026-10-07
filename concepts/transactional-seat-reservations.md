# Transactions and concurrent seat reservations

## Summary

Use a transaction to keep claiming a seat and recording its reservation together. Use a concurrency-safe database operation to prevent two customers from claiming the last seat. These are separate requirements.

## Explanation and example

BEGIN starts the transaction; COMMIT finalizes it; ROLLBACK discards its uncommitted transactional changes. A separate application read, check and write can still use stale data under PostgreSQL READ COMMITTED.

```sql
BEGIN;
UPDATE events
SET seats_left = seats_left - 1
WHERE id = 42 AND seats_left > 0
RETURNING id;
```

The application checks the returned result. A returned row means this operation claimed a seat; insert the reservation within this same transaction and commit only if insertion succeeds. No returned row means no seat was claimed by this operation; do not insert a reservation. In this scenario, the event exists; a real API must distinguish missing events where its contract requires that.

The returned-row count is different from the new inventory value. Claiming the last seat changes one row from 1 to 0 and permits one reservation. A following attempt changes no rows and permits no reservation. Under PostgreSQL 18 READ COMMITTED, concurrent updates to the same row wait where needed and re-evaluate the predicate against the updated row after the preceding updater commits.

## Failure handling and edge cases

If insertion fails before commit, roll back the transaction, including the decrement. Rollback is not an extra independent increment operation. A response lost after commit is a different problem: rollback of the already committed transaction is unavailable, and retry handling needs its own design. Concurrent decrements do not by themselves prevent duplicate bookings for the same intended client operation.

## Common misconceptions

- Treating BEGIN/COMMIT as automatic protection for any application read/check/write sequence.
- Confusing zero remaining seats with zero affected or returned rows.
- Assuming zero seats is an automatic SQL error that triggers rollback.

## Practical applications

Limited inventory, quota allocation and reservations whose database records must agree with availability. Specify the database and isolation level instead of assuming all engines behave identically.

## Verified references and version context

- [PostgreSQL 18: Transactions](https://www.postgresql.org/docs/18/tutorial-transactions.html).
- [PostgreSQL 18: Transaction Isolation](https://www.postgresql.org/docs/18/transaction-iso.html).
- Accessed 2026-10-04. Full source metadata: [backend baseline research](../sources/2026-10-04-backend-baseline.md).
- The SQL is explanatory and has not been executed in this assessment.

## Demonstrated understanding and remaining gaps

[Backend Q1–Q1e evidence](../assessments/2026-10-04-baseline-backend.md): independently recognized the original race; correctly chose rollback after guided correction. Conceptual score 2 for this narrow scenario. Atomic check/write needed guidance; fresh independent transfer and runnable implementation remain unverified. Unsupported dimensions remain null.

Next review: 2026-10-05, using a fresh scenario.

## Delayed review evidence — 2026-10-07

[Fresh transfer review](../assessments/2026-10-07-review-transactions.md): independently proposes one transaction for both transfer writes and correctly explains that rollback cannot undo an already-committed deduction after a question clarification. Scoped conceptual score 3 for grouping and commit boundaries. The earlier reservation concurrency/isolation gap still needs a separate fresh probe; no implementation or tests run. Preserve the initial score 2 and its assistance history above.

The previously proposed 2026-10-05 review was completed late on 2026-10-07 without penalty. Next active review: 2026-10-10.
