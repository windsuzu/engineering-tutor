# Modal keyboard focus

## Summary

ARIA attributes describe intended dialog semantics to assistive technology. A custom div with role="dialog" and aria-modal="true" still needs behavior that makes it modal: appropriate initial focus, a contained tab sequence, Escape closing, background interaction prevention and focus restoration.

## Explanation and example

The baseline custom dialog contains a labeled input and Close button: both are normally keyboard-focusable. On opening this simple form, explicitly focus an appropriate element inside, such as Name. Tab from Name reaches Close, then wraps to Name; Shift+Tab reverses the sequence. Escape closes. Closing returns focus to the opener unless it no longer exists or the workflow justifies another target.

The unmodified DialogProbe does not move focus when it opens, does not contain focus or disable the background, has no Escape handler and does not explicitly restore focus. Its Close button changes open state; that alone is not a complete accessible modal implementation.

## Practical applications and implementation options

For profile editors, confirmations and other modal interactions, prefer a suitable native dialog or established accessible component where appropriate, while verifying its actual focus, keyboard and naming behavior. Custom implementations must supply these behaviors. This note does not claim a specific library or native control implements every application requirement automatically.

## Common misconceptions and edge cases

- aria-modal does not implement focus trapping or Escape handling for a div.
- Inputs are focusable; focus is not limited to buttons.
- Adding dialog markup alone does not automatically focus a child.
- Initial focus depends on content and workflow, not always the first control or Close.
- If the opener disappears, choose a logical focus destination.
- Consider reverse tabbing, nested dialogs, background pointer interaction, visible focus and dialog naming.

## Proposed checks

Open from the keyboard; inspect active focus. Traverse forward/backward through controls and confirm focus cannot escape. Close with Escape and with the visible Close control; confirm restoration. Verify background content is inert and the dialog has an accessible name. These are test requirements; no test or browser inspection has been executed in this baseline.

## Verified source and version context

[W3C WAI ARIA APG: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), accessed 2026-10-04. Rolling guidance for browser ARIA and keyboard behavior, not a React-version-specific feature. Full metadata: ../sources/2026-10-04-frontend-baseline.md.

## Personal evidence

Assessment: ../assessments/2026-10-04-baseline-frontend.md, Q7. Current response correctly identifies input/Close focus navigation and describes expected Escape dismissal, but does not distinguish desired behavior from the custom div's implementation. Conceptual score 2 for this scenario only. Earlier stored input-focusability claim and score 1 are explicitly superseded in the assessment history.
Q7b: learner correctly identifies possible escape to Help without focus management and intended restoration to Edit profile. Clarified wrap-around to the input and the need to explicitly restore focus in this custom implementation. This is guided reasoning, not implemented verification.
Remaining gaps: fresh independent diagnosis, actual implementation and keyboard verification.
Next review: 2026-10-05, fe.accessibility in ../reviews/queue.json.
