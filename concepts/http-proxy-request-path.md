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
