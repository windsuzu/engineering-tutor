# Modal accessibility review: delete workflow

Date: 2026-10-07 (Asia/Taipei)
Skill: fe.accessibility
Status: completed; needs practice.
Reason: review due 2026-10-05 after guided custom-dialog baseline.
Duration: 5–10 minutes; reasoning and proposed keyboard checks, not runnable implementation.
Objectives: distinguish ARIA semantics from behavior and choose focus targets when the opener disappears.
Prerequisites: DOM focus, buttons, keyboard navigation.

## Q1 — Review the behavior

A project list has a Delete button for each row. The user opens a custom div dialog titled Delete project?, with Cancel then Delete permanently buttons. The div has role=dialog, aria-modal=true and aria-labelledby pointing to the title. No focus movement, keyboard handlers or background interaction prevention are implemented. Clicking Delete permanently successfully deletes that row and closes the dialog. Other rows and an Add project button remain.

1. Do those attributes alone move focus into the dialog and keep Tab inside?
2. Which button would you initially focus, and why?
3. After successful deletion, the original opener is gone. Where should focus go instead? Choose a reasonable target and explain.

Response and grading: pending. No browser checks, code execution or tests performed.
Proposed next review: 2026-10-10 on independent success; otherwise 1–3 days after correction. Existing queue unchanged while pending.

## Verified reference

W3C WAI ARIA Authoring Practices Guide: Dialog (Modal) Pattern — publisher W3C WAI; https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ ; publication date not stated; accessed 2026-10-07. Rolling browser/ARIA guidance, independent of React version. Useful for modal keyboard behavior, initial focus for irreversible operations and restoration when the opener no longer exists. Established accessibility guidance; concrete target choice depends on application workflow.

## Initial attempt

Learner response (verbatim):
> not focus automatically, but after press tab, it goes to cancel, and tab again, goes to delete.
> if the delete happens and the dialog is closed. the focus may go to the next row's outside delete button.

Evidence: correctly distinguishes absence of automatic initial focus. Cancel then Delete is their relative ordinary tab order, but first Tab target is underdetermined without current focus and surrounding DOM order; no focus containment implemented. Next-row Delete is a plausible deliberate restoration target but not guaranteed automatic behavior. Initial preferred focus target and rationale remain unanswered. Clarification pending; no final scores or queue changes.

Follow-up: clarify first Tab depends on current focus/DOM; ask desired initial target and why, Tab after final dialog button without containment, and whether next-row focus requires explicit management.

## Follow-up attempts and correction

Learner response (verbatim):
> 1. maybe is the cancel because we define the dialog's role, aria-modal, etc.
> 2. no, it goes to the outside of the dialog
> 3. maybe to the top first row

Tutor feedback: Cancel is a suitable least-destructive initial action, but ARIA attributes do not implement focus placement. Tab can escape without containment. Tutor clarified that last remaining row meant zero rows; do not penalize the ambiguous wording.

Learner response (verbatim):
> if no row left, then we just move to the next below element in the page. if there's no element, go to the url?

Correction: deliberately focus a logical next task, here the existing Add project button. Arbitrary next DOM element may be unrelated; browser address bar is not a page focus-restoration target. If no suitable control exists, an appropriate list heading or empty-state message can be made programmatically focusable with tabindex=-1. On opening explicitly focus Cancel; contain forward/reverse tab navigation, prevent background interaction, support Escape and name the dialog. On cancellation normally restore the opener; after removal choose a surviving workflow target. No code or keyboard checks performed.

Conceptual understanding: 2/4. Correctly identifies missing automatic focus initially and Tab escaping; chooses plausible next-row target. Still attributes Cancel focus to ARIA and needs guidance for empty-list restoration. Initial contradictory focus claims retained rather than silently reconciled. Remaining dimensions unassessed: no implemented solution, executed tests, complete edge-case handling or trade-off comparison.

Next review: 2026-10-09, fresh modal-focus scenario. Follow-up: after cancellation without deleting a row, where should focus return? Next recommended topic: overdue Next.js cache review.

## Cancellation correction check

Learner response (verbatim):
> delete button outside

Correct: restore focus to the original row's Delete button that opened the dialog, because cancellation leaves it present. Immediate correction check after feedback; score remains conceptual 2/4 and next review 2026-10-09. No keyboard test performed.
