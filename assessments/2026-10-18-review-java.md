# Java review: optional count in arithmetic

Date:2026-10-18 (Asia/Taipei). Skill:be.java. Due October15 after nullable-equality correction.
Status:completed October25 (latest user-provided session date); successful narrow arithmetic-unboxing/defaulting conceptual review.

## Situation and code

Checkout has two ordinary items and optional gift-wrap count. Business contract: missing giftWraps means zero, but no defaulting code has run.

| Variable | Java type | Value |
| --- | --- | --- |
| ordinaryItems | int | 2 |
| giftWraps | Integer | null |

```java
int ordinaryItems = 2;
Integer giftWraps = null;
int totalItems = ordinaryItems + giftWraps;
System.out.println(totalItems);
```

Assume Java21, method body, no handler/validation/default or other value changes. No fresh compiler/runtime execution. One task: at runtime does addition produce a number or throw, and why?

## Q1 actual response

Learner response (verbatim):

```text
I know that when comparing the Integer, it will be converted to Integer.intValue and throws error. I think the add operation also do this. so I think it will throw.

(p.s. can we have something like progress bar to learn how many review and new learning things?
I want it and question template to be leave in a markdown file, and AGENTS or CLAUDE.md always read it)
```

Correct independent transfer to arithmetic unboxing/NPE; no fresh rule supplied before answer. Tooling/progress request is a separate instruction, not grading evidence. Preserve prior guided nullable history in [recovery ledger](2026-10-18-session-recovery.md). No final conceptual score, learner tests or new review stage/date yet.

## Q2 — Explicit optional default (pending)

Same contract: null giftWraps means zero; present value must keep its numeric value. How would you compute totalItems without null unboxing while following that rule? Code or plain language accepted.

No complete defaulting expression supplied before learner attempt. Earlier assistant prepared this follow-up during a failed save but has not received an answer. Current conversation is configuring progress; do not infer an answer or completion. Use accepted case template and current progress bar when resuming.

## Latest configuration clarification

Learner (verbatim):

```text
ok, i think the progress can be used along with master.json?
```

The existing filename is progress/mastery.json. It remains authoritative for evidence-backed scores/history; Markdown tracks selected session work, review queue schedules dates. No new master.json or duplicate score system created. No mastery/schedule change from these configuration requests. Sources: prior Java21 unboxing demonstrations/JLS context recorded in recovery ledger, no new live documentation or runtime claims.

## October20 resumption — Q2 presentation

Learner request (verbatim):

```text
start next learning
```

Read required persistent context, mastery, queue and daily history. Resume the active plan; no score/completion inferred. Goal: explicitly convert an optional null count to zero before arithmetic, preserving present values. Java21, ordinaryItems2, present giftWraps already valid nonnegative integer. Required results: null->total2,0->total2,3->total5. Table is the business contract, not executed program output.

```java
int ordinaryItems = 2;
Integer giftWraps = /* null, 0, or 3 */;

// Your null-safe calculation here.
int totalItems = /* ... */;
```

Task: write the null-safe totalItems calculation, or explain equivalent Java logic. One task, code/plain language accepted, no conditional/defaulting solution supplied. No compiler/runtime tests executed. Actual Q2 response, final evaluation and review-date changes remain pending.

## Q2 response — October25 continuation

Learner response (verbatim):

```text
If giftwraps == null
  total = 0 + ordinaryItems
Else
  Total = giftwraps + ordinaryItems
```

Correct explicit branch: null contributes zero without numeric unboxing, non-null value contributes its quantity. Capitalization/pseudocode accepted, not a Java syntax penalty. No full defaulting solution supplied before answer. A compact equivalent shown after the answer is `ordinaryItems + (giftWraps == null ? 0 : giftWraps)`; it is an illustrative translation, not an executed compiler/runtime result.

## Final evaluation

Conceptual understanding:3/4 narrowly for arithmetic Integer unboxing and explicit optional-value defaulting. Independently predicted null arithmetic exception and supplied correct null-first conditional logic. Previous guided relational/equality failures preserved separately; this does not prove every nullable operator/API case. Other four dimensions unassessed: no full learner Java program, independent tests, Spring binding or broad exception/resource implementation.

Outcome:success, first successful delayed scoped Java review after correction; stage1, next October28 (three days after latest supplied session date October25). Assessment spanned October18/20/25; no lateness penalty or completion inferred before actual answer. No Java execution this review. Session review1 now complete; proceed to already-selected Spring review2, then concurrency and planned new unit.
