# Linux IPv4 listener addresses

## Plain-language summary

A service listens on an address and port. Same port does not make all destination addresses interchangeable. A loopback-only listener is not automatically reachable through the host private network address.

| Bind address | Meaning |
| --- | --- |
| 127.0.0.1 | IPv4 loopback, same network namespace only |
| 10.20.0.8 | That specific local IPv4 address |
| 0.0.0.0 | Wildcard, all local IPv4 interfaces |

## Example and application

Synthetic Java listener127.0.0.1:9090 accepts same-VM loopback requests. A laptop targeting10.20.0.8:9090 does not reach that listener merely because routes/firewall allow traffic. Binding Java to0.0.0.0:9090 allows both local loopback and private-interface destinations, subject to other network/security conditions. Laptop targets actual VM address10.20.0.8, not wildcard0.0.0.0. No commands/configuration changes executed.

## Misconceptions and boundaries

A routing entry alone does not rebind a socket. A correctly configured proxy/forwarder could be a separate design, absent in this case. Wildcard listening does not guarantee external accessibility; firewall, routing, address ownership and other policies still matter. Containers have separate network namespaces;127.0.0.1 there refers to that namespace. IPv6 requires separate address/dual-stack reasoning and was not assessed. Broader listening may expose additional interfaces; choose intended binding according to service architecture.

## Source limits

Linux man-pages ip(7), https://man7.org/linux/man-pages/man7/ip.7.html , publisher Linux man-pages project. Publication date unverified; retrieval attempted2026-10-25 failed CONNECT403, local manual unavailable. Established IPv4 binding behavior, no current-release/live-documentation claim. Synthetic ss output only; no runtime test.

## Learner evidence

[October25 assessment](../assessments/2026-10-25-linux-listener-baseline.md#final-evaluation): conceptual2/4 guided. Loopback reachability and bind change needed teaching; correct remote client address after full fix. Remaining gaps: independent diagnosis, implementation and verification. Other dimensions unassessed; no networking/nginx mastery inferred. Next reviewOctober27, source of truth in mastery/queue.
