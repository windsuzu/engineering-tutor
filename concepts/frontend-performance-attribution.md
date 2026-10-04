# Frontend performance attribution

## Summary

Identify the expensive stage of an interaction before selecting an optimization. React rendering, JavaScript calculations, browser layout and paint are related but distinct costs. Reducing render counts is not by itself proof of a faster interaction.

## Explanation and example

Q9 uses synthetic numbers: approximately 4 ms React rendering and 140 ms repeated layout for typing in a 5,000-row table. Those observations direct investigation toward layout, not blanket memoization. They do not prove a root cause, and the times are not necessarily additive or a complete account of interaction latency.

Potential layout causes include a large mounted DOM, complex geometry and forced synchronous layout from interleaved geometry reads and style writes. Inspect the browser trace, initiator stacks and DOM size to form a testable hypothesis. Grouping reads before writes can reduce avoidable forced layouts. Virtualization can reduce mounted rows, but sizing, focus, keyboard navigation and scrolling correctness need verification.

## Compiler and optimization choices

React Compiler is an optional build-time tool, separate from installing React 19. When enabled and applicable it reduces manual memoization needs. useMemo/useCallback remain supported for explicit control; existing memoization should not be removed blindly. Automatic memoization does not guarantee that browser layout bottlenecks disappear.

Reusing repeated calculations may help scripting/render cost. A library choice, hook name or render-count reduction does not establish end-to-end improvement.

## Verification and practical use

Repeat the same interaction with the same data, device conditions and production build. Compare browser layout duration, scripting/paint work and input-to-next-paint latency across repeated runs, not a single anecdote. INP is a broader page-interaction metric and should not be inferred from React Profiler render time alone. Verify result correctness, input responsiveness, keyboard navigation and focus after changes. Record what was measured versus hypothesized.

## Misconceptions and edge cases

- Optimizing React render counts while ignoring the dominant browser layout cost.
- Assuming React version alone enables Compiler.
- Assuming compiler eliminates all manual memoization use cases.
- Treating fewer mounted rows or a library migration as a guaranteed win without comparable traces.
- Adding profile timings as if all stages were disjoint and exhaustive.

## Sources and version context

Verified 2026-10-04; rolling React site labels v19.3, assessment starter pins 19.2.0 and has no Compiler integration. Browser trace in Q9 is synthetic and no benchmark was run.
- [React Compiler introduction](https://react.dev/learn/react-compiler/introduction).
- [React memo](https://react.dev/reference/react/memo).
- [web.dev: Avoid large, complex layouts and layout thrashing](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing).
- Full source metadata: ../sources/2026-10-04-frontend-baseline.md.

## Personal evidence

Assessment: ../assessments/2026-10-04-baseline-frontend.md, Q9. Learner suggests render inspection, calculation reuse and viewport virtualization; supplied dominant layout cost and comparable verification plan not yet addressed. Conceptual score 2 for this scenario only.
Q9b: after correction, learner proposes measuring layout and asks for the procedure; no independent measurement performed.
Remaining gaps: independent diagnosis and actual before/after measurements. Architecture and library-specific abilities not inferred.
Next review: 2026-10-05, fe.performance in ../reviews/queue.json.

## Measuring layout in Chrome DevTools

Open Performance, record one reproducible typing interaction and stop. Select the interval for that interaction. Inspect Layout events in the Main track; selecting an event exposes its duration and available details. Bottom-up can aggregate selected-range activities; distinguish self time from inclusive total time so nested work is not counted twice. Rendering summary includes more than Layout, so inspect the named events instead of treating the whole category as layout time. Inspect forced-reflow insights or available initiator/source details to investigate causes. Compare repeated equivalent recordings and the interaction's duration/input-to-next-paint behavior, not just React rendering.

Documented procedure, not executed during the baseline. [Chrome Performance reference](https://developer.chrome.com/docs/devtools/performance/reference), [runtime-performance tutorial](https://developer.chrome.com/docs/devtools/performance), accessed 2026-10-04. Exact panel details depend on Chrome version; installed Chrome version not inspected. Layout execution time, interaction latency and layout-shift score are different measurements.
