# Backend baseline research

## Event-count query references (continuation)

| Title | URL | Usefulness |
| --- | --- | --- |
| 7.2. Table Expressions | https://www.postgresql.org/docs/18/queries-table-expressions.html | Outer-join preserved side and GROUP BY semantics |
| 9.21. Aggregate Functions | https://www.postgresql.org/docs/18/functions-aggregate.html | COUNT semantics and distinction from absent grouped rows |
| 9.18. Conditional Expressions | https://www.postgresql.org/docs/18/functions-conditional.html | COALESCE for a missing joined count |

Publisher for all three: PostgreSQL Global Development Group. Publication dates not specified on these pages. Accessed 2026-10-07 (Asia/Taipei); version PostgreSQL 18. Classification: established documented behavior. The aggregate-then-join reference query is a tutor-created application, not an executed benchmark. No SQL/query tests run.

## HTTP authentication and denial status semantics

- Title: RFC 9110: HTTP Semantics, sections 15.5.2 and 15.5.4.
- URL: https://www.rfc-editor.org/rfc/rfc9110.html
- Publisher: IETF / RFC Editor; authors R. Fielding, M. Nottingham, J. Reschke.
- Publication date: June 2022.
- Accessed: 2026-10-04, Asia/Taipei.
- Relevant version: HTTP semantics defined in RFC 9110; framework-independent.
- Usefulness: verifies 401 authentication requirements, 403 refusal semantics, and intentional 404 concealment for forbidden resources.
- Classification: established HTTP specification. The exercise's status choices are an illustrative API contract, not evidence of executed requests.
- Verification limits: specification reviewed; no HTTP authentication or endpoint tests run.

## Object-level authorization

- Title: API1:2023 Broken Object Level Authorization.
- URL: https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/
- Publisher: OWASP API Security Project.
- Publication context: 2023 edition; exact publication date not specified on the page.
- Accessed: 2026-10-04, Asia/Taipei.
- Relevant version: framework-independent API security guidance, 2023 edition.
- Usefulness: verifies the need to authorize actions on the requested database object using established caller identity and the actual access policy, rather than trusting caller-controlled identifiers.
- Classification: established security guidance. The customer-only owner comparison is a simplified policy-specific example, not a complete generic authorization system.
- Verification limits: documentation reviewed; no endpoint or security tests executed.

Assessment preparation references; consult after the initial closed-book attempt.

## PostgreSQL transaction isolation

- Title: 13.2. Transaction Isolation.
- URL: https://www.postgresql.org/docs/18/transaction-iso.html
- Publisher: PostgreSQL Global Development Group.
- Publication date: not specified on the accessed documentation page.
- Accessed: 2026-10-04, Asia/Taipei, through the current documentation URL, which identifies version 18.
- Relevant version: PostgreSQL 18; the scenario explicitly selects READ COMMITTED.
- Usefulness: verifies concurrent reads and writes, statement visibility, and isolation-specific behavior for the reservation diagnostic.
- Classification: established documented database behavior. The assessment scenario is a tutor-created application example, not a published benchmark or an executed experiment.
- Verification limits: official documentation was read; no database commands or backend tests were executed.

## PostgreSQL transaction commands

- Title: 3.4. Transactions.
- URL: https://www.postgresql.org/docs/18/tutorial-transactions.html
- Publisher: PostgreSQL Global Development Group.
- Publication date: not specified on the page.
- Accessed: 2026-10-04, Asia/Taipei.
- Relevant version: PostgreSQL 18.
- Usefulness: verifies BEGIN, COMMIT, ROLLBACK and grouping transactional database changes into an all-or-nothing operation; used to explain syntax after the learner's Q1b response.
- Classification: established documented practice; the reservation-specific feedback is an application of these documented principles.
- Verification limits: documentation reviewed; no SQL executed.

## PostgreSQL constraints

- Title: 5.5. Constraints.
- URL: https://www.postgresql.org/docs/18/ddl-constraints.html
- Publisher: PostgreSQL Global Development Group.
- Publication date: not specified on the page.
- Accessed: 2026-10-04, Asia/Taipei.
- Relevant version: PostgreSQL 18.
- Usefulness: verifies database uniqueness and key guarantees for preparing the duplicate-operation diagnostic; no solution provided before Q2's attempt.
- Classification: established documented database behavior.
- Verification limits: documentation reviewed; no schema or tests executed.
