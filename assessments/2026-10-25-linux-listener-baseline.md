# New learning: Linux IPv4 listener addresses

October25, phase3 selected new unit. Primary skill ops.linux, narrow Linux service listener interpretation; networking/nginx and broader Linux practical skills unassessed. In progress, no answer/score yet.

## Lesson

Port identifies endpoint; bind address limits local destination addresses it listens on. 127.0.0.1 is IPv4 loopback reachable through same host/network namespace. 0.0.0.0 is IPv4 wildcard binding to all local IPv4 interfaces, not a remote client destination; external access still depends on routing/firewalls. One host/network namespace, no containers/IPv6/NAT in this case.

## Q1 case

VM private IPv4 10.20.0.8. Java process only listener supplied by ss -ltnp:

```text
State  Local Address:Port  Process
LISTEN 127.0.0.1:9090      java
```

Same-VM request curl http://127.0.0.1:9090/health supplied200. Separate teammate laptop has working route to10.20.0.8; firewall permits9090; no other listener/proxy/security policy. Laptop requests http://10.20.0.8:9090/health. Does it connect successfully to Java, and why? One reachability prediction, short explanation. Hypothetical supplied outputs, no ss/curl/server/socket test run. No solution disclosed before response; address definitions taught before application so first learning evidence is guided, not delayed retention.

## Reference and limits

Linux man-pages ip(7), https://man7.org/linux/man-pages/man7/ip.7.html , Linux man-pages project, publication date unverified. Attempted access2026-10-25 failed CONNECT403; no local ip(7) manual found. Established IPv4 binding semantics, no current-version verification claim. Definitions based on established knowledge; command display simplified synthetic evidence, not environment output.

## Q1 actual response

```text
If we are using the same network and its on the 127.0.0.1 out port as 10.20.0.8, I think the teammate's laptop can access it directly? 
```

Partial evidence: proposes same-network access, conflates loopback binding with VM interface address/port forwarding. Original scenario has no forwarding/proxy. Tutor clarifies127.0.0.1 and10.20.0.8 are distinct local destination addresses; loopback-only listener does not accept traffic addressed to private interface, despite matching port. Diagram contrasts same-VM loopback request and laptop private-IP request. No runtime test or final grade/date inferred.

## Q2 — Binding choice after explanation (pending)

Under same supplied route/firewall assumptions, what Java listen address allows access through VM's10.20.0.8 while also retaining127.0.0.1 access? Address-only answer sufficient. Definitions supplied before initial question and loopback mismatch explained after Q1; any correct answer is guided first-learning evidence, not independent retention. No production config change requested or executed.

## Q2 actual response

```text
the VM (10.20.0.8) should redirect a route from a incoming 9090 to the Java's 9090?
```

Proposes forwarding rather than requested bind address. Forwarding/proxying could provide a separate solution when configured correctly, so do not label it inherently impossible; excluded by original no-proxy/forwarding scenario. Ordinary route alone does not make a loopback-only socket listen on private interface. Learner's direct bind-address understanding not yet demonstrated.

Tutor now explicitly teaches full direct fix: Java binds0.0.0.0:9090 (all local IPv4 interfaces), keeping same port; laptop targets10.20.0.8:9090, local process can target127.0.0.1:9090. No Spring configuration/API execution or real exposure. Q3 asks which destination laptop should use after this change:0.0.0.0 or10.20.0.8? One guided correction check; response pending, no score yet. Wildcard listen address is not remote destination address.

## Q3 actual response

```text
it should send to 10.20.0.8:9090 not 0.0.0.0
```

Correct guided client-destination check after full bind fix and diagram. Does not establish independent listener diagnosis or retention.

## Final evaluation

Conceptual understanding2/4, guided first-learning scope. Initial loopback-only listener treated as remotely reachable; then forwarding proposed instead of bind change. Correct client target after explicit wildcard-bind teaching. Forwarding proposal acknowledged as a possible separate configured solution, not inherently invalid. Needs fresh unprompted listener interpretation. Implementation correctness, edge cases, testing quality and tradeoffs unassessed. No listener/socket/curl/browser or real service configuration test. ops.linux developing only in this narrow listener scope; separate networking/nginx skills remain unassessed. New unit work complete, not independent mastery. Stage0,nextOctober27 (2days).
