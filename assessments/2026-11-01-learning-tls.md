# New TLS learning: hostname identity and application login

Completed around 2026-11-01 according to the handoff; exact per-message timestamps were not recovered. Initial TLS learning, not a delayed review. Subtopic is scheduled separately from existing DNS/TCP networking history.

## Recovery provenance and limits

Recovered on 2026-11-02 from the learner-supplied cross-session handoff after managed execution failed. Dates below are the original response dates in Asia/Taipei, not the recovery date. Scenario descriptions are reconstructions from that handoff; exact original prompt wording is unavailable. Learner responses are preserved verbatim. The recorded score preserves the prior tutor's provisional scoped evaluation; it is not a certification or a new assessment during recovery. No dependency installation, learner implementation test, runtime execution or fresh documentation verification is claimed.

## Case and assumptions

The client requests `orders.example.com`; a trusted, unexpired certificate covers only `billing.example.com`. Hostname checking was introduced before the attempt. In a follow-up the certificate validly covers orders, TLS already succeeds, and the client requests `https://orders.example.com/account` without a cookie or token. The endpoint explicitly requires login and no mutual TLS is used.

## Actual learner responses

### Q1 — hostname mismatch

```text
It looks like the process will be ended up at the tls handshake phase since the valid certificate only covers billing but not the orders subdomain.
```

### Q2 — initial path interpretation

```text
It depends on the account's api endpoint. If it lives in neither billing nor orders certificate covering. It will be rejected at handshake phase.
```

### Q2 — after hostname/path clarification

```text
No the app should still validate its session token or Jwt to check the authentication. If not passed, the app should return a 401 to the user
```

## Assistance and evidence

The first response correctly identified the certificate hostname mismatch after that rule had been introduced. The follow-up's initial interpretation led the tutor to clarify the full URL and the distinction between hostname and path: certificate matching uses `orders.example.com`, not `/account`, and TLS success was already stipulated. Do not treat that ambiguity as a failed mastery assessment. The final answer correctly separates TLS server identity/transport protection from application user authentication and the stipulated endpoint's401 response. Initial instruction and clarification are part of this new unit, so this does not establish independent delayed retention, client authentication through TLS, JWT implementation or runtime behavior. No TLS, certificate or application test occurred.

## Final evaluation

Conceptual understanding: **3/4**. Prior provisional conceptual3 for the scoped initial exercise is preserved with its teaching and clarification. Delayed retention and implementation remain untested; initial review was proposed for November2.

Implementation correctness, edge-case handling, testing quality and trade-off explanation were not newly assessed. Existing older evidence remains in [mastery](../progress/mastery.json). Review scheduling is reconciled with [the queue](../reviews/queue.json); dates reconstructed during recovery must be identified there rather than described as previously persisted facts.
