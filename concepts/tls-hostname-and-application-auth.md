# TLS server hostname and application user authentication

## Summary

In the supplied HTTPS case, the client checks that the server certificate is trusted, valid and covers the requested hostname. A certificate for billing.example.com does not cover orders.example.com merely because both names end in example.com. Certificate hostname checks concern the host, not an HTTP path such as /account.

After TLS succeeds, the application can still require a cookie/session/token to authenticate the user. Server identity and protected transport do not by themselves establish a logged-in application user.

## Recovered example

```text
https://orders.example.com/account
        └─ hostname       └─ path

DNS → TCP → TLS server verification → HTTP application authentication
```

The case stipulates ordinary HTTPS over TCP and no mutual TLS. A trusted, unexpired certificate covering billing.example.com only fails the orders hostname check before the application exchange. In a separate case, TLS already succeeds for orders.example.com, but /account explicitly requires login and no cookie/token is sent. The application still rejects the unauthenticated request; the learner identified401 as the stipulated API response. This is not a claim that every endpoint requires login or every TLS failure is a hostname mismatch.

## Learner evidence and gaps

[November1 initial exercise](../assessments/2026-11-01-learning-tls.md#final-evaluation): learner correctly identified certificate hostname mismatch after hostname checking was introduced. Follow-up path interpretation required tutor clarification that the full URL was orders.example.com/account and TLS was already successful. Do not grade that ambiguity as failed mastery. Final answer correctly separated TLS from application session/JWT authentication. Prior scoped initial conceptual3/4; delayed retention and implementation remain untested. No TLS, browser, certificate, HTTP or learner tests occurred.

## Scheduling and reference limits

This is a separate TLS scope. Preserve the existing [DNS/TCP networking](dns-tcp-http-stages.md) history and schedule rather than replacing it with this first TLS review. The handoff proposed first TLS review November2; final skill identity and synchronized scheduling are recorded in [mastery](../progress/mastery.json) and [queue](../reviews/queue.json).

No exact source metadata or newly verified documentation was supplied for this recovery. The diagram and explanations reconstruct the stated teaching assumptions and do not claim a new source review or runtime validation.
