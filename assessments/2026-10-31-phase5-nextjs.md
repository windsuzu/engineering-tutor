# Phase5 Next.js: expiry and the next fresh read

Answered and completed 2026-10-31. Skill `fe.nextjs`. Original review due October28.

## Recovery provenance and limits

Recovered on 2026-11-02 from the learner-supplied cross-session handoff after managed execution failed. Dates below are the original response dates in Asia/Taipei, not the recovery date. Scenario descriptions are reconstructions from that handoff; exact original prompt wording is unavailable. Learner responses are preserved verbatim. The recorded score preserves the prior tutor's provisional scoped evaluation; it is not a certification or a new assessment during recovery. No dependency installation, learner implementation test, runtime execution or fresh documentation verification is claimed.

## Case and assumptions

Cached stock is5 and database stock is8. A Server Action calls `updateTag('stock')`, followed by90seconds with no reads. The next tagged fetch has stipulated fresh-origin latency400ms. The task asks what that read returns and whether it waits. This recovers the prior scenario contract; no current framework documentation or runtime behavior was freshly verified.

## Actual learner responses

### Q1 — fresh next read

```text
udpateTag: wait 400ms and return 8. only relivdateTag performs swr.
```

## Assistance and evidence

The learner independently predicted waiting400ms for fresh8 on the next read. Tutor qualified the broader API comparison: `revalidateTag(tag, 'max')` uses stale-while-revalidate; not every revalidateTag expiration option behaves identically. Idle time does not itself initiate the replacement fetch in the stipulated case. No Next.js runtime test occurred.

## Final evaluation

Conceptual understanding: **3/4**. Independent scoped expiry/fresh-read timing success; the tutor-qualified SWR generalization is not a separately established API-wide rule.

Implementation correctness, edge-case handling, testing quality and trade-off explanation were not newly assessed. Existing older evidence remains in [mastery](../progress/mastery.json). Review scheduling is reconciled with [the queue](../reviews/queue.json); dates reconstructed during recovery must be identified there rather than described as previously persisted facts.
