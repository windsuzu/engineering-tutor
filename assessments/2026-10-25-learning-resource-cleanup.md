# New learning: Java try-with-resources

Date:October25, latest supplied session context. Skill:be.java, new resource-lifetime scope; not a delayed review. Session new unit1/1, completed with guided correction. Target Java21, no Spring/provider dependencies.

## Goal and prerequisites

Connect familiar try/catch exceptions to cleanup that must happen after success or failure. Prerequisites: method calls, exceptions and basic interfaces; unfamiliar syntax may be explained, not penalized.

## Introductory explanation

Resources such as files/connections may need explicit release; unreachable Java objects and garbage collection are not a substitute for timely resource cleanup. AutoCloseable defines close(). Try-with-resources registers a resource in the try parentheses and calls close when leaving that scope, including ordinary exception exit. Cleanup happens before a matching catch outside that resource scope. This is newly taught behavior, not independent mastery. Multiple-resource/suppressed-exception details intentionally deferred.

## Case and code

A toy receipt resource simulates a failing write. It is not a real file/DB/network resource:

```java
class Receipt implements AutoCloseable {
    void write() {
        System.out.println("write");
        throw new IllegalStateException("write failed");
    }

    public void close() {
        System.out.println("close");
    }
}
```

Assume this next block is inside main:

```java
try (Receipt receipt = new Receipt()) {
    receipt.write();
    System.out.println("saved");
} catch (IllegalStateException ex) {
    System.out.println("failed");
}
```

```text
Create resource -> try body -> scope cleanup -> surrounding catch if applicable
```

## Assumptions and task

Java21; construction and close succeed, only write throws; no other logs/finally/handlers or process termination. No snippet compiled/run or actual resource opened. New rule taught; this is a guided learning/application task.

Q1: What words print, in what order? A short ordered list is enough. No complete output supplied before attempt. Actual response, follow-up and unit completion pending; no new score or independent delayed mastery.

## Source and scheduling limits

Oracle Java SE21 JLS14.20.3 try-with-resources, https://docs.oracle.com/javase/specs/jls/se21/html/jls-14.html#jls-14.20.3 ; publication date not recorded. Official retrieval attempted during this turn, failed with proxy tunnel HTTP403; no live page contents/current documentation verified. Stable Java21 language semantics used; installed runtime21.0.12.1 available but this task not executed. Later tutor-run verification must be labeled distinctly from learner tests.

Fresh independent resource-cleanup review should be scheduled1–3 days after the actual teaching/application outcome, coordinated with existing be.java item rather than duplicate pending skill entries. Current nullable-review evidence and dates unchanged while lesson incomplete. No new learning completion from merely reading the introduction; record actual response/corrections first. On finishing this one selected unit, archive session and stop automatic questions.

## Q1 actual response and cleanup-order correction

Learner response (verbatim):

```text
write
failed
close
```

Incorrect surrounding-catch/cleanup order: write throws, resource scope closes, then matching outer catch prints failed. Saved before correction. Newly introduced try-with-resources semantics are guided learning, not independent prior mastery. Tutor-run OpenJDK21.0.12.1 temporary source-file execution of the exact toy behavior printed write, close, failed, exit0. No actual file opened or learner tests; compiler/runtime output verified the demonstration only.

Explanation: the resource belongs to the try-with-resources scope. On exception exit, cleanup finishes before control reaches the attached catch. This differs from treating close as a conventional finally block after an ordinary try/catch. Assumed close succeeds; suppressed exceptions and abrupt cleanup are outside this lesson.

## Q2 — Successful body correction check

Keep the same resource/try/catch, but change write to:

```java
void write() {
    System.out.println("write");
    // No exception now.
}
```

The try body still calls write then prints saved, and close prints close. Construction/close succeed, no other logs or failures. What prints now, in order?

Response:pending. One guided success-path transfer question after cleanup teaching; no new output supplied before attempt or new success-path execution claimed. Final scoped evaluation/unit completion/review coordination pending. Bars3/3 reviews,new0/1 unchanged; do not add another unrelated unit afterward.

## Q2 actual response and scope-exit correction

Learner response (verbatim):

```text
Write close saved
```

Incorrect success-path order: normal body continues from write to saved, then scope exit closes the resource. Treat capitalization as informal output naming, not a separate syntax error. Initial response suggests closing too early, between body statements; clarify cleanup belongs at scope exit rather than after each resource method. No broad exception mastery inferred. This revised success path has not been executed; explanation is language-semantics reasoning, not new runtime output.

Tutor shows annotated original block: write(); print(saved); both inside resource-using try body, then implicit close before outer catch/continuation. Normal path write/saved/close; failure path write/close/failed because the throw skips saved. Both prior actual attempts preserved; learning remains guided.

## Q3 — Identify the cleanup boundary

For try-with-resources, what triggers automatic close: each resource-method return, or leaving the try body (normally or by an exception)?

Response:pending. One final guided rule check after both path explanations, not independent delayed mastery. No new exercise/topic or runtime result; archive and stop automatic chaining once this bounded lesson is finalized.

## Q3 actual response

Learner response (verbatim):

```text
Only when leaving the try body
```

Correct under the supplied successful-construction/close and ordinary-exit assumptions: leaving the resource-using try body normally or through exception triggers cleanup, not returning from each method inside it. Guided final recognition after both path explanations; not independent delayed retention. No new execution or learner test.

## Final evaluation

Conceptual understanding:2/4 in newly taught resource-cleanup scope. Failure-path prediction placed close after catch; success-path prediction placed close before the remaining body statement. Explicit lifetime/scope teaching needed before correct rule recognition. Earlier Java arithmetic/defaulting conceptual3/4 success preserved separately; this new scope does not erase it. Other four dimensions unassessed: no complete learner program, real resource management, independently designed tests, close-failure/suppressed exceptions or compared cleanup strategies.

Unit completed as guided new learning, outcome needs_practice, not independent mastery. Tutor-run failure demonstration verified write/close/failed; success path was explained but not executed. No real I/O or learner tests. Fresh resource-cleanup and nullable-transfer check October27, coordinated with the existing single be.java queue item, brought forward from October28. Reset current new-scope review stage0; prior arithmetic success/history retained. Broad Java remains developing.

Selected session now complete:3/3 reviews and1/1 new-learning unit. Archive outcomes in daily note and tracker, stop automatic question chaining. Any future session must show a new bounded plan rather than silently consume the remaining overdue queue.
