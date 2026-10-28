# DNS, TCP and HTTP stages

## Summary

For a simple direct plain-HTTP request using TCP: resolve hostname to IP, establish TCP connection to IP and port, then exchange HTTP request/response. Finding an IP does not prove service reachable. These stages help locate a failure before investigating causes.

## Example and interpretation

Synthetic trace, not actual command output:

```text
Host orders.internal resolved to10.20.0.8
Trying10.20.0.8:9090
connect failed: Connection refused
```

Resolution succeeded; TCP setup failed before HTTP response. Possible causes include no listener at destination address/port or active network rejection. App down is a hypothesis, not proven by refusal alone.

Changed synthetic trace:

```text
Connected to10.20.0.8:9090
HTTP/1.1 503 Service Unavailable
```

TCP connected and an HTTP responder returned an error status. This does not prove a healthy application. In systems with proxies, responder could be proxy rather than backend. Use service listener/log/network evidence to investigate; none executed here.

## Boundaries and common mistakes

Do not confuse refusal with HTTP4xx/5xx. Do not assume DNS success means correct destination, healthy application or successful request. Supplied case assumes intended IP, single attempt, no proxy/TLS/IPv6/fallback. HTTPS adds TLS handshake before HTTP; HTTP3 uses QUIC rather than TCP. These extensions not assessed. Connection timeout differs from refusal; exact cause requires further evidence.

## Reference limits

curl project man page, https://curl.se/docs/manpage.html , publication date/version unverified. Retrieval attemptedOctober28 failed CONNECT403. Established protocol-stage reasoning, no current-doc verification. No real DNS/socket/curl test, trace formatting simplified.

## Learner evidence

[October28 assessment](../assessments/2026-10-28-dns-tcp-baseline.md#final-evaluation): conceptual2/4 guided. Independently excludes DNS, TCP/HTTP distinction taught; immediate changed-trace TCP success correct. Implementation, edge cases, tests and tradeoffs unassessed. Fresh independent diagnosis pending, nextOctober30. Mastery/queue are scheduling sources of truth.
