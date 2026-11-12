# Phase5 request-state review: result snapshots

PreparedNovember12,Asia/Taipei. Skill be.concurrency; original due2026-11-03,stage1. CompletedNovember12; independent scoped snapshot reasoning evaluated below. Prior October31 list-aliasing fix was independent; this fresh sequential case tests a returned list copy rather than a local alias under an interleaving. Estimated2minutes.

## Case shown to learner

Two requests use the same Java21 service:

```java
class LabelService {
    private final List<String> names = new ArrayList<>();

    List<String> buildLabels(String name) {
        names.clear();
        names.add(name);
        return new ArrayList<>(names);
    }
}
```

```java
LabelService service = new LabelService();
List<String> a = service.buildLabels("Ada");
List<String> b = service.buildLabels("Bo");
```

Assume standard java.util.List/ArrayList imports, same service instance, calls run one after another and finish before the next starts. No intervening mutation by callers. One task: after both calls, what does a contain, and why? Do not give constructor-copy explanation or output before learner attempts; explain unfamiliar constructor syntax on request without conceptual penalty.

## Preparation and limits

Tutor ran a complete matching OpenJDK21 source-file wrapper with value/identity assertions, exit0 and no console output on November12. This checks only sequential behavior; no real-thread, JMM visibility, stress or learner testing. The exercise does not establish concurrent safety of the shared names field. Independent task review confirmed focus and recommended withholding constructor semantics before attempt. Historical [aliasing evidence](2026-10-28-phase5-concurrency.md) and [concept](../concepts/java-shared-object-state.md) provide context; no fresh official documentation verification. At preparation the first response was pending; the completed evaluation is below.

## Actual learner response — November12

```text
if it runs synchronously, the a should contain Ada. because each time the function returns a new ArrayList.
```

## Final evaluation

Conceptual understanding **3/4**, independent scoped success: a contains[Ada] after both sequential calls because each call returns a separate list copy. The learner correctly uses the stated nonoverlapping schedule; no answer/constructor semantics supplied before this response. The second call clears/mutates the service field's list rather than the earlier returned list. Tutor elaborates that distinction after the attempt. This does not establish safety for overlapping calls or mutable element deep-copy behavior. No additional error/gap inferred from the learner's conditional wording.

Implementation correctness, edge-case handling, testing quality and trade-off explanation unassessed; older evidence retained. No learner code/tests or actual thread test. Tutor's prior sequential Java21 assertion wrapper is preparation evidence only, not repeated for grading. Completed2026-11-12, original due2026-11-03; stage1→2, next2026-11-19, seven days after actual scoped success. Dates synchronized with mastery/queue.
