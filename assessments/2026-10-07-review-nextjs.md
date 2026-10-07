# Next.js cache review: shared product data

Date: 2026-10-07 (Asia/Taipei)
Skill: fe.nextjs
Status: pending; no new scores.
Reason: delayed review due 2026-10-05; fresh transfer to shared readers.
Duration: 5–10 minutes. Reasoning/pseudocode accepted; no code execution or tests.
Objectives: choose an invalidation boundary for shared data and distinguish stale-while-revalidate from immediate freshness.
Prerequisites: server/client distinction and cached reads.

## Q1

Assume production App Router on Next.js 16.3.8, cacheComponents disabled; no upstream caches or database lag. Both /products/42 and /featured use separate cached server fetches (product detail and featured-product list), both containing product 42, with force-cache and tag product:42. A Server Action commits a new price and only calls revalidatePath('/products/42'). The detail page updates, but /featured can still show the old price.

Explain why updating the detail path does not guarantee freshness on the other path. What invalidation would you add after successful save to cover shared tagged readers? Exact API names optional. If the requirement is that the saving user sees the new price immediately, is stale-while-revalidate sufficient?

Responses, feedback and grading: pending.
Proposed next review: 2026-10-10 on independent success; otherwise 1–3 days after correction. Existing queue retained while pending.

## Sources

Publisher: Vercel/Next.js. Publication dates not stated here. Accessed 2026-10-07; rolling docs currently label 16.4.0, repository 16.3.8. Scenario uses existing Next.js 16 APIs, no upgrade or runtime verification.
- https://nextjs.org/docs/app/api-reference/functions/revalidatePath — scope of path invalidation versus other paths using tagged data; established documented behavior.
- https://nextjs.org/docs/app/api-reference/functions/updateTag — Server Action tag expiry and read-your-own-writes; documented feature available in Next.js 16.
- https://nextjs.org/docs/app/api-reference/functions/use-router — route refresh versus server cache invalidation; established documented behavior.

Source metadata clarification: updateTag page states last updated August 18, 2026 (not original publication date).

## Initial attempt

Learner response (verbatim):
> 1. the revalidatePath only refresh the path url. you should use tag to revalidate both
> 2. revalidateTag with product:42 tag
> 3. no, consider using a client component with a state to perform optimistic update

Evidence: independently identifies path versus shared-tag scope and rejects stale-while-revalidate as immediate-freshness guarantee. revalidateTag profile unspecified; do not infer max profile or legacy call intent. Optimistic state is a useful responsiveness technique but does not establish freshness of subsequent server reads. Probe needed before final grading; no new score, execution or queue change.

Follow-up: assume revalidateTag("product:42", "max") and optimistic local state; ask whether a subsequent server render must read fresh price and what cache behavior is required to guarantee it. Exact API names optional.

## Freshness follow-up and teaching request

Learner response (verbatim):
> maybe, if the update is failed in the background.
> i don't know the api you are trying to test me

Tutor clarified that API-name recall is not assessed: stale data can be served during a successful background refresh. Introduced updateTag and asked a 500 ms timing check.

Learner then requested (verbatim):
> explain to me more about the server action updateTag and what's stale while revalidate, didn't learn it before.

Switch to explanation of newly introduced freshness semantics. No final new score; prior demonstrated path/tag scope retained. Teaching does not count as successful assessment. Correction check pending.

Explanation: a Server Action is an async function executed on the server, commonly triggered by a form or client interaction to perform a mutation. After the database write succeeds, updateTag expires previously tagged cache entries. It does not update the database or fetch fresh data immediately; next server cache read waits for fresh data. Only Server Actions support updateTag. revalidateTag(tag, "max") marks cached data stale; the next visit can receive the old cached result while fresh data is fetched in the background. Thus old data can appear without any failure. A completed refresh updates cache for later reads, not a guaranteed immediate push to every open tab. Optimistic state improves perceived response but still needs save-failure reconciliation and authoritative reads.

Example: cached price 100, committed price 120, origin read 500 ms. SWR responds with 100 while refreshing, later cache holds 120. updateTag causes the next tagged server read to wait 500 ms for 120; appropriate pending/loading UI can be provided.

Sources reverified October 7: updateTag and revalidateTag official docs. Rolling Next.js 16.4.0 versus installed 16.3.8 noted. No exercise executed. Freshness correction check: during the 500 ms wait, contrast SWR result with immediate-expiry read.

## Blog-feed correction check

Learner response (verbatim):
> maybe revalidateTag? because it's not necessary for the user to see in the UI immediately?

Correct for the stated tolerance: revalidateTag(tag, "max") allows a fast cached response while refreshing in the background. Immediate guided transfer confirmed; this does not establish delayed retention or change mastery scores. Fresh independent review remains scheduled 2026-10-09. No implementation or tests run.
