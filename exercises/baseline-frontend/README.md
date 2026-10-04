# Frontend baseline: profile inspector

Assessment ID: `2026-10-04-baseline-frontend`. Estimated time: 35–45 minutes, in stages.
Primary skills: fe.react, fe.typescript, fe.testing. Supporting probes: fe.browser, fe.accessibility, fe.architecture. Next.js/cache/performance probes will be chosen after the initial response; this project alone does not assess those skills.

## Stage 1 — closed-book prediction

Before editing, running the app/tests or opening reference sources, read `src/ProfilePanel.tsx`.

Assume no StrictMode and exactly these requests:
- t=0 ms: Ada selected; its effect starts a request that completes at t=900 ms.
- t=50 ms: Grace selected; its effect starts a request that completes at t=200 ms.
- No other selections, failures or requests occur; state updates have committed at observation times.

Q1: What selected ID, heading and status do you expect at t=250 ms and t=1000 ms? Explain which callbacks update state and why. Would changing only the dependency array fix the behavior? Explain, without writing a fix yet.

## Stage 2 — implementation after the initial attempt

Repair the feature while preserving its API, and explain your choices. The starter now uses an inner async function with try/catch. You may answer in pseudocode in chat; runnable implementation and executed testing remain unassessed until demonstrated separately. Acceptance criteria:
- The selected identity and displayed result remain consistent after out-of-order completion.
- Loading, success and failure behavior are deliberate, including previous visible data.
- An older success or failure cannot alter the current selection's result/status.
- Pending work after unmount causes no externally visible stale behavior.
- All selection controls can be operated by keyboard with clear names.
- State types make intended UI states explicit; explain the limitations of compile-time types for external data.
- Preserve supplied tests and add independent tests for additional failure/transition cases. Do not weaken assertions to fit the bug.

Describe one alternative implementation and its trade-offs. We may add a focused probe to resolve missing evidence rather than attempting every frontend topic in one session.

## Environment and commands

Detected Node 22.14.0 and npm 10.9.2. Exact package versions are in package.json; they are exercise pins, not claims about latest releases. Dependencies are not installed and no lockfile has been generated. Installation requires learner authorization under AGENTS.md. After authorization, resolve the pins with `npm install` and retain package-lock.json; subsequent installs use `npm ci`.

From this directory:
```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
```

The dev server binds to loopback. The reverse-completion acceptance test is intentionally expected to fail on the starter code, but that expectation has not yet been executed. Test output from your actual run is the evidence. No compiler, build, component test or browser run has yet been performed.

All API responses are local synthetic data. No employer code, credentials or external API is involved. Stop the dev server with Ctrl+C; generated node_modules/dist stay inside this project and are ignored. No reference solution is included. Official sources are saved separately in sources/2026-10-04-frontend-baseline.md for use after Stage 1.
