# Java nullable values and exception flow

## Summary and example

Comparing a nullable Integer with primitive0 can require unboxing. A null value then throws NullPointerException before the condition finishes. A finally block runs during ordinary exception propagation; it does not handle the exception or make the next statement execute.

Recovered hypothetical Java21+ case, not compiled or run:

```java
Integer attempts = null;
System.out.println("start");
try {
    if (attempts == 0) System.out.println("zero");
} finally {
    System.out.println("finished");
}
System.out.println("after");
```

The printed sequence is start, finished, then the uncaught exception propagates; after is not printed. With a matching catch before finally that prints invalid and completes normally, the sequence is start, invalid, finished, after. This explanation assumes finally itself completes normally; abrupt finally completion is a separate unassessed edge case.

## Applications, evidence and gaps

For nullable request/data values, distinguish null handling from exception handling, and trace whether control leaves the try normally, reaches a catch, or propagates beyond the method. Do not assume finally swallows an exception.

[October31 review](../assessments/2026-10-31-phase5-java.md#final-evaluation): learner independently identified null unboxing but initially included after despite no catch. Tutor explained propagation; added-catch order was corrected with guidance. Prior conceptual2/4, not independent success. No compilation, execution or learner tests. Earlier nullable/defaulting and resource-cleanup history remains intact; this exercise did not independently test resource closure.

## Version and reference limits

Java21+ learning baseline. This is recovered teaching/evidence, with no newly verified language-reference metadata. See the [resource-cleanup note](java-resource-cleanup.md) for that distinct scope and its recorded JLS reference. Latest Java review date is in [queue](../reviews/queue.json), be.java.

## November12 method-boundary review

[Actual evidence and final evaluation](../assessments/2026-11-02-phase5-java.md#final-evaluation): learner initially lists caller catch/continuation correctly but omits helper finally output. After a focused reminder, correctly puts cleanup before caller catch. Scoped conceptual2/4 assisted completion; omission alone is not evidence of an explicit belief that finally is skipped. Full unboxing/propagation explanation supplied by tutor afterward. No new implementation/testing or independent resource-cleanup evidence. Next fresh reviewNovember14,stage0, synchronized in [queue](../reviews/queue.json); earlier dates/outcomes stay historical.
