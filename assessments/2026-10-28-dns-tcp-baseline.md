# New learning: DNS resolution versus TCP connection

October28, phase4 selected new unit, ops.networking narrow conceptual scope. In progress, no answer/score. Prior ops.linux/http evidence not networking mastery. About5–10minutes for this focused unit.

## Introduction

DNS maps a hostname to an IP address. Then client attempts a connection to IP and port. Name resolution does not itself prove application reachable. Plain HTTP/TCP simplified path: name -> DNS/IP -> TCP connection -> HTTP request/response. No TLS, proxy, QUIC, multiple resolved addresses or fallback in this case.

## Q1 evidence case

Synthetic diagnostic trace, simplified curl-style lines, no actual command/version/network test:

```text
$ curl -v http://orders.internal:9090/health
* Host orders.internal:9090 was resolved.
* IPv4: 10.20.0.8
* Trying 10.20.0.8:9090...
* connect to 10.20.0.8 port 9090 failed: Connection refused
```

Assume DNS returns intended IP, trace complete for one attempt, no HTTP connection established. Task: Which stage failed — DNS lookup, TCP connection, or HTTP response handling — and which trace line supports it? One evidence-localization question; cause not determined. Do not infer Java down, firewall or exact refusal source from trace alone. No answer before attempt, definitions taught just before application; first-learning evidence is assisted exposure, not delayed retention. Follow-up may distinguish possible cause from proof after response.

## Sources and limits

curl man page, https://curl.se/docs/manpage.html , curl project, publication date/current version unverified. Retrieval attempted2026-10-28 failed CONNECT403. Established name-resolution/connection distinction, no current-doc verification claim. Why useful: separates resolution/connect/request stages. Synthetic trace may not match exact installed-version formatting. No curl/network tests executed.

## Q1 actual response

```text
it looks like it may be the app is down. so we got connection refused at the end?
```

Learner tentatively proposes application down as possible cause; do not misrepresent tentative wording as certainty. Plausible hypothesis, not proof: no listener at destination, wrong binding/port or active network rejection can produce refusal. Did not explicitly select requested failed stage, so partial evidence only, final score pending. Tutor acknowledges possible cause and distinguishes refusal evidence from root-cause proof. No application/process/firewall check executed, no claim established that app down.

## Q2 — Stage versus cause (pending)

Same trace: hostname resolved to10.20.0.8; trying10.20.0.8:9090; connect failed Connection refused. Ask which stage is directly shown failing: DNS lookup, TCP connection, HTTP response handling. One classification follow-up; definitions previously introduced, no final stage answer supplied before attempt. No grade/mastery/queue change until actual evidence evaluated.

## Q2 actual response

```text
I am not sure if it's tcp connection or only the http response. but it's not dns lookup
```

Correctly rules out DNS independently, explicitly uncertain about TCP versus HTTP; do not infer full classification. Tutor now gives direct explanation: refusal occurs while establishing TCP before any HTTP response; ordinary HTTP503 requires connection established and HTTP responder to send status (could be proxy, not proof backend Java up). Trace lacks HTTP status/headers, connection refusal is not an HTTP status.

## Q3 — Changed trace correction check (pending)

Same plain-HTTP/no-proxy assumptions, new synthetic output:

```text
* Connected to orders.internal (10.20.0.8) port 9090
< HTTP/1.1 503 Service Unavailable
```

Does new trace show TCP connection succeeded, or failed as in original? One boundary check; no root-cause/provider/app-health inference. Full TCP-before-HTTP teaching supplied before Q3, any correct answer guided immediate correction, not independent retention. No actual curl/network test or final networking score yet.

## Q3 actual response

```text
succeed
```

Correct guided recognition that Connected plus HTTP503 means TCP succeeded in supplied plain-HTTP trace. Does not establish healthy backend, exact refusal root cause, independent diagnosis or delayed retention.

## Final evaluation

Conceptual understanding2/4, first learning with guidance. Independently rules out DNS; proposes plausible tentative app-down cause. TCP-versus-HTTP classification initially uncertain, direct explanation supplied, changed-trace connection success correct afterward. Other dimensions unassessed; no actual DNS/TCP/curl/network tests. Broader networking developing only in this narrow scope. Stage0,nextOctober30 (2days), fresh unprompted stage/evidence task. New unit work complete, not mastery. Archive/stop phase4, no extra overdue reviews automatically added.
