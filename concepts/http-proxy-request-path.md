# HTTP reverse proxy: diagnose and verify the request path

A reverse proxy accepts the client request and forwards it to an application's listener. A reachable proxy does not prove its upstream is reachable; a direct health response does not establish the original user route works through the proxy.

```text
Client -> Nginx:80/api/orders -> application:9090/api/orders
```

In the [synthetic baseline](../assessments/2026-10-25-devops-http-baseline.md), proxy targets8080, connection is refused and no listener exists there, while Java9090 answers health. This supports a destination mismatch. Align configuration with the intended deployment contract, then test original route via proxy. Illustrative command: `curl -i http://127.0.0.1:80/api/orders`. Inspect expected status and valid orders body; this command was proposed, not run.

Case assumes same host, no containers/namespaces/TLS or config changes during evidence collection. No real server/reload/process/network/route/database tests. Not every502 has this cause; actual incidents need actual evidence. A200 alone can be misleading if it returns unrelated/error content.

## Sources and evidence

Official Nginx proxy_pass reference https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass ; retrieval attemptedOctober25, blocked proxyHTTP403, no live contents/update date verified. HTTP RFC9110 context previously recorded in backend sources, not newly fetched. Explicit synthetic evidence, no current-release/runtime configuration claim.

Learner independently identifies failed hop/port alignment and proposes original-route verification. Narrow ops.http conceptual3/4, other dimensions and separate Nginx/Linux/debugging targets unassessed. First delayed reviewOctober26,stage0; broad skill developing, no operational mastery.

## October28 path rewrite and November1 port alignment — recovered November2

[October28 review](../assessments/2026-10-28-phase5-http.md#final-evaluation): public :80/api/invoices reached Java as /api/invoices and returned404, while direct Java /invoices and /health returned200. Learner proposed mapping :80/api/ to :9090/ and checking :80/api/invoices for200. Tutor supplied full localhost URL and invoice-body inspection. Direct health success alone did not validate the public invoice route.

[November1 review](../assessments/2026-11-01-phase5-http.md#final-evaluation): Nginx targets9090, no listener exists there, Java on9091 returns the orders JSON directly. Moving Java to9090 is a valid proposed fix; changing Nginx upstream to9091 is another, according to intended deployment. This is reverse proxying, not an HTTP redirect. Learner chose the original :80/api/orders route for verification; expected200 and body inspection were supplied afterward by the tutor, not independently stated in that answer.

Prior tutor evaluations were conceptual3/4 each, confined to the supplied paths/ports. No edits, reloads, curl requests or operational tests occurred. Sources were not newly verified during recovery. Latest review date is in [queue](../reviews/queue.json), ops.http; initial dates above are historical.
