# Proposed baseline assessment plan

Status: proposed, not started. No answers, scores or demonstrated mastery exist.

## Format

Run three separate 35–45 minute sessions, one per track. Begin each with 5–10 minutes of closed-book prediction or explanation, followed by 20–25 minutes of debugging/implementation and 5–10 minutes of test and trade-off discussion. Split into additional sessions if a task needs more time; this is a diagnostic, not a speed test.

Before a session, ask about available runtimes and tooling. Prepare a small isolated runnable project in `exercises/baseline-<track>/`, with pinned versions, setup/run/test commands, acceptance criteria and starter faults. Inspect existing tools before proposing installations. Install dependencies only with authorization. Record environment blockers separately from skill performance. Keep reference solutions out of the initial task and learner-visible starter files.

| Session | Proposed scenario | Evidence sought |
| --- | --- | --- |
| Frontend | Diagnose an asynchronous React/TypeScript data feature; inspect supplied browser and Next.js cache traces; repair a keyboard interaction and add behavior tests | State and effects, types, request races, rendering/cache boundaries, accessibility, profiling reasoning and component ownership |
| Backend | Repair a small Java/Spring Boot reservation API backed by an isolated SQL database; examine a concurrent update and an access-control failure | Java reasoning, validation and API contracts, SQL, transaction boundaries, authentication vs authorization, concurrency and integration tests |
| DevOps | Diagnose a disposable HTTP service behind Nginx using supplied logs, network traces and a container/pipeline configuration; review a Kubernetes manifest and AWS diagram | Linux/networking/HTTP diagnosis, proxy and container behavior, deployment safety, observability and evidence-based incident reasoning |

These sessions sample the tracks, not every skill in depth. Redis, advanced browser internals, architecture, Kubernetes and AWS need focused follow-up probes where initial evidence is insufficient. Leave unsampled skills and dimensions unassessed. Do not convert discussion of a diagram into a claim of operational implementation ability.

## Assessment procedure

1. Record the initial response before hints; preserve code revisions and explanations.
2. Allow official documentation during implementation; log lookups without automatically lowering conceptual scores.
3. Offer progressive hints only as needed and record their extent.
4. Ask for tests, failure cases and alternative approaches. Record commands and actual outputs if checks run; otherwise mark them not run with the reason.
5. Grade applicable dimensions separately using the rubric in README and AGENTS.md. Each score needs a specific response/code/test reference. Leave unsupported dimensions null.
6. Explain corrections after the attempt and use a brief follow-up question. Record the follow-up separately from independent performance.
7. Select the next learning topic from evidenced gaps; schedule reviews for assessed skills. Use fresh scenarios for delayed reviews.

## Outputs after each completed session

- `assessments/YYYY-MM-DD-baseline-<track>.md`: prompts, actual responses, assistance, dimension scores with evidence, test results and corrections.
- `progress/mastery.json`: append skill evidence and update only supported dimensions and status.
- `reviews/queue.json`: add per-skill pending review items with dates justified by performance.
- `mistakes/recurring.md`: add only observed misconceptions.
- `concepts/` and `sources/`: verified factual notes kept separate from personal performance.

No baseline project or assessment question is assigned during initialization. Prepare the first project when the learner begins a baseline session.
