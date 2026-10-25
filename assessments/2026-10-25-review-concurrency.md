# Concurrency review: a local name for a shared buffer

Date:October25, latest supplied session context. Skill:be.concurrency. Session review3/3, originally due October16. Status:completed; needs practice on reference aliasing, guided per-invocation fix correct.

## Situation and code

A singleton label service handles multiple requests and reuses one mutable StringBuilder:

```java
class LabelService {
    private final StringBuilder buffer = new StringBuilder();

    String buildLabel(String customer) {
        StringBuilder local = buffer;
        local.setLength(0);
        local.append(customer);
        return local.toString();
    }
}
```

API meanings supplied as prerequisites: setLength(0) clears the text; append adds text; toString reads current text. A local reference assignment does not explicitly allocate/copy an object; reasoning about its effect is the task.

| Step | Observed work |
| --- | --- |
| 1 | A calls buildLabel("Ada"), clears buffer and appends Ada, then pauses before toString |
| 2 | B calls buildLabel("Grace"), clears buffer, appends Grace and completes |
| 3 | A resumes at return local.toString() |

Assume writes are visible and the internal builder calls follow this observed sequence with no simultaneous operations or other writes. No general unsynchronized-StringBuilder/JMM guarantee implied. Java21/Spring singleton context, hypothetical trace not executed.

## Q1 — Which label does A return?

At step3, does A return Ada or Grace? Explain briefly; one or two sentences sufficient.

Response:pending. One shared-mutable-reference question, no label outcome/design fix supplied before attempt. Previous primitive-local/shared-list successes preserved. No real thread/Boot run or new score/date. Follow with per-invocation design after actual answer. Existing stage1 review pending; no success inferred from unanswered prompt.

## Q1 actual response and aliasing correction

Learner response (verbatim):

```text
A will get ada at step 3. Even though the buffer is a singleton.It is reassigned to a function-scoped variable every time the build label function is invoked.
```

Incorrect: each invocation has a distinct local reference variable, but both references point to the same mutable builder. Assignment copies the reference, not the object/text snapshot. Under supplied visible serial schedule A reads Grace. The service bean is singleton; this makes its buffer field shared here, not every StringBuilder globally singleton. Prior primitive-local and shared-list successes preserved as history; this fresh transfer needs correction, not a blanket skill judgment.

Tutor-run OpenJDK21.0.12.1 temporary source-file demonstration reproduced the stated sequence using localA and localB referencing the same builder. Actual output: Same object: true; A reads: Grace. Exit0. This is a sequential aliasing demonstration, not a multithreaded test or learner-designed test. No repository application/dependencies changed.

Tutor explanation uses two arrows to one box: localA -> shared builder <- localB. B mutates that box; A's reference still reads it. A new local variable name does not allocate a new builder. No complete per-invocation fix supplied before next attempt.

## Q2 — Separate builder instances per invocation

Same service must return each request's own label under the stated interleaving. What would you change about how local obtains its StringBuilder so A and B do not mutate the same object?

One code line or plain-language design accepted. Response:pending. One guided design question after aliasing explanation; no new-builder expression supplied before attempt. No final grade/stage/date or genuine concurrency-safety proof; session bars2/3 reviews,0/1 new unchanged.

## Q2 actual response

Learner response (verbatim):

```text
Do we really need a string builder singleton? We can solve this by only init a new StringBuilder every time the functiom is invoked
```

Correct: allocate a separate method-local builder per invocation rather than aliasing a shared mutable field. Tutor shows `StringBuilder local = new StringBuilder();` after the answer; remove unused shared buffer field. The service may remain singleton without sharing request-specific mutable builder state. Guided fix after explicit aliasing explanation, not independent delayed retention or implemented concurrency safety.

## Final evaluation

Conceptual understanding:2/4 narrowly for local-reference versus object isolation. Initial A/Ada prediction wrongly treats local assignment as an object copy; explicit shared-reference teaching and sequential demonstration needed before correct fresh-builder design. Earlier primitive-local/shared-list successes retained separately. Other four dimensions unassessed: no complete learner service, actual thread tests, synchronization comparison or broader JMM proof. Tutor Java21 aliasing output not learner tests.

Outcome needs_practice; reset stage0, next October27 (two days). Review work complete despite remaining skill gap, no lateness penalty/mastery inference. Session reviews3/3 complete; start the one planned Java try-with-resources unit, no extra overdue-review chaining.
