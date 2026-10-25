# Phase 2 TypeScript review: asserted API success with missing data

Date:October25. Skill:fe.typescript. Phase2 review2/3, originally dueOctober17. Status:completed; scoped assertion/runtime-validation conceptual success.

## Situation

A frontend order page expects a successful API result to contain an order ID. Backend instead returns the supplied JSON value:

```json
{"ok": true, "data": null}
```

```text
HTTP JSON -> type assertion -> success branch -> order ID display
```

## Relevant code

```ts
type OrderResult =
  | { ok: true; data: { id: string } }
  | { ok: false; error: string };

const result = (await response.json()) as OrderResult;

if (result.ok) {
  console.log(result.data.id);
}
```

## Assumptions

TypeScript strict settings; normal JavaScript runtime, supplied JSON parsed exactly, no validator/coercion/default or other handler. The task asks runtime behavior, not whether the declared union describes a valid internal value. Code/JSON illustrative, no API request or compiler/runtime executed. Existing TypeScript5.9.3 context, no new library-version claim.

## Q1 — Runtime outcome

With that exact JSON, does the final line log an ID, or fail at runtime? Explain whether the type assertion protects this read. One or two sentences enough.

Response:pending. One runtime-boundary task, no result or validation solution supplied before attempt. Source context previously verified TypeScript Handbook narrowing/assertions in prior records, no new live retrieval claimed. No practical/learner test evidence, grade/stage/date inferred. Existing stage2 applies to prior narrow union/runtime conceptual reviews; set next outcome only after actual answer.

## Q1 actual response

Learner response (verbatim):

```text
you hard assign the type (as) to the response.json's promise result. this won't cause the fail at compile time, but it will fail at runtime with a NPE throw.
```

Correct independent assertion-versus-runtime distinction: assertion claims shape for the awaited value but does not inspect actual JSON. Null data causes JavaScript TypeError when id is read, not Java NPE; preserve underlying correct missing-value reasoning and don't penalize Java-oriented terminology as conceptual failure. No actual compiler/runtime/API test run, final score/date pending.

## Q2 — Treat decoded JSON as untrusted

Keep the same API contract, but receive the parsed JSON as unknown:

```ts
const raw: unknown = await response.json();
```

What would you do before using raw as OrderResult so the supplied oktrue/datanull payload is handled safely? A short validation plan or pseudocode is enough; no specific library/API name required.

Assume no other validator/error handler exists. This is one boundary-design task, not an invitation to cast again. No complete validation solution supplied before attempt or actual parser/schema executed. Final conceptual grade and phase progress unchanged until actual evidence.

## Q2 actual response

Learner response (verbatim):

```text
I may create a validation function to check if the id exist and return : is OrderResult to make the compiler understand that the object is validated in the runtime. a zod is a better solution also.
```

Correct approach: an actual runtime checking function with a type-predicate return can narrow unknown, or a schema validator can validate and yield typed data. Predicate syntax is `value is OrderResult`; preserve conceptual intent rather than penalize shorthand. The compiler trusts the predicate, so its correctness depends on the function's real checks; the annotation itself is not runtime validation. Zod is a valid alternative, not automatically best for all applications.

"ID exists" leaves full shape/value checks unspecified. Do not assume a complete incorrect guard from shorthand; clarify required string-valued id and null/non-object/discriminant/other-branch handling before claiming full validation correctness. No guard/schema implemented or executed, final score pending.

## Q3 — Existing field with the wrong value type

Keep OrderResult success contract `{ ok: true; data: { id: string } }`. The API instead sends:

```json
{"ok": true, "data": {"id": 123}}
```

The property exists, but its value is numeric. Should a correct OrderResult validator accept that value? Explain which runtime condition matters. One or two sentences; no library syntax required.

Response:pending. One value-type contract task, no decision/check implementation supplied before attempt. Prior actual guard proposal preserved without inventing missing code. No schema/API/TS runtime check or final grade/date inferred. Error-branch full validation remains unimplemented, do not infer it from a correct success-branch answer.

## Q3 actual response

Learner response (verbatim):

```text
no, the data will not pass the validation function and failed.
```

Correct rejection under the stated string-valued-id contract; tutor names numeric-versus-string condition after answer. No actual function supplied, so this is conceptual decision evidence, not verified guard implementation. No schema/API/runtime tests.

## Final evaluation

Conceptual understanding:3/4 narrowly for assertion-versus-runtime data trust and validation approach. Independently predicts null property failure despite assertion, proposes real runtime guard/type-predicate or schema validation, and rejects numeric id for string contract. Predicate mechanics/types terminology clarified without assuming an implemented defect from shorthand. No full error-branch/unknown/null/object validator code demonstrated.

Other four dimensions unassessed: no actual parsed/API payload execution, complete guard/schema, learner tests or library comparison. Third scoped delayed conceptual success, stage3; next November8 (14 days). Broad TypeScript developing, practical mastery not inferred; earlier evidence and prompt-ambiguity handling preserved. Session review2 complete, next selected browser review3, new DevOps unit still planned.
