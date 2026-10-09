# Reservation access control

## Summary

Authenticate the caller using verified credentials, then authorize their requested action on the actual database record. Caller-controlled user IDs are not proof of identity.

## Explanation and example

For the assessed customer-only policy, reservation { id: 900, userId: 28 } belongs to user 28. The reservation ID identifies an object; userId identifies its owner. Load the requested record and compare its owner with the verified requester's user ID.

```text
requester = authenticateSession(request)
reservation = db.findReservation(request.path.reservationId)
if reservation.userId == requester.userId:
    return reservation
else:
    deny access
```

The URL can select the requested reservation but cannot establish that the caller owns it. A forged query userId must not override the session identity. The sketch omits missing-record and authentication-error handling and has not been run.

## Applications and edge cases

Apply object-level authorization to reading, changing and deleting private records. More complex policies can include administrators, shared records and tenant boundaries; owner equality is the specific policy in this exercise, not a complete authorization system.

For the illustrative HTTP-authenticated API, owner access returns 200, authenticated nonowner denial returns 403, and absent/invalid credentials return 401 with the required applicable WWW-Authenticate challenge. A deliberate 404 concealment policy can be chosen for forbidden objects. Define and test the actual contract rather than assuming every framework defaults to it.

## Common misconceptions

- Authenticating a session automatically authorizes access to all records.
- A URL userId is trustworthy evidence of identity.
- Reservation ID must equal owner user ID; these identifiers have different meanings.

The final item is a field distinction explained by the tutor, not an established learner misconception: the tutor's numeric inequality prompt was ambiguous.

## Tests and practical applications

Proposed cases: owner gets the correct record; nonowner is denied despite forged query identity; missing session is denied before disclosure. Further cases include nonexistent records, expired credentials and any role/tenant policies actually supported. No tests have been written or executed during this assessment.

## Sources and version context

- [OWASP API1:2023 Broken Object Level Authorization](https://api-security.owasp.org/editions/2023/en/0xa1-broken-object-level-authorization/).
- [RFC 9110 HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html), sections 15.5.2 and 15.5.4, June 2022.
- Accessed 2026-10-04; full metadata: [backend research](../sources/2026-10-04-backend-baseline.md). Framework-independent guidance; no API implementation verified.

## Demonstrated understanding and gaps

[Q3–Q3d](../assessments/2026-10-04-baseline-backend.md): correct ownership policy and caller-controlled parameter explanation after clarification. Narrow conceptual score 2; proposed test-design score 2. Runtime implementation and tests are unassessed. Tutor ambiguity and unfamiliar HTTP labels are not treated as independent conceptual failures. Fresh transfer and authentication/authorization distinction remain to be assessed independently.

### October 8–9 delayed review

[Private export review](../assessments/2026-10-08-review-access-control.md#final-evaluation), completed October 9: independently traces caller-controlled identity disclosure, compares stored ownerUserId with verified requester.userId, and explains that a logged-in nonowner fails authorization. Narrow conceptual score 3/4. No new testing evidence; baseline proposed-test score remains historical evidence, and runnable endpoint/security checks remain unverified. No broad practical mastery inferred. Earlier assessment history preserved.

Next review: 2026-10-12, fresh conceptual transfer three days after the first successful delayed review.
