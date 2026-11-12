# Phase5 Spring: presence and range at the controller boundary

Prepared2026-11-12,Asia/Taipei. Skill be.spring, original due2026-11-03,stage0. First response pending, no grade/stage/date change. Fresh combination of presence/range constraints after prior @Positive-null gap; Java21+/Spring Boot4 context. Estimated2minutes.

## Case shown to learner

Booking API accepts only a provided positive seat count. Record/controller method excerpt, inside a configured RestController with standard Jakarta Validation and Spring MVC imports:

```java
record CreateBookingRequest(@NotNull @Positive Integer seats) {}

@PostMapping("/bookings")
void create(@Valid @RequestBody CreateBookingRequest request) {
    System.out.println("controller-entered");
}
```

Three independent POST requests to/bookings:

| Request | JSON body |
| --- | --- |
| A | {"seats": null} |
| B | {"seats": 0} |
| C | {"seats": 2} |

Assume JSON deserialization succeeds, a working Jakarta Bean Validation provider and @Valid request-body boundary are configured, default constraint groups, no other checks/custom handlers/interceptors, printing succeeds for method entry. This is a hypothetical/unrun Spring example; no startup or HTTP test. One focused task: Which requests print controller-entered, and why? Do not define constraints or disclose classifications before attempt.

## Sources and verification limits

Primary annotation sources retrievedNovember12 through GitHub plugin from project jakartaee/validation default main branch:

- Positive.java, Jakarta Validation API / Jakarta EE project; author Gunnar Morling. https://github.com/jakartaee/validation/blob/main/src/main/java/jakarta/validation/constraints/Positive.java ; returned blobSHA649e0c9f18a37691bf19dd363277f5bc2b4fb9fb. Retrieved Javadoc verifies strictly positive excludes0 and null considered valid. Publication date unverified. Useful for numeric-range boundary; established constraint semantics.
- NotNull.java, Jakarta Validation API / Jakarta EE project; author Emmanuel Bernard. https://github.com/jakartaee/validation/blob/main/src/main/java/jakarta/validation/constraints/NotNull.java ; returned blobSHAd38f01706b229e35257d08f210b74f87a3644767. Retrieved Javadoc verifies nonnull requirement and all-type applicability. Publication date unverified. Useful for separate presence condition; established constraint semantics.

These source reads verify annotation semantics from the returned source blobs, not a pinned SpringBoot4/provider deployment. MVC validation execution is an explicit case assumption; no version-specific startup, compiled record, framework integration or HTTP statuses were tested. No implementation/testing evidence follows from reading sources. [Earlier actual responses](2026-11-01-phase5-spring.md), [concept](../concepts/spring-nullable-validation.md).
