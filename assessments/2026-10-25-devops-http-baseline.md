# First DevOps baseline: locate an HTTP proxy failure

Date:October25. Primary assessed scope:ops.http request-path reasoning. Phase2 new unit1/1,completed. Other operations skills remain unassessed; no real server execution.

## Vocabulary and situation

A reverse proxy receives a client request and forwards it to an application. Listening ports accept connections. Nginx is the proxy, Spring Boot is the app. Browser GET /api/orders receives502 in this synthetic case:

```text
Browser -> Nginx:80 -> Spring Boot application
```

## Supplied evidence

Nginx configuration:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8080;
}
```

Nginx error log:

```text
connect() failed (111: Connection refused) while connecting to upstream,
upstream: "http://127.0.0.1:8080/api/orders"
```

Listener snapshot:

```text
127.0.0.1:9090  LISTEN  java
0.0.0.0:80     LISTEN  nginx
No listener on 127.0.0.1:8080.
```

Request from same host:

```text
curl -i http://127.0.0.1:9090/health
HTTP/1.1 200 OK
{"status":"UP"}
```

## Assumptions and task

All evidence is supplied/synthetic, not executed commands. Nginx/app on same Linux host, no containers/namespaces/TLS/config changes between observations. Browser reaches Nginx. Health success does not prove business route/database correctness. No exact installed Nginx/Spring release claim.

Q1:Which hop fails:browser-to-Nginx or Nginx-to-application? Cite the most direct supplied evidence. One or two sentences; no command memorization required.

Response:pending. No cause/fix supplied before attempt, no DevOps score or practical/operations mastery. Follow with safe verification/port-alignment reasoning after actual response; new unit not complete until actual answer/teaching recorded.

## Sources/limits

Official Nginx proxy_pass reference https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass ; publisher Nginx, publication/update not retrieved. Attempted during preparation, blocked proxyHTTP403, no live contents verified. RFC9110 HTTP source context previously recorded. Stable proxy/path concepts and explicit synthetic evidence, not a tested Nginx/runtime setup. No real curl/log/server execution or employer system.

Do not infer Linux/networking/nginx implementation scores from textual diagnosis. Determine applicable conceptual scope only after evidence; proposed checks are not executed tests. Schedule review if taught/assessed; after selected unit finishes archive phase2 and stop chaining.

## Q1 actual response

Learner response (verbatim):

```text
nginx -> application.
the nginx should go to 9090 to send a request to java application instead of 8080 
```

Correct independent failing-hop diagnosis and port-alignment proposal under the supplied intended-app9090 scenario. Nginx upstream8080 refusal/no listener versus Java9090 health success supports the connection mismatch. Changing app listener to intended configured port could also be a contract-dependent correction; no general rule to always edit proxy. No supplied cause/fix before answer, no actual Nginx/Java/network execution. Final conceptual evaluation pending; do not infer practical nginx/networking mastery.

## Q2 — Verify through the actual request path

Assume configuration is changed so Nginx forwards to the intended9090 listener and reloaded successfully. The direct /health request still returns200. Original user failure was GET /api/orders via Nginx. Health is not the orders route.

```text
Direct health check -> application /health
Original user path  -> Nginx -> application /api/orders
```

What request would you make next, and what result would you inspect, to verify the original failure was fixed? Plain language or a sample curl command accepted; exact flags not required.

Response:pending. One end-to-end verification-plan task, no expected HTTP/content result supplied before attempt. Config reload is an assumption, not performed operation; no real commands/logs/server tested. Final grade/date/new-unit completion pending. Do not claim health200 proves business-route/database success or operational ability.

## Q2 actual response

Learner response (verbatim):

```text
curl :80/api/orders which should now go to 9090's /api/orders and returns 200.
```

Correct independent original-path verification plan via Nginx80, not merely direct health. Host omitted as accepted plain-language shorthand. Full illustrative command supplied after answer: curl -i http://127.0.0.1:80/api/orders. Check expected success status and valid orders payload rather than any200;200 is the learner's expectation, not observed response. No curl/config/reload/endpoint operation executed.

## Final evaluation

ops.http conceptual_understanding:3/4 narrowly for failing proxy/app hop, supplied port alignment and original-route verification. Diagnosis/request plan supplied without solution before attempts; vocabulary supplied as prerequisite. Status/body precision added after correct path/status plan. Other four dimensions unassessed: no actual networking/process checks, implemented config/reload, endpoint/learner tests or compared recovery. Separate Nginx/Linux/networking/debugging skill targets remain unassessed, not inferred from one textual case.

Initial conceptual baseline/new unit success, not delayed review. First fresh HTTP diagnosis reviewOctober26,stage0 (one day). Broad HTTP developing, no practical/retained mastery. Archive phase2 with3/3 reviews and1/1 new unit, stop automatic questions; future work starts an explicit new finite plan. Prior history preserved without lateness penalty.
