# Spring request validation: presence and numeric range

## Summary and example

Presence and numeric range are separate constraints. In the supplied Bean Validation case, @Positive accepts null; use a presence constraint such as Jakarta @NotNull when null must also be invalid. @Valid triggers validation at the configured controller boundary; it does not change the meaning of each constraint.

Hypothetical Java21+/Spring Boot4 context with Jakarta Bean Validation configured; not compiled or run:

```java
record ReserveRequest(@NotNull @Positive Integer seats) {}
```

With @Valid @RequestBody and the stated provider/error-handling assumptions, null seats violates @NotNull; a nonpositive number violates @Positive. Directly constructing a record is not the same operation as invoking a configured HTTP validation boundary.

## Evidence, applications and remaining gaps

[November1 review](../assessments/2026-11-01-phase5-spring.md#final-evaluation): learner initially predicted @Positive rejects null. After tutor clarification, correctly proposed a presence constraint; @NonNull was recalled approximately and tutor supplied Jakarta @NotNull. Name recall was not penalized. Prior conceptual2/4 reflects the initial null-semantics gap and guided correction. No Spring/provider/HTTP startup or learner tests occurred. Earlier registered-type/injection and validation evidence remains historical rather than erased.

This distinction matters when an API needs both a supplied value and a valid numeric range. Missing versus explicit-null deserialization details and custom error responses need their own defined contract and tests.

## Version and reference limits

This note preserves recovered teaching, not a freshly verified Spring Boot/provider release claim. Historical source metadata was not supplied; no new documentation verification occurred during recovery. Latest date: [queue](../reviews/queue.json), be.spring.
