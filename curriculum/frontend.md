# Frontend curriculum

Initial allocation: 30%. This is a planning preference, not a daily quota.
All skills start unassessed. React and Next.js experience informs realistic scenarios, not scores or skipped prerequisites. Use the baseline to choose an entry point; this list is a dependency guide, not a mandatory beginner sequence.

| Skill ID | Scope | Practical evidence target | Useful prerequisites |
| --- | --- | --- | --- |
| fe.typescript | TypeScript narrowing, generics, domain modeling, runtime boundaries | Model API states and validate untrusted input without unsafe assertions | None; assess language reasoning |
| fe.browser | Event loop, tasks, microtasks, DOM, layout, paint, requests and storage | Explain an execution trace and diagnose a rendering or request bottleneck | JavaScript reasoning |
| fe.react | React rendering, state, effects, identity, component lifecycle | Repair stale state, effect cleanup and asynchronous races; justify the fix | fe.browser, fe.typescript |
| fe.nextjs | Next.js routing, server/client boundaries, rendering and caching | Diagnose stale or user-specific data and explain cache ownership and invalidation | fe.react, fe.http-cache |
| fe.http-cache | HTTP caching, browser caches, freshness and invalidation | Reason through request/response traces and cache behavior | fe.browser |
| fe.performance | Profiling, loading, rendering cost and measurement | Establish a baseline, identify a bottleneck and validate an improvement | fe.browser, fe.react |
| fe.testing | Unit, component and end-to-end testing, isolation and flakiness | Write behavior-focused tests for races, failures and user interactions | fe.react |
| fe.accessibility | Semantics, keyboard navigation, focus, forms and assistive technology | Repair an inaccessible interaction and verify keyboard behavior | DOM and HTML knowledge assessed as needed |
| fe.architecture | Component boundaries, state ownership, data flow and maintainability | Refactor a feature and explain alternatives and migration risks | fe.typescript, fe.react, fe.testing |

## Progression and transfer
Start with diagnosis and reasoning, then implementation, then a new scenario after a delay. Combine assessed skills in an accessible data-driven application with explicit loading/error states, tests and measured performance. Capstone completion does not prove every constituent skill: record separate evidence.

Choose weak prerequisites when they block a task. Increase difficulty only with demonstrated independence. Verify official documentation and pin relevant framework/tool versions when creating each exercise; no version-specific behavior is assumed by this outline.
