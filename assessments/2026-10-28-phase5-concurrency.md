# Phase5 concurrency: local references and a shared list

Question prepared October28; actual responses and completion 2026-10-31. Skill `be.concurrency`. Original review due October27. The handoff reports the question was written locally before execution failed; responses arrived afterward.

## Recovery provenance and limits

Recovered on 2026-11-02 from the learner-supplied cross-session handoff after managed execution failed. Dates below are the original response dates in Asia/Taipei, not the recovery date. Scenario descriptions are reconstructions from that handoff; exact original prompt wording is unavailable. Learner responses are preserved verbatim. The recorded score preserves the prior tutor's provisional scoped evaluation; it is not a certification or a new assessment during recovery. No dependency installation, learner implementation test, runtime execution or fresh documentation verification is claimed.

## Case and assumptions

A singleton contains `private final List<String> names = new ArrayList<>();`. Each `buildLabel` invocation assigns `local = names`, clears the list, adds its argument, then returns `local.get(0)`. A adds Ada and pauses; B clears/adds Bo and finishes; A resumes. Exact scheduling and visibility are stipulated, so this asks about aliasing rather than unstated Java Memory Model guarantees. Backend target Java21+.

## Actual learner responses

### Q1 — A resumes

```text
Bo, because A and B use the shared names from the class-scope defined var
```

### Q2 — remove shared allocation

```text
remove private final List<String> names = new ArrayList<>();
```

### Q2 — learner allocation

```java
List<String> local = new ArrayList<>();
```

### Q2 — allocation lifetime

```text
create this every time the buildLabel invoked.
```

## Assistance and evidence

The learner independently identified the shared object behind both local references and proposed a fresh list on every invocation. The `final` field and a local reference do not make the shared object a per-request copy. No compile, real-thread, race-detection or memory-visibility test occurred. The outcome covers the stipulated schedule only.

## Final evaluation

Conceptual understanding: **3/4**. Independent conceptual aliasing diagnosis and per-invocation allocation fix; practical concurrent implementation remains unassessed.

Implementation correctness, edge-case handling, testing quality and trade-off explanation were not newly assessed. Existing older evidence remains in [mastery](../progress/mastery.json). Review scheduling is reconciled with [the queue](../reviews/queue.json); dates reconstructed during recovery must be identified there rather than described as previously persisted facts.
