# SQL review: open tickets per support team

Date: 2026-10-09 (Asia/Taipei).
Skill: be.sql, scoped to filtering, aggregation, join preservation, and missing counts.
Status: completed; needs practice on join preservation. Independent grouping and COALESCE evidence retained.
Reason: review due October 8 after substantial grouping/outer-join correction in [backend Q4–Q4c](2026-10-04-baseline-backend.md#q4--relational-query-reasoning). Oldest due item after completing access control.
Estimated duration: 5–10 minutes, one question at a time.
Objectives: produce separate per-team counts while preserving teams with zero open tickets. Prerequisites: tables, filtering, joining, counting. Plain-language query steps or SQL accepted; unfamiliar syntax is not a conceptual penalty.

## Q1 — Group the counts

Tables:

```text
teams(id, name)
10, Platform
20, Billing
30, Support

tickets(id, team_id, status)
101, 10, open
102, 10, open
103, 20, closed
104, 20, open
```

The report must eventually list every team with its open-ticket count, including zero. First consider only aggregating ticket rows: after filtering to status = 'open', which column should GROUP BY use to produce a separate count for each team?

Learner response: pending. No grouping key or reference query disclosed. Follow with join/missing-count probes after the answer, one at a time. No SQL or tests executed; no score, review outcome, or new mastery inferred.

### Q1 response

Learner response (verbatim):

```text
teamId
```

Correct: identifies the team foreign key (`team_id` in the supplied schema) as the grouping column. Treat camelCase as equivalent plain-language naming, not a SQL syntax error. No grouping rule supplied before the answer; supports independent per-team aggregation reasoning. Tutor confirms. No final score, completed review, or SQL execution inferred.

## Q2 — Keep teams without open tickets

The report starts with `teams` on the left and joins the per-team open-ticket counts on the right. Support (team 30) has no tickets, so there is no count row for it.

Which join type keeps Support in the report despite that missing count row?

Response: pending. One focused preserved-side question; no join solution supplied before the attempt. Missing-count display remains to probe afterward. Mastery and review queue unchanged while incomplete.

### Q2 response and correction

Learner response (verbatim):

```text
Right join
```

Evidence: chooses RIGHT JOIN despite teams being explicitly on the left. RIGHT JOIN preserves the right input (aggregated counts), which has no row for team 30. Confirms a remaining preserved-side distinction gap also observed in the baseline. Correct independent grouping answer remains separate evidence. No final score or completed review yet.

Tutor correction: LEFT JOIN keeps every row from its left input; RIGHT JOIN keeps every row from its right input. With teams on the left, LEFT JOIN preserves team 30 even when no count row matches. RIGHT JOIN would work with teams on the right instead. Join names identify the side whose rows are preserved, not the direction of the link or the location of missing data. No SQL or tests executed.

## Q2b — Preserved-side correction check

Now reverse the order: aggregated counts are on the left and teams are on the right. Which join keeps every team, including those without matching counts?

Response: pending. One guided immediate correction check; correct response will not establish independent delayed mastery. Missing-count display remains to probe afterward; mastery and queue unchanged while this review continues.

### Q2b response and teaching preference

Learner response (verbatim):

```text
can you show to example code and result for better demonstration? do this in an claude /eli5 style from now on.
to answer your question is RIGHT JOIN
```

Correct: with teams on the right, RIGHT JOIN preserves all teams. This follows explicit preserved-side teaching and is a guided correction check, not independent retention. User requests simple ELI5-style explanations, small example code, and concrete results going forward. Honor that preference while asking one question at a time and preserving actual evidence.

## Executed tutor demonstration

Executed October 9 using Python sqlite3, SQLite 3.53.1, an in-memory database with the Q1 teams/tickets. No repository database, source code, or dependencies changed. This is tutor-run illustrative SQL, not learner implementation or test evidence, and not a PostgreSQL execution claim.

Aggregation:
```sql
SELECT team_id, COUNT(*) AS open_count
FROM tickets
WHERE status = 'open'
GROUP BY team_id
ORDER BY team_id;
```
Actual result: `(10, 2), (20, 1)`; no aggregate row for team 30.

Teams-left demonstration:
```sql
WITH counts AS (
  SELECT team_id, COUNT(*) AS open_count
  FROM tickets
  WHERE status = 'open'
  GROUP BY team_id
)
SELECT t.name, c.open_count
FROM teams AS t
LEFT JOIN counts AS c ON c.team_id = t.id
ORDER BY t.id;
```
Actual result: `Platform | 2`, `Billing | 1`, `Support | NULL`.

With the same counts CTE, changing only LEFT JOIN to RIGHT JOIN while keeping teams left yields `Platform | 2`, `Billing | 1`; Support is absent. Reversing the order to `FROM counts AS c RIGHT JOIN teams AS t ON c.team_id = t.id` restores `Platform | 2`, `Billing | 1`, `Support | NULL`. All four result sets asserted against expected rows and passed. Python None represents SQL NULL.

ELI5 explanation: choose the list whose entries must all appear. LEFT keeps the left list; RIGHT keeps the right list. Support stays when teams are preserved, but its count cell is NULL because no count row matched. Providing this missing-row explanation is teaching; do not score subsequent recognition as fully independent null-semantics evidence.

## Q3 — Display the missing count

How would you make Support display 0 instead of NULL in the report? SQL or plain language is fine.

Response: pending. One focused question; no conversion function supplied before the attempt. Missing-match meaning was explained in the demonstration. No final score or review rescheduling; tutor-run checks do not establish learner mastery.

### Q3 response

Learner response (verbatim):

```text
So if you want to keep the left table always displayed, you just left join?

To answer your question, if you want to support dosplay zero instead of null, you use COALESCE(Val, 0)
```

Correct NULL-to-zero expression, supplied without the function being disclosed in this review. The missing-match meaning was taught immediately beforehand. Confirm LEFT JOIN preserves the left rows at the join step; subsequent WHERE filters can still remove them. Tutor-run in-memory SQLite 3.53.1 demonstration using COALESCE(c.open_count, 0) returned Platform=2, Billing=1, Support=0; asserted expected rows and passed. This verifies the illustration, not a complete learner-written query or PostgreSQL runtime behavior.

## Final evaluation

- Conceptual understanding: 2/4 for per-parent aggregation and outer-join preservation. Independently chooses team_id grouping and supplies COALESCE(value, 0); still chooses the wrong preserved side in Q2 and needs LEFT/RIGHT explanation. Correct reversed-order answer follows teaching. Missing aggregate-row semantics were demonstrated rather than independently assessed.
- Implementation correctness, edge-case handling, testing quality, and trade-off explanation: unassessed. No complete learner query, independently handled cases, learner tests, or compared designs. Tutor-run example assertions are not learner testing evidence.

Outcome: needs_practice, with improvement over baseline grouping/null-conversion evidence; no successful delayed review stage advancement. Preserve all original responses. Next review October 11, two days after correction, with a fresh preserved-side and post-join-filter scenario. Stage 0. Next recommended topic: fe.react request validity, due October 9, followed by accessibility and Next.js reviews also due today.

## References and limits

- PostgreSQL Global Development Group, [7.2. Table Expressions](https://www.postgresql.org/docs/18/queries-table-expressions.html), PostgreSQL 18; publication date unspecified. Useful for GROUP BY and preserved-side outer-join semantics; established documented behavior. Previously accessed October 7 in [backend research](../sources/2026-10-04-backend-baseline.md).
- Related aggregate and conditional-expression references are recorded in that source note and the existing [event-count concept](../concepts/event-reservation-counts.md).
- Live table-expression reverification attempted October 9; HTTPS proxy returned tunnel `403 Forbidden`. Page contents not retrieved; current verification not claimed. This is a tutor-created transfer exercise using previously verified relational concepts, not a runtime result or release claim.

Queue remains due October 8 while incomplete. Conditional next review October 12 on independent success, otherwise fresh reassessment within October 10–12 after correction; record only after actual evidence. Never infer a failure from lateness or a response from an unanswered prompt.
