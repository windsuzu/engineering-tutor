# Java try-with-resources: cleanup follows scope exit

## Summary

For a successfully acquired AutoCloseable resource in try parentheses, ordinary normal/exception exit from the resource-using body triggers close. Returning from a method called inside that body does not end the scope.

```java
try (Receipt receipt = new Receipt()) {
    receipt.write();
    System.out.println("saved");
} catch (IllegalStateException ex) {
    System.out.println("failed");
}
```

Assume close prints close and succeeds, construction succeeds, write prints write, and no other behavior occurs:

| Body outcome | Order |
| --- | --- |
| write returns normally | write -> saved -> close |
| write throws the matching exception | write -> close -> failed |

Cleanup happens before the surrounding catch handles an exception escaping the resource scope. A body exception skips later body statements. This is not the same textual ordering as a conventional finally written after an ordinary try/catch.

## Applications and unassessed boundaries

Useful for timely cleanup of files/connections and other AutoCloseable resources. Garbage collection does not replace explicit lifetime management. Multiple resources, acquisition/close failures and suppressed exceptions require further learning and were not assessed in this introductory example. No claim of real I/O or application recovery correctness.

## Evidence and sources

[Resource lesson](../assessments/2026-10-25-learning-resource-cleanup.md#final-evaluation): both initial path orders needed correction; final scope-exit rule correct after explicit teaching. Conceptual2/4 in this new scope, other dimensions unassessed. Earlier Java nullable/defaulting success retained. Next fresh combined Java check October27, stage0. No independent resource-cleanup mastery inferred.

Tutor-run OpenJDK21.0.12.1 source-file demonstration verified failure order write/close/failed, exit0. No actual file resource or learner tests; success path not run. Authoritative reference: Oracle Java SE21 JLS14.20.3, https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20.3 . Retrieval attempted during lesson and blocked by proxyHTTP403; no live contents verified or publication date invented. Stable language semantics illustrated locally for failure path.
