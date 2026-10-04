# DevOps and systems curriculum

Initial allocation: 35%. All skills start unassessed. Use local disposable environments and synthetic incident data; no production access or cloud spending is needed for baseline diagnosis.

| Skill ID | Scope | Practical evidence target | Useful prerequisites |
| --- | --- | --- | --- |
| ops.linux | Processes, permissions, files, signals, resources and service logs | Diagnose a failed process with a justified sequence of safe checks | None |
| ops.networking | DNS, addressing, ports, TCP, TLS and connectivity | Locate a failure from client-to-service evidence | ops.linux |
| ops.http | HTTP methods, status codes, headers, proxies and timeouts | Explain a request trace and identify the failing boundary | ops.networking |
| ops.nginx | Nginx reverse proxying, routing, upstreams and logs | Diagnose a proxy error and verify a configuration fix locally | ops.http, ops.linux |
| ops.docker | Images, containers, networking, volumes and runtime configuration | Repair a container startup or connectivity failure reproducibly | ops.linux, ops.networking |
| ops.kubernetes | Workloads, services, probes, resources, configuration and rollout | Diagnose a failing workload and propose a verifiable recovery | ops.docker, ops.networking |
| ops.cicd | CI/CD pipelines, artifacts, test gates, deployment and rollback | Repair a pipeline and explain artifact promotion and rollback | ops.docker, testing fundamentals |
| ops.aws | AWS IAM, networking, compute, storage and reliability trade-offs | Reason about a deployment and least-privilege access using a supplied diagram | ops.networking, ops.cicd |
| ops.observability | Metrics, logs, tracing, correlation, alerts and service objectives | Connect telemetry to a testable hypothesis and useful alert | ops.http |
| ops.debugging | Production debugging, incident triage, mitigation and verification | Diagnose a synthetic incident, separate symptoms from causes and plan recovery | ops.linux, ops.networking, ops.observability |

## Progression and transfer
Move from a process and HTTP request to a proxy, container, deployment pipeline and distributed service. Kubernetes and AWS follow prerequisite evidence; they are not prerequisites for every exercise.

Use controlled fault injection in disposable projects. Distinguish an observed diagnosis from an untested hypothesis. Record exact commands, environment versions and actual verification results. Dependency installs, destructive operations and infrastructure changes require authorization under AGENTS.md. Verify official documentation before preparing version-specific exercises.
