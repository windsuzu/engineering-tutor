# Backend curriculum

Initial allocation: 35%. All skills start unassessed; language familiarity and conceptual understanding are evaluated separately.

| Skill ID | Scope | Practical evidence target | Useful prerequisites |
| --- | --- | --- | --- |
| be.java | Java types, collections, exceptions, resource management and JVM basics | Implement a small domain operation and explain failures and resource lifetime | None; assess programming transfer |
| be.spring | Spring Boot configuration, dependency injection and request lifecycle | Trace a request and diagnose configuration or dependency errors | be.java |
| be.rest | REST API contracts, validation, errors, pagination and idempotency | Implement a predictable endpoint with explicit failure cases | be.java, be.spring |
| be.sql | SQL joins, constraints, indexes, execution plans and data modeling | Correct a query and justify schema/index choices from evidence | None; assess relational reasoning |
| be.transactions | Atomicity, isolation, locking, rollback and transaction boundaries | Diagnose a consistency bug and reproduce it with a test | be.sql, be.spring |
| be.auth | Authentication, authorization, session/token boundaries and access control | Prevent cross-user access and test denied requests | be.rest, be.sql |
| be.concurrency | Shared state, races, synchronization, executors and backpressure | Reproduce a race and explain a safe solution and its costs | be.java, be.transactions |
| be.redis | Redis data structures, expiration, caching and invalidation | Diagnose stale cache data and reason about consistency and failure | be.rest, be.transactions |
| be.integration | Integration testing, database fixtures, isolation and failure paths | Verify an API against a real isolated database with reproducible tests | be.rest, be.sql |

## Progression and transfer
Use a small service domain such as reservations or inventory. Progress from pure Java reasoning to an API, persistent data, consistency, access control and failure handling. Prefer runnable integration and concurrency scenarios over memorizing annotations.

Treat unfamiliar Java syntax as a documentation lookup when the underlying reasoning is correct. Assess each skill individually in combined tasks. Verify current official documentation and pin Java, Spring Boot, database and test tool versions when an exercise is prepared.
