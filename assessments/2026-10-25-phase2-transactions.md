# Phase 2 transaction review: commit before response failure

Date:October25. Skill:be.transactions. Phase2 review1/3, originally dueOctober17. Status:in progress, first response pending. Java21/Spring Boot4 context, no unshown framework rollback behavior assumed.

## Situation

Booking starts with10 seats and no R900. A service transaction deducts2 seats and insertsR900. Its commit finishes before HTTP serialization begins.

```text
Service transaction: stock10 -> deduct2 -> insertR900 -> COMMIT
                                                         |
                                                         v
                                       Response serialization throws
                                       Client receives HTTP500
```

## Relevant operations

```sql
BEGIN;
UPDATE events SET seats_left = seats_left - 2 WHERE id = 42;
INSERT INTO reservations(id, event_id, seats) VALUES ('R900', 42, 2);
COMMIT;
-- Later, outside this completed transaction: response serialization fails.
```

## Assumptions

Both writes and COMMIT succeed. Serialization failure explicitly occurs afterward. No compensation transaction, retry, other writer or unshown recovery changes data. SQL/HTTP trace is hypothetical; no database/controller/serializer executed. HTTP500 is supplied response outcome, not a database result. API/annotation name recall optional.

## Q1 — State after response failure

Does the later HTTP-response failure by itself restore10 seats and removeR900? Explain the database state in one or two sentences.

Response:pending. No final state or rule supplied before attempt. Prior commit/affected-row successes preserved. No new score/date or practical transaction mastery.

## Sources and scheduling

Previously verified PostgreSQL18 transaction context in [transaction concept](../concepts/transactional-seat-reservations.md) and backend source notes; no newly retrieved docs or actual Spring boundary test claimed. Effective commit boundary is explicit. Existing stage2 describes earlier scoped conceptual history; choose actual next stage/date after independent/guided evidence. No lateness penalty.
