# Java invocation-local references and shared objects

## Summary and example

A local variable can point to a shared object. Assigning a field reference to a local variable does not copy that object. final prevents assigning a different reference to the field; it does not make an ArrayList immutable.

Recovered hypothetical singleton case, Java21+; not compiled or run:

```java
private final List<String> names = new ArrayList<>();

String buildLabel(String name) {
    List<String> local = names;
    local.clear();
    local.add(name);
    return local.get(0);
}
```

Under the explicitly stipulated schedule/visibility, A adds Ada and pauses; B clears/adds Bo and returns; A then reads Bo from the same list. No broad claim about every possible thread execution follows from this trace.

For request-specific temporary state, remove the shared list field and allocate a fresh list within each invocation:

```java
List<String> local = new ArrayList<>();
```

A fresh list isolates this temporary container. Its elements or other dependencies could still be shared; those cases were not assessed.

## Evidence, applications and remaining gaps

[Phase5 review](../assessments/2026-10-28-phase5-concurrency.md#final-evaluation), prepared October28 and answered October31: learner independently diagnosed the shared class field, predicted Bo and proposed removal plus fresh allocation every buildLabel call. Prior conceptual3/4 for aliasing/per-invocation allocation. No compiler, thread, Java-memory-model or learner tests. This applies to request-specific state in singleton services; it does not establish broad concurrency mastery.

## Version and reference limits

Java21+/Spring Boot4 learning context; singleton and visibility are explicit case assumptions. No new official-reference verification during recovery; exact historical source metadata was not supplied. Latest scheduling is in [queue](../reviews/queue.json), be.concurrency; prior guided attempts remain in the assessment history.

## November12 sequential snapshot review

[Actual response](../assessments/2026-11-12-phase5-concurrency.md#final-evaluation): independently predicts a containsAda because each call returns a new ArrayList. Correct for the stipulated same-instance sequential calls; source-list clear/add does not mutate the earlier returned list. Scoped conceptual3/4, no concurrent safety or deep-copy evidence. Stage2,nextNovember19 in [queue](../reviews/queue.json). Tutor sequential preparation assertions are not learner tests; prior shared-object evidence retained.
