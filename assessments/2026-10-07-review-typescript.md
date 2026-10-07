# TypeScript review: upload state and runtime boundaries

Date: 2026-10-07 (Asia/Taipei)
Skill: fe.typescript
Status: completed; conceptual review successful.
Reason: initial baseline review due 2026-10-05. Fresh upload scenario tests transfer beyond profile state.
Duration: 5–10 minutes. Pseudocode accepted. This is a reasoning assessment; no compilation or tests performed.
Objectives: express state-dependent required fields; distinguish static guarantees from runtime checks.
Prerequisites: object types, unions, API JSON.

## Q1 — Review the upload model

```ts
type UploadState = {
  status: 'idle' | 'uploading' | 'success' | 'error';
  progress?: number;
  downloadUrl?: string;
  message?: string;
};
```

Requirements: uploading has progress; success has downloadUrl; error has message; idle needs none. Show an invalid state this model permits and redesign the type. Then explain whether typing progress as number guarantees it is between 0 and 100.

Learner response (verbatim):
```text
type = {status: idle }|
{status: error; meesage?: string} |
{status: success; downloadUrl?: string } |
{status: uploading; progress?: number}

no, you should use code or zod or yup to do the runtime validation
```

Evidence so far: independently chooses separate union variants and correctly distinguishes numeric static typing from runtime validation. Required payloads remain optional in the proposed variants. Treat missing quotes/type name and message spelling as pseudocode syntax, not conceptual errors. Explicit invalid-state example not yet supplied. No final scores or review outcome assigned while correction probe is pending.

Follow-up (minimal hint): Does `{ status: 'success' }` still fit your proposed type? Which symbol should change so success requires downloadUrl, error requires message, and uploading requires progress?
Grading and corrections: pending until attempt.
Proposed next review: 2026-10-10 if independently successful; otherwise within 1–3 days of feedback. Existing queue date stays unchanged while pending.

## Verified references

- TypeScript Handbook: Narrowing — Microsoft/TypeScript; https://www.typescriptlang.org/docs/handbook/2/narrowing.html ; publication date not stated; accessed 2026-10-07. Discriminated unions and control-flow narrowing. Established practice. Applicable to repository TypeScript 5.9.3; current rolling handbook, no newer feature required.
- TypeScript Handbook: Everyday Types — Microsoft/TypeScript; https://www.typescriptlang.org/docs/handbook/2/everyday-types.html ; publication date not stated; accessed 2026-10-07. Type assertions and runtime boundaries. Established practice; same version context.

## Correction and result

Learner response (verbatim):
> oh didn't see the "must", please remove all question mark for optional

Corrected model:
```ts
type UploadState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; downloadUrl: string }
  | { status: "uploading"; progress: number };
```

Conceptual understanding: 3/4, scoped to union modeling and static/runtime distinction. Independently selected union variants and runtime checks; immediately corrected optional fields after a requirement reminder. Record the original omission as an accidental reading oversight, not a demonstrated persistent misconception. Assistance: minimal hint pointing at optional fields; no full solution before correction. Other four dimensions unassessed; no code compiled or tests run. No broad mastery inferred.

Next review: 2026-10-10. Next recommended topic: overdue modal accessibility review. Follow-up: if the API supplies progress 150, does this corrected type alone reject it?

Follow-up response (verbatim):
> no it will be accepted.

Correct: 150 satisfies number; this type supplies no range check or API runtime validation. Confirmation after feedback, not an additional independent assessment. Score and review date unchanged.
