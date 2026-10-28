# Phase4 accessibility: background interaction in a custom modal

October26, fe.accessibility dueOctober24. In progress, response pending. Fresh inert transfer target after earlier taught vocabulary; no score yet.

## Case

Custom modal is a div, not native dialog.showModal(). app-root and modal-root are siblings. Initial focus inside dialog and forward/reverse keyboard focus containment already correctly implemented. No overlay/pointer blocker, inert, native modality or other background-disabling code. Background Delete project button remains clickable while modal is open.

```html
<div id="app-root">
  <button>Delete project</button>
</div>
<div id="modal-root">
  <div role="dialog" aria-modal="true" aria-labelledby="confirm-title">
    <h2 id="confirm-title">Archive report?</h2>
    <button>Cancel</button>
    <button>Archive</button>
  </div>
</div>
```

Q1: What browser behavior or DOM change would prevent interaction with background app-root while keeping modal-root usable? Name behavior/attribute or explain plainly; no syntax memorization needed. One background-interaction task; no inert solution supplied before attempt. Later reversal/restoration question after answer. Hypothetical DOM/behavior, no browser/keyboard/assistive-tech tests run.

## Reference limits

W3C WAI-ARIA APG Dialog (Modal) Pattern, https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ , W3C WAI, publication date unverified. Retrieval attemptedOctober26 failed CONNECT403; uses previously recorded platform context, no latest-documentation claim. ARIA semantics and native behavioral controls separate; assess only actual response.

## Learner scope clarification

```text
I didn't learn this before, isn't this a review section?
```

Not an assessment answer or failure. History records brief inert vocabulary teaching/guided reversal in recovered October14–17 evidence, explicitly not independent inert mastery. Learner reports topic not learned; do not treat prior exposure as established learning. Tutor acknowledges question assumed more preparation than demonstrated. Background-interaction/inert probe deferred, unanswered and ungraded. No mastery/queue changes. Do not silently count this as completed new learning or replace planned DNS unit.

## Revised review scope — Focus restoration (pending)

Use previously assessed dialog focus restoration, not inert recall. Reports page has New report button and one report row with Archive opener. Opener opens confirmation modal. Successful archive removes that last row including opener; modal closes. New report button remains visible, enabled and can create next report. Focus cannot return to removed opener. Q: Where should focus move after closing this dialog, and why? One focus-restoration task,1–2sentences. No answer supplied before attempt. Hypothetical behavior, no browser/keyboard test. Preserve prior inert prompt and clarification instead of erasing evidence. Follow-up only if needed; final outcome pending.

## Focus-restoration actual response — October28

```text
it should move the focus to the new report button
```

Correct independently chosen surviving focus target. Learner did not provide requested rationale; tutor explains original opener removed/useful surviving control afterward. Do not infer independent rationale or implementation. No hint naming target before answer beyond supplied page controls. Prior inert scope clarification is not failure.

## Final evaluation

Conceptual understanding3/4 only for choosing a logical surviving focus target when opener removed. No broad modal/keyboard mastery, independent explanation, inert knowledge or implementation inferred. Other dimensions unassessed this review; prior evidence retained. Deferred background-interaction task remains ungraded. No browser/keyboard/assistive tests. Stage2->3,nextNovember11 (14days after October28 completion); future review should cover other previously learned focus behavior, not presume inert knowledge. Phase4 review work complete; retain plan across date changes.
