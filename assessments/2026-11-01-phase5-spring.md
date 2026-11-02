# Phase5 Spring: nullable constraints and validation triggers

Completed around 2026-11-01 according to the handoff; exact per-message timestamps were not recovered. Skill `be.spring`. Original review due November1. Backend target Java21+/Spring Boot4.

## Recovery provenance and limits

Recovered on 2026-11-02 from the learner-supplied cross-session handoff after managed execution failed. Dates below are the original response dates in Asia/Taipei, not the recovery date. Scenario descriptions are reconstructions from that handoff; exact original prompt wording is unavailable. Learner responses are preserved verbatim. The recorded score preserves the prior tutor's provisional scoped evaluation; it is not a certification or a new assessment during recovery. No dependency installation, learner implementation test, runtime execution or fresh documentation verification is claimed.

## Case and assumptions

Request record is `record ReserveRequest(@Positive Integer seats) {}`. Controller uses `@Valid @RequestBody`, the JSON provides `seats: null`, and Bean Validation is configured. The task asks whether this annotation rejects null and then what additional constraint enforces presence.

## Actual learner responses

### Q1 — initial validation prediction

```text
Yes, the validation is stopped before the controller because the valid annotation triggers the record's positive annotation  and fails at it
```

### Q2 — presence-constraint idea

```text
Something like @NonNull (dont remember the actual name
```

## Assistance and evidence

The learner correctly recognized the validation trigger but incorrectly predicted that @Positive rejects null. Tutor explicitly explained that @Positive accepts null, then asked for a presence constraint. The learner supplied the right presence-constraint concept; tutor provided the Jakarta `@NotNull` name. Syntax recall was not penalized. The substantive initial null-semantics gap makes this guided completion, not independent success. No Spring startup, Java execution or HTTP validation test occurred.

## Final evaluation

Conceptual understanding: **2/4**. Guided needs-practice completion on nullable validation; presence-constraint intent was correct after the null rule was taught.

Implementation correctness, edge-case handling, testing quality and trade-off explanation were not newly assessed. Existing older evidence remains in [mastery](../progress/mastery.json). Review scheduling is reconciled with [the queue](../reviews/queue.json); dates reconstructed during recovery must be identified there rather than described as previously persisted facts.
