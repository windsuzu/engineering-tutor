# Phase3 Next.js review: expired server entry, open viewer page

Date:October25. Skill:fe.nextjs. Review1/3, originally dueOctober19 after expiry/fetch timing correction. Status:in progress, first answer pending.

## Situation

A visitor has an announcements page open showing "Open today". Another person, an administrator in a separate browser session, changes the database announcement to "Closed today" via a Server Action:

```ts
await saveAnnouncementToDatabase('Closed today'); // supplied successful commit
updateTag('announcement');
```

The visitor's page originally used a cached server fetch tagged announcement. After the admin save, that visitor does not navigate, refresh, poll, receive push messages or make any new data request for5 minutes.

```text
Admin browser -> Server Action -> database commit -> updateTag

Visitor browser: already-rendered "Open today"
                no new requests or push channel
```

## Assumptions

Production App Router Next16.3.8 learning context, cacheComponents disabled. No websocket/SSE, polling, optimistic state, focus refresh or other invalidation listener in the visitor's session. Admin action's caller-side UI behavior is outside this question; visitor is a different browser session. No later tagged server read during the idle period. This is a synthetic cache/UI reasoning case, no browser/server/database request executed.

## Q1 — Does the visitor page update itself?

Does updateTag alone make the already-open visitor page display "Closed today" during that no-request period? Explain which boundary matters in one or two sentences.

Response:pending. One cache-versus-rendered-UI task; no answer, eager-fetch/read explanation supplied before attempt. Follow with tagged-read timing to revisit the recorded gap after actual answer. No score/stage/date, cache/runtime or practical Next.js mastery inferred.

## Sources and limits

Previously recorded Next.js16 updateTag/revalidateTag context in [cache concept](../concepts/nextjs-refresh-and-data-cache.md), no new live retrieval/current-release claim. Server expiry, replacement fetching and browser update are separate learning scopes; explicit scenario avoids assuming automatic behavior of unseen frameworks/apps. Original stage0/history retained; outcome only after actual evidence.
