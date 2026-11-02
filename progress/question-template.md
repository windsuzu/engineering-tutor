# Question template — agreed tutoring format

Accepted by the learner October17: "this level is acceptable" after a concrete panel/card POC. Recovered from the chat October18. Read with [preferences](tutoring-preferences.md) and [session progress](session-progress.md).

## Template for new substantive questions

```markdown
Reviews [bar] completed/planned | New learning [bar] completed/planned

### Case: [concrete title]

**Situation:** [user action, relevant components, intended behavior]

[Useful diagram, request timeline, or clearly headed input table]

**Code / data:**
[Small snippet, schema or configuration relevant to the task]

**Assumptions:**
- [Language/runtime/framework context]
- [Explicit behavior and scope needed to avoid guessing]
- [What is hypothetical, actually executed, or unrun]

**Your task:** [ONE focused question]

[Expected answer shape: 1–2 sentences, table, code or pseudocode]
```

Use actual ledger counts, not literal placeholders. Show only this compact status bar for progress in chat; keep repeated review-item/date tables in repository records. The denominator includes all due/overdue review occurrences, retaining original due dates/completions and adding newly due occurrences as dates change; future reviews remain listed in the repository. Keep relaxed ELI5 clarity without interview pressure, hidden requirements or countdowns. Scale detail to the problem; useful diagrams/code are preferable to artificial empty sections. Follow-ups reuse the case with enough recap and changed inputs to stand alone. Separate tables for separate schemas. Say "compiler error", "runtime exception", or "API rejection" rather than ambiguous "reject".

Do not disclose the complete assessment solution before an attempt unless the learner asks for explanation. Offer progressive hints, record assistance, preserve actual wording, and distinguish independent versus guided answers. API-name recall or unfamiliar Java syntax alone is not a conceptual failure. Backend context is Java21+/Spring Boot4; frontend and DevOps keep their relevant languages.

## Evidence and progress updates

1. Save actual responses, prompt clarifications and assistance in the assessment/daily note.
2. Keep final grading pending while an item is in progress. Partial correctness is evidence, not a completed review.
3. When complete, record scoped outcome, update [mastery](mastery.json) and [review queue](../reviews/queue.json), and verify their next-review dates agree.
4. Refresh [session progress](session-progress.md) from dated occurrence states and linked outcomes. Do not regrade from the bar or infer scores from file counts.
5. Guided needs-practice review may be work-complete without independent success/mastery. Tutor-run demonstrations do not become learner testing evidence.
6. Preserve completed occurrences and their original due dates, add newly due occurrences on date changes, and archive the completed plan in the daily note. Follow-ups do not add occurrences. The learner may pause or revise the plan.
7. Retire the repeated Layout-duration-versus-CLS case; choose different performance problems. Keep inert/background-interaction deferred and ungraded until taught and assessed.

## Historical accepted POC reference (format only; case retired)

Dashboard panel drag: 100 cards resize to the panel's initial width. Before code reads panel.offsetWidth inside the write loop; proposed code reads once before writing cards. Diagram shows drag -> panel width -> cards. Assumptions make initial-width behavior explicit; both versions have intended appearance, no browser benchmark run. One task selects evidence for the stated computation-cost hypothesis. The initial prompt gives context/code without disclosing the tested metric. Original format feedback is preserved in the [recovery ledger](../assessments/2026-10-18-session-recovery.md#presentation-feedback-and-non-assessment-requests).
