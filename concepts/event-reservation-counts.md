# Counting reservations while keeping every event

## Summary

Filter reservation rows to confirmed status, count them per event, and preserve every event when joining those counts. A missing count row becomes zero for display.

## Explanation and example

```sql
SELECT e.id, e.name, COALESCE(c.confirmed_count, 0) AS confirmed_count
FROM events AS e
LEFT JOIN (
    SELECT event_id, COUNT(*) AS confirmed_count
    FROM reservations
    WHERE status = 'confirmed'
    GROUP BY event_id
) AS c ON c.event_id = e.id
ORDER BY e.id;
```

WHERE selects which reservations count. GROUP BY event_id creates one count per event rather than one total for the confirmed status. LEFT JOIN preserves events because events is on the left. When an event has no matching aggregate row, joined c fields are NULL; COALESCE converts that missing value to zero.

## Misconceptions and distinct operations

- Grouping by status answers counts per status, not counts per event.
- RIGHT JOIN preserves its right input; it would work with events on the right, not with events on the left here.
- COUNT over zero input rows can return zero, but GROUP BY does not generate a row for an absent group. After joining a missing aggregate, the count field is NULL.
- DISTINCT removes duplicate selected values/rows; LIKE matches a text pattern. Neither is a substitute for grouping or for the exact status filter. Separate confirmed reservation IDs for the same event should both count.

## Practical applications and edge cases

Useful for dashboards showing all parents, including those with no matching children. Preserve separate events with identical names by grouping on event ID, not just name. Events with only cancelled reservations still appear with zero confirmed reservations. If the query later joins additional one-to-many tables, reconsider row multiplication rather than adding DISTINCT blindly.

## References and version context

- [PostgreSQL 18 table expressions](https://www.postgresql.org/docs/18/queries-table-expressions.html).
- [PostgreSQL 18 aggregates](https://www.postgresql.org/docs/18/functions-aggregate.html).
- [PostgreSQL 18 conditional expressions](https://www.postgresql.org/docs/18/functions-conditional.html).
- Accessed 2026-10-07. Source metadata: [backend research](../sources/2026-10-04-backend-baseline.md).
- This reference query has not been executed; no runtime result claimed.

## Demonstrated understanding and remaining gaps

[Q4/Q4b](../assessments/2026-10-04-baseline-backend.md): proposes filtering/counting before joining, but grouping key, preserved join side and missing-count semantics need explanation. Scoped conceptual score 1. Implementation, query tests and independent transfer unverified. Q4c is an immediate guided check, not a delayed review.

Next review: 2026-10-11, with a fresh preserved-side and post-join-filter scenario.

Immediate Q4c follow-up on 2026-10-07 correctly predicts zero for an event with only cancelled reservations and identifies LEFT JOIN preservation. This supports corrected understanding after explanation, not independent delayed retention; original probe score remains unchanged.

## October 9 review

[Support-ticket review](../assessments/2026-10-09-review-sql.md#final-evaluation): independently selects the team grouping key and supplies COALESCE(value, 0), but chooses RIGHT JOIN with teams on the left. Explained preserved-side semantics; reversed-order correction answer is guided. Conceptual 2/4 for this narrow review; practical implementation, testing, and broader SQL skill remain unverified. Tutor-run SQLite 3.53.1 examples confirmed illustrated aggregation/join results and the zero display; no PostgreSQL queries or complete learner queries executed. Earlier evidence preserved.

LEFT JOIN preserves left rows at the join step. A later WHERE condition on unmatched right-hand values can reject their NULLs and remove those preserved rows. No learner understanding of that filtering edge case assessed yet.
