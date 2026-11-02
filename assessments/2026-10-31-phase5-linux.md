# Phase5 Linux: destination and listener addresses

Answered and completed 2026-10-31. Skill `ops.linux`. Original review due October27.

## Recovery provenance and limits

Recovered on 2026-11-02 from the learner-supplied cross-session handoff after managed execution failed. Dates below are the original response dates in Asia/Taipei, not the recovery date. Scenario descriptions are reconstructions from that handoff; exact original prompt wording is unavailable. Learner responses are preserved verbatim. The recorded score preserves the prior tutor's provisional scoped evaluation; it is not a certification or a new assessment during recovery. No dependency installation, learner implementation test, runtime execution or fresh documentation verification is claimed.

## Case and assumptions

A VM is `10.20.0.8`; Java listens on `0.0.0.0:9090`. A laptop mistakenly curls its own `127.0.0.1`. The learner must choose the destination. Java then changes its bind address to `127.0.0.1:9090`; the follow-up asks whether the laptop can still reach the service through the VM private IP, with routing and firewall otherwise unchanged and no added forwarding.

## Actual learner responses

### Q1 — laptop destination

```text
10.20.0.8:9090/health
```

### Q2 — loopback-only listener

```text
no, the 127.0.0.1 won't accept the other connection except from its own environment.
```

## Assistance and evidence

The learner independently selected the VM private address and rejected direct private-interface access to a loopback-bound listener. Tutor refined the explanation to destination-interface binding rather than a general source-address permission policy. No listener inspection, curl or network test occurred.

## Final evaluation

Conceptual understanding: **3/4**. Independent conceptual listener/destination reasoning; practical Linux/network operations remain untested.

Implementation correctness, edge-case handling, testing quality and trade-off explanation were not newly assessed. Existing older evidence remains in [mastery](../progress/mastery.json). Review scheduling is reconciled with [the queue](../reviews/queue.json); dates reconstructed during recovery must be identified there rather than described as previously persisted facts.
