# Transaction review — 2026-10-07

Skill: be.transactions. Queue item: review-be-transactions-2026-10-04.
Status: completed; successful narrow conceptual review. Originally due 2026-10-05; overdue is not failure.

## Fresh transfer question

A hypothetical transfer moves 100 credits from Alice to Bob. The application issues two database updates separately. Autocommit is enabled, and there is no transaction grouping both updates.

1. Subtract 100 from Alice; this update succeeds and commits.
2. Add 100 to Bob; this update fails.

Can a ROLLBACK issued afterward undo Alice's already-committed deduction? How should the two updates be arranged so this failure does not leave Alice charged without Bob credited? Plain language is accepted.

## Evidence and research

Original response: "YES, you should wrap the Deduct and Add in to one single transaction."

Evidence: independently proposes grouping both updates in a single transaction, the correct preventive design. The opening YES is ambiguous about whether rollback can undo an already committed deduction; do not infer a misconception or a successful review of this boundary without clarification.

Clarification: in the original scenario Alice's deduction already committed before Bob's update failed. Does issuing ROLLBACK afterward restore Alice's balance, or does the single-transaction fix need to be in place before either update commits?

Clarified original response: "oh, if the deduction is \"committed\". it cannot be rollback sadly."

Evaluation: conceptual_understanding = 3 for transaction grouping and the commit/rollback boundary in this new transfer scenario. Independently proposes grouping deduction and credit, then correctly distinguishes already-committed changes after the question is clarified without disclosing the answer. Initial YES ambiguity is preserved and is not treated as a failure. This evidence does not demonstrate concurrent reservation isolation, database implementation, or compensation design. Unsupported dimensions remain null.

Correction/confirmation: group both writes before commit, and roll back uncommitted changes when the credit fails. A later ROLLBACK cannot undo the previously committed deduction; repairing such an already-committed partial transfer requires a separately designed recovery operation.

Review outcome: success, stage advanced from 0 to 1. Next review: 2026-10-10 (three days after this successful first delayed review). Keep the active queue item pending for its next scheduled attempt and preserve all history. Use a fresh scenario; include a concurrency probe to revisit the earlier isolation gap separately.

Checks: none run. The commits/failure are supplied scenario assumptions, not observed database results. Reference context: PostgreSQL 18; documented transaction principles in [baseline research](../sources/2026-10-04-backend-baseline.md) and [transaction concept](../concepts/transactional-seat-reservations.md).
