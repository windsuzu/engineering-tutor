# Next.js refresh and server data cache

## Summary

A client route refresh can render the same old data when the server read is still cached. Updating the database, invalidating the affected server data, and updating the visible route are separate responsibilities.

## Explanation and example

In Q8, a Server Component fetch uses force-cache and already holds the old product name. A mutation changes the database, but router.refresh alone does not invalidate that server cache. The rerender can reuse the cached read.

Example read configuration:
```ts
fetch(url, { cache: 'force-cache', next: { tags: ['product:42'] } });
```
After the mutation commits successfully, invalidate the affected path or tagged data with server-side APIs whose freshness semantics meet the requirement. Refresh the visible route as needed for the chosen mutation integration. These snippets/strategies have not been executed in this assessment.

## Alternatives and applications

- no-store opts a server fetch out of this persistent data cache; useful when that read must always fetch from its origin, with corresponding origin-work costs.
- revalidatePath targets a path, with timing dependent on whether called from a Server Function or Route Handler.
- Tagged data supports sharing an invalidation boundary across routes; readers must carry the matching tag.
- In the current docs, revalidateTag(tag, 'max') uses stale-while-revalidate. It does not imply every immediate read is fresh.
- updateTag is restricted to Server Actions and immediately expires tagged data for read-your-own-writes. Do not substitute it into an unsupported execution context.

## Misconceptions and edge cases

Client refresh is not server cache invalidation. Browser fetch cache semantics and Next.js server fetch extensions differ. Use documented server options rather than assuming browser no-cache is the server opt-out. Invalidate after successful committed mutation; account for shared readers, failed saves, background revalidation and independent upstream caches.

## Sources and version context

Accessed 2026-10-04; rolling Next.js docs label 16.3.8. Q8 assumes App Router, cacheComponents disabled and production, with no CDN/browser/origin caching or database lag. No Next.js dependency installed or execution performed.
- [useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router).
- [fetch](https://nextjs.org/docs/app/api-reference/functions/fetch).
- [revalidatePath](https://nextjs.org/docs/app/api-reference/functions/revalidatePath).
- [revalidateTag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag).
- [updateTag](https://nextjs.org/docs/app/api-reference/functions/updateTag).
- Source metadata: ../sources/2026-10-04-frontend-baseline.md.

## Personal evidence

Assessment: ../assessments/2026-10-04-baseline-frontend.md, Q8. Learner independently identifies the server-cache boundary and invalidation at save time; conceptual score 3 for this scenario. API naming clarified without penalizing correct reasoning.
Remaining gaps: executable invalidation, failure/consistency cases, tag freshness semantics and independent delayed transfer. Broader HTTP cache skill not assessed.
Next review: 2026-10-05; fe.nextjs in ../reviews/queue.json.
