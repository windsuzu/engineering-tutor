# Access-control review: private account export

Date: 2026-10-08 (Asia/Taipei).
Skill: be.auth, scoped to ownership and trusted caller identity.
Status: completed October 9; successful narrow conceptual review. Practical implementation and tests remain unverified.
Reason: review due October 5 after guided ownership/trust-boundary baseline. Prior evidence: [backend Q3–Q3d](2026-10-04-baseline-backend.md#q3--reservation-access-control).
Estimated duration: 5–10 minutes, one question at a time. Objective: trace an actual authorization branch and distinguish caller-controlled fields from verified identity. Prerequisites: HTTP requests, session identity, object ownership. Plain language or pseudocode accepted.

## Q1 — Trace the supplied check

This customer-only API lets users download their own private account exports. A verified session identifies the requester as user 17. The database record is `{ id: 'export-900', ownerUserId: 28 }`. There are no extra permission checks or admin roles.

Request:
```text
GET /exports/export-900?userId=28
```

Endpoint:
```text
requester = authenticateSession(request) // verified requester.userId = 17
exportRecord = db.findExport(request.path.exportId)

if exportRecord.ownerUserId == request.query.userId:
    return exportRecord
else:
    deny access
```

With this exact code and request, does user 17 receive the export belonging to user 28?

Learner response: pending. No branch result or correction supplied before the attempt. Probe the trusted ownership comparison afterward, one question at a time.

### Q1 response

Learner response (verbatim):

```text
yes, this is a bad code. it should check the userId (17) from the session.
```

Evidence: independently predicts the actual disclosure and identifies verified session userId as the identity source for correcting the check. No hint or branch result supplied before the answer. Tutor confirms that the current comparison is 28 == 28. Exact compared record field is still unstated; clarify without attributing the baseline tutor's object-ID ambiguity to the learner. No final score or completed review outcome yet; no endpoint/tests run.

## Q2 — State the corrected comparison

Which two fields should the corrected ownership check compare? Plain language or pseudocode is enough.

Response: pending. One focused question; do not disclose the comparison before the attempt. Verified requester has userId 17; record has id export-900 and ownerUserId 28. Queue and mastery remain unchanged while the assessment continues.

### Q2 response — October 9 continuation

Received: 2026-10-09 (Asia/Taipei); session began October 8.
Learner response (verbatim):

```text
 exportRecord.ownerUserId === requester.userId
```

Correct: compares the stored object's owner account ID with the verified caller's account ID. No corrected expression was supplied before this answer. Together with Q1, supports independent ownership/trust-boundary reasoning. Tutor confirms the comparison. No compilation, endpoint, or tests executed; practical authorization implementation remains unverified. No final review score or rescheduling yet.

## Q3 — Authentication versus authorization

User 17 has a valid session, but the export belongs to user 28. Under the corrected check, access is denied.

Is this an authentication failure or an authorization failure, and why?

Response: pending. One conceptual question; exact HTTP status recall is not required. Await response before grading or changing the review queue. Apply dates from the actual completion date rather than the October 8 session start.
Scores and review outcome: pending. Existing be.auth queue date and mastery remain unchanged. No API or tests executed.

## References and limits

- OWASP API Security Project, [API1:2023 Broken Object Level Authorization](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/), 2023 edition; exact publication date unspecified. Useful for object-level authorization using established caller identity. Established framework-independent guidance, previously accessed October 4.
- Metadata in [backend research](../sources/2026-10-04-backend-baseline.md) and existing [access-control concept](../concepts/reservation-access-control.md). Live reference access is unavailable in this session (prior official-reference request blocked by proxy HTTP 403); these pages were not newly verified. No current API/release claims or unseen implementation claims.
- The export endpoint is a tutor-created reasoning example. IDs are not secrets. Authentication is explicitly verified; it does not imply an unshown ownership check.

Initial conditional dates were proposed on October 8, before the actual completion date. Final schedule below uses the October 9 completion date.

## Q3 response — October 9

Learner response (verbatim):

```text
This is an authorization failure. Because the user it's actually logged in, just don't have the permission to read the data he or she cannot read.
```

Correct: the session establishes identity, while authorization determines whether this caller may read the requested record. No distinction or answer supplied before this attempt. Tutor confirms the reasoning.

## Final evaluation

- Conceptual understanding: 3/4, scoped to object ownership, trusted caller identity, and authentication versus authorization. Independently traces the vulnerable return branch, identifies the verified session identity, gives the correct owner/caller comparison, and explains denial for a logged-in nonowner. No observed conceptual error in this review; ordinary confirmation between questions was not a supplied solution.
- Implementation correctness, edge-case handling, and trade-off explanation: unassessed in this review. No runnable endpoint, additional policy cases, or compared designs.
- Testing quality: unassessed in this review; retain the earlier baseline's 2/4 proposed-test evidence without updating it. No tests designed or executed here.

Outcome: successful first delayed conceptual review. Skill remains developing because broader practical evidence targets are unverified; this is not comprehensive authentication/security mastery. Preserve all prior responses and scores. No code compiled, API requests performed, or tests run. No correction required for this review.

Next review: 2026-10-12, three days after actual October 9 success; stage 1 for the scoped conceptual review. Next recommended topic: be.sql aggregation/outer-join review, due October 8, before reviews due October 9.
