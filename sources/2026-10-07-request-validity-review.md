# Request-validity review research

- Title: useEffect.
- URL: https://react.dev/reference/react/useEffect
- Publisher: React documentation team.
- Publication date: not specified on the page.
- Accessed: 2026-10-07, Asia/Taipei.
- Relevant software/version: React current reference; ordinary useEffect setup/cleanup and state semantics, without experimental APIs or Compiler assumptions.
- Usefulness: verifies effect cleanup on changed dependencies and using per-effect cleanup state to avoid out-of-order response races.
- Classification: established documented React practice; the rejection timeline is a tutor-created diagnostic, not an executed result.
- Verification limits: documentation reviewed; code not compiled and tests not run.

## Cancellation reference

- Title: AbortController: abort() method.
- URL: https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
- Publisher: MDN Web Docs; MDN contributors.
- Last modified: 2025-09-17 (page metadata, not original publication date).
- Accessed: 2026-10-07, Asia/Taipei.
- Version context: browser DOM/Fetch APIs, not React-specific.
- Usefulness: verifies cancellation support and default AbortError reason for discussing a cancelled request's rejection path.
- Classification: established platform documentation. The unguarded-catch UI outcome is an interpretation of the supplied code, not an executed test.
- Checks: no cancellation or browser tests run.

## Framework and query-library context

| Title | URL | Publisher | Version context | Usefulness |
| --- | --- | --- | --- | --- |
| Fetching Data | https://nextjs.org/docs/app/getting-started/fetching-data | Next.js / Vercel | Rolling App Router docs identify 16.4.0; this repository pins 16.3.8 | Server/Client Component data ownership and supported library patterns |
| Mutation & Revalidation | https://swr.vercel.app/docs/mutation | SWR / Vercel | Rolling SWR documentation; not installed in this repo | Documented SWR query/mutation race coordination, not a guarantee for arbitrary user state |
| Query Keys | https://tanstack.com/query/latest/docs/framework/react/guides/query-keys | TanStack | React Query v5 docs; not installed here | Keys identify data and include changing fetch inputs |
| Query Cancellation | https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation | TanStack | React Query v5 docs; not installed here | Signal consumption and cancellation defaults |

Accessed all on 2026-10-07 (Asia/Taipei). Publication dates not specified except Next.js page last updated September 1, 2026 (update date, not original publication). Classification: established documented library practices; comparing them with arbitrary client-state writes is an engineering interpretation. Version-specific cancellation limitations apply, including the documented Suspense-hook exception; no library installed or behavior executed during this review.

Local implementation evidence: installed Next.js 16.3.8 node_modules/next/dist/client/components/app-router-instance.js, inspected 2026-10-07. It tracks pending/discarded router actions and gates applying results on the discarded flag. This supports the router-owned versus application-owned state distinction; internal implementation is version-specific and not a public API guarantee. No navigation race test run.
