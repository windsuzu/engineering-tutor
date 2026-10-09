# Modal accessibility review: archive document

Date: 2026-10-09 (Asia/Taipei).
Skill: fe.accessibility, focused on semantics versus focus behavior and restoration.
Status: completed; successful narrow conceptual focus/keyboard review. Practical implementation unverified.
Estimated duration: 5–10 minutes. Objective: distinguish ARIA declarations from implemented focus behavior. Prerequisites: DOM focus, buttons, conditional rendering. Use small examples and plain language; one question at a time.

## Q1 — Initial focus

```tsx
<button onClick={() => setOpen(true)}>Archive document</button>

{open && (
  <div role="dialog" aria-modal="true" aria-labelledby="archive-title">
    <h2 id="archive-title">Archive this document?</h2>
    <button onClick={() => setOpen(false)}>Cancel</button>
    <button onClick={archiveDocument}>Archive</button>
  </div>
)}
```

Assume the opener has keyboard focus when activated. This is a custom div, not a native dialog. No autoFocus, focus() call, keyboard handlers, or other focus-management code exists. The opener remains mounted.

When the dialog appears, do role="dialog" and aria-modal="true" automatically move keyboard focus to Cancel?

Response: pending. No result or solution supplied before the attempt; no browser check run. Follow with restoration/keyboard probes as appropriate, one at a time. No scores or queue changes until actual evidence.

### Q1 response

Learner response (verbatim):

```text
No aria attrs dont control the a16y
```

Evidence: independently correctly rejects automatic focus movement from the supplied ARIA attributes. The broader phrase "dont control the a16y" is imprecise; do not interpret it as proving ARIA has no accessibility role. Tutor clarifies that ARIA conveys semantics to assistive technology, while these attributes do not implement focus placement or keyboard behavior. No browser test or broad accessibility mastery inferred; no final score yet.

## Q2 — Deliberate initial focus

The app developer wants keyboard focus to start on Cancel when this custom dialog opens. What explicit action should the app take to make that happen?

Response: pending. Plain language or pseudocode accepted; no focus implementation supplied before the attempt. Only one question; wait for the answer. Focus restoration and containment remain to probe afterward. Queue and mastery unchanged while incomplete.

### Q2 response

Learner response (verbatim):

```text
In reafct we Use a ref to connect the button then use ref current .focus to focus the button when dialog open
```

Correct: explicitly associates a React ref with the intended button and calls focus on the DOM node when the dialog opens. Treat spelling/shorthand as plain-language reasoning, not a syntax deficiency. Tutor confirms mounting timing: focus after the conditionally rendered button exists. No hook/API name recall required; no component compiled or keyboard checks run. Narrow independent focus-action evidence, not verified implementation.

## Q3 — Restore focus when the opener disappears

The document list contains one document with its Archive button. Archiving succeeds, removes that document and its opener, and closes the dialog. The empty list displays a surviving New document button. No restoration code exists yet.

Where should the app deliberately move focus after this successful archive?

Response: pending. Clear zero-document scenario to avoid the earlier baseline's ambiguous last-row wording. One focus-target question, not a prediction of automatic browser behavior. No restoration target supplied before the attempt; await answer before feedback. Mastery and queue unchanged.

### Q3 response

Learner response (verbatim):

```text
It should focus the new document button
```

Correct: deliberately restore focus to the surviving New document control, a logical next action after removing the only document and its opener. No target supplied before this answer. Tutor confirms the workflow rationale; no automatic browser movement or implemented restoration inferred. No final review grade or keyboard test evidence yet.

## Q4 — Forward Tab at the end

The custom modal is open with Cancel followed by Archive as its only two focusable controls. Keyboard focus is on Archive, the last control. No focus containment has been implemented yet.

What should pressing Tab do in a correctly implemented modal?

Response: pending. This asks intended modal behavior, not the supplied unmanaged div's actual browser tab order. One question; no containment answer supplied before the attempt. Other controls/background behavior, Escape, and reverse Tab can be discussed after actual evidence. Mastery and queue unchanged while incomplete.

### Q4 response

Learner response (verbatim):

```text
If it's corrected implemented it should go from archive back to the cancel instead of focus the outside elements
```

Correct: forward Tab wraps from the last control to the first, staying within the modal. Distinguishes the intended corrected behavior from unmanaged outside focus. No wrap target supplied before the answer. Tutor confirms. No keyboard test run.

## Final evaluation

- Conceptual understanding: 3/4, scoped to custom-modal focus/keyboard reasoning. Independently rejects ARIA-driven automatic focus, proposes explicit ref/DOM focus, selects the surviving New document control after removal, and describes forward Tab containment. Clarified ARIA's semantic contribution without treating shorthand as proof that ARIA has no accessibility role.
- Implementation correctness, edge-case handling, testing quality, and trade-off explanation: unassessed in this review. Ref/focus pseudocode is not a complete implemented modal; no browser or keyboard checks, independent test design, or compared implementations. Reverse Tab, Escape, background inertness, accessible-name verification, and broader edge cases were not assessed here.

Outcome: successful first delayed conceptual review; broader skill remains developing. Earlier historical responses and corrections preserved. Next review October 12, three days later, with fresh reverse-navigation/background behavior and focus restoration probes. Stage 1 for the scoped conceptual review. No compiled implementation or executed browser checks. Next recommended topic: Next.js freshness due today.

## References and scope

Existing [modal focus concept](../concepts/modal-keyboard-focus.md) and [October 7 review](2026-10-07-review-accessibility.md) reference W3C WAI ARIA APG Dialog (Modal) Pattern, previously verified October 7. Use that previously verified framework-independent guidance; no live reverification claimed in this session where official-reference access has been blocked. The snippet is tutor-created, not a tested component.

Queue stays due October 9 while incomplete. Conditional next review October 12 on scoped independent success, otherwise October 10–12 after correction; record only after actual outcome. Do not infer implementation or keyboard-test mastery from conceptual answers.
